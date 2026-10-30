'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// Homepage summary of "The Path": the four stages in one row, with a link to /method.
export function MethodPreview() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={30} duration={0.8} className="rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] p-6 sm:p-10 md:p-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('nav.method')}</span>
              <h2 className="mt-3 max-w-xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
                {t('meth.title1')}
              </h2>
            </div>
            <Link href="/method" className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brand">
              {t('prev.howWeWork')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {([1, 2, 3, 4] as const).map(n => (
              <li key={n} className="border-t-2 border-black/10 dark:border-white/15 pt-5 first:border-[#007AFF]">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">0{n}</span>
                <p className="mt-2 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{t(`meth.s${n}.t` as const)}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{t(`meth.s${n}.g` as const)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
