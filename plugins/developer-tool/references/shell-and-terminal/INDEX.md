# Shell and Terminal Index

## Purpose

Canonical navigation entrypoint for shell and terminal doctrine inside `developer-tool`.

Use this category when the problem is about:

- shell portability
- terminal behavior and environment ergonomics
- tmux or session-oriented workflows
- evidence capture via shell workflows
- safe command execution posture
- shell/runtime boundary decisions
- when shell logic belongs in doctrine, commands, hooks, or rules

This index is not only a document list.
It exists to route readers into the correct shell-and-terminal doctrine lane based on the kind of shell/runtime pressure they need to resolve.

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine subtree
- **Derived from:** shell safety, terminal ergonomics, portable session, and runtime-shell canonization work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current `shell-and-terminal` lane

---

## Shell-and-Terminal Spine

The `shell-and-terminal` subtree now has a clear doctrinal spine:

1. **Broad shell execution law**
   - `shell-terminal.md`
2. **Terminal environment and high-level posture**
   - `../shell-terminal-mastery.md`
3. **Runtime boundary law**
   - `runtime-shell-governance.md`
4. **Portable session and evidence-capture law**
   - `portable-session-workflows.md`
5. **Cross-lane enforcement links**
   - `../tool-ecosystem/hook-runtime-patterns.md`
   - `../../rules/shell-safety/non-destructive-defaults.md`

The doctrine is:
- shell reasoning should move from broad shell law → terminal/runtime posture → session/evidence workflow → lifecycle or safety enforcement when needed
- not jump straight into clever commands or automation just because the shell can execute them

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `shell-terminal.md` | Broad shell scripting and command-execution doctrine | you need the shell model first |
| `../shell-terminal-mastery.md` | High-level terminal posture and environment strategy | the issue is more about terminal environment or operator ergonomics than scripting law alone |
| `runtime-shell-governance.md` | Doctrine for what shell behavior belongs in the runtime shell versus doctrine-only | the question is about commands/hooks/rules boundaries for shell work |
| `portable-session-workflows.md` | Doctrine for tmux/session/evidence/portable workflow design | the task spans sessions, panes, logs, or portable operational continuity |

---

## Reading Paths

### If you need the broad model first

1. `shell-terminal.md`
2. `../shell-terminal-mastery.md`
3. `runtime-shell-governance.md`
4. then branch by the actual shell pressure

### If the task is about shell scripting posture

1. `shell-terminal.md`
2. `runtime-shell-governance.md`
3. `../../rules/shell-safety/non-destructive-defaults.md` if mutation or risk is involved

### If the task is about terminal ergonomics or environment strategy

1. `../shell-terminal-mastery.md`
2. `shell-terminal.md`
3. `portable-session-workflows.md` if the issue expands into session continuity or evidence capture

### If the task is about session continuity, tmux, or evidence capture

1. `portable-session-workflows.md`
2. `runtime-shell-governance.md`
3. `../tool-ecosystem/hook-runtime-patterns.md` if lifecycle timing or preservation hooks become part of the solution

### If the task is about shell logic in commands vs hooks vs doctrine

1. `runtime-shell-governance.md`
2. `../tool-ecosystem/INDEX.md`
3. `../../rules/shell-safety/non-destructive-defaults.md`
4. then route back into the specific shell doctrine page being operationalized

### If the task is about high-blast-radius shell behavior

1. `runtime-shell-governance.md`
2. `../../rules/shell-safety/non-destructive-defaults.md`
3. `shell-terminal.md`
4. only then decide whether commands or hooks should exist at all

---

## Shell-and-Terminal Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **shell scripting law**, **terminal environment posture**, **session continuity**, **runtime-shell boundaries**, or **safety enforcement**?
2. Is this still a doctrine-first shell question, or already a tool-ecosystem/runtime-shell design question disguised as one?
3. Do we need the broad shell law first, or are we already certain the issue is session- or runtime-governance-specific?
4. Is the goal to explain, to route, to preserve, or to constrain?

The doctrine is:
- shell-and-terminal docs are organized by shell/runtime pressure and lifecycle pressure
- not by whichever command syntax happens to be top-of-mind

---

## Cross-Links

Shell-and-terminal doctrine overlaps naturally with these lanes:

- **Tool ecosystem**
  - `../tool-ecosystem/INDEX.md`
  - `../tool-ecosystem/hook-runtime-patterns.md`
  - `../tool-ecosystem/component-model.md`
- **Root references**
  - `../INDEX.md`
- **Root runtime shell**
  - `../../commands/prime/tool-runtime.md`
  - `../../commands/prime/shell-and-terminal-surface.md`
  - `../../agents/shell-terminal-diagnostician.md`
- **Shell safety rules**
  - `../../rules/shell-safety/non-destructive-defaults.md`

The doctrine is:
- shell-and-terminal is where shell/runtime truth becomes explicit inside `developer-tool`
- so it must remain connected to runtime-shell architecture, lifecycle hooks, and shell-safety rules rather than pretending shell doctrine is isolated from execution surfaces

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- runtime-aware and safety-aware cross-links

It should **not** depend on donor skill bundles or legacy shell notes as the main reading flow.

---

## Final Rule

The reusable lesson is not:
> “shell-and-terminal is where the shell docs live.”

The reusable lesson is:
> “the `shell-and-terminal` subtree is the canonical navigation layer for shell and terminal truth inside `developer-tool`—routing engineers from broad shell law into the exact terminal, session, runtime-governance, or safety doctrine they need before shell behavior is allowed to harden into automation.”
