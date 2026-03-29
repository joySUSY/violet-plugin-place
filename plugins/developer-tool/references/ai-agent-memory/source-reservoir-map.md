# AI Agent Memory Source Reservoir Map

## Purpose

Define the canonical governance doctrine for source reservoirs feeding the `ai-agent-memory` lane inside `developer-tool`.

This document is not just a list of donor locations.
It exists to answer a tighter question than the top-level source map:

> which upstream memory-related donor families inform this lane, what kind of patterns are allowed to be promoted, and how do we keep memory doctrine, continuity runtime, and source reservoirs from collapsing into each other?

It is the memory-lane counterpart to the broader `developer-tool/references/source-reservoir-map.md`.

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and its donor families
- **Derived from:** source-truth freeze, memory-lane canonization, and runtime-boundary decisions for recall and continuity systems
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local memory-reservoir governance doctrine aligned to the current developer-tool engine

---

## Core Rule

Donor memory repositories remain upstream reservoirs.  
Canonical memory behavior must be rewritten into this workspace's doctrine and runtime shell.

The allowed flow is:

`source reservoir -> curated memory doctrine -> runtime shell`

The forbidden flow is:

`source reservoir -> direct runtime dependency`

This matters especially in the memory lane because donor products often mix:

- useful ideas
- product-specific commands
- implementation details
- storage assumptions
- runtime behaviors that do not belong directly in the canonical system

---

## Reservoir Families

| Family                           | Reservoir Role                                                                              | Canonical Export Path                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Memory doctrine                  | recall-before-act, store-after-discovery, working-state, self-reminder                      | `recall-before-act.md`, `working-state-and-self-reminder-discipline.md`                                                         |
| Rule-loader memory product       | load-rules-first, project-scoped recall, search-before-mutate, lifecycle capture            | `claude-recall-operating-model.md`, `claude-recall-patterns.md`, `search-before-act-enforcement.md`, `memory-trigger-matrix.md` |
| Continuity control plane         | diagnose / trace / recover / capsule / archive, surfaced continuity, control-plane layering | `continuity-control-plane.md` and runtime continuity surfaces                                                                   |
| Workspace-aligned memory modules | already-adapted memory/history/search/hygiene modules                                       | `README.md`, `history-retrieval-patterns.md`, supporting refs                                                                   |
| Plugin structure governance      | plugin manifest/frontmatter/hook structure for runtime memory shells                        | `plugins/violet-memory-lab/*` and related runtime docs                                                                          |
| Trigger routing governance       | ownership framing for triggers and lane selection                                           | `TRIGGER_SCOPE.md`, `memory-trigger-matrix.md`                                                                                  |

This map is conceptual, not a promise that raw reservoir paths are the preferred reading surface.

---

## Authority Levels

| Level | Meaning                                                         |
| ----- | --------------------------------------------------------------- |
| L1    | Canonical doctrine in `developer-tool`                          |
| L2    | Canonical operational shell in `plugins/violet-memory-lab`      |
| L3    | Source reservoirs used for future extraction or forensic review |

The memory lane must read L1 first, L2 second, L3 last.

This order is not arbitrary.
It preserves:

- cleanup-safe navigation
- doctrine/runtime separation
- freedom to archive or restructure reservoirs later without breaking the canonical reading path

---

## Pattern 1 — Promote Patterns, Not Product Identity

A donor is valuable because of the patterns it demonstrates.
It is not valuable because its exact command names, package layout, or product model should become canonical truth.

Examples:

- preserve “load-rules-first” as a pattern
- do not preserve product-specific CLI names as canonical doctrine
- preserve “continuity capture windows” as a pattern
- do not preserve one donor's internal storage topology as if it were the universal answer

The doctrine is:

- pattern permanence matters more than product vocabulary permanence

---

## Pattern 2 — Memory and Continuity Have Different Promotion Destinations

Not all donor memory ideas should land in the same place.

### Promote to memory doctrine when the idea is about:

- recall posture
- memory classes
- retrieval lane selection
- memory hygiene
- promotion from experience into durable knowledge

