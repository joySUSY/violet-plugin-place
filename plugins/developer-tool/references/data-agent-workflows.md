# Data Processing and Agent Workflows

## Purpose

Define the canonical doctrine for data pipelines, document processing, MCP-oriented tool orchestration, and multi-agent workflow design inside `developer-tool`.

This document is not a random bundle of CSV, PDF, MCP, and coordination tips.
It exists because these capabilities often appear together in real developer-tool systems:
- data must be ingested and normalized
- documents must be extracted or generated
- tool surfaces must expose structured operations
- multi-agent workflows must coordinate the work safely

The real question is:

> how do we turn messy external inputs into structured, verifiable outputs while choosing the right mix of tools, pipelines, and agents?

## Source Provenance

- **Primary source:** current `developer-tool` data-processing, MCP, and agentic orchestration doctrine cluster
- **Derived from:** absorbed csv-data-wrangler, data-researcher, pdf/docx, documentation-engineer, librarian, mcp-developer, multi-agent-coordinator, and cli-developer donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local data/agent workflow doctrine aligned to the current developer-tool engine

---

## Core Rule

Data-agent workflows should be designed as pipelines of explicit transformations.

That means a mature workflow should answer:
- what raw input is accepted?
- how is it validated or normalized?
- where is structure extracted?
- which tool or runtime surface performs each step?
- when should one agent work alone vs when should work be decomposed across agents?
- how is the final output verified?

The goal is not to "process data somehow."  
The goal is to preserve structure, reduce ambiguity, and keep orchestration explainable.

---

## Workflow Surface Map

| Surface | What it is best at |
|---|---|
| Data pipeline | schema validation, cleaning, transformation, aggregation |
| Document pipeline | content extraction, OCR, table parsing, structural reconstruction |
| Documentation pipeline | output formatting, ADRs, runbooks, generated reference artifacts |
| MCP surface | exposing structured tools/resources/prompts to agents |
| Multi-agent topology | parallel or staged execution when one agent is no longer the right container |

These are related surfaces, but not interchangeable.

---

## Pattern 1 — All Pipelines Start With Input Classification

Before choosing a tool, classify the input.

Examples:
- tabular data
- semi-structured records
- scanned documents
- native text documents
- presentation/slide content
- structured API responses

The doctrine is:
- classify the data/document first
- then choose extraction and transformation strategy

Many bad pipelines start with the wrong assumption about the source format.

---

## Pattern 2 — Extraction and Normalization Are Distinct Steps

A good pipeline distinguishes:

### Extraction
Get content out of the source.

### Normalization
Make the extracted content coherent enough for downstream use.

Examples of normalization:
- canonical null handling
- deduplication
- schema coercion
- date/number parsing
- header cleaning
- encoding normalization

The doctrine is:
- do not assume extracted output is analysis-ready
- normalization is its own boundary and deserves explicit design

---

## Pattern 3 — Data Size Should Influence Tool Choice

Tool selection should follow data shape and scale.

Examples:
- small/interactive -> flexible in-memory tools may be fine
- medium/columnar -> lazy or vectorized systems are stronger
- large/out-of-core -> query engines or chunked processing become more appropriate
- streaming -> line-by-line or bounded-memory posture matters more than convenience

The doctrine is:
- choose tools by operational data size and access pattern
- not by habit or ecosystem loyalty alone

---

## Pattern 4 — Document Processing Needs Format-Specific Strategy

A PDF is not just a PDF.  
A DOCX is not just text in a different wrapper.

Useful distinctions:
- text-native vs scanned PDFs
- OCR vs direct extraction
- table extraction vs paragraph extraction
- structure-preserving vs plain-text extraction
- document generation vs document ingestion

The doctrine is:
- documents must be routed by format and content shape
- not all extraction pipelines can share one flat strategy

---

## Pattern 5 — Output Shape Should Be Decided Early

A pipeline is easier to reason about when the desired output is explicit from the start.

Examples:
- structured JSON
- Markdown summary
- CSV output
- normalized relational records
- generated docs or runbook artifacts

The doctrine is:
- output format is not the final afterthought
- it shapes what transformations and validations are necessary upstream

This is especially important in document-engineering and MCP tool output design.

---

## Pattern 6 — MCP Surfaces Should Expose Structure, Not Hide It

When data/document workflows are exposed through MCP, good tool design should emphasize:
- one tool per meaningful action
- validated parameter schemas
- structured return values
- explicit resources for readable state
- prompts for reusable workflow framing where appropriate

The doctrine is:
- MCP should make structured workflows easier to call
- not turn good pipelines into black-box command piles

