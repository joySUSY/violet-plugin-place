# Authors: Joysusy & Violet Klaudia 💖

# dev-designer-utility

Design systems engine for typography engineering, color theory, theme generation, UX strategy, font engineering, visual artifact production, and design-to-code pipelines. The mathematical source of truth for every visual decision.

---

## Structure

```
dev-designer-utility/
  SKILL.md                            # Engine entry point (96 lines, core directives)
  README.md                           # This file
  .claude-plugin/
    plugin.json                       # Plugin manifest (name, keywords, boundaries)
  hooks/
    hooks.json                        # UserPromptSubmit + Stop hooks
  commands/
    prime/
      design-foundations.md           # Design system primer command
  agents/
    aria.md                           # Soul Mind: Design Systems
  references/
    typography-engineering.md         # Type scales, font selection, readability
    color-theme-engine.md             # HSL/OKLab palettes, dark mode, themes
    visual-design-systems.md          # Design tokens, spacing, component anatomy
    ux-strategy.md                    # Heuristic evaluation, research methods
    visual-artifacts.md               # SVG/Canvas, data viz, generative art
    asset-management.md               # Asset pipelines, optimization, icon systems
    brand-psychology.md               # Visual identity, value-based design
    naming-heuristics.md              # Naming patterns, cultural safety
    font-related-spec/
      font-engineering.md             # OpenType/TrueType fundamentals
      fontations-rust.md              # Google Fontations Rust crate ecosystem
      font-modification-pipeline.md   # Glyph deformation, CJK assembly
  modules/
    brand-naming-strategies/
      SKILL.md                        # Phonetic and strategic naming tools
      reference/
        templates.md                  # Naming templates
    brand-values-development/
      SKILL.md                        # Core identity and value alignment
      reference/
        templates.md                  # Brand values templates
```

---

## Cross-Engine Boundaries

This engine owns the mathematical and perceptual foundation of design: tokens, scales, palettes, type systems, font engineering, UX heuristics, and visual artifacts. It deliberately does NOT own:

| Concern                     | Owner Engine            | Integration Point                      |
|-----------------------------|-------------------------|----------------------------------------|
| React/Vue component code    | `frontend-dev`          | Tokens consumed via Tailwind config    |
| Tailwind class application  | `frontend-dev`          | Token values mapped to config keys     |
| CSS layout and responsive   | `frontend-dev`          | Spacing tokens used in layout grid     |
| Rust font parsing code      | `rust-coding-engine`    | Fontations API, glyph manipulation     |
| Image optimization CI       | `developer-tool`        | Asset pipeline automation              |
| JS/TS runtime utilities     | `js-dev-skill`          | Color conversion functions, etc.       |

**Rule**: This engine produces the specification. `frontend-dev` produces the implementation. The design token file is the contract between them.

---

## Plugin Infrastructure

### Hooks

- **UserPromptSubmit**: Activates when the prompt mentions design tokens, colors, fonts, typography, UX, palettes, themes, brand identity, font engineering, or related terms. Loads `SKILL.md` and notifies that Aria is available.
- **Stop**: Runs six quality checks before finalizing output -- token grounding (no raw hex), contrast compliance (WCAG 2.2 AA), type scale integrity, spacing consistency (4pt grid), palette harmony (OKLab uniformity), and font validation.

### Commands

- **`/prime/design-foundations`**: Loads the design system primer covering typography strategy (scales, line height, font selection), color system architecture (OKLab palettes, semantic tokens, dark mode), spacing system (4pt grid, component anatomy), design token architecture (three-layer system), and cross-engine boundaries.

### Agents

- **Aria**: Soul Mind for Design Systems. Governs design token architecture, typography engineering, color palette generation, spacing grids, UX evaluation, and font engineering. Applies a decision framework prioritizing mathematical grounding, perceptual uniformity, token-first design, accessibility as floor, and constraint-driven creativity.

---

## Quick Start

1. Load `SKILL.md` to activate the engine
2. Run `/prime/design-foundations` for mathematical design context
3. Reference-load specific files based on the task domain
4. Aria activates automatically for design system decisions
5. For brand strategy, consult `modules/brand-naming-strategies/` and `modules/brand-values-development/`
