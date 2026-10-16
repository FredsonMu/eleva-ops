import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

// Shared tile for the services and path sections: a soft panel with a small product moment
// (decorative), then an optional eyebrow, title, copy and footer underneath.
export const tileWindow = 'rounded-xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#0f1729] shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]';
export const tileBar = 'rounded-full bg-black/[0.08] dark:bg-white/10';

export function FeatureTile({
  children,
  eyebrow,
  title,
  desc,
  footer,
  delay = 0,
}: {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  desc: string;
  footer?: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal y={28} duration={0.8} delay={delay} rootMargin="0px 0px -60px 0px" className="flex flex-col">
      <figure className="relative flex h-60 md:h-72 items-end justify-center overflow-hidden rounded-2xl bg-black/[0.03] dark:bg-white/[0.04]" aria-hidden="true">
        {children}
      </figure>
      {eyebrow && <span className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-black/45 dark:text-white/45">{eyebrow}</span>}
      <h3 className={`${eyebrow ? 'mt-2' : 'mt-6'} font-sans text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-white`}>{title}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-black/60 dark:text-white/60">{desc}</p>
      {footer}
    </Reveal>
  );
}
