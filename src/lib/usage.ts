// API usage tracking and metering

import { adminDb } from '@/lib/firebase/admin';

interface UsageRecord {
    email: string;
    endpoint: string;
    method: string;
    timestamp: string;
}

const RATE_LIMITS: Record<string, number> = {
    free: 10,
    practitioner: 60,
    operator: 120,
    atomicCircle: 120,
    institutional: 300,
    enterprise_team: 120,
    enterprise_plus: 200,
    enterprise_unlimited: 0, // unlimited
};

export async function trackApiUsage(email: string, endpoint: string, method: string) {
    try {
        await adminDb.collection('api_usage').add({
            email: email.toLowerCase(),
            endpoint,
            method,
            timestamp: new Date().toISOString(),
        } satisfies UsageRecord);
    } catch (err) {
        console.error('[Usage] Failed to track:', err);
    }
}

export async function getUsageCount(email: string, windowMinutes = 1): Promise<number> {
    const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
    const snap = await adminDb.collection('api_usage')
        .where('email', '==', email.toLowerCase())
        .where('timestamp', '>=', since)
        .get();
    return snap.size;
}

export function getRateLimit(tier: string): number {
    return RATE_LIMITS[tier] ?? RATE_LIMITS.free;
}

export async function checkRateLimit(email: string, tier: string): Promise<{ allowed: boolean; limit: number; used: number; remaining: number }> {
    const limit = getRateLimit(tier);
    if (limit === 0) return { allowed: true, limit: 0, used: 0, remaining: Infinity };
    const used = await getUsageCount(email);
    return { allowed: used < limit, limit, used, remaining: Math.max(0, limit - used) };
}

export async function getUsageSummary(email: string): Promise<{
    today: number;
    thisWeek: number;
    thisMonth: number;
}> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [daySnap, weekSnap, monthSnap] = await Promise.all([
        adminDb.collection('api_usage').where('email', '==', email.toLowerCase()).where('timestamp', '>=', startOfDay).get(),
        adminDb.collection('api_usage').where('email', '==', email.toLowerCase()).where('timestamp', '>=', startOfWeek).get(),
        adminDb.collection('api_usage').where('email', '==', email.toLowerCase()).where('timestamp', '>=', startOfMonth).get(),
    ]);

    return { today: daySnap.size, thisWeek: weekSnap.size, thisMonth: monthSnap.size };
}
