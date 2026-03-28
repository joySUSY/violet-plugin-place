# Rust Architecture Decision Trees

## Purpose

Provide requirement-grade, architecture-first decision trees for Rust systems.

This document exists because `rust-coding-engine` must teach major Rust choices as:
- problem statement
- multiple solution approaches
- decision criteria
- performance implications
- complexity implications
- migration paths

rather than as isolated examples or crate fandom.

## Source Provenance

- **Primary donor families:** `RUST_COMPREHENSIVE_REQUIREMENTS` synthesis, `clean-architecture-with-rust-master`, `implementing-hexagonal-axum`, `rust-axum-framework`, `bevy`/`ecs` donors
- **Key local donor materials:**
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
  - repo-case and architecture donors already absorbed into canonical references
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


---

## Core Rule

Do not start with syntax.
Do not start with crate names.
Do not start with framework identity.

Start with:
1. workload shape
2. boundary pressure
3. deployment/runtime context
4. expected scale and lifetime of the system

Then choose the architecture.

---

## Decision Tree 1 — Project Scale and Structural Shape

```text
What are you building?
├── Tiny script / one-off utility
│   └── Single file or minimal flat module layout
├── Small application / CLI / focused service
│   └── Multi-module app with clear boundaries, still lightweight
├── Concurrent or async subsystem
│   └── Structure around ownership, async boundaries, and shared-state discipline
└── Long-lived production service / multi-surface system
    └── Explicit architecture: layered/hexagonal/workspace if boundary pressure justifies it
```

### Preferred options

| Situation | Preferred Shape | Why |
|---|---|---|
| L0 utility or script | `main.rs` / minimal flat layout | lowest ceremony, fastest feedback |
| L1 small application | `lib.rs` + `main.rs` + a few modules | enough structure without workspace overhead |
| L2 production service | layered modules or moderate workspace | boundary clarity starts to matter |
| L3 multi-surface system | workspace with strong crate boundaries | scale, separation, and many adapters justify explicit structure |

### Complexity notes
- More crates are not automatically better.
- The right amount of structure is the minimum that keeps boundaries honest.

### Migration path
- single file → multi-module
- multi-module → `lib.rs/main.rs` split
- `lib.rs/main.rs` split → workspace when scale and boundary pressure become real

---

## Decision Tree 2 — Service Architecture Style

```text
Is there real boundary pressure?
├── No
│   └── Keep a simple layered structure
├── Some
│   └── Use explicit service/repository/state boundaries
└── High
    └── Use clean/hexagonal ideas with thin adapters and inward dependencies
```

### Preferred options

| Situation | Preferred Style | Why |
|---|---|---|
| simple internal tool | light layered architecture | faster iteration, lower ceremony |
| ordinary service with DB + HTTP | layered service with explicit boundaries | strong enough without over-ritualizing |
| multi-surface delivery or replaceable adapters | clean/hexagonal orientation | inward dependency rule becomes very valuable |

### Performance implications
- Architectural layering itself does not usually dominate runtime cost.
- The real cost is complexity in coordination and translation layers.

### Migration path
- direct handlers → handler + service split
- service split → repository/port boundaries
- ports/adapters → workspace circles if the dependency rule must be made mechanically obvious

---

## Decision Tree 3 — Web Delivery Stack

```text
Need an HTTP/web service?
├── Type-safe, modern, composable routing?
│   └── Axum
├── Peak HTTP performance with experienced team?
│   └── Actix-Web
└── Faster onboarding / batteries-included prototype?
    └── Rocket
```

### Preferred options

| Situation | Preferred Choice | Why |
|---|---|---|
| most modern Rust services | `axum` | strong boundary clarity, Tower ecosystem, ergonomic typed extractors |
| performance-sensitive service with team ready for complexity | `actix-web` | powerful and fast |
| prototype or smaller ergonomic service | `rocket` | easier start, less flexible at high complexity |

### Migration path
- prototype framework choice can be revisited if operational complexity or performance pressure changes
- delivery framework should remain an outer adapter, not infect the core architecture

---

## Decision Tree 4 — Sync, Threads, or Async

```text
What dominates the workload?
├── Mostly waiting on I/O
│   └── Async runtime
├── Mostly CPU work
│   └── Threads / rayon / spawn_blocking
├── Mixed I/O + CPU
│   └── Async orchestration + explicit CPU offloading
└── Shared world / simulation / ECS
    └── Data-oriented scheduling and partitioned processing
```

