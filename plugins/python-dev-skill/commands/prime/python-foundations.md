---
description: "Prime the Python engine — load style posture, architecture patterns, and toolchain guidance before writing Python code."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Python Foundations Primer

> Python's power is in its clarity. Don't waste it on clever tricks.
> Python 的力量在于清晰。别把它浪费在炫技上。

Read these based on your task:

### Style & Architecture (always read first)
- `${CLAUDE_PLUGIN_ROOT}/references/style-and-architecture.md`

### By Task Pressure

```
IF web API / backend      → references/async-and-web.md (FastAPI, Django, async patterns)
IF data science / ML      → references/scientific-ml.md (numpy, pandas, torch, sklearn)
IF packaging / toolchain  → references/toolchain.md (uv, ruff, mypy, pixi)
IF multi-language interop → references/multi-language-advanced.md (PyO3, Maturin, C extensions)
```

### Python Style Posture (Quick Reference)

- Type hints everywhere — `def fetch(url: str) -> Response:` not `def fetch(url):`
- Pydantic at boundaries — validate external data, trust internal data
- `async def` for I/O-bound work, sync for CPU-bound
- `uv` for package management, `ruff` for linting
- Immutable by default — `@dataclass(frozen=True)`, `tuple` over `list` where possible
