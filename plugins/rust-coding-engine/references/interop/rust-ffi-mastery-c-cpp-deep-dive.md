# Rust FFI Mastery: C and C++ Interop Deep Dive

## Purpose

Provide the canonical deep-dive doctrine for Rust work that crosses C and C++ boundaries.

This document goes one level deeper than `rust-ffi-and-interop-overview.md`.
It focuses specifically on:
- C ABI boundaries
- C++ interop posture
- staged C→Rust migration
- ownership protocols across language boundaries
- strings, buffers, callbacks, and opaque handles
- header generation and binding drift control
- verification and audit discipline for native interop

This is not a bag of FFI tricks.
It is a doctrine for making native boundaries explicit, auditable, and survivable.

## Source Provenance

- **Primary donor families:** `rust-interop`, `c-to-rust-migration`, `analyze-rust-ffi-crate-surface`, `minimize-rust-ffi-crate-surface`
- **Key local donor materials:**
  - `rust-interop/README.md`
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
- **Cross-linked doctrine inputs:**
  - `rust-ffi-and-interop-overview.md`
  - `rust-interop-testing-and-audit-discipline.md`
  - `../governance/source-reservoir-map.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

A native interop boundary is not "just call some foreign code."
It is a **protocol of ABI, layout, ownership, panic behavior, packaging, and consumer expectations**.

A healthy Rust FFI surface should always answer:
- what is the ABI?
- who owns allocation and destruction?
- what data layout is shared?
- how are strings and buffers transferred?
- how are callbacks and context pointers managed?
- what happens on failure or panic?
- how is the surface versioned, generated, and verified against the real foreign consumer?

If those answers are missing, the FFI boundary is still underdesigned.

---

## Native Boundary Taxonomy

| Boundary | Preferred Posture | Why |
|---|---|---|
| Rust consuming C | carefully scoped `extern "C"` or generated bindings (`bindgen`) | C ABI is stable enough to formalize explicitly |
| Rust exposing C ABI to consumers | thin exported FFI layer + generated headers (`cbindgen`) | Rust stays authoritative while C sees a narrow surface |
| Rust with C++ consumers or dependencies | prefer dedicated bridge models (`cxx`, `autocxx`, or explicit narrowing layers) | C++ ABI complexity and exception semantics need stronger mediation |
| C→Rust staged migration | replacement seam + parity verification + delayed cleanup | migration is operational change, not just translation |

The first question is not:
- “which crate is coolest?”

The first question is:
- “what kind of native boundary are we really maintaining?”

---

## Pattern 1 — Keep the Rust Core Separate from the FFI Surface

A durable FFI design keeps three layers distinct:

1. **Rust core**
   - domain logic
   - safe invariants
   - idiomatic Rust API

2. **FFI bridge layer**
   - exported/imported ABI surface
   - pointer conversion
   - error translation
   - layout constraints
   - panic containment

3. **Foreign consumer layer**
   - C or C++ caller code
   - generated headers or bridge code
   - runtime contract on the foreign side

The bridge layer should stay thinner than the core.
If the core starts being reshaped directly around C or C++ quirks, the boundary has leaked inward.

The doctrine is:
- the core remains Rust-native
- the bridge absorbs ABI ugliness
- the foreign consumer sees only the narrowed surface it actually needs

---

## Pattern 2 — Minimize the Exported Surface

A smaller FFI surface is easier to:
- document
- audit
- test
- stabilize
- evolve safely

Good questions:
- does the foreign consumer really need direct access to this type or function?
- can a higher-level operation replace several low-level exports?
- should this remain internal to Rust while one wrapper function is exposed instead?

The doctrine is:
- export the smallest useful surface first
- do not treat the entire Rust module tree as a public native interface

Export sprawl is one of the fastest ways to turn a manageable boundary into a permanent compatibility burden.

---

## Pattern 3 — Treat Layout as a Contract

At native boundaries, layout is not implicit.
It must be made explicit when shared.

Typical rules:
- use `#[repr(C)]` for shared structs/unions with C-compatible layout
- use `#[repr(transparent)]` for newtypes intentionally mirroring an inner representation
- do **not** expose Rust-native enums or rich internal types across raw C ABI casually
- do not send fat pointers or Rust-only layout assumptions across the boundary
- document integer width, alignment, nullability, and sentinel semantics explicitly

