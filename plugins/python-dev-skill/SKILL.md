---
name: python-dev-skill
description: >
  Unified Python development skill. Covers idiomatic style, async/web (FastAPI/Django),
  project architecture, packaging, toolchain (uv/pixi/pytest), and scientific/ML stack
  (matplotlib, PyG, PathML). Teaches decision-making over pattern copying.
  Use for ANY Python task: new projects, APIs, data pipelines, ML, packaging, or code review.
  适用于所有Python开发场景：项目搭建、API开发、数据处理、机器学习、打包发布、代码审查。
metadata:
  model: opus
  version: "2.0"
  replaces:
    - fastapi-pro
    - python-code-style
    - python-development
    - python-patterns
    - python-project-structure
    - python-packaging
    - python-math
    - pytest-runner
    - uv-package-manager
    - matplotlib
    - pathml
    - pixi
    - torch-geometric
---

# Python Dev Skill

> Write Python like a thoughtful human, not a code generator.
> 写出有灵魂的Python，而不是机器味的代码。

---

## Philosophy — 编码哲学

Code is prose. Good Python reads like well-edited writing: every line intentional, nothing wasted, structure revealing intent before you read a single docstring.

**Our style principles:**

- Flat over nested. If you're indenting past 3 levels, rethink.
- Names are documentation. `retry_count` not `rc`. `UserRepository` not `Repo`.
- Let the type system talk. Type hints on public APIs, always. Local vars — let inference work.
- Composition over inheritance. Small functions that do one thing. Combine them.
- Errors are values, not surprises. Explicit error paths. No bare `except`.
- Async when waiting, sync when computing. Never mix them carelessly.

```
Good code feels inevitable — like there was no other way to write it.
好代码读起来像是唯一的写法——自然、必然、无可替代。
```

---

## Decision Framework — 决策框架

Before writing code, answer these. The answers shape everything downstream.

### What are you building?

```
API-first / Microservices ──→ FastAPI
Full-stack / CMS / Admin   ──→ Django
Script / CLI / Glue code   ──→ Plain Python + Click/Typer
Data pipeline              ──→ Python + pandas/polars
ML / Deep Learning         ──→ PyTorch ecosystem
Visualization              ──→ matplotlib (+ seaborn for stats)
Graph Neural Networks      ──→ PyTorch Geometric
Pathology / WSI            ──→ PathML
```

### Async or sync?

```
I/O-bound (DB, HTTP, files)     → async
CPU-bound (compute, transform)  → sync + multiprocessing
Simple script                   → sync
Mixed                           → async outer, sync compute in executor
```

### Project scale?

```
Script (< 200 lines)     → single file + requirements.txt
Small app (< 2k lines)   → flat package + pyproject.toml
Medium (2k-20k lines)    → src/ layout, layered architecture
Large (20k+ lines)       → src/ layout, domain-driven, monorepo with workspaces
```

### Package manager?

```
Pure Python, fast setup   → uv (10-100x faster than pip)
Mixed conda + PyPI deps   → pixi (conda-forge + PyPI unified)
Legacy / simple           → pip + venv
```

---

## Project Structure — 项目结构

### The Standard Layout

```
my-project/
├── src/
│   └── my_project/
│       ├── __init__.py      # Public API + __version__
│       ├── core.py          # Domain logic
│       ├── models.py        # Data structures
│       ├── services/        # Business logic layer
│       └── api/             # HTTP layer (if applicable)
├── tests/
│   ├── conftest.py          # Shared fixtures
│   └── test_core.py
├── pyproject.toml           # Single source of truth
├── README.md
└── .gitignore
```

**Rules:**
- `src/` layout prevents accidental imports from source — use it for anything beyond scripts
- One concept per file. Split at ~300-500 lines.
- Define `__all__` in every `__init__.py` — make public interfaces explicit
- Absolute imports only: `from my_project.services import UserService`
- Tests mirror source structure in a parallel `tests/` directory

### pyproject.toml — The Only Config File You Need

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["httpx", "pydantic>=2.0"]

[project.optional-dependencies]
dev = ["pytest>=8.0", "ruff>=0.4", "mypy>=1.10"]

[project.scripts]
my-cli = "my_project.cli:main"

