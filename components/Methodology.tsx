'use client';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

const steps = [1, 2, 3, 4] as const;

export function Methodology() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // Scroll progress for the path: one passive listener, at most one update per frame, and only
  // transform/class changes (no React re-render, no layout work on every frame).
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const items = [...list.querySelectorAll<HTMLElement>('[data-step]')];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const focus = window.innerHeight * 0.55; // the "reading line" on screen
      const progress = Math.min(1, Math.max(0, (focus - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
      for (const item of items) {
        const dot = item.querySelector<HTMLElement>('[data-dot]');
        const reached = !!dot && dot.getBoundingClientRect().top + 24 <= focus;
        item.classList.toggle('is-active', reached);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    // Only listen while the section is near the viewport.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }, { rootMargin: '20% 0px 20% 0px' });
    io.observe(list);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="metodo" className="bg-transparent relative pt-8 pb-20 md:pt-8 md:pb-32 z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Intro: sticky on desktop while the steps scroll by */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36 flex flex-col items-start">
            <span className="inline-block px-4 py-1.5 rounded-full border-2 border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-brand">
              {t('meth.label')}
            </span>
            <h2 className="mt-6 font-sans text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] font-semibold tracking-tight text-[#1d1d1f] dark:text-white text-balance">
              {t('meth.title1')}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-black/60 dark:text-white/60 font-medium leading-relaxed max-w-md">
              {t('meth.subtitle')}
            </p>
            <a
              href="mailto:contact@elevaops.com"
              className="group mt-8 hidden lg:inline-flex items-center gap-2 rounded-full border-2 border-[#1d1d1f] dark:border-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white transition-colors hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-[#020617]"
            >
              {t('meth.cta')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* The path */}
        <div className="lg:col-span-7">
          <ol ref={listRef} className="relative">
            {/* track + scroll-driven fill (centred on the step circles) */}
            <span className="absolute left-[22px] md:left-[26px] top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-black/[0.08] dark:bg-white/10" aria-hidden="true"></span>
            <span
              ref={fillRef}
              className="method-fill absolute left-[22px] md:left-[26px] top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-[#007AFF] origin-top"
              aria-hidden="true"
            ></span>

            {steps.map(n => (
              <li key={n} data-step className="method-step group relative pl-16 md:pl-24 pb-14 md:pb-20 last:pb-0">
                <span
                  data-dot
                  className="method-dot absolute left-0 top-0 flex h-11 w-11 md:h-[52px] md:w-[52px] items-center justify-center rounded-full border-[3px] border-black/[0.12] dark:border-white/15 bg-[#fdfdfd] dark:bg-[#020617] font-mono text-xs md:text-sm font-bold text-black/60 dark:text-white/60"
                  aria-hidden="true"
                >
                  0{n}
                </span>
                <Reveal y={24}>
                  <p className="sr-only">0{n}</p>
                  <h3 className="pt-1.5 md:pt-2.5 font-sans text-2xl md:text-[2rem] font-semibold tracking-tight leading-tight text-[#1d1d1f] dark:text-white">
                    {t(`meth.s${n}.t` as const)}
                  </h3>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60 max-w-xl">
                    {t(`meth.s${n}.d` as const)}
                  </p>
                  <p className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border-2 border-black/[0.08] dark:border-white/10 bg-white/70 dark:bg-white/[0.03] px-4 py-3 text-sm md:text-[15px] font-semibold text-[#1d1d1f] dark:text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand">{t('meth.youGet')}</span>
                    {t(`meth.s${n}.g` as const)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <a
            href="mailto:contact@elevaops.com"
            className="group mt-12 lg:hidden inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-[#1d1d1f] dark:border-white px-6 text-[11px] font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white transition-colors hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-[#020617]"
          >
            {t('meth.cta')}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
