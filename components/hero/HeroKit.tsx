'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

// Building blocks for the inner page heroes. They share the homepage's language (page
// background, type scale, `.hero-rise` entrance, soft panels, dark pill buttons), while each
// page arranges them in its own layout: split, editorial, mirrored or inside a panel.

type CtaLink = { href: string; label: string };

const rise = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function HeroSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className="relative bg-transparent pt-28 pb-16 md:pt-36 md:pb-24">
      <div className={`relative z-10 mx-auto w-full max-w-6xl px-5 md:px-6 ${className}`}>{children}</div>
    </section>
  );
}

export const heroTitle = 'font-sans font-semibold leading-[1.05] tracking-tighter text-[#1d1d1f] dark:text-white text-balance';
export const heroLead = 'text-lg md:text-xl leading-[1.6] tracking-tight text-black/60 dark:text-white/65 text-pretty';

// Label, title, lead and the call-to-action pair, left-aligned (the default) or centred.
export function HeroCopy({ label, title, lead, primary, secondary, align = 'left', titleSize = 'text-[clamp(2.2rem,4.4vw,3.6rem)]' }: {
  label: string;
  title: ReactNode;
  lead: string;
  primary?: CtaLink;
  secondary?: CtaLink;
  align?: 'left' | 'center';
  titleSize?: string;
}) {
  const center = align === 'center';
  return (
    <div className={center ? 'flex flex-col items-center text-center' : ''}>
      <span className="hero-rise block text-[13px] font-semibold text-black/45 dark:text-white/45">{label}</span>
      <h1 className={`hero-rise mt-4 ${titleSize} ${heroTitle}`} style={rise(80)}>{title}</h1>
      <p className={`hero-rise mt-6 max-w-xl ${heroLead}`} style={rise(160)}>{lead}</p>
      <div className="hero-rise mt-8" style={rise(240)}>
        <HeroCtas primary={primary} secondary={secondary} align={align} />
      </div>
    </div>
  );
}

const TEAM = ['eduardo', 'fredson', 'miguel'];

export function Avatars({ size = 26, ring = 'ring-[#1d1d1f] dark:ring-white' }: { size?: number; ring?: string }) {
  return (
    <span className="flex -space-x-2" aria-hidden="true">
      {TEAM.map(n => (
        <Image key={n} src={`/team/${n}.webp`} alt="" width={size} height={size} className={`rounded-full object-cover object-top bg-[#bfe3fb] ring-2 ${ring}`} style={{ width: size, height: size }} />
      ))}
    </span>
  );
}

// Primary: the free diagnosis, with the faces of the people who answer (or a page-specific
// primary, e.g. the guide). Secondary: a page-specific link.
export function HeroCtas({ primary, secondary, align = 'left' }: { primary?: CtaLink; secondary?: CtaLink; align?: 'left' | 'center' }) {
  const { t, language } = useLanguage();
  const note = primary
    ? (language === 'pt' ? 'PDF gratuito · Enviado para o seu email · Sem newsletter' : 'Free PDF · Sent to your inbox · No newsletter')
    : (language === 'pt' ? 'Resposta em 24h · Preço fechado · Sem compromisso' : 'Reply within 24h · Fixed price · No commitment');
  const center = align === 'center';
  return (
    <div className={`flex flex-col gap-4 ${center ? 'items-center' : 'items-start'}`}>
      <div className={`flex flex-wrap items-center gap-3 ${center ? 'justify-center' : ''}`}>
        {primary ? (
          <Link href={primary.href} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-6 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90">
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ) : (
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1d1d1f] dark:bg-white py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90">
            {t('contact.submit')}
            <Avatars />
          </Link>
        )}
        {secondary && (
          <Link href={secondary.href} className="group inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-[#1d1d1f] dark:text-white ring-1 ring-black/10 dark:ring-white/15 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
            {secondary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
      <span className="text-[13px] text-black/50 dark:text-white/50">{note}</span>
    </div>
  );
}

// The soft panel the homepage uses for its product moments (services tiles, method rows).
export const stagePanel = 'rounded-3xl bg-black/[0.03] dark:bg-white/[0.04]';
export { rise };
