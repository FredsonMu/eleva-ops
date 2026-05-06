'use client';

import { useLanguage } from '@/lib/i18n';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Capture the target language at transition start so the overlay text
  // doesn't flip when the reactive `language` state changes mid-animation.
  const targetLangRef = useRef<'pt' | 'en' | null>(null);

  // We want to block interactions and show a cool overlay while translating
  const handleToggle = () => {
    if (isTransitioning) return;
    targetLangRef.current = language === 'pt' ? 'en' : 'pt';
    setIsTransitioning(true);
    
    // Switch language in the middle of the transition
    setTimeout(() => {
      toggleLanguage();
    }, 600); // Overlay takes ~1s to cover, switch at 600ms

    setTimeout(() => {
      setIsTransitioning(false);
      targetLangRef.current = null;
    }, 1800); // Overlay goes away after 1.8s
  };

  return (
    <>
      <button 
        onClick={handleToggle}
        className="flex items-center gap-2 bg-black/5 hover:bg-black/10 p-1.5 md:px-3 md:py-1.5 rounded-full transition-colors cursor-pointer group pointer-events-auto border border-black/10 shrink-0"
      >
        <div className="relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-black/5 shrink-0">
           <AnimatePresence mode="wait" initial={false}>
             {language === 'pt' ? (
                <motion.span 
                  key="pt" 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute text-[8px] font-bold"
                >
                  PT
                </motion.span>
             ) : (
                <motion.span 
                  key="en" 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute text-[8px] font-bold"
                >
                  EN
                </motion.span>
             )}
           </AnimatePresence>
        </div>
        <span className="hidden lg:block text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-[#111111] group-hover:text-black whitespace-nowrap lg:pr-2">
          {language === 'pt' ? 'Switch to English' : 'Mudar para PT'}
        </span>
      </button>

      {/* The Translation Overlay Concept */}
      <AnimatePresence>
        {isTransitioning && (
           <motion.div 
             className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111] pointer-events-auto"
             initial={{ clipPath: 'inset(100% 0 0 0)' }}
             animate={{ clipPath: 'inset(0% 0 0 0)' }}
             exit={{ clipPath: 'inset(0 0 100% 0)' }}
             transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
           >
              <div className="flex flex-col items-center">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.4 }}
                   exit={{ opacity: 0 }}
                   className="flex items-center gap-4"
                 >
                    <div className="w-12 h-12 rounded-full border border-white/20 border-t-white animate-spin"></div>
                    <span className="text-white font-sans text-xl font-medium tracking-tight">
                       {targetLangRef.current === 'en' ? 'Translating to English...' : 'Traduzindo para Português...'}
                    </span>
                 </motion.div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
