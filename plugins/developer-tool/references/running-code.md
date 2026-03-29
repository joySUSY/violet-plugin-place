# Running Code

## Purpose

Define the canonical doctrine for executing code, scripts, and runtime snippets inside `developer-tool` workflows.

This document is not only about one tool's "run code" feature.
It exists to answer a broader operational question:

> when a workflow needs to execute code directly, how do we choose the right execution surface and preserve safety, reproducibility, and interpretability instead of turning execution into opaque improvisation?

It applies to:
- ad hoc script execution
- CLI-driven code runners
- browser/runtime snippet execution
- automation helpers
- temporary diagnostic code

## Source Provenance

- **Primary source:** current `developer-tool` execution / shell / CLI / runtime doctrine cluster
- **Derived from:** absorbed run-code, CLI, shell, browser-automation, and operational-tooling donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local execution doctrine aligned to the current developer-tool engine

---

## Core Rule

Code execution is an operational act, not a convenience toy.

A strong execution posture should make these things clear:
- what runtime is executing the code
- what context the code can access
- whether the execution is exploratory, diagnostic, or production-adjacent
- what side effects may occur
- how the result will be inspected, reused, or discarded

The goal is not merely to "run something quickly."  
The goal is to execute with enough explicitness that the action remains trustworthy.

---

## Execution Surface Map

| Surface | Best For |
|---|---|
| Shell command/script | operational tasks, automation, system interaction |
| CLI subcommand | repeatable explicit user workflows |
| Embedded code runner | bounded programmatic execution in a known runtime |
| Test harness | proving behavior under controlled conditions |
| REPL / exploratory execution | quick understanding, hypothesis checks, prototyping |

The first design question is not "can this run?"  
It is "what is the correct surface for this execution?"

---

## Pattern 1 — Choose the Smallest Honest Execution Surface

Not every action should become a script.  
Not every experiment should become a command.  
Not every temporary snippet deserves to be checked in.

Good questions:
- is this a one-off exploratory check?
- is this a repeatable workflow that should become a CLI command?
- is this actually a test and should live in a test harness?
- is this operational automation that belongs in a script or deployment workflow?

The doctrine is:
- use the smallest surface that preserves the work honestly
- avoid both over-engineering and ephemeral chaos

---

## Pattern 2 — Execution Context Must Be Explicit

When code is run, the operator should be able to answer:
- what runtime am I in?
- what objects or capabilities are available?
- what working directory or environment is assumed?
- what permissions or side effects are possible?

This matters because the same code means different things in:
- a browser page context
- a local shell
- a project CLI runner
- a CI environment
- a sandboxed or restricted runtime

Execution without explicit context is one of the fastest paths to misunderstanding results.

---

## Pattern 3 — Exploratory Execution and Repeatable Execution Should Diverge Quickly

Ad hoc execution is often useful for:
- exploring an API
- validating an assumption
- reproducing a bug
- testing a small interaction

But once a snippet becomes:
- important
- repeated
- shared
- relied on in debugging or operations

it should graduate into a better surface such as:
- a script
- a command
- a test
- a documented procedure

The doctrine is:
- exploration is healthy
- relying on unexplained one-off execution forever is not

---

## Pattern 4 — Side Effects Must Be Visible Before Execution

Before running code, know whether it can:
- mutate files
- trigger network requests
- write external state
- alter browser/session/app state
- persist data
- change credentials, permissions, or environment configuration

A mature execution surface should make side effects legible.
If the side effects are surprising, the execution interface is too weak.

This is especially important in browser automation and operational tooling.

---

## Pattern 5 — Code Execution for Diagnosis Should Preserve Evidence

When execution is used for debugging or analysis, the run should help preserve reasoning.

Useful outputs may include:
- return values
- logs
- screenshots or snapshots
- captured errors/exceptions
- environment state
- reproducer scripts or commands

The doctrine is:
- if an execution result matters to the investigation, it should be explainable afterward
- not trapped in ephemeral terminal or browser state alone

This connects directly to hypothesis testing and code quality analysis.

---

## Pattern 6 — Execution Surfaces Should Prefer Explicit Inputs Over Hidden Ambient State

A fragile execution pattern depends too much on:
- current shell state
- hidden browser state
- undocumented local files
- globally installed tools with assumed versions
- magical environment variables

A stronger execution pattern prefers:
- explicit arguments
- clear file paths
- documented runtime prerequisites
- visible environment setup

The point is not to eliminate convenience.
The point is to reduce invisible dependencies that make results hard to reproduce.

---

## Pattern 7 — Browser and Runtime Snippet Execution Needs Boundary Awareness

When code runs inside a browser page, a REPL, or another embedded runtime, the boundary matters.

Examples of boundary questions:
- are we executing in page context or host context?
- can the code access DOM, clipboard, geolocation, or storage state?
- do permissions need to be granted explicitly?
- what waits, frames, or navigation states must be stabilized first?

This is why embedded execution needs stronger context discipline than people often assume.
It is not just "paste code and see what happens."

---

## Pattern 8 — Reproducibility Should Increase As Execution Becomes More Important

A one-line exploratory check may be okay once.  
A team-facing or incident-facing execution path needs more structure.

Useful escalation path:
1. one-off exploratory snippet
2. reproducible command or saved snippet
3. proper script or command surface
4. test or documented operational workflow if the behavior is critical

The doctrine is:
- the more important the execution becomes, the less it should depend on memory and improvisation

---

## Pattern 9 — Running Code Is Often a Routing Decision, Not an End State

Sometimes the right answer to "run code" is actually:
- write a test
- add a CLI command
- create a migration script
- use an existing automation surface
- route into shell doctrine or build/deploy doctrine instead

Execution is a means.
The developer-tool system should help determine when that means should become a more permanent workflow artifact.

---

## Pattern 10 — Good Execution Surfaces Reduce Operator Ambiguity

A strong execution surface should answer, with minimal effort:
- where the code runs
- what it touches
- how success/failure is represented
- whether the output is for humans or machines
- how to run it again later if needed

That is what turns execution from a gamble into an engineering tool.

---

## Running Code Checklist

Before calling an execution workflow healthy, ask:

- [ ] Is the execution surface the smallest honest one for this task?
- [ ] Is the runtime/context explicit?
- [ ] Are side effects visible before execution?
- [ ] Can important results be inspected and explained afterward?
- [ ] Are hidden environment assumptions minimized?
- [ ] If this run matters repeatedly, should it become a script, command, or test instead?

---

## Anti-Patterns

- relying on one-off snippets for repeated operational work
- running code with hidden permissions or ambient state assumptions
- exploratory execution that leaves no usable reasoning trail
- using embedded execution when a proper test or command surface should exist
- treating browser/runtime context as obvious when it is actually ambiguous
- execution surfaces whose side effects are only discovered after the fact

---

## Cross-Links

Read this alongside:
- `shell-and-terminal/shell-terminal.md`
- `plugin-runtime-overview.md`
- `building-cli.md`
- `code-quality-analysis.md`
- `hypothesis-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “running code is just a more powerful way to automate a task.”

The reusable lesson is:
> “code execution should be treated as an explicit operational surface: choose the right execution boundary, make context and side effects visible, preserve evidence when it matters, and promote repeated runs into more trustworthy artifacts instead of leaving them as improvisation.”
