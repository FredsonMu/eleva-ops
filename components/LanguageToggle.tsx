'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

type Phase = 'idle' | 'cover' | 'reveal';

// Duration of each half of the curtain (cover, then reveal). Keep in sync with the CSS below.
const HALF_MS = 400;

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [phase, setPhase] = useState<Phase>('idle');
  const [targetLang, setTargetLang] = useState<'pt' | 'en'>('en');
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleToggle = () => {
    if (phase !== 'idle') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      toggleLanguage();
      return;
    }

    setTargetLang(language === 'pt' ? 'en' : 'pt');
    setPhase('cover');
    // Switch language while the screen is covered, then pull the curtain away.
    timers.current.push(
      window.setTimeout(() => {
        toggleLanguage();
        setPhase('reveal');
      }, HALF_MS + 100),
      window.setTimeout(() => setPhase('idle'), HALF_MS * 2 + 100),
    );
  };

  // Curtain enters from the bottom and leaves through the top (clip-path is GPU friendly
  // and doesn't trigger layout). In `idle` it snaps back below without a transition.
  const curtainClip =
    phase === 'cover' ? 'inset(0% 0 0 0)' :
    phase === 'reveal' ? 'inset(0 0 100% 0)' :
    'inset(100% 0 0 0)';

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-10 items-center justify-center rounded-full px-3 text-[13px] font-semibold text-black/70 dark:text-white/75 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08] cursor-pointer pointer-events-auto shrink-0"
      >
        <span aria-hidden="true">{language === 'pt' ? 'PT' : 'EN'}</span>
        <span className="sr-only">
          {language === 'pt' ? 'Switch to English' : 'Mudar para PT'}
        </span>
      </button>

      {/* Translation curtain */}
      <div
        aria-hidden={phase === 'idle'}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]"
        style={{
          clipPath: curtainClip,
          transition: phase === 'idle' ? 'none' : `clip-path ${HALF_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          pointerEvents: phase === 'idle' ? 'none' : 'auto',
          visibility: phase === 'idle' ? 'hidden' : 'visible',
        }}
      >
        <div className="flex items-center gap-4" role="status">
          <div className="w-10 h-10 rounded-full border border-white/20 border-t-white animate-spin"></div>
          <span className="text-white font-sans text-xl font-medium tracking-tight">
            {targetLang === 'en' ? 'Translating to English...' : 'Traduzindo para Português...'}
          </span>
        </div>
      </div>
    </>
  );
}
