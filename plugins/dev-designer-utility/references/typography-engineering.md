# 🔤 Typography Engineering (字体排版工程)

Typography is the invisible architecture of every interface. Poor type choices create cognitive friction measured in milliseconds of delayed comprehension. Expert typography eliminates that friction through mathematical systems.

## 1. Type Scale Construction (字阶构建)

A type scale is a sequence of font sizes derived from a **ratio** applied to a base size. Never invent sizes arbitrarily.

### Mathematical Scales

| Scale Name | Ratio | Progression (base 16px) | Use Case |
|-----------|-------|------------------------|----------|
| Minor Second | 1.067 | 16 → 17 → 18.1 → 19.3 | Dense data UIs, dashboards |
| Major Second | 1.125 | 16 → 18 → 20.3 → 22.8 | Body-heavy content, documentation |
| Minor Third | 1.200 | 16 → 19.2 → 23 → 27.6 | General-purpose web |
| Major Third | 1.250 | 16 → 20 → 25 → 31.3 | Marketing, editorial |
| Perfect Fourth | 1.333 | 16 → 21.3 → 28.4 → 37.9 | High-impact headings |
| Golden Ratio | 1.618 | 16 → 25.9 → 41.9 → 67.8 | Art direction, posters |

**Formula:** `size(n) = base × ratio^n`

### Material Design 3 Type System (MD3 字型系统)

MD3 defines 5 type roles with 3 sizes each:

| Role | Large | Medium | Small | Purpose |
|------|-------|--------|-------|---------|
| Display | 57/64 | 45/52 | 36/44 | Hero headlines |
| Headline | 32/40 | 28/36 | 24/32 | Section headers |
| Title | 22/28 | 16/24 | 14/20 | Card/dialog titles |
| Body | 16/24 | 14/20 | 12/16 | Running text |
| Label | 14/20 | 12/16 | 11/16 | Buttons, captions |

Format: `size/line-height` in pixels.

## 2. Font Selection Strategy (字体选择策略)

### Decision Matrix

| Context | Serif | Sans-Serif | Monospace |
|---------|-------|-----------|-----------|
| Long-form reading | ✅ Georgia, Literata | ✅ Inter, Source Sans | ❌ |
| UI labels/buttons | ❌ | ✅ Inter, SF Pro, Roboto | ❌ |
| Code display | ❌ | ❌ | ✅ JetBrains Mono, Fira Code |
| Data tables | ❌ | ✅ Tabular figures required | ✅ For numeric columns |
| CJK content | ✅ Source Han Serif | ✅ Noto Sans CJK, Source Han Sans | ❌ |

### Font Loading Performance

```
Optimal loading order:
1. system-ui (instant, no download)
2. WOFF2 with font-display: swap (progressive)
3. Variable fonts (single file, multiple weights)

NEVER: Load 6+ separate font files for weight variants.
Use variable fonts or limit to 2 weights (Regular + Bold).
```

## 3. Line Height & Spacing (行高与间距)

- **Body text:** `line-height: 1.5` (WCAG minimum for readability)
- **Headings:** `line-height: 1.2 – 1.3` (tighter for visual impact)
- **Paragraph spacing:** Equal to `line-height × 0.75` of the body text
- **Letter spacing for ALL-CAPS:** `+0.05em` to `+0.1em` (compensate for reduced word-shape recognition)

## 4. Anti-Patterns (反模式)

```
❌ More than 3 font families on a single page
❌ Font sizes below 12px for body text (accessibility violation)
❌ Using px for font sizes in responsive layouts (use rem)
❌ Decorative fonts for body text (cognitive load)
❌ Mixing serif and sans-serif without intentional contrast hierarchy
❌ Generic AI aesthetics: Inter + purple gradients on white backgrounds
❌ Default browser fonts without explicit font-family declaration
```
