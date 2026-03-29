# History Retrieval Patterns

## Purpose

Define the canonical doctrine for retrieving prior history inside the `developer-tool` memory domain.

This document exists because not every history question wants the same lane, source, or tool.
It answers the operational question:

> when a user or agent asks about prior sessions, deleted content, code evolution, cross-session search, or task-state reconstruction, which retrieval lane should we choose, and how do we keep the result small, specific, and actionable instead of flooding the context with raw history?

It focuses on:

- lane selection by question shape
- session history vs git evolution vs recovery vs indexed search vs continuity reconstruction
- retrieval order
- evidence reduction
- question-matched outputs

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and its integrated retrieval tool families
- **Derived from:** session-history, deleted-file recovery, git-evolution, indexed-search, and continuity-reconstruction donor patterns stabilized during canonization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local retrieval doctrine aligned to the current developer-tool engine

---

## Core Rule

Do not use one history tool for every question.

History retrieval is strongest when it begins with a lane decision:

- what kind of history is being asked for?
- what evidence surface actually contains the answer?
- what should the output look like if the retrieval succeeds?

The goal is not broad search.
The goal is to select the smallest lane that can answer the question truthfully.

---

## Retrieval Lane Map

| Question Shape                                                      | Retrieval Lane       | Primary Sources                                 |
| ------------------------------------------------------------------- | -------------------- | ----------------------------------------------- |
| “What did we say or decide in prior Claude Code sessions?”          | session-history lane | `cc-history`, `history-insight`, `chat-history` |
| “Can we recover a deleted or overwritten file from session traces?” | recovery lane        | `claude-code-history-files-finder`              |
| “When was this code added / changed / removed?”                     | git-evolution lane   | `code-history`                                  |
| “Search across many agent sessions, connectors, and machines”       | indexed-search lane  | `coding_agent_session_search-main` / CASS       |
| “Recover the narrative behind the current task state”               | continuity lane      | continuity artifacts + session history          |

The lanes are not interchangeable.
Choosing the wrong one usually creates either too much noise or the wrong kind of answer.

---

## Pattern 1 — Select the Lane by Question Type, Not by Tool Familiarity

The first question is not:

> which history tool do I remember existing?

The first question is:

> what kind of historical truth is being requested?

Examples:

- conversational rationale -> session history
- file recovery -> deleted/lost content recovery
- code timeline -> git evolution
- wide cross-session search -> indexed search
- task resumption -> continuity reconstruction

The doctrine is:

- start from the question shape
- let the tool follow the lane

This prevents tool-driven retrieval from polluting the session.

---

## Pattern 2 — Session History Is for Prior Dialogue and Tool-Use Narratives

Use the session-history lane when the target is:

- prior prompts
- assistant outputs
- tool-use traces
- branching conversation paths
- explicit discussion or rationale from earlier sessions

Best inputs:

- session topic
- date range
- project path
- unique keywords from the task

Preferred output:

- a structured summary of the relevant findings
- not a raw conversation flood

The doctrine is:

- session-history retrieval should compress dialogue into actionable reconstruction
- not replay the whole transcript unless the whole transcript is truly needed

---

## Pattern 3 — Deleted / Lost Content Recovery Is for Artifact Restoration, Not Narrative Questions

Use the recovery lane when the user wants:

- deleted file recovery
- overwritten content recovery
- file path recovery from old session writes
- likely latest restorable version of a lost artifact

Preferred output:

- recovered file list
- probable latest version
- confidence note if reconstruction is partial
- artifact path or recovery instructions

The doctrine is:

- recovery tools answer “can we get the artifact back?”
- not “why did we make this decision?”

Do not use this lane for ordinary code-evolution or discussion-history questions.

---

## Pattern 4 — Git Evolution Is for Code Movement Across Time

Use the git-evolution lane when the question is about:

- when a function appeared
- which commit changed a behavior
- why a refactor happened
- which PR introduced a pattern
- when something was removed or renamed

Preferred output:

- timeline of commits / PRs
- intent classification (feature, fix, refactor, migration)
- before/after summary for significant changes

The doctrine is:

- git evolution explains code history
- it does not replace session history for conversational or reasoning history

This is one of the most common misroutes in history retrieval.

---

## Pattern 5 — Indexed Search Is the Wide-Lens Lane

