---
name: migrator
description: Orchestrate full TypeScript to Rust WASM migration pipeline by coordinating clone, analyse, generate, and test skills.
argument-hint: [repo-url] [project-dir?] [crate-name?] OR [config.toml]
allowed-tools: Read, Write, Edit, Skill, Task, Bash, Glob, Grep
---

# Migrator Skill

## Overview

Coordinate a complete migration from a TypeScript repository to a Rust WASM crate by invoking the individual skills as named steps with explicit dependencies. This orchestrator handles the full workflow from cloning to test generation, running independent steps concurrently where possible.

Supports two invocation modes:

- **Positional arguments**: Quick single migrations
- **Config file**: Reproducible single or batch migrations

This skill follows the shared [Pipeline Orchestration Patterns](references/pipeline.md) for autonomous execution, checkpoint/resume, config detection, batch processing, and directory derivation.

## Arguments

### Mode 1: Positional Arguments

```text
migrate [repo-url] [project-dir?] [crate-name?]
```

1. **Repository URL** (`$REPO_URL`): Git repository URL containing TypeScript source
2. **Project Directory** (`$PROJECT_DIR`, optional): Project root directory; all working and output paths are derived from this (default: `.`)
3. **Crate Name** (`$CRATE_NAME`, optional): Name for the output Rust crate (e.g., `my_component`). Defaults to the repo name extracted from the URL (last path segment, stripped of `.git`, hyphens replaced with underscores). For example, `https://github.com/org/my-component` defaults to `my_component`.

### Mode 2: Config File

```text
migrate [config.toml]
migrate              # Auto-detects ./migrate.toml
```

