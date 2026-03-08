export interface Vertical {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  naicsPrefixes: string[];
  topics: string[];
  color: string;
}

export const VERTICALS: Vertical[] = [
  {
    slug: 'governance',
    name: 'AI Governance',
    tagline: 'Accountability infrastructure for autonomous systems',
    description: 'Global regulatory intelligence, enforcement tracking, framework analysis, and governance architecture for enterprises deploying AI at scale. Covering the EU AI Act, US Executive Orders, NIST AI RMF, and 50+ jurisdictional frameworks.',
    icon: 'shield',
    naicsPrefixes: ['5415', '5416', '9211'],
    topics: ['ORF Protocol', 'Regulatory Compliance', 'AI Risk Management', 'Enforcement Actions', 'Governance Frameworks', 'Accountability Architecture'],
    color: '#4A9EFF',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    tagline: 'Production stability, supply chain intelligence, and operational discipline',
    description: 'AI-driven production optimization, OTIF improvement, working capital compression, and supply chain governance across automotive, aerospace, electronics, chemicals, and heavy industry. Entropy mapping across 5,000+ manufacturing NAICS codes.',
    icon: 'factory',
    naicsPrefixes: ['31', '32', '33'],
    topics: ['Production Stability', 'Supply Chain', 'Working Capital', 'Quality Control', 'Plant Operations', 'Predictive Maintenance'],
    color: '#F5A623',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    tagline: 'Risk, compliance, and accountability in algorithmic finance',
    description: 'Governance intelligence for trading AI, credit decisions, fraud detection, AML systems, and algorithmic lending. Covering SEC AI disclosure requirements, FCA guidance, MAS frameworks, and institutional risk management.',
    icon: 'chart',
    naicsPrefixes: ['52', '5231', '5232', '5239'],
    topics: ['Algorithmic Trading', 'Credit Decisions', 'Fraud Detection', 'AML/KYC', 'Regulatory Capital', 'Risk Management'],
    color: '#10B981',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Clinical AI safety, diagnostic governance, and patient accountability',
    description: 'Governance infrastructure for diagnostic AI, treatment recommendations, clinical trial optimization, and healthcare revenue integrity. Covering FDA AI/ML guidance, HIPAA implications, and global health AI regulation.',
    icon: 'heart',
    naicsPrefixes: ['62', '3254', '3391'],
    topics: ['Clinical AI Safety', 'Diagnostic Systems', 'Revenue Integrity', 'Patient Data', 'Drug Discovery AI', 'Clinical Trials'],
    color: '#EF4444',
  },
  {
    slug: 'logistics',
    name: 'Logistics & Transport',
    tagline: 'Fleet intelligence, route optimization, and supply chain accountability',
    description: 'AI governance for autonomous vehicles, fleet management, route optimization, and last-mile delivery systems. Entropy analysis across transportation, warehousing, and distribution networks.',
    icon: 'truck',
    naicsPrefixes: ['48', '49', '4841', '4931'],
    topics: ['Fleet Utilization', 'Route Optimization', 'Autonomous Vehicles', 'Warehouse AI', 'Last-Mile Delivery', 'Cold Chain'],
    color: '#8B5CF6',
  },
  {
    slug: 'energy',
    name: 'Energy & Resources',
    tagline: 'Grid intelligence, carbon governance, and resource optimization',
    description: 'AI governance for power grid management, renewable energy optimization, carbon credit verification, and mining operations. Covering energy transition risks, grid stability, and resource extraction governance.',
    icon: 'bolt',
    naicsPrefixes: ['21', '22', '2211', '2121'],
    topics: ['Grid Management', 'Renewable Optimization', 'Carbon Governance', 'Resource Extraction', 'Energy Trading', 'Smart Meters'],
    color: '#F59E0B',
  },
  {
    slug: 'defense',
    name: 'Defense & Security',
    tagline: 'Autonomous systems governance, LAWS accountability, and sovereign AI',
    description: 'Governance frameworks for autonomous weapons systems, military AI decision-making, cybersecurity AI, and sovereign defense infrastructure. The most critical domain for the Atomic Constraint.',
    icon: 'lock',
    naicsPrefixes: ['9271', '3364', '5415'],
    topics: ['Autonomous Weapons', 'Military AI', 'Cybersecurity', 'Sovereign AI', 'LAWS Governance', 'Intelligence Systems'],
    color: '#6B7280',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    tagline: 'Margin recovery, decision velocity, and knowledge work governance',
    description: 'AI governance for consulting, legal, accounting, and advisory firms. Margin recovery through scope discipline, billing governance, and AI-assisted knowledge work. Covering professional liability in AI-augmented decisions.',
    icon: 'briefcase',
    naicsPrefixes: ['54', '5411', '5412', '5413'],
    topics: ['Margin Recovery', 'Scope Discipline', 'Billing Governance', 'Knowledge AI', 'Professional Liability', 'Decision Velocity'],
    color: '#EC4899',
  },
  {
    slug: 'government',
    name: 'Government & Public Sector',
    tagline: 'Procurement AI, benefits decisions, and public accountability',
    description: 'Governance infrastructure for government AI procurement, automated benefits decisions, surveillance systems, and public service delivery. Where the Atomic Constraint meets democratic accountability.',
    icon: 'building',
    naicsPrefixes: ['92', '9211', '9221'],
    topics: ['Procurement AI', 'Benefits Automation', 'Surveillance Governance', 'Public Services', 'Judicial AI', 'Democratic Accountability'],
    color: '#14B8A6',
  },
  {
    slug: 'technology',
    name: 'Technology',
    tagline: 'Platform governance, AI infrastructure, and developer accountability',
    description: 'Governance for AI platforms, cloud infrastructure, SaaS systems, and developer tools. Covering platform liability, API governance, model deployment accountability, and open-source AI governance.',
    icon: 'code',
    naicsPrefixes: ['5112', '5182', '5191', '5415'],
    topics: ['Platform Governance', 'Model Deployment', 'API Accountability', 'Cloud AI', 'Open Source AI', 'Developer Tools'],
    color: '#3B82F6',
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    tagline: 'Parametric AI insurance, underwriting governance, and claims automation',
    description: 'The intersection of AI governance and risk transfer. Parametric insurance for AI outcomes, automated underwriting accountability, and claims processing governance. The financial infrastructure layer of the ORF Protocol.',
    icon: 'shield-check',
    naicsPrefixes: ['5241', '5242', '5251'],
    topics: ['Parametric Insurance', 'Underwriting AI', 'Claims Automation', 'Risk Pricing', 'Actuarial AI', 'Reinsurance'],
    color: '#D97706',
  },
  {
    slug: 'education',
    name: 'Education & Training',
    tagline: 'Learning AI governance, credential integrity, and skill verification',
    description: 'Governance for AI-powered education, automated assessment, credential verification, and workforce training systems. The LevelUpMax operator training ecosystem and institutional learning governance.',
    icon: 'academic',
    naicsPrefixes: ['61', '6111', '6113'],
    topics: ['Learning AI', 'Assessment Automation', 'Credential Integrity', 'Skill Verification', 'Operator Training', 'EdTech Governance'],
    color: '#7C3AED',
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}

export function getAllVerticalSlugs(): string[] {
  return VERTICALS.map((v) => v.slug);
}
