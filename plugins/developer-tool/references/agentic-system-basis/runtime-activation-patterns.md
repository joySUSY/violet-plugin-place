# Runtime Activation Patterns

## Purpose

Define the canonical runtime doctrine for how a heavy engine shell should activate its doctrine, commands, agents, hooks, and other execution surfaces without flooding every session.

This document is more operational than `activation-model.md`.
It answers the question:

> once a lane has been correctly identified, how should runtime activation escalate across available surfaces so the shell stays useful, selective, and predictable?

It turns the abstract idea of “knowledge injection” into a bounded runtime model.

## Source Provenance

- **Primary source:** current `developer-tool` runtime-shell and agentic-system-basis doctrine cluster
- **Derived from:** plugin-first shell activation work, route/prime/audit command patterns, and lifecycle-bound runtime decisions during heavy-engine canonization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local runtime activation doctrine aligned to the current developer-tool engine

---

## Core Rule

Runtime activation should be:
- selective
- surface-aware
- reversible
- conservative
- proportionate to task risk and scope

It should **not** be:
- constant noise
- full doctrine dumping
- a replacement for thinking
- hidden automation that bypasses task classification

The goal is not maximum runtime cleverness.
The goal is to make the correct support surface easier to reach than the wrong one.

---

## Runtime Surface Hierarchy

| Surface | Activation Role |
|---|---|
| References / doctrine | canonical design truth |
| Skills / bridge skills | light routing and reusable knowledge loading |
| Commands | explicit operational entrypoints |
| Agents | bounded specialist reasoning |
| Hooks | lifecycle-timed automation |
| Rules | deterministic shell laws |
| Optional MCP | external leverage only where payoff is clear |

A mature activation model should know when to stop at any one of these layers rather than automatically escalating further.

---

## Activation Ladder

### Level 1 — Passive Availability

The lane exists and can be explicitly invoked.

Examples:
- bridge skills
- reference indexes
- explicit reading paths

This is the baseline state.
No additional activation happens unless the task calls for it.

### Level 2 — Soft Priming

The shell gently primes relevant doctrine when the session or task strongly matches the engine domain.

Examples:
- `SessionStart` reminders
- `prime:*` commands
- narrow route suggestions
- small bridge-skill nudges

This is the recommended wave-1 posture for most heavy engines.
It improves correctness without making the shell oppressive.

### Level 3 — Guided Routing

The shell actively routes users or future agents into the correct lane before mutation begins.

Examples:
- route commands
- bounded specialist agents
- lightweight pre-action reviews
- active lane detection with explicit next-step guidance

This level is appropriate when incorrect routing is expensive enough that passive availability is too weak.

### Level 4 — Strong Lifecycle Enforcement

Only use when the system is mature and the failure mode clearly justifies it.

Examples:
- stricter stop gates
- narrow pre-tool interception
- shell rules that block known-bad behavior
- lifecycle automation that preserves critical continuity or validation guarantees

This is **not** a default wave-1 posture.
It requires a higher burden of proof.

---

## Pattern 1 — Runtime Activation Should Follow Detection, Not Replace It

Runtime activation begins only after the task has been correctly classified.

This means:
- route first
- activate second

The shell should not use runtime machinery as a substitute for deciding what the task actually is.

The doctrine is:
- task classification belongs before runtime escalation
- runtime activation then helps enact the result of that classification

---

## Pattern 2 — Prime / Route / Audit Is the Core Runtime Triangle

The shell should organize runtime activation around three verbs:

### Prime
Used when the task needs a doctrinal posture before work starts.

Examples:
- prime memory surface
- prime rust foundations
- prime tool runtime

### Route
Used when the task must be classified into one correct lane.

Examples:
- choose tool surface
- choose concurrency pattern
- choose runtime validation path

### Audit / Diagnose
Used when the current shell, plugin, or toolchain shape must be inspected rather than immediately acted upon.

Examples:
- plugin structure audit
- shell safety review
- toolchain or boundary audit

The doctrine is:
- these three command families provide a stable operational triangle without spawning a command jungle too early

---

## Pattern 3 — Commands Are for Explicit Workflows, Not General Ambient Context

A command is the right activation surface when:
- the workflow is explicit
- the user can name it
- it is repeatable
- it benefits from discoverability

A command is the wrong surface when:
- the need is only to load reference doctrine
- the behavior should remain purely lifecycle-driven
- the task is better served by a narrow specialist agent or passive reading path

