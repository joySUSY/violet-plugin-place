# Rust Learning Path Index

## Purpose

Canonical entrypoint for the ordered chapter sequence used for progressive study and onboarding.

This category exists so numbered chapter content is no longer vague root clutter.
It now has an explicit role:

- progressive study,
- onboarding into Rust thinking,
- staged reinforcement of foundations before jumping into higher-pressure doctrine lanes.

This index is not only a chapter list.
It exists to route learners through the sequence deliberately and to explain when they should leave the learning path and re-enter the canonical doctrine tree for real engineering work.

## Source Provenance

- **Primary source:** current learning-path subtree under `references/learning-path/`
- **Derived from:** earlier chapterized Rust learning materials preserved under the new taxonomy
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current learning-path subtree

---

## Learning-Path Spine

The learning-path subtree now has a clear doctrinal spine:

1. **Idioms and style entry**
   - `rust-learning-path-01-coding-styles-and-idioms.md`
2. **Mechanical discipline**
   - `rust-learning-path-02-clippy-and-linting-discipline.md`
3. **Performance mindset**
   - `rust-learning-path-03-performance-mindset.md`
4. **Error and testing foundations**
   - `rust-learning-path-04-error-handling.md`
   - `rust-learning-path-05-automated-testing.md`
5. **Type-system growth**
   - `rust-learning-path-06-generics-and-dispatch.md`
   - `rust-learning-path-07-typestate-pattern.md`
6. **Documentation and pointer-model maturity**
   - `rust-learning-path-08-comments-vs-documentation.md`
   - `rust-learning-path-09-understanding-pointers.md`

The doctrine is:
- the learning path should move from surface idioms → engineering discipline → deeper type/runtime mental models
- not treat chapters as isolated notes

---

## Chapters and Their Roles

| Chapter | Primary Role | Load When |
| --- | --- | --- |
| `rust-learning-path-01-coding-styles-and-idioms.md` | Introductory idioms, naming, borrowing-first habits | you need to learn what “feels like Rust” |
| `rust-learning-path-02-clippy-and-linting-discipline.md` | Habit formation around mechanical correctness and lint culture | you are learning how Rust enforces discipline in practice |
| `rust-learning-path-03-performance-mindset.md` | Early performance mental model and evidence-first optimization thinking | you need to learn why Rust performance work is architectural, not magical |
| `rust-learning-path-04-error-handling.md` | Introductory fallibility posture and panic avoidance habits | you are learning how Rust wants failure to be modeled |
| `rust-learning-path-05-automated-testing.md` | Introductory testing culture and quality proof | you need to understand how Rust code earns trust |
| `rust-learning-path-06-generics-and-dispatch.md` | Generalization, trait-based design, and dispatch trade-offs | type abstraction pressure is the next learning step |
| `rust-learning-path-07-typestate-pattern.md` | State-machine thinking and type-driven lifecycle modeling | the learner is ready for stronger type-system design patterns |
| `rust-learning-path-08-comments-vs-documentation.md` | Difference between inline comments, public docs, and executable examples | you are learning communication discipline rather than only code shape |
| `rust-learning-path-09-understanding-pointers.md` | Deeper mental model of references, smart pointers, and ownership semantics | you need a stronger pointer/ownership intuition across ecosystems |

---

## Recommended Reading Order

Read in order unless there is a specific pedagogical reason to jump:

1. `rust-learning-path-01-coding-styles-and-idioms.md`
2. `rust-learning-path-02-clippy-and-linting-discipline.md`
3. `rust-learning-path-03-performance-mindset.md`
4. `rust-learning-path-04-error-handling.md`
5. `rust-learning-path-05-automated-testing.md`
6. `rust-learning-path-06-generics-and-dispatch.md`
7. `rust-learning-path-07-typestate-pattern.md`
8. `rust-learning-path-08-comments-vs-documentation.md`
9. `rust-learning-path-09-understanding-pointers.md`

The doctrine is:
- this path is ordered for conceptual buildup
- not just numerically organized for convenience

---

## Reading Paths

### If you are new to Rust thinking

1. Start at chapter 1
2. Continue in order through chapter 5
3. After chapter 5, branch into the foundations or quality subtree for deeper real-world doctrine

### If you already code Rust but want stronger fundamentals

1. Start with the chapter closest to the pressure you feel weakest on
2. Then route back into:
   - `../foundations/INDEX.md`
   - `../quality/INDEX.md`
   - `../error-patterns/INDEX.md`
   depending on the actual weakness

### If you are onboarding someone into the engine

1. Use the learning path to establish shared vocabulary and baseline habits
2. Once the learner reaches a real engineering problem, stop using the learning path as the primary surface
3. Route into the canonical doctrine lane that now owns the task

### If a practical task becomes concrete mid-study

Leave the learning path and route back into the doctrine tree:
- foundations for ownership and idiom questions
- architecture for system-shape questions
- async-concurrency for runtime coordination questions
- error-patterns for failure-boundary questions
- production for operational or release questions

The doctrine is:
- the learning path is for conceptual ramp-up
- the doctrine tree is for real problem-solving

---

## Learning-Path Decision Questions

Before choosing the learning path, ask:

1. Is the real goal **learning progression**, or is it **solving a concrete engineering problem now**?
2. Does the learner need ordered conceptual buildup, or do they already know enough to go directly into a doctrine lane?
3. Is the current friction about idioms, quality discipline, error handling, type-system maturity, or ownership/pointer intuition?
4. Should the answer come from a teaching chapter, or from the production-grade doctrine directly?

The doctrine is:
- the learning path is organized by learning pressure and onboarding pressure
- not by which chapter title sounds closest to the current bug or feature

---

## Cross-Links

Learning-path doctrine overlaps naturally with these lanes:

- **Foundations**
  - `../foundations/INDEX.md`
  - `../foundations/rust-foundations-ownership-memory-safety.md`
- **Quality**
  - `../quality/INDEX.md`
  - `../quality/rust-testing-patterns.md`
- **Error patterns**
  - `../error-patterns/INDEX.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:
- learning is where Rust mental models become explicit
- so it must remain connected to the deeper doctrine tree instead of pretending the chapter sequence is a separate knowledge world

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- chapter files
- stable canonical category indexes
- doctrine-aware cross-links back into the main reference tree

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “learning-path is where the numbered Rust study chapters live.”

The reusable lesson is:
> “the learning-path subtree is the canonical navigation layer for staged Rust onboarding—guiding learners through a deliberate conceptual sequence, then routing them back into the main doctrine tree once the work stops being study and starts being engineering.”
