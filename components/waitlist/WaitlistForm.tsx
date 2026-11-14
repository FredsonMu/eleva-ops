'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { LIMITS } from '@/lib/guide';
import { ROLES, TEAM_SIZES } from '@/lib/waitlist-options';
import { captureTracking, getTracking } from '../guide/tracking';
import { LEAD_EVENT } from '../guide/GuideLeadForm';
import { Checkbox, control, Done, formCard, FormError, Honeypot, invalidProps, Optional, PhoneField, phoneError, PrivacyNote, Row, selectControl, SubmitButton } from './fields';

// LegalOps waitlist form. Two separate consents, neither pre-ticked: the waitlist (required) and
// the ElevaOps newsletter (optional). Posts to /api/waitlist.

type Field = 'name' | 'email' | 'phone' | 'waitlistConsent';
type Errors = Partial<Record<Field, string>>;

export function WaitlistForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [duplicate, setDuplicate] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const startedAt = useRef(0);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const ids = { name: useId(), email: useId(), phone: useId(), office: useId(), role: useId(), team: useId(), waitlistConsent: useId(), news: useId() };

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
    const phone = String(data.get('phone') ?? '').trim();
    const waitlistConsent = data.get('waitlistConsent') === 'on';

    const next: Errors = {};
    if (!name) next.name = 'Introduza o seu nome.';
    if (!email) next.email = 'Introduza o seu e-mail.';
    else if (!(form.elements.namedItem('email') as HTMLInputElement).validity.valid) next.email = 'Introduza um e-mail válido.';
    const badPhone = phoneError(phone);
    if (badPhone) next.phone = badPhone;
    if (!waitlistConsent) next.waitlistConsent = 'Para entrar na waitlist, marque esta caixa.';
    setErrors(next);
    setError('');
    const first = (['name', 'email', 'phone', 'waitlistConsent'] as Field[]).find(f => next[f]);
    if (first) {
      document.getElementById(ids[first])?.focus();
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
          phone,
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
      <Done id={id} headingRef={doneHeading} title={duplicate ? 'Este e-mail já está na lista. Obrigado!' : 'Está na lista. Obrigado!'}>
        {!duplicate && (
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-black/60 dark:text-white/60">
            Enviámos-lhe um e-mail de confirmação. Se não o encontrar, veja na pasta de spam ou promoções.
          </p>
        )}
      </Done>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className={formCard}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
        <Row id={ids.name} label="Nome *" error={errors.name}>
          <input id={ids.name} name="name" type="text" autoComplete="name" maxLength={LIMITS.firstName} className={control} {...invalidProps(ids.name, errors.name)} />
        </Row>
        <Row id={ids.email} label="E-mail profissional *" error={errors.email}>
          <input id={ids.email} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} maxLength={LIMITS.email} className={control} {...invalidProps(ids.email, errors.email)} />
        </Row>
        <PhoneField id={ids.phone} error={errors.phone} />
        <Row id={ids.office} label={<>Nome do escritório <Optional /></>}>
          <input id={ids.office} name="office" type="text" autoComplete="organization" maxLength={LIMITS.companyName} className={control} />
        </Row>
        <Row id={ids.role} label="Função">
          <select id={ids.role} name="role" defaultValue="" className={selectControl}>
            <option value="">Selecione</option>
            {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </Row>
        <Row id={ids.team} label="Tamanho da equipa">
          <select id={ids.team} name="teamSize" defaultValue="" className={selectControl}>
            <option value="">Selecione</option>
            {TEAM_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </Row>
      </div>

      <Honeypot />

      <div className="mt-6 grid gap-4">
        <Checkbox id={ids.waitlistConsent} name="waitlistConsent" error={errors.waitlistConsent}>
          Quero entrar na waitlist do LegalOps e receber novidades sobre o produto.&nbsp;*
        </Checkbox>
        <Checkbox id={ids.news} name="newsletter">
          Quero também receber a newsletter semanal da ElevaOps sobre automação e soluções digitais.
        </Checkbox>
      </div>

      <FormError message={error} />
      <SubmitButton sending={status === 'sending'}>Entrar na waitlist</SubmitButton>
      <PrivacyNote />
    </form>
  );
}
