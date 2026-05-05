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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-8 pointer-events-none"
    >
      <div className={`flex items-center justify-between w-full max-w-[1600px] px-4 md:px-6 lg:px-8 py-3 lg:py-4 rounded-full border transition-all duration-700 pointer-events-auto ${
        isTop 
          ? "bg-transparent border-transparent" 
          : "glass border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.03)]"
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer shrink-0">
          <span className="font-display font-medium text-xl md:text-2xl tracking-tighter uppercase">
            Eleva<span className="text-black/20 group-hover:text-black transition-colors duration-500">Ops</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-3 lg:gap-8 xl:gap-12 items-center text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.2em] lg:tracking-[0.4em] text-black/20 shrink-0">
          <a href="#trabalho" className="hover:text-black transition-all hover:tracking-[0.3em] lg:hover:tracking-[0.5em]">{t('nav.portfolio')}</a>
          <a href="#servicos" className="hover:text-black transition-all hover:tracking-[0.3em] lg:hover:tracking-[0.5em]">{t('nav.expertise')}</a>
          <a href="#metodo" className="hover:text-black transition-all hover:tracking-[0.3em] lg:hover:tracking-[0.5em]">{t('nav.method')}</a>
          <a href="#equipa" className="hover:text-black transition-all hover:tracking-[0.3em] lg:hover:tracking-[0.5em]">{t('nav.team')}</a>
        </nav>
        
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <LanguageToggle />
          <a 
            href="mailto:elevaopsinfo@gmail.com" 
            className="bg-black text-white px-3 lg:px-6 py-2 lg:py-3 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition-all font-sans hidden md:block"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
