# Memory Trigger Matrix

## Purpose

Define the canonical doctrine for trigger ownership across recall, continuity, and runtime memory behavior inside `developer-tool`.

This document is not just a trigger checklist.
It exists to answer a control-plane question:

> when a memory-related event happens, which layer owns the first response, what action should follow, and which surface should execute it?

It covers both:
- external/user-driven triggers
- self-driven/agentic triggers

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and runtime-shell boundary model
- **Derived from:** recall-first, continuity, and search-before-act enforcement canonization work plus trigger-scope governance patterns
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current developer-tool engine

---

## Core Rule

A memory or continuity design is only trustworthy when trigger ownership is explicit.

For every significant trigger, the system should be able to answer:
- what happened?
- which layer owns the first response?
- what action is expected?
- what surface should execute it?

If those answers are fuzzy, the system will either:
- forget important memory work
- over-automate harmless situations
- or blur doctrine and runtime into one noisy layer

---

## Trigger Ownership Model

| Layer | Owns |
|---|---|
| Knowledge / doctrine layer | deciding whether recall is needed, choosing retrieval lane, deciding what kind of memory record matters |
| Runtime / plugin layer | lifecycle-boundary capture, project-local surfaced artifacts, reminders, bounded enforcement, continuity commands |
| Donor/source layer | upstream evidence only; never first-line trigger execution |

This ownership split is the core architectural rule for the memory lane.

---

## External / User-Driven Triggers

| Trigger | First Owner | Expected Action | Surface |
|---|---|---|---|
| User starts a non-trivial task | knowledge layer | recall relevant rules / failures / prior decisions before acting | `recall-before-act.md` |
| User asks “why did we do this?” | knowledge layer | select history lane, reconstruct surfaced rationale | `history-retrieval-patterns.md` |
| User asks for deleted / missing content | knowledge layer | route to recovery lane | `history-retrieval-patterns.md` |
| User corrects the agent | knowledge layer | mark as correction-worthy memory and preserve the lesson | `claude-recall-patterns.md` |
| User requests a continuity snapshot / handoff | runtime layer | emit project-local surfaced continuity artifact | runtime continuity command |
| User requests context recovery after interruption | runtime layer | reconstruct working state from local artifacts and history | runtime continuity command |

The doctrine is:
- user-facing memory triggers should usually be routed through doctrine first unless the request is explicitly operational and continuity-oriented

---

## Self-Driven / Agentic Triggers

| Trigger | First Owner | Expected Action | Surface |
|---|---|---|---|
| Before planning or mutation | knowledge layer | perform recall-before-act | doctrine |
| Before first risky mutation tool in a task window | runtime layer (future enforcement) | verify memory freshness or warn/block conservatively | enforcement / hook policy |
| After solving a non-obvious failure | knowledge layer | mark it as worth storing in surfaced memory | doctrine |
| `Stop` event | runtime layer | remind or capture decisions / failures / next steps if continuity value exists | hook or continuity command |
| `SubagentStop` event | runtime layer | preserve child work delta for the parent handoff | hook |
| `PreCompact` event | runtime layer | preserve surfaced continuity before context shrink | reserved hook surface |
| Task domain switch | knowledge layer | run recall again for the new domain | doctrine |
| Context compaction or partial memory loss | knowledge layer first, runtime layer second | reload applicable rules, then rebuild project-local continuity if needed | mixed |

The doctrine is:
- start-of-task and task-shift triggers are usually doctrinal
- lifecycle-loss triggers are usually runtime

This is what keeps memory behavior both teachable and enforceable.

---

## Pattern 1 — Start-of-Task Recall Is the First Non-Negotiable Trigger

If a memory system only triggers on stop or failure, it is already too late.

The most important trigger is:
- before serious planning or mutation begins

This is what makes memory preventive rather than merely archival.

The doctrine is:
- memory should help avoid mistakes before they happen
- not just explain them afterward

---

## Pattern 2 — History and Continuity Are Different Trigger Families

A common design mistake is collapsing these together.

### History/rationale trigger
Use when the question is:
- what did we decide before?
- why did we do this?
- when did this change happen?

### Continuity trigger
Use when the question is:
- what was in progress?
- what must survive interruption?
- how do we resume the workstream?

The doctrine is:
- history triggers route into retrieval lanes
- continuity triggers route into control-plane artifacts and runtime capture/recovery surfaces

---

## Pattern 3 — Correction Triggers Have High Long-Term Value

When the user corrects the system, that event is often more valuable than ordinary preference capture.

