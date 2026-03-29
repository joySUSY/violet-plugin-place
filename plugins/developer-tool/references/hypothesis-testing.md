# Hypothesis Testing Reference

## Purpose

Define the canonical doctrine for evidence-driven debugging and competing-hypothesis investigation inside `developer-tool`.

This document is not just a template repository.
It exists to answer a harder operational question:

> when a system is failing and multiple plausible explanations exist, how do we investigate in a way that converges on truth instead of amplifying intuition, panic, or confirmation bias?

It focuses on:
- falsifiable hypotheses
- discriminating tests
- evidence structure
- arbitration between competing explanations
- turning debugging into a disciplined reasoning process

## Source Provenance

- **Primary source:** current `developer-tool` debugging / quality / analysis doctrine cluster
- **Derived from:** absorbed parallel-debugging and investigation-oriented donor families plus evidence-anchored diagnosis patterns
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local hypothesis-testing doctrine aligned to the current developer-tool engine

---

## Core Rule

Debugging should be treated as hypothesis competition, not guess escalation.

A strong debugging workflow should answer:
- what are the plausible causes?
- what evidence would support each one?
- what evidence would falsify each one?
- what single test or observation best distinguishes them?
- when is the evidence strong enough to stop searching and fix?

The goal is not to produce the most theories.  
The goal is to eliminate wrong theories quickly and converge on the most defensible explanation.

---

## Hypothesis Workflow

### Step 1 — State the symptom precisely
Describe what is actually observed:
- error text
- wrong output
- timing issue
- environment-specific difference
- intermittent vs deterministic behavior

A vague symptom produces vague hypotheses.

### Step 2 — Generate multiple plausible causes
Do not marry the first explanation.
Create competing hypotheses across likely categories such as:
- logic
- state
- integration
- environment
- resource/performance
- dependency/configuration

### Step 3 — Define confirming and falsifying evidence
Each hypothesis should say:
- what would make it more credible?
- what finding would rule it out?

This forces the investigation to become scientific rather than narrative.

### Step 4 — Run the best discriminating test
Prefer the observation or test that eliminates the most uncertainty fastest.

The best debugging move is often not “inspect more files.”
It is “run the one check that splits these two explanations apart.”

### Step 5 — Update, rank, and conclude
After each observation:
- downgrade falsified hypotheses
- strengthen supported ones
- generate a new hypothesis only if the old set cannot explain the evidence

Debugging ends when the explanation is strong enough to justify the fix, not when the investigator gets bored.

---

## Pattern 1 — A Hypothesis Must Be Falsifiable

A statement like:
> “something is wrong with the backend”

is not a useful hypothesis.

A statement like:
> “requests fail in production because the service reads a missing environment variable during startup”

is useful because it can be confirmed or disproved.

The doctrine is:
- hypotheses should be concrete enough to test
- not broad enough to absorb any outcome afterward

---

## Pattern 2 — Evidence Criteria Must Be Declared Before Investigation Drifts

Good debugging discipline defines evidence criteria before too much investigation noise accumulates.

That means asking in advance:
- what exact file, log, metric, or runtime behavior would support this?
- what exact observation would falsify it?

This reduces two classic failure modes:
- collecting endless irrelevant evidence
- interpreting every new clue as support for the current favorite theory

---

## Pattern 3 — Choose Discriminating Tests, Not Comfortable Tests

A comfortable test is one that feels productive.  
A discriminating test is one that reduces uncertainty.

Examples of discriminating checks:
- compare local vs production config values
- isolate a failing integration with a stub
- add one logging point at the true branch split
- reproduce under load with a constrained scenario
- bisect the recent change boundary

The doctrine is:
- a test is good when it meaningfully separates hypotheses
- not when it merely produces more output

---

## Pattern 4 — Categories Help Prevent Tunnel Vision

Useful failure-mode categories include:
- Logic Error
- Data Issue
- State Problem
- Integration Failure
- Resource Issue
- Environment Issue

Categorization helps because it forces the investigator to ask:
- is this really code logic?
- or is it config, deployment, dependency drift, or runtime resource pressure?

Many slow debugging sessions are just tunnel vision in disguise.

---

## Pattern 5 — Confidence Should Track Evidence, Not Seniority

Confidence labels are useful only if they reflect actual support.

Examples:
- **High** -> clear causal chain and strong confirming evidence, with contradictions addressed
- **Medium** -> plausible explanation with some support, but material uncertainty remains
- **Low** -> weakly supported or mostly speculative

The doctrine is:
- confidence comes from discriminating evidence
- not from how strongly someone feels the theory is right

---

## Pattern 6 — Arbitration Is Needed When Multiple Investigators or Theories Coexist

When several investigators or threads report back, a disciplined arbitration step matters.

Questions:
- which hypotheses are confirmed, falsified, or still open?
- are multiple causes interacting?
- which is primary vs secondary?
- what evidence quality supports each conclusion?

This is especially useful in:
- parallel debugging
- large system failures
- multi-team incidents
- regressions with multiple contributing changes

The doctrine is:
- conflicting findings should be synthesized explicitly
- not resolved by whoever speaks first or loudest

---

## Pattern 7 — Good Reports Preserve the Reasoning Trail

A strong debugging report should include:
- the hypothesis statement
- confidence level
- supporting and contradicting evidence
- causal chain if confirmed
- recommended fix or next test
- spillover findings relevant to other hypotheses

This matters because debugging knowledge is a reusable asset.
If the reasoning trail disappears, future incidents must relearn it from scratch.

---

## Pattern 8 — Common Error Shapes Deserve Pre-Built Hypothesis Families

Certain symptoms regularly map to recurring hypothesis families.

Examples:
- "500 Internal Server Error" -> unhandled exception, missing config, dependency failure
- intermittent failure -> shared state, ordering, stale cache, race condition
- works locally, fails in production -> environment drift, dependency mismatch, resource ceilings
- regression after deploy -> code change, config drift, migration issue

These are not answers.  
They are starting sets of plausible explanations.

The doctrine is:
- use recurring patterns to accelerate hypothesis generation
- but still require evidence before commitment

---

## Pattern 9 — Hypothesis Testing Should Reduce the Next Action

A useful debugging pass should leave the team knowing one of three things:
- what the root cause probably is
- what the next discriminating test should be
- what class of fixes should now be explored

If the output does not narrow the next action, the investigation is still too fuzzy.

---

## Hypothesis-Driven Debugging Checklist

Before calling an investigation disciplined, ask:

- [ ] Is the symptom stated precisely enough to investigate?
- [ ] Are there multiple plausible hypotheses rather than one pet theory?
- [ ] Does each hypothesis have confirming and falsifying evidence criteria?
- [ ] Was the chosen next test actually discriminating?
- [ ] Do confidence labels reflect evidence strength honestly?
- [ ] Is the resulting report actionable and reusable?

---

## Anti-Patterns

- starting with a preferred theory and collecting only confirming evidence
- using hypotheses so vague they can never be disproved
- running comfortable checks instead of discriminating ones
- equating volume of investigation with quality of reasoning
- declaring high confidence on thin evidence
- ending an investigation without reducing the next action

---

## Cross-Links

Read this alongside:
- `code-quality-analysis.md`
- `security-quality-testing.md`
- `test-generation.md`
- `platform-infrastructure.md`

---

## Final Doctrine

The reusable lesson is not:
> “write a hypothesis, gather some evidence, and pick the most likely cause.”

The reusable lesson is:
> “treat debugging as a falsifiable competition between explanations: define evidence before bias takes over, run the test that best separates the theories, and only let confidence rise in proportion to what the evidence actually proves.”
