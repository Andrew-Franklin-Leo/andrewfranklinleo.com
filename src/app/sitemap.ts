import type { MetadataRoute } from 'next';
import { VERTICALS } from '@/data/verticals';
import { REGIONS } from '@/data/regions';
import { ENTITIES } from '@/data/entities';
import { PRODUCTS } from '@/data/products';
import { RANKINGS } from '@/data/rankings';
import { getAllSlugs } from '@/lib/essays';

const BASE = 'https://andrewfranklinleo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/', '/about', '/essays', '/products', '/subscribe', '/contact',
    '/events', '/podcast', '/intelligence', '/case-studies', '/council',
    '/referral', '/speaking', '/portal', '/verticals', '/regions',
    '/entities', '/newsletter', '/authors', '/rankings', '/tracker', '/search',
    '/video', '/community', '/api-docs', '/licensing', '/enterprise', '/my-feed',
    '/gift',
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  for (const slug of getAllSlugs()) {
    entries.push({ url: `${BASE}/essays/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });
  }
  for (const v of VERTICALS) {
    entries.push({ url: `${BASE}/verticals/${v.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
  }
  for (const r of REGIONS) {
    entries.push({ url: `${BASE}/regions/${r.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
  }
  for (const e of ENTITIES) {
    entries.push({ url: `${BASE}/entities/${e.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const p of PRODUCTS) {
    entries.push({ url: `${BASE}/products/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
  }
  for (const r of RANKINGS) {
    entries.push({ url: `${BASE}/rankings/${r.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
  }
  entries.push({ url: `${BASE}/authors/andrew-franklin-leo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });

  return entries;
}
