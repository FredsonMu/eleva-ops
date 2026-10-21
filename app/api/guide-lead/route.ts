import { NextResponse } from 'next/server';
import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getResend } from '@/lib/email';
import { GUIDES, leadLanguage, validateLead } from '@/lib/guide';
import { appendLeadToSheet, isSheetConfigured } from '@/lib/leads-sheet';
import { sendGuideToLead } from '@/lib/guide-email';

// Registers a lead for the "7 AI Agents" guide: appends it to the leads Google Sheet and
// emails a notification to the team inbox through Resend. The client only unlocks the
// download when this route answers `ok: true`, i.e. after the lead was actually stored —
// nothing is faked when the services aren't configured.

// Anti-spam: forms filled faster than this are almost certainly bots.
const MIN_FILL_MS = 2500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

// Best-effort per-IP rate limit. In-memory, so it resets on cold starts and isn't shared
// between serverless instances; it only blunts bursts from a single client.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

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
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return fail(403, ERRORS.en.origin);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return fail(429, ERRORS.en.rate);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, ERRORS.en.invalid);
  }
  const e = ERRORS[leadLanguage(body)];

  // Honeypot: a field hidden from people. Pretend it worked so bots don't adapt,
  // but don't record anything (and never return a download for it).
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: false, error: e.blocked }, { status: 400 });
  }

  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return fail(400, e.tooFast);
  }

  const result = validateLead(body);
  if (!result.ok) return fail(422, result.error, result.field);
  const { firstName, email, companyName, phone, marketingConsent, language, tracking } = result.lead;
  const guide = GUIDES[language];

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
      const { error } = await client.emails.send({
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
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          <p><strong>Lead id:</strong> ${leadId}</p>
          ${trackingRows ? `<p><strong>Attribution</strong></p><table>${trackingRows}</table>` : '<p><strong>Attribution:</strong> none (direct visit)</p>'}
        `,
      });
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
      ? appendLeadToSheet({ leadId, firstName, email, companyName, phone, marketingConsent, language: language === 'pt' ? 'PT' : 'EN', ...tracking })
      : Promise.resolve(false),
    sendEmail(),
  ]);
  if (sheetEnabled && !savedToSheet) console.error(`[guide-lead] Lead ${leadId} was not saved to the sheet${emailed ? ' (email sent)' : ''}.`);
  if (!savedToSheet && !emailed) {
    return fail(502, e.failed);
  }

  // Copy of the guide in their inbox, so it isn't lost if they close the page. A failure here
  // doesn't block the on-screen download.
  const delivered = await sendGuideToLead(email, firstName, language);

  return NextResponse.json({ ok: true, leadId, download: guide.pdf, emailed: delivered });
}
