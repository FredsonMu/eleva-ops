import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { AboutHero } from '@/components/hero/AboutHero';
import { AboutView } from '@/components/AboutView';
import { Origin } from '@/components/Origin';

export const metadata: Metadata = {
  title: 'About',
  description: 'The people behind Eleva Ops: a small engineering team building websites, internal systems and AI agents, with direct contact from the first call to launch.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <AboutView />
      <Origin />
    </PageShell>
  );
}