[tool.ruff]
line-length = 120
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "C4", "UP", "SIM"]

[tool.mypy]
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --tb=short"
```

---

## Code Style — 代码风格

### Tooling: One Command to Rule Them All

```bash
# ruff replaces flake8 + isort + black. Use it.
ruff check --fix . && ruff format .

# Type checking
mypy .  # or pyright for speed
```

### Naming That Speaks

```python
# Files: snake_case, descriptive
user_repository.py       # not usr_repo.py

# Classes: PascalCase
class HTTPClientFactory:  # acronyms stay uppercase
    pass

# Functions/vars: snake_case
def get_user_by_email(email: str) -> User | None:
    max_retries = 3

# Constants: SCREAMING_SNAKE
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://api.example.com"
```

### Type Hints — Say What You Mean

```python
from collections.abc import Callable, Sequence

# Public APIs: always typed
def process_batch(
    items: Sequence[str],
    on_progress: Callable[[int, int], None] | None = None,
) -> list[str]: ...

# Use modern syntax (3.10+)
def find(id: int) -> User | None: ...     # not Optional[User]
def get_all() -> list[Item]: ...           # not List[Item]
```

### Docstrings — Google Style, Earned Not Mandatory

```python
def process_batch(
    items: list[Item],
    max_workers: int = 4,
) -> BatchResult:
    """Process items concurrently using a worker pool.

    Args:
        items: Must not be empty.
        max_workers: Concurrent workers. Defaults to 4.

    Returns:
        BatchResult with succeeded items and failures.

    Raises:
        ValueError: If items is empty.
    """
```

Simple functions with clear names and types don't need docstrings. Don't document the obvious.

---

## Async Patterns — 异步模式

### The Right Way

```python
import asyncio
import httpx

# Concurrent I/O — this is what async is FOR
async def fetch_all(urls: list[str]) -> list[dict]:
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]

# Streaming — memory-efficient for large data
async def stream_file(path: str) -> AsyncIterator[bytes]:
    async with aiofiles.open(path, "rb") as f:
        async for chunk in f:
            yield chunk
