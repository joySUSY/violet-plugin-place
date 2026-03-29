# Agent Type Selection Guide

## Purpose

Define the canonical doctrine for selecting the right agent or teammate type inside `developer-tool` workflows.

This document is not just a static matrix of agent names.
It exists to answer a more important routing question:

> when work is about to be delegated, which kind of agent should own it, and what should that choice imply about tool access, autonomy, context isolation, and expected output?

It focuses on:
- read-only vs write-capable agents
- research vs planning vs implementation vs review roles
- teammate specialization
- when to escalate from a single agent to a multi-agent team

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis and tool-ecosystem doctrine cluster
- **Derived from:** absorbed multi-agent coordination, team-review, debugging, and agent-routing donor families plus the canonical component-model passes
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local agent-routing doctrine aligned to the current developer-tool engine

---

## Core Rule

Agent selection is a routing decision about **task shape**, not a branding decision about role names.

A strong routing decision should answer:
- does the task need to write or only inspect?
- is the goal exploration, planning, implementation, review, or coordination?
- does the task benefit from isolated specialist context?
- is one agent enough, or does the work need a team topology?

The goal is not to use the fanciest agent.
The goal is to choose the smallest agent shape that preserves the task honestly.

---

## Agent Selection Matrix

| Agent Type | Best For | Tool Posture |
|---|---|---|
| `Explore` | codebase research, discovery, dependency mapping, investigation without mutation | read-only |
| `Plan` | design, architecture decomposition, implementation planning | read-only |
| `general-purpose` | mixed or one-off tasks that need full flexibility | read + write |
| `agent-teams:team-reviewer` | structured code review with explicit review lens | read + write when needed for review artifacts |
| `agent-teams:team-debugger` | evidence-driven bug investigation and causal analysis | read + targeted write if investigation needs artifacts |
| `agent-teams:team-implementer` | bounded implementation work within a clear contract | read + write |
| `agent-teams:team-lead` | coordination, decomposition, synthesis, arbitration | read + write + orchestration |

The names are useful shorthands.  
But the real routing logic is about the job each agent is expected to perform.

---

## Pattern 1 — Read-Only vs Write-Capable Is the First Split

One of the clearest routing questions is:
- should this agent only inspect?
- or should it change the system?

This matters because many tasks feel “implementation-adjacent” while actually being:
- discovery
- diagnosis
- planning
- audit

The doctrine is:
- if mutation is not needed, prefer read-only agents
- grant write/edit capability only when it is part of the task's honest boundary

This reduces both blast radius and cognitive noise.

---

## Pattern 2 — Exploration and Planning Are Different Kinds of Read-Only Work

`Explore` and `Plan` may both be read-only, but they serve different purposes.

### Explore
Use for:
- locating files and patterns
- mapping dependencies
- tracing flows
- collecting evidence
- understanding current system shape

### Plan
Use for:
- deciding what should happen next
- decomposing work into steps
- proposing architecture or task structure
- evaluating trade-offs before implementation

The doctrine is:
- exploration discovers the terrain
- planning chooses the path

They should not be treated as interchangeable.

---

## Pattern 3 — General-Purpose Agents Are Useful, But Should Not Swallow Specialist Work

A `general-purpose` agent is appropriate when:
- the task is one-off and not worth specialized routing
- the workflow truly needs a flexible tool mix
- the task spans exploration + planning + implementation tightly in one bounded unit

But using `general-purpose` for everything erodes the value of specialization.

The doctrine is:
- use general-purpose for ambiguity or mixed work
- prefer specialists when the task shape is already known

---

## Pattern 4 — Reviewer Agents Exist to Narrow the Review Lens

A reviewer agent is strongest when it has a clear review dimension.

Examples:
- architecture review
- code quality review
- security review
- correctness review
- performance review

The doctrine is:
- review agents should produce structured findings, not vague opinions
- their power comes from narrowed attention and repeatable heuristics

Using a generic implementer as reviewer weakens review quality because the review lens is not made explicit.

---

## Pattern 5 — Debugger Agents Exist to Compete Hypotheses, Not Guess Faster

