# Rust Coding Engine Inventory

## Purpose

Define the canonical inventory snapshot of `rust-coding-engine` in its current deep-fusion stage.

This document answers four questions:

1. What already exists as canonical Rust doctrine?
2. What runtime shell surfaces are active today?
3. What still remains donor-side, staged, or not yet fully fused?
4. Which surfaces are canonical now versus still transitional or governed as staging?

It is not a historical shell-creation note anymore.
It is the governance snapshot for the engine as it currently stands.

---

## Layer Model

| Layer              | Meaning                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Canonical doctrine | stable Rust knowledge center under `rust-coding-engine`                                              |
| Runtime shell      | plugin-first activation, routing, diagnosis, and lifecycle surfaces                                  |
| Donor reservoirs   | upstream Rust rule sets, repos, books, articles, and interop bundles                                 |
| Staging zones      | internal module containers and repo-case/staged complexity that are not yet the default reading path |

The doctrine is:

- doctrine is the knowledge center
- runtime shell is the operational layer
- donor reservoirs are evidence
- staging zones exist to contain unresolved complexity without becoming a second doctrine tree

---

## Canonical Doctrine Inventory

### Root control plane

Canonical now:

- `SKILL.md`
- `README.md`
- `INVENTORY.md`
- `ABSORPTION_MATRIX.md`
- `TRIGGER_SCOPE.md`
- `references/INDEX.md`
- `references/governance/INDEX.md`
- `references/governance/source-reservoir-map.md`

These files now form the root control and governance plane of the engine.

### Doctrine lane indexes

Canonical now:

- `references/foundations/INDEX.md`
- `references/architecture/INDEX.md`
- `references/async-concurrency/INDEX.md`
- `references/error-patterns/INDEX.md`
- `references/production/INDEX.md`
- `references/quality/INDEX.md`
- `references/ecosystem/INDEX.md`
- `references/interop/INDEX.md`
- `references/repo-cases/INDEX.md`
- `references/checklists/INDEX.md`
- `references/playbooks/INDEX.md`
- `references/books/INDEX.md`
- `references/learning-path/INDEX.md`
- `references/cross-language/INDEX.md`

### Foundations lane

Canonical now:

- `references/foundations/rust-foundations-ownership-memory-safety.md`
- `references/foundations/rust-idiomatic-style-and-patterns.md`
- `references/foundations/rust-ownership-cookbook.md`

Role:

- baseline Rust mental model
- ownership, borrowing, and lifetime doctrine
- idiomatic naming, API, and semantic type posture

### Architecture lane

Canonical now:

- `references/architecture/rust-architecture-and-scaffolding.md`
- `references/architecture/rust-library-development-and-cargo-mastery.md`
- `references/architecture/rust-architecture-decision-trees.md`
- `references/architecture/rust-advanced-systems-and-tooling.md`
- `references/architecture/rust-axum-service-architecture-and-thin-adapters.md`
- `references/architecture/rust-ecs-and-data-oriented-architecture.md`

Role:

- project shape selection
- library and workspace boundaries
- service, ECS, tooling, and systems architecture

### Async and concurrency lane

Canonical now:

- `references/async-concurrency/rust-concurrency-decision-matrix.md`
- `references/async-concurrency/rust-async-concurrency-deep-patterns.md`

Role:

- workload-shape-first concurrency choice
- runtime health, task lifecycle, channels, synchronization, cancellation, and backpressure

### Error-patterns lane

Canonical now:

- `references/error-patterns/rust-error-handling-patterns.md`
- `references/error-patterns/result-option-match-posture.md`
- `references/error-patterns/rust-compiler-error-recovery-patterns.md`
- `references/error-patterns/rust-error-fix-strategies.md`
- `references/error-patterns/rust-error-pattern-catalog.md`
- `references/error-patterns/rust-error-handling-security-checklist.md`
- `references/error-patterns/handling-rust-errors-elegantly-doctrine.md`

Role:

- error surface selection
- compiler-recovery and live repair
- panic discipline and secure disclosure
- narrative error judgment

### Production lane

Canonical now:

- `references/production/rust-production-patterns.md`
- `references/production/rust-performance-patterns.md`
- `references/production/rust-logging-and-observability-best-practices.md`
- `references/production/rust-sdk-ci-and-multi-surface-release-pipelines.md`

Role:

- runtime and operational truth
- performance and observability
- release graphs and multi-surface delivery

### Quality lane

Canonical now:

- `references/quality/rust-quality-testing-benchmarking-documentation.md`
- `references/quality/rust-testing-patterns.md`
- `references/quality/rustdoc-mastery.md`
- `references/quality/rust-style-and-lint-governance.md`
- `references/quality/rust-doc-examples-discipline.md`
- `references/quality/rust-workspace-lint-pipeline-discipline.md`
- `references/quality/rust-public-api-documentation-and-trait-surface-discipline.md`

