# Cross-Platform Development Trigger Scope

> Choose support truth before choosing the stack.
> 先选清楚支持真相，再决定技术栈。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/cross-platform-development`.

This document answers a subsystem control-plane question:

> when a cross-platform or portability-related event appears, which layer should respond first—subtree control docs, canonical doctrine, subtree-local skill bundles, root runtime surfaces, or donor/source fallback—and how do we keep this subsystem doctrine-first while still respecting that portability claims often bleed into shell, build/deploy, and runtime-surface decisions?

## Source Provenance

- **Primary source:** current `developer-tool` cross-platform doctrine cluster, subtree control plane, and subtree-local skill bundles
- **Derived from:** support-tier strategy, shared-core vs platform-shell design, runtime/path/capability difference handling, and cross-platform release/testing canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current cross-platform subsystem

---

## Core Rule

`cross-platform-development` is doctrine-first.

That means a trigger in this subsystem should usually resolve through:
1. subtree control plane
2. canonical doctrine
3. subtree-local skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor/source reservoirs only if doctrine is still insufficient

The goal is not to let framework enthusiasm define portability truth.
The goal is to make support claims and platform boundaries explicit before implementation details take over.

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
- `../../references/cross-platform-development/*`
- `../../references/cross-platform-patterns.md`

Use when the question is actually about:
- support tiers
- shared-core vs platform-shell boundaries
- path/runtime/capability differences
- platform-specific behavior isolation
- cross-platform testing and release posture
- whether a portability claim is actually justified

### 3. Subtree-local skill bundles
Owned by:
- `platform-support-cross-platform-compatibility/`
- `tauri-development/`
- `tauri2-react-rust/`

Use only when:
- the doctrinal lane is already clear
- a more focused subtree-local skill pack adds real leverage
- the skill pack clarifies a narrow platform concern better than the broad doctrine page alone

These are not a staging subsystem.
They are support packs under a doctrine-first subtree.

### 4. Root runtime surfaces
Owned by root `developer-tool` shell surfaces such as:
- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`
- `../../agents/tooling-integrator.md`

Use only when:
- the problem has already been routed correctly
- an explicit runtime action or bounded review adds leverage
- the question is no longer purely doctrinal

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
| “What platforms do we actually support?” | canonical doctrine | support-tier doctrine question |
| “How much should be shared across web/desktop/mobile?” | canonical doctrine | shared-core boundary question |
| “Is this really a portability issue or a shell/build/tooling issue?” | subtree control plane, then doctrine | routing before specialization |
| “Which subtree-local cross-platform skill pack is relevant?” | subtree control plane, then skill bundle | routing before specialization |
| “Should this support claim appear in release/build docs?” | canonical doctrine, then root runtime if needed | support truth before operational action |
| “Which root runtime surface should I use right now?” | root runtime route/prime surface | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation” | donor/source fallback | last resort only |

---

## Trigger Law

### Doctrine-first law
If the question is:
- educational
- architectural
- support-tier-shaped
- portability-shaped
- boundary-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law
Only use root runtime surfaces when:
- the doctrinal lane is already clear
- a concrete operational action or bounded review is needed
- the problem is no longer “what is the correct support truth?” but “what should the shell do next?”

### No-false-portability law
Because cross-platform work easily drifts into overclaiming:
- do not let subtree-local skill packs masquerade as support truth
- do not bypass doctrine just because build or runtime commands exist
- do not turn framework preference into portability truth prematurely

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:
- root runtime doctrine under `developer-tool`
- `../../references/build-and-deploy/runtime-boundaries.md`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`

The doctrine is:
- cross-platform-facing lifecycle automation should stay conservative and root-owned
- not sprout a subtree-local hook layer casually

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `../../references/cross-platform-development/INDEX.md`
- `../../references/cross-platform-development/cross-platform.md`
- `../../references/cross-platform-patterns.md`
- `../build-and-deploy/README.md`
- `../shell-and-terminal/README.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:
> “cross-platform-development now has trigger scope rules too.”

The reusable lesson is:
> “`cross-platform-development` is a doctrine-first subsystem whose trigger model should keep support truth and platform boundaries explicit before implementation becomes operational, so portability claims remain earned rather than aspirational.”
