______________________________________________________________________

## priority: critical

# CI/CD Multi-Platform Matrixing | CI/CD 多平台矩阵

Advanced strategies for scaling build and test workflows across diverse operating systems and architectures. | 在各种操作系统和架构上扩展构建和测试工作流的高级策略。

## 🔬 Research & Modernity (2026): Adaptive Matrixing | 研究与现代性 (2026)：自适应矩阵

- **Hardware-Aware Build Agents**: Configuring GitHub Actions to dynamically select ARM64/x64 runners based on the build target's SIMD requirements. | **硬件感知构建代理**: 配置 GitHub Actions 以根据构建目标的 SIMD 要求动态选择 ARM64/x64 运行器。
- **Predictive Cache Hydration**: Using historical build data to pre-warm remote caches for the most probable test paths. | **预测性缓存水合**: 使用历史构建数据为最可能的测试路径预热远程缓存。

## Matrix Strategy

Use `strategy.matrix` with `include` for specific OS/arch/language combinations. Always `fail-fast: false`.

**Platform targets**: Linux x86_64 + ARM64, macOS x86_64 + ARM64, Windows x86_64. ARM64 Linux uses `cross` crate.

## Language Version Matrices

| Language | Versions | Action |
|----------|----------|--------|
| Rust | MSRV, stable, nightly | `dtolnay/rust-toolchain` |
| Python | 3.8–3.12 | `actions/setup-python` |
| Node.js | 18, 20, 22 | `actions/setup-node` |
| Ruby | 3.0–3.3 | `ruby/setup-ruby` |
| Java | 11, 17, 21 | `actions/setup-java` (temurin) |
| Go | 1.20–1.22 | `actions/setup-go` |

## Caching

- Rust: `Swatinem/rust-cache` with `cache-targets: true`
- Node: `actions/setup-node` with `cache: 'npm'`
- Python: `actions/cache` on `~/.cache/pip`
- Docker: BuildKit GHA cache (`cache-from: type=gha`)

## Split Workflows by Domain

Separate `ci-rust.yaml`, `ci-python.yaml`, `ci-node.yaml`, etc. with path filters on relevant directories. Each runs lint → build → test → coverage.

## CI Pipeline Standards

- Workflows use `task` commands (never direct scripts): `task setup`, `task lint:check`, `task build:all`, `task test:all`
- Always set `BUILD_PROFILE=ci` in GitHub Actions
- Pre-commit hooks run in validate stage
- Stages: Validate → Build → Test → Deploy

## Anti-Patterns

- Cartesian product explosion (use `include` to select specific combos)
- No artifact caching
- Mixed domains in single workflow
- Hardcoded versions instead of matrix variables
- No cross-platform testing for FFI bindings
- No `fail-fast: false` (one failure hides others)
