# Toolchain: uv, pixi, pytest, CI/CD
# 工具链：包管理、测试、持续集成

---

## 1. uv — The Fast Lane (10-100x faster than pip)

Written in Rust. Replaces pip, pip-tools, poetry for pure Python projects.

### Essential Commands

```bash
# Project lifecycle
uv init my-project           # create project
uv python pin 3.12           # pin Python version
uv add fastapi pydantic      # add dependencies
uv add --dev pytest ruff     # add dev dependencies
uv remove package            # remove dependency
uv sync                      # install from lockfile
uv lock                      # generate/update lockfile
uv run pytest                # run in venv (no activation needed)

# Python management
uv python install 3.12       # install Python
uv python list               # list installed versions

# pip-compatible interface
uv pip install package       # install package
uv pip freeze                # list installed
```

### Project Setup — Complete Workflow

```bash
uv init my-api && cd my-api
uv python pin 3.12
uv add fastapi uvicorn httpx pydantic
uv add --dev pytest pytest-asyncio ruff mypy
mkdir -p src/my_api tests
uv run pytest
uv run ruff check .
```

### Lockfile Strategy

```bash
uv lock                      # create/update uv.lock
uv sync --frozen             # install exact versions (CI)
uv lock --upgrade            # upgrade all within constraints
uv lock --upgrade-package httpx  # upgrade single package
uv export --format requirements-txt > requirements.txt  # compatibility
```

Always commit `uv.lock`. Use `--frozen` in CI for reproducibility.

### Docker with uv

```dockerfile
FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY . .
CMD ["uv", "run", "python", "app.py"]
```

Multi-stage for smaller images:

```dockerfile
FROM python:3.12-slim AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-editable

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /app/.venv .venv
COPY . .
ENV PATH="/app/.venv/bin:$PATH"
CMD ["python", "app.py"]
```

### CI/CD with uv

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v2
        with: { enable-cache: true }
      - run: uv python install 3.12
      - run: uv sync --all-extras --dev
      - run: uv run pytest
      - run: uv run ruff check .
      - run: uv run mypy .
```

### Migration

```bash
# From pip + requirements.txt
uv init . && uv add -r requirements.txt

# From poetry (reads pyproject.toml)
uv sync

