'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { dict } from './dictionary';

export type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Every page load starts in English. The visitor's choice is kept in memory while they
// browse the site (client-side navigation, back/forward) and is not stored on the device.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'pt' : 'en'));
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

// Keeps <html lang> in sync with the chosen language (for screen readers and translation tools).
export function HtmlLangSync() {
  const { language } = useLanguage();
  React.useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
  }, [language]);
  return null;
}
