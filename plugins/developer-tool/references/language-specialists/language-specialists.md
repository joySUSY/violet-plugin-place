# Language Specialists

## Purpose

Define the canonical doctrine for language-specialist work inside `developer-tool` when the task falls outside the dedicated heavy engines.

This lane exists because `developer-tool` still needs a place to reason about language-specific work for ecosystems that do not yet justify their own full engine, or that appear as supporting surfaces around a tool/platform problem.

The real question is:

> when a task touches C++, Kotlin, Swift, Flutter/Dart, PHP, PowerShell, or mobile platform specifics, how do we route into language-appropriate advice without collapsing back into donor sprawl or pretending one generic tool doctrine fits all languages equally well?

It focuses on:
- language-specific idioms and risk surfaces
- framework and toolchain choice where it materially matters
- interop boundaries with other engines
- when to stay in `developer-tool` vs when to route to a heavier dedicated engine

## Source Provenance

- **Primary source:** current `developer-tool` language-specialist and cross-platform doctrine cluster
- **Derived from:** absorbed cpp-pro, kotlin-specialist, flutter-expert, php-pro, powershell-module-architect, powershell-ui-architect, mobile-developer, and adjacent cross-language donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local language-specialist doctrine aligned to the current developer-tool engine

---

## Core Rule

Language-specialist guidance should preserve language truth without trying to turn `developer-tool` into five separate full engines.

That means a mature language-specialist lane should answer:
- what kind of problem is this really?
- is it mostly language-idiom, framework, runtime, or interop-driven?
- does `developer-tool` own the answer, or should the task route to another engine?
- what is the minimum language-specific doctrine needed to act correctly?

The goal is not to memorize every language ecosystem.  
The goal is to preserve the right specialist boundary for the task at hand.

---

## Language Specialist Map

| Surface | Primary Pressure |
|---|---|
| C/C++ | ABI/interop, memory discipline, toolchain/build-system complexity |
| Kotlin / Android | coroutine/runtime model, KMP boundaries, mobile platform concerns |
| Swift / iOS | concurrency, native platform idioms, platform UX/runtime boundaries |
| Flutter / Dart | state management, platform channels, shared UI/runtime trade-offs |
| PHP | framework posture, modern language constraints, backend ergonomics |
| PowerShell | module design, pipeline semantics, Windows/admin automation posture |
| Mobile cross-platform | platform fidelity vs shared-core trade-offs |

Each language or platform cluster appears here because it carries a different operational truth.

---

## Pattern 1 — Route by Problem Shape, Not by Language Mention Alone

If the user mentions a language, that does not automatically mean the whole task belongs in a language-specialist lane.

Examples:
- a Rust FFI question with C++ on the other side may belong mainly to `rust-coding-engine`
- a Tauri architecture question may belong mainly to interop or cross-platform doctrine
- a Flutter state-management issue may remain here because it is genuinely Flutter-specific
- a PowerShell module question may stay here because the platform and language surface are inseparable

The doctrine is:
- ask what pressure the language mention introduces
- do not route by keyword alone

---

## Pattern 2 — Language-Specific Work Should Preserve Native Idioms

Good language-specialist guidance should reinforce the host language's actual strengths.

Examples:
- modern C++ should privilege RAII, spans, smart pointers, and modern toolchains
- Kotlin should preserve structured concurrency and Flow/Coroutine thinking
- Swift should respect actor/concurrency and Apple platform idioms
- Flutter should treat state management and platform channels as architectural choices
- PowerShell should preserve pipeline semantics and `ShouldProcess`-style safety

The doctrine is:
- do not write Java in Kotlin, C in modern C++, or shell-in-disguise in PowerShell
- specialist guidance should preserve native thought styles, not flatten them

---

## Pattern 3 — Framework Choice Should Follow Runtime Pressure

In each language, framework choice is often really about runtime pressure.

Examples:
- Kotlin backend: startup speed vs enterprise weight
- PHP backend: full-stack speed vs component modularity
- Flutter: state discipline and native bridge posture
- PowerShell: scripting convenience vs reusable module design

The doctrine is:
- framework advice should be framed in terms of trade-offs and pressure
- not just popularity or personal taste

