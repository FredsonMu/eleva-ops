import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getResend } from './email';
import { GUIDES, otherLang, type GuideLang } from './guide';

// Delivery email for the guide: sent to the person who requested it, right after the lead is
// recorded. It's transactional (they asked for it), so it carries no marketing content; replies
// go to the team inbox. Table layout + inline styles so it renders the same in Gmail, Outlook
// and Apple Mail; images are PNG/JPG on our domain (SVG and WebP aren't safe in email).

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.elevaops.com').replace(/\/$/, '');
const COPY = {
  en: {
    preheader: 'Your copy of the guide is ready to download.',
    label: 'Free guide · PDF',
    hello: (n: string) => `Here’s your guide, ${n}.`,
    thanks: (t: string) => `Thanks for requesting <strong style="color:#1d1d1f;font-weight:600;">${t}</strong>. It’s yours to keep: download it below, any time.`,
    button: 'Download the guide',
    inside: 'Inside, you’ll find',
    items: ['Seven practical AI agents, explained in plain words', 'Three complete workflows, from trigger to approval', 'A readiness check and a simple score to choose your first process'],
    other: 'Prefer Portuguese? <a href="{url}" style="color:#0066cc;">Download the Portuguese edition</a>.',
    helpTitle: 'Want help choosing your first agent?',
    helpBody: 'Reply to this email with one task your team repeats every week, or book a free diagnosis. No commitment, and we’ll tell you honestly if an agent is the right fit.',
    book: 'Book a free diagnosis',
    footer: 'You’re receiving this email because you requested this guide on {site}. It’s a one-time delivery, not a newsletter.',
    privacy: 'Privacy Policy',
    subject: (t: string) => `Your guide: ${t}`,
  },
  pt: {
    preheader: 'O seu guia está pronto a descarregar.',
    label: 'Guia gratuito · PDF',
    hello: (n: string) => `Aqui está o seu guia, ${n}.`,
    thanks: (t: string) => `Obrigado por pedir <strong style="color:#1d1d1f;font-weight:600;">${t}</strong>. É seu: pode descarregá-lo abaixo, quando quiser.`,
    button: 'Descarregar o guia',
    inside: 'No guia vai encontrar',
    items: ['Sete agentes de IA práticos, explicados de forma simples', 'Três fluxos de trabalho completos, do evento inicial à aprovação', 'Uma avaliação de preparação e uma pontuação simples para escolher o primeiro processo'],
    other: 'Prefere em inglês? <a href="{url}" style="color:#0066cc;">Descarregue a edição em inglês</a>.',
    helpTitle: 'Quer ajuda a escolher o primeiro agente?',
    helpBody: 'Responda a este email com uma tarefa que a sua equipa repete todas as semanas, ou marque um diagnóstico gratuito. Sem compromisso, e dizemos-lhe com honestidade se um agente faz sentido.',
    book: 'Agendar diagnóstico gratuito',
    footer: 'Recebe este email porque pediu este guia em {site}. É um envio único, não uma newsletter.',
    privacy: 'Política de Privacidade',
    subject: (t: string) => `O seu guia: ${t}`,
  },
} as const;

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";

