# TypeScript Clean-Code Runtime Boundaries

## Purpose

Define the canonical runtime-boundary doctrine for the `clean-code` lane inside `typescript-coding-engine`.

This document answers a focused operational question:

> what TypeScript clean-code behavior should remain doctrine-only, and what clean-code or tooling behavior is actually worthy of becoming an explicit runtime surface such as a command, agent, hook, or rule?

This matters because quality and tooling logic are easy to over-automate.
A healthy TypeScript engine keeps runtime surfaces useful without turning the shell into an omnipresent lint police state.

It focuses on:

- doctrine versus runtime ownership
- quality automation escalation
- compiler and CI truth precedence
- when commands, agents, hooks, and rules are justified
- how runtime support should reduce wrong moves without replacing architectural judgment

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** runtime-boundary separation work for TypeScript validation, quality gates, toolchain posture, and shell-surface canonization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local boundary doctrine aligned to the current TypeScript engine

---

## Core Rule

The runtime shell may support TypeScript quality work.
It must not replace quality judgment with noisy or overbroad automation.

The goal is not to automate every style or correctness idea.
The goal is to expose the smallest runtime surfaces that make TypeScript quality easier to apply correctly than incorrectly.

A strong runtime-boundary doctrine should answer:

1. what belongs in references and policy docs?
2. what belongs in explicit commands or route helpers?
3. what belongs in bounded review agents?
4. what, if anything, deserves lifecycle hooks or hard shell rules?
5. where should the shell stop and let compiler, tests, or CI remain the primary truth surface?

If those answers are blurry, the engine will gradually turn clean-code guidance into automation noise.

---

## Runtime Surface Map

| Surface               | What it should own                                               |
| --------------------- | ---------------------------------------------------------------- |
| Doctrine / references | rationale, policy, decision frameworks, migration paths          |
| Skills                | lane routing and doctrinal loading                               |
| Commands              | explicit check or route entrypoints                              |
| Agents                | bounded audits, diagnosis, and review                            |
| Hooks                 | narrow lifecycle reminders or carefully justified enforcement    |
| Rules                 | durable shell laws for especially important invariants           |
| Compiler / CI         | primary machine truth for type, lint, test, and build confidence |

The doctrine is:

- runtime surfaces should operationalize doctrine
- they should not duplicate the doctrine tree or replace architectural thinking
- compiler and CI remain the strongest machine truth surfaces for many failure classes

---

## Escalation Ladder

A healthy escalation order is usually:

1. **Doctrine only**
   - read the policy or decision note
2. **Skill / bridge routing**
   - load the right lane deliberately
3. **Explicit command**
   - run a named check or route decision
4. **Bounded agent review**
   - use isolated reasoning for diagnosis or audit
5. **Conservative hook support**
   - only when lifecycle timing adds real leverage
6. **Hard rule**
   - only when the invariant is stable enough to deserve deterministic enforcement

The doctrine is:

- escalate by operational leverage
- not by the attractiveness of automation

---

## Runtime-Shell Worthy

The shell may own:

- explicit commands for type or toolchain checking
- route commands that choose validation, state-pattern, or testing paths
- bounded agents for tooling, architecture, or interop audit
- lightweight lifecycle reminders about missing verification or shell/doctrine separation
- carefully scoped enforcement around high-risk mutation or contract-drift boundaries

These are runtime-worthy because they provide concrete leverage:

- they reduce wrong moves
- they improve discoverability
- they provide bounded operational help
- they preserve a clear next action for the user or agent

Runtime support is strongest when it shortens the path to the correct doctrine or check.
It is weak when it tries to replace the doctrine or the check.

---

## Doctrine-Only

The shell should not try to encode every style or quality rule into hook logic or runtime behavior.
Most clean-code and quality-gate logic should remain in doctrine and curated references.

Examples of doctrine-first content:

- why `unknown` is better than `any` at trust boundaries
- when runtime validation is justified
- how to choose a migration path for anti-pattern debt
- how to interpret a TypeScript diagnostic as architecture feedback
- how testing surfaces differ from each other conceptually
- why a team chooses one toolchain posture over another