Why:
- it marks a previously wrong assumption
- it often predicts repeatable future mistakes
- it may deserve elevation into a stronger memory class or guardrail

The doctrine is:
- corrections deserve stronger memory promotion consideration than generic observations

That is why correction capture appears in this matrix explicitly.

---

## Pattern 4 — Lifecycle Triggers Should Favor Surfaced Continuity, Not Transcript Dumping

Stop, SubagentStop, and PreCompact are powerful trigger windows.
But they should usually preserve:
- decisions
- failures
- blockers
- next steps
- artifact pointers

They should not default to:
- giant transcript capture
- hidden reasoning persistence
- indiscriminate archival of everything visible in the session

The doctrine is:
- lifecycle triggers should create small, reusable continuity artifacts
- not large undifferentiated dumps

---

## Pattern 5 — Enforcement Triggers Should Escalate Conservatively

Not every trigger deserves hard gating.

Examples of conservative escalation:
- warn before block
- gate only high-risk mutation surfaces
- treat read-only exploration more lightly
- use TTL-based freshness rather than eternal validity

The doctrine is:
- trigger enforcement should scale with risk and blast radius
- not all memory triggers should feel equally strict

This is how the shell stays disciplined without becoming unbearable.

---

## Pattern 6 — Re-Entry After Interruption Is a Distinct Trigger

A system that handles start-of-task recall but ignores post-interruption recovery is incomplete.

Important re-entry situations:
- context compaction
- session restart
- cold start after crash
- switching back into a partially completed workstream

The doctrine is:
- re-entry should trigger re-grounding
- not assume the old mental state is still present just because files or traces remain

This is one of the core reasons continuity and memory must cooperate.

---

## Pattern 7 — Trigger Completeness Is a Review Criterion

A memory / continuity design is incomplete if it lacks any of the following:
- **start-of-task recall trigger**
- **history/rationale question trigger**
- **correction capture trigger**
- **stop / subagent stop continuity trigger**
- **pre-compact preservation trigger**
- **re-entry after interruption trigger**

The doctrine is:
- trigger coverage should be reviewed like any other system completeness surface
- missing trigger classes create predictable blind spots

---

## Pattern 8 — Trigger Ownership Must Stay Cleanup-Safe

Triggers should point to:
- doctrine docs
- runtime shell surfaces
- project-local continuity artifacts

They should not point directly to donor/source repositories as first responders.

The doctrine is:
- donor reservoirs are upstream evidence
- active trigger ownership belongs only to canonical doctrine and approved runtime surfaces

This preserves both architecture cleanliness and future cleanup safety.

---

## Conservative Policy

Batch 1 uses a conservative posture:
- prefer remind/warn before hard block unless the action clearly risks context loss or convention violation
- capture only surfaced continuity with clear future retrieval value
- do not treat every stop or compact boundary as worthy of large persistence output
- keep doctrine and runtime ownership distinct at all times

This posture is intentional.
The memory lane should mature into stronger automation only where repeated evidence justifies it.

---

## Trigger Ownership Checklist

Before calling a memory trigger model healthy, ask:

- [ ] Does each major trigger have a clear first owner?
- [ ] Are history questions and continuity questions routed differently?
- [ ] Are correction triggers treated as high-value learning events?
- [ ] Do lifecycle triggers preserve surfaced continuity rather than transcript bulk?
- [ ] Is enforcement escalation proportional to risk?
- [ ] Is re-entry after interruption handled explicitly?
- [ ] Are triggers cleanup-safe and free from donor-path dependence?

---

## Anti-Patterns

- letting both doctrine and plugin layer believe they own the same trigger implicitly
- treating stop-time capture as a substitute for start-of-task recall
- collapsing history retrieval and continuity recovery into the same path
- hard-blocking low-risk exploration with the same posture as high-risk mutation
- pointing active trigger flows directly into donor repositories
- ignoring interruption/re-entry as if start-of-task recall alone were enough

---

## Cross-Links

Read this alongside:
- `recall-before-act.md`
- `history-retrieval-patterns.md`
- `claude-recall-patterns.md`
- `search-before-act-enforcement.md`
- `continuity-control-plane.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “there are user-driven triggers and self-driven triggers, and some belong to doctrine while others belong to the plugin layer.”

The reusable lesson is:
> “memory systems stay trustworthy when every trigger has an explicit first owner: doctrine owns recall and retrieval decisions, runtime owns lifecycle-bound continuity actions, and the whole matrix remains conservative enough that memory reduces mistakes without becoming noisy, duplicated, or cleanup-unsafe.”
