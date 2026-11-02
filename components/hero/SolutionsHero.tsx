'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { SOLUTIONS_COPY, SOLUTION_SCENES } from '../SolutionsDetail';
import { HeroCopy, HeroSection, rise, stagePanel } from './HeroKit';

// /solutions, split: the copy and a numbered list of the four solutions on the left; the live
// product moment of the selected one on the right (the same scenes as the rows below). The
// list moves on by itself while on screen; hovering or choosing one hands control to the visitor.

const CYCLE_MS = 6000;

const COPY = {
  pt: { label: 'Soluções', title: 'Websites, software, automação e agentes de IA.', lead: 'Cada solução é desenhada à volta do seu processo e ligada às ferramentas que já usa. Muitas vezes, as quatro trabalham no mesmo sistema.', secondary: 'Ver o método', more: 'Ver em detalhe' },
  en: { label: 'Solutions', title: 'Websites, software, automation and AI agents.', lead: 'Each solution is designed around your process and connected to the tools you already use. Often all four run in the same system.', secondary: 'See the method', more: 'See in detail' },
} as const;

export function SolutionsHero() {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt' : 'en';
  const c = COPY[lang];
  const s = SOLUTIONS_COPY[lang];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => { mq.removeEventListener('change', sync); io.disconnect(); };
  }, []);
  const playing = visible && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setActive(a => (a + 1) % 4), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [playing, active]);

  const Scene = SOLUTION_SCENES[active];
  const sv = s.services[active];

  return (
    <HeroSection>
      <div
        ref={rootRef}
        onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={e => e.pointerType === 'mouse' && setPaused(false)}
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14"
      >
        <div>
          <HeroCopy label={c.label} title={c.title} lead={c.lead} secondary={{ href: '/method', label: c.secondary }} />

          {/* the four solutions, as the control for the preview */}
          <ol role="tablist" aria-label={c.label} className="hero-rise mt-10 grid grid-cols-2 gap-x-6 border-t border-black/[0.08] dark:border-white/10 sm:grid-cols-4 lg:grid-cols-2" style={rise(320)}>
            {s.services.map((item, i) => {
              const on = active === i;
              return (
                <li key={item.id} className="border-b border-black/[0.08] dark:border-white/10">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => { setActive(i); setPaused(true); }}
                    className={`relative flex w-full items-baseline gap-2.5 py-3.5 text-left transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <span className="font-mono text-[12px] font-bold text-brand">0{i + 1}</span>
                    <span className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">{item.tag}</span>
                    <span className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden">
                      {on && <span key={`${active}-${playing}`} className={`block h-full bg-[#007AFF] ${playing ? 'stage-progress' : 'w-full'}`} style={playing ? { animationDuration: `${CYCLE_MS}ms` } : undefined}></span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="hero-rise" style={rise(280)}>
          {/* the selected solution, live; `in-view` starts the scene loops */}
          <div role="tabpanel" aria-label={sv.tag} className={`in-view relative flex h-80 sm:h-[26rem] lg:h-[30rem] items-end justify-center overflow-hidden text-left ${stagePanel} [&>*]:origin-bottom md:[&>*]:scale-[1.1]`}>
            <Scene key={active} s={s.scene} />
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <p className="max-w-md text-[15px] leading-relaxed text-black/60 dark:text-white/60" aria-live="polite">
              <span className="font-semibold text-[#1d1d1f] dark:text-white">{sv.title}</span> {s.fit} {sv.fit}
            </p>
            <a href={`#${sv.id}`} className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-brand">
              {c.more}<ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </HeroSection>
  );
}
