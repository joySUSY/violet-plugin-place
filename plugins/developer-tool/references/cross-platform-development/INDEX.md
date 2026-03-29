# Cross-Platform Development Index

## Purpose

Canonical entrypoint for cross-platform strategy and compatibility doctrine inside `developer-tool`.

Use this category when the task is about:

- platform support tiers
- desktop, mobile, and web strategy
- hybrid versus native versus shared-core architecture
- platform-specific runtime, path, capability, and packaging differences
- cross-platform testing and release posture
- deciding what should be shared and what should remain platform-specific

This index is not only a file list.
It exists to route readers into the correct cross-platform doctrine lane based on the kind of portability or support pressure they need to make explicit.

## Source Provenance

- **Primary source:** current cross-platform doctrine subtree under `references/cross-platform-development/`
- **Derived from:** cross-platform compatibility, portability, hybrid-shell, and runtime bridge canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current `cross-platform-development` lane

---

## Cross-Platform Spine

The `cross-platform-development` subtree now has a clear doctrinal spine:

1. **Root portability and support-tier law**
   - `cross-platform.md`
2. **Platform infrastructure and strategy cross-links**
   - `../platform-infrastructure.md`
3. **Build, shell, and runtime cross-links**
   - `../build-and-deploy/INDEX.md`
   - `../shell-and-terminal/INDEX.md`
   - `../../commands/prime/cross-platform-surface.md`
   - `../../agents/cross-platform-diagnostician.md`

The doctrine is:
- cross-platform reasoning should move from support-tier and shared-core law → platform and runtime boundaries → build/release/test consequences
- not jump straight into frameworks or target lists before the portability target is explicit

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `cross-platform.md` | Root doctrine for portability targets, shared-core versus platform-shell boundaries, and support-tier truth | you need the cross-platform model first |
| `../platform-infrastructure.md` | Broader doctrine for platform organization, infrastructure, and strategy surfaces | the problem becomes organizational or platform-governance heavy |
| `../build-and-deploy/INDEX.md` | Build/release/deployment doctrine for platform-specific artifact and testing claims | packaging, matrix, or release truth dominates |
| `../shell-and-terminal/INDEX.md` | Shell/runtime/environment portability doctrine | path, environment, or terminal/runtime differences dominate |

---

## Reading Paths

### If you need the root cross-platform model first

1. `cross-platform.md`
2. then branch by the dominant portability pressure

### If the task is about support tiers or portability targets

1. `cross-platform.md`
2. `../platform-infrastructure.md` if the support model becomes organizationally significant

### If the task is about shared core versus platform shell boundaries

1. `cross-platform.md`
2. `../shell-and-terminal/INDEX.md` if the real divergence is runtime or environment-specific
3. `../build-and-deploy/INDEX.md` if the boundary primarily affects artifact and release surfaces

### If the task is about path, environment, or shell portability

1. `cross-platform.md`
2. `../shell-and-terminal/INDEX.md`
3. `../../agents/cross-platform-diagnostician.md` if bounded diagnosis is needed after doctrine is clear

### If the task is about platform-specific packaging, testing, or release posture

1. `cross-platform.md`
2. `../build-and-deploy/INDEX.md`
3. `../platform-infrastructure.md` if the issue expands into platform-governance or support-tier policy

### If the task is about runtime-surface support for cross-platform work

1. `cross-platform.md`
2. `../../commands/prime/cross-platform-surface.md`
3. `../../agents/cross-platform-diagnostician.md` when explicit routing or diagnosis adds leverage

---

## Cross-Platform Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **support tiers**, **shared-core boundaries**, **platform runtime differences**, **environment/path behavior**, or **release/test matrix claims**?
2. Is this still a doctrine-first portability question, or already a build/deploy or shell/runtime question disguised as one?
3. Do we need the root portability doctrine first, or are we already certain which specialized cross-lane constraint dominates?
4. Are we trying to choose a target, preserve fidelity, or constrain a support promise?

The doctrine is:
- cross-platform docs are organized by portability pressure and support-tier pressure
- not by framework-name familiarity or target excitement

---

## Cross-Links

Cross-platform doctrine overlaps naturally with these lanes:

- **Shell and terminal**
  - `../shell-and-terminal/INDEX.md`
- **Build and deploy**
  - `../build-and-deploy/INDEX.md`
- **Language specialists**
  - `../language-specialists/INDEX.md`
- **Root references**
  - `../INDEX.md`
- **Root runtime shell**
  - `../../commands/prime/cross-platform-surface.md`
  - `../../agents/cross-platform-diagnostician.md`

The doctrine is:
- cross-platform-development is where support truth becomes explicit inside `developer-tool`
- so it must remain connected to shell behavior, release posture, language-specific implementation, and root routing rather than pretending portability is a standalone framework choice

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- runtime-aware and strategy-aware cross-links

It should **not** depend on donor skill bundles or legacy platform notes for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “cross-platform-development is where the portability docs live.”

The reusable lesson is:
> “the `cross-platform-development` subtree is the canonical navigation layer for portability truth inside `developer-tool`—routing engineers from support-tier and shared-core law into the exact platform, shell, build, or runtime doctrine they need before cross-platform behavior is allowed to harden into product commitments.”
