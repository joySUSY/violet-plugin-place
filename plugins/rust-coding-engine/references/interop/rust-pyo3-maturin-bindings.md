# Rust PyO3 and Maturin Bindings Doctrine

## Purpose

Define the canonical doctrine for building Python-facing Rust libraries with PyO3 and Maturin inside `rust-coding-engine`.

This document is not just a setup tutorial.
It exists to answer a product-grade interop question:

> when Rust is exposed as a Python package surface, how should the Rust core, binding layer, Python package ergonomics, GIL discipline, wheel strategy, verification lattice, and release coordination be designed so the boundary feels natural in Python while keeping Rust-side truth explicit?

This lane applies when:
- Python is a real consumer ecosystem, not an afterthought
- Rust owns heavy logic, safety, or performance-sensitive work
- the boundary must feel idiomatic to Python users
- packaging, wheels, and installability are part of the actual product surface

## Source Provenance

- **Primary donor families:** `flow-skills-pyo3`, `rust-sdk-ci`, `rustdoc-clap-4.5.60`
- **Key local donor materials:**
  - `flow-skills-pyo3/skills/pyo3/SKILL.md`
  - `rust-sdk-ci/rust-sdk-ci/skill.md`
- **Cross-linked doctrine inputs:**
  - `rust-cross-language-workflows.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
  - `../governance/source-reservoir-map.md`
  - `../../python-dev-skill/SKILL.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

A Python binding should expose a Python-native surface over a Rust-native core.

That means:
- the Rust core keeps ownership, invariants, and performance discipline
- the binding layer stays thinner than the Rust core
- the Python package surface keeps ergonomics, exceptions, import shape, and install expectations clear
- packaging and wheel production are treated as first-class workflow stages
- the boundary is verified from both Rust and Python sides

The anti-pattern is exposing raw Rust internals directly and hoping Python users will adapt.

A mature PyO3/Maturin workflow must answer:
1. who owns structural truth?
2. what belongs in Rust core vs binding wrapper vs Python package surface?
3. how does the GIL change execution design?
4. what wheel and ABI strategy is the product promise?
5. how is the boundary verified and released?

---

## Python Consumer Boundary Model

| Boundary Concern | Rust Owns | Python Owns |
|---|---|---|
| Structural truth | domain logic, invariants, native performance, authoritative internal models | orchestration ergonomics, import surface, Pythonic API feel |
| Boundary wrapper | PyO3 classes/functions, conversion logic, exception translation, GIL-aware wrappers | module exports, helper functions, packaging metadata, type hints/stubs |
| Runtime behavior | thread safety, blocking boundaries, Rust async/compute posture | consumer expectations around sync/async semantics and Python-side ergonomics |
| Packaging | native module build, wheel matrix, ABI strategy, artifact truth | package naming, install experience, Python tooling integration |

The doctrine is:
- Rust owns native truth
- Python owns Python-facing ergonomics
- the binding layer is the contract translator between them

---

## Pattern 1 — Choose This Lane Only When Python Is a Real Consumer

Use the PyO3 + Maturin lane when:
- Python is a real distribution surface
- native performance or native safety guarantees materially matter
- wheel-based distribution is acceptable operationally
- Rust should own the heavy logic while Python owns orchestration or reach

Do **not** choose this lane casually if:
- a CLI boundary would be simpler
- a service boundary would be simpler
- Python only needs to shell out to a process
- packaging cost outweighs the actual integration value

The doctrine is:
- the PyO3 lane is justified by consumer shape and product value
- not by novelty or a vague wish to “use Rust from Python somehow”

---

## Pattern 2 — Keep Rust Core, Binding Layer, and Python Package Surface Distinct

A good Python-binding architecture usually has three layers:

1. **Rust core**
   - domain logic
   - algorithms
   - performance-sensitive internals
   - native invariants and validation

2. **Binding layer**
   - PyO3 classes/functions
   - conversion logic
   - exception mapping
   - GIL-sensitive wrapper behavior

3. **Python package surface**
   - `__init__.py` exports
   - optional pure-Python helpers
   - package metadata
   - typing surface (`py.typed`, stubs if needed)

The doctrine is:
- the binding layer should not absorb the whole application
- the Python package surface should not pretend it owns Rust internals
- the Rust core should not become Python-packaging-aware in the wrong places

Without this split, every consumer concern starts reshaping the Rust core directly.

---

## Pattern 3 — Project Layout Must Reflect the Boundary

### Recommended mixed layout

```text
my-lib/
├── Cargo.toml
├── pyproject.toml
├── src/
│   └── lib.rs
├── python/
│   └── my_lib/
│       ├── __init__.py
│       └── py.typed
├── tests/
│   └── test_bindings.py
└── justfile
```

