---
entityId: IDEA-EST-001
entityName: Economic State Transition
entityType: idea
version: "0.2"
status: developing
created: 2026-09-19
updated: 2026-09-19
siteIds:
  - SITE-ROOT
  - SITE-AUREYA
origin: Capability and economic coordination research
parent: SYSTEM-CIV-001
relatedConcepts:
  - IDEA-OAS-001
evidence: []
experiments: []
ventures:
  - VENTURE-OAS-001
dependencies: []
openQuestions:
  - Can an economic state transition be measured consistently across institutions?
  - What evidence is sufficient for settlement and financing?
states:
  - key: lifecycle
    value: developing
    asOf: 2026-09-19
  - key: verification
    value: unproven
    asOf: 2026-09-19
transitions:
  - transitionId: TRANS-EST-001
    event: hypothesis_formulated
    from: unformulated
    to: developing
    occurredAt: 2026-09-19
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.83
  - transitionId: TRANS-EST-002
    event: measurement_problem_opened
    from: developing
    to: verification-needed
    occurredAt: 2026-09-19
    epistemicStatus: reported
    authority: Andrew Franklin Leo
    confidence: 0.91
---

# Economic State Transition

An economic state transition describes measurable movement from one condition of capability, production, coordination, or value to another.

The developing hypothesis is that verified transitions can become the primitive around which attribution, settlement, and capital allocation are organized.
