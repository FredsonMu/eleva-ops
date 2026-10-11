import { NextResponse, type NextRequest } from 'next/server';
import { defaultLanguage, isLanguage, LANGUAGE_COOKIE } from '@/lib/languages';

// Each language is pre-rendered statically under /en and /pt. The public URLs stay
// language-free: requests are rewritten to the variant saved in the cookie, so the
// first paint is already in the right language (no EN → PT swap after hydration).
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split('/')[1];

  // Direct hits on /pt/... or /en/... → remember the choice and go to the clean URL.
  if (isLanguage(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(segment.length + 1) || '/';
    const response = NextResponse.redirect(url);
    response.cookies.set(LANGUAGE_COOKIE, segment, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return response;
  }

  const cookie = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const language = isLanguage(cookie) ? cookie : defaultLanguage;
  const url = request.nextUrl.clone();
  url.pathname = `/${language}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, robots.txt, sitemap.xml…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
