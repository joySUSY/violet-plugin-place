// Authors: Joysusy & Violet Klaudia 💖

use base64::{Engine as _, engine::general_purpose::STANDARD as B64};
use schemars::JsonSchema;
use serde::Deserialize;

#[derive(Debug, Deserialize, JsonSchema)]
pub struct DeriveKeyParams {
    pub passphrase: String,
    pub salt_b64: String,
    #[schemars(description = "Algorithm: argon2id (default), pbkdf2, or scrypt")]
    pub algorithm: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct EncryptParams {
    pub key_b64: String,
    pub plaintext_b64: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct DecryptParams {
    pub key_b64: String,
    pub nonce_b64: String,
    pub ciphertext_b64: String,
    pub auth_tag_b64: String,
}

pub fn generate_salt() -> String {
    let salt = lyl_cipher::generate_salt();
    B64.encode(salt.as_bytes())
}

pub async fn derive_key(params: DeriveKeyParams) -> Result<String, String> {
    let salt_bytes = B64.decode(&params.salt_b64).map_err(|e| format!("Invalid salt base64: {e}"))?;
    let salt = lyl_cipher::Salt::from_slice(&salt_bytes).map_err(|e| e.to_string())?;

    let algorithm = match params.algorithm.as_deref() {
        Some("pbkdf2") => lyl_cipher::KeyDerivationAlgorithm::Pbkdf2,
        Some("scrypt") => lyl_cipher::KeyDerivationAlgorithm::Scrypt,
        _ => lyl_cipher::KeyDerivationAlgorithm::Argon2id,
    };

    let key = lyl_cipher::derive_key(&params.passphrase, &salt, algorithm)
        .await
        .map_err(|e| e.to_string())?;

    Ok(B64.encode(key.as_bytes()))
}

pub fn encrypt(params: EncryptParams) -> Result<String, String> {
    let key_bytes = B64.decode(&params.key_b64).map_err(|e| format!("Invalid key base64: {e}"))?;
    let key = lyl_cipher::Key::from_slice(&key_bytes).map_err(|e| e.to_string())?;
    let plaintext = B64.decode(&params.plaintext_b64).map_err(|e| format!("Invalid plaintext base64: {e}"))?;

    let (nonce, ciphertext, auth_tag) = lyl_cipher::encrypt(&key, &plaintext).map_err(|e| e.to_string())?;

    let result = serde_json::json!({
        "nonce_b64": B64.encode(nonce.as_bytes()),
        "ciphertext_b64": B64.encode(&ciphertext),
        "auth_tag_b64": B64.encode(auth_tag.as_bytes()),
    });

    Ok(result.to_string())
}

pub fn decrypt(params: DecryptParams) -> Result<String, String> {
    let key_bytes = B64.decode(&params.key_b64).map_err(|e| format!("Invalid key base64: {e}"))?;
    let key = lyl_cipher::Key::from_slice(&key_bytes).map_err(|e| e.to_string())?;
    let nonce_bytes = B64.decode(&params.nonce_b64).map_err(|e| format!("Invalid nonce base64: {e}"))?;
    let nonce = lyl_cipher::Nonce::from_slice(&nonce_bytes).map_err(|e| e.to_string())?;
    let ciphertext = B64.decode(&params.ciphertext_b64).map_err(|e| format!("Invalid ciphertext base64: {e}"))?;
    let tag_bytes = B64.decode(&params.auth_tag_b64).map_err(|e| format!("Invalid auth_tag base64: {e}"))?;
    let auth_tag = lyl_cipher::AuthTag::from_slice(&tag_bytes).map_err(|e| e.to_string())?;

    let plaintext = lyl_cipher::decrypt(&key, &nonce, &ciphertext, &auth_tag).map_err(|e| e.to_string())?;
    Ok(B64.encode(&plaintext))
}
