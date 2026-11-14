// Free guides (lead magnets): one entry per guide, with an edition per language it exists in.
// Shared by the landing pages, the homepage card, the delivery email and /api/guide-lead.
// To add a guide: add its PDF/cover under /public, an entry in CATALOG and a landing page.

export type GuideLang = 'en' | 'pt';
export type GuideId = 'ai-lawyers' | 'gestao-juridica';

export type GuideEdition = {
  path: string;
  title: string;
  pdf: string;
  pdfFileName: string;
  pdfInfo: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  emailCover: string;
  ogImage: string;
  /** Overrides for the delivery email. */
  emailItems?: readonly string[];
  emailHelpTitle?: string;
  emailHelpBody?: string;
  /** What the delivery email calls it ("guia" by default; e.g. "manual"). Portuguese only. */
  emailNoun?: 'guia' | 'manual';
  /** Extra personal paragraph in the delivery email, after the thanks. */
  emailNote?: string;
  /** Name signed at the end of the delivery email. */
  emailSignature?: string;
};

const LAWYERS_PT: GuideEdition = {
  path: '/guia-ia-advogados',
  title: 'IA para advogados: 10 exemplos práticos para o trabalho à volta do processo',
  pdf: '/guides/eleva-ops-ia-para-advogados.pdf',
  pdfFileName: 'IA para advogados - Eleva Ops.pdf',
  pdfInfo: 'PDF · 25 páginas',
  cover: '/guides/ia-advogados-capa.webp',
  coverWidth: 1190,
  coverHeight: 1682,
  emailCover: '/email/guide-cover-advogados.jpg',
  ogImage: '/guides/ia-advogados-og.png',
  emailItems: [
    'Dez tarefas delimitadas, da consulta à pesquisa jurídica',
    'Para cada uma: material fictício, o pedido à IA, um resultado ilustrativo e a revisão do advogado',
    'As regras de verificação que a investigação publicada recomenda',
  ],
  emailHelpTitle: 'Quer aplicar isto no seu escritório?',
  emailHelpBody: 'Responda a este email com uma tarefa que se repete no seu escritório, ou marque um diagnóstico gratuito. Ajudamos a escolher onde a IA ajuda, com que ferramentas e onde a revisão do advogado tem de ficar.',
};

const GESTAO_PT: GuideEdition = {
  path: '/gestao-juridica-digital',
  title: 'Gestão Jurídica Digital',
  pdf: '/guides/eleva-ops-gestao-juridica-digital.pdf',
  pdfFileName: 'Gestão Jurídica Digital - ElevaOps.pdf',
  pdfInfo: 'PDF · 15 páginas',
  cover: '/guides/gestao-juridica-digital-capa.webp',
  coverWidth: 1189,
  coverHeight: 1683,
  emailCover: '/email/guide-cover-gestao.jpg',
  ogImage: '/guides/gestao-juridica-digital-og.png',
  emailNoun: 'manual',
  emailItems: [
    'Cinco pilares para organizar equipa, processos e prazos',
    'Um plano de quatro semanas e o Índice de Maturidade Digital',
    'Modelos prontos a usar no escritório',
  ],
  emailNote: 'Uma sugestão: comece pelo Índice de Maturidade Digital da página 11. Dez minutos chegam para saber por onde começar.',
  emailHelpTitle: 'Por que pilar vai começar?',
  emailHelpBody: 'Responda a este e-mail com uma frase. Lemos todas as respostas.',
  emailSignature: 'Fredson, ElevaOps',
};

export const CATALOG: Record<GuideId, { name: string; editions: Partial<Record<GuideLang, GuideEdition>> }> = {
  'ai-lawyers': { name: 'IA para advogados', editions: { pt: LAWYERS_PT } },
  'gestao-juridica': { name: 'Gestão Jurídica Digital', editions: { pt: GESTAO_PT } },
};

/** Guides whose form asks for the phone number as a required field. */
export const PHONE_REQUIRED: readonly GuideId[] = ['gestao-juridica'];

