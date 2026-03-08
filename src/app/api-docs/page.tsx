import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Documentation — andrewfranklinleo.com',
  description: 'Enterprise API access for governance intelligence data, regulatory tracking, rankings, and obligation infrastructure.',
};

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/v1/tracker',
    description: 'Retrieve regulatory tracker entries. Filter by jurisdiction, status, impact level, and vertical.',
    tier: 'Operator',
    params: ['jurisdiction', 'status', 'impact', 'vertical', 'limit', 'offset'],
  },
  {
    method: 'GET',
    path: '/api/v1/rankings/:slug',
    description: 'Retrieve ranking data for a specific index (PCI, Fragility Codex, ODI, GMM, Global 50).',
    tier: 'Practitioner',
    params: ['slug', 'period', 'limit'],
  },
  {
    method: 'GET',
    path: '/api/v1/rankings/:slug/history',
    description: 'Historical time-series data for a ranking index. Monthly snapshots.',
    tier: 'Institutional',
    params: ['slug', 'from', 'to', 'interval'],
  },
  {
    method: 'GET',
    path: '/api/v1/verticals',
    description: 'List all industry verticals with metadata, topic coverage, and NAICS mappings.',
    tier: 'Practitioner',
    params: ['limit', 'offset'],
  },
  {
    method: 'GET',
    path: '/api/v1/regions',
    description: 'List all regions with regulatory frameworks, key bodies, and classification systems.',
    tier: 'Practitioner',
    params: ['limit', 'offset'],
  },
  {
    method: 'GET',
    path: '/api/v1/entities',
    description: 'List all AINEFF ecosystem entities with products, revenue models, and architecture details.',
    tier: 'Operator',
    params: ['limit', 'offset'],
  },
  {
    method: 'GET',
    path: '/api/v1/essays',
    description: 'List published governance frameworks with metadata. Content access requires authentication.',
    tier: 'Free',
    params: ['category', 'limit', 'offset'],
  },
  {
    method: 'POST',
    path: '/api/v1/alerts',
    description: 'Create a custom regulatory alert. Receive webhook notifications when matching tracker entries are updated.',
    tier: 'Institutional',
    params: ['jurisdiction', 'vertical', 'impact', 'webhook_url'],
  },
];

const TIER_COLORS: Record<string, string> = {
  Free: 'tier-badge--free',
  Practitioner: 'tier-badge--practitioner',
  Operator: 'tier-badge--operator',
  Institutional: 'tier-badge--institutional',
};

export default function ApiDocsPage() {
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Developer API</p>
      <h1 className="section-title">API <span className="accent">Documentation</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '1.5rem', opacity: 0.85, lineHeight: 1.85 }}>
        Enterprise API access for governance intelligence data. Integrate regulatory tracking,
        rankings, and obligation infrastructure data into your systems.
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.6, marginBottom: '3.5rem' }}>
        Base URL: https://api.andrewfranklinleo.com/v1 | Auth: Bearer token | Format: JSON
      </p>

      {/* Authentication */}
      <div className="card" style={{ marginBottom: '2rem', maxWidth: '700px' }}>
        <h3>Authentication</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.7 }}>
          All API requests require a Bearer token in the Authorization header. Tokens are issued
          per subscription tier and determine endpoint access levels.
        </p>
        <div style={{ background: 'rgba(30,36,43,0.7)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--accent-blue)' }}>Authorization:</span> Bearer afl_live_xxxxxxxxxxxxx
        </div>
      </div>

      {/* Rate Limits */}
      <div className="card" style={{ marginBottom: '3rem', maxWidth: '700px' }}>
        <h3>Rate Limits</h3>
        <table className="tracker-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr><th>Tier</th><th>Requests/min</th><th>Requests/day</th></tr>
          </thead>
          <tbody>
            <tr><td>Free</td><td style={{ fontFamily: 'var(--font-mono)' }}>10</td><td style={{ fontFamily: 'var(--font-mono)' }}>100</td></tr>
            <tr><td>Practitioner</td><td style={{ fontFamily: 'var(--font-mono)' }}>60</td><td style={{ fontFamily: 'var(--font-mono)' }}>5,000</td></tr>
            <tr><td>Operator</td><td style={{ fontFamily: 'var(--font-mono)' }}>120</td><td style={{ fontFamily: 'var(--font-mono)' }}>25,000</td></tr>
            <tr><td>Institutional</td><td style={{ fontFamily: 'var(--font-mono)' }}>300</td><td style={{ fontFamily: 'var(--font-mono)' }}>Unlimited</td></tr>
          </tbody>
        </table>
      </div>

      {/* Endpoints */}
      <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Endpoints</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  background: ep.method === 'GET' ? 'rgba(74,158,255,0.15)' : 'rgba(245,166,35,0.15)',
                  color: ep.method === 'GET' ? 'var(--accent-blue)' : 'var(--accent-gold)',
                }}>{ep.method}</span>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--light-text)' }}>{ep.path}</code>
              </div>
              <span className={`tier-badge ${TIER_COLORS[ep.tier]}`}>{ep.tier}</span>
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '0.75rem' }}>{ep.description}</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {ep.params.map((p) => (
                <span key={p} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--subtle-gray)' }}>{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="thesis-block" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Get API <span className="accent">Access</span></h2>
        <p style={{ maxWidth: '520px', margin: '0 auto 1.5rem', opacity: 0.85 }}>
          API access is available for Practitioner, Operator, and Institutional subscribers.
          Custom integrations and dedicated support available for enterprise teams.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/subscribe" className="btn btn-primary">Subscribe for Access</Link>
          <Link href="/contact" className="btn btn-secondary">Enterprise API Enquiry</Link>
        </div>
      </div>
    </div>
  );
}