The doctrine is:
- layout is part of the FFI contract just as much as function signatures are
- if the layout cannot be stated clearly, the boundary is not ready to share it

---

## Pattern 4 — Ownership Protocols Must Be Written Down and Testable

Every native boundary needs an ownership protocol.

Questions to answer:
- who allocates?
- who frees?
- who is allowed to borrow only?
- how long is a handle valid?
- is null allowed, and what does it mean?
- what state can the foreign side retain after a call returns?

Useful protocol shapes include:
- **Rust allocates, Rust frees via explicit free function**
- **C allocates, C frees; Rust only borrows temporarily**
- **shared read-only buffer with clearly bounded lifetime**
- **opaque handle managed only through explicit constructor/destructor API**

The doctrine is:
- ownership law must be visible in names, docs, and tests
- not guessed from examples

If maintainers must infer the free/retain contract by reading implementation internals, the boundary is already too weak.

---

## Pattern 5 — Prefer Opaque Handles Over Shared Internal Layouts

When possible, expose opaque handles instead of complex internal structs.

Why opaque handles are strong:
- Rust keeps layout freedom internally
- consumers interact through a controlled function set
- the boundary stays smaller and more stable
- internal refactors remain possible without breaking the foreign ABI

The doctrine is:
- share behavior before sharing internal representation
- opaque handles usually age better than exported structural layouts

This is often healthier than exposing large nested structs whose layout and invariants are expensive to preserve forever.

---

## Pattern 6 — Strings and Buffers Need Explicit Transfer Semantics

Strings and buffers are some of the most failure-prone parts of FFI.

### Common C string directions
- C string → Rust borrowed view (`CStr`) when Rust only needs to inspect
- Rust string → owned C-compatible allocation (`CString::into_raw`) when foreign side must keep it
- explicit free function when Rust allocated and foreign side must release

### Buffer doctrine
- borrowed slices when the buffer is only inspected briefly and lifetime is bounded
- owned allocations only when the foreign side must retain or mutate independently
- length/capacity contracts must be explicit when reconstructing vectors or arrays
- zero-copy claims must be proven, not assumed

The doctrine is:
- string/buffer transfer is not just a conversion problem
- it is an ownership + lifetime + representation protocol problem

---

## Pattern 7 — Callbacks Are Lifetime and Reentrancy Boundaries

Callbacks are not just function pointers.
They introduce:
- foreign-to-Rust reentry
- lifetime requirements on context pointers
- thread or runtime assumptions
- ordering and reentrancy concerns
- shutdown and deregistration hazards

A safe callback posture should define:
- callback ABI (`extern "C"` where relevant)
- context pointer ownership and lifetime
- whether callback may outlive registration scope
- whether callback can call back into Rust state or runtime systems safely
- how deregistration or teardown avoids use-after-free risk

The doctrine is:
- callbacks are one of the fastest ways for native boundaries to become subtle and fragile
- treat them as first-class boundary design, not as a function-pointer convenience

---

## Pattern 8 — Panic Must Not Cross the Native Boundary Casually

Panics are not a valid foreign ABI contract.

At native boundaries, the bridge layer should usually ensure:
- panic is caught or translated before reaching the foreign consumer
- an error sentinel, status code, out-param, or error object contract is defined
- logs or diagnostics remain available on the Rust side where needed
- failure leaves ownership and resource state consistent enough to reason about

The doctrine is:
- panic containment is both a correctness rule and an operational rule
- “this probably won't panic” is not an interop design strategy

An uncontained panic at FFI boundaries can become:
- undefined behavior
- process corruption risk
- unusable foreign diagnostics
- consumer-hostile crashes

---

## Pattern 9 — C++ Interop Should Prefer Bridge Models Over Raw ABI Guesswork

Raw C ABI is the natural baseline for C interop.
C++ is different.

C++ adds pressure from:
- name mangling
- exceptions
- templates
- richer ownership models
- ABI fragility across compilers and standard libraries

