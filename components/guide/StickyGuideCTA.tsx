'use client';
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { LEAD_EVENT } from './GuideLeadForm';
import { useLanguage } from '@/lib/i18n';

// Mobile-only shortcut to the form: visible once the hero CTA has scrolled away,
// hidden while the form itself is on screen and for good after a successful request.
export function StickyGuideCTA({ heroCtaId, formId }: { heroCtaId: string; formId: string }) {
  const { language } = useLanguage();
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroCtaId);
    const form = document.getElementById(formId);
    if (!hero || !form) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === form) setFormVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    observer.observe(form);
    const onLead = () => setDone(true);
    window.addEventListener(LEAD_EVENT, onLead);
    return () => {
      observer.disconnect();
      window.removeEventListener(LEAD_EVENT, onLead);
    };
  }, [heroCtaId, formId]);

  const show = !heroVisible && !formVisible && !done;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-300 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!show}
    >
      <a
        href={`#${formId}`}
        tabIndex={show ? 0 : -1}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_-12px_rgba(0,122,255,0.7)] active:scale-[0.98] transition-transform"
      >
        {language === 'pt' ? 'Receber o guia gratuito' : 'Get the Free Guide'}
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
