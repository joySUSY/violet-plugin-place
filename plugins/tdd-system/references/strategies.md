# Testing Strategies & Verification Levels

## 1. The Testing Pyramid
- **Unit Tests (Base)**: Fast, isolated, testing individual components.
- **Integration Tests**: Testing the interaction between multiple components or systems.
- **E2E Tests (Peak)**: Testing the entire application flow from the user's perspective.

## 2. Beyond Functional Testing
- **Property-Based Testing**: Use `proptest` (Rust) or `hypothesis` (Python) to verify invariants across random inputs.
- **Fuzzing**: stress-testing boundaries with malformed or unexpected data.
- **Benchmark Testing**: Monitoring performance regressions.

## 3. Verification Standards
- **Miri (Rust)**: Detect undefined behavior and memory leaks.
- **Snapshot Testing**: Use for UI/Output regression.
- **Contract Testing**: Ensuring API compatibility between services.
