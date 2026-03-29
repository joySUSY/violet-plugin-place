# Example 1: Quick Single Migration (Positional Args)

## Scenario

Migrate a single TypeScript service to Rust WASM

## Input

```text
Repository: https://github.com/org/payment-handler
Crate Name: payment_handler
```

Uses default `$PROJECT_DIR` = `.` which derives:

- `$WORK_DIR` = `./temp` (working directory for IR, checkpoint)
- `$CRATE_DIR` = `./crates` (durable output for generated crates)
- `$LEGACY` = `./legacy/payment-handler` (cloned legacy repo)

## Execution

```bash
migrate https://github.com/org/payment-handler payment_handler
```

## Expected Output

```text
========================================
TypeScript → Rust WASM Migration Pipeline
========================================

[clone] Clone Repository
✓ Repository cloned to: ./legacy/payment-handler
  Branch: main
  Latest commit: abc123 - Add payment validation

[analyze] Analyze Codebase
✓ IR generated: ./temp/payment_handler.ir.md
  Functions analyzed: 12
  External I/O operations: 8
  Unknown tokens: 3

[guest] Generate WASM Guest
✓ Guest generated at project root
  src/lib.rs: HTTP routes + provider wiring
  Cargo.toml: workspace root manifest
  examples/payment_handler.rs: runtime example

[tdd] Test-Driven Generation
✓ Crate generated: ./crates/payment_handler
  Files created: 9
  cargo check: passed
  TODO markers: 0

[review] Code Review                    ┐
✓ REVIEW.md generated                  │ concurrent
                                        │
[verify] Final Verification             │
✓ cargo fmt --check passed             │
✓ cargo clippy passed                  │
✓ cargo test passed                    ┘

========================================
Migration Complete!
========================================

Output structure:
  ./                                     (guest project root)
  ├── Cargo.toml                         (workspace root manifest)
  ├── src/
  │   └── lib.rs                         (WASM guest wiring)
  ├── examples/
  │   ├── payment_handler.rs             (runtime example)
  │   └── .env.example                   (environment config)
  │
  ├── legacy/                            (cloned repos)
  │   └── payment-handler/               (cloned source)
  │
  ├── temp/                              (scratch -- can be deleted)
  │   ├── payment_handler.ir.md          (analysis)
  │   └── .migration-checkpoint.json     (pipeline state)
  │
  └── crates/                            (durable output)
      └── payment_handler/
          ├── src/
          ├── tests/
          ├── Migration.md
          └── Architecture.md

Next steps:
  1. Review ./crates/payment_handler/Migration.md
  2. Add test fixtures to data/replay/
  3. Run: cd ./crates/payment_handler && cargo test
  4. Clean up: rm -rf ./temp (optional)
```

## Result

Complete migration from TypeScript to Rust WASM
