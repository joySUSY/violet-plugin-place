# Data Processing Index

## Purpose

Canonical entrypoint for deterministic data and document processing doctrine inside `developer-tool`.

Use this category when the task is about:

- tabular or document extraction
- schema validation and normalization
- ETL or ELT style processing
- migration-oriented data shaping
- generated structured outputs
- deciding what belongs inside the pipeline versus what belongs in orchestration above it

This index is not only a document list.
It exists to route readers into the correct data-processing doctrine lane based on the kind of pipeline pressure they need to resolve.

## Source Provenance

- **Primary source:** current `developer-tool` data-processing doctrine subtree under `references/data-processing/`
- **Derived from:** data-processing lane canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current `data-processing` lane

---

## Data-Processing Spine

The `data-processing` subtree now has a clear doctrinal spine:

1. **Deterministic pipeline law**
   - `data-processing.md`
2. **Orchestration and workflow cross-links**
   - `../data-agent-workflows.md`
3. **Investigative and analysis cross-links**
   - `../code-quality-analysis.md`
4. **Root runtime shell cross-links**
   - `../../commands/prime/data-processing-surface.md`
   - `../../agents/data-processing-diagnostician.md`

The doctrine is:

- data-processing reasoning should move from deterministic pipeline law → orchestration boundary → investigative or runtime-surface escalation if needed
- not jump straight into multi-agent orchestration or runtime tooling before the pipeline stages and output contract are explicit

---

## Documents and Their Roles

| File                          | Primary Role                                                                                                                      | Load When                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `data-processing.md`          | Root doctrine for format detection, validation, normalization, transformation, migration, and output contracts                    | you need the processing model first                              |
| `../data-agent-workflows.md`  | Orchestration doctrine for multi-agent, MCP, or topology-heavy data workflows                                                     | the real issue is workflow coordination rather than stage design |
| `../code-quality-analysis.md` | Investigative analysis doctrine for cases where the bottleneck is exploratory inspection rather than deterministic transformation | the task is analysis-heavy rather than pipeline-heavy            |

---

## Reading Paths

### If you need the deterministic pipeline model first

1. `data-processing.md`
2. then branch by the dominant processing pressure

### If the task is about extraction, normalization, or transformation stages

1. `data-processing.md`
2. stay inside the stage model until the output contract and validation posture are explicit

### If the task is about schema or output-contract pressure

1. `data-processing.md`
2. `../code-quality-analysis.md` only if you need investigative support before the contract can be stabilized
3. return to the pipeline doctrine once the ambiguity is reduced

### If the task is about migration-oriented data shaping

1. `data-processing.md`
2. `../data-agent-workflows.md` if the migration becomes topology- or orchestration-heavy
3. route into build/deploy or governance only if the blast radius becomes operational rather than purely transformational

### If the task is about document-heavy or mixed-source workflows

1. `data-processing.md`
2. `../data-agent-workflows.md` when extraction must be coordinated across tools or agents
3. `../code-quality-analysis.md` if investigative inspection is the real pressure first

### If the task is about runtime-surface support for data processing

1. `data-processing.md`
2. `../../commands/prime/data-processing-surface.md`
3. `../../agents/data-processing-diagnostician.md` if bounded specialist diagnosis is actually needed

---

## Data-Processing Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **pipeline stages**, **schema/output contracts**, **document extraction**, **migration shaping**, or **workflow orchestration**?
2. Is this still a deterministic processing question, or already an orchestration/runtime-shell question disguised as one?
3. Do we need the pipeline doctrine first, or are we already certain the problem is primarily workflow or investigative analysis?
4. Are we trying to detect, validate, normalize, transform, emit, or coordinate?

The doctrine is:

- data-processing docs are organized by pipeline pressure and contract pressure
- not by whichever tool or file format is most visible first

---

## Cross-Links

Data-processing doctrine overlaps naturally with these lanes:

- **Root references**
  - `../INDEX.md`
- **Root runtime shell**
  - `../../commands/prime/data-processing-surface.md`
  - `../../agents/data-processing-diagnostician.md`
- **Build and deploy**
  - `../build-and-deploy/INDEX.md`
- **Tool ecosystem**
  - `../tool-ecosystem/INDEX.md`
- **Documentation / analysis**
  - `../code-quality-analysis.md`
  - `../data-agent-workflows.md`

The doctrine is:

- data-processing is where structure becomes trustworthy stage by stage
- so it must remain connected to orchestration, validation, and runtime-shell escalation rather than pretending deterministic pipelines live in isolation from the rest of the engine

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- runtime-aware and orchestration-aware cross-links

It should **not** depend on donor skill bundles or legacy ETL notes for its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “data-processing is where the ETL and extraction docs live.”

The reusable lesson is:

> “the `data-processing` subtree is the canonical navigation layer for deterministic structure-making inside `developer-tool`—routing engineers from pipeline law into the exact validation, normalization, migration, or orchestration doctrine they need before data work hardens into automation.”
