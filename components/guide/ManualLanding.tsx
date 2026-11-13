'use client';
import Image from 'next/image';
import { ArrowDown, Check } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { heroTitle, heroLead, rise } from '@/components/hero/HeroKit';
import { GuideLeadForm, type LeadFormCopy } from './GuideLeadForm';
import { StickyGuideCTA } from './StickyGuideCTA';
import { CATALOG } from '@/lib/guide';

const MANUAL = CATALOG['manual-prazos'].editions.pt!;
const FORM_ID = 'receber-manual';
const HERO_CTA_ID = 'hero-cta';

// What the manual contains, with its pages (shown on desktop only).
const INSIDE = [
  { text: 'As quatro fontes de tempo perdido: procurar, perguntar, confirmar e retomar.', pages: 'Pág. 7–8' },
  { text: 'Um método de uma semana para medir esse tempo no seu escritório.', pages: 'Pág. 9–11' },
  { text: 'Quatro princípios de organização, aplicáveis sem software.', pages: 'Pág. 12–13' },
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

const muted = 'text-black/60 dark:text-white/60';

// Standard lead-magnet layout, phone first: cover, promise and button; what's inside; form.
// One card (the form) and one quiet entrance animation.
export function ManualLanding() {
  return (
    <PageShell footerCta={false} after={<StickyGuideCTA heroCtaId={HERO_CTA_ID} formId={FORM_ID} label="Receber o manual grátis" neutral />}>
      <section className="pt-24 pb-14 md:pt-36 md:pb-24 lg:pt-32 lg:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="hero-rise mx-auto lg:order-2">
            <Image
              src={MANUAL.cover}
              alt="Capa do manual Entre prazos e processos, da ElevaOps"
              width={MANUAL.coverWidth}
              height={MANUAL.coverHeight}
              sizes="(min-width: 1024px) 340px, 220px"
              priority
              className="block h-auto w-[220px] rounded-[4px] shadow-[0_30px_60px_-25px_rgba(15,23,42,0.45)] lg:w-[340px]"
            />
          </div>

          <div className="text-center lg:order-1 lg:text-left">
            <span className="hero-rise block text-[13px] font-semibold text-black/45 dark:text-white/45" style={rise(80)}>
              Manual gratuito para advogados
            </span>
            <h1 className={'hero-rise mt-3 text-[clamp(2.1rem,7.5vw,4rem)] ' + heroTitle} style={rise(140)}>
              Quanto tempo perde o seu escritório entre tarefas?
            </h1>
            <p className={'hero-rise mx-auto mt-5 max-w-lg lg:mx-0 ' + heroLead} style={rise(200)}>
              Um método simples para o medir numa semana e começar a reduzi-lo.
            </p>
            <div className="hero-rise mt-8 flex flex-col items-center gap-3 lg:items-start" style={rise(260)}>
              <a
                id={HERO_CTA_ID}
                href={'#' + FORM_ID}
                className="group inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-[#020617] dark:hover:bg-white/90 sm:w-auto"
              >
                Receber o manual grátis
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <span className="text-[13px] text-black/50 dark:text-white/50">{MANUAL.pdfInfo} · Enviado para o seu email</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phones: "what's inside" then the form, stacked. Desktop: side by side, so the form sits
          next to the content instead of under a half-empty row. */}
      <div className="mx-auto max-w-6xl px-5 md:px-6 lg:grid lg:grid-cols-[1fr_440px] lg:items-start lg:gap-16 lg:border-t lg:border-black/10 lg:pt-14 lg:dark:border-white/15">
        <section aria-labelledby="inside" className="pb-14 md:pb-24 lg:sticky lg:top-28 lg:pb-16">
          <Reveal y={20}>
            <div className="border-t border-black/10 pt-12 dark:border-white/15 md:pt-16 lg:border-t-0 lg:pt-0">
              <h2 id="inside" className="text-[clamp(1.6rem,4.5vw,2.25rem)] font-semibold leading-tight tracking-tight">O que vai encontrar</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-8 lg:mt-8 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-black/[0.07] lg:dark:divide-white/10">
                {INSIDE.map(item => (
                  <li key={item.text} className="flex gap-3 lg:items-baseline lg:gap-4 lg:py-5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#007AFF] lg:mt-0 lg:self-start lg:translate-y-1" aria-hidden="true" />
                    <span className={'text-[16px] leading-relaxed lg:flex-1 lg:text-[18px] ' + muted}>{item.text}</span>
                    <span className="hidden shrink-0 text-[13px] font-medium text-black/40 dark:text-white/40 lg:inline">{item.pages}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 hidden items-center gap-4 lg:flex">
                <Image src="/team/fredson.webp" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full bg-[#bfe3fb] object-cover object-top" />
                <p className={'text-[15px] leading-relaxed ' + muted}>
                  <span className="font-semibold text-[#1d1d1f] dark:text-white">Escrito por Fredson, ElevaOps,</span>{' '}
                  a partir de conversas com escritórios de advogados em Portugal.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id={FORM_ID} aria-labelledby="form-title" className="scroll-mt-24 pb-16 md:pb-24 lg:pb-20">
          <div className="grid items-start gap-8 lg:gap-6">
            <div>
              <h2 id="form-title" className="text-[clamp(1.9rem,5.5vw,3rem)] font-semibold leading-[1.08] tracking-tighter lg:text-[2rem]">
                Receba o manual.
              </h2>
              <p className={'mt-3 max-w-md text-[16px] leading-relaxed lg:mt-2 ' + muted}>
                Três campos. O PDF chega ao seu email.
              </p>
            </div>
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] sm:p-7 dark:border-white/10 dark:bg-[#0f1729]">
              <GuideLeadForm guideId="manual-prazos" forceLang="pt" variant="short" copy={FORM_COPY} />
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
