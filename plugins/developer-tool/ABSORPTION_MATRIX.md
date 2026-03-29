# Developer Tool Absorption Matrix

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool`.

This document is the root promotion ledger of the engine.
It exists to answer a control-plane question:

> when a tooling- or workflow-related donor family enters this workspace, where should its useful patterns land, which layer should own them, what should remain staged, deferred, or donor-only, and what conditions must be met before a donor can be treated as replacement-grade instead of merely present?

This matrix is the anti-chaos mechanism.
It prevents:

- vague absorption claims
- donor mirroring
- runtime shell drift
- knowledge-center duplication
- staging layers quietly becoming second doctrine centers
- subsystem maturity being described more optimistically than reality

## Source Provenance

- **Primary source:** current `developer-tool` root control plane and its active doctrine, staging, and runtime shell structure
- **Derived from:** root governance convergence, subsystem canonization, runtime-shell creation, and donor-family routing work across the matured developer-tool engine
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current developer-tool engine

---

## Core Rule

Nothing becomes canonical merely by existing in the workspace.

A donor pattern becomes part of `developer-tool` only after explicit promotion into one or more of:

- `references/` doctrine
- root governance docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`, `SKILL.md`)
- subtree control planes inside matured subsystems
- bounded staging layers inside selected subtrees
- runtime shell surfaces when operational ownership is clear
- `rules/`, `commands/`, `agents/`, and `skills/` as runtime entrypoints only after doctrine is stable

The allowed flow is:

`source reservoir -> canonical doctrine / root governance -> staging if needed -> runtime shell if operationally justified`

The forbidden flow is:

`source reservoir -> direct runtime dependency`

The goal is not fast ingestion.
The goal is layer-correct promotion.

---

## Absorption Surface Model

| Surface                                       | Role                                                      |
| --------------------------------------------- | --------------------------------------------------------- |
| `references/*` and canonical subtree doctrine | stable knowledge center                                   |
| root governance docs                          | route, classify, freeze ownership, govern promotion       |
| subtree control planes                        | local routing and maturity framing for matured subsystems |
| staging layers                                | hold adapted complexity not yet flattenable into doctrine |
| runtime shell surfaces                        | execute bounded operational workflows                     |
| donor/source reservoirs                       | upstream evidence and future extraction material          |

The doctrine is:

- doctrine explains what is true
- governance explains what belongs where
- staging holds unresolved but adapted complexity
- runtime executes operational flows
- donors remain evidence, not first-line UX

---

## Root Donor-to-Destination Ledger

