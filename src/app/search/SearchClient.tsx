'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { SearchItem } from '@/lib/search';

const TYPE_LABELS: Record<string, string> = {
  essay: 'Frameworks',
  vertical: 'Verticals',
  region: 'Regions',
  entity: 'Ecosystem',
  product: 'Products',
  ranking: 'Rankings',
};

export default function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return {};
    const filtered = items.filter(
      (item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
    const grouped: Record<string, SearchItem[]> = {};
    for (const item of filtered) {
      if (!grouped[item.type]) grouped[item.type] = [];
      grouped[item.type].push(item);
    }
    return grouped;
  }, [query, items]);

  const hasResults = Object.keys(results).length > 0;
  const isSearching = query.trim().length > 0;

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search frameworks, verticals, regions, entities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="search-results">
        {!isSearching && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.5, marginTop: '2rem' }}>
            Search across frameworks, verticals, regions, and entities
          </p>
        )}

        {isSearching && !hasResults && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.5, marginTop: '2rem' }}>
            No results found for &ldquo;{query}&rdquo;
          </p>
        )}

        {Object.entries(results).map(([type, groupItems]) => (
          <div key={type} className="search-results__group">
            <h3>{TYPE_LABELS[type] || type}</h3>
            {groupItems.map((item) => (
              <div key={item.url} className="search-result">
                <h4><Link href={item.url}>{item.title}</Link></h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
