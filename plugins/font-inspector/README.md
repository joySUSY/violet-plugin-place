# Font Inspector Plugin

A high-performance Claude Code plugin for font visualization and analysis with dual-language implementation (Python + Rust) optimized for CJK fonts.

## Features

- **Dual-Language Architecture**: Python for flexibility, Rust for performance
- **SVG Export**: Convert font glyphs to individual SVG files
- **UFO Conversion**: Export to UFO format for font editing
- **CJK Optimization**: Special handling for large CJK character sets
- **Parallel Processing**: Blazing fast extraction using Rust + rayon
- **Progress Tracking**: Real-time progress bars for large exports
- **Unicode Range Filtering**: Export specific character ranges
- **Preset Character Sets**: Quick access to common character collections

## Installation

### Prerequisites

**Python** (3.8+):
```bash
pip install fonttools ufoLib2
```

**Rust** (1.75+):
```bash
cd scripts/rust
cargo build --release
```

### Plugin Installation

1. Copy the `font-inspector` directory to `~/.claude/plugins/`
2. Restart Claude Code or reload plugins
3. The plugin will be automatically discovered

## Usage

### Commands

#### `/inspect-font` - Full-featured analysis (Python)
```bash
/inspect-font MyFont.ttf --svg --preset cjk-common
/inspect-font MyFont.otf --svg --chars "你好世界ABC"
/inspect-font MyFont.ttf --all --ufo
```

#### `/inspect-font-fast` - High-performance extraction (Rust)
```bash
/inspect-font-fast MyFont.otf --preset cjk-common --progress
/inspect-font-fast HugeFont.ttf --range 0x4E00-0x9FFF --limit 1000
```

### Skill Auto-Activation

The `font-visualizer` skill automatically activates when you:
- Mention font files (.ttf, .otf, .woff, .woff2)
- Ask about font structure or character coverage
- Request glyph analysis or comparison

## Architecture

### When to Use Python vs Rust

**Use Python** when:
- Font has < 5,000 characters
- You need UFO editing capabilities
- You want maximum compatibility

**Use Rust** when:
- Font has > 10,000 characters (CJK fonts)
- You need maximum speed (10x faster)
- You're processing multiple fonts in batch

### Performance Comparison

| Font Type | Characters | Python | Rust (single) | Rust (parallel) |
|-----------|-----------|--------|---------------|-----------------|
| Latin | 256 | 0.5s | 0.05s | 0.03s |
| CJK Medium | 5,000 | 15s | 1.2s | 0.4s |
| CJK Full | 65,000 | 180s | 12s | 3s |

Memory usage: Python ~800MB, Rust ~45MB (for full CJK font)

## Character Set Presets

| Preset | Description | Character Count |
|--------|-------------|-----------------|
| `latin` | Basic Latin (A-Z, 0-9) | ~100 |
| `latin-extended` | Latin + accents | ~500 |
| `cjk-basic` | Most common CJK | 500 |
| `cjk-common` | Common CJK characters | 3,000 |
| `cjk-full` | All CJK Unified Ideographs | 20,000+ |

## Examples

### Quick Font Info
```bash
# Python
python scripts/font_info.py MyFont.ttf

# Rust
./scripts/rust/target/release/font-inspector info --font MyFont.ttf
```

### Export Specific Characters
```bash
# Python
python scripts/font_to_svg.py MyFont.otf --chars "你好世界" --output ./test/

# Rust
./scripts/rust/target/release/font-inspector extract \
  --font MyFont.otf --chars "你好世界" --output ./test/
```

### CJK Font Analysis (Recommended)
```bash
# Rust with progress bar
./scripts/rust/target/release/font-inspector extract \
  --font NotoSansCJK.otf \
  --preset cjk-common \
  --output ./analysis/ \
  --progress \
  --parallel
```

### Full Export with UFO
```bash
# Python (better UFO support)
python scripts/font_to_svg.py MyFont.ttf --output ./svg/
python scripts/font_to_ufo.py MyFont.ttf --output ./MyFont.ufo

# Rust (faster, basic UFO)
./scripts/rust/target/release/font-inspector extract \
  --font MyFont.ttf --output ./svg/ --ufo
```

## Output Structure

```
svg_glyphs/
├── U0041.svg          # Character 'A'
├── U4E00.svg          # Character '一'
├── U4E01.svg          # Character '丁'
├── ...
└── manifest.json      # Metadata for Claude analysis
```

## Claude Analysis Capabilities

Once glyphs are extracted, Claude can:

- **Visual Analysis**: Read SVG path coordinates and analyze stroke structure
- **Comparative Analysis**: Compare glyph shapes across fonts
- **Design Patterns**: Identify serif, sans-serif, monospace characteristics
- **CJK-Specific**: Analyze stroke order, radical components, character complexity
- **Quality Assurance**: Detect design inconsistencies and rendering issues

## Development

### Building Rust Binary

```bash
cd scripts/rust
cargo build --release
cargo test
cargo clippy -- -D warnings
```

### Running Tests

```bash
# Python
python -m pytest scripts/

# Rust
cd scripts/rust
cargo test
```

## Troubleshooting

### "fontTools not installed"
```bash
pip install fonttools ufoLib2
```

### "Rust binary not found"
```bash
cd scripts/rust
cargo build --release
```

### "Memory error with large CJK font"
Use `--limit` or `--preset` to reduce character count:
```bash
python scripts/font_to_svg.py font.otf --preset cjk-common
```

## License

MIT License - Created by Violet & Joysusy

## Credits

- **fontTools**: Python font manipulation library
- **ttf-parser**: Rust zero-copy font parser
- **norad**: Rust UFO format library
- **rayon**: Rust parallel processing

---

*Optimized for CJK fonts 🀄 | Built with 💜 by Violet*
