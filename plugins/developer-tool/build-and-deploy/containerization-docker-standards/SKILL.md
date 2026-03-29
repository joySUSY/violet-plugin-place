______________________________________________________________________

## priority: medium

# Containerization & OCI Standards | 容器化与 OCI 标准

Strategic patterns for building reproducible, secure, and minimal container images. | 构建可重复、安全且最小化的容器镜像的战略模式。

## 🔬 Research & Modernity (2026): Minimal Attack Surface | 研究与现代性 (2026)：最小攻击面

- **Static Binary Orchestration**: Ensuring Rust/Go binaries are executed in `scratch` or `distroless` containers to eliminate vulnerabilities. | **静态二进制编排**: 确保 Rust/Go 二进制文件在 `scratch` 或 `distroless` 容器中执行，以消除漏洞。
- **Hermetic Build Verification**: Patterns for verifying that every build step is reproducible and verifiable against an SBOM. | **密封构建验证**: 用于验证每个构建步骤都是可重复的且可针对 SBOM 进行验证的模式。
- **Builder stage**: Full Rust toolchain + deps, compile with `--release --target x86_64-unknown-linux-musl`
- **Runtime stage**: Minimal base (Alpine 5MB, Distroless 20MB, or Scratch 0B for static binaries)
- Layer caching: copy `Cargo.toml`/`Cargo.lock` first, then source

## Security

- Run as non-root user (`adduser`)
- Scan with Trivy/Grype in CI, fail on HIGH/CRITICAL
- No secrets in image (use env vars or secret mounts)
- Read-only filesystem when possible

## Best Practices

- `tini`/`dumb-init` as PID 1 for signal handling
- `HEALTHCHECK` for orchestrator detection
- Immutable tags (use commit SHA, never reuse tags)
- BuildKit mount caches for cargo registry: `--mount=type=cache,target=/usr/local/cargo/registry`
- GHA cache: `cache-from: type=gha`, `cache-to: type=gha,mode=max`

## Image Tagging

Semantic version + latest + branch + commit SHA. Example: `myapp:1.2.3`, `myapp:latest`, `myapp:abc1234f`

## Anti-Patterns

- Running as root
- Large base images (ubuntu instead of alpine/distroless)
- Single-stage builds
- Not using BuildKit
- No HEALTHCHECK
- Hardcoding secrets
