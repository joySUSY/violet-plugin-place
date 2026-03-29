# Example 5: Error Recovery - Step Failure

## Scenario

Migration fails at the `analyze` step, then recovery

## Execution

```bash
migrate https://github.com/org/broken-service broken_service
```

## Error Encountered

```text
[clone] Clone Repository
✓ Complete

[analyze] Analyze Codebase
✗ FAILED

Error at [analyze]: Analysis failed
  TypeScript parsing error in src/handler.ts:42
  Unexpected token '}'

Pipeline halted at [analyze]
Partial outputs preserved:
  ✓ ./legacy/broken-service (cloned)
  ✗ ./temp/broken_service.ir.md (not created)
  ✗ ./crates/broken_service (not created)

To resume after fixing:
  1. Fix TypeScript errors in ./legacy/broken-service
  2. Re-run: migrate https://github.com/org/broken-service broken_service
     ([clone] will detect existing clone and pull updates)
```

## Recovery Steps

1. Navigate to cloned source:

```bash
cd ./legacy/broken-service
```

2. Fix TypeScript error at line 42

3. Verify TypeScript compiles:

```bash
npm run build
```

4. Re-run migration pipeline:

```bash
cd ../..
migrate https://github.com/org/broken-service broken_service
```

## Expected Output

After fix:

```text
[clone] Clone Repository
✓ Repository exists, pulling updates... (no new commits)

[analyze] Analyze Codebase
✓ Complete

[enrich] Enrich IR with Design Documentation
⊘ Skipped (no design-doc provided)

[guest] Generate WASM Guest
✓ Complete (already exists)

[tdd] Test-Driven Generation
✓ Complete (all tests pass after 1 iteration)

[review] Code Review                    ┐
✓ Complete                             │ concurrent
                                        │
[verify] Final Verification             │
✓ Complete                             ┘

Migration successful!
```

## Result

Pipeline recovered after fixing source errors
