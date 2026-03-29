# AI Agent Memory v3-Expansion 暂存治理

# Authors: Joysusy & Violet Klaudia 💖

## 目的

本文档定义 `developer-tool/ai-agent-memory/v3-expansion/` 的角色。

这里不是 memory lane 的 canonical doctrine center。
它是一个**runtime-aligned module pool + staging layer**，里面放着已经搬入工作区、但尚未完全 flatten 进 `references/ai-agent-memory/` 的 memory/history/continuity modules、skill packs 与 retrieval tooling。

这份文档的目的，是终结一种模糊状态：
很多单独 skill pack 被并列摆在一个地方，却没有被清楚说明它们到底属于什么层级。

---

## 核心规则

`v3-expansion/` 是 staging 层，也是 runtime-aligned 模块层。  
它不是普通 memory 问题的第一阅读入口。

允许的流向是：

`source reservoir -> canonical ai-agent-memory references -> v3-expansion module pool（如有必要）-> plugin runtime shell`

禁止的流向是：

`v3-expansion module pool -> 默认 source of truth`

如果 canonical references tree 已经能回答问题，就不应该先进入 `v3-expansion/`。

---

## 这一层是什么

`v3-expansion/` 当前主要承担的是：

- 已经适配到工作区里的 memory/history skill packs
- 仍保留自身内部结构的 retrieval utilities
- continuity / hygiene 辅助模块
- 过大、过工具化、还不适合立刻 flatten 的搜索基底

它有价值，但它**还没有被统一 canonize 完成**。

---

## 当前集群图

| 集群                        | 模块                                                                                                                                            | 当前角色                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Memory creation / shaping   | `advanced-memory-skill-creator`, `agent-memory-skills`, `memory-systems`, `memory-retrieval-learning`                                           | 面向创建、塑形与 meta-memory 的 staging pool                     |
| Session / history retrieval | `cc-history`, `chat-history`, `claude-code-history-files-finder`, `code-history`, `history-insight`, `remembering-conversations`, `cass-memory` | canonical retrieval doctrine 背后的 operational retrieval 模块池 |
| Continuity / hygiene        | `goodvibes-memory`, `memory-hygiene`, `memory-model`, `meta-cognition-parallel`                                                                 | continuity / hygiene 相关支持模块                                |
| Search substrate            | `coding_agent_session_search-main`                                                                                                              | 重型索引检索基底，不是第一线 doctrine surface                    |

这个映射是描述性的，不代表最终固定分类法。

---

## 状态模型

在当前 memory lane 中，可以把组件分成：

| 状态                  | 含义                                                               |
| --------------------- | ------------------------------------------------------------------ |
| Canonical doctrine    | `references/ai-agent-memory/` 下的稳定阅读路径                     |
| Runtime shell         | `plugins/violet-memory-lab/` 下的 push-based continuity automation |
| Staging / module pool | `v3-expansion/` 下尚未 flatten 完成的适配模块池                    |
| Source reservoir      | canonical reading path 之外保留的 donor families                   |

核心结论是：

- `v3-expansion/` 已经高于 raw donor
- 但仍低于 canonical doctrine

这就是它目前最准确的层级定义。

---

## v3-Expansion 不应该变成什么

它不应该变成：

- 与 `references/ai-agent-memory/` 平行的第二知识中心
- 普通 memory 问题的默认入口
- 因为懒得整理而长期保留的大型 skill pack 停车场
- donor 或第三方目录结构的运行时镜像

一旦变成这些形态，memory lane 的控制面就会开始失真。

---

## 晋升条件

只有在满足以下条件时，`v3-expansion/` 中的模块或集群才应该继续往上晋升：

1. doctrinal role 已经足够清晰
2. 能被压缩成更小、更清楚的 canonical 文档
3. 与 runtime automation 的边界已经明确
4. 即使 donor path 未来变化，价值仍然成立
5. 已经不再需要保留为大型 operational / forensic bundle

一旦满足这些条件，典型目的地通常是：

- `references/ai-agent-memory/*.md`
- `plugins/violet-memory-lab/*`
- 如果确有必要，则是 `developer-tool` 内更细的 module/index

---

## 阅读规则

对于普通 memory work，推荐顺序是：

1. `developer-tool/ai-agent-memory/README.md`
2. `developer-tool/ai-agent-memory/INVENTORY.md`
3. `developer-tool/references/ai-agent-memory/INDEX.md`
4. canonical memory references
5. 只有在 canonical references 明确还回答不了时，才进入 `v3-expansion/`

这样 staging 才能始终服从 doctrine，而不是反过来。

---

## 为什么这层仍然重要

我们保留这一层，是因为这里的很多材料：

- 已经被适配进工作区
- 还不适合立即 flatten
- 在 doctrine 完成之前仍然有 operational 价值
- 值得作为中间态资产保存下来

所以正确动作不是删除，  
而是**受治理的暂存**。

---

## 未来收束方向

比较可能的未来路径包括：

- 把某些 cluster 压缩成更小的 canonical refs
- 给某些 cluster 补 cluster-level staging indexes
- 把 execution-centric 内容进一步移入 `plugins/violet-memory-lab/`
- 对真正重型的 search substrate 保持 module/runtime 资产身份，而不是强行 premature flatten

这意味着：
`v3-expansion/` 未来应该越来越“可读、可解释、可治理”，即使它不一定会完全消失。

---

## 交叉阅读

请与以下文档配合阅读：

- `../README.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`
- `INDEX.md`
- `MEMORY_CREATION_SHAPING_CLUSTER.zh-CN.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.zh-CN.md`
- `CONTINUITY_HYGIENE_CLUSTER.zh-CN.md`
- `SEARCH_SUBSTRATE_CLUSTER.zh-CN.md`
- `MODULE_STATUS_MATRIX.md`
- `MODULE_STATUS_MATRIX.zh-CN.md`
- `../../references/ai-agent-memory/INDEX.md`
- `../../references/ai-agent-memory/history-retrieval-patterns.md`
- `../../references/ai-agent-memory/source-reservoir-map.md`

---

## 最终教义

可复用的结论并不是：

> “v3-expansion 就是很多单独的 memory skills 现在堆在一起的地方。”

真正可复用的结论是：

> “`v3-expansion/` 是一个受治理的 staging + runtime-aligned 模块池：它比 raw donor 更整合，但还没有达到 canonical doctrine tree 的完成态；它的职责是在不与 references lane 竞争的前提下承接尚未解决的复杂度，直到每个集群被进一步 flatten、晋升，或者明确保留为 operational 资产。”
