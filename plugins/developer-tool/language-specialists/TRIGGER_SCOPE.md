# Language Specialists Trigger Scope

> Choose the problem shape before choosing the language lane.
> 先认清问题形状，再决定语言入口。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/language-specialists`.

This document answers a subsystem control-plane question:

> when a language-specific event appears, which layer should respond first—subtree control docs, canonical doctrine, root runtime surfaces, or donor/source fallback—and how do we keep this subsystem bridge-shaped while still preserving specialist truth for ecosystems that do not yet justify their own heavy engine?

## Source Provenance

- **Primary source:** current `developer-tool` language-specialists doctrine cluster and subtree control plane
- **Derived from:** cross-language routing, ecosystem-truth preservation, and bridge-lane canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current language-specialists subsystem

---

## Core Rule

`language-specialists` is doctrine-first and bridge-shaped.

That means a trigger in this subsystem should usually resolve through:
1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor/source reservoirs only if doctrine is still insufficient

The goal is not to route by language keyword alone.
The goal is to preserve ecosystem-specific truth while escalating to the right broader lane or dedicated engine when the real pressure is runtime-, interop-, or platform-driven.

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
- `../../references/language-specialists/*`

Use when the question is actually about:
- language-specific idioms
- framework or toolchain posture within a language ecosystem
- cross-language bridge guidance
- whether the question should remain here or route outward

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

| Trigger Shape | First Owner | Why |
|---|---|---|
| “Is this really a language-specialist problem?” | subtree control plane | routing before specialization |
| “What idiomatic guidance matters for this ecosystem?” | canonical doctrine | language-truth question |
| “Should this stay in developer-tool or route to another engine?” | canonical doctrine | bridge-routing question |
| “Which root runtime surface should I use right now?” | root runtime route/prime surface | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation” | donor/source fallback | last resort only |

---

## Trigger Law

### Doctrine-first law
If the question is:
- educational
- architectural
- ecosystem-idiom-shaped
- routing-shaped
- toolchain-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law
Only use root runtime surfaces when:
- the doctrinal lane is already clear
- a concrete operational action or bounded review is needed
- the problem is no longer “what is the correct specialist truth?” but “what should the shell do next?”

### No-fake-academy law
Because this lane is bridge-shaped:
- do not treat it like a full engine for every language it mentions
- do not bypass doctrine just because a runtime surface exists
- do not route by keyword alone when the real pressure belongs elsewhere

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:
- root runtime doctrine under `developer-tool`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`
- the broader lane actually owning the operational pressure

The doctrine is:
- this bridge lane should stay routing-focused
- not sprout a subtree-local hook layer casually

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `../../references/language-specialists/INDEX.md`
- `../../references/language-specialists/language-specialists.md`
- `../cross-platform-development/README.md`
- `../../rust-coding-engine/README.md`
- `../../typescript-coding-engine/README.md`

---

## Final Doctrine

The reusable lesson is not:
> “language-specialists now has trigger scope rules too.”

The reusable lesson is:
> “`language-specialists` is a doctrine-first bridge subsystem whose trigger model should preserve ecosystem-specific truth while routing deeper runtime, interop, and platform pressure to the right broader lane or dedicated engine—so specialist guidance stays sharp instead of bloating into another pseudo-engine.”
