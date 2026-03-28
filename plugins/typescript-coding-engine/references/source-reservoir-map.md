# TypeScript Coding Engine Source Reservoir Map

## Purpose

Define the canonical governance doctrine for source reservoirs feeding the `typescript-coding-engine`.

This document is not just a list of TypeScript donor families.
It exists to answer a control-plane question:

> where does the TypeScript engine get its source truth, which canonical doctrine lane should own each upstream family, what runtime implications are justified, and what rules keep donor material from leaking directly into doctrine, shell behavior, or cleanup-sensitive navigation?

This makes the source side of the TypeScript engine legible, cleanup-safe, and reusable for future deep-fusion and replacement-validation passes.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` donor-family governance for TypeScript
- **Derived from:** TypeScript donor intake, plugin-first heavy-engine canonization, and cleanup-safe source-truth routing work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local source-governance doctrine aligned to the current TypeScript engine

---

## Core Rule

A donor family is a **source reservoir**, not a runtime surface.

The preferred flow is:

`donor reservoir -> extracted lesson -> canonical doctrine/reference/module -> runtime shell only where justified`

The forbidden flow is:

`donor reservoir -> shell/runtime mirror`

This rule matters because TypeScript donor material is broad, overlapping, and often product-shaped.
Without a promotion boundary, the engine would slowly degrade into a mirror of its sources instead of becoming a coherent canonical system.

---

## Donor Family Taxonomy

| Family                               | Main Donors                                                                                                                                                 | Primary Value                                                                                    | Canonical Landing Zones                                                                                                                                                              | Runtime Implication                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Foundations doctrine                 | `mastering-typescript`, `typescript-core`                                                                                                                   | strictness posture, inference fundamentals, compiler/config baseline                             | `references/foundations/*`                                                                                                                                                           | prime/check surfaces may consume canonized strictness truth; donors themselves never become runtime                |
| Advanced type-system doctrine        | `type-inference`, `typescript-advanced-types`, `typescript-advanced-patterns`, `typescript-magician`, `typescript-expert`                                   | narrowing, branding, inference, conditional/mapped/template literal types, advanced API patterns | `references/advanced/*`, selected `modules/advanced-types/`, `modules/inference/`                                                                                                    | bounded type-diagnosis and route surfaces may consume canonized patterns                                           |
| Clean-code and quality doctrine      | `typescript-clean-code`, `typescript-quality-checker`, `typescript-skills`, `clean-code-typescript-main`, `clean-code-principles`                           | runtime validation, quality gates, toolchain posture, testing, anti-pattern recovery             | `references/clean-code/*`, selected `modules/runtime-validation/`, `modules/quality-gates/`                                                                                          | check/prime/audit surfaces may consume canonized governance; donor repos themselves do not become runtime truth    |
| Production and practical TS patterns | `typescript-pro`                                                                                                                                            | practical production posture, maintainable app/package patterns                                  | `references/clean-code/*`, `references/architecture/*` where pressure justifies it                                                                                                   | can inform runtime/tooling advice only after doctrinal absorption                                                  |
| Interop and hybrid-boundary doctrine | `ts-rs-main`, `tsify-main`, `wasm-bindgen-main`, `calling-rust-from-tauri-frontend`, `understanding-tauri-architecture`, secondary `outfitter-main` lessons | Rust/TS contract generation, WASM/TS bridges, Tauri frontend/backend boundaries                  | `references/interop/*`, selected `modules/rust-interop/`, `modules/react-rn-bridges/`                                                                                                | `commands/route/*`, `agents/interop-reviewer.md`, and interop skills consume canonized doctrine, not donor layouts |
| Tooling/runtime shell donors         | `outfitter-main`, `claude-code-skills-main`                                                                                                                 | plugin shell, command/runtime/tooling ecosystem patterns, workflow ergonomics                    | bridge patterns into `skills/`, `commands/`, `agents/`, plus selected `references/clean-code/*` and `references/architecture/*` where TypeScript-specific lessons survive extraction | developer-tool may own the broader shell truth; TypeScript engine consumes only the TS-relevant extracted lessons  |

This family map is conceptual.
It is a routing map for doctrine promotion, not a commitment that raw donor paths should remain reading surfaces forever.

---

## Rule 1 — Classify Donors by Engineering Pressure, Not by Repository Shape Alone

A donor family should be classified by the kind of engineering pressure it resolves.

Examples:

- a repo donor may primarily teach strict config and inference posture
- an advanced donor may primarily teach type-level information preservation
- a clean-code donor may primarily teach runtime trust and CI discipline
- an interop donor may primarily teach contract ownership and bridge ergonomics

The doctrine is:

- donor families are categorized by the reusable truth they provide
- not merely by whether they look like repositories, docs, or skill packs

This prevents the source map from becoming a filesystem inventory instead of a governance tool.

---

## Rule 2 — Each Family Must Have a Canonical Landing Zone

No donor family should float ambiguously once absorbed.

For every family, the engine must be able to answer:

- which doctrine lane owns the reusable lesson?
- which module staging zone holds still-entangled complexity, if any?
- whether any runtime shell surface is actually justified?
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
- bounded specialist agents that interpret canonized doctrine for concrete TypeScript tasks
- deterministic rules only where the law is mature enough to freeze

Not allowed:

- donor repos exposed as browsing-first runtime surfaces
- raw donor skill packs treated as the canonical TS workflow
- runtime growth justified only by donor richness or novelty

The doctrine is:

- runtime surfaces are derived from canonized TypeScript doctrine
- they are never the first landing zone for donor material

---

## Rule 4 — Modules Exist for Entangled TypeScript Complexity, Not for Hoarding

Some TypeScript donor material is too interwoven to flatten immediately into one doctrine page.
That is what `modules/*` is for.

Use module staging when:

- a donor teaches multiple tightly coupled lessons at once
- the lesson spans advanced typing + runtime validation + framework/runtime integration together
- splitting prematurely would destroy the teaching value

Do not use module staging as:

- a dumping ground for unanalyzed repo material
- a cleanup delay mechanism
- a disguised donor mirror

The doctrine is:

- module staging is a governed intermediate structure
- not a second knowledge center

---

## Rule 5 — Interop Donors Require Cross-Engine Ownership Discipline

Interop donors are structurally dangerous because they naturally cross engine boundaries.

Default ownership law:

- `rust-coding-engine` owns Rust-side structural truth when Rust defines or generates the contract
- `typescript-coding-engine` owns TypeScript-side consumer ergonomics, local refinement, and TS-local runtime validation posture
- `developer-tool` owns broader runtime-shell and plugin-surface truth when the issue becomes operational rather than TS-doctrinal
- `cross-platform-development` owns broader support-tier and platform-boundary truth when hybrid shells or multi-platform strategy dominate

The doctrine is:

- donor mapping must preserve ownership boundaries across engines
- not just record who also mentions the same technology

This is why interop donors should be canonized under TypeScript only for the TypeScript-side boundary truth they actually teach.

---

## Rule 6 — Freshness Status Must Be Explicit Before Replacement-Grade Claims

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

## Rule 7 — Cleanup-Safe Navigation Must Not Depend on Reservoir Paths

Canonical operational docs should not use cleanup-candidate reservoir filesystem paths as their main reading path.

Use instead:

- canonical doctrine paths for reading flow
- donor family identifiers for provenance
- local reservoir paths only in governance, provenance, inventory, or historical notes

The doctrine is:

- cleanup-safe navigation is part of doctrinal maturity
- if the engine still needs the donor path to navigate, the lesson is not fully absorbed yet

---

## Rule 8 — Replacement-Grade Promotion Is a Quality Judgment, Not a Volume Judgment

A donor family is not replacement-grade because:

- many notes exist about it
- many files were linked from it
- it feels familiar

A donor family becomes replacement-grade only when:

- high-value lessons have canonical homes
- those homes are discoverable from the main reference system
- cross-engine ownership boundaries are explicit
- provenance and freshness are explicit
- runtime shell behavior no longer depends on direct donor consultation for common cases

The doctrine is:

- replacement-grade means the engine can stand on the canonized lesson without leaning on the donor reservoir by default

---

## Rule 9 — Root Index, Inventory, Absorption Matrix, and Trigger Scope Are Companion Controls

This source-reservoir map works with other TypeScript control surfaces:

- `references/INDEX.md` -> root doctrinal reading path
- `INVENTORY.md` -> what is already canonical versus transitional
- `ABSORPTION_MATRIX.md` -> what was promoted from where
- `TRIGGER_SCOPE.md` -> what runtime activation is allowed to own

The doctrine is:

- source map says where truth can come from
- inventory says what is canonical now
- absorption matrix says what was already integrated
- trigger scope says what may execute at runtime

Together, these documents keep the TypeScript engine from drifting into hidden donor dependence.

---

## Quick Routing Rule

When dealing with any donor-origin TypeScript question, ask in order:

1. What donor family is this from?
2. Has the lesson already been promoted into canonical doctrine?
3. If yes, use the canonical surface.
4. If no, treat the donor as upstream evidence for future extraction, not as a runtime dependency.

This is the default handling rule for unresolved donor material.

---

## Anti-Patterns

- copying donor repositories into runtime surface shape by directory resemblance alone
- using donor file paths as the primary reading path in canonical docs
- assuming a donor is unimportant just because it is not yet canonized
- treating raw TypeScript donor sprawl as if it were already an engine architecture
- promoting patterns without recording provenance and destination clearly
- letting interop or runtime-shell donors quietly redefine TypeScript doctrine boundaries

---

## Cross-Links

Read this alongside:

- `INDEX.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`
- `foundations/INDEX.md`
- `advanced/INDEX.md`
- `clean-code/INDEX.md`
- `architecture/INDEX.md`
- `interop/INDEX.md`
- `../../rust-coding-engine/references/governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:

> “these are the donor families that feed the TypeScript engine.”

The reusable lesson is:

> “TypeScript source reservoirs are governed inputs: classify the donor family by engineering pressure, promote only the extracted lesson into canonical doctrine, route runtime through curated indexes and bounded surfaces, preserve cross-engine ownership explicitly, and keep donor abundance from becoming navigation truth or runtime dependency.”
