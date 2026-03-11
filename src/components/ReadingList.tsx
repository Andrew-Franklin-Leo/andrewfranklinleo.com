'use client';

import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';

interface ReadingListItem {
  title: string;
  url: string;
  savedAt: string;
}

const STORAGE_KEY = 'afl_reading_list';

function getRawSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch { return '[]'; }
}

function getServerSnapshot(): string { return '[]'; }

const listeners = new Set<() => void>();
function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function emitChange() { listeners.forEach((cb) => cb()); }
function setItems(items: ReadingListItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); emitChange(); }

function parseItems(raw: string): ReadingListItem[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export function useReadingList() {
  const raw = useSyncExternalStore(subscribe, getRawSnapshot, getServerSnapshot);
  const items = useMemo(() => parseItems(raw), [raw]);
  const addItem = useCallback((title: string, url: string) => {
    const current = parseItems(getRawSnapshot());
    if (current.some((i) => i.url === url)) return;
    setItems([...current, { title, url, savedAt: new Date().toISOString() }]);
  }, []);
  const removeItem = useCallback((url: string) => {
    setItems(parseItems(getRawSnapshot()).filter((i) => i.url !== url));
  }, []);
  const isInList = useCallback((url: string) => items.some((i) => i.url === url), [items]);
  return { items, addItem, removeItem, isInList };
}

export default function ReadingList() {
  const { items, removeItem } = useReadingList();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="reading-list-fab" aria-label={`Reading list: ${items.length} saved`}>
        {items.length}
      </button>

      {isOpen && <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.5)' }} />}

      <div className={`reading-list-panel${isOpen ? ' reading-list-panel--open' : ''}`} role="dialog" aria-label="Reading list" aria-hidden={!isOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Reading List <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', marginLeft: '0.5rem' }}>{items.length}</span></h3>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--light-text)', cursor: 'pointer', padding: '0.3rem 0.7rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Close</button>
        </div>

        {items.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.5, textAlign: 'center', marginTop: '3rem' }}>No saved articles yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((item) => (
              <div key={item.url} className="reading-list-item">
                <Link href={item.url} onClick={() => setIsOpen(false)}>{item.title}</Link>
                <button onClick={() => removeItem(item.url)} aria-label={`Remove ${item.title}`}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
