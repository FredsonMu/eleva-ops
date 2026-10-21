import type { Metadata } from 'next';
import { GUIDES } from '@/lib/guide';
import { LanguageProvider } from '@/lib/i18n';
import { GuideLanding } from '@/components/guide/GuideLanding';

const guide = GUIDES.pt;
const description = 'Descubra formas práticas de automatizar tarefas repetitivas, ligar as suas ferramentas e dar à sua equipa mais tempo para o que importa. Guia prático gratuito da Eleva Ops.';

export const metadata: Metadata = {
  title: `Guia gratuito: ${guide.title}`,
  description,
  alternates: { canonical: guide.path, languages: { en: GUIDES.en.path, 'pt-PT': GUIDES.pt.path } },
  openGraph: {
    type: 'website',
    url: guide.path,
    siteName: 'ElevaOps',
    locale: 'pt_PT',
    title: guide.title,
    description,
    images: [{ url: guide.ogImage, width: 1200, height: 630, alt: `${guide.title}: guia prático gratuito da Eleva Ops` }],
  },
  twitter: { card: 'summary_large_image', title: guide.title, description, images: [guide.ogImage] },
};

export default function GuiaAgentesIaPage() {
  return (
    <LanguageProvider initialLanguage="pt" scoped>
      <GuideLanding />
    </LanguageProvider>
  );
}
