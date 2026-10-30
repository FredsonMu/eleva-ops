'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, BookOpenCheck, FileText, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Reveal } from '@/components/Reveal';
import { GuideLeadForm } from './GuideLeadForm';
import { StickyGuideCTA } from './StickyGuideCTA';
import { CATALOG } from '@/lib/guide';

// Landing page for "IA para advogados" (Portuguese only). Same structure as the AI agents
// guide, in a more sober tone with the guide's own navy and teal palette in the hero.

const GUIDE = CATALOG['ai-lawyers'].editions.pt!;
const FORM_ID = 'receber-guia';
const HERO_CTA_ID = 'hero-cta';
const TEAL = '#2cc6a0';

const EXAMPLES = [
  { area: 'Consulta', title: 'Estruturar os apontamentos de uma consulta' },
  { area: 'Factos e documentos', title: 'Construir uma cronologia com origem verificável' },
  { area: 'Preparação', title: 'Preparar perguntas para a reunião com o cliente' },
  { area: 'Documentação', title: 'Criar uma checklist de documentos em falta' },
  { area: 'Leitura e síntese', title: 'Resumir um documento sem perder as ressalvas' },
  { area: 'Revisão', title: 'Comparar duas versões de uma cláusula' },
  { area: 'Comunicação', title: 'Preparar uma atualização clara para o cliente' },
  { area: 'Continuidade', title: 'Preparar uma nota de passagem para um colega' },
  { area: 'Pesquisa', title: 'Preparar a pesquisa jurídica e verificar as fontes' },
  { area: 'Organização', title: 'Transformar decisões validadas num plano de trabalho' },
];

const METHOD = [
  { step: 'Material fictício', text: 'Um caso inventado, para testar sem usar dados de clientes.' },
  { step: 'Pedido à IA', text: 'A instrução pronta a adaptar à ferramenta aprovada pelo escritório.' },
  { step: 'Resultado ilustrativo', text: 'O tipo de resposta a esperar, para comparar com a sua.' },
  { step: 'Revisão do advogado', text: 'O que confirmar antes de usar o resultado no trabalho.' },
];

