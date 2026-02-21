mod extractor;
mod svg_writer;
mod types;
mod ufo_writer;

use anyhow::{Context, Result};
use clap::{Parser, Subcommand};
use std::fs;
use std::path::PathBuf;
use ttf_parser::Face;

use types::{CharsetPreset, FontMetadata, FontReport, UnicodeRange};

#[derive(Parser)]
#[command(
    name = "font-inspector",
    version = "1.0.0",
    about = "High-performance font analysis tool with SVG/UFO export",
    long_about = "Font Inspector - Blazing fast font analysis and visualization\n\
                  Optimized for CJK fonts with parallel processing and memory efficiency."
)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Extract glyphs as SVG files with optional UFO export
    Extract {
        /// Path to font file (TTF, OTF, WOFF, WOFF2)
        #[arg(short, long)]
        font: PathBuf,

        /// Output directory for SVG files
        #[arg(short, long, default_value = "./svg_glyphs")]
        output: PathBuf,

        /// Specific characters to export (e.g., "ABC你好")
        #[arg(long)]
        chars: Option<String>,

        /// Unicode range to export (e.g., "0x4E00-0x9FFF")
        #[arg(long)]
        range: Option<String>,

        /// Use predefined character set
        #[arg(long, value_parser = parse_preset)]
        preset: Option<CharsetPreset>,

        /// Maximum number of characters to export
        #[arg(long)]
        limit: Option<usize>,

        /// Also export as UFO format
        #[arg(long)]
        ufo: bool,

        /// Output JSON only, no SVG files (for Claude analysis)
        #[arg(long)]
        json_only: bool,

        /// Show progress bar
        #[arg(long)]
        progress: bool,

        /// Use parallel processing (faster for large fonts)
        #[arg(long, default_value = "true")]
        parallel: bool,
    },

    /// Display font metadata and information
    Info {
        /// Path to font file
        #[arg(short, long)]
        font: PathBuf,

        /// Output format: json or text
        #[arg(long, default_value = "json")]
        format: String,
    },
}

fn parse_preset(s: &str) -> Result<CharsetPreset, String> {
    CharsetPreset::from_str(s).ok_or_else(|| {
        format!(
            "Invalid preset: {}. Valid options: latin, latin-extended, cjk-basic, cjk-common, cjk-full",
            s
        )
    })
}

/// Determine which codepoints to extract based on command arguments
fn get_codepoints(
    face: &Face,
    chars: &Option<String>,
    range: &Option<String>,
    preset: &Option<CharsetPreset>,
    limit: &Option<usize>,
) -> Result<Vec<u32>> {
    // Get all available codepoints from font
    let cmap = face
        .tables()
        .cmap
        .context("No character map table found in font")?;

    let subtable = cmap
        .subtables
        .into_iter()
        .find(|st| st.is_unicode())
        .context("No Unicode cmap subtable found")?;

    let mut all_codepoints = Vec::new();
    subtable.codepoints(|cp| {
        all_codepoints.push(cp);
    });

    // Filter based on arguments
    let mut result = if let Some(chars_str) = chars {
        // Explicit characters
        chars_str
            .chars()
            .map(|c| c as u32)
            .filter(|cp| all_codepoints.contains(cp))
            .collect()
    } else if let Some(range_str) = range {
        // Unicode range
        let unicode_range = UnicodeRange::parse(range_str)?;
        all_codepoints
            .into_iter()
            .filter(|cp| unicode_range.contains(*cp))
            .collect()
    } else if let Some(preset_val) = preset {
        // Preset
        let preset_range = preset_val.get_range();
        let mut filtered: Vec<u32> = all_codepoints
            .into_iter()
            .filter(|cp| preset_range.contains(*cp))
            .collect();

        // Apply preset-specific limit
        if let Some(preset_limit) = preset_val.get_limit() {
            filtered.truncate(preset_limit);
        }

        filtered
    } else {
        // All characters
        all_codepoints
    };

    // Apply explicit limit
    if let Some(limit_val) = limit {
        result.truncate(*limit_val);
    }

    Ok(result)
}

struct ExtractConfig {
    font: PathBuf,
    output: PathBuf,
    chars: Option<String>,
    range: Option<String>,
    preset: Option<CharsetPreset>,
    limit: Option<usize>,
    ufo: bool,
    json_only: bool,
    progress: bool,
    parallel: bool,
}

