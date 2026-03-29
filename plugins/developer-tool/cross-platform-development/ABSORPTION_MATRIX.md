# Cross-Platform Development Absorption Matrix

> Portability doctrine should absorb support truth first, boundary strategy second, and runtime only when operational ownership is explicit.
> 可移植性 doctrine 应先吸收支持真相，再吸收边界策略；只有在 operational ownership 明确时才进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/cross-platform-development`.

This document answers a subsystem control-plane question:

> when a cross-platform or portability-related donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs control-plane governance, and what should remain deferred rather than prematurely promoted into staging or a subtree runtime shell?

This matrix exists to prevent:

- treating all cross-platform donors as implementation templates
- flattening support-tier doctrine into framework preference too early
- confusing subtree-local support skill bundles with a governed staging subsystem
- inventing a portability-focused runtime shell before maturity pressure justifies it

## Source Provenance

- **Primary source:** current `developer-tool` cross-platform doctrine cluster, subtree control plane, and subtree-local supporting skill bundles
- **Derived from:** cross-platform compatibility, shared-core strategy, Tauri/runtime bridge, and support-tier canonization work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current cross-platform subsystem

---

## Core Rule

`cross-platform-development` is a doctrine-first subsystem.

That means a useful donor pattern may currently be promoted into:

- subtree doctrine under `references/cross-platform-development/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- subtree-local supporting skill bundles only when the pattern is a narrow support pack rather than a new doctrinal lane
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:

- a dedicated subsystem runtime shell
- an active governed staging subsystem

The goal is not to make portability feel broader than it is.  
The goal is to make support truth more defensible.

---

## Current Surface Model

| Surface                                                                                      | Current Role                                                       |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `references/cross-platform-development/*`                                                    | canonical support-tier and portability doctrine                    |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`                      | root control plane for the subsystem                               |
| `platform-support-cross-platform-compatibility/`, `tauri-development/`, `tauri2-react-rust/` | subtree-local supporting skill bundles                             |
| root `developer-tool` runtime surfaces                                                       | currently the only runtime execution layer this subsystem may feed |
| donor/source families                                                                        | upstream evidence and extraction material                          |

The doctrine is:

- this subsystem currently owns platform-support truth and boundary governance more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family                           | Extracted Pattern                                                           | Canonical Destination                                                                          | Runtime / Skill-Bundle Destination                                                                             | Notes                           |
| ---------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| existing cross-platform subtree donors   | support tiers, compatibility strategy, shared-core guidance                 | `references/cross-platform-development/*`, selected subtree control docs                       | subtree-local support packs only when a narrow pack is useful                                                  | primary doctrinal feed          |
| Tauri/runtime bridge donors              | desktop shell patterns, native/web boundary behavior, IPC-sensitive posture | `references/cross-platform-development/*`, selected `references/tool-ecosystem/*`              | `tauri-development/`, `tauri2-react-rust/` as support packs when they clarify focused implementation questions | boundary donor, not shell proof |
| shell and environment portability donors | path/env/runtime difference handling, local environment truth               | selected `references/cross-platform-development/*`, selected `references/shell-and-terminal/*` | subtree support packs only if the concern remains cross-platform in nature                                     | cross-lane donor                |
| build/release matrix donors              | support claims, target matrices, packaging/test truth                       | selected `references/cross-platform-development/*`, selected `references/build-and-deploy/*`   | root runtime surfaces only where operational leverage is clear                                                 | release/support-truth donor     |

---

## Pattern 1 — Promote Support Truth Before Framework Shape

The most valuable cross-platform donor material is about:

- what is truly supported
- what should be shared
- what must stay platform-specific
- what runtime/path/capability differences matter
- what testing and release claims are actually justified

That means the first destination is usually doctrine.

The doctrine is:

- promote support truth first
- promote implementation shape only when doctrine has already made the boundary explicit

This protects the subsystem from portability theater.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:

- whether the subtree still has no dedicated runtime shell
- whether subtree-local skill bundles are support packs rather than staging
- whether a framework-specific donor should stay subordinate to support-tier doctrine
- whether maturity is high enough to justify stronger runtime surfaces

The doctrine is:

- cross-platform governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Subtree Skill Bundles Are Support Packs, Not Staging

This subtree already contains skill bundles:

- `platform-support-cross-platform-compatibility/`
- `tauri-development/`
- `tauri2-react-rust/`

These are useful, but they do **not** mean the subtree already has a governed staging subsystem.

The doctrine is:

- support packs may exist under a doctrine-first subtree without implying active staging
- promotion into support packs should stay narrow and subordinate to doctrine

This is one of the key maturity truths of this subsystem.

---

## Pattern 4 — Runtime Execution Stays Root-Owned Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply runtime execution, they should usually land in:

- root `developer-tool` runtime surfaces
- root commands, agents, hooks, and rules that already govern operational behavior

not in an invented local shell.

The doctrine is:

- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Support Claims Must Stay Stricter Than Portability Branding

Because cross-platform work easily drifts into overclaiming, this subsystem must be stricter than framework marketing.

The doctrine is:

- do not absorb cross-platform convenience patterns faster than support-truth patterns
- portability branding without support proof is not maturity; it is hidden product risk

This is why implementation guidance should lag support doctrine, not lead it.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks cross-platform questions, it should consume:

- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:

- active staging already exists here
- a dedicated subsystem runtime shell already exists here
- subtree-local skill bundles justify runtime escalation by themselves

The doctrine is:

- root runtime surfaces must respect subsystem maturity instead of flattening all portability-related material into implementation advice

---

## Absorption Review Checklist

Before calling a cross-platform donor properly absorbed, ask:

- [ ] Was the donor pattern promoted into doctrine rather than prematurely into implementation?
- [ ] If it affected subsystem maturity or routing, was it recorded in the root control docs?
- [ ] Were subtree-local supporting skill bundles kept subordinate to doctrine rather than treated as staging?
- [ ] Was runtime shell growth delayed unless operational ownership was genuinely clear?
- [ ] Do root runtime surfaces still treat this subtree as doctrine-first rather than implementation-first?

---

## Cross-Links

Read this alongside:

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `../../references/cross-platform-development/INDEX.md`
- `../../references/cross-platform-development/cross-platform.md`
- `../../references/cross-platform-patterns.md`
- `../build-and-deploy/README.md`
- `../shell-and-terminal/README.md`
- `../tool-ecosystem/README.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:

> “cross-platform-development now has its own absorption matrix too.”

The reusable lesson is:

> “a portability-facing subsystem must absorb donors according to its actual maturity: support truth first, control-plane governance second, subtree support packs kept clearly subordinate, and runtime shell growth deferred until operational pressure is real—so platform claims remain governed rather than aspirational.”
