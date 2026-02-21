---
name: inspect-font
description: Analyze and visualize font files with SVG/UFO export. Optimized for CJK fonts.
---

# /inspect-font Command

Comprehensive font analysis and visualization tool with support for large CJK character sets.

## Usage

```bash
/inspect-font <font_file> [options]
```

## Options

### Basic Options
- `--info` - Display font metadata only (default if no other options)
- `--svg` - Export glyphs as SVG files
- `--ufo` - Convert font to UFO format
- `--all` - Run all analysis steps

### Character Selection (for SVG export)
- `--chars "ABC你好"` - Export specific characters
- `--range 0x4E00-0x9FFF` - Export Unicode range
- `--preset <name>` - Use predefined character set
  - `latin` - Basic Latin (A-Z, a-z, 0-9)
  - `latin-extended` - Latin + accented characters
  - `cjk-basic` - Most common 500 CJK characters
  - `cjk-common` - Common 3000 CJK characters
  - `cjk-full` - All CJK Unified Ideographs (20,000+)

### CJK Optimization
- `--limit <n>` - Maximum number of characters to export
- `--batch-size <n>` - Process in batches (default: 500)
- `--progress` - Show progress bar for large exports

### Output Options
- `--output <dir>` - Output directory (default: `./font_analysis/`)
- `--format <type>` - SVG output format: `individual` (default) or `sprite`

## Examples

### Example 1: Quick Font Info
```bash
/inspect-font MyFont.ttf
```
Displays font metadata, character count, and Unicode coverage.

### Example 2: Export Specific Characters
```bash
/inspect-font NotoSansCJK.otf --svg --chars "你好世界Hello"
```
Exports only the specified characters as SVG files.

### Example 3: CJK Common Characters
```bash
/inspect-font SimSun.ttf --svg --preset cjk-common --output ./analysis/
```
Exports the 3000 most common CJK characters with progress tracking.

### Example 4: Unicode Range Export
```bash
/inspect-font MyFont.otf --svg --range 0x4E00-0x4EFF --output ./cjk_subset/
```
Exports CJK characters in the specified Unicode range (256 characters).

### Example 5: Full Analysis with UFO
```bash
/inspect-font MyFont.ttf --all --ufo --output ./full_analysis/
```
Runs complete analysis: metadata, SVG export, and UFO conversion.

### Example 6: Large CJK Font (Optimized)
```bash
/inspect-font HugeFont.otf --svg --preset cjk-common --limit 1000 --batch-size 200 --progress
```
Exports 1000 characters in batches of 200 with progress display.

## Output Structure

```
font_analysis/
├── metadata.json          # Font information
├── svg_glyphs/           # Individual SVG files
│   ├── A.svg
│   ├── B.svg
│   ├── uni4E00.svg       # 一
│   └── ...
├── manifest.json         # SVG path data for Claude
└── output.ufo/           # UFO format (if --ufo)
    ├── fontinfo.plist
    ├── glyphs/
    └── ...
```

## Performance Notes

### Small Fonts (< 1000 characters)
- Processing time: < 10 seconds
- Memory usage: < 100MB
- No optimization needed

### Medium Fonts (1000-5000 characters)
- Processing time: 30-60 seconds
- Memory usage: 100-300MB
- Recommended: Use `--batch-size 500`

### Large CJK Fonts (> 10,000 characters)
- Processing time: 5-15 minutes
- Memory usage: 500MB-1GB
- **Strongly recommended**: Use `--preset` or `--limit`
- Use `--progress` to monitor

## CJK Font Best Practices

### For Exploration
Start with a small sample:
```bash
/inspect-font font.otf --svg --chars "你好世界"
```

### For Analysis
Use common character preset:
```bash
/inspect-font font.otf --svg --preset cjk-common
```

### For Specific Needs
Target Unicode ranges:
```bash
# Hiragana
/inspect-font font.otf --svg --range 0x3040-0x309F

# Katakana
/inspect-font font.otf --svg --range 0x30A0-0x30FF

# CJK Unified Ideographs
/inspect-font font.otf --svg --range 0x4E00-0x9FFF --limit 1000
```

## Error Handling

- **File not found**: Verify font file path
- **Unsupported format**: Only TTF, OTF, WOFF, WOFF2 supported
- **Memory error**: Reduce `--limit` or use smaller `--batch-size`
- **Timeout**: Use `--preset` or `--range` to reduce character count

## Integration with Claude Analysis

After running `/inspect-font`, Claude can:
1. Read `manifest.json` for SVG path data
2. Analyze glyph structure and design patterns
3. Compare characters across fonts
4. Identify design inconsistencies
5. Suggest improvements

## Technical Details

- **SVG coordinate system**: Origin at baseline, Y-axis points up
- **Path precision**: 2 decimal places
- **Bounding box**: Calculated from actual path data
- **Advance width**: Preserved from original font

---

*Command created by Violet 💜 | CJK optimized 🀄*
