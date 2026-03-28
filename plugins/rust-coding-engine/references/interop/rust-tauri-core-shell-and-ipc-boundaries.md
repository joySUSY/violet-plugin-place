# Rust Tauri Core-Shell and IPC Boundaries

## Purpose

Define the canonical Rust-side posture for Tauri architecture and frontend/backend boundaries.

This document exists to answer a production-grade desktop boundary question:

> when a TypeScript/webview shell calls into a Rust core through Tauri, how should the core-shell split, IPC contract, native-capability ownership, desktop-web coexistence, release graph, and verification posture be designed so the bridge stays explicit instead of degrading into “frontend code calling local Rust magic”?

This is not just about invoking backend functions.
It is about designing a **desktop product boundary** where native truth, frontend ergonomics, and IPC contract law stay distinct.

## Source Provenance

- **Primary donor families:** `understanding-tauri-architecture`, `calling-rust-from-tauri-frontend`
- **Key local donor materials:**
  - `understanding-tauri-architecture/SKILL.md`
  - `calling-rust-from-tauri-frontend/SKILL.md`
- **Secondary donor family:** `codeyourpcb-main` (multi-surface Rust/TS/Tauri coexistence pressure)
- **Cross-linked doctrine inputs:**
  - `rust-cross-language-workflows.md`
  - `rust-typescript-bridge-patterns.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
  - `../../typescript-coding-engine/references/interop/tauri-frontend-rust-bridge.md`
  - `../governance/source-reservoir-map.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

A Tauri app is not “a frontend with some Rust helpers.”
It is a **core-shell system** with an IPC contract boundary.

That means:
- the frontend shell owns UI composition and webview-facing ergonomics
- the Rust core owns native capability, safety, system access, and durable backend truth
- the bridge between them is an IPC contract, not an informal convenience layer
- packaging, permissions, and platform matrix are part of the architecture

A serious Tauri workflow must answer:
1. what belongs in the shell versus the core?
2. what crosses IPC and in what shapes?
3. how are errors, async latency, and capability boundaries represented?
4. how do desktop and web/WASM surfaces coexist if both exist?
5. how is the release graph coordinated across desktop artifacts and TS-facing contract surfaces?

If those questions are not explicit, the bridge is still underdesigned even if commands currently work.

---

## Core-Shell Boundary Model

| Boundary Concern | Rust Core Owns | Frontend Shell Owns |
|---|---|---|
| Native/system truth | filesystem, OS integration, dialogs, privileged or durable operations | user-facing orchestration and presentation |
| IPC contract | command handlers, serialization truth, error translation, capability boundaries | invocation ergonomics, local wrappers, UI-state adaptation |
| Security boundary | native permissions, system calls, sensitive operations | safe user interaction and least-surprise consumption of native power |
| Multi-surface architecture | core models and native capability posture across desktop/web surfaces | surface-specific UI flows and consumer ergonomics |
| Release truth | desktop artifact generation, signing/packaging posture, version truth for native core | frontend bundle ergonomics and TS-side consumption of the contract |

The doctrine is:
- Rust owns native truth
- the frontend owns shell ergonomics
- the IPC boundary owns the contract between them

---

## Pattern 1 — Core and Shell Must Stay Distinct

The strongest donors reinforce a true core-shell split:
- **Shell**: HTML/CSS/JS/TS rendered in the webview
- **Core**: Rust backend with native/system capability

The canonical lesson is:
- do not let the frontend pretend it owns native truth
- do not let the Rust backend silently absorb UI concerns
- keep each side responsible for its own kind of correctness

The doctrine is:
- a healthy Tauri system reduces ambiguity about which side owns what
- not merely about making `invoke` available everywhere

---

## Pattern 2 — IPC Is a Contract Boundary, Not a Function Call Illusion

Tauri command calls are not just function calls.
They are IPC interactions with:
- serialization cost
- boundary validation
- error translation
- async latency
- capability/security implications
- release-time contract and packaging consequences

