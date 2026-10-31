'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Reveal, useInView } from './Reveal';

// /about, in the spirit of fynk's about page: a short opening with a moving line of words,
// the vision as one paragraph whose key words light up, the team (three portraits on desktop,
// one swipeable portrait at a time on mobile) and the principles as a numbered list.
// Motion is CSS only (marquee, highlight, hover), so the page stays light.

const COPY = {
  en: {
    visionLabel: 'Why we exist',
    vision: [
      'In most companies we visit, managers spend part of the week ',
      { h: 'copying data' }, ', ', { h: 'chasing documents' }, ' and answering the same questions. ',
      'We build the websites, internal systems and AI agents that handle that work, ',
      'so the time goes back to ', { h: 'clients' }, ', ', { h: 'the team' }, ' and ', { h: 'planning' }, '.',
    ],
    teamLabel: 'The team',
    teamTitle: 'Small team. Direct contact.',
    teamLead: 'You talk to the people who design and build your system, from the first call to launch.',
    valuesLabel: 'What we stand for',
    values: [
      ['We start by listening', 'Before proposing anything, we map how you work today and where time is really lost.'],
      ['The simplest thing that works', 'We build what solves the real problem, without over-engineering.'],
      ['Your team stays in control', 'People approve what matters, and we switch over only when you are ready.'],
      ['Good design is good business', 'If a tool isn’t clear and fast, nobody uses it. So it has to be both.'],
    ],
  },
  pt: {
    visionLabel: 'Porque existimos',
    vision: [
      'Na maioria das empresas que visitamos, quem gere passa parte da semana ',
      { h: 'a copiar dados' }, ', ', { h: 'a procurar documentos' }, ' e a responder às mesmas perguntas. ',
      'Construímos os websites, sistemas internos e agentes de IA que tratam desse trabalho, ',
      'para que o tempo volte aos ', { h: 'clientes' }, ', à ', { h: 'equipa' }, ' e ao ', { h: 'planeamento' }, '.',
    ],
    teamLabel: 'A equipa',
    teamTitle: 'Equipa pequena. Contacto direto.',
    teamLead: 'Fala com as pessoas que desenham e constroem o seu sistema, da primeira chamada ao lançamento.',
    valuesLabel: 'O que defendemos',
    values: [
      ['Começamos por ouvir', 'Antes de propor seja o que for, mapeamos como trabalha hoje e onde se perde tempo de verdade.'],
      ['O mais simples que funciona', 'Construímos o que resolve o problema real, sem complicar.'],
      ['A sua equipa mantém o controlo', 'As pessoas aprovam o que importa, e só mudamos quando estiver pronto.'],
      ['Bom design é bom negócio', 'Se uma ferramenta não for clara e rápida, ninguém a usa. Por isso tem de ser as duas coisas.'],
    ],
  },
} as const;

