'use client';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsTop(latest <= 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6 pointer-events-none"
    >
      <div className={`flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-[32px] transition-all duration-500 pointer-events-auto ${
        isTop 
          ? "bg-transparent" 
          : "glass shadow-lg shadow-black/5"
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer shrink-0">
          <span className="font-sans font-semibold text-xl tracking-tight text-black">
            Eleva<span className="text-black/40 group-hover:text-black transition-colors duration-300">Ops</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center text-xs font-medium text-black/60 shrink-0">
          <a href="#trabalho" className="hover:text-black hover:drop-shadow-sm transition-all">{t('nav.portfolio')}</a>
          <a href="#servicos" className="hover:text-black hover:drop-shadow-sm transition-all">{t('nav.expertise')}</a>
          <a href="#metodo" className="hover:text-black hover:drop-shadow-sm transition-all">{t('nav.method')}</a>
          <a href="#equipa" className="hover:text-black hover:drop-shadow-sm transition-all">{t('nav.team')}</a>
        </nav>
        
        <div className="flex items-center gap-3 shrink-0">
          <LanguageToggle />
          <a 
            href="mailto:contact@elevaops.com" 
            className="bg-[#007AFF] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#005bb5] hover:shadow-md hover:shadow-[#007AFF]/20 transition-all hidden md:block"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
