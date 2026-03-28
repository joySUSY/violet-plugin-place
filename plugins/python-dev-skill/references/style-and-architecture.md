# Style, Architecture & Packaging
# 代码风格、架构与打包

---

## 1. Ruff Configuration — The Complete Setup

Ruff replaces flake8, isort, black, pyupgrade, and more. Single tool, Rust-speed.

```toml
[tool.ruff]
line-length = 120
target-version = "py312"

[tool.ruff.lint]
select = [
    "E",    # pycodestyle errors
    "W",    # pycodestyle warnings
    "F",    # pyflakes
    "I",    # isort
    "B",    # flake8-bugbear
    "C4",   # flake8-comprehensions
    "UP",   # pyupgrade
    "SIM",  # flake8-simplify
]
ignore = ["E501"]  # line length handled by formatter

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
```

```bash
ruff check --fix .  # lint + auto-fix
ruff format .       # format
```

## 2. Type Checking — Strict by Default

```toml
# mypy — thorough, standard
[tool.mypy]
python_version = "3.12"
strict = true
warn_return_any = true
warn_unused_ignores = true
disallow_untyped_defs = true

[[tool.mypy.overrides]]
module = "tests.*"
disallow_untyped_defs = false

# pyright — faster alternative
[tool.pyright]
pythonVersion = "3.12"
typeCheckingMode = "strict"
```

## 3. Import Organization

Three groups, always in this order. Ruff enforces this automatically.

```python
# 1. Standard library
import os
from collections.abc import Callable
from typing import Any

# 2. Third-party
import httpx
from pydantic import BaseModel
from sqlalchemy import Column

# 3. Local
from my_project.models import User
from my_project.services import UserService
```

Absolute imports only. Relative imports break when modules move.

## 4. Line Formatting Patterns

```python
# Function signatures — trailing comma forces one-arg-per-line
def create_user(
    email: str,
    name: str,
    role: UserRole = UserRole.MEMBER,
    notify: bool = True,
) -> User:
    ...

# Method chains — parenthesized for clarity
result = (
    db.query(User)
    .filter(User.active == True)
    .order_by(User.created_at.desc())
    .limit(10)
    .all()
)

# Long strings — implicit concatenation
error_message = (
    f"Failed to process user {user_id}: "
    f"received status {response.status_code} "
    f"with body {response.text[:100]}"
)
```

## 5. Module Architecture — __all__ and Public APIs

```python
# mypackage/__init__.py
"""MyPackage — does useful things."""

from .core import MainClass, HelperClass
from .exceptions import PackageError, ConfigError
from .config import Settings

__all__ = [
    "MainClass",
    "HelperClass",
    "PackageError",
    "ConfigError",
    "Settings",
]

__version__ = "1.0.0"
```

Everything not in `__all__` is internal. Consumers import from the package root:
```python
from mypackage import MainClass, Settings
```

## 6. Architecture Patterns

### Layered (most projects)

```
app/
├── api/           # HTTP handlers — thin, delegates to services
├── services/      # Business logic — the brain
├── repositories/  # Data access — DB queries
├── models/        # Domain entities
├── schemas/       # Pydantic models (API contracts)
└── config/        # Settings, constants
```

Each layer depends only on layers below. Never upward.

### Domain-Driven (complex apps)

```
ecommerce/
├── users/
│   ├── models.py
│   ├── services.py
│   ├── repository.py
│   └── api.py
├── orders/
│   ├── models.py
│   ├── services.py
│   ├── repository.py
│   └── api.py
└── shared/
    ├── database.py
    └── exceptions.py
```

Use when business domains are distinct and teams work independently.

## 7. Packaging for Distribution

### Source Layout (always for libraries)

```
my-package/
├── pyproject.toml
├── README.md
├── LICENSE
├── src/
│   └── my_package/
│       ├── __init__.py
│       ├── core.py
│       └── py.typed        # marks package as typed
├── tests/
└── docs/
```

### Full pyproject.toml for Publishing

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-package"
version = "0.1.0"
description = "What it does"
readme = "README.md"
requires-python = ">=3.10"
license = {text = "MIT"}
authors = [{name = "Name", email = "email@example.com"}]
keywords = ["relevant", "keywords"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]
dependencies = [
    "httpx>=0.25",
    "pydantic>=2.0,<3.0",
]

[project.optional-dependencies]
dev = ["pytest>=8.0", "ruff>=0.4", "mypy>=1.10"]

[project.urls]
Homepage = "https://github.com/user/my-package"
Repository = "https://github.com/user/my-package"

[project.scripts]
my-cli = "my_package.cli:main"
```

### Build & Publish

```bash
pip install build twine

# Build
python -m build
# → dist/my_package-0.1.0.tar.gz + .whl

# Verify
twine check dist/*

# TestPyPI first
twine upload --repository testpypi dist/*
pip install --index-url https://test.pypi.org/simple/ my-package

# Production
twine upload dist/*
```

### Dynamic Versioning from Git

```toml
[build-system]
requires = ["hatchling", "hatch-vcs"]
build-backend = "hatchling.build"

[project]
dynamic = ["version"]

[tool.hatch.version]
source = "vcs"
```

### CLI with Click

```python
# src/my_package/cli.py
import click

@click.group()
@click.version_option()
def cli():
    """My CLI tool."""

@cli.command()
@click.argument("name")
@click.option("--greeting", default="Hello")
def greet(name: str, greeting: str):
    """Greet someone."""
    click.echo(f"{greeting}, {name}!")

def main():
    cli()
```

### Data Files in Packages

```toml
[tool.hatch.build.targets.wheel]
packages = ["src/my_package"]

# Include data files
[tool.hatch.build.targets.wheel.force-include]
"src/my_package/data" = "my_package/data"
```

```python
# Access at runtime
from importlib.resources import files

data = files("my_package").joinpath("data/config.json").read_text()
```

### Namespace Packages (multi-repo)

```
# Repo 1: company-core
company/core/__init__.py

# Repo 2: company-api
company/api/__init__.py

# No __init__.py in company/ — implicit namespace
```

### GitHub Actions for Publishing

```yaml
name: Publish
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install build twine
      - run: python -m build
      - run: twine check dist/*
      - run: twine upload dist/*
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
```

## 8. Version Constraints — Be Precise

```toml
dependencies = [
    "httpx>=0.25,<1.0",      # compatible range (recommended)
    "pydantic~=2.5",          # >=2.5.0, <2.6.0
    "click>=8.1",             # minimum version
    # avoid exact pins unless absolutely necessary
]
```

## 9. .gitignore Essentials

```gitignore
# Build
build/
dist/
*.egg-info/
__pycache__/
*.py[cod]

# Environments
.venv/
venv/

# IDE
.vscode/
.idea/

# Testing
.pytest_cache/
.coverage
htmlcov/

# OS
.DS_Store
Thumbs.db
```
