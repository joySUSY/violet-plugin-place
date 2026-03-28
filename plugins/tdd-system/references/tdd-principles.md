# TDD Principles & Patterns

## 1. The Red-Green-Refactor Cycle
- **Red**: Write a failing test for the next bit of functionality you want to add.
- **Green**: Write the minimum amount of code required to make the test pass.
- **Refactor**: Clean up the code, adhering to standards while ensuring the tests stay green.

## 2. AAA Pattern (Arrange, Act, Assert)
- **Arrange**: Set up the necessary prerequisites for the test.
- **Act**: Execute the unit of code under test.
- **Assert**: Verify that the outcome matches the expected result.

## 3. Mocking, Stubbing, and Spying
- **Stub**: Provides canned answers to calls made during the test.
- **Mock**: Objects pre-programmed with expectations which form a specification of the calls they are expected to receive.
- **Spy**: Wraps a real object and records metadata about how it was called.

## 4. First Class Citizen
Tests should be treated with the same level of care as production code:
- Meaningful names.
- Minimal logic in tests.
- High readability.
