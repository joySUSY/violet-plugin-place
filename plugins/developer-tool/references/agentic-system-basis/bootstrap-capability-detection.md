# Bootstrap Capability Detection

## Purpose

Define the canonical doctrine for bootstrap-time capability discovery inside `developer-tool`.

This document is the startup and onboarding counterpart to the broader agentic-system doctrine.
It answers a specific early-session question:

> before workflow, tooling, or automation posture is chosen, what must the system discover about the project, harness, and available runtime primitives so it can avoid prescribing the wrong process model?

It focuses on:
- project detection
- harness/runtime detection
- capability discovery
- minimal clarifying questions
- non-mutating startup classification

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis and runtime-shell doctrine cluster
- **Derived from:** absorbed bootstrap/onboarding/capability-detection donor families and heavy-engine startup canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local bootstrap doctrine aligned to the current developer-tool engine

---

## Core Rule

Bootstrap should begin with capability discovery, not assumption.

Before recommending workflow, automation, or structure, the system should determine:
1. what kind of project this is
2. what harness/runtime it is operating inside
3. what delegation, runtime, and enforcement primitives are actually available
4. what workflow intensity the project really needs

That is the difference between adaptive onboarding and brittle onboarding.

---

## Bootstrap Surface Map

| Surface | What it must answer |
|---|---|
| Project detection | what ecosystem, repo shape, and artifact structure are present? |
| Harness detection | what host environment and configuration model are active? |
| Capability detection | what skills, commands, hooks, agents, plugins, MCP, and enforcement surfaces are available? |
| Workflow recommendation | what level of structure is proportionate and possible? |
| Question discipline | what still cannot be inferred automatically? |

Bootstrap is strongest when these surfaces are answered in order.

---

## Pattern 1 — Detect the Project Environment First

Before suggesting workflow or structure, establish the project surface.

Useful signals include:
- `package.json` -> JS/TS ecosystem
- `Cargo.toml` -> Rust
- `pyproject.toml` -> Python
- `go.mod` -> Go
- `mix.exs` -> Elixir
- git availability
- existing `CLAUDE.md`, `.claude/`, plugin surfaces, or skill folders
- CI/build files already present in the repo

This is not just convenience.
It prevents the shell from prescribing workflows for the wrong ecosystem.

The doctrine is:
- detect real project artifacts before proposing process
- do not make the user re-explain what the repository is already telling you

---

## Pattern 2 — Detect Harness Capabilities Separately from Project Type

The project language and the harness capability are different questions.

A good bootstrap should determine whether the runtime supports:
- bridge skill loading
- subagents
- agent teams
- hook enforcement
- plugin surfaces
- MCP or adjacent tool surfaces
- task tracking / planning enforcement

The point is to answer:
> what level of structural assistance is actually possible here?

The doctrine is:
- detect what the environment can do before recommending an architecture that depends on unavailable features

This is how one doctrine degrades gracefully across multiple runtimes.

---

## Pattern 3 — Harness Type Shapes Bootstrap Artifacts

A mature bootstrap should generate the right scaffolding for the active harness.

Examples:
- Claude Code -> `CLAUDE.md`, `.claude/` surfaces, hook-aware posture
- plugin-heavy runtime -> plugin shell, command, agent, and hook opportunities
- simpler harness -> doctrine-first posture with lighter automation expectations

The shell should not assume one configuration artifact fits all runtimes.

The doctrine is:
- bootstrap must distinguish between project guidance, harness guidance, runtime surfaces, and optional hardening layers
- otherwise it recommends artifacts that look familiar but do not actually belong to the active environment

---

## Pattern 4 — Ask Fewer, Better Questions

Once the environment and capability baseline are detected, bootstrap should ask only what cannot be inferred safely.

High-value bootstrap questions include:
- what are we trying to do?
- how much process structure is desired?
- what autonomy level is acceptable if stronger automation is available?
- is the target a quick prototype, a stable tool, or a heavy engine?

Low-value bootstrap behavior:
- asking for facts already visible in the repo
- asking many open-ended questions before gathering environment context
- assuming the user wants the heaviest possible workflow by default

The doctrine is:
- ask only for the missing pieces that change the workflow recommendation
- bootstrap questions should reduce ambiguity, not create ceremony

---

## Pattern 5 — Capability-Guided Workflow Recommendation

