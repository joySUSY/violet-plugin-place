# 🖼️ Visual Artifacts & Generative Art (视觉产物与生成艺术)

Visual artifacts are the tangible output of design systems — charts, posters, slides, SVGs, and algorithmic compositions. Each artifact type has a deterministic production pipeline.

## 1. Chart Selection Heuristics (图表选择启发法)

| Data Relationship | Chart Type | When | Never |
|------------------|-----------|------|-------|
| Part-to-whole | Donut / Treemap | ≤7 categories | Pie charts with >5 slices |
| Change over time | Line / Area | Continuous time axis | Bar charts for time series |
| Comparison | Grouped bar / Dot plot | Discrete categories | 3D bar charts (distortion) |
| Distribution | Histogram / Box plot | Continuous variable | Bar charts for distributions |
| Correlation | Scatter / Bubble | Two+ numeric variables | Tables for correlation data |
| Geographic | Choropleth / Dot map | Location-based data | Unrelated map backgrounds |
| Flow/Process | Sankey / Alluvial | Movement between states | Pie charts for flow data |
| Hierarchy | Treemap / Sunburst | Nested categories | Flat lists for hierarchies |

### Visualization Anti-Patterns

```
❌ Dual Y-axes (misleading scale correlation)
❌ Truncated Y-axis starting above zero (exaggerates differences)
❌ 3D effects on any chart type (occlusion, distortion)
❌ Rainbow color scales (not perceptually uniform)
❌ Chart junk: unnecessary gridlines, borders, drop shadows
```

## 2. SVG Generation Patterns (SVG生成模式)

### Optimized SVG Architecture

```xml
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
     aria-label="descriptive label">
  <!-- Use currentColor for themeable icons -->
  <path d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Rules:**
- Always use `viewBox`, never fixed `width`/`height`
- Use `currentColor` for icons that adapt to theme context
- Remove metadata, comments, editor artifacts (Illustrator bloat)
- Inline small icons (< 1KB); sprite sheet for icon sets > 20 icons
- Add `aria-label` for accessibility

## 3. Canvas & Generative Art Patterns (Canvas与生成艺术)

### p5.js Creative Coding Framework

```javascript
// Noise-driven particle field
function setup() {
  createCanvas(800, 600);
  noiseDetail(4, 0.5);
}

function draw() {
  background(0, 10);  // Fade trail
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      const angle = noise(x * 0.005, y * 0.005, frameCount * 0.01) * TWO_PI * 2;
      const len = noise(x * 0.01, y * 0.01) * 15;
      stroke(255, 80);
      line(x, y, x + cos(angle) * len, y + sin(angle) * len);
    }
  }
}
```

### Generative Art Algorithms

| Algorithm | Visual Output | Complexity |
|-----------|--------------|-----------|
| Perlin/Simplex noise | Organic flow fields, terrain | Low |
| L-Systems | Fractal plants, branching structures | Medium |
| Voronoi tessellation | Cell patterns, stained glass | Medium |
| Reaction-diffusion | Turing patterns, coral-like | High |
| Strange attractors | Lorenz/Rössler spirals | High |

## 4. Data Visualization Design Tokens

```css
:root {
  /* Sequential (low → high) */
  --viz-seq-1: oklch(0.95 0.02 250);
  --viz-seq-5: oklch(0.45 0.15 250);

  /* Categorical (distinct hues) */
  --viz-cat-1: oklch(0.65 0.15 30);   /* coral */
  --viz-cat-2: oklch(0.65 0.15 150);  /* teal */
  --viz-cat-3: oklch(0.65 0.15 270);  /* violet */

  /* Diverging (negative ← neutral → positive) */
  --viz-div-neg: oklch(0.55 0.18 25);
  --viz-div-zero: oklch(0.92 0.01 100);
  --viz-div-pos: oklch(0.55 0.18 150);
}
```
