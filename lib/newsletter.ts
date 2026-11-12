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
    confirmed: 'Inscrição confirmada',
    thanks: 'É bom ter a sua companhia.',
    intro: legal
      ? 'Obrigado por se juntar à newsletter. Por aqui, vamos partilhar formas de organizar o trabalho do seu escritório, com tecnologia que faz sentido no dia a dia.'
      : 'Obrigado por se juntar à newsletter. Por aqui, ligamos tecnologia, produto e automação a formas mais simples de trabalhar.',
    inside: 'Ideias para levar para o dia a dia.',
    topics: legal ? [
      ['Organizar melhor.', 'Prazos, documentos e trabalho de equipa, com ideias práticas para o seu escritório.'],
      ['Simplificar o que se repete.', 'Automação e IA explicadas a partir de tarefas reais do dia a dia.'],
      ['Acompanhar o que vem aí.', 'Novidades do LegalOps e os próximos passos da plataforma que estamos a construir.'],
    ] : [
      ['Organizar melhor.', 'Ideias práticas para dar mais clareza aos processos e ao trabalho da equipa.'],
      ['Simplificar o que se repete.', 'Produto, automação e IA com aplicação no dia a dia do seu negócio.'],
      ['Acompanhar o que vem aí.', 'Novos guias, recursos e projetos que estamos a construir na ElevaOps.'],
    ],
    note: 'Uma conversa, também.',
    question: legal ? 'Qual é hoje a maior dificuldade no controlo de prazos do seu escritório?' : 'Que tarefa repetitiva gostaria de simplificar na sua empresa?',
    reply: 'Responda a este email com uma frase. Leio todas as respostas.',
    resource: guideId === 'manual-prazos' ? 'O seu manual continua aqui.' : 'O seu guia continua aqui.',
    download: 'Descarregar',
    reason: 'Recebe este email porque aceitou receber a newsletter ao pedir um conteúdo gratuito da ElevaOps.',
    unsubscribe: 'Cancelar subscrição', privacy: 'Política de Privacidade',
    bannerAlt: 'Bem-vindo à nossa newsletter. Ideias, novidades e conteúdos práticos sobre tecnologia, produto e automação.',
  } : {
    subject: 'Welcome to the ElevaOps newsletter',
    hello: 'Hello, ' + firstName + '.',
    title: 'Your subscription is confirmed.',
    confirmed: 'Subscription confirmed',
    thanks: 'Good to have you here.',
    intro: 'Thank you for joining the newsletter. Here, we connect technology, product and automation with simpler ways to work.',
    inside: 'Ideas you can put to work.',
    topics: [
      ['Organise better.', 'Practical ideas to bring more clarity to processes and teamwork.'],
      ['Simplify repetitive work.', 'Product, automation and AI with everyday uses in your business.'],
      ['See what is next.', 'New guides, resources and projects we are building at ElevaOps.'],
    ],
    note: 'A conversation, too.',
    question: 'Which repetitive task would you like to simplify in your business?',
    reply: 'Reply to this email with a sentence. I read every response.',
    resource: 'Your guide is still here.',
    download: 'Download PDF',
    reason: 'You received this email because you opted in to the newsletter when requesting free content from ElevaOps.',
    unsubscribe: 'Unsubscribe', privacy: 'Privacy Policy',
    bannerAlt: 'Welcome to the ElevaOps newsletter. Ideas, news and practical content about technology, product and automation.',
  };
  const pdfUrl = SITE + edition.pdf;
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";
  const topics = c.topics.map(([title, description], index) =>
    '<tr><td width="38" valign="top" style="width:38px;padding:16px 0;border-top:1px solid #f5f5f7;color:#007AFF;font:600 12px/22px ' + font + ';">0' + (index + 1) + '</td>'
    + '<td valign="top" style="padding:16px 0;border-top:1px solid #f5f5f7;">'
    + '<p style="margin:0;font-size:16px;line-height:1.5;font-weight:600;color:#1d1d1f;">' + escapeHtml(title) + '</p>'
    + '<p style="margin:5px 0 0;font-size:14px;line-height:1.65;color:#5f5f66;">' + escapeHtml(description) + '</p></td></tr>'
  ).join('\n');
  const html = [
    '<!doctype html><html lang="' + (lang === 'pt' ? 'pt-PT' : 'en') + '"><head>',
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">',
    '<title>' + c.subject + '</title>',
    '<style>@media screen and (max-width:480px){.email-outer{padding:16px 12px!important}.email-body{padding:28px 20px!important}.email-greeting{font-size:28px!important}.email-note{padding:22px 20px!important}.email-resource{padding:18px 16px!important}}</style>',
    '</head><body style="margin:0;padding:0;background:#f5f5f7;-webkit-text-size-adjust:100%;">',
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + c.title + '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f7"><tr>',
    '<td align="center" class="email-outer" style="padding:36px 16px;font-family:' + font + ';color:#1d1d1f;">',
    '<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">',
    '<tr><td bgcolor="#ffffff" style="background:#ffffff;border-radius:24px;overflow:hidden;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">',
    '<tr><td style="padding:0;font-size:0;line-height:0;">',
    '<img src="' + SITE + '/email/newsletter-welcome.jpg" width="600" height="300" alt="' + escapeHtml(c.bannerAlt) + '" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:24px 24px 0 0;">',
    '</td></tr>',
    '<tr><td class="email-body" style="padding:32px 36px 36px;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#eef4ff" style="padding:7px 12px;border-radius:999px;color:#0066cc;font-size:12px;line-height:18px;font-weight:600;">',
    '<span aria-hidden="true">✓</span>&nbsp; ' + c.confirmed + '</td></tr></table>',
    '<h1 class="email-greeting" style="margin:20px 0 0;font-size:32px;line-height:1.2;letter-spacing:-0.8px;font-weight:600;color:#1d1d1f;">' + escapeHtml(c.hello) + '</h1>',
    '<p style="margin:10px 0 0;font-size:18px;line-height:1.5;font-weight:600;color:#1d1d1f;">' + c.thanks + '</p>',
    '<p style="margin:16px 0 0;font-size:16px;line-height:1.75;color:#5f5f66;">' + escapeHtml(c.intro) + '</p>',
    '<h2 style="margin:32px 0 16px;font-size:20px;line-height:1.35;letter-spacing:-0.3px;font-weight:600;color:#1d1d1f;">' + c.inside + '</h2>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + topics + '</table>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;"><tr><td class="email-note" bgcolor="#eef4ff" style="padding:26px;border-radius:18px;">',
    '<p style="margin:0;color:#0066cc;font-size:12px;line-height:1.5;font-weight:600;">' + c.note + '</p>',
    '<p style="margin:10px 0 0;font-size:18px;line-height:1.45;letter-spacing:-0.2px;font-weight:600;color:#1d1d1f;">' + c.question + '</p>',
    '<p style="margin:12px 0 0;font-size:15px;line-height:1.65;color:#5f5f66;">' + c.reply + '</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;"><tr>',
    '<td width="38" height="38" align="center" valign="middle" bgcolor="#007AFF" style="width:38px;height:38px;border-radius:999px;color:#ffffff;font-size:17px;font-weight:600;">F</td>',
    '<td style="padding-left:12px;"><p style="margin:0;font-size:14px;line-height:1.5;font-weight:600;color:#1d1d1f;">Fredson</p>',
    '<p style="margin:0;font-size:12px;line-height:1.5;color:#5f5f66;">ElevaOps</p></td>',
    '</tr></table></td></tr></table>',
    '<p style="margin:30px 0 12px;font-size:14px;line-height:1.5;font-weight:600;color:#1d1d1f;">' + c.resource + '</p>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="email-resource" bgcolor="#f5f5f7" style="padding:20px;border-radius:18px;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>',
    '<td width="72" valign="middle" style="width:72px;"><a href="' + pdfUrl + '"><img src="' + SITE + edition.emailCover + '" width="72" alt="' + escapeHtml(edition.title) + '" style="display:block;width:72px;height:auto;border:0;border-radius:4px;"></a></td>',
    '<td valign="middle" style="padding-left:18px;">',
    '<p style="margin:0;font-size:15px;line-height:1.4;font-weight:600;color:#1d1d1f;">' + escapeHtml(edition.title) + '</p>',
    '<p style="margin:6px 0 12px;font-size:12px;line-height:1.5;color:#5f5f66;">' + edition.pdfInfo + '</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#007AFF" style="background:#007AFF;border-radius:999px;">',
    '<a href="' + pdfUrl + '" style="display:inline-block;padding:11px 16px;font-size:13px;line-height:18px;font-weight:600;color:#ffffff;text-decoration:none;">' + c.download + '&nbsp; →</a>',
    '</td></tr></table></td></tr></table></td></tr></table>',
    '</td></tr></table></td></tr>',
    '<tr><td align="center" style="padding:24px 16px 0;font-size:12px;line-height:1.75;color:#6e6e73;">',
    c.reason,
    '<p style="margin:14px 0 0;"><a href="' + escapeHtml(unsubscribeUrl) + '" style="color:#0066cc;font-size:14px;font-weight:600;text-decoration:underline;">' + c.unsubscribe + '</a></p>',
    '<p style="margin:12px 0 0;"><a href="' + SITE + '/privacy-policy" style="color:#6e6e73;text-decoration:underline;">' + c.privacy + '</a>',
    ' &nbsp;·&nbsp; <a href="mailto:' + TEAM_INBOX + '" style="color:#6e6e73;text-decoration:none;">' + TEAM_INBOX + '</a></p>',
    '</td></tr></table><!--[if mso]></td></tr></table><![endif]-->',
    '</td></tr></table></body></html>',
  ].join('\n');
  const text = [c.hello, c.title, '', c.thanks, c.intro, '', c.inside,
    ...c.topics.map(([title, description]) => '- ' + title + ' ' + description),
    '', c.question, c.reply, '', 'Fredson, ElevaOps', '',
    c.resource, edition.title + ' (' + edition.pdfInfo + ')', c.download + ': ' + pdfUrl,
    '', c.reason, c.unsubscribe + ': ' + unsubscribeUrl, c.privacy + ': ' + SITE + '/privacy-policy',
  ].join('\n');
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
