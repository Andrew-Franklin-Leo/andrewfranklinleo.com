import type { Metadata } from 'next';
import CheckoutButton from '@/components/CheckoutButton';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Content Licensing — andrewfranklinleo.com | Editorial, Data, Enterprise, Academic',
    description: 'License governance intelligence content for republication, data integration, enterprise redistribution, and academic use.',
};

const LICENSES = [
    {
        name: 'Editorial Syndication',
        price: '$2,500 — $10,000/year',
        description: 'Republish essays and framework analysis in your publication. Includes full attribution, formatting guidelines, and quarterly content previews.',
        features: ['Up to 12 articles per year', 'Full attribution and backlinks', 'Pre-publication preview access', '48-hour exclusivity window available'],
        product: 'licensing_editorial',
    },
    {
        name: 'Data Licensing',
        price: '$5,000 — $25,000/year',
        description: 'Access proprietary governance data feeds — Power Concentration Index (PCI), Fragility Codex scores, Obligation Density Index, and regulatory tracking data.',
        features: ['API access to all proprietary indices', 'Daily data updates', 'Historical data back to 2025', 'Custom data exports and formats'],
        product: 'licensing_data',
    },
    {
        name: 'Enterprise Content',
        price: '$10,000 — $50,000/year',
        description: 'Full enterprise redistribution rights for internal use. Equip your entire organization with governance intelligence.',
        features: ['Unlimited internal redistribution', 'Custom-branded reports', 'Quarterly executive briefings', 'Integration with internal systems'],
        product: 'licensing_enterprise',
    },
    {
        name: 'Academic & Research',
        price: '$500 — $2,000/year',
        description: 'Licence content for academic research, teaching, and publication. Special rates for universities and research institutions.',
        features: ['Unlimited citations and excerpts', 'Teaching pack with discussion guides', 'Research data access', 'Student project use permitted'],
        product: 'licensing_academic',
    },
];

export default function LicensingPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Content Licensing</p>
            <h1 className="section-title">Content <span className="accent">Licensing</span></h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
                License governance intelligence content, frameworks, and data for republication,
                enterprise training, academic research, and platform integration.
            </p>

            <div className="grid-2" style={{ marginBottom: '3rem' }}>
                {LICENSES.map((license) => (
                    <div key={license.name} className="pricing-card">
                        <div className="pricing-card__name">{license.name}</div>
                        <div className="pricing-card__price" style={{ fontSize: '1.3rem' }}>{license.price}</div>
                        <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.5 }}>{license.description}</p>
                        <ul className="pricing-card__features">
                            {license.features.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                        <CheckoutButton
                            product={license.product}
                            label="Purchase Licence"
                            className="btn btn-ghost"
                            style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center' }}
                        />
                    </div>
                ))}
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Custom <span className="accent">Licensing</span></h2>
                <p style={{ maxWidth: '520px', margin: '0 auto 1.5rem', opacity: 0.85 }}>
                    Need a custom licensing arrangement? Enterprise teams, government agencies, and
                    multilateral organizations can request bespoke content packages.
                </p>
                <Link href="/contact" className="btn btn-primary">Contact Licensing Team</Link>
            </div>
        </div>
    );
}
