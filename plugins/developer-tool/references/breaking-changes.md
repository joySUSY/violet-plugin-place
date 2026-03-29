# Breaking Change Analysis

## Purpose

Define the canonical doctrine for analyzing upgrade risk, compatibility impact, and breaking-change posture inside `developer-tool`.

This document is not only for one dependency ecosystem or one native integration story.
It exists to answer a broader engineering question:

> when a version upgrade, dependency change, or compatibility shift is proposed, how do we determine whether it is safe, conditionally safe, or genuinely breaking—and what evidence is needed before proceeding?

It applies to:
- package/library upgrades
- ABI/API changes
- generated-build-file changes
- schema or config changes
- platform/runtime compatibility shifts

## Source Provenance

- **Primary source:** current `developer-tool` release / platform / code-quality doctrine cluster
- **Derived from:** absorbed dependency-manager, build-engineer, upgrade-analysis, and compatibility-review donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local breaking-change doctrine aligned to the current developer-tool engine

---

## Core Rule

A breaking change is not just a scary changelog phrase.
It is any change that invalidates assumptions held by downstream code, build systems, operators, or users.

A strong change-impact review should answer:
- what changed?
- who or what depends on that behavior?
- is the change additive, disruptive, or structurally incompatible?
- what evidence proves the impact is contained or real?
- what follow-up work would make the upgrade safe?

The goal is not to avoid upgrades.
The goal is to upgrade with truth instead of optimism.

---

## Risk Surface Map

| Surface | What can break |
|---|---|
| Public API | callers, imports, signatures, contracts |
| ABI / native boundary | linking, symbol compatibility, memory/layout expectations |
| Build system | source file lists, compiler flags, generated bindings, packaging |
| Runtime behavior | config loading, feature flags, performance, startup behavior |
| Operational workflow | deploy/release procedures, artifact shapes, migration steps |

A change review is strongest when it checks the right surfaces rather than only reading release notes.

---

## Pattern 1 — Version Numbers Are Hints, Not Proof

Semantic versioning is useful, but it is not sufficient evidence by itself.

Examples:
- a patch release may still introduce build friction or file-layout drift
- a minor release may add optional features that require meaningful integration work
- a major release almost certainly deserves deeper review, but not every breaking impact is equally severe

The doctrine is:
- use version categories to set review depth
- do not let version labels replace actual analysis

---

## Pattern 2 — Changelog Review Must Be Paired with Structural Review

Release notes and changelogs tell part of the story.
They rarely tell the whole story.

A stronger review also inspects:
- added/removed source files
- moved or renamed headers/modules
- changed public exports
- build-script or config changes
- new dependencies or defines

The doctrine is:
- human-authored release notes explain intent
- structural diffing reveals actual surface movement

You need both.

---

## Pattern 3 — Added/Deleted Files Can Be More Dangerous Than Edited Files

One common upgrade failure mode is not the modified code itself, but the added or deleted files around it.

Examples:
- a new core source file is never added to the build system
- a removed file remains referenced in project build config
- generated bindings drift because the file surface changed
- new platform-specific sources need conditional inclusion

The doctrine is:
- file-level additions and deletions deserve explicit review
- especially in native, build-sensitive, or generated-code workflows

---

## Pattern 4 — Public Exports and Signatures Define Real Compatibility Risk

Breaking changes often reveal themselves through changes in:
- exported functions/classes/symbols
- type signatures
- constructor requirements
- initialization or cleanup lifecycle
- public constants/enums/config fields

If downstream consumers compile or bind against these surfaces, even small changes may have large cost.

The doctrine is:
- public shape changes should be reviewed as contract changes
- not just as “refactors”

---

## Pattern 5 — Build-System Impact Must Be Reviewed Separately

A project can be logically compatible while still failing operationally because the build system changed.

Typical examples:
- new compile defines
- changed include paths
- moved source files
- generated headers or bindings needing regeneration
- BUILD.gn / CMake / package.json / pyproject / Cargo layout implications

