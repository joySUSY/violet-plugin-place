use serde::{Deserialize, Serialize};

/// Bounding box for a glyph
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BBox {
    pub x_min: i16,
    pub y_min: i16,
    pub x_max: i16,
    pub y_max: i16,
}

/// Complete information about a single glyph
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GlyphInfo {
    pub glyph_name: String,
    pub unicode: String,
    pub unicode_char: String,
    pub svg_path: String,
    pub advance_width: u16,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub bounding_box: Option<BBox>,
    pub contour_count: usize,
    pub point_count: usize,
}

/// Complete font analysis report
#[derive(Debug, Serialize, Deserialize)]
pub struct FontReport {
    pub font_file: String,
    pub family_name: Option<String>,
    pub units_per_em: u16,
    pub glyph_count: u16,
    pub total_exported: usize,
    pub glyphs: Vec<GlyphInfo>,
}

/// Font metadata for info command
#[derive(Debug, Serialize, Deserialize)]
pub struct FontMetadata {
    pub font_file: String,
    pub family_name: Option<String>,
    pub units_per_em: u16,
    pub glyph_count: u16,
    pub is_variable: bool,
    pub has_cff: bool,
    pub has_glyf: bool,
    pub ascender: Option<i16>,
    pub descender: Option<i16>,
    pub line_gap: Option<i16>,
}

/// Character range specification
#[derive(Debug, Clone)]
pub struct UnicodeRange {
    pub start: u32,
    pub end: u32,
}

impl UnicodeRange {
    pub fn parse(s: &str) -> anyhow::Result<Self> {
        let parts: Vec<&str> = s.split('-').collect();
        if parts.len() != 2 {
            anyhow::bail!("Invalid range format. Expected: 0x4E00-0x9FFF");
        }

        let start = u32::from_str_radix(parts[0].trim_start_matches("0x"), 16)?;
        let end = u32::from_str_radix(parts[1].trim_start_matches("0x"), 16)?;

        if start > end {
            anyhow::bail!("Invalid range: start must be <= end");
        }

        Ok(Self { start, end })
    }

    pub fn contains(&self, codepoint: u32) -> bool {
        codepoint >= self.start && codepoint <= self.end
    }
}

/// Predefined character set presets
#[derive(Debug, Clone, Copy)]
pub enum CharsetPreset {
    Latin,
    LatinExtended,
    CjkBasic,
    CjkCommon,
    CjkFull,
}

impl CharsetPreset {
    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "latin" => Some(Self::Latin),
            "latin-extended" => Some(Self::LatinExtended),
            "cjk-basic" => Some(Self::CjkBasic),
            "cjk-common" => Some(Self::CjkCommon),
            "cjk-full" => Some(Self::CjkFull),
            _ => None,
        }
    }

    pub fn get_range(&self) -> UnicodeRange {
        match self {
            Self::Latin => UnicodeRange { start: 0x0020, end: 0x007F },
            Self::LatinExtended => UnicodeRange { start: 0x0020, end: 0x024F },
            Self::CjkBasic => UnicodeRange { start: 0x4E00, end: 0x4EFF },
            Self::CjkCommon => UnicodeRange { start: 0x4E00, end: 0x9FFF },
            Self::CjkFull => UnicodeRange { start: 0x4E00, end: 0x9FFF },
        }
    }

    pub fn get_limit(&self) -> Option<usize> {
        match self {
            Self::CjkBasic => Some(500),
            Self::CjkCommon => Some(3000),
            _ => None,
        }
    }
}
