'use client';
import { ArrowUp, CalendarClock, Check, FileText, FolderOpen, Scale, Users } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { Avatars, heroLead, heroTitle, rise, stagePanel } from '@/components/hero/HeroKit';
import { tileBar, tileWindow } from '@/components/FeatureTile';
import { StickyGuideCTA } from '@/components/guide/StickyGuideCTA';
import { WaitlistForm } from './WaitlistForm';

// /legalops: waitlist for LegalOps, the platform for law firms ElevaOps is building. Visitors
// come from the Instagram bio, so it is built phone first: promise and form above the fold, then
// one product moment, what it will do, and what they get by email while they wait.
// The loops reuse the services tiles' language (`.svc-*`) plus the `.wl-*` ones in globals.css.

const FORM_ID = 'entrar';
const muted = 'text-black/60 dark:text-white/60';

const BUILDING = [
  { icon: CalendarClock, title: 'Prazos que não escapam.', text: 'Cada prazo com o processo, o responsável e o aviso a tempo. Sem depender da memória de ninguém.' },
  { icon: FolderOpen, title: 'Documentos onde devem estar.', text: 'Peças, procurações e pedidos ao cliente ligados ao processo, prontos a encontrar.' },
  { icon: Users, title: 'A equipa sem perguntas.', text: 'Quem faz o quê e em que ponto está, à vista de todos. Menos “já trataste disto?”.' },
];

const DEADLINES = [
  { task: 'Contestação', proc: 'Proc. 1043/25', due: 'em 3 dias' },
  { task: 'Requerimento de prova', proc: 'Proc. 877/25', due: 'em 6 dias' },
  { task: 'Alegações', proc: 'Proc. 512/24', due: 'em 12 dias' },
];

const INBOX = [
  { from: 'LegalOps', subject: 'Está na lista de espera', preview: 'O seu lugar está guardado. Para começar já…', when: 'agora' },
  { from: 'ElevaOps', subject: '10 tarefas onde a IA poupa tempo ao advogado', preview: 'Da consulta à pesquisa, com a revisão no sítio certo.', when: 'semana 1' },
  { from: 'ElevaOps', subject: 'Automatizar o pedido de documentos ao cliente', preview: 'Um fluxo simples que pode montar esta semana.', when: 'semana 2' },
  { from: 'LegalOps', subject: 'Primeiras imagens e acesso antecipado', preview: 'Quem está na lista experimenta primeiro.', when: 'em breve' },
];

export function LegalOpsMark({ className = '' }: { className?: string }) {
  return (
    <span className={'inline-flex items-center gap-2 ' + className}>
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#007AFF] text-white shadow-[0_6px_16px_-6px_rgba(0,122,255,0.7)]">
        <Scale className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">LegalOps</span>
    </span>
  );
}

