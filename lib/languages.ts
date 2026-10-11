export const languages = ['en', 'pt'] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = 'en';
export const LANGUAGE_COOKIE = 'lang';

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value);
}

export const htmlLang: Record<Language, string> = { en: 'en', pt: 'pt-PT' };