The doctrine is:

- if the content primarily teaches judgment, it belongs in doctrine first
- runtime should appear only where repeated workflows justify it

---

## Pattern 1 — Explicit Commands Beat Ambient Tooling Pressure

Clean-code and tooling work is often better exposed through explicit commands than through hidden automation.

Good runtime examples:

- `check/types`
- `check/toolchain`
- `route/choose-runtime-validation`
- `route/choose-state-pattern`

The doctrine is:

- commands are good when the user or agent can intentionally invoke a specific quality workflow
- commands are weak when they just dump doctrine or hide complex side effects

Explicit entrypoints are easier to trust than ambient nagging.

---

## Pattern 2 — Agents Are for Review and Diagnosis, Not Perpetual Policing

Bounded agents are useful for:

- type diagnosis
- architecture review
- tooling audit
- interop review

They are less suitable for:

- constant background enforcement
- replacing all compiler or CI truth
- silently judging every edit in real time
- re-explaining the whole doctrine tree every time a small issue appears

The doctrine is:

- use agents when the problem needs isolated reasoning and a review posture
- not as universal substitutes for the toolchain or for doctrine itself

This preserves both token economy and usability.

---

## Pattern 3 — Hooks Should Be Conservative in the Clean-Code Lane

Hooks are powerful but risky in quality-heavy domains.

Why:

- lint and style concerns can fire too often
- strictness or migration rules may be too contextual for constant automation
- aggressive hooks can create bypass culture instead of better engineering
- hidden mutation or noisy reminders damage trust quickly

Good hook candidates:

- narrow reminders before high-risk mutation
- stop-time prompts about missing verification
- precompact continuity preservation for current quality work
- light warnings about known dangerous paths when the signal is clear

Bad hook candidates:

- broad style policing on every action
- large doctrinal lectures emitted automatically
- opaque automation that changes files or behavior without explicit user understanding
- pretending a hook is equivalent to a real compiler/test/build run

The doctrine is:

- the clean-code lane should prefer conservative lifecycle assistance, not omnipresent policing

---

## Pattern 4 — Hard Rules Are for Stable Invariants, Not Taste

A shell rule is the strongest form of runtime enforcement.
That means it should be reserved for especially stable invariants.

Good candidates:

- obvious forbidden unsafe escapes in very mature code paths
- well-established tool or boundary laws that the team has already canonized strongly
- deterministic, low-ambiguity checks where false positives are rare

Bad candidates:

- style taste masquerading as policy
- evolving migration targets
- nuanced architectural trade-offs
- validation decisions that depend on context the shell cannot reliably infer

The doctrine is:

- rules should freeze mature law
- not force immature doctrine into premature rigidity

---

## Pattern 5 — The Compiler and CI Remain the Strongest Truth Surfaces

The shell should not try to outcompete:

- `tsc`
- lint checks
- test runs
- CI quality gates
- build and package checks

These remain primary truth surfaces for many failure classes.

The doctrine is:

- runtime shell help should route toward or interpret these truth surfaces
- not attempt to replace them with lighter, noisier approximations

A command that makes it easier to run the right check is valuable.
A hook that pretends to be the check is usually weaker.

---

## Pattern 6 — Runtime Validation Decisions Should Usually Be Routed, Not Auto-Enforced

Runtime validation is a design and trust-boundary question.
That usually means the shell should:

- help route to the right doctrine
- provide a decision aid
- optionally audit boundary posture
- point to the runtime-validation matrix and testing strategy

It should not automatically inject validation into every flow by surprise.

The doctrine is:

- trust-boundary work needs judgment
- runtime support should help expose the judgment, not erase it behind automation

---

## Pattern 7 — Testing Surfaces Should Be Reached Through Intent, Not Noise

Testing is too broad to be encoded as one ambient runtime behavior.

Good runtime posture:

- explicit `check/*` commands
- bounded test-strategy review agents
- CI as the merge or ship truth surface
- targeted reminders when a known high-risk change clearly lacks proof

Bad runtime posture:

- every edit triggers generic “did you write tests?” noise
- test philosophy is encoded as repeated lifecycle interruptions
- hooks guess testing adequacy without any boundary context

