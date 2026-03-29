# Agentic System Basis

## Purpose

Define the canonical root doctrine for agentic-system design inside `developer-tool`.

This document is the broad entrypoint for understanding how a coding/runtime agent system should be structured, activated, and governed.

It is not merely a feature list for one harness.
It exists to answer a higher-order question:

> what turns an LLM-powered coding assistant from a chat surface into a programmable engineering system with explicit knowledge routing, controlled execution, and governed coordination?

It covers:
- cognitive/runtime layers
- activation and routing
- plugin and shell surfaces
- MCP integration posture
- multi-agent coordination
- continuity and learning loops

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis and runtime-shell doctrine cluster
- **Derived from:** absorbed Claude/agent-runtime, orchestration, plugin-shell, and multi-agent donor families plus the canonicalization work across heavy-engine shells
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local root doctrine aligned to the current developer-tool engine

---

## Core Rule

An agentic system is a governed execution architecture, not merely an interface that can answer questions.

A mature agentic system should make these things explicit:
- what context enters the system and in what order
- what knowledge is always available vs selectively activated
- what tools and runtime surfaces exist
- how the system verifies its own work
- how roles, subagents, or teams are activated and bounded
- how learning and continuity are preserved across sessions

The goal is not just to be powerful.
The goal is to be structured enough that power remains predictable.

---

## System Layer Model

| Layer | Responsibility |
|---|---|
| User/task intent | the problem being posed |
| Persistent instructions | system prompt, project rules, CLAUDE.md, settings |
| Knowledge routing | skills, references, bridge docs, selective activation |
| Runtime shell | commands, hooks, agents, rules, MCP surfaces |
| Tool execution | actual reads/writes/searches/builds/network calls |
| Verification and reflection | checking outputs, preserving lessons, continuity |

These layers matter because many agentic failures are really just layer confusion.

---

## Pattern 1 — Context Must Enter in a Stable Order

A strong agentic system has a predictable context-loading model.

Typical order:
1. user prompt or task request
2. persistent instructions and settings
3. project-local context
4. relevant doctrine or skills
5. tools and runtime surfaces
6. verification or reflective feedback loops

The doctrine is:
- context should be layered intentionally
- not accumulated opportunistically until the window is full and the system becomes noisy

Predictable loading order is what makes agent behavior understandable and tunable.

---

## Pattern 2 — Knowledge and Runtime Must Remain Distinct

One of the most important rules in `developer-tool` is that doctrine and runtime are not the same layer.

### Doctrine owns
- explanation
- policy
- routing
- design truth
- canonical reading paths

### Runtime owns
- commands
- agents
- hooks
- MCP server usage
- lifecycle automation

The doctrine is:
- knowledge should tell the system what correct behavior means
- runtime should help the system enact that behavior selectively

This separation prevents shells from becoming unmaintainable second doctrine centers.

---

## Pattern 3 — Activation Should Be Selective, Not Omnipresent

A mature agentic system does not dump its entire knowledge model into every task.

Good activation is:
- selective
- domain-aware
- reversible
- proportionate to the task

Examples:
- bridge skill activation for the right lane
- prime/route commands to establish posture
- lightweight hooks that preserve continuity or validate high-risk actions

The doctrine is:
- activate the smallest useful set of knowledge and runtime surfaces that make the task safer or clearer
- not the entire engine at once

This is the foundation of heavy-engine usability.

---

## Pattern 4 — Plugin Shells Are Runtime Containers for Heavy Domains

When a domain becomes large enough, a plain skill is too weak a final container.

Signals include:
- multiple doctrine subtrees
- hooks/commands/agents all needed
- lifecycle behavior matters
- selective activation matters
- stable law docs are needed
- large donor reservoirs must be curated before runtime use

The doctrine is:
- heavy domains should converge on coherent plugin shells
- but those shells must remain consumers of doctrine, not replacements for it

This is the logic behind the plugin-first move for heavy engines.

---

## Pattern 5 — MCP Is a Leverage Surface, Not a Default Assumption

MCP becomes valuable when the system benefits from:
- external structured search
- tool/data/resource integration
- service-boundary access
- diagram/doc/runtime coordination

The doctrine is:
- MCP should be introduced where it creates repeated leverage
- not merely because it looks architecturally advanced

An agentic system should degrade gracefully without optional MCP enhancements unless the capability is truly core.

---

## Pattern 6 — Agent Teams Should Be Chosen by Topology, Not by Excitement

A system can use:
- a single runtime agent
- a specialist subagent
- a coordinated ensemble or team topology

