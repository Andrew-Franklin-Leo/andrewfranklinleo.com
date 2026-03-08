export interface Region {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  flag: string;
  regulatoryFrameworks: string[];
  classificationSystem: string;
  keyBodies: string[];
  languages: string[];
}

export const REGIONS: Region[] = [
  {
    slug: 'european-union',
    name: 'European Union',
    tagline: 'AI Act implementation, GDPR enforcement, and Digital Services Act',
    description: 'The EU leads global AI regulation with the AI Act — the first comprehensive AI law. Covering implementation timelines, conformity assessments, high-risk AI classification, GDPR intersection, and the role of national supervisory authorities across 27 member states.',
    flag: 'EU',
    regulatoryFrameworks: ['EU AI Act', 'GDPR', 'Digital Services Act', 'Digital Markets Act', 'NIS2 Directive', 'Data Act'],
    classificationSystem: 'NACE Rev.2.1',
    keyBodies: ['European AI Office', 'EDPB', 'ENISA', 'National Supervisory Authorities'],
    languages: ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'pl'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    tagline: 'Executive Orders, NIST AI RMF, SEC disclosure, and state-level regulation',
    description: 'The US takes a sectoral approach to AI governance. Covering White House Executive Orders, NIST AI Risk Management Framework, SEC AI disclosure requirements, FTC enforcement, and the patchwork of state-level AI laws including Colorado, California, and Illinois.',
    flag: 'US',
    regulatoryFrameworks: ['Executive Order on AI', 'NIST AI RMF', 'SEC AI Disclosure', 'FTC Act', 'State AI Laws', 'CCPA/CPRA'],
    classificationSystem: 'NAICS',
    keyBodies: ['NIST', 'FTC', 'SEC', 'OSTP', 'State Attorneys General'],
    languages: ['en', 'es'],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    tagline: 'Pro-innovation AI regulation, FCA guidance, and sector-specific oversight',
    description: 'The UK pursues a pro-innovation, context-based approach to AI governance. Sector regulators (FCA, Ofcom, CMA, ICO) apply existing frameworks to AI with new guidance. Covering the AI Safety Institute, Bletchley Declaration, and post-Brexit regulatory divergence.',
    flag: 'GB',
    regulatoryFrameworks: ['AI Regulation White Paper', 'UK GDPR', 'FCA AI Guidance', 'ICO AI Auditing', 'Bletchley Declaration'],
    classificationSystem: 'UK SIC 2007',
    keyBodies: ['AI Safety Institute', 'FCA', 'Ofcom', 'CMA', 'ICO', 'DSIT'],
    languages: ['en'],
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    tagline: 'AI Verify, MAS governance, and ASEAN AI leadership',
    description: 'Singapore positions itself as the AI governance hub of Southeast Asia. Covering AI Verify testing framework, MAS AI governance guidelines for financial institutions, PDPA enforcement, and IMDA AI governance standards.',
    flag: 'SG',
    regulatoryFrameworks: ['AI Verify', 'MAS AI Governance', 'PDPA', 'IMDA AI Standards', 'Model AI Governance Framework'],
    classificationSystem: 'SSIC 2020',
    keyBodies: ['MAS', 'IMDA', 'PDPC', 'AI Verify Foundation'],
    languages: ['en', 'zh', 'ms', 'ta'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    tagline: 'AI Ethics Framework, APRA guidance, and Privacy Act reform',
    description: 'Australia balances innovation with responsible AI through voluntary frameworks transitioning to mandatory standards. Covering the AI Ethics Framework, APRA prudential guidance, Privacy Act reform, and the Australian AI Action Plan.',
    flag: 'AU',
    regulatoryFrameworks: ['AI Ethics Framework', 'APRA Prudential Guidance', 'Privacy Act 1988', 'Australian AI Action Plan'],
    classificationSystem: 'ANZSIC 2006',
    keyBodies: ['CSIRO', 'APRA', 'OAIC', 'DTA'],
    languages: ['en'],
  },
  {
    slug: 'india',
    name: 'India',
    tagline: 'Digital India AI, DPDP Act, and the world\'s largest AI deployment base',
    description: 'India governs AI across the world\'s largest democracy. Covering the Digital Personal Data Protection Act, MeitY AI guidelines, SEBI AI frameworks, and the massive deployment of AI across government services, fintech, and agriculture.',
    flag: 'IN',
    regulatoryFrameworks: ['DPDP Act 2023', 'MeitY AI Guidelines', 'SEBI AI Framework', 'RBI AI Guidelines'],
    classificationSystem: 'NIC 2008',
    keyBodies: ['MeitY', 'SEBI', 'RBI', 'IRDAI', 'TRAI'],
    languages: ['en', 'hi', 'ta', 'te', 'bn', 'mr'],
  },
  {
    slug: 'japan',
    name: 'Japan',
    tagline: 'Society 5.0, METI AI governance, and industrial AI leadership',
    description: 'Japan integrates AI governance into its Society 5.0 vision. Covering METI AI governance guidelines, MHLW workplace AI standards, FSA financial AI oversight, and Japan\'s role in G7 AI governance coordination.',
    flag: 'JP',
    regulatoryFrameworks: ['Society 5.0 Framework', 'METI AI Guidelines', 'APPI', 'FSA AI Oversight'],
    classificationSystem: 'JSIC Rev.14',
    keyBodies: ['METI', 'MHLW', 'FSA', 'PPC'],
    languages: ['ja', 'en'],
  },
  {
    slug: 'canada',
    name: 'Canada',
    tagline: 'AIDA, responsible AI framework, and bilingual governance',
    description: 'Canada pursues a rights-based approach to AI governance. Covering the Artificial Intelligence and Data Act (AIDA), voluntary Code of Conduct, OSFI AI/ML guidance for financial institutions, and Quebec\'s Law 25.',
    flag: 'CA',
    regulatoryFrameworks: ['AIDA', 'Voluntary Code of Conduct', 'OSFI AI/ML Guidance', 'PIPEDA', 'Quebec Law 25'],
    classificationSystem: 'NAICS Canada',
    keyBodies: ['ISED', 'OSFI', 'OPC', 'CAI'],
    languages: ['en', 'fr'],
  },
  {
    slug: 'middle-east',
    name: 'Middle East & Africa',
    tagline: 'UAE AI Strategy, Saudi Vision 2030, and emerging governance frameworks',
    description: 'The Middle East races to become a global AI hub. Covering the UAE AI Strategy 2031, Saudi SDAIA governance framework, Qatar National AI Strategy, and emerging governance frameworks across Africa including Kenya, Nigeria, and South Africa.',
    flag: 'AE',
    regulatoryFrameworks: ['UAE AI Strategy 2031', 'SDAIA Framework', 'Qatar National AI Strategy', 'South Africa POPIA'],
    classificationSystem: 'ISIC Rev.4',
    keyBodies: ['UAE AI Office', 'SDAIA', 'NITA-U', 'NITDA'],
    languages: ['ar', 'en', 'fr'],
  },
  {
    slug: 'china',
    name: 'China',
    tagline: 'Deep Synthesis regulation, algorithm governance, and sovereign AI',
    description: 'China leads in AI-specific regulation. Covering Deep Synthesis regulations, algorithm recommendation governance, generative AI measures, the Social Credit System, and China\'s approach to AI sovereignty and data localization.',
    flag: 'CN',
    regulatoryFrameworks: ['Deep Synthesis Provisions', 'Algorithm Recommendation Regulations', 'Generative AI Measures', 'PIPL', 'DSL'],
    classificationSystem: 'GB/T 4754',
    keyBodies: ['CAC', 'MIIT', 'MOST', 'SAMR'],
    languages: ['zh', 'en'],
  },
  {
    slug: 'latin-america',
    name: 'Latin America',
    tagline: 'Brazil AI framework, LGPD enforcement, and regional AI governance',
    description: 'Latin America develops AI governance amid rapid adoption. Covering Brazil\'s AI regulatory framework, LGPD enforcement, Chile\'s AI policy, Colombia\'s national AI strategy, and Mexico\'s emerging framework.',
    flag: 'BR',
    regulatoryFrameworks: ['Brazil AI Framework', 'LGPD', 'Chile AI Policy', 'Colombia AI Strategy'],
    classificationSystem: 'SCIAN',
    keyBodies: ['ANPD', 'MinTIC', 'CNBV'],
    languages: ['pt', 'es', 'en'],
  },
];

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export function getAllRegionSlugs(): string[] {
  return REGIONS.map((r) => r.slug);
}
