# Authors: Joysusy & Violet Klaudia 💖
# Command: /prime/design-foundations

---

# Design Foundations Primer

Load this command to establish design system context before any visual or typographic task. It sets the mathematical and perceptual baseline that every token, palette, and type decision must respect.

---

## 1. Typography Strategy

Typography is the backbone of visual hierarchy. Every type decision is mathematical, never arbitrary.

### Type Scale Construction

A type scale is built from a base size and a ratio. The ratio determines the relationship between each step.

| Scale Name      | Ratio  | Character                        | Best For                     |
|-----------------|--------|----------------------------------|------------------------------|
| Minor Second    | 1.067  | Tight, subtle progression        | Dense data UIs, dashboards   |
| Major Second    | 1.125  | Gentle, readable escalation      | Long-form reading, docs      |
| Minor Third     | 1.200  | Balanced, versatile              | General-purpose apps         |
| Major Third     | 1.250  | Clear hierarchy, confident       | Marketing, landing pages     |
| Perfect Fourth  | 1.333  | Strong contrast between levels   | Editorial, presentation      |
| Golden Ratio    | 1.618  | Dramatic, high-impact            | Hero sections, headlines     |

**Base size**: 16px (1rem) for body text. This is a web standard, not a suggestion.

**Scale formula**: `size(n) = base * ratio^n`

Example with Minor Third (1.200), base 16px:
- Step -2: 11.11px (caption)
- Step -1: 13.33px (small)
- Step 0: 16px (body)
- Step 1: 19.2px (h4)
- Step 2: 23.04px (h3)
- Step 3: 27.65px (h2)
- Step 4: 33.18px (h1)
- Step 5: 39.81px (display)

### Line Height Rules

- Body text: 1.5 (24px at 16px base). Non-negotiable for readability.
- Headings: 1.2-1.3. Tighter leading for large text prevents visual float.
- Captions/labels: 1.4. Slightly tighter than body.
- Single-line UI text (buttons, badges): 1.0-1.1. Optical centering.

### Font Selection Framework

| Priority | Criterion                    | Test                                              |
|----------|------------------------------|---------------------------------------------------|
| 1        | Legibility at body size      | Is lowercase 'a' distinguishable from 'o' at 14px? |
| 2        | Weight range                 | Does the family offer at least Regular, Medium, Bold? |
| 3        | Language coverage             | Does it include Latin Extended, Cyrillic, CJK if needed? |
| 4        | Optical sizing               | Does it have opsz axis or separate display/text cuts? |
| 5        | License compatibility        | OFL, commercial, or restricted?                    |
| 6        | Variable font availability   | Single file with weight/width axes saves bandwidth |

---

## 2. Color System Architecture

Color is mathematical. A well-built palette is a function, not a collection of hex codes.

### Palette Construction (OKLab Method)

OKLab is the perceptually uniform color space. Use it for all palette generation. HSL is acceptable for quick prototypes but introduces perceptual drift at yellows and blues.

**Palette structure** (10-step scale per hue):

| Step | Lightness (L) | Usage                      |
|------|---------------|----------------------------|
| 50   | 0.97          | Backgrounds, subtle tints  |
| 100  | 0.93          | Hover states, alt rows     |
| 200  | 0.87          | Borders, dividers          |
| 300  | 0.78          | Disabled states            |
| 400  | 0.66          | Placeholder text           |
| 500  | 0.55          | Primary brand actions      |
| 600  | 0.45          | Hover on primary           |
| 700  | 0.35          | Active/pressed states      |
| 800  | 0.25          | Headings on light bg       |
| 900  | 0.15          | Body text on light bg      |
| 950  | 0.08          | High-contrast, near-black  |

**Key principle**: Each step's lightness is evenly distributed in OKLab L channel. This guarantees perceptual uniformity -- the jump from 200 to 300 looks the same as 600 to 700.

### Semantic Color Tokens

Raw palette steps are never used directly in components. Map them to semantic tokens:

| Semantic Token             | Light Mode   | Dark Mode    |
|----------------------------|-------------|-------------|
| `--color-bg-primary`       | white       | gray-950    |
| `--color-bg-secondary`     | gray-50     | gray-900    |
| `--color-text-primary`     | gray-900    | gray-50     |
| `--color-text-secondary`   | gray-600    | gray-400    |
| `--color-border-default`   | gray-200    | gray-800    |
| `--color-accent`           | brand-500   | brand-400   |
| `--color-accent-hover`     | brand-600   | brand-300   |
| `--color-danger`           | red-600     | red-400     |
| `--color-success`          | green-600   | green-400   |
| `--color-warning`          | amber-600   | amber-400   |

