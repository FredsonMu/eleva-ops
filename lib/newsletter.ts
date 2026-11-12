import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getNewsletterResend, getResend, withResendRetry } from './email';
import { getEdition, type GuideId, type GuideLang, type LeadInput } from './guide';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elevaops.com').replace(/\/$/, '');
export type NewsletterResult = { subscribed: boolean; welcomed: boolean; unsubscribeUrl?: string };

function signingKey() {
  return process.env.NEWSLETTER_UNSUBSCRIBE_SECRET || process.env.RESEND_NEWSLETTER_API_KEY || process.env.RESEND_API_KEY;
}

export function createUnsubscribeToken(contactId: string, language: GuideLang) {
  const key = signingKey();
  if (!key) throw new Error('Newsletter signing key is not configured.');
  const payload = contactId + '.' + language;
  return payload + '.' + createHmac('sha256', key).update(payload).digest('base64url');
}

export function verifyUnsubscribeToken(token: string): { contactId: string; language: GuideLang } | null {
  const key = signingKey();
  if (!key || token.length > 160) return null;
  const match = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(pt|en)\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return null;
  const [, contactId, language, signature] = match;
  const expected = createHmac('sha256', key).update(contactId + '.' + language).digest();
  const actual = Buffer.from(signature, 'base64url');
  return actual.length === expected.length && timingSafeEqual(actual, expected)
    ? { contactId, language: language as GuideLang } : null;
}

export function buildNewsletterWelcome(firstName: string, language: GuideLang, guideId: GuideId, unsubscribeUrl: string) {
  const { edition, lang } = getEdition(guideId, language);
  const legal = guideId === 'manual-prazos' || guideId === 'ai-lawyers';
  const c = lang === 'pt' ? {
    subject: 'Bem-vindo à newsletter da ElevaOps',
    hello: 'Olá, ' + firstName + '.',
    title: 'A sua inscrição está confirmada.',
    thanks: 'Obrigado por se juntar à newsletter da ElevaOps.',
    expectation: legal
      ? 'Vai receber conteúdos práticos para organizar o trabalho do seu escritório de advogados e novidades sobre o LegalOps, a plataforma que estamos a construir para reunir prazos, documentos e equipa.'
      : 'Vai receber conteúdos práticos sobre organização do trabalho, automação e inteligência artificial, e novidades da ElevaOps.',
    question: legal ? 'Qual é hoje a maior dificuldade no controlo de prazos do seu escritório?' : 'Que tarefa repetitiva gostaria de simplificar na sua empresa?',
    reply: 'Responda a este email com uma frase. Leio todas as respostas.',
    download: guideId === 'manual-prazos' ? 'Voltar a descarregar o manual' : 'Voltar a descarregar o guia',
    reason: 'Recebe este email porque aceitou receber a newsletter ao pedir um conteúdo gratuito da ElevaOps.',
    unsubscribe: 'Cancelar a subscrição', privacy: 'Política de Privacidade',
  } : {
    subject: 'Welcome to the ElevaOps newsletter',
    hello: 'Hello, ' + firstName + '.',
    title: 'Your subscription is confirmed.',
    thanks: 'Thank you for joining the ElevaOps newsletter.',
    expectation: 'You will receive practical ideas about organising work, automation and AI, along with news from ElevaOps.',
    question: 'Which repetitive task would you like to simplify in your business?',
    reply: 'Reply to this email with a sentence. I read every response.',
    download: 'Download your guide again',
    reason: 'You received this email because you opted in to the newsletter when requesting free content from ElevaOps.',
    unsubscribe: 'Unsubscribe', privacy: 'Privacy Policy',
  };
  const pdfUrl = SITE + edition.pdf;
  const paragraph = (value: string) => '<p style="font-size:16px;line-height:1.6;color:#5f5f66;">' + escapeHtml(value) + '</p>';
  const html = [
    '<!doctype html><html lang="' + (lang === 'pt' ? 'pt-PT' : 'en') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + c.subject + '</title></head>',
    '<body style="margin:0;background:#f5f5f7;color:#1d1d1f;font-family:Arial,Helvetica,sans-serif;">',
    '<div style="display:none;max-height:0;overflow:hidden;">' + c.title + '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">',
    '<tr><td style="padding:0 8px 24px;"><a href="' + SITE + '"><img src="' + SITE + '/email/wordmark.png" alt="ELEVAOPS" width="150" style="display:block;border:0;width:150px;height:auto;"></a></td></tr>',
    '<tr><td style="background:white;border-radius:24px;padding:32px 24px;">',
    '<p style="color:#0066cc;font-size:12px;font-weight:bold;letter-spacing:2px;">NEWSLETTER ELEVAOPS</p>',
    '<h1 style="font-size:28px;line-height:1.2;">' + escapeHtml(c.hello) + '</h1>',
    '<p style="font-size:18px;font-weight:bold;">' + c.title + '</p>',
    paragraph(c.thanks), paragraph(c.expectation),
    '<p style="margin-top:28px;font-size:17px;font-weight:bold;">' + c.question + '</p>',
    paragraph(c.reply), paragraph('Fredson, ElevaOps'),
    '<p style="margin-top:28px;"><a href="' + pdfUrl + '" style="color:#0066cc;font-weight:bold;">' + c.download + ' →</a></p>',
    '</td></tr><tr><td style="padding:24px 8px 0;color:#6e6e73;font-size:12px;line-height:1.7;">',
    c.reason + '<br><a href="' + escapeHtml(unsubscribeUrl) + '" style="color:#5f5f66;">' + c.unsubscribe + '</a>',
    ' · <a href="' + SITE + '/privacy-policy" style="color:#5f5f66;">' + c.privacy + '</a>',
    ' · <a href="mailto:' + TEAM_INBOX + '" style="color:#5f5f66;">' + TEAM_INBOX + '</a>',
    '</td></tr></table></td></tr></table></body></html>',
  ].join('\n');
  const text = [c.hello, c.title, '', c.thanks, c.expectation, '', c.question, c.reply, '', 'Fredson, ElevaOps', '', c.download + ': ' + pdfUrl, '', c.reason, c.unsubscribe + ': ' + unsubscribeUrl, c.privacy + ': ' + SITE + '/privacy-policy'].join('\n');
  return { subject: c.subject, html, text };
}

