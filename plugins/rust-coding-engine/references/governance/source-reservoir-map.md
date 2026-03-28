# Rust Coding Engine Source Reservoir Map

## Purpose

Map the major donor families feeding `rust-coding-engine` into a governance model that is actually useful for canonical deep fusion.

This document exists to answer a stricter question than “what donors do we have?”

The real question is:

> when a Rust donor family contributes useful knowledge, which canonical doctrine lane should own it, what runtime implications are justified, what must remain staged or deferred, and what conditions must be met before that donor can be considered replacement-grade or cleanup-ready?

This document therefore governs:
- donor family classification
- canonical landing zones
- runtime-shell implications
- provenance and freshness expectations
- cleanup-safe navigation discipline
- cross-engine ownership boundaries

## Source Provenance

- **Primary source:** current governance mapping under `references/governance/`
- **Derived from:** donor-family classification work during Phase E Rust reference re-architecture plus subsequent repo-case and interop governance strengthening
- **Upstream URL:** not applicable as a synthesized local governance map
- **Freshness status:** canonical local governance document aligned to the current donor-to-doctrine model; individual donor freshness may differ and must be tracked separately where promotion claims depend on it

---

## Core Rule

A donor family is a **source reservoir**, not a runtime surface.

The preferred flow is:

`donor reservoir -> extracted lesson -> canonical doctrine/reference/module -> runtime shell only where justified`

The forbidden flow is:

`donor reservoir -> shell/runtime mirror`

The engine is allowed to learn from donors.  
It is not allowed to become a prettier donor archive.

---

## Donor Family Taxonomy

| Family | Main Donors | Primary Value | Canonical Landing Zones | Runtime Implication |
|---|---|---|---|---|
| Rule doctrine | `rust-skills`, `rust-style*`, `rust-skills-main*` | rule corpus, style/lint posture, plugin-shell precedent | `rules/*/INDEX.md`, `references/foundations/*`, `references/quality/*`, selected bridge skills | route/prime surfaces may consume the canonized rules; donors themselves never become runtime |
| Architecture case studies | `nova-main`, `codeyourpcb-main`, `clean-architecture-with-rust-master`, `implementing-hexagonal-axum`, selected `rust-self-learning-memory-main` lessons | workspace shape, dependency direction, real-scale architecture | `references/repo-cases/*`, `references/architecture/*`, `modules/axum/`, `modules/tauri/`, `modules/vm-architecture/`, `modules/large-repo-case-studies/` | architecture reviewer and route commands may consume distilled lessons, not donor layouts |
| Interop | `napi-*`, `ts-rs-main`, `tsify-main`, `wasm-bindgen-main`, `flow-skills-pyo3`, `calling-rust-from-tauri-frontend`, `understanding-tauri-architecture` | boundary contracts, foreign-runtime packaging, verification posture | `references/interop/*`, selected `modules/ffi/`, `modules/wasm/`, `modules/tauri/` | `commands/prime/rust-interop.md`, `commands/route/choose-interop-path.md`, `agents/ffi-interop-scout.md` consume canonized doctrine |
| Web/service patterns | `rust-axum-framework`, `axum-rust-template`, `rust-fullstack` | service architecture, web stack decisions, runtime organization | `references/architecture/*`, `references/production/*`, `modules/axum/` | architecture review and route decisions may consume distilled service doctrine |
| ECS/data-oriented patterns | `bevy*`, `ecs*` | ECS, data-oriented design, systems constraints | `references/architecture/rust-ecs-and-data-oriented-architecture.md`, `modules/ecs/`, selected `references/error-patterns/*` where relevant | architecture reviewer may use these patterns diagnostically |
| Book/article assets | Rust PDFs, `Handling Rust errors elegantly.html` | deep narrative doctrine, backend production posture, error-thinking patterns | `references/books/*`, `references/error-patterns/*`, `references/production/*` | no direct runtime shell surface by default |

---

## Rule 1 — Classify Donors by Engineering Pressure, Not by Repository Shape Alone

A donor family should be classified by the kind of engineering pressure it resolves.

Examples:
- a repo donor may primarily teach workspace architecture
- an article donor may primarily teach fallibility posture
- an interop donor may primarily teach packaging and contract sync
- a rule donor may primarily teach compact, reusable law

The doctrine is:
- donor families are categorized by the type of reusable truth they provide
- not merely by whether they look like repositories, docs, or rules

This prevents the reservoir map from becoming a filesystem inventory instead of a governance tool.

---

## Rule 2 — Each Family Must Have a Canonical Landing Zone

No donor family should float ambiguously once canonized.

For every family, the engine must be able to answer:
- which doctrine lane owns the reusable lesson?
- which module staging zone holds still-entangled complexity, if any?
- whether any shell/runtime surface is actually justified?
- what remains explicitly donor-only?

The doctrine is:
- every donor family needs a canonical landing zone
- not every donor family needs a runtime artifact

This is the difference between structured absorption and donor accumulation.

---

## Rule 3 — Runtime Implications Must Be Conservative and Derived

A donor can justify runtime surfaces only after its lessons have been absorbed into canonical doctrine.

Allowed runtime implications:
- bridge skills that route into canonized doctrine
- prime commands that load the correct doctrinal lane
- route commands that choose among canonized patterns
- bounded specialist agents that interpret canonized doctrine for concrete cases

Not allowed:
- donor repos exposed as browsing surfaces
- raw donor rule families treated as runtime commands
- runtime shell growth justified only by donor richness

The doctrine is:
- runtime surfaces are derived from canonized doctrine
- they are never the first landing zone for donor material

---

## Rule 4 — Module Staging Exists for Entangled Complexity, Not for Hoarding

Some donors are too large or too cross-cutting to flatten immediately into a single doctrine page.
That is what `modules/*` is for.