A debugger agent is appropriate when the task is:
- root cause analysis
- evidence gathering
- hypothesis testing
- causal chain reconstruction

The doctrine is:
- a debugger agent should behave more like an investigator than a coder
- fixes come after evidence, not before it

This is why debugger routing should remain close to `hypothesis-testing.md` and `code-quality-analysis.md`.

---

## Pattern 6 — Implementer Agents Need Clear Ownership Boundaries

A team implementer is strongest when:
- the work unit is bounded
- interfaces or contracts are already known
- file ownership or module ownership is reasonably clear
- integration points are explicit

The doctrine is:
- implementers should not be sent into a fuzzy, undefined space and told to improvise the whole system
- implementation agents work best when the boundary has already been clarified by exploration or planning

This is what makes implementation delegation safe rather than chaotic.

---

## Pattern 7 — Team Leads Are for Orchestration, Not Domain Monopolies

A `team-lead` agent is appropriate when the problem is not one task, but many interacting tasks.

Good uses:
- decomposing work
- sequencing teammates
- synthesizing results
- resolving conflicts between findings or outputs
- deciding when to stop parallel work and converge

The doctrine is:
- the team lead owns coordination truth
- it should not try to swallow all specialist reasoning itself

A good lead amplifies specialists; it does not replace them.

---

## Pattern 8 — Multi-Agent Teams Should Be Chosen Only When Coordination Cost Is Justified

A team topology helps when:
- tasks are meaningfully parallelizable
- different specialists can investigate or build independently
- synthesis benefits from multiple perspectives
- failure or review quality improves from separation of concerns

It does **not** help when:
- the task is sequential and tiny
- everything touches the same files heavily
- the coordination overhead exceeds the actual work

The doctrine is:
- form a team when the topology reduces total complexity
- not when it only creates the appearance of sophistication

---

## Pattern 9 — Agent Type Selection Should Reduce the Next Ambiguity

A good routing choice should reduce one of these uncertainties immediately:
- who should do this?
- can they safely edit?
- what kind of output should come back?
- do we need evidence, a plan, a fix, or a review?
- is this still one task or already a team problem?

If selecting an agent does not reduce ambiguity, the routing model is still too fuzzy.

---

## Common Misroutes

| Misroute | Why It Fails | Better Choice |
|---|---|---|
| using `Explore` for implementation | read-only agent cannot complete mutating work honestly | `general-purpose` or `team-implementer` |
| using `Plan` for coding tasks | planning agent should not become ad hoc implementer by default | `general-purpose` or `team-implementer` |
| using `general-purpose` for structured review | review lens is too vague | `team-reviewer` |
| using `team-implementer` for open-ended research | wrong tool posture and wrong success shape | `Explore` |
| using `team-lead` to do everyone's work | orchestration disappears into a monolith | keep lead for coordination and launch specialists |

---

## Agent Routing Checklist

Before choosing an agent type, ask:

- [ ] Does this task need mutation or only inspection?
- [ ] Is the task primarily exploration, planning, implementation, review, debugging, or coordination?
- [ ] Would a specialist reduce ambiguity more than a generalist?
- [ ] Is the work unit bounded enough for delegation?
- [ ] Is this still a single-agent task, or has it become a team-topology problem?

---

## Anti-Patterns

- picking agents by name familiarity rather than task shape
- giving write-capable agents work that should stay read-only
- routing structured review into generic implementation agents
- sending implementers into undefined tasks with no boundary clarity
- creating multi-agent teams for work that is too small or too entangled
- using team leads as universal experts instead of coordinators

---

## Cross-Links

Read this alongside:
- `agentic-system-basis/agentic-systems.md`
- `agentic-system-basis/ensemble-team-governance.md`
- `tool-ecosystem/component-model.md`
- `code-quality-analysis.md`
- `hypothesis-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “memorize which agent type to pick for each situation.”

The reusable lesson is:
> “select agent types by task shape: distinguish read-only from write-capable work, investigation from planning, implementation from review, and single-agent work from true team topologies—so delegation reduces ambiguity instead of multiplying it.”
