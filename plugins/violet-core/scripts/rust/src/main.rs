// Authors: Joysusy & Violet Klaudia 💖
// Violet Soul Cipher v4 — Multi-layer Rust encryption with backward compatibility
use std::fs;
use std::path::{Path, PathBuf};

use aes::cipher::{block_padding::Pkcs7, BlockDecryptMut, BlockEncryptMut, KeyIvInit};
use aes_gcm::{aead::Aead, Aes256Gcm, KeyInit, Nonce as GcmNonce};
use anyhow::{bail, Context, Result};
use argon2::Argon2;
use chacha20poly1305::{ChaCha20Poly1305, Nonce as ChaChaNonce};
use clap::{Parser, Subcommand};
use hmac::{Hmac, Mac};
use rand::RngCore;
use sha2::Sha256;
use zeroize::Zeroize;

const VERSION_V4: u8 = 0x04;
const ARGON2_SALT_LEN: usize = 32;
const GCM_NONCE_LEN: usize = 12;
const AES_CBC_IV_LEN: usize = 16;
const KEY_LEN: usize = 32;

const LOCAL_SALT: &str = "violet-soul-salt-local-2026";
const GIT_SALT: &str = "violet-soul-salt-git-2026";
const OUTER_SALT: &str = "violet-outer-shell-2026";

const EMBEDDED_SEED: &[u8; 32] = b"V10l3t-C1ph3r-S33d-2026-Kl4ud1a!";

const TARGET_FILES: &[&str] = &["rules-index.json", "minds-index.json", "vibe-library.json"];

type Aes256CbcEnc = cbc::Encryptor<aes::Aes256>;
type Aes256CbcDec = cbc::Decryptor<aes::Aes256>;

