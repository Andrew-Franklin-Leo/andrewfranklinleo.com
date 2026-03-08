'use client';

import { useReadingList } from './ReadingList';

export default function SaveButton({ title, url }: { title: string; url: string }) {
  const { addItem, removeItem, isInList } = useReadingList();
  const saved = isInList(url);

  return (
    <button
      onClick={() => saved ? removeItem(url) : addItem(title, url)}
      className="btn btn-secondary"
      aria-label={saved ? 'Remove from reading list' : 'Save to reading list'}
      style={{
        padding: '0.35rem 0.9rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        background: saved ? 'rgba(245,166,35,0.1)' : undefined,
        borderColor: saved ? 'var(--accent-gold)' : undefined,
        color: saved ? 'var(--accent-gold)' : undefined,
      }}
    >
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
