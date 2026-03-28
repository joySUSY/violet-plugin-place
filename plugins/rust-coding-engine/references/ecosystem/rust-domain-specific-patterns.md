# Rust Domain-Specific Patterns

## Purpose

Define the canonical doctrine for routing Rust work by domain pressure rather than by framework hype or random crate memorization.

This document complements the ecosystem lane by answering a specific question:

> once you know you are in a particular application domain, what architectural pressures, crate families, and operational constraints should shape your Rust choices?

It is not just a catalog of stacks.
It is a map from **domain pressure** to **architectural posture**.

---

## Source Provenance

- **Primary donor families:** `rust-skills-main`, `rust-skills-main2`, domain-extension reservoir material
- **Key local donor materials:**
  - `rust-skills-main/README.md`
  - `rust-skills-main/CLAUDE_CODE_GUIDE.md`
  - `rust-skills-main2/index/domain-extensions.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Do not choose Rust stacks by domain labels alone.
Choose them by the *pressures* that the domain imposes.

Examples:
- CLI work imposes UX, scripting, output-discipline, and local ergonomics pressure
- backend work imposes failure, observability, and lifecycle pressure
- WASM/frontends impose binary size and browser/runtime interop pressure
- embedded imposes memory, timing, and platform-limit pressure
- data-plane systems impose latency, throughput, and backpressure pressure
- proc-macro work imposes compile-time ergonomics and toolchain-debuggability pressure

The domain label is only the start.
The architecture should be driven by the pressure profile.

---

## Domain Router

| Domain | Primary Pressure Profile | Canonical Next Reads |
|---|---|---|
| CLI / terminal tooling | human UX, fast startup, output discipline, local automation | `../architecture/rust-advanced-systems-and-tooling.md`, `../production/rust-production-patterns.md` |
| Backend / web service | config correctness, observability, failure layering, shutdown, async boundaries | `../architecture/rust-axum-service-architecture-and-thin-adapters.md`, `../production/rust-production-patterns.md` |
| Frontend / WASM | binary size, JS boundary, browser constraints, contract generation | `../interop/wasm-bindgen-posture.md`, `../interop/rust-typescript-bridge-patterns.md` |
| Native desktop / mobile shell | IPC/core-shell boundaries, local OS capability access, packaging | `../interop/rust-tauri-core-shell-and-ipc-boundaries.md`, `../architecture/rust-advanced-systems-and-tooling.md` |
| Embedded / no_std / edge | memory ceilings, timing, hardware ownership, constrained debugging | `../architecture/rust-advanced-systems-and-tooling.md`, `../production/rust-performance-patterns.md` |
| Data-plane / proxy / high-throughput network systems | latency, contention, zero-copy, connection reuse, operational safety | `../production/rust-performance-patterns.md`, `../async-concurrency/rust-concurrency-decision-matrix.md` |
| Networking libraries / protocol stacks | protocol correctness, async/runtime fit, cancellation, backpressure | `../async-concurrency/rust-async-concurrency-deep-patterns.md`, `../production/rust-production-patterns.md` |
| Proc macros / codegen | compile-time UX, diagnostics, testability, maintenance cost | `../architecture/rust-advanced-systems-and-tooling.md`, `../quality/rustdoc-mastery.md` |

---

## Pattern 1 — CLI and Tooling Domains Need Human-Facing Discipline

For CLI-heavy Rust systems, the important question is not only which parser crate to choose.
It is also:
- what output is for humans vs machines?
- how should errors surface?
- what command ergonomics and startup expectations exist?
- what local-state/config layering model is appropriate?

Good crate choices matter, but architecture matters more.
A command-line tool is still a product boundary.

The domain pressure is often:
- discoverability
- composability
- low-friction local execution
- clean error/output surfaces

---

## Pattern 2 — Backend Domains Need Operational Truth Built In

For backend/service systems, the stack choice is only one layer.
The stronger domain pressures are:
- typed config and startup validation
- explicit error/failure boundaries
- tracing/metrics/health surfaces
- graceful shutdown
- database and queue boundary honesty

This is why backend work should route quickly into:
- service architecture doctrine
- production doctrine
- observability doctrine
- async/concurrency doctrine

A backend that only "uses Axum" is not yet architected.

---

## Pattern 3 — WASM and Frontend Domains Are Primarily Boundary Problems

When Rust targets browsers or frontend-adjacent systems, the core pressures become:
- binary size
- JS/WASM boundary ergonomics
- contract generation
- browser runtime constraints
- toolchain/bundler compatibility

The wrong instinct is to treat WASM as merely another compile target.
The right instinct is to treat it as a boundary specialization problem.

That is why these tasks should route through interop doctrine rather than only through ecosystem lists.

---

## Pattern 4 — Desktop and Native Shell Domains Need Core-Shell Thinking

For desktop/mobile-adjacent Rust systems, the strongest domain pressure is often not rendering itself.
It is the separation between:
- the Rust core
- the UI shell
- OS capability access
- local packaging/runtime assumptions

This is why Tauri- or native-app work should usually be framed as a core-shell / IPC / packaging architecture question, not just a GUI framework decision.

---

## Pattern 5 — Embedded and Edge Domains Amplify Every Design Lie

In embedded/no_std/edge domains, vague architecture hurts faster.

The pressure profile often includes:
- tight memory budget
- stricter runtime/executor choices
- lower tolerance for hidden allocation or panic stories
- weaker observability/debugging surfaces
- platform-specific integration constraints

This means architecture, ownership, and performance doctrine should be consulted much earlier than in ordinary application work.

---

## Pattern 6 — Data-Plane and High-Throughput Domains Are Throughput + Contention Domains

Proxy, load-balancing, or packet/data-plane systems care intensely about:
- zero-copy forwarding
- connection reuse
- contention and lock shape
- backpressure and overload behavior
- latency tails, not just averages

This is why these systems should route through performance and concurrency doctrine first, then ecosystem/tool selection.

The domain pressure is less “what framework?” and more “what memory and coordination model sustains throughput safely?”

---

## Pattern 7 — Networking Libraries Are Coordination Contracts

Networking/protocol work is often best understood as a combination of:
- async coordination
- protocol correctness
- retry/backoff/cancellation semantics
- consumer-facing error and timeout behavior

The domain pressure is not just implementing requests.
It is defining trustworthy communication contracts under failure.

That is why networking work should stay close to async, production, and error doctrine together.

---

## Pattern 8 — Proc Macro Domains Change the Maintenance and Debugging Model

Proc-macro/codegen work is an advanced Rust domain because it changes how the whole codebase is experienced.

Key pressures:
- compile-time diagnostics quality
- macro input/output clarity
- testability of generated behavior
- contributor debugging burden
- compile-time cost

The correct question is not just whether a macro is possible.
It is whether the generated abstraction improves long-term maintainability enough to justify the extra complexity.

---

## Pattern 9 — Domain Work Often Needs Both General Doctrine and Domain-Specific Crate Knowledge

This document is intentionally not just a stack table.
Domain work usually needs two layers:

1. **general doctrine**
   - ownership
   - architecture
   - async/error/production/interop quality

2. **domain-specific crate and pattern fit**
   - what crate families are mature here?
   - what operational assumptions come with them?

That is why this file should be read after or alongside:
- `rust-crate-ecosystem-navigator.md`
- `rust-ecosystem-discovery.md`

---

## Domain Pressure Checklist

When a Rust task sounds “domain-specific,” ask:

- [ ] What is the primary pressure here: UX, observability, size, latency, memory, IPC, protocol correctness, packaging, or compile-time ergonomics?
- [ ] Which canonical doctrine lane owns that pressure first?
- [ ] Which crate families are responding to that pressure rather than distracting from it?
- [ ] What production/runtime/testing implications come with the domain choice?

---

## Anti-Patterns

- choosing stacks by domain buzzword alone
- treating domain-specific work as just another framework-selection problem
- ignoring the operational pressure profile of the domain
- copying a popular stack without checking whether its trade-offs fit the system
- solving domain problems purely with crates while ignoring architecture

---

## Cross-Links

Read this alongside:
- `rust-crate-ecosystem-navigator.md`
- `rust-ecosystem-discovery.md`
- `../architecture/rust-advanced-systems-and-tooling.md`
- `../production/rust-production-patterns.md`
- `../production/rust-performance-patterns.md`
- `../async-concurrency/rust-concurrency-decision-matrix.md`
- `../interop/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “for each Rust domain, memorize a stack.”

The reusable lesson is:
> “identify the pressure profile of the domain first, then route through the doctrines and crate families that answer those pressures; domain-specific Rust is strongest when architecture leads and stack choice follows.”