Use the indexed-search lane when you need:

- search across many session formats
- multi-source or cross-machine recall
- keyword + semantic / hybrid search
- ranked results with lower context cost
- retrieval across fragmented archives that manual scanning would make too slow or too noisy

This is the heavy-duty recall lane.
Use it when plain JSONL scanning would be too wide, too slow, or too fragmented.

The doctrine is:

- indexed search is for breadth with relevance ranking
- not the default first move when a narrower local lane already fits the question

---

## Pattern 6 — Continuity Reconstruction Is for Task-State Narrative, Not Quote Hunting

Use the continuity lane when the task is not “find a quote,” but:

- reconstruct current working state
- explain why the workstream looks the way it does
- rebuild next-step context after interruption
- recover surfaced rationale behind the current plan

Primary sources:

- local continuity artifacts
- latest surfaced handoff note
- relevant session-history results
- optional git-evolution results if code movement matters

Preferred output:

```text
considering → conflict → failure → decision → next step
```

The doctrine is:

- continuity retrieval reconstructs the workstream narrative
- not just isolated facts or transcripts

---

## Pattern 7 — Retrieval Order Should Favor the Most Curated Local Truth First

For most task-level recovery or explanation, prefer this order:

1. project-local continuity artifacts
2. session history
3. git evolution
4. indexed search / donor deep dive only if still incomplete

The doctrine is:

- start with the smallest, nearest, most curated surface
- only widen the search when that surface is insufficient

This is the retrieval equivalent of the general cleanup-safe navigation rule.

---

## Pattern 8 — The Output Should Be Smaller Than the Corpus It Came From

A retrieval result is good when it is:

- smaller than the raw source corpus
- specific to the question asked
- actionable without another broad search pass
- transparent about uncertainty when evidence is partial

The doctrine is:

- retrieval should reduce ambiguity, not amplify it

If the result is just a large dump, lane selection or summarization discipline failed.

---

## Pattern 9 — Retrieval Lanes Should Be Explicit About Confidence and Completeness

Useful retrieval results should indicate whether they are:

- highly confident and likely complete
- partial but probably sufficient
- suggestive but incomplete
- insufficient, requiring another lane

This matters especially for:

- deleted content recovery
- fragmented session archives
- multi-source indexed search
- interrupted task reconstruction

The doctrine is:

- good retrieval results communicate their own limitations
- not just their contents

---

## Pattern 10 — Donor Deep Dives Are Fallback Evidence, Not First-Line Retrieval

If the answer can be found through:

- continuity artifacts
- session history
- git evolution
- indexed search

then do not jump directly into donor/source reservoirs.

The doctrine is:

- donor/source reservoirs are fallback evidence layers
- not the default retrieval lane for active work

This keeps retrieval cleanup-safe and context-efficient.

---

## Retrieval Checklist

Before executing a history search, ask:

- [ ] What exact kind of history is being requested?
- [ ] Which lane best matches that question shape?
- [ ] Can a narrower local source answer this before wider indexed search?
- [ ] What should the ideal output look like if retrieval succeeds?
- [ ] Will the result be smaller and more actionable than the raw corpus?
- [ ] If the result is partial, is that stated clearly?

---

## Anti-Patterns

```text
❌ Dumping raw JSONL into context without lane selection
❌ Using git history to answer a session-rationale question
❌ Using deleted-file recovery tools for stable code evolution questions
❌ Jumping into indexed search before checking local continuity artifacts
❌ Treating donor reservoirs as first-line retrieval surfaces
```

---

## Success Condition

You selected the right lane if the result is:

- smaller than the raw source corpus
- specific to the question asked
- actionable without another round of broad search
- honest about completeness and confidence

That is the actual success condition.
Not “we searched many places,” but “we searched the right place first.”

---

## Cross-Links

Read this alongside:

- `../memory-systems-overview.md`
- `continuity-control-plane.md`
- `recall-before-act.md`
- `working-state-and-self-reminder-discipline.md`
- `search-before-act-enforcement.md`

---

## Final Doctrine

The reusable lesson is not:

> “there are different history tools for different questions.”

The reusable lesson is:

> “history retrieval begins with lane selection: choose the source family that matches the question shape, prefer the smallest curated local truth before wider search, and compress the result into a smaller, question-specific artifact that reduces the next action instead of flooding the session.”
