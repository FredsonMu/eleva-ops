'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { CATALOG, LIMITS } from '@/lib/guide';
import { captureTracking, getTracking } from '../guide/tracking';
import { LEAD_EVENT } from '../guide/GuideLeadForm';

// Two fields and one button: phones come from an Instagram link, so nothing more than that.
// Posts to /api/waitlist, which subscribes the person and sends the waitlist welcome email.

type Errors = Partial<Record<'firstName' | 'email', string>>;
const GUIDE = CATALOG['ai-lawyers'].editions.pt!;

const input =
  'h-14 w-full rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/[0.04] px-4 text-[16px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/15 aria-[invalid=true]:border-red-500';

export function WaitlistForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const [joined, setJoined] = useState({ name: '', email: '', welcomed: true });
  const startedAt = useRef(0);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const ids = { name: useId(), email: useId() };

  useEffect(() => {
    startedAt.current = Date.now();
    captureTracking();
  }, []);
  useEffect(() => {
    if (status === 'done') doneHeading.current?.focus();
  }, [status]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get('firstName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const next: Errors = {};
    if (!firstName) next.firstName = 'Introduza o seu primeiro nome.';
    if (!email) next.email = 'Introduza o seu email.';
    else if (!(form.elements.namedItem('email') as HTMLInputElement).validity.valid) next.email = 'Introduza um email válido.';
    setErrors(next);
    setError('');
    if (next.firstName || next.email) {
      (form.elements.namedItem(next.firstName ? 'firstName' : 'email') as HTMLInputElement).focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, website: String(data.get('website') ?? ''), startedAt: startedAt.current, tracking: getTracking() }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        if (result?.field) setErrors({ [result.field]: result.error });
        setError(result?.error ?? 'Algo correu mal. Tente novamente.');
        setStatus('idle');
        return;
      }
      setJoined({ name: firstName.split(' ')[0], email, welcomed: result.welcomed === true });
      setStatus('done');
      window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId, guide: 'LegalOps waitlist' } }));
    } catch {
      setError('Não foi possível contactar o servidor. Verifique a ligação e tente novamente.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div id={id} className="guide-pop scroll-mt-28" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#28c840] text-white shadow-[0_10px_28px_-8px_rgba(40,200,64,0.6)]">
          <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
        </span>
        <h2 ref={doneHeading} tabIndex={-1} className="mt-5 text-[28px] font-semibold leading-tight tracking-tight text-[#1d1d1f] outline-none dark:text-white">
          Está na lista, {joined.name}.
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-black/60 dark:text-white/60">
          {joined.welcomed
            ? <>Enviámos a confirmação para <span className="break-all font-semibold text-[#1d1d1f] dark:text-white">{joined.email}</span>. Se não a vir num minuto, veja o spam ou as promoções.</>
            : <>O seu lugar está guardado. A confirmação por email pode demorar um pouco a chegar.</>}
        </p>
        <Link
          href={GUIDE.path}
          className="group mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-5 text-[15px] dark:border-white/15"
        >
          <span>
            <span className="block text-[13px] text-black/50 dark:text-white/50">Enquanto espera</span>
            <span className="font-semibold text-[#1d1d1f] dark:text-white">Guia gratuito: IA para advogados</span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="scroll-mt-28">
      <div className="grid gap-3">
        <div>
          <label htmlFor={ids.name} className="sr-only">Primeiro nome</label>
          <input
            id={ids.name}
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={LIMITS.firstName}
            placeholder="Primeiro nome"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? ids.name + '-e' : undefined}
            className={input}
          />
          {errors.firstName && <p id={ids.name + '-e'} className="mt-1.5 px-1 text-sm font-medium text-red-700 dark:text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor={ids.email} className="sr-only">Email</label>
          <input
            id={ids.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={LIMITS.email}
            placeholder="Email profissional"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? ids.email + '-e' : undefined}
            className={input}
          />
          {errors.email && <p id={ids.email + '-e'} className="mt-1.5 px-1 text-sm font-medium text-red-700 dark:text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <p role="alert" className="mt-3 rounded-2xl bg-red-500/[0.06] px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-7 text-[16px] font-semibold text-white transition-[background-color,transform] active:scale-[0.98] hover:bg-black disabled:cursor-wait disabled:opacity-80 dark:bg-white dark:text-[#020617] dark:hover:bg-white/90"
      >
        {status === 'sending'
          ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />A guardar o seu lugar…</>
          : <>Entrar na lista de espera<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></>}
      </button>

      <p className="mt-4 text-[12px] leading-relaxed text-black/50 dark:text-white/50">
        Ao entrar na lista, recebe por email as novidades do LegalOps e conteúdos da ElevaOps sobre IA e automação. Pode sair a qualquer momento.{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:no-underline">Política de Privacidade</Link>.
      </p>
    </form>
  );
}
