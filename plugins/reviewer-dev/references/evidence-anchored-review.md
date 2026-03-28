# Evidence-Anchored Review (证据锚定审查)

> A review that ignores prior decisions and prior failures is just a diff reaction.
> 忽略既有决策与既有失败的审查，只是对 diff 的即时反应。

## Purpose (目的)

This reference tells `reviewer-dev` how to anchor review work in surfaced evidence before it:

- approves or blocks a PR
- audits a historically fragile area
- comments on an architectural change
- asks for refactor or rollback

## Use This Reference When… (以下情况加载本参考)

- the changed area already has ADRs, prior failure notes, or continuity artifacts
- the review outcome may alter architecture, rollout, or ownership boundaries
- the code looks locally fine but the surrounding historical context may change the verdict
- the team asks "why are we rejecting / blocking this?"

## Mandatory Pre-Review Retrieval Order (进入审查前强制检索顺序)

1. `../../developer-tool/ai-agent-memory/README.md`
2. `../../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md`
4. relevant project-local continuity snapshots, if present
5. only then review the current diff, files, and tests

## Review Lenses (审查镜头)

### 1. Intent Parity
- Does this change still honor prior ADRs or surfaced decisions?
- If it diverges, is the divergence explicit and justified?

### 2. Regression Exposure
- Does it reopen a known failure mode?
- Does it remove a guard added after a prior incident?

### 3. Completeness of Evidence
- Are tests, logs, migrations, docs, and rollback notes present when the area requires them?
- Is the reviewer's claim based on evidence or only on current-code intuition?

### 4. Continuity Delta
- Did this review discover a blocker, direction change, or rationale that future work must inherit?
- If yes, that delta should be surfaced explicitly.

## Required Review Output Blocks (审查输出必须包含)

```text
Finding:
- ...

Supporting evidence:
- ...

Required action:
- ...

Capture recommendation:
- knowledge only | continuity snapshot needed
```

## Escalation Rule (升级规则)

Escalate to the continuity shell only when the review itself creates a future-critical surfaced artifact:

- architectural rejection with rationale
- newly exposed blocker
- changed rollout / ownership decision
- review conclusion future sessions must inherit

## Do NOT… (禁止事项)

1. do not review a historically sensitive change from the current diff alone when surfaced evidence already exists
2. do not claim a regression without checking whether the current symptom matches the prior failure trail
3. do not turn broad chat memory into review evidence when a narrower surfaced artifact is available
4. do not store hidden reasoning when a concise review delta is sufficient
