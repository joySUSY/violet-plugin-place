// Authors: Joysusy & Violet Klaudia 💖

use schemars::JsonSchema;
use serde::Deserialize;

#[derive(Debug, Deserialize, JsonSchema)]
pub struct LearnPatternParams {
    pub user_message: String,
    pub agent_response: String,
    pub language: Option<String>,
    pub topic: Option<String>,
    pub existing_style_json: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct ApplyStyleParams {
    pub message: String,
    pub style_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct AnalyzeStyleParams {
    pub messages: Vec<String>,
}

pub fn learn_pattern(params: LearnPatternParams) -> Result<String, String> {
    let context = lyl_coach::Context {
        language: params.language,
        topic: params.topic,
    };

    let existing: Option<lyl_coach::StyleMetadata> = params
        .existing_style_json
        .as_deref()
        .map(|json| serde_json::from_str(json).map_err(|e| format!("Invalid style JSON: {e}")))
        .transpose()?;

    let result = lyl_coach::learn_pattern(
        &params.user_message,
        &params.agent_response,
        &context,
        existing,
    );

    serde_json::to_string_pretty(&result).map_err(|e| e.to_string())
}

pub fn apply_style(params: ApplyStyleParams) -> Result<String, String> {
    let style: lyl_coach::StyleMetadata =
        serde_json::from_str(&params.style_json).map_err(|e| format!("Invalid style JSON: {e}"))?;

    Ok(lyl_coach::apply_style(&params.message, &style))
}

pub fn analyze_style(params: AnalyzeStyleParams) -> Result<String, String> {
    let refs: Vec<&str> = params.messages.iter().map(String::as_str).collect();
    let profile = lyl_coach::analyze_style(&refs);
    serde_json::to_string_pretty(&profile).map_err(|e| e.to_string())
}
