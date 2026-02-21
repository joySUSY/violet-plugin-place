use crate::types::GlyphInfo;
use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

/// Write a single glyph as an SVG file
///
/// # Arguments
/// * `glyph` - Glyph information including SVG path data
/// * `output_dir` - Directory to write SVG file
/// * `upem` - Units per EM from font (for viewBox)
///
/// # Errors
/// Returns error if file write fails
pub fn write_glyph_svg(glyph: &GlyphInfo, output_dir: &Path, upem: u16) -> Result<()> {
    let height = upem as i32;

    let svg = format!(
        r#"<svg xmlns="http://www.w3.org/2000/svg"
     width="{upem}" height="{height}"
     viewBox="0 -{height} {upem} {height}">
  <!-- Glyph: {name} | Unicode: {unicode} | Char: {char} -->
  <path d="{path}" fill="currentColor"/>
</svg>"#,
        upem = upem,
        height = height,
        name = glyph.glyph_name,
        unicode = glyph.unicode,
        char = glyph.unicode_char,
        path = glyph.svg_path,
    );

    // Safe filename: use Unicode hex without '+'
    let safe_name = glyph.unicode.replace('+', "");
    let out_path = output_dir.join(format!("{}.svg", safe_name));

    fs::write(&out_path, svg)
        .with_context(|| format!("Failed to write SVG file: {}", out_path.display()))?;

    Ok(())
}

/// Write all glyphs as SVG files with progress tracking
///
/// # Arguments
/// * `glyphs` - Vector of glyphs to write
/// * `output_dir` - Directory to write SVG files
/// * `upem` - Units per EM from font
/// * `show_progress` - Whether to show progress bar
///
/// # Errors
/// Returns error if directory creation or file writes fail
pub fn write_all_glyphs(
    glyphs: &[GlyphInfo],
    output_dir: &Path,
    upem: u16,
    show_progress: bool,
) -> Result<()> {
    // Create output directory
    fs::create_dir_all(output_dir)
        .with_context(|| format!("Failed to create directory: {}", output_dir.display()))?;

    if show_progress {
        use indicatif::{ProgressBar, ProgressStyle};

        let pb = ProgressBar::new(glyphs.len() as u64);
        pb.set_style(
            ProgressStyle::default_bar()
                .template("[{elapsed_precise}] {bar:40.cyan/blue} {pos}/{len} {msg}")
                .expect("Invalid progress bar template")
                .progress_chars("=>-"),
        );

        for glyph in glyphs {
            write_glyph_svg(glyph, output_dir, upem)?;
            pb.inc(1);
        }

        pb.finish_with_message("SVG export complete");
    } else {
        // No progress bar - just write files
        for glyph in glyphs {
            write_glyph_svg(glyph, output_dir, upem)?;
        }
    }

    Ok(())
}

/// Write glyphs in parallel with progress tracking
///
/// Uses rayon for parallel file writes. Faster for large character sets.
///
/// # Arguments
/// * `glyphs` - Vector of glyphs to write
/// * `output_dir` - Directory to write SVG files
/// * `upem` - Units per EM from font
/// * `show_progress` - Whether to show progress bar
///
/// # Errors
/// Returns error if directory creation or file writes fail
pub fn write_all_glyphs_parallel(
    glyphs: &[GlyphInfo],
    output_dir: &Path,
    upem: u16,
    show_progress: bool,
) -> Result<()> {
    use rayon::prelude::*;

    // Create output directory
    fs::create_dir_all(output_dir)
        .with_context(|| format!("Failed to create directory: {}", output_dir.display()))?;

    if show_progress {
        use indicatif::{ParallelProgressIterator, ProgressBar, ProgressStyle};

        let pb = ProgressBar::new(glyphs.len() as u64);
        pb.set_style(
            ProgressStyle::default_bar()
                .template("[{elapsed_precise}] {bar:40.cyan/blue} {pos}/{len} {msg}")
                .expect("Invalid progress bar template")
                .progress_chars("=>-"),
        );

        glyphs
            .par_iter()
            .progress_with(pb)
            .try_for_each(|glyph| write_glyph_svg(glyph, output_dir, upem))?;
    } else {
        // Parallel without progress bar
        glyphs
            .par_iter()
            .try_for_each(|glyph| write_glyph_svg(glyph, output_dir, upem))?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::GlyphInfo;
    use std::fs;
    use tempfile::TempDir;

    fn create_test_glyph() -> GlyphInfo {
        GlyphInfo {
            glyph_name: "A".to_string(),
            unicode: "U+0041".to_string(),
            unicode_char: "A".to_string(),
            svg_path: "M 0 0 L 100 0 L 50 100 Z".to_string(),
            advance_width: 600,
            bounding_box: None,
            contour_count: 1,
            point_count: 3,
        }
    }

    #[test]
    fn write_glyph_svg_should_create_valid_svg_file() -> Result<()> {
        let temp_dir = TempDir::new()?;
        let glyph = create_test_glyph();

        write_glyph_svg(&glyph, temp_dir.path(), 1000)?;

        let svg_path = temp_dir.path().join("U0041.svg");
        assert!(svg_path.exists());

        let content = fs::read_to_string(svg_path)?;
        assert!(content.contains("xmlns=\"http://www.w3.org/2000/svg\""));
        assert!(content.contains("M 0 0 L 100 0 L 50 100 Z"));

        Ok(())
    }

    #[test]
    fn write_all_glyphs_should_create_multiple_files() -> Result<()> {
        let temp_dir = TempDir::new()?;
        let glyphs = vec![
            GlyphInfo {
                glyph_name: "A".to_string(),
                unicode: "U+0041".to_string(),
                unicode_char: "A".to_string(),
                svg_path: "M 0 0 L 100 0".to_string(),
                advance_width: 600,
                bounding_box: None,
                contour_count: 1,
                point_count: 2,
            },
            GlyphInfo {
                glyph_name: "B".to_string(),
                unicode: "U+0042".to_string(),
                unicode_char: "B".to_string(),
                svg_path: "M 0 0 L 100 0".to_string(),
                advance_width: 600,
                bounding_box: None,
                contour_count: 1,
                point_count: 2,
            },
            GlyphInfo {
                glyph_name: "C".to_string(),
                unicode: "U+0043".to_string(),
                unicode_char: "C".to_string(),
                svg_path: "M 0 0 L 100 0".to_string(),
                advance_width: 600,
                bounding_box: None,
                contour_count: 1,
                point_count: 2,
            },
        ];

        write_all_glyphs(&glyphs, temp_dir.path(), 1000, false)?;

        let files: Vec<_> = fs::read_dir(temp_dir.path())?.collect();
        assert_eq!(files.len(), 3);

        Ok(())
    }
}
