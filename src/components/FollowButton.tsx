'use client';

import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';

interface FollowItem { type: 'topic' | 'author' | 'vertical' | 'region'; slug: string; label: string; }

const STORAGE_KEY = 'afl_follows';

function getRawSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try { return localStorage.getItem(STORAGE_KEY) || '[]'; }
  catch { return '[]'; }
}
function getServerSnapshot(): string { return '[]'; }

const listeners = new Set<() => void>();
function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function emitChange() { listeners.forEach((cb) => cb()); }
function setFollows(items: FollowItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); emitChange(); }

function parseFollows(raw: string): FollowItem[] {
  try { return JSON.parse(raw); } catch { return []; }
}

export function useFollows() {
  const raw = useSyncExternalStore(subscribe, getRawSnapshot, getServerSnapshot);
  const items = useMemo(() => parseFollows(raw), [raw]);
  const follow = useCallback((item: FollowItem) => {
    const current = parseFollows(getRawSnapshot());
    if (current.some((i) => i.type === item.type && i.slug === item.slug)) return;
    setFollows([...current, item]);
  }, []);
  const unfollow = useCallback((type: string, slug: string) => {
    setFollows(parseFollows(getRawSnapshot()).filter((i) => !(i.type === type && i.slug === slug)));
  }, []);
  const isFollowing = useCallback((type: string, slug: string) => items.some((i) => i.type === type && i.slug === slug), [items]);
  return { items, follow, unfollow, isFollowing };
}

export default function FollowButton({ type, slug, label }: { type: 'topic' | 'author' | 'vertical' | 'region'; slug: string; label: string }) {
  const { follow, unfollow, isFollowing } = useFollows();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const following = isFollowing(type, slug);

  return (
    <button
      onClick={() => following ? unfollow(type, slug) : follow({ type, slug, label })}
      className="btn btn-secondary"
      style={{
        padding: '0.35rem 0.9rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        background: following ? 'rgba(74,158,255,0.1)' : undefined,
        borderColor: following ? 'var(--accent-blue)' : undefined,
        color: following ? 'var(--accent-blue)' : undefined,
      }}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}
