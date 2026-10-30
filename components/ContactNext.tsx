'use client';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// /contact: the three steps after a message, with a progress line that fills in a loop.
const COPY = {
  en: {
    label: 'What happens next',
    steps: [
      { t: 'We reply within 24 hours', d: 'A real person reads your message and answers on business days.' },
      { t: 'A free diagnosis call', d: 'We look at how you work today and where a system would help most.' },
      { t: 'A proposal with a fixed price', d: 'Scope and price defined before anything starts.' },
    ],
  },
  pt: {
    label: 'O que acontece a seguir',
    steps: [
      { t: 'Respondemos em 24 horas', d: 'Uma pessoa lê a sua mensagem e responde, em dias úteis.' },
      { t: 'Uma chamada de diagnóstico gratuita', d: 'Vemos como trabalha hoje e onde um sistema ajudaria mais.' },
      { t: 'Uma proposta com preço fechado', d: 'Âmbito e preço definidos antes de começar.' },
    ],
  },
} as const;

export function ContactNext() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  return (
    <section className="pb-6 md:pb-10">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={24}>
          <span className="block text-center text-[13px] font-semibold text-black/45 dark:text-white/45">{c.label}</span>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.steps.map((s, i) => (
              <li key={s.t}>
                <span className="block h-[2px] w-full overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/10">
                  <span className="loop pth-meter block h-full w-full rounded-full bg-[#007AFF]" style={{ animationDelay: `${i * 0.6}s` }}></span>
                </span>
                <span className="mt-4 block text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">0{i + 1}</span>
                <p className="mt-1.5 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{s.t}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{s.d}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
