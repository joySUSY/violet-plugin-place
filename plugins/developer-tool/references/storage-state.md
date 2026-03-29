# Storage Management

## Purpose

Define the canonical doctrine for storage and state boundaries inside `developer-tool` workflows.

This document is not only about browser cookies or localStorage commands.
It exists to answer a broader operational question:

> when a workflow needs to preserve, reuse, compare, or clean execution state, how do we decide what should be stored, where it should live, how durable it should be, and how to keep that state from becoming silent operational debt?

It applies to:
- cookies and browser storage
- saved storage-state artifacts
- auth/session reuse
- persistent vs ephemeral state
- cached vs durable vs exported state
- cleanup, security, and reproducibility posture

## Source Provenance

- **Primary source:** current `developer-tool` execution / session / memory doctrine cluster
- **Derived from:** absorbed browser-state, workflow-state, and storage-management donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local state/storage doctrine aligned to the current developer-tool engine

---

## Core Rule

State should be stored with intention, not by accident.

A strong storage posture should make these things explicit:
- what kind of state this is
- whether it is ephemeral, reusable, or durable
- who owns it
- how it is exported/imported
- how sensitive it is
- how and when it is cleaned up

The goal is not just to keep state around.
The goal is to preserve the right state long enough to create leverage, without turning stale or sensitive state into hidden infrastructure debt.

---

## State Surface Map

| State Surface | Best For |
|---|---|
| In-memory state | disposable, privacy-sensitive, short-lived runs |
| Session-bound persisted state | repeated workflows that benefit from continuity |
| Exported storage-state artifact | reproduction, sharing, migration, auth reuse |
| Browser/web storage | application/session context inside browser execution |
| Cache | speed and convenience, not source of truth |
| Durable source-of-truth state | records that must survive and be trusted over time |

The same data can become harmful if it lives on the wrong surface for too long.

---

## Pattern 1 — State Type Must Be Classified Before It Is Stored

Not all state should be handled equally.

Useful distinctions include:
- authentication/session state
- configuration state
- workflow progress state
- cached derived state
- user-visible application state
- diagnostic or replay state

The doctrine is:
- classify the state first
- then decide where it belongs

Most storage confusion comes from skipping this step.

---

## Pattern 2 — Persistent and Ephemeral State Solve Different Problems

### Persistent state
Best when:
- login or session reuse matters
- reproducing a workflow later matters
- setup cost is high enough that reuse is beneficial

### Ephemeral state
Best when:
- the run is one-off
- privacy/sensitivity is high
- contamination risk outweighs convenience
- the workflow should leave minimal residue

The doctrine is:
- persistence is a trade-off, not a default virtue
- choose it only when the carried state creates more value than risk

---

## Pattern 3 — Cookies, Local Storage, Session Storage, and IndexedDB Are Different Boundaries

A good storage doctrine does not collapse all browser state into one blob.

### Cookies
- often auth/session or request-boundary relevant
- important for server-facing behavior

### localStorage
- persistent browser-side app state
- useful for preferences, client flags, cached identity data, etc.

### sessionStorage
- narrower, tab/session-scoped browser state
- often useful for flow-local or transient interaction data

### IndexedDB
- richer client-side structured storage
- often used for larger or more durable app state and offline behavior

The doctrine is:
- storage surface affects behavior
- know which layer you are actually manipulating

---

## Pattern 4 — Exported Storage State Is a Workflow Artifact, Not Just a Convenience File

A saved storage-state file can be valuable for:
- authentication reuse
- issue reproduction
- regression testing
- session migration
- automation startup shortcuts

But that also means it should be treated like an artifact with:
- naming discipline
- sensitivity review
- explicit retention/cleanup posture

The doctrine is:
- exported state files are operational artifacts
- not casual leftovers

---

## Pattern 5 — Reuse of Auth State Is Powerful but Sensitive

Auth/session reuse can dramatically speed workflows.
It is especially useful for:
- repeated authenticated testing
- long multi-step automation
- reproduction of role-specific behavior

But auth state is also one of the riskiest forms of stored state.

The doctrine is:
- auth-state reuse is allowed when it creates real leverage
- but it must be treated as sensitive operational state, not harmless test data

