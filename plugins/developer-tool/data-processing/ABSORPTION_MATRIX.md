# Data Processing Absorption Matrix

> Processing doctrine should absorb stage truth first, contract discipline second, and runtime only when operational ownership is explicit.
> 数据处理 doctrine 应先吸收阶段真相，再吸收契约纪律；只有在 operational ownership 明确时才进入 runtime。

## Purpose

Define the canonical absorption-governance doctrine for `developer-tool/data-processing`.

This document answers a subsystem control-plane question:

> when a data-processing or document-processing donor contributes useful patterns, where should those patterns land in this subsystem today, what belongs in doctrine vs control-plane governance, and what should remain deferred rather than prematurely promoted into staging or a subtree runtime shell?

This matrix exists to prevent:
- treating all data-processing donors as immediate automation assets
- flattening stage boundaries into tool preference too early
- confusing deterministic pipeline doctrine with orchestration-heavy runtime behavior
- inventing a processing shell before maturity pressure justifies it

## Source Provenance

- **Primary source:** current `developer-tool` data-processing doctrine cluster and subtree control plane
- **Derived from:** extraction, validation, normalization, transformation, migration, and output-contract canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current data-processing subsystem

---

## Core Rule

`data-processing` is a doctrine-first, stage-oriented subsystem.

That means a useful donor pattern may currently be promoted into:
- subtree doctrine under `references/data-processing/`
- subtree root control docs (`README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- root `developer-tool` runtime surfaces only where the pattern already belongs to the engine's operational layer

It should **not** yet be promoted into:
- a dedicated subsystem runtime shell
- an active governed staging subsystem
- a broad support-pack layer that hides pipeline contracts behind convenience

The goal is not to make pipelines feel magical.  
The goal is to make them more trustworthy.

---

## Current Surface Model

| Surface | Current Role |
|---|---|
| `references/data-processing/*` | canonical stage-oriented processing doctrine |
| `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md` | root control plane for the subsystem |
| root `developer-tool` runtime surfaces | currently the only runtime execution layer this subsystem may feed |
| donor/source families | upstream evidence and extraction material |

The doctrine is:
- this subsystem currently owns deterministic pipeline truth more than runtime execution
- therefore promotion must respect that shape

---

## Donor-to-Destination Matrix

| Donor / Family | Extracted Pattern | Canonical Destination | Runtime Destination | Notes |
|---|---|---|---|---|
| csv / tabular processing donors | schema-aware ingestion, normalization, deduplication, quality checks | `references/data-processing/*`, selected subtree control docs | root runtime surfaces only when operational leverage is clear | primary doctrinal feed |
| document extraction donors | PDF / DOCX / PPTX extraction, OCR-sensitive trade-offs, structured-output shaping | `references/data-processing/*`, selected subtree control docs | root runtime surfaces only where workflow execution is explicitly operational | document-processing donor |
| migration-oriented donors | staged transformation, verification posture, rollback-aware data shaping | selected `references/data-processing/*`, selected `references/build-and-deploy/*` | root runtime surfaces if operational migration leverage is clear | cross-lane donor |
| documentation-generation donors | generated reports and structured docs from validated data | selected `references/data-processing/*`, selected documentation-oriented lanes | root runtime surfaces only when emission needs operational tooling | output-contract donor |

---

## Pattern 1 — Promote Stage Truth Before Tool Execution

The most valuable data-processing donor material is about:
- detecting real input shape
- distinguishing validation from normalization
- choosing transformation stages deliberately
- clarifying error posture
- defining downstream output contracts

That means the first destination is usually doctrine.

The doctrine is:
- promote stage truth first
- promote operational execution only when doctrine has already made the stages explicit

This protects the subsystem from accidental pipelines.

---

## Pattern 2 — Root Control Docs Are a Real Promotion Target

Some donor lessons belong not in doctrine pages directly, but in subtree governance docs.

Examples:
- whether the subtree still has no dedicated runtime shell
- whether the lane should remain stage-oriented rather than orchestration-heavy
- whether a donor should route outward to build/deploy or documentation guidance
- whether maturity is high enough to justify stronger runtime surfaces

The doctrine is:
- processing-governance lessons may belong in `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, or this file
- not every important lesson is a doctrine-page lesson

---

## Pattern 3 — Stage-Oriented Lanes Must Resist Staging Inflation

Unlike some other subsystems, this lane does not currently need subtree-local support packs or staging.

The doctrine is:
- a stage-oriented subsystem should stay light until pressure clearly justifies more structure
- donor abundance alone is not enough to justify staging or local runtime growth

This is one of the key maturity truths of this subsystem.

---

## Pattern 4 — Runtime Execution Stays Root-Owned Until a Subsystem Shell Is Earned

At the moment, this subsystem does not own a dedicated runtime shell.
So if donor ideas imply operational execution, they should usually land in:
- root `developer-tool` runtime surfaces
- root commands, agents, hooks, and rules that already govern operational behavior

not in an invented local shell.

The doctrine is:
- runtime execution stays at the root layer until the subsystem has enough operational pressure to justify its own bounded shell

That pressure has not yet been proven here.

---

## Pattern 5 — Output Contracts Must Stay Stricter Than Convenience

Because data-processing work can silently degrade structure, this subsystem must be stricter than convenience tooling.

The doctrine is:
- do not absorb convenience patterns faster than output-contract and quality patterns
- convenience without trustworthy output is not maturity; it is hidden downstream debt

This is why processing automation should lag contract doctrine, not lead it.

---

## Pattern 6 — Root Runtime Surfaces Should Consume This Subsystem as Doctrine

When the root runtime shell asks data-processing questions, it should consume:
- the subtree control plane
- the canonical doctrine docs
- the maturity boundaries of this subtree

It should not assume:
- active staging already exists here
- a dedicated subsystem runtime shell already exists here
- orchestration concerns replace the pipeline model itself

The doctrine is:
- root runtime surfaces must respect subsystem maturity instead of flattening all processing questions into execution-first behavior

---

## Absorption Review Checklist

Before calling a data-processing donor properly absorbed, ask:

- [ ] Was the donor pattern promoted into doctrine rather than prematurely into runtime?
- [ ] If it affected routing or maturity, was it recorded in the root control docs?
- [ ] Was the stage-oriented posture preserved instead of inflated into shell behavior?
- [ ] Was runtime shell growth delayed unless operational ownership was genuinely clear?
- [ ] Do root runtime surfaces still treat this subtree as doctrine-first rather than execution-first?

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `../../references/data-processing/INDEX.md`
- `../../references/data-processing/data-processing.md`
- `../../references/data-agent-workflows.md`
- `../build-and-deploy/README.md`
- `../tool-ecosystem/README.md`
- `../../ABSORPTION_MATRIX.md`

---

## Final Doctrine

The reusable lesson is not:
> “data-processing now has its own absorption matrix too.”

The reusable lesson is:
> “a stage-oriented data-processing subsystem must absorb donors according to its actual maturity: pipeline truth first, control-plane governance second, and runtime shell growth deferred until operational pressure is real—so downstream systems inherit explicit contracts instead of accidental transformations.”
