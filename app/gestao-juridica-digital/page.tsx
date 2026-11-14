import type { Metadata } from 'next';
import { CATALOG } from '@/lib/guide';
import { LanguageProvider } from '@/lib/i18n';
import { GestaoLanding } from '@/components/guide/GestaoLanding';

const guide = CATALOG['gestao-juridica'].editions.pt!;
const title = 'Gestão Jurídica Digital: manual gratuito para escritórios de advogados';
const description = 'Como tirar partido da tecnologia na gestão do escritório de advogados: cinco pilares, um plano de quatro semanas e modelos prontos a usar. Manual gratuito da ElevaOps.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.path },
  openGraph: {
    type: 'website',
    url: guide.path,
    siteName: 'ElevaOps',
    locale: 'pt_PT',
    title,
    description,
    images: [{ url: guide.ogImage, width: 1200, height: 630, alt: 'Gestão Jurídica Digital: manual gratuito da ElevaOps' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [guide.ogImage] },
};

export default function GestaoJuridicaPage() {
  return (
    <LanguageProvider initialLanguage="pt" scoped>
      <GestaoLanding />
    </LanguageProvider>
  );
}
