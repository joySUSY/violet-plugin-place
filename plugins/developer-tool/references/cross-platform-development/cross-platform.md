# Cross-Platform Development

## Purpose

Define the canonical doctrine for platform compatibility, portability targets, and shared-core versus platform-specific design inside `developer-tool`.

This document is not just a framework chooser.
It exists to answer a broader engineering question:

> when one tool or product must span web, desktop, mobile, or multiple OS/runtime environments, how do we choose the right amount of sharing, the right boundaries, and the right platform-specific behavior without turning portability into lowest-common-denominator architecture?

It covers:
- platform strategy selection
- portability targets and support tiers
- shared-core versus native-shell design
- platform-specific path, runtime, and packaging differences
- cross-platform testing and release posture

## Source Provenance

- **Primary source:** current `developer-tool` cross-platform, platform, shell, and build/deploy doctrine cluster
- **Derived from:** absorbed Tauri, cross-platform compatibility, desktop/runtime bridge, and platform-support donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local cross-platform doctrine aligned to the current developer-tool engine

---

## Core Rule

Cross-platform development is the discipline of deciding what should be shared, what must stay platform-specific, and what support guarantees are actually realistic.

A strong cross-platform posture should make these things explicit:
- what platforms are supported
- what level of fidelity each platform gets
- what code is shared vs isolated
- what runtime and packaging differences matter
- what testing matrix proves the portability claim

The goal is not merely to “run everywhere.”
The goal is to create portable truth without erasing platform reality.

---

## Platform Strategy Matrix

| Strategy | Best For |
|---|---|
| Full native per platform | maximum platform fidelity and no compromise on native UX |
| Cross-platform native framework | strong sharing with relatively native feel |
| Hybrid/webview shell | fast delivery using web tech with desktop/mobile packaging |
| Shared core + native shell | logic portability with platform-specific UI/runtime surfaces |

The right strategy depends on the product's actual pressure profile, not ideological preference.

---

## Pattern 1 — Choose the Portability Target Before Choosing the Stack

The first question is not:
> should we use Flutter, Tauri, React Native, or native shells?

The first question is:
> what platforms do we truly need, and what experience quality must each platform preserve?

Useful distinctions:
- must support vs nice-to-have support
- native-feeling vs acceptable hybrid feel
- same core behavior vs same UI surface
- one release train vs staggered platform rollout

The doctrine is:
- define the portability target first
- let the implementation stack follow from it

---

## Pattern 2 — Shared Core and Platform Shells Often Scale Better Than UI Uniformity Dogma

Many cross-platform systems work best when they separate:
- shared core logic
- platform-specific shells or integration layers
- per-platform UX adaptation where needed

This is often stronger than forcing full UI identity across all targets.

The doctrine is:
- share what benefits from sameness
- isolate what benefits from platform-native behavior

This is especially strong for:
- Rust core + native or web shell
- Tauri-style desktop systems
- CLI/tooling cores reused across delivery surfaces

---

## Pattern 3 — Platform Fidelity and Code Sharing Are Separate Trade-Offs

It is possible to:
- share a lot of logic while customizing UX
- share little UI but a lot of core behavior
- share packaging/release pipelines but not rendering layers

The doctrine is:
- do not reduce cross-platform architecture to one number called “code sharing”
- ask what kind of sharing is actually valuable

This prevents false optimization around percentage-of-shared-code vanity metrics.

---

## Pattern 4 — File System, Paths, and Environment Assumptions Are Real Portability Boundaries

Cross-platform work often fails at the “boring” boundaries:
- config directories
- path separators
- case sensitivity
- executable permissions
- environment variable conventions
- user-home and cache locations

The doctrine is:
- treat path and environment behavior as platform architecture concerns
- not as implementation details to patch later

This is why cross-platform doctrine stays close to shell and build/deploy doctrine.

---

## Pattern 5 — Platform-Specific UX Differences Should Be Deliberate, Not Accidental

Some surfaces should feel different on different platforms.

Examples:
- native controls and interaction conventions
- file picker behavior
- keyboard shortcuts
- menu structures
- permissions and sandbox prompts

The doctrine is:
- platform-specific adaptation is not a failure of consistency
- it is part of respecting platform truth where it matters

Uniformity is not always usability.

---

## Pattern 6 — Build and Release Claims Must Match the Platform Matrix

A cross-platform system should be able to answer:
- which targets are actually built?
- which targets are tested?
- which targets are merely theoretically supported?
- what packaging artifacts exist per platform?

The doctrine is:
- support should be claimed only where the build/test/release matrix actually backs it up
- “should work” is not the same as supported

This ties cross-platform doctrine directly to build-and-deploy doctrine.

---

## Pattern 7 — Platform-Specific Capabilities Need Explicit Guardrails

Different platforms expose different capabilities and restrictions:
- clipboard
- file system access
- notifications
- sandbox and permissions
- system tray/menu integration
- background execution limits

The doctrine is:
- capability assumptions must be surfaced and guarded explicitly
- not left to runtime surprise

Cross-platform systems become more trustworthy when degraded or absent capabilities are treated as first-class cases.

---

## Pattern 8 — Testing Must Prove the Portability Claim, Not Just the Core Logic

A strong testing matrix should include:
- platform-targeted build checks
- target-specific behavioral tests where needed
- path/env/permission edge-case coverage
- platform-specific UI or capability smoke tests
- shared-core tests that prove invariant behavior across shells

The doctrine is:
- cross-platform confidence comes from both shared-core proof and target-specific verification
- not from either one alone

---

## Pattern 9 — Tauri/Hybrid Shells Are Especially About Boundary Honesty

Hybrid shells can be extremely effective.
But they work well only when the architecture is honest about:
- what lives in the native/core side
- what lives in the web shell
- what data crosses IPC or interop boundaries
- which features are platform-facilitated vs browser-like

The doctrine is:
- hybrid systems should not be treated as “just web apps in a wrapper”
- their core/shell boundary is part of the architecture and deserves explicit design

---

## Pattern 10 — Cross-Platform Support Tiers Should Be Documented

A mature cross-platform product should usually express support in tiers such as:
- primary supported platform(s)
- secondary supported platform(s)
- experimental targets
- unsupported or degraded targets

The doctrine is:
- support must be documented as a promise level
- not inferred by users from the existence of a build target alone

This reduces confusion for both developers and operators.

---

## Cross-Platform Checklist

Before calling a system well-designed for cross-platform use, ask:

- [ ] Is the portability target explicit?
- [ ] Is shared-core vs platform-specific logic separated deliberately?
- [ ] Are path, environment, and capability differences treated as architectural concerns?
- [ ] Does UX adaptation respect platform truth where needed?
- [ ] Do build/test/release claims actually match the supported platform matrix?
- [ ] Are support tiers documented honestly?

---

## Anti-Patterns

- choosing the framework first and inventing platform requirements later
- maximizing shared code at the cost of platform honesty
- pretending path/env/permission issues are minor implementation details
- claiming support for targets that are barely tested
- treating hybrid shells as trivial wrappers with no real boundary design
- forcing identical UX where platform-native behavior would be clearer

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../shell-terminal-mastery.md`
- `../platform-infrastructure.md`
- `../build-and-deploy/build-deploy.md`
- `../running-code.md`

---

## Final Doctrine

The reusable lesson is not:
> “cross-platform development means picking the framework with the best code-sharing ratio.”

The reusable lesson is:
> “cross-platform development is the discipline of defining the real portability target, separating shared truth from platform-specific behavior, and proving support through explicit boundaries, capability handling, and platform-backed release claims.”
