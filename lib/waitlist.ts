import { createHash } from 'node:crypto';
import { EMAIL_FROM, escapeHtml, getNewsletterResend, getResend, TEAM_INBOX, withResendRetry } from './email';
import { EMAIL_RE, isValidPhone, LIMITS, TRACKING_PARAMS, type Tracking } from './guide';
import { createUnsubscribeToken, SITE } from './newsletter';

// LegalOps waitlist (/legalops). Two separate consents:
// - waitlist (required): product news and launch notice. Resend segment RESEND_WAITLIST_SEGMENT_ID.
// - newsletter (optional): the existing ElevaOps newsletter, same segment as the guide forms
//   (RESEND_NEWSLETTER_SEGMENT_ID). No second newsletter list.
// One email to the person (A: waitlist, B: waitlist + newsletter) and one to the team (C).

import { ROLES, TEAM_SIZES } from './waitlist-options';

export type WaitlistSignup = {
  name: string;
  email: string;
  phone: string;
  office: string;
  role: string;
  teamSize: string;
  newsletter: boolean;
  tracking: Tracking;
};

export type WaitlistValidation =
  | { ok: true; signup: WaitlistSignup }
  | { ok: false; field?: 'name' | 'email' | 'phone' | 'waitlistConsent'; error: string };

const oneLine = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '');

export function validateWaitlist(body: unknown): WaitlistValidation {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Pedido inválido.' };
  const data = body as Record<string, unknown>;

  const name = typeof data.name === 'string' ? data.name.trim().replace(/\s+/g, ' ') : '';
  if (!name) return { ok: false, field: 'name', error: 'Introduza o seu nome.' };
  if (name.length > LIMITS.firstName) return { ok: false, field: 'name', error: 'O nome é demasiado longo.' };

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email) return { ok: false, field: 'email', error: 'Introduza o seu e-mail.' };
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return { ok: false, field: 'email', error: 'Introduza um e-mail válido.' };

  const phone = typeof data.phone === 'string' ? data.phone.trim().replace(/\s+/g, ' ') : '';
  if (!phone) return { ok: false, field: 'phone', error: 'Introduza o seu número de telemóvel.' };
  if (!isValidPhone(phone)) return { ok: false, field: 'phone', error: 'Introduza um número de telemóvel válido.' };

  if (data.waitlistConsent !== true) {
    return { ok: false, field: 'waitlistConsent', error: 'Para entrar na waitlist, marque a caixa de consentimento.' };
  }

  const role = (ROLES as readonly string[]).includes(data.role as string) ? (data.role as string) : '';
  const teamSize = (TEAM_SIZES as readonly string[]).includes(data.teamSize as string) ? (data.teamSize as string) : '';

  const tracking: Tracking = {};
  const raw = data.tracking && typeof data.tracking === 'object' ? (data.tracking as Record<string, unknown>) : {};
  for (const key of TRACKING_PARAMS) {
    const value = oneLine(raw[key], LIMITS.tracking);
    if (value) tracking[key] = value;
  }

  return {
    ok: true,
    signup: { name, email, phone, office: oneLine(data.office, LIMITS.companyName), role, teamSize, newsletter: data.newsletter === true, tracking },
  };
}

export const firstNameOf = (name: string) => name.split(' ')[0];

// ── Resend contacts ────────────────────────────────────────────────────────────────────────

export type WaitlistContact = {
  /** Already on the waitlist: nothing is sent again. */
  duplicate: boolean;
  /** The contact is stored in Resend (so the unsubscribe link works). */
  saved: boolean;
  unsubscribeUrl?: string;
};

