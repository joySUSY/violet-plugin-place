# Search-Before-Act Enforcement

## Purpose

Define the canonical enforcement doctrine for memory-first behavior before mutation or other high-impact action inside `developer-tool`.

This document sits between pure doctrine and runtime behavior.
It answers a focused operational question:

> once we agree that recall-before-act is important, how should the system enforce that posture without turning the shell into an oppressive or brittle gatekeeper?

It focuses on:
- doctrine vs enforcement split
- per-session freshness tracking
- TTL-based recall validity
- risk-based mutation gating
- read-only exemptions
- graceful degradation when memory backends fail

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and runtime-shell boundary work
- **Derived from:** recall-first doctrine, search-before-mutate enforcement patterns, and memory lifecycle decisions established during canonicalization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local enforcement doctrine aligned to the current developer-tool engine

---

## Core Rule

If the task is non-trivial, the system should prefer searching or loading relevant memory before acting.

The strongest pattern does not rely on good intentions alone.
It pairs doctrine with lightweight enforcement.

The goal is not to punish the user or freeze the shell.  
The goal is to prevent high-cost wrong moves caused by stale or absent recall.

---

## Enforcement Surface Map

| Surface | What it enforces |
|---|---|
| Doctrine | explains why recall matters and when it is required |
| Session freshness state | tracks whether relevant recall has happened recently |
| Commands / routes | nudge or require the right pre-action path |
| Hooks / lifecycle surfaces | enforce or warn at high-risk execution boundaries |
| Rules | define immutable shell laws for especially dangerous actions |

A healthy enforcement model keeps these surfaces aligned rather than collapsing everything into one mechanism.

---

## Pattern 1 — Skill Teaches, Hook Enforces

This is the key hybrid pattern:
- **skill/doctrine** explains why recall matters
- **hook/runtime surface** makes it harder for the runtime to quietly skip recall when the blast radius is high

This is stronger than:
- doctrine with no enforcement
- hook with no doctrine

because it preserves both understanding and discipline.

The doctrine is:
- explanation must exist before enforcement feels legitimate
- enforcement should exist where explanation alone is too easy to forget

---

## Pattern 2 — Per-Session Search State Should Be Small and Disposable

A strong enforcement model tracks whether relevant memory activity has already occurred in the current session.

The point is not permanent surveillance.
The point is to answer a small runtime question:
> has this session already performed a recent recall step?

That state should remain:
- per-session
- bounded
- lightweight
- disposable

The doctrine is:
- use the smallest runtime state needed to protect the workflow
- do not build oversized enforcement memory just to answer a narrow freshness question

---

## Pattern 3 — TTL Is Better Than Eternal Validity

Search state should expire after a reasonable window.

Why:
- the active task may have changed
- stale memory posture is weaker than fresh recall
- a session can drift into new domains without obvious external signals
- a successful lookup at startup does not justify mutation hours later in a different subproblem

The doctrine is:
- recall freshness should decay over time
- not be treated as permanently valid for the whole session

TTL is what keeps enforcement responsive to task drift instead of becoming ceremonial.

---

## Pattern 4 — Mutation Surfaces Deserve Stronger Enforcement Than Read-Only Exploration

The strongest enforcement should usually apply to:
- write/edit/mutation surfaces
- high-risk shell actions
- delegated agent actions when they change system state
- deploy/release or config mutation steps

Read-only inspection often deserves a lighter posture, because exploration should remain possible.

The doctrine is:
- enforcement strength should scale with potential blast radius
- not all actions deserve the same gate

This is what keeps the shell safe without making it unusable.

---

## Pattern 5 — Read-Only Exemptions Matter

A mature enforcement model distinguishes between:
- read-only exploration
- mutating action

This prevents the system from blocking healthy investigation just because no recall has been logged yet.

That distinction is especially important in environments where:
- reading files
- searching code
- checking git status
- running tests
- browsing documentation

may all be part of safe exploration.

