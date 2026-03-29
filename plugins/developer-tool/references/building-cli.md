# Building Elite CLIs

## Purpose

Define the canonical doctrine for building command-line interfaces inside `developer-tool`.

This document treats CLI work as a product-boundary discipline, not as a thin wrapper around business logic.
It answers the key question:

> what makes a CLI trustworthy, composable, and pleasant enough that it becomes a force multiplier instead of a force subtractor?

## Source Provenance

- **Primary source:** current `developer-tool` CLI/terminal/scaffolding doctrine cluster
- **Derived from:** absorbed CLI-focused donor families plus the ongoing canonicalization of developer-tool runtime and project-setup doctrine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local CLI doctrine aligned to the current developer-tool engine

---

## Core Rule

A CLI is a user experience and systems-contract surface before it is a parser configuration problem.

A strong CLI should make these things obvious:
- what the command does
- how to invoke it correctly
- what output is for humans vs machines
- whether the operation succeeded or failed
- how it composes with shells, scripts, and automation

Good CLI engineering is not only about having flags and subcommands.
It is about being predictable under pressure.

---

## CLI Contract Surfaces

| Surface | What it must guarantee |
|---|---|
| Input model | flags, subcommands, positional args, defaults, validation |
| Output model | machine-readable data on stdout, human diagnostics on stderr |
| Exit model | accurate exit codes for success, usage errors, and failures |
| UX model | discoverability, clear help, color/verbosity discipline |
| Automation model | composable behavior in scripts and pipelines |

These surfaces together define whether a CLI feels professional.

---

## Pattern 1 — Treat CLI Design as UX Before Framework Selection

The first question is not:
> should we use clap, Click, commander, or Cobra?

The first question is:
> what interaction contract does the user need?

That means deciding:
- who the CLI is for
- whether it is primarily human-facing, machine-facing, or both
- whether it is a single-purpose tool or a command suite
- how frequently it will be scripted or piped

Framework choice should follow from the UX contract, not lead it.

---

## Pattern 2 — Stdout and Stderr Must Mean Different Things

A serious CLI keeps its data contract clean.

### stdout
Use for:
- actual program output
- machine-readable JSON/text
- the data another process is supposed to consume

### stderr
Use for:
- warnings
- progress
- diagnostics
- human explanation of failure

This distinction matters because a tool that mixes logs and data on stdout becomes unreliable in automation immediately.

The doctrine is:
- if output is supposed to be piped, stdout should stay clean
- diagnostics belong on stderr

---

## Pattern 3 — Exit Codes Are Part of the API

A CLI does not finish when it prints text.
It finishes when it returns an exit status that scripts can trust.

Useful baseline posture:
- `0` -> success
- non-zero -> some category of failure
- usage/argument errors should be distinguishable where the framework/runtime makes that clear
- interruption should not masquerade as success

The exact exit taxonomy may vary, but the doctrine is stable:
- exit behavior is part of the contract surface
- never let a failed operation accidentally look successful to automation

---

## Pattern 4 — Flags and Subcommands Should Be Predictable, Not Clever

A good CLI command model is discoverable.

Healthy defaults:
- short flags for common quick operations
- long flags for readability and scripts
- subcommands for distinct operation families
- clear defaults documented or surfaced in help output
- argument validation close to the edge

The goal is not to invent a novel interaction grammar.
The goal is to make the user's mental model converge quickly.

---

## Pattern 5 — Help Output Is Part of the Product Surface

Help text is not filler.
It is the first documentation many users will see.

A strong help surface should make it easy to learn:
- command purpose
- subcommand structure
- key flags
- examples or next-step hints when needed

This means CLI design is closely tied to documentation doctrine.
If users cannot self-correct from `--help`, the interface is weaker than it should be.

---

## Pattern 6 — Color and Rich UX Must Stay Compatible with Automation

Visual UX matters:
- color improves readability
- progress bars reduce anxiety
- structured status messages help humans track work

But visual polish must not break automation.

Good posture:
- disable color or rich terminal effects when not attached to a TTY
- offer explicit `--no-color` or equivalent where appropriate
- keep machine output modes plain and stable

The lesson is:
- rich UX is good when it is situationally honest
- it is bad when it pollutes scripted consumption

---

## Pattern 7 — Verbosity and Logging Need Clear Levels

Users should be able to control how noisy the tool is.

Typical useful distinctions:
- quiet/minimal mode
- normal informative mode
- verbose/debug mode

A CLI that always prints everything is exhausting.
A CLI that hides too much is hard to trust.

The doctrine is:
- verbosity is a user-facing contract, not an afterthought
- make the normal path calm and the diagnostic path available

---

## Pattern 8 — CLI Tools Must Compose Well with Shell Workflows

A good CLI is a good shell citizen.
That usually means:
- stable exit behavior
- no noisy stdout pollution
- predictable argument parsing
- consistent output modes
- easy piping and redirection

If a tool cannot be used cleanly in shell workflows, it is not fully mature as a developer tool.

This is why CLI doctrine belongs close to shell-and-terminal doctrine.

---

## Pattern 9 — Explicit Output Modes Are Better Than Heuristics Alone

When a CLI serves both humans and machines, explicit output modes help.

Examples:
- human-readable default + `--json`
- table mode + raw mode
- summary mode + verbose diagnostic mode

The point is to avoid making the consumer guess what the output shape is intended for.

A stable machine mode is one of the strongest trust signals a CLI can offer.

---

## Pattern 10 — Scaffolding and Testing Matter for CLI Trust

A serious CLI should usually have:
- a thin entrypoint
- commands separated from core logic
- testable handlers/use-cases beneath the CLI surface
- integration tests for actual invocation behavior

This is where CLI doctrine overlaps with project scaffolding doctrine.
The CLI is a boundary, and boundaries deserve tests and structure.

---

## Pattern 11 — Framework Choice Still Matters, But Only After Contract Clarity

Once the CLI contract is clear, choose the framework that best supports it.

Examples of useful trade-offs:
- stronger type-safe/compiled CLIs for performance-critical tooling
- rapid iteration frameworks for scripting-heavy ecosystems
- minimal parsers for tiny utilities
- fuller suites for command-family products with completions/help/manpage needs

Framework choice is an implementation decision.
The CLI contract is the architectural decision.

---

## Elite CLI Checklist

Before calling a CLI well-designed, ask:

- [ ] Is the command model discoverable and predictable?
- [ ] Is stdout reserved for real output and stderr for diagnostics?
- [ ] Are exit codes trustworthy for automation?
- [ ] Does the tool behave well in shell pipelines?
- [ ] Are help text, verbosity, and color modes usable without breaking machine consumption?
- [ ] Is the CLI boundary tested, not only the internal functions?

---

## Anti-Patterns

- logging and data mixed together on stdout
- success exit codes on failure paths
- clever or inconsistent flag/subcommand grammar
- rich terminal output forced into redirected or machine-facing contexts
- CLI entrypoints full of business logic
- no explicit machine-readable output mode for tools that clearly need one

---

## Cross-Links

Read this alongside:
- `project-scaffolding.md`
- `shell-terminal-mastery.md`
- `shell-and-terminal/INDEX.md`
- `build-and-deploy/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “a CLI should have flags, subcommands, and colors.”

The reusable lesson is:
> “an elite CLI is a contract surface: predictable input, clean stdout/stderr separation, trustworthy exit codes, strong help, and script-friendly behavior must all work together so humans and automation can both rely on it.”
