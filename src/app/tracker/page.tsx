'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TRACKER_ENTRIES } from '@/data/tracker';

const REGION_FILTERS = ['All', 'European Union', 'United States', 'United Kingdom', 'Singapore', 'India', 'Japan', 'Canada', 'China', 'Australia'];
const STATUS_FILTERS = ['All', 'enacted', 'proposed', 'draft', 'enforcement'];

export default function TrackerPage() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = TRACKER_ENTRIES.filter((e) => {
    if (regionFilter !== 'All' && !e.jurisdiction.includes(regionFilter)) return false;
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    return true;
  });

  const FREE_LIMIT = 5;

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Regulatory Intelligence</p>
      <h1 className="section-title">AI Governance <span className="accent">Tracker</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '2rem', opacity: 0.85, lineHeight: 1.85 }}>
        Regulatory intelligence across 50+ jurisdictions. Track enacted laws, proposed regulations,
        draft frameworks, and active enforcement actions.
      </p>

      {/* Region filters */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5, marginRight: '0.75rem' }}>Region:</span>
        <div className="filter-chips" style={{ display: 'inline-flex' }}>
          {REGION_FILTERS.map((r) => (
            <button key={r} className={`filter-chip${regionFilter === r ? ' filter-chip--active' : ''}`} onClick={() => setRegionFilter(r)}>{r}</button>
          ))}
        </div>
      </div>

      {/* Status filters */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5, marginRight: '0.75rem' }}>Status:</span>
        <div className="filter-chips" style={{ display: 'inline-flex' }}>
          {STATUS_FILTERS.map((s) => (
            <button key={s} className={`filter-chip${statusFilter === s ? ' filter-chip--active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Jurisdiction</th>
              <th>Regulation</th>
              <th>Status</th>
              <th>Impact</th>
              <th>Verticals</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, FREE_LIMIT).map((entry) => (
              <tr key={entry.id}>
                <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{entry.jurisdiction}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{entry.regulation}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem', maxWidth: '300px' }}>{entry.summary.slice(0, 100)}...</div>
                </td>
                <td><span className={`status-badge status-badge--${entry.status}`}>{entry.status}</span></td>
                <td><span className={`impact-badge impact-badge--${entry.impact}`}>{entry.impact}</span></td>
                <td style={{ fontSize: '0.8rem', opacity: 0.7 }}>{entry.verticals.slice(0, 2).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length > FREE_LIMIT && (
        <>
          <div style={{ position: 'relative' }}>
            <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none', overflowX: 'auto' }}>
              <table className="tracker-table">
                <tbody>
                  {filtered.slice(FREE_LIMIT, FREE_LIMIT + 3).map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.jurisdiction}</td>
                      <td>{entry.regulation}</td>
                      <td><span className={`status-badge status-badge--${entry.status}`}>{entry.status}</span></td>
                      <td><span className={`impact-badge impact-badge--${entry.impact}`}>{entry.impact}</span></td>
                      <td>{entry.verticals.slice(0, 2).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="paywall-cta" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>// {filtered.length - FREE_LIMIT} more entries require subscriber access</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '1rem' }}>Full tracker access for Practitioner subscribers</h3>
            <Link href="/subscribe" className="btn btn-primary">Subscribe for Full Access</Link>
          </div>
        </>
      )}

      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Get <span className="accent">Alerts</span></h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>
          Subscribe to The Daily Signal for real-time regulatory change monitoring across all tracked jurisdictions.
        </p>
        <Link href="/newsletter" className="btn btn-primary">Subscribe to Newsletter</Link>
      </div>
    </div>
  );
}
