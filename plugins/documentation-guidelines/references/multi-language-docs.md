# Multi-Language Project Documentation Patterns | 多语言项目文档模式

Strategic patterns for documenting polyglot codebases (Rust, Python, JS/TS) with consistent semantics and cross-language clarity. | 在多语言代码库（Rust、Python、JS/TS）中记录文档的策略模式，具有一致的语义和跨语言清晰度。

## 🔬 Research & Modernity (2026): Adaptive Documentation | 研究与现代性 (2026)：自适应文档

- **Cross-FFI Semantic Mapping**: Document how data structures flow across Rust (safer-ffi) and Python (PyO3) boundaries. | **跨 FFI 语义映射**: 记录数据结构如何在 Rust (safer-ffi) 和 Python (PyO3) 边界之间流动。
- **Context-Aware Doc-Strings**: Use LLM-optimized doc-strings that prioritize "Why" over "What" for better AI ingestion. | **上下文感知文档字符串**: 使用 LLM 优化的文档字符串，优先考虑“为什么”而不是“是什么”，以便更好地进行 AI 摄取。

## Implementation Layers | 实现层

### 1. The FFI Boundary Doc Pattern | FFI 边界文档模式

```rust
#[ffi_export]
/// SAFETY: This function must be called with a valid pointer to a Buffer.
/// WARNING: The returned memory must be freed using `free_buffer`.
pub fn process_data(ptr: *const Buffer) { ... }
```

### 2. Multi-Tiered README Structure | 多层级 README 结构

- **Root README**: Ecosystem overview and orchestration logic. | **根 README**: 生态系统概述和编排逻辑。
- **Module README**: Deep technical specs and contribution rules. | **模块 README**: 深度技术规范和贡献规则。
