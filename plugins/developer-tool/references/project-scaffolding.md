# Project Scaffolding and CLI Architecture

## Purpose

Define the canonical doctrine for scaffolding new developer tools and related projects inside `developer-tool`.

This document is not a dump of language templates.
It exists to answer a more useful question:

> when starting a new tool or tool-adjacent project, what should be scaffolded immediately so the project begins with the right operational shape instead of accumulating avoidable debt from day one?

This doctrine covers scaffolding across Rust, Python, TypeScript, Go, and hybrid tool projects—but always from the perspective of boundary clarity, CLI ergonomics, testability, and quality-by-default.

## Source Provenance

- **Primary source:** current `developer-tool` scaffolding / CLI / build-deploy doctrine cluster
- **Derived from:** absorbed project-setup and CLI-oriented donor families plus the plugin-first developer-tool architecture passes
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local scaffolding doctrine aligned to the current developer-tool engine

---

## Core Rule

Scaffolding is the act of choosing the project's first architecture on purpose.

A scaffold should not merely create files.
It should establish:
- the right boundary shape
- the right quality defaults
- the right operational entrypoints
- the right testing and release posture
- the right amount of structure for the project's likely scale

A weak scaffold makes every later improvement retrofitted.  
A strong scaffold makes the healthy path the default path.

---

## Scaffolding Pressure Model

Before generating anything, identify the project pressure profile.

| Pressure | What it changes |
|---|---|
| CLI-first tool | command model, stdout/stderr contract, shell composability |
| Library-first tool | public API shape, docs/examples, package metadata |
| Service or agent runtime | config, observability, lifecycle, deployment posture |
| Multi-language tool | contract boundaries, packaging, integration tests |
| Fast prototype | keep structure lean, but still establish quality rails |
| Team/shared project | codify CI, formatting, lint, test, and release conventions early |

The scaffold should answer the strongest pressures first, not try to support every future imaginable feature immediately.

---

## Pattern 1 — Start With the Smallest Honest Structure

A scaffold should be proportionate.

Good scaffolding asks:
- is this a small single-purpose tool?
- is this a command suite?
- is there a reusable core beneath the CLI?
- is this likely to become multi-crate or multi-package?

The doctrine is:
- start with the smallest structure that matches real pressure
- avoid both under-structure and prestige-architecture overkill

A tiny tool does not need a fake enterprise directory tree.
But a reusable CLI/library hybrid often should not live forever as one giant file either.

---

## Pattern 2 — CLI Scaffolds Must Treat the CLI as a Real Boundary

If the project is CLI-first, the scaffold should immediately establish:
- thin entrypoint
- command decomposition
- help/flag posture
- output discipline
- exit-code correctness
- testable logic beneath the CLI layer

This is why `building-cli.md` exists as a companion doctrine.
The scaffold should embody that doctrine rather than expecting someone to retrofit it later.

---

## Pattern 3 — Quality Must Be Present on Day One

A serious scaffold should usually include:
- formatter configuration
- lint posture
- basic test layout
- CI workflow
- README / quick start
- ignore files
- license and metadata where relevant

This matters because quality is much easier to establish at project birth than to retrofit after habits and scripts have already drifted.

The doctrine is:
- scaffolding should make quality the default, not an optional future project

---

## Pattern 4 — Language Templates Should Encode Boundary Wisdom, Not Only Syntax

A Rust scaffold, a Python scaffold, or a TypeScript scaffold should not only differ in syntax.
They should also encode the strongest healthy defaults for that ecosystem.

Examples:
- Rust -> crate layout, test directories, docs/lints, release posture
- Python -> `pyproject.toml`, toolchain, tests, lint/type-check posture
- TypeScript -> `tsconfig`, testing setup, package scripts, runtime/tooling expectations
- Go -> command/package separation, module hygiene, simple operational layout

The scaffold should teach the ecosystem's healthy defaults implicitly.

---

## Pattern 5 — Multi-Language and Hybrid Projects Need Explicit Core/Boundary Separation

When a project spans multiple languages, the scaffold must establish where truth lives.

Examples:
- Rust core + Python bindings
- TypeScript frontend + Rust backend/tooling
- Go service + CLI tooling

The important scaffolding question is:
- where is the canonical core?
- what is wrapper/boundary code?
- how will packaging and CI validate both sides?

