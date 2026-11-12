'use client';
import Image from 'next/image';
import { ArrowUp, FileText, Mail } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Reveal, revealStyle } from '@/components/Reveal';
import { HeroSection, heroTitle, heroLead, rise } from '@/components/hero/HeroKit';
import { GuideLeadForm, type LeadFormCopy } from './GuideLeadForm';
import { StickyGuideCTA } from './StickyGuideCTA';
import { CATALOG } from '@/lib/guide';

const MANUAL = CATALOG['manual-prazos'].editions.pt!;
const FORM_ID = 'receber-manual';
const TITLE_ID = 'manual-title';

// The four sources of lost time the manual is built around.
const SOURCES = ['Procurar.', 'Perguntar.', 'Confirmar.', 'Retomar.'];

const INSIDE = [
  { n: '01', title: 'O diagnóstico', text: 'As quatro fontes de tempo perdido e onde aparecem no dia a dia do escritório.' },
  { n: '02', title: 'O método', text: 'Uma folha para medir esse tempo no seu escritório, numa semana de observação.' },
  { n: '03', title: 'Os princípios', text: 'Quatro regras de organização que não dependem de nenhuma ferramenta.' },
];

const FORM_COPY: LeadFormCopy = {
  submit: 'Enviar-me o manual',
  consent: 'Quero receber também a newsletter da ElevaOps para escritórios de advogados. Posso cancelar a qualquer momento.',
  privacyIntro: 'Usamos os seus dados para lhe enviar o manual. Leia a nossa',
  sentTo: 'Enviámos o manual para',
  fallbackTitle: 'O seu manual está pronto.',
  thanks: 'Não conseguimos enviá-lo por email neste momento. Pode descarregá-lo aqui.',
  download: 'Descarregar o manual',
  helpTitle: 'O LegalOps está quase a chegar.',
  helpBody: 'É a plataforma que estamos a construir para escritórios de advogados: prazos, documentos e equipa num só sítio. Com a newsletter, pode acompanhar as novidades do lançamento.',
  helpCta: null,
};

const label = 'text-[13px] font-semibold text-black/45 dark:text-white/45';
const muted = 'text-black/60 dark:text-white/60';
const pill =
  'group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90';

