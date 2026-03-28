# TypeScript Type Error Diagnosis and Recovery

## Purpose

Define the canonical diagnostic doctrine for type-error diagnosis and recovery inside `typescript-coding-engine`.

This document exists because the TypeScript engine should not respond to compiler errors with:
- assertion spam
- `as any`
- random interface edits
- blind cargo-cult patches

It should respond with a diagnosis model.

The real question is:

> when the compiler complains, what truth is missing, widened, contradictory, or being lied about—and what is the smallest architecturally honest recovery path?

## Source Provenance

- **Primary source:** current `typescript-coding-engine` foundations doctrine subtree
- **Derived from:** type-error diagnosis, narrowing, inference, overload, and contract-boundary canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local diagnostic doctrine aligned to the current TypeScript engine

---

## Core Rule

A TypeScript type error is usually a boundary or information-flow problem.

Do not ask only:
> what annotation will make this compile?

Ask instead:
> what truth is missing, widened, or being falsely asserted?

The goal is not to silence the compiler.  
The goal is to restore alignment between the code's claims and the system's actual data, control flow, and contracts.

---

## Diagnostic Workflow

### Step 1 — Classify the failure family
Is this about:
- widening loss
- narrowing failure
- generic/inference collapse
- advanced type transformation failure
- unsafe escape hatches
- public contract mismatch

### Step 2 — Identify where truth was lost
Ask:
- was the information present and later widened away?
- was the information never validated in the first place?
- is the type system missing a discriminant, guard, or contract?
- are we forcing the compiler to accept a lie?

### Step 3 — Choose the smallest honest recovery family
Prefer fixes that:
- preserve architectural truth
- strengthen boundaries
- reduce future recurrence

Avoid fixes that merely mute the current error while exporting new uncertainty downstream.

---

## Error Class 1 — Widening Loss

### Signal
Literal or precise information has been widened into a weaker type.

### Typical causes
- missing `as const`
- missing const-preserving inference
- object literals inferred too loosely
- wrappers or helpers that erase literal shape
- early annotation that broadens the data more than necessary

### Recovery families
1. preserve literal information (`as const`, `satisfies`, const-preserving APIs)
2. redesign the API so inference does not erase the shape
3. avoid premature annotation that broadens the contract too early
4. push precision preservation closer to the source boundary

### Red flag
If you keep re-asserting literal types after the fact, the source boundary is wrong.

### Doctrine lesson
Widening is not just an inference inconvenience.  
It is often evidence that the system lost important information too early.

---

## Error Class 2 — Narrowing Failure

### Signal
TypeScript does not know enough to safely narrow a value before use.

### Typical causes
- missing discriminant
- insufficient control-flow checks
- overly broad unions
- lack of custom type guards or assertion functions
- unvalidated `unknown` or external input

### Recovery families
1. introduce discriminated unions
2. add proper type guards or assertion functions
3. restructure control flow so narrowing happens earlier
4. split vague unions into semantically cleaner cases
5. validate before using external input as if it were trusted

### Red flag
If you keep using `as X` where a guard should exist, you are bypassing the model instead of teaching it.

### Doctrine lesson
Narrowing failures usually mean the system does not yet have proof.  
The answer is usually better proof, not louder assertion.

---

## Error Class 3 — Generic Constraint or Inference Failure

### Signal
A generic API cannot infer enough, or constraints are too weak or too vague.

### Typical causes
- generic is doing too much
- API shape hides the relationship between input and output
- constraints do not encode the real requirement
- overloads or unions would fit better than the chosen generic
- builder or helper layers that erase inference cues

### Recovery families
1. improve generic constraints
2. redesign the call surface for clearer inference
3. use overloads when distinct call shapes really exist
4. use unions when generics are unnecessary
5. split one "clever" generic into smaller APIs with sharper semantics

### Red flag
If the only way to use the API is to force generic arguments everywhere, inference design is probably weak.

### Doctrine lesson
Deep inference is a design problem, not just a compiler trick.
If inference fails repeatedly, the API surface usually needs work.

---

## Error Class 4 — Mapped / Conditional / Template-Literal Type Failure

### Signal
Advanced type-level composition stops reflecting the real contract clearly.

### Typical causes
- too much composition stacked in one type
- missing intermediate aliases
- transformation logic is too implicit
- the type is solving a runtime design problem that should remain runtime code
- cleverness outpaced readability

