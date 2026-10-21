'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Download, Loader2 } from 'lucide-react';
import { GUIDES, LIMITS, otherLang } from '@/lib/guide';
import { useLanguage } from '@/lib/i18n';
import { captureTracking, getTracking } from './tracking';
import { Brand } from '../Brand';
import { PhoneInput } from '../PhoneInput';

type Status = 'idle' | 'submitting' | 'success';
type FieldErrors = Partial<Record<'firstName' | 'email', string>>;

export const LEAD_EVENT = 'eleva:guide-lead';

const COPY = {
  en: {
    noName: 'Please enter your first name.', noEmail: 'Please enter your email.', badEmail: 'Please enter a valid email address.',
    generic: 'Something went wrong. Please try again.', offline: 'We couldn’t reach the server. Check your connection and try again.',
    ready: 'Your guide is ready.', thanks: 'Thank you. Download your copy below.', thanksInbox: 'Thank you. Download it below — we’ve also sent a copy to your inbox.',
    download: 'Download the Guide', other: 'Also available in Portuguese',
    helpTitle: 'Want help choosing your first agent?', helpBody: 'Tell us one task your team repeats every week. The diagnosis is free and there’s no commitment.', book: 'Book a free diagnosis',
    company: 'Company name', optional: '(optional)', companyPh: 'Your company', name: 'First name', namePh: 'Your first name', email: 'Email', emailPh: 'you@example.com',
    phone: 'Phone', country: 'Country code',
    consent: ['Optional: also send me occasional emails from ', ' about automation and AI. You can opt out at any time.'],
    sending: 'Sending…', submit: 'Get Instant Access', privacyA: 'We use your details to give you access to the guide. Read our', privacy: 'Privacy Policy',
  },
  pt: {
    noName: 'Introduza o seu primeiro nome.', noEmail: 'Introduza o seu email.', badEmail: 'Introduza um email válido.',
    generic: 'Algo correu mal. Tente novamente.', offline: 'Não foi possível contactar o servidor. Verifique a ligação e tente novamente.',
    ready: 'O seu guia está pronto.', thanks: 'Obrigado. Descarregue o seu exemplar abaixo.', thanksInbox: 'Obrigado. Descarregue-o abaixo — também enviámos uma cópia para o seu email.',
    download: 'Descarregar o guia', other: 'Também disponível em inglês',
    helpTitle: 'Quer ajuda a escolher o primeiro agente?', helpBody: 'Diga-nos uma tarefa que a sua equipa repete todas as semanas. O diagnóstico é gratuito e sem compromisso.', book: 'Agendar diagnóstico gratuito',
    company: 'Nome da empresa', optional: '(opcional)', companyPh: 'A sua empresa', name: 'Primeiro nome', namePh: 'O seu primeiro nome', email: 'Email', emailPh: 'nome@empresa.pt',
    phone: 'Telefone', country: 'Indicativo do país',
    consent: ['Opcional: enviem-me também emails ocasionais da ', ' sobre automação e IA. Pode cancelar a qualquer momento.'],
    sending: 'A enviar…', submit: 'Receber acesso imediato', privacyA: 'Usamos os seus dados para lhe dar acesso ao guia. Leia a nossa', privacy: 'Política de Privacidade',
  },
} as const;

