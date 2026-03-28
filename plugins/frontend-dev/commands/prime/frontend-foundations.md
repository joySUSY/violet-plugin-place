# Authors: Joysusy & Violet Klaudia 💖
# Command: /prime/frontend-foundations

---

# Frontend Foundations Primer

Load this command to establish UI architecture context before any frontend task. It sets the structural baseline that every component, page, and layout must respect.

---

## 1. Component Hierarchy

Frontend architecture follows a strict four-tier model. Every component belongs to exactly one tier.

### Tier 1: Primitives (atoms)

The smallest visual units. They accept props, render markup, and own zero state.

- `Button`, `Input`, `Badge`, `Avatar`, `Icon`, `Tooltip`
- Built on Radix UI or headless primitives, styled with Tailwind
- Each primitive exposes a `className` prop for composition (never `style`)
- All primitives satisfy WCAG 2.2 AA without additional wrappers

### Tier 2: Composites (molecules)

Combine 2-5 primitives into a reusable pattern. May own ephemeral local state (open/closed, hover, focus).

- `SearchBar` (Input + Button + Icon), `Card` (heading + body + footer zones), `FormField` (Label + Input + ErrorMessage)
- State scope: `useState` or `useReducer` only. Never global store access.
- Composites never fetch data. They receive everything through props.

### Tier 3: Features (organisms)

Domain-aware sections that combine composites with data-fetching logic. This is where hooks like `useQuery`, `useSWR`, or server actions connect.

- `UserProfileCard`, `ProjectSidebar`, `CommentThread`, `NotificationPanel`
- Feature components own a single data concern. One query, one mutation surface.
- Feature components are the boundary where loading/error/empty states are handled.

### Tier 4: Layouts (templates/pages)

Structural shells that arrange features within a viewport. They own routing context and responsive scaffolding.

- `DashboardLayout`, `AuthLayout`, `SettingsPage`
- Layouts use CSS Grid or Flexbox at the top level. Never nest layouts.
- Slot pattern preferred: `children`, `sidebar`, `header` props rather than hardcoded content.

---

## 2. Styling Strategy

### Tailwind-First, Escape-Hatch Ready

Tailwind CSS is the default styling layer. Custom CSS is permitted only when Tailwind cannot express the requirement (complex animations, `@container` queries with logic, SVG path styling).

**Class ordering convention:**
```
layout → spacing → sizing → typography → colors → borders → effects → states → responsive
```

Example: `flex gap-4 p-6 w-full text-sm text-gray-900 border rounded-lg shadow-sm hover:shadow-md md:w-1/2`

### Design Token Mapping

Tailwind config maps directly to design tokens from `dev-designer-utility`:

| Token Layer       | Tailwind Config Key   | Source                          |
|-------------------|-----------------------|---------------------------------|
| Color palette     | `theme.colors`        | `color-theme-engine.md`         |
| Type scale        | `theme.fontSize`      | `typography-engineering.md`     |
| Spacing grid      | `theme.spacing`       | `visual-design-systems.md`     |
| Border radius     | `theme.borderRadius`  | `visual-design-systems.md`     |
| Shadows           | `theme.boxShadow`     | `visual-design-systems.md`     |
| Breakpoints       | `theme.screens`       | Engine default (sm/md/lg/xl/2xl) |

### Dark Mode

- Use `class` strategy (not `media`) for user-controlled theme switching
- Every color token has a light and dark variant
- Test both themes at every breakpoint before shipping

---

## 3. Accessibility Baseline

Accessibility is structural, not cosmetic. It is built into the component hierarchy, not bolted on after.

### Non-Negotiable Rules

1. **Keyboard navigation**: Every interactive element is reachable via Tab. Custom widgets implement WAI-ARIA patterns (combobox, dialog, menu, tabs, tree).
2. **Focus management**: Opening a modal traps focus. Closing it restores focus to the trigger. Route changes announce the new page title.
3. **Color contrast**: 4.5:1 for body text, 3:1 for large text and UI components. Verified with OKLab perceptual contrast, not just WCAG formula.
4. **Motion**: All animations respect `prefers-reduced-motion`. Provide a static fallback. Never auto-play video or infinite loops.
5. **Semantic structure**: One `<main>` per page. Headings follow a logical h1-h6 hierarchy (never skip levels). Lists use `<ul>`/`<ol>`, not styled divs.
6. **Form integrity**: Every input has a visible `<label>`. Error messages are associated via `aria-describedby`. Required fields use `aria-required`.

### Testing Protocol

| Tool             | Purpose                              | When          |
|------------------|--------------------------------------|---------------|
| axe-core         | Automated a11y rule violations       | Every PR      |
| Lighthouse       | Accessibility score (target: 100)    | Weekly        |
| VoiceOver/NVDA   | Screen reader manual walkthrough     | Per feature   |
| Keyboard-only    | Tab order and focus trap validation  | Per component |

---

## 4. Responsive Architecture

### Breakpoint System

| Name  | Min Width | Target Devices            |
|-------|-----------|---------------------------|
| `sm`  | 640px     | Large phones (landscape)  |
| `md`  | 768px     | Tablets (portrait)        |
| `lg`  | 1024px    | Tablets (landscape), laptops |
| `xl`  | 1280px    | Desktops                  |
| `2xl` | 1536px    | Large monitors            |

### Principles

- **Mobile-first**: Base styles target 320px. Layer upward with `sm:`, `md:`, `lg:` prefixes.
- **Content-driven breakpoints**: If the design breaks at 920px, add a custom breakpoint. Do not force content into predefined tiers.
- **Container queries**: Use `@container` for component-level responsiveness when the component's width matters more than the viewport.
- **No horizontal scroll**: At every breakpoint, content must fit within the viewport. Test at 320px width minimum.
- **Touch targets**: Interactive elements are at least 44x44px on touch devices (Apple HIG requirement).

---

## 5. State Management Boundaries

| State Type        | Tool                           | Scope                  |
|-------------------|--------------------------------|------------------------|
| Server state      | TanStack Query / SWR           | Feature components     |
| URL state         | Next.js `searchParams` / router | Layouts, features     |
| Form state        | React Hook Form / Zod          | Form composites        |
| Ephemeral UI      | `useState`                     | Composites, primitives |
| Global app state  | Zustand (last resort)          | Cross-cutting concerns |

**The golden rule**: If state can live in the URL, put it in the URL. If it can live in server cache, use React Query. Only reach for client stores when neither option works.

---

## 6. Cross-Engine Boundaries

This engine owns **component architecture, styling, layout, accessibility, and responsive behavior**.

It does NOT own:

| Concern                  | Owner Engine            | Handoff Point                       |
|--------------------------|-------------------------|-------------------------------------|
| Design tokens & palettes | `dev-designer-utility`  | Tailwind config consumes tokens     |
| Typography math & scales | `dev-designer-utility`  | `fontSize` config from type scale   |
| JS/TS runtime patterns   | `js-dev-skill`          | Hook logic, utility functions       |
| TypeScript strict types  | `typescript-coding-engine` | Interface definitions, generics  |
| CI/CD & browser testing  | `developer-tool`        | Playwright config, GitHub Actions   |
| Rust/WASM interop        | `rust-coding-engine`    | Tauri bridge, WASM module loading   |

When a task crosses boundaries, load the owning engine's SKILL.md alongside this one. The boundary is the contract point; both engines must agree on the interface.
