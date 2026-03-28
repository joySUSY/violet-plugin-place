# TypeScript 引擎模块暂存治理

# Authors: Joysusy & Violet Klaudia 💖

## 目的

本文档定义 `typescript-coding-engine/modules/` 的角色。

这些目录目前**不是** canonical doctrine lane。
它们是为后续 deep fusion 预留的 staging zone：当某个主题过大、例子过多、实现与说明混杂过深，暂时还不适合直接压缩进 `references/` 时，就先放在这里。

本文档的目的，是明确这些 staging zone 的边界，防止它们悄悄演变成第二套 doctrine center。

---

## 核心规则

`modules/` 的职责是承接“尚未完全沉淀好的复杂度”，而不是替代 canonical doctrine。

允许的流向是：

`source reservoir -> canonical references -> staged modules（如确有必要）-> bounded runtime surfaces`

禁止的流向是：

`source reservoir -> staged modules 直接成为默认阅读入口`

如果某个问题已经能在 `references/` 中被清晰讲明，它就不应优先落入 `modules/`。
`modules/` 只适合承接尚未 flatten 完成的复杂簇。

---

## 当前模块区

| 模块                  | 当前意图                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `advanced-types/`     | 承接超出当前 advanced lane 根文档与 cookbook 的更深高级类型材料                                   |
| `inference/`          | 承接更重 inference 压力的暂存材料，未来可能继续吸收入 advanced/support doctrine                   |
| `quality-gates/`      | 承接过大、无法在单一参考页中清晰表达的质量门禁 / CI 相关材料                                      |
| `react-rn-bridges/`   | 承接尚未提升为稳定一线 doctrine 的前端 / 移动桥接材料                                             |
| `runtime-validation/` | 承接超出当前 clean-code lane 文档承载范围的更大 validation 材料与例子                             |
| `rust-interop/`       | 承接 Rust↔TypeScript / WASM / Tauri 的更深互操作材料，当前仍过大或 donor 味过重，不宜直接 flatten |

---

## 它们未来可能变成什么

staged module 后续可能产出：

- 一个或多个 canonical reference 文档
- 某条 lane 的 cookbook / playbook
- 稳定 doctrine lane 的 supporting examples
- 在确有重复工作流价值时，成为有边界的 runtime support material

但 staged module 不应该变成：

- 普通任务的默认第一阅读入口
- 因为懒得整理而长期保留下来的 donor mirror
- 与 `references/` 平行的第二控制中心

---

## 晋升条件

只有在满足以下条件时，staged material 才应晋升进 canonical doctrine：

1. 这个主题已经有清晰的 doctrinal role
2. 说明与实现边界已经足够明确
3. 能在不依赖 donor path 的前提下保持 cleanup-safe
4. 晋升后的 reference 比 staged bundle 更小、更清晰、更可复用

如果这些条件还不满足，就继续保持 staging。

---

## 阅读规则

对于正常引擎使用：

1. 先从 `references/INDEX.md` 进入
2. 先读 canonical lane docs
3. 只有在 canonical lane 明确还无法回答问题时，才进入 `modules/`

这样才能保证 staging 始终服从 doctrine，而不是反过来。

---

## 为什么这件事重要

如果没有明确的 staging policy，空目录或半成品模块会立刻变得含糊：

- 读者不知道它是不是第一等级入口
- future agents 可能过早路由进去
- donor-derived material 可能会永远留在里面，既不晋升也不清理

本文档就是为了阻止这种漂移。

---

## 交叉阅读

请与以下文档配合阅读：

- `../references/INDEX.md`
- `../references/source-reservoir-map.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`

---

## 最终教义

可复用的结论并不是：

> “TypeScript 引擎里有几个留着以后再用的空模块文件夹。”

真正可复用的结论是：

> “module staging 是一种治理层：只有当复杂度尚未清晰到足以进入 canonical doctrine 时，才暂存在这里；它必须始终服从 references 树，并且只有当新文档会比原 staged bundle 更小、更清晰、更少 donor 味时，才允许晋升。”
