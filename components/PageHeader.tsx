'use client';
import { useLanguage } from '@/lib/i18n';
import type { dict } from '@/lib/dictionary';
import { Reveal } from './Reveal';

type Key = keyof typeof dict;

// Opening of an inner page: small label, title and one line of context, centred.
export function PageHeader({ label, title, lead }: { label: Key; title: Key; lead?: Key }) {
  const { t } = useLanguage();
  return (
    <section className="pt-32 md:pt-44 pb-4 md:pb-8">
      <Reveal y={24} duration={0.7} className="mx-auto max-w-3xl px-5 md:px-6 text-center">
        <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t(label)}</span>
        <h1 className="mt-3 font-sans text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
          {t(title)}
        </h1>
        {lead && (
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">{t(lead)}</p>
        )}
      </Reveal>
    </section>
  );
}