---

## Pattern 4 — Interop Is the Most Common Reason These Languages Touch `developer-tool`

Many of these languages appear in `developer-tool` because they are adjacent to broader systems:
- C++ beside Rust or high-performance systems
- Kotlin/Swift beside mobile/native shells
- Flutter beside cross-platform UI/runtime integration
- PowerShell beside operational automation on Windows

The doctrine is:
- when the question becomes primarily interop, boundary, or platform-surface driven, route outward to the relevant doctrine lane instead of overloading the language note itself

This keeps the lane useful rather than bloated.

---

## Pattern 5 — Cross-Platform Mobile and Desktop Work Needs Clear Shared-Core Boundaries

Some language-specialist tasks are really cross-platform boundary problems disguised as language questions.

Examples:
- Flutter and Tauri both raise shared-core vs shell questions
- Swift/Kotlin work may involve shared business logic or native shell boundaries
- mobile UX and native capability questions often cross languages and platform layers together

The doctrine is:
- if the work is mostly about platform architecture, route into cross-platform doctrine
- use language-specialist guidance to preserve idiomatic implementation within that architecture

---

## Pattern 6 — Toolchain and Build System Advice Is Part of Language Truth

A specialist lane should not stop at syntax or code style.

Important language truths include:
- CMake/Meson/Bazel/vcpkg/Conan for C++
- Gradle/KMP/Android build structure for Kotlin
- Xcode/SPM/CocoaPods realities for Swift
- Flutter build and platform-channel structure
- Composer/framework/tooling realities for PHP
- module manifests and packaging posture for PowerShell

The doctrine is:
- toolchain reality is part of the language's operational truth
- omitting it weakens specialist guidance considerably

---

## Pattern 7 — Some Language Problems Should Stay Shallow Here

This lane should not become a pseudo-complete language academy.

Good use:
- preserve the few high-value specialist patterns that frequently arise in developer-tool work
- route into the right external or engine-level lane when the question becomes deeper than the lane can support well

The doctrine is:
- `developer-tool` should be a high-quality router and bridge for these languages
- not a fake replacement for dedicated ecosystem mastery when deeper engines or dedicated specialist repositories should own that depth

---

## Pattern 8 — Specialist Guidance Should Still Be Evidence-Oriented

Even language-specific advice should maintain the same engineering posture as the rest of the engine:
- explain trade-offs
- point to build/runtime implications
- keep operational and interop effects visible
- avoid decorative “best practice” statements with no consequence model

The doctrine is:
- language-specialist advice should remain engineering doctrine, not trivia or fandom

---

## Language Specialist Checklist

Before calling a language-specialist routing decision healthy, ask:

- [ ] Is this really a language-specific problem, or mostly an interop/platform/runtime problem?
- [ ] Are we preserving native idioms instead of flattening them into generic coding advice?
- [ ] Does the guidance include the relevant build/runtime/toolchain reality?
- [ ] Should this remain inside `developer-tool`, or route into a dedicated heavy engine or another lane?
- [ ] Is the language-specific advice framed in terms of trade-offs rather than just tool popularity?

---

## Anti-Patterns

- routing by language keyword alone
- giving generic advice that ignores the host ecosystem's idioms
- turning `developer-tool` into a fake universal replacement for dedicated language engines
- discussing framework names without runtime or operational trade-offs
- ignoring build/toolchain reality in language-specific guidance
- solving platform/interop problems as if they were purely syntax questions

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../cross-platform-development/INDEX.md`
- `../platform-infrastructure.md`
- `../diagram-tooling.md`
- `../../rust-coding-engine/SKILL.md`
- `../../typescript-coding-engine/SKILL.md`

---

## Final Doctrine

The reusable lesson is not:
> “language specialists means keeping notes for C++, Kotlin, Flutter, PHP, and PowerShell.”

The reusable lesson is:
> “language-specialist guidance should preserve the operational truth of each ecosystem while routing interop, platform, and runtime-heavy questions to the right broader doctrine lanes—so `developer-tool` stays a sharp cross-language bridge instead of turning into undifferentiated donor sprawl.”
