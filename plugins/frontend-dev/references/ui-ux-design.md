# 💅 UI/UX & Visual Design (视觉交互设计)

Design is not subjective art; it is a system of psychological and mathematical rules applied to a screen.

## 1. The Mathematical Grid (8-Point System)

Do not use arbitrary spacing (`padding: 15px`). Every margin, padding, and height must be a multiple of **4 or 8**.
> *数学化的网格约束：所有间距必须是 4 或 8 的倍数。*

- **Micro (4pt):** 4px, 12px (Inside buttons, tight text gaps)
- **Base (8pt):** 8px, 16px, 24px, 32px (Component padding, form gaps)
- **Macro (16pt):** 48px, 64px, 96px, 128px (Section spacing, page layouts)

## 2. Typography (排版原则)

Readability is the ultimate metric.
> *可读性是字体的最终衡量标准。*

- **Type Scale:** Use a geometric progression (e.g., Modular Scale `1.250`). 
  - `xs`: 0.75rem (12px)
  - `sm`: 0.875rem (14px)
  - `base`: 1rem (16px) - *Minimum readable body text.*
  - `lg`: 1.125rem (18px)
- **Line Height (Leading):** 
  - Headings: `1.1` to `1.2` (Tight).
  - Body text: `1.5` to `1.6` (Breatheable).
- **Line Length (Measure):** 45-75 characters per line to prevent eye fatigue. Set `max-w-prose` (65ch).

## 3. Apple HIG Principles (苹果设计规范核心)

- **Deference (服从内容):** The UI should get out of the way of the content. Remove visual borders if whitespace can do the job.
- **Clarity (清晰):** Text must be legible at a glance. Contrast ratios must exceed WCAG AA standards (4.5:1).
- **Depth (层级深度):** Use layering to show hierarchy. Backgrounds are solid; over-layers (modals) use subtle drop shadows and higher Z-indexes; floating elements (tooltips) use sharp, tight drop shadows.

## 4. Gestalt Principles in UI (格式塔原则)

- **Proximity (接近性):** Elements close together are perceived as related. The gap between a label and its input must be much smaller than the gap between two form groups.
- **Similarity (相似性):** Consistent styling (e.g., all primary destructive buttons are red) reduces cognitive load.
