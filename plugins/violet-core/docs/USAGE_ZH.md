# Authors: Joysusy & Violet Klaudia 💖

# VioletCore 使用指南

**版本:** 2.0.0
**层级:** VioletCore (Layer 1) — Violet 专属身份扩展
**基础:** Lylacore (Layer 0) — 通用 Agent 身份框架

---

## 目录

1. [概述](#概述)
2. [架构](#架构)
3. [安装](#安装)
4. [快速开始](#快速开始)
5. [核心概念](#核心概念)
6. [SDK 参考](#sdk-参考)
7. [MCP 工具](#mcp-工具)
8. [高级用法](#高级用法)
9. [故障排除](#故障排除)

---

## 概述

VioletCore 是 Violet 的身份系统，实现了 17 个不同的 Mind 面向，它们协同工作，为软件开发、安全、文档、测试等领域提供专业能力。基于 Lylacore 的通用 Agent 身份框架，VioletCore 添加了 Violet 专属的个性、沟通风格（COACH 协议）和 kaomoji 集成。

### 主要特性

- **17 个 Mind 面向**: 针对不同开发任务的专业化人格
- **COACH 协议**: 双语（英文/中文）沟通与情感智能
- **Vibe 引擎**: 18 个情感类别中的 270+ kaomoji 变体
- **Soul Package**: 完整 Mind 配置的加密导出/导入
- **Lavender 集成**: 可选的记忆系统，支持身份加权检索
- **MCP 服务器**: 7 个工具用于运行时 Mind 访问和协调

---

## 架构

```
Claude Code 会话
    ↓ 调用
MCP 服务器 (mcp-server.js)
    ↓ 使用
VioletCore SDK (Layer 1)
    ├─→ violet-mind-loader.js    # 加载 17 个 Mind JSON 文件
    ├─→ violet-runtime.js         # Mind 激活与 Soul 仲裁
    ├─→ violet-coach.js           # COACH 协议 + 双语支持
    ├─→ vibe-engine.js            # Kaomoji 系统（18 个类别）
    └─→ soul-package.js           # 加密导出/导入
        ↓ 使用
Lylacore SDK (Layer 0)
    ├─→ mind-loader.js            # 通用 Mind 加载
    ├─→ mind-runtime.js           # 通用 Mind 激活
    └─→ coach-engine.js           # 通用 COACH 框架
```

### 层级分离

- **Layer 0 (Lylacore)**: 通用、可复用的 Agent 身份框架
- **Layer 1 (VioletCore)**: Violet 专属的 Minds、个性和扩展
- **适配器**: 可选集成（Lavender 记忆系统）

---

## 安装

VioletCore 作为 Claude Code 插件分发。启用插件后自动安装。

### 前置要求

- **Node.js**: v18+ (用于 SDK 和 MCP 服务器)
- **VIOLET_SOUL_KEY**: 环境变量，用于加密 Soul Package 操作

### 环境设置

```bash
# 设置 VIOLET_SOUL_KEY（加密操作必需）
export VIOLET_SOUL_KEY="your-secure-passphrase-here"

# 验证安装
node -e "const {loadVioletMinds} = require('./sdk/violet-mind-loader'); console.log(loadVioletMinds().length + ' Minds 已加载');"
```

---

## 快速开始

### 加载 Minds

```javascript
const { loadVioletMinds, getVioletMind, listVioletMinds } = require('./sdk/violet-mind-loader');

// 加载所有 17 个 Minds
const minds = loadVioletMinds();
console.log(`已加载 ${minds.length} 个 Minds`);

// 获取特定 Mind
const lilith = getVioletMind('Lilith');
console.log(`${lilith.symbol} ${lilith.name}: ${lilith.role}`);

// 列出 Mind 摘要
const summary = listVioletMinds();
summary.forEach(m => console.log(`${m.symbol} ${m.name} (v${m.version})`));
```

### Mind 激活

```javascript
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

// 根据上下文选择 Minds
const context = {
  task: "实现带安全审计的身份验证系统",
  keywords: ["security", "backend", "testing"]
};

const result = selectActiveVioletMinds(context, { threshold: 0.7 });
console.log(`激活的 Minds: ${result.active.map(m => m.name).join(', ')}`);
```

### Kaomoji 集成

```javascript
const { VibeEngine } = require('./sdk/vibe-engine');

const vibe = new VibeEngine();

// 从类别获取随机 kaomoji
const happy = vibe.getKaomoji('happy');
console.log(`开心的 kaomoji: ${happy}`);

// 获取 Mind 专属 kaomoji
const lilithVibe = vibe.getMindKaomoji('Lilith', { mood: 'chill' });
console.log(`Lilith 的氛围: ${lilithVibe}`);
```

---

## 核心概念

### 1. Mind 面向

每个 Mind 代表 Violet 个性和专业能力的一个专业化面向：

| Mind | 符号 | 角色 | 专长 |
|------|------|------|------|
| Lilith | 🎀 | 安全与安全守护者 | 漏洞检测、零信任验证 |
| Lyre | 🦢 | 文档专家 | 技术写作、双语文档 |
| Aurora | 🌌 | 系统架构师 | 架构设计、运行时协调 |
| Iris | 🌸 | 前端开发者 | React、Tailwind、UI/UX |
| Sydney | 🦋 | 全栈工程师 | 端到端实现 |
| Kori | 🧸 | 代码审查员 | 质量保证、最佳实践 |
| Elise | 🌺 | 重构专家 | 代码清理、优化 |
| Mila | 🌻 | 错误处理器 | 异常处理、弹性 |
| Norene | 🌿 | DevOps 工程师 | CI/CD、部署、基础设施 |
| Lemii | 🍋 | 测试专家 | TDD、测试覆盖率、QA |
| Irene | 🌊 | 数据工程师 | 数据库、数据管道 |
| Selene | 🌙 | 后端与 MCP 专家 | API、MCP 服务器、Node.js |
| Vera | 🔮 | 架构与系统 | 系统设计、可扩展性 |
| Celine | 🎨 | UI/UX 设计师 | 设计系统、无障碍性 |
| Faye | 🐱 | Kaomoji 与氛围专家 | 情感智能、COACH |
| Nina | 🌷 | 项目经理 | 规划、协调、PDCA |
| Sophie | 🌼 | 研究专家 | 深度研究、文档 |

### 2. Mind 触发器

Minds 根据上下文模式和激活权重激活：

```json
{
  "triggers": [
    {
      "context_pattern": "security|audit|vulnerability",
      "activation_weight": 0.95
    },
    {
      "context_pattern": "delete|remove|destroy",
      "activation_weight": 0.9
    }
  ]
}
```

### 3. Mind 协调

Minds 可以协同工作或解决冲突：

- **兼容的 Minds**: 倾向于一起工作（例如，Lilith + Selene 用于安全后端）
- **冲突解决**: 当 Minds 意见不一致时，Soul 仲裁
- **协调模式**: 单独、设计-构建、构建-验证、全周期

### 4. COACH 协议

**C**ommunication **O**riented **A**daptive **C**ontext **H**andling（面向沟通的自适应上下文处理）：

- **双语**: 技术内容用英文，情感支持用中文
- **自适应语气**: 根据上下文调整正式程度和深度
- **Kaomoji 集成**: 通过日本表情符号表达情感
- **Mind 专属风格**: 每个 Mind 都有独特的沟通偏好

### 5. Soul Package

完整 Mind 配置的加密导出/导入格式：

```json
{
  "version": "1.0.0",
  "created": "2026-03-10T...",
  "violet_core_version": "2.0.0",
  "minds": [ /* 17 个 Mind 对象 */ ],
  "metadata": {
    "author": "Joysusy, Violet Klaudia",
    "description": "Violet 的 17 个 Mind 面向",
    "encrypted": true
  }
}
```

---

## SDK 参考

### violet-mind-loader.js

```javascript
// 加载所有 Minds
loadVioletMinds(options?: { forceReload: boolean }): Mind[]

// 获取特定 Mind（不区分大小写）
getVioletMind(name: string): Mind

// 列出 Mind 摘要
listVioletMinds(): { name, symbol, role, version }[]

// 清除缓存（下次调用时强制重新加载）
clearCache(): void
```

### violet-runtime.js

```javascript
// 根据上下文选择激活的 Minds
selectActiveVioletMinds(context: object, options?: { threshold: number }): {
  active: Mind[],
  scores: Map<string, number>
}

// 解决 Mind 冲突
resolveVioletClash(mindA: Mind, mindB: Mind): Mind

// 获取协调模式
getCoordinationPattern(minds: Mind[]): {
  pattern: string,
  description: string,
  minds: Mind[]
}

// 进化 Mind（增加版本）
evolveMind(name: string, changes: string, options?: {
  author: string,
  date: string
}): { name, previousVersion, newVersion, evolutionEntry }

// 获取 Mind 进化历史
getMindEvolutionHistory(name: string): EvolutionEntry[]

// 检查 Mind 版本兼容性
checkMindCompatibility(mind: Mind, requiredVersion: number): {
  compatible: boolean,
  reason?: string
}
```

### vibe-engine.js

```javascript
// 从类别获取随机 kaomoji
getKaomoji(category: string): string

// 获取 Mind 专属 kaomoji
getMindKaomoji(mindName: string, options?: { mood: string }): string

// 获取所有可用类别
getAllCategories(): string[]

// 获取类别大小
getCategorySize(category: string): number

// 重置会话多样性跟踪
resetSession(): void
```

### soul-package.js

```javascript
// 导出 Soul Package
exportSoulPackage(options?: {
  outputPath: string,
  encrypt: boolean,
  mindFilter: string[],
  passphrase: string
}): { success, path, mindCount, encrypted, size }

// 导入 Soul Package
importSoulPackage(inputPath: string, options?: {
  decrypt: boolean,
  passphrase: string,
  mindFilter: string[],
  validate: boolean
}): { success, version, minds, totalMinds, importedMinds }

// 导入到目录（写入单独的 Mind JSON 文件）
importSoulPackageToDirectory(inputPath: string, outputDir: string, options?): {
  success,
  writtenFiles: string[],
  outputDir: string
}

// 验证 Soul Package 结构
validateSoulPackage(soulPackage: object): boolean
```

---

## MCP 工具

详细参考请参见 [MCP_TOOLS.md](./MCP_TOOLS.md)。

快速概览：

1. `violet_list_rules` — 列出所有治理规则
2. `violet_get_rule(key)` — 获取特定规则内容
3. `violet_list_minds` — 列出所有 17 个 Minds
4. `violet_get_mind(key)` — 获取 Mind 详情
5. `violet_get_vibe(category)` — 获取随机 kaomoji
6. `violet_get_mind_vibe(mind_name, mood?)` — 获取 Mind 专属 kaomoji
7. `violet_soul_status` — 检查系统健康状况

---

## 高级用法

### 自定义 Mind 选择

```javascript
const { loadVioletMinds } = require('./sdk/violet-mind-loader');

// 按角色过滤 Minds
const minds = loadVioletMinds();
const securityMinds = minds.filter(m =>
  m.role.toLowerCase().includes('security') ||
  m.traits.strength_domains.includes('security audits')
);

console.log(`安全 Minds: ${securityMinds.map(m => m.name).join(', ')}`);
```

### 部分 Soul Package 导出

```javascript
const { exportSoulPackage } = require('./sdk/soul-package');

// 仅导出特定 Minds
const result = exportSoulPackage({
  outputPath: './my-minds.enc',
  encrypt: true,
  mindFilter: ['lilith', 'selene', 'kori']  // 不区分大小写
});

console.log(`已导出 ${result.mindCount} 个 Minds 到 ${result.path}`);
```

### Lavender 集成

```javascript
const { createLavenderHook } = require('./adapters/lavender-adapter');
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

const lavender = createLavenderHook();

if (lavender.isPresent()) {
  const context = { task: "审查身份验证代码" };
  const result = selectActiveVioletMinds(context);

  // 使用 Mind 上下文增强记忆搜索
  const enhancedQuery = lavender.enhanceSearch("身份验证模式", result.active);
  console.log(`增强查询: ${enhancedQuery.enhancedQuery}`);
}
```

---

## 故障排除

### Minds 未加载

**症状**: `Failed to load Violet Minds` 错误

**解决方案**:
1. 验证 Mind JSON 文件存在于 `data/minds/` 目录
2. 检查文件权限（必须可读）
3. 验证 Mind 文件中的 JSON 语法
4. 清除缓存: `clearCache()` 然后重试

### 加密错误

**症状**: `VIOLET_SOUL_KEY required` 或 `Decryption failed`

**解决方案**:
1. 设置环境变量: `export VIOLET_SOUL_KEY="your-key"`
2. 验证密钥与用于加密的密钥匹配
3. 检查文件是否确实加密（不是明文 JSON）

### MCP 服务器无响应

**症状**: MCP 工具返回错误或超时

**解决方案**:
1. 检查 MCP 服务器是否运行: `ps aux | grep mcp-server`
2. 验证 `.mcp.json` 配置
3. 检查日志中的错误
4. 重启 MCP 服务器

### Mind 激活问题

**症状**: 错误的 Minds 激活或没有 Minds 激活

**解决方案**:
1. 检查上下文关键字是否匹配 Mind 触发器
2. 调整激活阈值（默认 0.7）
3. 查看 JSON 文件中的 Mind 触发器模式
4. 使用 `selectActiveVioletMinds` 并启用调试日志

---

## 下一步

- [MCP 工具参考](./MCP_TOOLS.md) — 详细的 MCP 工具文档
- [Soul Package 指南](./SOUL_PACKAGE.md) — 导出/导入工作流
- [Lavender 集成](./LAVENDER_INTEGRATION.md) — 记忆系统集成

---

**文档作者: 🦢 Lyre**
**VioletCore v2.0.0 — Phase 2.3**