# Export for compatibility
uv export --format requirements-txt > requirements.txt
```

---

## 2. pixi — When You Need conda + PyPI

Use pixi when you need binary dependencies (CUDA, scientific libs, C extensions) that conda handles better.

### Essential Commands

```bash
pixi init my-project         # create project
pixi add python ">=3.11"     # conda package
pixi add --pypi requests     # PyPI package
pixi add --feature test pytest  # feature-specific
pixi run python script.py    # run in environment
pixi shell                   # activate shell
pixi install --frozen        # reproducible install
pixi lock                    # update lockfile
```

### Manifest (pixi.toml)

```toml
[project]
name = "ml-project"
channels = ["conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]

[dependencies]
python = ">=3.11"
numpy = ">=1.21"
pytorch = { version = "2.0.*", channel = "pytorch" }

[pypi-dependencies]
fastapi = ">=0.100"
my-pkg = { path = ".", editable = true }

[feature.test.dependencies]
pytest = "*"
pytest-asyncio = "*"

[feature.lint.dependencies]
ruff = "*"
mypy = "*"

[environments]
default = []
test = ["test"]
dev = ["test", "lint"]

[tasks]
test = "pytest"
lint = "ruff check . && mypy ."
dev = "uvicorn main:app --reload"
```

### Multi-Version Testing

```toml
[feature.py310.dependencies]
python = "3.10.*"
[feature.py311.dependencies]
python = "3.11.*"
[feature.py312.dependencies]
python = "3.12.*"

[environments]
py310 = ["py310", "test"]
py311 = ["py311", "test"]
py312 = ["py312", "test"]
```

### Platform-Specific

```toml
[target.linux-64.dependencies]
glibc = "2.28"

[target.osx-arm64.dependencies]
mlx = "*"

[target.unix.tasks]
clean = "rm -rf build/"

[target.win.tasks]
clean = "rmdir /s /q build"
```

### Global Tools

```bash
pixi global install gh ripgrep btop ipython
pixi global list
pixi global update
```

### When uv vs pixi

```
uv:
├── Pure Python projects
├── Maximum speed
├── pip-compatible workflow
├── Simple dependency trees
└── Most web/API projects

pixi:
├── Scientific computing (numpy, scipy, pytorch)
├── CUDA / GPU dependencies
├── Mixed conda + PyPI needs
├── C/C++ build dependencies
├── Cross-platform binary packages
└── Multi-language projects
```

---

## 3. pytest — Testing Done Right

### Running Tests

```bash
# Always activate venv first (or use uv run)
source .venv/bin/activate && pytest tests/ -v

# Or with uv (no activation needed)
uv run pytest tests/ -v
```

### Smart Test Selection

Run most-likely-to-fail first:
1. The specific test file you changed
2. The module the changes belong to
3. Full suite only when needed

```bash
# Specific file
pytest tests/test_users.py -v

# Specific test
pytest tests/test_users.py::test_create_user -v

# By keyword
pytest -k "user and not admin" -v
```

### Concurrency

```bash
# 1 test:     -n0
# 2-7 tests:  -n{count}
# 8+ tests:   omit -n (auto)
pytest tests/test_api.py -n0
pytest tests/ -n4
```

### Database Tests

```bash
# Default: reuse DB (fast)
pytest --reuse-db

# After model changes: recreate DB
pytest  # without --reuse-db
```

### Fixtures

```python
import pytest
from unittest.mock import AsyncMock

@pytest.fixture
def mock_db():
    db = AsyncMock()
    db.users.get.return_value = {"id": 1, "name": "Test"}
    return db

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c

@pytest.fixture
def sample_user():
    return {"email": "test@example.com", "name": "Test User"}
```

### Async Tests

```python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_user(client: AsyncClient, sample_user: dict):
    resp = await client.post("/users", json=sample_user)
    assert resp.status_code == 201
    data = resp.json()
    assert data["email"] == sample_user["email"]
```

### Configuration

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
addopts = "-v --tb=short --strict-markers"
markers = [
    "slow: marks tests as slow",
    "integration: integration tests",
]
asyncio_mode = "auto"

[tool.coverage.run]
source = ["src"]
omit = ["*/tests/*"]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise NotImplementedError",
]
```

### Testing Strategy

```
Unit tests (fast, isolated):
├── Business logic in services
├── Data transformations
├── Validation rules
└── Mock external dependencies

Integration tests (slower, real I/O):
├── API endpoints with TestClient
├── Database operations
├── External service integration
└── Full request/response cycles

Common fixtures:
├── db_session → database connection
├── client → test HTTP client
├── authenticated_user → user with auth token
└── sample_data → test data factories
```

---

## 4. Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: ruff-check
        name: ruff check
        entry: uv run ruff check --fix
        language: system
        types: [python]

      - id: ruff-format
        name: ruff format
        entry: uv run ruff format
        language: system
        types: [python]

      - id: mypy
        name: mypy
        entry: uv run mypy
        language: system
        types: [python]
        pass_filenames: false
```

---

## 5. VS Code Integration

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",
  "python.testing.pytestEnabled": true,
  "python.testing.pytestArgs": ["-v"],
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.ruff": "explicit",
      "source.organizeImports.ruff": "explicit"
    }
  }
}
```

---

## 6. Complete CI Pipeline

```yaml
name: CI
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v2
      - run: uv sync --dev
      - run: uv run ruff check .
      - run: uv run ruff format --check .
      - run: uv run mypy .

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python: ["3.11", "3.12", "3.13"]
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v2
      - run: uv python install ${{ matrix.python }}
      - run: uv sync --dev
      - run: uv run pytest --cov --cov-report=xml

  publish:
    needs: [lint, test]
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install build twine
      - run: python -m build
      - run: twine upload dist/*
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
```