That means the bridge should be designed deliberately, not treated as magic.

The doctrine is:
- the more “local” Tauri feels, the easier it is to forget the boundary exists
- good doctrine keeps that boundary visible

---

## Pattern 3 — Commands Are the Primary Typed Bridge; Events Are Secondary

The donor guidance is clear that commands are the preferred primary bridge for typed request/response behavior.

The lesson is:
- use commands for structured frontend→backend interactions
- reserve events for more dynamic notification flows
- keep the command set explicit and contract-aware
- avoid using event channels as a substitute for clear command design

The doctrine is:
- commands define contract shape
- events complement the bridge where push-style signaling is genuinely needed

This makes the desktop bridge more predictable, testable, and versionable.

---

## Pattern 4 — Argument and Return Naming Are Real Contract Law

Seemingly small translation rules—such as Rust snake_case to TS camelCase—are real contract rules.

If these are vague, the bridge becomes brittle.

So the engine should teach:
- argument naming is intentional
- complex payloads deserve explicit boundary structs
- return shapes should be deliberate and serializable
- binary or large data should be treated as a special boundary case
- TS-facing adapters should expose the naming law clearly rather than relying on trial-and-error

The doctrine is:
- naming and serialization are part of the IPC contract
- not merely style choices

---

## Pattern 5 — Error Translation Must Preserve Boundary Meaning

A Tauri bridge needs a clear posture for:
- Rust `Result<T, E>`
- serialized error types or strings
- frontend-side Promise rejection handling
- preserving enough meaning across the boundary for debugging and recovery
- distinguishing transport failure from domain failure

The doctrine is:
- IPC errors are part of architecture
- not just UI exception handling

A bridge with vague error semantics quickly becomes hard to operate, especially once desktop-specific failure modes appear.

---

## Pattern 6 — Native Capability Is a Security Boundary

The Rust core often owns access to:
- filesystem
- native dialogs
- OS integration
- potentially dangerous system operations
- durable data or configuration state

That makes the backend more than an implementation layer.
It is also a security boundary.

The shell should never be treated as though it can bypass that boundary casually.

The doctrine is:
- native capability is product power and product risk at the same time
- capability exposure therefore belongs to boundary design, not only to implementation code

---

## Pattern 7 — Thin Native Adapters, Rich Core Logic

The best Tauri architectures keep Rust command handlers relatively thin.

They should:
- deserialize and validate boundary input
- call core logic or services
- convert results or errors into IPC-ready form
- enforce capability and safety boundaries explicitly

They should not become:
- giant application-service implementations
- dumping grounds for mixed UI/native logic
- hidden business orchestration layers

This is the same thin-adapter discipline we want elsewhere in Rust systems.

The doctrine is:
- IPC handlers are transport adapters with desktop-specific consequences
- not the place to bury product logic

---

## Pattern 8 — Tauri Often Lives Inside Multi-Surface Systems

A Tauri bridge is often not isolated.
Some systems use Rust across:
- desktop Tauri shell
- web or WASM surfaces
- TypeScript frontend
- shared core models
- CLI or service surfaces

This matters because:
- Rust core models may feed many surfaces
- TS consumers differ between desktop and browser contexts
- platform abstraction becomes a real architectural layer
- release and verification must cover more than one consumer lane

The doctrine is:
- Tauri doctrine should always be readable in the context of broader cross-language workflow doctrine
- not as a one-off desktop trick

---

## Pattern 9 — Desktop-Web Coexistence Needs Explicit Surface Ownership Maps

When the same Rust core feeds both desktop and web-like surfaces, answer explicitly:
- what is desktop-specific?
- what is shared with browser or WASM surfaces?
- what contract shapes are common vs surface-specific?
- what is generated versus wrapper-local?
- what must never be duplicated by hand?

The doctrine is:
- desktop and web coexistence is an ownership-map problem before it is a framework problem
- failure to map ownership leads to duplicated boundary logic and drift

