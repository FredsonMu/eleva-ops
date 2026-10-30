import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { PageHeader } from '@/components/PageHeader';
import { SolutionsDetail } from '@/components/SolutionsDetail';
import { ChaosStage } from '@/components/ChaosStage';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Websites, custom software, automations and AI agents, designed around the way your business works.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHeader label="page.solutions.label" title="page.solutions.title" lead="page.solutions.lead" />
      <SolutionsDetail />
      <ChaosStage />
    </PageShell>
  );
}