| Donor Family                     | Primary Canonical Destination                                                                                   | Runtime / Staging Destination                                                                                                      | Notes                                                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `agent-skills-main`              | `references/agentic-system-basis/`, `references/ai-agent-memory/`, selected `references/*`                      | `skills/agentic-system-basis/`, selected `agents/` where justified                                                                 | agent workflows, bootstrap, memory protocol, coordination doctrine |
| `agentup-main`                   | `references/tool-ecosystem/`, `references/agentic-system-basis/`                                                | `skills/tool-ecosystem/` only where shell leverage is clear                                                                        | meta-skill and system packaging donor                              |
| `claude-code-skills-main`        | `references/tool-ecosystem/`, `references/agentic-system-basis/`, `references/build-and-deploy/` where relevant | `commands/`, `agents/`, `skills/tool-ecosystem/` after doctrinal curation                                                          | plugin, command, and workflow ecosystem donor                      |
| `claude-recall-main`             | `ai-agent-memory/README.md`, `references/ai-agent-memory/*`, `TRIGGER_SCOPE.md`                                 | `skills/ai-agent-memory/`, `commands/prime/memory-surface.md`, `plugins/violet-memory-lab/*` where runtime continuity is justified | recall, history, and continuity donor                              |
| `neural-memory-main`             | `references/ai-agent-memory/*`, selected root governance implications                                           | staging or future runtime collaboration only when bounded                                                                          | plugin-grade donor for memory and runtime ideas                    |
| `neural-memory-main - Copy`      | same conceptual destinations as above, treated independently                                                    | same as above                                                                                                                      | independent donor, not disposable duplicate                        |
| `outfitter-main`                 | `references/tool-ecosystem/`, `references/build-and-deploy/`, `references/agentic-system-basis/`                | `commands/`, `agents/plugin-auditor.md`, optional MCP/runtime surfaces only after clear ownership                                  | action registry, plugin/runtime/tooling doctrine donor             |
| `outfitter-main - Copy`          | same family as above, independent donor                                                                         | none by default                                                                                                                    | keep for validation and cross-checking patterns                    |
| `rust-self-learning-memory-main` | `references/ai-agent-memory/*`, selected `references/tool-ecosystem/*` where runtime/tooling patterns matter    | none by default                                                                                                                    | memory and learning donor; Rust specifics remain secondary here    |
| `skill-system-router`            | `references/tool-ecosystem/`, `TRIGGER_SCOPE.md`, subtree trigger docs                                          | `commands/route/choose-tool-surface.md` after doctrinal routing                                                                    | routing doctrine donor                                             |
| shell/terminal donors            | `references/shell-and-terminal/*`                                                                               | `skills/shell-and-terminal/`, selected shell-diagnostic agents                                                                     | shell posture donor family, not default runtime truth              |
| build/deploy donors              | `references/build-and-deploy/*`                                                                                 | `skills/build-and-deploy/`, `agents/build-deploy-diagnostician.md`                                                                 | CI/CD, release, and deploy governance donors                       |
| cross-platform donors            | `references/cross-platform-development/*`                                                                       | `skills/cross-platform-development/`, `agents/cross-platform-diagnostician.md`                                                     | portability and support-tier doctrine donors                       |
| data-processing donors           | `references/data-processing/*`, `references/data-agent-workflows.md`                                            | `skills/data-processing/`, `agents/data-processing-diagnostician.md`                                                               | extraction, normalization, and orchestration donors                |
| language-specialist donors       | `references/language-specialists/*`                                                                             | `skills/language-specialists/`, `agents/language-specialists-diagnostician.md`                                                     | bridge-shaped specialist guidance donors                           |

---

## By Canonical Subsystem

### `ai-agent-memory/`

Absorbs and governs:

- recall-before-act doctrine
- history and continuity routing
- memory trigger ownership
- memory-specific source governance
- governed staging subsystem under `v3-expansion/`
- bounded continuity runtime shell under `plugins/violet-memory-lab/`

Primary donors feeding this subsystem:

- `claude-recall-main`
- `agent-skills-main/skills/memory-protocol/`
- `Ref_agent_memory_plugin/unforgettable-vestige/`
- `neural-memory-main`
- `rust-self-learning-memory-main`

### `agentic-system-basis/`

Absorbs and governs:

- plugin-first Claude Code system doctrine
- activation and governance models
- coordination and ensemble patterns
- runtime activation posture for tool ecosystems

Primary donors feeding this subsystem:

- `agent-skills-main`
- `agentup-main`
- `claude-code-skills-main`
- selected `outfitter-main`

### `tool-ecosystem/`

Absorbs and governs:

- plugin shell laws
- component model
- command, hook, MCP, and LSP architecture
- settings and local-state patterns
- validation and audit patterns

Primary donors feeding this subsystem:

- `outfitter-main`
- `claude-code-skills-main`
- `skill-system-router`
- selected shell and runtime governance donors

### `shell-and-terminal/`

Absorbs and governs:

- shell discipline
- terminal ergonomics
- runtime shell governance
- session portability posture

Primary feed sources:

- existing shell-and-terminal subtree donors
- selected tooling and runtime patterns from `outfitter-main`

### `build-and-deploy/`

Absorbs and governs:

- release governance
- deployment orchestration
- supply-chain governance
- runtime boundaries at build and deploy time

Primary feed sources:

- existing build-and-deploy subtree
- selected `claude-code-skills-main`
- selected `outfitter-main`

### `data-processing/`

Absorbs and governs:

- deterministic extraction, validation, normalization, transformation, and output contracts
- data-agent workflow routing where orchestration becomes central

Primary feed sources:

- CSV, PDF, DOCX, documentation-engineering, and MCP-related donors
- selected `agent-skills-main` and `claude-code-skills-main` workflow donors when they affect topology rather than core stage truth

### `cross-platform-development/`

