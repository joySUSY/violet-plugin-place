---
name: dev-designer-utility
version: "1.0"
description: |
  Master engineer's guide to design systems architecture, typography engineering, color theory engines, theme generation, visual artifact production, UX strategy, asset management, font technology, and design-to-code pipelines. Use when constructing design tokens, engineering type scales, generating theme palettes, building visual design systems, creating SVG/Canvas artifacts, evaluating UX heuristics, managing font pipelines (OpenType/TrueType parsing, glyph modification, subsetting), or producing design artifacts (posters, slides, data visualizations). Strictly design-domain — frontend framework code (React, Vue, Tailwind configs) belongs in `frontend-dev`. Enforces mathematical precision in spacing, harmonious color relationships, and systematic visual hierarchy.
metadata:
  absorbs:
    - theme-factory
    - visual-designing
    - typography-designer
    - ux-designer
    - ux-researcher-skill
    - ui-designer-skill
    - visualization-expert
    - asset-manager
    - material-design-3-typography
    - liquid-glass
    - liquid-glass-design
    - cupertino
    - hyper-visual
    - distinctive-frontend-design
    - algorithmic-art-skill
    - fontations
    - fontstock-db
---

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `frontend-dev` | UI Implementation & Themes | [`frontend-dev/SKILL.md`](../frontend-dev/SKILL.md) |
| `rust-coding-engine` | Font Engineering (Fontations) | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |
| `developer-tool` | Image Processing & Assets | [`developer-tool/SKILL.md`](../developer-tool/SKILL.md) |

---

# 🎨 Design Utility Engine: The Humanizer Approach

> "Design is not decoration. Design is the structural skeleton that holds function upright."
> *(设计不是装饰。设计是支撑功能直立的结构骨架。)*

This engine governs the **design infrastructure layer** — the systems, tokens, algorithms, and asset pipelines that feed into visual output. It is explicitly separated from `frontend-dev` (which handles React/Vue/CSS framework implementation) and instead focuses on the *source of truth* for all design decisions: type scales, color math, theme generation, UX heuristics, font engineering, and visual artifact production.

### 🗺️ Navigation Matrix | 导航矩阵

- [Brand Psychology](references/brand-psychology.md) — Visual identity and value-based design. | 视觉识别和基于价值的设计。
- [Naming Heuristics](references/naming-heuristics.md) —memorable, cultural-safe naming patterns. | 易记且文化安全的人命名模式。
- [Brand Naming](modules/brand-naming-strategies/SKILL.md) — Phonetic and strategic naming tools. | 语音和战略命名工具。
- [Brand Values](modules/brand-values-development/SKILL.md) — Defining the core "Soul" of the project. | 定义项目的核心“灵魂”。

## 🧬 Sub-Skill Integration (Phase 3) | 子技能集成 (第三阶段)

As per the Global Integration Directive, the following skills have been absorbed into this engine: | 根据全球集成指令，以下技能已被吸收到此引擎中：

| Skill Name | Role | Research batch |
| :--- | :--- | :--- |
| `brand-naming-strategies` | Memorability & phonetic patterns | Batch 11 |
| `brand-values-development` | Core identity & value alignment | Batch 5 |

### Core Design Systems

| # | Reference | Scope | 范围 |
|---|-----------|-------|------|
| 1 | [Typography Engineering](references/typography-engineering.md) | Type scales, font selection, weight/height ratios, Material Design 3 type system, readability math | 字体排版工程、字阶设计、可读性数学 |
| 2 | [Color Theory & Theme Generation](references/color-theme-engine.md) | HSL/OKLab color math, palette generation, dark mode algorithms, theme factories, glassmorphism | 色彩理论、主题生成、暗色模式算法 |
| 3 | [Visual Design Systems](references/visual-design-systems.md) | Design tokens, spacing grids (4pt/8pt), component anatomy, Apple HIG/Material Design patterns, Cupertino aesthetics | 设计系统、间距网格、组件解剖学 |
| 4 | [UX Strategy & Research](references/ux-strategy.md) | Heuristic evaluation, user research methods, wireframing protocols, prototyping workflows, accessibility audits | UX策略、用户研究、原型工作流 |
| 5 | [Visual Artifacts & Generative Art](references/visual-artifacts.md) | Canvas/SVG generation, data visualization, chart selection, poster/slide production, algorithmic art, p5.js creative coding | 视觉产物、生成艺术、数据可视化 |
| 6 | [Asset Management](references/asset-management.md) | Asset pipelines, image optimization, icon systems, design file organization, version control for design assets | 资产管理、图像优化、图标系统 |

