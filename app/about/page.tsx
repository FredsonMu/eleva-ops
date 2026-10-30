import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { PageHeader } from '@/components/PageHeader';
import { Team } from '@/components/Team';
import { Origin } from '@/components/Origin';
import { AboutPrinciples } from '@/components/AboutPrinciples';

export const metadata: Metadata = {
  title: 'About',
  description: 'The people behind Eleva Ops and why we build the systems: so leaders can go back to leading.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader label="page.about.label" title="page.about.title" />
      <Team part="people" />
      <AboutPrinciples />
      <Origin />
    </PageShell>
  );
}
