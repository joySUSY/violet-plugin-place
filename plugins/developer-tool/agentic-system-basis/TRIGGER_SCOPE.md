# Agentic System Basis Trigger Scope

> Classify the agentic question before activating the runtime surface.
> 先判断 agentic 问题的性质，再决定是否激活 runtime surface。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/agentic-system-basis`.

This document exists to answer a subsystem control-plane question:

> when an agentic-system-related event appears, which layer should respond first—root control docs, canonical doctrine, root runtime surface, or donor/source fallback—and how do we keep this subsystem doctrine-first while it is still maturing?

This subsystem is not yet a shell-heavy subsystem like `ai-agent-memory`.
So its trigger model must protect against premature runtime inflation.

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis doctrine cluster and its new subtree control plane
- **Derived from:** activation-model, runtime-activation-patterns, bootstrap/capability detection, and root control-plane bootstrap work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current agentic-system-basis subsystem

---

## Core Rule

`agentic-system-basis` is doctrine-first.

That means a trigger in this subsystem should almost always resolve through:
1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor/source reservoirs only if doctrine is still insufficient

The goal is not to turn every system-level question into shell activity.
The goal is to make the correct doctrinal context easier than the wrong runtime shortcut.

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
- `../../references/agentic-system-basis/*`

Use when the question is actually about:
- broad agentic architecture
- activation models
- runtime activation patterns
- bootstrap/capability detection
- ensemble governance
- gate-based autonomy

### 3. Root runtime surfaces
Owned by root `developer-tool` shell surfaces such as:
- `commands/prime/tool-runtime.md`
- `commands/route/choose-tool-surface.md`
- `agents/tooling-integrator.md`
- `agents/plugin-auditor.md`

Use only when:
- the problem has already been routed correctly
- an explicit runtime action or audit adds leverage
- the question is no longer purely doctrinal

### 4. Reserved staging zone
Owned by:
- `v3-expansion/`

Current status:
- reserved only
- not yet an active staging subsystem

Therefore it should not be a normal first or second owner today.

### 5. Source reservoir fallback
Owned by preserved donor families and upstream references.

Use only when:
- canonical doctrine is insufficient
- no rooted runtime surface can answer the operational question
- missing patterns need upstream validation

---

## First-Owner Trigger Matrix

| Trigger Shape | First Owner | Why |
|---|---|---|
| “How should an agentic system be structured?” | subtree control plane -> canonical doctrine | system framing before execution |
| “How should activation happen?” | canonical doctrine | activation logic is doctrine-first here |
| “What should bootstrap detect?” | canonical doctrine | capability detection belongs to subsystem doctrine |
| “What team topology should we use?” | canonical doctrine | governance and coordination question |
| “Do we need a plugin shell here yet?” | subtree control plane first | maturity/boundary question before implementation |
| “Which developer-tool runtime surface should we use?” | root runtime route command | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation” | donor/source fallback | last resort only |

---

## Trigger Law

### Doctrine-first law
If the question is:
- conceptual
- architectural
- activation-shaped
- bootstrap-shaped
- governance-shaped

then the first owner is doctrine, not a runtime shell.

### Runtime-second law
Only use root runtime surfaces when:
- the doctrinal lane is already clear
- a concrete operational action is needed
- the problem is no longer just “what is true?” but “what should the shell do next?”

### No-premature-shell law
Because this subsystem does not yet own a dedicated runtime shell:
- do not invent one implicitly
- do not treat `v3-expansion/` as if it already were an active staging lane
- do not bypass doctrine just because root runtime commands exist

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subsystem-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:
- root runtime doctrine under `developer-tool`
- `references/agentic-system-basis/runtime-activation-patterns.md`

The doctrine is:
- subsystem-specific lifecycle automation should be earned by maturity
- not assumed because the topic is “agentic”

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `../../references/agentic-system-basis/INDEX.md`
- `../../references/agentic-system-basis/activation-model.md`
- `../../references/agentic-system-basis/runtime-activation-patterns.md`
- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`

---

## Final Doctrine

The reusable lesson is not:
> “agentic-system-basis has trigger scope rules too.”

The reusable lesson is:
> “`agentic-system-basis` is a doctrine-first subsystem whose trigger model should delay shell escalation until the doctrinal question is already clear, so system-level architecture and activation reasoning do not get flattened into premature runtime behavior.”
