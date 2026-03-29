# Language Specialists Absorption Matrix

> Specialist doctrine should absorb ecosystem truth first, routing discipline second, and runtime only when operational ownership is explicit.
> 专家型语言 doctrine 应先吸收生态真相，再吸收路由纪律；只有在 operational ownership 明确时才进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/language-specialists`.

This document answers a subsystem control-plane question:

> when a language-specific donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs control-plane governance, and what should remain deferred rather than prematurely promoted into staging or a subtree runtime shell?

This matrix exists to prevent:

- treating all language donors as if they justify separate mini-engines
- flattening ecosystem-specific truth into generic cross-language advice
- confusing bridge doctrine with a staging or runtime subsystem
- inventing a language-specialists shell before maturity pressure justifies it

## Source Provenance

- **Primary source:** current `developer-tool` language-specialists doctrine cluster and subtree control plane
- **Derived from:** cross-language routing, ecosystem-truth preservation, and bridge-lane canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current language-specialists subsystem

---

## Core Rule

`language-specialists` is a doctrine-first, bridge-shaped subsystem.

That means a useful donor pattern may currently be promoted into:

- subtree doctrine under `references/language-specialists/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:

- a dedicated subsystem runtime shell
- an active governed staging subsystem
- a broad subtree-local support-pack layer that pretends this bridge lane is becoming a full engine

The goal is not to make the lane larger.  
The goal is to keep the lane sharp.

---

## Current Surface Model

| Surface                                                                 | Current Role                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `references/language-specialists/*`                                     | canonical bridge-shaped specialist doctrine                        |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem                               |
| root `developer-tool` runtime surfaces                                  | currently the only runtime execution layer this subsystem may feed |
| donor/source families                                                   | upstream evidence and extraction material                          |

The doctrine is:

- this subsystem currently owns specialist truth and routing discipline more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family                              | Extracted Pattern                                                        | Canonical Destination                                                                            | Runtime Destination                                                                | Notes                    |
| ------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------ |
| absorbed language-specialist donor families | ecosystem-specific idioms, toolchain posture, framework trade-offs       | `references/language-specialists/*`, selected subtree control docs                               | root `developer-tool` runtime surfaces only when operational leverage is clear     | primary doctrinal feed   |
| cross-language interop donors               | routing boundaries between language advice and other engines             | selected `references/language-specialists/*`, selected subtree control docs                      | root route/prime surfaces when explicit routing help is needed                     | routing-governance donor |
| cross-platform adjacent donors              | support-tier or platform-boundary truth that touches language ecosystems | selected `references/language-specialists/*`, selected `references/cross-platform-development/*` | root runtime surfaces only when operational leverage is clear                      | cross-lane donor         |
| toolchain/build-system donors               | build/runtime/tooling reality for non-heavy-engine languages             | selected `references/language-specialists/*`, selected `references/build-and-deploy/*`           | root runtime surfaces where packaging or release posture is operationally relevant | operational-truth donor  |

---

## Pattern 1 — Promote Ecosystem Truth Before Ecosystem Breadth

The most valuable language-specialist donor material is about:

- native idioms
- framework and toolchain consequences
- routing boundaries to broader lanes or heavy engines
- the specific operational truth of a language ecosystem

That means the first destination is usually doctrine.

The doctrine is:

- promote ecosystem truth first
- avoid expanding the lane merely because more donor material exists

This protects the subsystem from becoming a fake multi-language academy.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:

- whether the lane should stay light and bridge-shaped
- whether the task should route to a dedicated engine
- whether the lane still has no dedicated runtime shell
- whether maturity pressure is actually increasing or just donor richness is increasing

The doctrine is:

- routing/governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Bridge Lanes Must Resist Staging Inflation

Unlike other subsystems, this lane does not currently need subtree-local support packs or staging.

The doctrine is:

- a bridge-shaped subsystem should stay light until pressure clearly justifies more structure
- donor abundance alone is not enough to justify staging or local runtime growth

This is one of the key maturity truths of this subsystem.

---

## Pattern 4 — Runtime Execution Stays Root-Owned Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply operational action, they should usually land in:

- root `developer-tool` runtime surfaces
- root commands, agents, hooks, and rules that already govern operational behavior

not in an invented local shell.

The doctrine is:

- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Specialist Guidance Must Stay Stricter Than Keyword Routing

Because this lane spans multiple ecosystems, it is easy to misroute tasks by keyword alone.

The doctrine is:

- do not absorb language keyword maps faster than problem-shape routing doctrine
- keyword routing without pressure analysis is not maturity; it is noisy triage

This is why routing doctrine should remain central here.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks language-specialist questions, it should consume:

- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:

- this lane already deserves its own shell
- staging exists here already
- every mentioned language should stay in this lane instead of routing to a broader or heavier engine

The doctrine is:

- root runtime surfaces must respect subsystem maturity instead of flattening all language mentions into one operational posture

---

## Absorption Review Checklist

Before calling a language-specialist donor properly absorbed, ask:

- [ ] Was the donor pattern promoted into doctrine rather than prematurely into runtime?
- [ ] If it affected routing or maturity, was it recorded in the root control docs?
- [ ] Was the bridge-shaped posture preserved instead of inflated into pseudo-engine behavior?
- [ ] Was runtime shell growth delayed unless operational ownership was genuinely clear?
- [ ] Do root runtime surfaces still treat this subtree as doctrine-first rather than shell-first?

---

## Cross-Links

Read this alongside:

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `../../references/language-specialists/INDEX.md`
- `../../references/language-specialists/language-specialists.md`
- `../cross-platform-development/README.md`
- `../../rust-coding-engine/README.md`
- `../../typescript-coding-engine/README.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:

> “language-specialists now has its own absorption matrix too.”

The reusable lesson is:

> “a bridge-shaped language subsystem must absorb donors according to its actual maturity: ecosystem truth first, control-plane governance second, and runtime shell growth deferred until operational pressure is real—so specialist guidance stays sharp instead of mutating into another half-built engine.”
