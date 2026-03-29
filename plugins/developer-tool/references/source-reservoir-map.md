# Developer Tool Source Reservoir Map

## Purpose

Define the canonical governance doctrine for source reservoirs feeding the `developer-tool` engine.

This document is not just an inventory of donor names.
It exists to answer a control-plane question:

> where does `developer-tool` get its source truth, how should those upstream reservoirs be interpreted, and what rules prevent donor material from leaking directly into runtime doctrine or shell behavior?

This makes the source side of the engine legible and cleanup-safe.

## Source Provenance

- **Primary source:** current `developer-tool` donor families and their curated doctrine descendants
- **Derived from:** Phase E donor-intake, source-truth freeze, and plugin-first shell governance work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local source-governance doctrine aligned to the current developer-tool engine

---

## Core Rule

Donor reservoirs are upstream evidence, not runtime truth.

The allowed flow is:

`donor reservoir -> curated doctrine/reference -> runtime shell surface`

The forbidden flow is:

`donor reservoir -> direct runtime dependency`

This rule matters because `developer-tool` is large enough that source sprawl can easily masquerade as architecture unless the promotion boundary is kept explicit.

---

## Reservoir Family Map

| Family | Main Donors | Primary Value |
|---|---|---|
| Memory / recall / continuity | `claude-recall-main`, `neural-memory-main`, `rust-self-learning-memory-main` | recall doctrine, continuity runtime, memory-trigger patterns |
| Agentic systems | `agent-skills-main`, `agentup-main` | coordination, bootstrap, task decomposition, session reflection |
| Plugin / runtime ecosystems | `outfitter-main`, `claude-code-skills-main`, `skill-system-router` | plugin shell structure, command surfaces, tooling runtime patterns |
| Shell / terminal / platform | shell-and-terminal donors, cross-platform donors, workflow tooling donors | shell safety, portability, runtime environment discipline |
| Build / deploy / release | build-and-deploy donors, CI/CD and release-oriented tooling repos | CI/CD, reproducibility, release orchestration |

This family map is not a permanent filesystem commitment.
It is a conceptual routing map.

---

## Pattern 1 — Donor Families Are Sources of Lessons, Not Things to Mirror

A donor repository is valuable because it contains:
- patterns
- workflows
- structures
- implementation examples
- failure lessons

It is not valuable because it should be copied whole into `developer-tool`.

The doctrine is:
- extract the lesson
- rewrite it into canonical doctrine
- only expose runtime surfaces that are justified after curation

This is the difference between ingestion and imitation.

---

## Pattern 2 — Promotion Must Be Explicit

A donor idea becomes canonical only after promotion into one or more of:
- `references/` doctrine
- `skills/` bridge surfaces
- `commands/` explicit operational workflows
- `agents/` bounded specialist reasoning
- `rules/` deterministic shell laws

If a donor idea has not been promoted into one of these curated surfaces, it remains upstream evidence—not active doctrine.

The doctrine is:
- promotion is a deliberate act
- not an accidental consequence of files existing in the workspace

---

## Pattern 3 — Runtime Shells Must Consume Doctrine, Not Raw Reservoirs

The runtime shell is the activation/orchestration layer.
It should point to:
- canonical references
- canonical bridge skills
- bounded agents/commands/hooks/rules

It should not:
- browse donor repos as if they were stable runtime reading surfaces
- inherit directory structures directly from donors
- depend on cleanup-candidate paths for ordinary execution

The doctrine is:
- runtime should consume curated truth
- not upstream abundance

---

## Pattern 4 — Different Reservoir Families Produce Different Kinds of Doctrine

Not all donors should be processed the same way.

Examples:
- memory donors often feed recall and continuity doctrine
- plugin/runtime donors feed shell architecture and component-model doctrine
- platform/build donors feed release and workflow-governance doctrine
- shell donors feed safety, portability, and session-execution doctrine

The doctrine is:
- route by donor family pressure
- not by raw file location alone

This is what keeps absorption work coherent instead of mechanical.

---

## Pattern 5 — Cleanup-Safe Navigation Requires Family Names, Not Path Dependence

Canonical operational docs inside `developer-tool` should not depend on cleanup-candidate reservoir filesystem paths as their long-term reading path.

That means:
- bridge skills, commands, README, and active indexes should point to canonical doctrine first
- donor family names may appear as provenance identifiers
- exact local reservoir paths belong in governance, provenance, inventory, or historical notes only

The doctrine is:
- use source families for traceability
- use canonical docs for navigation

This is what makes future cleanup possible without destroying the doctrine system.

---

## Pattern 6 — Reservoir Governance Is Also Scope Governance

A donor being outside the active canonical tree does **not** mean it is irrelevant.

Important distinction:
- **canonical now** -> actively promoted and routed in the doctrine tree
- **source truth / future intake queue** -> still meaningful, not yet fully integrated

The doctrine is:
- do not erase sources just because they are not yet canonicalized
- but do not treat uncatalogued source material as if it were already integrated doctrine either

This prevents both neglect and premature flattening.

---

## Pattern 7 — Inventory, Absorption Matrix, and Trigger Scope Are Companion Controls

This source-reservoir map works with three other control surfaces:
- `INVENTORY.md` -> what exists now
- `ABSORPTION_MATRIX.md` -> what was promoted from where
- `TRIGGER_SCOPE.md` -> what runtime activation is allowed to own

The doctrine is:
- source map says where truth can come from
- absorption matrix says what has already been integrated
- trigger scope says what may actually execute at runtime

Together, these documents prevent donor confusion from becoming system confusion.

---

## Quick Routing Rule

When dealing with any donor-origin question, ask in order:

1. What donor family is this from?
2. Has the lesson already been promoted into canonical doctrine?
3. If yes, use the canonical surface.
4. If no, treat the donor as upstream evidence for future extraction, not as a runtime dependency.

---

## Anti-Patterns

- copying donor repositories into runtime surface shape by directory resemblance alone
- using donor file paths as the primary reading path in canonical docs
- assuming a donor is unimportant just because it is not yet canonized
- treating raw donor sprawl as if it were already an architecture
- promoting patterns without recording provenance and destination clearly

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`
- `memory-systems-overview.md`
- `plugin-runtime-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “these are the donor families that feed developer-tool.”

The reusable lesson is:
> “source reservoirs are governed inputs: identify the donor family, promote only the extracted lesson into canonical doctrine, and keep runtime surfaces pointed at curated truth so the engine can scale without turning source abundance into operational confusion.”