Role:

- testing, docs, lint, examples, and public API quality
- proof surfaces and engineering discipline

### Ecosystem lane

Canonical now:

- `references/ecosystem/rust-crate-ecosystem-navigator.md`
- `references/ecosystem/rust-ecosystem-discovery.md`
- `references/ecosystem/rust-domain-specific-patterns.md`

Role:

- crate-family selection
- dependency due diligence
- domain-pressure routing

### Interop lane

Canonical now:

- `references/interop/rust-ffi-and-interop-overview.md`
- `references/interop/boundary-activation-model.md`
- `references/interop/rust-ffi-mastery-c-cpp-deep-dive.md`
- `references/interop/rust-pyo3-maturin-bindings.md`
- `references/interop/rust-node-native-addon-posture.md`
- `references/interop/rust-typescript-bridge-patterns.md`
- `references/interop/wasm-bindgen-posture.md`
- `references/interop/rust-tauri-core-shell-and-ipc-boundaries.md`
- `references/interop/rust-cross-language-workflows.md`
- `references/interop/rust-interop-testing-and-audit-discipline.md`

Role:

- FFI, bindings, generated contracts, hybrid shells, workflow coordination, and audit discipline

### Repo-cases lane

Canonical now:

- `references/repo-cases/case-study-governance.md`
- `references/repo-cases/nova-vm-architecture.md`
- `references/repo-cases/codeyourpcb-workspace-patterns.md`
- `references/repo-cases/clean-hexagonal-workspace-rust.md`

Role:

- donor-grade architecture evidence
- cleanup-safe case-study extraction
- repo-scale lessons routed back into canonical doctrine

### Checklists and playbooks

Canonical now:

- `references/checklists/rust-engine-checklist.md`
- `references/checklists/rust-engine-checklist-expanded.md`
- `references/playbooks/rust-migration-and-transition.md`
- `references/playbooks/rust-refactor-toolkit.md`
- `references/playbooks/rust-anti-pattern-detection-and-migration-ladders.md`

Role:

- fast verification
- broad review coverage
- migration, refactor, and anti-pattern recovery

### Books, learning path, and cross-language support

Canonical now:

- `references/books/zero-to-production-backend-service-doctrine.md`
- `references/learning-path/rust-learning-path-01-coding-styles-and-idioms.md` through `rust-learning-path-09-understanding-pointers.md`
- `references/cross-language/go-error-handling-patterns.md`
- `references/cross-language/java-error-handling-patterns.md`
- `references/cross-language/javascript-typescript-error-handling-patterns.md`
- `references/cross-language/python-error-handling-patterns.md`

Role:

- long-form doctrinal reinforcement
- progressive study/onboarding
- contrastive reasoning after Rust doctrine is already clear

---

## Runtime Shell Inventory

### Manifest

Canonical and active now:

- `.claude-plugin/plugin.json`

### Hooks

Canonical and active now:

- `hooks/hooks.json`
- `hooks/scripts/session-start-prime.sh`
- `hooks/scripts/precompact-handoff.sh`
- `hooks/scripts/stop-review.sh`

### Commands

Canonical and active now:

- `commands/prime/rust-foundations.md`
- `commands/prime/rust-interop.md`
- `commands/diagnose/borrow-checker.md`
- `commands/route/choose-concurrency-pattern.md`
- `commands/route/choose-interop-path.md`

### Agents

Canonical and active now:

- `agents/borrow-checker-diagnostician.md`
- `agents/rust-architecture-reviewer.md`
- `agents/ffi-interop-scout.md`
- `agents/performance-surgeon.md`

### Bridge skills

Canonical and active now:

- `skills/foundations/`
- `skills/ownership-and-types/`
- `skills/async-and-concurrency/`
- `skills/architecture/`
- `skills/interop/`
- `skills/docs-and-quality/`
- `skills/production-patterns/`

These route into doctrine; they do not replace it.

### Rule-index zones

Canonical and active now:

- `rules/ownership/INDEX.md`
- `rules/async/INDEX.md`
- `rules/api/INDEX.md`
- `rules/error/INDEX.md`
- `rules/testing/INDEX.md`
- `rules/perf/INDEX.md`
- `rules/style/INDEX.md`

These indexes organize shell-law surfaces but are not the first doctrinal reading path.

---

## Donor Reservoir Inventory

### Rule and plugin donor families

Active as source truth, not canonical reading path:

- `rust-skills`
- `rust-skills-main`
- `rust-skills-main2`
- `rust-style`
- `rust-style (1)`
- `rust-style (2)`
- `rust-style-guidelines`
- `rust-style-lint`
- `flow-skills-rust`

### Architecture and service donors

Active as source truth, not canonical reading path:

