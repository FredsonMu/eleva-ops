import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { AboutHero } from '@/components/hero/AboutHero';
import { AboutView } from '@/components/AboutView';
import { Origin } from '@/components/Origin';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'As pessoas por trás da ElevaOps: uma equipa pequena que constrói websites, sistemas internos e agentes de IA, em contacto direto desde a primeira conversa.',
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
