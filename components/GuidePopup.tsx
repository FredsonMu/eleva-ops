'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scale, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { CONSENT_EVENT, getConsent } from '@/lib/consent';

// Small corner card on the homepage, Portuguese only: invites law firms to the LegalOps waitlist
// (/legalops, where the form is). It slides in after 45% scroll or 40s and stays away for 14 days
// once closed (for good once someone follows it).

const KEY = 'eleva-guide-popup';
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const DELAY_MS = 40_000;
const SCROLL_RATIO = 0.45;

function readState(): { closedAt?: number; joined?: boolean } {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
}
function writeState(state: { closedAt?: number; joined?: boolean }) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked: it may show again later */ }
}

export function GuidePopup() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const state = readState();
    if (state.joined || (state.closedAt && Date.now() - state.closedAt < SNOOZE_MS)) return;
    let done = false;
    const show = () => {
      if (done) return;
      if (getConsent() === null) { window.addEventListener(CONSENT_EVENT, show, { once: true }); return; }
      done = true;
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

  if (!open || language !== 'pt') return null;

  const close = (joined = false) => {
    setOpen(false);
    writeState(joined ? { joined: true } : { closedAt: Date.now() });
  };

  return (
    <aside aria-label="Waitlist do LegalOps" className="guide-card-in fixed inset-x-3 bottom-3 z-[80] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[360px]">
      <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] p-4 shadow-[0_24px_60px_-20px_rgba(0,30,90,0.35)]">
        <button
          type="button"
          onClick={() => close()}
          aria-label="Fechar"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-black/45 dark:text-white/50 transition-colors hover:bg-black/[0.05] dark:hover:bg-white/10"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#007AFF] text-white">
            <Scale className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]"></span>LegalOps · Em breve
            </span>
            <p className="mt-1 text-[14px] font-semibold leading-snug text-[#1d1d1f] dark:text-white">Saiba o que cada pessoa da sua equipa está a fazer.</p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-black/60 dark:text-white/60">Uma plataforma de gestão para escritórios de advogados: processos, tarefas, prazos e documentos num só sítio.</p>
        <Link
          href="/legalops"
          onClick={() => close(true)}
          className="mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#007AFF] text-[13px] font-semibold text-white transition-colors hover:bg-[#0066dd]"
        >
          Entrar na waitlist<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
