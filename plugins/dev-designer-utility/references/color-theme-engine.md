# 🌈 Color Theory & Theme Generation Engine (色彩理论与主题生成)

Color is the fastest visual signal processed by the human brain — 60,000× faster than text. Expert color systems produce palettes algorithmically, not by eyeballing hex codes.

## 1. Color Space Selection (色彩空间选择)

| Space | When to Use | Why |
|-------|------------|-----|
| **HSL** | Quick prototyping, CSS custom properties | Intuitive hue rotation, simple lightness math |
| **OKLab** | Perceptually uniform gradients, accessibility | Mathematically accurate perceived lightness |
| **OKLCH** | Design tokens, systematic palette generation | Cylindrical OKLab — best for programmatic palettes |
| **sRGB Hex** | Final output, browser rendering | Universal compatibility |

**Rule:** Design in OKLCH, export to sRGB Hex.

## 2. Palette Generation Algorithms (调色板生成算法)

### Harmonic Relationships

| Harmony | Hue Formula | Visual Effect | Use Case |
|---------|------------|---------------|----------|
| Complementary | H, H+180° | High contrast, energetic | CTAs, alerts |
| Analogous | H-30°, H, H+30° | Cohesive, calm | Content-heavy UIs |
| Triadic | H, H+120°, H+240° | Balanced vibrancy | Dashboards |
| Split-Complementary | H, H+150°, H+210° | Softer contrast | Marketing pages |
| Tetradic | H, H+90°, H+180°, H+270° | Rich, complex palettes | Design systems |

### Systematic Shade Generation

Generate 10-step shade scales (50–950) from a single base color:

```
For base color at step 500:
  step(n) = oklch(
    L: base_L + (5 - n/100) × 0.08,
    C: base_C × (1 - |5 - n/100| × 0.1),
    H: base_H
  )
```

This produces perceptually uniform shade steps where each level looks "one step" apart to human vision.

## 3. Dark Mode Architecture (暗色模式架构)

Dark mode is **not** inverting colors. It is a separate surface/content lightness mapping.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--surface-0` (background) | White `#FFFFFF` | Near-black `#121212` |
| `--surface-1` (card) | Light gray `#F5F5F5` | Dark gray `#1E1E1E` |
| `--surface-2` (elevated) | Medium gray `#EEEEEE` | Medium dark `#2C2C2C` |
| `--text-primary` | Near-black `#1A1A1A` | Off-white `#E0E0E0` |
| `--text-secondary` | Medium gray `#666666` | Light gray `#A0A0A0` |

**Critical Rule:** Never use pure white (`#FFFFFF`) text on pure black (`#000000`) backgrounds. The extreme contrast causes eye strain (halation effect). Use `#E0E0E0` on `#121212`.

## 4. Contrast Ratio Validation (对比度验证)

WCAG 2.2 AA minimum thresholds:

| Text Type | Required Ratio | Formula |
|-----------|---------------|---------|
| Body text (< 18px) | **4.5:1** | `(L1 + 0.05) / (L2 + 0.05)` |
| Large text (≥ 18px bold / ≥ 24px) | **3:1** | Same formula, lower threshold |
| UI components (icons, borders) | **3:1** | Same formula |

## 5. Glassmorphism & Modern Effects (玻璃态与现代效果)

```css
/* Liquid Glass Pattern */
.glass-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Apple Cupertino Depth Effect */
.cupertino-card {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(40px);
  border: 0.5px solid rgba(255, 255, 255, 0.18);
}
```

## 6. Anti-Patterns (反模式)

```
❌ Using named CSS colors (red, blue, green) in production
❌ Hard-coding hex values instead of design tokens
❌ Pure black (#000000) as a background color
❌ Saturated background colors behind text
❌ More than 5 distinct hues in a palette without systematic generation
❌ Generic AI gradient: purple-to-blue on white (#7C3AED → #2563EB)
❌ Checking contrast ratios manually instead of programmatically
```
