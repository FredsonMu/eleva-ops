'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dict } from './dictionary';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'pt' : 'en';
      document.cookie = `lang=${newLang}; path=/`;
      return newLang;
    });
  };

  useEffect(() => {
    if (document.cookie.includes('lang=pt')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage('pt');
    }
  }, []);

  const t = (key: keyof typeof dict) => {
    return dict[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
