# ✏️ Font Modification & Pipeline (字体修改管线)

Font modification is surgical editing of mathematical curves at sub-pixel precision. The pipeline transforms source glyphs through deterministic geometric operations and produces validated output fonts.

## 1. Glyph Deformation Operations (字形变形操作)

### Affine Transformations

| Operation | Matrix | Effect |
|-----------|--------|--------|
| Scale | `[sx 0; 0 sy]` | Uniform/non-uniform sizing |
| Rotate | `[cos -sin; sin cos]` | Rotation around origin |
| Skew | `[1 tan(a); tan(b) 1]` | Oblique/italic simulation |
| Translate | offset `[tx, ty]` | Position adjustment |

**Rule:** Always transform around the glyph's centroid, not the origin. Transform = translate-to-origin → apply → translate-back.

### Non-Linear Deformations

| Deformation | Algorithm | Use Case |
|-------------|-----------|----------|
| Stroke expansion | Offset curve ± half stroke width | Weight modification |
| Corner rounding | Insert arcs at sharp corners | Rounded/Yuanti style |
| Spur removal | Detect and flatten terminal serifs | Sans-serif conversion |
| Ink trap flattening | Fill concavities at stroke junctions | Display optimization |
| Parametric weight | Interpolate between masters | Variable font instances |

### Stroke Expansion Algorithm

```
For each contour segment:
  1. Compute normal vectors at each point
  2. Offset curve by +d (outer) and -d (inner) along normals
  3. Join segments at corners:
     - Miter join: extend until intersection (if angle > threshold)
     - Round join: insert arc between offset endpoints
     - Bevel join: connect offset endpoints with straight line
  4. Combine outer (forward) and inner (reversed) into new contour
```

## 2. CJK Component Assembly (CJK组件装配)

### Component-Based Glyph Construction

CJK characters decompose into reusable stroke primitives and radical components:

```
Character: 想 (xiǎng, "to think")
  ├── Top: 相 (xiāng)
  │    ├── Left: 木 (mù, tree)
  │    └── Right: 目 (mù, eye)
  └── Bottom: 心 (xīn, heart)
```

### Assembly Pipeline

```
Stroke Primitives (横 竖 撇 捺 点 折)
    ↓ compose
Radical Components (木 目 心 ...)
    ↓ layout (IDS: ⿰ ⿱ ⿲ ⿳ ⿴ ⿵ ⿶ ⿷ ⿸ ⿹ ⿺ ⿻)
Character Glyphs (想 感 思 ...)
    ↓ apply style (weight, rounding, slant)
Styled Glyphs
    ↓ validate (contour direction, overlap removal)
Final Outlines
```

### Ideographic Description Sequences (IDS)

| Operator | Layout | Example |
|----------|--------|---------|
| ⿰ | Left-Right | 明 = ⿰日月 |
| ⿱ | Top-Bottom | 想 = ⿱相心 |
| ⿲ | Left-Center-Right | 街 = ⿲彳圭亍 |
| ⿳ | Top-Center-Bottom | 京 = ⿳亠口小 |
| ⿴ | Full surround | 国 = ⿴囗玉 |
| ⿵ | Open bottom | 問 = ⿵門口 |
| ⿸ | Open bottom-right | 庄 = ⿸广土 |
| ⿺ | Open top-right | 建 = ⿺廴聿 |

## 3. Parametric Font Generation (参数化字体生成)

### Variable Font Axis Design

| Axis | Tag | Range | Purpose |
|------|-----|-------|---------|
| Weight | `wght` | 100-900 | Thin → Black |
| Width | `wdth` | 75-125 | Condensed → Extended |
| Italic | `ital` | 0-1 | Upright → Italic |
| Optical Size | `opsz` | 8-144 | Text → Display optimization |
| Custom: Roundness | `RNDS` | 0-100 | Sharp corners → Full rounding |

### Master Interpolation

```
For axis value t ∈ [0, 1]:
  point(t) = (1-t) × master_min + t × master_max

For multi-axis (e.g., weight × width):
  point(w, d) = (1-w)(1-d)×M00 + w(1-d)×M10 + (1-w)d×M01 + wd×M11
```

**Constraint:** All masters must have identical contour topology (same number of points, same point order, same contour count). Violation produces undefined interpolation artifacts.

## 4. Validation Pipeline (验证管线)

Execute in order. Stop on failure.

| Step | Check | Tool | Pass Criteria |
|------|-------|------|---------------|
| 1 | Contour direction | fonttools.pens | Outer clockwise, inner counter-clockwise |
| 2 | Overlap removal | pathops / skia-pathops | No self-intersecting contours |
| 3 | Open contours | fonttools.glyf | All contours closed |
| 4 | Point count consistency | Custom check | Same across all masters (for variable fonts) |
| 5 | Metrics recalculation | fonttools.hmtx | Advance widths match actual glyph bounds |
| 6 | Table checksums | write-fonts / fonttools | All table checksums valid |
| 7 | Rendering test | HarfBuzz + skrifa | Visual output matches expected |

## 5. Anti-Patterns (反模式)

```
❌ Modifying glyph points without recalculating bounding boxes
❌ Applying non-linear deformations before removing overlaps
❌ Mixing TrueType and CFF outlines in the same font
❌ Variable font masters with different contour topology
❌ Skipping contour direction validation (causes fill rendering bugs)
❌ CJK assembly without considering stroke order for hint positioning
❌ Interpolation with incompatible point counts across masters
```