### Preferred options

| Situation | Preferred Model | Why |
|---|---|---|
| network/file/db waiting | `tokio` async | scales waiting efficiently |
| heavy computation | rayon / threads | avoid blocking async workers |
| mixed workload | async + offload | keeps both sides honest |
| ECS/data-oriented system | scheduled systems / partitioned world logic | shared truth with structured concurrency |

### Complexity notes
- Async adds lifecycle and cancellation complexity.
- Shared-state threading adds ownership and contention complexity.
- ECS adds modeling and scheduling complexity.

### Migration path
- sync → threads for explicit CPU parallelism
- sync/threads → async when I/O concurrency dominates
- async → data-oriented/ECS only when the domain truly needs shared world processing

---

## Decision Tree 5 — Shared State Model

```text
Need shared mutable state?
├── No
│   └── Prefer ownership transfer or immutable sharing
├── Yes, single-threaded
│   └── Rc / RefCell patterns if domain justifies them
├── Yes, multi-threaded and simple
│   └── Arc + Mutex/RwLock
└── Yes, but coordination is complex or contention-heavy
    └── Prefer actors, channels, or partitioned state models
```

### Preferred options

| Situation | Preferred Model | Why |
|---|---|---|
| read-only sharing | `Arc<T>` / `Rc<T>` | cheap and explicit |
| simple shared mutation | `Arc<Mutex<T>>` / `Arc<RwLock<T>>` | straightforward when pressure is modest |
| high-contention or complex coordination | actors/channels/partitioning | reduces lock coupling |
| data-oriented world state | query/schedule-based access | shared truth without generic lock soup |

### Anti-pattern
- defaulting every shared-state problem to `Arc<Mutex<T>>`

---

## Decision Tree 6 — Interop Surface

```text
What kind of boundary are you crossing?
├── Python ecosystem
│   └── PyO3 + Maturin
├── Node native addon
│   └── napi-rs
├── C / C++
│   └── bindgen / cbindgen / cxx based on direction and safety needs
├── Browser/WASM bridge
│   └── wasm-bindgen
└── Rust-defined TS contracts
    └── ts-rs / tsify family
```

### Preferred options

| Situation | Preferred Tooling | Why |
|---|---|---|
| Python package bindings | `PyO3 + maturin` | strongest Python-facing path |
| Node native addon | `napi-rs` | ergonomic Node boundary |
| browser/WASM API | `wasm-bindgen` | well-supported JS/WASM bridge |
| TS contract generation | `ts-rs` / `tsify` | reduce drift between Rust and TS |

### Complexity notes
- interop is both architecture and packaging
- every interop choice brings build and release consequences

---

## Decision Tree 7 — Incremental Complexity Ladder

```text
Current project maturity?
├── Level 1: CLI tool / sync single-file
├── Level 2: Multi-module app / typed errors / tests
├── Level 3: Concurrent app / shared state or channels
├── Level 4: Async app / tokio / async boundaries
└── Level 5: Production service / observability / graceful shutdown / explicit architecture
```

### Use of this ladder
This ladder is not only for teaching.
It is also a migration roadmap.

It helps answer:
- what level is the current system actually at?
- what should be introduced next?
- what should definitely not be introduced yet?

---

## Decision Tree 8 — When to Use Workspace-Scale Architecture

```text
Should this become a workspace?
├── No: one crate, one main concern, low growth pressure
├── Maybe: multiple concerns but still tightly coupled
└── Yes: multiple distinct domains/surfaces/adapters with real long-term separation needs
```

### Strong reasons for workspace
- multiple delivery surfaces
- library + binary + bindings
- large repo with stable domain splits
- shared typed core vocabulary across subsystems
- independent publish/release surfaces

### Weak reasons for workspace
- "it feels more professional"
- anticipated complexity with no actual evidence yet
- splitting for aesthetics only

---

## Anti-Patterns

- over-architecting tiny tools
- under-structuring long-lived services
- choosing framework/tool first and architecture second
- treating async as default even for CPU-heavy work
- forcing clean architecture ceremony where the pressure is low
- forcing one concurrency model onto every workload

---

## Why This Matters to `rust-coding-engine`

This is one of the most important remaining requirement-grade doctrine documents because it teaches Rust as:
- decision framework
- trade-off system
- migration path
- architecture-first language

It connects many other canonical docs into one coherent routing surface.
