import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { SolutionsHero } from '@/components/hero/SolutionsHero';
import { SolutionsDetail } from '@/components/SolutionsDetail';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Websites, custom software, automations and AI agents, designed around the way your business works.',
  alternates: { canonical: '/solutions' },
};

// Ends on the "not sure which one you need?" call to action; the chaos → order stage is on the homepage.
export default function SolutionsPage() {
  return (
    <PageShell>
      <SolutionsHero />
      <SolutionsDetail />
    </PageShell>
  );
}
