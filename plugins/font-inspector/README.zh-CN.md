<!-- Authors: Joysusy & Violet Klaudia 💖 -->
# Font Inspector 插件 v2.0.0

高性能 Claude Code 字体可视化与分析插件，采用双语言实现（Python + Rust），集成 MCP 服务器，针对 CJK 字体深度优化。隶属于 [violet-plugin-place](../../) 插件市场。

## 功能特性

- **双语言架构**：Python 提供灵活性，Rust 提供极致性能
- **MCP 服务器**：JSON-RPC 2.0 协议，提供 5 个工具实现程序化字体访问
- **SVG 导出**：将字体字形转换为独立 SVG 文件
- **UFO 转换**：导出为 UFO 格式，支持字体编辑器打开
- **字体对比**：跨字体比较字形轮廓与度量数据
- **CJK 优化**：针对大型 CJK 字符集（65,000+ 字形）的专项优化
- **并行处理**：基于 Rust + rayon 的多线程提取
- **进度追踪**：大批量导出时的实时进度条
- **Unicode 范围过滤**：按指定字符范围导出
- **预设字符集**：快速访问常用字符集合

## 安装

### 前置依赖

**Python**（3.8+）：
```bash
pip install fonttools ufoLib2
```

**Rust**（1.75+）：
```bash
cd scripts/rust
cargo build --release
```

### 插件安装

本插件通过 **violet-plugin-place** 插件市场分发：

```
violet-plugin-place/
└── plugins/
    └── font-inspector/    ← 当前位置
```

插件通过市场安装后会被 Claude Code 自动发现。也可通过 `~/.claude/plugins/installed_plugins.json` 手动注册：

```json
"font-inspector@local": [
  {
    "scope": "user",
    "installPath": "<violet-plugin-place>/plugins/font-inspector",
    "version": "2.0.0"
  }
]
```

或运行安装脚本：
```bash
cd <violet-plugin-place>/plugins/font-inspector
bash install.sh
```

## 命令

### `/inspect-font` — 全功能分析（Python）

全面的字体分析与可视化，支持 SVG/UFO 导出。

```bash
/inspect-font MyFont.ttf --svg --preset cjk-common
/inspect-font MyFont.otf --svg --chars "你好世界ABC"
/inspect-font MyFont.ttf --all --ufo --output ./full_analysis/
```

详见 [commands/inspect-font.md](commands/inspect-font.md)。

### `/inspect-font-fast` — 高性能提取（Rust）

比 Python 快 10 倍，推荐用于 10,000+ 字符的 CJK 字体。

```bash
/inspect-font-fast MyFont.otf --preset cjk-common --progress
/inspect-font-fast HugeFont.ttf --range 0x4E00-0x9FFF --limit 1000
/inspect-font-fast MyFont.ttf --preset cjk-common --ufo --progress --parallel
```

详见 [commands/inspect-font-fast.md](commands/inspect-font-fast.md)。

### `/compare-fonts` — 跨字体字形对比

使用 MCP 引擎比较两个字体文件的字形与度量数据。

```bash
/compare-fonts NotoSansCJK-Regular.ttf NotoSerifCJK-Regular.ttf --glyphs "你好世界" --metrics vertical
/compare-fonts Inter-Regular.otf Roboto-Regular.ttf --glyphs "AaBbGgQq" --metrics horizontal
```

详见 [commands/compare-fonts.md](commands/compare-fonts.md)。

## MCP 服务器

Font Inspector 内置 MCP 服务器（`font-inspector-mcp`），通过 stdio 上的 JSON-RPC 2.0 协议暴露字体分析工具，使 Claude Code 能够以编程方式访问字体数据。

### 配置

定义在 `.mcp.json` 中：
```json
{
  "font-inspector": {
    "command": "${CLAUDE_PLUGIN_ROOT}/scripts/rust/target/release/font-inspector-mcp",
    "args": [],
    "env": {}
  }
}
```

### 可用 MCP 工具

| 工具 | 描述 |
|------|------|
| `extract_glyph` | 提取单个字形的 SVG 路径数据与度量信息 |
| `extract_all` | 批量提取字形（支持字符列表、范围、预设） |
| `convert_ufo` | 将提取的字形转换为 UFO 格式 |
| `compare_glyphs` | 跨两个字体比较相同字符 |
| `analyze_metrics` | 分析字体元数据（字族、UPM、字形数、上升/下降值） |

