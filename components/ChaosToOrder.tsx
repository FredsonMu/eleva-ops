'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';
import { ExcelIcon, GmailIcon, PaperIcon, SheetsIcon, WhatsAppIcon } from './BrandIcons';

type Stage = 0 | 1 | 2; // 0 chaos · 1 order · 2 outcome
const CYCLE_MS = 3000;

// The same follow-up list in both states. In chaos each row sits slightly off (x px, rotation).
const ROWS = [
  { task: 'about.task.1', source: 'WhatsApp', Icon: WhatsAppIcon, status: 'about.st.waiting', late: false, jitter: [7, -0.5] },
  { task: 'about.task.2', source: 'Excel', Icon: ExcelIcon, status: 'about.st.notUpdated', late: false, jitter: [-3, 0.35] },
  { task: 'about.task.3', source: 'Gmail', Icon: GmailIcon, status: 'about.st.missing', late: true, jitter: [11, -0.3] },
  { task: 'about.task.4', source: 'about.tools.paper', Icon: PaperIcon, status: 'about.st.todo', late: false, jitter: [4, 0.55] },
  { task: 'about.task.5', source: 'Sheets', Icon: SheetsIcon, status: 'about.st.late', late: true, jitter: [-2, -0.4] },
] as const;

// "Your week" as a calendar, 9:00–14:00: [day, start (h), end (h), title key, colour].
const HOURS = [9, 10, 11, 12, 13];
const EVENTS: [number, number, number, string, 'blue' | 'green' | 'violet'][] = [
  [0, 9, 10.5, 'about.ev.call', 'blue'],
  [0, 11, 12, 'about.ev.proposal', 'green'],
  [1, 9.5, 10.5, 'about.ev.planning', 'violet'],
  [1, 12, 13.5, 'about.ev.meeting', 'blue'],
  [2, 10, 12, 'about.ev.focus', 'violet'],
  [3, 9, 10, 'about.ev.call', 'blue'],
  [3, 11.5, 13, 'about.ev.demo', 'green'],
  [4, 10, 11.5, 'about.ev.meeting', 'blue'],
  [4, 12.5, 14, 'about.ev.planning', 'violet'],
];
const EVENT_COLORS = {
  blue: 'bg-[#e8f0fe] text-[#174ea6] border-[#1a73e8] dark:bg-[#1a73e8]/25 dark:text-[#aecbfa] dark:border-[#8ab4f8]',
  green: 'bg-[#e6f4ea] text-[#0d652d] border-[#34a853] dark:bg-[#34a853]/20 dark:text-[#a8dab5] dark:border-[#81c995]',
  violet: 'bg-[#f3e8fd] text-[#681da8] border-[#a142f4] dark:bg-[#a142f4]/20 dark:text-[#d7aefb] dark:border-[#c58af9]',
};
const fmt = (h: number) => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`;

export function ChaosToOrder() {
  const { t } = useLanguage();
  const [stage, setStage] = useState<Stage>(0);
  const [cycle, setCycle] = useState(0); // restarts the progress bar animation
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const days = t('about.week.days').split('|');
  const TODAY = 2; // Wednesday, highlighted like a calendar's current day
  const states = [
    { label: t('about.oldWay'), title: t('about.vision'), desc: t('about.chaos.desc'), window: t('about.win.chaos') },
    { label: t('about.newStandard'), title: t('about.scale'), desc: t('about.order.desc'), window: t('about.win.order') },
    { label: t('about.axis'), title: `${t('about.conversion')} ${t('about.conversion2')}`, desc: t('about.outcome.desc'), window: t('about.week') },
  ];
  const tr = (key: string) => (key.startsWith('about.') ? t(key as Parameters<typeof t>[0]) : key);

  const go = useCallback((s: Stage) => { setStage(s); setCycle(c => c + 1); }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    const el = rootRef.current;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    if (el) io.observe(el);
    return () => { mq.removeEventListener('change', sync); io.disconnect(); };
  }, []);

  // Autoplay: next stage every CYCLE_MS while on screen, not hovered and motion is allowed.
  const playing = visible && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(((stage + 1) % 3) as Stage), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [playing, stage, cycle, go]);

  const ordered = stage >= 1;

  return (
    <div className="w-full max-w-6xl mx-auto pt-8 md:pt-12">
      <Reveal y={24}>
        <h3 className="mx-auto max-w-2xl text-center font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#1d1d1f] dark:text-white text-balance">
          {t('about.bento.t1')}{' '}
          <span className="text-black/40 dark:text-white/40">{t('about.bento.t2')}</span>{' '}
          {t('about.bento.t3')}
        </h3>
      </Reveal>

      <Reveal y={36} className="mt-12 md:mt-16">
        <div
          ref={rootRef}
          onPointerEnter={e => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={e => e.pointerType === 'mouse' && setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mx-auto max-w-5xl"
        >
          {/* ── The window: the same list, first scattered, then running by itself, then the week it frees ── */}
          <figure className="relative overflow-hidden rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] px-4 sm:px-12 pt-8 sm:pt-14" aria-hidden="true">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-t-xl border border-b-0 border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.2)]">
              {/* title bar */}
              <div className="flex items-center gap-3 border-b border-black/[0.06] dark:border-white/10 bg-[#f7f7f9] dark:bg-white/[0.03] px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
                </span>
                <span className="grid flex-1 text-[12px] sm:text-[13px] font-medium text-black/60 dark:text-white/60">
                  {states.map((s, i) => (
                    <span key={i} className={`[grid-area:1/1] truncate transition-opacity duration-300 ${stage === i ? 'opacity-100' : 'opacity-0'}`}>{s.window}</span>
                  ))}
                </span>
                {/* live status of the list */}
                <span className="grid justify-items-end text-[11px] font-semibold">
                  <span className={`[grid-area:1/1] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#ff5f57]/10 px-2.5 py-1 text-[#d93a32] dark:text-[#ff8a84] transition-all duration-300 ${stage === 0 ? 'opacity-100' : 'opacity-0 scale-95'}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]"></span>{t('about.win.overdue')}
                  </span>
                  <span className={`[grid-area:1/1] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#007AFF]/10 px-2.5 py-1 text-brand transition-all duration-300 ${stage === 1 ? 'opacity-100' : 'opacity-0 scale-95'}`}>
                    <span className="stage-live h-1.5 w-1.5 rounded-full bg-[#007AFF]"></span>{t('about.win.running')}
                  </span>
                </span>
              </div>

              <div className="grid">
                {/* list (chaos + order) */}
                <div className={`[grid-area:1/1] transition-opacity duration-500 ${stage === 2 ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] sm:grid-cols-[32px_minmax(0,1fr)_120px_140px] items-center gap-x-3 border-b border-black/[0.06] dark:border-white/10 px-4 sm:px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                    <span></span>
                    <span>{t('about.col.task')}</span>
                    <span className="hidden sm:block">{t('about.col.source')}</span>
                    <span>{t('about.col.status')}</span>
                  </div>
                  <ul>
                    {ROWS.map((row, i) => (
                      <li
                        key={i}
                        className={`grid grid-cols-[28px_minmax(0,1fr)_auto] sm:grid-cols-[32px_minmax(0,1fr)_120px_140px] items-center gap-x-3 border-b border-black/[0.05] dark:border-white/[0.07] last:border-b-0 px-4 sm:px-5 py-3 sm:py-3.5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${stage === 1 ? 'stage-sweep' : ''}`}
                        style={{
                          transform: ordered ? 'none' : `translateX(${row.jitter[0]}px) rotate(${row.jitter[1]}deg)`,
                          transitionDelay: `${i * 60}ms`,
                          animationDelay: `${300 + i * 120}ms`,
                        }}
                      >
                        {/* checkbox */}
                        <span
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-2 transition-colors duration-300 ${ordered ? 'border-[#007AFF] bg-[#007AFF]' : 'border-black/20 dark:border-white/25 bg-transparent'} ${stage === 1 ? 'stage-pop' : ''}`}
                          style={{ transitionDelay: ordered ? `${400 + i * 120}ms` : '0ms', animationDelay: `${400 + i * 120}ms` }}
                        >
                          <Check
                            className={`h-3 w-3 text-white transition-all duration-300 ${ordered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                            strokeWidth={3.5}
                            style={{ transitionDelay: ordered ? `${450 + i * 120}ms` : '0ms' }}
                          />
                        </span>
                        <span className={`truncate text-[13px] sm:text-[15px] font-medium transition-colors duration-500 ${ordered ? 'text-black/45 dark:text-white/45' : 'text-[#1d1d1f] dark:text-white'}`} style={{ transitionDelay: ordered ? `${450 + i * 120}ms` : '0ms' }}>
                          <row.Icon className="mr-2 inline-block h-3.5 w-3.5 -translate-y-px sm:hidden" />{t(row.task)}
                        </span>
                        <span className="hidden sm:flex items-center gap-2 truncate text-[14px] text-black/60 dark:text-white/60"><row.Icon className="h-4 w-4 shrink-0" />{tr(row.source)}</span>
                        {/* status: chaos label, then "Automated" */}
                        <span className="grid justify-items-start">
                          <span
                            className={`[grid-area:1/1] whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] sm:text-[12px] font-semibold transition-all duration-300 ${
                              row.late ? 'bg-[#ff5f57]/10 text-[#d93a32] dark:text-[#ff8a84]' : 'bg-black/[0.05] dark:bg-white/[0.08] text-black/55 dark:text-white/60'
                            } ${ordered ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'}`}
                            style={{ transitionDelay: ordered ? `${400 + i * 120}ms` : '0ms' }}
                          >
                            {t(row.status)}
                          </span>
                          <span
                            className={`[grid-area:1/1] whitespace-nowrap rounded-full bg-[#007AFF]/10 px-2.5 py-1 text-[11px] sm:text-[12px] font-semibold text-brand transition-all duration-300 ${ordered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                            style={{ transitionDelay: ordered ? `${450 + i * 120}ms` : '0ms' }}
                          >
                            {t('about.st.auto')}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* outcome: the week, now a calendar of client and growth work */}
                <div className={`[grid-area:1/1] flex flex-col transition-opacity duration-500 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* day headers */}
                  <div className="grid grid-cols-[34px_repeat(5,minmax(0,1fr))] sm:grid-cols-[48px_repeat(5,minmax(0,1fr))] border-b border-black/[0.06] dark:border-white/10">
                    <span></span>
                    {days.map((day, d) => (
                      <span key={d} className="flex flex-col items-center gap-0.5 py-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${d === TODAY ? 'text-[#1a73e8] dark:text-[#8ab4f8]' : 'text-black/45 dark:text-white/45'}`}>{day}</span>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] sm:text-[15px] font-medium ${d === TODAY ? 'bg-[#1a73e8] text-white' : 'text-black/70 dark:text-white/75'}`}>{13 + d}</span>
                      </span>
                    ))}
                  </div>
                  {/* hour grid + events */}
                  <div className="relative grid flex-1 grid-cols-[34px_repeat(5,minmax(0,1fr))] sm:grid-cols-[48px_repeat(5,minmax(0,1fr))]">
                    <div className="relative">
                      {HOURS.map((h, i) => (
                        <span key={h} className="absolute right-1.5 sm:right-2 -translate-y-1/2 text-[9px] sm:text-[10px] tabular-nums text-black/40 dark:text-white/40" style={{ top: `${(i / HOURS.length) * 100}%` }}>
                          {i === 0 ? '' : `${h}:00`}
                        </span>
                      ))}
                    </div>
                    {days.map((_, d) => (
                      <div key={d} className="relative border-l border-black/[0.06] dark:border-white/10">
                        {HOURS.slice(1).map((_, i) => (
                          <span key={i} className="absolute inset-x-0 border-t border-black/[0.06] dark:border-white/10" style={{ top: `${((i + 1) / HOURS.length) * 100}%` }}></span>
                        ))}
                        {EVENTS.filter(e => e[0] === d).map(([, start, end, key, color], k) => {
                          const order = EVENTS.findIndex(e => e[0] === d && e[1] === start);
                          return (
                            <div
                              key={k}
                              className={`absolute inset-x-0.5 sm:inset-x-1 overflow-hidden rounded-md border-l-[3px] px-1.5 sm:px-2 py-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${EVENT_COLORS[color]} ${stage === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1.5 scale-[0.97]'}`}
                              style={{
                                top: `calc(${((start - 9) / HOURS.length) * 100}% + 2px)`,
                                height: `calc(${((end - start) / HOURS.length) * 100}% - 4px)`,
                                transitionDelay: stage === 2 ? `${250 + order * 90}ms` : '0ms',
                              }}
                            >
                              <span className="block line-clamp-2 break-words sm:line-clamp-none sm:truncate text-[9px] sm:text-[11px] font-semibold leading-tight">{t(key as Parameters<typeof t>[0])}</span>
                              <span className="hidden sm:block truncate text-[10px] leading-tight opacity-75">{fmt(start)} – {fmt(end)}</span>
                            </div>
                          );
                        })}
                        {/* current time */}
                        {d === TODAY && (
                          <span className={`absolute -left-1 right-0 z-10 flex items-center transition-opacity duration-500 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`} style={{ top: '46%', transitionDelay: stage === 2 ? '900ms' : '0ms' }}>
                            <span className="h-2 w-2 rounded-full bg-[#ea4335]"></span>
                            <span className="h-[2px] flex-1 bg-[#ea4335]"></span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </figure>

          {/* ── Steps: three columns, each with its progress line, title and copy ── */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 items-start gap-6 sm:gap-8" role="group">
            {states.map((s, i) => {
              const active = stage === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i as Stage)}
                  aria-pressed={active}
                  className={`group text-left transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-45 hover:opacity-75'}`}
                >
                  <span className="block h-[2px] w-full overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/10">
                    <span
                      key={`${cycle}-${i}`}
                      className={`block h-full rounded-full bg-[#007AFF] ${active ? (playing ? 'stage-progress' : 'w-full') : 'w-0'}`}
                      style={active && playing ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
                    ></span>
                  </span>
                  <span className="mt-5 block text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">
                    0{i + 1} · {s.label}
                  </span>
                  <span className="mt-2 block font-sans text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white">
                    {s.title}.
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-black/60 dark:text-white/60">
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