// Delivery of the requested PDF stays independent from newsletter registration.
export async function subscribeToNewsletter(lead: Pick<LeadInput, 'firstName' | 'email' | 'language' | 'guideId' | 'marketingConsent'>): Promise<NewsletterResult | null> {
  if (!lead.marketingConsent) return null;
  const contacts = getNewsletterResend(), sender = getResend();
  if (!contacts || !sender) return { subscribed: false, welcomed: false };
  let subscribed = false;
  let unsubscribeUrl: string | undefined;
  try {
    const existing = await withResendRetry(() => contacts.contacts.get({ email: lead.email }));
    if (existing.error && existing.error.statusCode !== 404 && existing.error.name !== 'not_found') {
      console.error('[newsletter] Could not check subscription:', existing.error);
      return { subscribed: false, welcomed: false };
    }
    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    const contact = existing.data
      ? await withResendRetry(() => contacts.contacts.update({ id: existing.data!.id, firstName: lead.firstName, unsubscribed: false }))
      : await withResendRetry(() => contacts.contacts.create({ email: lead.email, firstName: lead.firstName, unsubscribed: false, ...(segmentId ? { segments: [{ id: segmentId }] } : {}) }));
    if (contact.error || !contact.data) {
      console.error('[newsletter] Could not save subscription:', contact.error);
      return { subscribed: false, welcomed: false };
    }
    if (segmentId && existing.data) {
      const segment = await withResendRetry(() => contacts.contacts.segments.add({ contactId: contact.data!.id, segmentId }));
      if (segment.error) {
        console.error('[newsletter] Could not add subscriber to segment:', segment.error);
        return { subscribed: false, welcomed: false };
      }
    }
    subscribed = true;
    const token = createUnsubscribeToken(contact.data.id, lead.language);
    unsubscribeUrl = SITE + '/newsletter/unsubscribe?token=' + token;
    const message = buildNewsletterWelcome(lead.firstName, lead.language, lead.guideId, unsubscribeUrl);
    // Resend suppresses retries and identical repeat welcomes for 24 hours.
    const contentKey = createHash('sha256').update(message.html).digest('hex').slice(0, 24);
    const result = await withResendRetry(() => sender.emails.send({
      from: EMAIL_FROM, to: lead.email, replyTo: TEAM_INBOX, ...message,
      headers: { 'List-Unsubscribe': '<' + unsubscribeUrl + '>', 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      tags: [{ name: 'category', value: 'newsletter-welcome' }],
    }, { idempotencyKey: 'newsletter-welcome/' + contact.data!.id + '/' + contentKey }));
    if (result.error) console.error('[newsletter] Welcome email failed:', result.error);
    return { subscribed, welcomed: !result.error, unsubscribeUrl };
  } catch (error) {
    console.error('[newsletter] Subscription failed:', error);
    return { subscribed, welcomed: false, ...(unsubscribeUrl ? { unsubscribeUrl } : {}) };
  }
}
