'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Download, Loader2, X } from 'lucide-react';
import { GUIDE, LIMITS } from '@/lib/guide';
import { useLanguage } from '@/lib/i18n';
import { captureTracking, getTracking } from './guide/tracking';
import { LEAD_EVENT } from './guide/GuideLeadForm';

// Small corner card for the "7 AI Agents" guide. The cover peeks out of the top edge, and the
// sign-up is a two-step conversation (email, then first name) so it stays one line tall.
// It slides in after 45% scroll or 40s, and stays away for 14 days once closed (for good once
// someone signs up). Posts to the same /api/guide-lead route, so the lead is stored for real
// before the download unlocks.

const KEY = 'eleva-guide-popup';
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const DELAY_MS = 40_000;
const SCROLL_RATIO = 0.45;

const COPY = {
  en: {
    label: 'Free guide',
    title: '7 AI agents your business could be using right now.',
    email: 'Your email',
    name: 'And your first name?',
    next: 'Continue',
    send: 'Get the guide',
    consent: 'Also send me occasional emails about automation and AI.',
    privacy: 'Privacy Policy',
    ready: 'Your guide is ready.',
    download: 'Download PDF',
    close: 'Close',
    invalidEmail: 'Please enter a valid email.',
    noName: 'Please enter your first name.',
    offline: 'We couldn’t reach the server. Try again.',
  },
  pt: {
    label: 'Guia gratuito',
    title: '7 agentes de IA que a sua empresa pode usar já.',
    email: 'O seu email',
    name: 'E o seu primeiro nome?',
    next: 'Continuar',
    send: 'Receber o guia',
    consent: 'Enviem-me também emails ocasionais sobre automação e IA.',
    privacy: 'Política de Privacidade',
    ready: 'O seu guia está pronto.',
    download: 'Descarregar PDF',
    close: 'Fechar',
    invalidEmail: 'Introduza um email válido.',
    noName: 'Introduza o seu primeiro nome.',
    offline: 'Não foi possível contactar o servidor. Tente novamente.',
  },
} as const;

function readState(): { closedAt?: number; joined?: boolean } {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
}
function writeState(state: { closedAt?: number; joined?: boolean }) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked: it may show again later */ }
}

export function GuidePopup() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'name' | 'sending' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [download, setDownload] = useState<string>(GUIDE.pdf);
  const startedAt = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const state = readState();
    if (state.joined || (state.closedAt && Date.now() - state.closedAt < SNOOZE_MS)) return;
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      startedAt.current = Date.now();
      captureTracking();
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_RATIO) show();
    };
    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    const cleanup = () => { window.clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
    return cleanup;
  }, []);

  useEffect(() => {
    if (step === 'name') inputRef.current?.focus();
  }, [step]);

  const close = () => {
    setOpen(false);
    if (!readState().joined) writeState({ closedAt: Date.now() });
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError('');

    if (step === 'email') {
      const value = String(data.get('email') ?? '').trim();
      if (!value || !(form.elements.namedItem('email') as HTMLInputElement).validity.valid) { setError(c.invalidEmail); return; }
      setEmail(value);
      setStep('name');
      return;
    }

    const firstName = String(data.get('firstName') ?? '').trim();
    if (!firstName) { setError(c.noName); return; }
    setStep('sending');
    try {
      const response = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          marketingConsent: data.get('marketingConsent') === 'on',
          company: String(data.get('company') ?? ''), // honeypot
          startedAt: startedAt.current,
          tracking: getTracking(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setError(result?.error ?? c.offline);
        setStep(result?.field === 'email' ? 'email' : 'name');
        return;
      }
      setDownload(result.download ?? GUIDE.pdf);
      setStep('done');
      writeState({ joined: true });
      window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId } }));
    } catch {
      setError(c.offline);
      setStep('name');
    }
  }

  if (!open) return null;

  return (
    <aside
      aria-label={c.label}
      className="guide-card-in fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[340px]"
    >
      <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] p-4 pt-5 shadow-[0_24px_60px_-20px_rgba(0,30,90,0.35)] backdrop-blur-xl">
        {/* the guide peeks out of the card */}
        <div className="guide-peek absolute -top-9 left-4 w-14 rotate-[-8deg]" aria-hidden="true">
          <Image src={GUIDE.cover} alt="" width={GUIDE.coverWidth} height={GUIDE.coverHeight} sizes="56px" className="rounded-[4px] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)]" />
        </div>

        <button
          type="button"
          onClick={close}
          aria-label={c.close}
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-black/45 dark:text-white/50 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/10"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <div className="pl-[68px] pr-6">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-[#007AFF]"></span>{c.label}
          </span>
          <p className="mt-1 text-[14px] font-semibold leading-snug text-[#1d1d1f] dark:text-white">{c.title}</p>
        </div>

        {step === 'done' ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#28c840]/10 px-3 py-2.5" role="status">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />{c.ready}
            </span>
            <a href={download} download={GUIDE.pdfFileName} className="inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] dark:bg-white px-3 py-1.5 text-[12px] font-semibold text-white dark:text-[#020617]">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />{c.download}
            </a>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-4">
            <div className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04] p-1 pl-4 transition-[border-color,box-shadow] focus-within:border-[#007AFF] focus-within:shadow-[0_0_0_4px_rgba(0,122,255,0.12)]">
              {step === 'email' ? (
                <input
                  key="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  maxLength={LIMITS.email}
                  defaultValue={email}
                  placeholder={c.email}
                  aria-label={c.email}
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none"
                />
              ) : (
                <input
                  key="name"
                  ref={inputRef}
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  maxLength={LIMITS.firstName}
                  placeholder={c.name}
                  aria-label={c.name}
                  disabled={step === 'sending'}
                  className="guide-step-in min-w-0 flex-1 bg-transparent text-[14px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none"
                />
              )}
              <button
                type="submit"
                disabled={step === 'sending'}
                aria-label={step === 'email' ? c.next : c.send}
                className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#007AFF] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#0066dd] disabled:opacity-80"
              >
                {step === 'sending'
                  ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  : step === 'name' ? <>{c.send}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            {/* honeypot */}
            <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px" />

            {step !== 'email' && (
              <label className="guide-step-in mt-2.5 flex cursor-pointer items-start gap-2 px-1 text-[11px] leading-snug text-black/55 dark:text-white/55">
                <input name="marketingConsent" type="checkbox" className="mt-px h-3.5 w-3.5 shrink-0 accent-[#007AFF]" />
                {c.consent}
              </label>
            )}
            {error && <p role="alert" className="mt-2 px-1 text-[12px] font-medium text-red-600 dark:text-red-400">{error}</p>}
            <p className="mt-2 px-1 text-[11px] text-black/40 dark:text-white/40">
              <a href="/privacy-policy" className="underline underline-offset-2 hover:no-underline">{c.privacy}</a>
            </p>
          </form>
        )}
      </div>
    </aside>
  );
}
