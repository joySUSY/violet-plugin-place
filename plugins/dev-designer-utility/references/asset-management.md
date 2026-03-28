# 📦 Asset Management (资产管理)

Design assets are first-class engineering artifacts. They require version control, optimization pipelines, and systematic naming — the same discipline applied to source code.

## 1. Asset Pipeline Architecture (资产管线架构)

```
Source Assets (Figma/Sketch/AI)
  │
  ├── Export → Raw assets (SVG, PNG @2x @3x, WebP)
  │
  ├── Optimize → Compressed assets (SVGO, sharp, squoosh)
  │
  ├── Transform → Platform variants (iOS @1x-3x, Android mdpi-xxxhdpi)
  │
  └── Distribute → CDN / bundled / sprite sheet
```

## 2. Image Format Selection (图像格式选择)

| Format | Use Case | Optimization |
|--------|----------|-------------|
| **SVG** | Icons, logos, illustrations | SVGO: remove metadata, simplify paths |
| **WebP** | Photographs, complex images | Lossy quality 80-85, width ≤ 1920px |
| **AVIF** | Next-gen photos (modern browsers) | Quality 60-70, superior compression |
| **PNG** | Screenshots, pixel-precise graphics | TinyPNG/pngquant: 256 color quantization |
| **ICO/Favicon** | Browser tab icon | Multi-size: 16, 32, 48, 192, 512px |

**Rule:** Never serve unoptimized assets. A 2MB hero image is an engineering failure, not a design choice.

## 3. Naming Convention (命名规范)

```
{category}/{name}--{variant}--{state}.{format}

Examples:
icons/arrow--right--default.svg
icons/arrow--right--hover.svg
photos/hero--homepage--mobile.webp
logos/brand--primary--dark-bg.svg
illustrations/onboarding--step-1.svg
```

**Rules:**
- Lowercase, hyphen-separated (never camelCase or spaces)
- Category prefix for folder organization
- Double-hyphen `--` separates semantic segments
- State suffix only when variant exists

## 4. Icon System Architecture (图标系统架构)

### Inline SVG Icons (< 20 icons)
Embed directly in HTML for maximum control and no network requests.

### SVG Sprite Sheet (20-100 icons)
```xml
<!-- sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-arrow" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </symbol>
</svg>

<!-- Usage -->
<svg class="icon"><use href="sprite.svg#icon-arrow"/></svg>
```

### Icon Font (100+ icons, legacy systems)
Use as last resort. SVG sprites are superior in every metric except legacy browser support.

## 5. Design File Version Control (设计文件版本控制)

| Approach | Tool | When |
|----------|------|------|
| Git LFS | Git + LFS extension | Binary assets in code repos |
| Figma branching | Figma native | Design iteration |
| Asset CDN | Cloudinary, imgix | Production delivery |
| Token sync | Style Dictionary, Tokens Studio | Design-to-code token bridge |

**Rule:** Design tokens live in the code repository (source of truth), synced TO Figma — never the reverse. Code is canonical.