Without that separation, hybrid projects become coordination debt almost immediately.

---

## Pattern 6 — Configuration and Build Boundaries Should Be Obvious Early

A scaffold should make it obvious where:
- configuration is loaded
- environment variables are expected
- build scripts or package scripts live
- release/deploy workflow begins
- generated artifacts belong

This is why scaffolding doctrine overlaps with build/deploy doctrine.
A project that starts with unclear build/config boundaries tends to keep that ambiguity for a long time.

---

## Pattern 7 — Templates Should Establish Testing Posture, Not Just “tests/” Folder Existence

Many scaffolds create a `tests/` folder and call it done.
That is not enough.

A better scaffold posture also implies:
- what should be unit-tested vs integration-tested
- how CLI invocation gets tested
- whether there is a sample fixture or example test
- what the quick verification path is in CI/local development

The scaffold is teaching the project how to prove itself.
That is higher value than a template file count.

---

## Pattern 8 — Scaffolds Should Optimize for the First 30 Days, Not the First 30 Minutes Alone

A scaffold should feel productive immediately, but it should also still feel sane a month later.

Good questions:
- can someone new understand the layout quickly?
- can features be added without restructuring immediately?
- are CI and tests already aligned with the shape of the project?
- does the build/deploy posture suggest the next safe move?

This is the right time horizon for scaffolding quality.

---

## Pattern 9 — Generated Templates Should Be Opinionated, But Not Dogmatic

An opinionated scaffold is valuable because it removes decision fatigue.
But it becomes dogmatic when it assumes every project needs the same shape.

The doctrine is:
- encode strong defaults
- keep variation points explicit
- document when to choose minimal vs full vs hybrid vs service vs library modes

A scaffold should guide decisions, not freeze them irrationally.

---

## Pattern 10 — Scaffolding and Runtime Shells Are Related but Not Identical

Because `developer-tool` is plugin-first for heavy engines, scaffolding doctrine must also acknowledge runtime shell reality.

Some projects need only a normal repository scaffold.
Some, especially tool ecosystems or agentic systems, may eventually need:
- commands
- agents
- hooks
- rules
- references
- modules

The scaffold should not pretend all new projects are immediately heavy plugin engines.  
But it should preserve a clean path toward that evolution when the signals are real.

---

## Scaffold Families

### Family A — Small single-purpose CLI
Best for:
- local utilities
- wrappers around one workflow
- tools with limited command surface

### Family B — Command-suite developer tool
Best for:
- multi-command CLIs
- tools that need config, output helpers, tests, completions, and release discipline

### Family C — Library + CLI hybrid
Best for:
- reusable core with a command surface on top
- ecosystems where consumers may embed the logic later

### Family D — Hybrid / cross-language tool
Best for:
- Rust + Python
- TS + Rust
- CLI + service + bindings combinations

### Family E — Tooling platform / plugin-grade system
Best for:
- runtime shell + doctrine + automation surfaces
- tools that will become ecosystems rather than utilities

Scaffolding quality comes from choosing the right family—not from stuffing all families into one template.

---

## Scaffold Checklist

Before calling a scaffold healthy, ask:

- [ ] Does the structure match the real project pressure profile?
- [ ] Is the CLI/library/service boundary explicit enough?
- [ ] Are quality defaults present from day one?
- [ ] Are build/config/release boundaries visible?
- [ ] Does the scaffold establish testing posture, not just directories?
- [ ] Is the project likely to feel sane after the first month, not just the first run?

---

## Anti-Patterns

- giant multi-language mega-template for a tiny tool
- enterprise folder theater for a simple utility
- scaffolds with no CI/lint/test defaults
- scaffolds that mix CLI glue and core logic in one place by default
- hybrid projects with no explicit core/boundary separation
- templates optimized for marketing screenshots instead of long-term use

---

## Cross-Links

Read this alongside:
- `building-cli.md`
- `build-and-deploy/build-deploy.md`
- `plugin-runtime-overview.md`
- `shell-and-terminal/INDEX.md`
- `build-and-deploy/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “a scaffold should generate the right files for each language.”

The reusable lesson is:
> “a scaffold is the first architectural decision of a tool: it should encode the smallest honest structure, the right runtime boundaries, and quality defaults that make the healthy path easier than the retrofitted one.”
