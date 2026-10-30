'use client';
import Link from 'next/link';
import { ArrowRight, Check, MousePointer2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';
import { tileBar, tileWindow } from './FeatureTile';
import { ExcelIcon, GmailIcon, SheetsIcon, WhatsAppIcon } from './BrandIcons';

// /solutions: one row per service — why it exists, what we build, when it fits — next to a
// larger looping product moment. Loops reuse the CSS in globals.css (`.loop`, `.svc-*`,
// `.pth-*`, `.sol-*`), run once the row is in view and rest on their final frame without motion.

type Lang = 'en' | 'pt';

const COPY = {
  en: {
    how: 'How it works',
    steps: [
      ['Visitor lands from search or an ad', 'Clear page, one call to action', 'Enquiry arrives in your system, ready to answer'],
      ['Something happens (a form, an email, a payment)', 'The workflow runs the agreed steps', 'People only approve what needs a decision'],
      ['We map the information you use today', 'One shared place replaces scattered files', 'Each person sees what they need, up to date'],
      ['A client asks a question', 'The agent answers from your own information', 'It books or hands over to your team'],
    ],
    jump: 'Jump to',
    why: 'Why it exists',
    build: 'What we build',
    fit: 'A good fit if',
    services: [
      {
        id: 'websites', tag: 'Presence & Conversion', title: 'A website that brings in clients, not just visits.',
        why: 'Most sites look fine but don’t turn visits into enquiries. Yours should work like your best salesperson.',
        build: ['Fast websites and landing pages built around one goal', 'Forms that land straight in your systems', 'Campaign pages with tracking, in EN and PT'],
        fit: 'your site gets visits but few real enquiries, or you’re launching a campaign.',
      },
      {
        id: 'automation', tag: 'Smart Automation', title: 'Steps that run by themselves, every time.',
        why: 'Copying data and sending the same emails eats hours and causes mistakes. A system can do it reliably.',
        build: ['Connections between the tools you already use', 'Rules, reminders and approvals where a person decides', 'Clear logs of what ran and when'],
        fit: 'your team repeats the same steps every week or things fall between tools.',
      },
      {
        id: 'platforms', tag: 'Internal Platforms', title: 'One place for clients, projects and team.',
        why: 'When information lives in spreadsheets and chats, nobody has the full picture.',
        build: ['Client portals and dashboards made for your process', 'One shared record per client, project or order', 'Roles and permissions for each person'],
        fit: 'you manage your operation in spreadsheets, or software you pay for doesn’t fit.',
      },
      {
        id: 'ai-agents', tag: 'AI Agents', title: 'An assistant that answers, prepares and books.',
        why: 'Your team loses focus answering the same questions. An agent handles the routine and hands over when it matters.',
        build: ['Assistants for your site, WhatsApp or email', 'Agents that qualify, book and prepare briefs', 'Human approval for anything sensitive'],
        fit: 'you get many similar questions or your team spends time preparing routine work.',
      },
    ],
    toolsTitle: 'We connect the tools you already use.',
    toolsLead: 'No need to start from zero: we build around what already works in your business.',
    tools: ['Website & forms', 'Calendars', 'CRM', 'Invoicing', 'Documents', 'Team chat'],
    cta: 'Not sure which one you need?', ctaBtn: 'Book a free diagnosis',
    scene: {
      enquiry: 'New enquiry · Brightwell Clinic', crm: 'Added to CRM', book: 'Book a call', name: 'Name', email: 'Email',
      flow: ['Form received', 'Client created in CRM', 'Contract sent for signature', 'Invoice issued', 'Team notified'],
      nav: ['Clients', 'Projects', 'Invoices'], views: [['Brightwell Clinic', 'Cedar Marketing', 'Lumen Studio'], ['Website redesign', 'Client portal', 'Onboarding flow'], ['#2026-041 · Paid', '#2026-042 · Sent', '#2026-043 · Draft']],
      q: 'Hi! Can I book a consultation for Friday?', a: 'Of course. I have 10:00 or 15:00 free. Which works for you?', booked: 'Booked · Fri 10:00',
      log: 'Agent activity', steps: ['Checked the calendar', 'Created the booking', 'Sent confirmation', 'Briefed the team'],
    },
  },
  pt: {
    how: 'Como funciona',
    steps: [
      ['O visitante chega pela pesquisa ou por um anúncio', 'Página clara, uma só ação', 'O pedido entra no seu sistema, pronto a responder'],
      ['Algo acontece (um formulário, um email, um pagamento)', 'O fluxo corre os passos acordados', 'As pessoas só aprovam o que exige decisão'],
      ['Mapeamos a informação que usa hoje', 'Um lugar partilhado substitui ficheiros soltos', 'Cada pessoa vê o que precisa, sempre atualizado'],
      ['Um cliente faz uma pergunta', 'O agente responde com a informação da sua empresa', 'Marca ou passa à sua equipa'],
    ],
    jump: 'Ir para',
    why: 'Porque existe',
    build: 'O que construímos',
    fit: 'Faz sentido se',
    services: [
      {
        id: 'websites', tag: 'Presença & Conversão', title: 'Um site que traz clientes, não só visitas.',
        why: 'A maioria dos sites parece bem mas não transforma visitas em pedidos. O seu deve trabalhar como o melhor vendedor.',
        build: ['Websites e landing pages rápidos, com um objetivo claro', 'Formulários que entram direto nos seus sistemas', 'Páginas de campanha com medição, em PT e EN'],
        fit: 'o seu site tem visitas mas poucos pedidos reais, ou vai lançar uma campanha.',
      },
      {
        id: 'automation', tag: 'Automação Inteligente', title: 'Passos que correm sozinhos, sempre.',
        why: 'Copiar dados e enviar os mesmos emails consome horas e gera erros. Um sistema faz isso com fiabilidade.',
        build: ['Ligações entre as ferramentas que já usa', 'Regras, lembretes e aprovações onde uma pessoa decide', 'Registos claros do que correu e quando'],
        fit: 'a sua equipa repete os mesmos passos todas as semanas ou há coisas que se perdem entre ferramentas.',
      },
      {
        id: 'platforms', tag: 'Plataformas Internas', title: 'Um só lugar para clientes, projetos e equipa.',
        why: 'Quando a informação vive em folhas de cálculo e conversas, ninguém tem a visão completa.',
        build: ['Portais de clientes e painéis feitos para o seu processo', 'Um registo partilhado por cliente, projeto ou encomenda', 'Perfis e permissões para cada pessoa'],
        fit: 'gere a operação em folhas de cálculo, ou o software que paga não encaixa.',
      },
      {
        id: 'ai-agents', tag: 'Agentes de IA', title: 'Um assistente que responde, prepara e marca.',
        why: 'A equipa perde foco a responder às mesmas perguntas. Um agente trata da rotina e passa a uma pessoa quando importa.',
        build: ['Assistentes para o site, WhatsApp ou email', 'Agentes que qualificam, marcam e preparam resumos', 'Aprovação humana para tudo o que é sensível'],
        fit: 'recebe muitas perguntas parecidas ou a equipa perde tempo a preparar trabalho rotineiro.',
      },
    ],
    toolsTitle: 'Ligamos as ferramentas que já usa.',
    toolsLead: 'Não é preciso começar do zero: construímos à volta do que já funciona na sua empresa.',
    tools: ['Site e formulários', 'Calendários', 'CRM', 'Faturação', 'Documentos', 'Chat da equipa'],
    cta: 'Não sabe qual precisa?', ctaBtn: 'Agendar diagnóstico gratuito',
    scene: {
      enquiry: 'Novo pedido · Clínica Brightwell', crm: 'Adicionado ao CRM', book: 'Marcar chamada', name: 'Nome', email: 'Email',
      flow: ['Formulário recebido', 'Cliente criado no CRM', 'Contrato enviado para assinatura', 'Fatura emitida', 'Equipa notificada'],
      nav: ['Clientes', 'Projetos', 'Faturas'], views: [['Clínica Brightwell', 'Cedar Marketing', 'Lumen Studio'], ['Novo website', 'Portal de clientes', 'Fluxo de integração'], ['#2026-041 · Paga', '#2026-042 · Enviada', '#2026-043 · Rascunho']],
      q: 'Olá! Posso marcar uma consulta para sexta?', a: 'Claro. Tenho as 10:00 ou as 15:00 livres. Qual prefere?', booked: 'Marcado · Sex 10:00',
      log: 'Atividade do agente', steps: ['Consultou o calendário', 'Criou a marcação', 'Enviou a confirmação', 'Informou a equipa'],
    },
  },
} as const;

type Scene = (typeof COPY)[Lang]['scene'];

function WebsiteScene({ s }: { s: Scene }) {
  return (
    <div className={`${tileWindow} relative w-[86%] max-w-[420px] translate-y-6`}>
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] dark:border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20"></span>
        <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20"></span>
        <span className={`${tileBar} ml-2 h-2 w-28`}></span>
      </div>
      <div className="grid grid-cols-[1.1fr_1fr] gap-4 px-5 pt-5 pb-12">
        <div>
          <span className={`${tileBar} block h-3 w-full`}></span>
          <span className={`${tileBar} mt-2 block h-3 w-2/3`}></span>
          <span className={`${tileBar} mt-4 block h-2 w-5/6 opacity-60`}></span>
          <span className={`${tileBar} mt-1.5 block h-2 w-3/4 opacity-60`}></span>
        </div>
        <div className="rounded-lg border border-black/[0.06] dark:border-white/10 p-2.5">
          {[s.name, s.email].map((l, i) => (
            <div key={l} className="mb-2">
              <span className="text-[9px] font-semibold text-black/45 dark:text-white/45">{l}</span>
              <span className="mt-1 block h-5 overflow-hidden rounded-md border border-black/10 dark:border-white/15 px-1.5 py-1.5">
                <span className="loop pth-meter block h-1.5 rounded-full bg-black/25 dark:bg-white/30" style={{ width: i ? '80%' : '55%', animationDelay: `${i * 0.35}s` }}></span>
              </span>
            </div>
          ))}
          <span className="svc-press mt-1 flex h-6 items-center justify-center rounded-full bg-[#007AFF] text-[9px] font-semibold text-white">{s.book}</span>
        </div>
      </div>
      <MousePointer2 className="svc-cursor absolute right-[20%] top-[150px] h-5 w-5 fill-[#1d1d1f] text-white dark:fill-white dark:text-[#1d1d1f]" strokeWidth={1.5} />
      <div className="svc-toast absolute right-2 -top-6 sm:-right-4 flex flex-col gap-1 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#16203a] px-3 py-2 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)]">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#1d1d1f] dark:text-white whitespace-nowrap"><span className="h-2 w-2 rounded-full bg-[#28c840]"></span>{s.enquiry}</span>
        <span className="pl-4 text-[10px] text-black/50 dark:text-white/55">{s.crm} ✓</span>
      </div>
    </div>
  );
}

