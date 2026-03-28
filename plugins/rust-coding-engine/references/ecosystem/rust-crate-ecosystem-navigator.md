# Rust Crate Ecosystem Navigator

## Purpose

Provide a canonical decision framework for selecting major Rust ecosystem crates by problem shape and trade-off profile.

This document is requirement-grade doctrine: the engine must teach crate selection as a decision framework, not as cargo-cult recommendation lists.

## Source Provenance

- **Primary donor families:** `RUST_COMPREHENSIVE_REQUIREMENTS` synthesis, `rust-skills`, `rust-axum-framework`, `napi-rs-node-bindings`
- **Key local donor materials:**
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
  - selected ecosystem-facing donor READMEs and skills already absorbed into interop/architecture/production doctrine
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


---

## Core Rule

Never teach crate selection as:
> always use X

Teach it as:
> given this workload, boundary, or operational pressure, here is why X is a better fit than Y.

---

## 1. Error Handling Crates

| Crate | Use Case | Trade-offs |
|---|---|---|
| `anyhow` | prototypes, scripts, application glue | easy propagation, less typed precision |
| `thiserror` | libraries, typed domain/application errors | explicit and structured, slightly more boilerplate |
| `eyre` / rich reporting crates | rich operator-facing reports, context-heavy tooling | better context and reports, heavier dependency posture |

### Decision posture
- prototype/script -> `anyhow`
- library/API contract -> `thiserror`
- rich report-heavy tooling -> `eyre`-style posture

---

## 2. Async Runtime

| Runtime | Use Case | Trade-offs |
|---|---|---|
| `tokio` | production async services and ecosystem-heavy work | most common, most features, heavier |
| `async-std` | learning or simpler async posture | simpler feel, weaker ecosystem gravity |
| `smol` | lightweight or embedded/minimal async integration | lighter, fewer batteries |

### Decision posture
- production service with broad ecosystem needs -> `tokio`
- minimal or embeddable async runtime -> `smol`
- learning/simple async only when ecosystem pressure is low -> `async-std`

---

## 3. Web Frameworks

| Framework | Use Case | Trade-offs |
|---|---|---|
| `axum` | type-safe modern service architecture | ergonomic, Tower-based, good boundary clarity |
| `actix-web` | high-throughput performance-sensitive HTTP services | powerful and fast, steeper mental model |
| `rocket` | rapid prototyping, batteries-included ergonomics | approachable, less flexible for some advanced architecture cases |

### Decision posture
- modern type-safe service with clear middleware/boundary design -> `axum`
- performance-sensitive web service with experienced team -> `actix-web`
- rapid prototype or smaller ergonomic service -> `rocket`

---

## 4. Database Layer

| Crate | Use Case | Trade-offs |
|---|---|---|
| `sqlx` | compile-time checked SQL and async-first apps | strong query checking, DB-at-build-time pressure |
| `diesel` | strong typed query builder, sync-heavy or query-model-driven work | strong compile-time types, steeper type complexity |
| `sea-orm` | async ORM with more batteries and relation support | more magic, less raw-SQL directness |

### Decision posture
- want explicit SQL + compile-time query validation -> `sqlx`
- want deep typed query-builder ergonomics -> `diesel`
- want ORM convenience and async support -> `sea-orm`

---

## 5. Serialization and Data Format Stack

| Crate / Format | Use Case | Trade-offs |
|---|---|---|
| `serde` + JSON | general API and interoperability work | universal, not the most compact/fast |
| `borsh` | compact binary formats, domain-specific serialization | tighter binary posture, less universal |
| `rkyv` | zero-copy/archive-heavy performance-sensitive systems | highly efficient, more specialized constraints |

### Decision posture
- compatibility and ecosystem reach -> `serde` + JSON or other serde formats
- domain-specific compact binary -> `borsh`
- archive/zero-copy performance focus -> `rkyv`

---

## 6. CLI Surface

| Crate | Use Case | Trade-offs |
|---|---|---|
| `clap` | production CLI with rich argument and help behavior | dominant ecosystem choice, feature-rich |
| lighter custom parsing | tiny internal tools | simpler, but quickly reinvents missing features |

### Decision posture
- real public CLI or long-lived internal CLI -> `clap`
- tiny throwaway/internal script -> simpler path may suffice

---

## 7. Interop Bridges

| Crate | Use Case | Trade-offs |
|---|---|---|
| `PyO3` + `maturin` | Python bindings | strong ecosystem path, packaging complexity |
| `napi-rs` | Node native addons | ergonomic Node bridge, native packaging matrix |
| `bindgen` / `cbindgen` / `cxx` | C / C++ interop | powerful, but boundary design becomes critical |
| `wasm-bindgen` | JS/WASM bridge | powerful web bridge, requires build/boundary discipline |
| `ts-rs` / `tsify` | Rust–TS contract generation | great for type-sharing, still needs boundary governance |

### Decision posture
- Python ecosystem -> `PyO3` + `maturin`
- Node native module -> `napi-rs`
- C/C++ boundary -> choose among `bindgen`, `cbindgen`, `cxx` based on direction and safety needs
- browser/WASM bridge -> `wasm-bindgen`
- Rust-defined TS contract sharing -> `ts-rs` / `tsify`

---

## 8. Observability

| Crate | Use Case | Trade-offs |
|---|---|---|
| `tracing` | structured spans/events in services and apps | modern standard, great ecosystem fit |
| `log` + facade-compatible loggers | simpler legacy/common logging posture | lighter, less structured than tracing-first systems |
| OpenTelemetry integrations | distributed tracing/telemetry pipelines | more infra complexity, more operational leverage |

### Decision posture
- modern service/application -> `tracing`
- distributed observability needs -> `tracing` + OpenTelemetry integrations
- minimal or legacy-compatible logging -> `log` stack if needed

---

## How to Use This Navigator

When choosing a crate family, always answer:
1. what is the workload or boundary?
2. what trade-off is dominant: ergonomics, performance, type safety, compatibility, operator experience?
3. what ecosystem gravity matters here?
4. is the team ready for the complexity cost of the stronger option?

If those answers are missing, the crate choice is premature.

---

## Anti-Patterns

- recommending one crate universally
- choosing the fanciest crate without a workload reason
- copying stack choices from unrelated repos blindly
- underestimating packaging/toolchain cost for interop crates
- treating ecosystem familiarity as the only selection criterion

---

## Why This Matters to `rust-coding-engine`

This is one of the core requirement-grade doctrine pieces because it teaches:
- stack selection as decision framework
- trade-off reasoning instead of fandom
- crate choices as architecture inputs rather than afterthoughts

It should become a primary navigation doc for architecture and setup decisions.
