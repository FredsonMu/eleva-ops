import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { Contact } from '@/components/Contact';
import { FAQ } from '@/components/FAQ';
import { ContactNext } from '@/components/ContactNext';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Diga-nos o que quer construir ou resolver. Diagnóstico gratuito e resposta em 24 horas úteis.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="pt-20 md:pt-28">
        <Contact />
      </div>
      <ContactNext />
      <FAQ />
    </PageShell>
  );
}
