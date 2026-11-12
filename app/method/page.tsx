import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { MethodHero } from '@/components/hero/MethodHero';
import { Methodology } from '@/components/Methodology';
import { Team } from '@/components/Team';
import { MethodExtras } from '@/components/MethodExtras';

export const metadata: Metadata = {
  title: 'Como trabalhamos',
  description: 'Da primeira conversa a um sistema que a sua equipa usa de facto: diagnóstico gratuito, proposta com âmbito fechado, construção e lançamento.',
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
