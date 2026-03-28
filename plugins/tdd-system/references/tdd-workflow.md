# 🔄 The TDD Workflow (Red, Green, Refactor)

Test-Driven Development is not just a testing strategy; it is a design philosophy. It forces you to think about the API boundary and user experience *before* you get bogged down in implementation details.

## 1. The Mandatory Loop (强制循环)

You must execute these three steps in strict order. Do not skip to Step 2.

1. **🔴 RED (Write a failing test):** 
   - Define the exact specification in a test block.
   - Execute the test suite. 
   - **Crucial:** You *must* watch it fail. If it passes immediately, your test is broken.
2. **🟢 GREEN (Make it pass - Brute force is okay):**
   - Write the absolute minimum amount of code required to make the test pass.
   - Hardcoding the answer (`return 4;`) is acceptable at this stage if it fulfills the specific test case.
3. **✨ REFACTOR (Make it beautiful):**
   - Now that the test protects your logic, rewrite the code to be elegant, performant, and DRY.
   - The test must remain green the entire time you refactor.

## 2. Bug Fix Protocol (缺陷修复准则)

When a bug is reported in production, junior engineers dive into the source code to fix it. Elite engineers write a test.

1. Do not touch the application code.
2. Write a unit test that perfectly replicates the exact input that triggered the bug in production.
3. Run the test. Confirm it fails (🔴 RED).
4. Now, and only now, fix the application code until the test passes (🟢 GREEN).
5. The bug is now mathematically proven to never return in this codebase again.

## 3. The AAA Pattern (3A模式)

Every unit test must be visually structured into three distinct blocks. Do not tangle them.

```javascript
test('calculates a 10% discount on a $100 cart', () => {
  // 1. ARRANGE (Setup the environment, instantiate classes, define inputs)
  const cart = new Cart();
  cart.addItem({ name: 'Keyboard', price: 100 });
  const discountService = new DiscountService(0.10);

  // 2. ACT (Perform the single action being tested)
  const finalPrice = discountService.apply(cart.getTotal());

  // 3. ASSERT (Verify the results)
  expect(finalPrice).toBe(90);
});
```
