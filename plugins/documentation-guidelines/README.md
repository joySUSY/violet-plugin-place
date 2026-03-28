# Documentation Engineering Engine
# Authors: Joysusy & Violet Klaudia 💖

> Lead with the answer. Structure for scanning. Write for continuation.
> 先给结论。结构便于扫读。为接手者而写。

## What This Engine Owns

Technical writing methodology, BLUF discipline, API documentation standards, bilingual document production, semantic linking, and doc-as-code practices.

## Structure

```
documentation-guidelines/
├── .claude-plugin/plugin.json
├── SKILL.md
├── README.md
├── commands/prime/doc-foundations.md
├── agents/calliope.md              # Documentation Mind
├── hooks/hooks.json
├── references/
│   ├── codebase-and-api.md
│   ├── handoff-and-comms.md
│   ├── doc-engineering.md
│   ├── multi-language-docs.md
│   ├── semantic-linking.md
│   └── technical-writing.md
├── modules/ (design-md, effective-commenting, etc.)
├── v3-expansion/
└── examples/
```

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Writing methodology + doc standards | **This engine** |
| Code comments (max 5/file) | CODING_STYLE_DOCTRINE |
| Architecture diagrams | `developer-tool` |
| Code-specific documentation | Each language engine |