#[derive(Parser)]
#[command(name = "violet-cipher", version = "4.0.0")]
#[command(about = "Violet Soul Cipher v4 — Multi-layer encryption")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Encrypt data files with local key (v4 multi-layer)
    EncryptLocal {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Decrypt .enc files to .json (auto-detect v2/v3/v4)
    DecryptLocal {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Generate empty .git.enc placeholders for git
    EncryptGit {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Verify git placeholder decryption
    DecryptGit {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Upgrade v2/v3 .enc files to v4 format
    ReEncrypt {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Check encryption integrity and detect plaintext leaks
    Verify {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        #[arg(long)]
        data_dir: Option<PathBuf>,
    },
    /// Decrypt a single .enc file and output JSON to stdout
    DecryptFile {
        #[arg(long, env = "VIOLET_SOUL_KEY")]
        key: String,
        /// Path to the .enc file
        #[arg(long)]
        file: PathBuf,
        /// Salt label: "local" or "git"
        #[arg(long, default_value = "local")]
        salt: String,
    },
}

fn resolve_data_dir(custom: Option<PathBuf>) -> PathBuf {
    custom.unwrap_or_else(|| {
        let exe = std::env::current_exe().unwrap_or_default();
        exe.parent()
            .unwrap_or(Path::new("."))
            .join("..")
            .join("..")
            .join("data")
    })
}

fn derive_embedded_key() -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    for (i, byte) in EMBEDDED_SEED.iter().enumerate() {
        key[i] = byte ^ ((i as u8).wrapping_mul(0x5A).wrapping_add(0x3C));
    }
    key
}

fn derive_key_argon2(passphrase: &str, salt: &[u8]) -> Result<[u8; KEY_LEN]> {
    let embedded = derive_embedded_key();
    let mut combined = Vec::with_capacity(passphrase.len() + KEY_LEN);
    combined.extend_from_slice(passphrase.as_bytes());
    combined.extend_from_slice(&embedded);

    let mut key = [0u8; KEY_LEN];
    let argon2 = Argon2::default();
    argon2
        .hash_password_into(&combined, salt, &mut key)
        .map_err(|e| anyhow::anyhow!("Argon2id KDF failed: {}", e))?;

    combined.zeroize();
    Ok(key)
}

fn derive_key_scrypt(passphrase: &str, salt: &str) -> Result<[u8; KEY_LEN]> {
    let params = scrypt::Params::new(14, 8, 1, KEY_LEN)
        .map_err(|e| anyhow::anyhow!("scrypt params: {}", e))?;
    let mut key = [0u8; KEY_LEN];
    scrypt::scrypt(passphrase.as_bytes(), salt.as_bytes(), &params, &mut key)
        .map_err(|e| anyhow::anyhow!("scrypt KDF failed: {}", e))?;
    Ok(key)
}

fn random_bytes<const N: usize>() -> [u8; N] {
    let mut buf = [0u8; N];
    rand::thread_rng().fill_bytes(&mut buf);
    buf
}

fn encrypt_aes_gcm(key: &[u8; KEY_LEN], plaintext: &[u8]) -> Result<Vec<u8>> {
    let cipher = Aes256Gcm::new_from_slice(key)
        .map_err(|e| anyhow::anyhow!("AES-GCM init: {}", e))?;
    let nonce_bytes = random_bytes::<GCM_NONCE_LEN>();
    let nonce = GcmNonce::from_slice(&nonce_bytes);
    let ciphertext = cipher
        .encrypt(nonce, plaintext)
        .map_err(|e| anyhow::anyhow!("AES-GCM encrypt: {}", e))?;
    let mut out = Vec::with_capacity(GCM_NONCE_LEN + ciphertext.len());
    out.extend_from_slice(&nonce_bytes);
    out.extend_from_slice(&ciphertext);
    Ok(out)
}

fn decrypt_aes_gcm(key: &[u8; KEY_LEN], data: &[u8]) -> Result<Vec<u8>> {
    if data.len() < GCM_NONCE_LEN + 16 {
        bail!("AES-GCM data too short");
    }
    let cipher = Aes256Gcm::new_from_slice(key)
        .map_err(|e| anyhow::anyhow!("AES-GCM init: {}", e))?;
    let nonce = GcmNonce::from_slice(&data[..GCM_NONCE_LEN]);
    cipher
        .decrypt(nonce, &data[GCM_NONCE_LEN..])
        .map_err(|e| anyhow::anyhow!("AES-GCM decrypt failed: {}", e))
}

fn encrypt_chacha20(key: &[u8; KEY_LEN], plaintext: &[u8]) -> Result<Vec<u8>> {
    let cipher = ChaCha20Poly1305::new_from_slice(key)
        .map_err(|e| anyhow::anyhow!("ChaCha20 init: {}", e))?;
    let nonce_bytes = random_bytes::<GCM_NONCE_LEN>();
    let nonce = ChaChaNonce::from_slice(&nonce_bytes);
    let ciphertext = cipher
        .encrypt(nonce, plaintext)
        .map_err(|e| anyhow::anyhow!("ChaCha20 encrypt: {}", e))?;
    let mut out = Vec::with_capacity(GCM_NONCE_LEN + ciphertext.len());
    out.extend_from_slice(&nonce_bytes);
    out.extend_from_slice(&ciphertext);
    Ok(out)
}

fn decrypt_chacha20(key: &[u8; KEY_LEN], data: &[u8]) -> Result<Vec<u8>> {
    if data.len() < GCM_NONCE_LEN + 16 {
        bail!("ChaCha20 data too short");
    }
    let cipher = ChaCha20Poly1305::new_from_slice(key)
        .map_err(|e| anyhow::anyhow!("ChaCha20 init: {}", e))?;
    let nonce = ChaChaNonce::from_slice(&data[..GCM_NONCE_LEN]);
    cipher
        .decrypt(nonce, &data[GCM_NONCE_LEN..])
        .map_err(|e| anyhow::anyhow!("ChaCha20 decrypt failed: {}", e))
}

fn encrypt_aes_cbc(key: &[u8; KEY_LEN], plaintext: &[u8]) -> Vec<u8> {
    let iv = random_bytes::<AES_CBC_IV_LEN>();
    let cipher = Aes256CbcEnc::new_from_slices(key, &iv).expect("CBC init");
    let pad_len = 16 - (plaintext.len() % 16);
    let mut buf = vec![0u8; plaintext.len() + pad_len];
    buf[..plaintext.len()].copy_from_slice(plaintext);
    let ct = cipher.encrypt_padded_mut::<Pkcs7>(&mut buf, plaintext.len()).expect("CBC encrypt");
    let mut out = Vec::with_capacity(AES_CBC_IV_LEN + ct.len());
    out.extend_from_slice(&iv);
    out.extend_from_slice(ct);
    out
}

fn decrypt_aes_cbc(key: &[u8; KEY_LEN], data: &[u8]) -> Result<Vec<u8>> {
    if data.len() < AES_CBC_IV_LEN + 16 {
        bail!("AES-CBC data too short");
    }
    let iv = &data[..AES_CBC_IV_LEN];
    let ciphertext = &data[AES_CBC_IV_LEN..];
    let cipher = Aes256CbcDec::new_from_slices(key, iv)
        .map_err(|e| anyhow::anyhow!("CBC init: {}", e))?;
    let mut buf = ciphertext.to_vec();
    let pt = cipher
        .decrypt_padded_mut::<Pkcs7>(&mut buf)
        .map_err(|e| anyhow::anyhow!("AES-CBC decrypt failed: {}", e))?;
    Ok(pt.to_vec())
}

fn compute_hmac(key: &[u8], data: &[u8]) -> Vec<u8> {
    let mut mac = <Hmac<Sha256> as Mac>::new_from_slice(key).expect("HMAC init");
    mac.update(data);
    mac.finalize().into_bytes().to_vec()
}

// ═══════════════════════════════════════════
// V4 Multi-Layer Encryption (3 layers)
// ═══════════════════════════════════════════

fn v4_encrypt(passphrase: &str, salt_label: &str, plaintext: &[u8]) -> Result<Vec<u8>> {
    let inner_salt = random_bytes::<ARGON2_SALT_LEN>();
    let inner_key = derive_key_argon2(passphrase, &inner_salt)?;
    let inner_enc = encrypt_aes_gcm(&inner_key, plaintext)?;

    let mut inner_payload = Vec::with_capacity(ARGON2_SALT_LEN + inner_enc.len());
    inner_payload.extend_from_slice(&inner_salt);
    inner_payload.extend_from_slice(&inner_enc);

    let middle_passphrase = format!("{}-middle-{}", passphrase, salt_label);
    let middle_salt = random_bytes::<ARGON2_SALT_LEN>();
    let middle_key = derive_key_argon2(&middle_passphrase, &middle_salt)?;
    let middle_enc = encrypt_chacha20(&middle_key, &inner_payload)?;

    let mut middle_payload = Vec::with_capacity(ARGON2_SALT_LEN + middle_enc.len());
    middle_payload.extend_from_slice(&middle_salt);
    middle_payload.extend_from_slice(&middle_enc);

    let outer_passphrase = format!("{}-outer-{}", passphrase, salt_label);
    let outer_salt = random_bytes::<ARGON2_SALT_LEN>();
    let outer_key = derive_key_argon2(&outer_passphrase, &outer_salt)?;
    let outer_enc = encrypt_aes_gcm(&outer_key, &middle_payload)?;

    let hmac_key = derive_embedded_key();
    let hmac_data = compute_hmac(&hmac_key, &outer_enc);

    let mut output = Vec::with_capacity(1 + ARGON2_SALT_LEN + outer_enc.len() + 32);
    output.push(VERSION_V4);
    output.extend_from_slice(&outer_salt);
    output.extend_from_slice(&outer_enc);
    output.extend_from_slice(&hmac_data);
    Ok(output)
}

fn v4_decrypt(passphrase: &str, salt_label: &str, data: &[u8]) -> Result<Vec<u8>> {
    if data.len() < 1 + ARGON2_SALT_LEN + GCM_NONCE_LEN + 16 + 32 {
        bail!("v4 data too short");
    }
    if data[0] != VERSION_V4 {
        bail!("not v4 format");
    }

    let hmac_key = derive_embedded_key();
    let hmac_offset = data.len() - 32;
    let expected_hmac = &data[hmac_offset..];
    let computed_hmac = compute_hmac(&hmac_key, &data[1 + ARGON2_SALT_LEN..hmac_offset]);
    if expected_hmac != computed_hmac.as_slice() {
        bail!("HMAC verification failed — data tampered or wrong binary");
    }

    let outer_salt = &data[1..1 + ARGON2_SALT_LEN];
    let outer_enc = &data[1 + ARGON2_SALT_LEN..hmac_offset];
    let outer_passphrase = format!("{}-outer-{}", passphrase, salt_label);
    let outer_key = derive_key_argon2(&outer_passphrase, outer_salt)?;
    let middle_payload = decrypt_aes_gcm(&outer_key, outer_enc)?;

    if middle_payload.len() < ARGON2_SALT_LEN + GCM_NONCE_LEN + 16 {
        bail!("middle payload too short");
    }
    let middle_salt = &middle_payload[..ARGON2_SALT_LEN];
    let middle_enc = &middle_payload[ARGON2_SALT_LEN..];
    let middle_passphrase = format!("{}-middle-{}", passphrase, salt_label);
    let middle_key = derive_key_argon2(&middle_passphrase, middle_salt)?;
    let inner_payload = decrypt_chacha20(&middle_key, middle_enc)?;

    if inner_payload.len() < ARGON2_SALT_LEN + GCM_NONCE_LEN + 16 {
        bail!("inner payload too short");
    }
    let inner_salt = &inner_payload[..ARGON2_SALT_LEN];
    let inner_enc = &inner_payload[ARGON2_SALT_LEN..];
    let inner_key = derive_key_argon2(passphrase, inner_salt)?;
    decrypt_aes_gcm(&inner_key, inner_enc)
}

// ═══════════════════════════════════════════
// V3 Legacy Decryption (Node.js multi-layer)
// ═══════════════════════════════════════════

fn v3_decrypt(passphrase: &str, salt: &str, data: &[u8]) -> Result<Vec<u8>> {
    let outer_key = derive_key_scrypt(&format!("{}-outer", passphrase), OUTER_SALT)?;
    let inner_enc = decrypt_aes_cbc(&outer_key, data)?;
    let inner_key = derive_key_scrypt(passphrase, salt)?;
    decrypt_aes_cbc(&inner_key, &inner_enc)
}

fn v2_decrypt(passphrase: &str, data: &[u8]) -> Result<Vec<u8>> {
    let key = derive_key_scrypt(passphrase, "violet-soul-salt")?;
    decrypt_aes_cbc(&key, data)
}

fn auto_decrypt(passphrase: &str, salt: &str, data: &[u8]) -> Result<String> {
    if !data.is_empty() && data[0] == VERSION_V4 {
        let plain = v4_decrypt(passphrase, salt, data)?;
        return String::from_utf8(plain).context("v4 UTF-8 decode");
    }
    if let Ok(plain) = v3_decrypt(passphrase, salt, data) {
        if let Ok(s) = String::from_utf8(plain) {
            return Ok(s);
        }
    }
    if let Ok(plain) = v2_decrypt(passphrase, data) {
        if let Ok(s) = String::from_utf8(plain) {
            return Ok(s);
        }
    }
    bail!("decryption failed — tried v4, v3, v2")
}

// ═══════════════════════════════════════════
// CLI Command Handlers
// ═══════════════════════════════════════════

fn cmd_encrypt_local(key: &str, data_dir: &Path) -> Result<()> {
    println!("🔐 Encrypting local files (v4 multi-layer)...");
    for &name in TARGET_FILES {
        let json_path = data_dir.join(name);
        if !json_path.exists() {
            println!("  ⏭️  Skip (not found): {}", name);
            continue;
        }
        let plaintext = fs::read(&json_path).context("read JSON")?;
        let encrypted = v4_encrypt(key, LOCAL_SALT, &plaintext)?;
        let enc_path = data_dir.join(format!("{}.enc", name));
        fs::write(&enc_path, &encrypted).context("write .enc")?;
        println!("  ✅ {} → {}.enc ({} bytes)", name, name, encrypted.len());
    }
    println!("🔐 Local encryption complete.");
    Ok(())
}

fn cmd_decrypt_local(key: &str, data_dir: &Path) -> Result<()> {
    println!("🔓 Decrypting local .enc files (auto-detect v2/v3/v4)...");
    for &name in TARGET_FILES {
        let enc_path = data_dir.join(format!("{}.enc", name));
        if !enc_path.exists() {
            println!("  ⏭️  Skip (not found): {}.enc", name);
            continue;
        }
        let data = fs::read(&enc_path).context("read .enc")?;
        let json_str = auto_decrypt(key, LOCAL_SALT, &data)?;
        let json_path = data_dir.join(name);
        fs::write(&json_path, json_str.as_bytes()).context("write JSON")?;
        println!("  ✅ {}.enc → {} ({} bytes)", name, name, json_str.len());
    }
    println!("🔓 Local decryption complete.");
    Ok(())
}

fn cmd_encrypt_git(key: &str, data_dir: &Path) -> Result<()> {
    println!("📦 Generating .git.enc placeholders for git...");
    let placeholder = b"{}";
    for &name in TARGET_FILES {
        let encrypted = v4_encrypt(key, GIT_SALT, placeholder)?;
        let git_enc_path = data_dir.join(format!("{}.git.enc", name));
        fs::write(&git_enc_path, &encrypted).context("write .git.enc")?;
        println!("  ✅ {}.git.enc ({} bytes, empty placeholder)", name, encrypted.len());
    }
    println!("📦 Git placeholders generated.");
    Ok(())
}

fn cmd_decrypt_git(key: &str, data_dir: &Path) -> Result<()> {
    println!("🔍 Verifying .git.enc placeholder decryption...");
    for &name in TARGET_FILES {
        let git_enc_path = data_dir.join(format!("{}.git.enc", name));
        if !git_enc_path.exists() {
            println!("  ⏭️  Skip (not found): {}.git.enc", name);
            continue;
        }
        let data = fs::read(&git_enc_path).context("read .git.enc")?;
        let json_str = auto_decrypt(key, GIT_SALT, &data)?;
        if json_str.trim() == "{}" {
            println!("  ✅ {}.git.enc → verified (empty placeholder)", name);
        } else {
            println!("  ⚠️  {}.git.enc contains non-empty data: {} bytes", name, json_str.len());
        }
    }
    println!("🔍 Git placeholder verification complete.");
    Ok(())
}

fn cmd_re_encrypt(key: &str, data_dir: &Path) -> Result<()> {
    println!("🔄 Re-encrypting .enc files to v4 format...");
    for &name in TARGET_FILES {
        let enc_path = data_dir.join(format!("{}.enc", name));
        if !enc_path.exists() {
            println!("  ⏭️  Skip (not found): {}.enc", name);
            continue;
        }
        let data = fs::read(&enc_path).context("read .enc")?;
        if !data.is_empty() && data[0] == VERSION_V4 {
            println!("  ⏭️  Already v4: {}.enc", name);
            continue;
        }
        let json_str = auto_decrypt(key, LOCAL_SALT, &data)?;
        let re_encrypted = v4_encrypt(key, LOCAL_SALT, json_str.as_bytes())?;
        fs::write(&enc_path, &re_encrypted).context("write v4 .enc")?;
        println!("  ✅ {}.enc upgraded to v4 ({} bytes)", name, re_encrypted.len());
    }
    println!("🔄 Re-encryption complete.");
    Ok(())
}

fn cmd_verify(key: &str, data_dir: &Path) -> Result<()> {
    println!("🛡️  Verifying encryption integrity...");
    let mut issues = 0u32;

    for &name in TARGET_FILES {
        let json_path = data_dir.join(name);
        if json_path.exists() {
            let content = fs::read_to_string(&json_path).unwrap_or_default();
            if content.contains(key) {
                println!("  🚨 LEAK: {} contains the encryption key!", name);
                issues += 1;
            }
        }

        let enc_path = data_dir.join(format!("{}.enc", name));
        if enc_path.exists() {
            let data = fs::read(&enc_path).context("read .enc")?;
            if data.is_empty() {
                println!("  ⚠️  Empty file: {}.enc", name);
                issues += 1;
            } else if data[0] == VERSION_V4 {
                match v4_decrypt(key, LOCAL_SALT, &data) {
                    Ok(plain) => {
                        match String::from_utf8(plain) {
                            Ok(s) => println!("  ✅ {}.enc — v4, valid JSON ({} bytes)", name, s.len()),
                            Err(_) => {
                                println!("  ⚠️  {}.enc — v4 decrypts but not valid UTF-8", name);
                                issues += 1;
                            }
                        }
                    }
                    Err(e) => {
                        println!("  ❌ {}.enc — v4 decrypt failed: {}", name, e);
                        issues += 1;
                    }
                }
            } else {
                println!("  ℹ️  {}.enc — legacy format (v2/v3), consider re-encrypt", name);
                match auto_decrypt(key, LOCAL_SALT, &data) {
                    Ok(s) => println!("      ✅ Decrypts OK ({} bytes)", s.len()),
                    Err(e) => {
                        println!("      ❌ Decrypt failed: {}", e);
                        issues += 1;
                    }
                }
            }
        }

        let git_enc_path = data_dir.join(format!("{}.git.enc", name));
        if git_enc_path.exists() {
            let data = fs::read(&git_enc_path).context("read .git.enc")?;
            match auto_decrypt(key, GIT_SALT, &data) {
                Ok(s) if s.trim() == "{}" => {
                    println!("  ✅ {}.git.enc — valid empty placeholder", name);
                }
                Ok(s) => {
                    println!("  🚨 {}.git.enc contains real data ({} bytes)!", name, s.len());
                    issues += 1;
                }
                Err(e) => {
                    println!("  ❌ {}.git.enc — decrypt failed: {}", name, e);
                    issues += 1;
                }
            }
        }
    }

    if issues == 0 {
        println!("🛡️  All checks passed — no issues found.");
    } else {
        println!("🛡️  Found {} issue(s). Review above.", issues);
    }
    Ok(())
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::EncryptLocal { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_encrypt_local(&key, &dir)
        }
        Commands::DecryptLocal { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_decrypt_local(&key, &dir)
        }
        Commands::EncryptGit { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_encrypt_git(&key, &dir)
        }
        Commands::DecryptGit { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_decrypt_git(&key, &dir)
        }
        Commands::ReEncrypt { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_re_encrypt(&key, &dir)
        }
        Commands::Verify { key, data_dir } => {
            let dir = resolve_data_dir(data_dir);
            cmd_verify(&key, &dir)
        }
        Commands::DecryptFile { key, file, salt } => {
            let salt_label = if salt == "git" { GIT_SALT } else { LOCAL_SALT };
            let data = fs::read(&file).with_context(|| format!("read {:?}", file))?;
            let json_str = auto_decrypt(&key, salt_label, &data)?;
            print!("{}", json_str);
            Ok(())
        }
    }
}
