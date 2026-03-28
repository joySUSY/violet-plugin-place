---
description: "Prime the planning-strategy engine — activate plan-before-code discipline with ADR templates, task decomposition, and recall-governed reasoning."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Planning Foundations Primer

> Weeks of coding can save you hours of planning.
> 几周的代码编写往往可以通过几小时的规划来避免。

### Before You Write Code

1. **Recall**: Check prior decisions, failures, and continuity artifacts
   - `${CLAUDE_PLUGIN_ROOT}/references/recall-governed-planning.md`
2. **Requirements**: Transform vague intent into testable constraints
   - `${CLAUDE_PLUGIN_ROOT}/references/product-requirements.md`
3. **Architecture**: Document the decision with rejected alternatives
   - `${CLAUDE_PLUGIN_ROOT}/references/architecture-decisions.md`
4. **Tasks**: Break the work into dependency-aware, parallelizable units
   - `${CLAUDE_PLUGIN_ROOT}/references/task-coordination.md`

### Classify Your Planning Need

```
IF new project       -> PRD first, then ADR for each major decision, then task.md
IF architecture pick -> ADR with at least 2 rejected alternatives and rationale
IF feature request   -> Testable constraints (P99 < 200ms, not "make it fast")
IF epic breakdown    -> Dependency graph, critical path, parallel tracks
IF trade-off         -> Decision matrix with weighted criteria
IF prior art exists  -> Recall-governed: load history before planning fresh
```

### ADR Template (Minimal)

```markdown
# ADR-NNN: [Decision Title]

## Status: Proposed | Accepted | Superseded

## Context
What forces are at play? What problem demands a decision?

## Decision
What did we choose?

## Alternatives Considered
1. [Alternative A] — rejected because...
2. [Alternative B] — rejected because...

## Consequences
What becomes easier? What becomes harder?
```

### Task Decomposition Rules

- Build interfaces and mocks first so parallel tracks can start immediately
- Every task must have a clear "done" definition
- Identify the critical path — everything else is parallel
- Dependencies flow downward — never create circular task dependencies
