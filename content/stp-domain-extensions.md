---
entityId: MODEL-STP-001
entityName: STP Domain Extensions
entityType: model
version: "0.1"
status: seed
created: 2026-09-28
updated: 2026-09-28
siteIds:
  - SITE-STP
parent: SYSTEM-STP-001
origin: State transition interoperability research
relatedConcepts: []
evidence: []
experiments: []
ventures: []
dependencies:
  - SYSTEM-STP-001
openQuestions:
  - How should domain vocabularies establish semantic compatibility?
states:
  - key: lifecycle
    value: seed
    asOf: 2026-09-28
  - key: extension_status
    value: proposed
    asOf: 2026-09-28
transitions:
  - transitionId: TRANS-STPX-001
    event: extension_model_defined
    from: core-only
    to: extensible
    occurredAt: 2026-09-28
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.84
---

# STP Domain Extensions

STP Core should remain small. Government, enterprise, financial, healthcare, supply-chain, manufacturing, scientific, historical, personal, device, and AI-agent systems should inherit the core transition semantics while adding domain-specific vocabularies and constraints.
