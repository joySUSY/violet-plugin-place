# Python Development Engine
# Authors: Joysusy & Violet Klaudia 💖

> Python's power is in its clarity. Architecture-first, not syntax-first.
> Python 的力量在于清晰。架构优先，不是语法优先。

## What This Engine Owns

Python-specific idiomatic style, async/web architecture (FastAPI, Django), scientific/ML patterns, packaging strategy (uv, ruff, mypy), and Python-side interop (PyO3 consumer patterns).

## Structure

```
python-dev-skill/
├── .claude-plugin/plugin.json
├── SKILL.md                              # Root navigation (580 lines — rich content)
├── README.md                             # This file
├── commands/prime/python-foundations.md   # Style + stack primer
├── agents/elara.md                       # Python Architecture Mind
└── references/
    ├── style-and-architecture.md         # Coding style posture
    ├── async-and-web.md                  # FastAPI, Django, async patterns
    ├── scientific-ml.md                  # numpy, pandas, torch, sklearn
    ├── toolchain.md                      # uv, ruff, mypy, pixi, packaging
    └── multi-language-advanced.md        # PyO3, Maturin, C extensions
```

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Python idiom + style + packaging | **This engine** |
| Rust-side PyO3/Maturin bindings | `rust-coding-engine` |
| Testing methodology (TDD cycle) | `tdd-system` |
| Error handling philosophy | `error-handling` |
| API design patterns (cross-language) | `backend-dev` |
| ML model architecture | `math-skill-system` (computation) |