function Cover({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] rounded-[12px] bg-[#16283d] border border-white/10" aria-hidden="true"></div>
      <div className="relative overflow-hidden rounded-[12px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]">
        <Image
          src={GUIDE.cover}
          alt="Capa do guia “IA para advogados” da Eleva Ops"
          width={GUIDE.coverWidth}
          height={GUIDE.coverHeight}
          sizes="(max-width: 768px) 60vw, 380px"
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

export function LawyersGuideLanding() {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <AuroraBackground />
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />

        <main>
          {/* ── Hero: dark panel in the guide's palette ── */}
          <section className="pt-24 md:pt-28 pb-12 md:pb-20">
            <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6">
              <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#0b1a2e] via-[#0d2238] to-[#10304d] text-white">
                <div className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(44,198,160,0.18),transparent)]" aria-hidden="true"></div>
                <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-12 px-6 py-12 sm:px-10 md:px-14 md:py-20">
                  <div className="lg:col-span-7">
                    <span className="guide-rise text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>Guia prático gratuito · Edição 01</span>
                    <h1 className="guide-slide mt-6 font-sans font-semibold tracking-[-0.04em] leading-[0.98] text-[clamp(2.6rem,7.5vw,5rem)]">
                      IA para <span style={{ color: TEAL }}>advogados</span>
                    </h1>
                    <p className="guide-rise [animation-delay:140ms] mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-white/75 text-pretty">
                      10 exemplos práticos para o trabalho à volta do processo: organizar informação, preparar trabalho e rever cada resultado.
                    </p>
                    <div className="guide-rise [animation-delay:220ms] mt-9 flex flex-col sm:flex-row items-center gap-5">
                      <a
                        id={HERO_CTA_ID}
                        href={`#${FORM_ID}`}
                        className="group inline-flex min-h-14 w-full sm:w-auto shrink-0 whitespace-nowrap items-center justify-center gap-3 rounded-full px-8 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0b1a2e] transition-transform active:scale-[0.98]"
                        style={{ backgroundColor: TEAL }}
                      >
                        Receber o guia gratuito
                        <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                      </a>
                      <ul className="flex items-center gap-4 whitespace-nowrap text-xs font-semibold text-white/60">
                        <li className="flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" />PDF · 25 páginas</li>
                        <li className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true"></li>
                        <li className="flex items-center gap-1.5"><Zap className="h-4 w-4" aria-hidden="true" />Enviado por email</li>
                      </ul>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <Cover priority className="guide-float w-[62%] max-w-[300px] lg:w-full lg:max-w-[360px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── The 10 examples ── */}
          <section className="py-12 md:py-20" aria-labelledby="exemplos">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={30} className="mb-10 md:mb-14 text-center">
                <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">O que vai encontrar</span>
                <h2 id="exemplos" className="mx-auto mt-3 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-balance">
                  Dez tarefas delimitadas, da consulta à pesquisa jurídica.
                </h2>
              </Reveal>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLES.map((ex, i) => (
                  <li key={ex.title}>
                    <Reveal y={20} delay={(i % 2) * 0.06} className="h-full">
                      <div className="flex h-full items-start gap-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-5">
                        <span className="font-mono text-sm font-bold tabular-nums text-[#1a9e80] dark:text-[#5fe0c0]">{String(i + 1).padStart(2, '0')}</span>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">{ex.area}</span>
                          <span className="mt-1 block text-[16px] md:text-[17px] font-semibold leading-snug tracking-tight">{ex.title}</span>
                        </span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── How each example works ── */}
          <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={30} className="rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] p-6 sm:p-10 md:p-14">
                <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">Como cada exemplo está organizado</span>
                <h2 className="mt-3 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-balance">
                  Para usar, não só para ler.
                </h2>
                <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {METHOD.map((m, i) => (
                    <li key={m.step} className="border-t-2 pt-5" style={{ borderColor: i === 3 ? TEAL : 'rgba(127,127,127,0.25)' }}>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">0{i + 1}</span>
                      <p className="mt-2 text-lg font-semibold tracking-tight">{m.step}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{m.text}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>

          {/* ── Evidence and responsibility ── */}
          <section className="py-6 md:py-10">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={24} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex gap-4 rounded-2xl border border-black/[0.08] dark:border-white/10 p-6">
                  <BookOpenCheck className="h-6 w-6 shrink-0 text-[#1a9e80] dark:text-[#5fe0c0]" aria-hidden="true" />
                  <p className="text-[15px] leading-relaxed text-black/65 dark:text-white/70">
                    <span className="font-semibold text-[#1d1d1f] dark:text-white">Baseado em investigação publicada.</span> O guia cita estudos sobre erros e limites dos modelos em trabalho jurídico (Journal of Legal Analysis, Minnesota Law Review, entre outros) e explica o que deve ficar sob controlo do advogado.
                  </p>
                </div>
                <div className="flex gap-4 rounded-2xl border border-black/[0.08] dark:border-white/10 p-6">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[#1a9e80] dark:text-[#5fe0c0]" aria-hidden="true" />
                  <p className="text-[15px] leading-relaxed text-black/65 dark:text-white/70">
                    <span className="font-semibold text-[#1d1d1f] dark:text-white">Todos os casos são fictícios.</span> Os exemplos são métodos de trabalho, não pareceres. A qualificação jurídica e a decisão final continuam sempre com o advogado.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Form ── */}
          <section id={FORM_ID} className="scroll-mt-24 py-12 md:py-20" aria-labelledby="form-title">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={30}>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] p-6 sm:p-10 md:p-14">
                  <div className="text-center lg:text-left">
                    <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">Gratuito · Enviado para o seu email</span>
                    <h2 id="form-title" className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold">
                      Receba o guia no seu email.
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60">
                      Preencha os seus dados e enviamos o PDF de imediato.
                    </p>
                    <div className="mt-8 hidden lg:flex items-center gap-5">
                      <Cover className="w-24 rotate-[-4deg]" />
                      <p className="max-w-[16rem] text-sm font-semibold leading-snug text-black/60 dark:text-white/65">IA para advogados: 10 exemplos práticos para o trabalho à volta do processo</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#0f1729] p-5 sm:p-7 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]">
                    <GuideLeadForm guideId="ai-lawyers" forceLang="pt" companyLabel="Nome do escritório" companyPlaceholder="O seu escritório" />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Closing ── */}
          <section className="pt-4 pb-24 md:pb-32">
            <Reveal y={24} className="max-w-3xl mx-auto px-5 md:px-6 flex flex-col items-center text-center">
              <p className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-balance">
                Quer perceber onde a IA pode ajudar o seu escritório?
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
              >
                Agendar diagnóstico gratuito
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>

      <StickyGuideCTA heroCtaId={HERO_CTA_ID} formId={FORM_ID} />
    </div>
  );
}
