import { getNewsletterResend, withResendRetry } from '@/lib/email';
import { verifyUnsubscribeToken } from '@/lib/newsletter';

export const dynamic = 'force-dynamic';

function page(title: string, message: string, status: number, token?: string, english = false) {
  const html = '<!doctype html><html lang="' + (english ? 'en' : 'pt-PT') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + ' | ElevaOps</title>'
    + '<style>body{margin:0;background:#f5f5f7;color:#1d1d1f;font:16px/1.6 Arial,sans-serif}main{max-width:480px;margin:12vh auto;padding:32px 24px;background:white;border-radius:24px}h1{font-size:28px;line-height:1.2}button{border:0;border-radius:24px;padding:14px 24px;background:#007aff;color:white;font:inherit;cursor:pointer}a{color:#0066cc}</style></head>'
    + '<body><main><strong>ELEVAOPS</strong><h1>' + title + '</h1><p>' + message + '</p>'
    + (token ? '<form method="post" action="/newsletter/unsubscribe?token=' + encodeURIComponent(token) + '"><button type="submit">' + (english ? 'Unsubscribe' : 'Cancelar subscrição') + '</button></form>' : '')
    + '<p><a href="/">' + (english ? 'Back to the website' : 'Voltar ao website') + '</a></p></main></body></html>';
  return new Response(html, { status, headers: {
    'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'",
  } });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const subscriber = verifyUnsubscribeToken(token);
  if (!subscriber) return page('Link inválido', 'Peça ajuda em contact@elevaops.com para cancelar a subscrição.', 400);
  const en = subscriber.language === 'en';
  // Link scanners must not unsubscribe people just by opening a GET.
  return page(en ? 'Leave the newsletter?' : 'Cancelar a newsletter?', en ? 'Confirm below to stop receiving the ElevaOps newsletter.' : 'Confirme abaixo para deixar de receber a newsletter da ElevaOps.', 200, token, en);
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const subscriber = verifyUnsubscribeToken(token);
  if (!subscriber) return page('Link inválido', 'Peça ajuda em contact@elevaops.com para cancelar a subscrição.', 400);
  const en = subscriber.language === 'en', client = getNewsletterResend();
  try {
    if (client) {
      const { error } = await withResendRetry(() => client.contacts.update({ id: subscriber.contactId, unsubscribed: true }));
      if (!error || error.statusCode === 404) return page(en ? 'Subscription cancelled' : 'Subscrição cancelada', en ? 'You will no longer receive the ElevaOps newsletter.' : 'Deixará de receber a newsletter da ElevaOps.', 200, undefined, en);
      console.error('[newsletter] Unsubscribe failed:', error);
    }
  } catch (error) {
    console.error('[newsletter] Unsubscribe failed:', error);
  }
  return page(en ? 'Please try again' : 'Tente novamente', en ? 'We could not cancel the subscription. Try again or email contact@elevaops.com.' : 'Não conseguimos cancelar a subscrição. Tente novamente ou escreva para contact@elevaops.com.', 503, token, en);
}
