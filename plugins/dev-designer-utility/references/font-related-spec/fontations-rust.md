# 🦀 Fontations Ecosystem — Rust Font Processing (Rust字体处理生态)

Fontations is Google Fonts' production-grade Rust library family for reading, writing, and manipulating OpenType font files. It replaces FreeType in Chromium and serves as the canonical Rust font backend for Google's entire font infrastructure. As of 2025, it is the most actively maintained Rust font toolchain available.

## 1. Crate Architecture (板条箱架构)

| Crate | Purpose | Allocation | Key Traits |
|-------|---------|-----------|------------|
| `font-types` | Core data types (Tags, Fixed, FWord, etc.) | Zero-alloc | `Scalar`, `ReadScalar`, `BigEndian` |
| `read-fonts` | Parse font tables from raw bytes | Zero-alloc, zero-copy | `FontRef`, `TableProvider`, `FontRead` |
| `write-fonts` | Build and compile font data | Allocating | `FontWrite`, `Compile`, `TableWriter` |
| `skrifa` | High-level font access (metadata, outlines) | Minimal alloc | `FontRef`, `MetadataProvider`, `OutlineGlyph` |
| `font-codegen` | Auto-generate table parsing code from spec | Build-time only | Code generator (not runtime) |
| `otexplorer` | CLI tool for inspecting font tables | N/A | Binary, not a library |

### Dependency Flow

```
font-types (primitives)
    ↑
read-fonts (zero-copy parser)
    ↑           ↑
skrifa      write-fonts
(high-level)  (font compiler)
```

## 2. Core Patterns (核心模式)

### Reading a Font File

```rust
use read_fonts::{FontRef, TableProvider};
use skrifa::MetadataProvider;

// Zero-copy: font_data must outlive font_ref
let font_data = std::fs::read("font.ttf")?;
let font_ref = FontRef::new(&font_data)?;

// Access any table
let head = font_ref.head()?;
let units_per_em = head.units_per_em();

// High-level metadata via skrifa
let family_name = font_ref.localized_strings(skrifa::string::StringId::FAMILY_NAME)
    .english_or_first()
    .map(|s| s.to_string());
```

### Extracting Glyph Outlines

```rust
use skrifa::{instance::Size, outline::DrawSettings, FontRef, MetadataProvider};

let font_ref = FontRef::new(&font_data)?;
let outlines = font_ref.outline_glyphs();
let glyph_id = font_ref.charmap().map('A').unwrap();

let settings = DrawSettings::unhinted(Size::new(1000.0));
let mut pen = MyPathSink::new();  // Implement OutlinePen trait
outlines.get(glyph_id)?.draw(settings, &mut pen)?;
```

### The OutlinePen Trait

```rust
use skrifa::outline::OutlinePen;

struct SvgPathBuilder {
    commands: Vec<String>,
}

impl OutlinePen for SvgPathBuilder {
    fn move_to(&mut self, x: f32, y: f32) {
        self.commands.push(format!("M{x},{y}"));
    }
    fn line_to(&mut self, x: f32, y: f32) {
        self.commands.push(format!("L{x},{y}"));
    }
    fn quad_to(&mut self, cx0: f32, cy0: f32, x: f32, y: f32) {
        self.commands.push(format!("Q{cx0},{cy0} {x},{y}"));
    }
    fn curve_to(&mut self, cx0: f32, cy0: f32, cx1: f32, cy1: f32, x: f32, y: f32) {
        self.commands.push(format!("C{cx0},{cy0} {cx1},{cy1} {x},{y}"));
    }
    fn close(&mut self) {
        self.commands.push("Z".into());
    }
}
```

### Writing / Compiling Fonts

```rust
use write_fonts::{
    tables::head::Head,
    tables::cmap::Cmap,
    FontBuilder,
};

let mut font = FontBuilder::new();
font.add_table(&my_head_table)?;
font.add_table(&my_cmap_table)?;
font.add_table(&my_glyf_table)?;

let compiled_bytes = font.build();
std::fs::write("output.ttf", &compiled_bytes)?;
```

## 3. Integration Contexts (集成环境)

| Context | Crate to Use | Pattern |
|---------|-------------|---------|
| Font validation / inspection | `read-fonts` | Parse tables, check invariants |
| Glyph rendering / rasterization | `skrifa` | Outline extraction → path → rasterizer |
| Font subsetting | `read-fonts` + `write-fonts` | Read tables, filter glyphs, recompile |
| Font compilation (from sources) | `write-fonts` | Build tables from scratch |
| Chromium integration | `skrifa` | `SkTypeface` backend via FFI bridge |
| CJK glyph manipulation | `read-fonts` + custom transform | Parse glyph points, transform, write back |

## 4. Relationship to Other Rust Font Crates

| Crate | Status | Relationship to fontations |
|-------|--------|--------------------------|
| `ttf-parser` | Stable, widely used | Alternative zero-copy parser; fontations is more comprehensive |
| `owned-ttf-parser` | Stable | Owned-data variant of ttf-parser |
| `fonttools-rs` | Experimental | Python fonttools port; fontations is preferred for new Rust projects |
| `allsorts` | Stable | Font shaping; complements fontations (which focuses on parsing/writing) |
| `rustybuzz` | Stable | Harfbuzz port; use alongside fontations for text shaping |
| `swash` | Stable | Font introspection + rasterization; fontations' skrifa is the alternative |

## 5. Anti-Patterns (反模式)

```
❌ Holding entire font in memory when only reading one table (use read-fonts lazy access)
❌ Cloning font data — read-fonts is zero-copy by design
❌ Using fonttools (Python) for Rust projects — fontations is native
❌ Ignoring lifetime constraints on FontRef (font_data must outlive all references)
❌ Writing font tables without recalculating checksums (write-fonts handles this)
❌ Mixing fontations with ttf-parser in the same pipeline (choose one parser)
```
