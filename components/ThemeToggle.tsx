'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/i18n';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  // The icon is picked by CSS from the `.dark` class that next-themes sets before
  // first paint, so it is correct on the server render too (no mount check, no pop-in).
  // `resolvedTheme` (not `theme`) so the toggle works when the theme comes from the system.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white transition-colors"
      aria-label={t('nav.toggleTheme')}
    >
      <Sun className="h-4 w-4 hidden dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