- `nova-main`
- `codeyourpcb-main`
- `clean-architecture-with-rust-master`
- `implementing-hexagonal-axum`
- `rust-axum-framework`
- `axum-rust-template`
- `rust-fullstack`

### ECS and data-oriented donors

Active as source truth, not canonical reading path:

- `bevy`
- `bevy-ecs`
- `bevy-ecs-expert`
- `ecs`
- `ecs (1)`

### Interop donors

Active as source truth, not canonical reading path:

- `napi-interop`
- `napi-rs`
- `napi-rs-node-bindings`
- `ts-rs-main`
- `tsify-main`
- `wasm-bindgen-main`
- `flow-skills-pyo3`
- `calling-rust-from-tauri-frontend`
- `understanding-tauri-architecture`

### Book and article donors

Active as source truth, not canonical reading path:

- `Handling Rust errors elegantly.html`
- `ilide.info-luca-palmieri-zero-to-production-in-rust-an-introduction-to-backend-development--pr_e716c8b65d05fd065f4cc0a57cd717bb.pdf`
- `ilide.info-zero-to-production-in-rust-an-opinionated-introduction-to-backend-development-in-pr_82e62394ba58ae89a4834b3df3e0b42b.pdf`
- `ilide.info-zero-to-production-in-rust-true-pdf-later-pr_bdb0b822972ab4e246b88882f65592ca.pdf`

These remain source truth and pattern reservoirs.
They are not the engine's preferred reading path.

---

## Staging Zones

### Module staging zones

Governed staging, not canonical first-line doctrine:

- `modules/axum/`
- `modules/ecs/`
- `modules/ffi/`
- `modules/large-repo-case-studies/`
- `modules/tauri/`
- `modules/vm-architecture/`
- `modules/wasm/`

These are staging containers for deeper future fusion.
They do not displace the canonical `references/` tree.

### Other governed staging

- `references/repo-cases/` remains a canonical lane, but still functions as a bounded case-study staging surface before lessons fully diffuse into all target lanes
- `v3-expansion/` remains a non-primary supporting area rather than the first doctrinal reading path

---

## Canonical vs Transitional Snapshot

### Canonical now

- root control docs (`SKILL.md`, `README.md`, `INVENTORY.md`, `ABSORPTION_MATRIX.md`, `TRIGGER_SCOPE.md`)
- root references doorway and governance doctrine
- doctrine indexes for foundations, architecture, async-concurrency, error-patterns, production, quality, ecosystem, interop, repo-cases, checklists, playbooks, books, learning-path, and cross-language
- strengthened lane roots and support docs across the major doctrine lanes
- runtime shell surfaces created in first wave and now aligned to the stronger doctrine backbone
- bridge skills and rule indexes aligned to the current doctrine tree

### Transitional now

- donor rule sets not yet absorbed beyond current canonical routing and rule-index structure
- module staging zones that still hold complexity not yet flattened into doctrine
- repo-case and interop clusters that may still yield further extracted doctrine pages
- v3-expansion material that remains supportive but not first-line canonical reading

### Not canonical

- donor repo directory shapes
- raw rule-family layouts from source reservoirs
- staging zones as default reading surfaces
- any runtime path that bypasses canonical doctrine and reads donors first

---

## Current State

The Rust engine is now a real plugin-first heavy engine in canonical deep fusion.

What is already true:

- the root reading path is explicit
- source governance is explicit
- lane indexes are normalized
- the major doctrine lanes all have active canonical support
- bridge skills, route commands, diagnose commands, and bounded agents are aligned to the doctrine tree
- root README, SKILL, and TRIGGER_SCOPE now behave as real control surfaces rather than older shell placeholders

What remains true:

- deeper expansion is still possible
- staging zones still exist and are still governed as staging
- donor cleanup is still blocked until replacement-grade validation is complete
- destructive actions remain forbidden

---

## Governance Rule

This inventory is a snapshot, not a fantasy roadmap.

That means:

- list what is canonical now
- list what is transitional now
- keep donor/source truth visible without pretending it is already integrated
- preserve cleanup-safe navigation by pointing readers to canonical doctrine, not donor paths

If a surface is not yet canonical, say so explicitly.

---

## Cross-Links

Read this alongside:

- `README.md`
- `SKILL.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `references/INDEX.md`
- `references/governance/INDEX.md`
- `references/governance/source-reservoir-map.md`

---

## Status

- Engine: `rust-coding-engine`
- Stage: canonical deep-fusion governance snapshot aligned to the current heavy-engine standard
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:

> “the Rust engine currently contains these files.”

The reusable lesson is:

> “the inventory is the engine’s governed snapshot: it distinguishes canonical doctrine, runtime shell, donor reservoirs, and staging zones clearly enough that future routing, promotion, validation, and cleanup decisions can be made against explicit current-state truth instead of memory or historical shell assumptions.”