// Minimal landing with one job: get the manual requested. One card only (the form); the cover,
// the four sources and the author sit directly on the page background.
export function ManualLanding() {
  return (
    <PageShell footerCta={false} after={<StickyGuideCTA heroCtaId={TITLE_ID} formId={FORM_ID} label="Receber o manual" neutral />}>
      <HeroSection className="grid gap-12 lg:grid-cols-[1fr_440px] lg:items-start lg:gap-16">
        <div className="lg:pt-3">
          <span className={'hero-rise block ' + label}>Manual gratuito · Para escritórios de advogados</span>
          <h1 id={TITLE_ID} className={'hero-rise mt-4 text-[clamp(2.6rem,5.3vw,4.5rem)] ' + heroTitle} style={rise(80)}>
            Quanto tempo perde{' '}
            <span className="text-black/45 dark:text-white/45">o seu escritório entre tarefas?</span>
          </h1>
          <p className={'hero-rise mt-6 max-w-xl ' + heroLead} style={rise(160)}>
            Procurar documentos. Confirmar prazos. Perguntar quem trata de quê. Um manual para medir esse tempo no seu escritório e começar a reduzi-lo.
          </p>

          {/* The cover is what visitors saw in the ad: large, on the page itself, no frame. */}
          <div className="hero-rise mt-10 flex items-center gap-6 sm:gap-8" style={rise(240)}>
            <Image
              src={MANUAL.cover}
              alt="Capa do manual Entre prazos e processos, da ElevaOps"
              width={MANUAL.coverWidth}
              height={MANUAL.coverHeight}
              sizes="(min-width: 640px) 176px, 128px"
              priority
              className="block h-auto w-32 shrink-0 -rotate-3 rounded-[6px] shadow-[0_30px_60px_-24px_rgba(15,23,42,0.45)] transition-transform duration-700 hover:-translate-y-1 hover:-rotate-1 sm:w-44"
            />
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">Entre prazos e processos</p>
              <p className={'mt-2 max-w-xs text-[15px] leading-relaxed ' + muted}>
                Um método de quantificação e quatro princípios de organização.
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 text-[13px] text-black/50 dark:text-white/50">
                <li className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" aria-hidden="true" />{MANUAL.pdfInfo}</li>
                <li className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" aria-hidden="true" />Enviado para o seu email</li>
              </ul>
            </div>
          </div>
        </div>

        <section
          id={FORM_ID}
          aria-labelledby="form-title"
          className="hero-rise scroll-mt-28 rounded-[28px] border border-black/[0.06] dark:border-white/10 bg-white/90 dark:bg-[#0f1729]/90 p-5 sm:p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:sticky lg:top-28"
          style={rise(200)}
        >
          <span className={label}>Gratuito · Newsletter opcional</span>
          <h2 id="form-title" className="mt-2 text-2xl font-semibold tracking-tight">Receba o manual.</h2>
          <p className={'mt-2 mb-6 text-[15px] leading-relaxed ' + muted}>Três campos. O PDF chega ao seu email.</p>
          <GuideLeadForm guideId="manual-prazos" forceLang="pt" variant="short" copy={FORM_COPY} />
        </section>
      </HeroSection>

      {/* The four sources, set as one large typographic statement instead of a grid of cards. */}
      <section className="pt-4 pb-16 md:pb-24" aria-labelledby="fontes">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <Reveal y={24} duration={0.8}>
            <span className={label}>As quatro fontes de tempo perdido</span>
            <h2 id="fontes" className="mt-5 font-sans text-[clamp(2.4rem,7.5vw,6.5rem)] font-semibold leading-[0.98] tracking-tighter">
              {SOURCES.map((word, i) => (
                <span key={word} className={'block sm:inline ' + (i % 2 ? 'text-black/25 dark:text-white/25' : '')}>
                  {word}{i < SOURCES.length - 1 && <span className="hidden sm:inline"> </span>}
                </span>
              ))}
            </h2>
            <p className={'mt-8 max-w-2xl text-lg leading-relaxed text-pretty ' + muted}>
              São pequenas interrupções que se repetem ao longo do dia. O manual ajuda a pôr um número nesse tempo e a reduzi-lo.
            </p>
          </Reveal>

          <Reveal y={0} className="mt-16 md:mt-20">
            <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
              {INSIDE.map((item, i) => (
                <li key={item.n} className="reveal border-t border-black/10 pt-6 dark:border-white/15" style={revealStyle({ y: 20, delay: i * 0.08 })}>
                  <span className="font-mono text-[12px] text-black/40 dark:text-white/40">{item.n}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className={'mt-2 text-[15px] leading-relaxed ' + muted}>{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <p className="mt-10 text-sm leading-relaxed text-black/45 dark:text-white/45">
            Os dados de estudos externos vêm acompanhados da fonte e das suas limitações. Os exemplos de escritórios são ilustrativos.
          </p>
        </div>
      </section>

      {/* Closing: the author's one piece of advice and the way back to the form. */}
      <section className="pb-8 pt-4 md:pb-10">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <Reveal y={24} duration={0.8} className="border-t border-black/10 pt-14 dark:border-white/15 md:pt-20">
            <blockquote className="max-w-3xl font-sans text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-tight text-balance">
              “Uma semana de registo chega para ter um número do seu próprio escritório.”
            </blockquote>
            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Image src="/team/fredson.webp" alt="" width={44} height={44} className="shrink-0 rounded-full object-cover object-top bg-[#bfe3fb]" />
                <p className={'text-[14px] leading-relaxed ' + muted}>
                  <span className="font-semibold text-[#1d1d1f] dark:text-white">Fredson, ElevaOps.</span>{' '}
                  Escrito a partir de conversas com escritórios de advogados em Portugal.
                </p>
              </div>
              <a href={'#' + FORM_ID} className={pill + ' w-fit shrink-0'}>
                Receber o manual
                <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
