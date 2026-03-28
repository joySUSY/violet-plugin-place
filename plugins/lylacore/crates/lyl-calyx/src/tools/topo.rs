// Authors: Joysusy & Violet Klaudia 💖

use schemars::JsonSchema;
use serde::Deserialize;
use std::path::Path;

use crate::security;

#[derive(Debug, Deserialize, JsonSchema)]
pub struct ValidateMindParams {
    pub mind_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct LoadMindParams {
    pub file_path: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct ListMindsParams {
    pub dir_path: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SelectActiveParams {
    pub minds_json: String,
    pub message: String,
    pub tags: Option<Vec<String>>,
    pub max_active: Option<u32>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct ExportPackageParams {
    pub minds_json: String,
    pub author: String,
    pub description: String,
}

pub fn validate_mind(params: ValidateMindParams) -> Result<String, String> {
    let value: serde_json::Value =
        serde_json::from_str(&params.mind_json).map_err(|e| format!("Invalid JSON: {e}"))?;
    let result = lyl_topo::validate_mind(&value);
    serde_json::to_string_pretty(&result).map_err(|e| e.to_string())
}

pub fn load_mind(params: LoadMindParams) -> Result<String, String> {
    let safe_path = security::validate_path(&params.file_path)?;
    let mind = lyl_topo::load_mind(Path::new(&safe_path)).map_err(|e| e.to_string())?;
    serde_json::to_string_pretty(&mind).map_err(|e| e.to_string())
}

pub fn list_minds(params: ListMindsParams) -> Result<String, String> {
    let safe_path = security::validate_path(&params.dir_path)?;
    let minds = lyl_topo::load_minds_from_directory(Path::new(&safe_path)).map_err(|e| e.to_string())?;
    serde_json::to_string_pretty(&minds).map_err(|e| e.to_string())
}

pub fn select_active(params: SelectActiveParams) -> Result<String, String> {
    let minds: Vec<lyl_topo::MindSchema> =
        serde_json::from_str(&params.minds_json).map_err(|e| format!("Invalid minds JSON: {e}"))?;

    let context = lyl_topo::runtime::ActivationContext {
        message: params.message,
        tags: params.tags.unwrap_or_default(),
    };

    let options = lyl_topo::runtime::ActivationOptions {
        max_active: params.max_active.unwrap_or(3) as usize,
        threshold: 0.1,
    };

    let result = lyl_topo::select_active_minds(&minds, &context, Some(options));
    let active_names = result.active_names();
    let output = serde_json::json!({
        "active": active_names,
        "scores": result.scores,
        "total": result.total,
        "above_threshold": result.above_threshold,
    });
    serde_json::to_string_pretty(&output).map_err(|e| e.to_string())
}

pub fn export_package(params: ExportPackageParams) -> Result<String, String> {
    let minds: Vec<lyl_topo::MindSchema> =
        serde_json::from_str(&params.minds_json).map_err(|e| format!("Invalid minds JSON: {e}"))?;

    let metadata = lyl_topo::package::PackageMetadata {
        author: params.author,
        description: params.description,
        tags: vec![],
    };

    let package = lyl_topo::export_soul_package(&minds, metadata).map_err(|e| e.to_string())?;
    serde_json::to_string_pretty(&package).map_err(|e| e.to_string())
}