A tool boundary that hides too much structure becomes harder to debug and compose.

---

## Pattern 7 — Multi-Agent Topology Should Follow Workflow Shape

Multi-agent workflows are useful when the work naturally decomposes into:
- independent extraction passes
- parallel analyses
- staged transformations
- separate specialist roles for investigation vs generation vs synthesis

Useful topologies include:
- hub-and-spoke for coordinated specialist work
- pipeline for sequential stage transformations
- hierarchical for complex multi-domain orchestration

The doctrine is:
- choose topology based on dependency shape
- not because "more agents" sounds more advanced

---

## Pattern 8 — Coordination Needs Explicit Contracts Between Stages or Agents

A healthy multi-step or multi-agent pipeline should define:
- expected input shape
- expected output shape
- what counts as success/failure
- what evidence or artifacts are handed off
- where verification happens

Without these contracts, workflows degrade into hand-wavy orchestration where every stage interprets the previous one differently.

The doctrine is:
- each stage/agent handoff should be narrow enough to validate
- not broad enough to require guesswork

---

## Pattern 9 — Documentation Generation Is Also a Data Workflow

Documentation engineering belongs here because it is often the final structured transformation stage.

Examples:
- build extracted facts into Markdown reports
- generate ADRs from stabilized decisions
- synthesize normalized outputs into docs sites or runbooks
- emit architecture or operational artifacts from structured sources

The doctrine is:
- documentation output should be treated like a structured product of the pipeline
- not merely a manual write-up after the "real" work

---

## Pattern 10 — Verification Must Exist at Multiple Points in the Pipeline

A strong workflow validates more than just the final output.

Useful checkpoints:
- input validation
- normalization sanity checks
- schema conformance
- extraction completeness checks
- output contract verification
- downstream consumption tests where applicable

The doctrine is:
- verification should be layered
- not deferred entirely to the end

This is what keeps pipelines from silently carrying corruption forward.

---

## Pattern 11 — Libraries, Tools, and Agents Should Each Own the Right Portion of the Pipeline

A mature workflow should decide what belongs in:
- a reusable library function
- a CLI/tool surface
- an MCP server/tool
- a specialist agent
- a coordinator/lead agent

The doctrine is:
- reusable deterministic transformation -> library/tool
- explicit user-triggered workflow -> CLI command
- structured external invocation -> MCP tool/resource
- bounded specialist reasoning -> agent
- sequencing and synthesis -> coordinator

This keeps the workflow legible and easier to evolve.

---

## Pattern 12 — The Best Pipelines Reduce Human Ambiguity

A good data-agent workflow reduces questions like:
- what format is this really?
- what tool should handle it?
- where did structure get lost?
- which stage failed?
- who owns the next step?
- what output should downstream consumers expect?

If the workflow still forces operators to guess these repeatedly, it is under-designed.

---

## Data-Agent Workflow Checklist

Before calling a workflow healthy, ask:

- [ ] Is the input classified correctly before tool selection?
- [ ] Are extraction and normalization treated as distinct steps?
- [ ] Does tool choice match data size and format shape?
- [ ] Are MCP/tool surfaces structured and validated?
- [ ] If multiple agents are used, does topology match dependency shape?
- [ ] Are stage/agent handoffs explicit and verifiable?
- [ ] Is documentation or final artifact generation treated as a real output stage?
- [ ] Does verification occur at multiple points rather than only at the end?

---

## Anti-Patterns

- one universal parser mindset for all documents and datasets
- extraction output treated as analysis-ready without normalization
- using MCP or multi-agent orchestration when a simpler pipeline would be clearer
- stage handoffs with no explicit schema or success criteria
- generated documentation treated as disconnected from upstream structured data
- final-output validation only, with no earlier pipeline checks

---

## Cross-Links

Read this alongside:
- `data-processing/data-processing.md`
- `tool-ecosystem/mcp-leverage-model.md`
- `agentic-system-basis/ensemble-team-governance.md`
- `code-quality-analysis.md`
- `diagram-tooling.md`

---

## Final Doctrine

The reusable lesson is not:
> “use the right data tool, the right document extractor, and maybe some agents.”

The reusable lesson is:
> “data-agent workflows should be designed as explicit, verifiable pipelines: classify input first, separate extraction from normalization, choose tool and topology by workflow shape, and preserve structure across every stage so humans and agents both know what happens next.”

The reusable lesson is:

> “data-agent workflows should be designed as explicit, verifiable pipelines: classify input first, separate extraction from normalization, choose tool and topology by workflow shape, and preserve structure across every stage so humans and agents both know what happens next.”
