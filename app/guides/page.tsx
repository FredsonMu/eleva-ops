import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { GuidesHero } from '@/components/hero/GuidesHero';
import { GuidesSection } from '@/components/GuidesSection';

export const metadata: Metadata = {
  title: 'Free guides',
  description: 'Free, practical guides on using AI and automation in your business, sent to your inbox.',
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
