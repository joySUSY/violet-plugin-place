# Recall-Governed Planning (回忆约束规划)

> Plans must start from surfaced evidence, not blank-slate confidence.
> 规划必须从已浮现的证据开始，而不是从“我大概记得”开始。

## Purpose (目的)

This document tells `planning-strategy` how to consume the Batch 1 memory / history / continuity control baseline before writing:

- PRDs
- ADRs
- task decomposition plans
- rollout / migration plans
- recovery plans after interruption

## Use This Reference When… (以下情况加载本参考)

- the plan touches a domain that was attempted before
- architectural direction depends on prior failures or rejected options
- you are resuming planning after compaction, interruption, or context loss
- you need to explain **why this plan differs** from a prior path

## Mandatory Pre-Plan Read Order (强制预读顺序)

1. `../../developer-tool/ai-agent-memory/README.md`
2. `../../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md` when prior sessions / commits / deleted artifacts matter
4. `../../developer-tool/references/ai-agent-memory/claude-recall-patterns.md` when rule-loader or search-before-mutate posture matters
5. `../../developer-tool/references/ai-agent-memory/memory-trigger-matrix.md` when deciding whether the planning result requires project-local continuity capture

Do not jump to donor repositories first unless the canonical references are insufficient.

## Required Planning Output Blocks (规划输出必须包含)

Every non-trivial plan should explicitly surface:

### 1. Recalled Inputs
- prior decisions reused
- prior failures to avoid
- relevant historical rationale chain

### 2. Planning Consequence
- what the recalled evidence changes about the plan
- which option is now preferred or rejected

### 3. Unknowns / Gaps
- what is still unknown
- what requires spike / research / validation

### 4. Capture Decision
- whether the result stays in the knowledge layer only
- or whether it should be externalized as project-local surfaced continuity

## Handoff Rule (交接规则)

If the planning cycle produces a handoff-worthy delta, hand off to the continuity shell **after** the plan is explicit:

- new ADR-worthy decision
- newly discovered blocker
- changed direction after comparing alternatives
- partial execution state the next session must inherit

Use `../../plugins/violet-memory-lab/commands/capture-continuity.md` only for that surfaced delta.

## Do NOT… (禁止事项)

1. do not write a fresh plan while ignoring prior failures already available in surfaced artifacts
2. do not treat vague memory as equivalent to a cited ADR or surfaced continuity snapshot
3. do not dump broad chat history into the plan if a narrow rationale trail is enough
4. do not capture hidden reasoning just because planning involved complex trade-offs

## Minimal Output Shape (最小输出形态)

```text
Recalled inputs:
- ...

Planning consequence:
- ...

Unknowns:
- ...

Capture decision:
- knowledge only | continuity snapshot needed
```