### Dark Mode Algorithm

Dark mode is not "invert everything." It follows specific rules:

1. **Background elevation**: Lighter surfaces sit on top of darker ones (opposite of light mode). Use gray-950 as base, gray-900 as card, gray-800 as elevated.
2. **Reduce saturation**: Colors in dark mode drop 10-15% chroma to reduce eye strain.
3. **Shift accent lightness**: Primary accent goes from step-500 (light) to step-400 (dark) for adequate contrast on dark backgrounds.
4. **Preserve semantic meaning**: Danger is still red, success is still green. Only lightness shifts.
5. **Shadows become overlays**: Drop shadows are invisible on dark backgrounds. Replace with subtle border or background elevation.

---

## 3. Spacing System

### The 4pt Base Grid

Every spacing value is a multiple of 4px. This creates consistent rhythm across all UI elements.

**Spacing scale**:

| Token     | Value  | Usage                                     |
|-----------|--------|-------------------------------------------|
| `--sp-1`  | 4px    | Inline icon gap, badge padding            |
| `--sp-2`  | 8px    | Tight element spacing, input padding      |
| `--sp-3`  | 12px   | Compact card padding, list item gap       |
| `--sp-4`  | 16px   | Standard component padding                |
| `--sp-5`  | 20px   | Card padding, form field gap              |
| `--sp-6`  | 24px   | Section header spacing                    |
| `--sp-8`  | 32px   | Section separation                        |
| `--sp-10` | 40px   | Major section gap                         |
| `--sp-12` | 48px   | Page section padding                      |
| `--sp-16` | 64px   | Hero section padding                      |
| `--sp-20` | 80px   | Full-bleed section vertical padding       |
| `--sp-24` | 96px   | Landing page section spacing              |
| `--sp-32` | 128px  | Maximum section separation                |

**Rule**: If a value does not appear in this table, it does not belong in the design. The only exception is optical adjustments on text elements (1-2px nudges to achieve visual centering).

### Component Anatomy

Every component follows a consistent spacing pattern:

```
[outer margin] > [border] > [padding] > [content]
                                          |
                                          +-- [icon gap] [text] [action gap]
```

- Outer margin is the component's responsibility to its siblings (via `gap` on the parent, not margin on the child)
- Padding is internal and scales with component size (sm: sp-2, md: sp-3, lg: sp-4)
- Content gaps are consistent within a size tier

---

## 4. Design Token Architecture

Tokens are organized in three layers. Each layer references only the layer below it, never skipping.

### Layer 1: Primitive Tokens (raw values)

```
--gray-50: oklch(0.97 0.001 260)
--gray-900: oklch(0.15 0.005 260)
--blue-500: oklch(0.55 0.15 250)
--radius-sm: 4px
--radius-md: 8px
--font-size-base: 1rem
```

### Layer 2: Semantic Tokens (meaning)

```
--color-bg-primary: var(--gray-50)           /* light mode */
--color-text-primary: var(--gray-900)
--color-accent: var(--blue-500)
--radius-button: var(--radius-md)
--font-body: var(--font-size-base)
```

### Layer 3: Component Tokens (specific)

```
--button-bg: var(--color-accent)
--button-radius: var(--radius-button)
--button-font: var(--font-body)
--card-bg: var(--color-bg-primary)
--card-radius: var(--radius-md)
```

**Why three layers**: Changing a primitive token (e.g., the brand blue) cascades through semantic tokens into every component. Changing a semantic token (e.g., "accent" now means green) affects all accent-using components without touching primitives. Changing a component token affects only that component.

---

## 5. Cross-Engine Boundaries

This engine owns the **mathematical and perceptual foundation** of all design decisions: tokens, scales, palettes, type systems, font engineering, UX heuristics, and visual artifacts.

It does NOT own:

| Concern                    | Owner Engine          | Handoff Point                          |
|----------------------------|-----------------------|----------------------------------------|
| React/Vue component code   | `frontend-dev`        | Tokens consumed via Tailwind config    |
| Tailwind class application | `frontend-dev`        | Token values mapped to config keys     |
| CSS layout and responsive  | `frontend-dev`        | Spacing tokens used in responsive grid |
| Rust font parsing code     | `rust-coding-engine`  | Fontations API, glyph manipulation     |
| Image optimization CI      | `developer-tool`      | Asset pipeline automation              |
| Brand naming strategies    | `modules/`            | Internal module system                 |
| Brand values frameworks    | `modules/`            | Internal module system                 |

**Rule**: This engine produces the specification. `frontend-dev` produces the implementation. The design token file is the contract between them.
