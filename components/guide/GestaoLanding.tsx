'use client';
import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { heroLead, heroTitle, rise, stagePanel } from '@/components/hero/HeroKit';
import { CATALOG } from '@/lib/guide';
import { ManualForm } from './ManualForm';

// /gestao-juridica-digital: landing of the free manual, in the same pattern as /legalops (site
// shell, short copy). Hero: the cover with two inner pages fanning out behind it; then the five
// pillars and the form (PDF by email, optional newsletter and LegalOps waitlist).

const GUIDE = CATALOG['gestao-juridica'].editions.pt!;
const FORM_ID = 'receber';

const PILLARS = [
  { title: 'Visibilidade', text: 'Saber em que fase está cada processo e o que falta fazer, sem ter de perguntar.' },
  { title: 'Responsabilidade', text: 'Cada processo, tarefa e prazo com um responsável definido.' },
  { title: 'Controlo de prazos', text: 'Prazos num só sítio, confirmados por uma segunda pessoa.' },
  { title: 'Informação centralizada', text: 'Os documentos de cada processo num só lugar, com acessos por função.' },
  { title: 'Ritmo de gestão', text: 'Uma reunião semanal com agenda fixa e indicadores simples.' },
];

const h2 = 'font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#1d1d1f] dark:text-white text-balance';
const muted = 'text-black/60 dark:text-white/60';
const page = 'h-auto w-full rounded-[3px] shadow-[0_20px_40px_-20px_rgba(0,30,90,0.45)]';

function CoverStack() {
  return (
    <div className={`relative flex h-[22rem] items-center justify-center overflow-hidden sm:h-[28rem] ${stagePanel}`}>
      <div className="gj-sway relative w-[40%] max-w-[230px]" style={{ animationDelay: '1.4s' }}>
        <div className="gj-fan-l absolute inset-0 origin-bottom">
          <Image src="/guides/gestao-juridica-digital-pilar.webp" alt="" width={700} height={991} sizes="230px" className={page} />
        </div>
        <div className="gj-fan-r absolute inset-0 origin-bottom">
          <Image src="/guides/gestao-juridica-digital-indice.webp" alt="" width={700} height={991} sizes="230px" className={page} />
        </div>
        <Image
          src={GUIDE.cover}
          alt="Capa do manual Gestão Jurídica Digital"
          width={GUIDE.coverWidth}
          height={GUIDE.coverHeight}
          sizes="(min-width: 640px) 230px, 40vw"
          quality={90}
          priority
          className={'relative ' + page + ' shadow-[0_30px_60px_-25px_rgba(0,30,90,0.6)]'}
        />
      </div>
      <span className="stage-pop absolute bottom-5 left-5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold text-black/60 shadow-sm dark:border-white/10 dark:bg-[#16203a] dark:text-white/70" style={{ animationDelay: '1.2s' }}>
        {GUIDE.pdfInfo}
      </span>
    </div>
  );
}

export function GestaoLanding() {
  return (
    <PageShell footerCta={false}>
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3 py-1 text-[12px] font-semibold tracking-[0.14em] text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-[#007AFF]"></span>MANUAL GRATUITO · PDF
            </span>
            <h1 className={'hero-rise mt-5 text-[clamp(2.4rem,5vw,4rem)] ' + heroTitle} style={rise(80)}>
              Gestão Jurídica Digital
            </h1>
            <p className={'hero-rise mt-5 max-w-xl ' + heroLead} style={rise(160)}>
              Como tirar partido da tecnologia na gestão do escritório de advogados — com exemplos práticos e modelos.
            </p>
            <a
              href={'#' + FORM_ID}
              className="hero-rise mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#1d1d1f] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-[#020617] dark:hover:bg-white/90 sm:w-auto"
              style={rise(240)}
            >
              Receber o manual
            </a>
            <p className="hero-rise mt-3 text-[13px] text-black/50 dark:text-white/50" style={rise(260)}>Gratuito · Enviado para o seu e-mail</p>
          </div>
          <div className="hero-rise" style={rise(300)}>
            <CoverStack />
          </div>
        </div>
      </section>

      <section aria-labelledby="dentro" className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <Reveal y={20} className="border-t border-black/10 pt-12 dark:border-white/15 md:pt-16">
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">Guia para sócios e gestores</span>
            <h2 id="dentro" className={h2 + ' mt-3'}>Cinco pilares para organizar o escritório</h2>
          </Reveal>
          <ol className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {PILLARS.map((p, i) => (
              <li key={p.title}>
                <Reveal y={16} delay={(i % 3) * 0.06}>
                  <span className="font-mono text-[12px] font-bold text-brand">0{i + 1}</span>
                  <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{p.title}</h3>
                  <p className={'mt-1.5 text-[15px] leading-relaxed ' + muted}>{p.text}</p>
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal y={16} delay={0.12}>
                <span className="font-mono text-[12px] font-bold text-brand">+</span>
                <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">Para pôr em prática</h3>
                <p className={'mt-1.5 text-[15px] leading-relaxed ' + muted}>Um plano de quatro semanas, o Índice de Maturidade Digital e modelos prontos a usar.</p>
              </Reveal>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="form-title" className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-6">
          <h2 id="form-title" className={h2 + ' text-center'}>Receba o manual no seu e-mail</h2>
          <p className={'mx-auto mt-3 max-w-md text-center text-[16px] leading-relaxed ' + muted}>Preencha os dados e o PDF chega em menos de um minuto.</p>
          <div className="mt-8">
            <ManualForm id={FORM_ID} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
