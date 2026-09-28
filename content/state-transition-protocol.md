---
entityId: SYSTEM-STP-001
entityName: State Transition Protocol
entityType: system
version: "0.1"
status: developing
created: 2026-09-28
updated: 2026-09-28
siteIds:
  - SITE-ROOT
  - SITE-STP
origin: State transition interoperability research
relatedConcepts:
  - IDEA-EST-001
evidence: []
experiments: []
ventures: []
dependencies: []
openQuestions:
  - Which transition semantics are universal enough for the core?
  - What is the smallest federation that proves interoperability?
states:
  - key: lifecycle
    value: developing
    asOf: 2026-09-28
  - key: protocol_status
    value: reference-architecture
    asOf: 2026-09-28
transitions:
  - transitionId: TRANS-STP-001
    event: architecture_formulated
    from: concept
    to: reference-architecture
    occurredAt: 2026-09-28
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.86
---

# State Transition Protocol

The State Transition Protocol is a proposed interoperability layer for independently operated realities. It provides a common language for entities, states, events, transitions, time, evidence, authority, provenance, and uncertainty without requiring private systems to become identical or public.

The protocol is a compiler target, not a universal database. Its purpose is to make state change composable and to let subscribers request a provenance-linked resolution of reality for a particular scope and objective.

## Core loop

Reality becomes observable state. Private systems compile state changes into canonical transitions. Interpreters derive domain meaning. Resolution engines produce authorized views for people, institutions, and AI systems.
