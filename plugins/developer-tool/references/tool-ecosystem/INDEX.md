# Tool Ecosystem Index

## Purpose

Canonical navigation entrypoint for plugin, runtime-shell, and tooling architecture inside `developer-tool`.

Use this category when the problem is about:

- plugin shell design
- command surfaces
- hook posture
- plugin-local settings or state
- MCP leverage
- component selection and runtime boundaries
- validation and audit posture for plugin-grade shells

This index is not only a document list.
It exists to route readers into the correct tool-ecosystem doctrine lane based on the kind of runtime-shell pressure they need to resolve.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** plugin-first shell architecture, component-model, hook, MCP, validation, and runtime-surface canonization work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current `tool-ecosystem` lane

---

## Tool-Ecosystem Spine

The `tool-ecosystem` subtree now has a clear doctrinal spine:

1. **Runtime shell boundary law**
   - `../plugin-runtime-overview.md`
   - `core-shell-patterns.md`
2. **Component-selection law**
   - `component-model.md`
   - `directory-structure-laws.md`
3. **Operational surface law**
   - `command-surface-patterns.md`
   - `hook-runtime-patterns.md`
   - `lifecycle-hook-posture.md`
4. **State and optional extension law**
   - `plugin-settings-local-state.md`
   - `mcp-leverage-model.md`
5. **Validation and review law**
   - `validation-audit-patterns.md`
6. **Specialized shell extensions**
   - `claude-code-plugin-shell-patterns.md`
   - `searchable-skill-distribution-patterns.md`
   - `result-first-multi-surface-handlers.md`
   - `skill-router-and-surface-selection-design.md`

The doctrine is:

- tool-ecosystem reasoning should move from core shell law → component choice → operational surfaces → optional extensions → validation
- not jump straight into commands, hooks, or MCP because those surfaces look more concrete

---

## Documents and Their Roles

| File                                           | Primary Role                                                                     | Load When                                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `../plugin-runtime-overview.md`                | Root overview of runtime-shell boundaries inside `developer-tool`                | you need the big picture first                                                             |
| `core-shell-patterns.md`                       | Heavy-engine shell laws and surface separation doctrine                          | you are deciding what the shell should or should not contain                               |
| `component-model.md`                           | Doctrine for choosing the smallest correct shell surface                         | you need to decide skill vs command vs agent vs hook vs rule vs reference vs module vs MCP |
| `directory-structure-laws.md`                  | Filesystem and layout law for plugin-grade shells                                | the problem is structural or manifest/layout related                                       |
| `command-surface-patterns.md`                  | Doctrine for explicit prime/route/audit command families                         | the question is about user-triggered workflows                                             |
| `hook-runtime-patterns.md`                     | Doctrine for lifecycle-timed runtime behavior                                    | the question is about when hooks are justified and what they should do                     |
| `lifecycle-hook-posture.md`                    | Conservative lifecycle-hook discipline for heavy engines                         | you need stricter hook timing posture or default restraint law                             |
| `plugin-settings-local-state.md`               | Doctrine for plugin-local state and settings surfaces                            | the issue is configuration, persistence, or local control state                            |
| `mcp-leverage-model.md`                        | Doctrine for when MCP adds real value                                            | the question is whether external tool/data integration is truly justified                  |
| `validation-audit-patterns.md`                 | Doctrine for shell validation, structural audits, and doctrine-vs-runtime checks | the shell needs review, audit, or correctness verification                                 |
| `claude-code-plugin-shell-patterns.md`         | Claude Code-specific plugin shell patterns                                       | the runtime target or shell ergonomics are Claude Code-specific                            |
| `searchable-skill-distribution-patterns.md`    | Search-backed skill delivery and project-local skill injection patterns          | search/distribution is the real design pressure                                            |
| `result-first-multi-surface-handlers.md`       | Shared handler and Result-first runtime design patterns                          | the issue is transport-agnostic handlers or shared multi-surface contracts                 |
| `skill-router-and-surface-selection-design.md` | Capability discovery, manifest routing, and surface-selection doctrine           | routing or capability-aware shell design is the real bottleneck                            |

