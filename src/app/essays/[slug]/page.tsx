import type { Metadata } from 'next';
import Link from 'next/link';
import { getEssay, getAllSlugs } from '@/lib/essays';
import ShareButtons from '@/components/ShareButtons';
import SaveButton from '@/components/SaveButton';
import AdSlot from '@/components/AdSlot';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const essay = getEssay(slug);
    if (!essay) return { title: 'Essay Not Found — Andrew Palupillai' };
    return {
        title: `${essay.title} — Andrew Palupillai`,
        description: essay.subtitle,
    };
}

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

function estimateReadingTime(text: string): number {
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 240));
}

function renderInlineMarkdown(text: string) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={idx} style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

function renderMarkdownBlock(block: string, index: number) {
    // ## Heading
    if (block.startsWith('## ')) {
        return (
            <h2 key={index} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, margin: '3rem 0 1rem', color: 'var(--light-text)' }}>
                {block.replace('## ', '')}
            </h2>
        );
    }

    // > Blockquote
    if (block.startsWith('> ')) {
        const quoteText = block.replace(/^> /gm, '');
        return (
            <blockquote key={index} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '1.5rem', margin: '2rem 0', opacity: 0.9, fontStyle: 'italic', color: 'var(--light-text)' }}>
                {renderInlineMarkdown(quoteText)}
            </blockquote>
        );
    }

    // Unordered list (- items)
    if (/^- /.test(block)) {
        const items = block.split('\n').filter((l) => l.startsWith('- ')).map((l) => l.replace(/^- /, ''));
        return (
            <ul key={index} style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', opacity: 0.88 }}>
                {items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', lineHeight: 1.75 }}>{renderInlineMarkdown(item)}</li>
                ))}
            </ul>
        );
    }

    // Numbered list
    if (/^\d+\.\s/.test(block)) {
        const items = block.split('\n').filter((l) => /^\d+\.\s/.test(l)).map((l) => l.replace(/^\d+\.\s/, ''));
        return (
            <ol key={index} style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', opacity: 0.88 }}>
                {items.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', lineHeight: 1.75 }}>{renderInlineMarkdown(item)}</li>
                ))}
            </ol>
        );
    }

    // Regular paragraph
    return (
        <p key={index} style={{ marginBottom: '1.5rem', opacity: 0.88 }}>{renderInlineMarkdown(block)}</p>
    );
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const essay = getEssay(slug);

    if (!essay) {
        return (
            <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
                <h1 className="section-title">Framework Not Found</h1>
                <p style={{ opacity: 0.7, marginBottom: '2rem' }}>This document does not exist or is not yet published.</p>
                <Link href="/essays" className="btn btn-primary">&larr; Return to Archive</Link>
            </div>
        );
    }

    const readingTime = estimateReadingTime(essay.content);

    const blocks = essay.content
        .split('\n\n')
        .map((b) => b.trim())
        .filter(Boolean);

    // For gated essays, determine the cutoff
    const isGated = essay.gated;
    let freeBlockCount = blocks.length;
    if (isGated) {
        // Show first 3 paragraphs (non-heading blocks)
        let paragraphsSeen = 0;
        freeBlockCount = 0;
        for (let i = 0; i < blocks.length; i++) {
            freeBlockCount = i + 1;
            if (!blocks[i].startsWith('## ') && !blocks[i].startsWith('> ')) {
                paragraphsSeen++;
            }
            if (paragraphsSeen >= 3) break;
        }
    }

    // Next essay navigation
    const allSlugs = getAllSlugs();
    const currentIndex = allSlugs.indexOf(slug);
    const nextSlug = currentIndex >= 0 && currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
    const nextEssay = nextSlug ? getEssay(nextSlug) : null;

    const shareUrl = `https://andrewfranklinleo.com/essays/${slug}`;
    const shareText = encodeURIComponent(essay.title);

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div style={{ maxWidth: '740px' }}>
                {/* Back + meta */}
                <Link href="/essays" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: '2rem' }}>
                    &larr; Framework Archive
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    <span className="card__tag">{essay.category}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', opacity: 0.5 }}>{essay.date}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', opacity: 0.5 }}>{readingTime} min read</span>
                    <SaveButton title={essay.title} url={shareUrl} />
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, marginBottom: '1.25rem', fontWeight: 700 }}>
                    {essay.title}
                </h1>
                <p style={{ fontSize: '1.15rem', opacity: 0.75, fontStyle: 'italic', lineHeight: 1.7, marginBottom: '3.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                    {essay.subtitle}
                </p>

                {/* Essay body */}
                <div style={{ lineHeight: 1.85, fontSize: '1.05rem' }}>
                    {/* Free blocks */}
                    {blocks.slice(0, freeBlockCount).map((block, i) => renderMarkdownBlock(block, i))}

                    {/* Gated blur overlay */}
                    {isGated && freeBlockCount < blocks.length && (
                        <div style={{ position: 'relative', marginTop: '1rem' }}>
                            <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', maxHeight: '300px', overflow: 'hidden' }}>
                                {blocks.slice(freeBlockCount, freeBlockCount + 6).map((block, i) =>
                                    renderMarkdownBlock(block, freeBlockCount + i)
                                )}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                background: 'linear-gradient(to bottom, transparent 0%, var(--bg-color, #0a0a0a) 85%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingBottom: '1.5rem',
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>
                                        // Subscriber-only content
                                    </p>
                                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                                        This essay continues for subscribers
                                    </h3>
                                    <Link href="/subscribe" className="btn btn-primary">
                                        Subscribe to Continue Reading &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full content for non-gated */}
                    {!isGated && blocks.slice(freeBlockCount).map((block, i) =>
                        renderMarkdownBlock(block, freeBlockCount + i)
                    )}
                </div>

                {/* Inline Ad */}
                <div style={{ margin: '2.5rem 0' }}>
                    <AdSlot position="inline" />
                </div>

                {/* Social share */}
                <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <ShareButtons title={essay.title} url={shareUrl} />
                </div>

                {/* Next essay navigation */}
                {nextEssay && (
                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Next Essay</span>
                        <Link href={`/essays/${nextEssay.slug}`} style={{ textDecoration: 'none', color: 'var(--accent-gold)', fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                            {nextEssay.title} &rarr;
                        </Link>
                    </div>
                )}

                {/* Subscribe CTA at bottom */}
                <div className="thesis-block" style={{ marginTop: '4rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>Get the Full Framework Archive</h3>
                    <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                        Annotated PDFs, subscriber briefings, and early access to upcoming frameworks — for practitioners and enterprise operators.
                    </p>
                    <Link href="/subscribe" className="btn btn-primary">View Access Tiers &rarr;</Link>
                </div>
            </div>
        </div>
    );
}
