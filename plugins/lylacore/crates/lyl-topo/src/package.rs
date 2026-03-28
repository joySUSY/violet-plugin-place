// Authors: Joysusy & Violet Klaudia 💖

use crate::error::{Result, TopoError};
use crate::schema::{validate_mind, MindSchema};
use chrono::Utc;
use serde::{Deserialize, Serialize};

pub const PACKAGE_VERSION: &str = "1.0.0";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SoulPackage {
    pub version: String,
    pub created: String,
    pub minds: Vec<MindSchema>,
    pub metadata: PackageMetadata,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PackageMetadata {
    #[serde(default = "default_author")]
    pub author: String,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub tags: Vec<String>,
}

fn default_author() -> String {
    "Unknown".to_string()
}

pub fn export_soul_package(minds: &[MindSchema], metadata: PackageMetadata) -> Result<SoulPackage> {
    if minds.is_empty() {
        return Err(TopoError::EmptyPackage);
    }

    Ok(SoulPackage {
        version: PACKAGE_VERSION.to_string(),
        created: Utc::now().to_rfc3339(),
        minds: minds.to_vec(),
        metadata,
    })
}

pub fn import_soul_package(
    package: &SoulPackage,
    select_minds: Option<&[String]>,
) -> Result<Vec<MindSchema>> {
    validate_soul_package(package)?;

    let minds = match select_minds {
        Some(selection) => {
            let filtered: Vec<MindSchema> = package
                .minds
                .iter()
                .filter(|m| selection.contains(&m.name))
                .cloned()
                .collect();

            if filtered.is_empty() {
                return Err(TopoError::NoMindsMatched(selection.to_vec()));
            }
            filtered
        }
        None => package.minds.clone(),
    };

    Ok(minds)
}

pub fn validate_soul_package(package: &SoulPackage) -> Result<()> {
    if package.version.is_empty() {
        return Err(TopoError::InvalidPackage(
            "missing version".to_string(),
        ));
    }

    if package.created.is_empty() {
        return Err(TopoError::InvalidPackage(
            "missing created timestamp".to_string(),
        ));
    }

    if package.minds.is_empty() {
        return Err(TopoError::EmptyPackage);
    }

    for (i, mind) in package.minds.iter().enumerate() {
        let value = serde_json::to_value(mind)
            .map_err(|e| TopoError::InvalidPackage(format!("minds[{i}]: {e}")))?;
        let result = validate_mind(&value);
        if !result.valid {
            return Err(TopoError::InvalidPackage(format!(
                "minds[{i}] ({}): {}",
                mind.name,
                result.errors.join("; ")
            )));
        }
    }

    Ok(())
}