### Why this layout is strong
- Rust stays in normal crate structure
- Python package files stay explicit and inspectable
- packaging behavior is easy to reason about
- pure-Python helpers can coexist without polluting Rust layout
- generated/install artifacts have an obvious home

A useful default is to give the compiled native module an underscore-prefixed internal name and re-export from a cleaner Python package surface.

The doctrine is:
- the repository layout should teach the boundary to future maintainers
- not hide it in build tools alone

---

## Pattern 4 — Cargo, pyproject, and Wheel Strategy Must Agree

A durable PyO3/Maturin boundary needs explicit agreement between:
- Rust crate metadata
- Python package metadata
- module naming
- ABI strategy
- wheel compatibility promise

### Rust side baseline

```toml
[package]
name = "my-lib"
version = "0.1.0"
edition = "2021"

[lib]
name = "_my_lib"
crate-type = ["cdylib", "rlib"]

[dependencies]
pyo3 = { version = "0.23", features = ["abi3-py39", "extension-module"] }
```

### Python packaging baseline

```toml
[build-system]
requires = ["maturin>=1.0,<2.0"]
build-backend = "maturin"

[project]
name = "my-lib"
requires-python = ">=3.9"

[tool.maturin]
python-source = "python"
module-name = "my_lib._my_lib"
features = ["pyo3/extension-module"]
```

### Doctrine rules
- `cdylib` is the Python-facing native artifact
- `rlib` keeps Rust-side testing and reuse easier
- explicit `module-name` reduces ambiguity about import mapping
- `abi3` is an architectural decision, not a checkbox

---

## Pattern 5 — ABI Strategy Is Part of the Product Promise

PyO3 bindings need an explicit ABI strategy.

### Common choices
- **CPython-version-specific builds**
  - strongest flexibility
  - highest wheel-matrix burden
- **abi3 builds**
  - more stable wheel compatibility across Python versions
  - reduced API surface depending on features used

The workflow must answer:
- what Python versions are first-class?
- is cross-version wheel stability worth the feature constraints?
- what wheel matrix is realistic to maintain?
- is the package promising source build, binary wheels, or both?

The doctrine is:
- ABI strategy belongs to release truth
- not only to build flags

---

## Pattern 6 — Python-Facing API Design Must Feel Pythonic Without Lying About Rust

A good PyO3 surface should feel Pythonic without hiding Rust-side truth.

Good patterns:
- expose focused classes or functions
- keep Rust internals private
- use Python-friendly method/property names and signatures
- make constructors and defaults obvious
- provide `__repr__`, `__len__`, getters, and static constructors where they genuinely help
- choose exception shapes that feel natural to Python users

The doctrine is:
- the Python API is a product surface
- not a direct reflection of native Rust module layout

A boundary that is technically correct but ergonomically alien is still a weak boundary.

---

## Pattern 7 — Type Conversion Is Contract Design

PyO3 handles many common conversions well.
That does **not** mean conversion design can be ignored.

Automatic conversions are often good for:
- integers / floats / booleans
- `String` / `&str`
- `Vec<T>`
- `HashMap<String, T>`
- tuples
- `Option<T>`

Manual conversion pressure appears when:
- Python objects need custom extraction
- NumPy arrays should avoid unnecessary copies
- nested or domain-rich objects cross the boundary
- conversion errors need richer messages
- ownership/borrowing semantics need to be hidden behind a Pythonic model

The doctrine is:
- conversion rules are part of the public contract
- not an implementation footnote

### NumPy and buffer posture
For numeric/scientific work, NumPy integration or zero-copy-ish buffer strategy is often one of the highest-value reasons to use PyO3 at all.
That should be treated as architecture, not a “later optimization.”

---

## Pattern 8 — Error Translation Must Preserve Python Meaning

A Python binding is not done when Rust returns `Result<T, E>`.
It is done when Python receives a coherent exception surface.

Good posture:
- map Rust error families into meaningful Python exceptions
- keep context useful but not noisy
- avoid panic-driven behavior
- register custom exceptions when they materially help the Python API

The doctrine is:
- error conversion is API design
- not a late wrapper added after “real work” is done

If Python callers cannot distinguish invalid input, IO failure, and internal failure meaningfully, the boundary is still weak.

---

## Pattern 9 — GIL Discipline Is a First-Class Design Constraint

The GIL is one of the main reasons Python bindings are a real architecture problem, not just a packaging problem.

### Hold the GIL when
- touching Python objects
- calling Python callbacks
- interacting with Python module state

### Release the GIL when
- CPU-heavy Rust work runs long enough to matter
- blocking or expensive operations would otherwise stall Python threads
- heavy native computation can proceed independently of Python object access

