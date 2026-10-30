import type { Metadata } from 'next';
import { CATALOG } from '@/lib/guide';
import { LanguageProvider } from '@/lib/i18n';
import { LawyersGuideLanding } from '@/components/guide/LawyersGuideLanding';

const guide = CATALOG['ai-lawyers'].editions.pt!;
const title = 'IA para advogados: guia prático gratuito';
const description = '10 exemplos práticos para usar IA no trabalho à volta do processo, com material fictício, o pedido à IA e a revisão do advogado. Guia gratuito da Eleva Ops.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: guide.path },
  openGraph: {
    type: 'website',
    url: guide.path,
    siteName: 'ElevaOps',
    locale: 'pt_PT',
    title,
    description,
    images: [{ url: guide.ogImage, width: 1200, height: 630, alt: 'IA para advogados: guia prático gratuito da Eleva Ops' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [guide.ogImage] },
};

export default function GuiaIaAdvogadosPage() {
  return (
    <LanguageProvider initialLanguage="pt" scoped>
      <LawyersGuideLanding />
    </LanguageProvider>
  );
}
