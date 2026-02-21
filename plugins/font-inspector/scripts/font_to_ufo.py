#!/usr/bin/env python3
"""
Font to UFO Converter
Converts font files to UFO (Unified Font Object) format for editing.
"""

import sys
import argparse
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools.ufoLib import UFOWriter
    from fontTools.pens.t2CharStringPen import T2CharStringPen
    from fontTools.pens.recordingPen import RecordingPen
    import ufoLib2
except ImportError:
    print("Error: Required packages not installed.", file=sys.stderr)
    print("Run: pip install fonttools ufoLib2", file=sys.stderr)
    sys.exit(1)


def convert_font_to_ufo(font_path: Path, output_path: Path, verbose: bool = False) -> None:
    """Convert a font file to UFO format."""

    if verbose:
        print(f"Loading font: {font_path}", file=sys.stderr)

    # Load the font
    tt_font = TTFont(font_path)

    # Create UFO font
    ufo_font = ufoLib2.Font()

    # Extract font info
    if 'name' in tt_font:
        name_table = tt_font['name']
        for record in name_table.names:
            if record.nameID == 1:  # Family name
                ufo_font.info.familyName = record.toUnicode()
            elif record.nameID == 2:  # Style name
                ufo_font.info.styleName = record.toUnicode()
            elif record.nameID == 5:  # Version
                version_str = record.toUnicode()
                # Extract numeric version
                import re
                match = re.search(r'(\d+\.\d+)', version_str)
                if match:
                    try:
                        ufo_font.info.versionMajor = int(float(match.group(1)))
                        ufo_font.info.versionMinor = int((float(match.group(1)) % 1) * 1000)
                    except ValueError:
                        pass

    # Extract metrics
    if 'head' in tt_font:
        head = tt_font['head']
        ufo_font.info.unitsPerEm = head.unitsPerEm

    if 'OS/2' in tt_font:
        os2 = tt_font['OS/2']
        ufo_font.info.ascender = os2.sTypoAscender
        ufo_font.info.descender = os2.sTypoDescender
        ufo_font.info.capHeight = getattr(os2, 'sCapHeight', None)
        ufo_font.info.xHeight = getattr(os2, 'sxHeight', None)

    if 'post' in tt_font:
        post = tt_font['post']
        ufo_font.info.italicAngle = post.italicAngle
        ufo_font.info.postscriptUnderlinePosition = post.underlinePosition
        ufo_font.info.postscriptUnderlineThickness = post.underlineThickness

    # Extract glyphs
    glyph_set = tt_font.getGlyphSet()
    cmap = tt_font.getBestCmap()

    if verbose:
        print(f"Converting {len(glyph_set)} glyphs...", file=sys.stderr)

    processed = 0
    for glyph_name in glyph_set.keys():
        try:
            # Create UFO glyph
            ufo_glyph = ufo_font.newGlyph(glyph_name)

            # Get advance width
            if 'hmtx' in tt_font:
                advance_width, lsb = tt_font['hmtx'][glyph_name]
                ufo_glyph.width = advance_width

            # Draw glyph outline
            tt_glyph = glyph_set[glyph_name]

            # Use recording pen to capture drawing commands
            recording_pen = RecordingPen()
            tt_glyph.draw(recording_pen)

            # Replay commands to UFO glyph pen
            recording_pen.replay(ufo_glyph.getPen())

            # Add Unicode mapping
            if cmap:
                for codepoint, mapped_glyph in cmap.items():
                    if mapped_glyph == glyph_name:
                        ufo_glyph.unicodes = [codepoint]
                        break

            processed += 1
            if verbose and processed % 500 == 0:
                print(f"Processed {processed} glyphs...", file=sys.stderr)

        except Exception as e:
            if verbose:
                print(f"Warning: Failed to convert glyph {glyph_name}: {e}", file=sys.stderr)
            continue

    # Save UFO
    if verbose:
        print(f"Saving UFO to: {output_path}", file=sys.stderr)

    ufo_font.save(output_path, overwrite=True)

    if verbose:
        print(f"Successfully converted {processed} glyphs", file=sys.stderr)

    tt_font.close()


def main():
    parser = argparse.ArgumentParser(
        description="Convert font files to UFO format for editing"
    )
    parser.add_argument('font_path', help='Path to font file')
    parser.add_argument('--output', '-o', required=True, help='Output UFO path (e.g., output.ufo)')
    parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')

    args = parser.parse_args()

    font_path = Path(args.font_path)
    if not font_path.exists():
        print(f"Error: Font file not found: {font_path}", file=sys.stderr)
        sys.exit(1)

    output_path = Path(args.output)
    if not output_path.suffix == '.ufo':
        output_path = output_path.with_suffix('.ufo')

    try:
        convert_font_to_ufo(font_path, output_path, args.verbose)

        # Output success message as JSON for Claude
        import json
        result = {
            "success": True,
            "input": str(font_path),
            "output": str(output_path),
            "message": f"Successfully converted to UFO format"
        }
        print(json.dumps(result, indent=2))

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