// The product moment: this week's deadlines. A row lights up, its step completes, the chip turns
// to "Feito", a document drops in and the team gets the reminder. Loops while on screen.
function DeadlinesWindow() {
  return (
    <Reveal y={24} duration={0.8} className={`relative flex h-[340px] items-center justify-center overflow-hidden sm:h-[380px] ${stagePanel}`}>
      <span className="svc-file absolute inset-x-0 top-6 mx-auto w-fit rounded-lg border border-black/[0.08] bg-white px-2.5 py-1 text-[11px] font-semibold text-black/60 shadow-sm dark:border-white/10 dark:bg-[#16203a] dark:text-white/60" style={{ animationDelay: '0.4s' }} aria-hidden="true">
        <FileText className="mr-1 inline h-3 w-3 -translate-y-px" aria-hidden="true" />procuracao.pdf
      </span>

      <div className={`${tileWindow} relative w-[88%] max-w-[380px] overflow-visible`} aria-hidden="true">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5 dark:border-white/10">
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#007AFF] text-white"><Scale className="h-3 w-3" strokeWidth={2.4} /></span>
            <span className="text-[12px] font-semibold text-[#1d1d1f] dark:text-white">Prazos desta semana</span>
          </span>
          <span className={`${tileBar} h-2 w-12`}></span>
        </div>
        <div className="px-3 py-2">
          {DEADLINES.map((d, i) => (
            <div key={d.task} className={`${i === 0 ? 'svc-step wl-sweep loop' : ''} relative flex items-center gap-3 rounded-lg px-2 py-2.5`}>
              {i === 0 ? (
                <span className="svc-step-dot flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-2">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                </span>
              ) : (
                <span className="h-[17px] w-[17px] shrink-0 rounded-full border-2 border-black/15 dark:border-white/20"></span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-[#1d1d1f] dark:text-white">{d.task}</span>
                <span className="block text-[10px] text-black/45 dark:text-white/45">{d.proc}</span>
              </span>
              {i === 0 ? (
                <span className="grid justify-items-end">
                  <span className="wl-chip-due loop [grid-area:1/1] rounded-full bg-[#ff9f0a]/15 px-2 py-0.5 text-[10px] font-semibold text-[#b25f00] dark:text-[#ffb340]">{d.due}</span>
                  <span className="wl-chip-done loop [grid-area:1/1] flex items-center gap-1 rounded-full bg-[#28c840]/15 px-2 py-0.5 text-[10px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]"><Check className="h-2.5 w-2.5" strokeWidth={3.5} />Feito</span>
                </span>
              ) : (
                <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-semibold text-black/50 dark:bg-white/10 dark:text-white/55">{d.due}</span>
              )}
            </div>
          ))}
        </div>
        <div className="svc-toast absolute -bottom-5 right-3 flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 py-2 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-[#16203a] sm:-right-5">
          <span className="h-2 w-2 rounded-full bg-[#28c840]"></span>
          <span className="whitespace-nowrap text-[11px] font-semibold text-[#1d1d1f] dark:text-white">Equipa avisada</span>
        </div>
      </div>
    </Reveal>
  );
}

// What arrives while they wait: the inbox fills, one email at a time.
function InboxWindow() {
  return (
    <Reveal y={24} duration={0.8} className={`flex items-center justify-center px-4 py-10 sm:py-12 ${stagePanel}`}>
      <div className={`${tileWindow} w-full max-w-[400px] overflow-hidden`} aria-hidden="true">
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-2.5 dark:border-white/10">
          <span className="text-[12px] font-semibold text-[#1d1d1f] dark:text-white">Caixa de entrada</span>
          <span className="text-[11px] text-black/45 dark:text-white/45">4 novos</span>
        </div>
        <ul>
          {INBOX.map((m, i) => (
            <li key={m.subject} className="wl-mail loop flex gap-3 border-b border-black/[0.05] px-4 py-3 last:border-b-0 dark:border-white/[0.07]" style={{ animationDelay: `${i * 0.45}s` }}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${m.from === 'LegalOps' ? 'bg-[#007AFF] text-white' : 'bg-[#1d1d1f] text-white dark:bg-white dark:text-[#020617]'}`}>
                {m.from === 'LegalOps' ? <Scale className="h-3.5 w-3.5" strokeWidth={2.4} /> : 'E'}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1d1d1f] dark:text-white">
                    {m.from}
                    <span className="wl-unread loop h-1.5 w-1.5 rounded-full bg-[#007AFF]" style={{ animationDelay: `${i * 0.45}s` }}></span>
                  </span>
                  <span className="shrink-0 text-[10px] text-black/40 dark:text-white/40">{m.when}</span>
                </span>
                <span className="mt-0.5 block truncate text-[12px] font-medium text-[#1d1d1f] dark:text-white/90">{m.subject}</span>
                <span className="block truncate text-[11px] text-black/50 dark:text-white/50">{m.preview}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function WaitlistLanding() {
  return (
    <PageShell footerCta={false} after={<StickyGuideCTA heroCtaId={FORM_ID} formId="fim" label="Entrar na lista de espera" neutral />}>
      {/* Hero: promise and form first (on a phone, both fit above the fold). */}
      <section className="pt-24 pb-14 md:pt-36 md:pb-20 lg:pt-32">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg">
            <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 py-1 pl-1 pr-3 text-[12px] font-semibold text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65">
              <LegalOpsMark className="[&>span:first-child]:h-6 [&>span:first-child]:w-6 [&>span:last-child]:text-[13px]" />
              <span className="h-3 w-px bg-black/10 dark:bg-white/15"></span>
              <span className="flex items-center gap-1.5"><span className="wl-pulse h-1.5 w-1.5 rounded-full bg-[#28c840]"></span>Lista de espera aberta</span>
            </span>
            <h1 className={'hero-rise mt-5 text-[clamp(2.3rem,9vw,4rem)] ' + heroTitle} style={rise(80)}>
              O seu escritório, todo num só sítio.
            </h1>
            <p className={'hero-rise mt-5 ' + heroLead} style={rise(150)}>
              Estamos a construir o LegalOps: prazos, documentos e equipa numa só plataforma, feita para escritórios de advogados em Portugal.
            </p>
            <p className={'hero-rise mt-3 text-[16px] leading-relaxed ' + muted} style={rise(190)}>
              Entre na lista e experimente primeiro. Até lá, recebe ideias práticas de IA e automação para o seu escritório.
            </p>
            <div className="hero-rise mt-7" style={rise(240)}>
              <WaitlistForm id={FORM_ID} />
            </div>
          </div>

          <div className="hero-rise" style={rise(320)}>
            <DeadlinesWindow />
          </div>
        </div>
      </section>

      {/* What it will do: three lines, no cards. */}
      <section aria-labelledby="building" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <Reveal y={20}>
            <div className="border-t border-black/10 pt-12 dark:border-white/15 md:pt-16">
              <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">O que estamos a construir</span>
              <h2 id="building" className="mt-3 max-w-2xl text-[clamp(1.7rem,5vw,2.6rem)] font-semibold leading-[1.12] tracking-tight text-balance">
                Menos tempo a procurar. Mais tempo para o processo.
              </h2>
            </div>
          </Reveal>
          <ul className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
            {BUILDING.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal y={20} delay={i * 0.08}>
                  <Icon className="h-6 w-6 text-[#007AFF]" strokeWidth={1.8} aria-hidden="true" />
                  <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{title}</h3>
                  <p className={'mt-2 text-[15px] leading-relaxed ' + muted}>{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* While they wait: the relationship, made visible. */}
      <section aria-labelledby="waiting" className="pb-16 md:pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal y={20}>
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">Enquanto espera</span>
            <h2 id="waiting" className="mt-3 text-[clamp(1.7rem,5vw,2.6rem)] font-semibold leading-[1.12] tracking-tight text-balance">
              Não fica só à espera.
            </h2>
            <p className={'mt-4 max-w-md text-[17px] leading-relaxed ' + muted}>
              Desde o primeiro dia, enviamos-lhe o que já pode usar no escritório: onde a IA poupa tempo, como automatizar o que se repete e como organizar melhor o trabalho.
            </p>
            <ul className="mt-6 grid gap-3">
              {['Poucos emails, só com o que vale a pena.', 'Exemplos reais, sem jargão.', 'Sai com um clique, quando quiser.'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-[#1d1d1f] dark:text-white/90">
                  <Check className="h-4 w-4 shrink-0 text-[#007AFF]" strokeWidth={3} aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
          </Reveal>
          <InboxWindow />
        </div>
      </section>

      {/* Closing: who builds it, and back to the form. */}
      <section id="fim" className="pb-20 md:pb-28">
        <Reveal y={20} className="mx-auto flex max-w-xl flex-col items-center px-5 text-center md:px-6">
          <Avatars size={36} ring="ring-[#fdfdfd] dark:ring-[#020617]" />
          <h2 className="mt-5 text-[clamp(1.7rem,5vw,2.4rem)] font-semibold leading-[1.12] tracking-tight">Guarde o seu lugar.</h2>
          <p className={'mt-3 text-[16px] leading-relaxed ' + muted}>
            Feito pela equipa da ElevaOps, a partir de conversas com escritórios de advogados em Portugal. Quem está na lista experimenta primeiro.
          </p>
          <a
            href={'#' + FORM_ID}
            className="group mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-[#020617] dark:hover:bg-white/90 sm:w-auto"
          >
            Entrar na lista de espera
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </section>
    </PageShell>
  );
}
