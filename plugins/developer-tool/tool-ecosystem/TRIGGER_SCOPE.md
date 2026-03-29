# Tool Ecosystem Trigger Scope

> Choose the correct shell surface before trying to improve the shell.
> 先选对 shell surface，再去谈如何改进这个 shell。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/tool-ecosystem`.

This document answers a subsystem control-plane question:

> when a shell-architecture or runtime-surface question appears, which layer should respond first—subtree control docs, canonical doctrine, root runtime surfaces, reserved staging, or donor/source fallback—and how do we keep this subsystem doctrine-first while it remains shell-governance-heavy rather than shell-execution-heavy?

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine cluster and its new subtree control plane
- **Derived from:** component-model, command/hook runtime patterns, shell-law canonization, and subtree control-plane bootstrap work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current tool-ecosystem subsystem

---

## Core Rule

`tool-ecosystem` is doctrine-first and governance-heavy.

That means a trigger in this subsystem should almost always resolve through:
1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor/source reservoirs only if doctrine is still insufficient

The goal is not to turn every shell-architecture question into shell activity.
The goal is to make the correct doctrinal context easier than the wrong operational shortcut.

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
- `../../references/tool-ecosystem/*`

Use when the question is actually about:
- shell laws
- component selection
- command surface design
- hook runtime ownership
- plugin settings/state
- MCP leverage
- validation and audit posture

### 3. Root runtime surfaces
Owned by root `developer-tool` shell surfaces such as:
- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`
- `../../agents/tooling-integrator.md`
- `../../agents/plugin-auditor.md`

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
| “What kind of shell surface should this capability use?” | canonical doctrine | component-model question |
| “Should this be a command, hook, skill, or agent?” | canonical doctrine | shell-law and component-selection question |
| “How should command families be structured?” | canonical doctrine | command-surface doctrine |
| “Should this be a hook, and if so what kind?” | canonical doctrine | hook-runtime doctrine |
| “Do we need MCP here?” | canonical doctrine | leverage-model question |
| “Which root runtime surface should we use right now?” | root runtime route command | operational routing after doctrinal framing |
| “Do we need a dedicated shell or active staging here yet?” | subtree control plane first | maturity/boundary question before implementation |
| “The doctrine is insufficient; we need upstream validation” | donor/source fallback | last resort only |

---

## Trigger Law

### Doctrine-first law
If the question is:
- architectural
- surface-selection-shaped
- shell-governance-shaped
- validation-shaped
- MCP-evaluation-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law
Only use root runtime surfaces when:
- the doctrinal lane is already clear
- a concrete operational action is needed
- the problem is no longer “which law applies?” but “what should the shell do next?”

### No-premature-shell law
Because this subsystem does not yet own a dedicated runtime shell:
- do not invent one implicitly
- do not treat `v3-expansion/` as if it already were an active staging lane
- do not bypass doctrine just because root runtime commands exist

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:
- root runtime doctrine under `developer-tool`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`
- `../../references/tool-ecosystem/lifecycle-hook-posture.md`

The doctrine is:
- subtree-specific lifecycle automation should be earned by maturity
- not assumed because the topic is shell architecture

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `../../references/tool-ecosystem/INDEX.md`
- `../../references/tool-ecosystem/component-model.md`
- `../../references/tool-ecosystem/command-surface-patterns.md`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`
- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`

---

## Final Doctrine

The reusable lesson is not:
> “tool-ecosystem has trigger scope rules too.”

The reusable lesson is:
> “`tool-ecosystem` is a doctrine-first subsystem whose trigger model should delay runtime escalation until shell-governance questions are already clear, so shell law and component-selection reasoning do not collapse into premature operational behavior.”
