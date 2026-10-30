import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { SolutionsPreview } from '@/components/SolutionsPreview';
import { MethodPreview } from '@/components/MethodPreview';
import { GuidesSection } from '@/components/GuidesSection';
import { GuidePopup } from '@/components/GuidePopup';

// A short homepage: what we do and why, then a path into each part of the site
// (/solutions, /method, /about, /guides, /contact).
export default function Home() {
  return (
    <PageShell after={<GuidePopup />}>
      <Hero />
      <About withStage={false} />
      <SolutionsPreview />
      <MethodPreview />
      <GuidesSection />
    </PageShell>
  );
}
