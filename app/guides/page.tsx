import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { PageHeader } from '@/components/PageHeader';
import { GuidesSection } from '@/components/GuidesSection';

export const metadata: Metadata = {
  title: 'Free guides',
  description: 'Free, practical guides on using AI and automation in your business, sent to your inbox.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  return (
    <PageShell>
      <PageHeader label="guides.label" title="page.guides.title" lead="page.guides.lead" />
      <GuidesSection heading={false} />
    </PageShell>
  );
}
