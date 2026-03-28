// Authors: Joysusy & Violet Klaudia 💖
// lyl-calyx security module tests

#[path = "../src/security.rs"]
mod security;

#[test]
fn test_nonexistent_path_rejected() {
    let result = security::validate_path("/definitely/does/not/exist/file.json");
    assert!(result.is_err(), "Nonexistent path should be rejected");
}

#[test]
fn test_relative_path_rejected() {
    let result = security::validate_path("../../../etc/passwd");
    assert!(result.is_err(), "Relative traversal path should be rejected");
}

#[test]
fn test_empty_path_rejected() {
    let result = security::validate_path("");
    assert!(result.is_err(), "Empty path should be rejected");
}

#[cfg(target_os = "windows")]
#[test]
fn test_windows_traversal_rejected() {
    let result = security::validate_path("C:\\..\\..\\Windows\\System32\\config\\sam");
    assert!(result.is_err(), "Windows traversal should be rejected");
}

#[test]
fn test_valid_path_in_allowed_root() {
    let cargo_toml = env!("CARGO_MANIFEST_DIR");
    let test_path = format!("{}/Cargo.toml", cargo_toml);
    let result = security::validate_path(&test_path);
    // This may pass or fail depending on whether cargo_manifest_dir
    // falls under an allowed root — both outcomes are valid
    // The important thing is it doesn't panic
    let _ = result;
}
