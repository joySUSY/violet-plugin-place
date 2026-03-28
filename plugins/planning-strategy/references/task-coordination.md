# 🚀 Task Coordination & Execution

Once the Architecture and PRD are approved, the final step before implementation is converting the abstract specs into highly deterministic, parallelizable tasks.

## 1. The Mastery of `task.md`

Every feature epic should be driven by a structured checklist file (`task.md`). This guarantees that work can be picked up, paused, and handed off without losing context.

**The Structure of a `task.md`:**
1. **Goal:** A concise definition of "Done". 
2. **Setup:** Any required environments, env vars, or external dependencies.
3. **Task Checklist:** A tree-structured set of checkboxes representing the chronological path to completion.

*Example:*
```markdown
# Epic: Implement User Authentication

## Prerequisites
- [x] Provision Postgres staging DB.
- [ ] Receive UI mockups from design.

## Tasks
- [ ] 1. Define Prisma database schemas for `User` and `Session`.
- [ ] 2. Create foundational CRUD endpoints in backend router.
- [ ] 3. Write unit tests for password hashing utility.
- [ ] 4. Scaffold the raw React components for the Login Page.
- [ ] 5. Wire the Frontend `onSubmit` to the Backend auth API.

## Verification
- [ ] Verify JWT tokens are correctly rotating on expiration.
- [ ] Confirm no plaintext passwords exist in dev/prod logs.
```

## 2. Unblocking Parallel Teams

A senior architect structures work so that the Frontend (FE) and Backend (BE) teams do not block each other.

To achieve continuous parallel motion:
1. **Define the Interface First:** During the Tech Spec phase, define the exact JSON shapes and API endpoints.
2. **Generate the Mocks:** The BE team immediately builds a "mock" or "dummy" response endpoint that returns static JSON.
3. **Parallel Execution:** The FE team builds the complex UI against the static mock. The BE team builds the complex database logic behind the scenes.
4. **The Swap:** When the BE logic is finished, they simply swap the static mock out for the live data resolver. The FE experiences zero downtime or blocking.

## 3. The "Scout Rule" of Refactoring

When breaking down tasks for a new feature, explicitly define the boundaries of what is being touched. 
- *The Scout Rule:* "Always leave the campground cleaner than you found it." 
- If you touch a file to add a feature, fix the linting errors or extract a messy helper function in that *specific* file.
- **BUT**, do not allow the task breakdown to spiral into a massive cross-codebase refactor unless it is a dedicated tech-debt epic. Keep the task checklist focused.
