import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { Contact } from '@/components/Contact';
import { FAQ } from '@/components/FAQ';
import { ContactNext } from '@/components/ContactNext';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us what you want to build or fix. Free diagnosis, a reply within 24 hours.',
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
