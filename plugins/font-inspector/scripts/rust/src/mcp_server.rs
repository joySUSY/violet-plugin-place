// Authors: Joysusy & Violet Klaudia 💖
//! Font Inspector MCP Server — JSON-RPC 2.0 over stdio
//! Provides 5 tools: extract_glyph, extract_all, convert_ufo, compare_glyphs, analyze_metrics
//! Stateful: caches parsed font data in memory for fast repeated access

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;
use std::io::{self, BufRead, Write};
use std::path::{Path, PathBuf};

use font_inspector::extractor;
use font_inspector::svg_writer;
use font_inspector::ufo_writer;
use font_inspector::types::UnicodeRange;

const SERVER_NAME: &str = "font-inspector-mcp";
const SERVER_VERSION: &str = "2.0.0";
const PROTOCOL_VERSION: &str = "2024-11-05";

#[derive(Deserialize)]
#[allow(dead_code)]
struct JsonRpcRequest {
    jsonrpc: String,
    id: Option<Value>,
    method: String,
    #[serde(default)]
    params: Value,
}

#[derive(Serialize)]
struct JsonRpcResponse {
    jsonrpc: String,
    id: Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<JsonRpcError>,
}

#[derive(Serialize)]
struct JsonRpcError {
    code: i64,
    message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<Value>,
}

struct FontCache {
    data: HashMap<PathBuf, Vec<u8>>,
}

impl FontCache {
    fn new() -> Self {
        Self { data: HashMap::new() }
    }

    fn load_font(&mut self, path: &Path) -> Result<&[u8]> {
        if !self.data.contains_key(path) {
            let bytes = std::fs::read(path)
                .with_context(|| format!("Failed to read font: {}", path.display()))?;
            self.data.insert(path.to_path_buf(), bytes);
        }
        Ok(self.data.get(path).unwrap())
    }
}

fn make_response(id: Value, result: Value) -> JsonRpcResponse {
    JsonRpcResponse { jsonrpc: "2.0".into(), id, result: Some(result), error: None }
}

fn make_error(id: Value, code: i64, message: String) -> JsonRpcResponse {
    JsonRpcResponse {
        jsonrpc: "2.0".into(), id,
        result: None,
        error: Some(JsonRpcError { code, message, data: None }),
    }
}

fn make_text_content(text: &str) -> Value {
    json!({ "content": [{ "type": "text", "text": text }] })
}

fn handle_initialize(id: Value) -> JsonRpcResponse {
    make_response(id, json!({
        "protocolVersion": PROTOCOL_VERSION,
        "capabilities": {
            "tools": { "listChanged": false },
            "resources": { "subscribe": false, "listChanged": false }
        },
        "serverInfo": { "name": SERVER_NAME, "version": SERVER_VERSION }
    }))
}