### MCP 资源

| URI 模式 | 描述 |
|----------|------|
| `glyph://U+{codepoint}` | 通过 Unicode 码位访问字形数据（需提供 `font_path`） |

### MCP 服务器特性

- **有状态缓存**：已解析的字体数据缓存在内存中，加速重复访问
- **协议版本**：MCP 2024-11-05 兼容
- **传输方式**：stdio（JSON-RPC 2.0，每行一个 JSON 对象）

## 架构

### Python vs Rust 使用场景

| 场景 | 推荐方案 |
|------|----------|
| 字体 < 5,000 字符 | Python（`/inspect-font`） |
| 字体 > 10,000 字符（CJK） | Rust（`/inspect-font-fast`） |
| UFO 编辑工作流 | Python |
| 批量处理多个字体 | Rust |
| Claude 程序化访问 | MCP 服务器（Rust） |

### 性能对比

| 字体类型 | 字符数 | Python | Rust（并行） | 内存（Py / Rust） |
|----------|--------|--------|-------------|-------------------|
| 拉丁文 | 256 | 0.5s | 0.03s | ~50MB / ~5MB |
| CJK 中等 | 5,000 | 15s | 0.4s | ~300MB / ~20MB |
| CJK 完整 | 65,000 | 180s | 3s | ~800MB / ~45MB |

## 预设字符集

| 预设名 | 描述 | 字符数 |
|--------|------|--------|
| `latin` | 基础拉丁文（A-Z、0-9） | ~100 |
| `latin-extended` | 拉丁文 + 重音字符 | ~500 |
| `cjk-basic` | 最常用 CJK 字符 | 500 |
| `cjk-common` | 常用 CJK 字符 | 3,000 |
| `cjk-full` | 全部 CJK 统一表意文字 | 20,000+ |

## 钩子（Hooks）

Font Inspector 注册了两个钩子（见 `hooks/hooks.json`）：

- **PreToolUse**（`font-detector.js`）：在 Bash/Read/Write/Edit 操作中自动检测字体文件
- **PostToolUse**（`svg-validator.js`）：验证 MCP 工具调用产生的 SVG 输出

## 输出结构

```
font_analysis/
├── metadata.json          # 字体信息
├── svg_glyphs/            # 独立 SVG 文件
│   ├── U0041.svg          # 字符 'A'
│   ├── U4E00.svg          # 字符 '一'
│   └── ...
├── manifest.json          # 供 Claude 分析的 SVG 路径数据
└── output.ufo/            # UFO 格式（使用 --ufo 时生成）
    ├── fontinfo.plist
    ├── glyphs/
    └── ...
```

## 技能自动激活

`font-visualizer` 技能在以下情况自动激活：
- 提及字体文件（.ttf、.otf、.woff、.woff2）
- 询问字体结构或字符覆盖范围
- 请求字形分析或对比

## 开发

### 构建 Rust 二进制文件

```bash
cd scripts/rust
cargo build --release
cargo test
cargo clippy -- -D warnings
```

构建产生两个二进制文件（位于 `target/release/`）：
- `font-inspector` — CLI 工具，用于 `/inspect-font-fast`
- `font-inspector-mcp` — MCP 服务器，用于程序化访问

### 运行测试

```bash
# Python
python -m pytest scripts/

# Rust
cd scripts/rust
cargo test
```

## 故障排除

| 问题 | 解决方案 |
|------|----------|
| `fontTools not installed` | `pip install fonttools ufoLib2` |
| Rust 二进制文件未找到 | `cd scripts/rust && cargo build --release` |
| 大型 CJK 字体内存错误 | 使用 `--limit` 或 `--preset cjk-common` |
| 首次运行缓慢 | 首次运行需编译 Rust 代码，后续运行即时完成 |

## 许可证

MIT License

## 致谢

- **fontTools**：Python 字体操作库
- **ttf-parser**：Rust 零拷贝字体解析器
- **norad**：Rust UFO 格式库
- **kurbo**：贝塞尔曲线数学库
- **rayon**：Rust 并行处理库

---

*Authors: Joysusy & Violet Klaudia — 针对 CJK 字体优化 | 基于 Rust + Python 构建*
