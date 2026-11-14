import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { EMAIL_FROM, TEAM_INBOX, getResend, withResendRetry } from '@/lib/email';
import { appendLeadToSheet, isSheetConfigured } from '@/lib/leads-sheet';
import { isForeignOrigin, isHoneypotFilled, isRateLimited, isTooFast } from '@/lib/lead-guard';
import { buildTeamEmail, saveWaitlistContact, sendWaitlistEmail, validateWaitlist } from '@/lib/waitlist';

export const maxDuration = 60;

// LegalOps waitlist sign-up (/legalops). Stores the person in Resend (waitlist segment, plus the
// existing newsletter segment when they ticked it), writes a row to the leads sheet, emails the
// team (C) and sends the person email A or B. The same email can't sign up twice: a contact
// already on the waitlist gets the success message without new emails or rows.

const E = {
  origin: 'Origem do pedido inválida.',
  rate: 'Demasiadas tentativas. Tente novamente dentro de alguns minutos.',
  invalid: 'Pedido inválido.',
  blocked: 'Não foi possível processar este pedido.',
  tooFast: 'Preencha o formulário com calma e tente novamente.',
  down: 'De momento não conseguimos receber inscrições. Tente mais tarde ou escreva para contact@elevaops.com.',
  failed: 'Não conseguimos guardar a sua inscrição. Tente novamente dentro de momentos.',
} as const;

// Second line of defence against double submits, also when Resend segments aren't configured.
const RECENT_MS = 30 * 60 * 1000;
const recent = new Map<string, number>();
function seenRecently(email: string) {
  const now = Date.now();
  for (const [key, at] of recent) if (now - at > RECENT_MS) recent.delete(key);
  return recent.has(email);
}

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

  const result = validateWaitlist(body);
  if (!result.ok) return fail(422, result.error, result.field);
  const signup = result.signup;

  if (seenRecently(signup.email)) return NextResponse.json({ ok: true, duplicate: true });

  const sender = getResend();
  const sheetEnabled = isSheetConfigured();
  if (!sender && !sheetEnabled) {
    console.error('[waitlist] Neither the Google Sheet nor RESEND_API_KEY is configured: sign-up was NOT recorded.');
    return fail(503, E.down);
  }

  const contact = await saveWaitlistContact(signup);
  if (contact.duplicate) {
    recent.set(signup.email, Date.now());
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const now = new Date();
  const at = now.toISOString();
  const leadId = crypto.randomUUID();
  const emailKey = createHash('sha256').update(signup.email).digest('hex').slice(0, 24);

  async function notifyTeam() {
    if (!sender) return false;
    try {
      const { error } = await withResendRetry(() => sender.emails.send({ from: EMAIL_FROM, ...buildTeamEmail(signup, now), to: TEAM_INBOX, replyTo: signup.email }, { idempotencyKey: 'waitlist-team/' + emailKey }));
      if (error) console.error('[waitlist] Resend rejected the team email:', error);
      return !error;
    } catch (err) {
      console.error('[waitlist] Failed to send the team email:', err);
      return false;
    }
  }

  const [savedToSheet, notified, confirmed] = await Promise.all([
    sheetEnabled
      ? appendLeadToSheet({
        leadId, firstName: signup.name, email: signup.email, phone: signup.phone, companyName: signup.office, role: signup.role, teamSize: signup.teamSize,
        marketingConsent: signup.newsletter, waitlistConsentAt: at, newsletterConsentAt: signup.newsletter ? at : '',
        language: 'PT', guide: 'Waitlist LegalOps', ...signup.tracking,
      })
      : Promise.resolve(false),
    notifyTeam(),
    sendWaitlistEmail(signup.email, signup.name, signup.newsletter, contact.unsubscribeUrl),
  ]);

  if (!savedToSheet && !notified && !contact.saved) return fail(502, E.failed);
  if (sheetEnabled && !savedToSheet) console.error(`[waitlist] Sign-up ${leadId} was not saved to the sheet.`);
  recent.set(signup.email, Date.now());

  return NextResponse.json({ ok: true, leadId, emailed: confirmed });
}
