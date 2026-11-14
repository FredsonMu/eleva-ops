// Checks shared by the public sign-up routes (/api/guide-lead and /api/waitlist): same origin,
// a best-effort per-IP rate limit, a honeypot and a minimum fill time.

// Forms filled faster than this are almost certainly bots.
const MIN_FILL_MS = 2500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

// In-memory, so it resets on cold starts and isn't shared between serverless instances; it only
// blunts bursts from a single client.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isForeignOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  return Boolean(origin && host && new URL(origin).host !== host);
}

export function isRateLimited(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** A field hidden from people was filled in. */
export const isHoneypotFilled = (body: Record<string, unknown>) => typeof body.website === 'string' && body.website.trim() !== '';

/** The form was sent too soon after it was shown (or the timestamp is missing or stale). */
export function isTooFast(body: Record<string, unknown>) {
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  return !startedAt || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS;
}
