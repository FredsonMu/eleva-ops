'use client';
import { Eye, Hand, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// /about: how we work together, in four plain principles.
const COPY = {
  en: {
    label: 'How we work',
    title: 'Four principles behind every project.',
    items: [
      { icon: Eye, t: 'We start by listening', d: 'We map how you work today before proposing anything.' },
      { icon: Layers, t: 'The simplest thing that works', d: 'What solves the real problem, nothing more.' },
      { icon: Hand, t: 'Your team stays in control', d: 'People approve what matters. We switch over when you’re ready.' },
      { icon: Sparkles, t: 'Good design is good business', d: 'If it isn’t clear and fast, nobody will use it.' },
    ],
  },
  pt: {
    label: 'Como trabalhamos',
    title: 'Quatro princípios em cada projeto.',
    items: [
      { icon: Eye, t: 'Começamos por ouvir', d: 'Mapeamos como trabalha hoje antes de propor seja o que for.' },
      { icon: Layers, t: 'O mais simples que funciona', d: 'O que resolve o problema real, nada mais.' },
      { icon: Hand, t: 'A sua equipa mantém o controlo', d: 'As pessoas aprovam o que importa. Mudamos quando estiver pronto.' },
      { icon: Sparkles, t: 'Bom design é bom negócio', d: 'Se não for clara e rápida, ninguém a usa.' },
    ],
  },
} as const;

export function AboutPrinciples() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <Reveal y={28} className="mb-10 md:mb-14 text-center">
          <span className="text-[13px] font-semibold text-black/45 dark:text-white/45">{c.label}</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white text-balance">{c.title}</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {c.items.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} y={24} delay={i * 0.07} className="h-full">
              <div className="group h-full rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-white/[0.06] shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon className="loop pth-pop h-5 w-5 text-[#007AFF]" style={{ animationDelay: `${i * 0.4}s` }} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <p className="mt-6 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
