# Data Processing Pipelines

## Purpose

Define the canonical doctrine for deterministic data extraction, normalization, transformation, and output shaping inside `developer-tool`.

This document is the focused processing counterpart to `../data-agent-workflows.md`.
Where `data-agent-workflows.md` explains orchestration, tools, and agent topology, this document answers a narrower question:

> once you already know a dataset or document should be processed, how should the pipeline itself be designed so the transformation is explicit, verifiable, and stable?

It applies to:
- CSV/TSV and tabular processing
- PDF and document extraction
- structured-output conversion
- ETL/ELT style transformations
- migration and normalization pipelines

## Source Provenance

- **Primary source:** current `developer-tool` data-processing and documentation-engineering doctrine cluster
- **Derived from:** absorbed csv-data-wrangler, data-researcher, pdf/docx processing, ETL, and migration-oriented donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local data-processing doctrine aligned to the current developer-tool engine

---

## Core Rule

A processing pipeline should make structure more trustworthy at each stage, not less.

That means a strong pipeline should clarify:
- what the input format really is
- what schema or structure is expected
- which transformations are lossless vs lossy
- which errors reject data vs quarantine it vs flag it
- what output contract downstream consumers can rely on

The goal is not merely to move bytes from one place to another.
The goal is to convert messy input into interpretable, validated, and operationally useful structure.

---

## Processing Stages

| Stage | Purpose |
|---|---|
| Detect | identify input format, encoding, and shape |
| Extract | get the raw content or records out |
| Validate | confirm expected structure and basic correctness |
| Normalize | make values consistent enough for transformation |
| Transform | reshape, aggregate, enrich, or filter |
| Emit | produce the final output contract |

A mature pipeline knows which of these stages are present and which are intentionally skipped.

---

## Pattern 1 — Input Detection Is Its Own Step

A surprising amount of pipeline failure comes from assuming:
- the delimiter is obvious
- the encoding is standard
- the PDF is text-native
- the document structure is flat
- the fields are typed the way the producer claims

The doctrine is:
- detect before transforming
- do not let the rest of the pipeline inherit a false premise about the input

This is especially important for CSV/TSV, PDFs, OCR, and mixed-source ingestion.

---

## Pattern 2 — Validation and Normalization Must Be Distinguished

Validation asks:
- does this row/document/record satisfy the minimum structure?

Normalization asks:
- how do we coerce the surviving content into a consistent internal form?

Examples of normalization:
- trimming whitespace
- standardizing null representations
- coercing date and numeric types
- deduplicating rows
- standardizing enum-like values

The doctrine is:
- validation rejects or flags bad input
- normalization repairs inconsistency where appropriate

Collapsing the two makes error handling muddy.

---

## Pattern 3 — Tool Choice Should Follow Size, Shape, and Access Pattern

Not every dataset wants the same tool.

Useful distinctions:
- small interactive tables
- medium analytical datasets
- large out-of-core or query-heavy data
- streaming or line-oriented feeds
- document extraction with structural heuristics

The doctrine is:
- choose the processing engine that matches the data's real shape and operational constraints
- not the tool the team happens to know best by habit

This often means different tools for different pipeline stages.

---

## Pattern 4 — Tabular Pipelines Should Be Schema-Aware Early

For CSV/TSV and similar data, high-value checks include:
- header presence and order expectations
- column count consistency
- type coercion feasibility
- primary-key uniqueness
- completeness thresholds
- range and referential sanity checks

The doctrine is:
- treat tabular input as structured data with contracts
- not as generic text that happens to have commas

This is what makes downstream transformations safer and easier to explain.

---

## Pattern 5 — Document Pipelines Must Choose Between Text, Structure, and Visual Recovery

Document processing usually has multiple competing goals:
- extract readable text
- preserve headings/outline
- extract tables accurately
- recover content via OCR when native text is absent
- generate structured JSON or Markdown output

The doctrine is:
- choose the document strategy based on what truth matters most
- not every pipeline should optimize for all extraction goals at once

