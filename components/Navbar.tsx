'use client';
import { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { Wordmark } from './Wordmark';

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 py-3 md:py-4 pointer-events-none">
      <div className={`w-full max-w-[1136px] rounded-[26px] transition-[background-color,box-shadow,border-color] duration-300 pointer-events-auto border ${
        solid
          ? `${menuOpen ? "bg-white dark:bg-[#0b1220]" : "bg-white/90 dark:bg-[#0b1220]/85 md:bg-white/75 md:dark:bg-[#0b1220]/70"} md:backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] border-black/[0.06] dark:border-white/10`
          : "bg-transparent border-transparent"
      }`}>
        <div className="flex items-center justify-between px-[11px] md:px-[15px] py-2.5">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 cursor-pointer shrink-0" aria-label="Eleva Ops">
            <Wordmark className="h-4 md:h-[18px] w-auto text-[#1d1d1f] dark:text-white" />
          </Link>

          <nav className="hidden md:flex gap-1 items-center text-[14px] font-medium text-black/65 dark:text-white/65 shrink-0">
            {links.map(link => (
              <Link key={link.href} href={link.href} className="rounded-full px-3.5 py-2 transition-colors hover:bg-black/[0.05] hover:text-[#1d1d1f] dark:hover:bg-white/[0.08] dark:hover:text-white">{t(link.key)}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <LanguageToggle />
            <Link
              href="/#contact"
              className="ml-1 hidden md:inline-flex h-10 items-center rounded-full bg-[#1d1d1f] dark:bg-white px-5 text-[14px] font-medium text-white dark:text-[#020617] transition-colors hover:bg-black dark:hover:bg-white/90"
            >
              {t('nav.contact')}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(open => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white transition-colors"
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu: rendered only while open, so it costs nothing otherwise and opens instantly. */}
        {menuOpen && (
          <nav id={menuId} className="md:hidden flex flex-col px-[11px] pb-5 pt-1 gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 text-[16px] font-medium text-[#1d1d1f] dark:text-white border-b border-black/5 dark:border-white/10 transition-colors hover:text-brand"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-[#1d1d1f] dark:bg-white px-5 py-3.5 text-center text-[15px] font-medium text-white dark:text-[#020617] transition-colors hover:bg-black"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
