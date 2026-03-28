# 🏗️ Frontend Architecture (前端架构)

A frontend application is a distributed system that runs on hostile, untrusted hardware (the user's browser).

## 1. Container vs. Presentational Components (UI与逻辑分离)

If a component spans more than 200 lines, it is likely mixing UI rendering with business logic.
> *如果一个组件超过200行，它很可能错误地混合了渲染层与业务逻辑。*

- **Container (Smart):** Fetches data, mutates state, handles side-effects. Passes pure data down. 
  - *Example:* `UserProfileContainer` (Uses SWR/Apollo to fetch user).
- **Presenter (Dumb):** Takes props, renders UI, emits events up. Contains zero data-fetching.
  - *Example:* `UserProfileCard` (Takes `user={data}`, renders pure HTML/CSS).

## 2. State Management Hierarchy (状态管理层级)

Do not put everything in Redux/Zustand. Store state as close to the target as possible.
> *按作用域控制状态，尽量降级。不要把所有东西塞进全局状态库。*

1. **URL State:** `?tab=billing&page=2`. (Sharable, survives refresh. The elite choice).
2. **Server State:** Asynchronous data from APIs. Use `React Query` or `SWR`. (Handles caching, deduping, revalidation).
3. **Local UI State:** `useState`. (Is this dropdown open?).
4. **Global Client State:** Context/Zustand. (Current user theme, auth token). *Minimize this.*

## 3. Component API Design (组件API契约)

Treat your UI components as public APIs for your teammates.
- **Prefer Composition over Configuration:**
  - *Bad (Monolithic API):* `<Button color="blue" icon="arrow" tooltip="Go" loading={false} />`
  - *Good (Composition):* `<Tooltip content="Go"><Button variant="primary"><IconArrow /></Button></Tooltip>`

## 4. CSS Strategy (样式架构)

Whether using Vanilla CSS Modules or Tailwind, enforce structural rigor.
- **Utility-First (Tailwind):** Keep DOM trees flat. Extract utility bursts to components only when repeating >3 times (Rule of Three).
- **Avoid Magic Values:** Never use `w-[31px]`. Stick to the design tokens: `w-8`.
- **CSS Variables for Theming:** Use root variables (`--color-primary`) so themes can swap instantly without recompiling CSS classes.
