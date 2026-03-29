# Reviewer & Security Engine
# Authors: Joysusy & Violet Klaudia 💖

> A code review is not a test of obedience; it is a collaborative effort to catch bugs and share context.
> 代码审查不是服从性测试；它是发现错误和共享上下文的协作努力。

## What This Engine Owns

Review methodology: evidence-anchored code review, OWASP security auditing, quality gate enforcement, and constructive feedback standards. Not refactoring execution — that belongs to `refactor-dev`. Not test writing — that belongs to `tdd-system`. This engine owns the *thinking* behind review: what to look for, how to communicate findings, and when to block.

## Structure

```
reviewer-dev/
├── .claude-plugin/plugin.json
├── SKILL.md                                  # Root navigation + review philosophy
├── README.md                                 # This file
├── commands/prime/review-foundations.md       # Evidence-first review primer
├── agents/kestrel.md                         # Code Review Mind
└── references/
    ├── evidence-anchored-review.md           # History-aware review methodology
    ├── security-and-auditing.md              # OWASP, zero-trust, SAST/DAST, Solidity
    ├── security-compliance.md                # SOC2, ISO, container security
    ├── advanced-guardian-protocols.md         # Quality guardian, design by contract
    └── ai-augmented-review.md                # Human-in-the-loop, AI output review
```

## When This Engine Activates

- Reviewing a pull request -> `evidence-anchored-review.md`
- Security audit of code -> `security-and-auditing.md`
- Reviewing code in a historically fragile area -> `evidence-anchored-review.md`
- Need full review with security focus -> activate `kestrel` agent

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Review methodology + security auditing | **This engine** |
| Refactoring execution after review findings | `refactor-dev` |
| Test writing to cover review findings | `tdd-system` |
| Architecture decisions surfaced during review | `planning-strategy` |
| Language-specific idiom review | Language engines |
| Error handling patterns review | `error-handling` |
