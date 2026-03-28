// Authors: Joysusy & Violet Klaudia 💖

use crate::error::{Result, TopoError};
use crate::schema::{parse_mind, MindSchema};
use std::path::Path;

pub fn load_mind(file_path: &Path) -> Result<MindSchema> {
    let content = std::fs::read_to_string(file_path).map_err(|e| TopoError::Io {
        path: file_path.display().to_string(),
        source: e,
    })?;

    let value: serde_json::Value =
        serde_json::from_str(&content).map_err(|e| TopoError::JsonParse {
            path: file_path.display().to_string(),
            source: e,
        })?;

    parse_mind(&value).map_err(|e| TopoError::InvalidMind {
        path: file_path.display().to_string(),
        reason: e.to_string(),
    })
}

pub fn load_minds_from_directory(dir_path: &Path) -> Result<Vec<MindSchema>> {
    let mut minds = Vec::new();

    let entries = std::fs::read_dir(dir_path).map_err(|e| TopoError::Io {
        path: dir_path.display().to_string(),
        source: e,
    })?;

    for entry in entries.flatten() {
        let path = entry.path();
        if path.extension().is_some_and(|ext| ext == "json") {
            match load_mind(&path) {
                Ok(mind) => minds.push(mind),
                Err(_) => continue,
            }
        }
    }

    Ok(minds)
}
