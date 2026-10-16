'use client';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';
import { tileBar, tileWindow } from './FeatureTile';
import { ExcelIcon, GmailIcon, WhatsAppIcon } from './BrandIcons';

// "The Path" as alternating rows: a soft panel with a small looping moment of the stage on one
// side, the stage and what the client gets on the other. Loops are CSS (`.loop` + `.pth-*` in
// globals.css), run once the row is in view and rest on their finished state without motion.

const TITLE = 'font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance';

export function Methodology() {
  const { t } = useLanguage();

  const steps = ([1, 2, 3, 4] as const).map(n => ({
    name: t(`meth.s${n}.t` as const),
    desc: t(`meth.s${n}.d` as const),
    get: t(`meth.s${n}.g` as const),
  }));

  // One small product moment per stage.
  const scenes = [
    // 01 · Diagnosis: where the time goes, and what to fix first
    <div key="s1" className={`${tileWindow} my-auto w-[84%] max-w-[380px] px-5 py-4`}>
      <span className="text-[12px] font-semibold text-[#1d1d1f] dark:text-white">{t('meth.v1.title')}</span>
      {[
        { Icon: WhatsAppIcon, name: 'WhatsApp', w: '82%', color: 'bg-[#ff5f57]' },
        { Icon: ExcelIcon, name: 'Excel', w: '58%', color: 'bg-[#febc2e]' },
        { Icon: GmailIcon, name: 'Gmail', w: '34%', color: 'bg-black/20 dark:bg-white/25' },
      ].map(({ Icon, name, w, color }, i) => (
        <div key={name} className="mt-3.5 flex items-center gap-2.5">
          <Icon className="h-4 w-4 shrink-0" />
          <span className="w-16 shrink-0 text-[11px] text-black/60 dark:text-white/60">{name}</span>
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-black/[0.05] dark:bg-white/[0.07]">
            <span className={`loop pth-meter absolute inset-y-0 left-0 rounded-full ${color}`} style={{ width: w, animationDelay: `${i * 0.25}s` }}></span>
          </span>
          {i === 0
            ? <span className="loop pth-pop rounded-full bg-[#ff5f57]/10 px-2 py-0.5 text-[9px] font-semibold text-[#d93a32] dark:text-[#ff8a84] whitespace-nowrap">{t('meth.v1.fix')}</span>
            : <span className="w-[52px]"></span>}
        </div>
      ))}
    </div>,

    // 02 · Plan: a proposal with a fixed scope and price
    <div key="s2" className={`${tileWindow} w-[70%] max-w-[300px] translate-y-6 px-5 pt-5 pb-10`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{t('meth.v2.doc')}</span>
        <span className="loop pth-stamp rounded-full border border-[#28c840]/40 bg-[#28c840]/10 px-2 py-0.5 text-[9px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">{t('meth.v2.ok')}</span>
      </div>
      <span className={`${tileBar} mt-3 block h-2 w-5/6`}></span>
      <span className={`${tileBar} mt-1.5 block h-2 w-2/3`}></span>
      <span className="mt-4 block text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">{t('meth.v2.scope')}</span>
      {['w-3/4', 'w-2/3', 'w-1/2'].map((w, i) => (
        <span key={w} className="mt-2 flex items-center gap-2">
          <span className="loop pth-tick flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-[#007AFF]" style={{ animationDelay: `${i * 0.3}s` }}>
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
          </span>
          <span className={`${tileBar} h-2 ${w}`}></span>
        </span>
      ))}
      <span className="mt-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/10 pt-3">
        <span className="text-[10px] text-black/50 dark:text-white/50">{t('meth.v2.price')}</span>
        <span className={`${tileBar} h-2.5 w-12 bg-black/15 dark:bg-white/20`}></span>
      </span>
    </div>,

    // 03 · Build: work moves across the board with your team
    <div key="s3" className="relative my-auto grid w-[88%] max-w-[420px] grid-cols-3 gap-2">
      {(['meth.v3.todo', 'meth.v3.build', 'meth.v3.done'] as const).map(k => (
        <div key={k} className="rounded-lg bg-black/[0.04] dark:bg-white/[0.05] p-2">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">{t(k)}</span>
          <span className={`${tileWindow} mt-2 block h-7 rounded-md shadow-none opacity-60`}></span>
          <span className={`${tileWindow} mt-1.5 block h-7 rounded-md shadow-none opacity-60`}></span>
          <span className="mt-1.5 block h-7"></span>
        </div>
      ))}
      <span className="loop pth-card absolute top-[97px] flex h-7 w-[calc((100%-16px)/3-16px)] items-center gap-1.5 rounded-md bg-[#007AFF] px-2 text-[9px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(0,122,255,0.7)]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"></span>
        <span className="truncate">{t('meth.v3.card')}</span>
      </span>
    </div>,

    // 04 · Launch and grow: switched on, then watched
    <div key="s4" className={`${tileWindow} my-auto w-[80%] max-w-[360px] px-5 py-4`}>
      <div className="flex items-center gap-3">
        <span className="flex-1 text-[12px] font-semibold text-[#1d1d1f] dark:text-white">{t('meth.v4.new')}</span>
        <span className="loop pth-live flex items-center gap-1 rounded-full bg-[#28c840]/10 px-2 py-0.5 text-[9px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]"></span>{t('meth.v4.live')}
        </span>
        <span className="loop pth-switch relative h-5 w-9 rounded-full bg-[#007AFF]">
          <span className="loop pth-knob absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow"></span>
        </span>
      </div>
      <div className="mt-3 border-t border-black/[0.06] dark:border-white/10 pt-3">
        <span className="text-[10px] text-black/50 dark:text-white/50">{t('meth.v4.watch')}</span>
        <svg viewBox="0 0 200 48" className="mt-1 h-12 w-full" fill="none">
          <path className="loop pth-line" d="M2 38 C 30 36, 40 30, 62 31 S 100 22, 120 20 S 160 12, 198 8" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" pathLength="1" />
        </svg>
      </div>
    </div>,
  ];

  return (
    <section id="metodo" className="relative bg-transparent pt-16 pb-24 md:pt-24 md:pb-36 z-10">
      <div className="max-w-6xl mx-auto px-5 md:px-6">

        <Reveal y={30} duration={0.7} className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <h2 className={`${TITLE} max-w-3xl`}>{t('meth.title1')}</h2>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">
            {t('meth.subtitle')}
          </p>
        </Reveal>

        <ol className="flex flex-col gap-20 md:gap-32">
          {steps.map((s, i) => (
            <li key={i}>
              <Reveal y={36} duration={0.8} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-20">
                <figure
                  className={`relative flex h-72 md:h-[24rem] items-end justify-center overflow-hidden rounded-2xl [&>*]:origin-bottom md:[&>*]:scale-[1.18] bg-black/[0.03] dark:bg-white/[0.04] ${i % 2 ? 'lg:order-2' : ''}`}
                  aria-hidden="true"
                >
                  {scenes[i]}
                </figure>
                <div className={i % 2 ? 'lg:order-1' : ''}>
                  <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">0{i + 1} · {s.name}</span>
                  <h3 className={`mt-3 ${TITLE}`}>{s.get}.</h3>
                  <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60 text-pretty">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal y={20} className="mt-20 md:mt-28 flex justify-center">
          <a
            href="mailto:contact@elevaops.com"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
          >
            {t('meth.cta')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