function AutomationScene({ s }: { s: Scene }) {
  return (
    <div className="my-auto flex w-[86%] max-w-[420px] items-center gap-4">
      <div className="hidden sm:flex flex-col gap-2" aria-hidden="true">
        {[WhatsAppIcon, GmailIcon, SheetsIcon, ExcelIcon].map((Icon, i) => (
          <span key={i} className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#16203a] shadow-sm"><Icon className="h-4 w-4" /></span>
        ))}
      </div>
      <div className={`${tileWindow} flex-1 px-4 py-3`}>
        {s.flow.map((step, i) => (
          <div key={step} className="svc-step relative flex items-center gap-3 py-2" style={{ animationDelay: `${i * 0.5}s` }}>
            {i < s.flow.length - 1 && <span className="absolute left-[8px] top-[26px] h-[calc(100%-14px)] w-px bg-black/10 dark:bg-white/15"></span>}
            <span className="svc-step-dot flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-2">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
            </span>
            <span className="svc-step-label flex-1 text-[12px] font-semibold">{step}</span>
            <span className="text-[10px] tabular-nums text-black/40 dark:text-white/40">09:{14 + i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformScene({ s }: { s: Scene }) {
  return (
    <div className={`${tileWindow} w-[88%] max-w-[440px] translate-y-6 overflow-hidden`}>
      <div className="flex">
        <div className="relative w-[34%] border-r border-black/[0.06] dark:border-white/10 p-2 pb-12">
          <span className="loop sol-tab absolute inset-x-2 top-2 h-8 rounded-md bg-[#007AFF]/10"></span>
          {s.nav.map(n => (
            <span key={n} className="relative flex h-8 items-center px-2 text-[11px] font-semibold text-black/70 dark:text-white/75">{n}</span>
          ))}
          <span className={`${tileBar} relative mx-2 mt-3 block h-2 w-2/3 opacity-60`}></span>
        </div>
        <div className="grid flex-1 p-3">
          {s.views.map((rows, v) => (
            <div key={v} className="loop sol-view [grid-area:1/1]" style={{ animationDelay: `${[0, -4, -2][v]}s` }}>
              <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-white">{s.nav[v]}</span>
              {rows.map(r => (
                <div key={r} className="mt-2 flex items-center gap-2 rounded-md bg-black/[0.03] dark:bg-white/[0.05] px-2 py-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${v === 2 ? 'bg-[#febc2e]' : 'bg-[#28c840]'}`}></span>
                  <span className="truncate text-[10px] font-medium text-black/70 dark:text-white/75">{r}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentScene({ s }: { s: Scene }) {
  return (
    <div className="my-auto grid w-[90%] max-w-[460px] grid-cols-1 sm:grid-cols-[1.25fr_1fr] gap-3">
      <div className="flex flex-col gap-2">
        <span className="svc-msg self-start rounded-2xl rounded-bl-md border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#16203a] px-3 py-2 text-[11px] text-[#1d1d1f] dark:text-white shadow-sm">{s.q}</span>
        <span className="grid justify-items-end self-end">
          <span className="svc-typing [grid-area:1/1] flex h-fit w-fit gap-1 self-start rounded-2xl rounded-br-md bg-[#007AFF] px-3 py-2.5">
            {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/80"></span>)}
          </span>
          <span className="svc-reply [grid-area:1/1] rounded-2xl rounded-br-md bg-[#007AFF] px-3 py-2 text-[11px] text-white shadow-sm">{s.a}</span>
        </span>
        <span className="svc-chip flex items-center gap-1.5 self-end rounded-full border border-[#28c840]/30 bg-[#28c840]/10 px-2.5 py-1 text-[10px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">
          <Check className="h-3 w-3" strokeWidth={3} />{s.booked}
        </span>
      </div>
      <div className={`${tileWindow} hidden sm:block px-3 py-2.5`}>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-black/45 dark:text-white/45">{s.log}</span>
        {s.steps.map((st, i) => (
          <span key={st} className="mt-2 flex items-center gap-1.5">
            <span className="loop pth-tick flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#007AFF]" style={{ animationDelay: `${0.9 + i * 0.35}s` }}>
              <Check className="h-2 w-2 text-white" strokeWidth={4} />
            </span>
            <span className="text-[10px] font-medium text-black/70 dark:text-white/75">{st}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SCENES = [WebsiteScene, AutomationScene, PlatformScene, AgentScene];

export function SolutionsDetail() {
  const { language } = useLanguage();
  const lang: Lang = language === 'pt' ? 'pt' : 'en';
  const c = COPY[lang];

  return (
    <>
      {/* quick links */}
      <nav aria-label={c.jump} className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2 px-5">
        {c.services.map(sv => (
          <a key={sv.id} href={`#${sv.id}`} className="rounded-full bg-black/[0.05] dark:bg-white/[0.07] px-4 py-2 text-[14px] text-black/70 dark:text-white/75 transition-colors hover:bg-black/[0.09] dark:hover:bg-white/[0.12]">{sv.tag}</a>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20 flex flex-col gap-16 md:gap-24">
        {c.services.map((sv, i) => {
          const Scene = SCENES[i];
          return (
            <section key={sv.id} id={sv.id} className="scroll-mt-28">
              <Reveal y={32} duration={0.8} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
                <figure className={`relative flex h-72 sm:h-80 md:h-[24rem] items-end justify-center overflow-hidden rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] ${i % 2 ? 'lg:order-2' : ''}`} aria-hidden="true">
                  <Scene s={c.scene} />
                </figure>
                <div className={`max-w-xl ${i % 2 ? 'lg:order-1' : ''}`}>
                  <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">0{i + 1} · {sv.tag}</span>
                  <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">{sv.title}</h2>
                  <p className="mt-4 text-base md:text-[17px] leading-relaxed text-black/65 dark:text-white/65 text-pretty">{sv.why}</p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {sv.build.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#1d1d1f] dark:text-white/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#007AFF]" strokeWidth={2.5} aria-hidden="true" />{b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-l-2 border-[#007AFF] pl-4 text-[14px] leading-relaxed text-black/60 dark:text-white/65">
                    <span className="font-semibold text-brand">{c.fit}</span> {sv.fit}
                  </p>
                </div>
              </Reveal>
              {/* how it works: three steps with a line that fills in turn */}
              <Reveal y={20} className="mt-8 md:mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">{c.how}</p>
                <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {c.steps[i].map((st, k) => (
                    <li key={st} className="flex gap-3 sm:block">
                      <span className="mt-2 block h-[2px] w-8 shrink-0 overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/10 sm:mt-0 sm:w-full">
                        <span className="loop pth-meter block h-full w-full rounded-full bg-[#007AFF]" style={{ animationDelay: `${k * 0.7}s` }}></span>
                      </span>
                      <span className="text-[15px] leading-snug text-black/70 dark:text-white/75 sm:mt-3 sm:block">
                        <span className="mr-1.5 font-mono text-[12px] font-bold text-brand">0{k + 1}</span>{st}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* tools we connect */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
          <Reveal y={28} className="rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] px-6 py-12 md:px-14 md:py-16 text-center">
            <h2 className="mx-auto max-w-2xl font-sans text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.2] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">{c.toolsTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/55 dark:text-white/55">{c.toolsLead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {[WhatsAppIcon, GmailIcon, SheetsIcon, ExcelIcon].map((Icon, i) => (
                <span key={i} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-white/[0.06] shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)]"><Icon className="h-5 w-5" /></span>
              ))}
              {c.tools.map(tl => (
                <span key={tl} className="flex h-11 items-center rounded-2xl bg-white dark:bg-white/[0.06] px-4 text-[14px] font-medium text-black/70 dark:text-white/75 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)]">{tl}</span>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <span className="text-[15px] text-black/55 dark:text-white/55">{c.cta}</span>
              <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90">
                {c.ctaBtn}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