The doctrine is:
- exploration should stay easy
- mutation should carry more recall burden

---

## Pattern 6 — Graceful Degradation Beats Deadlock

If the memory backend is unavailable, stale, or unreachable, the shell should prefer graceful degradation over permanent deadlock.

In practice, that often means:
- early in session or before high-risk actions -> stronger warning or soft block may be justified
- after previous successful recall -> warn posture may be enough
- for lower-risk actions -> guidance can replace hard gating

The doctrine is:
- enforcement should fail safely, not catastrophically
- a memory problem should not automatically make the whole shell unusable unless the action risk truly demands it

---

## Pattern 7 — Enforcement Should Be Honest About What It Is Protecting

A weak enforcement model only says:
- "search first"

A stronger one implicitly or explicitly knows:
- what task class is being protected
- what mutation surface is at stake
- whether the current recall is fresh enough
- which escalation path is expected next

The doctrine is:
- enforcement should be specific enough that users and future agents can understand why it is triggering
- not feel like arbitrary friction

Predictable enforcement is easier to respect and maintain.

---

## Pattern 8 — Search Enforcement Should Reduce Wrong Moves, Not Replace Planning

The purpose of enforcement is not to make every session perform more ritual.
It is to prevent wrong moves such as:
- editing with stale conventions
- repeating known failures
- delegating a task with missing context
- mutating after context compaction without re-grounding

The doctrine is:
- enforcement should reduce the next likely mistake
- it should not become a substitute for actual planning or reasoning

This keeps the shell disciplined rather than bureaucratic.

---

## Pattern 9 — Runtime and Doctrine Must Stay Distinct Even in Enforcement Systems

It is tempting to pour the whole rationale into a hook or enforcement surface.
That makes maintenance worse.

The correct split is:
- doctrine answers *why and when*
- runtime enforcement answers *whether the boundary has been respected enough to proceed*

The doctrine is:
- keep the rationale in readable doctrine
- keep the runtime state machine narrow

This preserves both teachability and runtime clarity.

---

## Pattern 10 — Enforcement Maturity Should Increase Gradually

A healthy escalation path is usually:
1. doctrine only
2. visible reminders / prime surfaces
3. per-session freshness tracking
4. stronger warnings at mutation surfaces
5. narrowly justified stronger lifecycle or pre-action blocking

The doctrine is:
- start light and become stricter only where repeated evidence shows softer discipline is insufficient

This prevents the shell from becoming prematurely authoritarian.

---

## Enforcement Checklist

Before calling a search-before-act enforcement model healthy, ask:

- [ ] Is doctrine clearly explaining the rule before runtime enforcement is added?
- [ ] Is freshness tracked per session and kept lightweight?
- [ ] Does recall validity decay with time or task drift?
- [ ] Are mutation surfaces gated more strongly than read-only exploration?
- [ ] Can the system degrade gracefully if memory backends fail?
- [ ] Is the enforcement specific enough to explain what it is protecting?
- [ ] Does enforcement reduce wrong moves without replacing planning?

---

## Anti-Patterns

- enforcing recall without ever teaching why it matters
- treating one early recall as valid for the whole session forever
- blocking read-only exploration with the same strictness as mutation
- hard-deadlocking the shell whenever the memory backend is unavailable
- hiding large amounts of rationale inside hooks instead of doctrine
- escalating to strict gates before softer methods have proved insufficient

---

## Cross-Links

Read this alongside:
- `recall-before-act.md`
- `claude-recall-patterns.md`
- `working-state-and-self-reminder-discipline.md`
- `continuity-control-plane.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “if the task is non-trivial, search first and maybe enforce that with hooks.”

The reusable lesson is:
> “search-before-act enforcement is a lightweight control system: let doctrine explain the rule, let runtime track freshness per session, apply stronger gates only where mutation risk justifies it, and degrade gracefully so the shell remains disciplined without becoming brittle or oppressive.”
