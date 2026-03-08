import type { Metadata } from 'next';
import { getAllEssays } from '@/lib/essays';
import { getSearchableContent } from '@/lib/search';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search — andrewfranklinleo.com',
  description: 'Search across governance frameworks, industry verticals, global regions, ecosystem entities, and products.',
};

export default function SearchPage() {
  const essays = getAllEssays().map((e) => ({ slug: e.slug, title: e.title, subtitle: e.subtitle }));
  const items = getSearchableContent(essays);

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '800px' }}>
      <p className="hero__eyebrow">// Search</p>
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        Search the <span className="accent">Platform</span>
      </h1>
      <SearchClient items={items} />
    </div>
  );
}
