// Free guides (lead magnets): one entry per guide, with an edition per language it exists in.
// Shared by the landing pages, the homepage card, the delivery email and /api/guide-lead.
// To add a guide: add its PDF/cover under /public, an entry in CATALOG and a landing page.

export type GuideLang = 'en' | 'pt';
export type GuideId = 'ai-agents' | 'ai-lawyers' | 'manual-prazos';

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
  /** Overrides for the delivery email (defaults are the AI agents texts). */
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

const MANUAL_PT: GuideEdition = {
  path: '/manual',
  title: 'Entre prazos e processos',
  pdf: '/guides/eleva-ops-entre-prazos-e-processos.pdf',
  pdfFileName: 'Entre prazos e processos - ElevaOps.pdf',
  pdfInfo: 'PDF · 16 páginas',
  cover: '/guides/entre-prazos-e-processos-capa.webp',
  coverWidth: 1190,
  coverHeight: 1683,
  emailCover: '/email/guide-cover-manual.jpg',
  ogImage: '/guides/entre-prazos-e-processos-og-v2.png',
  emailNoun: 'manual',
  emailItems: [
    'As quatro fontes de tempo perdido num escritório de advogados',
    'Uma folha para quantificar esse tempo numa semana de observação',
    'Quatro princípios de organização, aplicáveis com ou sem software',
  ],
  emailNote: 'Uma sugestão: comece pela folha de quantificação da página 10. Uma semana de registo chega para ter um número do seu próprio escritório.',
  emailHelpTitle: 'Qual é hoje a maior dificuldade no controlo de prazos?',
  emailHelpBody: 'Responda a este email com uma frase. Leio todas as respostas e é com elas que estamos a desenhar o LegalOps, a plataforma de gestão para escritórios de advogados que lançamos em breve.',
  emailSignature: 'Fredson, ElevaOps',
};

export const CATALOG: Record<GuideId, { name: string; editions: Partial<Record<GuideLang, GuideEdition>> }> = {
  'ai-agents': { name: '7 AI Agents', editions: GUIDES },
  'ai-lawyers': { name: 'IA para advogados', editions: { pt: LAWYERS_PT } },
  'manual-prazos': { name: 'Entre prazos e processos', editions: { pt: MANUAL_PT } },
};

export const asGuideId = (value: unknown): GuideId =>
  value === 'ai-lawyers' || value === 'manual-prazos' ? value : 'ai-agents';

// Size of the firm, asked on the manual's form: the one qualifying question (3 to 10 people is
// the audience LegalOps is built for).
export const TEAM_SIZES = ['1-2', '3-5', '6-10', '10+'] as const;
export type TeamSize = (typeof TEAM_SIZES)[number];

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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadInput = {
  firstName: string;
  email: string;
  companyName: string;
  phone: string;
  teamSize: TeamSize | '';
  marketingConsent: boolean;
  language: GuideLang;
  guideId: GuideId;
  tracking: Tracking;
};

export type LeadValidation =
  | { ok: true; lead: LeadInput }
  | { ok: false; field?: 'firstName' | 'email' | 'teamSize'; error: string };

const MESSAGES = {
  en: {
    invalid: 'Invalid request.',
    noName: 'Please enter your first name.',
    longName: 'First name is too long.',
    noEmail: 'Please enter your email.',
    badEmail: 'Please enter a valid email address.',
    longCompany: 'Company name is too long.',
    badPhone: 'Please enter a valid phone number.',
    noTeamSize: 'Please choose the size of your team.',
  },
  pt: {
    invalid: 'Pedido inválido.',
    noName: 'Introduza o seu primeiro nome.',
    longName: 'O nome é demasiado longo.',
    noEmail: 'Introduza o seu email.',
    badEmail: 'Introduza um email válido.',
    longCompany: 'O nome da empresa é demasiado longo.',
    badPhone: 'Introduza um número de telefone válido.',
    noTeamSize: 'Indique quantas pessoas trabalham no escritório.',
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

  // Optional; when present: "+<code> <number>" with 6–20 digits overall.
  const phone = typeof data.phone === 'string' ? data.phone.trim().replace(/\s+/g, ' ') : '';
  if (phone && (phone.length > LIMITS.phone || !/^\+?[0-9 ()-]{6,}$/.test(phone) || phone.replace(/\D/g, '').length > 20)) {
    return { ok: false, error: m.badPhone };
  }

  const teamSize = (TEAM_SIZES as readonly string[]).includes(data.teamSize as string) ? (data.teamSize as TeamSize) : '';
  if (guideId === 'manual-prazos' && !teamSize) return { ok: false, field: 'teamSize', error: m.noTeamSize };

  const tracking: Tracking = {};
  const rawTracking = data.tracking && typeof data.tracking === 'object' ? (data.tracking as Record<string, unknown>) : {};
  for (const key of TRACKING_PARAMS) {
    const value = rawTracking[key];
    if (typeof value === 'string' && value.trim()) tracking[key] = value.trim().slice(0, LIMITS.tracking);
  }

  return { ok: true, lead: { firstName, email, companyName, phone, teamSize, marketingConsent: data.marketingConsent === true, language, guideId, tracking } };
}
