import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuroraBackground } from '@/components/AuroraBackground';
import { PrivacyPolicyContent } from '@/components/privacy/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a ElevaOps recolhe, usa e protege os seus dados pessoais, de acordo com o RGPD.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fdfdfd] dark:bg-[#020617] text-[#1d1d1f] dark:text-white selection:bg-[#007AFF] selection:text-white min-h-screen relative overflow-clip">
      <AuroraBackground noiseClassName="opacity-[0.15] dark:opacity-[0.08]" />

      <div className="relative z-10 flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <main className="flex-grow">
          <PrivacyPolicyContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
