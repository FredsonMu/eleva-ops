'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY <= 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6 pointer-events-none">
      <div className={`flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-[32px] transition-all duration-500 pointer-events-auto ${
        isTop 
          ? "bg-transparent" 
          : "bg-white/80 dark:bg-[#020617]/70 backdrop-blur-lg shadow-[0_4px_24px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.5)] border-[0.5px] border-black/5 dark:border-white/10"
      }`}>
        <a href="/" className="flex items-center gap-2 group cursor-pointer shrink-0">
          <span className="font-sans font-semibold text-xl tracking-tight text-[#1d1d1f] dark:text-white">
            Eleva<span className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Ops</span>
          </span>
        </a>

        <nav className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 shrink-0">
          <a href="/#trabalho" className="hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">{t('nav.portfolio')}</a>
          <a href="/#servicos" className="hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">{t('nav.expertise')}</a>
          <a href="/#metodo" className="hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">{t('nav.method')}</a>
          <a href="/#equipa" className="hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">{t('nav.team')}</a>
        </nav>
        
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <LanguageToggle />
          <a 
            href="mailto:contact@elevaops.com" 
            className="bg-[#007AFF] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#005bb5] transition-colors hidden md:block"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </header>
  );
}
