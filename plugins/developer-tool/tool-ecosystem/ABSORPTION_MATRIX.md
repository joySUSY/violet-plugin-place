# Tool Ecosystem Absorption Matrix

> Shell architecture should absorb patterns as law first, structure second, and runtime only when operational ownership is clear.
> shell architecture 应先把模式吸收为 law，再吸收为 structure，最后才在 ownership 明确时进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/tool-ecosystem`.

This document answers a subsystem control-plane question:

> when a shell-architecture donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs. control-plane governance, and what should remain deferred rather than prematurely promoted into staging or shell execution?

This matrix exists to prevent:
- treating all shell/tooling donors as immediate runtime-shell donors
- flattening shell-law doctrine into operational scripts too early
- inventing a subsystem shell before shell-governance doctrine has earned it
- confusing engine-wide shell law with one-off implementation convenience

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine cluster and its new subtree control plane
- **Derived from:** plugin-shell, component-model, command/hook/MCP/runtime donor canonization and root engine shell-governance work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current tool-ecosystem subsystem

---

## Core Rule

`tool-ecosystem` is a doctrine-first and governance-heavy subsystem.

That means a useful donor pattern may currently be promoted into:
- subtree doctrine under `references/tool-ecosystem/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:
- a dedicated subsystem runtime shell
- an active governed staging subsystem under `v3-expansion/`

The goal is not to make this subtree shell-heavy too early.  
The goal is to preserve truthful shell-governance maturity.

---

## Current Surface Model

| Surface | Current Role |
|---|---|
| `references/tool-ecosystem/*` | canonical doctrine and shell-architecture truth |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem |
| `v3-expansion/` | reserved-only future staging zone |
| root `developer-tool` runtime surfaces | currently the only runtime execution layer this subsystem may feed |
| donor/source families | upstream evidence and extraction material |

The doctrine is:
- this subsystem currently owns shell law and governance more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family | Extracted Pattern | Canonical Destination | Runtime / Staging Destination | Notes |
|---|---|---|---|---|
| `outfitter-main` | plugin shell structure, progressive disclosure, action registry logic, runtime packaging patterns | `references/tool-ecosystem/*`, selected root control docs | root `developer-tool` commands/agents/rules only when operationally justified | major tool-ecosystem donor |
| `claude-code-skills-main` | plugin/command ecosystem patterns, operational packaging, shell ergonomics | `references/tool-ecosystem/*`, selected `references/build-and-deploy/*`, selected root governance docs | root runtime surfaces after doctrinal curation | not a runtime mirror |
| `skill-system-router` | routing language, trigger framing, surface-selection discipline | `TRIGGER_SCOPE.md`, selected root `developer-tool` trigger/routing docs, selected `references/tool-ecosystem/*` | `commands/route/choose-tool-surface.md` after doctrinal routing | routing-governance donor |
| `agentup-main` | meta-skill/system packaging, activation posture, developer-tool surface composition ideas | selected `references/tool-ecosystem/*`, selected `references/agentic-system-basis/*` | root bridge skills only where shell leverage is clear | system packaging donor |

---

## Pattern 1 — Promote Shell Law Before Runtime Shape

The most valuable tool-ecosystem donor material is about:
- what a shell is
- how surfaces should be separated
- how components should be chosen
- what runtime boundaries should exist
- when MCP is justified

That means the first destination is usually doctrine.

The doctrine is:
- promote shell law first
- promote operational shell shape only when doctrine has already made ownership explicit

This protects the subsystem from premature shell inflation.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:
- whether this subsystem currently owns its own shell
- whether staging is active or only reserved
- whether a routing rule should stay subtree-local or engine-global
- whether maturity is high enough to justify new surfaces

The doctrine is:
- shell-governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Reserved Staging Is Not Active Staging

`tool-ecosystem/v3-expansion/` currently exists only as a reserved zone.

That means:
- it is not yet a governed staging subsystem
- it should not be used as an active routing destination
- donor material should not be parked there just because the subtree is broad

The doctrine is:
- reserved staging is a maturity marker, not an operational layer

This is one of the central maturity truths of this subsystem.

---

## Pattern 4 — Root Runtime Surfaces Should Carry Operational Shell Work Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply shell execution, they should usually land in:
- root `developer-tool` runtime surfaces
- root commands/agents/rules that already govern shell behavior

not in an invented local shell.

The doctrine is:
- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Shell-Governance Doctrine Must Remain More Stable Than Shell Implementation

This subtree teaches how shells should be built.
That means its doctrine must stay more stable than any one concrete shell implementation.

The doctrine is:
- do not let one currently fashionable shell implementation redefine the subsystem's truth
- runtime examples should remain downstream of doctrine, not the other way around

This protects the engine against trend drift.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks tool-ecosystem questions, it should consume:
- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:
- active staging exists here already
- a dedicated runtime shell exists here already
- all rich donors deserve direct shell instantiation

The doctrine is:
- root runtime surfaces must respect subsystem maturity instead of flattening every governance-heavy subtree into the same runtime posture

---

## Absorption Review Checklist

Before calling a tool-ecosystem donor properly absorbed, ask:

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
- `../../references/tool-ecosystem/INDEX.md`
- `../../references/tool-ecosystem/core-shell-patterns.md`
- `../../references/tool-ecosystem/component-model.md`
- `../../references/tool-ecosystem/command-surface-patterns.md`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:
> “tool-ecosystem now has its own absorption matrix too.”

The reusable lesson is:
> “a shell-governance subsystem must absorb donors according to its actual maturity: shell law and control-plane governance first, reserved staging kept genuinely reserved, and runtime shell growth deferred until ownership pressure is real—so the subsystem remains a trustworthy source of shell architecture rather than becoming another shell implementation in disguise.”
