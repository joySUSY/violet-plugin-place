#!/usr/bin/env python3
"""
Font Information Extractor
Extracts comprehensive metadata from font files including CJK character coverage.
"""

import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Any

try:
    from fontTools.ttLib import TTFont
    from fontTools.unicode import Unicode
except ImportError:
    print("Error: fontTools not installed. Run: pip install fonttools", file=sys.stderr)
    sys.exit(1)


# Unicode range definitions
UNICODE_RANGES = {
    "Basic Latin": (0x0020, 0x007F),
    "Latin-1 Supplement": (0x0080, 0x00FF),
    "Latin Extended-A": (0x0100, 0x017F),
    "Latin Extended-B": (0x0180, 0x024F),
    "Greek and Coptic": (0x0370, 0x03FF),
    "Cyrillic": (0x0400, 0x04FF),
    "Hebrew": (0x0590, 0x05FF),
    "Arabic": (0x0600, 0x06FF),
    "Devanagari": (0x0900, 0x097F),
    "Thai": (0x0E00, 0x0E7F),
    "Hiragana": (0x3040, 0x309F),
    "Katakana": (0x30A0, 0x30FF),
    "CJK Unified Ideographs": (0x4E00, 0x9FFF),
    "CJK Unified Ideographs Extension A": (0x3400, 0x4DBF),
    "CJK Unified Ideographs Extension B": (0x20000, 0x2A6DF),
    "CJK Compatibility Ideographs": (0xF900, 0xFAFF),
    "Hangul Syllables": (0xAC00, 0xD7AF),
    "Emoji": (0x1F300, 0x1F9FF),
}


def get_font_metadata(font: TTFont) -> Dict[str, Any]:
    """Extract basic font metadata."""
    metadata = {}

    # Name table
    if 'name' in font:
        name_table = font['name']
        for record in name_table.names:
            if record.nameID == 1:  # Font Family
                metadata['family'] = record.toUnicode()
            elif record.nameID == 2:  # Subfamily (style)
                metadata['style'] = record.toUnicode()
            elif record.nameID == 4:  # Full name
                metadata['full_name'] = record.toUnicode()
            elif record.nameID == 5:  # Version
                metadata['version'] = record.toUnicode()
            elif record.nameID == 6:  # PostScript name
                metadata['postscript_name'] = record.toUnicode()

    # Head table
    if 'head' in font:
        head = font['head']
        metadata['units_per_em'] = head.unitsPerEm
        metadata['created'] = str(head.created)
        metadata['modified'] = str(head.modified)
        metadata['font_revision'] = head.fontRevision

    # OS/2 table
    if 'OS/2' in font:
        os2 = font['OS/2']
        metadata['weight'] = os2.usWeightClass
        metadata['width'] = os2.usWidthClass
        metadata['ascender'] = os2.sTypoAscender
        metadata['descender'] = os2.sTypoDescender
        metadata['line_gap'] = os2.sTypoLineGap
        metadata['x_height'] = getattr(os2, 'sxHeight', None)
        metadata['cap_height'] = getattr(os2, 'sCapHeight', None)

    # Post table
    if 'post' in font:
        post = font['post']
        metadata['italic_angle'] = post.italicAngle
        metadata['underline_position'] = post.underlinePosition
        metadata['underline_thickness'] = post.underlineThickness
        metadata['is_fixed_pitch'] = bool(post.isFixedPitch)

    return metadata


def analyze_character_coverage(font: TTFont) -> Dict[str, Any]:
    """Analyze character coverage including Unicode ranges."""
    cmap = font.getBestCmap()
    if not cmap:
        return {"error": "No character map found"}

    codepoints = set(cmap.keys())
    total_chars = len(codepoints)

    # Analyze coverage by Unicode range
    range_coverage = {}
    for range_name, (start, end) in UNICODE_RANGES.items():
        chars_in_range = [cp for cp in codepoints if start <= cp <= end]
        if chars_in_range:
            range_size = end - start + 1
            coverage_pct = (len(chars_in_range) / range_size) * 100
            range_coverage[range_name] = {
                "count": len(chars_in_range),
                "range": f"U+{start:04X}-U+{end:04X}",
                "coverage_percent": round(coverage_pct, 2),
                "sample_chars": [chr(cp) for cp in sorted(chars_in_range)[:10]]
            }

    # Identify CJK font characteristics
    cjk_count = sum(
        range_coverage.get(name, {}).get("count", 0)
        for name in UNICODE_RANGES.keys()
        if "CJK" in name
    )

    is_cjk_font = cjk_count > 1000

    return {
        "total_characters": total_chars,
        "is_cjk_font": is_cjk_font,
        "cjk_character_count": cjk_count,
        "unicode_ranges": range_coverage,
        "codepoint_range": {
            "min": f"U+{min(codepoints):04X}",
            "max": f"U+{max(codepoints):04X}"
        }
    }


