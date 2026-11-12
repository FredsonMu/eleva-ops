'use client';
import Image from 'next/image';
import { ArrowDown, ArrowRight, FileText, Mail } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { HeroSection, heroTitle, heroLead, rise, stagePanel } from '@/components/hero/HeroKit';
import { GuideLeadForm, type LeadFormCopy } from './GuideLeadForm';
import { StickyGuideCTA } from './StickyGuideCTA';
import { CATALOG } from '@/lib/guide';

const MANUAL = CATALOG['manual-prazos'].editions.pt!;
const FORM_ID = 'receber-manual';
const HERO_CTA_ID = 'hero-cta';

const INSIDE = [
  { n: '01', title: 'O diagnóstico', text: 'As quatro fontes de tempo perdido: procurar, perguntar, confirmar e retomar.' },
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

function Cover({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src={MANUAL.cover}
        alt="Capa do manual Entre prazos e processos, da ElevaOps"
        width={MANUAL.coverWidth}
        height={MANUAL.coverHeight}
        sizes="(min-width: 1024px) 96px, 48px"
        priority
        className="block h-auto w-full rounded-[6px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

// The homepage's frame, type, entrance animation and soft panels, with the form
// in the first section so visitors can request the manual without a long scroll.
export function ManualLanding() {
  return (
    <PageShell after={<StickyGuideCTA heroCtaId={HERO_CTA_ID} formId={FORM_ID} label="Receber o manual" />}>
      <HeroSection className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
        <div className="lg:pt-3">
          <span className="hero-rise block text-[13px] font-semibold text-black/45 dark:text-white/45">
            Manual gratuito · Para escritórios de advogados
          </span>
          <h1 className={'hero-rise mt-4 text-[clamp(2.6rem,5.3vw,4.5rem)] ' + heroTitle} style={rise(80)}>
            Quanto tempo perde{' '}
            <span className="text-black/45 dark:text-white/45">o seu escritório entre tarefas?</span>
          </h1>
          <p className={'hero-rise mt-6 max-w-xl ' + heroLead} style={rise(160)}>
            Procurar documentos. Confirmar prazos. Perguntar quem trata de quê. Um manual para medir esse tempo no seu escritório e começar a reduzi-lo.
          </p>
          <div className="hero-rise mt-8" style={rise(240)}>
            <a
              id={HERO_CTA_ID}
              href={'#' + FORM_ID}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
            >
              Receber o manual
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-black/50 dark:text-white/50">
              <li className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" aria-hidden="true" />{MANUAL.pdfInfo}</li>
              <li className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" aria-hidden="true" />Enviado por email</li>
            </ul>
          </div>
          <div className={'hero-rise mt-8 hidden items-center gap-5 p-5 lg:flex ' + stagePanel} style={rise(320)}>
            <Cover className="w-24 shrink-0 -rotate-2 transition-transform duration-700 hover:-translate-y-1" />
            <div>
              <p className="text-[13px] font-semibold text-black/45 dark:text-white/45">O seu exemplar</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">Entre prazos e processos</p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">
                Um método de quantificação e quatro princípios de organização.
              </p>
            </div>
          </div>
        </div>

        <section
          id={FORM_ID}
          aria-labelledby="form-title"
          className="hero-rise rounded-[28px] border border-black/[0.06] dark:border-white/10 bg-white/90 dark:bg-[#0f1729]/90 p-5 sm:p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          style={rise(240)}
        >
          <div className="mb-6 flex items-center gap-4">
            <Cover className="w-12 shrink-0 lg:hidden" />
            <div>
              <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">Gratuito · Newsletter opcional</span>
              <h2 id="form-title" className="mt-2 text-2xl font-semibold tracking-tight">Receba o manual.</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">Três campos. O PDF chega ao seu email.</p>
            </div>
          </div>
          <GuideLeadForm guideId="manual-prazos" forceLang="pt" variant="short" copy={FORM_COPY} />
        </section>
      </HeroSection>

      <section className="pb-12 md:pb-16" aria-labelledby="conteudo">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <Reveal y={30} duration={0.8} className={stagePanel + ' p-6 sm:p-10 md:p-14'}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">O que leva deste manual</span>
                <h2 id="conteudo" className="mt-3 max-w-xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-balance">
                  Primeiro, medir.<br />Depois, organizar.
                </h2>
              </div>
              <a href={'#' + FORM_ID} className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brand">
                Receber o manual<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {INSIDE.map(item => (
                <li key={item.n} className="border-t-2 border-black/10 dark:border-white/15 pt-5 first:border-[#007AFF]">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">{item.n}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{item.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-black/50 dark:text-white/50">
              Os dados de estudos externos vêm acompanhados da fonte e das suas limitações. Os exemplos de escritórios são ilustrativos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <Reveal y={20} className="flex flex-col gap-6 border-t border-black/10 pt-8 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-xl items-center gap-4">
              <Image src="/team/fredson.webp" alt="" width={44} height={44} className="shrink-0 rounded-full" />
              <p className="text-[14px] leading-relaxed text-black/60 dark:text-white/60">
                Escrito por Fredson, da ElevaOps, a partir de conversas com escritórios de advogados em Portugal.
              </p>
            </div>
            <a href={'#' + FORM_ID} className="group inline-flex w-fit shrink-0 items-center gap-1.5 text-[15px] font-semibold text-brand">
              Receber o manual gratuito<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
