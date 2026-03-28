# 🏗️ Safe Refactoring Patterns

Refactoring without tests is just changing things and hoping they work. Safe refactoring requires a structural methodology.

## 1. The Strangler Fig Pattern

When rewriting a massive, unmaintainable legacy monolith, you cannot pause the business for 6 months to do a "Big Bang Rewrite." You must strangle it slowly.

1. **Proxy the Edge:** Put an API Gateway (like Nginx) in front of the legacy app.
2. **Build the New:** Build *one* small feature (e.g., Billing) in the new, modern architecture.
3. **Route Traffic:** Update the API Gateway to route `/api/billing` to the New App, while all other routes still go to the Legacy App.
4. **Repeat:** Slowly migrate routes one by one. The legacy app shrinks until it dies.

## 2. Extracting Pure Business Logic

Legacy code is hard to test because "Business Rules", "Database Queries", and "HTTP Parsing" are all tangled in one 500-line function.

**The Refactoring Flow:**
1. Identify the core mathematical or logical rule (e.g., calculating a discount).
2. Extract it into a function that takes primitives (`amount: number`, `tier: string`) and returns primitives `(discount: number)`. 
3. This function should not know what `req.body` or `prisma` is.
4. Write 10 unit tests for this pure function. It is now bulletproof.

## 3. Branch by Abstraction

If you need to replace `Stripe` with `PayPal` across the codebase, do not just `Ctrl+F` and replace.

1. **Create the Interface:** Define a `PaymentGateway` interface (`charge()`, `refund()`).
2. **Wrap the Legacy:** Make the current `Stripe` code implement `PaymentGateway`.
3. **Update Callers:** Change the codebase to call `PaymentGateway` instead of `Stripe` directly.
4. **Build the New:** Write a `PayPal` implementation of the `PaymentGateway`.
5. **Flip the Switch:** Change the dependency injection to use the `PayPal` class. The codebase doesn't even notice the change.
