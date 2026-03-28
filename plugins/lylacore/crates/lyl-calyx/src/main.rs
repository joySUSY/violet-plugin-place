// Authors: Joysusy & Violet Klaudia 💖
// lyl-calyx — Pure Rust MCP Server for Lylacore
// Lylarch I-Layer: the outermost floral whorl, the API surface

mod security;
mod server;
mod tools;

use anyhow::Result;
use tracing_subscriber::EnvFilter;

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env().add_directive("lyl_calyx=info".parse()?))
        .with_writer(std::io::stderr)
        .init();

    tracing::info!("Lylacore MCP Server (lyl-calyx) starting");

    let server = server::LylCalyxServer::new();
    let transport = rmcp::transport::stdio();
    let service = rmcp::serve_server(server, transport).await?;

    tracing::info!("Server connected, waiting for requests");
    service.waiting().await?;

    tracing::info!("Server shutting down");
    Ok(())
}
