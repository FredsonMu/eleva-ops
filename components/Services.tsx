'use client';
import { Check, MousePointer2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { FeatureTile as Tile, tileBar, tileWindow } from './FeatureTile';
import { useLanguage } from '@/lib/i18n';

// "What we do" as four quiet tiles: a small looping product moment in a soft panel, with the
// title and copy underneath. Loops are plain CSS (`.svc-*` in globals.css) and only run once
// the tile has scrolled into view; without motion each tile shows its finished state.

const win = tileWindow;
const bar = tileBar;

export function Services() {
  const { t } = useLanguage();
  const title = (key: Parameters<typeof t>[0]) => `${t(key).replace(/\s*\n\s*/, ' ')}.`;

  return (
    <section id="servicos" className="relative bg-transparent pt-24 md:pt-32 pb-32 md:pb-40 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-5 md:px-6">

        {/* Header */}
        <Reveal y={30} duration={0.7} className="mb-12 md:mb-20 flex flex-col items-center text-center">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-sans font-semibold text-[#1d1d1f] dark:text-white max-w-3xl text-balance">
            {t('serv.title')}
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">
            {t('serv.intro')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-16">

          {/* 01 · A site that turns visits into enquiries */}
          <Tile title={title('serv.1.title')} desc={t('serv.1.desc')} delay={0}>
            <div className={`${win} relative w-[78%] max-w-[340px] translate-y-6 overflow-visible`}>
              <div className="flex items-center gap-1.5 border-b border-black/[0.06] dark:border-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20"></span>
                <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20"></span>
                <span className={`${bar} ml-2 h-2 w-24`}></span>
              </div>
              <div className="px-5 pt-5 pb-10">
                <span className={`${bar} block h-3 w-3/4`}></span>
                <span className={`${bar} mt-2 block h-3 w-1/2`}></span>
                <span className={`${bar} mt-4 block h-2 w-5/6 opacity-60`}></span>
                <span className="svc-press mt-5 inline-flex rounded-full bg-[#007AFF] px-3.5 py-1.5 text-[11px] font-semibold text-white">{t('serv.v1.cta')}</span>
              </div>
              <MousePointer2 className="svc-cursor absolute left-[96px] top-[118px] h-5 w-5 fill-[#1d1d1f] text-white dark:fill-white dark:text-[#1d1d1f]" strokeWidth={1.5} />
              {/* enquiry toast */}
              <div className="svc-toast absolute -right-6 -top-5 flex items-center gap-2 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#16203a] px-3 py-2 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)]">
                <span className="h-2 w-2 rounded-full bg-[#28c840]"></span>
                <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white whitespace-nowrap">{t('serv.v1.enquiry')}</span>
              </div>
            </div>
          </Tile>

          {/* 02 · Steps that run by themselves */}
          <Tile title={title('serv.2.title')} desc={t('serv.2.desc')} delay={0.1}>
            <div className={`${win} mb-auto mt-auto w-[78%] max-w-[320px] px-4 py-3`}>
              {(['serv.v2.s1', 'serv.v2.s2', 'serv.v2.s3', 'serv.v2.s4'] as const).map((k, i) => (
                <div key={k} className="svc-step relative flex items-center gap-3 py-2" style={{ animationDelay: `${i * 0.6}s` }}>
                  {i < 3 && <span className="absolute left-[8px] top-[26px] h-[calc(100%-14px)] w-px bg-black/10 dark:bg-white/15"></span>}
                  <span className="svc-step-dot flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-2">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                  </span>
                  <span className="svc-step-label flex-1 text-[12px] font-semibold">{t(k)}</span>
                  <span className="text-[10px] tabular-nums text-black/40 dark:text-white/40">09:{14 + i}</span>
                </div>
              ))}
            </div>
          </Tile>

          {/* 03 · Scattered files land in one place */}
          <Tile title={title('serv.3.title')} desc={t('serv.3.desc')} delay={0}>
            <div className="absolute inset-x-0 top-6 flex justify-center gap-2">
              {['clients.xlsx', 'notes.pdf', 'orders.csv'].map((f, i) => (
                <span key={f} className="svc-file rounded-lg border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#16203a] px-2.5 py-1 text-[10px] font-semibold text-black/60 dark:text-white/60 shadow-sm" style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
              ))}
            </div>
            <div className={`${win} w-[82%] max-w-[360px] translate-y-6 overflow-hidden`}>
              <div className="flex">
                <div className="w-[26%] border-r border-black/[0.06] dark:border-white/10 p-3 pb-10">
                  <span className={`${bar} block h-2 w-3/4`}></span>
                  <span className="mt-3 block h-2 w-full rounded-full bg-[#007AFF]/30"></span>
                  <span className={`${bar} mt-3 block h-2 w-2/3`}></span>
                  <span className={`${bar} mt-3 block h-2 w-3/4`}></span>
                </div>
                <div className="flex-1 p-3">
                  <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white">{t('serv.v3.title')}</span>
                  {['Brightwell Clinic', 'Cedar Marketing', 'Lumen Studio'].map((name, i) => (
                    <div key={name} className="svc-row mt-2 flex items-center gap-2 rounded-md px-1.5 py-1" style={{ animationDelay: `${i * 0.2}s` }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]"></span>
                      <span className="flex-1 truncate text-[10px] font-medium text-black/70 dark:text-white/70">{name}</span>
                      <span className="rounded-full bg-[#007AFF]/10 px-1.5 py-0.5 text-[9px] font-semibold text-brand">{t('serv.v1.active')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tile>

          {/* 04 · An assistant that answers and books */}
          <Tile title={title('serv.4.title')} desc={t('serv.4.desc')} delay={0.1}>
            <div className="mb-auto mt-auto flex w-[80%] max-w-[330px] flex-col gap-2.5">
              <span className="svc-msg self-start rounded-2xl rounded-bl-md border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#16203a] px-3.5 py-2 text-[12px] text-[#1d1d1f] dark:text-white shadow-sm">
                {t('serv.v4.q')}
              </span>
              <span className="grid justify-items-end self-end">
                <span className="svc-typing [grid-area:1/1] flex h-fit w-fit gap-1 self-start rounded-2xl rounded-br-md bg-[#007AFF] px-3 py-2.5">
                  {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/80"></span>)}
                </span>
                <span className="svc-reply [grid-area:1/1] rounded-2xl rounded-br-md bg-[#007AFF] px-3.5 py-2 text-[12px] text-white shadow-sm">
                  {t('serv.v4.a')}
                </span>
              </span>
              <span className="svc-chip flex items-center gap-1.5 self-end rounded-full border border-[#28c840]/30 bg-[#28c840]/10 px-2.5 py-1 text-[10px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">
                <Check className="h-3 w-3" strokeWidth={3} />
                {t('serv.v4.booked')}
              </span>
            </div>
          </Tile>

        </div>
      </div>
    </section>
  );
}
