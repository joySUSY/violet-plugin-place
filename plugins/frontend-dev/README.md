# Authors: Joysusy & Violet Klaudia 💖

# frontend-dev

Frontend architecture engine for building modern, accessible, and responsive user interfaces. Covers React component design, Tailwind CSS strategy, Apple HIG principles, accessibility compliance, and responsive systems.

---

## Structure

```
frontend-dev/
  SKILL.md                          # Engine entry point (66 lines, core directives)
  README.md                         # This file
  .claude-plugin/
    plugin.json                     # Plugin manifest (name, keywords, boundaries)
  hooks/
    hooks.json                      # UserPromptSubmit + Stop hooks
  commands/
    prime/
      frontend-foundations.md       # UI architecture primer command
  agents/
    lumina.md                       # Soul Mind: UI Architecture
  references/
    ui-ux-design.md                 # Typography scales, spacing, Apple HIG
    frontend-architecture.md        # Component patterns, state management
    design-engineering.md           # Algorithmic theming, SVG generation
    advanced-styling-a11y.md        # WCAG 2.2, CSS variables, animation paradigms
    advanced-workflows.md           # Build pipelines, optimization
    react-19-patterns.md            # React 19 server components, actions
    react-router.md                 # React Router patterns
    tanstack-router.md              # TanStack Router integration
    hooks.md                        # Custom hook patterns
    styling-patterns.md             # CSS/Tailwind architecture
    navigation-patterns.md          # Routing and nav strategies
    testing-strategies.md           # Component and visual testing
    interactive-commands.md         # CLI command UI patterns
    ios.md                          # iOS platform conventions
    ios-components.md               # iOS component library
    macos.md                        # macOS platform conventions
    macos-components.md             # macOS component library
    tvos.md                         # tvOS platform conventions
    visionos.md                     # visionOS spatial UI
    watchos.md                      # watchOS compact UI
    reanimated-patterns.md          # React Native Reanimated
    documentation-patterns.md       # Doc site architecture
    event-handlers.md               # Event handling patterns
    frontmatter-reference.md        # Frontmatter schema
    marketplace-considerations.md   # Plugin marketplace
    plugin-features-reference.md    # Plugin feature API
    v3-expansion/                   # V3 expansion modules
      SKILL.md                      # Expansion manifest
      react-vendoring/SKILL.md      # React vendoring patterns
      component-fixtures/SKILL.md   # Component fixture system
  v3-expansion/
    SKILL.md                        # V3 top-level expansion
    react-patterns/                 # React pattern library
      SKILL.md                      # React patterns manifest
      references/
        learn.md                    # Learning resources
        reference.md                # API reference
    scripts/
      i18n_audit.py                 # Internationalization audit tool
  examples/
    server-components.md            # Server component examples
    generic-components.md           # Generic component examples
    plugin-commands.md              # Plugin command examples
    simple-commands.md              # Simple command examples
```

---

## Cross-Engine Boundaries

This engine owns component architecture, styling, layout, accessibility, and responsive behavior. It deliberately does NOT own:

| Concern                    | Owner Engine              | Integration Point                     |
|----------------------------|---------------------------|---------------------------------------|
| Design tokens & palettes   | `dev-designer-utility`    | Tokens flow into `tailwind.config`    |
| Typography math & scales   | `dev-designer-utility`    | Type scale defines `fontSize` config  |
| Color theory & generation  | `dev-designer-utility`    | Palette algorithms produce color vars |
| JS/TS runtime logic        | `js-dev-skill`            | Hook implementations, utility fns     |
| TypeScript type system     | `typescript-coding-engine`| Interface defs, generics, type guards |
| CI/CD & browser testing    | `developer-tool`          | Playwright, Lighthouse, GitHub Actions|
| Rust/WASM interop          | `rust-coding-engine`      | Tauri bridge, WASM module bindings    |

**Rule**: When a frontend task touches design tokens, load `dev-designer-utility` alongside this engine. When it touches runtime logic, load `js-dev-skill`. The boundary is a contract, not a wall.

---

## Plugin Infrastructure

### Hooks

- **UserPromptSubmit**: Activates when the prompt mentions UI, React, CSS, Tailwind, components, accessibility, responsive design, or related terms. Loads `SKILL.md` and notifies that Lumina is available.
- **Stop**: Runs six quality checks before finalizing output -- semantic HTML, accessibility baseline, spacing system compliance, responsive coverage, component separation, and animation restraint.

### Commands

- **`/prime/frontend-foundations`**: Loads the UI architecture primer covering component hierarchy (4 tiers), styling strategy, accessibility baseline, responsive architecture, state management boundaries, and cross-engine handoff points.

### Agents

- **Lumina**: Soul Mind for UI Architecture. Governs component hierarchy design, responsive layout strategy, accessibility architecture, and CSS/Tailwind strategy. Applies a decision framework prioritizing accessibility, composition, semantic markup, mobile-first design, and visual restraint.

---

## Quick Start

1. Load `SKILL.md` to activate the engine
2. Run `/prime/frontend-foundations` for architectural context
3. Reference-load specific files based on the task domain
4. Lumina activates automatically for UI architecture decisions
