'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';

const NEWSLETTERS = [
  {
    name: 'The Weekly Briefing', tier: 'free', price: '$0', period: '', frequency: 'Every Thursday',
    desc: 'Weekly governance intelligence roundup for practitioners and executives.',
    features: ['Key regulatory developments across all jurisdictions', 'Framework updates and methodology releases', 'Enforcement actions and compliance alerts', 'Curated Governance Signal analysis', 'ORF Protocol implementation highlights', 'Community insights from the Constraint Council'],
    cta: 'Subscribe Free', featured: false, badge: null,
  },
  {
    name: 'The Daily Signal', tier: 'newsletter_daily', price: '$29', period: '/month', frequency: 'Every weekday',
    desc: 'Daily governance signals for strategy leads, consultants, and risk officers.',
    features: ['Daily regulatory change monitoring across 50+ jurisdictions', 'Compliance deadline tracking and early warnings', 'Industry-specific alerts across 12 verticals', 'Regional intelligence covering 11 geographies', 'Power Concentration Index (PCI) daily movements', 'Pre-publication framework access and previews'],
    cta: 'Start Daily Signal', featured: true, badge: 'Most Popular',
  },
  {
    name: 'The Institutional Brief', tier: 'institutional', price: '$149', period: '/month', frequency: 'Daily + weekly deep-dive',
    desc: 'Deep-dive analysis for enterprise operators, institutional investors, and regulators.',
    features: ['Confidential enforcement intelligence and early signals', 'Pre-publication framework and methodology access', 'Direct analyst access via priority channel', 'Custom governance briefings on request', 'Institutional-grade risk assessment reports', 'Board-ready governance summaries (PDF)'],
    cta: 'Contact for Access', featured: false, badge: 'Enterprise',
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: 'free' }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Subscription failed');
      setStatus('success');
      setMessage('Subscribed. Check your inbox for confirmation.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Governance Intelligence</p>
      <h1 className="section-title" style={{ maxWidth: '700px' }}>
        Governance Intelligence, <span className="accent">Delivered</span>
      </h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
        Weekly briefings, daily signals, and institutional-grade analysis. Join enterprise operators,
        government risk leads, and institutional investors reading the Obligation Intelligence newsletter.
      </p>

      <div className="pricing-grid" style={{ marginBottom: '4rem' }}>
        {NEWSLETTERS.map((nl) => (
          <div key={nl.name} className={`pricing-card${nl.featured ? ' pricing-card--featured' : ''}`}>
            {nl.badge && <div className="pricing-card__badge">{nl.badge}</div>}
            <div className="pricing-card__name">{nl.name}</div>
            <div className="pricing-card__price">{nl.price}<span>{nl.period}</span></div>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{nl.frequency}</p>
            <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.5 }}>{nl.desc}</p>
            <ul className="pricing-card__features">
              {nl.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            {nl.tier === 'institutional' ? (
              <Link href="/contact" className="btn btn-secondary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>{nl.cta}</Link>
            ) : nl.tier === 'free' ? (
              <a href="#signup-form" className="btn btn-secondary" style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}>{nl.cta}</a>
            ) : (
              <CheckoutButton
                tier={nl.tier}
                label={nl.cta}
                className="btn btn-primary"
                style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center', width: '100%' }}
              />
            )}
          </div>
        ))}
      </div>

      <div id="signup-form" className="card" style={{ maxWidth: '540px' }}>
        <h3>Subscribe to the Free Weekly Briefing</h3>
        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem' }}>Every Thursday. No spam. Unsubscribe any time.</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} />
          <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</button>
        </form>
        {status === 'success' && <p style={{ fontSize: '0.88rem', color: '#4ade80', marginTop: '0.5rem' }}>{message}</p>}
        {status === 'error' && <p style={{ fontSize: '0.88rem', color: '#f87171', marginTop: '0.5rem' }}>{message}</p>}
      </div>
    </div>
  );
}