Config detection uses the shared pattern with `$AUTO_DETECT_FILENAME = migrate.toml`. See [Config File Detection](references/pipeline.md#config-file-detection).

## Derived Arguments

```text
$REPO_URL    = $ARGUMENTS[0]                                  # Git repository URL (positional mode)
$CONFIG_PATH = $ARGUMENTS[0]                                  # Config file path (config mode)
$PROJECT_DIR = config.project-dir OR $ARGUMENTS[1] OR "."     # Project root
$CRATE_NAME  = $ARGUMENTS[2] OR derive_crate_name($REPO_URL)  # Output crate name (optional; defaults to repo name)
$DESIGN_DOC  = config.design-doc OR null                      # Optional solution design document
$WORK_DIR    = $PROJECT_DIR/temp                              # Working dir (temp)
$CRATE_DIR   = $PROJECT_DIR/crates                            # Crate output (durable)
$LEGACY      = $PROJECT_DIR/legacy/<repo_name>                # Cloned legacy repo
$IR_PATH     = $WORK_DIR/<crate_name>.ir.md                   # Intermediate representation
$RUST_CRATE  = $CRATE_DIR/<crate_name>                        # Generated Rust crate

# derive_crate_name(url):
#   1. Extract last path segment from URL  (e.g., "my_component" from ".../my_component")
#   2. Strip trailing ".git" if present    (e.g., "my_component.git" → "my_component")
#   3. Replace hyphens with underscores    (e.g., "my-component" → "my_component")
```

`$LEGACY` (`$PROJECT_DIR/legacy/<repo_name>`) holds cloned legacy repos. See [Directory Derivation](references/pipeline.md#directory-derivation) for shared path conventions.

## Config File Format

### Single Migration

```toml
# migrate.toml
repo = "https://github.com/org/my-component"

# Optional settings
crate = "my_component"       # Defaults to repo name: my_component
project-dir = "."            # Project root (default: "."); derives temp, crates, legacy dirs
design-doc = "design.md"      # Path to solution design document for IR enrichment
detach = true                 # After clone, remove .git so legacy dir is a plain tree (recommended; migrator defaults to true)
```

### Batch Migration

```toml
# migrate.toml
project-dir = "."            # Project root (default: "."); derives temp, crates, legacy dirs
design-doc = "design.md"      # Path to solution design document for IR enrichment

[[projects]]
repo = "https://github.com/org/component-a"
crate = "component_a"

[[projects]]
repo = "https://github.com/org/component-b"
crate = "component_b"

[[projects]]
repo = "https://github.com/org/component-c"
crate = "component_c"
```

Batch processing follows the shared [Batch Processing Semantics](references/pipeline.md#batch-processing-semantics) and [Batch Summary Format](references/pipeline.md#batch-summary-format).

### Config Fields

| Field         | Required | Default                   | Description                                                                                                         |
| ------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `repo`        | Yes      | -                         | Git repository URL                                                                                                  |
| `crate`       | No       | repo name                 | Output crate name (derived from `repo_url`)                                                                         |
| `project-dir` | No       | `"."`                     | Project root                                                                                                        |
| `design-doc`  | No       | -                         | Path to solution design document for IR enrichment                                                                  |
| `detach`      | No       | `true` (migrator default) | After clone, remove `.git` so legacy dir is a plain tree; set `detach = true` in migrate.toml to make this explicit |
| `skip`        | No       | `false`                   | Set `true` to skip this project in batch                                                                            |

## Checkpoint/Resume

Checkpoint filename: `.migration-checkpoint.json`

The checkpoint file uses named steps and includes a `projects` array for batch support:

```json
{
  "version": "2.0",
  "project_dir": ".",
  "projects": [
    {
      "crate": "payment_handler",
      "repo": "https://github.com/org/payment-handler",
      "steps": {
        "clone": { "status": "completed" },
        "wiretap": { "status": "completed" },
        "analyze": { "status": "completed" },
        "enrich": { "status": "skipped" },
        "guest": { "status": "completed" },
        "tdd": { "status": "in_progress" },
        "review": { "status": "pending" },
        "verify": { "status": "pending" }
      },
      "last_updated": "2026-02-01T10:30:00Z",
      "error": null
    }
  ]
}
```

For checkpoint behavior (on start, during execution, on failure, on completion), see [Checkpoint/Resume Mechanism](references/pipeline.md#checkpointresume-mechanism).

## Pipeline Steps

**CRITICAL — FULLY AUTONOMOUS EXECUTION**: Run all steps end-to-end without any pause or user interaction between steps.

**PROHIBITED between steps** (violating this is a bug):

- Asking "Shall I proceed?" or "Ready to continue?" or any similar question
- Pausing after a step completes to summarize and wait
- Requesting confirmation before starting the next step

**When a step completes: immediately start all newly ready steps.**

### Step Dependency Graph

```text
clone ──┬──► wiretap (parallel)
        └──► analyze ──► enrich (optional, when $DESIGN_DOC set)
                      │              │
                      │              ▼
                      └──────► guest ──► tdd ──┬──► review (optional)
                                               └──► verify
```

Steps `wiretap` and `analyze` both depend only on `clone` and run concurrently. Steps `review` and `verify` share the same dependency (`tdd`) and run concurrently.

| Step      | Skill             | depends   | also-after | when                 | optional |
| --------- | ----------------- | --------- | ---------- | -------------------- | -------- |
| `clone`   | `git-cloner`      | —         | —          | —                    | no       |
| `wiretap` | `wiretap`         | `clone`   | —          | —                    | no       |
| `analyze` | `code-analyzer`   | `clone`   | —          | —                    | no       |
| `enrich`  | `design-analyzer` | `analyze` | —          | `$DESIGN_DOC` is set | yes      |
| `guest`   | `guest-gen`       | `analyze` | `enrich`   | —                    | no       |
| `tdd`     | `tdd-gen`         | `guest`   | —          | —                    | no       |
| `review`  | `code-reviewer`   | `tdd`     | —          | —                    | yes      |
| `verify`  | built-in          | `tdd`     | —          | —                    | no       |

### clone — Clone Repository

**Skill**: `git-cloner`
**Action**: Clone the TypeScript repository to the scratch directory. Invoke with **detach = true** so the legacy directory is a plain tree (no `.git`), which is required for the wiretap step and recommended for migration.

```text
Input:  $REPO_URL $PROJECT_DIR/legacy true
Output: $LEGACY (cloned repository path; plain tree when detach=true)
```

When using a config file, if a project or the global config sets `detach = true`, pass that through to git-cloner (third argument `true`). The migrator defaults to detach = true when invoking git-cloner.

**Validation**:

- [ ] Repository cloned successfully
- [ ] Contains TypeScript/JavaScript files
- [ ] `package.json` exists
- [ ] When detach=true, `$LEGACY` has no `.git` (plain tree)

**On completion**: Mark `clone` complete; `analyze` and `wiretap` become ready.

### wiretap — Add Wiretap to Legacy Repo

**Skill**: `wiretap`
**Action**: Add wiretap code to the cloned legacy repo so that when the app runs with `WIRETAP_ENABLED=true`, it captures request/response and side-effect data to `{app-name}.wiretap.json`. Runs in parallel with `analyze`.

```text
Input:  $LEGACY [app-name?]
Output: $LEGACY/src/wiretap/ (session, wiretap singleton, adapters for detected patterns); entrypoint patched; build verified
```

**Validation**:

- [ ] `$LEGACY/src/wiretap/session.ts` and `wiretap.ts` exist
- [ ] Adapters present only for detected patterns (A–H)
- [ ] App entrypoint includes wiretap bootstrap (conditional on `WIRETAP_ENABLED`)
- [ ] `npm run build` (or equivalent) succeeds from `$LEGACY`

**On completion**: Mark `wiretap` complete. No other step depends on wiretap; the rest of the pipeline continues independently.

### analyze — Analyze Codebase

**Skill**: `code-analyzer`
**Action**: Generate IR from the TypeScript source.

```text
Input:  $LEGACY $IR_PATH
Output: $IR_PATH (intermediate representation file)
```

**Validation**:

- [ ] IR file created at `$IR_PATH`
- [ ] IR contains Component, Structures, Business Logic sections
- [ ] External API surfaces documented

**On completion**: Mark `analyze` complete; `enrich` becomes ready if `$DESIGN_DOC` is set, otherwise `enrich` is skipped. `guest` becomes ready once `enrich` is completed or skipped.

### enrich — Enrich IR with Design Documentation (optional)

**Skill**: `design-analyzer`
**Action**: If `$DESIGN_DOC` is provided and the file exists, enrich the code-analysis IR with detail from the design document. Skipped when no design document is provided.

```text
Input:  $DESIGN_DOC $IR_PATH
Output: $IR_PATH (enriched intermediate representation)
```

**When to use**: Provide a `design-doc` in config when the TypeScript codebase alone does not capture business rules, state transition logic, reorder/alert thresholds, or other domain knowledge documented in architecture or solution design documents.

**Interaction with code-analyzer**: The code-analysis IR produced by `analyze` is extracted from source code (high-confidence). In this pipeline, design-analyzer operates in supplement-only mode: it adds missing sections and extends sparse ones, but does not replace any existing content. Source-code-derived types and API surfaces are authoritative.

**Validation**:

- [ ] Design document exists and is readable
- [ ] IR file still valid after enrichment (all existing sections preserved)
- [ ] No existing IR content was overwritten (supplement-only mode)
- [ ] Enrichment note appended to IR Notes section

**On completion**: Mark `enrich` complete; `guest` becomes ready (if `analyze` is also complete).

### guest — Generate WASM Guest

**Skill**: `guest-gen`
**Action**: Generate WASM guest project that wraps the domain crate. Always runs, but only creates the guest if `$PROJECT_DIR/src/lib.rs` does not already exist.

```text
Input:  $PROJECT_DIR
Output: $PROJECT_DIR/src/lib.rs, Cargo.toml, examples/ (created only if src/lib.rs absent)
```

**Validation**:

- [ ] `src/lib.rs` exists with HTTP and/or Messaging guest exports
- [ ] `Cargo.toml` references domain crate
- [ ] Provider implements required traits from IR
- [ ] `examples/.env.example` created

**On completion**: Mark `guest` complete; `tdd` becomes ready.

### tdd — Test-Driven Generation

**Skill**: `tdd-gen`
**Action**: Generate tests FIRST from Code-Analysis IR, then generate code to pass them. This approach reduces bugs by 20-30% compared to code-first generation.

**Process**:

1. Generate integration tests from IR
2. Generate initial implementation (crate-gen)
3. Run tests and capture failures
4. Auto-fix common issues (type mismatches, missing imports, handler wiring)
5. Re-run and iterate (max 5 times)

```text
Input:  $IR_PATH $CRATE_NAME $PROJECT_DIR $LEGACY
Output:
  - $RUST_CRATE (complete Rust crate with guest wiring)
  - $RUST_CRATE/tests/ (integration tests)
  - $WORK_DIR/<crate_name>.tdd-report.md (iteration log)
```

**Validation**:

- [ ] `Cargo.toml` exists with correct dependencies
- [ ] `src/lib.rs` and handler files exist
- [ ] `Migration.md`, `Architecture.md`, `.env.example` exist
- [ ] `tests/provider.rs` and `tests/replay.rs` exist
- [ ] `cargo check` passes
- [ ] `cargo test --no-run` compiles successfully
- [ ] All tests pass OR failures documented in TDG_REPORT.md with [unknown] tags

**Key Benefits**:

- Tests define expected behavior upfront
- Compiler errors caught earlier
- Auto-fix handles 80% of issues
- Fewer manual corrections needed

**On completion**: Mark `tdd` complete; `review` and `verify` both become ready and run concurrently.

### review — Code Review (optional)

**Skill**: `code-reviewer`
**Action**: AI-powered code review to catch remaining issues.

```text
Input:  $RUST_CRATE
Output: $RUST_CRATE/REVIEW.md
```

**Checks**:

- Security vulnerabilities (SQL injection, XSS, hardcoded secrets)
- Error handling issues (unwrap, missing ?)
- WASM constraints violations (std::env, std::fs, std::net)
- Performance anti-patterns (N+1 queries, excessive I/O)
- Code quality (naming, complexity, documentation)

**Validation**:

- [ ] REVIEW.md generated with categorized findings
- [ ] Critical issues count: 0 (target)
- [ ] High severity issues documented
- [ ] Auto-fix applied (if --fix flag used)

**On completion**: Mark `review` complete. If `verify` is also complete, pipeline is done.

### verify — Final Verification

**Action**: Run comprehensive checks on the generated crate.

```bash
cd $RUST_CRATE
cargo fmt --check
cargo clippy -- -D warnings
cargo test
```

**On completion**: Mark `verify` complete. If `review` is also complete (or skipped), pipeline is done. Report results.

## Execution Flow

```text
┌──────────────────────────────────────────────────────────┐
│                   Code Migration Pipeline                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [clone] git-cloner (with detach=true)                   │
│     └─► $PROJECT_DIR/legacy/<repo> (plain tree)         │
│                          │                               │
│              ┌───────────┴───────────┐                   │
│              ▼                       ▼                   │
│  [wiretap] wiretap              [analyze] code-analyzer  │
│     └─► $LEGACY/src/wiretap/         └─► $WORK_DIR/<crate>.ir.md (temp)
│                          │                               │
│              ┌───────────┤                               │
│              ▼           │                               │
│  [enrich] design-analyzer (optional, if $DESIGN_DOC set) │
│     └─► $WORK_DIR/<crate>.ir.md (enriched)               │
│              │           │                               │
│              └─────┬─────┘                               │
│                    ▼                                     │
│  [guest] guest-gen                                       │
│     └─► $PROJECT_DIR/src/lib.rs, Cargo.toml              │
│         Only creates if src/lib.rs does not exist        │
│                    │                                     │
│                    ▼                                     │
│  [tdd] tdd-gen (Test-Driven Generation)                  │
│     ├─► Generate tests from IR                           │
│     ├─► Generate code (crate-gen)                        │
│     ├─► Run tests, capture failures                      │
│     ├─► Auto-fix issues (max 5 iterations)               │
│     └─► $CRATE_DIR/<crate> + tests/ + TDG_REPORT.md      │
│                    │                                     │
│              ┌─────┴─────┐                               │
│              ▼           ▼        (concurrent)           │
│  [review]            [verify]                            │
│  code-reviewer        cargo fmt/clippy/test              │
│  └─► REVIEW.md        └─► Verification results          │
│                                                          │
│  Temp artifacts:   $PROJECT_DIR/temp/ (IR, checkpoint)   │
│  Durable output:   $PROJECT_DIR/crates/ (generated)      │
│                    $PROJECT_DIR/legacy/ (cloned repos)   │
│                    $PROJECT_DIR/ (WASM guest project)    │
└──────────────────────────────────────────────────────────┘
```

## Batch Team Mode

When the config file contains a `[[projects]]` array with **2 or more items**, the lead spawns an agent team to process projects in parallel. Single-project mode (positional arguments or a config with one project) runs the pipeline directly without a team.

This section follows the shared [Agent Team Patterns](references/agent-teams.md) for roles, synthesis, and file ownership.

### Team Composition

| Role | Count | Assignment |
| ---- | ----- | ---------- |
| Lead | 1 | Batch coordinator; spawns teammates, monitors progress, synthesizes report |
| Specialist | min(N, 5) where N = project count | One teammate per project; runs the full pipeline (clone → verify) |

No antagonist is used in batch mode — each project's pipeline already includes its own code review and verification steps.

### Teammate Spawn Prompt

Each teammate receives a spawn prompt containing:

1. Full migrator pipeline instructions (this SKILL.md)
2. Assigned project: repo URL, crate name, project directory, design-doc path (if set)
3. File ownership: `$CRATE_DIR/<crate_name>/`, `$WORK_DIR/<crate_name>*`, `$PROJECT_DIR/legacy/<repo_name>/`
4. Output format: report completion status and any failures to the lead

```text
You are a migration pipeline teammate. Run the full migration pipeline
(clone → analyze → enrich → guest → tdd → review → verify) for the
following project:

  Repo:        $REPO_URL
  Crate:       $CRATE_NAME
  Project Dir: $PROJECT_DIR
  Design Doc:  $DESIGN_DOC (or "none")

You own these paths exclusively:
  - $CRATE_DIR/$CRATE_NAME/
  - $WORK_DIR/$CRATE_NAME*
  - $PROJECT_DIR/legacy/<repo_name>/

Do not modify files outside your owned paths. Follow the pipeline steps
defined in this skill exactly. Report your final status (success/failure
with details) when complete.
```

### Execution Semantics

1. Lead resolves configuration and creates workspace directories (Phase 0–1)
2. Lead creates agent team and spawns one teammate per project (max 5 active)
3. If more than 5 projects: excess projects are added to the shared task list as pending; teammates claim them as they finish their current project
4. Each teammate runs the full pipeline autonomously for its assigned project
5. Teammates report completion (success or failure with step details) to the lead
6. Lead waits for all teammates to complete, then synthesizes the batch summary
7. Lead shuts down all teammates and cleans up the team

### Failure Handling

- A teammate failure does **not** block other teammates
- If a teammate stalls (no progress for extended period), the lead sends a check-in message
- If a teammate crashes, the lead logs the failure and continues; the failed project's checkpoint is preserved for manual resume
- The batch summary distinguishes per-project success, failure, and stall states

### Cross-Project Insights

After all teammates complete, the lead scans for common patterns across projects:

- Shared type definitions or API patterns that could be extracted into a common crate
- Recurring [unknown] tags that suggest a gap in the source repos
- Common test failures that indicate a systematic generation issue

These are documented in a "Cross-Project Notes" section of the batch summary.

## Process

### Phase 0: Resolve Configuration

See [Config File Detection](references/pipeline.md#config-file-detection) for the shared detection logic, using `$AUTO_DETECT_FILENAME = migrate.toml`.

For config mode, parse the TOML and derive crate names from repo URLs if not specified:

```text
derive_crate_name(url):
  1. Extract last path segment    (e.g., "my-component" from ".../my-component")
  2. Strip trailing ".git"        (e.g., "my-component.git" → "my-component")
  3. Replace hyphens with "_"     (e.g., "my-component" → "my_component")
```

### Phase 1: Setup Workspace

```bash
mkdir -p $PROJECT_DIR/legacy   # Cloned legacy repos
mkdir -p $WORK_DIR             # Working dir for IR + checkpoint
mkdir -p $CRATE_DIR            # Durable output for generated crates
```

### Phase 2: Execute Pipeline

**Batch mode (2+ projects)**: Create an agent team per the [Batch Team Mode](#batch-team-mode) section. Each teammate runs the full pipeline for its assigned project. The lead monitors the shared task list and synthesizes results after all teammates complete.

**Single-project mode**: Execute all steps following the shared [Pipeline Execution Process](references/pipeline.md#pipeline-execution-process). Steps whose dependencies are satisfied start immediately; `review` and `verify` run concurrently after `tdd` completes.

### Phase 3: Report Results

After completion, provide summary:

```text
Migration Complete
==================

Source:      $REPO_URL
Project:     $PROJECT_DIR
Crates:      $PROJECT_DIR/crates
Legacy:      $PROJECT_DIR/legacy (cloned repos)
Scratch:     $PROJECT_DIR/temp (can be deleted)

Generated Crate ($PROJECT_DIR/crates/<crate_name>/):
  - src/lib.rs, src/error.rs, src/types.rs, src/handlers.rs
  - Cargo.toml, Migration.md, Architecture.md, .env.example
  - tests/provider.rs, tests/replay.rs

WASM Guest (if generated):
  - $PROJECT_DIR/src/lib.rs, Cargo.toml, examples/

Test-Driven Generation Report:
  - $PROJECT_DIR/temp/<crate_name>.tdd-report.md (iteration log, failures, fixes)

Code Review Report (if generated):
  - $PROJECT_DIR/crates/<crate_name>/REVIEW.md (security, quality, WASM violations)

Next Steps:
  1. Review TDG_REPORT.md for any remaining failures or [unknown] tags
  2. Review REVIEW.md for code quality and security findings (if generated)
  3. Review Migration.md for transformation decisions
  4. Review TODO markers in generated code
  5. Add test fixtures to data/replay/ (or tests/data/replay/ for replay-tests)
  6. (Optional) After preparing real-life JSON in crates/<crate_name>/tests/data/replay/, run: replay-tests crates/<crate_name>
  7. Run full test suite
  8. Clean up: rm -rf $PROJECT_DIR/temp (optional)
```

## Reference Documentation

Detailed guidance and shared patterns are available in `references/`:

- **[Pipeline Orchestration Patterns](references/pipeline.md)** -- Shared checkpoint/resume, config detection, and batch processing patterns used by this skill
- **[Agent Team Patterns](references/agent-teams.md)** -- Shared team roles, antagonist protocol, file ownership, and synthesis rules used by batch team mode

## Examples

Detailed examples are available in the `references/examples/` directory:

1. [positional-args.md](references/examples/positional-args.md) - Migrate single TypeScript service to Rust WASM
2. [config-single-project.md](references/examples/config-single-project.md) - Use config file for reproducible single migration
3. [config-batch.md](references/examples/config-batch.md) - Migrate multiple services in batch
4. [config-detect.md](references/examples/config-detect.md) - Auto-detect migrate.toml from current directory
5. [step-failure-recovery.md](references/examples/step-failure-recovery.md) - Recover from analysis step failure
6. [batch-partial-failure.md](references/examples/batch-partial-failure.md) - Handle partial failures in batch migrations

## Error Handling

See [Step Failure Handling](references/pipeline.md#step-failure-handling) for the shared pattern.

### Common Issues

| Issue                     | Step      | Resolution                                     |
| ------------------------- | --------- | ---------------------------------------------- |
| Clone fails               | `clone`   | Check URL, auth, network                       |
| IR incomplete             | `analyze` | Review TypeScript structure                    |
| Guest generation fails    | `guest`   | Check IR capabilities and crate path           |
| TDG iterations exceed max | `tdd`     | Review TDG_REPORT.md, fix [unknown] tags in IR |
| Cargo check fails         | `tdd`     | Check TDG_REPORT.md for auto-fix failures      |
| Tests don't compile       | `tdd`     | Review type mismatches in TDG_REPORT.md        |

## Verification Checklist

Before completing, verify:

- [ ] All pipeline steps completed successfully (check checkpoint file)
- [ ] IR file generated and contains all expected sections
- [ ] Generated crate compiles with `cargo check`
- [ ] All tests pass with `cargo test`
- [ ] No clippy warnings (`cargo clippy -- -D warnings`)
- [ ] Migration.md present with any manual steps documented
- [ ] Architecture.md present with component design
- [ ] `.env.example` present with all required config keys
- [ ] No WASM constraint violations (std::env, std::fs, std::net, unsafe)
- [ ] No `unwrap()` or `expect()` in production code
- [ ] Guest files updated (if guest-gen was run)
- [ ] Code review REVIEW.md has 0 critical issues (if code-reviewer was run)

## Important Notes

- Steps declare explicit dependencies; independent steps run concurrently
- Validation gates prevent cascading failures
- All paths are derived from `$PROJECT_DIR` (default `.`)
- The pipeline can be resumed from any step using checkpoints in `$PROJECT_DIR/temp`
- Generated crates target `wasm32-wasip2`
- Config file mode is recommended for reproducibility and batch migrations