fn handle_tools_list(id: Value) -> JsonRpcResponse {
    make_response(id, json!({
        "tools": [
            {
                "name": "extract_glyph",
                "description": "Extract a single glyph from a font file as SVG path data with metrics",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "font_path": { "type": "string", "description": "Absolute path to font file (.ttf, .otf)" },
                        "character": { "type": "string", "description": "Single character to extract (e.g. 'A' or '你')" }
                    },
                    "required": ["font_path", "character"]
                }
            },
            {
                "name": "extract_all",
                "description": "Extract multiple glyphs from a font. Supports character lists, Unicode ranges, and presets (latin, cjk-basic, cjk-common, cjk-full)",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "font_path": { "type": "string", "description": "Absolute path to font file" },
                        "chars": { "type": "string", "description": "Characters to extract (e.g. 'Hello你好')" },
                        "range": { "type": "string", "description": "Unicode range (e.g. '0x4E00-0x4EFF')" },
                        "preset": { "type": "string", "description": "Preset: latin, latin-extended, cjk-basic, cjk-common, cjk-full" },
                        "limit": { "type": "integer", "description": "Max glyphs to extract" },
                        "output_dir": { "type": "string", "description": "Directory to write SVG files (optional, returns JSON if omitted)" }
                    },
                    "required": ["font_path"]
                }
            },
            {
                "name": "convert_ufo",
                "description": "Convert extracted glyphs to UFO (Unified Font Object) format for editing in font editors",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "font_path": { "type": "string", "description": "Absolute path to font file" },
                        "output_path": { "type": "string", "description": "Output UFO directory path" },
                        "chars": { "type": "string", "description": "Characters to include" },
                        "range": { "type": "string", "description": "Unicode range" },
                        "preset": { "type": "string", "description": "Preset name" }
                    },
                    "required": ["font_path", "output_path"]
                }
            },
            {
                "name": "compare_glyphs",
                "description": "Compare the same character across two fonts, returning SVG paths and metrics for both",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "font_a": { "type": "string", "description": "Path to first font" },
                        "font_b": { "type": "string", "description": "Path to second font" },
                        "characters": { "type": "string", "description": "Characters to compare (e.g. 'ABCabc')" }
                    },
                    "required": ["font_a", "font_b", "characters"]
                }
            },
            {
                "name": "analyze_metrics",
                "description": "Analyze font metadata: family name, UPM, glyph count, variable font status, ascender/descender, CFF/glyf tables",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "font_path": { "type": "string", "description": "Absolute path to font file" }
                    },
                    "required": ["font_path"]
                }
            }
        ]
    }))
}

fn handle_resources_list(id: Value) -> JsonRpcResponse {
    make_response(id, json!({
        "resources": [
            {
                "uri": "glyph://U+{codepoint}",
                "name": "Glyph by Unicode codepoint",
                "description": "Access glyph data by Unicode codepoint (e.g. glyph://U+4E00). Requires font_path in query.",
                "mimeType": "application/json"
            }
        ]
    }))
}

