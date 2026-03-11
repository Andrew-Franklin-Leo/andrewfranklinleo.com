---
title: Aureya Local
sidebar_label: Aureya Local
sidebar_position: 2
description: Run, create, and share LLMs locally on any operating system with cloud bridge and remote endpoint capabilities.
---

# Aureya Local

**Run, create, and share LLMs locally.** Aureya Local is the local inference engine of the AINEFF ecosystem, giving developers, researchers, and enterprises full control over model execution without sending data to third-party servers. When cloud capabilities are needed, the Pro tier provides a seamless bridge to proprietary APIs and a private remote endpoint accessible from anywhere.

---

## Core Capabilities

### Local Model Execution

Aureya Local runs large language models directly on your hardware. No internet connection required for inference. No data leaves your machine.

- **Cross-platform support**: Native binaries for Windows, macOS (Intel and Apple Silicon), and Linux (x86_64, ARM64)
- **Hardware acceleration**: Automatic detection and use of NVIDIA CUDA, AMD ROCm, Apple Metal, and Intel oneAPI
- **Memory management**: Intelligent model quantization (Q4, Q5, Q8, FP16) with automatic selection based on available VRAM and RAM
- **Concurrent models**: Run multiple models simultaneously with configurable memory allocation per model
- **Model formats**: Native support for GGUF, SafeTensors, ONNX, and proprietary Aureya format (.aym)

### Streamlined Interface

Two interfaces designed for different workflows, both providing identical functionality.

**CLI Interface**

```bash
# Pull and run a model
aureya pull mistral-7b
aureya run mistral-7b

# Run with specific quantization
aureya run llama3-70b --quant q4_k_m

# List available models
aureya list

# Serve as API endpoint
aureya serve --port 11434
```

**GUI Interface**

The Aureya Local desktop application provides a visual interface for users who prefer graphical interaction:

- Model library browser with search, filtering by size/capability/license
- One-click download with progress tracking and integrity verification
- Chat interface for interactive model testing
- System resource monitor showing VRAM, RAM, CPU, and GPU utilization
- Configuration panel for model parameters (temperature, top_p, context length, system prompts)
- Batch inference queue for processing multiple prompts

### Model Library

A curated catalog of models optimized for Aureya Local, synchronized with Aureya Hub.

- **One-click download**: Select a model, click download, and it is ready to run
- **Automatic updates**: Models can be configured to auto-update when new versions are published
- **Version management**: Keep multiple versions of the same model and switch between them
- **Custom models**: Import your own fine-tuned models or create new ones using Aureya Local's training tools
- **Model cards**: Detailed information including benchmarks, licensing, recommended hardware, and community ratings

### Cloud Bridge (Pro Feature)

The cloud bridge provides a unified API that routes requests to the optimal backend, whether local or cloud.

- **Compatible API interface**: Expose local models through an OpenAI-compatible API, or route requests to OpenAI, Anthropic, Google, Mistral, and other providers through a single endpoint
- **Intelligent routing**: Configure rules to route requests based on model capability, latency requirements, cost constraints, or data sensitivity
- **Request transformation**: Automatic prompt format conversion between providers (ChatML, Llama format, Anthropic format)
- **Response normalization**: All providers return responses in a consistent format regardless of backend
- **Cost tracking**: Real-time spend tracking across all cloud providers with configurable budget limits
- **Failover**: Automatic fallback from cloud to local (or vice versa) if the primary backend is unavailable

### Private Remote Endpoint (Pro Feature)

Access your Aureya Local instance from anywhere without exposing your home network or relying on your home hardware being online.

