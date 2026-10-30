'use client';
import Link from 'next/link';
import { ArrowRight, Bot, Globe, LayoutGrid, Workflow } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// Homepage summary of the four services; each card leads to its part of /solutions.
const ITEMS = [
  { icon: Globe, title: 'serv.1.title', desc: 'prev.s1', href: '/solutions#websites' },
  { icon: Workflow, title: 'serv.2.title', desc: 'prev.s2', href: '/solutions#automation' },
  { icon: LayoutGrid, title: 'serv.3.title', desc: 'prev.s3', href: '/solutions#platforms' },
  { icon: Bot, title: 'serv.4.title', desc: 'prev.s4', href: '/solutions#ai-agents' },
] as const;

export function SolutionsPreview() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={30} duration={0.7} className="mb-10 md:mb-14 text-center">
          <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('nav.expertise')}</span>
          <h2 className="mx-auto mt-3 max-w-3xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
            {t('serv.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">{t('serv.intro')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ITEMS.map(({ icon: Icon, title, desc, href }, i) => (
            <Reveal key={href} y={24} delay={i * 0.06} className="h-full">
              <Link href={href} className="group flex h-full flex-col rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-6 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-white/[0.06] shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)]">
                  <Icon className="h-5 w-5 text-[#007AFF]" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="mt-6 font-sans text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{t(title).replace(/\s*\n\s*/, ' ')}</span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{t(desc)}</span>
                <span className="mt-5 flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                  {t('prev.more')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
