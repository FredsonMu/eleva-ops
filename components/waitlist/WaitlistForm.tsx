'use client';
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { LIMITS } from '@/lib/guide';
import { ROLES, TEAM_SIZES } from '@/lib/waitlist-options';
import { captureTracking, getTracking } from '../guide/tracking';
import { LEAD_EVENT } from '../guide/GuideLeadForm';

// LegalOps waitlist form. Two separate consents, neither pre-ticked: the waitlist (required) and
// the ElevaOps newsletter (optional). Posts to /api/waitlist.

type Field = 'name' | 'email' | 'waitlistConsent';
type Errors = Partial<Record<Field, string>>;

const control =
  'w-full rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/[0.04] px-4 text-[16px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/15 aria-[invalid=true]:border-red-500 [&>option]:text-[#1d1d1f]';
const labelClass = 'mb-2 block text-[14px] font-semibold text-[#1d1d1f] dark:text-white';
const optional = <span className="font-normal text-black/45 dark:text-white/45">(opcional)</span>;

function Row({ id, label, error, children }: { id: string; label: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {children}
      {error && <p id={id + '-e'} className="mt-1.5 text-[14px] font-medium text-red-700 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function WaitlistForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [duplicate, setDuplicate] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const startedAt = useRef(0);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const ids = { name: useId(), email: useId(), office: useId(), role: useId(), team: useId(), waitlist: useId(), news: useId() };

  useEffect(() => {
    startedAt.current = Date.now();
    captureTracking();
  }, []);
  useEffect(() => {
    if (status === 'done') doneHeading.current?.focus();
  }, [status]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== 'idle') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const waitlistConsent = data.get('waitlistConsent') === 'on';

    const next: Errors = {};
    if (!name) next.name = 'Introduza o seu nome.';
    if (!email) next.email = 'Introduza o seu e-mail.';
    else if (!(form.elements.namedItem('email') as HTMLInputElement).validity.valid) next.email = 'Introduza um e-mail válido.';
    if (!waitlistConsent) next.waitlistConsent = 'Para entrar na waitlist, marque esta caixa.';
    setErrors(next);
    setError('');
    const firstError = (['name', 'email', 'waitlistConsent'] as Field[]).find(f => next[f]);
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLInputElement).focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          office: String(data.get('office') ?? ''),
          role: String(data.get('role') ?? ''),
          teamSize: String(data.get('teamSize') ?? ''),
          waitlistConsent,
          newsletter: data.get('newsletter') === 'on',
          website: String(data.get('website') ?? ''), // honeypot
          startedAt: startedAt.current,
          tracking: getTracking(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        if (result?.field) setErrors({ [result.field]: result.error });
        setError(result?.error ?? 'Algo correu mal. Tente novamente.');
        setStatus('idle');
        return;
      }
      setDuplicate(result.duplicate === true);
      setStatus('done');
      if (!result.duplicate) window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId, guide: 'Waitlist LegalOps' } }));
    } catch {
      setError('Não foi possível contactar o servidor. Verifique a ligação e tente novamente.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div id={id} className="guide-pop scroll-mt-24 rounded-[28px] border border-black/[0.06] bg-white p-6 text-center shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-[#0f1729] sm:p-10" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#28c840] text-white">
          <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 ref={doneHeading} tabIndex={-1} className="mt-5 text-[26px] font-semibold tracking-tight text-[#1d1d1f] outline-none dark:text-white">
          {duplicate ? 'Este e-mail já está na lista. Obrigado!' : 'Está na lista. Obrigado!'}
        </h3>
        {!duplicate && (
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-black/60 dark:text-white/60">
            Enviámos-lhe um e-mail de confirmação. Se não o encontrar, veja na pasta de spam ou promoções.
          </p>
        )}
      </div>
    );
  }

  const invalid = (f: Field) => ({ 'aria-invalid': !!errors[f], 'aria-describedby': errors[f] ? ids[f === 'name' ? 'name' : f === 'email' ? 'email' : 'waitlist'] + '-e' : undefined });

  return (
    <form id={id} onSubmit={submit} noValidate className="scroll-mt-24 rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-[#0f1729] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Row id={ids.name} label="Nome *" error={errors.name}>
          <input id={ids.name} name="name" type="text" autoComplete="name" maxLength={LIMITS.firstName} className={control + ' h-12'} {...invalid('name')} />
        </Row>
        <Row id={ids.email} label="E-mail profissional *" error={errors.email}>
          <input id={ids.email} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} maxLength={LIMITS.email} className={control + ' h-12'} {...invalid('email')} />
        </Row>
        <div className="sm:col-span-2">
          <Row id={ids.office} label={<>Nome do escritório {optional}</>}>
            <input id={ids.office} name="office" type="text" autoComplete="organization" maxLength={LIMITS.companyName} className={control + ' h-12'} />
          </Row>
        </div>
        <Row id={ids.role} label="Função">
          <select id={ids.role} name="role" defaultValue="" className={control + ' h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E")] bg-[length:12px] bg-[position:right_16px_center] bg-no-repeat pr-10'}>
            <option value="">Selecione</option>
            {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </Row>
        <Row id={ids.team} label="Tamanho da equipa">
          <select id={ids.team} name="teamSize" defaultValue="" className={control + ' h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E")] bg-[length:12px] bg-[position:right_16px_center] bg-no-repeat pr-10'}>
            <option value="">Selecione</option>
            {TEAM_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </Row>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor={ids.waitlist} className="flex cursor-pointer items-start gap-3">
            <input id={ids.waitlist} name="waitlistConsent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#007AFF]" {...invalid('waitlistConsent')} />
            <span className="text-[15px] leading-relaxed text-black/70 dark:text-white/75">Quero entrar na waitlist do LegalOps e receber novidades sobre o produto.&nbsp;*</span>
          </label>
          {errors.waitlistConsent && <p id={ids.waitlist + '-e'} className="mt-1.5 pl-8 text-[14px] font-medium text-red-700 dark:text-red-400">{errors.waitlistConsent}</p>}
        </div>
        <label htmlFor={ids.news} className="flex cursor-pointer items-start gap-3">
          <input id={ids.news} name="newsletter" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#007AFF]" />
          <span className="text-[15px] leading-relaxed text-black/70 dark:text-white/75">Quero também receber a newsletter semanal da ElevaOps sobre automação e soluções digitais.</span>
        </label>
      </div>

      {error && <p role="alert" className="mt-5 rounded-2xl bg-red-500/[0.06] px-4 py-3 text-[14px] font-medium text-red-700 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-8 text-[16px] font-semibold text-white transition-[background-color,transform] hover:bg-black dark:bg-white dark:text-[#020617] dark:hover:bg-white/90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
      >
        {status === 'sending' ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />A enviar…</> : 'Entrar na waitlist'}
      </button>

      <p className="mt-4 text-[13px] leading-relaxed text-black/55 dark:text-white/55">
        Pode cancelar a qualquer momento. Os seus dados são tratados de acordo com a nossa{' '}
        <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-2 hover:no-underline">Política de Privacidade</Link>.
      </p>
    </form>
  );
}
