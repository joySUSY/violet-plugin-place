# Claude Code Plugin Shell Patterns

## Purpose

This document defines the canonical plugin-shell patterns that `developer-tool` wants future heavy engines to follow when targeting Claude Code.

It synthesizes the most useful structural lessons implied by:

- plugin runtime donors
- Claude-oriented plugin ecosystems
- command / skill / agent / hook best practices
- portability and lifecycle discipline

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** Claude Code plugin-structure, command/skill/agent/hook, and portability canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local plugin-shell doctrine aligned to the current developer-tool engine

---

---

## 1. Canonical Shell Shape

A plugin-grade heavy engine should prefer this shape:

```text
engine-name/
├── .claude-plugin/
│   └── plugin.json
├── skills/
├── agents/
├── hooks/
│   └── hooks.json
├── commands/
├── rules/
├── references/
├── modules/
├── scripts/
└── optional-mcp/
```

### Structural law

- `plugin.json` lives under `.claude-plugin/`
- runtime components live at plugin root
- component directories are explicit and separate
- internal surfaces are organized by function, not mixed arbitrarily

---

## 2. Surface Roles

### `skills/`

Use for:

- bridge routing
- reusable domain knowledge
- the first doctrinal step before action

Do not use for:

- full donor mirrors
- giant runtime automation blocks
- hidden lifecycle side effects

### `agents/`

Use for:

- bounded specialist reasoning
- focused reviews and diagnosis
- tasks where isolated context is an advantage

Do not use for:

- generic shell explanation
- duplicating whole doctrine trees

### `commands/`

Use for:

- explicit user-triggered workflows
- prime/route/audit actions
- repeatable operational entrypoints

Do not use for:

- storing doctrine
- replacing reference material

### `hooks/`

Use for:

- lifecycle priming
- continuity preservation
- conservative shell validation

Do not use for:

- broad mutation on every event
- heavy donor traversal
- hidden automation that bypasses doctrine

### `rules/`

Use for:

- shell laws
- deterministic boundaries
- runtime-safety expectations

### `references/`

Use for:

- deep doctrine
- case-study synthesis
- supporting detail too large for bridge skills or commands

### `modules/`

Use for:

- large integrated subdomains
- donor-rich bundles after curation
- staged zones that are too large for one flat reference page

---

## 3. Discovery and Activation Pattern

### Discovery order

A well-designed shell makes discovery flow like this:

1. bridge skill or explicit command
2. canonical doctrine/reference
3. specialist agent if reasoning needs isolation
4. lifecycle hook only if the shell needs automation

This keeps the shell comprehensible.

### Good activation

- selective
- reversible
- explicit where possible
- lifecycle-aware where justified

### Bad activation

- omnipresent
- noisy
- donor-driven instead of doctrine-driven
- hard to predict

---

## 4. Command Family Pattern

Heavy engines should start with three command families:

### `prime/`

Used to load the right doctrinal posture before work starts.

Examples:

- `prime/tool-runtime`
- `prime/memory-surface`
- `prime/rust-foundations`
- `prime/ts-foundations`

### `route/`

Used to choose the right lane before implementation.

Examples:

- `route/choose-tool-surface`
- `route/choose-concurrency-pattern`
- `route/choose-runtime-validation`

### `audit/` or `diagnose/`

Used when the shell needs inspection rather than immediate action.

Examples:

- `audit/plugin-structure`
- `diagnose/borrow-checker`

This command-family discipline keeps wave-1 shells operational without becoming bloated.

---

## 5. Hook Posture Pattern

### Wave-1 best practice

Prefer only:

- `SessionStart`
- `PreCompact`
- `Stop`

Use them conservatively.

### Why

These three cover:

- startup priming
- continuity preservation before compaction
- handoff/safety review at stop time

They provide leverage without turning the shell into an opaque automation machine.

### When stronger hooks are justified

Only later, when doctrine is stable and failure modes are well understood, consider:

- `PreToolUse`
- `PostToolUse`
- `UserPromptSubmit`
- domain-specific enforcement hooks

Even then, the burden of proof is high.

---

## 6. Portability Pattern

### Absolute rule

Use `${CLAUDE_PLUGIN_ROOT}` for intra-plugin path references.

This protects the shell from:

- installation path variance
- marketplace vs local install differences
- platform-specific path assumptions

### Consequence

All runtime scripts, hooks, and plugin-internal references should behave as relocatable infrastructure.

---

## 7. Doctrine vs Runtime Pattern

The shell is successful when:

- doctrine stays canonical
- runtime surfaces stay light
- donor reservoirs stay upstream

Correct:

`donor -> doctrine/reference -> shell surface`

Incorrect:

`donor -> shell surface directly`

This is the single most important anti-chaos rule for heavy engine plugins.

---

## 8. Why This Matters for Current Mainline

These patterns are not abstract style opinions.
They are the structural reason why:

- `developer-tool`
- `rust-coding-engine`
- `typescript-coding-engine`

were all upgraded to **plugin-first**.

Their donor complexity is too high for plain-skill-only containment.

---

## 9. Practical Shell Test

Ask of any heavy engine shell:

1. Can I tell what each surface owns?
2. Do skills route instead of duplicate?
3. Do commands provide explicit workflows?
4. Are hooks conservative and bounded?
5. Are donor repos still upstream rather than mirrored?
6. Can the shell degrade gracefully without MCP?

If the answer is no, the shell is still immature.
