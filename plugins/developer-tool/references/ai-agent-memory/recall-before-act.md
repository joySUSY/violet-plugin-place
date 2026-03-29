# Recall Before Act

## Purpose

Define the canonical doctrine for retrieval-before-action inside the `developer-tool` memory domain.

This document is not merely a good habit reminder.
It exists to answer a harder operational question:

> before planning, mutating, or answering confidently, what prior knowledge must be recalled so that the next action is informed by actual stored context rather than by optimistic memory or local intuition?

It is one of the most important control rules in the memory lane.

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree
- **Derived from:** recall-first memory doctrine, search-before-mutate patterns, and project-scoped memory routing principles established during canonicalization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local recall-first doctrine aligned to the current developer-tool engine

---

## Core Rule

Do not plan, mutate, or confidently answer from memory until relevant prior knowledge has been checked.

This is not paranoia.
It is an operational discipline designed to prevent:

- repeating known failures
- violating established conventions
- asking for facts already stored
- rebuilding history that already exists
- letting context drift silently into avoidable mistakes

The doctrine is simple:

- retrieve first
- then decide
- then act

---

## When Recall Is Mandatory

Recall is mandatory when any of the following is true:

- the task is non-trivial
- a file/module may have prior conventions or past failures
- the user asks for rationale, history, or “what did we decide before?”
- the agent is about to write, edit, run risky commands, or delegate significant work
- the context has been compacted or the task has shifted domains

The threshold is not high.
If the cost of being wrong is meaningful, recall should happen first.

---

## Retrieval Order

Use this order unless the task explicitly requires a different lane:

1. **Project rules and stable conventions**
2. **Known failures / corrections / operational lessons**
3. **Relevant history traces** (session, chat, git, deleted-file recovery)
4. **Continuity artifacts** (latest surfaced handoff, capsule, anchors)
5. **Donor/source reservoirs** only if curated references are insufficient

The doctrine is:

- start with the most curated and decision-relevant memory
- move toward rawer sources only when necessary

This preserves cleanup-safe navigation and reduces noise.

---

## Minimal Execution Protocol

### Step 1 — Classify the task

Ask: is this trivial or non-trivial?

If the action can change files, shape architecture, affect runtime behavior, or depends on prior context, it is **non-trivial**.

### Step 2 — Pull the smallest useful memory set

Search for:

- module / feature name
- error message or failure signature
- convention keyword
- prior decision topic

### Step 3 — State what applies

Before acting, produce a short working note:

```text
Applied memory:
- rule / convention
- prior failure to avoid
- relevant historical decision
```

If nothing relevant is found, say so explicitly.

### Step 4 — Act

Only after the applied memory note is clear should the agent plan, edit, or execute.

The doctrine is:

- recall is not complete until the retrieved knowledge has been made operationally visible

---

## Pattern 1 — Recall Exists to Reduce Wrong Moves Early

The primary value of recall is not nostalgia.
It is decision hygiene.

A strong recall-first posture reduces wrong moves such as:

- editing the right file with the wrong assumptions
- repeating a previously failed fix
- building a plan on stale conventions
- launching subagents into already-solved confusion

The doctrine is:

- the earlier recall prevents a mistake, the cheaper the session becomes

---

## Pattern 2 — The Smallest Useful Recall Set Is Better Than a Memory Dump

Recall should not become indiscriminate retrieval.
The right move is usually to load the smallest set of memory that changes the next decision.

Examples:

- one convention note
- one prior failure signature
- one architecture decision
- one handoff capsule

The doctrine is:

- retrieve enough to act correctly
- not everything that could possibly be related

This keeps the session clean and preserves context budget.

---

## Pattern 3 — Re-Recall Is a Real Requirement, Not a Sign of Failure

Recall is not a one-time ritual.
It should happen again when:

- the context window was compacted
- the task changed domains
- the agent moved from exploration to mutation
- the prior recall is stale or obviously incomplete
- a subagent is launched on a materially different subproblem

The doctrine is:

- re-recall is normal when task shape changes
- it is what keeps long sessions from drifting into false continuity

---

## Pattern 4 — Recall Must Prevent User Re-Interrogation When the Answer Already Exists

One of the most obvious failures of weak memory discipline is asking the user again for facts or decisions that are already stored and recoverable.

The doctrine is:

- if the answer is plausibly already in the project's doctrine, history, or continuity artifacts, check there before asking the user again

This is not just efficiency.
It is respect for prior work.

---

## Pattern 5 — Recall Is Before Planning, Not Only Before Mutation

A subtle anti-pattern is thinking recall only matters before editing files or running risky commands.
In reality, bad plans can be just as expensive as bad edits.

The doctrine is:

- recall should shape planning as early as it shapes mutation

Otherwise the session may produce a very coherent plan for violating an already-known rule.

---

## Pattern 6 — Curated References Win Over Donor Repositories

If a recall question can be answered by:

- canonical references
- memory doctrine
- surfaced continuity artifacts

then do not go straight into donor repositories.

The doctrine is:

- donor/source reservoirs are fallback evidence layers
- not first-line runtime reading surfaces

This protects both context hygiene and cleanup-safe architecture.

---

## Pattern 7 — Recall Success Should Be Stated Explicitly

A good recall posture ends with a visible statement like:

```text
I know which prior rules, failures, or decisions matter here,
because I checked them before acting.
```

This matters because silent recall is hard to audit.
Explicit recall makes the decision trail visible to:

- future-you
- collaborators
- review agents
- the user when appropriate

The doctrine is:

- recall should produce a visible basis for action, not invisible confidence alone

---

## What Recall Must Prevent

Recall exists to prevent:

- repeating already known failures
- violating established conventions
- asking the user for facts already stored elsewhere
- rebuilding a history trail that already exists
- treating donor repositories as first-line runtime docs

If recall does not reduce these failure modes, it is too weak or too noisy.

---

## Anti-Patterns

```text
❌ “This looks simple, I remember enough.”
❌ “I’ll explore first and load rules later.”
❌ “I only need recall before editing, not before planning.”
❌ “I’ll go straight into donor repos instead of curated references.”
```

Additional failure patterns:

- loading too much context and calling it recall
- treating a stale recall result as permanently valid
- assuming continuity artifacts replace targeted retrieval

---

## Success Condition

The protocol is working when the agent can truthfully say:

```text
I know which prior rules, failures, or decisions matter here,
because I checked them before acting.
```

That is the actual success condition.
Not “I searched a lot,” but “I searched enough to act correctly.”

---

## Cross-Links

Read this alongside:

- `../memory-systems-overview.md`
- `claude-recall-operating-model.md`
- `search-before-act-enforcement.md`
- `working-state-and-self-reminder-discipline.md`
- `history-retrieval-patterns.md`

---

## Final Doctrine

The reusable lesson is not:

> “check prior knowledge before doing non-trivial work.”

The reusable lesson is:

> “recall-before-act is a control discipline: retrieve the smallest curated memory that changes the next decision, surface it explicitly, and re-recall whenever context or task shape shifts so planning and mutation both remain anchored to real prior knowledge rather than to guesswork.”
