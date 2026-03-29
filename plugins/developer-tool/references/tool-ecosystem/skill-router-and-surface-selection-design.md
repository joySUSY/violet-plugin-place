# Skill Router and Surface Selection Design

## Purpose

Define the canonical doctrine for skill routing systems that discover capabilities, read manifests, check policy, select execution surfaces, and log execution.

This is not about one plugin product.
It is about the reusable control-plane lessons behind a router-first skill system.

---

## Source Provenance

- **Primary donor family:** `skill-system-router`
- **Key local donor materials:**
  - `skill-system-router/SKILL.md`
  - `skill-system-router/references/manifest-spec.md`
  - `skill-system-router/scripts/bootstrap.md`
  - `skill-system-router/scripts/session-guard-check.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

A mature skill system should not assume the agent already knows which surface to use.
It should provide a routing layer that can:
- discover available capabilities
- select the right skill or operation
- check policy before side effects
- execute through the right surface
- observe and log non-trivial workflows

The router is therefore a control-plane component, not just a convenience script.

---

## Pattern 1 — Discover First, Execute Second

A strong donor lesson is that the routing system should inspect available skills/capabilities first.

That means:
- maintain an index or manifest surface
- match user goals against capabilities
- decompose complex goals when direct match is unavailable

This prevents one of the most common control-plane failures:
- executing the first vaguely relevant surface without explicit selection discipline

---

## Pattern 2 — Bootstrap Is a One-Time Embedding Move

The donor router treats bootstrap as a special first-run operation.
That is a valuable pattern:
- bootstrap should embed or register the routing system into the project once
- later sessions should discover it automatically

This keeps the operational burden low without pretending the system configures itself magically.

---

## Pattern 3 — Capability Index and Manifest Are Separate Layers

A strong design separates:
- **index** for discovery
- **manifest** for execution detail

The index answers:
- what exists?
- what can do this?

The manifest answers:
- what operations exist?
- what are the effects?
- how do you execute them?
- what schema/contract applies?

That separation is highly reusable and aligns with our general doctrine-first shell law.

---

## Pattern 4 — Policy Check Must Happen Before Effects

The donor router rightly checks declared effects before execution.
This is one of its most important design lessons.

A mature routing layer should know whether an operation might:
- read/write files
- call external processes
- access the network
- modify git state
- touch databases

Then it should compare that against policy before continuing.

This turns skill routing into governed execution rather than blind orchestration.

---

## Pattern 5 — Surface Selection Is Part of Routing

The router is not only choosing a skill.
It is also choosing the correct execution surface.

Examples of surface decisions:
- lightweight direct operation
- multi-step chain
- workflow-assisted plan first
- platform-specific entrypoint
- prompt/agent/command execution path

This is why this doctrine belongs in `tool-ecosystem` rather than only in `agentic-system-basis`.

---

## Pattern 6 — Cross-Platform Entrypoints Need Explicit Modeling

The donor manifest spec includes OS-specific entrypoints.
That is a strong pattern because it makes platform variance explicit.

The lesson is:
- a routing system should not quietly assume one shell/runtime
- if execution differs on Windows vs Unix-like systems, that should be modeled explicitly in manifest/entrypoint design

This aligns with our broader cross-platform rule set.

---

## Pattern 7 — Session Guard Is a Lightweight Coordination Primitive

The donor's session-guard idea is valuable because it enforces one small but important thing:
- router discovery happened before other surfaces are loaded or executed

This is a good example of a low-cost guardrail.
It avoids heavy enforcement while still protecting system coherence.

---

## Pattern 8 — Logging Makes Complex Routing Auditable

For non-trivial workflows, the router should leave behind observable traces.

That may include:
- which skill/operation ran
- duration
- success/failure state
- policy context
- step sequence

The key lesson is not “log everything always.”
It is:
- complex orchestration without observability quickly becomes untrustworthy

---

## Pattern 9 — Improvement Reporting Is a First-Class Loop

A particularly strong donor idea is that the router itself can report reusable gaps:
- missing guardrails
- repeated friction
- unclear docs/entrypoints
- validation weaknesses

This matters because it turns routing from static coordination into a self-improving control plane.

---

## Anti-Patterns

- choosing execution surfaces before discovery
- collapsing index and manifest into one noisy layer
- running effectful operations without policy check
- hiding OS/platform differences
- unlogged complex chains
- treating routing as ad hoc prompt improvisation instead of system design

---

## Why This Matters to `developer-tool`

This doctrine strengthens:
- tool-ecosystem routing surfaces
- command and manifest design
- policy-aware execution governance
- cleanup-safe, cross-platform skill orchestration

It is one of the best donor-derived examples of how a heavy engine can route intelligently without becoming chaotic.
