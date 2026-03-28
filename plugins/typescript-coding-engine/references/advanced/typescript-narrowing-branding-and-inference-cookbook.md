# TypeScript Narrowing, Branding, and Inference Cookbook

## Purpose

Define the canonical practical cookbook for some of the highest-value advanced TypeScript patterns inside `typescript-coding-engine`.

This document complements `type-level-programming-patterns.md`.
Where the lane root explains why advanced types matter, this cookbook answers a more operational question:

> when facing a real design problem, when should we choose narrowing, discriminated unions, branding, inference-preserving APIs, assertion functions, or overloads—and what practical signals tell us one pattern is more honest than another?

It focuses on:
- narrowing as proof
- discriminated unions as state modeling
- branding and opaque types
- inference preservation
- overload judgment
- combining validation with stronger semantic types

## Source Provenance

- **Primary source:** current `typescript-coding-engine` advanced doctrine subtree
- **Derived from:** narrowing, branding, inference, overload, and boundary-pattern canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local advanced cookbook doctrine aligned to the current TypeScript engine

---

## Core Rule

Advanced TypeScript earns its keep when it preserves semantic truth and improves contract clarity.

The goal is not to impress the compiler.
The goal is to make the right information survive through the system with the smallest pattern that honestly fits the problem.

This cookbook exists to help choose the right advanced tool under pressure instead of reaching for the fanciest one by habit.

---

## Pattern Selection Ladder

A healthy escalation order is usually:

1. plain type/interface
2. union or discriminated union
3. generic + inference-aware API
4. branded/opaque type
5. mapped/conditional/template-literal composition
6. overloads if call-shape precision is truly necessary

This order is not absolute.
It is a default pressure-tested ladder that helps prevent premature type cleverness.

The doctrine is:
- choose the smallest tool that preserves the truth you actually need
- escalate only when the simpler shape loses important semantics

---

## Pattern 1 — Use Narrowing to Earn Precision

When a value starts broad, the code should earn its precision through:
- `typeof`
- `instanceof`
- truthiness checks when appropriate
- `in` operator
- discriminated unions
- custom type guards
- assertion functions

The key lesson:
- narrowing is how TypeScript models trust growth through control flow

The doctrine is:
- prefer earning precision through proof over forcing it through assertion

If the system has not yet proved a value is safe, the type should not pretend otherwise.

### Good use cases
- parsing broad event payloads
- branching on async state variants
- consuming `unknown` from a boundary
- refining optional or partial object shapes

### Anti-signal
If you keep writing `as X` at the use site, you probably needed a guard or a better upstream model.

---

## Pattern 2 — Prefer Discriminated Unions for Real State Machines

If the system has a fixed set of meaningful states, a discriminated union is often the cleanest model.

Use it for:
- async/loading/result states
- UI states
- command/result envelopes
- protocol phases
- domain lifecycle states

Why:
- it enables exhaustiveness checks
- it makes impossible branches harder to write
- it documents system behavior directly in the type surface

The doctrine is:
- use discriminated unions when the state space is finite and meaningful
- do not flatten state machines into optional-property soup

### Smell
If a type has many optional fields whose valid combinations are implicit, it is often a state machine pretending not to be one.

---

## Pattern 3 — Brand / Opaque Types Preserve Semantic Separation

Use branded or opaque types when multiple values share the same primitive runtime type but not the same meaning.

Examples:
- `UserId`
- `PostId`
- validated email string
- validated password
- branded token or key
- domain-specific identifiers crossing module boundaries

The doctrine is:
- semantic separation matters even when runtime representation is the same
- branding is justified when accidental interchange would be a real bug

### Good use cases
- IDs from different domains
- validated values crossing trust boundaries
- state-machine markers or status tokens

### Bad use cases
- branding every primitive for style points
- branding where the semantic distinction is not actually operationally important

---

## Pattern 4 — Assertion Functions Should Expose Real Invariants

Assertion functions are powerful when:
- invalid input should stop the current path immediately
- the postcondition should be reflected in the type system
- callers benefit from a cleaner happy path

They are not a substitute for a missing model.
They are a tool for exposing a real invariant.

The doctrine is:
- assertion functions should clarify “after this point, the system knows X”
- not act as dressed-up unchecked casts

### Best use cases
- internal guardrails in trusted-but-asserted paths
- invariant enforcement after parsing or normalization
- impossible-state defense in system internals

### Warning sign
If the assertion body itself contains weak assumptions, the function is only hiding the unsafety behind a nicer API.

---

## Pattern 5 — Deep Inference Is a Design Goal

If the API depends on preserving literal or nested structure, inference should be designed intentionally.

Useful tools:
- `as const`
- `satisfies`
- const type parameters
- inference-friendly generic API shape
- preserving tuple/literal information across helpers

The doctrine is:
- good inference is not an accident
- it is an API design property

### Good use cases
- route/config registries
- event maps
- builder APIs where output shape depends on input shape
- helper libraries that should preserve literals instead of widening them away

### Smell
If consumers constantly rescue inference manually with explicit type arguments or assertions, the API surface is likely erasing truth too early.