Use module staging when:
- a donor teaches multiple tightly coupled lessons at once
- the lesson spans architecture + interop + runtime + tooling together
- splitting prematurely would destroy the teaching value

Do not use module staging as:
- a dumping ground for unanalyzed repo material
- a cleanup delay mechanism
- a disguised donor mirror

The doctrine is:
- module staging is a governed intermediate structure
- not a second knowledge center

---

## Rule 5 — Repo-Scale Donors Need Case-Study Governance Before Cleanup Readiness

Repo-shaped donors are especially dangerous because they can look “complete” while still being poorly abstracted.

Before such donors are considered replacement-grade or cleanup-ready, confirm:
- their lessons have been extracted by architectural pressure, not by directory listing alone
- repo-specific truths have been rewritten into canonical doctrine lanes
- provenance is recorded clearly enough to reconstruct why the repo mattered
- freshness status is explicit
- no runtime shell surface still implicitly depends on donor layout

The doctrine is:
- repo-scale donors need higher proof before cleanup readiness
- because their accidental complexity is higher than article or rule donors

See also:
- `../repo-cases/case-study-governance.md`

---

## Rule 6 — Interop Donors Require Cross-Engine Ownership Discipline

Interop donors are structurally dangerous because they naturally cross engine boundaries.

Default ownership law:
- `rust-coding-engine` owns Rust-side contract truth
- `typescript-coding-engine` owns TypeScript-side consumer ergonomics and TS-local validation posture
- `python-dev-skill` owns Python-side consumer ergonomics where appropriate
- `cross-platform-development` owns broader support-tier and platform-boundary truth
- `developer-tool` owns broader runtime-surface and shell-law questions when the issue becomes operational rather than Rust-doctrinal

The doctrine is:
- donor mapping must preserve ownership boundaries across engines
- not just record who also mentions the same technology

This is why interop donors should be canonized under Rust first when Rust is the authoritative contract source.

---

## Rule 7 — Freshness Status Must Be Explicit Before Replacement-Grade Claims

For every donor family, the engine must be honest about freshness.

Useful freshness states include:
- verified from local metadata only
- verified against upstream repository/web state
- still pending freshness verification
- based on a local snapshot only

Before a donor is considered:
1. replacement-grade canonized doctrine
2. cleanup-ready

prefer an upstream freshness check when network access is available.

The doctrine is:
- freshness uncertainty is not a failure
- hidden freshness uncertainty is a failure

---

## Rule 8 — Cleanup-Safe Navigation Must Not Depend on Reservoir Paths

Canonical operational docs should not use cleanup-candidate reservoir filesystem paths as their main reading path.

Use instead:
- canonical doctrine paths for reading flow
- donor family identifiers for provenance
- local reservoir paths only in governance, provenance, inventory, or historical notes

The doctrine is:
- cleanup-safe navigation is part of doctrinal maturity
- if the engine still needs the donor path to navigate, the lesson is not fully absorbed yet

---

## Rule 9 — Replacement-Grade Promotion Is a Quality Judgment, Not a Volume Judgment

A donor family is not replacement-grade because:
- many notes exist about it
- many files were linked from it
- it feels familiar

A donor family becomes replacement-grade only when:
- high-value lessons have canonical homes
- those homes are discoverable from the main reference system
- ownership boundaries are explicit
- provenance and freshness are explicit
- runtime shell behavior no longer depends on direct donor consultation for common cases

The doctrine is:
- replacement-grade means the engine can stand on the canonized lesson without leaning on the donor reservoir by default

---

## Family-Specific Canonical Expectations

### Rule doctrine donors
Must eventually stabilize into:
- rule indexes
- style/lint/foundations doctrine
- bridge skills and commands that route into these laws

### Architecture case-study donors
Must eventually stabilize into:
- `references/repo-cases/*`
- architecture doctrine pages
- modules for still-entangled architecture clusters

### Interop donors
Must eventually stabilize into:
- interop taxonomy docs
- contract ownership docs
- route/prime/diagnostic shell surfaces derived from canonized doctrine

### Web/service donors
Must eventually stabilize into:
- architecture + production doctrine
- bounded module staging where needed

### ECS/data-oriented donors
Must eventually stabilize into:
- architecture doctrine
- ECS-specific modules
- selected performance/error doctrine where the lessons are genuinely reusable

### Book/article donors
Must eventually stabilize into:
- books/article doctrine pages
- error/production doctrine where the lesson generalizes cleanly

---

## Reservoir Map Checklist

Before calling the Rust source-reservoir map healthy, ask:

- [ ] Does every major donor family have a canonical landing zone?
- [ ] Are runtime implications derived from canonized doctrine instead of donor richness?
- [ ] Are repo-shaped donors governed more strictly than small donors?
- [ ] Are cross-engine ownership boundaries explicit for interop-heavy families?
- [ ] Is freshness status explicit where replacement-grade claims matter?
- [ ] Would the reading path remain valid if cleanup-candidate donor paths vanished tomorrow?

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../repo-cases/case-study-governance.md`
- `../interop/boundary-activation-model.md`
- `../interop/INDEX.md`
- `../architecture/INDEX.md`
- `../production/INDEX.md`
- `../../ABSORPTION_MATRIX.md`
- `../../TRIGGER_SCOPE.md`

---

## Final Doctrine

The reusable lesson is not:
> “the Rust engine has several donor families feeding it.”

The reusable lesson is:
> “the Rust engine must govern donor families as source reservoirs whose lessons are classified by engineering pressure, routed into explicit canonical destinations, freshness-qualified before replacement-grade claims, and kept cleanup-safe—so the engine grows more independent of donors rather than becoming a better-organized dependency on them.”
