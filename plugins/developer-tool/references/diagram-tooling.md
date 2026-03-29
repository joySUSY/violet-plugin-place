# Diagram Tooling and Visualization

## Purpose

Define the canonical doctrine for diagram generation, visualization strategy, and architecture-as-code inside `developer-tool`.

This document is not merely a catalog of diagram formats.
It exists to answer the more important question:

> when a system, workflow, or codebase needs to become visible, what diagram surface should we choose, how should it be generated, and how do we keep the resulting artifact from turning into stale decorative fiction?

It covers:
- format selection
- diagram-as-code posture
- code-derived visualizations
- editable vs generated outputs
- architecture communication and review workflows

## Source Provenance

- **Primary source:** current `developer-tool` visualization / documentation / MCP leverage doctrine cluster
- **Derived from:** absorbed diagram-generator, draw.io, mermaid, graphviz, excalidraw, plantuml, code-logic, and codemapper-oriented donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local diagram doctrine aligned to the current developer-tool engine

---

## Core Rule

A diagram is useful when it makes a system easier to reason about than prose alone.
A diagram is harmful when it becomes a stale artifact that no longer reflects reality.

The doctrine is therefore:
- choose the format based on the communication need
- prefer diagrams that can be regenerated or diffed where possible
- treat visuals as part of the engineering surface, not as presentation garnish

The goal is not just to "make a diagram."  
The goal is to make the right structural truth legible.

---

## Visualization Surface Map

| Need | Best Surface |
|---|---|
| fast text-based architecture or flow explanation | Mermaid |
| editable, complex architecture review artifact | draw.io |
| hand-drawn or workshop-style collaborative visual | Excalidraw |
| graph/dependency/tree/DAG representation | Graphviz (DOT) |
| formal UML-heavy modeling | PlantUML |
| code-derived visual explanation | AST/dependency graph → Mermaid or DOT |

The format should follow the kind of truth you are trying to communicate.

---

## Pattern 1 — Diagram Selection Is a Communication Decision

The first question is not:
> which format do we personally like?

The first question is:
> what kind of reasoning must this artifact support?

Examples:
- quick README overview -> Mermaid often wins
- architecture review with manual editing and layered layout -> draw.io often wins
- dependency graph or call graph -> Graphviz often wins
- collaborative workshop or rough planning session -> Excalidraw often wins

The doctrine is:
- choose the surface that best supports the decision being made
- not the one with the most features in the abstract

---

## Pattern 2 — Text-Based Diagrams Win When Reviewability Matters

Mermaid, DOT, and PlantUML are strong because they are:
- diffable
- PR-reviewable
- easier to version-control
- easier to regenerate or refine repeatedly

This makes them excellent for:
- docs-as-code
- design reviews in Git
- architecture decision records
- repeatable system descriptions

The doctrine is:
- when version control and incremental refinement matter, prefer text-first diagram formats

---

## Pattern 3 — Editable Diagram Canvases Win When Layout and Visual Curation Matter

Draw.io and Excalidraw are valuable when:
- layout clarity matters more than text diffability
- manual visual tuning is important
- the audience benefits from high-fidelity arrangement
- the diagram is used in collaborative review or presentation settings

But editable canvases also raise the staleness risk.
That means they need stronger regeneration or maintenance discipline.

The doctrine is:
- editable diagrams are good when they materially improve understanding
- but they need process discipline to stay truthful

---

## Pattern 4 — Diagrams Should Prefer Regeneration Over Manual Drift

The elite posture is architecture-as-code.

That means, where practical, diagrams should be:
- generated from source structures
- derived from schemas or dependency graphs
- updated from canonical JSON/spec representations
- regenerated when the underlying system changes

This is especially valuable for:
- call graphs
- dependency graphs
- route maps
- schema relationships
- reproducible network or deployment topology visuals

A hand-maintained diagram is not wrong by default.
But if it can be generated and isn't, its drift risk is much higher.

---

## Pattern 5 — Diagram Tooling Must Distinguish Between Model and Rendering

