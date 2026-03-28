# 🐍 Advanced Python & Multi-Language Patterns (高级Python与跨语言模式)

The `python-dev-skill` engine absorbs 5 cross-domain integration skills, expanding beyond standard backend frameworks into deep language boundaries and strict TDD.

## 1. Rust ↔ Python Bridge (PyO3 & Maturin) (Rust与Python互操作)

- **Architecture:** Write the I/O or CPU-bound kernel in Rust, compile it to a native Python module using PyO3, and package it with Maturin.
- **Zero-Copy Serialization:** Avoid `serde_json` over strings. Use PyO3's native `PyDict` and `PyList` or pass raw memory buffers (Arrow) directly between the Rust and Python boundaries.
- **GIL Management:** Release the GIL (`Python::allow_threads`) when executing heavy Rust compute, enabling Python multithreading to orchestrate Rust processes concurrently. 

## 2. Python Dependency Injection Patterns (Python依赖注入模式)

- Python lacks native Spring-like DI, resulting in hard-to-test monolithic layers. 
- Use libraries like `dependency-injector` or FastAPI's native `Depends()`.
- **Inversion of Control (IoC):** Classes should declare their dependencies in `__init__`, rather than instantiating them internally. This makes mocking for unit tests trivial.

## 3. Modern TDD with `uv` (运用uv的现代TDD)

- The `uv` package manager (Rust-based) drops environment setup time to milliseconds.
- **TDD Workflow:** 
  1. `uv run pytest` watches tests instantly.
  2. Write the failing test (`Red`).
  3. Write the exact minimum code to pass (`Green`).
  4. Refactor using `ruff` checks (`Refactor`).

## 4. The Multi-Language Pro Mindset (跨语言专家的思维)

- Apply Pythonic duck typing in Python, strong typing in Rust, and structural typing in TypeScript. Never write JS-style dictionary-passing in Rust, and never write Java-style verbose classes in Python. Embrace the idiomatic heart of the host environment.

---
*Absorbed knowledge from: pyo3, pyo3-guide, python-dependency-injection, uv-tdd, language-pro.*
