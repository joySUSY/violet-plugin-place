______________________________________________________________________

## priority: critical

# Platform Support & Cross-Platform Compatibility & Strategy | 跨平台兼容性与策略

Systems-level strategies for ensuring seamless behavior across Windows, macOS, and Linux. | 确保在 Windows、macOS 和 Linux 上实现无缝行为的系统级策略。

## 🔬 Research & Modernity (2026): Hardware-Abstracted I/O | 研究与现代性 (2026)：硬件抽象 I/O

- **Abstract Path Synthesis**: Using `typed-path` patterns to prevent canonicalization errors when processing Windows paths on Linux agents. | **抽象路径合成**: 使用 `typed-path` 模式防止在 Linux 智能体上处理 Windows 路径时出现规范化错误。
- **Hardware-Aware Readiness**: Automated detection of SIMD levels (AVX-512, Neon) to select the optimal implementation at runtime. | **硬件感知就绪**: 自动检测 SIMD 级别（AVX-512、Neon）以在运行时选择最佳实现。

**Supported Platforms**: Windows (via Git Bash/MSYS2/MinGW/PowerShell), Linux (all major distributions), macOS (Intel & ARM/M-series).

**Platform Detection in Taskfiles**:

- `{{.OS}}`: Detects operating system (windows, linux, darwin)
  - Windows detection: PowerShell, GOOS env, WINDIR/SYSTEMROOT, MSYSTEM (Git Bash/MSYS2/MinGW)
  - Linux/macOS: uname fallback with comprehensive error handling
- `{{.ARCH}}`: Detects CPU architecture (x86_64, arm64, etc.)
- `{{.EXE_EXT}}`: Platform-specific executable extension (.exe on Windows, empty on Unix)
- `{{.LIB_EXT}}`: Platform-specific library extension (dll on Windows, dylib on macOS, so on Linux)
- `{{.NUM_CPUS}}`: CPU count for parallel builds (PowerShell/sysctl/nproc/cpuinfo detection)

**Platform Guards in Task Files**:

- Use conditional commands: `cmd: "script.sh"; platforms: [linux, darwin]`
- Windows-specific: `cmd: "script.bat"; platforms: [windows]`
- Darwin-specific: `cmd: "script.sh"; platforms: [darwin]`
- Example: Cargo commands work on all platforms (Rust toolchain cross-platform)

**Cross-Platform Best Practices**:

1. Use Taskfile variables instead of hardcoded paths ({{.ROOT}}, {{.CRATES_DIR}})
1. Use forward slashes in paths; Taskfile converts to backslashes on Windows
1. Avoid shell-specific features; use platform-agnostic task commands
1. For scripts: create separate .sh (Unix) and .bat/.ps1 (Windows) files if needed
1. Test on Windows, Linux, and macOS in CI (or locally via Docker)

**Environment Variables for Cross-Platform**:

- `LD_LIBRARY_PATH` (Linux): Add target/release/target/debug for FFI tests
- `DYLD_LIBRARY_PATH` (macOS): Add target/release/target/debug for FFI tests
- `PATH` (Windows): Automatically uses backslashes for library lookup
