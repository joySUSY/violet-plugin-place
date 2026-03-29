# Shell and Terminal Control Center

> Shell work becomes trustworthy when safety, portability, and runtime boundaries are governed before commands are executed.
> 只有当安全性、可移植性与运行时边界先被治理，再去执行命令时，shell 工作才真正可信。

## Purpose

This document is the root control-center for `developer-tool/shell-and-terminal/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:

- shell scripting posture
- terminal runtime ergonomics
- portable session workflows
- runtime-shell safety boundaries for shell work
- shell-facing subskills already living under this subtree

This subtree is doctrine-first, but also closer to real command execution than many other doctrine lanes.
That makes its control plane especially important.

## Core Rule

`shell-and-terminal` is a doctrine-first subsystem with high blast radius.

That means:

- its canonical truth currently lives in `developer-tool/references/shell-and-terminal/`
- its root control job is to route shell/terminal questions into the correct doctrine slice before execution
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or dedicated shell expansion may happen only if operational pressure becomes specific enough
- root `developer-tool` runtime surfaces still remain the default runtime layer for shell-facing operations

The goal is not to turn shell knowledge into hidden automation.
The goal is to make the safe path easier than the risky path.

---

## Current Layer Model

### 1. Canonical doctrine

Location:

- `developer-tool/references/shell-and-terminal/*`

Owns:

- broad shell scripting doctrine
- runtime-shell governance for shell work
- portable session workflows
- terminal/portability/safety boundaries

### 2. Root control plane

Location:

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Owns:

- root routing
- maturity framing
- trigger ownership
- donor promotion governance
- future trigger/absorption bootstrap for this subsystem

### 3. Existing subtree skill bundles

Location:

- `bash-portability/`
- `terminal/`
- `terminal-env/`
- `zsh-style-guide/`

Current role:

- supporting skill packs already living under the subtree
- not yet formalized as a governed staging subsystem

### 4. Runtime shell

Current status:

- no dedicated subsystem runtime shell
- runtime-facing behavior is still served by the root `developer-tool` commands, agents, hooks, and rules

The doctrine is:

- shell operations stay doctrine-first and explicitly triggered
- not silently converted into a local automation shell

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/shell-and-terminal/INDEX.md`
6. Then enter the correct doctrine slice:
   - `shell-terminal.md`
   - `runtime-shell-governance.md`
   - `portable-session-workflows.md`
   - `../shell-terminal-mastery.md`
7. Only then use root runtime surfaces if the task becomes operational

This keeps control first and execution second.

---

## What This Subsystem Is For

Use this subtree when the question is about:

- shell scripting discipline
- quoting, expansion, exit codes, traps, and cleanup posture
- terminal and shell environment ergonomics
- portable session workflows and evidence capture
- whether shell behavior belongs in doctrine, commands, hooks, or rules
- how to keep shell work bounded under runtime governance

---

## What This Subsystem Is NOT

It is not:

- a replacement for `tool-ecosystem`
- a donor parking lot
- a hidden execution shell for risky commands
- a place to normalize destructive automation into convenience

If the question is primarily about:

- shell architecture / component selection / MCP boundaries -> go to `../tool-ecosystem/README.md`
- memory continuity -> go to `../ai-agent-memory/README.md`
- agentic activation and orchestration -> go to `../agentic-system-basis/README.md`

---

## Cross-Links

Read this alongside:

- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/shell-and-terminal/INDEX.md`
- `../../references/tool-ecosystem/INDEX.md`
- `../../rules/shell-safety/non-destructive-defaults.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:

> “shell-and-terminal is where the shell docs live.”

The reusable lesson is:

> “`shell-and-terminal` is a doctrine-first subsystem that governs how shell work should behave under real operational pressure, so runtime shell surfaces can support shell tasks without normalizing risky command behavior into casual automation.”
