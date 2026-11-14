import { NextResponse } from 'next/server';
import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getResend, withResendRetry } from '@/lib/email';
import { validateLead } from '@/lib/guide';
import { appendLeadToSheet, isSheetConfigured } from '@/lib/leads-sheet';
import { subscribeToNewsletter } from '@/lib/newsletter';
import { isForeignOrigin, isHoneypotFilled, isRateLimited, isTooFast } from '@/lib/lead-guard';

export const maxDuration = 60;

// LegalOps waitlist (/legalops). Joining the list is the newsletter sign-up: the page says so
// above the button, so the person is subscribed and gets the waitlist welcome email (with the
// unsubscribe link). The lead also goes to the leads sheet and to the team inbox, like a guide
// request. The page shows success only when the subscription was actually saved.

const E = {
  origin: 'Origem do pedido inválida.',
  rate: 'Demasiadas tentativas. Tente novamente dentro de alguns minutos.',
  invalid: 'Pedido inválido.',
  blocked: 'Não foi possível processar este pedido.',
  tooFast: 'Preencha o formulário com calma e tente novamente.',
  down: 'De momento não conseguimos receber inscrições. Tente mais tarde ou escreva para contact@elevaops.com.',
  failed: 'Não conseguimos guardar a sua inscrição. Tente novamente dentro de momentos.',
} as const;

function fail(status: number, error: string, field?: string) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

export async function POST(request: Request) {
  if (isForeignOrigin(request)) return fail(403, E.origin);
  if (isRateLimited(request)) return fail(429, E.rate);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, E.invalid);
  }
  if (!body || typeof body !== 'object') return fail(400, E.invalid);
  if (isHoneypotFilled(body)) return fail(400, E.blocked);
  if (isTooFast(body)) return fail(400, E.tooFast);

  // Same field rules as the guide form; the waitlist is Portuguese only.
  const result = validateLead({ ...body, language: 'pt', companyName: '', marketingConsent: true });
  if (!result.ok) return fail(422, result.error, result.field);
  const { firstName, email, phone, tracking } = result.lead;

  const client = getResend();
  const sheetEnabled = isSheetConfigured();
  if (!client && !sheetEnabled) {
    console.error('[waitlist] Neither the Google Sheet nor RESEND_API_KEY is configured: sign-up was NOT recorded.');
    return fail(503, E.down);
  }

  const leadId = crypto.randomUUID();

  async function notifyTeam() {
    if (!client) return false;
    const trackingRows = Object.entries(tracking)
      .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
      .join('');
    try {
      const { error } = await withResendRetry(() => client.emails.send({
        from: EMAIL_FROM,
        to: TEAM_INBOX,
        replyTo: email,
        subject: `LegalOps waitlist: ${firstName.replace(/[\r\n]+/g, ' ')}`,
        html: `
          <h2>New LegalOps waitlist sign-up</h2>
          <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : '—'}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          <p><strong>Lead id:</strong> ${leadId}</p>
          ${trackingRows ? `<p><strong>Attribution</strong></p><table>${trackingRows}</table>` : '<p><strong>Attribution:</strong> none (direct visit)</p>'}
        `,
      }, { idempotencyKey: 'waitlist-notification/' + leadId }));
      if (error) console.error('[waitlist] Resend rejected the team email:', error);
      return !error;
    } catch (err) {
      console.error('[waitlist] Failed to send the team email:', err);
      return false;
    }
  }

  const [savedToSheet, emailed, newsletter] = await Promise.all([
    sheetEnabled
      ? appendLeadToSheet({ leadId, firstName, email, phone, marketingConsent: true, language: 'PT', guide: 'LegalOps (lista de espera)', ...tracking })
      : Promise.resolve(false),
    notifyTeam(),
    subscribeToNewsletter({ firstName, email, language: 'pt', marketingConsent: true, source: 'legalops' }),
  ]);
  if (sheetEnabled && !savedToSheet) console.error(`[waitlist] Sign-up ${leadId} was not saved to the sheet.`);

  // Being on the list means being subscribed: without the subscription it isn't a sign-up.
  if (!newsletter?.subscribed) {
    if (!savedToSheet && !emailed) return fail(502, E.failed);
    console.error(`[waitlist] Sign-up ${leadId} was recorded but the newsletter subscription failed.`);
  }

  return NextResponse.json({ ok: true, leadId, subscribed: newsletter?.subscribed === true, welcomed: newsletter?.welcomed === true });
}
