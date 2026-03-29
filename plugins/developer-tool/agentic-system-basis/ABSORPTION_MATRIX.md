# Agentic System Basis Absorption Matrix

> Agentic-system donors should strengthen doctrine first, delay shell growth second, and leave runtime expansion earned rather than assumed.
> agentic-system donor 应先强化 doctrine，再延后 shell 增长；runtime 扩张必须是“挣来的”，而不是默认存在的。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/agentic-system-basis`.

This document answers a subsystem control-plane question:

> when an agentic-system-related donor family contributes useful patterns, where should those patterns land in this subsystem today, what must remain doctrine-first, and what should stay reserved rather than prematurely promoted into staging or runtime shell behavior?

This matrix exists to prevent:
- treating all agentic-system donors as runtime-shell donors
- flattening system-governance doctrine into plugin mechanics too early
- inventing a subsystem shell before the doctrine/control-plane pressure justifies it
- confusing broad orchestration truth with specific execution surfaces

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis doctrine cluster and its new subtree control plane
- **Derived from:** agent-runtime, orchestration, plugin-shell, coordination, bootstrap, and autonomy/gate donor canonization work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current agentic-system-basis subsystem

---

## Core Rule

`agentic-system-basis` is a doctrine-first subsystem.

That means a useful donor pattern may currently be promoted into:
- subtree doctrine under `references/agentic-system-basis/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's root operational layer

It should **not** yet be promoted into:
- a dedicated subsystem runtime shell
- an active staging subsystem under `v3-expansion/`

The goal is not to make this subtree look as mature as `ai-agent-memory` prematurely.  
The goal is to preserve truthful subsystem maturity.

---

## Current Surface Model

| Surface | Current Role |
|---|---|
| `references/agentic-system-basis/*` | canonical doctrine and system-level design truth |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem |
| `v3-expansion/` | reserved-only future staging zone |
| root `developer-tool` runtime surfaces | currently the only runtime execution layer this subsystem may feed |
| donor/source families | upstream evidence and extraction material |

The doctrine is:
- this subsystem currently owns doctrine and governance more than runtime
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family | Extracted Pattern | Canonical Destination | Runtime / Staging Destination | Notes |
|---|---|---|---|---|
| `agent-skills-main` | bootstrap flows, architecture decisions, ensemble patterns, pipeline models, session reflection, task/protocol governance | `references/agentic-system-basis/*`, selected root control docs | root `developer-tool` route/prime/audit surfaces only where explicitly justified | major doctrine donor |
| `agentup-main` | meta-skill/system packaging, runtime capability framing, activation ideas | `references/agentic-system-basis/*`, selected `references/tool-ecosystem/*` | root `skills/tool-ecosystem/` only where shell leverage is clear | structure/system donor, not a subsystem shell donor |
| `claude-code-skills-main` | Claude runtime behavior, plugin-aware orchestration, automation posture, operational packaging | `references/agentic-system-basis/*`, selected `references/tool-ecosystem/*` | root runtime surfaces after doctrinal curation | must not be mirrored directly |
| `outfitter-main` | plugin shell laws, action registry thinking, progressive disclosure, runtime structuring | selected `references/tool-ecosystem/*`, selected `references/agentic-system-basis/*` | root `developer-tool` commands/agents only when operationally justified | plugin/runtime donor, not doctrine source of truth by itself |
| `skill-system-router` | trigger framing, routing language, surface-selection discipline | `TRIGGER_SCOPE.md`, selected root `developer-tool` trigger/routing docs | `commands/route/choose-tool-surface.md` | routing-governance donor |

---

## Pattern 1 — Promote System Truth Before Runtime Shape

Most valuable agentic-system donor material is about:
- how the system should think
- how it should activate
- how it should coordinate
- how it should bootstrap
- how it should govern autonomy

That means the first destination is usually doctrine.

The doctrine is:
- promote system truth first
- promote execution shell shape only when the doctrine has made ownership explicit

This protects the subsystem from premature shell inflation.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Not every useful donor idea belongs directly in canonical references.
Some belong in subtree control docs instead.

Examples:
- what maturity stage the subsystem is at
- whether staging is active or merely reserved
- whether a dedicated runtime shell exists yet
- which triggers should stay doctrine-first

The doctrine is:
- some donor lessons govern the subsystem itself rather than its content
- those belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, and this `ABSORPTION_MATRIX.md`

---

## Pattern 3 — Reserved Staging Is Not Active Staging

`agentic-system-basis/v3-expansion/` currently exists only as a reserved zone.

That means:
- it is not yet a governed staging subsystem
- it should not be used as an ordinary destination in active routing
- donor material should not be parked there just to simulate progress

The doctrine is:
- reserved staging is a maturity marker, not an operational layer

This is one of the most important differences between this subtree and `ai-agent-memory`.

---

## Pattern 4 — Runtime Belongs to the Root Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply runtime action, they should usually land in:
- root `developer-tool` runtime surfaces
- root plugin/tooling/runtime references

not in an invented local shell.

The doctrine is:
- runtime growth should stay at the root layer until this subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Plugin-First Does Not Mean Plugin-Immediate

This subsystem teaches plugin-first logic for heavy domains.
But teaching that doctrine is not the same as immediately becoming a shell-heavy subsystem.

The doctrine is:
- plugin-first is an architecture principle
- not a command to instantiate a plugin shell before the subtree has earned one

This is exactly why this subtree can be doctrine-mature while still runtime-reserved.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks agentic-system questions, it should consume:
- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:
- active staging exists here already
- a dedicated runtime shell exists here already
- every donor pattern deserves an executable surface immediately

The doctrine is:
- root runtime surfaces must respect subsystem maturity instead of flattening every subtree into identical shell shapes

---

## Absorption Review Checklist

Before calling an agentic-system donor properly absorbed, ask:

- [ ] Was the donor pattern promoted into doctrine rather than prematurely into runtime?
- [ ] If it affected subsystem maturity or routing, was it recorded in the root control docs?
- [ ] Was reserved staging kept reserved rather than activated by inertia?
- [ ] Was shell growth delayed unless operational ownership was genuinely clear?
- [ ] Do root runtime surfaces still treat this subtree as doctrine-first rather than shell-first?

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `../../references/agentic-system-basis/INDEX.md`
- `../../references/agentic-system-basis/activation-model.md`
- `../../references/agentic-system-basis/runtime-activation-patterns.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:
> “agentic-system-basis now has its own absorption matrix too.”

The reusable lesson is:
> “a doctrine-first subsystem must absorb donors according to its actual maturity: system truth and control-plane governance first, reserved staging kept genuinely reserved, and runtime shell growth deferred until ownership pressure is real—so the subsystem stays honest instead of theatrically complete.”
