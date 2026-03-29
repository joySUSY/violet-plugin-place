# Video Recording

## Purpose

Define the canonical doctrine for visual session recording inside `developer-tool` workflows.

This document is not only about turning on a recorder for browser automation.
It exists to answer a broader operational question:

> when a workflow needs a human-visible replay of behavior over time, how should video be captured, named, stored, and interpreted so it becomes useful evidence instead of large, contextless media debris?

It applies to:
- browser automation recordings
- demo and handoff artifacts
- bug reproduction sharing
- reviewable visual evidence
- user-flow documentation

## Source Provenance

- **Primary source:** current `developer-tool` execution / tracing / evidence-capture doctrine cluster
- **Derived from:** absorbed browser-recording, automation replay, and visual evidence donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local recording doctrine aligned to the current developer-tool engine

---

## Core Rule

A video is useful when the important truth is visual and temporal.

A strong recording posture should make it possible to answer:
- what did the user or automation actually see?
- in what order did visible events occur?
- what sequence is worth sharing or replaying?
- what limitations remain because video does not preserve internal state by itself?

The goal is not just to capture motion.  
The goal is to preserve a replayable visual narrative that helps humans reason about behavior.

---

## Evidence Surface Map

| Surface | Best For |
|---|---|
| Video | human-visible replay, demos, handoffs, UI timing observation |
| Trace | causal reconstruction with DOM/network/timing/state detail |
| Screenshot | one stable moment or regression snapshot |
| Logs | machine-oriented or low-level event explanation |

Video is strong when visible behavior is the question.
It is weak when the real issue lives mostly in hidden state or network causality.

---

## Pattern 1 — Use Video for Human-Visible Truth, Not Deep Internal Truth

A recording is strongest when the question is:
- what did the user see?
- what changed on screen and when?
- how did the interaction flow feel?
- can another human verify or review this visually?

A recording is weaker for questions like:
- what network edge failed?
- what internal state existed before the click?
- what hidden response body caused the problem?

The doctrine is:
- use video when visible behavior is central
- do not mistake it for a substitute for traces or logs

---

## Pattern 2 — Recording Scope Should Match the Story You Need to Preserve

Not every run needs a full end-to-end video.
Ask:
- are we recording one bug reproduction?
- one onboarding flow?
- one demo sequence?
- one comparison between variants?

The doctrine is:
- capture the smallest visual story that still answers the question
- avoid giant recordings that no one will actually review end-to-end

A tightly scoped recording is usually more valuable than a huge one with no narrative focus.

---

## Pattern 3 — Video and Trace Often Work Best Together, Not Against Each Other

Video and tracing answer different questions.

### Video provides
- visual proof
- user-facing flow replay
- communication-friendly artifacts

### Trace provides
- timing and state reconstruction
- network and console context
- structural debugging evidence

The doctrine is:
- use video for the human-visible layer
- use trace for the causal/debugging layer
- pair them when the problem spans both

This is especially useful for flaky UI or timing-sensitive workflows.

---

## Pattern 4 — Name Recordings Like Evidence, Not Like Temporary Output

A recording should be named so future-you or teammates can answer:
- what flow is this?
- when was it recorded?
- what run/build/variant does it represent?
- is it a demo, repro, or comparison artifact?

Good names are descriptive and contextual.
Weak names like `test.webm` or `demo2.webm` reduce the artifact's future value quickly.

The doctrine is:
- if a recording matters, its filename should help preserve meaning

---

## Pattern 5 — Recordings Need Storage and Retention Discipline

Video can become large quickly.
That means you need to decide:
- where recordings live
- how long they are kept
- which ones are evidence vs disposable scratch output
- when old recordings should be cleared

The doctrine is:
- recordings are either evidence or temporary state
- treat them clearly as one or the other

A directory full of unnamed stale recordings is operational clutter, not documentation.

---

## Pattern 6 — Sensitive Content Risk Is Higher in Visual Artifacts Than People Expect

Video can easily capture:
- credentials typed into forms
- personal data on screen
- internal URLs or tokens
- privileged settings or configuration states

This makes recordings potentially sensitive artifacts.

The doctrine is:
- before sharing or storing recordings, consider whether they expose sensitive visible state
- visual evidence should still follow evidence hygiene and disclosure discipline

A helpful recording that leaks secrets is still a failure.

---

## Pattern 7 — Recordings Are Valuable for Demos, Repros, and Handoffs

Good use cases include:
- demonstrating a bug reliably
- showing a complete UI flow to another engineer or reviewer
- documenting expected behavior for future comparison
- creating a lightweight onboarding or support artifact

The doctrine is:
- recordings should support communication and verification
- not just serve as passive media leftovers from automation

A useful video often answers a human question faster than a paragraph can.

---

## Pattern 8 — Recording Overhead Should Be Chosen Intentionally

Recording is not free.
It adds:
- runtime overhead
- disk usage
- artifact management cost

The doctrine is:
- turn recording on when the value of replayable visual evidence outweighs the cost
- do not enable it blindly for every workflow by default

A good recording posture is selective, not habitual.

---

## Pattern 9 — Comparison Recordings Work Best When Session Identity Is Clear

Recordings are particularly useful in:
- A/B flow comparison
- pre-fix vs post-fix comparison
- environment comparison
- platform-specific behavior review

But comparison only works if session identity and scenario identity are clear.

The doctrine is:
- if two recordings are meant to be compared, their names, contexts, and conditions should be distinguishable without guesswork

This ties recording discipline directly to session management.

---

## Pattern 10 — A Good Recording Reduces Review Ambiguity

A recording is successful when a reviewer can answer:
- what sequence happened?
- where the visible failure or difference occurred?
- whether the behavior matches expectation?
- what should be investigated next if it does not?

If the reviewer still has to guess what they are looking at, the recording is under-scoped, under-labeled, or not the right evidence surface.

---

## Video Recording Checklist

Before calling a recording workflow healthy, ask:

- [ ] Is the question actually visual/temporal enough to justify video?
- [ ] Is the scope small enough to preserve the relevant story clearly?
- [ ] Are the filename and storage location meaningful?
- [ ] Could the recording expose sensitive visible information?
- [ ] Would trace or screenshots answer the question better—or should they be paired?
- [ ] Will the recording reduce review ambiguity rather than just create another artifact?

---

## Anti-Patterns

- using video when the real problem requires traces or logs instead
- recording everything by default with no review plan
- meaningless filenames for recordings that matter
- storing recordings indefinitely without evidence/retention distinction
- sharing recordings that expose credentials or sensitive on-screen state
- treating a visual replay as if it proved internal causality by itself

---

## Cross-Links

Read this alongside:
- `tracing.md`
- `running-code.md`
- `session-management.md`
- `request-mocking.md`
- `security-quality-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “video recording captures browser automation sessions for debugging or demos.”

The reusable lesson is:
> “video recording is a visual evidence surface: use it when visible temporal behavior matters, scope it to the story being reviewed, name and store it like evidence, and pair it with traces or other artifacts when the visible replay alone cannot explain the system.”
