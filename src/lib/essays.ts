import fs from 'fs';
import path from 'path';

export interface Essay {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    category: string;
    content: string;
    gated: boolean;
}

const ESSAY_MAP: Record<string, { slug: string; subtitle: string; category: string; date: string; gated: boolean }> = {
    'essay-01-orf-protocol': {
        slug: 'orf-thesis',
        subtitle: 'The foundational case for the ORF Protocol: how to structurally prevent accountability from evaporating into architecture.',
        category: 'ORF Protocol',
        date: 'February 2026',
        gated: false,
    },
    'essay-02-atomic-constraint': {
        slug: 'atomic-constraint',
        subtitle: '"No system may execute an irreversible action unless a single, identifiable human liability bearer is bound at execution time."',
        category: 'Framework',
        date: 'February 2026',
        gated: false,
    },
    'essay-03-fifteen-layer-reality-stack': {
        slug: 'reality-stack',
        subtitle: 'A complete ontology of what any serious AI governance system must address — Truth through Human Discipline.',
        category: 'Framework',
        date: 'March 2026',
        gated: false,
    },
    'essay-04-pre-incident-governance': {
        slug: 'pre-incident-governance',
        subtitle: '"The decision that caused your crisis was made 6 months ago. No one flagged it." Why post-incident response is the wrong paradigm.',
        category: 'Governance',
        date: 'March 2026',
        gated: false,
    },
    'essay-05-five-first-principles': {
        slug: 'first-principles',
        subtitle: '"Actions precede authority. Legitimacy is compression. Obligation is memory. Accountability is asymmetric. Time is hidden power."',
        category: 'Philosophy',
        date: 'March 2026',
        gated: false,
    },
    'essay-06-centi-trillion-architecture': {
        slug: 'centi-trillion',
        subtitle: 'How 8 parallel infrastructure protocols create civilization-scale value — and why ORF must be built first.',
        category: 'Strategy',
        date: 'March 2026',
        gated: true,
    },
    'essay-07-fragility-codex': {
        slug: 'fragility-codex',
        subtitle: 'A systematic mapping of AI failure modes across NAICS industries, with 8 entropy dimensions per domain.',
        category: 'Research',
        date: 'March 2026',
        gated: true,
    },
};

const SLUG_TO_FILE: Record<string, string> = {};
for (const [file, meta] of Object.entries(ESSAY_MAP)) {
    SLUG_TO_FILE[meta.slug] = file;
}

function getContentDir() {
    return path.join(process.cwd(), 'content', 'essays');
}

function parseMarkdown(raw: string): { title: string; content: string } {
    const lines = raw.split('\n');
    let title = '';
    const contentLines: string[] = [];
    let pastHeader = false;

    for (const line of lines) {
        if (!pastHeader && line.startsWith('# ')) {
            title = line.replace('# ', '').trim();
            pastHeader = true;
            continue;
        }
        if (pastHeader) {
            contentLines.push(line);
        }
    }

    // Remove the author/date line and first separator
    let content = contentLines.join('\n');
    content = content.replace(/^\s*\*.*?\*\s*\n/, '').replace(/^---\n/, '');

    return { title: title || 'Untitled', content: content.trim() };
}

export function getEssay(slug: string): Essay | null {
    const fileName = SLUG_TO_FILE[slug];
    if (!fileName) return null;

    const meta = ESSAY_MAP[fileName];
    const filePath = path.join(getContentDir(), `${fileName}.md`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { title, content } = parseMarkdown(raw);

    return {
        slug: meta.slug,
        title,
        subtitle: meta.subtitle,
        date: meta.date,
        category: meta.category,
        content,
        gated: meta.gated,
    };
}

export function getAllEssays(): Essay[] {
    const essays: Essay[] = [];
    for (const [fileName, meta] of Object.entries(ESSAY_MAP)) {
        const filePath = path.join(getContentDir(), `${fileName}.md`);
        if (!fs.existsSync(filePath)) continue;

        const raw = fs.readFileSync(filePath, 'utf-8');
        const { title } = parseMarkdown(raw);

        essays.push({
            slug: meta.slug,
            title,
            subtitle: meta.subtitle,
            date: meta.date,
            category: meta.category,
            content: '',
            gated: meta.gated,
        });
    }
    return essays;
}

export function getAllSlugs(): string[] {
    return Object.values(ESSAY_MAP).map((m) => m.slug);
}
