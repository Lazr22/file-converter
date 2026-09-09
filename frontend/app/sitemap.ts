import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

const routes = [
  '',
  '/pdf-to-word',
  '/word-to-pdf',
  '/pdf-merge',
  '/pdf-split',
  '/image-to-pdf',
  '/pdf-to-image',
  '/image-convert',
  '/csv-to-pdf',
  '/excel-to-pdf',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