The right choice depends on:
- whether the work is bounded or decomposable
- whether parallel perspectives help
- whether coordination cost is justified
- whether specialist context isolation improves output quality

The doctrine is:
- use teams when coordination structure reduces complexity
- not when it only creates the appearance of sophistication

This keeps orchestration honest.

---

## Pattern 7 — Coordinator Roles Are Architectural, Not Merely Procedural

In multi-agent systems, coordination should be explicit.

The coordinator or lead should own:
- task decomposition
- sequencing
- handoff contracts
- result synthesis
- conflict resolution

The coordinator should not silently absorb all specialist reasoning.

The doctrine is:
- orchestration is its own surface with its own responsibilities
- it should amplify specialists, not erase them

This mirrors the same rule used in plugin runtime shells.

---

## Pattern 8 — Verification Is Part of the Agentic Loop, Not the Final Decoration

An agentic system becomes trustworthy when verification is structural.

Useful verification layers include:
- tool-result checking
- structured output validation
- review/audit agents
- stop-time completeness checks
- regression tests or build/test proofs where applicable
- evidence capture for difficult failures

The doctrine is:
- execution without verification is only automation
- execution with verification becomes governed engineering

This is what prevents agentic systems from becoming optimistic script launchers.

---

## Pattern 9 — Continuity and Memory Are Runtime Stability Features

Context compaction, session restart, and long-running workflows create failure risk.

A healthy agentic system should explicitly support:
- working-state preservation
- self-reminder or re-read discipline
- recall-before-act posture where needed
- separation of memory doctrine vs memory automation

The doctrine is:
- continuity is not “nice to have” in long-running agentic work
- it is part of making the system reliable over time

This is why memory systems sit close to the control plane rather than being treated as optional add-ons.

---

## Pattern 10 — Learning Loops Must Produce Better Structure, Not Just More Logs

A strong agentic system should learn from:
- repeated corrections
- failed runs
- workflow friction
- recurring design patterns

But those learnings should become:
- improved doctrine
- stronger bridge skills
- sharper runtime routes
- better checklists or guardrails

The doctrine is:
- reflection should compress into better structure
- not accumulate as ungoverned transcript sediment

This is the architecture of continuous improvement.

---

## Pattern 11 — The System Should Make the Right Surface Easier Than the Wrong One

This is the deepest usability rule.

A good agentic system helps users and future agents know:
- where to start
- when to read doctrine
- when to invoke a command
- when to use a specialist agent
- when to stay out of runtime and just learn first

The doctrine is:
- agentic power should reduce ambiguity
- not require a power-user to memorize hidden activation maps

This is why indexes, bridge skills, runtime commands, and shell laws all matter together.

---

## Pattern 12 — Some Automation Should Be Refused or Deferred

Not every desirable automation belongs in the system immediately.

Defer or reject automation when:
- the doctrine is still unstable
- failure modes are poorly understood
- the blast radius is too large
- lifecycle enforcement would feel oppressive or noisy
- the capability is still better expressed as a reference or manual workflow

The doctrine is:
- maturity means knowing when not to automate yet
- not trying to encode every good idea into hooks or agents prematurely

---

## Agentic System Checklist

Before calling an agentic system healthy, ask:

- [ ] Is the context-loading order explicit enough to reason about?
- [ ] Are doctrine and runtime kept distinct?
- [ ] Is activation selective rather than omnipresent?
- [ ] Are plugin shells used only where domain complexity justifies them?
- [ ] Are MCP, subagents, or teams used for leverage rather than prestige?
- [ ] Is verification part of the loop rather than a final afterthought?
- [ ] Do continuity and learning loops produce stronger structure over time?

---

## Anti-Patterns

