'use client';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// Scroll-reveal without an animation library: one IntersectionObserver per group and a
// CSS transition on transform/opacity (see `.reveal` in globals.css). Elements with the
// `reveal` class animate in once an ancestor (or the element itself) gets `.in-view`.
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}

export type RevealOptions = {
  /** Seconds before the element starts animating. */
  delay?: number;
  /** Seconds the transition takes. */
  duration?: number;
  /** Initial vertical offset, e.g. 30 (px) or '100%'. */
  y?: number | string;
  /** Initial scale. */
  scale?: number;
};

export function revealStyle({ delay, duration, y, scale }: RevealOptions): CSSProperties {
  return {
    ...(delay !== undefined && { '--reveal-delay': `${delay}s` }),
    ...(duration !== undefined && { '--reveal-duration': `${duration}s` }),
    ...(y !== undefined && { '--reveal-y': typeof y === 'number' ? `${y}px` : y }),
    ...(scale !== undefined && { '--reveal-scale': scale }),
  } as CSSProperties;
}

export function Reveal({
  children,
  className = '',
  rootMargin,
  ...options
}: RevealOptions & { children: ReactNode; className?: string; rootMargin?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(rootMargin);
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${className}`} style={revealStyle(options)}>
      {children}
    </div>
  );
}
