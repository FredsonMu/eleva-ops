import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WaitlistLanding } from '@/components/waitlist/WaitlistLanding';

// Inter with its optical-size axis: `.lo-display` sets it to 32 (Inter Display) for headings.
const interDisplay = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--font-display', display: 'swap' });

const title = 'LegalOps: entrar na waitlist';
const description = 'O LegalOps é uma plataforma de gestão para escritórios de advogados. Processos, tarefas, prazos e documentos num só sítio. Entre na waitlist.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/legalops' },
  openGraph: { type: 'website', url: '/legalops', siteName: 'LegalOps', locale: 'pt_PT', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function LegalOpsPage() {
  return (
    <div lang="pt-PT" className={interDisplay.variable}>
      <WaitlistLanding />
    </div>
  );
}
