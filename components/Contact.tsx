'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import { revealStyle, useInView } from './Reveal';

export function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [iso, setIso] = useState('PT');
  const country = COUNTRIES.find(c => c.iso === iso) ?? COUNTRIES[0];
  const [sectionRef, inView] = useInView<HTMLElement>('0px 0px -25% 0px');
  // Staggered reveal: each item waits 0.1s longer than the previous one.
  const reveal = (i: number) => revealStyle({ y: 30, duration: 0.8, delay: i * 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const number = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const phone = number ? `${country.dial} ${number}` : '';

    setFormState('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState('success');
      form.reset(); // Clear the form
      
      // Reset button state after 4 seconds
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error(error);
      setFormState('idle'); // Should probably add an error state later, but idle is fine for now
      alert(t('contact.error'));
    }
  };

  const field = 'w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-3 text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 outline-none transition-[border-color,box-shadow] focus:border-[#007AFF] focus:shadow-[0_0_0_4px_rgba(0,122,255,0.12)]';
  const label = 'mb-1.5 block text-[13px] font-medium text-black/65 dark:text-white/65';

  return (
    <section ref={sectionRef} id="contact" className={`py-16 md:py-24 relative z-10 bg-transparent ${inView ? 'in-view' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div style={reveal(0)} className="reveal grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] p-6 sm:p-10 md:p-14">

          {/* pitch */}
          <div>
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{t('contact.label')}</span>
            <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">
              {t('contact.title1')}<span className="text-black/40 dark:text-white/40">{t('contact.title2')}</span>
            </h2>
            <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60 text-pretty">
              {t('contact.desc')}
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {(['contact.p1', 'contact.p2', 'contact.p3'] as const).map(k => (
                <li key={k} className="flex items-center gap-2.5 text-[15px] font-medium text-[#1d1d1f] dark:text-white">
                  <Check className="h-4 w-4 shrink-0 text-[#007AFF]" strokeWidth={2.5} aria-hidden="true" />
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>

          {/* form card */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#0f1729] p-5 sm:p-7 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={label}>{t('contact.name')}</label>
                <input type="text" id="name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>{t('contact.email')}</label>
                <input type="email" id="email" name="email" required autoComplete="email" className={field} />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="phone" className={label}>{t('contact.phone')} <span className="text-black/40 dark:text-white/40">{t('contact.optional')}</span></label>
              <div className="flex rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] transition-[border-color,box-shadow] focus-within:border-[#007AFF] focus-within:shadow-[0_0_0_4px_rgba(0,122,255,0.12)]">
                {/* country code: native select (accessible, good on mobile) under a compact country + code label */}
                <div className="relative flex shrink-0 items-center border-r border-black/10 dark:border-white/10">
                  <span className="pointer-events-none flex items-center gap-1.5 pl-3.5 pr-2 text-[15px] text-[#1d1d1f] dark:text-white" aria-hidden="true">
                    <span className="rounded-md bg-black/[0.06] dark:bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-black/60 dark:text-white/70">{country.iso}</span>{country.dial}
                    <ChevronDown className="h-3.5 w-3.5 text-black/40 dark:text-white/40" />
                  </span>
                  <select
                    aria-label={t('contact.country')}
                    value={country.iso}
                    onChange={e => setIso(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.iso} value={c.iso}>{c.name} ({c.dial})</option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel-national"
                  inputMode="tel"
                  pattern="[0-9 ()\-]{6,20}"
                  title={t('contact.phoneHint')}
                  placeholder="912 345 678"
                  className="min-w-0 flex-1 rounded-r-xl bg-transparent px-4 py-3 text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className={label}>{t('contact.message')}</label>
              <textarea id="message" name="message" required rows={5} className={`${field} resize-none`} placeholder={t('contact.placeholder')} />
            </div>
            <button
              type="submit"
              disabled={formState !== 'idle'}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90 disabled:opacity-70"
            >
              {formState === 'idle' && <>{t('contact.submit')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
              {formState === 'loading' && <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>{t('contact.loading')}</>}
              {formState === 'success' && <><Check className="h-4 w-4 text-[#28c840]" aria-hidden="true" />{t('contact.success')}</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
