# Example 6: Partial Failure in Batch Migration

## Scenario

One project fails in batch, others continue

## Config File

`batch.toml`:

```toml
project-dir = "."

[[projects]]
repo = "https://github.com/org/service-a"
crate = "service_a"

[[projects]]
repo = "https://github.com/org/service-b-broken"
crate = "service_b"

[[projects]]
repo = "https://github.com/org/service-c"
crate = "service_c"
```

## Execution

```bash
migrate ./batch.toml
```

## Expected Output

```text
Batch Migration: 3 projects

Project 1/3: service-a
  [All steps] ✓
  Status: SUCCESS

Project 2/3: service-b-broken
  [clone] ✓
  [analyze] ✗ FAILED - Repository not found (404)
  Status: FAILED

Project 3/3: service-c
  [All steps] ✓
  Status: SUCCESS

========================================
Batch Results
========================================

Completed: 2/3 projects
Failed: 1/3 projects

Failed projects:
  - service-b-broken: Repository not found
    Check URL: https://github.com/org/service-b-broken

Successful migrations:
  - ./crates/service_a/
  - ./crates/service_c/

Next steps:
  1. Fix service-b-broken repository URL
  2. Re-run migration for failed project only:
     migrate https://github.com/org/service-b-fixed service_b
```

## Result

Batch continues despite individual failures
