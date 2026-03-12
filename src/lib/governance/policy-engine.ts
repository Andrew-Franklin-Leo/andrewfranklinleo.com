import { adminDb } from '@/lib/firebase/admin';
import { GovernancePolicy, PolicyCondition, PolicyEffect } from './types';

function generateId(): string {
  return `pol_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Simple field access: "action.type" -> obj.action.type
function getField(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((curr: unknown, key) => {
    if (curr && typeof curr === 'object') return (curr as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function evaluateCondition(condition: PolicyCondition, context: Record<string, unknown>): boolean {
  const fieldValue = getField(context, condition.field);
  const target = condition.value;

  switch (condition.operator) {
    case 'eq': return fieldValue === target;
    case 'ne': return fieldValue !== target;
    case 'gt': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue > target;
    case 'lt': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue < target;
    case 'gte': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue >= target;
    case 'lte': return typeof fieldValue === 'number' && typeof target === 'number' && fieldValue <= target;
    case 'in': return Array.isArray(target) && target.includes(fieldValue);
    case 'contains': return typeof fieldValue === 'string' && typeof target === 'string' && fieldValue.includes(target);
    default: return false;
  }
}

// In-memory cache with TTL
let policyCache: { policies: GovernancePolicy[]; loadedAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

export const policyEngine = {
  async create(policy: Omit<GovernancePolicy, 'id' | 'createdAt' | 'updatedAt'>): Promise<GovernancePolicy> {
    const now = new Date().toISOString();
    const full: GovernancePolicy = {
      ...policy,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    await adminDb.collection('governance_policies').doc(full.id).set(full);
    policyCache = null; // invalidate
    return full;
  },

  async get(id: string): Promise<GovernancePolicy | null> {
    const doc = await adminDb.collection('governance_policies').doc(id).get();
    return doc.exists ? (doc.data() as GovernancePolicy) : null;
  },

  async update(id: string, updates: Partial<GovernancePolicy>): Promise<void> {
    await adminDb.collection('governance_policies').doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    policyCache = null;
  },

  async delete(id: string): Promise<void> {
    await adminDb.collection('governance_policies').doc(id).delete();
    policyCache = null;
  },

  async list(activeOnly = true): Promise<GovernancePolicy[]> {
    const now = Date.now();
    if (policyCache && (now - policyCache.loadedAt) < CACHE_TTL_MS) {
      const cached = policyCache.policies;
      return activeOnly ? cached.filter(p => p.active) : cached;
    }

    const snap = await adminDb.collection('governance_policies')
      .orderBy('priority', 'desc')
      .get();
    const policies = snap.docs.map(d => d.data() as GovernancePolicy);
    policyCache = { policies, loadedAt: now };
    return activeOnly ? policies.filter(p => p.active) : policies;
  },

  evaluate(policies: GovernancePolicy[], context: Record<string, unknown>): {
    effect: PolicyEffect;
    matchedPolicies: string[];
    reasons: string[];
  } {
    const matched: string[] = [];
    const reasons: string[] = [];
    let finalEffect: PolicyEffect = 'allow';

    // Policies are sorted by priority (desc) — first match wins for deny/ratification
    for (const policy of policies) {
      const allConditionsMet = policy.conditions.every(c => evaluateCondition(c, context));

      if (allConditionsMet) {
        matched.push(policy.id);

        if (policy.effect === 'deny') {
          finalEffect = 'deny';
          reasons.push(`Policy "${policy.name}": denied`);
          break; // Deny is final
        }

        if (policy.effect === 'require_ratification') {
          finalEffect = 'require_ratification';
          reasons.push(`Policy "${policy.name}": requires human ratification`);
        }
      }
    }

    if (matched.length === 0) {
      reasons.push('No matching policies — default allow');
    }

    return { effect: finalEffect, matchedPolicies: matched, reasons };
  },

  invalidateCache(): void {
    policyCache = null;
  },
};
