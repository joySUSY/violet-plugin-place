# Example 3: Batch Migration with Config File

## Scenario

Migrate multiple services in batch

## Config File

`batch-migrate.toml`:

```toml
project-dir = "."

[[projects]]
repo = "https://github.com/org/auth-service"
crate = "auth_service"

[[projects]]
repo = "https://github.com/org/user-service"
crate = "user_service"

[[projects]]
repo = "https://github.com/org/notification-service"
crate = "notification_service"
```

## Execution

```bash
migrate ./batch-migrate.toml
```

## Expected Output

```text
========================================
Batch Migration: 3 projects
========================================

Project 1/3: auth-service
  [clone] Clone...             ✓
  [analyze] Analyze...         ✓
  [guest] Guest...             ✓ (created)
  [tdd] TDD...                ✓
  [review] Review...           ✓ ┐ concurrent
  [verify] Verify...           ✓ ┘
  Status: SUCCESS

Project 2/3: user-service
  [clone] Clone...             ✓
  [analyze] Analyze...         ✓
  [guest] Guest...             ✓ (already exists)
  [tdd] TDD...                ✓
  [review] Review...           ✓ ┐ concurrent
  [verify] Verify...           ✓ ┘
  Status: SUCCESS

Project 3/3: notification-service
  [clone] Clone...             ✓
  [analyze] Analyze...         ✓
  [guest] Guest...             ✓ (created)
  [tdd] TDD...                ⚠ (2 TODO markers)
  [review] Review...           ✓ ┐ concurrent
  [verify] Verify...           ✓ ┘
  Status: SUCCESS (with warnings)

========================================
Batch Migration Results
========================================

Completed: 3/3 projects
Failures: 0
Warnings: 1 (notification-service has TODOs)

Output structure:
  ./                                   (guest project root)
  ├── Cargo.toml                       (workspace root manifest)
  ├── src/
  │   └── lib.rs                       (WASM guest wiring)
  ├── examples/
  │   └── .env.example                 (environment config)
  │
  ├── legacy/                          (cloned repos)
  │   ├── auth-service/
  │   ├── user-service/
  │   └── notification-service/
  │
  ├── temp/                            (scratch -- can be deleted)
  │   ├── auth_service.ir.md
  │   ├── user_service.ir.md
  │   ├── notification_service.ir.md
  │   └── .migration-checkpoint.json
  │
  └── crates/                          (durable output)
      ├── auth_service/
      ├── user_service/
      └── notification_service/

Review warnings:
  - notification-service: 2 TODO markers in generated code
    See: ./crates/notification_service/Migration.md
```

## Result

Three services successfully migrated in batch
