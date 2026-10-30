import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { Methodology } from '@/components/Methodology';
import { Team } from '@/components/Team';
import { FAQ } from '@/components/FAQ';
import { MethodExtras } from '@/components/MethodExtras';

export const metadata: Metadata = {
  title: 'How we work',
  description: 'From first conversation to a system your team actually uses: free diagnosis, a fixed-scope proposal, build and launch.',
  alternates: { canonical: '/method' },
};

export default function MethodPage() {
  return (
    <PageShell>
      <div className="pt-20 md:pt-28">
        <Methodology />
      </div>
      <Team part="commitment" />
      <MethodExtras />
      <FAQ />
    </PageShell>
  );
}
