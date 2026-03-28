// Authors: Joysusy & Violet Klaudia 💖

use crate::error::{Result, TopoError};
use serde::{Deserialize, Serialize};
use std::sync::LazyLock;

static MIND_SCHEMA_JSON: &str = include_str!("../../../schemas/mind-v1.json");

static VALIDATOR: LazyLock<jsonschema::Validator> = LazyLock::new(|| {
    let schema_value: serde_json::Value =
        serde_json::from_str(MIND_SCHEMA_JSON).expect("embedded mind-v1.json must be valid JSON");
    jsonschema::validator_for(&schema_value).expect("mind-v1.json must be a valid JSON Schema")
});

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MindSchema {
    pub name: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub symbol: Option<String>,
    pub version: u32,
    pub role: String,
    pub traits: MindTraits,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub triggers: Vec<Trigger>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub evolution: Vec<EvolutionEntry>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub coordination: Option<Coordination>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MindTraits {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub thinking_style: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub communication_tone: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub decision_bias: Option<String>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub strength_domains: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Trigger {
    pub context_pattern: String,
    pub activation_weight: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EvolutionEntry {
    pub v: u32,
    pub date: String,
    pub note: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Coordination {
    #[serde(default)]
    pub compatible_with: Vec<String>,
    #[serde(default)]
    pub clash_resolution: Option<ClashResolution>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ClashResolution {
    Defer,
    Negotiate,
    SoulDecides,
}

#[derive(serde::Serialize)]
pub struct ValidationResult {
    pub valid: bool,
    pub errors: Vec<String>,
}

pub fn validate_mind(value: &serde_json::Value) -> ValidationResult {
    let errors: Vec<String> = VALIDATOR
        .iter_errors(value)
        .map(|e| format!("{} at {}", e, e.instance_path()))
        .collect();

    ValidationResult {
        valid: errors.is_empty(),
        errors,
    }
}

pub fn parse_mind(value: &serde_json::Value) -> Result<MindSchema> {
    let validation = validate_mind(value);
    if !validation.valid {
        return Err(TopoError::SchemaValidation(validation.errors.join("; ")));
    }

    serde_json::from_value(value.clone())
        .map_err(|e| TopoError::SchemaValidation(e.to_string()))
}
