import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elevaops.com').replace(/\/$/, '');
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'ElevaOps',
    alternateName: ['Eleva Ops', 'ElevaOps Soluções Digitais'],
    url: siteUrl,
    logo: `${siteUrl}/icone-eleva.png`,
    email: 'contact@elevaops.com',
    description:
      'A ElevaOps cria soluções digitais à medida para empresas: websites profissionais, plataformas internas, automações e ferramentas com IA.',
    areaServed: ['Portugal', 'Global'],
    sameAs: ['https://github.com/FredsonMu/eleva-ops'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'ElevaOps',
    alternateName: 'Eleva Ops',
    url: siteUrl,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: ['pt-PT', 'en'],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ElevaOps',
    template: '%s | ElevaOps',
  },
  description: 'ElevaOps cria soluções digitais à medida para empresas que querem trabalhar melhor: websites, plataformas internas, automações e ferramentas com IA.',
  applicationName: 'ElevaOps',
  authors: [{ name: 'ElevaOps' }],
  creator: 'ElevaOps',
  publisher: 'ElevaOps',
  category: 'Technology',
  keywords: [
    'ElevaOps',
    'Eleva Ops',
    'ElevaOps Portugal',
    'Eleva Ops Portugal',
    'soluções digitais à medida',
    'websites profissionais',
    'plataformas internas',
    'automação de processos',
    'ferramentas com IA',
    'desenvolvimento web',
    'sistemas personalizados',
  ],
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-48.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: '/',
    siteName: 'ElevaOps',
    title: 'ElevaOps',
    description: 'Soluções digitais personalizadas para empresas que querem organizar, automatizar e modernizar processos.',
    images: [
      {
        url: '/icone-eleva.png',
        width: 512,
        height: 512,
        alt: 'Ícone Eleva Ops',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ElevaOps',
    description: 'Websites, plataformas internas, automações e ferramentas com IA para empresas que querem trabalhar melhor.',
    images: ['/icone-eleva.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-ink bg-paper overflow-x-hidden w-full max-w-[100vw] dark:bg-[#020617] dark:text-white" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