fn resolve_codepoints(params: &Value, font_bytes: &[u8]) -> Result<Vec<u32>> {
    let face = ttf_parser::Face::parse(font_bytes, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font: {}", e))?;

    if let Some(chars) = params.get("chars").and_then(|v| v.as_str()) {
        return Ok(chars.chars().map(|c| c as u32).collect());
    }

    if let Some(range_str) = params.get("range").and_then(|v| v.as_str()) {
        let range = UnicodeRange::parse(range_str)?;
        let mut cps: Vec<u32> = (range.start..=range.end).collect();
        if let Some(limit) = params.get("limit").and_then(|v| v.as_u64()) {
            cps.truncate(limit as usize);
        }
        return Ok(cps);
    }

    if let Some(preset_str) = params.get("preset").and_then(|v| v.as_str()) {
        let preset = font_inspector::types::CharsetPreset::from_str(preset_str)
            .ok_or_else(|| anyhow::anyhow!("Unknown preset: {}", preset_str))?;
        let range = preset.get_range();
        let limit = params.get("limit").and_then(|v| v.as_u64()).map(|l| l as usize)
            .or_else(|| preset.get_limit());
        let mut cps: Vec<u32> = (range.start..=range.end).collect();
        if let Some(lim) = limit {
            cps.truncate(lim);
        }
        return Ok(cps);
    }

    let _glyph_count = face.number_of_glyphs();
    let mut cps: Vec<u32> = (0x20u32..=0x7E).collect();
    if let Some(limit) = params.get("limit").and_then(|v| v.as_u64()) {
        cps.truncate(limit as usize);
    }
    Ok(cps)
}

fn tool_extract_glyph(params: &Value, cache: &mut FontCache) -> Result<Value> {
    let font_path = PathBuf::from(
        params.get("font_path").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_path"))?
    );
    let character = params.get("character").and_then(|v| v.as_str())
        .ok_or_else(|| anyhow::anyhow!("Missing character"))?;
    let ch = character.chars().next()
        .ok_or_else(|| anyhow::anyhow!("Empty character string"))?;

    let font_bytes = cache.load_font(&font_path)?;
    let face = ttf_parser::Face::parse(font_bytes, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font: {}", e))?;

    let glyph_id = face.glyph_index(ch)
        .ok_or_else(|| anyhow::anyhow!("Character '{}' not found in font", ch))?;

    match extractor::extract_glyph(&face, glyph_id, ch) {
        Some(glyph) => {
            let json_str = serde_json::to_string_pretty(&glyph)?;
            Ok(make_text_content(&json_str))
        }
        None => Ok(make_text_content(&format!("Character '{}' has no outline (space/control char)", ch)))
    }
}

fn tool_extract_all(params: &Value, cache: &mut FontCache) -> Result<Value> {
    let font_path = PathBuf::from(
        params.get("font_path").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_path"))?
    );

    let font_bytes = cache.load_font(&font_path)?;
    let face = ttf_parser::Face::parse(font_bytes, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font: {}", e))?;

    let codepoints = resolve_codepoints(params, font_bytes)?;
    let glyphs = extractor::extract_glyphs_parallel(&face, &codepoints);

    if let Some(output_dir) = params.get("output_dir").and_then(|v| v.as_str()) {
        let out_path = PathBuf::from(output_dir);
        svg_writer::write_all_glyphs(&glyphs, &out_path, face.units_per_em(), false)?;

        let report = json!({
            "font_file": font_path.display().to_string(),
            "total_exported": glyphs.len(),
            "output_directory": output_dir,
            "units_per_em": face.units_per_em()
        });
        Ok(make_text_content(&serde_json::to_string_pretty(&report)?))
    } else {
        let report = font_inspector::types::FontReport {
            font_file: font_path.display().to_string(),
            family_name: face.names().into_iter()
                .find(|n| n.name_id == ttf_parser::name_id::FAMILY)
                .and_then(|n| n.to_string()),
            units_per_em: face.units_per_em(),
            glyph_count: face.number_of_glyphs(),
            total_exported: glyphs.len(),
            glyphs,
        };
        Ok(make_text_content(&serde_json::to_string_pretty(&report)?))
    }
}

fn tool_convert_ufo(params: &Value, cache: &mut FontCache) -> Result<Value> {
    let font_path = PathBuf::from(
        params.get("font_path").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_path"))?
    );
    let output_path = PathBuf::from(
        params.get("output_path").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing output_path"))?
    );

    let font_bytes = cache.load_font(&font_path)?;
    let face = ttf_parser::Face::parse(font_bytes, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font: {}", e))?;

    let codepoints = resolve_codepoints(params, font_bytes)?;
    let glyphs = extractor::extract_glyphs_parallel(&face, &codepoints);

    let font_name = face.names().into_iter()
        .find(|n| n.name_id == ttf_parser::name_id::FAMILY)
        .and_then(|n| n.to_string())
        .unwrap_or_else(|| "Unknown".to_string());

    ufo_writer::write_ufo(&glyphs, &font_name, face.units_per_em(), &output_path)?;

    let result = json!({
        "status": "success",
        "output_path": output_path.display().to_string(),
        "glyphs_converted": glyphs.len(),
        "font_name": font_name
    });
    Ok(make_text_content(&serde_json::to_string_pretty(&result)?))
}

fn tool_compare_glyphs(params: &Value, cache: &mut FontCache) -> Result<Value> {
    let font_a_path = PathBuf::from(
        params.get("font_a").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_a"))?
    );
    let font_b_path = PathBuf::from(
        params.get("font_b").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_b"))?
    );
    let characters = params.get("characters").and_then(|v| v.as_str())
        .ok_or_else(|| anyhow::anyhow!("Missing characters"))?;

    // Load both fonts into cache first to avoid double mutable borrow
    cache.load_font(&font_a_path)?;
    cache.load_font(&font_b_path)?;
    let bytes_a = cache.data.get(&font_a_path).unwrap().as_slice();
    let bytes_b = cache.data.get(&font_b_path).unwrap().as_slice();

    let face_a = ttf_parser::Face::parse(bytes_a, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font A: {}", e))?;
    let face_b = ttf_parser::Face::parse(bytes_b, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font B: {}", e))?;

    let mut comparisons = Vec::new();

    for ch in characters.chars() {
        let glyph_a = face_a.glyph_index(ch)
            .and_then(|gid| extractor::extract_glyph(&face_a, gid, ch));
        let glyph_b = face_b.glyph_index(ch)
            .and_then(|gid| extractor::extract_glyph(&face_b, gid, ch));

        comparisons.push(json!({
            "character": ch.to_string(),
            "unicode": format!("U+{:04X}", ch as u32),
            "font_a": glyph_a.as_ref().map(|g| json!({
                "svg_path": g.svg_path, "advance_width": g.advance_width,
                "contour_count": g.contour_count, "point_count": g.point_count
            })),
            "font_b": glyph_b.as_ref().map(|g| json!({
                "svg_path": g.svg_path, "advance_width": g.advance_width,
                "contour_count": g.contour_count, "point_count": g.point_count
            })),
            "width_diff": match (&glyph_a, &glyph_b) {
                (Some(a), Some(b)) => json!(b.advance_width as i32 - a.advance_width as i32),
                _ => json!(null)
            },
            "contour_diff": match (&glyph_a, &glyph_b) {
                (Some(a), Some(b)) => json!(b.contour_count as i32 - a.contour_count as i32),
                _ => json!(null)
            }
        }));
    }

    let result = json!({
        "font_a": font_a_path.display().to_string(),
        "font_b": font_b_path.display().to_string(),
        "comparisons": comparisons
    });
    Ok(make_text_content(&serde_json::to_string_pretty(&result)?))
}

fn tool_analyze_metrics(params: &Value, cache: &mut FontCache) -> Result<Value> {
    let font_path = PathBuf::from(
        params.get("font_path").and_then(|v| v.as_str())
            .ok_or_else(|| anyhow::anyhow!("Missing font_path"))?
    );

    let font_bytes = cache.load_font(&font_path)?;
    let face = ttf_parser::Face::parse(font_bytes, 0)
        .map_err(|e| anyhow::anyhow!("Failed to parse font: {}", e))?;

    let family_name = face.names().into_iter()
        .find(|n| n.name_id == ttf_parser::name_id::FAMILY)
        .and_then(|n| n.to_string());

    let metadata = json!({
        "font_file": font_path.display().to_string(),
        "family_name": family_name,
        "units_per_em": face.units_per_em(),
        "glyph_count": face.number_of_glyphs(),
        "is_variable": face.is_variable(),
        "has_cff": face.tables().cff.is_some(),
        "has_glyf": face.tables().glyf.is_some(),
        "ascender": face.ascender(),
        "descender": face.descender(),
        "line_gap": face.line_gap(),
        "underline_position": face.underline_metrics().map(|m| m.position),
        "underline_thickness": face.underline_metrics().map(|m| m.thickness),
        "is_monospaced": face.is_monospaced(),
        "italic_angle": face.italic_angle()
    });
    Ok(make_text_content(&serde_json::to_string_pretty(&metadata)?))
}

fn handle_resource_read(id: Value, params: &Value, cache: &mut FontCache) -> JsonRpcResponse {
    let uri = match params.get("uri").and_then(|v| v.as_str()) {
        Some(u) => u,
        None => return make_error(id, -32602, "Missing uri parameter".into()),
    };

    if !uri.starts_with("glyph://U+") {
        return make_error(id, -32602, format!("Unsupported URI scheme: {}", uri));
    }

    let hex = uri.trim_start_matches("glyph://U+");
    let codepoint = match u32::from_str_radix(hex, 16) {
        Ok(cp) => cp,
        Err(_) => return make_error(id, -32602, format!("Invalid codepoint: {}", hex)),
    };
    let ch = match char::from_u32(codepoint) {
        Some(c) => c,
        None => return make_error(id, -32602, format!("Invalid Unicode codepoint: U+{}", hex)),
    };

    let font_path_str = params.get("font_path").and_then(|v| v.as_str())
        .unwrap_or("");
    if font_path_str.is_empty() {
        return make_error(id, -32602, "font_path required for glyph:// resources".into());
    }

    let font_path = PathBuf::from(font_path_str);
    let font_bytes = match cache.load_font(&font_path) {
        Ok(b) => b,
        Err(e) => return make_error(id, -32603, format!("Font load error: {}", e)),
    };

    let face = match ttf_parser::Face::parse(font_bytes, 0) {
        Ok(f) => f,
        Err(e) => return make_error(id, -32603, format!("Font parse error: {}", e)),
    };

    let glyph_id = match face.glyph_index(ch) {
        Some(gid) => gid,
        None => return make_error(id, -32602, format!("Character '{}' not in font", ch)),
    };

    match extractor::extract_glyph(&face, glyph_id, ch) {
        Some(glyph) => {
            let json_str = serde_json::to_string_pretty(&glyph).unwrap_or_default();
            make_response(id, json!({
                "contents": [{
                    "uri": uri,
                    "mimeType": "application/json",
                    "text": json_str
                }]
            }))
        }
        None => make_error(id, -32602, format!("No outline for U+{}", hex)),
    }
}

fn handle_tool_call(id: Value, params: &Value, cache: &mut FontCache) -> JsonRpcResponse {
    let tool_name = match params.get("name").and_then(|v| v.as_str()) {
        Some(n) => n,
        None => return make_error(id, -32602, "Missing tool name".into()),
    };
    let arguments = params.get("arguments").cloned().unwrap_or(json!({}));

    let result = match tool_name {
        "extract_glyph" => tool_extract_glyph(&arguments, cache),
        "extract_all" => tool_extract_all(&arguments, cache),
        "convert_ufo" => tool_convert_ufo(&arguments, cache),
        "compare_glyphs" => tool_compare_glyphs(&arguments, cache),
        "analyze_metrics" => tool_analyze_metrics(&arguments, cache),
        _ => return make_error(id, -32601, format!("Unknown tool: {}", tool_name)),
    };

    match result {
        Ok(content) => make_response(id, content),
        Err(e) => make_response(id, json!({
            "content": [{ "type": "text", "text": format!("Error: {}", e) }],
            "isError": true
        })),
    }
}

fn main() {
    let stdin = io::stdin();
    let mut stdout = io::stdout();
    let mut cache = FontCache::new();

    for line in stdin.lock().lines() {
        let line = match line {
            Ok(l) => l,
            Err(_) => break,
        };

        if line.trim().is_empty() {
            continue;
        }

        let request: JsonRpcRequest = match serde_json::from_str(&line) {
            Ok(r) => r,
            Err(e) => {
                let err = make_error(json!(null), -32700, format!("Parse error: {}", e));
                let _ = writeln!(stdout, "{}", serde_json::to_string(&err).unwrap());
                let _ = stdout.flush();
                continue;
            }
        };

        let id = request.id.clone().unwrap_or(json!(null));

        let response = match request.method.as_str() {
            "initialize" => handle_initialize(id),
            "initialized" => continue,
            "notifications/initialized" => continue,
            "tools/list" => handle_tools_list(id),
            "tools/call" => handle_tool_call(id, &request.params, &mut cache),
            "resources/list" => handle_resources_list(id),
            "resources/read" => handle_resource_read(id, &request.params, &mut cache),
            "ping" => make_response(id, json!({})),
            _ => make_error(id, -32601, format!("Method not found: {}", request.method)),
        };

        let json_out = serde_json::to_string(&response).unwrap();
        let _ = writeln!(stdout, "{}", json_out);
        let _ = stdout.flush();
    }
}