```

### Async Library Selection

| Need | Use |
|------|-----|
| HTTP client | `httpx` |
| PostgreSQL | `asyncpg` |
| Redis | `redis` (async mode) |
| File I/O | `aiofiles` |
| ORM | SQLAlchemy 2.0 async |

---

## FastAPI — The Modern API Framework

```python
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Pydantic models = your API contract
class UserCreate(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

# Dependency injection keeps it clean
@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    result = await db.execute(insert(User).values(**user.model_dump()))
    await db.commit()
    return UserResponse(id=result.inserted_primary_key[0], **user.model_dump())
```

**FastAPI architecture — separate concerns:**
```
routes/      → HTTP handling, validation (thin)
services/    → Business logic (fat)
repositories/→ Data access
schemas/     → Pydantic models
dependencies/→ Shared DI (db sessions, auth, config)
```

**Key patterns:**
- `async def` for I/O endpoints, `def` for CPU-bound (FastAPI auto-threads sync handlers)
- Pydantic Settings for config: `class Settings(BaseSettings): ...`
- Background tasks for fire-and-forget; Celery/ARQ for persistent queues
- Dependency injection with `yield` for resource cleanup

→ Deep dive: `references/async-and-web.md`

---

## Testing — 测试

### pytest — The Only Test Runner

```bash
# Activate venv first, always
source .venv/bin/activate && pytest tests/ -v

# Smart concurrency
# 1 test: -n0 | 2-7 tests: -n{count} | 8+: omit -n
pytest tests/test_api.py -n0
pytest tests/ --reuse-db  # skip DB recreation unless models changed
```

### Write Tests That Matter

```python
import pytest
from httpx import AsyncClient

@pytest.fixture
def mock_db():
    db = AsyncMock()
    db.users.get.return_value = {"id": 1, "name": "Test"}
    return db

@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        resp = await client.post("/users", json={"email": "a@b.com", "name": "A"})
        assert resp.status_code == 201
        assert resp.json()["email"] == "a@b.com"
```

**Testing strategy:**
- Unit tests for business logic (fast, isolated)
- Integration tests for API endpoints (TestClient / httpx)
- Fixtures for DB sessions, auth tokens, sample data
- `--reuse-db` by default, omit when models change

---

## Toolchain — 工具链

### uv — The Fast Lane

```bash
uv init my-project && cd my-project
uv python pin 3.12
uv add fastapi uvicorn pydantic
uv add --dev pytest ruff mypy
uv run pytest                    # no manual venv activation needed
uv lock                         # reproducible lockfile
```

### pixi — When You Need conda + PyPI

```bash
pixi init my-project && cd my-project
pixi add python ">=3.11"
pixi add numpy pandas
pixi add --pypi requests
pixi run python script.py
```

Use pixi when you need binary dependencies (CUDA, scientific libs) that conda handles better than pip.

→ Deep dive: `references/toolchain.md`

---

## Scientific & ML Stack — 科学计算与机器学习

### matplotlib — Visualization

```python
fig, ax = plt.subplots(figsize=(10, 6), constrained_layout=True)
ax.plot(x, y, linewidth=2, label="signal")
ax.set_xlabel("Time (s)")
ax.set_ylabel("Amplitude")
ax.legend()
plt.savefig("plot.png", dpi=300, bbox_inches="tight")
```

**Rules:** OO interface always (`fig, ax`). Never pyplot state machine in production. `constrained_layout=True` to prevent overlap. `viridis`/`cividis` for colorblind-safe palettes.

### PyTorch Geometric — Graph Neural Networks

```python
from torch_geometric.nn import GCNConv, global_mean_pool

class GNN(torch.nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.conv1 = GCNConv(in_dim, hidden)
        self.conv2 = GCNConv(hidden, out_dim)

    def forward(self, data):
        x = F.relu(self.conv1(data.x, data.edge_index))
        x = F.dropout(x, training=self.training)
        x = self.conv2(x, data.edge_index)
        return F.log_softmax(x, dim=1)
```

### PathML — Computational Pathology

```python
from pathml.core import SlideData
from pathml.preprocessing import Pipeline, StainNormalizationHE, TissueDetectionHE

wsi = SlideData.from_slide("slide.svs")
pipeline = Pipeline([TissueDetectionHE(), StainNormalizationHE(target="normalize")])
pipeline.run(wsi)
```

→ Deep dive: `references/scientific-ml.md`

---

## Packaging & Distribution — 打包发布

```bash
# Build
pip install build twine
python -m build

# Test on TestPyPI first
twine upload --repository testpypi dist/*

# Then production
twine upload dist/*
```

**Version strategy:** Semantic versioning. Git tags. `setuptools-scm` for automatic version from git.

**CLI entry points:**
```toml
[project.scripts]
my-tool = "my_package.cli:main"
```

→ Deep dive: `references/style-and-architecture.md`

---

## Error Handling — 错误处理

```python
# Domain exceptions — specific, informative
class UserNotFoundError(Exception):
    def __init__(self, user_id: int):
        self.user_id = user_id
        super().__init__(f"User {user_id} not found")

# In services — raise domain errors
async def get_user(user_id: int) -> User:
    user = await repo.find(user_id)
    if not user:
        raise UserNotFoundError(user_id)
    return user

# In API layer — transform to HTTP responses
@app.exception_handler(UserNotFoundError)
async def handle_not_found(request, exc):
    return JSONResponse(status_code=404, content={"error": str(exc)})
```

**Rules:**
- Custom exception classes for domain errors
- Raise in services, catch in API layer
- Never expose stack traces to clients
- Always include error code + human message in responses
- No bare `except:` — catch specific exceptions

---

## Anti-Patterns — 反模式

```
❌ Bare except                    → except SpecificError
❌ Business logic in routes       → Move to services/
❌ Sync libs in async code        → Use async alternatives
❌ Deep nesting (4+ levels)       → Extract functions, early return
❌ God classes (1000+ lines)      → Split by responsibility
❌ Relative imports               → Absolute imports
❌ No type hints on public API    → Always type public interfaces
❌ print() for logging            → Use structlog/loguru
❌ Hardcoded config               → Pydantic Settings / env vars
❌ Running entire test suite      → Target specific tests first
```

---

## Reference Files — 参考文档

Load these when you need depth on a specific topic:

| File | Covers | 覆盖内容 |
|------|--------|---------|
| `references/style-and-architecture.md` | Code style, project structure, packaging, naming, imports, docstrings | 代码风格、项目结构、打包发布 |
| `references/async-and-web.md` | FastAPI, Django, async patterns, API design, auth, WebSocket, deployment | 异步模式、Web框架、API设计 |
| `references/toolchain.md` | uv, pixi, pytest, ruff, mypy, CI/CD, Docker | 工具链、包管理、测试、CI/CD |
| `references/scientific-ml.md` | matplotlib, PyTorch Geometric, PathML, data visualization, GNN, pathology | 科学计算、可视化、图神经网络、病理分析 |

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `rust-coding-engine` | Performance bindings (PyO3) | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |
| `math-skill-system` | Statistical modeling & SymPy | [`math-skill-system/SKILL.md`](../math-skill-system/SKILL.md) |
| `dev-designer-utility` | Data Visualization Design | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `backend-dev` | Web Frameworks (FastAPI) | [`backend-dev/SKILL.md`](../backend-dev/SKILL.md) |

# Python Dev Skill | Python 开发者技能

> Write Python like a thoughtful human, not a code generator.
> 写出有灵魂的Python，而不是机器味的代码。

## 🔬 Research & Modernity (2026): Agentic Synthesis | 研究与现代性 (2026)：智能合成

- **Agentic Dependency Synthesis**: Utilizing 2026 LLM-driven dependency resolvers to perfectly align complex polyglot environments (Python/Rust/C++) with zero-version conflicts. | **智能体依赖合成**: 利用 2026 模型驱动的依赖解析器完美对齐复杂的多语言环境（Python/Rust/C++），实现零版本冲突。
- **Hardware-Native Async Hydration**: Direct mapping of Python `asyncio` loops to hardware-native executors for near-zero runtime overhead in high-throughput data pipelines. | **硬件原生异步水合**: 将 Python `asyncio` 循环直接映射到硬件原生执行器，在搞吞吐量数据管道中实现近乎为零的运行时开销。
- **Semantic Type-Bridge Orchestration**: Real-time synthesis of `pydantic-v3` models from heterogeneous source schemas (Protobuf/SQL/JSON) via 2026 adaptive engines. | **语义类型桥编排**: 通过 2026 自适应引擎从异构源架构（Protobuf/SQL/JSON）实时合成 `pydantic-v3` 模型。

---

## Philosophy — 编码哲学

### V3 Expansion Layers (Phase 4)

| File | Topic | 专题内容 |
|------|-------|---------|
| `references/v3-expansion/mastering-python-skill/` | 28+ Advanced Patterns | 28+ 高级模式 |
| `references/v3-expansion/modern-python/` | 12+ Modern Techniques | 12+ 现代技术 |
| `references/v3-expansion/python-bindings-patterns/` | PyO3/NAPI Integration | PyO3/NAPI 集成 |
| `references/v3-expansion/python-expert/` | Deep Internal Optimization | 深度内部优化 |

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/multi-language-advanced.md` for PyO3 GIL management, Dependency Injection patterns, and uv-based TDD workflows.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `python-dependency-injection` | all new skills | Python DI patterns, dependency-injector library |
| `pyo3` | all new skills | PyO3 Rust↔Python bindings — *cross-ref: `rust-coding-engine`* |
| `pyo3-guide` | all new skills | PyO3 guide, maturin build system — *cross-ref: `rust-coding-engine`* |
| `uv-tdd` | all new skills | TDD workflow with uv package manager |
| `language-pro` | all new skills | Multi-language development patterns |

## 📦 Phase 4 Absorbed Skills

The following skills have been integrated into this engine during Phase 4 (V3 Expansion):

| Skill | Origin | Integration |
|-------|--------|-------------|
| `mastering-python-skill` | New part | 28+ specialized sub-skills for advanced Python mastery |
| `modern-python` | New part | 12+ patterns for Python 3.12+ and modern ecosystem |
| `python-bindings-patterns` | New part | Unified binding patterns for Rust/Python interop |
| `python-expert` | New part | In-depth expert techniques and performance tuning |
