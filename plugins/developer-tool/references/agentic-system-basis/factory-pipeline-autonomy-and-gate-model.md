# Factory Pipeline Autonomy and Gate Model

## Purpose

Define the canonical doctrine for factory-style autonomous build pipelines inside `developer-tool`.

This document distills the strongest reusable lessons from agentic pipeline donors without turning them into a required runtime for every project.

---

## Source Provenance

- **Primary donor family:** `agent-skills-main`
- **Key local donor materials:**
  - `agent-skills-main/README.md` (factory pipeline section)
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

A mature autonomous pipeline does not remove humans.
It **changes where humans intervene**.

The strongest reusable model is:
- human-led planning
- agent-led execution under explicit quality gates
- human review of completed work and escalations

This is more robust than both extremes:
- manual blocking at every tiny step
- or ungoverned full autonomy with no gate discipline

---

## Pattern 1 — Three-Phase Control Model

A strong factory pipeline is best understood as three phases:

1. **Human-driven planning**
   - define requirements
   - define acceptance criteria
   - define architecture decisions
   - approve what should actually be built

2. **Agent-autonomous build/ship**
   - execute the approved slices
   - use quality gates instead of constant human confirmation
   - retry/rework within bounded policy

3. **Human review**
   - inspect shipped slices and audit trail
   - review escalations and trends
   - tune future autonomy and process thresholds

The point is not “autonomy everywhere.”
The point is **correct placement of control**.

---

## Pattern 2 — Gates Replace Constant Permission Pings

Autonomous execution becomes viable only when gate quality is strong.

Useful gates include:
- acceptance tests
- code review gates
- CI status
- mutation or other quality thresholds
- merge/rework escalation thresholds

A mature pipeline classifies outcomes into:
- **gate-resolvable** — the agent can retry or rework
- **judgment-required** — batch for human review
- **blocking** — halt and escalate

This classification is one of the most valuable donor lessons.

---

## Pattern 3 — Acceptance Tests Must Touch a Real Boundary

One especially strong donor idea is that acceptance evidence should exercise an external boundary.

That means a pipeline should prefer acceptance evidence through things like:
- HTTP
- CLI
- message queue
- websocket
- UI automation
- explicitly documented manual verification

This prevents a weak anti-pattern:
- internal function tests masquerading as boundary-level evidence

The deeper doctrine is:
> a delivery pipeline is only as trustworthy as the realism of its gates.

---

## Pattern 4 — Context Packaging Before Dispatch

A mature autonomous pipeline should not throw raw tickets at workers blindly.
It should gather context first.

Useful context package ingredients:
- architecture docs
- domain glossary
- event model
- domain types
- related slices
- boundary notes

This is important because autonomy fails quickly when the execution unit lacks architectural context.

---

## Pattern 5 — Enriched Slice Context Beats Bare Task Lists

The donor model improves on simple work queues by giving each slice a richer context block.

High-value fields include:
- scenario or boundary annotations
- related files or slices
- referenced domain types
- UI or runtime components involved
- event or source provenance

This is a highly reusable lesson for `developer-tool`:
- orchestration quality depends on slice context quality
- not only on agent intelligence

---

## Pattern 6 — Progressive Autonomy Is Better Than Binary Autonomy

The donor family's autonomy ladder is worth canonizing:

### Conservative
- human approves each slice before build
- minimal autonomous rework authority
- best for new domains or low-confidence contexts

### Standard
- agent builds autonomously within bounded rework budget
- human reviews at batch boundaries
- good default for stable projects

### Full
- agent may reorder/parallelize work and optimize execution
- human reviews completed batches and escalations
- only sensible when the pipeline already has strong gate confidence

The important lesson is:
- autonomy should be **earned**, not assumed

---

## Pattern 7 — Worktree Isolation Enables Safer Parallelism

A particularly strong operational lesson is the use of isolated git worktrees for parallel slices.

Why it matters:
- conflicts are surfaced concretely at merge time
- context and file edits stay isolated per slice
- parallelism becomes less chaotic

This pattern should remain optional.
But it is a high-value model for plugin/runtime orchestration doctrine.

---

## Pattern 8 — Audit Trail Is Part of the Product

A serious autonomous pipeline must leave a trace.

Useful trail artifacts include:
- slice logs
- gate outcomes
- rework attempts
- escalations
- learned patterns / factory memory

This matters because review without traceability is weak, and autonomy without traceability is unsafe.

---

## Pattern 9 — Pipeline Mode Should Remain Optional Overlay

A critical donor lesson is backward compatibility.
The pipeline composes existing skills/processes rather than replacing all of them.

This is important for `developer-tool` because it reinforces a general law:
- orchestration layers should be overlays
- not compulsory monoliths that erase lower-level workflows

---

## Why This Matters to `developer-tool`

This doctrine strengthens:
- agentic-system-basis
- build-and-deploy governance
- future route/prime/audit commands
- autonomy-level decision making
- gate-based automation patterns

It belongs in `developer-tool` because the engine is the control plane for these higher-order workflow decisions.
