'use client';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';
import { BrandText } from './Brand';
import { ChaosToOrder } from './ChaosToOrder';
import { Reveal } from './Reveal';
import { ExcelIcon, GmailIcon, PaperIcon, SheetsIcon, WhatsAppIcon } from './BrandIcons';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="pt-12 pb-20 md:pt-20 md:pb-32 relative z-10 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <Reveal y={24} className="w-full mb-14 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-6 lg:gap-20">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border-2 border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-brand">
                {t('about.manifesto')}
              </span>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight mt-6 max-w-xl font-sans font-semibold text-[#1d1d1f] dark:text-white text-balance">
                {t('about.title1')}{' '}
                <span className="text-black/35 dark:text-white/35">{t('about.title2')}</span>
              </h2>
            </div>
            <p className="max-w-md text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty lg:pb-1">
              {t('about.lead')}
            </p>
          </div>

          {/* the tools a typical team juggles, a little out of line */}
          <ul className="mt-10 md:mt-12 flex flex-wrap gap-2.5" aria-label={t('about.toolsLabel')}>
            {[
              { Icon: WhatsAppIcon, name: 'WhatsApp', r: '-2deg' },
              { Icon: ExcelIcon, name: 'Excel', r: '1.5deg' },
              { Icon: GmailIcon, name: 'Gmail', r: '-1deg' },
              { Icon: SheetsIcon, name: 'Sheets', r: '2deg' },
              { Icon: PaperIcon, name: t('about.tools.paper'), r: '-1.5deg' },
            ].map(({ Icon, name, r }) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-black/70 dark:text-white/75 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:rotate-0"
                style={{ transform: `rotate(${r})` }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {name}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Editorial Problem Statement (No Card) */}
        <div className="w-full max-w-6xl mx-auto mb-16 md:mb-32 flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h3 className="text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-sans font-semibold text-balance">
              <span className="text-[#1d1d1f] dark:text-white">{t('about.hero.1')}</span>{' '}
              <span className="text-black/35 dark:text-white/35">{t('about.sym1')} {t('about.sym2')}</span>
            </h3>

            <div className="mt-8 md:mt-10 w-full max-w-lg">
              <p className="font-sans text-xl md:text-2xl font-semibold tracking-tight leading-snug text-[#1d1d1f] dark:text-white text-pretty">
                {t('about.hero.3')}
              </p>
              <p className="mt-4 font-sans text-base md:text-lg text-black/55 dark:text-white/55 leading-relaxed text-pretty">
                <BrandText text={t('about.p2')} />
              </p>
            </div>
          </div>

          {/* Scattered work: the same client spread across sheets, documents, follow-ups and chats */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <span className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,95,87,0.10),transparent)] dark:bg-[radial-gradient(closest-side,rgba(0,122,255,0.22),transparent)]" aria-hidden="true"></span>
            <Reveal y={36} className="relative w-full max-w-[460px] md:max-w-[520px]">
              <Image
                src="/hero/scattered-tasks.webp"
                alt={t('about.scatteredAlt')}
                width={1087}
                height={1358}
                sizes="(max-width: 768px) 90vw, 520px"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </Reveal>
          </div>

        </div>

        {/* Old way → new standard → outcome, as a bento row */}
        <ChaosToOrder />
      </div>
    </section>
  );
}
