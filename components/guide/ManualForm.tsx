'use client';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Download } from 'lucide-react';
import { CATALOG, LIMITS } from '@/lib/guide';
import { captureTracking, getTracking } from './tracking';
import { LEAD_EVENT } from './GuideLeadForm';
import { Checkbox, control, Done, formCard, FormError, Honeypot, invalidProps, Optional, PhoneField, phoneError, PrivacyNote, Row, SubmitButton } from '../waitlist/fields';

// Form of the "Gestão Jurídica Digital" manual: name, email and phone (required), office
// (optional), and two optional boxes, neither pre-ticked: the ElevaOps newsletter and the LegalOps
// waitlist. Posts to /api/guide-lead, which emails the PDF.

const GUIDE = CATALOG['gestao-juridica'].editions.pt!;
type Field = 'firstName' | 'email' | 'phone';
type Errors = Partial<Record<Field, string>>;

export function ManualForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const [sent, setSent] = useState({ email: '', emailed: true, download: GUIDE.pdf });
  const startedAt = useRef(0);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const ids = { firstName: useId(), email: useId(), phone: useId(), office: useId(), news: useId(), waitlist: useId() };

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
    const firstName = String(data.get('firstName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();

    const next: Errors = {};
    if (!firstName) next.firstName = 'Introduza o seu nome.';
    if (!email) next.email = 'Introduza o seu e-mail.';
    else if (!(form.elements.namedItem('email') as HTMLInputElement).validity.valid) next.email = 'Introduza um e-mail válido.';
    const badPhone = phoneError(phone);
    if (badPhone) next.phone = badPhone;
    setErrors(next);
    setError('');
    const first = (['firstName', 'email', 'phone'] as Field[]).find(f => next[f]);
    if (first) {
      document.getElementById(ids[first])?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          companyName: String(data.get('office') ?? '').trim(),
          marketingConsent: data.get('newsletter') === 'on',
          waitlist: data.get('waitlist') === 'on',
          language: 'pt',
          guideId: 'gestao-juridica',
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
      setSent({ email, emailed: result.emailed === true, download: result.download ?? GUIDE.pdf });
      setStatus('done');
      window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { leadId: result.leadId, guide: result.guide } }));
    } catch {
      setError('Não foi possível contactar o servidor. Verifique a ligação e tente novamente.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <Done id={id} headingRef={doneHeading} title={sent.emailed ? 'Verifique o seu e-mail.' : 'O seu manual está pronto.'}>
        {sent.emailed ? (
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-black/60 dark:text-white/60">
            Enviámos o manual para <span className="break-all font-semibold text-[#1d1d1f] dark:text-white">{sent.email}</span>. Se não o encontrar, veja na pasta de spam ou promoções.
          </p>
        ) : (
          <>
            <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-black/60 dark:text-white/60">Não conseguimos enviá-lo por e-mail agora. Pode descarregá-lo aqui.</p>
            <a href={sent.download} download={GUIDE.pdfFileName} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 text-[15px] font-semibold text-white dark:bg-white dark:text-[#020617]">
              <Download className="h-4 w-4" aria-hidden="true" />Descarregar o manual
            </a>
          </>
        )}
      </Done>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className={formCard}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
        <Row id={ids.firstName} label="Nome *" error={errors.firstName}>
          <input id={ids.firstName} name="firstName" type="text" autoComplete="given-name" maxLength={LIMITS.firstName} className={control} {...invalidProps(ids.firstName, errors.firstName)} />
        </Row>
        <Row id={ids.email} label="E-mail *" error={errors.email}>
          <input id={ids.email} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} maxLength={LIMITS.email} className={control} {...invalidProps(ids.email, errors.email)} />
        </Row>
        <PhoneField id={ids.phone} error={errors.phone} />
        <Row id={ids.office} label={<>Nome do escritório <Optional /></>}>
          <input id={ids.office} name="office" type="text" autoComplete="organization" maxLength={LIMITS.companyName} className={control} />
        </Row>
      </div>

      <Honeypot />

      <div className="mt-6 grid gap-4">
        <Checkbox id={ids.news} name="newsletter">
          Quero também receber a newsletter semanal da ElevaOps sobre automação e soluções digitais.
        </Checkbox>
        <Checkbox id={ids.waitlist} name="waitlist">
          Quero entrar na waitlist do LegalOps, a plataforma de gestão para escritórios de advogados que estamos a criar.
        </Checkbox>
      </div>

      <FormError message={error} />
      <SubmitButton sending={status === 'sending'}>Receber o manual</SubmitButton>
      <PrivacyNote />
    </form>
  );
}