The doctrine is:
- do not treat the GIL as an afterthought
- it changes performance, responsiveness, callback design, and what counts as a good Python-facing API

A binding that performs brilliantly in Rust but stalls Python consumers under realistic use is not a healthy boundary.

---

## Pattern 10 — Verification Must Exercise the Python Consumer Surface

A mature PyO3/Maturin workflow needs tests on both sides of the boundary.

### Rust-side tests
Use Rust tests for:
- core logic
- invariants
- conversion helpers where sensible
- error mapping logic if isolated

### Python-side tests
Use Python tests for:
- import and packaging success
- Python-facing API ergonomics
- exception behavior
- representation and method semantics
- real consumer workflows
- wheel/install behavior where practical

Minimal workflow:

```bash
cargo test
maturin develop
pytest tests/ -v
```

The doctrine is:
- a binding is not verified only because Rust tests pass
- Python must also consume the artifact successfully

---

## Pattern 11 — Wheels and Release Graphs Must Be Explicit

A PyO3/Maturin lane is incomplete if it stops at local development.

### Development lane
- `maturin develop`
- `maturin develop --release`

### Build lane
- `maturin build --release`
- optionally include `--sdist`

### Publish lane
- `maturin publish`
- preferably test against TestPyPI or equivalent first

But the real doctrine is bigger:
- wheel generation is one node in a release graph
- crates.io, wheels, and possibly other surfaces may need coordination
- version truth, artifact truth, and post-publish verification must all be explicit

The doctrine is:
- Python wheel publication is the Python-facing half of Rust multi-surface release law
- not a side quest outside production doctrine

---

## Pattern 12 — Cross-Engine Ownership Must Stay Explicit

PyO3 work naturally touches Python ergonomics.
That does **not** make Rust-side ownership ambiguous.

Default law:
- `rust-coding-engine` owns Rust-side structural truth, binding architecture, and wheel/build posture
- `python-dev-skill` owns broader Python-side consumer ergonomics, package UX, and Python-local runtime practices where appropriate
- `developer-tool` owns broader shell/build/runtime-surface orchestration when the issue becomes operational rather than Rust-doctrinal

The doctrine is:
- Rust owns native truth
- Python owns Python-consumer ergonomics
- the bridge layer must make that split explicit instead of muddled

---

## Pattern 13 — PyO3 Is a Consumer Boundary, Not Just a Build Trick

It is tempting to think of PyO3 as “just how we compile Rust into Python.”
That is too small.

A healthy PyO3 lane is really about:
- product surface design
- ownership of truth
- error semantics
- GIL-aware responsiveness
- wheel/distribution law
- consumer verification

The doctrine is:
- PyO3/Maturin should be taught as boundary architecture
- not as a cargo command plus some macros

---

## PyO3 / Maturin Checklist

Before calling a Python-facing Rust binding healthy, ask:

- [ ] Is Python truly the right consumer lane?
- [ ] Is the Rust core smaller and more stable than the binding layer?
- [ ] Is the Python package surface explicit and ergonomic?
- [ ] Are conversion rules deliberate, especially for arrays/buffers/domain-rich shapes?
- [ ] Is error mapping meaningful on the Python side?
- [ ] Is GIL discipline explicit for heavy work and callbacks?
- [ ] Is ABI strategy part of the release promise?
- [ ] Is wheel/build/publish posture explicit?
- [ ] Does verification exercise the real Python consumer boundary?
- [ ] Are Rust-side ownership and Python-side ergonomics clearly separated?

---

## Anti-Patterns

- exposing raw Rust internals as the Python contract
- deciding on PyO3 before confirming Python is a real consumer lane
- treating wheel strategy as an afterthought
- using the GIL implicitly without performance reasoning
- stringifying all errors into generic exceptions
- shipping bindings that Rust can test but Python cannot import reliably
- mixing Python ergonomics into Rust core design instead of keeping them in wrapper/package layers
- treating `maturin publish` as the whole release story

---

## Cross-Links

Read this alongside:
- `rust-cross-language-workflows.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `rust-interop-testing-and-audit-discipline.md`
- `rust-ffi-and-interop-overview.md`
- `../governance/source-reservoir-map.md`
- `../../python-dev-skill/SKILL.md`

---

## Final Doctrine

The reusable lesson is not:
> “PyO3 and Maturin let Python call Rust code.”

The reusable lesson is:
> “a Rust PyO3/Maturin boundary is a product-grade Python consumer surface that must make Rust-core ownership, wrapper thinness, Python package ergonomics, conversion law, GIL discipline, ABI strategy, wheel/release posture, and verification explicit—otherwise the package may build successfully while still being architecturally unstable for real Python consumers.”
