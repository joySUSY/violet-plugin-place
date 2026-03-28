// Authors: Joysusy & Violet Klaudia 💖
// lyl-topo integration tests — validates Mind topology engine

use lyl_topo::*;
use std::path::Path;

fn sample_mind_json() -> serde_json::Value {
    serde_json::json!({
        "name": "Lilith",
        "symbol": "🎀",
        "version": 1,
        "role": "SecurityGuardian",
        "traits": {
            "thinking_style": "analytical",
            "communication_tone": "vigilant",
            "strength_domains": ["security", "cryptography"]
        },
        "triggers": [
            { "context_pattern": "security", "activation_weight": 0.9 },
            { "context_pattern": "audit", "activation_weight": 0.7 },
            { "context_pattern": "/encrypt|decrypt/", "activation_weight": 0.8 }
        ],
        "evolution": [
            { "v": 1, "date": "2026-01-15", "note": "Initial creation" }
        ],
        "coordination": {
            "compatible_with": ["Kori", "Rune"],
            "clash_resolution": "soul_decides"
        }
    })
}

fn sample_mind_minimal() -> serde_json::Value {
    serde_json::json!({
        "name": "TestMind",
        "version": 1,
        "role": "tester",
        "traits": {}
    })
}

// === Schema Validation Tests ===

#[test]
fn test_validate_valid_mind() {
    let result = validate_mind(&sample_mind_json());
    assert!(result.valid, "Valid Mind should pass: {:?}", result.errors);
}

#[test]
fn test_validate_minimal_mind() {
    let result = validate_mind(&sample_mind_minimal());
    assert!(result.valid, "Minimal Mind should pass: {:?}", result.errors);
}

#[test]
fn test_validate_missing_required_field() {
    let invalid = serde_json::json!({
        "name": "NoRole",
        "version": 1,
        "traits": {}
    });
    let result = validate_mind(&invalid);
    assert!(!result.valid);
    assert!(result.errors.iter().any(|e| e.contains("role")));
}

#[test]
fn test_validate_invalid_version_type() {
    let invalid = serde_json::json!({
        "name": "BadVersion",
        "version": "not_a_number",
        "role": "tester",
        "traits": {}
    });
    let result = validate_mind(&invalid);
    assert!(!result.valid);
}

#[test]
fn test_validate_symbol_too_long() {
    let invalid = serde_json::json!({
        "name": "LongSymbol",
        "symbol": "🎀🎀🎀🎀🎀",
        "version": 1,
        "role": "tester",
        "traits": {}
    });
    let result = validate_mind(&invalid);
    assert!(!result.valid);
}

#[test]
fn test_validate_trigger_weight_out_of_range() {
    let invalid = serde_json::json!({
        "name": "BadTrigger",
        "version": 1,
        "role": "tester",
        "traits": {},
        "triggers": [{ "context_pattern": "test", "activation_weight": 1.5 }]
    });
    let result = validate_mind(&invalid);
    assert!(!result.valid);
}

#[test]
fn test_validate_invalid_clash_resolution() {
    let invalid = serde_json::json!({
        "name": "BadClash",
        "version": 1,
        "role": "tester",
        "traits": {},
        "coordination": { "clash_resolution": "fight" }
    });
    let result = validate_mind(&invalid);
    assert!(!result.valid);
}

#[test]
fn test_parse_mind_full() {
    let mind = schema::parse_mind(&sample_mind_json()).expect("should parse");
    assert_eq!(mind.name, "Lilith");
    assert_eq!(mind.symbol.as_deref(), Some("🎀"));
    assert_eq!(mind.version, 1);
    assert_eq!(mind.role, "SecurityGuardian");
    assert_eq!(mind.triggers.len(), 3);
    assert_eq!(mind.evolution.len(), 1);
}

// === Runtime Tests ===

#[test]
fn test_evaluate_triggers_exact_match() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let ctx = runtime::ActivationContext {
        message: "We need a security audit".to_string(),
        tags: vec![],
    };
    let score = evaluate_triggers(&mind, &ctx);
    assert!(score > 0.0, "Should match 'security' and 'audit'");
}

#[test]
fn test_evaluate_triggers_no_match() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let ctx = runtime::ActivationContext {
        message: "Let's write documentation".to_string(),
        tags: vec![],
    };
    let score = evaluate_triggers(&mind, &ctx);
    assert_eq!(score, 0.0);
}

