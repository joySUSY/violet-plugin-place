# Developer Tool Trigger Scope

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool`.

This document freezes which runtime or doctrine surface should own the **first response** when a tooling-domain event appears.

It answers a root control-plane question:

> when a developer-tool trigger fires, which layer should respond first—bridge skill, command, agent, hook, doctrine reference, subtree control plane, staging layer, plugin shell, or donor fallback—and how do we keep those responsibilities from collapsing into overlap or automation chaos?

This is one of the root governance documents that keeps the engine coherent as canonical deep fusion advances.

## Source Provenance

- **Primary source:** current `developer-tool` control plane and active runtime-shell model
- **Derived from:** trigger ownership, shell/doctrine separation, staging formalization, and subsystem convergence work across the matured developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current developer-tool engine

---

## Core Rule

Every meaningful developer-tool trigger must have one clear first owner.

For each trigger, the engine should be able to answer:

- what just happened?
- which surface should respond first?
- what kind of action belongs there?
- which stronger surface, if any, should be consulted next?

If those answers are fuzzy, the engine drifts toward:

- doctrine duplication
- shell overreach
- staging misuse
- donor dependence in active workflows

The goal is not maximum automation.
The goal is predictable activation.

---

## Trigger Ownership Model

| Trigger Type              | Primary Owner                       | Use When                                                                 |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| Topic or domain detection | bridge `skills/`                    | first routing of a tooling-domain task                                   |
| Explicit user action      | `commands/`                         | the user wants a concrete operational workflow                           |
| Specialist diagnosis      | `agents/`                           | deeper isolated reasoning is required                                    |
| Lifecycle continuity      | `hooks/`                            | startup, compact, or stop behavior improves reliability                  |
| Stable standards or laws  | doctrine files + `rules/`           | the system needs fixed non-negotiable behavior                           |
| Staging escalation        | governed staging layer              | canonical doctrine is insufficient but donor access is not yet justified |
| Donor extraction          | doctrine/governance + donor sources | curated material and staging are both insufficient                       |

The doctrine is:

- use the smallest surface that preserves the trigger honestly
- do not escalate automatically just because a richer surface exists

---

## Surface-by-Surface Ownership

### `skills/`

Bridge skills should own:

- first classification
- first routing
- shortest safe path into canonical doctrine

They should **not**:

- duplicate full donor content
- act as full runtime automation centers
- replace shell commands when explicit invocation is better

### `commands/`

Commands should own:

- explicit operational entrypoints
- repeatable user-triggered workflows
- prime, route, and audit style actions
- bounded runtime actions once the correct layer is already known

They should **not**:

- pretend to be doctrine references
- replace specialist agents for deep reasoning
- bypass doctrine just because a command exists

### `agents/`

Agents should own:

- bounded specialist reasoning
- isolated diagnosis or audit
- focused interpretation of complex shell questions

They should **not**:

- become giant generalist dumping grounds
- replace the top-level engine doctrine
- silently redefine routing law

### `hooks/`

Hooks should own:

- lightweight lifecycle assistance
- startup priming
- compaction memory preservation
- stop-time discipline reminders

They should **not**:

- mutate broad state by default
- run heavy logic on every event without leverage
- quietly replace doctrine with automation

### Doctrine and `rules/`

Doctrine and rule files should own:

- fixed truths
- lane definitions
- promotion logic
- non-negotiable shell laws

They should **not** be bypassed in favor of staging or donor material during ordinary work.

### Staging layers

Staging layers should own:

- unresolved adapted complexity
- second-line depth after doctrine is exhausted
- navigation across module clusters that are not yet doctrine-shaped

They should **not**:

- become default reading paths
- compete with canonical references
- behave like donor mirrors in nicer folders

---

## Developer-Tool Specific Trigger Table

| Scenario                                                                       | Primary Surface                                                                 |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| “continue / previous session / recall / deleted file / history lane”           | `skills/ai-agent-memory` → memory doctrine first                                |
| “canonical memory docs are insufficient; I need deeper adapted memory modules” | `ai-agent-memory/v3-expansion/INDEX.md`                                         |
| “capture / recover / trace surfaced project-local continuity”                  | `plugins/violet-memory-lab/` commands after doctrine and staging routing        |
| “how should this plugin be structured?”                                        | `commands/audit/plugin-structure.md` or `agents/plugin-auditor.md`              |
| “what tooling surface should I use?”                                           | `commands/route/choose-tool-surface.md`                                         |
| “Claude Code runtime / multi-agent / hook system / plugin flow”                | `skills/agentic-system-basis`                                                   |
| “shell safety / bash portability / path risk”                                  | `skills/shell-and-terminal` or `agents/shell-safety-reviewer.md`                |
| “CI/CD / release / deploy / packaging”                                         | `skills/build-and-deploy`                                                       |
| “cross-platform runtime differences”                                           | `skills/cross-platform-development`                                             |
| “plugin ecosystem / CLI / MCP / LSP architecture”                              | `skills/tool-ecosystem` or `agents/tooling-integrator.md`                       |
| “CSV / PDF / DOCX / transformation pipeline”                                   | `skills/data-processing` or `agents/data-processing-diagnostician.md`           |
| “C++ / Kotlin / Flutter / PowerShell / PHP guidance”                           | `skills/language-specialists` or `agents/language-specialists-diagnostician.md` |

This table exists to keep practical activation predictable.

---

## Hook Scope Law

### `SessionStart`

Allowed role:

- prime the engine
- remind about surface classification
- load conservative runtime context

Not allowed role:

- broad mutation
- donor crawling
- expensive indexing

### `PreCompact`

Allowed role:

- preserve active surface and boundary state
- preserve handoff-critical shell context

Not allowed role:

- doctrine rewriting
- large data movement

### `Stop`

Allowed role:

- remind about non-destructive defaults
- preserve handoff discipline conceptually
- surface bounded review reminders

Not allowed role:

- large shell mutations
- surprise blocking unless a well-defined gate exists
- hidden policy engines masquerading as lightweight hooks

The doctrine is:

- lifecycle hooks should assist continuity and discipline
- not become hidden orchestration engines

---

## AI-Agent-Memory Special Rule

Inside `developer-tool`, `ai-agent-memory` now has a more mature layered structure than a normal subtree.
That means its trigger flow must usually be:

1. root or subtree control plane
2. canonical memory doctrine
3. governed staging subsystem if doctrine is insufficient
4. bounded runtime shell (`plugins/violet-memory-lab`) only when the problem is explicitly push-based and operational
5. donor or source reservoir only if doctrine + staging + shell still do not answer the need

The doctrine is:

- `violet-memory-lab` is never the first stop for ordinary memory questions
- staging is never a shortcut around doctrine
- donors are never first-line runtime sources

This rule is mandatory because the memory subsystem is now layered enough to need explicit control-plane protection.

---

## Agentic-System-Basis Special Rule

Inside `developer-tool`, `agentic-system-basis` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `agentic-system-basis` is not a shell-first subsystem
- its reserved `v3-expansion/` is not active staging
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Tool-Ecosystem Special Rule

Inside `developer-tool`, `tool-ecosystem` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `tool-ecosystem` is not a shell-first subsystem
- its reserved `v3-expansion/` is not active staging
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Build-and-Deploy Special Rule

Inside `developer-tool`, `build-and-deploy` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. subtree-local supporting skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `build-and-deploy` is not a shell-first subsystem
- its subtree-local skill bundles are support packs, not staging
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Shell-and-Terminal Special Rule

Inside `developer-tool`, `shell-and-terminal` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. subtree-local supporting skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `shell-and-terminal` is not a shell-first subsystem
- its subtree-local skill bundles are support packs, not staging
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Cross-Platform-Development Special Rule

Inside `developer-tool`, `cross-platform-development` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. subtree-local supporting skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `cross-platform-development` is not a shell-first subsystem
- its subtree-local skill bundles are support packs, not staging
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Data-Processing Special Rule

Inside `developer-tool`, `data-processing` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `data-processing` is not a shell-first subsystem
- its stage-oriented doctrine must remain primary over runtime convenience
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Language-Specialists Special Rule

Inside `developer-tool`, `language-specialists` is doctrine-mature and control-plane-complete, but it still does not own a dedicated subsystem runtime shell.
That means its trigger flow must usually be:

1. subtree control plane
2. canonical doctrine
3. root runtime surfaces only if explicit operational leverage is required
4. donor or source reservoir only if doctrine is still insufficient

The doctrine is:

- `language-specialists` is not a shell-first subsystem
- it is bridge-shaped and must route by problem shape rather than keyword alone
- root runtime surfaces may support it, but must not pretend a dedicated shell already exists

---

## Reservoir Access Law

When a trigger fires, the system should prefer:

1. bridge skill
2. canonical doctrine or subtree control plane
3. explicit command or agent if needed
4. governed staging layer if doctrine is insufficient
5. donor reservoir only if the curated doctrine and staging are still insufficient

This order is mandatory.

The engine should grow toward less donor dependence, not toward prettier donor dependence.

---

## Deep Fusion Consequence

As canonical deep fusion advances, triggers should become:

- more deterministic
- more surface-aware
- more staging-aware without becoming staging-dependent
- less donor-dependent

The mature state is:

- donors are used rarely
- doctrine and shell surfaces carry most of the operational burden
- staging stays explicit and bounded rather than becoming a shadow doctrine tree

---

## Trigger Ownership Checklist

Before calling the root trigger model healthy, ask:

- [ ] Does each major trigger have a clear first owner?
- [ ] Are skills, commands, agents, hooks, doctrine, staging, and donors playing distinct roles?
- [ ] Are lifecycle hooks limited to lifecycle concerns?
- [ ] Are doctrine and rules still the default home for stable truths?
- [ ] Is staging subordinate to doctrine rather than competing with it?
- [ ] Is donor access clearly fallback-only?
- [ ] Does the trigger model reduce likely wrong moves rather than increase ceremony?

---

## Anti-Patterns

- routing by keyword alone instead of by subsystem or pressure
- allowing staging layers to become first-line reading paths
- letting subsystem README or inventory files quietly compete with doctrine instead of routing into it
- promoting donor access as a normal first response
- turning hooks into hidden orchestration engines
- letting root runtime surfaces pretend a dedicated subsystem shell already exists when it does not

---

## Cross-Links

Read this alongside:

- `SKILL.md`
- `README.md`
- `INVENTORY.md`
- `ABSORPTION_MATRIX.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`
- `ai-agent-memory/README.md`
- `agentic-system-basis/README.md`
- `tool-ecosystem/README.md`
- `shell-and-terminal/README.md`
- `build-and-deploy/README.md`
- `data-processing/README.md`
- `cross-platform-development/README.md`
- `language-specialists/README.md`

---

## Status

- Engine: `developer-tool`
- Stage: root trigger ownership converged to the current matured control plane
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:

> “developer-tool triggers should go to whichever runtime surface looks closest.”

The reusable lesson is:

> “developer-tool trigger scope should make the first owner explicit across doctrine, control plane, staging, runtime, and donor layers—so each subsystem routes by real control-plane pressure, root runtime surfaces stay bounded, donors remain fallback evidence, and staging never silently becomes shell truth.”
