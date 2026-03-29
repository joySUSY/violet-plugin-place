# Claude Recall Operating Model

## Purpose

Define the canonical operating model derived from Claude Recall–style memory systems.

This document captures the reusable parts of that design without inheriting the product directly.

## Source Provenance

- **Primary source:** Claude Recall–style recall-system patterns distilled into the current `developer-tool` memory lane
- **Derived from:** project-scoped recall, rule-loading, failure-learning, and skill-promotion patterns preserved during memory canonization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local operating-model doctrine aligned to the current developer-tool engine

---

---

## Core Rule

A recall system should make prior project knowledge easy to reapply before new action begins.

The most important features are not the database brand or CLI syntax.
They are:

- recall-before-act posture
- project scoping
- failure learning
- memory search before mutation
- structured skill promotion from accumulated memory

---

## Pattern 1 — Project-Scoped Memory

A strong recall model scopes memory by project or working directory.

Why:

- preferences are often local to one project
- architecture decisions are project-specific
- conventions should not leak blindly between unrelated codebases

Good memory systems therefore support:

- project namespace separation
- universal/global memory only where explicitly appropriate
- automatic context switching when project changes

---

## Pattern 2 — Load Rules at Task Start

The system should have a stable way to load active project rules before serious work begins.

This is stronger than “maybe search if you remember”.
It means the shell can assume that:

- preferences
- corrections
- failures
- devops or workflow rules

are part of the active task posture early, not as an afterthought.

---

## Pattern 3 — Failure Learning Matters

A strong recall engine stores:

- what failed
- why it failed
- what not to repeat
- what to do instead

This is more valuable than simply storing raw preferences.

A memory system that only remembers taste but not error recovery is incomplete.

---

## Pattern 4 — Skill Crystallization

One of the strongest donor ideas is that accumulated memories can be promoted into structured skill-like doctrine.

That means the memory system should not remain:

- only a search interface
- only a database
- only an archive

It should be able to promote stable repeated patterns into:

- skill doctrine
- reference docs
- reusable shell guidance

This is directly aligned with our canonical deep-fusion strategy.

---

## Pattern 5 — Local-Only and Transparent by Default

A strong local recall model should prefer:

- on-machine storage
- explicit search and export paths
- inspectable data
- low hidden telemetry posture

This does not mean all systems must be offline.
It means the default memory posture should remain transparent and inspectable.

---

## Pattern 6 — Memory Search Is a Runtime Primitive

Recall is not an optional afterthought.
It is a runtime primitive for good engineering behavior.

This is why recall systems often pair:

- doctrine (why memory matters)
- runtime shell surfaces (how recall happens)
- lifecycle hooks (when recall must happen)

That triad is the reusable lesson.

---

## Why This Matters to `developer-tool`

The `developer-tool` control plane owns the doctrine around:

- recall-before-act
- project-local continuity
- structured memory promotion
- runtime shell boundaries for memory systems

This document therefore serves as the canonical description of the Claude Recall–style operating model inside the engine.
