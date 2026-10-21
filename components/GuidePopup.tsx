'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Download, Loader2, X } from 'lucide-react';
import { GUIDES, LIMITS } from '@/lib/guide';
import { useLanguage } from '@/lib/i18n';
import { captureTracking, getTracking } from './guide/tracking';
import { LEAD_EVENT } from './guide/GuideLeadForm';
import { PhoneInput } from './PhoneInput';
import { CONSENT_EVENT, getConsent } from '@/lib/consent';

// Small corner card for the "7 AI Agents" guide. The cover peeks out of the top edge, and the
// sign-up asks the same fields as the guide page (email, first name, company, phone) one at a
// time, so the card stays one line tall. It slides in after 45% scroll or 40s and stays away for
// 14 days once closed (for good once someone signs up). Posts to the same /api/guide-lead
// route, so the lead is stored for real before the download unlocks.

const KEY = 'eleva-guide-popup';
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const DELAY_MS = 40_000;
const SCROLL_RATIO = 0.45;

type Field = 'email' | 'firstName' | 'companyName' | 'phone';
const STEPS: Field[] = ['email', 'firstName', 'companyName', 'phone'];

const COPY = {
  en: {
    label: 'Free guide',
    title: '7 AI agents your business could be using right now.',
    q: { email: 'Your email', firstName: 'Your first name', companyName: 'Company name (optional)', phone: 'Phone (optional)' },
    next: 'Continue',
    send: 'Get the guide',
    skip: 'Skip',
    consent: 'Also send me occasional emails about automation and AI.',
    privacy: 'Privacy Policy',
    ready: 'Your guide is ready.',
    inbox: 'We’ve also sent it to your inbox.',
    nextStep: 'Want help choosing your first agent?',
    book: 'Book a free diagnosis',
    download: 'Download PDF',
    close: 'Close',
    country: 'Country code',
    invalidEmail: 'Please enter a valid email.',
    noName: 'Please enter your first name.',
    offline: 'We couldn’t reach the server. Try again.',
  },
  pt: {
    label: 'Guia gratuito',
    title: '7 agentes de IA que a sua empresa já pode começar a utilizar.',
    q: { email: 'O seu email', firstName: 'O seu primeiro nome', companyName: 'Nome da empresa (opcional)', phone: 'Telefone (opcional)' },
    next: 'Continuar',
    send: 'Receber o guia',
    skip: 'Saltar',
    consent: 'Enviem-me também emails ocasionais sobre automação e IA.',
    privacy: 'Política de Privacidade',
    ready: 'O seu guia está pronto.',
    inbox: 'Também o enviámos para o seu email.',
    nextStep: 'Quer ajuda a escolher o primeiro agente?',
    book: 'Agendar diagnóstico gratuito',
    download: 'Descarregar PDF',
    close: 'Fechar',
    country: 'Indicativo do país',
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
  const lang = language === 'pt' ? 'pt' : 'en';
  const c = COPY[lang];
  const guide = GUIDES[lang];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<Field, string>>({ email: '', firstName: '', companyName: '', phone: '' });
  const [status, setStatus] = useState<'form' | 'sending' | 'done'>('form');
  const [error, setError] = useState('');
  const [download, setDownload] = useState<string>(guide.pdf);
  const [emailed, setEmailed] = useState(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const field = STEPS[index];
  const last = index === STEPS.length - 1;

  useEffect(() => {
    const state = readState();
    if (state.joined || (state.closedAt && Date.now() - state.closedAt < SNOOZE_MS)) return;
    let done = false;
    const show = () => {
      if (done) return;
      if (getConsent() === null) { window.addEventListener(CONSENT_EVENT, show, { once: true }); return; }
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

  // move focus to the new question after the first one
  useEffect(() => {
    if (index > 0) formRef.current?.querySelector<HTMLInputElement>('input:not([type=hidden]):not([type=checkbox])')?.focus();
  }, [index]);

  const close = () => {
    setOpen(false);
    if (!readState().joined) writeState({ closedAt: Date.now() });
  };

  async function send(all: Record<Field, string>, consent: boolean, website: string) {
    setStatus('sending');
    try {
      const response = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...all, marketingConsent: consent, language: lang, website, startedAt: startedAt.current, tracking: getTracking() }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setError(result?.error ?? c.offline);
        setStatus('form');
        if (result?.field) setIndex(STEPS.indexOf(result.field as Field));
        return;
      }
      setDownload(result.download ?? guide.pdf);
      setEmailed(result.emailed === true);
      setStatus('done');
      writeState({ joined: true });
      window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId } }));
    } catch {
      setError(c.offline);
      setStatus('form');
    }
  }

  function submit(e: FormEvent<HTMLFormElement>, skip = false) {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);
    const value = skip ? '' : String(data.get(field) ?? '').trim();
    setError('');

    if (field === 'email' && (!value || !(form.elements.namedItem('email') as HTMLInputElement).validity.valid)) { setError(c.invalidEmail); return; }
    if (field === 'firstName' && !value) { setError(c.noName); return; }

    const next = { ...values, [field]: value };
    setValues(next);
    if (!last) { setIndex(index + 1); return; }
    send(next, data.get('marketingConsent') === 'on', String(data.get('website') ?? ''));
  }

  if (!open) return null;

  const inputClass = 'guide-step-in min-w-0 flex-1 bg-transparent text-[14px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none';

  return (
    <aside aria-label={c.label} className="guide-card-in fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[360px]">
      <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] p-4 pt-5 shadow-[0_24px_60px_-20px_rgba(0,30,90,0.35)]">
        {/* the guide peeks out of the card */}
        <div className="guide-peek absolute -top-9 left-4 w-14 rotate-[-8deg]" aria-hidden="true">
          <Image src={guide.cover} alt="" width={guide.coverWidth} height={guide.coverHeight} sizes="56px" className="rounded-[4px] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)]" />
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

        {status === 'done' ? (
          <div className="guide-step-in mt-4" role="status">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-[#28c840]/10 px-3 py-2.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#1a9e33] dark:text-[#5fe07a]">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />{c.ready}
              </span>
              <a href={download} download={guide.pdfFileName} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d1d1f] dark:bg-white px-3 py-1.5 text-[12px] font-semibold text-white dark:text-[#020617]">
                <Download className="h-3.5 w-3.5" aria-hidden="true" />{c.download}
              </a>
            </div>
            {emailed && <p className="mt-2 px-1 text-[12px] text-black/55 dark:text-white/55">{c.inbox}</p>}
            <Link href="/#contact" onClick={close} className="mt-3 flex flex-col gap-1 rounded-xl border border-black/[0.08] dark:border-white/10 px-3 py-2.5 text-[13px] transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.05]">
              <span className="text-black/70 dark:text-white/75">{c.nextStep}</span>
              <span className="flex items-center gap-1 font-semibold text-brand">{c.book}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
            </Link>
          </div>
        ) : (
          <form ref={formRef} onSubmit={submit} noValidate className="mt-4">
            {/* progress: one dash per question */}
            <div className="mb-2 flex gap-1 px-1" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= index ? 'bg-[#007AFF]' : 'bg-black/10 dark:bg-white/15'}`}></span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-hidden rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04] p-1 transition-[border-color,box-shadow] focus-within:border-[#007AFF] focus-within:shadow-[0_0_0_4px_rgba(0,122,255,0.12)]">
              {field === 'phone' ? (
                <PhoneInput
                  key="phone"
                  className="guide-step-in min-w-0 flex-1 [&>div]:border-0 [&>div>span]:pl-3 [&>div>span]:text-[13px]"
                  inputClassName="px-2 text-[14px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                  countryLabel={c.country}
                  placeholder={c.q.phone}
                />
              ) : (
                <input
                  key={field}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  inputMode={field === 'email' ? 'email' : undefined}
                  autoComplete={field === 'email' ? 'email' : field === 'firstName' ? 'given-name' : 'organization'}
                  autoCapitalize={field === 'email' ? 'off' : undefined}
                  spellCheck={field === 'email' ? false : undefined}
                  maxLength={field === 'email' ? LIMITS.email : field === 'firstName' ? LIMITS.firstName : LIMITS.companyName}
                  defaultValue={values[field]}
                  placeholder={c.q[field]}
                  aria-label={c.q[field]}
                  disabled={status === 'sending'}
                  className={`${inputClass} pl-3`}
                />
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                aria-label={last ? c.send : c.next}
                className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#007AFF] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#0066dd] disabled:opacity-80"
              >
                {status === 'sending'
                  ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  : last ? <><span className="hidden sm:inline">{c.send}</span><ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" /></> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            {/* honeypot */}
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px" />

            {last && (
              <label className="guide-step-in mt-2.5 flex cursor-pointer items-start gap-2 px-1 text-[11px] leading-snug text-black/55 dark:text-white/55">
                <input name="marketingConsent" type="checkbox" className="mt-px h-3.5 w-3.5 shrink-0 accent-[#007AFF]" />
                {c.consent}
              </label>
            )}
            {error && <p role="alert" className="mt-2 px-1 text-[12px] font-medium text-red-600 dark:text-red-400">{error}</p>}
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-black/40 dark:text-white/40">
              <a href="/privacy-policy" className="underline underline-offset-2 hover:no-underline">{c.privacy}</a>
              {(field === 'companyName' || field === 'phone') && status !== 'sending' && (
                <button type="button" onClick={e => submit(e as unknown as FormEvent<HTMLFormElement>, true)} className="font-medium underline underline-offset-2 hover:no-underline">
                  {c.skip}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
