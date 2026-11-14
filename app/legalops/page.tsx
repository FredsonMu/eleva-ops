import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/i18n';
import { WaitlistLanding } from '@/components/waitlist/WaitlistLanding';

const title = 'LegalOps: entrar na waitlist';
const description = 'O LegalOps é uma plataforma de gestão para escritórios de advogados. Processos, tarefas, prazos e documentos num só sítio. Entre na waitlist.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/legalops' },
  openGraph: { type: 'website', url: '/legalops', siteName: 'ElevaOps', locale: 'pt_PT', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function LegalOpsPage() {
  return (
    <LanguageProvider initialLanguage="pt" scoped>
      <WaitlistLanding />
    </LanguageProvider>
  );
}
