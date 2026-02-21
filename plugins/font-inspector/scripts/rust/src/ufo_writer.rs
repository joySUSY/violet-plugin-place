use crate::types::GlyphInfo;
use anyhow::{Context, Result};
use norad::{Font, Glyph};
use norad::fontinfo::NonNegativeIntegerOrFloat;
use std::path::Path;

/// Convert SVG path data to norad contours
///
/// This is a simplified implementation. Full SVG path parsing would require
/// a complete path parser. For production use, consider using a dedicated
/// SVG path parsing library.
///
/// # Note
/// Currently creates a placeholder glyph with width but no contours.
/// Full implementation would parse SVG path commands and convert to
/// norad's Contour/Point structures.
fn create_norad_glyph(glyph_info: &GlyphInfo) -> Result<Glyph> {
    let glyph_name = glyph_info.glyph_name.clone();

    let mut glyph = Glyph::new(&glyph_name);
    glyph.width = glyph_info.advance_width as f64;

    // Add Unicode mapping
    if let Some(codepoint) = parse_unicode_hex(&glyph_info.unicode) {
        if let Some(c) = char::from_u32(codepoint) {
            glyph.codepoints.insert(c);
        }
    }

    // TODO: Parse SVG path and convert to norad contours
    // This would require implementing a full SVG path parser
    // For now, we create a valid but empty glyph structure

    Ok(glyph)
}

/// Parse Unicode hex string like "U+4E00" to u32
fn parse_unicode_hex(unicode_str: &str) -> Option<u32> {
    let hex = unicode_str.trim_start_matches("U+");
    u32::from_str_radix(hex, 16).ok()
}

/// Write glyphs to UFO format
///
/// # Arguments
/// * `glyphs` - Vector of glyphs to write
/// * `font_name` - Font family name
/// * `upem` - Units per EM
/// * `output_path` - Output UFO directory path
///
/// # Errors
/// Returns error if UFO creation or writing fails
///
/// # Note
/// This implementation creates a valid UFO structure with glyph metadata
/// but does not include full outline data. For complete outline conversion,
/// a full SVG path parser would be needed.
pub fn write_ufo(
    glyphs: &[GlyphInfo],
    font_name: &str,
    upem: u16,
    output_path: &Path,
) -> Result<()> {
    let mut font = Font::new();

    // Set font metadata
    font.font_info.family_name = Some(font_name.to_string());
    font.font_info.units_per_em = Some(NonNegativeIntegerOrFloat::from(upem as u32));

    // Get default layer
    let layer = font.default_layer_mut();

    // Add glyphs
    for glyph_info in glyphs {
        match create_norad_glyph(glyph_info) {
            Ok(glyph) => {
                layer.insert_glyph(glyph);
            }
            Err(e) => {
                eprintln!("Warning: Failed to create glyph {}: {}", glyph_info.glyph_name, e);
            }
        }
    }

    // Save UFO
    font.save(output_path)
        .with_context(|| format!("Failed to save UFO to: {}", output_path.display()))?;

    Ok(())
}

/// Write UFO with progress tracking
///
/// # Arguments
/// * `glyphs` - Vector of glyphs to write
/// * `font_name` - Font family name
/// * `upem` - Units per EM
/// * `output_path` - Output UFO directory path
/// * `show_progress` - Whether to show progress
///
/// # Errors
/// Returns error if UFO creation or writing fails
pub fn write_ufo_with_progress(
    glyphs: &[GlyphInfo],
    font_name: &str,
    upem: u16,
    output_path: &Path,
    show_progress: bool,
) -> Result<()> {
    if show_progress {
        use indicatif::{ProgressBar, ProgressStyle};

        let pb = ProgressBar::new(glyphs.len() as u64);
        pb.set_style(
            ProgressStyle::default_bar()
                .template("[{elapsed_precise}] {bar:40.cyan/blue} {pos}/{len} {msg}")
                .expect("Invalid progress bar template")
                .progress_chars("=>-"),
        );
        pb.set_message("Creating UFO glyphs");

        let mut font = Font::new();
        font.font_info.family_name = Some(font_name.to_string());
        font.font_info.units_per_em = Some(NonNegativeIntegerOrFloat::from(upem as u32));

        let layer = font.default_layer_mut();

        for glyph_info in glyphs {
            match create_norad_glyph(glyph_info) {
                Ok(glyph) => {
                    layer.insert_glyph(glyph);
                }
                Err(e) => {
                    eprintln!("Warning: Failed to create glyph {}: {}", glyph_info.glyph_name, e);
                }
            }
            pb.inc(1);
        }

        pb.set_message("Saving UFO");
        font.save(output_path)
            .with_context(|| format!("Failed to save UFO to: {}", output_path.display()))?;

        pb.finish_with_message("UFO export complete");
    } else {
        write_ufo(glyphs, font_name, upem, output_path)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_unicode_hex_should_parse_valid_unicode() {
        assert_eq!(parse_unicode_hex("U+0041"), Some(0x41));
        assert_eq!(parse_unicode_hex("U+4E00"), Some(0x4E00));
        assert_eq!(parse_unicode_hex("U+1F600"), Some(0x1F600));
    }

    #[test]
    fn parse_unicode_hex_should_return_none_for_invalid() {
        assert_eq!(parse_unicode_hex("invalid"), None);
        assert_eq!(parse_unicode_hex("U+GGGG"), None);
    }

    #[test]
    fn create_norad_glyph_should_set_width_and_unicode() -> Result<()> {
        let glyph_info = GlyphInfo {
            glyph_name: "A".to_string(),
            unicode: "U+0041".to_string(),
            unicode_char: "A".to_string(),
            svg_path: "M 0 0 L 100 0".to_string(),
            advance_width: 600,
            bounding_box: None,
            contour_count: 1,
            point_count: 2,
        };

        let glyph = create_norad_glyph(&glyph_info)?;

        assert_eq!(glyph.width, 600.0);
        let codepoints: Vec<char> = glyph.codepoints.iter().collect();
        assert_eq!(codepoints, vec!['A']);

        Ok(())
    }
}
