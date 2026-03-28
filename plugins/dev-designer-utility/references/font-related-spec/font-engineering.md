# 🔠 Font Engineering Fundamentals (字体工程基础)

Font files are precision-engineered binary databases. A single corrupted table renders the entire font unusable. Understanding the internal structure is mandatory before any modification.

## 1. OpenType File Architecture (OpenType文件架构)

An OpenType font (`.otf`/`.ttf`) is a collection of **tables**, each storing a specific category of data:

### Critical Tables

| Table | Full Name | Purpose | Corruption Impact |
|-------|-----------|---------|-------------------|
| `head` | Font Header | Global metrics, units per em, created date | Font unreadable |
| `hhea` | Horizontal Header | Ascent, descent, line gap, max advance | Text layout broken |
| `hmtx` | Horizontal Metrics | Per-glyph advance widths, left side bearings | Character spacing destroyed |
| `cmap` | Character Map | Unicode → Glyph ID mapping | Characters display as .notdef |
| `glyf` | Glyph Data (TrueType) | Quadratic Bézier outlines, composites | Glyphs render as empty boxes |
| `CFF` / `CFF2` | Compact Font Format | Cubic Bézier outlines (PostScript) | Glyphs render as empty boxes |
| `name` | Naming Table | Family name, style, copyright, license | Font identification fails |
| `OS/2` | OS/2 and Windows Metrics | Weight class, width class, panose, embedding | Platform-specific rendering issues |
| `post` | PostScript | Glyph names for PostScript printers | Print output garbled |
| `GPOS` | Glyph Positioning | Kerning pairs, mark positioning | Character spacing inconsistent |
| `GSUB` | Glyph Substitution | Ligatures, alternates, contextual forms | Ligatures/features broken |
| `GDEF` | Glyph Definition | Glyph class (base, mark, ligature, component) | GPOS/GSUB lookups fail |

### Table Dependency Graph

```
cmap → glyf/CFF (glyph lookup requires correct character mapping)
GPOS → GDEF (positioning needs glyph class info)
GSUB → GDEF (substitution needs glyph class info)
hmtx → head (metrics reference units per em)
hhea → hmtx (headers summarize metric extremes)
```

## 2. Glyph Outline Geometry (字形轮廓几何)

### TrueType Outlines (Quadratic Béziers)

- Control points: on-curve and off-curve
- **Quadratic curves:** P0 (on) → P1 (off) → P2 (on)
- Implied on-curve points between consecutive off-curve points
- Winding direction: **clockwise** for outer contours, **counter-clockwise** for inner (holes)

### CFF/PostScript Outlines (Cubic Béziers)

- Control points: all explicit (no implied points)
- **Cubic curves:** P0 → C1 → C2 → P3
- More expressive per segment (fewer points needed for complex curves)
- Winding rule: non-zero or even-odd fill

### Conversion

| Direction | Quality Loss | When |
|-----------|-------------|------|
| Cubic → Quadratic | Approximation error | TrueType output from PostScript source |
| Quadratic → Cubic | Lossless | CFF output from TrueType source |

**Tolerance for cubic→quadratic:** keep maximum deviation < 1 unit at the font's units-per-em resolution.

## 3. Font Metrics Anatomy (字体度量解剖)

```
                   ┌── Ascender line (ascent)
  ╔═══╗            │
  ║   ║  d         │  Cap height
  ║   ║──┐         │
  ╚═══╝  │ b       │  x-height
─────────┴─────── ─┤── Baseline
          │         │  Descender
          p    g    │
                   └── Descender line (descent)

Em square = ascent + descent (typically 1000 or 2048 units)
Line gap = extra space between lines (platform-specific)
Advance width = total horizontal space consumed by one glyph
Left side bearing = space from origin to leftmost pixel
```

## 4. Font Subsetting (字体子集化)

Subsetting removes unused glyphs to reduce file size. Critical for web performance.

| Strategy | Reduction | When |
|----------|----------|------|
| Unicode range subset | 60-90% | Known target languages |
| Used characters only | 90-99% | Static site, known content |
| Layout feature pruning | 10-30% | Remove unused GSUB/GPOS lookups |

**Tools:** `pyftsubset` (fonttools), `woff2_compress`, `glyphhanger`

```bash
# Subset to Latin + CJK common
pyftsubset input.ttf \
  --output-file=output.woff2 \
  --flavor=woff2 \
  --unicodes="U+0000-007F,U+4E00-9FFF" \
  --layout-features="kern,liga"
```

## 5. Anti-Patterns (反模式)

```
❌ Modifying glyph outlines without recalculating hmtx advance widths
❌ Changing contour winding direction (inverts fill)
❌ Deleting cmap entries without removing corresponding glyphs
❌ Ignoring composite glyph dependencies (deleting a component used by composites)
❌ Serving unsubsetted CJK fonts (10MB+ for web use)
❌ Using fontforge in headless mode without validating output tables
```
