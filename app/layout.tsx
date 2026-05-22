import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eleva Ops | Soluções Digitais à Medida',
  description: 'Criamos soluções digitais à medida para empresas que querem trabalhar melhor — websites, plataformas internas, automações e ferramentas com IA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-ink bg-paper" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
