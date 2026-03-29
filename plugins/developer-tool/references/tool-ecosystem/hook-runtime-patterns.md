# Hook Runtime Patterns

## Purpose

Define the canonical runtime-hook patterns for heavy engine shells under `developer-tool`.

This is narrower than general lifecycle posture.
It focuses on:

- what a hook should actually do as runtime behavior
- when a hook is the right surface
- when a hook is the wrong surface

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** hook-surface, portability, and runtime-hook canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local hook-runtime doctrine aligned to the current developer-tool engine

---

## Cross-Platform Rule

For future heavy-engine shells, hooks should default to a **cross-platform, prompt-first** posture.

That means:

- prefer prompt hooks when the event supports them
- avoid hard dependency on `bash ...sh` as the default shell path
- treat shell-specific command hooks as optional fallback, not baseline doctrine

If a command hook is truly necessary, it must use a runtime path strategy that can work across operating systems, not just one local shell assumption.

---

## Core Rule

Hooks exist for **timing-sensitive runtime behavior**.
They do not exist just because automation feels powerful.

---

## Correct Hook Classes

### Priming Hooks

Used to set the right posture at the start of a session.

Examples:

- remind about correct surface classification
- restore shell-awareness after a fresh session start

### Preservation Hooks

Used to preserve the most important lane decisions before compaction.

Examples:

- active surface
- shell/doctrine boundary state
- latest architectural posture

### Review Hooks

Used to run a small shell-aware review before stopping.

Examples:

- verify no donor mirroring occurred
- verify no destructive defaults slipped in
- verify the stop point is explicit enough for future-you

---

## Wrong Hook Classes

### Donor crawling hooks

Do not use hooks to scan entire donor trees just because the event fired.

### Heavy mutation hooks

Do not use hooks to restructure the engine tree automatically in the background.

### Omniscient enforcement hooks

Do not turn hooks into permanent high-friction gatekeepers before the doctrine and shell are mature.

---

## When a Hook Is Better Than a Command

A hook is better when:

- the timing itself is the value
- users or future agents should not need to remember to invoke it
- the logic is lightweight and predictable
- the shell gains continuity or safety from automation

A command is better when:

- the action should remain explicit
- the workflow is optional
- the logic is heavier or exploratory
- the user should control when it runs

---

## Hook Design Checklist

Before adding a hook, ask:

1. What lifecycle event makes this valuable?
2. Is the logic lightweight enough for that event?
3. Could a command or bridge skill do this more safely?
4. Does the hook preserve shell/doctrine boundaries?
5. Can future-you predict why it ran?

If the answers are weak, the capability belongs elsewhere.

---

## Heavy Engine First-Wave Rule

Wave-1 heavy engine hooks should mostly be:

- prompt-friendly lifecycle surfaces such as:
  - `UserPromptSubmit`
  - `Stop`

These are preferred because they avoid shell-coupled execution and are easier to keep cross-platform.

If stronger lifecycle timing is needed for events like `SessionStart` or `PreCompact`, use command hooks only when you can guarantee a portable runtime shim.

Do not assume that:

- `bash` exists everywhere
- `/usr/bin/env bash` is a safe universal baseline
- local shell-specific scripts are acceptable as the default plugin posture
- `Stop`

Anything more aggressive needs strong justification.

This is how plugin-first remains disciplined rather than noisy.
