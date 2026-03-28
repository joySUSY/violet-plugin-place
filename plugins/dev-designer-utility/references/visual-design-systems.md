# 🏛️ Visual Design Systems (视觉设计系统)

A design system is not a component library. It is an **API contract** between design intent and code implementation. Components are the runtime; tokens are the specification.

## 1. Design Token Architecture (设计令牌架构)

### Token Hierarchy

```
Global Tokens (primitives)
  ├── --color-blue-500: #3B82F6
  ├── --spacing-4: 16px
  └── --font-size-md: 16px

Alias Tokens (semantic)
  ├── --color-primary: var(--color-blue-500)
  ├── --spacing-component-padding: var(--spacing-4)
  └── --font-body: var(--font-size-md)

Component Tokens (scoped)
  ├── --button-bg: var(--color-primary)
  ├── --button-padding: var(--spacing-component-padding)
  └── --button-font-size: var(--font-body)
```

**Rule:** Never reference global tokens directly in components. Always route through alias tokens. This enables theme switching by remapping aliases.

### Token Naming Convention

```
--{category}-{property}-{variant}-{state}

Examples:
--color-text-primary-hover
--spacing-layout-section-gap
--font-heading-lg-weight
--border-input-default-width
--shadow-card-elevated-rest
```

## 2. Spacing System (间距系统)

### The 8-Point Grid

All spacing values must be multiples of 8px (or 4px for fine adjustments):

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-1` | 4px | Icon padding, fine adjustments |
| `--space-2` | 8px | Inline element gaps |
| `--space-3` | 12px | Compact component padding |
| `--space-4` | 16px | Standard component padding |
| `--space-6` | 24px | Card padding, section margins |
| `--space-8` | 32px | Section spacing |
| `--space-12` | 48px | Layout section gaps |
| `--space-16` | 64px | Page section dividers |

**Never** use arbitrary values (13px, 17px, 22px). Every pixel must map to the grid.

## 3. Component Anatomy (组件解剖学)

Every UI component consists of 5 structural layers:

```
┌─ Container ─────────────────────┐
│  ┌─ Decoration (border/shadow) ─┐│
│  │  ┌─ Padding ───────────────┐ ││
│  │  │  ┌─ Content ──────────┐ │ ││
│  │  │  │  Icon + Label + ... │ │ ││
│  │  │  └────────────────────┘ │ ││
│  │  └─────────────────────────┘ ││
│  └──────────────────────────────┘│
└──────────────────────────────────┘
```

### State Matrix

| State | Visual Change | Token Suffix |
|-------|--------------|-------------|
| Rest | Default appearance | `-rest` |
| Hover | Lightness shift +/- 8% | `-hover` |
| Active/Pressed | Lightness shift +/- 12% | `-active` |
| Focus | 2px ring in `--color-focus` | `-focus` |
| Disabled | 38% opacity | `-disabled` |

## 4. Apple HIG / Cupertino Pragmatism (Apple设计指南)

Key Cupertino design principles translated to actionable rules:

| Principle | Implementation |
|-----------|---------------|
| Clarity | Use SF Pro for system text; >= 11pt minimum |
| Deference | Content-first; chrome is translucent |
| Depth | Vibrancy layers with material backgrounds |
| Direct Manipulation | Drag/swipe over button-press |
| Feedback | Haptic-equivalent visual spring animations |

### Vibrancy Layers

```
Background (base surface)
  ↓ blur + saturation
Secondary Background (grouped content)
  ↓ blur + tint
Tertiary Background (nested groups)
  ↓ blur + elevation
```

## 5. Anti-Patterns (反模式)

```
❌ Inline styles instead of design tokens
❌ "Magic number" spacing (padding: 13px 7px 19px 11px)
❌ Components that directly reference hex colors
❌ Designing without a constraint system (token-less CSS)
❌ Mixing design system tokens from different systems (Bootstrap + Material)
❌ Skip states: components without hover, focus, disabled variants
❌ Design-code drift: Figma tokens ≠ CSS tokens
```
