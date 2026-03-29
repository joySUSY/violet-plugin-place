# Validation and Audit Patterns

## Purpose

Define how heavy engine shells should validate themselves and audit donor- or runtime-facing work.

This document focuses on:

- structure audits
- boundary audits
- doctrine-vs-runtime validation
- shell quality checks

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** shell validation, audit posture, and doctrine-vs-runtime verification canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local validation/audit doctrine aligned to the current developer-tool engine

---

---

## Core Rule

Validation in a heavy engine shell should answer:

1. Is the surface in the right place?
2. Is the boundary still clear?
3. Did donor material get absorbed correctly?
4. Did runtime behavior stay conservative?

---

## Audit Classes

### Structure Audit

Use when checking whether a plugin shell is laid out correctly.

Questions:

- Is the manifest in the right place?
- Are runtime surfaces separated by role?
- Are donor mirrors creeping into runtime?

### Boundary Audit

Use when checking whether doctrine, runtime, and donor layers are still distinct.

Questions:

- Is the shell becoming a second knowledge center?
- Is a bridge skill duplicating doctrine?
- Is runtime logic hiding what should be explicit?

### Surface Audit

Use when deciding whether a capability belongs in:

- skill
- command
- agent
- hook
- rule
- reference
- module
- optional MCP

### Lifecycle Audit

Use when checking whether hooks remain conservative and justified.

Questions:

- Is the shell too noisy?
- Are hooks performing too much work?
- Is lifecycle logic replacing explicit workflows?

---

## Good Audit Outputs

Good shell audits should return:

- the primary issue class
- the boundary being violated
- the correct destination surface
- the smallest safe correction

Bad shell audits return:

- vague dissatisfaction
- giant generic improvement lists
- donor worship without runtime boundary reasoning

---

## Heavy Engine Rule

For heavy engines, validation should happen in layers:

1. structure
2. boundary
3. runtime behavior
4. donor absorption
5. only then full replacement validation

Do not jump straight to “is everything done?”
if the shell itself is still structurally unstable.

---

## Why This Matters Now

We are still in the stage where shell correctness is becoming doctrinally stable.
So validation must stay:

- structural
- boundary-aware
- conservative

Only later does it become full replacement-grade evaluation.