This is where Tauri doctrine links directly to `rust-cross-language-workflows.md` and `rust-typescript-bridge-patterns.md`.

---

## Pattern 10 — Packaging and Release Graphs Are Part of the Boundary

A Tauri bridge is also a packaging and distribution system.

A serious workflow must answer:
- how native desktop artifacts are built
- what version truth coordinates core and shell
- what release graph connects desktop artifacts, frontend bundles, and generated contracts
- what platform matrix is promised
- what signing/notarization or downstream packaging steps matter
- what post-build and post-publish verification exists per platform

The doctrine is:
- desktop packaging is not an ops afterthought
- it is part of the boundary contract

This connects directly to `rust-sdk-ci-and-multi-surface-release-pipelines.md`.

---

## Pattern 11 — Verification Must Exercise IPC and Consumer Reality

A Tauri bridge is not verified by Rust tests alone.
A serious verification lattice should include some combination of:
- Rust-side unit and integration tests
- command handler tests for serialization/error posture
- frontend-side consumer tests for Promise and error handling
- boundary fixture tests where contract drift matters
- desktop packaging smoke tests
- platform-specific artifact validation where the release promise depends on it

The doctrine is:
- if the consumer boundary is not exercised, the Tauri bridge is not fully verified
- compile success is necessary, not sufficient

---

## Pattern 12 — Cross-Engine Ownership Must Stay Explicit

Tauri work naturally spans more than one engine.
That does **not** make ownership ambiguous.

Default law:
- `rust-coding-engine` owns Rust-side core truth, IPC handler posture, and native-capability/security law
- `typescript-coding-engine` owns TS-side consumer ergonomics, wrapper design, and frontend runtime validation posture
- `cross-platform-development` owns broader support-tier and platform-boundary truth when desktop/web coexistence becomes the dominant issue
- `developer-tool` owns broader shell/runtime-surface orchestration when the issue becomes operational rather than Rust-doctrinal

The doctrine is:
- Tauri boundary design succeeds when ownership remains explicit across engines
- not when each engine half-documents the whole system vaguely

---

## Tauri Boundary Checklist

Before calling a Rust-side Tauri boundary healthy, ask:

- [ ] Is the core-shell split explicit?
- [ ] Are commands treated as IPC contract surfaces rather than convenience calls?
- [ ] Are naming, serialization, and error rules explicit?
- [ ] Are native capabilities treated as security boundaries?
- [ ] Are handlers thinner than the core logic they call?
- [ ] Is desktop-web coexistence mapped explicitly when relevant?
- [ ] Is packaging/release graph law part of the boundary doctrine?
- [ ] Does verification exercise the real consumer boundary?
- [ ] Are cross-engine ownership boundaries explicit?

---

## Anti-Patterns

- treating Tauri as “frontend with some Rust helpers”
- hiding IPC behind wrappers so thoroughly that maintainers forget a boundary exists
- mixing UI logic and native/system logic in command handlers
- assuming local desktop boundaries do not need validation or error law
- packaging desktop artifacts without an explicit release-graph story
- duplicating desktop/web contract logic by hand without ownership maps
- flattening Rust truth and TS ergonomics into one vague “app logic” bucket

---

## Cross-Links

Read this alongside:
- `boundary-activation-model.md`
- `rust-cross-language-workflows.md`
- `rust-typescript-bridge-patterns.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../../typescript-coding-engine/references/interop/tauri-frontend-rust-bridge.md`
- `../../cross-platform-development/README.md`
- `../governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “a Tauri app has a frontend and a Rust backend connected by commands.”

The reusable lesson is:
> “a Tauri system is a product-grade core-shell boundary where Rust owns native truth and security-critical capability, the frontend owns shell ergonomics, IPC owns the contract between them, and desktop/web coexistence plus release-graph pressure must be governed explicitly—otherwise the bridge may feel convenient while remaining architecturally unstable.”
