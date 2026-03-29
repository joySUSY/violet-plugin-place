# Tracing

## Purpose

Define the canonical doctrine for execution tracing and evidence capture inside `developer-tool`.

This document is not only about one browser tool's trace viewer output.
It exists to answer a broader operational question:

> when behavior unfolds over time and ordinary logs or screenshots are not enough, how should we capture a trace that preserves causality, timing, and enough surrounding state to make the behavior explainable afterward?

It applies to:
- browser automation traces
- step-by-step execution capture
- debugging and incident evidence
- performance and timing analysis
- workflow reconstruction

## Source Provenance

- **Primary source:** current `developer-tool` execution / verification / browser-automation doctrine cluster
- **Derived from:** absorbed tracing, browser replay, and evidence-capture donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local tracing doctrine aligned to the current developer-tool engine

---

## Core Rule

A trace is useful when it preserves the causal story of execution.

A good tracing posture should make it possible to answer:
- what happened?
- in what order?
- with what timing?
- under what surrounding state?
- why did the system behave that way?

The goal is not merely to record activity.  
The goal is to preserve enough structured evidence that the activity can be reconstructed and reasoned about later.

---

## Trace Surface Map

| Surface | What it captures |
|---|---|
| Action timeline | clicks, fills, navigations, commands, step order |
| State snapshots | DOM/page state, UI state, intermediate context |
| Network trace | requests, responses, timing, failures |
| Console/log output | warnings, errors, internal signals |
| Resource bundle | assets or bodies needed to replay/inspect state |
| Timing data | latency, wait points, sequencing behavior |

A trace becomes stronger as these surfaces align into one coherent narrative.

---

## Pattern 1 — Tracing Is for Causal Reconstruction, Not Just Recording

A raw recording can show that something happened.
A trace is stronger because it helps explain:
- what happened before the failure
- what state the system was in at each step
- what network or timing conditions contributed
- where the causal chain likely bent

The doctrine is:
- trace when you need reconstruction, not just memory
- use lighter artifacts when a simple visual snapshot is enough

---

## Pattern 2 — Choose Trace vs Video vs Screenshot by Question Shape

Different evidence surfaces answer different questions.

### Trace
Best for:
- debugging
- causal reconstruction
- timing/network/state analysis

### Video
Best for:
- visual demos
- human-observable flow replay
- presentation or documentation support

### Screenshot
Best for:
- single-state capture
- quick bug evidence
- UI comparison at one moment

The doctrine is:
- choose the evidence surface that matches the decision you need to make
- not the one that simply produces the most bytes

---

## Pattern 3 — Start Tracing Before the Interesting Failure Point

A common mistake is tracing only the final failing step.
That often omits the lead-up context that actually explains the failure.

A better posture is to start tracing early enough to capture:
- setup conditions
- intermediate state transitions
- prior requests/responses
- event sequences leading into the visible problem

The doctrine is:
- trace the path to the symptom, not only the symptom itself

---

## Pattern 4 — Trace Scope Should Match the Investigation Question

Not every problem needs a full workflow trace.
Ask first:
- are we debugging one action?
- one route or API call?
- one user flow?
- one performance regression?
- one flaky intermittent behavior?

The doctrine is:
- trace only enough to preserve the relevant story
- avoid huge indiscriminate traces when a smaller scoped capture would answer the question better

This reduces both noise and storage cost.

---

## Pattern 5 — Traces Are Strongest When Paired With Intentional Interpretation

A trace file is evidence, not a conclusion.

Useful follow-up interpretation includes:
- annotating what step failed
- noting suspicious wait or network boundaries
- highlighting state transitions that look wrong
- comparing traces across good vs bad runs

The doctrine is:
- traces should feed analysis
- they should not be mistaken for analysis by themselves

This is why tracing belongs close to hypothesis-driven debugging and quality analysis.

---

## Pattern 6 — Trace Artifacts Must Be Named and Stored Like Evidence, Not Debris

Tracing often produces medium-to-large artifacts.
That means storage discipline matters.

Good posture:
- descriptive filenames
- dedicated trace directory
- timestamps or run identifiers
- clear retention/cleanup strategy
- easy linkage from incident or investigation notes

The doctrine is:
- if a trace matters, it should be storable and findable as evidence
- if it does not matter, it should be removable as temporary state

---

## Pattern 7 — Tracing Has a Cost Model

Tracing is powerful, but not free.
It can add:
- runtime overhead
- artifact size growth
- extra noise during automation
- review burden if captured indiscriminately

The doctrine is:
- trace intentionally
- keep it off unless it is answering a real question
- scale capture depth with investigation value

A trace that nobody will inspect is wasted overhead.

---

## Pattern 8 — Trace + Session + Mocking Together Can Make Complex Failures Legible

Some of the strongest debugging setups combine:
- isolated sessions
- network mocking
- targeted traces
- reproducible execution surfaces

Examples:
- compare Variant A vs Variant B in separate sessions with trace capture
- simulate offline behavior and capture the exact failure flow
- patch one response and inspect downstream UI state transitions under trace

The doctrine is:
- tracing gains value when paired with controlled execution contexts
- not when it is treated as a universal standalone solution

---

## Pattern 9 — Tracing Is Also a Performance and Reliability Instrument

Traces are not only for correctness bugs.
They are also useful for:
- identifying latency spikes
- locating slow network dependencies
- understanding wait-state bottlenecks
- analyzing flaky action timing
- comparing expected vs real execution sequence

The doctrine is:
- tracing belongs in both debugging and performance investigation toolkits

---

## Pattern 10 — A Good Trace Reduces the Next Question

A successful trace helps the investigator ask a better next question, such as:
- was the DOM/state wrong before the action, or did the action produce the wrong state?
- did the network fail, or did the client mis-handle success?
- is the issue deterministic, delayed, or race-sensitive?
- what should be mocked, isolated, or instrumented next?

If the trace does not reduce the next question, it is probably too shallow, too noisy, or too poorly scoped.

---

## Tracing Checklist

Before calling a tracing workflow healthy, ask:

- [ ] Is the trace answering a real debugging/performance/evidence question?
- [ ] Was tracing started early enough to capture the lead-up to the symptom?
- [ ] Is the scope narrow enough to keep the artifact inspectable?
- [ ] Will the result be stored and named as useful evidence if it matters?
- [ ] Are we interpreting the trace instead of mistaking it for the conclusion?
- [ ] Would video, screenshot, or logs be a more honest evidence surface for this question?

---

## Anti-Patterns

- starting the trace only after the critical context is already gone
- tracing entire workflows with no clear investigation question
- treating trace files as the explanation instead of evidence
- keeping no naming/retention discipline for trace artifacts
- using tracing where a screenshot or simple log would be enough
- ignoring tracing overhead in high-frequency automation

---

## Cross-Links

Read this alongside:
- `running-code.md`
- `request-mocking.md`
- `session-management.md`
- `hypothesis-testing.md`
- `video-recording.md`
- `security-quality-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “tracing captures actions, DOM snapshots, and network activity for debugging.”

The reusable lesson is:
> “tracing is an evidence system for temporal behavior: capture enough timing, state, and causal sequence to reconstruct what happened, scope the trace to the real question, and treat the artifact as structured evidence rather than as a conclusion by itself.”
