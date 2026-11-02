'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { CATALOG, type GuideId } from '@/lib/guide';
import { tileWindow } from '../FeatureTile';
import { HeroCopy, HeroSection, rise, stagePanel } from './HeroKit';

// /guides, as one large panel: the copy on the left; on the right the real covers rising from
// the bottom edge (each opens its guide) with the delivery email, PDF attached, laid over them.

const ORDER: GuideId[] = ['ai-lawyers', 'ai-agents'];
const COPY = {
  pt: { label: 'Guias gratuitos', title: 'Guias práticos sobre IA e automação, para usar já.', lead: 'Exemplos concretos, explicados sem jargão. Pede o guia e recebe o PDF no email.', cta: 'Receber o guia gratuito', secondary: 'Pedir diagnóstico', inbox: 'Caixa de entrada', now: 'agora', subject: 'O seu guia: ' },
  en: { label: 'Free guides', title: 'Practical guides on AI and automation, ready to use.', lead: 'Concrete examples, explained without jargon. Request a guide and get the PDF by email.', cta: 'Get the free guide', secondary: 'Request a diagnosis', inbox: 'Inbox', now: 'now', subject: 'Your guide: ' },
} as const;

export function GuidesHero() {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt' : 'en';
  const c = COPY[lang];
  const guides = ORDER.flatMap(id => {
    const e = CATALOG[id].editions[lang];
    return e ? [e] : [];
  });
  const first = guides[0];

  return (
    <HeroSection>
      <div className={`grid grid-cols-1 overflow-hidden lg:grid-cols-[1fr_1fr] ${stagePanel}`}>
        <div className="p-6 pt-10 sm:p-10 lg:p-14">
          <HeroCopy
            label={c.label}
            title={c.title}
            lead={c.lead}
            primary={first ? { href: first.path, label: c.cta } : undefined}
            secondary={{ href: '/contact', label: c.secondary }}
          />
        </div>

        <div className="hero-rise relative flex min-h-[400px] items-end justify-center gap-5 px-6 pt-40 sm:min-h-[460px] sm:gap-8 lg:pt-48" style={rise(300)}>
          {guides.map(g => (
            <Link key={g.path} href={g.path} className={`group ${guides.length > 1 ? 'w-[40%]' : 'w-[52%]'} max-w-[230px]`}>
              <Image
                src={g.cover}
                alt={g.title}
                width={g.coverWidth}
                height={g.coverHeight}
                sizes="(max-width: 1024px) 45vw, 230px"
                className="h-auto w-full translate-y-6 rounded-t-md shadow-[0_24px_48px_-20px_rgba(0,30,90,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-2"
              />
            </Link>
          ))}

          {/* what arrives: the delivery email with the PDF attached */}
          {first && (
            <div className={`${tileWindow} absolute left-4 right-4 top-6 overflow-hidden text-left sm:left-auto sm:right-8 sm:w-[340px] lg:top-14`} aria-hidden="true">
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/10 px-4 py-2">
                <span className="text-[12px] font-semibold text-[#1d1d1f] dark:text-white">{c.inbox}</span>
                <span className="text-[11px] text-black/45 dark:text-white/45">{c.now}</span>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] dark:bg-white text-[12px] font-bold text-white dark:text-[#020617]">E</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">Eleva Ops</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#007AFF]"></span>
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] font-medium text-[#1d1d1f] dark:text-white/90">{c.subject}{first.title}</span>
                  <span className="mt-2 inline-flex max-w-full items-center gap-2 rounded-lg border border-black/[0.08] dark:border-white/10 px-2 py-1">
                    <span className="rounded bg-[#ff5f57] px-1 py-0.5 text-[9px] font-bold text-white">PDF</span>
                    <span className="truncate text-[11px] font-medium text-black/70 dark:text-white/75">{first.pdfFileName}</span>
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </HeroSection>
  );
}
