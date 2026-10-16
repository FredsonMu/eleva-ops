'use client';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

const CYCLE_MS = 4000;

export function Team() {
  const { t } = useLanguage();

  // The photos already carry each name and role.
  const members = [
    { name: 'Eduardo', role: t('team.m1.role'), focus: t('team.m1.focus'), img: '/team/eduardo.webp' },
    { name: 'Fredson', role: t('team.m2.role'), focus: t('team.m2.focus'), img: '/team/fredson.webp' },
    { name: 'Miguel', role: t('team.m3.role'), focus: t('team.m3.focus'), img: '/team/miguel.webp' },
  ];

  // one person on stage at a time; moves on every CYCLE_MS while visible and not hovered
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (stageRef.current) io.observe(stageRef.current);
    return () => { mq.removeEventListener('change', sync); io.disconnect(); };
  }, []);
  const playing = visible && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive(a => (a + 1) % 3), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [playing, active]);

  return (
    <section className="pt-12 pb-24 md:pt-20 md:pb-40 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-6">

        {/* Our commitment: one soft panel, the promise and three plain facts */}
        <Reveal y={28} duration={0.8} className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] px-6 py-12 md:px-16 md:py-20 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">{t('team.label')}</span>
          <h3 className="mx-auto mt-4 max-w-3xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#1d1d1f] dark:text-white text-balance">
            {t('team.quote')}
          </h3>
          {/* Commitments taken from the FAQ answers — no invented testimonials or figures. */}
          <ul className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-x-8">
            {(['team.c1', 'team.c2', 'team.c3'] as const).map(key => (
              <li key={key} className="flex items-center gap-2 text-[15px] font-medium text-black/70 dark:text-white/75">
                <Check className="h-4 w-4 shrink-0 text-[#007AFF]" strokeWidth={2.5} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The team: the list of people on one side, the active portrait on a soft panel on the other */}
        <Reveal y={30} duration={0.8} className="mt-24 md:mt-40">
          <div
            id="equipa"
            ref={stageRef}
            onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
            onPointerLeave={e => e.pointerType === 'mouse' && setPaused(false)}
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-10 lg:gap-16"
          >
            <div>
              <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('team.label2')}</span>
              <h2 className="mt-3 max-w-md font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
                {t('team.short')}
              </h2>

              <div className="mt-8 md:mt-10 flex flex-col" role="tablist" aria-label={t('team.label2')}>
                {members.map((m, i) => {
                  const on = active === i;
                  return (
                    <button
                      key={m.name}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={`group border-t border-black/[0.08] dark:border-white/10 py-4 text-left transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-sans text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{m.name}</span>
                        <span className="text-[13px] font-medium text-black/50 dark:text-white/55">{m.role}</span>
                      </span>
                      <span className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{m.focus}</span>
                        </span>
                      </span>
                      <span className="mt-3 block h-[2px] w-full overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/10">
                        <span
                          key={`${active}-${i}`}
                          className={`block h-full rounded-full bg-[#007AFF] ${on ? (playing ? 'stage-progress' : 'w-full') : 'w-0'}`}
                          style={on && playing ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
                        ></span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* stage: the active portrait rises from the bottom of a soft panel */}
            <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] px-8 pt-10 sm:px-12 sm:pt-12 order-first">
              <div className="grid">
                {members.map((m, i) => (
                  <figure
                    key={m.name}
                    className={`[grid-area:1/1] overflow-hidden rounded-t-2xl bg-[#bfe3fb] ring-1 ring-black/5 dark:ring-white/10 shadow-[0_-12px_40px_-24px_rgba(0,40,120,0.45)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
                    aria-hidden={active !== i}
                  >
                    <Image
                      src={m.img}
                      alt={`${m.name}, ${m.role}`}
                      width={1122}
                      height={1402}
                      quality={90}
                      sizes="(max-width: 640px) 80vw, 400px"
                      className="h-auto w-full select-none"
                      draggable={false}
                      priority={false}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
