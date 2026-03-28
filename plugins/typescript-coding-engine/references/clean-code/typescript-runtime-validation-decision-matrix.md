# TypeScript Runtime Validation Decision Matrix

## Purpose

Define the canonical runtime-validation doctrine for `typescript-coding-engine`.

This document exists because one of the most important TypeScript architectural questions is not merely:
> how should this type be modeled?

It is:
> when is compile-time typing enough, and when must the system establish trust again at runtime?

This doctrine treats runtime validation as a first-class architectural decision rather than as an afterthought or a form-library convenience.

It focuses on:
- trust boundaries
- validation placement
- validation library selection
- schema ownership
- compile-time/runtime cooperation
- avoiding both under-validation and validation sprawl

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** TypeScript runtime-validation, quality, and trust-boundary canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local runtime-validation doctrine aligned to the current TypeScript engine

---

## Core Rule

TypeScript's compile-time guarantees stop at trust boundaries.

Whenever data crosses a trust boundary, the system must explicitly decide whether runtime validation is needed.

The goal is not to validate everything maximally.  
The goal is to make trust decisions explicit, place validation at the right boundary, and preserve strong internal shapes afterward.

---

## Trust Boundary Map

| Boundary | Default Posture |
|---|---|
| fully internal trusted flow | compile-time types may be sufficient |
| user input / form input | runtime validation required |
| external API / webhook / JSON payload | runtime validation required |
| config files / env-driven data | runtime validation strongly recommended |
| deserialization / persistence rehydration | runtime validation often required |
| IPC / bridge payloads | runtime validation depends on contract strength and consumer trust |
| generated contracts with strong single-source ownership | lighter runtime checks may suffice at some internal boundaries |

The doctrine is:
- runtime validation begins where trust becomes uncertain
- not where the compiler simply happens to lose information

---

## Pattern 1 — Validate at the Boundary, Not Everywhere

A mature TypeScript system validates where trust changes.

Examples:
- request enters the API
- form submission crosses the UI boundary
- config is loaded
- external JSON is parsed
- storage is rehydrated
- IPC payload arrives from a native/backend boundary

Do not spread validation arbitrarily through the whole codebase.
That creates noise, duplication, and competing definitions of “what valid means.”

The doctrine is:
- validate once, near the trust boundary
- then let the rest of the system work with stronger internal shapes

---

## Pattern 2 — Runtime Validation Should Produce Better Internal Types

Validation is strongest when it does more than return a boolean.

High-value posture:
- validate input
- transform/coerce when appropriate
- produce stronger internal types
- let downstream code operate on already-trusted shapes

The doctrine is:
- runtime validation should improve the type truth available inside the system
- not simply create a gate and then force downstream code to keep defending itself again

This is where runtime validation becomes architectural leverage.

---

## Pattern 3 — Compile-Time Precision and Runtime Validation Are Partners

A common TypeScript failure mode is treating compile-time types and runtime validation as competing strategies.
They are not.

### Compile-time types are best for
- internal correctness
- API ergonomics
- refactor safety
- expressing known invariants

### Runtime validation is best for
- external trust boundaries
- untrusted payloads
- persisted or version-drifting data
- config and IPC seams

The doctrine is:
- use compile-time types to preserve trusted truth
- use runtime validation to establish trust where it does not yet exist

This is the correct division of labor.

---

## Pattern 4 — Library Choice Should Follow Boundary Pressure

The right validation tool depends on what pressure dominates.

| Dominant Pressure | Preferred Posture | Why |
|---|---|---|
| ecosystem breadth, DX, full-stack integration | Zod-like posture | broad adoption, ergonomic developer experience |
| JSON Schema / OpenAPI / higher throughput | TypeBox-like posture | schema-first and compiled-validation strengths |
| minimal bundle / edge constraint | Valibot-like posture | stronger size profile |

The correct question is not:
> which validation library is best?

The correct question is:
> which pressure dominates this boundary?

The doctrine is:
- library choice is an architecture decision because it shapes schema ownership, error surfaces, build artifacts, and runtime cost

---

## Pattern 5 — Validation and Error Shape Belong Together

A validation strategy is incomplete if it does not answer:
- how failures are reported
- whether errors are field-specific or flattened
- whether consumers get structured machine-readable detail or human-oriented summaries
- whether the audience is UI, API, logs, or operators

The doctrine is:
- validation is also failure-surface design
- the schema and the error shape should be chosen together

This is one of the most common missing pieces in otherwise “correct” validation setups.

---

## Pattern 6 — Generated Contracts Reduce Drift, Not Trust Decisions

When contracts are generated from another source of truth, runtime validation burden may shift.
But it does not disappear automatically.

