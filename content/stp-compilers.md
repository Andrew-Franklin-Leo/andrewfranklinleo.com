---
entityId: SYSTEM-STP-002
entityName: STP Compiler Family
entityType: system
version: "0.1"
status: developing
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
  - How should private schemas declare semantic mappings?
states:
  - key: lifecycle
    value: developing
    asOf: 2026-09-28
  - key: compilation_status
    value: conceptual
    asOf: 2026-09-28
transitions:
  - transitionId: TRANS-STPC-001
    event: compiler_pipeline_defined
    from: unstructured
    to: conceptual
    occurredAt: 2026-09-28
    epistemicStatus: claimed
    authority: Andrew Franklin Leo
    confidence: 0.9
---

# STP Compiler Family

Compilers translate local representations into the public State Transition Protocol. The private system remains authoritative for its own data and workflow.

The compiler family includes identity, schema, semantic, state, transition, temporal, ontology, provenance, and privacy compilers. A language model may assist semantic extraction, but it does not decide whether a claim is true.
