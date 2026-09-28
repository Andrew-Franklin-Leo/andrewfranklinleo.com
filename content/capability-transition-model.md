---
entityId: MODEL-CAP-001
entityName: Capability Transition Model
entityType: model
version: "0.1"
status: seed
created: 2026-09-19
updated: 2026-09-19
origin: Intelligence to economic action loop
parent: SYSTEM-CIV-001
relatedConcepts:
  - IDEA-EST-001
evidence: []
experiments: []
ventures: []
dependencies:
  - SYSTEM-CIV-001
openQuestions:
  - Which variables best represent capability?
  - How should agency and verification enter the model?
states:
  - key: lifecycle
    value: seed
    asOf: 2026-09-19
  - key: formalization
    value: incomplete
    asOf: 2026-09-19
transitions:
  - transitionId: TRANS-CAP-001
    event: model_initialized
    from: unformulated
    to: seed
    occurredAt: 2026-09-19
    epistemicStatus: observed
    authority: Andrew Franklin Leo
    confidence: 0.99
  - transitionId: TRANS-CAP-002
    event: assumptions_exposed
    from: seed
    to: incomplete
    occurredAt: 2026-09-19
    epistemicStatus: reported
    authority: Andrew Franklin Leo
    confidence: 0.86
---

# Capability Transition Model

A formal representation of the path from intelligence to productive capability and then to measurable economic transition.

The first version is intentionally incomplete. Its purpose is to make assumptions visible before the model is used for prediction or capital allocation.
