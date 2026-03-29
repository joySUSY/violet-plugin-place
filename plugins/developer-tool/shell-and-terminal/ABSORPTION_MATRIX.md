# Shell and Terminal Absorption Matrix

> Shell doctrine should absorb safety and portability truth first, execution posture second, and runtime only when explicit operational ownership is clear.
> shell doctrine 应先吸收安全性与可移植性的真相，再吸收执行姿态；只有在 operational ownership 明确时才进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/shell-and-terminal`.

This document answers a subsystem control-plane question:

> when a shell- or terminal-related donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs control-plane governance, and what should remain deferred rather than prematurely promoted into staging or a subtree runtime shell?

This matrix exists to prevent:
- treating all shell donors as execution artifacts
- flattening shell-safety doctrine into scripts too early
- confusing subtree-local supporting skill bundles with a governed staging subsystem
- inventing a shell-specific runtime layer before maturity pressure justifies it

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine cluster, subtree control plane, and subtree-local supporting skill bundles
- **Derived from:** shell safety, terminal ergonomics, portable session, runtime-boundary, and shell-facing workflow canonization work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current shell-and-terminal subsystem

---

## Core Rule

`shell-and-terminal` is a doctrine-first subsystem with high blast radius.

That means a useful donor pattern may currently be promoted into:
- subtree doctrine under `references/shell-and-terminal/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- subtree-local supporting skill bundles only when the pattern is a narrow support pack rather than a new doctrinal lane
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:
- a dedicated subsystem runtime shell
- an active governed staging subsystem

The goal is not to make shell work more magical.  
The goal is to make shell work more governable.

---

## Current Surface Model

| Surface | Current Role |
|---|---|
| `references/shell-and-terminal/*` | canonical shell/terminal doctrine and operational safety truth |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem |
| `bash-portability/`, `terminal/`, `terminal-env/`, `zsh-style-guide/` | subtree-local supporting skill bundles |
| root `developer-tool` runtime surfaces | currently the only runtime execution layer this subsystem may feed |
| donor/source families | upstream evidence and extraction material |

The doctrine is:
- this subsystem currently owns shell law and boundary governance more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family | Extracted Pattern | Canonical Destination | Runtime / Skill-Bundle Destination | Notes |
|---|---|---|---|---|
| existing shell-and-terminal donor families | shell safety, terminal ergonomics, portability, tmux/session practices, evidence capture | `references/shell-and-terminal/*`, selected subtree control docs | subtree-local skill bundles only when a narrow support pack is useful | primary doctrinal feed |
| `outfitter-main` and related tooling-runtime donors | runtime-shell posture for shell work, lifecycle boundary discipline, explicit routing patterns | selected `references/shell-and-terminal/*`, selected `references/tool-ecosystem/*` | root `developer-tool` runtime surfaces only where operational leverage is clear | shell/runtime boundary donor |
| shell portability donor patterns | bash/zsh portability, command contracts, quoting/expansion discipline | `references/shell-and-terminal/shell-terminal.md`, `portable-session-workflows.md` | `bash-portability/` as support pack if it clarifies focused usage | doctrine first, support pack second |
| terminal environment/style donors | terminal emulator posture, terminal UX conventions, zsh style patterns | `references/shell-terminal-mastery.md`, selected shell control docs | `terminal/`, `terminal-env/`, `zsh-style-guide/` as supporting skill packs | keep support packs subordinate to doctrine |

---

## Pattern 1 — Promote Shell Safety Truth Before Shell Automation

The most valuable shell donor material is about:
- safe command behavior
- portability targets
- quoting/expansion discipline
- runtime boundary decisions
- session and evidence discipline

That means the first destination is usually doctrine.

The doctrine is:
- promote shell truth first
- promote execution support only when doctrine has already made the behavior explicit and bounded

This protects the subsystem from turning shell cleverness into shell chaos.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:
- whether the subtree still has no dedicated runtime shell
- whether subtree-local skill bundles are support packs rather than staging
- whether shell-facing runtime work should stay root-owned
- whether maturity is high enough to justify stronger lifecycle behavior

The doctrine is:
- shell-governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Subtree Skill Bundles Are Support Packs, Not Staging

This subtree already contains skill bundles:
- `bash-portability/`
- `terminal/`
- `terminal-env/`
- `zsh-style-guide/`

These are useful, but they do **not** mean the subtree already has a governed staging subsystem.

The doctrine is:
- support packs may exist under a doctrine-first subtree without implying active staging
- promotion into support packs should stay narrow and subordinate to doctrine

This is one of the key maturity truths of this subsystem.

---

## Pattern 4 — Runtime Execution Stays Root-Owned Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply shell execution, they should usually land in:
- root `developer-tool` runtime surfaces
- root commands, agents, hooks, and rules that already govern shell behavior

not in an invented local shell.

The doctrine is:
- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Shell Discipline Must Stay Stricter Than Shell Convenience

Because shell work has high blast radius, this subsystem should be stricter than more abstract doctrine lanes.

The doctrine is:
- do not absorb shell convenience patterns faster than shell safety patterns
- convenience without safety is not maturity; it is hidden risk

This is why shell automation should lag shell doctrine, not lead it.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks shell-and-terminal questions, it should consume:
- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:
- active staging already exists here
- a dedicated subsystem runtime shell already exists here
- subtree-local skill bundles justify runtime escalation by themselves

The doctrine is:
- root runtime surfaces must respect subsystem maturity instead of flattening all shell-related material into operational behavior

---

## Absorption Review Checklist

Before calling a shell-and-terminal donor properly absorbed, ask:

- [ ] Was the donor pattern promoted into doctrine rather than prematurely into execution?
- [ ] If it affected subsystem maturity or routing, was it recorded in the root control docs?
- [ ] Were subtree-local supporting skill bundles kept subordinate to doctrine rather than treated as staging?
- [ ] Was runtime shell growth delayed unless operational ownership was genuinely clear?
- [ ] Do root runtime surfaces still treat this subtree as doctrine-first rather than execution-first?

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `../../references/shell-and-terminal/INDEX.md`
- `../../references/shell-and-terminal/runtime-shell-governance.md`
- `../../references/shell-and-terminal/portable-session-workflows.md`
- `../../rules/shell-safety/non-destructive-defaults.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:
> “shell-and-terminal now has its own absorption matrix too.”

The reusable lesson is:
> “a shell-facing subsystem must absorb donors according to its actual maturity: safety and portability truth first, control-plane governance second, subtree support packs kept clearly subordinate, and runtime shell growth deferred until operational pressure is real—so shell work remains bounded rather than theatrically automated.”