### Font-Related Specialization (字体工程专区)

| # | Reference | Scope | 范围 |
|---|-----------|-------|------|
| 7 | [Font Engineering Fundamentals](references/font-related-spec/font-engineering.md) | OpenType/TrueType table structure, glyph outlines (cubic/quadratic), font metrics, hinting, subsetting | 字体工程基础、OpenType表结构、字形轮廓 |
| 8 | [Fontations Ecosystem (Rust)](references/font-related-spec/fontations-rust.md) | Google's `fontations` crate family (`read-fonts`, `write-fonts`, `skrifa`, `font-types`), glyph parsing, font compilation, Chromium integration | Fontations Rust生态、字体解析与编译 |
| 9 | [Font Modification & Pipeline](references/font-related-spec/font-modification-pipeline.md) | Glyph deformation, stroke manipulation, spur removal, ink trap flattening, CJK component assembly, parametric font generation | 字体修改管线、字形变形、CJK组件装配 |

## 🎯 When to Trigger This Engine (触发场景)

- 🎨 **"Create a design system / design tokens":** Load `visual-design-systems.md` for token architecture, spacing grids, and component anatomy.
- 🔤 **"Choose fonts for this project" / "Build a type scale":** Load `typography-engineering.md` for mathematical type scale generation and Material Design 3 integration.
- 🌈 **"Generate a color palette" / "Build dark mode":** Load `color-theme-engine.md` for HSL/OKLab algorithms, contrast ratio validation, and theme factory patterns.
- 📊 **"Create a chart/poster/slide" / "Visualize this data":** Load `visual-artifacts.md` for chart selection heuristics, SVG generation, and generative art patterns.
- 🔬 **"Evaluate UX" / "Run usability audit":** Load `ux-strategy.md` for heuristic evaluation frameworks and user research methodology.
- 🔠 **"Parse/modify a font file" / "Work with fontations":** Load `font-related-spec/fontations-rust.md` for Rust font parsing, or `font-engineering.md` for OpenType fundamentals.
- ✏️ **"Deform CJK glyphs" / "Build parametric fonts":** Load `font-related-spec/font-modification-pipeline.md` for glyph manipulation and CJK component assembly.

## 🧠 Core Operating Directives (核心法则)

- **Design is Math, Not Art:** Every spacing value, font size, and color choice must derive from a mathematical system (modular scale, golden ratio, harmonic intervals). Arbitrary "looks good" decisions are forbidden. *(设计是数学，不是艺术。每个间距、字号和色值都必须源自数学系统。)*
- **Tokens Before Pixels:** Establish the design token vocabulary (`--spacing-md`, `--color-primary-500`, `--font-heading`) before drawing a single pixel. Tokens are the API contract between design and code. *(先定义设计令牌，再画像素。)*
- **Accessibility is Non-Negotiable:** WCAG 2.2 AA contrast ratios (4.5:1 body text, 3:1 large text) are minimum thresholds, not aspirational goals. *(无障碍是底线，不是目标。)*
- **Font Engineering Demands Precision:** A single off-by-one error in a glyph control point coordinate corrupts the entire font file. Validate with `fonttools` or `fontations` tooling before any export. *(字体工程要求精确。一个控制点坐标偏差就能损坏整个字体文件。)*
- **Design Systems Scale; Ad-Hoc Styling Doesn't:** A design system with 12 well-defined colors and 6 spacing tokens covers 95% of UI needs. 50 arbitrary hex codes and pixel values cover 0% of maintenance needs. *(设计系统可以扩展，随意样式不行。)*
