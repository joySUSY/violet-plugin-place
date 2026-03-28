# Rust Books Index

## Purpose

Canonical entrypoint for long-form book and article reservoirs that have been distilled into Rust doctrine.

Use this category when the task is about:

- book-derived Rust architecture lessons
- article-derived error-handling philosophy
- long-form reservoirs that deepen an already chosen doctrine lane
- tracing where a canonized idea came from in a narrative or book-length source

This index is not only a list of raw assets.
It exists to route readers from long-form reservoirs into the already canonized doctrine they strengthen, so books and articles remain evidence and reinforcement rather than becoming a second primary knowledge center.

## Source Provenance

- **Primary source:** local long-form book/article donor assets and their derived doctrine files under `references/books/`
- **Derived from:** PDF and HTML reservoirs currently kept in the workspace plus extracted canonical doctrine pages
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current books/article doctrine zone; individual donor freshness may still differ and should be tracked in extraction docs

---

## Books Spine

The books subtree now has a clear doctrinal spine:

1. **Canonical extractions first**
   - `zero-to-production-backend-service-doctrine.md`
   - `../error-patterns/handling-rust-errors-elegantly-doctrine.md`
2. **Raw long-form reservoirs second**
   - local PDFs and HTML article assets
3. **Cross-lane doctrine destinations**
   - `../production/INDEX.md`
   - `../error-patterns/INDEX.md`
   - `../governance/INDEX.md`

The doctrine is:

- books and articles should be read through their extracted canonical lessons first
- raw long-form donors are for provenance, nuance, and deeper study after the doctrine lane is already known

---

## Documents and Their Roles

| File / Asset                                                   | Primary Role                                                                               | Load When                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `zero-to-production-backend-service-doctrine.md`               | Canonical backend-service doctrine distilled from the Zero to Production donor book family | backend, production, and service-shape lessons are the real goal                                            |
| `../error-patterns/handling-rust-errors-elegantly-doctrine.md` | Canonical narrative doctrine for elegant Rust error handling                               | error-shape, clarity, and proportionality are the real goal                                                 |
| local PDFs / HTML donors                                       | Long-form provenance and deeper nuance reservoirs                                          | you need the original long-form argument, examples, or source nuance after reading the canonical extraction |

---

## Included Source Assets

Current local long-form reservoirs include:

- `Handling Rust errors elegantly.html`
- `ilide.info-luca-palmieri-zero-to-production-in-rust-an-introduction-to-backend-development--pr_e716c8b65d05fd065f4cc0a57cd717bb.pdf`
- `ilide.info-zero-to-production-in-rust-an-opinionated-introduction-to-backend-development-in-pr_82e62394ba58ae89a4834b3df3e0b42b.pdf`
- `ilide.info-zero-to-production-in-rust-true-pdf-later-pr_bdb0b822972ab4e246b88882f65592ca.pdf`

These assets are reservoirs, not the normal first reading surface.

---

## Reading Paths

### If the task is about backend production architecture from book-grade doctrine

1. `zero-to-production-backend-service-doctrine.md`
2. `../production/INDEX.md`
3. consult the raw PDFs only if deeper provenance or book-specific nuance is needed

### If the task is about narrative error philosophy and proportionality

1. `../error-patterns/handling-rust-errors-elegantly-doctrine.md`
2. `../error-patterns/INDEX.md`
3. consult the HTML donor only if the narrative framing or original examples matter

### If the task is about provenance or cleanup-safe donor traceability

1. read the canonical extraction first
2. then consult the raw donor asset
3. then route to `../governance/INDEX.md` if replacement-grade or cleanup-safe judgment is the real concern

### If the task is about learning through long-form material rather than solving an immediate engineering problem

1. start with the canonical extraction
2. use the raw book or article as a deep reading companion
3. return to the owning doctrine lane once practical design or implementation decisions need to be made

---

## Books Decision Questions

Before choosing a books subpage or raw asset, ask:

1. Is the real goal to **learn from narrative depth**, or to **solve a current engineering problem**?
2. Has the canonical doctrine already been read, or am I prematurely jumping into raw donor material?
3. Is the need about **backend production lessons**, **error-handling philosophy**, or **source provenance**?
4. Am I using the raw asset to deepen doctrine, or accidentally trying to replace doctrine with the source reservoir?

The doctrine is:

- books and articles are organized by doctrinal reinforcement pressure and provenance pressure
- not as first-line operational references

---

## Cross-Links

Books/article doctrine overlaps naturally with these lanes:

- **Production**
  - `../production/INDEX.md`
  - `../production/rust-production-patterns.md`
- **Error patterns**
  - `../error-patterns/INDEX.md`
  - `../error-patterns/rust-error-handling-patterns.md`
- **Governance**
  - `../governance/INDEX.md`
  - `../governance/source-reservoir-map.md`

The doctrine is:

- books are where narrative and long-form evidence reinforce canonized truth
- so they must remain connected to the doctrine lanes they strengthen rather than becoming a parallel reading universe

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- extracted doctrine pages first
- raw donor assets second
- governance-aware cross-links for provenance and cleanup-safe reasoning

It should **not** encourage everyday task activation through raw PDFs or HTML donors before the extracted doctrine is consulted.

---

## Final Rule

The reusable lesson is not:

> “books is where the Rust PDFs and articles live.”

The reusable lesson is:

> “the books subtree is the canonical navigation layer for long-form doctrinal reservoirs—routing engineers from book/article assets into the extracted backend and error doctrines they reinforce, while preserving provenance and cleanup-safe reading discipline.”
