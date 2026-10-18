// "7 AI Agents" lead magnet: shared by the landing page and /api/guide-lead.

export const GUIDE = {
  path: '/ai-agents-guide',
  title: '7 AI Agents Your Business Could Be Using Right Now',
  pdf: '/guides/eleva-ops-7-ai-agents-guide.pdf',
  pdfFileName: '7 AI Agents Your Business Could Be Using Right Now - Eleva Ops.pdf',
  cover: '/guides/ai-agents-guide-cover.webp',
  coverWidth: 1190,
  coverHeight: 1683,
  ogImage: '/guides/ai-agents-guide-og.png',
} as const;

// Attribution parameters kept from the ad click through to the lead.
export const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
export type Tracking = Partial<Record<(typeof TRACKING_PARAMS)[number], string>>;

export const LIMITS = { firstName: 80, email: 254, companyName: 120, phone: 40, tracking: 200 } as const;

// Pragmatic check (the browser's type="email" does the same on the client).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadInput = {
  firstName: string;
  email: string;
  companyName: string;
  phone: string;
  marketingConsent: boolean;
  tracking: Tracking;
};

export type LeadValidation =
  | { ok: true; lead: LeadInput }
  | { ok: false; field?: 'firstName' | 'email'; error: string };

export function validateLead(body: unknown): LeadValidation {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request.' };
  const data = body as Record<string, unknown>;

  const firstName = typeof data.firstName === 'string' ? data.firstName.trim().replace(/\s+/g, ' ') : '';
  if (!firstName) return { ok: false, field: 'firstName', error: 'Please enter your first name.' };
  if (firstName.length > LIMITS.firstName) return { ok: false, field: 'firstName', error: 'First name is too long.' };

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email) return { ok: false, field: 'email', error: 'Please enter your email.' };
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return { ok: false, field: 'email', error: 'Please enter a valid email address.' };
  }

  const companyName = typeof data.companyName === 'string' ? data.companyName.trim().replace(/\s+/g, ' ') : '';
  if (companyName.length > LIMITS.companyName) return { ok: false, error: 'Company name is too long.' };

  // Optional; when present: "+<code> <number>" with 6–20 digits overall.
  const phone = typeof data.phone === 'string' ? data.phone.trim().replace(/\s+/g, ' ') : '';
  if (phone && (phone.length > LIMITS.phone || !/^\+?[0-9 ()-]{6,}$/.test(phone) || phone.replace(/\D/g, '').length > 20)) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }

  const tracking: Tracking = {};
  const rawTracking = data.tracking && typeof data.tracking === 'object' ? (data.tracking as Record<string, unknown>) : {};
  for (const key of TRACKING_PARAMS) {
    const value = rawTracking[key];
    if (typeof value === 'string' && value.trim()) tracking[key] = value.trim().slice(0, LIMITS.tracking);
  }

  return { ok: true, lead: { firstName, email, companyName, phone, marketingConsent: data.marketingConsent === true, tracking } };
}
