export interface Product {
  slug: string;
  name: string;
  category: 'proof-unit' | 'platform' | 'insurance' | 'intelligence' | 'training';
  tagline: string;
  description: string;
  buyer: string;
  buyerTitle: string;
  complaint: string;
  price: string;
  roi: string;
  expansion: string;
  metrics: { label: string; baseline: string; target: string }[];
  killCondition: string;
  entity: string;
  vertical: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'production-stability-sprint',
    name: 'Production Stability Sprint',
    category: 'proof-unit',
    tagline: 'From 82% OTIF to 92% in 90 days',
    description: 'Deploy a 4-person execution team inside one manufacturing plant to improve OTIF (On-Time In-Full) through AI-assisted forecasting, daily constraint reviews, and execution discipline. This is not a technology problem — it is an execution friction problem.',
    buyer: 'COO / VP Operations / Plant Manager',
    buyerTitle: 'Reports to COO, controls production planning + plant budget',
    complaint: 'We\'re constantly firefighting. Planning meetings are useless. Everything is urgent. We\'re missing delivery dates and burning cash on expediting.',
    price: '$95,000',
    roi: '12x within 90 days',
    expansion: '$30K-$50K/month licensing per plant',
    metrics: [
      { label: 'OTIF', baseline: '82%', target: '92%' },
      { label: 'Expediting Spend', baseline: '$40L/quarter', target: '-30%' },
      { label: 'Overtime Hours', baseline: 'Elevated', target: '-30%' },
    ],
    killCondition: 'OTIF does not improve 3% by Week 4',
    entity: 'frankmax',
    vertical: 'manufacturing',
  },
  {
    slug: 'fleet-utilization-recovery',
    name: 'Fleet Utilization Recovery Sprint',
    category: 'proof-unit',
    tagline: '15% more trips per day without capex',
    description: 'A 3-person execution team trains dispatch and route supervisors on AI-assisted scheduling, implements a daily 20-minute performance standup, and transforms fleet utilization through execution discipline — not more software.',
    buyer: 'Head of Operations (Logistics)',
    buyerTitle: 'Reports to COO, controls fleet utilization budget',
    complaint: 'We bought route software. Dispatch still runs on WhatsApp. Productivity hasn\'t moved.',
    price: '$80,000',
    roi: '5x within 90 days',
    expansion: '$20K-$40K/month per city cluster',
    metrics: [
      { label: 'Trips/Vehicle/Day', baseline: '4.8', target: '5.5' },
      { label: 'Idle Hours', baseline: '90 min', target: '-40%' },
      { label: 'Fuel per km', baseline: 'Elevated', target: '-12%' },
    ],
    killCondition: 'No trip improvement by Week 5',
    entity: 'frankmax',
    vertical: 'logistics',
  },
  {
    slug: 'margin-recovery-sprint',
    name: 'Margin Recovery Sprint',
    category: 'proof-unit',
    tagline: '7% realization improvement on $12M practice',
    description: 'A 4-person pod enforces scope discipline and billing rigor across a professional services practice. AI-assisted scope enforcement prevents the write-offs that are killing margins.',
    buyer: 'CFO / Managing Partner',
    buyerTitle: 'Controls practice P&L and billing policy',
    complaint: 'We\'re at 78% utilization but write-offs are killing us. Margins keep shrinking despite full calendars.',
    price: '$110,000',
    roi: '7.6x within 90 days',
    expansion: '$20K-$35K/month per practice group',
    metrics: [
      { label: 'Realization Rate', baseline: '84%', target: '91%' },
      { label: 'Write-offs', baseline: 'Elevated', target: '-40%' },
      { label: 'EBITDA Impact', baseline: '-', target: '+$840K annualized' },
    ],
    killCondition: 'No 2% realization improvement by Week 4',
    entity: 'frankmax',
    vertical: 'professional-services',
  },
  {
    slug: 'working-capital-compression',
    name: 'Working Capital Compression Sprint',
    category: 'proof-unit',
    tagline: '10-day DIO reduction, immediate cash release',
    description: 'Finance and supply chain team installs demand validation and reorder discipline. Working capital is trapped in inventory because no one is enforcing the discipline to release it.',
    buyer: 'CFO',
    buyerTitle: 'Controls treasury, working capital, and inventory policy',
    complaint: 'We have 78 days of inventory and still stock-outs. Cash is stuck in the warehouse.',
    price: '$95,000',
    roi: '60x within 90 days',
    expansion: '$40K-$60K/month per product category',
    metrics: [
      { label: 'Days Inventory Outstanding', baseline: '78 days', target: '68 days' },
      { label: 'Stock-outs', baseline: 'Frequent', target: '-50%' },
      { label: 'Cash Released', baseline: '-', target: '$5.5Cr immediate' },
    ],
    killCondition: 'No 5-day DIO reduction by Week 5',
    entity: 'frankmax',
    vertical: 'manufacturing',
  },
  {
    slug: 'receivables-acceleration',
    name: 'Receivables Acceleration Sprint',
    category: 'proof-unit',
    tagline: '12-day DSO reduction, $5Cr liquidity release',
    description: 'A 3-person team installs AI-prioritized collection cadence with structured follow-up protocols. Stop financing your customers — start collecting with discipline.',
    buyer: 'CFO / Credit Manager',
    buyerTitle: 'Controls receivables, credit policy, and collections',
    complaint: 'We\'re financing our customers. Collections are slow, inconsistent, and nobody owns the process.',
    price: '$85,000',
    roi: '60x within 90 days',
    expansion: '$15K-$25K/month recurring',
    metrics: [
      { label: 'Days Sales Outstanding', baseline: '74 days', target: '62 days' },
      { label: 'Liquidity Released', baseline: '-', target: '$5Cr' },
      { label: 'Collection Rate', baseline: 'Low', target: '+25%' },
    ],
    killCondition: 'No 5-day DSO improvement by Week 4',
    entity: 'frankmax',
    vertical: 'financial-services',
  },
  {
    slug: 'decision-latency-reduction',
    name: 'Decision Latency Reduction Sprint',
    category: 'proof-unit',
    tagline: '50% reduction in decision cycle time',
    description: 'A 4-person team maps decision bottlenecks, removes unnecessary approval layers, and enforces a 48-hour decision SLA. Speed is the competitive advantage most enterprises are throwing away.',
    buyer: 'COO / BU Head',
    buyerTitle: 'Controls business unit operations and approval chains',
    complaint: 'Decisions take weeks. Projects stall waiting for approvals. We\'re slower than our competitors.',
    price: '$90,000',
    roi: '5x within 90 days',
    expansion: '$25K-$40K/month per BU',
    metrics: [
      { label: 'Decision Cycle', baseline: '14 days', target: '7-8 days' },
      { label: 'Approval Layers', baseline: '5-7', target: '2-3' },
      { label: 'Project Velocity', baseline: 'Slow', target: '+40%' },
    ],
    killCondition: 'No 20% reduction by Week 4',
    entity: 'frankmax',
    vertical: 'professional-services',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByVertical(verticalSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.vertical === verticalSlug);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
