# 📐 Design Engineering & SVGs (设计工程与矢量图形)

A Design Engineer bridges the gap between pure aesthetics and programmatic execution. 
> *设计工程师跨越纯粹美学与程序执行的鸿沟。*

## 1. Algorithmic Theming & Dark Mode (算法化主题与暗黑模式)

Do not hardcode dark mode hex values. Use mathematical color models (HSL or Oklch).
> *不要硬编码暗黑模式颜色。用 HSL 或 Oklch 设置明度阶梯。*

- **The Setup:** Define a single hue constraint and manipulate the lightness (`L` in HSL).
- **Light Theme:** Primary backgrounds use `L=98%`. Text uses `L=10%`.
- **Dark Theme:** Simply invert the lightness map. Backgrounds drop to `L=5%`. Text flips to `L=90%`.
- **Contrast Ratios:** Ensure your mathematical palette naturally passes WCAG 4.5:1. Never guess. Use CSS root variables to handle the flip.

```css
:root {
  --primary-hue: 220;
  --bg-color: hsl(var(--primary-hue), 10%, 98%);
  --text-color: hsl(var(--primary-hue), 20%, 15%);
}

[data-theme="dark"] {
  --bg-color: hsl(var(--primary-hue), 10%, 8%);
  --text-color: hsl(var(--primary-hue), 10%, 90%);
}
```

## 2. Dynamic SVG Generation (动态矢量化生成)

When generating SVGs algorithmically, enforce strict architectural standards.
> *生成矢量图形时，恪守严格的架构标准。*

1. **Responsive ViewBoxes:** Always enforce `viewBox="0 0 W H"`. Never hardcode `width="100px" height="100px"` on the root SVG tag. It must scale fluidly.
2. **CurrentColor Heritage:** Allow icons to inherit color via `<path fill="currentColor" />` rather than baking in hex codes.
3. **Optimized Paths:** A circle is `<circle>`, not a `<path>` with 4 bezier curves mimicking a circle. Prefer clean geometric primitives over exported Illustrator garbage.
4. **Compression:** Always strip empty `<g>` tags and editor metadata (e.g., `xmlns:sketch`). 

## 3. Micro-Animations & Interactivity (微动效设计)

Animations must feel snappier than the user's reaction time. 
> *微动效的响应速度必须快过用户的神经反射。*

- **Speed:** 150ms to 200ms is the "Goldilocks zone" for UI interactions.
- **Easing:** Never use linear easing for UI.
  - *Entering elements:* `ease-out` (Fast in, slow out. It enters boldly then decelerates).
  - *Exiting elements:* `ease-in` (Starts slow, snaps shut).
- **GPU Acceleration:** Only ever animate `transform` (translates, scales, rotates) and `opacity`. Animating `width`, `margin`, or `top` triggers layout repaints and destroys 60FPS.
