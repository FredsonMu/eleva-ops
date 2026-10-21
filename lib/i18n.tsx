'use client';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
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
// A page can start in another language by wrapping itself in a nested provider with
// `initialLanguage` (e.g. the Portuguese guide page); that subtree then owns <html lang>.
export function LanguageProvider({ children, initialLanguage = 'en', scoped = false }: { children: React.ReactNode; initialLanguage?: Language; scoped?: boolean }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'pt' : 'en'));
  }, []);

  const t = useCallback((key: keyof typeof dict) => {
    return dict[key]?.[language] || key;
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {scoped ? (
        <div data-lang-scope="" lang={language === 'pt' ? 'pt-PT' : 'en'}>
          <HtmlLangSync />
          {children}
        </div>
      ) : children}
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
// The root instance stands aside while a scoped provider (with its own sync) is on the page.
export function HtmlLangSync() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const inScope = !!ref.current?.closest('[data-lang-scope]');
    if (!inScope && document.querySelector('[data-lang-scope]')) return;
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
  }, [language, pathname]);
  return <span ref={ref} hidden />;
}
