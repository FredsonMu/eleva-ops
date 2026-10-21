import type { Metadata } from 'next';
import { GUIDES } from '@/lib/guide';
import { GuideLanding } from '@/components/guide/GuideLanding';

const guide = GUIDES.en;
const description = 'Discover practical ways to automate repetitive work, connect your tools and give your team more time for the work that matters. Free practical guide by Eleva Ops.';

export const metadata: Metadata = {
  title: `Free Guide: ${guide.title}`,
  description,
  alternates: { canonical: guide.path, languages: { en: GUIDES.en.path, 'pt-PT': GUIDES.pt.path } },
  openGraph: {
    type: 'website',
    url: guide.path,
    siteName: 'ElevaOps',
    locale: 'en_US',
    title: guide.title,
    description,
    images: [{ url: guide.ogImage, width: 1200, height: 630, alt: `${guide.title}: free practical guide by Eleva Ops` }],
  },
  twitter: { card: 'summary_large_image', title: guide.title, description, images: [guide.ogImage] },
};

export default function AiAgentsGuidePage() {
  return <GuideLanding />;
}
