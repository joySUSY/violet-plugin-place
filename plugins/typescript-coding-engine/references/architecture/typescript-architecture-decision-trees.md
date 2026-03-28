# TypeScript Architecture Decision Trees

## Purpose

Define the canonical architecture-selection doctrine for `typescript-coding-engine`.

This document exists because the TypeScript engine should teach TypeScript as a design and boundary language—not merely as syntax, utility types, or framework recipes.

The focused question is:

> when designing a TypeScript system, which architectural shape is actually justified by the product, state, contract, runtime, and interoperability pressures involved?

This document is architecture-first.
It is about choosing system shape before tool habit hardens into accidental structure.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` architecture doctrine subtree
- **Derived from:** architecture-decision, TypeScript design, and clean-code canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local architecture doctrine aligned to the current TypeScript engine

---

## Core Rule

Do not start from framework fashion or whichever library was used last week.
Start from:
1. trust boundaries
2. scale and longevity of the codebase
3. shape and blast radius of state
4. contract complexity
5. build/runtime environment
6. interoperability requirements

Then choose the architecture.

The goal is not to find the most sophisticated pattern.  
The goal is to make the system's structure proportional to its real pressures.

---

## Architecture Pressure Map

| Pressure | What it changes |
|---|---|
| Project shape | whether minimal, modular, library-grade, or platform-grade structure is justified |
| Trust boundaries | whether runtime validation and adapter layers are necessary |
| State blast radius | whether local, feature-scoped, global, or protocol-state models are appropriate |
| Public contract complexity | whether shared/generated contract discipline is needed |
| Runtime/platform constraints | whether SSR, edge, browser, Node, Tauri, or cross-language boundaries matter |
| Interop boundaries | whether TypeScript is core, shell, contract surface, or bridge layer |

TypeScript architecture is mostly about making these pressures explicit.

---

## Decision Tree 1 — Project Shape

```text
What are you building?
├── Small local script/tool
│   └── Minimal strict setup, flat modules, low ceremony
├── Focused application/package
│   └── Modular structure with explicit boundaries
├── Shared library / reusable package
│   └── Public API discipline, stronger interface design, declaration output
└── Long-lived app / monorepo / multi-surface system
    └── Explicit architecture, toolchain governance, state boundaries, deeper validation posture
```

### Preferred options

| Situation | Preferred Shape | Why |
|---|---|---|
| small tool or script | minimal strict project | fast iteration, low ceremony |
| app with real feature boundaries | modular project structure | preserves local clarity |
| shared library | API-first structure with strong type and docs discipline | consumers need stable contracts |
| large app / monorepo | explicit architecture and toolchain coordination | scale makes hidden decisions expensive |

The doctrine is:
- small projects should not be crushed under platform-grade ceremony
- long-lived systems should not masquerade as tiny apps forever

---

## Decision Tree 2 — Type vs Runtime Boundary

```text
Is the data fully internal and trusted?
├── Yes
│   └── Type system may carry most of the burden
└── No / boundary crossing exists
    └── Runtime validation becomes a design concern
```

### Boundary examples
- API input/output
- form input
- config files
- storage rehydration
- IPC payloads
- generated contract consumption
- browser ↔ server or Rust ↔ TS boundaries

The doctrine is:
- compile-time types do not replace runtime trust decisions
- architecture must acknowledge where data becomes untrusted

This is one of the main architectural inflection points in TypeScript systems.

---

## Decision Tree 3 — State Shape

```text
How broad is the state impact?
├── Local to one component/module
│   └── local state
├── Shared within subtree/feature
│   └── lifted or feature-scoped shared state
├── Shared broadly across app/runtime
│   └── global state or store discipline
└── State is really a protocol/lifecycle machine
    └── branded or type-level state machine posture
```

### Preferred options

| Situation | Preferred Pattern | Why |
|---|---|---|
| isolated component concerns | local state | lowest coordination cost |
| feature-scoped shared behavior | subtree/shared state | keeps scope bounded |
| app-wide coordination | explicit global state/store | avoids prop-threading chaos |
| protocol or workflow state | type-level or branded-state model | makes illegal transitions harder |

The doctrinal question is not “which state library do I use?”
It is “how large is the blast radius of this state?”

---

## Decision Tree 4 — Contract Shape

```text
What kind of contract problem is this?
├── Simple internal object shape
│   └── plain interfaces or types
├── Input/output relationship must be preserved
│   └── generics and inference-aware APIs
├── Finite known states / branching logic
│   └── discriminated unions
├── Semantic separation over same primitive
│   └── branded / opaque types
└── Cross-surface shared contract
    └── generated/shared schema or strongly owned boundary type
```

The doctrine is:
- use the smallest contract weapon that preserves the right truth
- do not leap to advanced type machinery when a simpler shape is more honest

This is where foundations and architecture meet.

---

## Decision Tree 5 — Toolchain Strictness and Governance

```text
New project or existing project?
├── New project
│   └── strict-by-default posture
└── Existing codebase
    └── staged hardening with explicit destination posture
```

### Preferred options

| Situation | Preferred Posture | Why |
|---|---|---|
| new TypeScript system | strong strict baseline | prevents silent debt from day one |
| legacy JS/TS migration | staged hardening | reduces organizational shock |
| public library | strong declarations + strict API posture | consumers pay for your ambiguity |
| monorepo | reproducible toolchain and CI gates | drift becomes expensive quickly |

The doctrine is:
- strictness is architecture governance, not setup garnish
- the chosen posture should align with how long the system must survive and how many people will depend on it

---

## Decision Tree 6 — Runtime Validation Library

```text
What pressure dominates?
├── Full-stack / ecosystem breadth / DX
│   └── Zod-like posture
├── JSON Schema / OpenAPI / high-throughput contracts
│   └── TypeBox-like posture
└── minimal bundle / edge footprint
    └── Valibot-like posture