### Recovery families
1. split advanced types into named intermediate steps
2. simplify the transformation goal
3. move part of the complexity out of the type system if it is not buying real safety
4. use branded or union structures instead of clever transformations where appropriate
5. preserve explanation value: if the type cannot be explained, it probably should not be the contract

### Red flag
If the type explanation takes longer than the business rule, the design may be upside down.

### Doctrine lesson
Advanced types are justified when they preserve or transform real contracts.
They are weak when they exist only to demonstrate type-system virtuosity.

---

## Error Class 5 — `any` / Unsafe Assertion Escape Hatches

### Signal
The codebase uses `any`, `unknown as X`, or assertion chains to suppress real uncertainty.

### Typical causes
- missing runtime validation
- missing type guards
- weak library typings
- migration shortcuts that became permanent
- poorly modeled trust boundaries

### Recovery families
1. replace `any` with `unknown` at trust boundaries
2. validate, then narrow
3. create safe adapter types around weak external typings
4. introduce branded or guarded domain types instead of repeated unsafe assertions
5. contain unavoidable unsafety at one narrow seam with clear rationale

### Red flag
`as any` used to “unblock progress” tends to become architecture debt very quickly.

### Doctrine lesson
Unsafe escapes should be treated like hazardous materials:
- contained
- labeled
- justified
- minimized

---

## Error Class 6 — Public Contract Mismatch

### Signal
A shared/public API surface is not aligned with its intended consumer model.

### Typical causes
- `type`/`interface` misuse for the purpose
- external contract changed but wrappers stayed stale
- generated contracts and local handwritten types diverged
- optionality and nullability are underspecified
- local DTOs and runtime payloads no longer agree

### Recovery families
1. clarify public contract ownership
2. remodel optional/nullable semantics explicitly
3. prefer generated/shared contract sources where appropriate
4. tighten docs and examples around the contract
5. reduce parallel definitions of “the same” public shape

### Red flag
If two parallel definitions of the same contract exist, drift will eventually win.

### Doctrine lesson
Public contract errors are expensive because they propagate confusion outward.  
They should be treated as architecture issues, not just typing annoyances.

---

## Recovery Heuristics by Boundary

| Boundary | Prefer |
|---|---|
| External input / API payload | `unknown` + runtime validation + narrowing |
| Internal discriminated domain state | discriminants + exhaustive flow |
| Reusable generic API | stronger constraints or redesigned inference surface |
| Public/shared contract | single source of truth, generated or clearly owned |
| Weak third-party typings | adapter wrappers and isolated assertions |

This helps the engine avoid one-size-fits-all fixes.

---

## Recovery Workflow

When checking a TS type error:
1. classify the failure family
2. identify whether information was lost, never present, or falsely asserted
3. choose 2–3 recovery families
4. prefer the smallest fix that preserves architectural honesty
5. update the originating boundary if the same failure recurs

The doctrine is:
- fix at the origin when possible
- not just at the point where the compiler finally noticed the problem

---

## Anti-Patterns

- `as any` as standard practice
- widening and then patching with assertions later
- no discriminants in union-rich code
- generic APIs that require constant explicit manual rescue
- advanced type machinery masking a weak runtime model
- handwritten duplicate public contracts drifting from generated or source contracts
- treating every compiler complaint like a local annotation problem

---

## Why This Matters to `typescript-coding-engine`

This is a core diagnostic doctrine because it teaches:
- type errors as design feedback
- narrowing and inference as architectural concerns
- the difference between preserving truth and lying to the compiler
- how to recover without silently exporting more uncertainty into the system

It should remain one of the default texts behind review, diagnosis, and fix flows.

---

## Cross-Links

Read this alongside:
- `strict-type-system-posture.md`
- `../advanced/type-level-programming-patterns.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../clean-code/typescript-anti-patterns-and-migration-ladders.md`
- `../interop/rust-typescript-contract-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:
> “when TypeScript errors happen, classify them and avoid `as any`.”

The reusable lesson is:
> “TypeScript error diagnosis is boundary diagnosis: classify how truth was lost, absent, or falsely asserted, then fix the smallest upstream boundary that restores honest information flow instead of merely silencing the compiler at the point of complaint.”