If the file or stored state can impersonate a user, handle it like a secret-adjacent artifact.

---

## Pattern 6 — Cached State Must Not Be Mistaken for Truth

Caches and reused browser state often make workflows faster, but they can also hide drift.

Examples:
- stale auth context
- old feature flags in storage
- outdated local data masking new regressions
- IndexedDB leftovers influencing later runs unexpectedly

The doctrine is:
- cached state is a performance or convenience layer
- it is not a source of truth

A workflow that cannot distinguish the two becomes harder to trust.

---

## Pattern 7 — State Export/Import Should Increase Reproducibility, Not Mystery

Importing or restoring state is valuable when it helps answer:
- can this issue be reproduced with the same starting conditions?
- can another run skip repetitive setup honestly?
- can we compare pre/post behavior under the same state?

But imported state also creates hidden assumptions.

The doctrine is:
- any state import should make its effect legible enough that another operator knows what was carried forward

If restored state is invisible, debugging becomes harder, not easier.

---

## Pattern 8 — Storage Hygiene Requires Cleanup Discipline

Good storage/state management includes:
- clearing stale cookies when needed
- deleting obsolete exported state files
- removing old browser/local data that no longer serves a purpose
- distinguishing retained evidence from disposable operational residue

The doctrine is:
- state lifecycle matters as much as state creation
- if you can create it, you must know when to remove it

Stale state is one of the easiest ways to create “works on my machine” drift.

---

## Pattern 9 — Sensitive State Must Be Handled Like Operational Risk

State may contain:
- auth tokens
- user identifiers
- preferences revealing internal behavior
- cached responses
- internal app flags

That means saved storage state should be evaluated for:
- whether it belongs in git (usually not)
- whether it should be deleted after use
- whether it needs `.gitignore` or tighter local handling

The doctrine is:
- state artifacts should be treated proportionally to their risk
- convenience must not outrank disclosure safety

---

## Pattern 10 — Session Management and Storage Management Should Reinforce Each Other

Session doctrine and storage doctrine are closely related.

### Session management answers
- which execution context is active?
- how many contexts exist?
- how are they named, resumed, or destroyed?

### Storage management answers
- what state does that context carry?
- where is it stored?
- how durable or sensitive is it?
- how is it exported/imported/cleaned?

The doctrine is:
- sessions define the container
- storage defines the contents and lifecycle of that container

Keep both explicit.

---

## Pattern 11 — Storage Strategy Should Reduce Setup Cost Without Increasing Hidden Coupling

A good storage workflow should reduce repeated friction such as:
- repeated login steps
- rebuilding the same initial app state
- recreating test fixtures manually

But if the shortcut increases hidden coupling too much, it becomes counterproductive.

The doctrine is:
- state reuse is good when it saves setup honestly
- state reuse is bad when it silently changes what the test or workflow actually means

---

## Storage and State Checklist

Before calling a storage workflow healthy, ask:

- [ ] Have we classified what kind of state this is?
- [ ] Is it stored on the right surface (ephemeral, persisted, exported, durable)?
- [ ] Are cookies/localStorage/sessionStorage/IndexedDB being treated as distinct boundaries?
- [ ] If auth or sensitive state is involved, is handling appropriately cautious?
- [ ] Does exported or restored state improve reproducibility without hiding assumptions?
- [ ] Is cleanup/retention discipline explicit?

---

## Anti-Patterns

- treating all browser/app state as one undifferentiated blob
- persisting state by default without asking whether it should survive
- reusing auth state casually without sensitivity review
- confusing cache convenience with durable truth
- restoring old state without making the carried assumptions visible
- letting stale state accumulate until it changes workflow meaning silently

---

## Cross-Links

Read this alongside:
- `session-management.md`
- `running-code.md`
- `memory-systems-overview.md`
- `request-mocking.md`
- `shell-and-terminal/portable-session-workflows.md`

---

## Final Doctrine

The reusable lesson is not:
> “storage management means saving and restoring cookies and browser storage.”

The reusable lesson is:
> “state/storage discipline means deciding what state exists, where it belongs, how durable and sensitive it is, and when it should be reused or erased—so workflows gain leverage from preserved context without collapsing into stale or invisible operational coupling.”
