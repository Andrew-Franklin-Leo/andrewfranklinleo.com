export const stpDocs = [
  {
    slug: "concepts",
    label: "Concepts",
    title: "The vocabulary of change",
    intro: "STP separates reality, observation, evidence, claim, state, transition, interpretation, and resolution so that a useful representation does not become a false certainty.",
    sections: [
      ["Reality to evidence", "Reality is encountered through observations and evidence. A claim records an assertion; it does not automatically become a verified state."],
      ["State and transition", "A state describes an entity under a scope and time. A transition records movement from one state to another through an event."],
      ["Resolution", "A resolution is a bounded projection of accessible evidence for a subscriber, objective, authority, time range, and level of detail."],
    ],
  },
  {
    slug: "architecture",
    label: "Architecture",
    title: "An interoperability layer between realities",
    intro: "Independent governments, enterprises, institutions, devices, people, agents, and scientific systems can preserve local authority while exposing compatible transition representations.",
    sections: [
      ["Private systems", "Each participant retains its own schema, storage, policies, workflows, and confidential evidence."],
      ["Public protocol", "STP standardizes the language crossing the boundary: identity, state, event, transition, time, evidence, authority, provenance, uncertainty, and integrity."],
      ["Derived worlds", "Interpreters and world-model engines compose transitions without claiming that one projection is the only valid view."],
    ],
  },
  {
    slug: "protocol-core",
    label: "Protocol Core",
    title: "The canonical transition",
    intro: "The protocol core stays deliberately small. Domain extensions add meaning without replacing the common transition contract.",
    sections: [
      ["Transition", "entity + state_before + event + state_after + time"],
      ["Trust context", "actor + authority + evidence + provenance + uncertainty + integrity"],
      ["Epistemic status", "observed, reported, claimed, reconstructed, inferred, predicted, and simulated remain distinct statuses."],
    ],
  },
  {
    slug: "compilers",
    label: "Compilers",
    title: "From private schemas to canonical transitions",
    intro: "Compilers translate local systems into STP without forcing SAP, a government database, a sensor platform, or a personal system to share its internal implementation.",
    sections: [
      ["Pipeline", "Identity → schema → semantic → state → transition → temporal → ontology → provenance → privacy → integrity."],
      ["Model assistance", "Language models can extract candidate structure from documents, but evidence and authority remain explicit fields."],
      ["Output", "The compiler produces a signed or otherwise integrity-protected canonical transition and its lineage."],
    ],
  },
  {
    slug: "federation",
    label: "Federation",
    title: "Sovereignty without isolation",
    intro: "Federation lets independently operated realities discover one another, exchange authorized transitions, and preserve disagreements as data.",
    sections: [
      ["Participant boundary", "A participant may expose public, discoverable, verifiable, authorized, confidential, or sealed information."],
      ["Exchange", "Discovery, subscriptions, state queries, transition streams, evidence references, delegation, revocation, and protocol negotiation belong at the federation boundary."],
      ["Conflict", "Conflicting observations remain attributable to their sources, times, authorities, and evidence instead of being silently overwritten."],
    ],
  },
  {
    slug: "resolution",
    label: "Resolution Engine",
    title: "Compile the world for a purpose",
    intro: "Subscribers request the minimum sufficient representation of reality for an objective rather than retrieving an imagined total world.",
    sections: [
      ["Request", "Resolve entities, time, spatial scope, semantic scope, causal scope, authority, privacy, evidence threshold, and objective."],
      ["Dimensions", "Resolution can vary spatially, temporally, organizationally, semantically, causally, economically, physically, operationally, and epistemically."],
      ["Output", "A resolution returns states, transitions, dependencies, evidence, uncertainty, conflicts, unknowns, and candidate futures."],
    ],
  },
  {
    slug: "extensions",
    label: "Extensions",
    title: "One core, many domains",
    intro: "Government, enterprise, financial, healthcare, supply-chain, manufacturing, scientific, historical, personal, device, and AI-agent systems can add domain semantics to the same core.",
    sections: [
      ["Government and institutions", "Represent public programs, infrastructure, authorities, services, and aggregate disclosures."],
      ["Enterprise and supply chain", "Represent facilities, capacity, inventory, dependencies, shipments, operations, and risk states."],
      ["Scientific and historical", "Represent observations, sources, claims, temporal constraints, reconstructions, and uncertainty."],
    ],
  },
  {
    slug: "developer",
    label: "Developer Resources",
    title: "A reference implementation path",
    intro: "The first implementation should compose existing standards and ordinary infrastructure rather than attempt a planetary system in one step.",
    sections: [
      ["Reference stack", "PostgreSQL, JSON or JSON-LD, Pydantic, event streams, object storage, signatures, temporal logic, and constraint evaluation."],
      ["Interfaces", "REST, GraphQL, gRPC, event streams, and MCP are access layers above the STP semantics."],
      ["MVP", "Three independent systems publish transitions; a federation stores lineage; a resolver produces distinct factory, bank, government, and AI views."],
    ],
  },
] as const;

export function getStpDoc(slug: string) {
  return stpDocs.find((doc) => doc.slug === slug);
}
