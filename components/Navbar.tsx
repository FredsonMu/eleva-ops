'use client';
import { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/#servicos', key: 'nav.expertise' },
  { href: '/#metodo', key: 'nav.method' },
  { href: '/#equipa', key: 'nav.team' },
] as const;

export function Navbar() {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const menuId = useId();

  useEffect(() => {
    // React bails out when the value doesn't change, so this only re-renders when crossing 50px.
    const handleScroll = () => setIsTop(window.scrollY <= 50);
    const frame = requestAnimationFrame(handleScroll); // page may load already scrolled
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const solid = !isTop || menuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6 pointer-events-none">
      <div className={`w-full max-w-5xl rounded-[32px] transition-[background-color,box-shadow,border-color] duration-300 pointer-events-auto border-[0.5px] ${
        solid
          ? `${menuOpen ? "bg-white dark:bg-[#020617]" : "bg-white/95 dark:bg-[#020617]/95 md:bg-white/90 md:dark:bg-[#020617]/85"} md:backdrop-blur-lg shadow-[0_4px_24px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.5)] border-black/5 dark:border-white/10`
          : "bg-transparent border-transparent"
      }`}>
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 group cursor-pointer shrink-0">
            <span className="font-sans font-semibold text-xl tracking-tight text-[#1d1d1f] dark:text-white">
              Eleva<span className="text-black/55 dark:text-white/55 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">Ops</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 shrink-0">
            {links.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-brand dark:hover:text-brand transition-colors">{t(link.key)}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <LanguageToggle />
            <a
              href="mailto:contact@elevaops.com"
              className="bg-[#007AFF] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#005bb5] transition-colors hidden md:block"
            >
              {t('nav.contact')}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(open => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white transition-colors"
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu: rendered only while open, so it costs nothing otherwise and opens instantly. */}
        {menuOpen && (
          <nav id={menuId} className="md:hidden flex flex-col px-5 pb-5 pt-1 gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:text-brand dark:hover:text-brand border-b border-black/5 dark:border-white/10 transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href="mailto:contact@elevaops.com"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-[#007AFF] text-white px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest text-center hover:bg-[#005bb5] transition-colors"
            >
              {t('nav.contact')}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