export async function saveWaitlistContact(signup: WaitlistSignup): Promise<WaitlistContact> {
  const client = getNewsletterResend();
  const waitlistSegment = process.env.RESEND_WAITLIST_SEGMENT_ID;
  const newsletterSegment = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!client) return { duplicate: false, saved: false };
  const wanted = [waitlistSegment, signup.newsletter ? newsletterSegment : undefined].filter((id): id is string => Boolean(id));

  try {
    const existing = await withResendRetry(() => client.contacts.get({ email: signup.email }));
    if (existing.error && existing.error.statusCode !== 404 && existing.error.name !== 'not_found') {
      console.error('[waitlist] Could not look up the contact:', existing.error);
      return { duplicate: false, saved: false };
    }

    let contactId: string;
    if (existing.data) {
      contactId = existing.data.id;
      const current = await withResendRetry(() => client.contacts.segments.list({ contactId }));
      const ids = new Set((current.data?.data ?? []).map(s => s.id));
      const duplicate = Boolean(waitlistSegment && ids.has(waitlistSegment));
      // Re-subscribe only on a new sign-up (both boxes are explicit consents).
      if (!duplicate) {
        const updated = await withResendRetry(() => client.contacts.update({ id: contactId, firstName: firstNameOf(signup.name), unsubscribed: false }));
        if (updated.error) {
          console.error('[waitlist] Could not update the contact:', updated.error);
          return { duplicate: false, saved: false };
        }
      }
      for (const segmentId of wanted) {
        if (ids.has(segmentId)) continue;
        const added = await withResendRetry(() => client.contacts.segments.add({ contactId, segmentId }));
        if (added.error) console.error('[waitlist] Could not add the contact to a segment:', added.error);
      }
      if (duplicate) return { duplicate: true, saved: true };
    } else {
      // Without a waitlist segment, a waitlist-only contact would sit among the newsletter's
      // contacts (when the newsletter has no segment either). Don't create it then.
      if (!waitlistSegment && !(signup.newsletter && newsletterSegment)) {
        console.error('[waitlist] RESEND_WAITLIST_SEGMENT_ID is not set: contact not stored in Resend.');
        return { duplicate: false, saved: false };
      }
      const created = await withResendRetry(() => client.contacts.create({
        email: signup.email, firstName: firstNameOf(signup.name), unsubscribed: false,
        ...(wanted.length ? { segments: wanted.map(id => ({ id })) } : {}),
      }));
      if (created.error || !created.data) {
        console.error('[waitlist] Could not create the contact:', created.error);
        return { duplicate: false, saved: false };
      }
      contactId = created.data.id;
    }

    return { duplicate: false, saved: true, unsubscribeUrl: SITE + '/newsletter/unsubscribe?token=' + createUnsubscribeToken(contactId, 'pt') };
  } catch (error) {
    console.error('[waitlist] Contact registration failed:', error);
    return { duplicate: false, saved: false };
  }
}

// ── Emails ─────────────────────────────────────────────────────────────────────────────────

const NAVY = '#182848', BLUE = '#3355FF', SKY = '#88B8F0', IVORY = '#FAF8F3', GREY = '#4B5468';
const FONT = "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

/** Emails A (waitlist) and B (waitlist + newsletter) for the person who signed up. */
export function buildWaitlistEmail(name: string, newsletter: boolean, unsubscribeUrl?: string) {
  const first = firstNameOf(name);
  const subject = newsletter ? 'Está na waitlist do LegalOps (e na nossa newsletter)' : 'Está na waitlist do LegalOps';
  const items = [
    'Novidades sobre o desenvolvimento do LegalOps',
    'Aviso em primeira mão quando abrirmos',
    'De vez em quando, ideias práticas para organizar o escritório',
  ];
  const intro = 'Estamos a criar uma plataforma para ajudar os escritórios de advogados a organizar o trabalho da equipa: processos, tarefas, prazos e documentos num só sítio, para que todos saibam o que está com quem.';
  const newsletterNote = 'Como também escolheu a newsletter da ElevaOps, vai receber todas as semanas conteúdos práticos sobre automação e soluções digitais para escritórios e negócios: ferramentas, exemplos e ideias que pode aplicar no dia a dia.';
  const question = 'Uma pergunta rápida: qual é hoje a maior dificuldade na gestão do seu escritório? Responda a este e-mail — lemos todas as respostas e estão a ajudar-nos a construir o LegalOps.';
  // Without a stored contact there is no list to leave; replying works instead.
  const cancelUrl = unsubscribeUrl ?? 'mailto:' + TEAM_INBOX + '?subject=' + encodeURIComponent('Cancelar subscrição LegalOps');

  const p = (text: string, extra = '') => `<p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:${GREY};${extra}">${text}</p>`;
  const list = items.map(item =>
    `<tr><td width="22" valign="top" style="width:22px;padding:6px 0;"><span style="display:inline-block;width:7px;height:7px;margin-top:9px;border-radius:7px;background:${BLUE};"></span></td>`
    + `<td style="padding:6px 0;font-size:16px;line-height:1.6;color:${NAVY};">${item}</td></tr>`).join('');

  const html = [
    '<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">',
    `<title>${subject}</title>`,
    '<style>@media screen and (max-width:480px){.wl-outer{padding:16px 10px!important}.wl-body{padding:28px 22px!important}.wl-head{padding:26px 22px!important}}</style>',
    `</head><body style="margin:0;padding:0;background:${IVORY};-webkit-text-size-adjust:100%;">`,
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Obrigado por se juntar à waitlist do LegalOps.</div>`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${IVORY}"><tr>`,
    `<td align="center" class="wl-outer" style="padding:36px 16px;font-family:${FONT};">`,
    '<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">',
    `<tr><td bgcolor="#ffffff" style="background:#ffffff;border-radius:20px;border:1px solid #ECE8DF;overflow:hidden;">`,
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">',
    `<tr><td class="wl-head" style="padding:30px 40px 26px;border-bottom:1px solid #EEF0F5;">`,
    `<img src="${SITE}/email/legalops-logo.png" width="160" height="42" alt="LegalOps" style="display:block;width:160px;height:auto;border:0;">`,
    '</td></tr>',
    `<tr><td class="wl-body" style="padding:34px 40px 36px;">`,
    `<h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;letter-spacing:-0.5px;font-weight:600;color:${NAVY};">Olá ${escapeHtml(first)},</h1>`,
    p('Obrigado por se juntar à waitlist do LegalOps.', `color:${NAVY};font-weight:600;`),
    p(intro),
    `<p style="margin:26px 0 8px;font-size:16px;line-height:1.5;font-weight:600;color:${NAVY};">O que vai receber a partir de agora:</p>`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">${list}</table>`,
    newsletter ? p(newsletterNote) : '',
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 26px;"><tr>`,
    `<td bgcolor="#F1F6FD" style="padding:20px 22px;border-left:3px solid ${SKY};border-radius:0 12px 12px 0;font-size:16px;line-height:1.65;color:${NAVY};">${question}</td></tr></table>`,
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${GREY};">Até breve,</p>`,
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>',
    `<td width="48" valign="middle" style="width:48px;"><img src="${SITE}/email/fredson.jpg" width="48" height="48" alt="Fredson" style="display:block;width:48px;height:48px;border:0;border-radius:48px;"></td>`,
    `<td valign="middle" style="padding-left:14px;"><p style="margin:0;font-size:15px;line-height:1.4;font-weight:600;color:${NAVY};">Fredson, equipa ElevaOps</p>`,
    `<p style="margin:2px 0 0;font-size:14px;line-height:1.4;"><a href="${SITE}" style="color:${BLUE};text-decoration:none;">elevaops.com</a></p></td>`,
    '</tr></table>',
    '</td></tr></table></td></tr>',
    `<tr><td align="center" style="padding:24px 16px 0;font-size:12px;line-height:1.75;color:#7A8194;">`,
    `<p style="margin:0;">Recebe este e-mail porque se inscreveu na waitlist do LegalOps em elevaops.com.</p>`,
    `<p style="margin:12px 0 0;"><a href="${escapeHtml(cancelUrl)}" style="color:${BLUE};font-size:14px;font-weight:600;text-decoration:underline;">Cancelar subscrição</a></p>`,
    `<p style="margin:12px 0 0;">LegalOps é um produto ElevaOps · <a href="${SITE}/privacy-policy" style="color:#7A8194;text-decoration:underline;">Política de Privacidade</a></p>`,
    '</td></tr></table><!--[if mso]></td></tr></table><![endif]-->',
    '</td></tr></table></body></html>',
  ].join('\n');

  const text = [
    `Olá ${first},`, '',
    'Obrigado por se juntar à waitlist do LegalOps.', '',
    intro, '',
    'O que vai receber a partir de agora:',
    ...items.map(item => '· ' + item), '',
    ...(newsletter ? [newsletterNote, ''] : []),
    question, '',
    'Até breve,', 'Fredson, equipa ElevaOps', 'elevaops.com', '',
    'Cancelar subscrição: ' + cancelUrl,
  ].join('\n');

  return { subject, html, text };
}

