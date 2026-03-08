'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

const DISCUSSIONS = [
  { id: 1, topic: 'EU AI Act Implementation', author: 'Community', replies: 24, lastActive: '2 hours ago', category: 'Regulatory' },
  { id: 2, topic: 'ORF Protocol in Manufacturing: Real-World Results', author: 'Community', replies: 18, lastActive: '5 hours ago', category: 'Frameworks' },
  { id: 3, topic: 'Power Concentration Index: March 2026 Movements', author: 'Community', replies: 31, lastActive: '1 day ago', category: 'Rankings' },
  { id: 4, topic: 'Pre-Incident Governance for Financial Services', author: 'Community', replies: 12, lastActive: '1 day ago', category: 'Verticals' },
  { id: 5, topic: 'Colorado AI Act Compliance: Implementation Questions', author: 'Community', replies: 9, lastActive: '2 days ago', category: 'Regulatory' },
  { id: 6, topic: 'Fragility Codex Scoring Methodology Discussion', author: 'Community', replies: 15, lastActive: '3 days ago', category: 'Frameworks' },
  { id: 7, topic: 'NIST AI RMF 2.0: What Changed and What Matters', author: 'Community', replies: 22, lastActive: '4 days ago', category: 'Regulatory' },
  { id: 8, topic: 'Building Accountability Infrastructure at Scale', author: 'Community', replies: 7, lastActive: '5 days ago', category: 'General' },
];

const CATEGORIES = ['All', 'Regulatory', 'Frameworks', 'Rankings', 'Verticals', 'General'];

export default function CommunityPage() {
  const [filter, setFilter] = useState('All');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === 'All' ? DISCUSSIONS : DISCUSSIONS.filter((d) => d.category === filter);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitted(true);
    setCommentText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Community</p>
      <h1 className="section-title">Governance <span className="accent">Community</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.85 }}>
        Discussion forum for governance practitioners, enterprise operators, and regulators.
        Share insights, ask questions, and connect with the obligation infrastructure community.
      </p>

      <div className="filter-chips" style={{ marginBottom: '2rem' }}>
        {CATEGORIES.map((c) => (
          <button key={c} className={`filter-chip${filter === c ? ' filter-chip--active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      {/* Discussions */}
      <div style={{ marginBottom: '3rem' }}>
        {filtered.map((d) => (
          <div key={d.id} className="search-result" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--light-text)' }}>{d.topic}</span>
                </h4>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
                  <span>{d.replies} replies</span>
                  <span>{d.lastActive}</span>
                </div>
              </div>
              <span className="card__tag">{d.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Start discussion */}
      <div className="card" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
        <h3>Start a Discussion</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1rem' }}>Share your governance question, insight, or implementation experience.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="What governance challenge are you working on?"
            rows={4}
            style={{
              width: '100%',
              background: 'rgba(30,36,43,0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              color: 'var(--light-text)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              resize: 'vertical',
              marginBottom: '0.75rem',
            }}
          />
          <button type="submit" className="btn btn-primary">Post Discussion</button>
          {submitted && <p style={{ fontSize: '0.85rem', color: '#4ade80', marginTop: '0.5rem' }}>Discussion posted. Subscribers will be notified.</p>}
        </form>
      </div>

      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Join the <span className="accent">Constraint Council</span></h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>
          The Constraint Council is the governance practitioner community for advanced discussions,
          private briefings, and direct author access.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/council" className="btn btn-primary">Apply to Council</Link>
          <Link href="/subscribe" className="btn btn-secondary">Subscribe for Access</Link>
        </div>
      </div>
    </div>
  );
}