The bootstrap should recommend workflows proportional to real runtime power.

Examples:
- with team/subagent support -> stronger TDD, parallel review, or ensemble workflows
- without delegation -> guided but lighter workflows
- with hook support -> optional hardening and lifecycle reinforcement
- without hooks -> doctrine-first self-verification posture
- with plugin shell already present -> route into canonical doctrine and surface-specific commands

The doctrine is:
- workflow recommendation must be capability-aware
- not aspirationally designed around features the runtime does not actually have

This same principle underlies heavy-engine plugin-first design.

---

## Pattern 6 — Bootstrap Must Be Non-Mutating by Default

A canonical bootstrap must not silently install, mutate, or harden the environment without explicit user approval.

Good bootstrap behavior:
- detect
- classify
- recommend
- scaffold transparently when asked
- explain next steps

Bad bootstrap behavior:
- surprise installation
- hidden hook registration
- hidden permissions escalation
- silent environment rewrites

The doctrine is:
- bootstrap should reveal the environment truth before it changes anything
- startup trust is lost quickly if detection and mutation are mixed carelessly

---

## Pattern 7 — Bootstrap Is a Control Plane, Not a Wizard

The real value of bootstrap is not that it asks setup questions.
The value is that it produces a stable control-plane interpretation of the environment.

A good bootstrap leaves behind:
- a known project picture
- a known harness picture
- a known capability picture
- a known workflow-mode choice
- a known runtime boundary

That becomes the foundation for everything else.

The doctrine is:
- bootstrap should produce clarity that later commands, routes, and automation can trust
- not just a one-time questionnaire experience

---

## Pattern 8 — Bootstrap Should Prefer Classification Over Premature Prescription

A weak bootstrap says:
- "use this workflow"
- "install this plugin"
- "create these files"

before it has enough evidence.

A stronger bootstrap says:
- "this looks like a Rust-heavy repo with plugin-capable runtime and existing shell surfaces"
- "this appears to be a light project with no need for aggressive automation"
- "this is already partially structured; route into the existing doctrine instead of scaffolding again"

The doctrine is:
- classify first, prescribe second
- avoid premature onboarding scripts masquerading as intelligence

---

## Pattern 9 — Bootstrap Should Reduce the Next Wrong Move

A successful bootstrap should reduce the chance of mistakes such as:
- scaffolding the wrong kind of project structure
- recommending agent-team workflows in an environment with no delegation support
- suggesting plugin-first architecture where a light doctrine-only lane would suffice
- flooding a session with irrelevant startup context

The doctrine is:
- the measure of bootstrap quality is not how much it says
- it is how many wrong early moves it prevents

---

## Pattern 10 — Bootstrap Results Should Be Reusable

A good bootstrap should create outputs that are reusable by future sessions or operators.

Examples:
- a clear working-state note of the detected environment
- a stable control-plane interpretation in a README/CLAUDE-like surface
- a route decision that later commands and bridge skills can assume

The doctrine is:
- bootstrap knowledge should not evaporate the moment setup is complete
- it should compress into durable structure where possible

---

## Bootstrap Checklist

Before calling bootstrap healthy, ask:

- [ ] Have we detected project type before recommending structure?
- [ ] Have we detected harness/runtime capabilities separately from project language?
- [ ] Are we asking only questions that could not be inferred safely?
- [ ] Is the recommended workflow proportional to the detected runtime power?
- [ ] Is the bootstrap remaining non-mutating until explicit approval exists?
- [ ] Does bootstrap leave behind a reusable control-plane interpretation of the environment?

---

## Anti-Patterns

- assuming runtime capabilities from project type alone
- prescribing workflow structure before environment detection
- asking users for facts already available in the repo or harness
- silently mutating the environment during bootstrap
- recommending the heaviest workflow by default
- treating bootstrap as a setup wizard instead of a control-plane classifier

---

## Cross-Links

Read this alongside:
- `agentic-systems.md`
- `activation-model.md`
- `runtime-activation-patterns.md`
- `../plugin-runtime-overview.md`
- `../project-scaffolding.md`
- `../source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “detect the environment, then ask a few questions, then recommend a workflow.”

The reusable lesson is:
> “bootstrap is a capability-discovery discipline: classify the project, harness, and available runtime primitives first; ask only what remains uncertain; and only then recommend a workflow that matches the actual environment instead of the imagined ideal one.”
