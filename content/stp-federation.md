---
entityId: SYSTEM-STP-005
entityName: STP Federation
entityType: system
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
  - How should a participant revoke or correct a public transition?
states:
  - key: lifecycle
    value: seed
    asOf: 2026-09-28
  - key: federation_status
    value: reference-model
    asOf: 2026-09-28
transitions:
  - transitionId: TRANS-STPF-001
    event: sovereignty_boundary_defined
    from: centralized
    to: federated
    occurredAt: 2026-09-28
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.9
---

# STP Federation

Federation allows participants to keep private state systems while exposing authorized projections through public or restricted interfaces. Discovery, subscriptions, transition exchange, evidence references, provenance, delegation, revocation, and conflict handling are federation concerns.
