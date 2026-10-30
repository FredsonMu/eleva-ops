import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { MethodPreview } from '@/components/MethodPreview';
import { GuidesSection } from '@/components/GuidesSection';
import { GuidePopup } from '@/components/GuidePopup';

// Homepage: the problem and the chaos → order stage, the four animated services, a short view
// of how we work and the free guides. Each part links to its own page for the detail.
export default function Home() {
  return (
    <PageShell after={<GuidePopup />}>
      <Hero />
      <About />
      <Services more />
      <MethodPreview />
      <GuidesSection />
    </PageShell>
  );
}
