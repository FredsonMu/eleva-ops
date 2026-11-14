import Image from 'next/image';
import Link from 'next/link';
import { CalendarCheck, ChevronDown, FileSpreadsheet, FolderOpen, GitBranch, ListChecks, ShieldCheck } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

// /legalops: LegalOps waitlist. Short, one column, LegalOps brand (navy #182848, blue #3355FF,
// sky #88B8F0, ivory background). Its own header and footer instead of the ElevaOps ones.
// Linked from the "Gestão Jurídica Digital" manual and Instagram ads, so phone first.

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

const section = 'mx-auto w-full max-w-2xl px-5';
const h2 = 'lo-display text-[clamp(1.6rem,6vw,2.1rem)] font-semibold leading-[1.15] tracking-tight text-[#182848]';
const body = 'text-[17px] leading-[1.7] text-[#182848]/75';

export function WaitlistLanding() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] font-sans text-[#182848] selection:bg-[#3355FF] selection:text-white">
      <header className={section + ' flex items-center pt-6 sm:pt-8'}>
        <Link href="/legalops" aria-label="LegalOps">
          <Image src="/legalops/logo.png" alt="LegalOps" width={570} height={140} priority className="h-8 w-auto sm:h-9" />
        </Link>
      </header>

      <main>
        {/* 1. Topo */}
        <section className={section + ' pt-14 pb-16 sm:pt-20 sm:pb-20'}>
          <span className="hero-rise inline-flex items-center gap-2 rounded-full bg-[#88B8F0]/25 px-3 py-1 text-[12px] font-semibold tracking-[0.14em] text-[#182848]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355FF]"></span>LEGALOPS · EM BREVE
          </span>
          <h1 className="lo-display hero-rise mt-5 text-[clamp(2.1rem,8.5vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[#182848] text-balance" style={{ animationDelay: '80ms' }}>
            Saiba o que cada pessoa da sua equipa está a fazer — sem ter de perguntar.
          </h1>
          <p className={'hero-rise mt-6 ' + body + ' sm:text-[19px]'} style={{ animationDelay: '160ms' }}>
            O LegalOps é uma plataforma de gestão para escritórios de advogados. Processos, tarefas, prazos e documentos num só sítio, para o sócio atribuir o trabalho e acompanhar cada processo.
          </p>
          <a
            href={'#' + FORM_ID}
            className="hero-rise mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#3355FF] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#2443e6] sm:w-auto"
            style={{ animationDelay: '240ms' }}
          >
            Entrar na waitlist
          </a>
        </section>

        {/* 2. Porque estamos a criar o LegalOps */}
        <section aria-labelledby="porque" className="border-y border-[#182848]/10 bg-white/60">
          <div className={section + ' py-14 sm:py-16'}>
            <h2 id="porque" className={h2}>Porque estamos a criar o LegalOps</h2>
            <div className={'mt-6 grid gap-4 ' + body}>
              <p>O LegalOps nasceu de uma pergunta que se ouve em muitos escritórios: <span className="font-semibold text-[#182848]">«Isto está com quem?»</span></p>
              <p>A informação do escritório costuma estar espalhada por e-mails, folhas de Excel, agendas pessoais e conversas de corredor. Quem coordena a equipa passa demasiado tempo a perguntar em que ponto estão as coisas.</p>
              <p>Estamos a criar uma plataforma simples, em que toda a equipa trabalha sobre a mesma informação e o sócio tem a visão de conjunto. Estamos a construí-la com escritórios reais — por isso, a sua opinião conta.</p>
            </div>
          </div>
        </section>

        {/* 3. O que pode fazer */}
        <section aria-labelledby="funcionalidades" className={section + ' py-14 sm:py-16'}>
          <h2 id="funcionalidades" className={h2}>O que pode fazer</h2>
          <ul className="mt-6 divide-y divide-[#182848]/10 border-y border-[#182848]/10">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 py-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#3355FF]" strokeWidth={1.75} aria-hidden="true" />
                  <p className="text-[16px] leading-relaxed text-[#182848]/75">
                    <span className="font-semibold text-[#182848]">{title}</span> — {text}
                  </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] text-[#182848]/55">Para escritórios com equipas a partir de 2 pessoas.</p>
        </section>

        {/* 4. O que vai receber + formulário */}
        <section aria-labelledby="entrar" className={section + ' pb-14 sm:pb-16'}>
          <h2 id="entrar" className={h2}>Entrar na waitlist</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#182848]/10 bg-white p-5">
              <p className="text-[15px] font-semibold text-[#182848]">Waitlist do LegalOps</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#182848]/70">Novidades sobre o desenvolvimento, aviso quando o LegalOps abrir e, de vez em quando, ideias práticas para organizar o escritório.</p>
            </div>
            <div className="rounded-2xl border border-[#88B8F0]/60 bg-[#88B8F0]/10 p-5">
              <p className="text-[15px] font-semibold text-[#182848]">Newsletter ElevaOps <span className="font-normal text-[#182848]/55">(opcional)</span></p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#182848]/70">Todas as semanas, conteúdos práticos sobre automação e soluções digitais para escritórios e negócios. Sem spam, sem jargão.</p>
            </div>
          </div>
          <div className="mt-6">
            <WaitlistForm id={FORM_ID} />
          </div>
        </section>

        {/* 5. Perguntas frequentes */}
        <section aria-labelledby="faq" className={section + ' pb-16 sm:pb-20'}>
          <h2 id="faq" className={h2}>Perguntas frequentes</h2>
          <div className="mt-6 divide-y divide-[#182848]/10 border-y border-[#182848]/10">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold text-[#182848] [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#182848]/50 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-5 pr-9 text-[16px] leading-relaxed text-[#182848]/70">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#182848]/10">
        <div className={section + ' flex flex-wrap items-center gap-x-3 gap-y-2 py-8 text-[13px] text-[#182848]/60'}>
          <span className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="" width={265} height={210} className="h-4 w-auto opacity-80" />
            LegalOps é um produto ElevaOps
          </span>
          <span aria-hidden="true">·</span>
          <Link href="/" className="hover:text-[#182848]">elevaops.com</Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy-policy" className="hover:text-[#182848]">Política de Privacidade</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-[#182848]">Contacto</Link>
        </div>
      </footer>
    </div>
  );
}
