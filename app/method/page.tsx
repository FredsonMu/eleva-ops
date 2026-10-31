import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { MethodHero } from '@/components/hero/MethodHero';
import { Methodology } from '@/components/Methodology';
import { Team } from '@/components/Team';
import { MethodExtras } from '@/components/MethodExtras';

export const metadata: Metadata = {
  title: 'How we work',
  description: 'From first conversation to a system your team actually uses: free diagnosis, a fixed-scope proposal, build and launch.',
  alternates: { canonical: '/method' },
};

// The FAQ lives on /contact, next to the form, where the doubts it answers come up.
export default function MethodPage() {
  return (
    <PageShell>
      <MethodHero />
      <Methodology header={false} />
      <Team part="commitment" />
      <MethodExtras />
    </PageShell>
  );
}
