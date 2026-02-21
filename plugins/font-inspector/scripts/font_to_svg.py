#!/usr/bin/env python3
"""
Font to SVG Converter
Exports font glyphs as individual SVG files with CJK optimization.
"""

import sys
import json
import argparse
import os
from pathlib import Path
from typing import Dict, List, Optional, Set
from collections import defaultdict

try:
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
except ImportError:
    print("Error: fontTools not installed. Run: pip install fonttools", file=sys.stderr)
    sys.exit(1)


# CJK character presets
CJK_PRESETS = {
    "cjk-basic": list("的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严"),

    "cjk-common": None,  # Will be loaded from file or generated

    "latin": list("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"),

    "latin-extended": list("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ"),
}


def parse_unicode_range(range_str: str) -> List[int]:
    """Parse Unicode range string like '0x4E00-0x9FFF' into list of codepoints."""
    if '-' not in range_str:
        return [int(range_str, 16)]

    start, end = range_str.split('-')
    start_cp = int(start, 16)
    end_cp = int(end, 16)
    return list(range(start_cp, end_cp + 1))


def get_character_set(font: TTFont, args) -> Set[int]:
    """Determine which characters to export based on arguments."""
    cmap = font.getBestCmap()
    if not cmap:
        raise ValueError("No character map found in font")

    available_codepoints = set(cmap.keys())

    # Explicit characters
    if args.chars:
        return {ord(c) for c in args.chars if ord(c) in available_codepoints}

    # Unicode range
    if args.range:
        range_cps = set(parse_unicode_range(args.range))
        result = range_cps & available_codepoints
        if args.limit:
            result = set(list(result)[:args.limit])
        return result

    # Preset
    if args.preset:
        if args.preset not in CJK_PRESETS:
            raise ValueError(f"Unknown preset: {args.preset}. Available: {list(CJK_PRESETS.keys())}")

        preset_chars = CJK_PRESETS[args.preset]
        if preset_chars is None:
            # cjk-common: use most common 3000 characters
            # For now, use CJK Unified Ideographs range with limit
            cjk_range = set(range(0x4E00, 0x9FFF + 1))
            result = cjk_range & available_codepoints
            result = set(sorted(result)[:3000])
            return result

        return {ord(c) for c in preset_chars if ord(c) in available_codepoints}

    # Default: all characters (with optional limit)
    result = available_codepoints
    if args.limit:
        result = set(sorted(result)[:args.limit])

    return result


def glyph_to_svg(font: TTFont, glyph_name: str, output_dir: Path, upem: int) -> Optional[Dict]:
    """Convert a single glyph to SVG and return metadata."""
    try:
        glyph_set = font.getGlyphSet()
        if glyph_name not in glyph_set:
            return None

        # Extract SVG path
        pen = SVGPathPen(glyph_set)
        glyph_set[glyph_name].draw(pen)
        path_data = pen.getCommands()

        if not path_data:
            return None

        # Get bounding box
        bbox = None
        if 'glyf' in font:
            glyf_table = font['glyf']
            if glyph_name in glyf_table:
                glyph = glyf_table[glyph_name]
                if hasattr(glyph, 'xMin'):
                    bbox = {
                        "xMin": glyph.xMin,
                        "yMin": glyph.yMin,
                        "xMax": glyph.xMax,
                        "yMax": glyph.yMax
                    }

        # Get advance width
        advance_width = font['hmtx'][glyph_name][0]

        return {
            "glyph_name": glyph_name,
            "svg_path": path_data,
            "bbox": bbox,
            "advance_width": advance_width
        }

    except Exception as e:
        print(f"Warning: Failed to process glyph {glyph_name}: {e}", file=sys.stderr)
        return None


def write_svg_file(glyph_data: Dict, unicode_char: str, unicode_hex: str,
                   output_dir: Path, upem: int) -> None:
    """Write individual SVG file for a glyph."""
    path_data = glyph_data["svg_path"]

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg"
     width="{upem}" height="{upem}"
     viewBox="0 -{upem} {upem} {upem}">
  <!-- Glyph: {glyph_data["glyph_name"]} | Unicode: {unicode_hex} | Char: {unicode_char} -->
  <path d="{path_data}" fill="currentColor" transform="scale(1,-1)"/>
</svg>'''

    # Safe filename
    safe_name = unicode_hex.replace('+', '')
    svg_path = output_dir / f"{safe_name}.svg"

    svg_path.write_text(svg_content, encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(
        description="Export font glyphs as SVG files with CJK optimization"
    )
    parser.add_argument('font_path', help='Path to font file')
    parser.add_argument('--output', '-o', default='./svg_glyphs', help='Output directory')

    # Character selection
    char_group = parser.add_mutually_exclusive_group()
    char_group.add_argument('--chars', help='Specific characters to export (e.g., "ABC你好")')
    char_group.add_argument('--range', help='Unicode range (e.g., "0x4E00-0x9FFF")')
    char_group.add_argument('--preset', choices=list(CJK_PRESETS.keys()),
                           help='Use predefined character set')

    # Limits and optimization
    parser.add_argument('--limit', type=int, help='Maximum number of characters to export')
    parser.add_argument('--batch-size', type=int, default=500,
                       help='Process in batches (for memory management)')
    parser.add_argument('--progress', action='store_true', help='Show progress bar')
    parser.add_argument('--json-only', action='store_true',
                       help='Output JSON only, no SVG files')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')

    args = parser.parse_args()

    # Load font
    font_path = Path(args.font_path)
    if not font_path.exists():
        print(f"Error: Font file not found: {font_path}", file=sys.stderr)
        sys.exit(1)

    try:
        if args.verbose:
            print(f"Loading font: {font_path}", file=sys.stderr)

        font = TTFont(font_path)
        upem = font['head'].unitsPerEm
        cmap = font.getBestCmap()

        # Determine character set
        codepoints = get_character_set(font, args)
        total = len(codepoints)

        if args.verbose:
            print(f"Exporting {total} characters", file=sys.stderr)

        # Create output directory
        output_dir = Path(args.output)
        if not args.json_only:
            output_dir.mkdir(parents=True, exist_ok=True)

        # Process glyphs
        results = {}
        processed = 0

        for cp in sorted(codepoints):
            char = chr(cp)
            unicode_hex = f"U+{cp:04X}"
            glyph_name = cmap.get(cp)

            if not glyph_name:
                continue

            glyph_data = glyph_to_svg(font, glyph_name, output_dir, upem)
            if not glyph_data:
                continue

            # Write SVG file
            if not args.json_only:
                write_svg_file(glyph_data, char, unicode_hex, output_dir, upem)

            # Store metadata
            results[char] = {
                "glyph_name": glyph_data["glyph_name"],
                "unicode": unicode_hex,
                "svg_path": glyph_data["svg_path"],
                "bbox": glyph_data["bbox"],
                "advance_width": glyph_data["advance_width"]
            }

            processed += 1

            # Progress
            if args.progress and processed % 100 == 0:
                print(f"Progress: {processed}/{total} ({processed*100//total}%)",
                      file=sys.stderr)

        # Output manifest
        manifest = {
            "font_file": str(font_path),
            "units_per_em": upem,
            "total_exported": len(results),
            "glyphs": results
        }

        manifest_json = json.dumps(manifest, ensure_ascii=False, indent=2)

        if not args.json_only:
            manifest_path = output_dir / "manifest.json"
            manifest_path.write_text(manifest_json, encoding='utf-8')
            if args.verbose:
                print(f"Manifest written to: {manifest_path}", file=sys.stderr)

        # Always output to stdout for Claude
        print(manifest_json)

        font.close()

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