export function GuideLeadForm() {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt' : 'en';
  const c = COPY[lang];
  const guide = GUIDES[lang];
  const other = GUIDES[otherLang(lang)];
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [download, setDownload] = useState<string>(guide.pdf);
  const [emailed, setEmailed] = useState(false);
  const startedAt = useRef(0);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const ids = { name: useId(), email: useId(), company: useId(), phone: useId(), consent: useId(), error: useId() };

  useEffect(() => {
    startedAt.current = Date.now();
    captureTracking();
  }, []);

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get('firstName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    const errors: FieldErrors = {};
    if (!firstName) errors.firstName = c.noName;
    if (!email) errors.email = c.noEmail;
    else if (!(form.elements.namedItem('email') as HTMLInputElement).validity.valid) errors.email = c.badEmail;
    setFieldErrors(errors);
    setError('');
    if (Object.keys(errors).length) {
      (form.elements.namedItem(errors.firstName ? 'firstName' : 'email') as HTMLInputElement).focus();
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          marketingConsent: data.get('marketingConsent') === 'on',
          language: lang,
          companyName: String(data.get('companyName') ?? '').trim(),
          phone: String(data.get('phone') ?? ''),
          website: String(data.get('website') ?? ''), // honeypot
          startedAt: startedAt.current,
          tracking: getTracking(),
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.field) setFieldErrors({ [result.field]: result.error });
        setError(result?.error ?? c.generic);
        setStatus('idle');
        return;
      }

      setDownload(result.download ?? guide.pdf);
      setEmailed(result.emailed === true);
      setStatus('success');
      // Single, post-validation signal for analytics (e.g. a future Meta Pixel "Lead" event,
      // using leadId as the event id to deduplicate with the Conversions API).
      window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId } }));
    } catch {
      setError(c.offline);
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="guide-pop flex flex-col items-center text-center py-6 md:py-10" role="status">
        <div className="relative mb-7">
          <span className="absolute inset-0 rounded-full bg-[#007AFF]/20 animate-ping [animation-iteration-count:2]" aria-hidden="true"></span>
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-[0_12px_32px_-8px_rgba(0,122,255,0.6)]">
            <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
        <h3 ref={successHeading} tabIndex={-1} className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white outline-none">
          {c.ready}
        </h3>
        <p className="mt-3 text-base md:text-lg text-black/60 dark:text-white/60 font-medium">
          {emailed ? c.thanksInbox : c.thanks}
        </p>
        <a
          href={download}
          download={guide.pdfFileName}
          className="mt-8 inline-flex min-h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#007AFF] px-5 sm:px-8 text-[13px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] whitespace-nowrap text-white shadow-[0_14px_34px_-10px_rgba(0,122,255,0.65)] transition-[background-color,transform] duration-200 hover:bg-[#0066dd] active:scale-[0.98]"
        >
          <Download className="h-5 w-5" aria-hidden="true" />
          {c.download}
        </a>
        <p className="mt-4 text-xs font-medium text-black/55 dark:text-white/55">{guide.pdfInfo}</p>
        <a href={other.pdf} download={other.pdfFileName} className="mt-2 text-xs font-semibold text-brand underline underline-offset-2 hover:no-underline">
          {c.other}
        </a>

        {/* next step */}
        <div className="mt-10 w-full border-t border-black/[0.08] dark:border-white/10 pt-8">
          <p className="font-sans text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{c.helpTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-black/60 dark:text-white/60">{c.helpBody}</p>
          <Link
            href="/#contact"
            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[14px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
          >
            {c.book}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    'peer w-full h-14 rounded-2xl border bg-white/90 dark:bg-white/[0.04] px-4 text-base text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15';

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={error ? ids.error : undefined} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor={ids.company} className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
          {c.company} <span className="font-normal text-black/45 dark:text-white/45">{c.optional}</span>
        </label>
        <input
          id={ids.company}
          name="companyName"
          type="text"
          autoComplete="organization"
          maxLength={LIMITS.companyName}
          placeholder={c.companyPh}
          className={`${inputClass} border-black/10 dark:border-white/15`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={ids.name} className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
          {c.name}
        </label>
        <input
          id={ids.name}
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          maxLength={LIMITS.firstName}
          placeholder={c.namePh}
          aria-invalid={!!fieldErrors.firstName}
          aria-describedby={fieldErrors.firstName ? `${ids.name}-error` : undefined}
          className={`${inputClass} border-black/10 dark:border-white/15`}
        />
        {fieldErrors.firstName && (
          <p id={`${ids.name}-error`} className="text-sm font-medium text-red-700 dark:text-red-400">{fieldErrors.firstName}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={ids.email} className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
          {c.email}
        </label>
        <input
          id={ids.email}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={LIMITS.email}
          placeholder={c.emailPh}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? `${ids.email}-error` : undefined}
          className={`${inputClass} border-black/10 dark:border-white/15`}
        />
        {fieldErrors.email && (
          <p id={`${ids.email}-error`} className="text-sm font-medium text-red-700 dark:text-red-400">{fieldErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={ids.phone} className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
          {c.phone} <span className="font-normal text-black/45 dark:text-white/45">{c.optional}</span>
        </label>
        <PhoneInput
          id={ids.phone}
          countryLabel={c.country}
          className="h-14 rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/[0.04] transition-[border-color,box-shadow] duration-200 focus-within:border-[#007AFF] focus-within:ring-4 focus-within:ring-[#007AFF]/15"
          inputClassName="px-4 text-base text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
        />
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${ids.name}-website`}>Website</label>
        <input id={`${ids.name}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor={ids.consent} className="flex items-start gap-3 cursor-pointer rounded-2xl p-1 -m-1">
        <input
          id={ids.consent}
          name="marketingConsent"
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#007AFF]"
        />
        <span className="text-sm leading-relaxed text-black/60 dark:text-white/60">
          {c.consent[0]}<Brand>Eleva Ops</Brand>{c.consent[1]}
        </span>
      </label>

      {error && (
        <p id={ids.error} role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group mt-1 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#007AFF] px-5 sm:px-8 text-[13px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] whitespace-nowrap text-white shadow-[0_14px_34px_-10px_rgba(0,122,255,0.65)] transition-[background-color,transform,opacity] duration-200 hover:bg-[#0066dd] active:scale-[0.98] disabled:opacity-80 disabled:cursor-wait"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            {c.sending}
          </>
        ) : (
          <>
            {c.submit}
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-black/55 dark:text-white/55 text-center">
        {c.privacyA}{' '}
        <Link href="/privacy-policy" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
          {c.privacy}
        </Link>
        .
      </p>
    </form>
  );
}
