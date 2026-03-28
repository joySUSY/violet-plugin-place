# Rust Repo Case Study Governance

## Purpose

Define how large Rust donor repositories should be interpreted, distilled, and promoted inside `rust-coding-engine`.

This document exists because repo-scale donors are simultaneously:
- some of the highest-value sources of architectural truth
- some of the easiest sources to misuse

A large Rust repository can teach workspace decomposition, boundary discipline, runtime structure, interop posture, and production trade-offs.
It can also tempt the engine into mirror-thinking, where filesystem shape is mistaken for doctrine.

The job of this governance note is to ensure repo donors become:
- reusable canonical doctrine
- cleanup-safe case studies
- bounded staging material when necessary

and do **not** become:
- runtime mirrors
- hero-repo worship
- accidental second knowledge centers

## Source Provenance

- **Primary source:** current repo-cases governance material under `references/repo-cases/`
- **Derived from:** repo-family extraction and case-study canonization passes over large Rust donor repositories
- **Upstream URL:** not applicable as a synthesized local governance document
- **Freshness status:** canonical local governance note; individual case-study freshness may differ and should be tracked per case

---

## Core Rule

A repo donor is a case-study reservoir, not a runtime product shape.

That means the preferred flow is:

`repo donor -> extracted lesson -> canonical doctrine lane or bounded module staging -> runtime shell only where justified`

The wrong flow is:

`repo donor -> copied structure -> shell surface`

The engine is allowed to learn from real repositories.
It is not allowed to become a museum of repository trees.

---

## Rule 1 — Repos Are Case Studies, Not Runtime Mirrors

Large repos such as:
- `nova-main`
- `codeyourpcb-main`
- `clean-architecture-with-rust-master`
- `implementing-hexagonal-axum`
- `rust-self-learning-memory-main` when Rust-side lessons are genuinely reusable

must be treated as case-study reservoirs.

Their value lies in:
- architecture boundaries
- crate and workspace organization
- runtime and deployment structure
- scale assumptions
- toolchain decisions
- interop boundary handling

Their value does **not** lie in being copied whole into the engine as a pseudo-canonical tree.

---

## Rule 2 — Extract by Architectural Pressure, Not by Directory Listing

Do not summarize repo donors by directory listing alone.
A directory listing is evidence, not doctrine.

Extract repo lessons by pressure such as:
- workspace shape and crate decomposition
- dependency direction
- module layering and adapter thinness
- ownership of runtime boundaries
- testing and CI posture
- release and tooling discipline
- interop boundaries
- UI/runtime shell boundaries when present
- data-oriented or ECS-specific structural trade-offs when present

The doctrine is:
- extract by the engineering pressure the repo resolves
- not by the fact that a folder exists

This is what makes the case study reusable outside the donor's original context.

---

## Rule 3 — Promote Lessons Into the Correct Canonical Lane

A repo lesson becomes canonical only after it is rewritten into one of the engine's actual doctrinal homes.

Allowed destinations include:
- `references/architecture/*`
- `references/interop/*`
- `references/production/*`
- `references/quality/*`
- `references/error-patterns/*`
- `references/repo-cases/*` when the lesson still needs donor-specific framing
- `modules/*` when the material is too large or too entangled to flatten immediately
- runtime shell surfaces only when the lesson justifies an explicit user-facing route or diagnostic entrypoint

The doctrine is:
- repo donors do not become canonical merely because they are important
- they become canonical when their lessons are rewritten into the engine's doctrinal taxonomy

---

## Rule 4 — Record Provenance and Freshness Before Replacement-Grade Claims

Every canonical repo case study should record at least:
- the donor family identifier
- the local donor path if still relevant
- verified upstream URL if available from local artifacts or external verification
- explicit note when upstream URL is not yet verified
- whether the case study is based on a local snapshot or freshness-checked upstream state

Do not rely on memory alone for repository origin or currency.

