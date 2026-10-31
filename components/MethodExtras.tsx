'use client';
import { useLanguage } from '@/lib/i18n';
import { Reveal } from './Reveal';

// /method: what we ask of the client and how the price is set, side by side.
const COPY = {
  en: {
    needT: 'What we need from you',
    need: ['One person who knows the process and can decide', 'Access to the tools involved, with the permissions you choose', 'About an hour a week to test and give feedback'],
    priceT: 'How pricing works',
    price: ['The diagnosis is free and there’s no commitment', 'You get a fixed scope and price before anything starts', 'Ongoing support is optional, agreed separately'],
  },
  pt: {
    needT: 'O que precisamos de si',
    need: ['Uma pessoa que conheça o processo e possa decidir', 'Acesso às ferramentas envolvidas, com as permissões que escolher', 'Cerca de uma hora por semana para testar e dar feedback'],
    priceT: 'Como funciona o preço',
    price: ['O diagnóstico é gratuito e sem compromisso', 'Recebe um âmbito e um preço fechados antes de começarmos', 'O acompanhamento contínuo é opcional, acordado à parte'],
  },
} as const;

export function MethodExtras() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];
  const block = (title: string, items: readonly string[], i: number) => (
    <Reveal key={title} y={24} delay={i * 0.08} className="h-full">
      <div className="h-full rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] p-6 sm:p-10">
        <h2 className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] tracking-tight font-semibold text-[#1d1d1f] dark:text-white">{title}</h2>
        <ul className="mt-6 flex flex-col border-t border-black/[0.08] dark:border-white/10">
          {items.map(it => (
            <li key={it} className="border-b border-black/[0.08] dark:border-white/10 py-3 text-[15px] leading-relaxed text-black/70 dark:text-white/75">{it}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
  return (
    <section className="pb-6 md:pb-10">
      <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {block(c.needT, c.need, 0)}
        {block(c.priceT, c.price, 1)}
      </div>
    </section>
  );
}