---

## Reading Paths

### If you need the big picture first

1. `../plugin-runtime-overview.md`
2. `core-shell-patterns.md`
3. `component-model.md`
4. then branch by the real runtime pressure

### If the problem is structural

1. `core-shell-patterns.md`
2. `component-model.md`
3. `directory-structure-laws.md`
4. `claude-code-plugin-shell-patterns.md` if runtime-target-specific shell conventions matter

### If the problem is command or workflow surface design

1. `component-model.md`
2. `command-surface-patterns.md`
3. `skill-router-and-surface-selection-design.md` if routing logic is the real issue

### If the problem is hook or lifecycle behavior

1. `component-model.md`
2. `hook-runtime-patterns.md`
3. `lifecycle-hook-posture.md`
4. `validation-audit-patterns.md` if hook noise or overreach needs review

### If the problem is configuration or plugin-local state

1. `plugin-settings-local-state.md`
2. `component-model.md`
3. `validation-audit-patterns.md` if the state surface must be audited or constrained

### If the problem is MCP or optional external leverage

1. `mcp-leverage-model.md`
2. `component-model.md`
3. `validation-audit-patterns.md` if graceful degradation and shell dependence must be reviewed

### If the problem is review or validation

1. `validation-audit-patterns.md`
2. `core-shell-patterns.md`
3. `component-model.md`
4. then route back into the surface being audited

### If the problem is search-backed or routing-heavy shell design

1. `skill-router-and-surface-selection-design.md`
2. `searchable-skill-distribution-patterns.md`
3. `component-model.md`
4. `command-surface-patterns.md` if the routing must become explicit user-facing workflow

---

## Tool-Ecosystem Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **shell boundaries**, **component selection**, **command design**, **hook timing**, **configuration/state**, **MCP leverage**, or **validation**?
2. Is this still a doctrine-first plugin-shell question, or already an agentic-system, memory, shell, or build/deploy question disguised as tooling?
3. Do we need the big-picture shell law first, or are we already certain which specialized surface dominates?
4. Are we deciding what surface should exist, or auditing a surface that already exists?

The doctrine is:

- tool-ecosystem docs are organized by runtime-shell pressure and surface-selection pressure
- not by whichever component type is currently fashionable

---

## Cross-Links

Tool-ecosystem doctrine overlaps naturally with these lanes:

- **Agentic system basis**
  - `../agentic-system-basis/INDEX.md`
  - `../agentic-system-basis/runtime-activation-patterns.md`
- **AI agent memory**
  - `../ai-agent-memory/INDEX.md`
  - `../ai-agent-memory/search-before-act-enforcement.md`
- **Shell and terminal**
  - `../shell-and-terminal/INDEX.md`
- **Build and deploy**
  - `../build-and-deploy/INDEX.md`
- **Root references**
  - `../INDEX.md`
- **Root runtime shell**
  - `../../commands/prime/tool-runtime.md`
  - `../../commands/prime/tool-ecosystem-surface.md`
  - `../../agents/tool-ecosystem-diagnostician.md`
  - `../../agents/tooling-integrator.md`
  - `../../agents/plugin-auditor.md`

The doctrine is:

- tool-ecosystem is where shell structure becomes explicit
- so it must remain connected to orchestration, memory, shell/runtime behavior, release posture, and root routing rather than pretending runtime-shell architecture is isolated from the rest of the engine

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- runtime-aware and governance-aware cross-links

It should **not** depend on donor reservoir paths or absorbed legacy summaries for its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “tool-ecosystem is where the plugin and command docs live.”

The reusable lesson is:

> “the `tool-ecosystem` subtree is the canonical navigation layer for runtime-shell truth inside `developer-tool`—routing engineers from core shell law into the exact component, command, hook, state, MCP, or validation doctrine they need before a plugin-grade surface is allowed to harden.”
