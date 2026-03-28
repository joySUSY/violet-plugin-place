# Type-Level Programming Patterns

## Purpose

Define the canonical advanced-type doctrine for `typescript-coding-engine`.

This document exists because advanced TypeScript should not be taught as a bag of clever tricks.
It should be taught as a set of tools for preserving and transforming meaningful information across boundaries.

The focused question is:

> when should advanced type-level programming be used to clarify contracts, preserve semantics, and improve architecture—and when does it merely manufacture mystique and debugging cost?

It focuses on:
- information-preserving types
- inference-aware API design
- contract transformation
- branded/opaque types
- overloads and builders
- complexity budgeting for advanced types

## Source Provenance

- **Primary source:** current `typescript-coding-engine` advanced doctrine subtree
- **Derived from:** inference, advanced-type, narrowing, branding, and type-level canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local advanced-type doctrine aligned to the current TypeScript engine

---

## Core Rule

Advanced TypeScript should clarify contracts, not obscure them.

The point of type-level programming is not to look clever.
The point is to make APIs, invariants, and architecture more precise at the places where precision actually pays for itself.

The goal is not maximal type cleverness.  
The goal is information preservation with justified complexity.

---

## Advanced-Type Pressure Map

| Pressure | What advanced types can help preserve |
|---|---|
| Literal precision | exact values, routes, event keys, discriminants |
| Input/output coupling | generic relationships and inference fidelity |
| Contract transformation | mapped/conditional/template-literal transformations |
| Semantic separation | branded / opaque distinctions over same runtime primitive |
| Protocol state | impossible-state reduction and state-machine discipline |
| Public API ergonomics | overloads/builders that guide usage without losing truth |

Advanced types are strongest when one of these pressures is genuinely present.

---

## Pattern 1 — Use Advanced Types to Preserve Information, Not Manufacture Mystique

Generics, mapped types, conditional types, and template-literal types are most valuable when they preserve meaningful information through boundaries.

Good use:
- preserving literal information
- extracting API contracts
- deriving event or route keys
- making impossible states harder to represent
- carrying precise relationships through compositional helpers

Bad use:
- decorative complexity
- unreadable helper stacks for tiny gains
- type gymnastics where a simpler runtime shape would be clearer
- collapsing debugging time into “type magic” nobody can explain later

The doctrine is:
- advanced types should buy real truth preservation
- if they do not, they are usually too expensive

---

## Pattern 2 — Inference Is a First-Class Design Tool

A strong donor lesson is that deep inference is not accidental.
It is designed.

That means:
- API shape should help inference succeed
- constraints should be chosen deliberately
- builders and fluent APIs should preserve information rather than erase it
- wrappers should avoid widening relationships away from the compiler

The doctrine is:
- inference quality is part of API design quality
- not a lucky side effect of using generics

If your API only works when users constantly force type arguments manually, the surface is probably under-designed.

---

## Pattern 3 — Conditional and Mapped Types Are Contract Transformers

These tools shine when transforming one known contract into another.

Examples:
- API response transformations
- event payload selection
- route-derived parameter extraction
- readonly/nullable/partial contract derivation
- DTO-to-viewmodel or schema-to-client transformations

The doctrine is:
- use these types to transform meaningful contracts systematically
- avoid using them as puzzles detached from product value

A transformed contract should still be explainable in domain terms, not just compiler terms.

---

## Pattern 4 — Brand and Opaque Types Protect Semantics

Branding and opaque-type patterns matter when multiple values share the same primitive runtime shape but different meanings.

Examples:
- IDs
- tokens
- specialized strings
- protocol/state markers
- "already validated" vs merely untrusted values

This is one of the most architecture-relevant advanced TS patterns because it prevents semantic collapse into generic primitives.

The doctrine is:
- add semantic protection where the runtime cannot distinguish important meanings by shape alone
- do not let all strings become morally interchangeable just because they compile

---

## Pattern 5 — Template-Literal Types Are Protocol Tools, Not Decoration

Template-literal types are useful when string structure has real protocol meaning.

Examples:
- route keys
- event namespaces
- cache keys
- action types
- command strings with constrained patterns

The doctrine is:
- use template-literal types where structured string spaces matter to system correctness
- avoid them where ordinary strings are sufficient and the protocol is better documented by simpler means

They are strongest when they make invalid protocol combinations harder to express.

---

## Pattern 6 — Overloads and Builders Should Stay Legible

Overloads and builder patterns can preserve strong typing.
But they also create readability and maintenance risk.

