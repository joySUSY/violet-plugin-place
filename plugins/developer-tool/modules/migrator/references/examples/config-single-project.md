# Example 2: Using Config File for Single Project

## Scenario

Use config file for reproducible single migration

## Config File

`migrate.toml`:

```toml
repo = "https://github.com/org/event-processor"
crate = "event_processor"

# Optional -- using defaults
# project-dir = "."
```

## Execution

```bash
migrate ./migrate.toml
```

## Expected Output

```text
Reading configuration from: ./migrate.toml

Project: event-processor
  Repository: https://github.com/org/event-processor
  Crate name: event_processor
  Scratch: ./temp
  Crates: ./crates

[clone] Clone Repository...
✓ Complete

[analyze] Analyze Codebase...
✓ Complete (143 lines of IR generated)

[enrich] Enrich IR with Design Documentation...
⊘ Skipped (no design-doc in config)

[guest] Generate WASM Guest...
✓ Complete (guest project created)

[tdd] Test-Driven Generation...
✓ Complete (all tests pass after 2 iterations)

[review] Code Review...                ┐
✓ Complete                             │ concurrent
                                        │
[verify] Final Verification...          │
✓ Complete (cargo fmt, clippy, test)   ┘

Migration successful!
Output: ./crates/event_processor
```

## Result

Reproducible migration using configuration file
