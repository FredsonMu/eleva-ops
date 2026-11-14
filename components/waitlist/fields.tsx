'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';
import { PhoneInput } from '../PhoneInput';

// Pieces shared by the LegalOps waitlist form and the "Gestão Jurídica Digital" manual form,
// so both look and behave the same (site colours, dark mode, errors under each field).

export const formCard =
  'scroll-mt-24 rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-[#0f1729] sm:p-8';

export const control =
  'h-12 w-full rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-white/[0.04] px-4 text-[16px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/15 aria-[invalid=true]:border-red-500 [&>option]:text-[#1d1d1f]';

export const selectControl = control + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%238a8f98%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E")] bg-[length:12px] bg-[position:right_16px_center] bg-no-repeat pr-10';

export const Optional = () => <span className="font-normal text-black/45 dark:text-white/45">(opcional)</span>;

/** aria props for a field with an error shown under it (id + '-e'). */
export const invalidProps = (id: string, error?: string) => ({ 'aria-invalid': !!error, 'aria-describedby': error ? id + '-e' : undefined });

export function Row({ id, label, error, children }: { id: string; label: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold text-[#1d1d1f] dark:text-white">{label}</label>
      {children}
      {error && <p id={id + '-e'} className="mt-1.5 text-[14px] font-medium text-red-700 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function PhoneField({ id, error }: { id: string; error?: string }) {
  return (
    <Row id={id} label="Telemóvel *" error={error}>
      <PhoneInput
        id={id}
        countryLabel="Indicativo do país"
        className={`h-12 rounded-2xl border bg-white/90 transition-[border-color,box-shadow] duration-200 focus-within:border-[#007AFF] focus-within:ring-4 focus-within:ring-[#007AFF]/15 dark:bg-white/[0.04] ${error ? 'border-red-500' : 'border-black/10 dark:border-white/15'}`}
        inputClassName="px-4 text-[16px] text-[#1d1d1f] placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40"
      />
    </Row>
  );
}

export function Checkbox({ id, name, children, error }: { id: string; name: string; children: ReactNode; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input id={id} name={name} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#007AFF]" {...invalidProps(id, error)} />
        <span className="text-[15px] leading-relaxed text-black/70 dark:text-white/75">{children}</span>
      </label>
      {error && <p id={id + '-e'} className="mt-1.5 pl-8 text-[14px] font-medium text-red-700 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <input name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return message ? <p role="alert" className="mt-5 rounded-2xl bg-red-500/[0.06] px-4 py-3 text-[14px] font-medium text-red-700 dark:text-red-400">{message}</p> : null;
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-8 text-[16px] font-semibold text-white transition-[background-color,transform] hover:bg-black active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 dark:bg-white dark:text-[#020617] dark:hover:bg-white/90"
    >
      {sending ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />A enviar…</> : children}
    </button>
  );
}

export function PrivacyNote() {
  return (
    <p className="mt-4 text-[13px] leading-relaxed text-black/55 dark:text-white/55">
      Pode cancelar a qualquer momento. Os seus dados são tratados de acordo com a nossa{' '}
      <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-2 hover:no-underline">Política de Privacidade</Link>.
    </p>
  );
}

export function Done({ id, title, children, headingRef }: { id?: string; title: string; children?: ReactNode; headingRef: React.Ref<HTMLHeadingElement> }) {
  return (
    <div id={id} className={formCard + ' guide-pop text-center sm:p-10'} role="status">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#28c840] text-white">
        <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-[26px] font-semibold tracking-tight text-[#1d1d1f] outline-none dark:text-white">{title}</h3>
      {children}
    </div>
  );
}

/** Basic client check of the phone the PhoneInput puts in its hidden field ("+351 912 345 678"). */
export function phoneError(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!phone) return 'Introduza o seu número de telemóvel.';
  return digits.length < 8 || digits.length > 20 ? 'Introduza um número válido.' : '';
}