A healthy visualization workflow separates:
- the conceptual model
- the rendering format

Examples:
- architecture expressed as structured JSON -> rendered to draw.io
- dependency graph expressed as nodes/edges -> rendered to DOT or Mermaid
- workflow model -> rendered to Mermaid sequence or flowchart

This separation matters because it allows:
- output format changes
- regeneration
- validation
- structured editing before rendering

The model is the truth. The diagram file is one rendering of that truth.

---

## Pattern 6 — Code-Derived Visuals Should Be Used for Structural Truth, Not Decorative Storytelling

Code-derived diagrams are especially strong for:
- module relationships
- import graphs
- call graphs
- AST-based structure
- route/dependency/service topology

They are weaker when trying to replace human explanation entirely.

The doctrine is:
- generate structure from code when structure is what matters
- still use human-authored diagrams where intent, rationale, or conceptual grouping must be explained

Generated structure and human narrative should complement one another.

---

## Pattern 7 — Architecture Reviews Need the Right Diagram Level

Not every architecture conversation needs the same zoom level.

Useful levels include:
- context/system overview
- container/service/module layout
- component interactions
- sequence or event flow
- data model / relationship shape
- dependency or call graph

Choosing the wrong level creates confusion:
- too high-level -> hides critical details
- too low-level -> overwhelms the audience

The doctrine is:
- choose the zoom level that matches the decision being made

---

## Pattern 8 — Diagram Workflows Belong Close to Documentation Workflows

A diagram is rarely the final output by itself.
It often belongs inside:
- README
- architecture docs
- ADRs
- handoff docs
- design proposals
- incident reviews

This is why diagram tooling should remain tightly connected to documentation doctrine.

The strongest visual workflows answer:
- what problem does this diagram explain?
- who is the audience?
- where will it live?
- how will it stay current?

Without those answers, the diagram is probably overproduced and underused.

---

## Pattern 9 — MCP and Tooling Automation Should Increase Leverage, Not Hide the Model

Diagram generation can benefit from MCP or external tooling when it enables:
- structured generation
- repeatable conversion between models and formats
- image/export workflows
- batch regeneration
- integration with docs pipelines

But automation should not hide the underlying model so thoroughly that maintainers cannot reason about the diagram anymore.

The doctrine is:
- automation should reduce labor and drift
- not reduce understandability

---

## Pattern 10 — A Good Diagram Reduces the Next Question

A successful diagram helps the reader ask a better next question.

Examples:
- "Which service owns this boundary?"
- "Where does the data flow next?"
- "Which dependency edge is suspicious?"
- "What layer should I inspect now?"

If the diagram merely looks polished but does not reduce the next question, it is decorative, not diagnostic.

---

## Diagram Tooling Checklist

Before calling a visualization workflow healthy, ask:

- [ ] Was the format chosen for the communication need rather than personal preference?
- [ ] Is the diagram text-based, editable, or generated for a clear reason?
- [ ] Is there a distinction between the structural model and the rendered output?
- [ ] Will the diagram stay current, or is it likely to drift immediately?
- [ ] Does the zoom level match the review or documentation task?
- [ ] Does the visual actually reduce the reader's next question?

---

## Anti-Patterns

- choosing a diagram tool first and inventing a need later
- hand-maintained architecture diagrams with no update path
- code-derived graphs used where human explanation is what actually matters
- beautiful visuals with no clear audience or documentation home
- over-detailed diagrams for high-level decisions
- over-abstract diagrams for concrete operational debugging

---

## Cross-Links

Read this alongside:
- `architecture-diagrams.md`
- `tool-ecosystem/mcp-leverage-model.md`
- `project-scaffolding.md`
- `platform-infrastructure.md`
- `../documentation-guidelines/SKILL.md`

---

## Final Doctrine

The reusable lesson is not:
> “pick Mermaid for simple diagrams and draw.io for complex ones.”

The reusable lesson is:
> “diagram tooling should make the right structural truth visible at the right level, in a format that matches the audience, review workflow, and maintenance model—so the diagram remains an engineering asset instead of becoming decorative drift.”
