import { NextResponse } from 'next/server';
import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getResend, withResendRetry } from '@/lib/email';
import { CATALOG, getEdition, leadLanguage, validateLead } from '@/lib/guide';
import { appendLeadToSheet, isSheetConfigured } from '@/lib/leads-sheet';
import { sendGuideToLead } from '@/lib/guide-email';
import { subscribeToNewsletter } from '@/lib/newsletter';
import { saveWaitlistContact, sendWaitlistEmail } from '@/lib/waitlist';
import { isForeignOrigin, isHoneypotFilled, isRateLimited, isTooFast } from '@/lib/lead-guard';

export const maxDuration = 60;

// Registers a lead for the free guide: appends it to the leads Google Sheet and
// emails a notification to the team inbox through Resend. The client only unlocks the
// download when this route answers `ok: true`, i.e. after the lead was actually stored —
// nothing is faked when the services aren't configured.

const ERRORS = {
  en: {
    origin: 'Invalid request origin.',
    rate: 'Too many attempts. Please try again in a few minutes.',
    invalid: 'Invalid request.',
    blocked: 'Unable to process this request.',
    tooFast: 'Please take a moment to fill in the form and try again.',
    down: 'Sorry, we can’t take requests right now. Please try again later or email contact@elevaops.com.',
    failed: 'We couldn’t register your request. Please try again in a moment.',
  },
  pt: {
    origin: 'Origem do pedido inválida.',
    rate: 'Demasiadas tentativas. Tente novamente dentro de alguns minutos.',
    invalid: 'Pedido inválido.',
    blocked: 'Não foi possível processar este pedido.',
    tooFast: 'Preencha o formulário com calma e tente novamente.',
    down: 'De momento não conseguimos receber pedidos. Tente mais tarde ou escreva para contact@elevaops.com.',
    failed: 'Não conseguimos registar o seu pedido. Tente novamente dentro de momentos.',
  },
} as const;

function fail(status: number, error: string, field?: string) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

export async function POST(request: Request) {
  // Only accept submissions coming from this site.
  if (isForeignOrigin(request)) return fail(403, ERRORS.en.origin);
  if (isRateLimited(request)) return fail(429, ERRORS.en.rate);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, ERRORS.en.invalid);
  }
  const e = ERRORS[leadLanguage(body)];

  // Honeypot: a field hidden from people. Pretend it worked so bots don't adapt,
  // but don't record anything (and never return a download for it).
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: false, error: e.blocked }, { status: 400 });
  }

  if (isTooFast(body)) return fail(400, e.tooFast);

  const result = validateLead(body);
  if (!result.ok) return fail(422, result.error, result.field);
  const { firstName, email, companyName, phone, marketingConsent, language, guideId, tracking } = result.lead;
  const guide = getEdition(guideId, language).edition;
  // Optional box on some guide forms: also join the LegalOps waitlist.
  const joinWaitlist = body.waitlist === true;
  const consentAt = new Date().toISOString();

  const client = getResend();
  const sheetEnabled = isSheetConfigured();
  if (!client && !sheetEnabled) {
    console.error('[guide-lead] Neither the Google Sheet nor RESEND_API_KEY is configured: lead was NOT recorded.');
    return fail(503, e.down);
  }

  // Id the client can reuse as an event id (e.g. for Pixel / Conversions API deduplication).
  const leadId = crypto.randomUUID();

  async function sendEmail() {
    if (!client) return false;
    const trackingRows = Object.entries(tracking)
      .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
      .join('');
    try {
      const { error } = await withResendRetry(() => client.emails.send({
        from: EMAIL_FROM,
        to: TEAM_INBOX,
        replyTo: email,
        subject: `New guide lead: ${firstName.replace(/[\r\n]+/g, ' ')} (${guide.title})`,
        html: `
          <h2>New lead: ${escapeHtml(guide.title)}</h2>
          <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company:</strong> ${companyName ? escapeHtml(companyName) : '—'}</p>
          <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : '—'}</p>
          <p><strong>Language:</strong> ${language === 'pt' ? 'Português' : 'English'}</p>
          <p><strong>Marketing consent:</strong> ${marketingConsent ? 'Yes, opted in' : 'No'}</p>
          <p><strong>LegalOps waitlist:</strong> ${joinWaitlist ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          <p><strong>Lead id:</strong> ${leadId}</p>
          ${trackingRows ? `<p><strong>Attribution</strong></p><table>${trackingRows}</table>` : '<p><strong>Attribution:</strong> none (direct visit)</p>'}
        `,
      }, { idempotencyKey: 'guide-notification/' + leadId }));
      if (error) {
        console.error('[guide-lead] Resend rejected the email:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('[guide-lead] Failed to send lead email:', err);
      return false;
    }
  }

  // The sheet is the leads table; the email is a notification. The lead counts as recorded
  // (and the download is unlocked) only if at least one of them actually stored it.
  const [savedToSheet, emailed] = await Promise.all([
    sheetEnabled
      ? appendLeadToSheet({ leadId, firstName, email, companyName, phone, marketingConsent, language: language === 'pt' ? 'PT' : 'EN', guide: CATALOG[guideId].name + (joinWaitlist ? ' + Waitlist LegalOps' : ''), waitlistConsentAt: joinWaitlist ? consentAt : '', newsletterConsentAt: marketingConsent ? consentAt : '', ...tracking })
      : Promise.resolve(false),
    sendEmail(),
  ]);
  if (sheetEnabled && !savedToSheet) console.error(`[guide-lead] Lead ${leadId} was not saved to the sheet${emailed ? ' (email sent)' : ''}.`);
  if (!savedToSheet && !emailed) {
    return fail(502, e.failed);
  }

  // Copy of the guide in their inbox, so it isn't lost if they close the page. A failure here
  // doesn't block the on-screen download.
  // Waitlist first (waitlist segment only); the newsletter keeps its own flow and welcome email.
  const waitlist = joinWaitlist
    ? await saveWaitlistContact({ name: firstName, email, phone, office: companyName, role: '', teamSize: '', newsletter: false, tracking })
    : null;
  // With the waitlist box, the waitlist email (A, or B when the newsletter box is ticked too)
  // replaces the newsletter welcome, so nobody gets three emails at once.
  const newsletter = await subscribeToNewsletter(result.lead, { welcome: !joinWaitlist });
  const unsubscribeUrl = newsletter?.unsubscribeUrl ?? waitlist?.unsubscribeUrl;
  const delivered = await sendGuideToLead(email, firstName, language, guideId, leadId, unsubscribeUrl);
  if (joinWaitlist) await sendWaitlistEmail(email, firstName, marketingConsent, unsubscribeUrl);

  return NextResponse.json({ ok: true, leadId, download: guide.pdf, emailed: delivered, guide: CATALOG[guideId].name, newsletter: newsletter ? { subscribed: newsletter.subscribed, welcomed: newsletter.welcomed } : null });
}
