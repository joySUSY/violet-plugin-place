# Strict Type-System Posture

## Purpose

Define the canonical strictness doctrine for `typescript-coding-engine`.

This document is the foundations-level statement of a simple but far-reaching rule:

> TypeScript architecture begins with compiler posture.

It exists because the TypeScript engine should not treat strictness as a cosmetic preference or a late-stage quality enhancement.
Strictness settings shape:
- what uncertainty becomes visible
- what lies the codebase is allowed to tell
- how much runtime validation pressure accumulates downstream
- how expensive refactors and reviews become later

## Source Provenance

- **Primary source:** current `typescript-coding-engine` foundations doctrine subtree
- **Derived from:** strict type-system, configuration, inference, and foundational TypeScript canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local foundations doctrine aligned to the current TypeScript engine

---

## Core Rule

TypeScript strictness is not a luxury setting.
It is the default posture that determines whether uncertainty is surfaced early or silently deferred into runtime, tests, and human review.

A weak compiler configuration quietly trains weak code.  
A strong compiler configuration turns uncertainty into explicit decisions.

The goal is not maximal suffering through flags.  
The goal is to make architectural truth visible at the boundary where it is cheapest to correct.

---

## Strictness Surface Map

| Surface | What it protects |
|---|---|
| `strict` baseline | broad type-safety posture |
| nullability / optional semantics | absence and partial data truth |
| indexed access checks | lookup uncertainty |
| literal preservation | information loss across boundaries |
| catch/error typing | unsafe error assumptions |
| config/module settings | runtime/build assumptions exposed at compile time |

Strictness is best understood as a set of visibility controls over architectural uncertainty.

---

## Pattern 1 — Strict by Default

A modern TypeScript system should prefer `strict: true` as the baseline.

Why:
- weaker defaults defer uncertainty into runtime and review cycles
- stronger defaults expose boundary mistakes earlier
- the engine can then teach advanced patterns on top of a reliable baseline instead of on permissive fog

This does **not** mean every legacy codebase can flip every flag overnight.
It means the doctrinal destination is clear.

The doctrine is:
- new projects should start strict
- existing projects should move toward strictness intentionally rather than treating loose mode as permanent comfort

---

## Pattern 2 — Configuration Is Architecture, Not Boilerplate

Compiler and project settings are part of the design surface.

High-impact examples include:
- target/module mode
- module resolution
- declaration output
- JSX/runtime assumptions
- strictness flags
- path aliasing and boundary ergonomics

The doctrine is:
- TypeScript configuration should be treated as architectural policy
- not as scaffolding trivia generated once and then ignored

A bad `tsconfig` can make good code appear worse; a good `tsconfig` can prevent a large category of future drift.

---

## Pattern 3 — `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` Encode Real Truth

These options matter because they force the codebase to acknowledge:
- array/object lookup may be absent
- optional is not the same thing as “undefined is fine everywhere”

That makes boundary reasoning more honest.

The deeper lesson is:
- seemingly small compiler switches often encode real architecture values
- they are not just style choices

The doctrine is:
- if the codebase handles data from maps, records, partial objects, or external payloads, these flags usually pay for themselves quickly

---

## Pattern 4 — `unknown` Is Usually More Honest Than `any`

A strict posture does not just reject unsafe types.
It redirects them into safer ones.

### `any`
- erases truth
- silences the compiler
- lets uncertainty spread silently

### `unknown`
- preserves the fact that something is not yet trusted
- forces narrowing or validation before use

The doctrine is:
- prefer `unknown` at trust boundaries
- reserve `any` for narrow, intentionally contained escapes with clear justification

This aligns strictness with runtime-validation doctrine rather than against it.

---

## Pattern 5 — Literal Precision Is a Structural Tool

Features like:
- `as const`
- `satisfies`
- const-preserving inference
- literal union preservation

are not advanced trivia.
They help preserve truth between:
- runtime values
- compile-time validation
- route/config/event declarations
- public API and internal implementation

