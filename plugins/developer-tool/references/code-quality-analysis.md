# Code Quality and Analysis

## Purpose

Define the canonical doctrine for exploring, assessing, and diagnosing software quality inside `developer-tool`.

This document is not just a list of grep commands or audit utilities.
It exists to answer a deeper operational question:

> when you inherit, inspect, debug, or evaluate a codebase, how do you turn raw repository information into trustworthy architectural and quality judgment?

It bridges:
- codebase exploration
- dependency and supply-chain evaluation
- error/failure analysis
- performance investigation
- modernization prioritization

## Source Provenance

- **Primary source:** current `developer-tool` analysis / quality / platform doctrine cluster
- **Derived from:** absorbed code-review, codebase-exploration, error-detector, performance-engineer, dependency-manager, and legacy-modernizer donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local code-quality doctrine aligned to the current developer-tool engine

---

## Core Rule

Code quality analysis is not a search exercise.  
It is a **judgment workflow**.

A strong analysis pass should progressively answer:
- what kind of system is this?
- where are its real boundaries and entrypoints?
- what failure and dependency risks does it carry?
- where is the highest-value technical debt?
- what should be modernized now, later, or never?

The goal is not to produce the largest report.  
The goal is to reduce uncertainty about the system's most important risks and leverage points.

---

## Analysis Workflow

### Step 1 — Orient
Understand what the project claims to be.

Read first:
- README
- package manifest(s)
- top-level config files
- CI/workflow definitions
- known architecture or design docs if present

The purpose is to avoid starting with a false mental model.

### Step 2 — Map the real structure
Identify:
- entrypoints
- major directories/modules/packages
- delivery surfaces
- test locations
- infrastructure/deployment boundaries

This turns “a repo” into a system map.

### Step 3 — Investigate the stress zones
Focus on:
- error-handling posture
- dependency health
- performance-sensitive paths
- security-sensitive areas
- operational or release bottlenecks

### Step 4 — Classify findings by leverage
Not every issue deserves immediate action.
Classify by:
- risk
- frequency
- blast radius
- change cost
- business importance

### Step 5 — Route into the right follow-up doctrine
The analysis should tell you whether the next move is:
- refactor
- migration
- security audit
- runtime/performance investigation
- architecture review
- dependency governance

---

## Pattern 1 — Orientation Beats Random Deep Dives

The most common analysis mistake is diving into code before understanding the project shape.

A better orientation pass asks:
- what is the primary language/runtime?
- is this a library, CLI, service, platform, or hybrid system?
- how does the system start?
- where does state/configuration live?
- what does the test/CI posture imply about quality maturity?

The doctrine is:
- first build a map of the terrain
- then choose which valley to descend into

---

## Pattern 2 — Architecture Discovery Should Trace Real Flows, Not Just Directories

Directory trees are only hints.
A stronger analysis follows an actual flow:
- user request or command
- entrypoint
- business logic
- data access or external dependency
- output/error surface

This reveals more than folder names do:
- hidden coupling
- transport leakage
- missing abstractions
- testing gaps
- duplicated logic across layers

A good quality analysis does not stop at file listings.
It reconstructs system behavior.

---

## Pattern 3 — Error Detection Is a Design Review, Not a Lint Count

Quality analysis should inspect failure posture deliberately.

Examples of useful questions:
- are recoverable failures returned or hidden behind panic/unwrap?
- are error surfaces consistent across boundaries?
- is context good enough for diagnosis?
- are library and application boundaries using the right error style?
- are failures observable in production?

This is why error detection and coordination are part of quality analysis rather than a separate afterthought.

---

## Pattern 4 — Dependency Review Is Architecture Review in Disguise

Dependencies change:
- build speed
- attack surface
- ecosystem lock-in
- operational posture
- maintenance burden

A useful dependency analysis should examine:
- freshness
- advisories
- license/compliance posture
- transitive weight
- feature sprawl
- maintainership health

The doctrine is:
- dependency selection and dependency drift are architecture concerns, not just package-manager chores

---

## Pattern 5 — Performance Investigation Must Start With Bottleneck Type

If performance is under question, analysis should first classify the bottleneck family:
- CPU-bound
- memory-bound
- I/O-bound
- contention-bound
- unknown / mixed

This prevents shallow fixes like:
- micro-optimizing cold code
- arguing about syntax instead of measuring hot paths
- changing infrastructure when the issue is algorithmic

The first win in performance analysis is often correct classification.

---

## Pattern 6 — Modernization Must Be Prioritized by Real Leverage

A large or legacy system cannot be improved all at once.
A good modernization analysis ranks opportunities by:
- business criticality
- change frequency
- fragility/risk
- current test coverage
- long-term maintenance cost
- whether the system has a safe migration seam

The doctrine is:
- modernize where leverage is highest
- not where the old code is merely the most annoying to look at

---

## Pattern 7 — Quality Analysis Should Produce Actionable Categories, Not Just Observations

Useful finding categories include:
- architecture drift
- error-handling risk
- dependency/supply-chain risk
- performance risk
- observability gap
- test gap
- modernization candidate

This matters because raw observations are easy to write and hard to act on.
Categorized findings support planning, routing, and prioritization.

---

## Pattern 8 — Legacy Modernization Benefits From Boundary Mapping First

When analyzing legacy systems, one of the highest-value acts is identifying:
- stable seams
- façade points
- external contracts that must remain intact
- modules that can be strangled/replaced incrementally

This is what turns “rewrite this mess” into an actual transition strategy.

That is why legacy analysis belongs close to migration and refactor doctrine.

---

## Pattern 9 — Investigation Tools Support Judgment, They Do Not Replace It

Tools like:
- grep/ripgrep
- tree/tokei
- package/dependency graph tools
- linters
- profilers
- audit scanners

are valuable because they surface evidence.
But evidence still needs interpretation.

The doctrine is:
- use tools to surface signals
- use analysis to rank and explain them

A tool dump is not yet a diagnosis.

---

## Pattern 10 — The Best Analysis Reduces the Next Decision

A strong quality-analysis pass should leave the system easier to act on.

It should help answer:
- what should we fix now?
- what can wait?
- what needs a dedicated migration?
- what needs a security audit?
- what needs a performance investigation?
- what needs a design/architecture review instead of more code churn?

If the output does not reduce the next decision, the analysis is incomplete.

---

## Quality Analysis Checklist

Before calling an analysis useful, ask:

- [ ] Did we orient to the actual project shape before diving in?
- [ ] Did we trace at least one real flow end-to-end?
- [ ] Are failures, dependencies, and performance posture classified rather than vaguely mentioned?
- [ ] Are findings ranked by leverage and risk?
- [ ] Does the analysis clearly suggest the next corrective action?

---

## Anti-Patterns

- searching files without building a system model
- reporting lint/tool output without interpretation
- treating dependencies as purely administrative detail
- calling everything “technical debt” without prioritization
- analyzing performance without classifying the bottleneck family
- proposing rewrites before mapping migration seams

---

## Cross-Links

Read this alongside:
- `security-quality-testing.md`
- `platform-infrastructure.md`
- `build-and-deploy/build-deploy.md`
- `hypothesis-testing.md`
- `project-scaffolding.md`

---

## Final Doctrine

The reusable lesson is not:
> “run some tools, find some issues, and make a report.”

The reusable lesson is:
> “code quality analysis is a workflow for turning repository signals into trustworthy judgment about boundaries, failures, dependencies, performance, and modernization leverage—so the next engineering decision becomes clearer, not noisier.”
