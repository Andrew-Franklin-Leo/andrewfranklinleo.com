import { VERTICALS } from '@/data/verticals';
import { REGIONS } from '@/data/regions';
import { ENTITIES } from '@/data/entities';
import { PRODUCTS } from '@/data/products';
import { RANKINGS } from '@/data/rankings';

export interface SearchItem {
  type: 'essay' | 'vertical' | 'region' | 'entity' | 'product' | 'ranking';
  title: string;
  description: string;
  slug: string;
  url: string;
}

export function getSearchableContent(essays: { slug: string; title: string; subtitle: string }[]): SearchItem[] {
  const items: SearchItem[] = [];

  for (const essay of essays) {
    items.push({
      type: 'essay',
      title: essay.title,
      description: essay.subtitle,
      slug: essay.slug,
      url: `/essays/${essay.slug}`,
    });
  }

  for (const v of VERTICALS) {
    items.push({
      type: 'vertical',
      title: v.name,
      description: v.tagline,
      slug: v.slug,
      url: `/verticals/${v.slug}`,
    });
  }

  for (const r of REGIONS) {
    items.push({
      type: 'region',
      title: r.name,
      description: r.tagline,
      slug: r.slug,
      url: `/regions/${r.slug}`,
    });
  }

  for (const e of ENTITIES) {
    items.push({
      type: 'entity',
      title: e.name,
      description: e.tagline,
      slug: e.slug,
      url: `/entities/${e.slug}`,
    });
  }

  for (const p of PRODUCTS) {
    items.push({
      type: 'product',
      title: p.name,
      description: p.tagline,
      slug: p.slug,
      url: `/products/${p.slug}`,
    });
  }

  for (const r of RANKINGS) {
    items.push({
      type: 'ranking',
      title: r.name,
      description: r.description.slice(0, 150) + '...',
      slug: r.slug,
      url: `/rankings/${r.slug}`,
    });
  }

  return items;
}