The doctrine is:

- runtime support should help the system reach the correct proof surface
- not simulate proof through nagging

---

## Pattern 8 — Quality Automation Must Scale with Risk and Support Burden

A public package, a Tauri bridge, and a small internal admin script should not all get the same shell enforcement posture.

Good escalation logic:

- low-risk or local work -> doctrine + explicit commands may be enough
- medium-risk shared work -> commands + review agents
- high-risk shared or public work -> stronger CI truth + carefully justified runtime reminders or gates

The doctrine is:

- runtime quality enforcement should scale with actual risk and support burden
- not with the author's appetite for automation

---

## Pattern 9 — Runtime Surfaces Should Help the User Reach the Right Doctrine Faster

The shell is strong when it makes it easier to answer:

- is this a type-diagnosis problem?
- is this a runtime-validation decision?
- is this a toolchain or CI problem?
- is this a migration-ladder problem?
- is this a testing-boundary issue?

The doctrine is:

- runtime surfaces should reduce the cost of finding the right clean-code lane
- not attempt to flatten all lanes into one automation surface

This is what keeps the engine legible as it grows.

---

## Pattern 10 — Avoid Turning Style into Constant Runtime Friction

One of the fastest ways to make a high-quality TypeScript engine unbearable is to convert every style preference into immediate runtime interruption.

Examples of bad runtime posture:

- blocking every edit because a style rule might be implicated
- emitting repeated warnings for the same doctrinal lesson
- auto-linting or auto-mutating in hidden ways at unpredictable lifecycle moments
- creating a shell culture where developers work around quality rather than through it

The doctrine is:

- preserve strong quality standards
- but do so in ways that maintain agency, predictability, and low noise

Good doctrine + clear commands + strong CI usually outperform overzealous runtime friction.

---

## Pattern 11 — Runtime Surfaces Should Leave a Clean Audit Trail

If the shell does perform a quality-related runtime action, it should be clear:

- why it triggered
- what lane it belongs to
- what the user or agent should do next
- whether it was advisory, diagnostic, or blocking

The doctrine is:

- runtime quality actions should be explainable and auditable
- not magical or opaque

This is especially important when commands, agents, hooks, and rules all coexist.

---

## Runtime Boundary Checklist

Before promoting a TypeScript clean-code behavior into a runtime surface, ask:

- [ ] Is this behavior operational enough to justify runtime support?
- [ ] Would an explicit command or route be better than a hook?
- [ ] Is the compiler or CI already the stronger truth surface?
- [ ] Does the runtime surface reduce wrong moves without becoming noisy?
- [ ] Is the escalation level matched to risk and support burden?
- [ ] Will this runtime behavior stay explainable and audit-friendly?
- [ ] Is this freezing stable law, or merely hardening taste or immature doctrine?

---

## Anti-Patterns

- trying to encode the entire clean-code lane as hooks
- replacing compiler or CI truth with shell approximations
- constant runtime style policing that teaches bypass culture
- promoting migration advice into rigid rules too early
- using agents as always-on judges instead of bounded reviewers
- hidden mutation or hidden auto-fix behavior presented as “help”

---

## Cross-Links

Read this alongside:

- `INDEX.md`
- `quality-gates-governance.md`
- `toolchain-posture.md`
- `typescript-runtime-validation-decision-matrix.md`
- `typescript-testing-strategy-and-type-boundaries.md`
- `typescript-anti-patterns-and-migration-ladders.md`
- `../foundations/strict-type-system-posture.md`
- `../../commands/check/types.md`
- `../../commands/check/toolchain.md`
- `../../agents/ts-tooling-auditor.md`
- `../../agents/type-diagnostician.md`

---

## Final Doctrine

The reusable lesson is not:

> “some TypeScript quality behavior belongs in the shell and some belongs in docs.”

The reusable lesson is:

> “TypeScript clean-code runtime boundaries should make the right doctrine, check, route, or review surface easier to reach than the wrong one—while leaving compiler truth, CI truth, and contextual engineering judgment in their proper place instead of flattening them into noisy automation.”
