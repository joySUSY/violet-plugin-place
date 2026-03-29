# Shell Runtime Governance

## Purpose

Define what shell-and-terminal behavior belongs in the `developer-tool` runtime shell and what must remain doctrine-only.

This is important because shell work is high-risk:

- it touches real commands
- it mutates real files
- it often escalates into destructive territory quickly

So the shell must stay disciplined.

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine subtree
- **Derived from:** shell-safety, runtime-boundary, and lifecycle-governance canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local shell-governance doctrine aligned to the current developer-tool engine

---

---

## Core Rule

The runtime shell may support shell work.
It must not replace shell judgment with unsafe automation.

---

## Runtime-Shell Worthy

The shell may own:

- startup priming that reminds the agent to classify shell tasks first
- explicit route commands for choosing the correct shell/tool surface
- bounded audit agents for shell safety review
- conservative lifecycle reminders around non-destructive defaults

Examples:

- prime the shell posture at SessionStart
- route a task into shell-and-terminal doctrine before action
- review whether a shell workflow is too risky to run directly

---

## Doctrine-Only

The shell should not encode all shell wisdom as runtime automation.
The following should remain doctrine-first:

- portability patterns
- quoting discipline
- tmux orchestration patterns
- session logging strategy
- evidence capture practices
- terminal emulator configuration guidance

These belong in canonical references, because they need explanation and trade-offs.

---

## Shell Safety Posture

Shell-facing runtime behavior must default to:

- conservative
- explicit
- dry-run-friendly
- path-safe
- environment-aware

That means:

- no broad wildcards by default
- no silent path rewriting
- no automatic destructive shell execution
- no hidden reliance on local machine quirks

---

## Commands vs Hooks vs Doctrine

### Prefer doctrine when

- the agent needs to understand a shell pattern
- the problem is mostly educational or architectural
- the workflow has trade-offs that need explanation

### Prefer commands when

- the user needs an explicit shell-routing workflow
- the task is operational and named
- the capability should be invoked deliberately

### Prefer hooks when

- lifecycle timing matters
- startup priming or handoff preservation adds reliability
- the hook can stay narrow and lightweight

Hooks should never become giant shell automation engines in wave 1.

---

## High-Blast-Radius Rule

Shell logic that can:

- delete files
- rewrite paths
- mutate system state
- invoke risky external tools

must remain behind explicit choice and conservative review.

In practice:

- doctrine first
- route second
- command third
- destructive execution only after explicit intent and bounded safety posture

---

## Relationship to Existing Rules

This document works with:

- `../../rules/shell-safety/non-destructive-defaults.md`
- `../tool-ecosystem/hook-runtime-patterns.md`
- `../tool-ecosystem/component-model.md`

Use those to answer:

- whether shell logic belongs in a command or hook
- how strong the lifecycle surface should be
- how to keep shell work from escaping runtime boundaries

---

## Practical Law

A good shell runtime surface should make the safe path easier to choose than the unsafe path.

If the shell encourages cleverness before clarity, it is not mature yet.
