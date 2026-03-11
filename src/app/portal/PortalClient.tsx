"use client";

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import InvoiceList from '@/components/InvoiceList';

interface StakeholderProfile {
    email: string;
    tier: string;
    levelupmax_track: string;
    levelupmax_level: number;
    levelupmax_progress: number;
    performance_tokens: number;
    referral_code: string;
    referral_count: number;
    created_at: string;
}

interface LedgerEntry {
    id: string;
    type: string;
    description: string;
    amount: number;
    timestamp: string;
}

const REFERRAL_REWARDS = [
    { count: 1, reward: '"Atomic Constraint" framework PDF (annotated)' },
    { count: 3, reward: '1-month free Practitioner upgrade' },
    { count: 5, reward: '"Obligation Infrastructure" book' },
    { count: 10, reward: 'Quarterly Constraint Roundtable invitation' },
];

const TIER_LABELS: Record<string, string> = {
    free: 'Free', practitioner_monthly: 'Practitioner', practitioner_annual: 'Practitioner (Annual)',
    operator_monthly: 'Operator', operator_annual: 'Operator (Annual)',
    atomicCircle: 'Atomic Circle', earlyOperator: 'Early Operator', institutional: 'Institutional',
    council_associate: 'Council Associate', council_fellow: 'Council Fellow', council_senior: 'Council Senior Fellow',
    newsletter_daily: 'Daily Signal', obligation_monitor: 'Obligation Monitor',
    practitioner: 'Practitioner', operator: 'Operator',
};

const TIER_COLORS: Record<string, string> = {
    free: '#94a3b8', practitioner: '#60a5fa', practitioner_monthly: '#60a5fa', practitioner_annual: '#60a5fa',
    operator: '#a78bfa', operator_monthly: '#a78bfa', operator_annual: '#a78bfa',
    atomicCircle: '#f59e0b', earlyOperator: '#34d399', institutional: '#f472b6',
    council_associate: '#fb923c', council_fellow: '#fb923c', council_senior: '#fb923c',
    newsletter_daily: '#60a5fa', obligation_monitor: '#f59e0b',
};

