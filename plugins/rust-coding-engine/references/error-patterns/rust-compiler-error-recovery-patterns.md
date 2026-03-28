# Rust Compiler Error Recovery Patterns

## Purpose

Provide a canonical recovery framework for common Rust compiler errors, with emphasis on architectural alternatives rather than surface-level patching.

This document is requirement-grade doctrine: it exists because the engine must teach error-code-specific recovery patterns, not just language trivia.

## Source Provenance

- **Primary donor families:** `rust-error-handling-result-option-match-main`, `rust-skills` error-rule family
- **Key local donor materials:**
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
  - `rust-error-handling-result-option-match-main/README.md`
  - `rust-skills/rules/err-*.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


---

## Core Rule

A compiler error is often a design signal.

Do not treat Rust errors as nuisances to suppress.
Treat them as feedback about:
- ownership design
- lifetime design
- boundary placement
- mutation scope
- return-type honesty

The correct recovery question is:
> what architectural assumption is the compiler rejecting?

---

## E0382 — Use of Moved Value

### Signal
Ownership was transferred, but later code still assumes access.

### Recovery families
1. **Borrow instead of move**
   - redesign the API to take `&T` or `&mut T`
   - best when the callee only needs access, not ownership

2. **Clone deliberately**
   - acceptable when the value is cheap or duplication is semantically honest
   - not a default if clone pressure keeps recurring

3. **Shared ownership model**
   - use `Rc`, `Arc`, or another explicit shared-owner pattern when multiple owners are real

### Red flag
If `clone()` becomes the reflexive fix everywhere, the ownership model is probably wrong.

---

## E0597 — Borrowed Value Does Not Live Long Enough

### Signal
A reference outlives the owner that makes it valid.

### Recovery families
1. **Extend owner lifetime**
   - move the owner outward in scope
   - keep the borrowed reference within a valid lifetime window

2. **Return or store owned data instead**
   - change the boundary so it moves or clones the necessary value
   - useful when the reference must escape the current scope

3. **Reduce the borrow lifetime**
   - restructure the code so the borrow is used earlier and dropped sooner

### Red flag
If the immediate instinct is “add more lifetime annotations,” pause.
The problem is often ownership shape, not annotation quantity.

---

## E0506 — Cannot Assign Because It Is Borrowed

### Signal
The code tries to mutate while an outstanding borrow still exists.

### Recovery families
1. **Split the borrow scope**
   - isolate the read phase
   - drop the borrow
   - then perform the mutation

2. **Redesign ownership flow**
   - separate read and write responsibilities
   - move mutation into a narrower phase or different owner

3. **Interior mutability**
   - only if the domain truly requires shared mutable access
   - choose `Cell`, `RefCell`, `Mutex`, `RwLock`, etc. intentionally

### Red flag
Interior mutability used only to silence the compiler is usually a design smell.

---

## E0507 — Cannot Move Out of Borrowed Content

### Signal
The code wants ownership of data that is only accessible through a borrow.

### Recovery families
1. **Borrow instead of extracting ownership**
2. **Clone only the needed piece** when duplication is acceptable
3. **Refactor storage or API shape** so the move happens from an owning context
4. **Use `take`, `replace`, or explicit state transitions** when moving out is semantically part of mutation

### Red flag
If moving out of borrowed content keeps happening, the current abstraction may be hiding who actually owns the state.

---

## E0515 — Cannot Return Reference to Local Data

### Signal
The function is trying to return a reference to something that will die at function exit.

### Recovery families
1. **Return an owned value**
2. **Move the owner outward** so the returned reference is valid
3. **Store the data in a longer-lived structure** and return a reference to that longer-lived owner

### Red flag
If a function needs to return references to local temporaries often, the boundary is likely shaped incorrectly.

---

## E0716 — Temporary Value Dropped While Borrowed

### Signal
A borrowed value depends on a temporary that vanishes too early.

### Recovery families
1. **Bind the temporary to a named local first**
2. **Extend storage duration deliberately**
3. **Restructure the call chain** so the borrowed use stays within the temporary's lifetime

### Red flag
Long method chains that create temporaries and then borrow from them are often readability and lifetime hazards at once.

---

## Recovery Workflow

When encountering a compiler error, follow this order:

1. identify the ownership/lifetime/mutation assumption being rejected
2. classify the error into the correct family
3. choose 2-3 recovery families
4. prefer the smallest recovery that preserves architectural honesty
5. update the surrounding API/model if the error reveals repeated structural pressure

---

## Anti-Patterns

- fixing every error with `clone()`
- fixing lifetime issues with annotation spam
- using `unsafe` to bypass ownership signals
- defaulting to interior mutability without domain justification
- treating compiler errors as purely syntactic rather than architectural

---

## Why This Matters to `rust-coding-engine`

This is one of the core requirement-grade doctrine pieces because it teaches:
- compiler errors as design feedback
- error-code-specific recovery families
- how to move from syntax pain to architectural clarity

It should be one of the primary references used by diagnostics, ownership guidance, and borrow-checker recovery flows.
