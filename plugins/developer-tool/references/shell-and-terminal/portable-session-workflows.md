# Portable Session Workflows

## Purpose

Define the canonical session-oriented shell workflow patterns that survive across environments, shells, and engagement types.

This document synthesizes the useful parts of:

- portable shell discipline
- terminal session management
- tmux orchestration
- evidence capture patterns

without copying donor material directly.

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine subtree
- **Derived from:** portable shell/session/evidence-capture canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local session-workflow doctrine aligned to the current developer-tool engine

---

---

## Core Rule

A portable shell workflow should preserve:

1. reproducibility
2. session continuity
3. command traceability
4. non-destructive defaults

If a shell workflow depends too much on one terminal, one machine, or one unstated assumption, it is not portable enough.

---

## Pattern 1 — Defensive Shell Header

Use a defensive shell posture by default:

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

This is not enough by itself, but it establishes the right baseline.

It should be paired with:

- quoted variables
- dependency validation
- bounded cleanup traps

---

## Pattern 2 — Session as a First-Class Unit

Treat a shell session as a managed work unit.

Good session-oriented workflow:

- name the session
- separate concerns into panes/windows when using tmux
- keep role separation visible
- preserve log output or command history when the task is long-running

Use tmux when:

- the work spans multiple domains
- you need pane-level separation
- the session may need to survive interruption

Do not use tmux just because it looks advanced.

---

## Pattern 3 — Evidence Capture

For workflows that matter operationally, make command execution reconstructable.

Good practice:

- timestamped logs
- labeled outputs
- bounded evidence directories
- explicit capture wrappers

Bad practice:

- relying on terminal scrollback alone
- unlabeled log dumps
- outputs written to ad-hoc untracked temp locations without purpose

---

## Pattern 4 — Portability Over Cleverness

Prefer:

- `$(...)` over backticks
- quoted variables
- feature detection over platform sniffing
- explicit command checks over optimistic assumptions

Examples of portable posture:

- validate `jq` exists before using it
- do not assume one shell-specific feature exists everywhere
- keep shell-specific optimizations documented as shell-specific

---

## Pattern 5 — Separate Terminal Ergonomics from Shell Logic

Terminal emulator configuration and shell scripting are related, but not identical.

### Terminal ergonomics

Examples:

- Ghostty config
- Kitty config
- prompt segments
- cursor mode switching

### Shell logic

Examples:

- command wrappers
- error handling
- evidence capture
- completion logic
- portability discipline

Keep the distinction clear.
Do not embed terminal-aesthetic choices into shell execution doctrine unless they affect behavior.

---

## Pattern 6 — Shell Workflow Decision Matrix

| Situation                    | Preferred Posture                                                |
| ---------------------------- | ---------------------------------------------------------------- |
| simple, local, low-risk task | direct explicit command                                          |
| repeated operational task    | explicit command wrapper or documented procedure                 |
| long multi-domain workflow   | tmux/session workflow                                            |
| high-risk mutation           | doctrine first, route second, command only after explicit review |
| environment-variant behavior | portability-first shell discipline                               |

---

## Pattern 7 — Session Continuity

A portable session workflow should survive:

- temporary interruption
- shell restart
- terminal detachment
- context compaction in the agent layer

This means:

- the shell flow should be describable outside the live terminal
- runtime shell hooks should preserve what lane was active
- the workflow should not depend entirely on ephemeral terminal state

---

## Relationship to Runtime Shell

The runtime shell may:

- prime shell posture
- route into shell doctrine
- remind about handoff state
- review shell safety boundaries

The runtime shell should not:

- auto-run a complex tmux orchestration by surprise
- silently capture broad evidence sets
- mutate the local environment without explicit need

---

## Practical Law

Portable shell workflows should be easier to resume, audit, and explain than improvised one-liners.

If a workflow is fast but cannot be reconstructed or resumed safely, it is still weak engineering.