fn run_extract(config: ExtractConfig) -> Result<()> {
    // Load font
    let font_data = fs::read(&config.font).context("Failed to read font file")?;
    let face = Face::parse(&font_data, 0).context("Failed to parse font")?;

    let upem = face.units_per_em();
    let glyph_count = face.number_of_glyphs();

    // Get font name
    let font_name = face
        .names()
        .into_iter()
        .find(|n| n.name_id == ttf_parser::name_id::FAMILY)
        .and_then(|n| n.to_string())
        .unwrap_or_else(|| {
            config.font.file_stem()
                .and_then(|s| s.to_str())
                .unwrap_or("Unknown")
                .to_string()
        });

    // Determine codepoints to extract
    let codepoints = get_codepoints(&face, &config.chars, &config.range, &config.preset, &config.limit)?;

    if config.progress {
        eprintln!("Extracting {} characters from font...", codepoints.len());
    }

    // Extract glyphs
    let glyphs = if config.parallel {
        extractor::extract_glyphs_parallel(&face, &codepoints)
    } else {
        codepoints
            .iter()
            .filter_map(|&cp| {
                let c = char::from_u32(cp)?;
                let subtable = face.tables().cmap?.subtables.into_iter().find(|st| st.is_unicode())?;
                let glyph_id = subtable.glyph_index(cp)?;
                extractor::extract_glyph(&face, glyph_id, c)
            })
            .collect()
    };

    // Write SVG files
    if !config.json_only {
        if config.parallel && glyphs.len() > 100 {
            svg_writer::write_all_glyphs_parallel(&glyphs, &config.output, upem, config.progress)?;
        } else {
            svg_writer::write_all_glyphs(&glyphs, &config.output, upem, config.progress)?;
        }

        // Write UFO if requested
        if config.ufo {
            let ufo_path = config.output.with_extension("ufo");
            ufo_writer::write_ufo_with_progress(&glyphs, &font_name, upem, &ufo_path, config.progress)?;
        }
    }

    // Output JSON report (always to stdout for Claude)
    let report = FontReport {
        font_file: config.font.display().to_string(),
        family_name: Some(font_name),
        units_per_em: upem,
        glyph_count,
        total_exported: glyphs.len(),
        glyphs,
    };

    let json = serde_json::to_string_pretty(&report)?;
    println!("{}", json);

    Ok(())
}

fn run_info(font: PathBuf, format: String) -> Result<()> {
    let font_data = fs::read(&font).context("Failed to read font file")?;
    let face = Face::parse(&font_data, 0).context("Failed to parse font")?;

    let family_name = face
        .names()
        .into_iter()
        .find(|n| n.name_id == ttf_parser::name_id::FAMILY)
        .and_then(|n| n.to_string());

    let metadata = FontMetadata {
        font_file: font.display().to_string(),
        family_name,
        units_per_em: face.units_per_em(),
        glyph_count: face.number_of_glyphs(),
        is_variable: face.is_variable(),
        has_cff: face.tables().cff.is_some(),
        has_glyf: face.tables().glyf.is_some(),
        ascender: Some(face.ascender()),
        descender: Some(face.descender()),
        line_gap: Some(face.line_gap()),
    };

    match format.as_str() {
        "json" => {
            let json = serde_json::to_string_pretty(&metadata)?;
            println!("{}", json);
        }
        "text" => {
            println!("Font: {}", metadata.font_file);
            if let Some(name) = metadata.family_name {
                println!("Family: {}", name);
            }
            println!("Units per EM: {}", metadata.units_per_em);
            println!("Glyph count: {}", metadata.glyph_count);
            println!("Variable font: {}", metadata.is_variable);
            println!("Has CFF outlines: {}", metadata.has_cff);
            println!("Has TrueType outlines: {}", metadata.has_glyf);
            if let Some(asc) = metadata.ascender {
                println!("Ascender: {}", asc);
            }
            if let Some(desc) = metadata.descender {
                println!("Descender: {}", desc);
            }
            if let Some(gap) = metadata.line_gap {
                println!("Line gap: {}", gap);
            }
        }
        _ => anyhow::bail!("Invalid format: {}. Use 'json' or 'text'", format),
    }

    Ok(())
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Extract {
            font,
            output,
            chars,
            range,
            preset,
            limit,
            ufo,
            json_only,
            progress,
            parallel,
        } => run_extract(ExtractConfig {
            font,
            output,
            chars,
            range,
            preset,
            limit,
            ufo,
            json_only,
            progress,
            parallel,
        }),
        Commands::Info { font, format } => run_info(font, format),
    }
}