export function AboutView() {
  const { language, t } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  const [visionRef, visionIn] = useInView<HTMLParagraphElement>('0px 0px -20% 0px');

  const members = [
    { name: 'Eduardo', role: t('team.m1.role'), focus: t('team.m1.focus'), skills: t('team.m1.skills'), img: '/team/eduardo.webp' },
    { name: 'Fredson', role: t('team.m2.role'), focus: t('team.m2.focus'), skills: t('team.m2.skills'), img: '/team/fredson.webp' },
    { name: 'Miguel', role: t('team.m3.role'), focus: t('team.m3.focus'), skills: t('team.m3.skills'), img: '/team/miguel.webp' },
  ];

  // The team is always in motion: one person is "on" at a time and it moves on every
  // TEAM_MS. Desktop: the active card lifts and shows its details. Mobile: the row scrolls to
  // the active card. Pauses on hover or touch, and when the section is off screen.
  const TEAM_MS = 3500;
  const rowRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [hold, setHold] = useState(false);
  const [teamRef, teamVisible] = useInView<HTMLDivElement>('0px');
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const running = teamVisible && !hold && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setSlide(x => (x + 1) % 3), TEAM_MS);
    return () => window.clearTimeout(id);
  }, [running, slide]);
  // on mobile, bring the active card into view (horizontally only)
  useEffect(() => {
    const row = rowRef.current;
    if (!row || window.matchMedia('(min-width: 768px)').matches) return;
    const card = row.children[slide] as HTMLElement | undefined;
    if (card) row.scrollTo({ left: card.offsetLeft - row.offsetLeft - 20, behavior: reduced ? 'auto' : 'smooth' });
  }, [slide, reduced]);
  const onScroll = () => {
    if (!hold) return; // only follow the user's own swipes
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (row && card) setSlide(Math.min(2, Math.round(row.scrollLeft / (card.offsetWidth + 16))));
  };


  let hi = 0;
  return (
    <>
      {/* vision: key words light up as the paragraph comes into view (the opening is AboutHero) */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{c.visionLabel}</span>
          <p ref={visionRef} className={`mt-4 font-sans text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.35] tracking-tight font-semibold text-black/35 dark:text-white/35 ${visionIn ? 'is-lit' : ''}`}>
            {c.vision.map((part, i) =>
              typeof part === 'string'
                ? <span key={i}>{part}</span>
                : <span key={i} className="about-hi" style={{ transitionDelay: `${300 + hi++ * 160}ms` }}>{part.h}</span>,
            )}
          </p>
        </div>
      </section>

      {/* team */}
      <section id="equipa" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <Reveal y={24} className="mb-10 md:mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{c.teamLabel}</span>
              <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white">{c.teamTitle}</h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-black/55 dark:text-white/55">{c.teamLead}</p>
          </Reveal>

          <div ref={teamRef}>
          <div
            ref={rowRef}
            onScroll={onScroll}
            onPointerEnter={e => e.pointerType === 'mouse' && setHold(true)}
            onPointerLeave={e => e.pointerType === 'mouse' && setHold(false)}
            onTouchStart={() => setHold(true)}
            onTouchEnd={() => window.setTimeout(() => setHold(false), 2500)}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {members.map((m, i) => (
              <Reveal key={m.name} y={28} delay={i * 0.1} className="w-[82%] shrink-0 snap-center md:w-auto">
                <figure onMouseEnter={() => setSlide(i)} className={`team-card group relative overflow-hidden rounded-3xl bg-[#bfe3fb] ring-1 ring-black/5 dark:ring-white/10 ${slide === i ? 'is-on' : ''}`}>
                  <Image src={m.img} alt={`${m.name}, ${m.role}`} width={1122} height={1402} quality={90} sizes="(max-width: 768px) 82vw, 380px" className="team-photo h-auto w-full" />
                  {/* details slide up on hover (always shown on touch screens) */}
                  <figcaption className="team-caption m-3 rounded-2xl md:absolute md:m-0 md:inset-x-3 md:bottom-3 bg-white/90 dark:bg-[#0b1220]/85 p-4 backdrop-blur-md">
                    <span className="block text-[14px] leading-snug text-black/70 dark:text-white/75">{m.focus}</span>
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.skills.split('|').slice(0, 3).map(sk => (
                        <span key={sk} className="rounded-full bg-[#007AFF]/10 px-2.5 py-1 text-[11px] font-semibold text-brand">{sk}</span>
                      ))}
                    </span>
                  </figcaption>
                  <span className="absolute inset-x-3 top-3 h-[3px] overflow-hidden rounded-full bg-white/40">
                    <span key={`${slide}-${i}`} className={`block h-full rounded-full bg-white ${slide === i ? (running ? 'stage-progress' : 'w-full') : 'w-0'}`} style={slide === i && running ? { animationDuration: `${TEAM_MS}ms` } : undefined}></span>
                  </span>
                </figure>
              </Reveal>
            ))}
          </div>
          </div>
          <div className="mt-5 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
            {members.map((m, i) => (
              <span key={m.name} className={`h-1.5 rounded-full transition-all duration-300 ${slide === i ? 'w-5 bg-[#007AFF]' : 'w-1.5 bg-black/20 dark:bg-white/25'}`}></span>
            ))}
          </div>
        </div>
      </section>

      {/* principles as a numbered list, no cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <Reveal y={24}>
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{c.valuesLabel}</span>
          </Reveal>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {c.values.map(([title, text], i) => (
              <li key={title}>
                <Reveal y={20} delay={(i % 2) * 0.08} className="group flex gap-5 border-t border-black/[0.08] dark:border-white/10 py-7">
                  <span className="font-mono text-sm font-bold text-brand transition-transform duration-500 group-hover:-translate-y-0.5">0{i + 1}</span>
                  <span>
                    <span className="block text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{title}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-black/60 dark:text-white/60">{text}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
