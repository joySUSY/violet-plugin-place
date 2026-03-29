# Working-State and Self-Reminder Discipline

## Purpose

Define the canonical continuity discipline for long-running sessions, especially when context compaction, session interruption, or long autonomous workflows are possible.

This document sits inside `developer-tool` because continuity is a control-plane concern, not just a memory plugin detail.

---

## Source Provenance

- **Primary donor family:** `agent-skills-main`
- **Key local donor materials:**
  - `agent-skills-main/skills/memory-protocol/references/working-state.md`
  - `agent-skills-main/skills/session-reflection/SKILL.md`
  - `agent-skills-main/skills/session-reflection/references/system-prompt-patterns.md`
  - `agent-skills-main/skills/session-reflection/references/analysis-framework.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

When a session is long enough to drift, the system must not rely on implicit memory alone.

The two strongest continuity tools are:
1. a **current working-state document**
2. a **self-reminder protocol** that re-reads critical context on schedule and after interruptions

These are lightweight but powerful because they convert fragile implicit context into explicit, reusable state.

---

## Pattern 1 — Working State Is a Current-State File, Not a Journal

A working-state file exists to answer:
- what are we doing now?
- what phase are we in?
- what is already done?
- what decisions matter right now?
- what files changed?
- what blocks progress?

This means it should remain:
- concise
- current
- overwrite-oriented
- operational

It should **not** become:
- a diary
- a transcript dump
- a historical archive

That is what memory files, logs, or git history are for.

---

## Pattern 2 — Update on State Change, Not on Mood

Useful update triggers include:
- task start
- phase change
- decision made
- blocker discovered
- agent spawned/completed
- handoff to next execution wave

This is important because stale working-state is nearly as dangerous as no working-state.

---

## Pattern 3 — Read First After Interruption

The strongest donor lesson is the refusal to “just guess from memory” after interruption.

After any of these:
- context compaction
- session restart
- crash recovery
- long idle period

read the working-state file **before acting**.

That is the correct discipline because interruption often erases context you do not realize you lost.

---

## Pattern 4 — Self-Reminder Beats Instruction Decay

Long sessions produce instruction decay.
The system slowly forgets:
- role boundaries
- active task constraints
- special project rules
- current phase expectations

The antidote is a self-reminder protocol.

A good cadence is periodic re-reading of:
- working-state
- role constraints
- current task definition
- system prompt or equivalent critical guardrails

Especially after compaction, this re-read should be mandatory.

---

## Pattern 5 — Structural Reminders Stick Better Than Advisory Reminders

The donor lesson here is sharp:
- “try to remember” decays
- “must re-read after compaction” sticks better

This is why continuity doctrine should prefer structural language for recurring failure modes.

In other words:
- if forgetting is dangerous, the reminder should not be phrased as a polite suggestion

---

## Pattern 6 — Pipeline and Standalone Modes Need Slightly Different Working State

A useful donor refinement is the distinction between:
- standalone working-state
- pipeline-controller working-state

A pipeline-oriented state file may also need:
- active slice id
- active gate
- rework count
- current workers/agents
- gate checklist path

This matters because orchestration state is richer than ordinary task state.

---

## Pattern 7 — Reflection and Working State Reinforce Each Other

Working-state helps preserve present context.
Reflection helps improve future context.

These two systems reinforce each other:
- working-state prevents immediate drift
- reflection turns repeated corrections into better structural prompts/rules

That is why this doctrine belongs close to both memory and agentic-system-basis.

---

## Minimal Working-State Template

A good working-state file should usually include:
- current task id/description
- current phase/status
- progress checklist
- key decisions
- files modified this session
- blocked-on section

If running a pipeline, extend with pipeline state rather than replacing the basic form.

---

## Anti-Patterns

- appending endlessly instead of overwriting current state
- using working-state as a transcript or journal
- skipping the re-read after interruption
- assuming memory is reliable after compaction
- keeping the file so large that nobody can scan it quickly

---

## Why This Matters to `developer-tool`

This doctrine strengthens:
- ai-agent-memory continuity posture
- agentic-system-basis long-session discipline
- future lifecycle hooks / stop / precompact design
- session-resilient orchestration

It is one of the cleanest examples of small process discipline preventing large context failures.