Questions still matter:
- how trustworthy is the caller?
- can versions drift in deployment?
- is data crossing process/runtime boundaries?
- is the consumer environment under our control?

Generated contracts reduce one problem: drift.  
They do not erase boundary risk.

The doctrine is:
- generated contracts improve contract ownership
- they do not by themselves make runtime validation unnecessary

---

## Pattern 7 — Validation Cost Should Match Boundary Risk

Not every boundary needs maximal ceremony.

Use proportion:
- high-risk external data -> stronger validation
- low-risk internal generated contract -> lighter posture may be enough
- expensive hot path -> validate once and preserve strong internal shapes afterward
- local, tightly owned app code -> smaller schemas may be preferable to heavyweight framework integration

The doctrine is:
- validation cost should be justified by trust risk and support burden
- not chosen by purity or laziness alone

This is what keeps runtime validation both real and usable.

---

## Pattern 8 — Revalidation Should Be Deliberate, Not Habitual

A codebase often becomes validation-heavy in the wrong places when every layer starts re-checking the same shape.

The doctrine is:
- validate at the trust boundary
- preserve the trusted type internally
- revalidate only when the shape crosses into a new trust domain or is materially transformed

This keeps the architecture from drowning in redundant schemas and inconsistent failure semantics.

---

## Pattern 9 — Branded / Narrowed Internal Types Are Good Post-Validation Targets

A high-value pattern is:
- validate at boundary
- then brand or narrow the value
- then let the rest of the system rely on the stronger semantic type

Examples:
- validated email string
- validated user ID
- trusted route param set
- parsed/validated config object

The doctrine is:
- validation should not only reject bad data
- it should produce semantically stronger internal state where possible

This is one of the strongest bridges between clean-code and advanced typing.

---

## Pattern 10 — Runtime Validation Is Also Governance

Whether a project validates:
- config at boot
- payloads at API boundaries
- stored state on rehydration
- IPC contracts at bridge edges

is not just implementation detail.
It is governance.

The doctrine is:
- trust-boundary posture should be reviewable, explainable, and reflected in the engine's docs and quality gates
- not left to ad hoc local habits

This is why runtime validation belongs in the `clean-code` lane and connects directly to quality gates.

---

## Pattern 11 — Validate Early Enough to Fail Cheaply

Good validation placement tends to fail:
- near ingress
- before business logic consumes poisoned state
- before invalid config creates long diagnostic chains
- before a cross-language or cross-runtime boundary becomes ambiguous

The doctrine is:
- the earlier a boundary can honestly reject or normalize bad input, the cheaper the system becomes to debug

Validation is partly about economics, not just correctness.

---

## Runtime Validation Checklist

Before calling a runtime-validation posture healthy, ask:

- [ ] Have we identified the actual trust boundaries?
- [ ] Is validation happening at those boundaries rather than scattered through every layer?
- [ ] Does validation produce stronger internal shapes for downstream code?
- [ ] Does the chosen library match the dominant architectural pressure?
- [ ] Are generated contracts reducing drift without being mistaken for proof of runtime trust?
- [ ] Is error shape designed deliberately for its consumers?
- [ ] Are we avoiding redundant revalidation where no new trust boundary exists?

---

## Anti-Patterns

- no runtime validation at user/API/config boundaries
- validating the same shape repeatedly across layers
- using `as` casts instead of validation at trust boundaries
- choosing a validation library by trend rather than boundary pressure
- treating generated contracts as universal proof of runtime safety
- returning unusable validation failures that do not help the consumer recover
- letting validation become framework ritual instead of explicit architecture

---

## Why This Matters to `typescript-coding-engine`

This is one of the engine's core clean-code doctrine docs because it teaches:
- trust-boundary thinking
- validation placement by boundary economics
- library selection by pressure profile
- the difference between compile-time certainty and runtime trust
- how validation should cooperate with strict typing rather than compete with it

It should remain a primary routing document for runtime-validation decisions.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `quality-gates-governance.md`
- `toolchain-posture.md`
- `../foundations/strict-type-system-posture.md`
- `../foundations/typescript-type-error-diagnosis-and-recovery.md`
- `../advanced/type-level-programming-patterns.md`
- `../architecture/typescript-architecture-decision-trees.md`

---

## Final Doctrine

The reusable lesson is not:
> “TypeScript's compile-time guarantees stop at trust boundaries, so validate external data at runtime.”

The reusable lesson is:
> “runtime validation is the architecture of trust recovery: identify where data stops being trustworthy, validate once at that boundary, transform it into stronger internal types, and choose libraries, error shapes, and revalidation strategy according to the real risk and support burden of the system.”
