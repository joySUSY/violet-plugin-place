# Build and Deploy Absorption Matrix

> Delivery doctrine should absorb trust and reproducibility first, orchestration second, and runtime only when operational ownership is explicit.
> 交付 doctrine 应先吸收可信性与可复现性，再吸收编排姿态；只有在 operational ownership 明确时才进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/build-and-deploy`.

This document answers a subsystem control-plane question:

> when a build-, release-, or deployment-related donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs control-plane governance, and what should remain deferred rather than prematurely promoted into staging or a subtree runtime shell?

This matrix exists to prevent:
- treating all build/deploy donors as immediate automation assets
- flattening release and supply-chain doctrine into scripts too early
- confusing subtree-local support skill bundles with a governed staging subsystem
- inventing a deploy-focused runtime shell before maturity pressure justifies it

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine cluster, subtree control plane, and subtree-local supporting skill bundles
- **Derived from:** CI/CD, release governance, deployment orchestration, supply-chain canonization, and build/deploy runtime-boundary work
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current build-and-deploy subsystem

---

## Core Rule

`build-and-deploy` is a doctrine-first subsystem with high operational blast radius.

That means a useful donor pattern may currently be promoted into:
- subtree doctrine under `references/build-and-deploy/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- subtree-local supporting skill bundles only when the pattern is a narrow support pack rather than a new doctrinal lane
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:
- a dedicated subsystem runtime shell
- an active governed staging subsystem

The goal is not to make delivery automation feel smarter.  
The goal is to make delivery governance more trustworthy.

---

## Current Surface Model

| Surface | Current Role |
|---|---|
| `references/build-and-deploy/*` | canonical build/release/deploy doctrine and operational trust truth |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem |
| `ci-cd-multi-platform-matrix/`, `containerization-docker-standards/`, `release-and-deployment-processes/` | subtree-local supporting skill bundles |
| root `developer-tool` runtime surfaces | currently the only runtime execution layer this subsystem may feed |
| donor/source families | upstream evidence and extraction material |

The doctrine is:
- this subsystem currently owns delivery law and boundary governance more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family | Extracted Pattern | Canonical Destination | Runtime / Skill-Bundle Destination | Notes |
|---|---|---|---|---|
| existing build/deploy subtree donors | CI/CD structure, release discipline, deployment strategy, supply-chain posture | `references/build-and-deploy/*`, selected subtree control docs | subtree-local support skill bundles only when a narrow support pack is useful | primary doctrinal feed |
| `claude-code-skills-main` | CI/CD workflows, release automation posture, operational packaging patterns | selected `references/build-and-deploy/*`, selected root control docs | root `developer-tool` commands/agents only when operationally justified | build/release donor, not runtime mirror |
| `outfitter-main` | runtime packaging, manifest/version sync posture, distribution structure | selected `references/build-and-deploy/*`, selected `references/tool-ecosystem/*` | root `developer-tool` runtime surfaces only where operational leverage is clear | packaging/runtime-boundary donor |
| delivery workflow donor patterns | matrix strategy, container standards, release process sequencing | `references/build-and-deploy/*`, subtree control docs when maturity/governance is affected | subtree-local support skill bundles when a focused pack adds leverage | doctrine first, support pack second |

---

## Pattern 1 — Promote Delivery Trust Before Delivery Automation

The most valuable build/deploy donor material is about:
- reproducibility
- release governance
- deployment blast-radius awareness
- supply-chain trust
- runtime boundaries for delivery work

That means the first destination is usually doctrine.

The doctrine is:
- promote delivery truth first
- promote operational automation only when doctrine has already made the behavior explicit and bounded

This protects the subsystem from turning release cleverness into release chaos.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:
- whether the subtree still has no dedicated runtime shell
- whether subtree-local skill bundles are support packs rather than staging
- whether delivery-facing runtime work should stay root-owned
- whether maturity is high enough to justify stronger automation

The doctrine is:
- delivery-governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Subtree Skill Bundles Are Support Packs, Not Staging

This subtree already contains skill bundles:
- `ci-cd-multi-platform-matrix/`
- `containerization-docker-standards/`
- `release-and-deployment-processes/`

These are useful, but they do **not** mean the subtree already has a governed staging subsystem.

The doctrine is:
- support packs may exist under a doctrine-first subtree without implying active staging
- promotion into support packs should stay narrow and subordinate to doctrine

This is one of the key maturity truths of this subsystem.

---

## Pattern 4 — Runtime Execution Stays Root-Owned Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply build/deploy execution, they should usually land in:
- root `developer-tool` runtime surfaces
- root commands, agents, hooks, and rules that already govern operational behavior

not in an invented local shell.

The doctrine is:
- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Delivery Discipline Must Stay Stricter Than Delivery Convenience

Because build/deploy work has high blast radius, this subsystem should be stricter than more abstract doctrine lanes.

The doctrine is:
- do not absorb convenience automation patterns faster than reproducibility and safety patterns
- convenience without trust is not maturity; it is hidden operational debt

This is why deployment automation should lag deployment doctrine, not lead it.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks build-and-deploy questions, it should consume:
- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:
- active staging already exists here
- a dedicated subsystem runtime shell already exists here
- subtree-local skill bundles justify runtime escalation by themselves

The doctrine is:
- root runtime surfaces must respect subsystem maturity instead of flattening all delivery-related material into operational behavior

---

## Absorption Review Checklist

Before calling a build-and-deploy donor properly absorbed, ask:

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
- `../../references/build-and-deploy/INDEX.md`
- `../../references/build-and-deploy/runtime-boundaries.md`
- `../../references/build-and-deploy/release-governance.md`
- `../../references/build-and-deploy/deployment-orchestration-patterns.md`
- `../../references/build-and-deploy/supply-chain-governance.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:
> “build-and-deploy now has its own absorption matrix too.”

The reusable lesson is:
> “a delivery-facing subsystem must absorb donors according to its actual maturity: trust and reproducibility truth first, control-plane governance second, subtree support packs kept clearly subordinate, and runtime shell growth deferred until operational pressure is real—so build and deploy work remains governed rather than theatrically automated.”
