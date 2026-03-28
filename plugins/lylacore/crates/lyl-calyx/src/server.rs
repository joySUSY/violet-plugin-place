// Authors: Joysusy & Violet Klaudia 💖

use rmcp::handler::server::router::tool::ToolRouter;
use rmcp::handler::server::wrapper::Parameters;
use rmcp::model::*;
use rmcp::{ServerHandler, tool, tool_handler, tool_router};

use crate::tools::{cipher, coach, topo};

#[derive(Clone)]
pub struct LylCalyxServer {
    tool_router: ToolRouter<Self>,
}

#[tool_router]
impl LylCalyxServer {
    pub fn new() -> Self {
        Self {
            tool_router: Self::tool_router(),
        }
    }

    #[tool(description = "Generate a random 32-byte salt (base64)")]
    async fn lylacore_generate_salt(&self) -> String {
        cipher::generate_salt()
    }

    #[tool(description = "Derive encryption key from passphrase and salt")]
    async fn lylacore_derive_key(
        &self,
        Parameters(params): Parameters<cipher::DeriveKeyParams>,
    ) -> Result<String, String> {
        cipher::derive_key(params).await
    }

    #[tool(description = "Encrypt plaintext with AES-256-GCM")]
    async fn lylacore_encrypt(
        &self,
        Parameters(params): Parameters<cipher::EncryptParams>,
    ) -> Result<String, String> {
        cipher::encrypt(params)
    }

    #[tool(description = "Decrypt ciphertext with AES-256-GCM")]
    async fn lylacore_decrypt(
        &self,
        Parameters(params): Parameters<cipher::DecryptParams>,
    ) -> Result<String, String> {
        cipher::decrypt(params)
    }

    #[tool(description = "Learn communication pattern via COACH")]
    async fn lylacore_learn_pattern(
        &self,
        Parameters(params): Parameters<coach::LearnPatternParams>,
    ) -> Result<String, String> {
        coach::learn_pattern(params)
    }

    #[tool(description = "Apply learned style to message")]
    async fn lylacore_apply_style(
        &self,
        Parameters(params): Parameters<coach::ApplyStyleParams>,
    ) -> Result<String, String> {
        coach::apply_style(params)
    }

    #[tool(description = "Analyze style from messages")]
    async fn lylacore_analyze_style(
        &self,
        Parameters(params): Parameters<coach::AnalyzeStyleParams>,
    ) -> Result<String, String> {
        coach::analyze_style(params)
    }

    #[tool(description = "Validate Mind JSON against schema")]
    async fn lylacore_validate_mind(
        &self,
        Parameters(params): Parameters<topo::ValidateMindParams>,
    ) -> Result<String, String> {
        topo::validate_mind(params)
    }

    #[tool(description = "Load Mind from file")]
    async fn lylacore_load_mind(
        &self,
        Parameters(params): Parameters<topo::LoadMindParams>,
    ) -> Result<String, String> {
        topo::load_mind(params)
    }

    #[tool(description = "List Minds in directory")]
    async fn lylacore_list_minds(
        &self,
        Parameters(params): Parameters<topo::ListMindsParams>,
    ) -> Result<String, String> {
        topo::list_minds(params)
    }

    #[tool(description = "Select active Minds by context")]
    async fn lylacore_select_active(
        &self,
        Parameters(params): Parameters<topo::SelectActiveParams>,
    ) -> Result<String, String> {
        topo::select_active(params)
    }

    #[tool(description = "Export Soul Package")]
    async fn lylacore_export_package(
        &self,
        Parameters(params): Parameters<topo::ExportPackageParams>,
    ) -> Result<String, String> {
        topo::export_package(params)
    }
}

#[tool_handler]
impl ServerHandler for LylCalyxServer {
    fn get_info(&self) -> ServerInfo {
        let mut info = ServerInfo::default();
        info.protocol_version = ProtocolVersion::LATEST;
        info.capabilities = ServerCapabilities::builder().enable_tools().build();
        info.server_info = Implementation::from_build_env();
        info
    }
}
