use ttf_parser::{Face, GlyphId, OutlineBuilder};
use crate::types::{BBox, GlyphInfo};

/// SVG path builder implementing ttf-parser's OutlineBuilder trait
///
/// Converts font outline commands to SVG path data format.
/// Note: Y-axis is flipped because font coordinate system has Y pointing up,
/// while SVG has Y pointing down.
struct SvgPathBuilder {
    path: String,
    contour_count: usize,
    point_count: usize,
}

impl SvgPathBuilder {
    fn new() -> Self {
        Self {
            path: String::with_capacity(256), // Pre-allocate for typical glyph
            contour_count: 0,
            point_count: 0,
        }
    }

    fn finish(self) -> (String, usize, usize) {
        (self.path, self.contour_count, self.point_count)
    }
}

impl OutlineBuilder for SvgPathBuilder {
    fn move_to(&mut self, x: f32, y: f32) {
        use std::fmt::Write;
        // Y-axis flip: font coordinates have Y up, SVG has Y down
        let _ = write!(self.path, "M {:.2} {:.2} ", x, -y);
        self.contour_count += 1;
        self.point_count += 1;
    }

    fn line_to(&mut self, x: f32, y: f32) {
        use std::fmt::Write;
        let _ = write!(self.path, "L {:.2} {:.2} ", x, -y);
        self.point_count += 1;
    }

    fn quad_to(&mut self, x1: f32, y1: f32, x: f32, y: f32) {
        use std::fmt::Write;
        // TrueType quadratic Bézier → SVG Q command
        let _ = write!(self.path, "Q {:.2} {:.2} {:.2} {:.2} ", x1, -y1, x, -y);
        self.point_count += 2;
    }

    fn curve_to(&mut self, x1: f32, y1: f32, x2: f32, y2: f32, x: f32, y: f32) {
        use std::fmt::Write;
        // CFF cubic Bézier → SVG C command
        let _ = write!(
            self.path,
            "C {:.2} {:.2} {:.2} {:.2} {:.2} {:.2} ",
            x1, -y1, x2, -y2, x, -y
        );
        self.point_count += 3;
    }

    fn close(&mut self) {
        self.path.push_str("Z ");
    }
}

/// Extract a single glyph's outline and metadata
///
/// # Arguments
/// * `face` - Parsed font face
/// * `glyph_id` - Glyph identifier
/// * `unicode` - Unicode character this glyph represents
///
/// # Returns
/// `Some(GlyphInfo)` if glyph has an outline, `None` otherwise
pub fn extract_glyph(face: &Face, glyph_id: GlyphId, unicode: char) -> Option<GlyphInfo> {
    let mut builder = SvgPathBuilder::new();

    // Draw outline - ttf-parser calls builder methods
    face.outline_glyph(glyph_id, &mut builder)?;

    let (svg_path, contour_count, point_count) = builder.finish();

    // Skip empty glyphs (e.g., space character)
    if svg_path.trim().is_empty() {
        return None;
    }

    // Extract bounding box
    let bounding_box = face.glyph_bounding_box(glyph_id).map(|bbox| BBox {
        x_min: bbox.x_min,
        y_min: bbox.y_min,
        x_max: bbox.x_max,
        y_max: bbox.y_max,
    });

    // Get horizontal advance width
    let advance_width = face.glyph_hor_advance(glyph_id).unwrap_or(0);

    Some(GlyphInfo {
        glyph_name: format!("uni{:04X}", unicode as u32),
        unicode: format!("U+{:04X}", unicode as u32),
        unicode_char: unicode.to_string(),
        svg_path: svg_path.trim().to_string(),
        advance_width,
        bounding_box,
        contour_count,
        point_count,
    })
}

/// Extract glyphs for a set of Unicode codepoints in parallel
///
/// # Arguments
/// * `face` - Parsed font face
/// * `codepoints` - Set of Unicode codepoints to extract
///
/// # Returns
/// Vector of successfully extracted glyphs
pub fn extract_glyphs_parallel(
    face: &Face,
    codepoints: &[u32],
) -> Vec<GlyphInfo> {
    use rayon::prelude::*;

    // Build codepoint → glyph_id mapping
    let cmap = match face.tables().cmap {
        Some(cmap) => cmap,
        None => return Vec::new(),
    };

    // Find Unicode subtable
    let subtable = cmap
        .subtables
        .into_iter()
        .find(|st| st.is_unicode())
        .expect("No Unicode cmap subtable found");

    // Map codepoints to (char, GlyphId) pairs
    let pairs: Vec<(char, GlyphId)> = codepoints
        .iter()
        .filter_map(|&cp| {
            let c = char::from_u32(cp)?;
            let glyph_id = subtable.glyph_index(cp)?;
            Some((c, glyph_id))
        })
        .collect();

    // Parallel extraction using rayon
    // Safety: Face is immutable and thread-safe for reading
    pairs
        .par_iter()
        .filter_map(|&(c, gid)| extract_glyph(face, gid, c))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn svg_path_builder_should_format_move_command() {
        let mut builder = SvgPathBuilder::new();
        builder.move_to(100.0, 200.0);
        let (path, _, _) = builder.finish();
        assert_eq!(path.trim(), "M 100.00 -200.00");
    }

    #[test]
    fn svg_path_builder_should_flip_y_axis() {
        let mut builder = SvgPathBuilder::new();
        builder.move_to(0.0, 100.0);
        builder.line_to(50.0, 100.0);
        let (path, _, _) = builder.finish();
        assert!(path.contains("-100.00"));
    }
}