Doctrine should therefore teach:
- use overloads when they clarify distinct call shapes
- use builders when progressive accumulation is real
- stop before the type surface becomes harder to read than the problem itself

The doctrine is:
- overloads and builders are interface design tools, not demonstrations of language power

If users need to reverse-engineer the overload set to understand the API, the design is already paying too much complexity tax.

---

## Pattern 7 — Advanced Types Should Compress, Not Expand, Mental Load

A type-level construction is justified when it reduces future uncertainty.

Useful questions:
- does this type eliminate a class of invalid states?
- does it preserve an important relationship automatically?
- does it make the public contract easier to trust?
- does it reduce future annotation or assertion noise?

The doctrine is:
- a good advanced type should reduce the number of things the maintainer must remember manually
- not increase them

This is one of the clearest tests for whether complexity is buying value.

---

## Pattern 8 — Error Diagnosis Is Part of Advanced Practice

A mature TypeScript engine must treat type-error diagnosis as part of advanced-type doctrine.

Why:
- advanced type systems produce advanced failure modes
- error messages often encode important clues about inference and distribution
- good type engineering includes the ability to read the compiler's complaints

The doctrine is:
- advanced patterns and error diagnosis belong close together
- if a type cannot be debugged, it is not mature enough for production use

This is why the advanced lane stays linked to foundations diagnostics.

---

## Pattern 9 — Runtime Validation and Advanced Types Must Cooperate

Advanced compile-time modeling does not eliminate runtime uncertainty.

Examples:
- branded types may still need validated constructors
- transformed contracts may still begin from untrusted input
- protocol-safe strings may still come from uncontrolled external systems

The doctrine is:
- advanced types should align with runtime-validation boundaries
- not pretend compile-time precision makes untrusted input trustworthy by magic

This is how the engine avoids elegant lies.

---

## Pattern 10 — Complexity Must Be Budgeted Explicitly

Advanced types are not free.
They cost:
- readability
- onboarding time
- compiler comprehension effort
- error-debugging time
- refactor complexity

The doctrine is:
- spend advanced-type complexity only where the information preserved is worth the long-term maintenance cost
- complexity should be justified at important boundaries, not spread by habit

A useful heuristic:
- if the type explanation is longer than the business rule and yields little safety, simplify it

---

## Pattern 11 — Public APIs Deserve Better Advanced Types Than Internal Glue

Public, shared, or library-facing APIs often justify stronger type-level precision than short-lived internal glue code.

Examples:
- reusable packages
- generated or shared contract layers
- event systems used across teams
- boundary adapters exposed to multiple consumers

The doctrine is:
- increase advanced-type ceremony as the support burden of the interface increases
- internal code can often stay simpler if the boundary is already well-protected elsewhere

This helps the system spend complexity where it pays the most rent.

---

## Advanced-Type Checklist

Before calling an advanced type pattern healthy, ask:

- [ ] What exact information is this type preserving?
- [ ] Is inference improved or harmed by this design?
- [ ] Is the transformation tied to a real contract shape?
- [ ] Would branding or template literals protect semantics better than plain primitives?
- [ ] Can a maintainer still debug this type system when it fails?
- [ ] Does this reduce future mental load—or just move it into a harder-to-see place?
- [ ] Is the complexity budget justified by the boundary or support burden?

---

## Anti-Patterns

- advanced types used as puzzles rather than boundary tools
- inference that only works with repeated manual rescue
- conditional/mapped/template-literal stacks with no clear contract story
- branding where semantics do not actually differ meaningfully
- overload surfaces more confusing than the API they are supposed to clarify
- compile-time precision used to avoid runtime validation at untrusted boundaries
- type-level cleverness whose debugging cost exceeds its safety value

---

## Why This Matters to `typescript-coding-engine`

This document anchors the engine's advanced-type posture around:
- preserving information
- transforming contracts
- protecting semantics
- keeping complexity justified
- linking advanced patterns back to diagnostics and runtime truth

That is the correct doctrinal baseline before writing even deeper module-level advanced chapters.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../foundations/strict-type-system-posture.md`
- `../foundations/typescript-type-error-diagnosis-and-recovery.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../architecture/typescript-architecture-decision-trees.md`

---

## Final Doctrine

The reusable lesson is not:
> “advanced TypeScript should preserve information and avoid unnecessary cleverness.”

The reusable lesson is:
> “type-level programming is justified when it preserves real contract truth, semantic distinctions, and inference quality at important boundaries; it should compress future uncertainty, cooperate with runtime validation, and never cost more in obscurity than it buys in safety.”
