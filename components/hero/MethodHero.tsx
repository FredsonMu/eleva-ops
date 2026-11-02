'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { HeroCtas, HeroSection, heroLead, heroTitle, rise, stagePanel } from './HeroKit';

// /method, editorial: a large two-tone title on the left, the lead and actions aligned to its
// baseline on the right, then a project moving through the four stages across the full width.

const STEP_MS = 3200;

const COPY = {
  pt: { label: 'Método', title: ['Do diagnóstico', 'ao sistema em produção.'], secondary: 'Ver as soluções', project: 'Projeto · Portal de clientes', stage: (n: number) => `Fase ${n} de 4`, get: 'Recebe' },
  en: { label: 'Method', title: ['From diagnosis', 'to a system in production.'], secondary: 'See the solutions', project: 'Project · Client portal', stage: (n: number) => `Stage ${n} of 4`, get: 'You get' },
} as const;

export function MethodHero() {
  const { t, language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  const steps = ([1, 2, 3, 4] as const).map(n => ({ name: t(`meth.s${n}.t` as const), get: t(`meth.s${n}.g` as const) }));

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => { mq.removeEventListener('change', sync); io.disconnect(); };
  }, []);
  const playing = visible && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive(a => (a + 1) % 4), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, active]);
  const shown = reduced ? 3 : active;

  return (
    <HeroSection>
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <span className="hero-rise block text-[13px] font-semibold text-black/45 dark:text-white/45">{c.label}</span>
          <h1 className={`hero-rise mt-4 text-[clamp(2.6rem,6.2vw,5.2rem)] ${heroTitle}`} style={rise(80)}>
            {c.title[0]} <span className="text-black/35 dark:text-white/35">{c.title[1]}</span>
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pb-2">
          <p className={`hero-rise ${heroLead}`} style={rise(160)}>{t('meth.subtitle')}</p>
          <div className="hero-rise mt-8" style={rise(240)}>
            <HeroCtas secondary={{ href: '/solutions', label: c.secondary }} />
          </div>
        </div>
      </div>

      <div ref={ref} className={`hero-rise mt-14 md:mt-20 ${stagePanel} p-5 sm:p-8 md:p-10`} style={rise(320)}>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{c.project}</span>
          <span className="flex items-center gap-2 rounded-full bg-white dark:bg-white/[0.08] px-3 py-1 text-[12px] font-semibold text-black/70 dark:text-white/75 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]"></span>{c.stage(shown + 1)}
          </span>
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 md:grid-cols-4 md:gap-5">
          {steps.map((st, i) => {
            const done = i < shown;
            const on = i === shown;
            return (
              <li key={st.name} className={`transition-opacity duration-500 ${done || on ? 'opacity-100' : 'opacity-45'}`} aria-current={on ? 'step' : undefined}>
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/10">
                  {done && <span className="block h-full w-full rounded-full bg-[#007AFF]"></span>}
                  {on && <span key={`${active}`} className={`block h-full rounded-full bg-[#007AFF] ${playing ? 'stage-progress' : 'w-full'}`} style={playing ? { animationDuration: `${STEP_MS}ms` } : undefined}></span>}
                </span>
                <span className="mt-4 block font-mono text-[12px] font-bold text-brand">0{i + 1}</span>
                <span className="mt-1 block text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{st.name}</span>
                <span className="mt-2 block text-[14px] leading-relaxed text-black/60 dark:text-white/60">
                  <span className="text-black/40 dark:text-white/40">{c.get}: </span>{st.get.charAt(0).toLowerCase() + st.get.slice(1)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </HeroSection>
  );
}
