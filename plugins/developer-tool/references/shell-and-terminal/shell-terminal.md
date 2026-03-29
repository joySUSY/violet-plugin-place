# Shell and Terminal Mastery

## Purpose

Define the canonical doctrine for shell scripting and command execution discipline inside `developer-tool`.

This document is the broad shell lane doctrine.
It focuses on the executable side of shell work:
- script safety
- portability targets
- quoting and expansion discipline
- stdout/stderr/exit contracts
- dependency checks and cleanup behavior
- how shell work should behave under real operational pressure

It complements, but does not replace:
- `../shell-terminal-mastery.md` for terminal environment strategy
- `runtime-shell-governance.md` for runtime-shell policy boundaries
- `portable-session-workflows.md` for session continuity and evidence capture

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine cluster
- **Derived from:** absorbed shell/terminal donors, bash/zsh portability guidance, and the canonical shell-safety/runtime-shell passes
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local shell scripting doctrine aligned to the current developer-tool engine

---

## Core Rule

Shell work is operational programming close to the machine.
That makes it both high-leverage and high-blast-radius.

A strong shell workflow should therefore make:
- intent explicit
- portability target explicit
- output channels clean
- failure behavior trustworthy
- mutation scope bounded
- cleanup and dependencies auditable

The goal is not clever scripting.  
The goal is trustworthy command behavior under pressure.

---

## Boundary of This Document

### This document owns
- shell scripting posture
- command safety and portability
- stdout/stderr/exit discipline in shell workflows
- dependency checks, traps, cleanup, quoting, and execution style
- when a shell workflow is mature enough to trust

### This document does not own
- terminal emulator ergonomics in depth
- plugin runtime lifecycle policy
- long-running session continuity patterns in depth

Those belong primarily to:
- `../shell-terminal-mastery.md`
- `runtime-shell-governance.md`
- `portable-session-workflows.md`

---

## Pattern 1 — Scripts Are Operational Interfaces, Not Scratchpads

A shell script should be treated like a real interface.

That means it should answer:
- what it expects
- what it changes
- what it prints
- how it fails
- what cleanup or rollback assumptions exist

A script that “works on my machine” but hides all of those is not small. It is undocumented risk.

---

## Pattern 2 — Portability Must Be Chosen Deliberately

Shell work often fails when authors mix together:
- bash-only constructs
- zsh assumptions
- POSIX expectations
- platform-specific commands

The doctrine is:
- choose the portability target first
- then write to that target consciously

Examples:
- if the script is bash-only, say so clearly
- if it must be broadly portable, avoid shell-specific luxuries that undermine that goal
- if it depends on a tool (`jq`, `rg`, `tmux`, etc.), validate that dependency explicitly

Do not let portability be accidental.

---

## Pattern 3 — Defensive Headers Establish the Right Baseline, Not Total Safety

A defensive shell header is valuable because it prevents many classes of silent failure.

Common baseline posture includes:
- explicit interpreter declaration
- fail-fast behavior
- safer word splitting

But the doctrine is:
- the header is only the start
- it does not excuse weak quoting, hidden assumptions, or dangerous cleanup logic later in the file

Defensive defaults are good. False confidence is not.

---

## Pattern 4 — Quoting and Expansion Discipline Prevent Ambiguous Behavior

One of the easiest ways shell logic becomes unsafe is loose expansion.

Important questions:
- what is a literal string vs a list of arguments?
- what can contain spaces or special characters?
- what is being glob-expanded unexpectedly?
- what depends on environment state or current directory?

The doctrine is:
- quote by default unless you have a specific reason not to
- treat expansion rules as part of correctness, not style trivia

A shell script that mis-handles spaces, globs, or empty variables is not robust enough for operational use.

---

## Pattern 5 — Stdout, Stderr, and Exit Codes Are Script Contracts

Shell utilities should preserve a clean contract:

### stdout
- actual data meant for composition or capture

### stderr
- diagnostics, warnings, progress, and human-facing explanations

### exit codes
- success/failure contract for other programs, CI, and wrapper scripts

