# Data Processing Trigger Scope

> Choose the pipeline stage before choosing the tool.
> 先分清流水线阶段，再决定工具与动作。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/data-processing`.

This document answers a subsystem control-plane question:

> when a data-processing or document-processing event appears, which layer should respond first—subtree control docs, canonical doctrine, root runtime surfaces, or donor/source fallback—and how do we keep this subsystem doctrine-first while still respecting that data pipelines often touch migration, documentation, and orchestration concerns?

## Source Provenance

- **Primary source:** current `developer-tool` data-processing doctrine cluster and subtree control plane
- **Derived from:** extraction, validation, normalization, transformation, migration, and output-contract canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current data-processing subsystem

---

## Core Rule

`data-processing` is doctrine-first and stage-oriented.

That means a trigger in this subsystem should usually resolve through:

1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor/source reservoirs only if doctrine is still insufficient

The goal is not to jump straight into tool execution.
The goal is to keep processing stages, error posture, and output contracts explicit before automation grows around them.

---

## Ownership Layers

### 1. Root control plane

Owned by:

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`

Use when:

- the question is still about subsystem framing
- the user or agent needs to know what this subtree currently is and is not
- routing remains ambiguous

### 2. Canonical doctrine

Owned by:

- `../../references/data-processing/*`

Use when the question is actually about:

- input detection
- validation and normalization posture
- transformation stage design
- migration and output-contract choices
- deterministic pipeline behavior

### 3. Root runtime surfaces

Owned by root `developer-tool` shell surfaces such as:

- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`
- `../../agents/tooling-integrator.md`

Use only when:

- the problem has already been routed correctly
- an explicit runtime action or bounded review adds leverage
- the question is no longer purely doctrinal

### 4. Source reservoir fallback

Owned by preserved donor families and upstream references.

Use only when:

- canonical doctrine is insufficient
- no rooted runtime surface can answer the operational question
- missing patterns need upstream validation

---

## First-Owner Trigger Matrix

| Trigger Shape                                                               | First Owner                      | Why                                         |
| --------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------- |
| “How should this pipeline be staged?”                                       | canonical doctrine               | stage-design question                       |
| “How should we validate and normalize this data?”                           | canonical doctrine               | schema/quality question                     |
| “Should this be treated as migration, transformation, or generated output?” | canonical doctrine               | processing-contract question                |
| “Which root runtime surface should I use right now?”                        | root runtime route/prime surface | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation”                 | donor/source fallback            | last resort only                            |

---

## Trigger Law

### Doctrine-first law

If the question is:

- educational
- architectural
- stage-shaped
- schema-shaped
- output-contract-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law

Only use root runtime surfaces when:

- the doctrinal lane is already clear
- a concrete operational action or bounded review is needed
- the problem is no longer “what is the correct pipeline posture?” but “what should the shell do next?”

### No-magic-pipeline law

Because data-processing work can hide too much inside scripts:

- do not bypass doctrine just because a tool exists
- do not turn messy input into silent output without explicit stage boundaries
- do not let orchestration concerns swallow the pipeline model itself

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:

- root runtime doctrine under `developer-tool`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`
- the broader lane actually owning the operational pressure

The doctrine is:

- this stage-oriented lane should stay contract-focused
- not sprout a subtree-local hook layer casually

---

## Cross-Links

Read this alongside:

- `README.md`
- `INVENTORY.md`
- `../../references/data-processing/INDEX.md`
- `../../references/data-processing/data-processing.md`
- `../../references/data-agent-workflows.md`
- `../build-and-deploy/README.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:

> “data-processing now has trigger scope rules too.”

The reusable lesson is:

> “`data-processing` is a doctrine-first subsystem whose trigger model should preserve explicit pipeline stages, error posture, and output contracts before execution becomes operational—so downstream systems inherit trustworthy structure instead of accidental transformations.”
