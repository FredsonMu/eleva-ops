import type { MetadataRoute } from 'next';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elevaops.com').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/legalops', '/solutions', '/method', '/about', '/guides', '/contact'].map(path => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/guia-ia-advogados`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...pages,
  ];
}