The doctrine is:
- preserve precision where the system's behavior depends on exact values
- do not widen early and patch the loss later with assertions

This is why literal precision belongs in foundations, not only in advanced-types notes.

---

## Pattern 6 — Type Guards Are Foundational Boundary Tools

Type guards are not merely narrowing conveniences.
They are how strict TypeScript systems encode trust transitions.

A guard says:
- this value was previously not trusted enough
- now, after proof, downstream code may become more precise

The doctrine is:
- type guards and assertion functions belong at boundaries where unknown or partial data enters
- they are foundational to strictness because strictness without narrowing discipline just creates friction without architectural honesty

---

## Pattern 7 — Strictness Must Be Paired With Migration Strategy in Legacy Codebases

For older codebases, strictness posture should usually be phased.

Typical migration sequence:
1. establish a clear target `tsconfig` posture
2. stop new unsafe patterns from spreading
3. tighten the most valuable flags first
4. fix hot-path boundary violations
5. reduce `any` islands gradually

The doctrine is:
- strictness migration should be directional, explicit, and reviewable
- not attempted as one giant purity event that the team will immediately abandon

This keeps strictness realistic without diluting the destination.

---

## Pattern 8 — Strictness Should Reduce Runtime Burden, Not Compete With It

A strong TS posture shifts some correctness burden from runtime back into the compiler.

Examples:
- invalid call shapes caught before execution
- optionality mismatches revealed before production
- public contract drift caught during typecheck
- configuration mismatches exposed at build time

The doctrine is:
- strictness and runtime validation are partners
- strictness should reduce runtime ambiguity, while runtime validation should protect truly external or untrusted data

This is the correct division of labor.

---

## Pattern 9 — Strictness Is a Governance Decision, Not an Individual Preference

Whether a codebase allows:
- weak null handling
- silent widening
- casual `any`
- unchecked dictionary lookups
- optional/undefined blur

is not merely a personal style choice.
It is a project-level governance decision.

The doctrine is:
- strict posture should be encoded in config, CI, and review expectations
- not left to individual engineer discipline alone

This is how the engine turns strictness into durable team behavior.

---

## Pattern 10 — A Good Strict Posture Makes Type Errors More Useful

The paradox of strong strictness is that it may initially produce more compiler errors.
That is good if those errors are revealing real architectural uncertainty.

The doctrine is:
- the value of strictness is not fewer red squiggles immediately
- it is better error signal about boundary, absence, inference, and contract problems

This is why strictness must stay close to type-error diagnosis doctrine.

---

## Strictness Checklist

Before calling a TypeScript posture healthy, ask:

- [ ] Is `strict` the declared baseline or at least the explicit destination?
- [ ] Are compiler settings being treated as architectural policy rather than setup trivia?
- [ ] Are `unknown` and guards used honestly at trust boundaries?
- [ ] Is literal precision preserved where exact values matter?
- [ ] Are absence/optionality semantics explicit enough to avoid silent runtime drift?
- [ ] If the codebase is legacy, is the migration path toward strictness explicit and directional?
- [ ] Are CI and review expectations reinforcing the posture rather than undermining it?

---

## Anti-Patterns

- treating `strict` as optional polish for later
- using `any` as the default escape valve for uncertainty
- widening precise values too early, then patching with assertions
- ignoring config flags because “the code works anyway”
- treating strictness as an individual engineer preference instead of a team posture
- attempting a one-shot strict migration with no staged strategy in a messy legacy codebase

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `typescript-type-error-diagnosis-and-recovery.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../clean-code/quality-gates-governance.md`
- `../advanced/type-level-programming-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “strict mode is recommended and some extra compiler flags are helpful.”

The reusable lesson is:
> “strictness is the foundational governance posture of a TypeScript system: compiler configuration is architecture, precision should be preserved instead of widened away, and uncertainty must be surfaced early enough that the engine can respond with guards, validation, or redesign rather than with downstream guesswork.”