The doctrine is:
- commands should remain explicit and intentional
- not become the dumping ground for every workflow idea

---

## Pattern 4 — Agents Are Runtime Escalations for Bounded Reasoning

Runtime activation should escalate into agents only when isolated context and specialist reasoning create real leverage.

Good triggers:
- review tasks
- diagnosis
- synthesis
- bounded specialist implementation or analysis

Weak triggers:
- vague requests that still need routing
- work that a simple doctrine read would answer
- work where the agent would just restate an index

The doctrine is:
- activate agents for bounded leverage
- not for theatrical sophistication

---

## Pattern 5 — Hooks Are Powerful Because They Are Timed, Not Because They Are Automatic

Hook activation is valuable when lifecycle timing matters.

Examples:
- `SessionStart` -> prime context
- `PreCompact` -> preserve continuity
- `Stop` -> final review or handoff check

Hook activation is dangerous when it becomes:
- omnipresent
- hidden mutation
- broad shell orchestration without user awareness

The doctrine is:
- hooks should exploit timing advantages
- not become a silent second application living under the shell

---

## Pattern 6 — Stronger Activation Requires Stronger Justification

Escalating from passive availability to strong lifecycle enforcement should require more evidence, not less.

Useful questions:
- what repeated failure does this stronger activation prevent?
- how often does the failure occur?
- would a command or explicit route suffice instead?
- will the stronger activation feel noisy or restrictive for unrelated tasks?

The doctrine is:
- activation strength must be earned by repeated demonstrated need
- not by architectural enthusiasm

---

## Pattern 7 — Runtime Activation Must Stay Predictable

A shell becomes weaker when users and future agents cannot tell:
- what is active
- why it activated
- what it might do next
- how to stop or bypass it when the task changes

The doctrine is:
- activation should be explainable
- not magical

Predictable activation is one of the foundations of trust in heavy-engine shells.

---

## Pattern 8 — Activation Should Leave Room for Other Lanes

`developer-tool` is multi-domain.
A task may begin in one lane and later move to:
- shell safety
- build/deploy
- memory systems
- language specialists
- another heavy engine entirely

A good activation model therefore:
- orients the task strongly enough to help
- but does not refuse to let the task migrate when its shape changes

The doctrine is:
- activation must guide, not colonize

---

## Pattern 9 — Runtime Activation Quality Should Be Measured by Reduced Wrong Moves

The real success criterion is not “did activation occur?”
It is:
- did activation reduce forgotten knowledge?
- did it reduce wrong surface selection?
- did it prevent needless runtime misuse?
- did it make the session more predictable?

The doctrine is:
- activation quality is measured by decision improvement, not by sheer activity volume

---

## Pattern 10 — Heavy Engines Should Start Soft and Mature Gradually

For heavy engines, the recommended maturity path is:
1. passive availability
2. soft priming
3. guided routing
4. only later, if justified, stronger lifecycle enforcement

This matters because shells that begin too strong often feel oppressive, unpredictable, or over-engineered.

The doctrine is:
- heavy engines should earn their stronger automations over time
- the early shell should stay conservative and legible

---

## Activation Checklist

Before escalating runtime activation, ask:

- [ ] Has the task already been classified correctly?
- [ ] What is the smallest activation surface that would help?
- [ ] Is explicit routing or command use enough?
- [ ] Would an agent truly reduce ambiguity more than doctrine alone?
- [ ] If a hook is involved, is lifecycle timing the real reason it is needed?
- [ ] Is this activation reversible and explainable?
- [ ] Will it still leave room for another lane to take over later?

---

## Anti-Patterns

- activating the full lane by default on every session
- escalating into commands or agents before the task is even properly classified
- using hooks for broad hidden orchestration rather than narrow lifecycle benefits
- strengthening activation without evidence of a repeated failure mode
- confusing activation volume with activation quality
- keeping a lane active after the task has clearly shifted elsewhere

---

## Cross-Links

Read this alongside:
- `agentic-systems.md`
- `activation-model.md`
- `ensemble-team-governance.md`
- `../plugin-runtime-overview.md`
- `../tool-ecosystem/command-surface-patterns.md`
- `../tool-ecosystem/hook-runtime-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “runtime activation means passive availability, then priming, then routing, then hooks if needed.”

The reusable lesson is:
> “runtime activation is a controlled escalation model: once a task is correctly classified, activate the smallest surface that improves the decision, keep that activation predictable and reversible, and only strengthen lifecycle enforcement when repeated evidence proves the extra automation is worth the cost.”
