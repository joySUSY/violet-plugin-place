// Authors: Joysusy & Violet Klaudia 💖

use thiserror::Error;

#[derive(Error, Debug)]
pub enum TopoError {
    #[error("schema validation failed: {0}")]
    SchemaValidation(String),

    #[error("missing required field: {0}")]
    MissingField(String),

    #[error("invalid mind definition at {path}: {reason}")]
    InvalidMind { path: String, reason: String },

    #[error("IO error reading {path}: {source}")]
    Io {
        path: String,
        #[source]
        source: std::io::Error,
    },

    #[error("JSON parse error in {path}: {source}")]
    JsonParse {
        path: String,
        #[source]
        source: serde_json::Error,
    },

    #[error("empty soul package: minds array cannot be empty")]
    EmptyPackage,

    #[error("invalid soul package: {0}")]
    InvalidPackage(String),

    #[error("no minds matched selection: {0:?}")]
    NoMindsMatched(Vec<String>),
}

pub type Result<T> = std::result::Result<T, TopoError>;
