# Architecture as Code and Diagrams

## Purpose

Define the canonical doctrine for using diagrams as living architecture artifacts inside `developer-tool`.

This document is not primarily about choosing Mermaid vs draw.io vs Graphviz.
That tooling question belongs to `diagram-tooling.md`.

This document answers a deeper question:

> how should diagrams be used so that architecture becomes more visible, reviewable, and trustworthy instead of becoming a stale side artifact that only looks informative?

It focuses on:
- diagrams as architecture surfaces
- multi-level system visibility
- generated vs hand-maintained diagrams
- review-safe structural truth
- when architecture visuals should be created, refreshed, or rejected

## Source Provenance

- **Primary source:** current `developer-tool` diagram / documentation / platform doctrine cluster
- **Derived from:** absorbed diagram-generator, codemapper, architecture-visualization, and docs-as-code donor families plus the canonical diagram-tooling pass
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local architecture-visualization doctrine aligned to the current developer-tool engine

---

## Core Rule

A complex system should be visualized at the level where the current decision is being made.

But a diagram is only useful if it remains close enough to the truth that engineers can rely on it.

That means architecture diagrams should be treated as:
- decision support
- review artifacts
- coordination surfaces
- documentation that earns its right to exist

The goal is not to decorate docs.
The goal is to externalize structure so humans do not have to keep the whole system in working memory.

---

## Architecture Diagram Surfaces

| Surface | What it helps with |
|---|---|
| Context/system diagram | who interacts with the system and what sits outside it |
| Container/service diagram | major deployable/runtime units and their relationships |
| Component/module diagram | internal structure of one bounded area |
| Sequence or interaction diagram | runtime behavior over time |
| Data/ER diagram | schema and relationship truth |
| Dependency/call graph | structural coupling and code reality |

Different questions require different diagram surfaces.
A single mega-diagram is usually a smell.

---

## Pattern 1 — Visualize for Decisions, Not for Decoration

The first question is not:
> should we make a diagram?

The first question is:
> what decision or misunderstanding will this diagram reduce?

Examples:
- clarify service boundaries before a refactor
- explain request flow during incident review
- reveal coupling before modularization
- communicate rollout architecture to operators
- align teams on data ownership and integration paths

If no decision is made easier by the diagram, the artifact is probably decorative.

---

## Pattern 2 — Choose the Correct Zoom Level

Architecture visuals must match the question being asked.

Useful zoom levels:
- **Context** -> system and its external actors/services
- **Container** -> apps/services/datastores/infrastructure units
- **Component** -> internal pieces of one container or bounded subsystem
- **Code/structure** -> generated graphs, class/module relationships, fine-grained dependency truth

The doctrine is:
- go high enough to see the boundary
- go low enough to support the current decision
- do not mix five zoom levels into one unreadable artifact

---

## Pattern 3 — Generated Structure and Human Narrative Should Work Together

Some diagrams are strongest when generated from code or metadata:
- dependency graphs
- call graphs
- route maps
- schema relationships

Other diagrams are strongest when authored by humans:
- system context
- high-level service responsibilities
- reasoning about ownership and trade-offs
- migration or rollout narratives

The doctrine is:
- use generated visuals for structural truth
- use human-authored visuals for intent and conceptual framing
- do not assume one replaces the other

---

## Pattern 4 — Diagrams Must Be Reviewable Like Code

A useful architecture diagram should be easy to:
- inspect
- diff
- discuss
- update
- reject when wrong

This is why text-based or model-based diagram workflows often have high leverage.
They allow architecture to participate in normal engineering review rather than becoming an external presentation artifact no one can safely edit.

The doctrine is:
- if the diagram matters architecturally, it should be reviewable as part of normal engineering work

---

## Pattern 5 — A Diagram That Cannot Stay Fresh Is a Liability

Architecture diagrams become dangerous when they quietly diverge from reality.

Signs of likely drift:
- no owner
- manual-only update path
- copied into slide decks without source model
- generated once and never refreshed
- lives far away from the code/docs it describes

The doctrine is:
- either keep the diagram close enough to its truth source to stay fresh
- or do not pretend it is authoritative

Stale diagrams do more damage than no diagrams because they create false confidence.

---

## Pattern 6 — Dependency and Boundary Diagrams Are Especially Valuable During Change

Some of the highest-value diagram work happens during:
- architecture review
- refactoring
- migration
- debugging large-scale incidents
- onboarding into legacy systems

This is because visuals help reveal:
- hidden coupling
- wrong dependency directions
- runtime interactions across layers
- places where modular boundaries are weaker than assumed

A diagram is often most valuable precisely when the system is changing.

---

## Pattern 7 — Diagrams Belong in the Documentation Flow, Not Beside It

An architecture diagram is strongest when it lives inside or alongside:
- architecture docs
- ADRs
- design proposals
- incident reports
- migration plans
- handoffs

That gives the diagram narrative context and gives the narrative structural support.

The doctrine is:
- pair visuals with the prose that explains why they matter
- do not let diagrams float around as detached PNG folklore

---

## Pattern 8 — Architecture as Code Means the Model Matters More Than the Rendering

When possible, treat the diagram's model as the important artifact.
The rendering is one output.

Examples:
- structured service map rendered as Mermaid or draw.io
- dependency graph rendered as DOT or SVG
- sequence model rendered into docs

This matters because it allows:
- regeneration
- format changes
- validation
- automation around freshness

The model is what should survive tool churn.

---

## Pattern 9 — Good Architecture Diagrams Reduce Cognitive Load Across Teams

At team scale, diagrams help when they reduce repeated explanation of:
- what owns what
- how requests or events travel
- where data lives
- which services or modules are coupled
- what can be changed independently

This is why architecture diagrams are not just for architects.
They are coordination tools.

The doctrine is:
- the best architecture diagram reduces how much organizational memory must be kept in people's heads

---

## Pattern 10 — Some Diagrams Should Be Refused

A mature documentation posture should sometimes say no.

Refuse or defer diagrams when:
- the system is not understood well enough yet
- the requested detail level is wrong for the decision
- the diagram would instantly go stale with no maintenance path
- the prose explanation or simpler artifact would actually be clearer

The doctrine is:
- not every visual request deserves a diagram
- only the ones that genuinely increase understanding

---

## Architecture Diagram Checklist

Before calling an architecture diagram healthy, ask:

- [ ] What decision or misunderstanding does this diagram reduce?
- [ ] Is the zoom level correct for the question being asked?
- [ ] Is the diagram generated, authored, or hybrid for a clear reason?
- [ ] Can the artifact remain fresh enough to trust?
- [ ] Does it live inside a real documentation/review workflow?
- [ ] Does it reduce cognitive load rather than just look polished?

---

## Anti-Patterns

- architecture diagrams created for presentation optics only
- one giant diagram trying to answer every question
- stale hand-maintained diagrams with no visible owner
- generated graphs presented without explanation of what to look at
- diagrams detached from docs, ADRs, or review context
- choosing visuals when the system is still too unclear to depict honestly

---

## Cross-Links

Read this alongside:
- `diagram-tooling.md`
- `platform-infrastructure.md`
- `project-scaffolding.md`
- `build-and-deploy/build-deploy.md`
- `../documentation-guidelines/SKILL.md`

---

## Final Doctrine

The reusable lesson is not:
> “architecture as code means diagrams in Markdown.”

The reusable lesson is:
> “architecture diagrams are valuable when they externalize the right structural truth at the right zoom level, stay reviewable and fresh enough to trust, and reduce the next architectural question rather than merely decorate the documentation.”
