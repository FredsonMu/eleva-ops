import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Bot, Building2, FileText, Gauge, ListChecks, Workflow, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Reveal } from '@/components/Reveal';
import { GuideLeadForm } from '@/components/guide/GuideLeadForm';
import { StickyGuideCTA } from '@/components/guide/StickyGuideCTA';
import { GUIDE } from '@/lib/guide';

const description =
  'Discover practical ways to automate repetitive work, connect your tools and give your team more time for the work that matters. Free practical guide by Eleva Ops.';

export const metadata: Metadata = {
  title: `Free Guide: ${GUIDE.title}`,
  description,
  alternates: { canonical: GUIDE.path },
  openGraph: {
    type: 'website',
    url: GUIDE.path,
    siteName: 'ElevaOps',
    locale: 'en_US',
    title: GUIDE.title,
    description,
    images: [{ url: GUIDE.ogImage, width: 1200, height: 630, alt: `${GUIDE.title}: free practical guide by Eleva Ops` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: GUIDE.title,
    description,
    images: [GUIDE.ogImage],
  },
};

const FORM_ID = 'get-guide';
const HERO_CTA_ID = 'hero-cta';
const DIAGNOSIS_HREF = 'mailto:contact@elevaops.com?subject=Free%20Diagnosis%20%E2%80%94%20AI%20agents';

const included = [
  { icon: Bot, text: 'Seven practical AI agent use cases for your business', visual: 'agents' },
  { icon: Building2, text: 'Real-world company examples', visual: 'companies' },
  { icon: Workflow, text: 'Three complete workflow examples', visual: 'workflows' },
  { icon: ListChecks, text: 'A business readiness checklist', visual: 'checklist' },
  { icon: Gauge, text: 'A simple Automation Opportunity Score', visual: 'score' },
] as const;

// Small decorative illustrations for the "what's inside" cards (no data, purely visual).
function CardVisual({ kind }: { kind: (typeof included)[number]['visual'] }) {
  switch (kind) {
    case 'agents':
      return (
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className="guide-agent flex h-8 w-8 items-center justify-center rounded-full border border-[#007AFF]/25 bg-[#007AFF]/[0.07] text-[10px] font-bold text-brand"
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      );
    case 'companies':
      return (
        <div className="flex items-end gap-2" aria-hidden="true">
          {[28, 44, 36, 52].map((h, i) => (
            <span key={i} className="w-7 rounded-t-md border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05]" style={{ height: h }}>
              <span className="mx-auto mt-1.5 block h-1 w-3 rounded-full bg-black/15 dark:bg-white/20"></span>
              <span className="mx-auto mt-1 block h-1 w-3 rounded-full bg-black/15 dark:bg-white/20"></span>
            </span>
          ))}
        </div>
      );
    case 'workflows':
      return (
        <svg viewBox="0 0 160 40" className="h-10 w-40" aria-hidden="true">
          <path d="M14 20 H66 M94 20 H146" className="stroke-black/15 dark:stroke-white/20" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          {[14, 80, 146].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="20" r="12" className={i === 1 ? 'fill-[#007AFF]' : 'fill-white dark:fill-[#0a0a0f] stroke-black/15 dark:stroke-white/20'} strokeWidth="1.5" />
              <text x={cx} y="24" textAnchor="middle" fontSize="11" fontWeight="700" className={i === 1 ? 'fill-white' : 'fill-black/50 dark:fill-white/60'}>{i + 1}</text>
            </g>
          ))}
        </svg>
      );
    case 'checklist':
      return (
        <div className="flex flex-col gap-2" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-2">
              <span className={`flex h-4 w-4 items-center justify-center rounded-[5px] border ${i < 2 ? 'border-[#007AFF] bg-[#007AFF]' : 'border-black/20 dark:border-white/25'}`}>
                {i < 2 && <svg viewBox="0 0 12 12" className="h-2.5 w-2.5"><path d="M2.5 6.5 5 9l4.5-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span className="h-1.5 rounded-full bg-black/10 dark:bg-white/15" style={{ width: [88, 64, 76][i] }}></span>
            </div>
          ))}
        </div>
      );
    case 'score':
      return (
        <svg viewBox="0 0 120 64" className="h-14 w-28" aria-hidden="true">
          <path d="M10 58 A50 50 0 0 1 110 58" fill="none" className="stroke-black/10 dark:stroke-white/15" strokeWidth="10" strokeLinecap="round" />
          <path d="M10 58 A50 50 0 0 1 96 22" fill="none" stroke="url(#guide-score)" strokeWidth="10" strokeLinecap="round" />
          <defs>
            <linearGradient id="guide-score" x1="0" x2="1">
              <stop offset="0%" stopColor="#7cc0ff" />
              <stop offset="100%" stopColor="#007AFF" />
            </linearGradient>
          </defs>
          <circle cx="96" cy="22" r="6" className="fill-white dark:fill-[#0a0a0f]" stroke="#007AFF" strokeWidth="3" />
        </svg>
      );
  }
}

