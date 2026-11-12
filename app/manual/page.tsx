import type { Metadata } from 'next';
import { CATALOG } from '@/lib/guide';
import { LanguageProvider } from '@/lib/i18n';
import { ManualLanding } from '@/components/guide/ManualLanding';

const manual = CATALOG['manual-prazos'].editions.pt!;
const title = 'Entre prazos e processos: manual gratuito para escritórios de advogados';
const description = 'Quanto tempo perde o seu escritório entre tarefas? Um manual de 16 páginas com um método para medir esse tempo e quatro princípios para o reduzir. Gratuito, da ElevaOps.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: manual.path },
  openGraph: {
    type: 'website',
    url: manual.path,
    siteName: 'ElevaOps',
    locale: 'pt_PT',
    title,
    description,
    images: [{ url: manual.ogImage, width: 1200, height: 630, alt: 'Entre prazos e processos: manual gratuito da ElevaOps' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [manual.ogImage] },
};

export default function ManualPage() {
  return (
    <LanguageProvider initialLanguage="pt" scoped>
      <ManualLanding />
    </LanguageProvider>
  );
}