- **Relay architecture**: Traffic routes through Aureya's relay infrastructure, eliminating the need for port forwarding or dynamic DNS
- **End-to-end encryption**: All traffic between your client and Aureya Local instance is encrypted with TLS 1.3
- **Authentication**: API key and OAuth2 authentication for remote access
- **No home hardware dependency**: When your local machine is offline, requests automatically route to Aureya cloud inference (Pro tier) so your endpoint never goes down
- **Custom domain**: Map your endpoint to a custom domain (e.g., `ai.yourcompany.com`)
- **Rate limiting**: Configurable rate limits to prevent abuse of your remote endpoint

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Aureya Local Host                      │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │   CLI    │  │   GUI    │  │    API Server          │ │
│  │ Interface│  │ Desktop  │  │  (OpenAI-compatible)   │ │
│  └────┬─────┘  └────┬─────┘  └───────────┬────────────┘ │
│       │              │                    │              │
│       └──────────────┼────────────────────┘              │
│                      │                                   │
│              ┌───────▼────────┐                          │
│              │  Router Layer  │                          │
│              └───┬───────┬───┘                          │
│                  │       │                              │
│          ┌───────▼──┐ ┌──▼───────────┐                 │
│          │  Local   │ │ Cloud Bridge │                 │
│          │ Inference│ │   (Pro)      │                 │
│          └───┬──────┘ └──────┬───────┘                 │
│              │               │                          │
│       ┌──────▼──────┐  ┌────▼─────────────┐           │
│       │ Model Store │  │ Provider Adapters│           │
│       │  (GGUF,     │  │ OpenAI, Anthropic│           │
│       │  SafeTensors│  │ Google, Mistral  │           │
│       │  ONNX, .aym)│  │ + Custom         │           │
│       └─────────────┘  └──────────────────┘           │
│                                                          │
│              ┌───────────────────┐                       │
│              │  Remote Endpoint  │                       │
│              │  Relay (Pro)      │──── Aureya Relay ─── │
│              └───────────────────┘     Infrastructure    │
└──────────────────────────────────────────────────────────┘
```

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 10, macOS 12, Ubuntu 20.04 | Latest stable release |
| RAM | 8 GB | 32 GB+ |
| GPU VRAM | None (CPU inference) | 8 GB+ (NVIDIA RTX 3060 or equivalent) |
| Disk | 10 GB free | 100 GB+ SSD for model storage |
| CPU | 4 cores | 8+ cores with AVX2 support |

---

## Integration with the AINEFF Ecosystem

### Aureya Hub

Aureya Local is the primary consumer of models published to Aureya Hub. The `aureya pull` command downloads models directly from Hub, and the GUI model library is powered by Hub's API. Community ratings, benchmarks, and model cards from Hub are displayed in Aureya Local's interface.

### Aureya Code

Developers using Aureya Code can configure local inference through Aureya Local as their AI backend. This enables fully offline coding assistance with zero data exfiltration, critical for enterprises working on proprietary codebases.

### Aureya Notebook

Research notebooks can query Aureya Local models for source-grounded analysis, keeping sensitive research data entirely on-premises.

### Tower Control

Aureya Local reports anonymized telemetry (opt-in) to Tower Control for ecosystem health monitoring. Tower Control can push model recommendations and configuration updates to Aureya Local instances based on hardware profiles and usage patterns.

---

## Governance and the ORF Protocol

Aureya Local enforces Atomic Constraints at the inference layer of the 15-Layer Reality Stack:

- **Model provenance**: Every model downloaded through Aureya Hub includes a cryptographic signature and governance metadata specifying permitted use cases
- **Output filtering**: Configurable output filters aligned with the Fragility Codex risk categories
- **Audit logging**: All inference requests and responses can be logged locally for compliance and review
- **Pre-Incident Governance**: The cloud bridge enforces governance rules before routing requests to external providers, preventing policy violations from reaching third-party APIs

---

## Pricing

| Feature | Free | Pro ($19/mo) | Enterprise ($99/mo) |
|---------|------|-------------|-------------------|
| Local model execution | Yes | Yes | Yes |
| CLI interface | Yes | Yes | Yes |
| GUI desktop app | Yes | Yes | Yes |
| OpenAI-compatible API server | Yes | Yes | Yes |
| Model library (Aureya Hub) | Yes | Yes | Yes |
| Custom model import | Yes | Yes | Yes |
| Cloud bridge (multi-provider) | -- | Yes | Yes |
| Private remote endpoint | -- | Yes | Yes |
| Custom domain for endpoint | -- | -- | Yes |
| Fleet management (multi-node) | -- | -- | Yes |
| Centralized model governance | -- | -- | Yes |
| SSO and RBAC | -- | -- | Yes |
| Dedicated support | -- | -- | Yes |
| Usage analytics dashboard | -- | Basic | Advanced |

### Enterprise Fleet Management

The Enterprise tier enables organizations to manage Aureya Local across hundreds or thousands of machines:

- **Centralized model distribution**: Push approved models to all nodes from a central dashboard
- **Policy enforcement**: Define and enforce inference policies (allowed models, parameter ranges, output filters) across the fleet
- **Usage monitoring**: Aggregate usage statistics across all nodes with per-team and per-user breakdowns
- **Hardware inventory**: Automatic discovery and cataloging of GPU and CPU resources across the organization
- **Scheduled updates**: Roll out model and software updates on a controlled schedule with canary deployments

---

## Competitive Positioning

Aureya Local competes in the local LLM execution space alongside tools like Ollama, LM Studio, and GPT4All. The key differentiators are:

1. **Cloud bridge**: No competitor offers a unified API that seamlessly routes between local and cloud providers
2. **Remote endpoint**: Access your local models from anywhere without infrastructure management
3. **Ecosystem integration**: Deep integration with Aureya Code, Aureya Notebook, Aureya Hub, and the broader AINEFF platform
4. **Enterprise fleet management**: Purpose-built for organizations managing hundreds of inference nodes
5. **ORF Protocol governance**: Built-in compliance and governance features that no standalone tool provides

Aureya Local is not just a model runner. It is the inference foundation of an autonomous AI ecosystem, designed to give users full control over where and how their AI workloads execute while maintaining the governance standards demanded by the ORF Protocol.