```

This is not merely a library choice.
It is an architecture decision because it affects:
- schema shape
- error behavior
- build outputs
- API coupling
- bundle size and runtime cost

The doctrine is:
- validation tools should be chosen for their architectural consequences, not just ergonomics in the editor

---

## Decision Tree 7 — Internal App Surface vs External Contract Surface

```text
Is this an internal app surface or a reusable external contract?
├── Internal app surface
│   └── optimize for local clarity and speed
└── External/shared contract
    └── optimize for API stability, error quality, and docs discipline
```

The deeper point:
- library architecture and app architecture are not the same problem
- the public contract deserves more ceremony than purely internal glue

The doctrine is:
- increase explicitness as the audience broadens

---

## Decision Tree 8 — Interop and Cross-Language Boundaries

```text
Is TypeScript the core runtime or a shell/bridge surface?
├── Core runtime
│   └── optimize for internal consistency and app architecture
├── Shared contract surface
│   └── optimize for schema fidelity and version discipline
└── UI / IPC / WASM / Rust bridge layer
    └── optimize for boundary clarity and adapter honesty
```

This matters because TypeScript often participates in systems where it is not the only truth-bearing runtime.

Examples:
- Tauri frontend + Rust backend
- wasm-bindgen or ts-rs generated contracts
- Node or browser shell around another system

The doctrine is:
- interop systems should model the boundary explicitly
- not pretend a cross-language bridge is just ordinary app code

---

## Decision Tree 9 — Complexity Ladder

```text
Level 1: strict local app or utility
Level 2: modular app with feature boundaries
Level 3: richer validation / reusable components / shared state discipline
Level 4: library or multi-surface app with formal contracts
Level 5: monorepo / platform-scale TypeScript system with explicit governance and interop boundaries
```

This ladder exists to prevent both:
- overbuilding small systems
- under-structuring long-lived systems

The doctrine is:
- architecture should scale with real pressure
- not with aspirational self-image

---

## Pattern 1 — Boundary Truth Beats Framework Habit

The most common TypeScript architecture failure is choosing structure by framework defaults rather than by boundary truth.

Examples:
- routing libraries dictating state architecture
- UI framework patterns leaking into domain modeling
- API layer assumptions spreading into internal types

The doctrine is:
- framework choice should adapt to the system boundary model
- not become the substitute for one

---

## Pattern 2 — TypeScript Architecture Is a Trust-Management Problem

TypeScript earns its keep by modeling trust transitions well.

Questions to ask:
- where does untrusted data enter?
- where is trust re-established?
- where do contracts become shared externally?
- where is state allowed to widen its impact?

The doctrine is:
- architecture should make trust boundaries explicit enough that both types and runtime validation know where they belong

---

## Pattern 3 — Generated Contracts and Owned Contracts Must Not Drift Apart

When a system uses:
- generated clients
- OpenAPI/JSON Schema
- Rust/TS interop
- shared DTO packages

then contract ownership must be explicit.

The doctrine is:
- prefer one authoritative contract source wherever practical
- do not keep parallel handwritten truth that will drift under pressure

This is both an architecture and maintenance rule.

---

## Pattern 4 — State Libraries Are Secondary to State Boundaries

Choosing Zustand, Redux, signals, context, or local component state is downstream of a more important question:
- how much of the system should know this state exists?

The doctrine is:
- choose the state boundary first
- choose the state library second

This reframes state management as architecture rather than tool shopping.

---

## Pattern 5 — Architecture Decisions Should Reduce Future Migration Cost

A good architecture choice today should reduce the cost of future changes such as:
- stricter compiler posture
- stronger runtime validation
- public API stabilization
- monorepo extraction
- Rust/TS boundary introduction
- feature ownership separation

The doctrine is:
- prefer structures that can harden gracefully over time
- not ones that only look efficient in the current tiny context

---

## Architecture Checklist

Before calling a TypeScript architecture healthy, ask:

- [ ] Was the project shape chosen based on real scale and longevity?
- [ ] Are trust boundaries explicit enough to place runtime validation correctly?
- [ ] Is state modeled by blast radius rather than by library preference?
- [ ] Are contracts using the smallest honest representation that preserves truth?
- [ ] Does strictness posture align with the system's support burden?
- [ ] Are interop boundaries explicit where TS is not the only runtime?
- [ ] Will this structure reduce or increase future migration cost?

---

## Anti-Patterns

- framework-first architecture with no boundary analysis
- global state before understanding blast radius
- advanced type-level composition for simple shapes
- zero runtime validation at real trust boundaries
- library-style abstraction ceremony inside tiny internal tools
- weak strictness posture in long-lived codebases
- parallel contract truths drifting across boundaries
- pretending interop layers are ordinary app code

---

## Why This Matters to `typescript-coding-engine`

This document is the architecture lane root because it gives the engine a canonical answer to:
- how TypeScript system shape should be chosen
- where state and trust boundaries belong
- how contracts, strictness, and runtime validation interact
- why interop and public API design are architectural rather than incidental concerns

It should remain the main architecture-reading doorway before narrower lane documents branch out.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../foundations/strict-type-system-posture.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../clean-code/quality-gates-governance.md`
- `../interop/INDEX.md`
- `../advanced/type-level-programming-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “TypeScript architecture should start from trust boundaries, state shape, and contract complexity before choosing libraries.”

The reusable lesson is:
> “TypeScript architecture is boundary design: choose project shape, state scope, contract representation, validation posture, and interop surfaces according to the real trust, scale, and lifecycle pressures of the system—so the structure stays proportional, explicit, and easier to harden over time.”