- treating the system like a chat surface with hidden power instead of an architecture
- blending doctrine and runtime into one noisy layer
- activating too much context all the time
- introducing agent teams where a single bounded agent would be clearer
- using hooks or MCP to hide complexity rather than manage it
- accumulating reflection or memory without structural promotion
- automating high-risk behavior before failure modes are actually understood

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `activation-model.md`
- `runtime-activation-patterns.md`
- `ensemble-team-governance.md`
- `../plugin-runtime-overview.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “an agentic system combines prompts, skills, tools, plugins, and agents.”

The reusable lesson is:
> “an agentic system is a governed execution architecture: context enters in layers, doctrine and runtime stay distinct, activation stays selective, orchestration remains explicit, and verification plus continuity loops keep the system trustworthy over time instead of merely powerful in the moment.”

- a specialist subagent
- a coordinated ensemble or team topology

The right choice depends on:
- whether the work is bounded or decomposable
- whether parallel perspectives help
- whether coordination cost is justified
- whether specialist context isolation improves output quality

The doctrine is:
- use teams when coordination structure reduces complexity
- not when it only creates the appearance of sophistication

This keeps orchestration honest.

---

## Pattern 7 — Coordinator Roles Are Architectural, Not Merely Procedural

In multi-agent systems, coordination should be explicit.

The coordinator or lead should own:
- task decomposition
- sequencing
- handoff contracts
- result synthesis
- conflict resolution

The coordinator should not silently absorb all specialist reasoning.

The doctrine is:
- orchestration is its own surface with its own responsibilities
- it should amplify specialists, not erase them

This mirrors the same rule used in plugin runtime shells.

---

## Pattern 8 — Verification Is Part of the Agentic Loop, Not the Final Decoration

An agentic system becomes trustworthy when verification is structural.

Useful verification layers include:
- tool-result checking
- structured output validation
- review/audit agents
- stop-time completeness checks
- regression tests or build/test proofs where applicable
- evidence capture for difficult failures

The doctrine is:
- execution without verification is only automation
- execution with verification becomes governed engineering

This is what prevents agentic systems from becoming optimistic script launchers.

---

## Pattern 9 — Continuity and Memory Are Runtime Stability Features

Context compaction, session restart, and long-running workflows create failure risk.

A healthy agentic system should explicitly support:
- working-state preservation
- self-reminder or re-read discipline
- recall-before-act posture where needed
- separation of memory doctrine vs memory automation

The doctrine is:
- continuity is not “nice to have” in long-running agentic work
- it is part of making the system reliable over time

This is why memory systems sit close to the control plane rather than being treated as optional add-ons.

---

## Pattern 10 — Learning Loops Must Produce Better Structure, Not Just More Logs

A strong agentic system should learn from:
- repeated corrections
- failed runs
- workflow friction
- recurring design patterns

But those learnings should become:
- improved doctrine
- stronger bridge skills
- sharper runtime routes
- better checklists or guardrails

The doctrine is:
- reflection should compress into better structure
- not accumulate as ungoverned transcript sediment

This is the architecture of continuous improvement.

---

## Pattern 11 — The System Should Make the Right Surface Easier Than the Wrong One

This is the deepest usability rule.

A good agentic system helps users and future agents know:
- where to start
- when to read doctrine
- when to invoke a command
- when to use a specialist agent
- when to stay out of runtime and just learn first

The doctrine is:
- agentic power should reduce ambiguity
- not require a power-user to memorize hidden activation maps

This is why indexes, bridge skills, runtime commands, and shell laws all matter together.

---

## Pattern 12 — Some Automation Should Be Refused or Deferred

Not every desirable automation belongs in the system immediately.

Defer or reject automation when:
- the doctrine is still unstable
- failure modes are poorly understood
- the blast radius is too large
- lifecycle enforcement would feel oppressive or noisy
- the capability is still better expressed as a reference or manual workflow

The doctrine is:
- maturity means knowing when not to automate yet
- not trying to encode every good idea into hooks or agents prematurely

---

## Agentic System Checklist

Before calling an agentic system healthy, ask:

- [ ] Is the context-loading order explicit enough to reason about?
- [ ] Are doctrine and runtime kept distinct?
- [ ] Is activation selective rather than omnipresent?
- [ ] Are plugin shells used only where domain complexity justifies them?
- [ ] Are MCP, subagents, or teams used for leverage rather than prestige?
- [ ] Is verification part of the loop rather than a final afterthought?
- [ ] Do continuity and learning loops produce stronger structure over time?

---

## Anti-Patterns

- treating the system like a chat surface with hidden power instead of an architecture
- blending doctrine and runtime into one noisy layer
- activating too much context all the time
- introducing agent teams where a single bounded agent would be clearer
- using hooks or MCP to hide complexity rather than manage it
- accumulating reflection or memory without structural promotion
- automating high-risk behavior before failure modes are actually understood

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `activation-model.md`
- `runtime-activation-patterns.md`
- `ensemble-team-governance.md`
- `../plugin-runtime-overview.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “an agentic system combines prompts, skills, tools, plugins, and agents.”

The reusable lesson is:
> “an agentic system is a governed execution architecture: context enters in layers, doctrine and runtime stay distinct, activation stays selective, orchestration remains explicit, and verification plus continuity loops keep the system trustworthy over time instead of merely powerful in the moment.”
