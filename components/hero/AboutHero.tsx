'use client';
import { useLanguage } from '@/lib/i18n';
import { HeroCopy } from './HeroKit';

// /about: the homepage hero, simplified. Centred on the page background, a two-tone title
// (the second half in grey, like the homepage's typed line), one line of context and actions.

const COPY = {
  pt: {
    label: 'Sobre nós',
    title: ['Uma equipa pequena.', 'Contacto direto.'],
    lead: 'Quem desenha e constrói o seu sistema é quem fala consigo, da primeira chamada ao lançamento.',
    secondary: 'Conhecer a equipa',
  },
  en: {
    label: 'About us',
    title: ['A small team.', 'Direct contact.'],
    lead: 'The people who design and build your system are the ones you talk to, from the first call to launch.',
    secondary: 'Meet the team',
  },
} as const;

export function AboutHero() {
  const { language } = useLanguage();
  const c = COPY[language === 'pt' ? 'pt' : 'en'];

  return (
    <section className="relative flex min-h-[70vh] items-center bg-transparent pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-6">
        <HeroCopy
          align="center"
          label={c.label}
          title={<>{c.title[0]}<br /><span className="text-black/45 dark:text-white/45">{c.title[1]}</span></>}
          lead={c.lead}
          secondary={{ href: '#equipa', label: c.secondary }}
          titleSize="text-[clamp(2.75rem,7vw,5.5rem)]"
        />
      </div>
    </section>
  );
}
