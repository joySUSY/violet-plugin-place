# TypeScript Engine Module Staging Governance

## Purpose

This document defines the role of `typescript-coding-engine/modules/`.

These directories are not currently canonical doctrine lanes.
They are governed staging zones reserved for future deep-fusion work when a topic is:
- too large,
- too example-heavy,
- too operationally mixed,
- or too donor-shaped

to be promoted directly into `references/` without losing clarity.

The purpose of this document is to keep those staging zones explicit and bounded so they do not silently become a second doctrine center.

---

## Core Rule

`modules/` exists to hold staged complexity, not to replace canonical doctrine.

The preferred flow is:

`source reservoir -> canonical references -> staged modules (if needed) -> bounded runtime surfaces`

The forbidden flow is:

`source reservoir -> staged modules as default reading path`

If a topic can already be taught clearly through `references/`, it should stay there.
Modules are for unresolved, not-yet-flattened clusters only.

---

## What Modules Are For

A module is justified when it helps contain one of these pressures:

- a donor family teaches multiple tightly coupled lessons at once
- examples and supporting material are too dense for one doctrine page
- the topic spans several lanes (for example advanced types + runtime validation + interop)
- flattening immediately would create unreadable mega-docs or preserve too much donor shape

The doctrine is:
- modules are a governed intermediate structure
- not a second permanent knowledge center

---

## Current Module Zones

| Module | Intended Role |
| --- | --- |
| `advanced-types/` | future deeper examples and extended advanced-type clusters beyond the current lane root and cookbook |
| `inference/` | staged inference-heavy materials that may later be absorbed into advanced or support doctrine |
| `quality-gates/` | larger quality-gate or CI-related bundles too heavy for one flat reference page |
| `react-rn-bridges/` | frontend/mobile bridge materials not yet promoted into a stable first-line doctrine lane |
| `runtime-validation/` | richer validation bundles and examples that exceed the current clean-code lane docs |
| `rust-interop/` | deeper Rust↔TypeScript, WASM, or Tauri materials that are still too large or too donor-shaped for direct flattening |

These module zones are staging containers.
They are not the preferred first reading path for normal TypeScript work.

---

## What Modules May Become Later

A staged module may later produce:
- one or more canonical reference docs
- a lane-specific cookbook or playbook
- supporting examples for a stable doctrine lane
- bounded runtime support material if a repeatable workflow is justified
- stronger governance notes when the subdomain needs explicit source and promotion law

A staged module should **not** become:
- the preferred first reading path for ordinary tasks
- a donor mirror preserved by inertia
- a second control center parallel to `references/`
- a place where runtime surfaces point by default instead of pointing to canonical doctrine

---

## Promotion Criteria

Promote staged material into canonical doctrine only when:

1. the concept has a clear doctrinal role
2. the boundary between explanation and implementation is explicit
3. the material can be made cleanup-safe without donor-path dependence
4. the resulting reference is smaller, clearer, and more reusable than the staged bundle
5. the destination lane is obvious enough that promotion will reduce rather than increase routing ambiguity

If these are not yet true, the material should stay staged.

---

## Reading Rule

For normal engine use:

1. start at `references/INDEX.md`
2. use the canonical lane docs first
3. visit `modules/` only when the canonical lane explicitly cannot answer the question yet
4. return the useful lesson back into the doctrine tree once it becomes clear enough

This keeps staging subordinate to doctrine.

---

## Runtime Relation

Runtime shell surfaces should:
- point to `references/` first
- point to `modules/` only when a staging bundle is explicitly the right container
- treat staged modules as fallback or deepening surfaces, not default activation targets

Runtime shell surfaces should **not**:
- use `modules/` as an excuse to bypass doctrinal routing
- encode donor-shaped staging bundles as if they were stable shell law
- let staged modules quietly become the place where most real work starts

The doctrine is:
- modules may support runtime later
- but runtime must not let staging outrun doctrine

---

## Why This Matters

Without an explicit staging policy, empty or semi-populated module directories become ambiguous:
- readers do not know whether they are first-class
- future agents may route into them too early
- donor-derived material may linger there indefinitely without promotion or cleanup
- shell surfaces may start treating staging like stable truth

This document prevents that drift.

---

## Cross-Links

Read this alongside:
- `../references/INDEX.md`
- `../references/source-reservoir-map.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`

---

## Final Doctrine

The reusable lesson is not:
> “the TypeScript engine has some module folders reserved for later.”

The reusable lesson is:
> “module staging is a governance layer: hold complexity there only while it is not yet clear enough for canonical doctrine, keep it subordinate to the references tree, route runtime through doctrine first, and promote staged material only when the resulting doctrine becomes smaller, clearer, and less donor-shaped than the bundle it came from.”