function GuideCover({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`guide-cover relative ${className}`}>
      {/* Pages peeking out behind the cover, so it reads as a real document. */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] rounded-[14px] bg-white dark:bg-[#e9edf5] border border-black/[0.06] shadow-[0_10px_30px_-12px_rgba(0,30,90,0.25)]" aria-hidden="true"></div>
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.2deg] rounded-[14px] bg-white dark:bg-[#f2f4f8] border border-black/[0.06]" aria-hidden="true"></div>
      <div className="relative overflow-hidden rounded-[14px] bg-white shadow-[0_40px_80px_-24px_rgba(0,50,140,0.45),0_0_0_1px_rgba(0,0,0,0.06)]">
        <Image
          src={GUIDE.cover}
          alt={`Cover of the guide “${GUIDE.title}” by Eleva Ops`}
          width={GUIDE.coverWidth}
          height={GUIDE.coverHeight}
          sizes="(max-width: 768px) 70vw, 420px"
          priority={priority}
          fetchPriority={priority ? 'high' : undefined}
          className="block h-auto w-full"
        />
        {/* Soft glare */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_60%)]" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export default function AiAgentsGuidePage() {
  return (
    <div lang="en" className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <AuroraBackground />

      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />

        <main>
          {/* ── Hero ─────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-16 md:pt-44 md:pb-28">
            <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
              <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="guide-rise inline-flex items-center gap-2.5 rounded-full border border-[#007AFF]/20 bg-[#007AFF]/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-60 animate-ping [animation-iteration-count:3]"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#007AFF]"></span>
                  </span>
                  Free practical guide
                </span>

                <h1 className="guide-slide mt-7 font-sans font-semibold tracking-[-0.045em] leading-[0.98] text-[clamp(2.6rem,9vw,5.4rem)] text-balance">
                  <span className="text-[#007AFF]">7 AI Agents</span> Your Business Could Be Using Right Now
                </h1>

                <p className="guide-rise [animation-delay:160ms] mt-7 max-w-xl text-lg md:text-[1.35rem] leading-[1.55] font-medium text-black/60 dark:text-white/65 text-pretty">
                  Discover practical ways to automate repetitive work, connect your tools and give your team more time for the work that matters.
                </p>

                <div className="guide-rise [animation-delay:240ms] mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                  <a
                    id={HERO_CTA_ID}
                    href={`#${FORM_ID}`}
                    className="group inline-flex min-h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#007AFF] px-9 text-[13px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_-12px_rgba(0,122,255,0.7)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#0066dd] hover:shadow-[0_22px_48px_-12px_rgba(0,122,255,0.8)] active:scale-[0.98]"
                  >
                    Get the Free Guide
                    <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                  <ul className="flex items-center gap-4 text-xs font-semibold text-black/55 dark:text-white/60" aria-label="Guide format">
                    <li className="flex items-center gap-1.5"><FileText className="h-4 w-4" aria-hidden="true" />Free PDF</li>
                    <li className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/25" aria-hidden="true"></li>
                    <li className="flex items-center gap-1.5"><Zap className="h-4 w-4" aria-hidden="true" />Instant access</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-[68%] max-w-[300px] sm:max-w-[340px] lg:w-full lg:max-w-[400px]">
                  {/* Halo behind the cover */}
                  <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,122,255,0.22),rgba(0,122,255,0.06)_60%,transparent)]" aria-hidden="true"></div>
                  <GuideCover priority className="guide-float" />
                </div>
              </div>
            </div>
          </section>

          {/* ── What's inside ────────────────────────────────────── */}
          <section className="py-16 md:py-28" aria-labelledby="inside-title">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={40} className="flex flex-col items-center text-center mb-12 md:mb-16">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Inside the guide</span>
                <h2 id="inside-title" className="mt-4 font-sans font-semibold tracking-tight leading-[1.05] text-[clamp(2rem,5vw,3.5rem)] text-balance">
                  What you’ll find inside
                </h2>
              </Reveal>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
                {included.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
                      <Reveal delay={i * 0.08} y={30} className="h-full">
                        <div className="group relative h-full min-h-[220px] overflow-hidden rounded-[28px] border border-black/[0.07] dark:border-white/10 bg-white/85 dark:bg-white/[0.04] p-6 md:p-7 flex flex-col justify-between gap-8 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#007AFF]/30 hover:shadow-[0_24px_60px_-24px_rgba(0,122,255,0.3)]">
                          <span className="pointer-events-none absolute -right-2 -top-6 font-sans text-[110px] font-semibold leading-none tracking-tighter text-black/[0.04] dark:text-white/[0.05] select-none" aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="flex items-start justify-between gap-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007AFF]/10 text-brand">
                              <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="relative flex flex-col gap-5">
                            <CardVisual kind={item.visual} />
                            <p className="font-sans text-lg md:text-xl font-semibold tracking-tight leading-snug text-balance">{item.text}</p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* ── Form ─────────────────────────────────────────────── */}
          <section id={FORM_ID} className="scroll-mt-24 py-16 md:py-28" aria-labelledby="form-title">
            <div className="max-w-6xl mx-auto px-5 md:px-6">
              <Reveal y={40}>
                <div className="relative overflow-hidden rounded-[36px] md:rounded-[48px] border border-black/[0.07] dark:border-white/10 bg-gradient-to-br from-white via-white to-[#eef5ff] dark:from-white/[0.05] dark:via-white/[0.03] dark:to-[#007AFF]/[0.08] shadow-[0_40px_100px_-40px_rgba(0,60,160,0.35)]">
                  <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(0,122,255,0.16),transparent)]" aria-hidden="true"></div>
                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-3 pt-8 pb-3 sm:p-10 md:p-14">
                    <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Free · Instant access</span>
                      <h2 id="form-title" className="mt-4 font-sans font-semibold tracking-tight leading-[1.02] text-[clamp(2.2rem,5vw,3.75rem)]">
                        Get your free guide
                      </h2>
                      <p className="mt-4 text-lg font-medium text-black/60 dark:text-white/65">
                        Enter your details to access the guide.
                      </p>
                      <div className="mt-10 hidden lg:flex items-center gap-5">
                        <GuideCover className="w-24 rotate-[-4deg]" />
                        <p className="max-w-[16rem] text-sm font-semibold leading-snug text-black/60 dark:text-white/65">{GUIDE.title}</p>
                      </div>
                    </div>
                    <div className="relative rounded-[28px] border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#0a0f1f] p-5 sm:p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)]">
                      <GuideLeadForm />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Secondary CTA ────────────────────────────────────── */}
          <section className="pt-6 pb-24 md:pb-32">
            <Reveal y={30} className="max-w-3xl mx-auto px-5 md:px-6 flex flex-col items-center text-center">
              <p className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-balance">
                Want to explore what AI agents could do for your business?
              </p>
              <a
                href={DIAGNOSIS_HREF}
                className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-black/10 dark:border-white/20 px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1d1d1f] dark:text-white transition-colors hover:border-[#007AFF] hover:text-brand"
              >
                Book a Free Diagnosis
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>

      <StickyGuideCTA heroCtaId={HERO_CTA_ID} formId={FORM_ID} />
    </div>
  );
}