#[test]
fn test_evaluate_triggers_regex() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let ctx = runtime::ActivationContext {
        message: "How do I encrypt this data?".to_string(),
        tags: vec![],
    };
    let score = evaluate_triggers(&mind, &ctx);
    assert!(score > 0.0, "Regex /encrypt|decrypt/ should match");
}

#[test]
fn test_evaluate_triggers_tag_match() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let ctx = runtime::ActivationContext {
        message: "".to_string(),
        tags: vec!["security".to_string()],
    };
    let score = evaluate_triggers(&mind, &ctx);
    assert!(score > 0.0, "Tag 'security' should match");
}

#[test]
fn test_select_active_minds_ranking() {
    let security_mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let generic_mind = schema::parse_mind(&sample_mind_minimal()).unwrap();
    let minds = vec![security_mind, generic_mind];

    let ctx = runtime::ActivationContext {
        message: "security review needed".to_string(),
        tags: vec![],
    };

    let result = select_active_minds(&minds, &ctx, None);
    assert_eq!(result.active_indices.len(), 1);
    let active = result.active_minds(&minds);
    assert_eq!(active[0].name, "Lilith");
}

#[test]
fn test_select_active_minds_max_limit() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let minds = vec![mind.clone(), mind.clone(), mind.clone(), mind.clone()];

    let ctx = runtime::ActivationContext {
        message: "security audit encrypt".to_string(),
        tags: vec![],
    };

    let opts = runtime::ActivationOptions {
        max_active: 2,
        threshold: 0.0,
    };
    let result = select_active_minds(&minds, &ctx, Some(opts));
    assert!(result.active_indices.len() <= 2);
}

// === Soul Package Tests ===

#[test]
fn test_export_soul_package() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let metadata = package::PackageMetadata {
        author: "Joysusy & Violet Klaudia".to_string(),
        description: "Test package".to_string(),
        tags: vec!["test".to_string()],
    };

    let pkg = export_soul_package(&[mind], metadata).unwrap();
    assert_eq!(pkg.version, "1.0.0");
    assert_eq!(pkg.minds.len(), 1);
    assert_eq!(pkg.minds[0].name, "Lilith");
    assert_eq!(pkg.metadata.author, "Joysusy & Violet Klaudia");
}

#[test]
fn test_export_empty_package_fails() {
    let metadata = package::PackageMetadata {
        author: "test".to_string(),
        description: "".to_string(),
        tags: vec![],
    };
    let result = export_soul_package(&[], metadata);
    assert!(result.is_err());
}

#[test]
fn test_import_soul_package_full() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let metadata = package::PackageMetadata {
        author: "test".to_string(),
        description: "".to_string(),
        tags: vec![],
    };
    let pkg = export_soul_package(&[mind], metadata).unwrap();
    let imported = import_soul_package(&pkg, None).unwrap();
    assert_eq!(imported.len(), 1);
    assert_eq!(imported[0].name, "Lilith");
}

#[test]
fn test_import_soul_package_selective() {
    let mind1 = schema::parse_mind(&sample_mind_json()).unwrap();
    let mind2 = schema::parse_mind(&sample_mind_minimal()).unwrap();
    let metadata = package::PackageMetadata {
        author: "test".to_string(),
        description: "".to_string(),
        tags: vec![],
    };
    let pkg = export_soul_package(&[mind1, mind2], metadata).unwrap();
    let selection = vec!["TestMind".to_string()];
    let imported = import_soul_package(&pkg, Some(&selection)).unwrap();
    assert_eq!(imported.len(), 1);
    assert_eq!(imported[0].name, "TestMind");
}

#[test]
fn test_import_no_match_fails() {
    let mind = schema::parse_mind(&sample_mind_json()).unwrap();
    let metadata = package::PackageMetadata {
        author: "test".to_string(),
        description: "".to_string(),
        tags: vec![],
    };
    let pkg = export_soul_package(&[mind], metadata).unwrap();
    let selection = vec!["NonExistent".to_string()];
    let result = import_soul_package(&pkg, Some(&selection));
    assert!(result.is_err());
}

// === Loader Tests ===

#[test]
fn test_load_mind_from_example_file() {
    let example_path = Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../../examples/example-mind.json");

    if example_path.exists() {
        let mind = load_mind(&example_path);
        assert!(mind.is_ok(), "Example mind should load: {:?}", mind.err());
    }
}

#[test]
fn test_load_mind_nonexistent_file() {
    let result = load_mind(Path::new("/nonexistent/path.json"));
    assert!(result.is_err());
}