def get_opentype_features(font: TTFont) -> List[str]:
    """Extract OpenType feature tags."""
    features = set()

    if 'GSUB' in font:
        gsub = font['GSUB']
        if hasattr(gsub, 'table') and hasattr(gsub.table, 'FeatureList'):
            for feature in gsub.table.FeatureList.FeatureRecord:
                features.add(feature.FeatureTag)

    if 'GPOS' in font:
        gpos = font['GPOS']
        if hasattr(gpos, 'table') and hasattr(gpos.table, 'FeatureList'):
            for feature in gpos.table.FeatureList.FeatureRecord:
                features.add(feature.FeatureTag)

    return sorted(features)


def analyze_glyph_complexity(font: TTFont) -> Dict[str, Any]:
    """Analyze glyph complexity (useful for CJK fonts)."""
    glyph_set = font.getGlyphSet()
    glyph_names = list(glyph_set.keys())

    # Sample analysis on first 100 glyphs to avoid performance issues
    sample_size = min(100, len(glyph_names))
    sample_glyphs = glyph_names[:sample_size]

    complexities = []
    for glyph_name in sample_glyphs:
        try:
            glyph = glyph_set[glyph_name]
            # Estimate complexity by pen operations
            from fontTools.pens.recordingPen import RecordingPen
            pen = RecordingPen()
            glyph.draw(pen)
            complexity = len(pen.value)  # Number of drawing operations
            complexities.append(complexity)
        except Exception:
            continue

    if complexities:
        avg_complexity = sum(complexities) / len(complexities)
        max_complexity = max(complexities)
        return {
            "average_complexity": round(avg_complexity, 2),
            "max_complexity": max_complexity,
            "sample_size": len(complexities),
            "note": "Based on sample of first 100 glyphs"
        }

    return {"error": "Could not analyze glyph complexity"}


def main():
    parser = argparse.ArgumentParser(
        description="Extract comprehensive font information with CJK optimization"
    )
    parser.add_argument('font_path', help='Path to font file')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    parser.add_argument('--output', '-o', help='Output JSON file (default: stdout)')

    args = parser.parse_args()

    font_path = Path(args.font_path)
    if not font_path.exists():
        print(f"Error: Font file not found: {font_path}", file=sys.stderr)
        sys.exit(1)

    try:
        # Load font
        if args.verbose:
            print(f"Loading font: {font_path}", file=sys.stderr)

        font = TTFont(font_path)

        # Extract all information
        result = {
            "file": str(font_path),
            "file_size_mb": round(font_path.stat().st_size / (1024 * 1024), 2),
            "metadata": get_font_metadata(font),
            "character_coverage": analyze_character_coverage(font),
            "opentype_features": get_opentype_features(font),
            "glyph_complexity": analyze_glyph_complexity(font),
        }

        # Add CJK-specific recommendations
        if result["character_coverage"].get("is_cjk_font"):
            result["recommendations"] = {
                "export_strategy": "Use --preset cjk-common or --limit for large exports",
                "batch_size": 500,
                "estimated_full_export_time": "5-15 minutes",
                "memory_warning": "Full export may require 500MB-1GB RAM"
            }

        # Output
        output_json = json.dumps(result, ensure_ascii=False, indent=2)

        if args.output:
            Path(args.output).write_text(output_json, encoding='utf-8')
            if args.verbose:
                print(f"Output written to: {args.output}", file=sys.stderr)
        else:
            print(output_json)

        font.close()

    except Exception as e:
        print(f"Error processing font: {e}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
