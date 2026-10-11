'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { dict } from './dictionary';
import { htmlLang, LANGUAGE_COOKIE, type Language } from './languages';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Language }) {
  // The server already rendered the right language (see middleware.ts), so no effect is needed here.
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'pt' : 'en';
      document.cookie = `${LANGUAGE_COOKIE}=${newLang}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = htmlLang[newLang];
      return newLang;
    });
  }, []);

  const t = useCallback((key: keyof typeof dict) => {
    return dict[key]?.[language] || key;
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
