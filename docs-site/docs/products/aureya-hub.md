---
title: Aureya Hub
sidebar_label: Aureya Hub
sidebar_position: 6
description: Model catalog, community platform, and one-click deployment for AI models from all providers.
---

# Aureya Hub

**The home for AI models.** Aureya Hub is the model discovery, sharing, and deployment platform of the AINEFF ecosystem. It serves as the central catalog where developers, researchers, and organizations browse, evaluate, and deploy models from every major provider alongside community-contributed fine-tunes, datasets, and tools.

---

## Core Capabilities

### Model Discovery

Browse and search the most comprehensive catalog of AI models available anywhere.

- **Universal catalog**: Models from OpenAI, Anthropic, Google, Meta, Mistral, Stability AI, and hundreds of community contributors in one searchable index
- **Advanced filtering**: Filter by task type (text generation, image generation, speech, code, embedding), model size, license, hardware requirements, and performance benchmarks
- **Trending models**: Real-time rankings of the most downloaded, most discussed, and highest-rated models
- **Collections**: Curated collections organized by use case (coding assistants, document analysis, creative writing, scientific research)
- **Recommendations**: Personalized model recommendations based on your usage patterns and hardware profile

### Model Cards

Every model in the catalog includes a comprehensive model card providing the information needed to evaluate fitness for purpose.

**Standard Model Card Contents**

| Section | Description |
|---------|-------------|
| **Overview** | Model name, author, description, version history |
| **Architecture** | Model type, parameter count, context length, training methodology |
| **Benchmarks** | Performance on standard benchmarks (MMLU, HumanEval, MATH, etc.) with comparisons to peers |
| **Usage Examples** | Code snippets showing how to load and use the model in Python, JavaScript, and via API |
| **Licensing** | License type, commercial use permissions, attribution requirements |
| **Hardware Requirements** | Minimum and recommended GPU VRAM, RAM, and disk space for each quantization level |
| **Fine-Tuning Guide** | Instructions for fine-tuning on custom data with recommended hyperparameters |
| **Known Limitations** | Documented weaknesses, biases, and failure modes |
| **Community Reviews** | User ratings, reviews, and use case reports |
| **Governance Metadata** | ORF Protocol compliance status, Fragility Codex risk rating, Atomic Constraint annotations |

### Community Contributions

Aureya Hub is not just a catalog. It is a community platform where practitioners share their work.

- **Fine-tuned models**: Upload models fine-tuned on domain-specific data with training configuration and evaluation results
- **Datasets**: Share and discover training datasets with standardized metadata, preview capabilities, and data cards
- **Spaces**: Interactive demos hosted on Aureya infrastructure where users can try models before downloading
- **Discussions**: Model-specific discussion threads for bug reports, use case sharing, and technical questions
- **Organizations**: Create organization profiles to publish models, datasets, and spaces under a shared namespace
- **Leaderboards**: Community-maintained benchmarks and leaderboards for specific domains and tasks

### One-Click Deployment

Deploy any model from the catalog to your preferred infrastructure with a single action.

**Deployment Targets**

| Target | Description | Latency | Cost |
|--------|-------------|---------|------|
| **Aureya Local** | Download and run on your local machine | Lowest (no network) | Free (your hardware) |
| **Aureya Cloud** | Deploy to managed Aureya inference infrastructure | Low | Pay-per-token |
| **Custom Endpoint** | Deploy to your own cloud (AWS, GCP, Azure) via container | Variable | Your cloud costs |
| **Serverless** | Auto-scaling serverless inference with zero cold-start for popular models | Low | Pay-per-request |

**Deployment Configuration**

```yaml
# Example deployment configuration
model: meta-llama/llama-3-70b-instruct
target: aureya-cloud
quantization: q4_k_m
replicas: 2
max_batch_size: 32
auto_scaling:
  min_replicas: 1
  max_replicas: 10
  target_utilization: 0.7
rate_limit:
  requests_per_minute: 100
authentication:
  type: api_key
```

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                       Aureya Hub                            │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Web Interface                        │  │
│  │  ┌─────────┐ ┌───────────┐ ┌────────┐ ┌──────────┐  │  │
│  │  │ Browse  │ │  Model    │ │ Spaces │ │Community │  │  │
│  │  │ Catalog │ │  Cards    │ │  Demos │ │Profiles  │  │  │
│  │  └─────────┘ └───────────┘ └────────┘ └──────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │                    Hub API                            │  │
│  │                                                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │  │
│  │  │ Search & │  │  Model   │  │   Deployment       │ │  │
│  │  │ Discovery│  │  Registry│  │   Orchestrator     │ │  │
│  │  └──────────┘  └──────────┘  └────────────────────┘ │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │  │
│  │  │ Dataset  │  │  Spaces  │  │   Governance       │ │  │
│  │  │ Registry │  │  Runtime │  │   Engine           │ │  │
│  │  └──────────┘  └──────────┘  └────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │              Storage Layer                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │  │
│  │  │  Model   │  │ Dataset  │  │   Metadata         │ │  │
│  │  │  Blobs   │  │  Blobs   │  │   Database         │ │  │
│  │  └──────────┘  └──────────┘  └────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
         │                │                │
    ┌────▼────┐    ┌──────▼──────┐   ┌────▼──────────┐
    │ Aureya  │    │ Aureya      │   │ Cloud         │
    │ Local   │    │ Cloud       │   │ Providers     │
    │         │    │ Inference   │   │ (AWS/GCP/     │
    │         │    │             │   │  Azure)       │
    └─────────┘    └─────────────┘   └───────────────┘
