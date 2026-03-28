# Rust Production Index

## Purpose

Canonical entrypoint for production-facing Rust doctrine.

Use this category when the task is about:

- production readiness under real operational pressure
- performance as an operational concern rather than isolated micro-optimization
- logging, tracing, metrics, and health surfaces
- release graphs, artifact truth, and multi-surface publication
- runtime trust boundaries, dependency posture, and production verification

This index is not only a file list.
It exists to route readers into the correct production doctrine lane based on the kind of operational truth they need to make explicit.

## Source Provenance

- **Primary source:** current canonical production subtree under `references/production/`
- **Derived from:** production, performance, observability, and release-doctrine canonization passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current production subtree

---

## Production Spine

The production subtree now has a clear doctrinal spine:

1. **Root production law**
   - `rust-production-patterns.md`
2. **Focused supporting doctrine**
   - `rust-performance-patterns.md`
   - `rust-logging-and-observability-best-practices.md`
3. **Release-graph doctrine**
   - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
4. **Systems/tooling overlap**
   - `../architecture/rust-advanced-systems-and-tooling.md`
5. **Cross-language and audit cross-links**
   - `../interop/rust-cross-language-workflows.md`
   - `../interop/rust-interop-testing-and-audit-discipline.md`

The doctrine is:

- production reasoning should move from root posture → focused lane → release and verification implications
- not jump straight into one narrow optimization page without understanding the operational model first

---

## Documents and Their Roles

| File                                                   | Primary Role                                                                      | Load When                                                             |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `rust-production-patterns.md`                          | Root doctrine for production-grade Rust operational truth                         | you need the production model first                                   |
| `rust-performance-patterns.md`                         | Performance engineering doctrine grounded in evidence and workload shape          | throughput, latency, allocation, contention, profiling dominate       |
| `rust-logging-and-observability-best-practices.md`     | Observability doctrine for logs, traces, metrics, health, and redaction           | incident visibility, telemetry, and operator evidence dominate        |
| `rust-sdk-ci-and-multi-surface-release-pipelines.md`   | Release graph doctrine for multi-surface publishing and post-publish verification | crate + wheel + npm + wasm + binary coordination dominates            |
| `../architecture/rust-advanced-systems-and-tooling.md` | Systems/tooling architecture with production relevance                            | runtime/tooling complexity is architectural rather than surface-local |

---

## Reading Paths

### If you need the root production model first

1. `rust-production-patterns.md`
2. then branch by the dominant operational pressure

### If performance is the bottleneck

1. `rust-production-patterns.md`
2. `rust-performance-patterns.md`
3. `../interop/rust-cross-language-workflows.md` if the hot path crosses language/runtime boundaries

### If observability and operations are the bottleneck

1. `rust-production-patterns.md`
2. `rust-logging-and-observability-best-practices.md`
3. `../interop/rust-interop-testing-and-audit-discipline.md` if observability must prove interop behavior too

### If release or packaging is the bottleneck

1. `rust-production-patterns.md`
2. `rust-sdk-ci-and-multi-surface-release-pipelines.md`
3. `../interop/rust-cross-language-workflows.md` if release surfaces span multiple runtimes

### If system/tooling complexity is the bottleneck

1. `rust-production-patterns.md`
2. `../architecture/rust-advanced-systems-and-tooling.md`
3. then return to the focused production or interop lane that owns the actual boundary

---

## Production Decision Questions

Before choosing a production subpage, ask:

1. Is the real pressure runtime behavior, visibility, performance, release coordination, or trust boundaries?
2. Is the problem still inside Rust runtime truth, or already crossing into interop/release surfaces?
3. Do we need root doctrine first, or are we already sure which lane dominates?
4. Are we trying to improve a metric, or to govern a system under real failure and deployment pressure?

The doctrine is:

- production docs are organized by operational pressure
- not by vague “ops” versus “code” separation

---

## Cross-Links

Production doctrine overlaps naturally with these lanes:

- **Interop**
  - `../interop/rust-cross-language-workflows.md`
  - `../interop/rust-interop-testing-and-audit-discipline.md`
- **Architecture**
  - `../architecture/INDEX.md`
  - `../architecture/rust-advanced-systems-and-tooling.md`
- **Governance**
  - `../governance/source-reservoir-map.md`

The doctrine is:

- production is where operational truth becomes explicit
- so it must remain connected to architecture, interop, and governance rather than pretending they are separate concerns

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical categories
- governance-aware cross-links

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “production is where the ops-oriented Rust docs live.”

The reusable lesson is:

> “the production subtree is the canonical navigation layer for making operational truth explicit in Rust systems—routing engineers from root production law into the exact performance, observability, release, interop, or architecture doctrine they need before the system is trusted under real pressure.”
