'use client';
import Image from 'next/image';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { GuideLeadForm, type LeadFormCopy } from './GuideLeadForm';
import { StickyGuideCTA } from './StickyGuideCTA';
import { CATALOG } from '@/lib/guide';

// Landing page for the manual "Entre prazos e processos" (Portuguese only), the page the
// LegalOps campaigns send people to. One goal: the firm leaves its contact. So it is short on
// purpose: the question, the cover, what is inside, the form. The form is reachable from the
// first screen and asks for three things only.

const MANUAL = CATALOG['manual-prazos'].editions.pt!;
const FORM_ID = 'receber-manual';
const HERO_CTA_ID = 'hero-cta';
const BRONZE = '#a8743a';

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
  helpBody: 'É a plataforma que estamos a construir para escritórios de advogados: prazos, documentos e equipa num só sítio. Se aceitou receber a newsletter, é dos primeiros a saber.',
  helpCta: null,
};

function Cover({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_36px_70px_-28px_rgba(24,40,72,0.45),0_0_0_1px_rgba(24,40,72,0.08)]">
        <Image
          src={MANUAL.cover}
          alt="Capa do manual “Entre prazos e processos” da ElevaOps"
          width={MANUAL.coverWidth}
          height={MANUAL.coverHeight}
          sizes="(max-width: 768px) 56vw, 340px"
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

export function ManualLanding() {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />

        <main>
          {/* ── Hero: the question, the cover and the way to the form ── */}
          <section className="pt-28 md:pt-36 pb-12 md:pb-20">
            <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
              <div className="lg:col-span-7">
                <span className="guide-rise text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>Manual gratuito · Para escritórios de advogados</span>
                <h1 className="guide-slide mt-5 font-sans font-semibold tracking-[-0.04em] leading-[1.02] text-[clamp(2.3rem,6.4vw,4.4rem)] text-balance">
                  Quanto tempo perde o seu escritório entre tarefas?
                </h1>
                <p className="guide-rise [animation-delay:140ms] mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-black/65 dark:text-white/70 text-pretty">
                  O tempo faturado é conhecido. O que se gasta a procurar documentos, a confirmar prazos e a perguntar quem trata de quê raramente é medido. Este manual mostra como o medir e como o reduzir.
                </p>
                <div className="guide-rise [animation-delay:220ms] mt-9 flex flex-col sm:flex-row items-center gap-5">
                  <a
                    id={HERO_CTA_ID}
                    href={`#${FORM_ID}`}
                    className="group inline-flex min-h-14 w-full sm:w-auto shrink-0 whitespace-nowrap items-center justify-center gap-3 rounded-full bg-[#182848] dark:bg-white px-8 text-[13px] font-bold uppercase tracking-[0.14em] text-white dark:text-[#182848] transition-transform active:scale-[0.98]"
                  >
                    Receber o manual
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                  <ul className="flex items-center gap-4 whitespace-nowrap text-xs font-semibold text-black/55 dark:text-white/60">
                    <li className="flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" />{MANUAL.pdfInfo}</li>
                    <li className="h-1 w-1 rounded-full bg-black/25 dark:bg-white/30" aria-hidden="true"></li>
                    <li className="flex items-center gap-1.5"><Mail className="h-4 w-4" aria-hidden="true" />Enviado por email</li>
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <Cover priority className="guide-float w-[58%] max-w-[280px] lg:w-full lg:max-w-[340px] rotate-[2deg]" />
              </div>
            </div>
          </section>

          {/* ── What is inside: three parts, one line each ── */}
          <section className="py-10 md:py-16" aria-labelledby="conteudo">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={24}>
                <h2 id="conteudo" className="text-[13px] font-semibold text-black/45 dark:text-white/45">O que leva deste manual</h2>
                <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
                  {INSIDE.map(item => (
                    <li key={item.n} className="border-t-2 pt-5" style={{ borderColor: BRONZE }}>
                      <span className="font-mono text-xs font-bold tabular-nums" style={{ color: BRONZE }}>{item.n}</span>
                      <p className="mt-2 text-xl font-semibold tracking-tight">{item.title}</p>
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

          {/* ── Form ── */}
          <section id={FORM_ID} className="scroll-mt-24 py-10 md:py-16 pb-24 md:pb-32" aria-labelledby="form-title">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={24}>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 rounded-3xl bg-[#182848] text-white p-6 sm:p-10 md:p-14">
                  <div className="text-center lg:text-left">
                    <span className="text-[13px] font-semibold text-white/55">Gratuito · Chega em menos de um minuto</span>
                    <h2 id="form-title" className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-balance">
                      Receba o manual no seu email.
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-white/65">
                      Três campos. Enviamos o PDF de imediato.
                    </p>
                    <p className="mt-8 hidden lg:block text-sm leading-relaxed text-white/50">
                      Escrito por Fredson, da ElevaOps, a partir de conversas com escritórios de advogados em Portugal.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white dark:bg-[#0f1729] p-5 sm:p-7 text-[#1d1d1f] dark:text-white shadow-[0_24px_48px_-28px_rgba(0,0,0,0.5)]">
                    <GuideLeadForm guideId="manual-prazos" forceLang="pt" variant="short" copy={FORM_COPY} />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <StickyGuideCTA heroCtaId={HERO_CTA_ID} formId={FORM_ID} label="Receber o manual" />
    </div>
  );
}
