'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'afl_article_views';
const FREE_LIMIT = 3;
const RESET_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface ViewRecord {
    slugs: string[];
    resetAt: number;
}

function getViewRecord(): ViewRecord {
    if (typeof window === 'undefined') return { slugs: [], resetAt: Date.now() + RESET_INTERVAL_MS };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { slugs: [], resetAt: Date.now() + RESET_INTERVAL_MS };
        const record: ViewRecord = JSON.parse(raw);
        if (Date.now() > record.resetAt) {
            const fresh = { slugs: [], resetAt: Date.now() + RESET_INTERVAL_MS };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
            return fresh;
        }
        return record;
    } catch {
        return { slugs: [], resetAt: Date.now() + RESET_INTERVAL_MS };
    }
}

function saveViewRecord(record: ViewRecord) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

export function recordArticleView(slug: string): void {
    const record = getViewRecord();
    if (!record.slugs.includes(slug)) {
        record.slugs.push(slug);
        saveViewRecord(record);
    }
}

export function getArticleViewCount(): number {
    return getViewRecord().slugs.length;
}

export function hasViewedArticle(slug: string): boolean {
    return getViewRecord().slugs.includes(slug);
}

export function isPaywalled(slug: string, isGated: boolean): boolean {
    if (!isGated) return false;
    const record = getViewRecord();
    if (record.slugs.includes(slug)) return false; // Already viewed
    return record.slugs.length >= FREE_LIMIT;
}

export function getRemainingFreeViews(): number {
    return Math.max(0, FREE_LIMIT - getArticleViewCount());
}

// ─── React hook for paywall state ──────────────────────────────────
let listeners: Array<() => void> = [];
function emitChange() {
    for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => { listeners = listeners.filter((l) => l !== listener); };
}

function getSnapshot() {
    if (typeof window === 'undefined') return JSON.stringify({ count: 0, remaining: FREE_LIMIT });
    const record = getViewRecord();
    return JSON.stringify({ count: record.slugs.length, remaining: Math.max(0, FREE_LIMIT - record.slugs.length), slugs: record.slugs });
}

function getServerSnapshot() {
    return JSON.stringify({ count: 0, remaining: FREE_LIMIT, slugs: [] });
}

export function usePaywall() {
    const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const data = JSON.parse(raw) as { count: number; remaining: number; slugs: string[] };

    return {
        viewCount: data.count,
        remaining: data.remaining,
        freeLimit: FREE_LIMIT,
        isAtLimit: data.count >= FREE_LIMIT,
        hasViewed: (slug: string) => data.slugs.includes(slug),
        recordView: (slug: string) => {
            recordArticleView(slug);
            emitChange();
        },
    };
}
