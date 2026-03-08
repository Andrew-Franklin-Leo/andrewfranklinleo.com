'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFollows } from '@/components/FollowButton';

export default function MyFeedPage() {
  const { items, unfollow } = useFollows();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <p className="hero__eyebrow">// My Feed</p>
        <h1 className="section-title">Loading...</h1>
      </div>
    );
  }

  const grouped: Record<string, typeof items> = {};
  for (const item of items) {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push(item);
  }

  const typeLabels: Record<string, string> = { topic: 'Topics', author: 'Authors', vertical: 'Verticals', region: 'Regions' };
  const typeUrls: Record<string, (slug: string) => string> = {
    topic: (s) => `/essays?tag=${s}`,
    author: (s) => `/authors/${s}`,
    vertical: (s) => `/verticals/${s}`,
    region: (s) => `/regions/${s}`,
  };

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '800px' }}>
      <p className="hero__eyebrow">// Personalization</p>
      <h1 className="section-title">My <span className="accent">Feed</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3rem', opacity: 0.85, lineHeight: 1.85 }}>
        Your personalized governance intelligence feed. Follow verticals, regions, topics, and authors
        to build a custom intelligence briefing.
      </p>

      {items.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>No follows yet</h3>
          <p style={{ fontSize: '0.95rem', opacity: 0.7, marginBottom: '1.5rem' }}>
            Follow verticals, regions, and topics across the platform to build your personalized feed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/verticals" className="btn btn-primary">Browse Verticals</Link>
            <Link href="/regions" className="btn btn-secondary">Browse Regions</Link>
          </div>
        </div>
      ) : (
        <>
          {Object.entries(grouped).map(([type, typeItems]) => (
            <div key={type} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-blue)', marginBottom: '1rem' }}>
                {typeLabels[type] || type}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {typeItems.map((item) => (
                  <div key={`${item.type}-${item.slug}`} className="search-result">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4><Link href={typeUrls[item.type]?.(item.slug) || '#'}>{item.label}</Link></h4>
                      <button
                        onClick={() => unfollow(item.type, item.slug)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="thesis-block" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Get Your Feed Delivered</h3>
            <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem' }}>
              Subscribe to The Daily Signal for governance intelligence filtered to your followed topics.
            </p>
            <Link href="/newsletter" className="btn btn-primary">Subscribe to Newsletter</Link>
          </div>
        </>
      )}
    </div>
  );
}
