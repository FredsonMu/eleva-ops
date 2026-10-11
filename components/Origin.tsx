'use client';
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronRight, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Brand, BrandText } from './Brand';
import { Reveal } from './Reveal';
import { LogoMark } from './LogoMark';

type PageId = 'manifesto' | 'pain' | 'cure' | 'truth';

// "Our Thesis" presented as a workspace document (Notion / Vercel style): a page tree on the
// left, the selected page on the right. Motion runs through LazyMotion + domAnimation, which
// keeps the animation code small and loads only what this section uses.
export function Origin() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<PageId>('manifesto');
  const tabsId = useId();
  const windowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(windowRef, { once: true, margin: '-20% 0px' });

  const pages: { id: PageId; label: string; number?: string }[] = [
    { id: 'manifesto', label: t('origin.ui.manifesto') },
    { id: 'pain', label: t('origin.o1.label').replace(/^\d+\s*\/\s*/, ''), number: '01' },
    { id: 'cure', label: t('origin.o2.label').replace(/^\d+\s*\/\s*/, ''), number: '02' },
    { id: 'truth', label: t('origin.o3.label').replace(/^\d+\s*\/\s*/, ''), number: '03' },
  ];
  const index = pages.findIndex(p => p.id === active);
  const current = pages[index];

  const go = useCallback((dir: 1 | -1) => {
    const ids: PageId[] = ['manifesto', 'pain', 'cure', 'truth'];
    setActive(prev => ids[(ids.indexOf(prev) + dir + ids.length) % ids.length]);
  }, []);

  // Arrow keys move between pages while focus is inside the window (accessible tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
  };

  // Keep keyboard focus on the selected tab after arrow navigation.
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    const el = document.activeElement;
    if (el && el.getAttribute('role') === 'tab' && el !== tabRefs.current[active]) tabRefs.current[active]?.focus();
  }, [active]);

  const fade = reduce
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 14, filter: 'blur(4px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, exit: { opacity: 0, y: -8, filter: 'blur(4px)' } };

  const tab = (p: (typeof pages)[number], variant: 'side' | 'top') => {
    const selected = p.id === active;
    return (
      <button
        key={p.id}
        ref={el => { tabRefs.current[p.id] = el; }}
        role="tab"
        id={`${tabsId}-${variant}-${p.id}`}
        aria-selected={selected}
        aria-controls={`${tabsId}-panel`}
        tabIndex={selected ? 0 : -1}
        onClick={() => setActive(p.id)}
        className={`relative flex items-center gap-2.5 rounded-xl text-left font-medium transition-colors ${
          variant === 'side' ? 'w-full px-3 py-2.5 text-sm' : 'shrink-0 px-3.5 py-2 text-[13px]'
        } ${selected ? 'text-[#1d1d1f] dark:text-white' : 'text-black/55 dark:text-white/55 hover:text-[#1d1d1f] dark:hover:text-white'}`}
      >
        {selected && (
          <m.span
            layoutId={`thesis-active-${variant}`}
            className="absolute inset-0 rounded-xl border-2 border-black/[0.08] dark:border-white/10 bg-white dark:bg-white/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          />
        )}
        <span className="relative flex items-center gap-2.5">
          {p.number ? (
            <span className={`font-mono text-[11px] ${selected ? 'text-brand' : 'text-black/45 dark:text-white/45'}`}>{p.number}</span>
          ) : (
            <FileText className={`h-4 w-4 ${selected ? 'text-brand' : ''}`} aria-hidden="true" />
          )}
          {p.label}
        </span>
      </button>
    );
  };

  return (
    <section className="py-20 md:py-40 relative overflow-hidden bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Thesis header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand mb-6 md:mb-8">{t('origin.label')}</span>
          <h2 className="font-sans text-[clamp(2.5rem,6vw,7rem)] font-semibold tracking-tighter leading-[1] text-[#1d1d1f] dark:text-white text-balance max-w-5xl">
            {t('origin.title1')} <br className="hidden lg:block" />
            <span className="text-black/45 dark:text-white/45 mt-2 block">{t('origin.title2')}</span>
          </h2>
        </div>

        <LazyMotion features={domAnimation} strict>
          <Reveal y={40} duration={0.9} className="max-w-6xl mx-auto">
            {/* Workspace window */}
            <div
              ref={windowRef}
              onKeyDown={onKeyDown}
              className="relative rounded-[24px] md:rounded-[28px] border-2 border-black/[0.08] dark:border-white/10 bg-[#fbfbfa] dark:bg-[#0b0f1a] shadow-[0_40px_100px_-40px_rgba(0,40,120,0.35)] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Title bar */}
              <div className="flex items-center gap-3 border-b-2 border-black/[0.06] dark:border-white/[0.08] px-4 md:px-5 h-12 bg-white/70 dark:bg-white/[0.02]">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#28c840]"></span>
                </div>
                <nav aria-label="Breadcrumb" className="ml-2 flex min-w-0 items-center gap-1.5 text-[13px] text-black/55 dark:text-white/55">
                  <Brand>Eleva Ops</Brand>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">{t('origin.label')}</span>
                  <ChevronRight className="hidden sm:block h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate font-semibold text-[#1d1d1f] dark:text-white">{current.label}</span>
                </nav>
                <span className="ml-auto hidden md:block text-[12px] text-black/45 dark:text-white/45">{t('origin.ui.hint')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
                {/* Sidebar (desktop) */}
                <aside className="hidden md:block border-r-2 border-black/[0.06] dark:border-white/[0.08] p-4 bg-black/[0.015] dark:bg-white/[0.015]">
                  <div className="flex items-center gap-2.5 px-2 pb-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black/[0.08] dark:border-white/10 bg-white dark:bg-white/[0.04]"><LogoMark className="h-4 w-auto" /></span>
                    <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white"><Brand>Eleva Ops</Brand></span>
                  </div>
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">{t('origin.ui.pages')}</p>
                  <div role="tablist" aria-orientation="vertical" aria-label={t('origin.label')} className="flex flex-col gap-1">
                    {pages.map(p => tab(p, 'side'))}
                  </div>
                </aside>

                {/* Tabs (mobile) */}
                <div className="md:hidden border-b-2 border-black/[0.06] dark:border-white/[0.08] px-3 py-2.5 overflow-x-auto no-scrollbar">
                  <div role="tablist" aria-label={t('origin.label')} className="flex gap-1">
                    {pages.map(p => tab(p, 'top'))}
                  </div>
                </div>

                {/* Document */}
                <div
                  id={`${tabsId}-panel`}
                  role="tabpanel"
                  className="relative min-h-[520px] md:min-h-[560px] px-5 py-8 sm:px-8 md:px-14 md:py-12"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <m.article key={active} {...fade} transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      {/* Page icon + title */}
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black/[0.08] dark:border-white/10 bg-white dark:bg-white/[0.04]" aria-hidden="true">
                        {current.number ? (
                          <span className="font-mono text-sm font-bold text-brand">{current.number}</span>
                        ) : (
                          <FileText className="h-5 w-5 text-brand" />
                        )}
                      </span>
                      <h3 className="mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-white text-balance">
                        {active === 'manifesto' && <BrandText text={t('origin.ui.manifestoTitle')} />}
                        {active === 'pain' && t('origin.o1.title')}
                        {active === 'cure' && t('origin.o2.title')}
                        {active === 'truth' && t('origin.o3.title')}
                      </h3>

                      {/* Properties */}
                      <dl className="mt-6 grid grid-cols-[110px_1fr] gap-y-2 text-sm">
                        <dt className="text-black/50 dark:text-white/50">{t('origin.ui.type')}</dt>
                        <dd>
                          <span className="inline-flex rounded-md border-2 border-[#007AFF]/15 bg-[#007AFF]/[0.06] px-2 py-0.5 text-[12px] font-semibold text-brand">{t('origin.ui.principle')}</span>
                        </dd>
                        <dt className="text-black/50 dark:text-white/50">{t('origin.ui.owner')}</dt>
                        <dd className="font-medium text-[#1d1d1f] dark:text-white"><Brand>Eleva Ops</Brand></dd>
                      </dl>

                      <div className="mt-8 h-[2px] w-full bg-black/[0.06] dark:bg-white/[0.08]" aria-hidden="true"></div>

                      {/* Body */}
                      <div className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-black/65 dark:text-white/70">
                        {active === 'manifesto' && (
                          <>
                            <p>{t('origin.p1')}</p>
                            <div className="mt-8 flex gap-4 rounded-2xl border-2 border-[#007AFF]/15 bg-[#007AFF]/[0.05] p-5 md:p-6">
                              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#007AFF]" aria-hidden="true"></span>
                              <div>
                                <p className="font-semibold text-[#1d1d1f] dark:text-white">{t('origin.footer.t1')}{t('origin.footer.t2')}</p>
                                <p className="mt-1 text-[15px] text-black/60 dark:text-white/60">{t('origin.footer.pill')}</p>
                              </div>
                            </div>
                          </>
                        )}
                        {active === 'pain' && <p>{t('origin.o1.desc')}</p>}
                        {active === 'cure' && <p>{t('origin.o2.desc')}</p>}
                        {active === 'truth' && (
                          <>
                            <p>{t('origin.o3.desc')}</p>
                            <p className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">{t('origin.ui.standard')}</p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                              {(['origin.o3.b2', 'origin.o3.b3', 'origin.o3.b4'] as const).map((key, i) => (
                                <li key={key} className="flex items-center gap-3">
                                  <m.span
                                    className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#0066cc] bg-[#0066cc] text-white"
                                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: reduce ? 0 : 0.25 + i * 0.18, type: 'spring', stiffness: 500, damping: 26 }}
                                    aria-hidden="true"
                                  >
                                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                  </m.span>
                                  <span className="font-semibold text-[#1d1d1f] dark:text-white">{t('origin.o3.b1')}{t(key)}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </m.article>
                  </AnimatePresence>

                  {/* Next page */}
                  <div className="mt-10 flex justify-start md:justify-end">
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-black/[0.1] dark:border-white/15 px-5 text-[13px] font-semibold text-[#1d1d1f] dark:text-white transition-colors hover:border-[#1d1d1f] dark:hover:border-white"
                    aria-label={t('origin.ui.next')}
                  >
                    {pages[(index + 1) % pages.length].label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                  </div>
                </div>
              </div>

              {/* Soft blue glow when the window enters the screen */}
              <div
                className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,122,255,0.16),transparent)] transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
              ></div>
            </div>
          </Reveal>
        </LazyMotion>
      </div>
    </section>
  );
}
