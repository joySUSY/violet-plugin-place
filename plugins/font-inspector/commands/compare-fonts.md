<!-- Authors: Joysusy & Violet Klaudia 💖 -->
---
name: compare-fonts
description: Compare glyphs across two font files using the MCP engine
allowed-tools:
  - mcp__plugin_font-inspector_font-inspector__compare_glyphs
  - mcp__plugin_font-inspector_font-inspector__analyze_metrics
---

# Compare Fonts

Use the font-inspector MCP engine to compare glyphs and metrics across two font files.

When Susy asks to compare fonts, use the `compare_glyphs` tool to diff glyph outlines and the `analyze_metrics` tool to compare vertical/horizontal metrics between the two files.

## Usage Examples

### Comparing CJK Fonts

```
/compare-fonts NotoSansCJK-Regular.ttf NotoSerifCJK-Regular.ttf --glyphs "你好世界" --metrics vertical
```

This compares the CJK glyphs for "你好世界" across Noto Sans CJK and Noto Serif CJK, including vertical metric analysis which is critical for CJK typesetting.

### Comparing Latin Fonts

```
/compare-fonts Inter-Regular.otf Roboto-Regular.ttf --glyphs "AaBbGgQq" --metrics horizontal
```

This compares key distinguishing Latin glyphs between Inter and Roboto, focusing on horizontal metrics like advance widths and sidebearings.
