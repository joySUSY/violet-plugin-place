// Authors: Joysusy & Violet Klaudia 💖
// lyl-topo — Mind Topology Engine
// Lylarch C-Layer: cognitive structure, schema validation, activation, packaging

pub mod error;
pub mod schema;
pub mod loader;
pub mod runtime;
pub mod package;

pub use error::TopoError;
pub use schema::{validate_mind, MindSchema};
pub use loader::{load_mind, load_minds_from_directory};
pub use runtime::{evaluate_triggers, select_active_minds, ActivationResult};
pub use package::{export_soul_package, import_soul_package, SoulPackage};