The doctrine is:
- build-system compatibility is its own risk surface
- do not bury it under generic “upgrade review” language

---

## Pattern 6 — Risk Should Be Classified by Required Downstream Work

A useful classification model is:

### Safe
- upgrade appears additive or purely corrective
- no code changes or integration changes expected beyond ordinary verification

### Conditional / Minor
- no obvious breaking contract, but some follow-up work may be needed
- examples: BUILD file updates, optional flag changes, new source inclusion, light integration adjustments

### Breaking
- downstream code, bindings, runtime assumptions, or build contracts will need explicit updates

The doctrine is:
- classify by **work required downstream**
- not only by emotional reaction to the change

---

## Pattern 7 — Native and Generated Boundaries Need Extra Suspicion

Native integrations, generated bindings, and build-generated artifacts are especially sensitive to change.

Why:
- small file-layout shifts can break compilation
- symbol or header changes may break consumers indirectly
- generated code often hides drift until late in the process

The doctrine is:
- if a change crosses ABI/build-generation boundaries, deepen the review
- these systems fail more often from small structural changes than teams initially expect

---

## Pattern 8 — Upgrade Analysis Should Produce a Recommendation, Not Just Findings

A useful breaking-change review should end with a decision recommendation such as:
- safe to upgrade
- safe if build/config updates are applied
- safe only after code migration
- defer until migration branch or dedicated rollout plan exists

The doctrine is:
- the output should reduce the decision
- not just accumulate observations

---

## Pattern 9 — Compatibility Review Belongs Close to Release Governance

Breaking-change analysis is not an isolated technical task.
It directly affects:
- release versioning
- changelog messaging
- migration notes
- rollout sequencing
- downstream consumer trust

That is why breaking-change doctrine should remain closely tied to release governance and platform workflow doctrine.

A compatibility review that never influences release posture is incomplete.

---

## Pattern 10 — The Analysis Must Preserve Reusable Structure

Good reviews should leave behind a reusable structure for future upgrades:
- risk classification pattern
- diff procedure
- evidence format
- summary template
- library-specific or ecosystem-specific notes if truly recurring

This turns one successful upgrade review into a durable operational asset.

---

## Risk by Change Type

| Change Type | Default Posture |
|---|---|
| security-only patch | usually low risk, still verify structural/build impact |
| patch version | low risk, but inspect for hidden build or export changes |
| minor version | medium review depth, watch deprecations/additions carefully |
| major version | assume real compatibility work until disproved |
| platform/runtime support shift | treat as operationally significant even if code diff seems small |

---

## Upgrade Analysis Checklist

Before declaring an upgrade safe, ask:

- [ ] Have we read the relevant changelog/release notes between current and target versions?
- [ ] Have we reviewed added/deleted files, not only modified ones?
- [ ] Have we checked public exports/signatures or binding surfaces for drift?
- [ ] Have we considered build-system and generated-artifact impact separately?
- [ ] Is the risk classification based on required downstream work?
- [ ] Does the review end in a clear upgrade recommendation?

---

## Anti-Patterns

- trusting semantic version labels as complete evidence
- reading release notes without checking structural diff
- ignoring added/deleted files in build-sensitive dependencies
- collapsing build-system impact into generic “minor change” language
- reporting findings without an actionable recommendation
- performing upgrade review without connecting it to release/migration planning

---

## Cross-Links

Read this alongside:
- `build-and-deploy/release-governance.md`
- `build-and-deploy/build-deploy.md`
- `platform-infrastructure.md`
- `code-quality-analysis.md`

---

## Final Doctrine

The reusable lesson is not:
> “look for breaking changes in the changelog and compare versions.”

The reusable lesson is:
> “breaking-change analysis is a compatibility review across API, ABI, build, runtime, and operational surfaces—classify risk by the downstream work required, and only call an upgrade safe when the evidence reduces the decision, not just the uncertainty.”
