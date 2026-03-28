// Authors: Joysusy & Violet Klaudia 💖

use crate::schema::{ClashResolution, MindSchema, Trigger};
use regex::Regex;
use serde::Serialize;

pub struct CompiledTrigger {
    pattern: TriggerPattern,
    weight: f64,
}

enum TriggerPattern {
    Literal(String),
    Regex(Regex),
}

pub struct CompiledMind {
    pub schema: MindSchema,
    triggers: Vec<CompiledTrigger>,
}

impl CompiledMind {
    pub fn compile(schema: MindSchema) -> Self {
        let triggers = schema
            .triggers
            .iter()
            .map(|t| CompiledTrigger {
                pattern: compile_pattern(&t.context_pattern),
                weight: t.activation_weight,
            })
            .collect();
        Self { schema, triggers }
    }

    pub fn compile_many(minds: Vec<MindSchema>) -> Vec<Self> {
        minds.into_iter().map(Self::compile).collect()
    }
}

fn compile_pattern(pattern: &str) -> TriggerPattern {
    let lower = pattern.to_lowercase();
    if lower.starts_with('/') && lower.ends_with('/') && lower.len() > 2 {
        match Regex::new(&lower[1..lower.len() - 1]) {
            Ok(re) => TriggerPattern::Regex(re),
            Err(_) => TriggerPattern::Literal(lower),
        }
    } else {
        TriggerPattern::Literal(lower)
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct ActivationScore {
    pub name: String,
    pub symbol: Option<String>,
    pub score: f64,
}

#[derive(Debug, Clone, Serialize)]
pub struct ActivationResult {
    pub active_indices: Vec<usize>,
    pub scores: Vec<ActivationScore>,
    pub total: usize,
    pub evaluated: usize,
    pub above_threshold: usize,
}

impl ActivationResult {
    pub fn active_minds<'a>(&self, minds: &'a [MindSchema]) -> Vec<&'a MindSchema> {
        self.active_indices.iter().map(|&i| &minds[i]).collect()
    }

    pub fn active_names(&self) -> Vec<&str> {
        self.scores.iter().map(|s| s.name.as_str()).collect()
    }
}

pub struct ActivationContext {
    pub message: String,
    pub tags: Vec<String>,
}

pub struct ActivationOptions {
    pub max_active: usize,
    pub threshold: f64,
}

impl Default for ActivationOptions {
    fn default() -> Self {
        Self {
            max_active: 3,
            threshold: 0.1,
        }
    }
}

pub fn evaluate_triggers(mind: &MindSchema, context: &ActivationContext) -> f64 {
    if mind.triggers.is_empty() {
        return 0.0;
    }

    let message_lower = context.message.to_lowercase();
    let tags_lower: Vec<String> = context.tags.iter().map(|t| t.to_lowercase()).collect();
    let trigger_count = mind.triggers.len() as f64;

    let total_weight: f64 = mind
        .triggers
        .iter()
        .filter(|trigger| match_trigger(trigger, &message_lower, &tags_lower))
        .map(|trigger| trigger.activation_weight)
        .sum();

    if total_weight > 0.0 { total_weight / trigger_count } else { 0.0 }
}

pub fn evaluate_compiled(compiled: &CompiledMind, context: &ActivationContext) -> f64 {
    if compiled.triggers.is_empty() {
        return 0.0;
    }

    let message_lower = context.message.to_lowercase();
    let tags_lower: Vec<String> = context.tags.iter().map(|t| t.to_lowercase()).collect();
    let trigger_count = compiled.triggers.len() as f64;

    let total_weight: f64 = compiled
        .triggers
        .iter()
        .filter(|ct| match_compiled_pattern(&ct.pattern, &message_lower, &tags_lower))
        .map(|ct| ct.weight)
        .sum();

    if total_weight > 0.0 { total_weight / trigger_count } else { 0.0 }
}

fn match_trigger(trigger: &Trigger, message: &str, tags: &[String]) -> bool {
    let pattern = trigger.context_pattern.to_lowercase();
    if pattern.starts_with('/') && pattern.ends_with('/') && pattern.len() > 2 {
        Regex::new(&pattern[1..pattern.len() - 1])
            .map(|re| re.is_match(message))
            .unwrap_or(false)
    } else {
        message.contains(&pattern) || tags.contains(&pattern)
    }
}

fn match_compiled_pattern(pattern: &TriggerPattern, message: &str, tags: &[String]) -> bool {
    match pattern {
        TriggerPattern::Literal(lit) => message.contains(lit.as_str()) || tags.contains(lit),
        TriggerPattern::Regex(re) => re.is_match(message),
    }
}

pub fn select_active_minds(
    minds: &[MindSchema],
    context: &ActivationContext,
    options: Option<ActivationOptions>,
) -> ActivationResult {
    let opts = options.unwrap_or_default();

    let mut scored: Vec<(usize, f64)> = minds
        .iter()
        .enumerate()
        .map(|(i, mind)| (i, evaluate_triggers(mind, context)))
        .collect();

    let above_count = scored.iter().filter(|(_, s)| *s >= opts.threshold).count();

    scored.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));

    let selected: Vec<(usize, f64)> = scored
        .into_iter()
        .filter(|(_, s)| *s >= opts.threshold)
        .take(opts.max_active)
        .collect();

    ActivationResult {
        active_indices: selected.iter().map(|(i, _)| *i).collect(),
        scores: selected
            .iter()
            .map(|(i, s)| ActivationScore {
                name: minds[*i].name.clone(),
                symbol: minds[*i].symbol.clone(),
                score: *s,
            })
            .collect(),
        total: minds.len(),
        evaluated: minds.len(),
        above_threshold: above_count,
    }
}

pub fn resolve_clash(mind_a: &MindSchema, mind_b: &MindSchema) -> Option<String> {
    let res_a = mind_a.coordination.as_ref().and_then(|c| c.clash_resolution.as_ref());
    let res_b = mind_b.coordination.as_ref().and_then(|c| c.clash_resolution.as_ref());

    match (res_a, res_b) {
        (Some(ClashResolution::Defer), _) => Some(mind_b.name.clone()),
        (_, Some(ClashResolution::Defer)) => Some(mind_a.name.clone()),
        _ => None,
    }
}