export function buildGuideEmail(firstName: string, lang: GuideLang = 'en') {
  const c = COPY[lang];
  const guide = GUIDES[lang];
  const pdfUrl = `${SITE}${guide.pdf}`;
  const otherPdfUrl = `${SITE}${GUIDES[otherLang(lang)].pdf}`;
  const diagnosisUrl = `${SITE}/#contact`;
  const name = escapeHtml(firstName);
  const title = escapeHtml(guide.title);

  const html = `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-PT' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${c.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f7;">
  <tr><td align="center" style="padding:40px 16px;font-family:${FONT};color:#1d1d1f;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
      <!-- logo -->
      <tr><td style="padding:0 8px 24px;">
        <a href="${SITE}" style="text-decoration:none;"><img src="${SITE}/email/wordmark.png" width="150" height="16" alt="ELEVAOPS" style="display:block;border:0;width:150px;height:auto;"></a>
      </td></tr>

      <!-- card -->
      <tr><td style="background:#ffffff;border-radius:24px;overflow:hidden;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <!-- cover on a soft panel -->
          <tr><td align="center" style="background:#eef4ff;padding:40px 24px 0;">
            <img src="${SITE}${guide.emailCover}" width="180" alt="${title}" style="display:block;border:0;width:180px;height:auto;border-radius:6px 6px 0 0;box-shadow:0 20px 40px -12px rgba(0,40,120,0.35);">
          </td></tr>

          <tr><td style="padding:36px 36px 8px;">
            <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#0066cc;">${c.label}</p>
            <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:600;letter-spacing:-0.02em;color:#1d1d1f;">${c.hello(name)}</h1>
            <p style="margin:14px 0 0;font-size:16px;line-height:1.6;color:#5f5f66;">
              ${c.thanks(title)}
            </p>
          </td></tr>

          <!-- button -->
          <tr><td style="padding:24px 36px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td style="background:#007AFF;border-radius:999px;">
                <a href="${pdfUrl}" style="display:inline-block;padding:15px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${FONT};">${c.button}&nbsp;&nbsp;→</a>
              </td>
            </tr></table>
            <p style="margin:12px 0 0;font-size:13px;color:#8e8e93;">${guide.pdfInfo}</p>
          </td></tr>

          <!-- what's inside -->
          <tr><td style="padding:28px 36px 8px;">
            <p style="margin:0 0 10px;font-size:14px;font-weight:600;color:#1d1d1f;">${c.inside}</p>
            ${c.items
              .map(item => `<p style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#5f5f66;"><span style="color:#007AFF;font-weight:700;">✓</span>&nbsp;&nbsp;${item}</p>`)
              .join('')}
            <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:#8e8e93;">${c.other.replace('{url}', otherPdfUrl)}</p>
          </td></tr>

          <!-- next step: soft panel, like the website -->
          <tr><td style="padding:24px 24px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f7;border-radius:18px;">
              <tr><td style="padding:24px;">
                <p style="margin:0;font-size:17px;line-height:1.35;font-weight:600;color:#1d1d1f;">${c.helpTitle}</p>
                <p style="margin:8px 0 16px;font-size:15px;line-height:1.55;color:#5f5f66;">${c.helpBody}</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td style="background:#1d1d1f;border-radius:999px;">
                    <a href="${diagnosisUrl}" style="display:inline-block;padding:11px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${FONT};">${c.book}</a>
                  </td>
                </tr></table>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>

      <!-- footer -->
      <tr><td style="padding:24px 8px 0;font-size:12px;line-height:1.6;color:#8e8e93;">
        ${c.footer.replace('{site}', `<a href="${SITE}" style="color:#8e8e93;">elevaops.com</a>`)}
        <a href="${SITE}/privacy-policy" style="color:#8e8e93;">${c.privacy}</a>
      </td></tr>
    </table>

  </td></tr>
</table>
</body>
</html>`;

  const strip = (v: string) => v.replace(/<[^>]+>/g, '');
  const text = [
    c.hello(firstName),
    '',
    strip(c.thanks(guide.title)),
    pdfUrl,
    '',
    `${c.inside}:`,
    ...c.items.map(i => `- ${i}`),
    '',
    strip(c.other.replace('{url}', '')) + ' ' + otherPdfUrl,
    '',
    `${c.helpTitle} ${c.helpBody}`,
    diagnosisUrl,
    '',
    c.footer.replace('{site}', 'elevaops.com'),
  ].join('\n');

  return { subject: c.subject(guide.title), html, text };
}

export async function sendGuideToLead(to: string, firstName: string, lang: GuideLang = 'en'): Promise<boolean> {
  const client = getResend();
  if (!client) return false;
  const { subject, html, text } = buildGuideEmail(firstName, lang);
  try {
    const { error } = await client.emails.send({ from: EMAIL_FROM, to, replyTo: TEAM_INBOX, subject, html, text });
    if (error) {
      console.error('[guide-email] Resend rejected the delivery email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[guide-email] Failed to send the delivery email:', err);
    return false;
  }
}
