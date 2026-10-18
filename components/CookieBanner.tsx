'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { getConsent, OPEN_CONSENT_EVENT, setConsent } from '@/lib/consent';

// Small consent card (bottom-left). "Accept" and "Decline" have equal weight, as the CNPD and
// EDPB guidance requires; nothing marketing-related loads before a choice.

const COPY = {
  en: {
    text: 'We use a Meta cookie to measure our ads, only if you allow it.',
    accept: 'Accept',
    decline: 'Decline',
    more: 'Privacy Policy',
  },
  pt: {
    text: 'Usamos um cookie da Meta para medir os nossos anúncios, apenas se o permitir.',
    accept: 'Aceitar',
    decline: 'Recusar',
    more: 'Política de Privacidade',
  },
} as const;

export function CookieBanner() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show after first paint (a frame later), so it never blocks the page from rendering
    const frame = requestAnimationFrame(() => { if (getConsent() === null) setOpen(true); });
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => { cancelAnimationFrame(frame); window.removeEventListener(OPEN_CONSENT_EVENT, reopen); };
  }, []);

  if (!open) return null;

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="guide-card-in fixed inset-x-3 bottom-3 z-[85] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[360px]"
    >
      <div className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] p-4 shadow-[0_24px_60px_-20px_rgba(0,30,90,0.35)]">
        <p className="text-[13px] leading-relaxed text-black/70 dark:text-white/75">
          {c.text}{' '}
          <Link href="/privacy-policy" className="font-medium text-[#1d1d1f] dark:text-white underline underline-offset-2 hover:no-underline">{c.more}</Link>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="h-9 rounded-full border border-black/10 dark:border-white/15 text-[13px] font-semibold text-[#1d1d1f] dark:text-white transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          >
            {c.decline}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="h-9 rounded-full bg-[#1d1d1f] dark:bg-white text-[13px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
