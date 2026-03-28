// Authors: Joysusy & Violet Klaudia 💖

use std::path::{Path, PathBuf};

fn allowed_roots() -> Vec<PathBuf> {
    let mut roots = Vec::new();

    if let Some(parent) = std::env::current_exe()
        .ok()
        .as_deref()
        .and_then(Path::parent)
        .and_then(Path::parent)
    {
        roots.push(parent.to_path_buf());
    }

    if let Some(home) = home_dir() {
        roots.push(home.join(".claude"));
    }

    if let Ok(project_dir) = std::env::var("CLAUDE_PROJECT_DIR") {
        roots.push(PathBuf::from(project_dir));
    }

    roots
}

fn home_dir() -> Option<PathBuf> {
    #[cfg(target_os = "windows")]
    { std::env::var("USERPROFILE").ok().map(PathBuf::from) }
    #[cfg(not(target_os = "windows"))]
    { std::env::var("HOME").ok().map(PathBuf::from) }
}

pub fn validate_path(input: &str) -> Result<String, String> {
    let roots = allowed_roots();
    if roots.is_empty() {
        return Err("No allowed roots configured — all path access denied".to_string());
    }

    let resolved = std::fs::canonicalize(input)
        .map_err(|e| format!("Path not accessible: {e}"))?;

    let is_allowed = roots.iter().any(|root| resolved.starts_with(root));
    if !is_allowed {
        return Err(format!("Path outside allowed boundaries: {}", resolved.display()));
    }

    Ok(resolved.to_string_lossy().into_owned())
}