That is why C++ interop is usually healthiest when mediated through a bridge approach such as `cxx`-style tooling or other strongly defined bridge layers.

The doctrine is:
- use raw `extern "C++"` or ad hoc C++ ABI assumptions only with great care
- prefer a model that narrows and formalizes the boundary explicitly

C++ interop problems are often “protocol complexity disguised as syntax convenience.”

---

## Pattern 10 — Header and Binding Generation Are Part of the Product Surface

Useful tools include:
- `bindgen` for C → Rust bindings when the header surface is large or volatile
- `cbindgen` for Rust → C header generation when Rust owns the interface

These tools help reduce drift, but they do not remove the need for design discipline.

Good questions:
- should bindings be generated or curated manually?
- which types/functions belong in the generated surface?
- how is header/binding output versioned and reviewed?
- does CI prove generated outputs are current?

The doctrine is:
- generated bindings and headers are release artifacts
- not build noise

---

## Pattern 11 — Staged C→Rust Migration Is a Managed Transition, Not Just a Rewrite

A C→Rust migration is not just a translation task.
It is usually a staged transition.

A healthy staged pattern often looks like:
1. analyze the current C surface and dependencies
2. identify the smallest stable replacement seam
3. implement pure Rust core behavior first
4. add a thin FFI wrapper or compatibility bridge
5. verify parity and performance at the boundary
6. retire old C paths only after replacement is proven

The doctrine is:
- preserve the external contract first
- make the inside more Rust-native second
- cleanup comes only after replacement-grade proof exists

This is where migration doctrine and interop doctrine meet directly.

---

## Pattern 12 — Verification Must Include the Real Consumer Side

Native interop is not sufficiently tested by Rust unit tests alone.

A good verification posture should usually include some combination of:
- Rust-side tests for core logic and bridge helpers
- generated header/binding verification
- foreign-side smoke or integration tests
- memory/UB tools where relevant (Miri, sanitizers, Valgrind, etc.)
- exported symbol audits or ABI checks where relevant
- failure-path and teardown tests for callbacks or handle lifecycles

The doctrine is:
- the boundary is only proven when the real consumer side can use it safely
- local Rust confidence is not the same thing as FFI proof

This is why `rust-interop-testing-and-audit-discipline.md` is a required companion for serious native boundaries.

---

## C and C++ Interop Checklist

Before calling a native boundary healthy, ask:

- [ ] Is the boundary clearly classified as Rust→C, C→Rust, raw C ABI, or C++ bridge?
- [ ] Is the exported/imported surface minimized?
- [ ] Are layout contracts explicit where shared?
- [ ] Is allocation/free ownership documented and testable?
- [ ] Are strings/buffers transferred with explicit lifetime semantics?
- [ ] Are callbacks and context pointers lifetime-safe?
- [ ] Is panic prevented from crossing the native boundary?
- [ ] Are generated headers/bindings treated as governed artifacts?
- [ ] Is the foreign consumer side included in verification?
- [ ] Is cleanup or migration sequencing conditioned on replacement-grade proof?

---

## Anti-Patterns

- exposing internal Rust layout directly as a long-term native contract
- large exported surfaces with weak auditability
- undocumented ownership/free responsibilities
- casual string/buffer conversion without lifecycle discipline
- callback registration with no clear context lifetime model
- panics or raw internal details escaping into native consumers
- treating C++ interop as if it were ordinary C ABI work
- deleting old C paths before parity and transition proof are complete
- assuming generated headers or bindings remove the need for consumer-side verification

---

## Cross-Links

Read this alongside:
- `rust-ffi-and-interop-overview.md`
- `rust-interop-testing-and-audit-discipline.md`
- `../governance/source-reservoir-map.md`
- `../playbooks/rust-migration-and-transition.md`
- `../playbooks/rust-refactor-toolkit.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust can interoperate with C and C++ through FFI.”

The reusable lesson is:
> “a Rust C/C++ boundary is a governed native protocol whose ABI, layout, ownership law, callback semantics, panic containment, generated headers/bindings, migration sequencing, and consumer-side proof must all be explicit—otherwise the bridge may compile while remaining too fragile to trust.”
