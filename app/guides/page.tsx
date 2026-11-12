import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { GuidesHero } from '@/components/hero/GuidesHero';
import { GuidesSection } from '@/components/GuidesSection';

export const metadata: Metadata = {
  title: 'Guias gratuitos',
  description: 'Guias e manuais práticos e gratuitos para organizar o trabalho da sua empresa, enviados para o seu email.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  return (
    <PageShell>
      <GuidesHero />
      <GuidesSection heading={false} layout="rows" />
    </PageShell>
  );
}