```

### Technical Details

- **Model storage**: Content-addressed blob store with deduplication across model versions
- **Search engine**: Hybrid keyword + semantic search with faceted filtering
- **Spaces runtime**: Containerized application hosting with GPU access for interactive demos
- **API**: RESTful API with Python and JavaScript SDKs for programmatic access
- **Git-based versioning**: Models and datasets are versioned using Git LFS, enabling branching, diffing, and pull requests on model artifacts

---

## Integration with the AINEFF Ecosystem

### Aureya Local

Aureya Hub is the primary model source for Aureya Local. The `aureya pull` CLI command and the GUI model library both query Hub's catalog. Model metadata, quantization options, and hardware recommendations flow from Hub to Local.

### Aureya Code

Developers can browse and pull models from Hub directly within Aureya Code. When a project requires local inference (for embedding generation, code completion, or testing), Aureya Code queries Hub for the optimal model given the project's hardware constraints.

### Aureya Notebook

Research notebooks that use custom models source them from Hub. Model cards provide the documentation researchers need to understand model capabilities and limitations.

### Aureya Builder

Applications built with Aureya Builder can specify model requirements in their configuration. Builder resolves these requirements against Hub's catalog and provisions the appropriate inference backend.

### Tower Control

Tower Control uses Hub's model registry as the authoritative source for model governance metadata. When a model's governance status changes (new vulnerability discovered, license change, benchmark regression), Tower Control propagates alerts to all ecosystem products using that model.

---

## Governance and the ORF Protocol

Aureya Hub enforces Atomic Constraints at the model distribution layer of the 15-Layer Reality Stack:

- **Model provenance**: Every model includes cryptographic signatures verifying its origin and integrity. Models without valid provenance are flagged in the catalog
- **Governance metadata**: Model cards include ORF Protocol compliance status, indicating whether the model has been evaluated against the Fragility Codex risk categories
- **License enforcement**: Deployment targets respect model licensing. A model licensed for research-only use cannot be deployed to a commercial inference endpoint
- **Vulnerability tracking**: Known vulnerabilities (adversarial attacks, bias issues, safety failures) are documented in model cards and trigger notifications to users who have deployed the affected model
- **Community moderation**: Reported models undergo governance review by the Constraint Council before removal or restriction
- **Pre-Incident Governance**: Models are evaluated for risk before publication, not after incidents occur

---

## Pricing

| Feature | Free | Pro ($9/mo) | Enterprise ($99/mo) |
|---------|------|------------|-------------------|
| Browse and search catalog | Yes | Yes | Yes |
| Download public models | Yes | Yes | Yes |
| Public model uploads | Yes | Yes | Yes |
| Community participation | Yes | Yes | Yes |
| Spaces (interactive demos) | 1 | 10 | Unlimited |
| Private models | -- | 10 | Unlimited |
| Private datasets | -- | 5 | Unlimited |
| Organization profiles | -- | 1 | Unlimited |
| Aureya Cloud inference | Pay-per-token | Included credits | Volume pricing |
| Custom deployment targets | -- | Yes | Yes |
| Model governance dashboard | -- | -- | Yes |
| SSO/SAML | -- | -- | Yes |
| Dedicated storage | -- | -- | Custom |
| SLA | -- | -- | 99.9% |
| Priority support | -- | Email | Dedicated |
| Storage | 10 GB | 100 GB | Custom |

---

## Competitive Positioning

Aureya Hub competes in the model platform space alongside Hugging Face, Replicate, and Together AI. The key differentiators are:

1. **One-click to Aureya Local**: Seamless path from discovery to local execution, unique to the Aureya ecosystem
2. **Governance-first model cards**: ORF Protocol compliance metadata, Fragility Codex risk ratings, and Atomic Constraint annotations that no competitor provides
3. **Universal catalog**: Models from all providers in one searchable index, not limited to open-source or a single provider
4. **Ecosystem deployment**: Deploy to Local, Cloud, or custom infrastructure with consistent configuration
5. **Constraint Council oversight**: Community moderation backed by formal governance processes rather than ad-hoc content policies
6. **Integrated versioning**: Git-based model versioning with branch, diff, and pull request workflows

Aureya Hub is the foundation of the AINEFF model supply chain, ensuring that every model used across the ecosystem meets the provenance, governance, and quality standards demanded by the ORF Protocol.