// Unknown or removed guide ids fall back to the lawyers guide.
export const asGuideId = (value: unknown): GuideId => (value === 'gestao-juridica' ? value : 'ai-lawyers');

/** "+351 912 345 678" style number: 8–20 digits, digits/spaces/()/- only. */
export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '').length;
  return phone.length <= LIMITS.phone && /^\+?[0-9 ()-]{6,}$/.test(phone) && digits >= 8 && digits <= 20;
}

/** The edition in the requested language, or the first one the guide has. */
export function getEdition(id: GuideId, lang: GuideLang): { edition: GuideEdition; lang: GuideLang } {
  const editions = CATALOG[id].editions;
  const found = editions[lang];
  if (found) return { edition: found, lang };
  const fallback = (Object.keys(editions) as GuideLang[])[0];
  return { edition: editions[fallback]!, lang: fallback };
}

/** The same guide in the other language, when it exists. */
export function otherEdition(id: GuideId, lang: GuideLang): GuideEdition | null {
  return CATALOG[id].editions[otherLang(lang)] ?? null;
}

export const otherLang = (lang: GuideLang): GuideLang => (lang === 'pt' ? 'en' : 'pt');

// Attribution parameters kept from the ad click through to the lead.
export const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
export type Tracking = Partial<Record<(typeof TRACKING_PARAMS)[number], string>>;

export const LIMITS = { firstName: 80, email: 254, companyName: 120, phone: 40, tracking: 200 } as const;

// Pragmatic check (the browser's type="email" does the same on the client).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadInput = {
  firstName: string;
  email: string;
  companyName: string;
  phone: string;
  marketingConsent: boolean;
  language: GuideLang;
  guideId: GuideId;
  tracking: Tracking;
};

export type LeadValidation =
  | { ok: true; lead: LeadInput }
  | { ok: false; field?: 'firstName' | 'email' | 'phone'; error: string };

const MESSAGES = {
  en: {
    invalid: 'Invalid request.',
    noName: 'Please enter your first name.',
    longName: 'First name is too long.',
    noEmail: 'Please enter your email.',
    badEmail: 'Please enter a valid email address.',
    longCompany: 'Company name is too long.',
    badPhone: 'Please enter a valid phone number.',
    noPhone: 'Please enter your phone number.',
  },
  pt: {
    invalid: 'Pedido inválido.',
    noName: 'Introduza o seu primeiro nome.',
    longName: 'O nome é demasiado longo.',
    noEmail: 'Introduza o seu email.',
    badEmail: 'Introduza um email válido.',
    longCompany: 'O nome da empresa é demasiado longo.',
    badPhone: 'Introduza um número de telemóvel válido.',
    noPhone: 'Introduza o seu número de telemóvel.',
  },
} as const;

export function leadLanguage(body: unknown): GuideLang {
  return body && typeof body === 'object' && (body as Record<string, unknown>).language === 'pt' ? 'pt' : 'en';
}

export function validateLead(body: unknown): LeadValidation {
  const guideId = asGuideId(body && typeof body === 'object' ? (body as Record<string, unknown>).guideId : undefined);
  const language = getEdition(guideId, leadLanguage(body)).lang;
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

  // Required for some guides (PHONE_REQUIRED), optional for the others.
  const phone = typeof data.phone === 'string' ? data.phone.trim().replace(/\s+/g, ' ') : '';
  if (!phone && PHONE_REQUIRED.includes(guideId)) return { ok: false, field: 'phone', error: m.noPhone };
  if (phone && !isValidPhone(phone)) return { ok: false, field: 'phone', error: m.badPhone };

  const tracking: Tracking = {};
  const rawTracking = data.tracking && typeof data.tracking === 'object' ? (data.tracking as Record<string, unknown>) : {};
  for (const key of TRACKING_PARAMS) {
    const value = rawTracking[key];
    if (typeof value === 'string' && value.trim()) tracking[key] = value.trim().slice(0, LIMITS.tracking);
  }

  return { ok: true, lead: { firstName, email, companyName, phone, marketingConsent: data.marketingConsent === true, language, guideId, tracking } };
}
