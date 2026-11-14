import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/i18n';
import { WaitlistLanding } from '@/components/waitlist/WaitlistLanding';

const title = 'LegalOps: lista de espera';
const description = 'Prazos, documentos e equipa numa só plataforma, feita para escritórios de advogados em Portugal. Entre na lista de espera e experimente primeiro.';

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
