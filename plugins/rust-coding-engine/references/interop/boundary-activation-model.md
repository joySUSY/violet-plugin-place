# Rust Interop Boundary Activation Model

## Purpose

Define how interop work should activate inside `rust-coding-engine` so Rust-side contract truth, consumer-lane selection, and runtime-shell escalation all stay explicit.

This document exists because interop questions are structurally dangerous.
They often look like:
- a binding question
- a packaging question
- a generated-contract question
- a frontend/backend bridge question
- a foreign-runtime ergonomics question

but they are not all owned by the same surface.

The purpose of this doctrine is to answer a stricter question:

> when a Rust task crosses a language or runtime boundary, how do we choose the right interop lane, preserve Rust-side truth, and decide when the shell should prime, route, diagnose, or stay out of the way?

## Source Provenance

- **Primary donor families:** `rust-coding-engine` interop doctrine synthesis, `skill-router-and-surface-selection`-style routing doctrine, and the major interop donors already canonized under `references/interop/`
- **Key local donor materials:**
  - current `skills/interop/SKILL.md`
  - current route/prime commands under `commands/`
  - current interop case doctrine under `references/interop/`
  - donor-family governance in `../governance/source-reservoir-map.md`
- **Upstream URL:** not applicable as a synthesized routing doctrine
- **Freshness status:** canonical local doctrine derived from the current Rust engine structure and current interop subtree

---

## Core Rule

Interop activation must follow **boundary pressure**, not keyword coincidence.

That means:
- a Rust + Python question is not automatically “just PyO3”
- a Rust + TypeScript question is not automatically “just bindings”
- a Tauri question is not automatically “just frontend”
- a WASM question is not automatically “just packaging”

The right activation order is:

1. identify the primary boundary
2. identify which side owns the contract truth
3. identify whether the problem is doctrinal, routing, diagnostic, or operational
4. only then choose a shell surface

The shell must therefore make interop reasoning more precise.
It must not blur distinct boundary types into one generic “FFI mode.”

---

## Interop Activation Sequence

When an interop-heavy Rust task appears, activate in this order:

1. **Detect the boundary class**
   - C / C++ FFI
   - Python / PyO3 / Maturin
   - Node.js / NAPI-RS
   - TypeScript / WASM contract bridge
   - Tauri frontend/backend bridge
   - multi-surface system spanning more than one lane

2. **Determine the primary consumer lane**
   - who consumes the Rust side?
   - which runtime or platform is the real downstream constraint?

3. **Determine contract ownership**
   - does Rust own the canonical model?
   - is the boundary validated at runtime?
   - is parity required across multiple implementations?

4. **Route into canonical doctrine first**
   - `rust-ffi-and-interop-overview.md`
   - then lane-specific doctrine

5. **Use runtime shell surfaces only if needed**
   - prime when baseline posture is unclear
   - route when a choice among lanes or patterns is needed
   - diagnose when bounded specialist reasoning is needed

6. **Open donor reservoirs only as fallback**
   - when canonized doctrine is genuinely insufficient

This sequence is mandatory because interop mistakes multiply when activation happens too early at the shell layer.

---

## Surface Ownership Model

| Problem Shape | Primary Owner | Why |
|---|---|---|
| “What kind of interop problem is this?” | `references/interop/boundary-activation-model.md` + `interop/INDEX.md` | routing before implementation |
| “I need the baseline interop posture before coding” | `commands/prime/rust-interop.md` | bounded shell priming |
| “Which interop path should I choose?” | `commands/route/choose-interop-path.md` | explicit route decision |
| “I need specialist diagnosis of a concrete bridge” | `agents/ffi-interop-scout.md` | bounded expert interpretation |
| “I need stable Rust-side doctrine” | canonical interop reference docs | source of truth |
| “Canonized doctrine is insufficient” | donor reservoirs via governance | fallback only |

The doctrine is:
- doctrine owns truth
- commands own explicit route/prime workflows
- agents own bounded specialist reasoning
- donor reservoirs remain evidence, not default UX

---

## Boundary Classes

### 1. C / C++ FFI boundary
Use when the real pressure is:
- ABI safety
- ownership and lifetime discipline across FFI
- header generation or wrapper discipline
- panic containment and boundary hygiene

Primary doctrine:
- `rust-ffi-mastery-c-cpp-deep-dive.md`
- `rust-ffi-and-interop-overview.md`

Use shell surfaces when:
- the user needs an explicit route decision or bounded FFI review

### 2. Python boundary
Use when the real pressure is:
- Python package surface
- PyO3 or Maturin packaging
- wheel/distribution expectations
- Python-side ergonomics around Rust-owned behavior

Primary doctrine:
- `rust-pyo3-maturin-bindings.md`
- `rust-cross-language-workflows.md`

Cross-engine note:
- `python-dev-skill` may own broader Python-side consumer ergonomics
- `rust-coding-engine` still owns Rust-side contract truth

### 3. Node.js boundary
Use when the real pressure is:
- NAPI-RS addon shape
- async/native addon ergonomics
- JS consumer contracts
- Node packaging and installation posture