function generateReferralCode(): string {
    return 'AFL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function PortalClient() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState(auth?.currentUser ?? null);
    const [profile, setProfile] = useState<StakeholderProfile | null>(null);
    const [activity, setActivity] = useState<LedgerEntry[]>([]);
    const [profileLoading, setProfileLoading] = useState(false);
    const [billingLoading, setBillingLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'usage'>('overview');

    const loadProfile = async (uid: string, userEmail: string) => {
        if (!db) return;
        setProfileLoading(true);
        try {
            const profileRef = doc(db, 'stakeholders', uid);
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
                setProfile(profileSnap.data() as StakeholderProfile);
            } else {
                const newProfile: StakeholderProfile = {
                    email: userEmail, tier: 'free', levelupmax_track: 'Observer',
                    levelupmax_level: 0, levelupmax_progress: 0, performance_tokens: 0,
                    referral_code: generateReferralCode(), referral_count: 0,
                    created_at: new Date().toISOString(),
                };
                await setDoc(profileRef, newProfile);
                setProfile(newProfile);
            }

            const ledgerRef = collection(db, 'incentive_ledger');
            const ledgerQuery = query(ledgerRef, where('uid', '==', uid), orderBy('timestamp', 'desc'), limit(10));
            const ledgerSnap = await getDocs(ledgerQuery);
            const entries: LedgerEntry[] = [];
            ledgerSnap.forEach((docSnap) => {
                entries.push({ id: docSnap.id, ...docSnap.data() } as LedgerEntry);
            });
            setActivity(entries);
        } catch (err) {
            console.error('Failed to load profile:', err);
        } finally {
            setProfileLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!auth) throw new Error('Authentication not configured');
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            await loadProfile(userCredential.user.uid, userCredential.user.email || email);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth?.signOut();
        setUser(null);
        setProfile(null);
        setActivity([]);
    };

    const openBillingPortal = async () => {
        if (!user?.email) return;
        setBillingLoading(true);
        try {
            const res = await fetch('/api/billing-portal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to open billing portal');
            }
            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Could not open billing portal');
        } finally {
            setBillingLoading(false);
        }
    };

    useEffect(() => {
        if (user && !profile) {
            loadProfile(user.uid, user.email || '');
        }
    }, [user]);

    if (user) {
        const tierKey = profile?.tier || 'free';
        const tierLabel = TIER_LABELS[tierKey] || tierKey;
        const tierColor = TIER_COLORS[tierKey] || '#94a3b8';
        const progressPct = profile?.levelupmax_progress || 0;
        const referralCount = profile?.referral_count || 0;
        const referralCode = profile?.referral_code || '---';
        const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/referral?ref=${referralCode}` : `/referral?ref=${referralCode}`;

        return (
            <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh] text-center w-full">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white">Stakeholder Dashboard</h1>
                <p className="text-lg text-slate-400 max-w-lg mx-auto">Welcome, {user.email}.</p>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, color: '#fff', backgroundColor: tierColor }}>
                    {tierLabel} Tier
                </span>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    {(['overview', 'billing', 'usage'] as const).map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            background: activeTab === tab ? 'rgba(245, 166, 35, 0.15)' : 'transparent',
                            border: `1px solid ${activeTab === tab ? '#F5A623' : '#334155'}`,
                            color: activeTab === tab ? '#F5A623' : '#94a3b8',
                            padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer',
                            fontSize: '0.82rem', fontFamily: 'var(--font-mono)', textTransform: 'capitalize',
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {profileLoading ? (
                    <p className="text-slate-500">Loading profile...</p>
                ) : (
                    <>
                        {/* ─── Overview Tab ──────────────────────────────── */}
                        {activeTab === 'overview' && (
                            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mt-8 text-left">
                                {/* Levelupmax */}
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h2 className="text-xl font-semibold text-white mb-2">Levelupmax Progression</h2>
                                    <p className="text-slate-400 text-sm mb-4">Your current track and certification status.</p>
                                    <div className="text-2xl font-mono text-blue-400 mb-3">
                                        Tier {profile?.levelupmax_level || 0} - {profile?.levelupmax_track || 'Observer'}
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">{progressPct}% to next level</p>
                                </div>

                                {/* Performance Tokens */}
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h2 className="text-xl font-semibold text-white mb-2">Performance Tokens</h2>
                                    <p className="text-slate-400 text-sm mb-4">Immutable ledger balance.</p>
                                    <div className="text-2xl font-mono text-green-400">{(profile?.performance_tokens || 0).toFixed(2)} PT</div>
                                </div>

                                {/* Subscription */}
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h2 className="text-xl font-semibold text-white mb-2">Subscription</h2>
                                    <p className="text-slate-400 text-sm mb-4">Your current access level.</p>
                                    <div className="text-2xl font-mono" style={{ color: tierColor }}>{tierLabel}</div>
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                        <button onClick={openBillingPortal} disabled={billingLoading || tierKey === 'free'} className="text-sm text-blue-400 hover:text-blue-300" style={{ background: 'none', border: 'none', cursor: tierKey === 'free' ? 'default' : 'pointer', padding: 0, opacity: tierKey === 'free' ? 0.4 : 1 }}>
                                            {billingLoading ? 'Loading...' : 'Manage Billing'}
                                        </button>
                                        <Link href="/subscribe" className="text-sm text-blue-400 hover:text-blue-300">
                                            {tierKey === 'free' ? 'Upgrade' : 'Change Plan'}
                                        </Link>
                                    </div>
                                </div>

                                {/* Referral */}
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h2 className="text-xl font-semibold text-white mb-2">Referral Programme</h2>
                                    <p className="text-slate-400 text-sm mb-3">Share and earn rewards.</p>
                                    <div className="text-sm text-slate-300 mb-1">Your code: <span className="font-mono text-blue-400">{referralCode}</span></div>
                                    <div className="text-sm text-slate-300 mb-3">Referrals: <span className="font-mono text-green-400">{referralCount}</span></div>
                                    <div className="text-xs text-slate-500 mb-3" style={{ wordBreak: 'break-all' }}>{shareLink}</div>
                                    <button onClick={() => navigator.clipboard.writeText(shareLink)} className="text-xs text-blue-400 hover:text-blue-300" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                        Copy share link
                                    </button>
                                    <div className="mt-4 space-y-2">
                                        {REFERRAL_REWARDS.map((r) => (
                                            <div key={r.count} className="flex items-center gap-2 text-xs">
                                                <span style={{ width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, background: referralCount >= r.count ? '#22c55e' : '#334155', color: '#fff', flexShrink: 0 }}>
                                                    {referralCount >= r.count ? '\u2713' : r.count}
                                                </span>
                                                <span className={referralCount >= r.count ? 'text-green-400' : 'text-slate-500'}>{r.reward}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── Billing Tab ───────────────────────────────── */}
                        {activeTab === 'billing' && (
                            <div className="w-full max-w-4xl mt-8 text-left">
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl mb-6">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                        <h2 className="text-xl font-semibold text-white">Billing & Invoices</h2>
                                        <button onClick={openBillingPortal} disabled={billingLoading || tierKey === 'free'} className="text-sm" style={{
                                            background: 'rgba(245, 166, 35, 0.15)', border: '1px solid rgba(245, 166, 35, 0.3)',
                                            color: '#F5A623', padding: '0.4rem 1rem', borderRadius: '6px',
                                            cursor: tierKey === 'free' ? 'default' : 'pointer', opacity: tierKey === 'free' ? 0.4 : 1,
                                        }}>
                                            {billingLoading ? 'Loading...' : 'Open Billing Portal'}
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Use the billing portal to update payment methods, change plans, cancel subscriptions, and manage tax settings.
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Current Plan</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: tierColor }}>{tierLabel}</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Status</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: tierKey === 'free' ? '#94a3b8' : '#4ade80' }}>
                                                {tierKey === 'free' ? 'Free' : 'Active'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-4">Invoice History</h3>
                                    <InvoiceList email={user.email || ''} />
                                </div>
                            </div>
                        )}

                        {/* ─── Usage Tab ──────────────────────────────────── */}
                        {activeTab === 'usage' && (
                            <div className="w-full max-w-4xl mt-8 text-left">
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl mb-6">
                                    <h2 className="text-xl font-semibold text-white mb-4">API Usage & Rate Limits</h2>
                                    <p className="text-sm text-slate-400 mb-4">
                                        Track your API consumption and rate limit status. Usage resets every minute for rate limits, and monthly for quota tracking.
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                        <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Rate Limit</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F5A623', fontFamily: 'var(--font-mono)' }}>
                                                {tierKey === 'free' ? '10' : tierKey.includes('operator') ? '120' : tierKey === 'institutional' ? '300' : '60'} req/min
                                            </div>
                                        </div>
                                        <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Current Tier</div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: tierColor }}>{tierLabel}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-4">
                                        Need higher limits? <Link href="/enterprise" className="text-blue-400 hover:text-blue-300">View enterprise plans</Link> for up to 300 req/min or unlimited access.
                                    </p>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                                    {activity.length === 0 ? (
                                        <p className="text-sm text-slate-500">No activity recorded yet.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {activity.map((entry) => (
                                                <div key={entry.id} className="flex items-center justify-between border-b border-slate-800 pb-2">
                                                    <div>
                                                        <p className="text-sm text-slate-300">{entry.description}</p>
                                                        <p className="text-xs text-slate-600">{entry.type} &middot; {entry.timestamp}</p>
                                                    </div>
                                                    <span className={`text-sm font-mono ${entry.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {entry.amount >= 0 ? '+' : ''}{entry.amount} PT
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quick Links */}
                        <div className="w-full max-w-4xl mt-6 text-left">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <Link href="/essays" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Essays</Link>
                                    <Link href="/events" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Events</Link>
                                    <Link href="/council" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Council</Link>
                                    <Link href="/intelligence" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Intelligence</Link>
                                    <Link href="/gift" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Gift a Sub</Link>
                                    <Link href="/referral" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">Referrals</Link>
                                    <Link href="/my-feed" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">My Feed</Link>
                                    <Link href="/api-docs" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg p-3 text-center text-sm text-slate-300 transition-colors">API Docs</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <button onClick={handleLogout} className="mt-8 text-sm text-slate-500 hover:text-slate-300" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
            </div>
        );
    }

    // ─── Login Form ────────────────────────────────────────────────
    return (
        <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Stakeholder Portal</h1>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
                Authentication required. Access to the Levelupmax progression tracker, billing management, API usage, and Performance Token ledgers.
            </p>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl max-w-sm w-full mt-8">
                <form className="space-y-4 text-left" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Enterprise Email</label>
                        <input type="email" placeholder="operator@enterprise.com" className="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Access Token</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md transition-colors mt-2">
                        {loading ? 'Authenticating...' : 'Initialize Session'}
                    </button>
                </form>
                <p className="text-xs text-slate-600 mt-6 text-center">
                    Secured by Firebase & AINEFF Authorization Protocol.
                </p>
            </div>
        </div>
    );
}