This matters because shell work is often chained into pipelines or automation.
If these channels are mixed carelessly, the script becomes harder to compose and harder to trust.

---

## Pattern 6 — Dependency Validation Belongs Near the Edge

Shell workflows often rely on tools that may or may not exist in the current environment.

Good posture:
- validate required tools early
- fail clearly when they are missing
- make version or environment assumptions explicit when relevant

This reduces the most annoying class of shell failures:
- late failure
- unclear failure
- environment-specific mystery failure

A mature shell workflow fails early with context.

---

## Pattern 7 — Cleanup and Traps Must Be Narrow and Predictable

Cleanup logic is valuable, but dangerous when over-broad.

Questions to ask:
- what exactly are we cleaning up?
- is the cleanup safe if the script partially fails?
- can cleanup accidentally delete or mutate something outside intended scope?
- is the temporary state bounded and named clearly?

The doctrine is:
- trap and cleanup logic should be specific and auditable
- not sweeping and clever

The more destructive the cleanup, the higher the burden of proof.

---

## Pattern 8 — Pipelines and Composition Are First-Class Shell Design Goals

One of shell's greatest strengths is composition.
A good script should behave well when:
- piped
- redirected
- wrapped by another script
- executed in CI/non-interactive environments

The doctrine is:
- command composition is not a bonus feature
- it is part of what makes shell work worth using at all

This also means avoiding unnecessary interactive assumptions in scripts that may run unattended.

---

## Pattern 9 — Interactive and Non-Interactive Shell Modes Must Be Distinguished

Some shell workflows are interactive by nature.  
Some must be automation-safe.

A mature shell posture distinguishes between them clearly.

Examples:
- prompts and confirmations may be appropriate for destructive local actions
- CI scripts should not block on hidden interactive questions
- commands intended for humans may need richer diagnostics than commands intended for pipelines

The wrong move is mixing these modes without signaling which one the script expects.

---

## Pattern 10 — Shell Workflows Need Bounded Blast Radius

Shell mistakes can mutate real systems quickly.
That means good shell engineering favors:
- narrow path scopes
- explicit working directories
- explicit target names
- reviewable destructive steps
- no wildcard or path-rewrite cleverness unless truly justified

This is why shell doctrine stays close to runtime-shell governance and non-destructive defaults.

A shell workflow should make risky actions obvious, not convenient by accident.

---

## Pattern 11 — Good Shell Work Is Explainable Outside the Terminal

A shell workflow is stronger when someone else can reconstruct:
- what commands were intended
- what sequence mattered
- what output indicated success or failure
- what assumptions the script depended on

This is especially important for:
- operational scripts
- deployment helpers
- migration scripts
- long-running maintenance workflows

If the workflow cannot be described clearly outside the live shell session, it is still too fragile.

---

## Shell Discipline Checklist

Before calling a shell workflow healthy, ask:

- [ ] Is the portability target explicit?
- [ ] Are quoting, expansion, and environment assumptions disciplined?
- [ ] Are stdout/stderr/exit-code contracts clean?
- [ ] Are dependencies validated early?
- [ ] Is cleanup narrow and auditable?
- [ ] Does the workflow compose safely in pipelines or automation where needed?
- [ ] Is the blast radius of mutation obvious and bounded?

---

## Anti-Patterns

- scripts treated as disposable scratchpads for critical work
- accidental reliance on shell-specific features with no declared portability target
- unquoted variables and uncontrolled expansion
- noisy stdout that breaks composition
- cleanup traps that are broader than the temporary state they manage
- interactive prompts hidden inside automation-facing scripts
- destructive shell operations made easy through ambiguity

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `runtime-shell-governance.md`
- `portable-session-workflows.md`
- `../shell-terminal-mastery.md`
- `../../rules/shell-safety/non-destructive-defaults.md`
- `../building-cli.md`

---

## Final Doctrine

The reusable lesson is not:
> “use bash carefully and add `set -euo pipefail`.”

The reusable lesson is:
> “shell mastery means designing command workflows as real operational interfaces: portability target, argument expansion, output channels, failure behavior, cleanup scope, and blast radius must all be explicit enough that the workflow is trustworthy under real pressure.”