Primary doctrine:
- `rust-node-native-addon-posture.md`
- `rust-cross-language-workflows.md`

### 4. TypeScript / WASM boundary
Use when the real pressure is:
- generated TS contracts
- TS-facing structural sync
- WASM export/import surface
- JS/TS runtime constraints around browser or package consumers

Primary doctrine:
- `rust-typescript-bridge-patterns.md`
- `wasm-bindgen-posture.md`
- `rust-cross-language-workflows.md`

Cross-engine note:
- `typescript-coding-engine` may own TS-side consumer ergonomics and validation posture
- `rust-coding-engine` owns Rust-side structural truth when Rust is the authoritative source

### 5. Tauri boundary
Use when the real pressure is:
- core-shell separation
- IPC contract boundaries
- Rust core vs frontend shell ownership
- desktop packaging implications tied to the bridge

Primary doctrine:
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `rust-cross-language-workflows.md`

Cross-engine note:
- Tauri questions often cross into `cross-platform-development`
- Rust still owns the Rust core and its IPC/contract posture

### 6. Multi-surface interop system
Use when:
- more than one interop boundary is active at once
- packaging, contract sync, and verification span multiple consumers

Primary doctrine:
- `rust-cross-language-workflows.md`
- then lane-specific docs for the dominant boundary

The doctrine is:
- multi-surface systems need ownership maps, not ad hoc tool picks

---

## Contract Ownership Law

Every interop activation must answer:

1. who owns the structural truth?
2. who owns the consumer ergonomics?
3. how is drift prevented?
4. how is the boundary verified?

Default law inside `rust-coding-engine`:
- Rust owns Rust-side structural truth
- foreign runtimes own foreign-runtime ergonomics
- cross-engine references should clarify this ownership explicitly

This matters because interop confusion often starts when structural truth and consumer ergonomics are treated as the same question.

---

## Shell Use Law

### Prime
Use `commands/prime/rust-interop.md` when:
- the user needs a safe baseline before implementing
- the active interop lane is not yet clear
- multiple interop concerns are mixed together

### Route
Use `commands/route/choose-interop-path.md` when:
- a real architectural choice must be made among interop patterns
- the primary consumer lane is known, but the bridge pattern is not

### Diagnose
Use `agents/ffi-interop-scout.md` when:
- the boundary is concrete and specialist review is actually needed
- the problem is no longer “what lane is this?” but “what boundary risk exists here?”

### Do not escalate to shell when
- the problem is still primarily doctrinal
- the user still needs consumer-lane classification first
- canonical doctrine already answers the question cleanly

---

## Cross-Engine Routing Law

Interop questions are often mixed-owner questions.
Route outward when the dominant pressure is actually elsewhere.

### Route to `typescript-coding-engine` when
- the hard part is TS-side type ergonomics
- runtime validation or TS-side state boundaries dominate
- Rust-side contract truth is already clear

### Route to `python-dev-skill` when
- the hard part is Python-side packaging, runtime integration, or user ergonomics
- Rust-side binding posture is already clear

### Route to `cross-platform-development` when
- support tiers, platform boundaries, or shell coexistence dominate
- the Rust interop boundary is only one part of a broader platform question

### Route to `developer-tool` when
- the real issue is build, shell, tooling, or runtime-surface orchestration
- the boundary question has become mostly operational rather than Rust-doctrinal

The doctrine is:
- Rust interop doctrine should preserve Rust-side truth
- not claim ownership of every adjacent runtime concern

---

## Interop Anti-Patterns

Avoid these failure modes:

- routing all interop into “FFI” without consumer-lane classification
- using shell commands as the first stop before doctrine
- letting donor repos define activation order implicitly
- assuming generated contracts remove the need for boundary ownership maps
- treating packaging as an afterthought instead of a first-class workflow stage
- confusing TS/Python consumer ergonomics with Rust-side contract ownership
- escalating into runtime shell just because the problem feels operational

---

## Activation Checklist

Before calling interop activation healthy, ask:

- [ ] Did we identify the primary consumer lane first?
- [ ] Did we identify who owns the contract truth?
- [ ] Did we route into canonical doctrine before shell surfaces?
- [ ] Did we escalate to route/prime/diagnose only when justified?
- [ ] Did we avoid donor-first activation?
- [ ] Did we route outward when the dominant pressure actually belonged to another engine or lane?

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `rust-ffi-and-interop-overview.md`
- `rust-cross-language-workflows.md`
- `rust-typescript-bridge-patterns.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-node-native-addon-posture.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `wasm-bindgen-posture.md`
- `../governance/source-reservoir-map.md`
- `../../TRIGGER_SCOPE.md`

---

## Final Doctrine

The reusable lesson is not:
> “interop activation means loading the interop docs.”

The reusable lesson is:
> “interop activation in `rust-coding-engine` must follow boundary pressure, consumer-lane ownership, and contract-truth discipline before shell escalation occurs—so Rust-side truth stays explicit while cross-language workflows remain coordinated rather than muddled.”
