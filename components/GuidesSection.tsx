'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { CATALOG, type GuideId } from '@/lib/guide';
import { Reveal } from './Reveal';

// Free guides available in the current language, newest first. Used on the homepage and on
// /guides. Each card leads to the guide's own landing page.
const ORDER: GuideId[] = ['manual-prazos', 'ai-lawyers', 'ai-agents'];
const BLURB: Record<GuideId, { en?: string; pt?: string; tag: { en?: string; pt?: string } }> = {
  'manual-prazos': {
    pt: 'Quanto tempo perde o seu escritório entre tarefas? Um método para o medir e quatro princípios para o reduzir.',
    tag: { pt: 'Para escritórios de advogados' },
  },
  'ai-lawyers': {
    pt: '10 exemplos práticos para usar IA no trabalho à volta do processo, sempre com a revisão do advogado.',
    tag: { pt: 'Para escritórios de advogados' },
  },
  'ai-agents': {
    en: 'Seven practical AI agents, three complete workflows and a simple score to choose your first process.',
    pt: 'Sete agentes de IA práticos, três fluxos completos e uma pontuação simples para escolher o primeiro processo.',
    tag: { en: 'For any business', pt: 'Para qualquer empresa' },
  },
};

// `rows` (on /guides): one open row per guide, cover beside the text, no boxed card.
export function GuidesSection({ heading = true, layout = 'cards' }: { heading?: boolean; layout?: 'cards' | 'rows' }) {
  const { language, t } = useLanguage();
  const lang = language === 'pt' ? 'pt' : 'en';
  const guides = ORDER.flatMap(id => {
    const edition = CATALOG[id].editions[lang];
    return edition ? [{ id, edition }] : [];
  });

  return (
    <section id="guides" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        {heading && (
          <Reveal y={30} duration={0.7} className="mb-10 md:mb-14 text-center">
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('guides.label')}</span>
            <h2 className="mx-auto mt-3 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
              {t('guides.title')}
            </h2>
          </Reveal>
        )}

        {layout === 'rows' ? (
          <ol className="border-t border-black/[0.08] dark:border-white/10">
            {guides.map(({ id, edition }, i) => (
              <li key={id} className="border-b border-black/[0.08] dark:border-white/10">
                <Reveal y={24} delay={i * 0.08}>
                  <Link href={edition.path} className="group grid grid-cols-[88px_1fr] items-center gap-5 py-8 sm:grid-cols-[120px_1fr_auto] sm:gap-8 md:py-10">
                    <Image
                      src={edition.cover}
                      alt=""
                      width={edition.coverWidth}
                      height={edition.coverHeight}
                      sizes="120px"
                      className="h-auto w-full -rotate-3 rounded-sm shadow-[0_18px_30px_-16px_rgba(0,30,90,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:rotate-0"
                    />
                    <span className="min-w-0">
                      <span className="text-[12px] font-semibold text-black/45 dark:text-white/45">{BLURB[id].tag[lang]} · PDF</span>
                      <span className="mt-1.5 block font-sans text-lg md:text-2xl font-semibold leading-snug tracking-tight text-[#1d1d1f] dark:text-white text-balance">{edition.title}</span>
                      <span className="mt-2 hidden text-[15px] leading-relaxed text-black/60 dark:text-white/60 sm:block">{BLURB[id][lang]}</span>
                    </span>
                    <span className="col-span-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-5 py-3 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors group-hover:bg-black dark:group-hover:bg-white/90 sm:col-span-1">
                      {t('guides.cta')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
        <div className={`grid grid-cols-1 gap-4 md:gap-6 ${guides.length > 2 ? 'md:grid-cols-3' : guides.length > 1 ? 'md:grid-cols-2' : 'mx-auto max-w-xl'}`}>
          {guides.map(({ id, edition }, i) => (
            <Reveal key={id} y={28} delay={i * 0.08} className="h-full">
              <Link href={edition.path} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.07]">
                <div className="relative flex h-64 md:h-72 items-end justify-center overflow-hidden px-10 pt-10">
                  <Image
                    src={edition.cover}
                    alt=""
                    width={edition.coverWidth}
                    height={edition.coverHeight}
                    sizes="(max-width: 768px) 60vw, 260px"
                    className="w-[46%] max-w-[220px] translate-y-6 rounded-t-md shadow-[0_24px_48px_-20px_rgba(0,30,90,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-3"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">{BLURB[id].tag[lang]} · PDF</span>
                  <h3 className="mt-2 font-sans text-xl font-semibold leading-snug tracking-tight text-[#1d1d1f] dark:text-white">{edition.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{BLURB[id][lang]}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[15px] font-semibold text-brand">
                    {t('guides.cta')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
