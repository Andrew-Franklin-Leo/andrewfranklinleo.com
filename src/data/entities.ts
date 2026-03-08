export interface Entity {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  role: string;
  products: string[];
  revenue: string;
  color: string;
}

export const ENTITIES: Entity[] = [
  {
    slug: 'aureya',
    name: 'Aureya',
    fullName: 'Aureya — Planetary AIDevSecOps Architecture',
    tagline: 'The planetary control layer for AI-native civilization',
    description: 'Aureya is the overarching architecture that coordinates all AINEFF ecosystem entities. It provides the command and control layer for planetary-scale AI governance, integrating Tower Control, sovereign deployment, and multi-model orchestration across every jurisdiction and industry.',
    role: 'Planetary Coordination & Control',
    products: ['Tower Control & Command Center', 'Planetary Coordination Hub', 'Decentralized Sovereignty Framework', 'Multi-Model Orchestration Layer', 'Civilization Dashboard'],
    revenue: 'Platform licensing, sovereign deployment fees, coordination infrastructure',
    color: '#7C3AED',
  },
  {
    slug: 'aineff',
    name: 'AINEFF',
    fullName: 'AI-Native Enterprise Framework of Frameworks',
    tagline: 'The constitutional charter for AI-native enterprise creation',
    description: 'AINEFF is the meta-framework — the framework of frameworks that defines the ontology, constraints, assembly rules, and governance principles for creating AI-native enterprises. It is the constitutional layer that makes everything else possible.',
    role: 'Constitutional Framework & Governance Charter',
    products: ['Constitutional Schemas', 'Governance Ontology', 'Assembly Rules', 'Constraint Architecture', 'Framework Licensing'],
    revenue: 'Licensing fee for frameworks enabling others to build factories',
    color: '#F5A623',
  },
  {
    slug: 'ainef',
    name: 'AINEF',
    fullName: 'AI-Native Enterprise Factory',
    tagline: 'The factory that manufactures AI-native enterprises',
    description: 'AINEF is the operational factory that instantiates AI-native enterprises from templates and constitutional schemas. It is the assembly line for the future of enterprise — generating 1 to 100 AINEs per month, each with complete governance, operations, and revenue infrastructure.',
    role: 'Venture Factory & Enterprise Manufacturing',
    products: ['Enterprise Genome Builder', 'Agent Assembly Engine', 'Policy Compilation', 'Factory Dashboard', 'Enterprise Templates'],
    revenue: 'Per-instantiation fees ($100K-$1M) + monthly platform fees ($50K-$200K)',
    color: '#10B981',
  },
  {
    slug: 'aineg',
    name: 'AINEG',
    fullName: 'AI-Native Enterprise Governance',
    tagline: 'Signal enforcement across the enterprise portfolio',
    description: 'AINEG monitors and governs portfolios of 10 to 10,000 AI-native enterprises. It aggregates risk signals, enforces governance constraints, detects compliance drift, and provides the portfolio intelligence layer that institutional investors and regulators require.',
    role: 'Portfolio Intelligence & Signal Enforcement',
    products: ['Governance Audit Routing', 'Compliance Monitoring', 'Risk Aggregation', 'Enforcement Engine', 'Portfolio Dashboard'],
    revenue: 'Per-enterprise monitoring ($10K-$50K/month) + portfolio fees',
    color: '#3B82F6',
  },
  {
    slug: 'aine',
    name: 'AINE',
    fullName: 'AI-Native Enterprise',
    tagline: 'The autonomous operating unit — the enterprise of the future',
    description: 'Each AINE is a complete operating system for a single AI-native enterprise. It includes production scheduling, fleet management, inventory optimization, financial operations, governance compliance, and 40+ autonomous AI agents — all operating within the constitutional constraints of AINEFF.',
    role: 'Enterprise Operating System',
    products: ['Production Scheduling', 'Fleet Management', 'Inventory Optimization', 'Financial Operations', 'Agent Orchestration'],
    revenue: 'Base subscription ($5K-$50K/month) + revenue share (10-20%)',
    color: '#EC4899',
  },
  {
    slug: 'wge',
    name: 'WGE',
    fullName: 'Work Genesis Engine',
    tagline: 'Workflow generation and task orchestration at scale',
    description: 'WGE generates, decomposes, and orchestrates workflows across AI-native enterprises. It transforms business objectives into executable task sequences, matches capabilities to requirements, and ensures every workflow operates within governance constraints.',
    role: 'Workflow & Task Orchestration',
    products: ['Workflow Genesis System', 'Skill Execution Engine', 'Mission Execution Engine', 'Task Decomposition', 'Capability Matching'],
    revenue: 'Per-workflow fees, enterprise orchestration licensing',
    color: '#14B8A6',
  },
  {
    slug: 'frankmax',
    name: 'Frankmax',
    fullName: 'Frankmax — Pre-Incident Governance Infrastructure',
    tagline: 'The ORF Protocol deployment layer',
    description: 'Frankmax is the operational arm that deploys pre-incident governance infrastructure. It delivers PIAR (Pre-Incident Accountability Review), authority and liability mapping, failure propagation analysis, and jurisdictional exposure assessment for enterprises operating AI systems.',
    role: 'Pre-Incident Governance & ORF Protocol Deployment',
    products: ['PIAR Services', 'Authority & Liability Mapping', 'Failure Propagation Analysis', 'Jurisdictional Exposure Assessment', 'Decision Defensibility Structuring'],
    revenue: '90-Day Proof Units ($85K-$110K), ongoing governance licensing',
    color: '#EF4444',
  },
  {
    slug: 'lpi',
    name: 'LPI',
    fullName: 'Limitless Private Intelligence',
    tagline: 'Deep analysis, strategic intelligence, and decision support',
    description: 'LPI provides institutional-grade intelligence products — the analytical engine behind Obligation Intelligence newsletters, Governance Tracker databases, regulatory monitoring, and Power Concentration Index analysis. It is the Bloomberg Terminal of AI governance.',
    role: 'Strategic Intelligence & Deep Analysis',
    products: ['Obligation Intelligence Newsletter', 'Governance Tracker Database', 'Power Concentration Index', 'Regulatory Monitoring', 'Industry Risk Assessment'],
    revenue: 'Intelligence subscriptions ($500-$100K/year), custom analysis',
    color: '#6366F1',
  },
  {
    slug: 'univenture',
    name: 'UniVenture',
    fullName: 'UniVenture — IP Licensing & Knowledge Monetization',
    tagline: 'Intellectual property stacks, licensing, and knowledge commercialization',
    description: 'UniVenture manages the intellectual property portfolio of the AINEFF ecosystem. It handles framework licensing, case study distribution, teaching licenses, corporate bundle sales, and the commercialization of governance knowledge products.',
    role: 'IP Licensing & Knowledge Monetization',
    products: ['Framework Licensing', 'Teaching Licenses', 'Corporate Bundles', 'Case Study Distribution', 'Research Reports'],
    revenue: 'Licensing fees, case study sales ($25-$8K), corporate packages',
    color: '#D97706',
  },
  {
    slug: 'levelupmax',
    name: 'LevelUpMax',
    fullName: 'LevelUpMax — Operator Training & Certification',
    tagline: 'The talent factory for AI governance operators',
    description: 'LevelUpMax trains and certifies the next generation of AI governance operators. It provides the 10 operator training tracks that serve every NAICS code, ORF Certification programmes, and the institutional training infrastructure that enterprises need to deploy governance at scale.',
    role: 'Operator Training & Certification',
    products: ['ORF Certification', '10 Operator Tracks', 'Institutional Training', 'Skill Assessment', 'Certification Management'],
    revenue: 'Certification fees, institutional training contracts, talent marketplace',
    color: '#F472B6',
  },
];

export function getEntity(slug: string): Entity | undefined {
  return ENTITIES.find((e) => e.slug === slug);
}

export function getAllEntitySlugs(): string[] {
  return ENTITIES.map((e) => e.slug);
}