For repo-shaped donors, if network access is available, perform an upstream freshness check before either of these milestones:
1. promoting the donor into replacement-grade canonical doctrine
2. treating the donor as cleanup-ready

Preferred freshness inputs:
- upstream README
- release or changelog pages
- repository homepage
- package/crate metadata or tags

If network access is unavailable, mark the doctrine as based on a **local snapshot** and defer cleanup-readiness decisions until freshness can be checked.

---

## Rule 5 — Keep Case Studies Routed Back Into the Engine, Not Isolated From It

A repo case study is useful only if it routes the reader back into the engine's reusable doctrine.

That means a case-study page should usually answer:
- what this donor teaches
- what scale or assumptions make the lesson valid
- which canonical lane now owns the reusable lesson
- what should remain donor-specific rather than generalized

A good case study therefore points back to:
- architecture doctrine when the lesson is structural
- interop doctrine when the lesson is boundary-driven
- production doctrine when the lesson is operational
- quality doctrine when the lesson is mostly testing, docs, or linting discipline

The doctrine is:
- case studies are bridges into canonical doctrine
- not cul-de-sacs of admiration

---

## Rule 6 — Use Module Staging for Repo-Scale Complexity, Not Repo Hoarding

Some donor material is too large, too entangled, or too multi-domain to flatten immediately into a single doctrine page.
That is a valid reason to use `modules/*`.
It is **not** a valid reason to keep repository sprawl alive forever.

Use module staging when:
- the donor teaches multiple interdependent lessons at once
- the lesson spans architecture + interop + runtime + tooling together
- the material still needs canonical restructuring before it can be split cleanly into reference pages

Do **not** use module staging as:
- a dumping ground for unanalyzed repository notes
- an excuse to skip doctrinal rewriting
- a disguised repo mirror

The doctrine is:
- staging is transitional structure under governance
- not long-term architectural procrastination

---

## Rule 7 — Avoid Repository Worship

No donor repo is the one true architecture.
Every case study is an example, not a commandment.

A repo may be:
- well-designed for its constraints
- over-optimized for its scale
- under-documented for transferability
- unusually shaped by its domain

The doctrine is:
- use repo donors to learn trade-offs
- never mistake donor specificity for universal correctness

This is especially important for:
- VM engines
- ECS-heavy systems
- unusual workspace decompositions
- hybrid Tauri/web/native bridges

---

## Rule 8 — Cleanup Readiness Depends on Replacement Quality, Not Extraction Volume

A repo donor is not cleanup-ready merely because many notes were written about it.
It becomes cleanup-ready only when:
- its high-value lessons have canonical homes
- those homes are navigable from the engine's main reference system
- provenance is recorded clearly enough to reconstruct why the donor mattered
- local snapshot versus upstream freshness is explicit
- no runtime shell surface still implicitly depends on the donor tree itself

The doctrine is:
- cleanup readiness is a replacement-quality judgment
- not a quantity-of-notes judgment

---

## Repo Case Study Checklist

Before calling a repo case study healthy, ask:

- [ ] Is the donor being treated as a case study rather than a runtime mirror?
- [ ] Were lessons extracted by engineering pressure instead of directory shape alone?
- [ ] Did the extracted lessons route back into the correct canonical doctrine lanes?
- [ ] Is provenance recorded clearly enough to reconstruct source truth?
- [ ] Is freshness status explicit?
- [ ] If module staging is used, is it bounded and clearly transitional?
- [ ] Would cleanup readiness be defensible without relying on the donor tree itself?

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../governance/source-reservoir-map.md`
- `../architecture/INDEX.md`
- `../interop/INDEX.md`
- `../production/INDEX.md`
- `../quality/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “large Rust repos are useful examples.”

The reusable lesson is:
> “large Rust repos must be governed as case-study reservoirs whose lessons are extracted by architectural pressure, rewritten into canonical doctrine, freshness-qualified before replacement-grade claims, and never mistaken for runtime mirrors—so the engine learns from real systems without becoming a pile of borrowed trees.”
