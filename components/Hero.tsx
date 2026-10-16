'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, Clock, FileCheck2, Search } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '@/lib/i18n';
import { ExcelIcon, GmailIcon, PaperIcon, SheetsIcon, WhatsAppIcon } from './BrandIcons';

// Hero: the brand line with the typed word, then a prompt box (in the spirit of fynk / Notion AI)
// where visitors describe the task that eats their week, with quick suggestions.
// Sending the prompt drops it into the contact form below — a real first step, nothing faked.

const TYPE_MS = 38;

export function Hero() {
  const { t, language } = useLanguage();
  const examples = t('hero.examples').split('|');
  const chips = t('hero.chips').split('|');

  const [value, setValue] = useState('');
  const [typed, setTyped] = useState('');
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // typed placeholder: writes an example, holds it, then moves to the next one
  useEffect(() => {
    if (reduced || focused || value) return;
    let ex = 0, i = 0, hold = 0;
    const tick = () => {
      const text = examples[ex];
      if (i < text.length) { i += 1; setTyped(text.slice(0, i)); return; }
      if (++hold > 60) { ex = (ex + 1) % examples.length; i = 0; hold = 0; setTyped(''); }
    };
    const id = window.setInterval(tick, TYPE_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, focused, value, language]);

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const text = value.trim();
    const box = document.getElementById('message') as HTMLTextAreaElement | null;
    if (box && text) box.value = text;
    document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(() => (document.getElementById(text ? 'name' : 'message') as HTMLElement | null)?.focus({ preventScroll: true }), reduced ? 0 : 700);
  };

  const trust = [
    { Icon: Search, text: t('hero.trust1') },
    { Icon: FileCheck2, text: t('hero.trust2') },
    { Icon: Clock, text: t('hero.trust3') },
  ];

  return (
    <section className="relative bg-transparent pt-32 pb-20 md:pt-40 md:pb-28 min-h-[90vh] flex items-center">

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center md:px-6">
        <h1 translate="no" className="notranslate hero-rise font-sans font-semibold text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] tracking-tighter text-[#1d1d1f] dark:text-white flex flex-col items-center">
          <span className="flex items-center justify-center gap-2 md:gap-4">
            Eleva<span className="text-brand">.</span>
          </span>
          <span className="text-black/45 dark:text-white/45 mt-2 h-[1.2em]">
            <TypeAnimation
              key={language}
              sequence={[
                t('hero.typing1'), 3000,
                t('hero.typing2'), 3000,
                t('hero.typing3'), 3000,
                t('hero.typing4'), 3000,
                t('hero.typing5'), 3000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="inline-block"
            />
          </span>
        </h1>

        <p className="hero-rise mt-8 md:mt-12 max-w-2xl text-lg md:text-[1.35rem] leading-[1.6] tracking-tight font-medium text-[#1d1d1f]/70 dark:text-white/70 text-balance" style={{ animationDelay: '160ms' }}>
          {t('hero.desc1')}<span className="text-brand font-semibold">{t('hero.desc2')}</span>
        </p>

        <ul className="hero-rise mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-black/55 dark:text-white/60" style={{ animationDelay: '220ms' }}>
          {trust.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#007AFF]" strokeWidth={2} aria-hidden="true" />{text}
            </li>
          ))}
        </ul>

        {/* prompt */}
        <form onSubmit={send} className="hero-rise mt-10 md:mt-12 w-full max-w-3xl" style={{ animationDelay: '300ms' }}>
          <div className="rounded-[28px] border border-black/[0.06] dark:border-white/10 bg-white/90 dark:bg-[#0f1729]/90 p-3 text-left shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-shadow focus-within:shadow-[0_24px_60px_-24px_rgba(0,90,220,0.35)]">
            <label htmlFor="hero-prompt" className="sr-only">{t('hero.promptLabel')}</label>
            <textarea
              id="hero-prompt"
              ref={inputRef}
              rows={2}
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) send(e); }}
              placeholder={reduced || focused ? examples[0] : typed}
              className="block w-full resize-none bg-transparent px-3 pt-2 text-[16px] md:text-[17px] leading-relaxed text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none"
            />
            <div className="mt-2 flex items-center justify-between gap-3 px-1">
              <span className="flex items-center gap-1.5 pl-2" aria-hidden="true">
                {[WhatsAppIcon, GmailIcon, SheetsIcon, ExcelIcon, PaperIcon].map((Icon, i) => (
                  <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.06]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                ))}
              </span>
              <button
                type="submit"
                aria-label={t('hero.send')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-[0_8px_20px_-8px_rgba(0,122,255,0.8)] transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowUp className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">{t('hero.orTry')}</span>
            {chips.map(chip => (
              <button
                key={chip}
                type="button"
                onClick={() => { setValue(chip); inputRef.current?.focus(); }}
                className="rounded-full bg-black/[0.05] dark:bg-white/[0.07] px-4 py-2 text-[14px] text-black/70 dark:text-white/75 transition-colors hover:bg-black/[0.09] dark:hover:bg-white/[0.12]"
              >
                {chip}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
