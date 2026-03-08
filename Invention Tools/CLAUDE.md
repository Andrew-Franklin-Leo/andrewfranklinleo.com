# AUREYA OS — Build Governance

## Identity
You are building **Aureya OS** — the operational kernel for AI-Native Enterprises (AINEs).
This is working software, not documentation. Every output must be functional code or actionable configuration.

## Tech Stack
- **Frontend**: Single-file HTML apps using Tailwind CSS (CDN), Alpine.js, Chart.js
- **Backend Logic**: Embedded in-browser (localStorage + IndexedDB for persistence)
- **Data**: JSON-based entity models, NAICS industry classification with 8 entropy dimensions
- **AI Layer**: LLM-powered entropy analysis, action generation, and negotiation (API-ready stubs)
- **Build Tool**: Claude Code with subagent orchestration

## Architecture Rules
1. Every feature must work as a standalone single-file HTML app first
2. No build tools, no bundlers, no npm in production artifacts — CDN dependencies only
3. State persists in browser localStorage/IndexedDB
4. All UI follows the Aureya dark theme: #0F0F1A background, #7C3AED primary, #10B981 success, #F59E0B warning, #EF4444 danger
5. Mobile-first responsive design
6. Every component must have a clear data model defined as a JSON schema

## Core Domain Models

### AINE (AI-Native Enterprise)
```json
{
  "id": "aine_uuid",
  "name": "Enterprise Name",
  "naics_code": "541511",
  "sector": "PROFESSIONAL, SCIENTIFIC, AND TECHNICAL SERVICES",
  "description": "What this enterprise does",
  "entropy_scan": {
    "entropy_vector": "",
    "systemic_force": "",
    "chokepoint": "",
    "bottleneck": "",
    "pain_point": "",
    "challenge": "",
    "obstacle": "",
    "threat": ""
  },
  "actions": [],
  "connections": [],
  "arisea_id": null,
  "created_at": "ISO8601",
  "sovereignty_tier": "atom"
}
```

### Arisea (Community Instance)
```json
{
  "id": "arisea_uuid",
  "name": "Community Name",
  "leader_id": "aine_uuid",
  "members": ["aine_uuid"],
  "revenue_split": { "leader": 0.70, "platform": 0.20, "reserve": 0.10 },
  "created_at": "ISO8601"
}
```

## Development Rules
- Write tests as inline assertions when building logic
- Commit messages: `feat:`, `fix:`, `refactor:`, `docs:` prefixes
- No feature is done until it renders correctly and handles edge cases
- Subagents handle specialized tasks; main agent orchestrates
- Every PR-worthy change gets verified with a screenshot or console output

## What NOT To Do
- Do not write documents describing the system. Build the system.
- Do not create architecture diagrams. Create working applications.
- Do not add features that aren't immediately useful to a single user.
- Do not optimize for planetary scale. Optimize for one enterprise running today.
