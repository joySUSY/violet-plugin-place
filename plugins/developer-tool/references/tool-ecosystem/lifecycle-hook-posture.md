# Lifecycle Hook Posture

## Purpose

Define the canonical lifecycle-hook posture for heavy engine shells under `developer-tool` governance.

This document explains:

- which hook events are worth using early
- what they should and should not do
- how to prevent lifecycle automation from becoming noisy or dangerous

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** lifecycle-hook selection, portability, and conservative-automation canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local lifecycle-hook doctrine aligned to the current developer-tool engine

---

## Cross-Platform Rule

Future hooks should default to the most portable viable shape.

Preferred order:

1. prompt hook on a supported event
2. command hook only if a true runtime action is needed and the launcher is cross-platform

Do not treat `bash ${CLAUDE_PLUGIN_ROOT}/...` as the universal default.
That is acceptable only as a constrained compatibility fallback, not as baseline doctrine.

---

## Core Rule

Lifecycle hooks exist to support reasoning continuity and runtime hygiene.
They do **not** exist to replace doctrine or to automate every possible action.

A good hook posture is:

- conservative
- bounded
- predictable
- shell-aware

---

## 1. `SessionStart`

### Primary role

- prime the correct doctrinal posture
- remind the engine which surface to choose first
- restore shell awareness at the start of the session

### Good examples

- “developer-tool runtime shell active; choose the correct surface first”
- “rust-coding-engine active; classify work into foundations / interop / async / architecture before acting”
- “typescript-coding-engine active; classify into core-types / tooling / validation / interop”

### Bad examples

- scanning entire donor trees
- mutating runtime state broadly
- writing files on startup by default
- trying to complete tasks automatically before user intent is clear

---

## 2. `PreCompact`

### Primary role

- preserve the active doctrinal lane
- preserve current architectural or routing decisions
- preserve shell/doctrine/donor boundary awareness

### Good examples

- capture which surface was active
- capture key architecture or interop decisions
- remind future-you not to confuse donor reservoirs with runtime shell truth

### Bad examples

- dumping large transcript content
- auto-rewriting doctrine files
- broad repository indexing during compaction

---

## 3. `Stop`

### Primary role

- enforce conservative stop-time review
- preserve handoff discipline
- catch boundary violations before the shell exits

### Good examples

- remind the engine to verify no donor repo was mirrored
- remind the engine to verify no destructive guidance was normalized
- remind the engine to preserve the mainline stop point clearly

### Bad examples

- surprising hard blocks everywhere
- expensive post-processing pipelines
- turning stop into a second workflow engine

---

## 4. Why Wave-1 Stops Here

The reason wave-1 shells use only `SessionStart`, `PreCompact`, and `Stop` is simple:

They provide the highest leverage at the lowest chaos cost.

However, portability introduces an additional rule:

- if cross-platform compatibility is the priority
- and prompt hooks cover the needed behavior

then prefer a narrower portable subset such as:

- `UserPromptSubmit`
- `Stop`

They help with:

- startup awareness
- summary continuity
- handoff discipline

without introducing:

- aggressive command interception
- high-frequency runtime noise
- unpredictable mutation

---

## 5. When to Escalate Beyond Wave-1

Consider stronger lifecycle automation only when:

1. the doctrine center is already stable
2. the shell surfaces are already easy to navigate
3. repeated failure modes justify stronger intervention
4. the intervention can be narrowly scoped

Only then consider:

- `PreToolUse`
- `PostToolUse`
- `UserPromptSubmit` (if not already part of the portable baseline)
- specialized runtime enforcement hooks

If a command hook is introduced at this stage, its launcher must remain cross-platform-safe.

Even then, prefer narrow matchers and bounded outputs.

---

## 6. Hook Quality Checklist

Before adopting any lifecycle hook, ask:

- Does it reduce a real repeated failure mode?
- Does it preserve shell/doctrine boundaries?
- Is it lightweight enough for frequent execution?
- Does it avoid broad mutation?
- Can the user still predict what the shell is doing?

If not, it probably belongs in doctrine or commands, not hooks.

---

## 7. Heavy Engine Implication

For heavy engines, lifecycle hooks are not optional forever.
But in the early stages they should act as:

- primers
- preservers
- reviewers

not as omniscient orchestrators.

That is the correct posture for sustainable shell evolution.
