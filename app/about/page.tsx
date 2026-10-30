import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { AboutView } from '@/components/AboutView';
import { Origin } from '@/components/Origin';

export const metadata: Metadata = {
  title: 'About',
  description: 'The people behind Eleva Ops and why we build the systems: so leaders can go back to leading.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutView />
      <Origin />
    </PageShell>
  );
}
