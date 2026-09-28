---
entityId: SYSTEM-STP-003
entityName: STP Interpreters
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
  - How can interpretations remain comparable without becoming canonical truth?
states:
  - key: lifecycle
    value: seed
    asOf: 2026-09-28
  - key: interpretation_status
    value: conceptual
    asOf: 2026-09-28
transitions:
  - transitionId: TRANS-STPI-001
    event: interpretation_layer_separated
    from: coupled
    to: conceptual
    occurredAt: 2026-09-28
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.88
---

# STP Interpreters

An interpreter gives a canonical transition meaning in a particular context. A factory capacity reduction may become a supply-chain risk, a bank exposure signal, an insurance event, or a government indicator. These interpretations can coexist without changing the underlying transition.
