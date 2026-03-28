# Cross-Language Comparison Index

## Purpose

Canonical entrypoint for comparative reference notes that help reason about Rust by contrast with other ecosystems.

Use this category when the task is about:

- comparing Rust error and boundary patterns with another language
- clarifying why Rust makes a different design trade-off than Go, Java, JS/TS, or Python
- helping cross-language teams translate instincts from another ecosystem into Rust-native thinking
- contrastive reasoning after the Rust-side doctrine is already clear

These documents are supporting references, not first-line canonical Rust doctrine.
This index exists to keep them in that role.

## Source Provenance

- **Primary source:** current comparative notes under `references/cross-language/`
- **Derived from:** cross-language comparison material retained for contrastive reasoning, not primary Rust doctrine
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current comparative reference zone

---

## Cross-Language Spine

The cross-language subtree now has a clear doctrinal spine:

1. **Rust doctrine first**
   - usually `../error-patterns/INDEX.md`
   - sometimes `../interop/INDEX.md` when the real issue is boundary translation
2. **Comparative aids second**
   - Go
   - Java
   - JavaScript / TypeScript
   - Python
3. **Return to the owning Rust lane**
   - error, interop, production, or foundations depending on what the contrast clarified

The doctrine is:
- cross-language notes exist to sharpen Rust reasoning by contrast
- not to replace Rust doctrine with ecosystem comparisons

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `go-error-handling-patterns.md` | Contrast Rust and Go fallibility, error values, and panic/recover posture | you need to explain why Rust error boundaries differ from Go error-value culture |
| `java-error-handling-patterns.md` | Contrast Rust and Java exception/error posture | you need to compare Rust's typed fallibility with Java's exception-centered model |
| `javascript-typescript-error-handling-patterns.md` | Contrast Rust and JS/TS error approaches | you need to translate between Rust failure law and JS/TS runtime or Promise-centric expectations |
| `python-error-handling-patterns.md` | Contrast Rust and Python exception posture | you need to explain how Rust differs from Python's exception and ergonomics model |

---

## Reading Paths

### If you are comparing error-handling cultures

1. `../error-patterns/INDEX.md`
2. the matching comparative note
3. return to the Rust error lane to make the actual design decision

### If you are translating cross-language team intuition into Rust

1. start from the Rust doctrine lane first
2. read the matching comparative note
3. explain the difference in terms of boundary truth, ownership, and failure law
4. route back into the Rust lane that owns the implementation decision

### If the task is interop-adjacent rather than purely comparative

1. `../interop/INDEX.md`
2. the matching comparative note only if it helps explain consumer expectations
3. return to the Rust interop doctrine page that owns the boundary

### If the task is educational or onboarding-focused

1. `../foundations/INDEX.md` or `../error-patterns/INDEX.md`
2. the comparative note that best matches the learner's original ecosystem
3. then back to Rust doctrine once the contrast has done its work

The doctrine is:
- contrast is useful when it reduces confusion
- it becomes harmful when it replaces Rust-first reasoning

---

## Cross-Language Decision Questions

Before choosing a comparative note, ask:

1. Is the real goal to **understand Rust better by contrast**, or to solve a Rust-local design problem directly?
2. Has the Rust-side doctrine already been read, or am I jumping into comparison too early?
3. Is this comparison about **error shape**, **boundary translation**, **runtime expectation**, or **developer intuition migration**?
4. Will the comparison clarify the decision, or merely delay choosing the Rust doctrine that actually owns the answer?

The doctrine is:
- comparative notes are organized by clarification pressure
- not by language familiarity alone

---

## Cross-Links

Comparative doctrine overlaps naturally with these lanes:

- **Error patterns**
  - `../error-patterns/INDEX.md`
  - `../error-patterns/rust-error-handling-patterns.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-ffi-and-interop-overview.md`
- **Foundations**
  - `../foundations/INDEX.md`

The doctrine is:
- cross-language notes are where contrast becomes explicit
- so they must remain subordinate to the Rust doctrine they are helping explain

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- comparative reference notes
- the Rust doctrine lanes that must be read first
- stable category indexes rather than donor paths

It should **not** encourage using comparative notes as the main starting point for everyday Rust problem-solving.

---

## Final Rule

The reusable lesson is not:
> “cross-language is where the Rust-vs-other-language comparison notes live.”

The reusable lesson is:
> “the cross-language subtree is the canonical navigation layer for contrastive reasoning—guiding engineers to read Rust doctrine first, use comparison notes only to sharpen understanding, and then return to the owning Rust lane before making real design decisions.”
