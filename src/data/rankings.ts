export interface Ranking {
  slug: string;
  name: string;
  description: string;
  methodology: string;
  scale: string;
  lastUpdated: string;
  tier: 'free' | 'practitioner' | 'operator' | 'institutional';
  sampleData: { organization: string; score: string; change: string; date: string }[];
}

export const RANKINGS: Ranking[] = [
  {
    slug: 'power-concentration-index',
    name: 'Power Concentration Index (PCI)',
    description: 'Measures concentration of AI decision-making power across organizations. Higher scores indicate greater concentration of autonomous decision authority without proportional accountability infrastructure.',
    methodology: 'The PCI evaluates four dimensions: (1) Decision Autonomy Scope — how many decisions are made without human review, (2) Reversibility Gap — the ratio of irreversible to reversible AI actions, (3) Accountability Binding — whether human liability bearers are bound at execution time per the ORF Protocol, and (4) Transparency Density — the ratio of documented to undocumented AI decision pathways. Each dimension scores 0-25, yielding a composite 0-100 score.',
    scale: '0-100 (0 = fully distributed, 100 = fully concentrated)',
    lastUpdated: 'March 2026',
    tier: 'free',
    sampleData: [
      { organization: 'TechCorp Alpha', score: '78', change: '+3', date: 'Mar 2026' },
      { organization: 'FinServ Global', score: '72', change: '-1', date: 'Mar 2026' },
      { organization: 'ManuCo Industries', score: '65', change: '+5', date: 'Mar 2026' },
      { organization: 'HealthNet Systems', score: '61', change: '0', date: 'Mar 2026' },
      { organization: 'AutoDrive Corp', score: '58', change: '-4', date: 'Mar 2026' },
      { organization: 'EnergyGrid AI', score: '54', change: '+2', date: 'Mar 2026' },
      { organization: 'RetailStack', score: '49', change: '-2', date: 'Mar 2026' },
      { organization: 'GovTech Solutions', score: '45', change: '+1', date: 'Mar 2026' },
      { organization: 'InsureTech Prime', score: '41', change: '-3', date: 'Mar 2026' },
      { organization: 'EduAI Platform', score: '37', change: '+6', date: 'Mar 2026' },
    ],
  },
  {
    slug: 'fragility-codex-score',
    name: 'Fragility Codex Score',
    description: 'Organizational governance fragility rating based on the Fragility Codex framework. Maps 8 entropy dimensions per domain to produce a composite fragility grade.',
    methodology: 'Each organization is assessed across 8 entropy dimensions from the Fragility Codex: Decision Entropy, Accountability Entropy, Temporal Entropy, Information Entropy, Structural Entropy, Compliance Entropy, Operational Entropy, and Cultural Entropy. Each dimension is scored 1-5, yielding a composite that maps to letter grades. Lower entropy = more resilient governance.',
    scale: 'A-F (A = minimal fragility, F = critical fragility)',
    lastUpdated: 'March 2026',
    tier: 'practitioner',
    sampleData: [
      { organization: 'GovTech Solutions', score: 'A', change: 'stable', date: 'Mar 2026' },
      { organization: 'FinServ Global', score: 'A-', change: 'up', date: 'Mar 2026' },
      { organization: 'HealthNet Systems', score: 'B+', change: 'stable', date: 'Mar 2026' },
      { organization: 'InsureTech Prime', score: 'B', change: 'up', date: 'Mar 2026' },
      { organization: 'ManuCo Industries', score: 'B-', change: 'down', date: 'Mar 2026' },
      { organization: 'EnergyGrid AI', score: 'C+', change: 'stable', date: 'Mar 2026' },
      { organization: 'RetailStack', score: 'C', change: 'up', date: 'Mar 2026' },
      { organization: 'TechCorp Alpha', score: 'C-', change: 'down', date: 'Mar 2026' },
      { organization: 'AutoDrive Corp', score: 'D+', change: 'stable', date: 'Mar 2026' },
      { organization: 'EduAI Platform', score: 'D', change: 'down', date: 'Mar 2026' },
    ],
  },
  {
    slug: 'obligation-density-index',
    name: 'Obligation Density Index',
    description: 'Ratio of regulatory obligations to compliance infrastructure per jurisdiction. Higher scores indicate jurisdictions where obligations outpace the infrastructure to meet them.',
    methodology: 'The ODI measures the gap between regulatory demand and compliance capacity. It counts (1) total binding AI obligations per jurisdiction, (2) available compliance infrastructure (tools, certified assessors, guidance documents), and (3) enforcement action frequency. The ratio of obligations to infrastructure, weighted by enforcement intensity, produces the density score.',
    scale: '0-10 (0 = obligations fully matched, 10 = severe infrastructure gap)',
    lastUpdated: 'February 2026',
    tier: 'operator',
    sampleData: [
      { organization: 'India', score: '8.4', change: '+0.6', date: 'Feb 2026' },
      { organization: 'Brazil', score: '7.9', change: '+0.3', date: 'Feb 2026' },
      { organization: 'European Union', score: '7.2', change: '+1.1', date: 'Feb 2026' },
      { organization: 'China', score: '6.8', change: '-0.2', date: 'Feb 2026' },
      { organization: 'United States', score: '5.5', change: '+0.4', date: 'Feb 2026' },
      { organization: 'Japan', score: '4.9', change: '+0.1', date: 'Feb 2026' },
      { organization: 'United Kingdom', score: '4.3', change: '-0.5', date: 'Feb 2026' },
      { organization: 'Canada', score: '3.8', change: '+0.2', date: 'Feb 2026' },
      { organization: 'Singapore', score: '2.7', change: '-0.3', date: 'Feb 2026' },
      { organization: 'Australia', score: '2.4', change: '+0.1', date: 'Feb 2026' },
    ],
  },
  {
    slug: 'governance-maturity-model',
    name: 'Governance Maturity Model',
    description: 'Five-level maturity assessment for organizational AI governance. Maps organizations from reactive incident response to predictive governance architecture.',
    methodology: 'Assessment across 12 governance capabilities: Policy Framework, Risk Assessment, Accountability Binding, Incident Response, Monitoring & Audit, Training & Awareness, Stakeholder Engagement, Data Governance, Model Governance, Vendor Management, Regulatory Tracking, and Board Oversight. Each capability is scored Level 1-5, yielding a composite maturity level.',
    scale: 'Level 1-5 (Reactive, Aware, Structured, Integrated, Predictive)',
    lastUpdated: 'March 2026',
    tier: 'practitioner',
    sampleData: [
      { organization: 'GovTech Solutions', score: 'Level 5', change: 'stable', date: 'Mar 2026' },
      { organization: 'FinServ Global', score: 'Level 4', change: 'up', date: 'Mar 2026' },
      { organization: 'HealthNet Systems', score: 'Level 4', change: 'stable', date: 'Mar 2026' },
      { organization: 'InsureTech Prime', score: 'Level 3', change: 'up', date: 'Mar 2026' },
      { organization: 'ManuCo Industries', score: 'Level 3', change: 'stable', date: 'Mar 2026' },
      { organization: 'EnergyGrid AI', score: 'Level 3', change: 'stable', date: 'Mar 2026' },
      { organization: 'RetailStack', score: 'Level 2', change: 'up', date: 'Mar 2026' },
      { organization: 'TechCorp Alpha', score: 'Level 2', change: 'stable', date: 'Mar 2026' },
      { organization: 'AutoDrive Corp', score: 'Level 2', change: 'down', date: 'Mar 2026' },
      { organization: 'EduAI Platform', score: 'Level 1', change: 'stable', date: 'Mar 2026' },
    ],
  },
  {
    slug: 'aineff-global-50',
    name: 'AINEFF Global 50',
    description: 'The top 50 organizations demonstrating obligation infrastructure leadership. Annual ranking based on governance maturity, accountability architecture, and contribution to the AINEFF ecosystem.',
    methodology: 'Composite scoring across: (1) Governance Maturity Model level, (2) Fragility Codex Score, (3) PCI improvement trajectory, (4) ORF Protocol adoption depth, (5) Public accountability commitments, and (6) Ecosystem contribution. Weighted 30/20/15/15/10/10 respectively. Panel-reviewed by the Constraint Council.',
    scale: 'Rank 1-50 (composite score 0-1000)',
    lastUpdated: 'January 2026',
    tier: 'institutional',
    sampleData: [
      { organization: 'GovTech Solutions', score: '#1 (892)', change: 'stable', date: 'Jan 2026' },
      { organization: 'FinServ Global', score: '#2 (867)', change: '+2', date: 'Jan 2026' },
      { organization: 'HealthNet Systems', score: '#3 (841)', change: '-1', date: 'Jan 2026' },
      { organization: 'InsureTech Prime', score: '#4 (819)', change: '+5', date: 'Jan 2026' },
      { organization: 'EnergyGrid AI', score: '#5 (798)', change: '-1', date: 'Jan 2026' },
      { organization: 'ManuCo Industries', score: '#6 (776)', change: '+3', date: 'Jan 2026' },
      { organization: 'RetailStack', score: '#7 (754)', change: '-2', date: 'Jan 2026' },
      { organization: 'AutoDrive Corp', score: '#8 (731)', change: '+1', date: 'Jan 2026' },
      { organization: 'TechCorp Alpha', score: '#9 (709)', change: '-4', date: 'Jan 2026' },
      { organization: 'EduAI Platform', score: '#10 (688)', change: 'new', date: 'Jan 2026' },
    ],
  },
];