---

## Pattern 6 — Overloads Are for Distinct Call Shapes

Use overloads when:
- the function supports meaningfully distinct call signatures
- return behavior depends on call shape
- a single broad union signature would erase useful precision

Do not use overloads when a simple union is enough.

The doctrine is:
- overloads justify themselves when they preserve distinct semantic call modes
- not when they merely restate trivial unions with more ceremony

### Good use cases
- APIs with clearly different return types by input shape
- builder/helper entrypoints with genuinely separate modes
- public library surfaces where consumer ergonomics matter

### Smell
If the overload list becomes the main complexity of understanding the API, the design may want separate functions instead.

---

## Pattern 7 — Narrowing + Validation Is a High-Value Combination

One of the best full-stack TypeScript moves is:
- validate at the boundary
- then narrow or brand
- then keep the rest of the system honest with stronger types

This lets runtime certainty become compile-time leverage.

The doctrine is:
- validation and advanced typing should reinforce each other
- not live in separate mental worlds

This is how runtime truth becomes internal semantic precision.

---

## Pattern 8 — Choose the Smallest Sufficient Type Tool for the Boundary

When solving a problem, ask:
- is this really a state-machine problem?
- is this really an identity/semantic-separation problem?
- is this really an inference-preservation problem?
- is this really a contract-transformation problem?

The doctrine is:
- identify the boundary pressure before selecting the type tool
- otherwise the code will look advanced but solve the wrong problem

This is the practical companion to the lane root's information-preservation rule.

---

## Pattern 9 — Advanced Patterns Should Improve API Ergonomics for Others, Not Just for the Author

Advanced TypeScript is most justified when it improves life for downstream consumers.

Examples:
- fewer required annotations
- safer defaults
- clearer state transitions
- better autocomplete and return inference
- fewer invalid combinations representable

The doctrine is:
- advanced typing should usually increase consumer clarity
- if it only increases author cleverness, it is probably overbuilt

This is especially important for public/shared APIs.

---

## Pattern 10 — Stop When the Pattern Starts Costing More Than It Saves

A pattern is too expensive when:
- the explanation is longer than the business rule
- debugging the type is harder than debugging the runtime behavior
- maintainers cannot tell why the type exists
- the runtime model could be made simpler instead

The doctrine is:
- advanced types have a complexity budget
- spend it where the preserved truth is durable and important

This is how the engine avoids type-level theater.

---

## Practical Cookbook Matrix

| Problem Shape | Preferred Pattern | Why |
|---|---|---|
| broad input becoming trusted internal value | guard or validation + narrowing | prove before use |
| finite domain states | discriminated union | exhaustiveness + impossible-state reduction |
| semantically different IDs/tokens with same primitive shape | brand/opaque type | prevent accidental interchange |
| API where output depends on precise input shape | inference-aware generic design | preserve information through the call |
| genuinely distinct call modes | overloads | better consumer precision |
| string spaces with real protocol meaning | template-literal types | constrain protocol strings structurally |

Use this matrix as a routing aid, not a substitute for judgment.

---

## Cookbook Checklist

Before choosing an advanced TypeScript pattern, ask:

- [ ] What semantic or structural truth am I trying to preserve?
- [ ] Could narrowing or a discriminated union solve this before generics or brands are needed?
- [ ] Is branding protecting a real semantic distinction?
- [ ] Is inference getting better, or am I asking users to rescue it manually?
- [ ] Are overloads clarifying distinct call modes or just adding ceremony?
- [ ] Will this pattern reduce future mental load for maintainers and consumers?
- [ ] Does runtime validation need to work with this pattern at the boundary?

---

## Anti-Patterns

- `as X` used where a guard should exist
- branding every primitive for aesthetic reasons
- overloads for trivial cases
- deep inference tricks where plain annotations would be clearer
- narrowings that depend on accidental property presence instead of real contract design
- advanced type patterns that improve neither safety nor ergonomics
- compile-time elegance used to avoid confronting a weak runtime model

---

## Why This Matters to `typescript-coding-engine`

This cookbook is part of the advanced backbone because it teaches:
- how to preserve semantic truth
- how to turn runtime checks into type leverage
- how to choose among narrowing, branding, inference, and overloads with purpose
- how to spend advanced-type complexity where it buys durable clarity

It is one of the key bridges between foundations strictness, advanced type design, and runtime-boundary honesty.

---

## Cross-Links

Read this alongside:
- `type-level-programming-patterns.md`
- `../foundations/strict-type-system-posture.md`
- `../foundations/typescript-type-error-diagnosis-and-recovery.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../architecture/typescript-architecture-decision-trees.md`

---

## Final Doctrine

The reusable lesson is not:
> “choose among narrowing, branding, inference, and overloads depending on the situation.”

The reusable lesson is:
> “advanced TypeScript patterns are practical boundary tools: use the smallest one that preserves the semantic or structural truth you actually care about, let validation and narrowing establish trust before precision grows, and stop escalating once the complexity costs more than the future certainty it buys.”
