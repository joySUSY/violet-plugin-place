# Shell and Terminal Trigger Scope

> Choose the safe shell posture before choosing the shell command.
> 先选对安全姿态，再决定要不要执行具体 shell 命令。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/shell-and-terminal`.

This document answers a subsystem control-plane question:

> when a shell- or terminal-related event appears, which layer should respond first—subtree control docs, canonical doctrine, subtree-local skill bundles, root runtime surfaces, or donor/source fallback—and how do we keep this subsystem doctrine-first while still respecting that shell work has higher operational blast radius than ordinary documentation questions?

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine cluster, subtree control plane, and subtree-local skill bundles
- **Derived from:** shell-safety, runtime-shell-governance, portable-session, and shell-facing runtime-boundary canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current shell-and-terminal subsystem

---

## Core Rule

`shell-and-terminal` is doctrine-first, but shell questions are higher-blast-radius than many other doctrine lanes.

That means a trigger in this subsystem should usually resolve through:
1. subtree control plane
2. canonical doctrine
3. subtree-local skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor/source reservoirs only if doctrine is still insufficient

The goal is not to turn shell work into ambient automation.
The goal is to make the safe and explicit path easier than the risky shortcut.

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
- `../../references/shell-and-terminal/*`

Use when the question is actually about:
- shell scripting posture
- quoting/expansion discipline
- terminal environment strategy
- portable session workflows
- shell/runtime boundary decisions
- shell safety doctrine

### 3. Subtree-local skill bundles
Owned by:
- `bash-portability/`
- `terminal/`
- `terminal-env/`
- `zsh-style-guide/`

Use only when:
- the doctrinal lane is already clear
- a more focused subtree-local skill pack adds real leverage
- the skill pack clarifies a narrow shell/terminal concern better than the broad doctrine page alone

These are not a staging subsystem.
They are support packs under a doctrine-first subtree.

### 4. Root runtime surfaces
Owned by root `developer-tool` shell surfaces such as:
- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`
- `../../agents/shell-safety-reviewer.md`

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
| “How should this shell script behave safely?” | canonical doctrine | shell-scripting doctrine question |
| “What quoting / expansion / exit-code posture is correct here?” | canonical doctrine | shell-law question |
| “How should I structure this tmux/session workflow?” | canonical doctrine | portable-session doctrine question |
| “Which subtree-local shell skill bundle is relevant?” | subtree control plane, then skill bundle | routing before specialization |
| “Should this shell behavior live in a command, hook, or doctrine?” | canonical doctrine | runtime-boundary question |
| “Which root runtime surface should I use right now?” | root runtime route/prime/audit surface | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation” | donor/source fallback | last resort only |

---

## Trigger Law

### Doctrine-first law
If the question is:
- educational
- architectural
- shell-safety-shaped
- portability-shaped
- terminal-ergonomics-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law
Only use root runtime surfaces when:
- the doctrinal lane is already clear
- a concrete operational action or safety review is needed
- the problem is no longer “what is the correct shell law?” but “what should the shell do next?”

### No-ambient-automation law
Because shell work has high blast radius:
- do not let subtree-local skill packs masquerade as shell automation
- do not bypass doctrine just because root runtime commands exist
- do not turn shell ergonomics questions into execution decisions too early

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:
- root runtime doctrine under `developer-tool`
- `../../references/shell-and-terminal/runtime-shell-governance.md`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`

The doctrine is:
- shell-facing lifecycle automation should stay conservative and root-owned
- not sprout a subtree-local hook layer casually

---

## Cross-Links

Read this alongside:
- `README.md`
- `INVENTORY.md`
- `../../references/shell-and-terminal/INDEX.md`
- `../../references/shell-and-terminal/runtime-shell-governance.md`
- `../../references/shell-and-terminal/portable-session-workflows.md`
- `../../rules/shell-safety/non-destructive-defaults.md`
- `../../commands/prime/tool-runtime.md`

---

## Final Doctrine

The reusable lesson is not:
> “shell-and-terminal now has trigger scope rules too.”

The reusable lesson is:
> “`shell-and-terminal` is a doctrine-first subsystem whose trigger model should keep shell behavior educational and bounded before it becomes operational, so safe shell posture remains easier to choose than unsafe command execution under pressure.”
