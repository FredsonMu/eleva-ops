// "7 AI Agents" lead magnet, in English and Portuguese: shared by both landing pages, the
// homepage card and /api/guide-lead.

export type GuideLang = 'en' | 'pt';

export const GUIDES = {
  en: {
    path: '/ai-agents-guide',
    title: '7 AI Agents Your Business Could Be Using Right Now',
    pdf: '/guides/eleva-ops-7-ai-agents-guide.pdf',
    pdfFileName: '7 AI Agents Your Business Could Be Using Right Now - Eleva Ops.pdf',
    pdfInfo: 'PDF · 10 pages · 190 KB',
    cover: '/guides/ai-agents-guide-cover.webp',
    coverWidth: 1190,
    coverHeight: 1683,
    emailCover: '/email/guide-cover.jpg',
    ogImage: '/guides/ai-agents-guide-og.png',
  },
  pt: {
    path: '/guia-agentes-ia',
    title: '7 agentes de IA que a sua empresa já pode começar a utilizar',
    pdf: '/guides/eleva-ops-7-agentes-de-ia.pdf',
    pdfFileName: '7 agentes de IA que a sua empresa já pode começar a utilizar - Eleva Ops.pdf',
    pdfInfo: 'PDF · 10 páginas · 90 KB',
    cover: '/guides/guia-agentes-ia-capa.webp',
    coverWidth: 1190,
    coverHeight: 1540,
    emailCover: '/email/guide-cover-pt.jpg',
    ogImage: '/guides/guia-agentes-ia-og.png',
  },
} as const;

/** English edition (kept for older imports). */
export const GUIDE = GUIDES.en;

export const otherLang = (lang: GuideLang): GuideLang => (lang === 'pt' ? 'en' : 'pt');

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
  language: GuideLang;
  tracking: Tracking;
};

export type LeadValidation =
  | { ok: true; lead: LeadInput }
  | { ok: false; field?: 'firstName' | 'email'; error: string };

const MESSAGES = {
  en: {
    invalid: 'Invalid request.',
    noName: 'Please enter your first name.',
    longName: 'First name is too long.',
    noEmail: 'Please enter your email.',
    badEmail: 'Please enter a valid email address.',
    longCompany: 'Company name is too long.',
    badPhone: 'Please enter a valid phone number.',
  },
  pt: {
    invalid: 'Pedido inválido.',
    noName: 'Introduza o seu primeiro nome.',
    longName: 'O nome é demasiado longo.',
    noEmail: 'Introduza o seu email.',
    badEmail: 'Introduza um email válido.',
    longCompany: 'O nome da empresa é demasiado longo.',
    badPhone: 'Introduza um número de telefone válido.',
  },
} as const;

export function leadLanguage(body: unknown): GuideLang {
  return body && typeof body === 'object' && (body as Record<string, unknown>).language === 'pt' ? 'pt' : 'en';
}

export function validateLead(body: unknown): LeadValidation {
  const language = leadLanguage(body);
  const m = MESSAGES[language];
  if (!body || typeof body !== 'object') return { ok: false, error: m.invalid };
  const data = body as Record<string, unknown>;

  const firstName = typeof data.firstName === 'string' ? data.firstName.trim().replace(/\s+/g, ' ') : '';
  if (!firstName) return { ok: false, field: 'firstName', error: m.noName };
  if (firstName.length > LIMITS.firstName) return { ok: false, field: 'firstName', error: m.longName };

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email) return { ok: false, field: 'email', error: m.noEmail };
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
    return { ok: false, field: 'email', error: m.badEmail };
  }

  const companyName = typeof data.companyName === 'string' ? data.companyName.trim().replace(/\s+/g, ' ') : '';
  if (companyName.length > LIMITS.companyName) return { ok: false, error: m.longCompany };

  // Optional; when present: "+<code> <number>" with 6–20 digits overall.
  const phone = typeof data.phone === 'string' ? data.phone.trim().replace(/\s+/g, ' ') : '';
  if (phone && (phone.length > LIMITS.phone || !/^\+?[0-9 ()-]{6,}$/.test(phone) || phone.replace(/\D/g, '').length > 20)) {
    return { ok: false, error: m.badPhone };
  }

  const tracking: Tracking = {};
  const rawTracking = data.tracking && typeof data.tracking === 'object' ? (data.tracking as Record<string, unknown>) : {};
  for (const key of TRACKING_PARAMS) {
    const value = rawTracking[key];
    if (typeof value === 'string' && value.trim()) tracking[key] = value.trim().slice(0, LIMITS.tracking);
  }

  return { ok: true, lead: { firstName, email, companyName, phone, marketingConsent: data.marketingConsent === true, language, tracking } };
}