/** Sends email A or B to the person (from /legalops, or the waitlist box on a guide form). */
export async function sendWaitlistEmail(to: string, name: string, newsletter: boolean, unsubscribeUrl?: string): Promise<boolean> {
  const sender = getResend();
  if (!sender) return false;
  try {
    const key = createHash('sha256').update(to).digest('hex').slice(0, 24);
    const { error } = await withResendRetry(() => sender.emails.send({
      from: EMAIL_FROM, to, replyTo: TEAM_INBOX, ...buildWaitlistEmail(name, newsletter, unsubscribeUrl),
      ...(unsubscribeUrl ? { headers: { 'List-Unsubscribe': '<' + unsubscribeUrl + '>', 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } } : {}),
      tags: [{ name: 'category', value: 'legalops-waitlist' }],
    }, { idempotencyKey: 'waitlist-person/' + key }));
    if (error) console.error('[waitlist] Resend rejected the waitlist email:', error);
    return !error;
  } catch (err) {
    console.error('[waitlist] Failed to send the waitlist email:', err);
    return false;
  }
}

/** Email C, to the team inbox. */
export function buildTeamEmail(signup: WaitlistSignup, at: Date) {
  const date = at.toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon', dateStyle: 'short', timeStyle: 'short' });
  const origin = [signup.tracking.utm_source, signup.tracking.utm_campaign].filter(Boolean).join(' / ') || 'Direto (sem UTM)';
  const rows: [string, string][] = [
    ['Nome', signup.name],
    ['E-mail', signup.email],
    ['Telefone', signup.phone || '—'],
    ['Escritório', signup.office || '—'],
    ['Função', signup.role || '—'],
    ['Equipa', signup.teamSize || '—'],
    ['Newsletter', signup.newsletter ? 'Sim' : 'Não'],
    ['Origem', origin],
    ['Data', date],
  ];
  return {
    subject: 'Nova inscrição — Waitlist LegalOps' + (signup.newsletter ? ' + Newsletter' : ''),
    html: '<p>Nova inscrição na waitlist do LegalOps.</p>'
      + rows.map(([k, v]) => `<p style="margin:4px 0"><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join(''),
    text: ['Nova inscrição na waitlist do LegalOps.', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n'),
  };
}