Absorbs and governs:

- platform strategy
- runtime differences across desktop, mobile, and web
- compatibility discipline and support tiers

Primary feed sources:

- existing cross-platform subtree donors
- selected plugin and runtime donors where platform behavior matters

### `language-specialists/`

Absorbs and governs:

- bridge-shaped language-specific guidance inside `developer-tool`
- explicit handoff to platform, interop, or dedicated heavy engines when depth outgrows bridge doctrine

Primary feed sources:

- C++, Kotlin, Swift, Flutter, PHP, PowerShell, and adjacent specialist donors
- selected cross-platform donors when the language question is really platform-shaped

---

## Runtime Shell Destinations

### Root runtime shell should do

- prime the correct subsystem posture
- route the task into the correct doctrinal lane
- run bounded diagnosis and audit
- preserve lifecycle continuity and handoff state
- expose explicit operational entrypoints only where repeated leverage exists

### Root runtime shell should not do

- become a donor archive browser
- bypass canonical doctrine because a command or agent exists
- let staging compete with doctrine as a first reading path
- pretend every matured subsystem already has its own dedicated runtime shell

### Subsystem-specific runtime reality

- `ai-agent-memory` has a real bounded runtime shell (`plugins/violet-memory-lab/`)
- `agentic-system-basis`, `tool-ecosystem`, `shell-and-terminal`, `build-and-deploy`, `data-processing`, `cross-platform-development`, and `language-specialists` are doctrine-mature but still primarily consume root runtime surfaces or subtree-local support packs rather than dedicated subsystem shells

The doctrine is:

- runtime shell growth must reflect actual subsystem maturity
- not donor richness or aspirational symmetry

---

## Staging Discipline

Promotion into staging is allowed when:

- the donor family contains a large coherent cluster of patterns
- immediate flattening would create unreadable mega-docs
- the staging zone remains clearly subordinate to the canonical lane
- the staging state is explicitly named in control-plane docs

Promotion into staging is not allowed when it would:

- preserve donor directory shape as active doctrine
- become the preferred reading path for ordinary tasks
- create a second doctrine center parallel to canonical references
- smuggle runtime behavior in through “temporary” module gravity

The doctrine is:

- staging is a governed intermediate state
- not a permanent architectural compromise

---

## Replacement-Grade Criteria

Before calling a donor family replacement-grade for `developer-tool`, ask:

- [ ] Has the family been mapped into the correct doctrinal lane or subsystem?
- [ ] Are runtime shell surfaces consuming canonical docs rather than donor material directly?
- [ ] Are staged modules clearly marked as staging, not source of truth?
- [ ] Has the shell/doctrine distinction remained visible?
- [ ] Is donor dependence shrinking rather than spreading?
- [ ] Can future cleanup or archival of the donor leave the engine readable and usable?
- [ ] Are subsystem maturity claims truthful about whether dedicated runtime shells exist yet?

Replacement-grade means the engine can stand on the canonized lesson without needing the donor as a default surface.

---

## Anti-Patterns

- promoting donors by directory resemblance instead of by knowledge role
- letting root runtime surfaces pretend every subsystem is equally shell-mature
- flattening operationally mixed donor clusters directly into doctrine without staging or governance
- using staging as an excuse to postpone doctrine ownership forever
- preserving donor abundance as if it were proof of maturity
- using the shell as a direct donor mirror
- letting runtime convenience outrun doctrine and governance ownership

---

## Cross-Links

Read this alongside:

- `README.md`
- `SKILL.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`
- subtree control planes (`*/README.md`, `*/INVENTORY.md`, `*/TRIGGER_SCOPE.md`, `*/ABSORPTION_MATRIX.md`)

---

## Status

- Engine: `developer-tool`
- Stage: canonical deep-fusion promotion ledger aligned to the current heavy-engine standard
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:

> “these are the donors that fed developer-tool.”

The reusable lesson is:

> “the absorption matrix is the engine’s promotion ledger: it records how donor families are deliberately transformed into doctrine, root governance, subtree control planes, staging zones, and bounded runtime surfaces while preserving subsystem maturity truth, avoiding donor mirrors, and making future replacement-grade cleanup decisions auditable.”
