import { ValidationRequest, ValidationResult } from './types';
import { policyEngine } from './policy-engine';
import { auditLogger } from './audit-logger';
import { ratificationRouter } from './ratification-router';

function generateCorrelationId(): string {
  return `cor_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const actionValidator = {
  async validate(request: ValidationRequest): Promise<ValidationResult> {
    const correlationId = generateCorrelationId();
    const policies = await policyEngine.list(true);

    // Build context for policy evaluation
    const context: Record<string, unknown> = {
      agent: { id: request.agentId },
      action: request.action,
      ...request.context,
    };

    const { effect, matchedPolicies, reasons } = policyEngine.evaluate(policies, context);

    let ratificationId: string | undefined;

    if (effect === 'require_ratification') {
      const req = await ratificationRouter.create({
        agentId: request.agentId,
        action: `${request.action.type}:${request.action.target}`,
        reason: reasons.join('; '),
        severity: 'high',
      });
      ratificationId = req.id;
    }

    const result: ValidationResult = {
      allowed: effect === 'allow',
      effect,
      matchedPolicies,
      ratificationRequired: effect === 'require_ratification',
      ratificationId,
      reasons,
      timestamp: new Date().toISOString(),
    };

    // Always log to audit trail
    await auditLogger.log({
      agentId: request.agentId,
      action: request.action.type,
      target: request.action.target,
      result: effect === 'allow' ? 'allowed' : effect === 'deny' ? 'denied' : 'ratification_pending',
      matchedPolicies,
      correlationId,
    });

    return result;
  },
};
