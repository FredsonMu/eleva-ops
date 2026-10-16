'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, Search, SquarePen } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// "Our Thesis": a large soft panel (fynk style) with the title on top and, rising from the
// bottom, an Apple Notes window where the three beliefs are written as notes. The open note
// changes every CYCLE_MS while on screen (paused on hover); the text "types" in with a
// clip-path reveal, so the copy stays real, selectable text.

const CYCLE_MS = 5000;
type Note = 0 | 1 | 2;

export function Origin() {
  const { t } = useLanguage();
  const [note, setNote] = useState<Note>(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const notes = ([1, 2, 3] as const).map(n => ({
    label: t(`origin.o${n}.label` as const).replace(/^\d+\s*\/\s*/, ''),
    title: t(`origin.o${n}.title` as const),
    body: t(`origin.o${n}.desc` as const),
    time: ['09:12', '09:26', '09:41'][n - 1],
  }));

  const go = useCallback((n: Note) => setNote(n), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const el = rootRef.current;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (el) io.observe(el);
    return () => { mq.removeEventListener('change', sync); io.disconnect(); };
  }, []);

  const playing = visible && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(((note + 1) % 3) as Note), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [playing, note, go]);

  const current = notes[note];

  return (
    <section id="tese" className="relative bg-transparent py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={30} duration={0.8} className="overflow-hidden rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] px-5 pt-14 md:px-12 md:pt-20">
          {/* heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('origin.label')}</span>
            <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
              {t('origin.title1')}
              <span className="text-black/40 dark:text-white/40">{t('origin.title2')}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-black/55 dark:text-white/55 text-pretty">
              {t('origin.lead')}
            </p>
          </div>

          {/* Apple Notes window, rising from the bottom of the panel */}
          <div
            ref={rootRef}
            onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
            onPointerLeave={e => e.pointerType === 'mouse' && setPaused(false)}
            className="mx-auto mt-12 md:mt-16 max-w-4xl overflow-hidden rounded-t-2xl border border-b-0 border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.25)]"
          >
            {/* toolbar */}
            <div className="flex items-center gap-3 border-b border-black/[0.06] dark:border-white/10 bg-[#f6f6f6] dark:bg-[#2a2a2c] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
                <span className="h-3 w-3 rounded-full bg-[#febc2e]"></span>
                <span className="h-3 w-3 rounded-full bg-[#28c840]"></span>
              </span>
              <span className="ml-2 hidden sm:block text-[13px] font-semibold text-black/70 dark:text-white/80">{t('origin.notes')}</span>
              <span className="ml-auto flex items-center gap-3 text-[#d9a400]" aria-hidden="true">
                <SquarePen className="h-4 w-4" />
                <span className="hidden sm:flex items-center gap-1.5 rounded-md bg-black/[0.05] dark:bg-white/10 px-2 py-1 text-[11px] text-black/40 dark:text-white/40">
                  <Search className="h-3 w-3" />{t('origin.search')}
                </span>
              </span>
            </div>

            <div className="grid md:grid-cols-[230px_minmax(0,1fr)]">
              {/* note list */}
              <div className="border-b md:border-b-0 md:border-r border-black/[0.06] dark:border-white/10 bg-[#fafafa] dark:bg-[#232325] p-2" role="tablist" aria-label={t('origin.label')}>
                <span className="hidden md:block px-3 pt-1 pb-2 text-[11px] font-semibold text-black/40 dark:text-white/40">{t('origin.pinned')}</span>
                <div className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
                  {notes.map((n, i) => {
                    const active = note === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => go(i as Note)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-left transition-colors duration-300 ${active ? 'bg-[#ffd52e]/60 dark:bg-[#ffd52e]/25' : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'}`}
                      >
                        <span className="block truncate text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{n.label}</span>
                        <span className="hidden md:block truncate text-[12px] text-black/50 dark:text-white/50">
                          <span className="mr-1.5 text-black/40 dark:text-white/40">{n.time}</span>{n.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* open note */}
              <div className="relative min-h-[260px] md:min-h-[300px] px-6 py-6 md:px-10 md:py-8" role="tabpanel" aria-live="polite">
                <span className="hidden md:flex items-center gap-1 text-[11px] text-black/35 dark:text-white/35" aria-hidden="true">
                  <ChevronLeft className="h-3 w-3" />{t('origin.date')} {current.time}
                </span>
                <div key={note} className="note-write">
                  <h3 className="mt-0 md:mt-4 font-sans text-xl md:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                    {current.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] md:text-base leading-relaxed text-black/70 dark:text-white/75">
                    {current.body}
                  </p>
                </div>
                <span className={`note-caret mt-1 inline-block h-5 w-[2px] bg-[#d9a400] ${playing ? '' : 'opacity-0'}`} aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
