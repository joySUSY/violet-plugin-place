# 🔎 Code Search & Analysis

Refactoring begins with mapping the territory. If you do not know where a function is called, you cannot safely change its signature.

## 1. Structural Search (Regex vs AST)

Text-based search (`Ctrl+F` or basic `grep`) is prone to false positives (e.g., finding the word "user" in a comment when you are looking for the variable `user`).

**Advanced Regex Patterns for Code:**
- **Find all async functions:** `async function \w+\(`
- **Find hardcoded HTTP calls (Node.js):** `axios\.(get|post|put)\(['"][^'"]+['"]\)`
- **Find empty catch blocks (The Silent Killer):** `catch\s*\([^)]*\)\s*\{\s*\}`

**AST (Abstract Syntax Tree) Parsing:**
If standard regex fails, use structural search tools like `Comby` or AST parsing libraries to find code that matches a structural pattern regardless of whitespace or variable naming. This is how elite refactoring bots (like Dependabot) apply automatic fixes.

## 2. The Dead Code Hunt

Every line of code is a liability. Dead code bloats bundle sizes, slows down compilers, and confuses new hires.

**How to safely identify and kill dead code:**
1. **The Static Analysis Pass:** Use tools like `knip` (TypeScript) or `cargo udeps` (Rust) to find unused exports and dependencies. Delete them immediately.
2. **The "Feature Flag" execution:** If you suspect a giant legacy module is dead but the static analyzer cannot prove it, wrap the entry point in a logging statement: `logger.warn('LEGACY_MODULE_HIT')`. Deploy to prod. Wait 30 days. If the log never fires, delete the code.
3. **The `grep` Verification:** Before pressing delete on a specific exported function `calculateTaxV1`, run a full-codebase regex search: `grep -rnw 'src/' -e "calculateTaxV1"`. If it only shows up in the definition and one outdated unit test, delete both.

## 3. Visualizing Dependency Cycles

If `Module A` imports `Module B`, and `Module B` imports `Module A`, you have a circular dependency. This will crash bundlers (Webpack/Vite) and cause memory leaks.

- **The Fix:** Extract the shared logic that both modules need into a new `Module C`. Then point both `A` and `B` to `C`.
- **The Map:** Use dependency visualization tools (`madge` or similar) to map out your architecture. A healthy graph should look like a tree (dependencies flow downward). An unhealthy graph looks like a circular web.
