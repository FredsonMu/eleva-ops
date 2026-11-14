'use client';
import { CalendarCheck, ChevronDown, FileSpreadsheet, FolderOpen, GitBranch, ListChecks, ShieldCheck } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { heroLead, heroTitle, rise } from '@/components/hero/HeroKit';
import { LegalOpsScene } from './LegalOpsScene';
import { WaitlistForm } from './WaitlistForm';

// /legalops: LegalOps waitlist, inside the site (navbar, background, theme, footer). Hero copy
// with the LegalOps card on the right (below on phones), then why, what it does, the form and
// the FAQ. Linked from the "Gestão Jurídica Digital" manual and Instagram ads.

const FORM_ID = 'waitlist';

const FEATURES = [
  { icon: GitBranch, title: 'Processos e fases', text: 'veja em que ponto está cada processo e qual é a próxima ação.' },
  { icon: ListChecks, title: 'Tarefas com responsável', text: 'atribua trabalho e acompanhe o que está por fazer, em curso ou concluído.' },
  { icon: CalendarCheck, title: 'Prazos com confirmação', text: 'registe os prazos e confirme-os com uma segunda pessoa da equipa.' },
  { icon: FolderOpen, title: 'Clientes e documentos centralizados', text: 'a informação de cada processo num só lugar.' },
  { icon: ShieldCheck, title: 'Acessos por função', text: 'sócio, advogado e assistente veem o que precisam para trabalhar.' },
  { icon: FileSpreadsheet, title: 'Importação de Excel', text: 'traga os dados que já tem, sem começar do zero.' },
];

const FAQ = [
  { q: 'Quando fica disponível?', a: 'Estamos em desenvolvimento. Quem está na waitlist é avisado primeiro.' },
  { q: 'Quanto vai custar?', a: 'Os preços serão anunciados antes do lançamento.' },
  { q: 'Os dados do escritório ficam seguros?', a: 'O LegalOps está a ser desenvolvido de acordo com o RGPD, com acessos definidos por função para proteger a informação de cada processo.' },
  { q: 'Funciona para quem trabalha sozinho?', a: 'O LegalOps foi pensado para equipas a partir de 2 pessoas, onde é preciso coordenar trabalho.' },
];

const wrap = 'mx-auto w-full max-w-6xl px-5 md:px-6';
const label = 'text-[13px] font-semibold text-black/45 dark:text-white/45';
const h2 = 'font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.15] tracking-tight text-[#1d1d1f] dark:text-white text-balance';
const muted = 'text-black/60 dark:text-white/60';

export function WaitlistLanding() {
  return (
    <PageShell footerCta={false}>
      {/* 1. Topo */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className={wrap + ' grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14'}>
          <div>
            <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3 py-1 text-[12px] font-semibold tracking-[0.14em] text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-[#007AFF]"></span>LEGALOPS · EM BREVE
            </span>
            <h1 className={'hero-rise mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] ' + heroTitle} style={rise(80)}>
              Saiba o que cada pessoa da sua equipa está a fazer — sem ter de perguntar.
            </h1>
            <p className={'hero-rise mt-6 max-w-xl ' + heroLead} style={rise(160)}>
              O LegalOps é uma plataforma de gestão para escritórios de advogados. Processos, tarefas, prazos e documentos num só sítio, para o sócio atribuir o trabalho e acompanhar cada processo.
            </p>
            <a
              href={'#' + FORM_ID}
              className="hero-rise mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#1d1d1f] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-[#020617] dark:hover:bg-white/90 sm:w-auto"
              style={rise(240)}
            >
              Entrar na waitlist
            </a>
          </div>
          <div className="hero-rise" style={rise(300)}>
            <LegalOpsScene />
          </div>
        </div>
      </section>

      {/* 2. Porque estamos a criar o LegalOps */}
      <section aria-labelledby="porque" className="pb-16 md:pb-24">
        <Reveal y={20} className={wrap}>
          <div className="grid gap-6 border-t border-black/10 pt-12 dark:border-white/15 md:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h2 id="porque" className={h2}>Porque estamos a criar o LegalOps</h2>
            <div className={'grid gap-4 text-[17px] leading-[1.7] ' + muted}>
              <p>O LegalOps nasceu de uma pergunta que se ouve em muitos escritórios: <span className="font-semibold text-[#1d1d1f] dark:text-white">«Isto está com quem?»</span></p>
              <p>A informação do escritório costuma estar espalhada por e-mails, folhas de Excel, agendas pessoais e conversas de corredor. Quem coordena a equipa passa demasiado tempo a perguntar em que ponto estão as coisas.</p>
              <p>Estamos a criar uma plataforma simples, em que toda a equipa trabalha sobre a mesma informação e o sócio tem a visão de conjunto. Estamos a construí-la com escritórios reais — por isso, a sua opinião conta.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. O que pode fazer */}
      <section aria-labelledby="funcionalidades" className="pb-16 md:pb-24">
        <div className={wrap}>
          <Reveal y={20}>
            <span className={label}>Funcionalidades</span>
            <h2 id="funcionalidades" className={h2 + ' mt-3'}>O que pode fazer</h2>
          </Reveal>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal y={16} delay={(i % 3) * 0.06}>
                  <Icon className="h-6 w-6 text-[#007AFF]" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{title}</h3>
                  <p className={'mt-1.5 text-[15px] leading-relaxed ' + muted}>{text.charAt(0).toUpperCase() + text.slice(1)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[14px] text-black/50 dark:text-white/50">Para escritórios com equipas a partir de 2 pessoas.</p>
        </div>
      </section>

      {/* 4. O que vai receber + formulário */}
      <section aria-labelledby="entrar" className="pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-6">
          <h2 id="entrar" className={h2 + ' text-center'}>Entrar na waitlist</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-black/[0.03] p-5 dark:bg-white/[0.04]">
              <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">Waitlist do LegalOps</p>
              <p className={'mt-1.5 text-[15px] leading-relaxed ' + muted}>Novidades sobre o desenvolvimento, aviso quando o LegalOps abrir e, de vez em quando, ideias práticas para organizar o escritório.</p>
            </div>
            <div className="rounded-2xl bg-[#007AFF]/[0.06] p-5 dark:bg-[#007AFF]/10">
              <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">Newsletter ElevaOps <span className="font-normal text-black/50 dark:text-white/50">(opcional)</span></p>
              <p className={'mt-1.5 text-[15px] leading-relaxed ' + muted}>Todas as semanas, conteúdos práticos sobre automação e soluções digitais para escritórios e negócios. Sem spam, sem jargão.</p>
            </div>
          </div>
          <div className="mt-6">
            <WaitlistForm id={FORM_ID} />
          </div>
        </div>
      </section>

      {/* 5. Perguntas frequentes */}
      <section aria-labelledby="faq" className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-6">
          <h2 id="faq" className={h2}>Perguntas frequentes</h2>
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/15 dark:border-white/15">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] font-semibold text-[#1d1d1f] dark:text-white [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-black/40 transition-transform duration-200 group-open:rotate-180 dark:text-white/50" aria-hidden="true" />
                </summary>
                <p className={'pb-5 pr-9 text-[16px] leading-relaxed ' + muted}>{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-black/45 dark:text-white/45">LegalOps é um produto ElevaOps.</p>
        </div>
      </section>
    </PageShell>
  );
}
