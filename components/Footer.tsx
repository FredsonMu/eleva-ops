'use client';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { BrandText } from './Brand';
import { LogoMark } from './LogoMark';
import { Reveal } from './Reveal';

export function Footer() {
  const { t } = useLanguage();
  const links = [
    { href: '/#servicos', label: t('nav.expertise') },
    { href: '/#metodo', label: t('nav.method') },
    { href: '/#equipa', label: t('nav.team') },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="relative bg-transparent pt-10 pb-10 md:pt-16">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        {/* closing call to action */}
        <Reveal y={30} duration={0.8} className="relative overflow-hidden rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] px-6 py-16 text-center md:py-24">
          <div className="relative">
            <span className="text-[13px] font-semibold text-black/45 dark:text-white/50">{t('footer.label')}</span>
            <h2 className="mt-3 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] tracking-tight font-semibold text-[#1d1d1f] dark:text-white">
              {t('footer.title1')} <span className="text-[#007AFF]">{t('footer.title2')}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60 text-pretty">{t('footer.desc')}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/#contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90">
                {t('footer.contact')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a href="mailto:contact@elevaops.com" className="inline-flex min-h-12 items-center rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/[0.06] px-6 text-[15px] font-medium text-[#1d1d1f] dark:text-white transition-colors hover:bg-white dark:hover:bg-white/10">
                contact@elevaops.com
              </a>
            </div>
          </div>
        </Reveal>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <span translate="no" className="notranslate flex items-center gap-2.5 font-sans text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-white">
            <LogoMark className="h-6 w-auto" />Eleva<span className="-ml-2.5 text-black/50 dark:text-white/55">Ops</span>
          </span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-black/60 dark:text-white/60">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-[#1d1d1f] dark:hover:text-white">{l.label}</Link>
            ))}
            <a href="https://www.instagram.com/elevaops/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[#1d1d1f] dark:hover:text-white">
              <Instagram className="h-4 w-4" aria-hidden="true" />Instagram
            </a>
          </nav>
        </div>
        <p className="mt-6 text-[13px] text-black/45 dark:text-white/45"><BrandText text={t('footer.rights')} /></p>
      </div>
    </footer>
  );
}