### Promote to runtime shell when the idea is about:

- lifecycle capture
- continuity recovery
- project-local operational commands
- bounded enforcement or reminder surfaces

The doctrine is:

- promotion destination should follow ownership
- not donor folder shape

This keeps the memory lane architecturally clear.

---

## Pattern 3 — Source Reservoirs Must Not Become a Second Knowledge Center

A common failure mode is letting the runtime or plugin shell point directly back into donor material as if it were still the active source of truth.

That must not happen.

The doctrine is:

- `developer-tool` owns the canonical memory doctrine
- runtime shells consume that doctrine
- donor reservoirs remain evidence only

This is especially important because memory systems are tempting places to hide complexity in the name of “intelligence.”

---

## Pattern 4 — Trigger Ownership Depends on Canonical Surfaces, Not Reservoir Paths

The memory lane's triggers should resolve through:

- doctrine docs
- runtime shell surfaces
- project-local continuity artifacts

They should not require first-line jumps into source reservoirs.

The doctrine is:

- trigger ownership must remain canonical and cleanup-safe
- donor repos are fallback evidence, not trigger controllers

This preserves both usability and future maintainability.

---

## Pattern 5 — Reservoir Use Is Fallback, Not Default

When in doubt:

1. read the curated reference first
2. open the reservoir only to validate or extract a missing pattern
3. rewrite the insight back into canonical form before considering it reusable

This is the correct order because it:

- keeps active tasks lightweight
- prevents runtime drift into donor internals
- ensures reuse happens through curated doctrine rather than raw copy-forward

The doctrine is:

- if the canonical lane already answers the question, the reservoir should stay closed

---

## Pattern 6 — Memory-Lane Governance Is Also Cleanup Governance

A memory source map is not only about provenance.
It also determines what can later be archived or cleaned without harming the canonical system.

The doctrine is:

- raw reservoir path references belong only in governance/provenance notes
- active navigation must rely on canonical docs
- promotion records must remain clear enough that a future cleanup does not orphan the doctrine

This is one of the main reasons this map exists at all.

---

## Allowed Promotions

A reservoir pattern may be promoted only if:

1. it is rewritten into an agent-facing canonical doc or runtime shell file
2. its boundary is explicit (knowledge vs automation)
3. it does not smuggle donor-specific product assumptions into canonical doctrine
4. it remains compatible with surfaced-memory-only safety rules

---

## Forbidden Promotions

Do **not** promote a reservoir by:

- mirroring the full donor directory into runtime paths
- telling runtime agents to treat donor repos as their first reference
- creating a second knowledge center under the plugin shell
- blending hidden reasoning storage into surfaced continuity artifacts
- preserving product-specific names as if they were the doctrine itself

---

## Quick Routing Rule

When in doubt:

- read the curated reference first
- open the reservoir only to validate or extract a missing pattern
- rewrite the insight back into canonical form before considering it reusable

If a lesson is still only understandable inside the raw donor product, it has not yet been canonized successfully.

---

## Anti-Patterns

- using donor repositories as active runtime reading surfaces
- preserving product command names as if they were architecture
- mixing recall doctrine and continuity runtime implementation inside one donor-shaped artifact
- hiding critical governance only inside path-dependent notes
- allowing one donor product to define the workspace-wide authority for memory behavior

---

## Cross-Links

Read this alongside:

- `../source-reservoir-map.md`
- `../memory-systems-overview.md`
- `claude-recall-patterns.md`
- `continuity-control-plane.md`
- `memory-trigger-matrix.md`
- `../../TRIGGER_SCOPE.md`

---

## Final Doctrine

The reusable lesson is not:

> “these are the memory-related donor families and where they came from.”

The reusable lesson is:

> “memory source reservoirs are governed inputs: preserve the pattern, not the product; promote recall doctrine and continuity runtime into the right canonical surfaces; and keep runtime, doctrine, and donor evidence distinct so the memory lane remains cleanup-safe and architecturally coherent over time.”