A text-only extraction may be fine for summaries but weak for table fidelity.
An OCR-heavy workflow may recover content but lose layout nuance.

---

## Pattern 6 — Output Contract Must Be Chosen Deliberately

Useful output targets include:
- normalized CSV
- structured JSON
- Markdown summary
- relational import shape
- generated documentation or runbook content

The doctrine is:
- define the output contract before the pipeline gets too deep
- otherwise transformations drift without a clear destination

A good output contract makes it obvious what downstream systems can assume.

---

## Pattern 7 — Error Handling Should Reflect Data Value, Not Just Parser Behavior

A useful pipeline must decide what to do with bad or partial data.

Common options:
- reject immediately
- quarantine for later inspection
- flag and continue
- fill with defaults only where semantically safe

The doctrine is:
- error posture should match the value and risk of the data
- not simply the behavior of the parsing library

High-risk domains deserve stricter rejection.
Exploratory or noisy domains may justify softer quarantine/flag patterns.

---

## Pattern 8 — Data Quality Checks Are Part of the Pipeline, Not a Separate Ceremony

A strong pipeline should be able to answer:
- how complete is the data?
- how fresh is it?
- how unique are key records?
- what referential or range violations exist?
- where did quality degrade?

The doctrine is:
- quality checks should live close to the data flow
- not be bolted on after transformation when the original context is already gone

This keeps pipeline trust observable instead of rhetorical.

---

## Pattern 9 — Migration Pipelines Need Rollback and Verification Posture

Whenever the pipeline moves real data between systems or schemas, it should clarify:
- whether the move is big-bang or staged
- how counts and checksums are verified
- how rollback or compensation works
- how production-scale rehearsal happens before cutover

The doctrine is:
- migration is not just transformation with a bigger blast radius
- it is operational change that must preserve data trust while systems shift beneath it

---

## Pattern 10 — Generated Documents Are Still Pipeline Outputs

Documentation-generation flows should be treated as structured outputs from upstream data.

Examples:
- extracted facts -> Markdown report
- validated entities -> ADR or runbook
- normalized schema -> docs site or reference page

The doctrine is:
- when docs are pipeline outputs, they should inherit structure and verification from the pipeline
- not be written as detached narrative after the fact

This is where data-processing and documentation doctrine intersect.

---

## Pattern 11 — Processing Pipelines Should Be Explainable Stage by Stage

A useful pipeline should allow an operator to say:
- where the data came from
- what stage changed it
- where a failure occurred
- what the emitted output guarantees

The doctrine is:
- if a pipeline cannot be explained stage by stage, it is too implicit to trust at scale

This is one of the clearest differences between a script that happens to work and a real processing system.

---

## Data Processing Checklist

Before calling a pipeline healthy, ask:

- [ ] Has the real input shape been detected rather than assumed?
- [ ] Are validation and normalization separated clearly enough?
- [ ] Does tool choice match data size, format, and access pattern?
- [ ] Is the output contract explicit and useful downstream?
- [ ] Are data-quality checks embedded in the pipeline rather than bolted on later?
- [ ] If this is a migration, do verification and rollback posture exist?
- [ ] Can the pipeline be explained stage by stage?

---

## Anti-Patterns

- assuming CSV/document shape before detection
- treating normalization as an invisible side effect of parsing
- using one tool universally regardless of scale or format
- vague output shape with no explicit downstream contract
- transforming data deeply before checking whether it is even structurally valid
- migrations with no verification or rollback thinking
- documentation generated as prose with no preserved structure from upstream data

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../data-agent-workflows.md`
- `../code-quality-analysis.md`
- `../diagram-tooling.md`
- `../build-and-deploy/build-deploy.md`

---

## Final Doctrine

The reusable lesson is not:
> “data processing means ETL: extract, transform, load.”

The reusable lesson is:
> “a good processing pipeline makes structure progressively more trustworthy: detect the real input, validate and normalize deliberately, choose tools by scale and shape, and emit a downstream contract that is explicit enough to trust and explain.”
