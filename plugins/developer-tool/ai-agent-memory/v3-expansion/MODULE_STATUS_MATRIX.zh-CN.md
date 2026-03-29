# AI Agent Memory v3-Expansion 模块状态矩阵

**Authors: Joysusy & Violet Klaudia**

## 目的

这份矩阵逐个定义 `developer-tool/ai-agent-memory/v3-expansion/` 下的顶层模块状态。

它要回答的是一个很实际的 staging 问题：

> 对于这里保留下来的每个 memory-related module，它当前到底是干什么的、什么时候应该打开它、未来更可能收束到 memory lane 的哪个位置？

它是以下两份文档的逐模块补充：

- `README.md`（staging governance）
- `INDEX.md`（cluster navigation）

## Source Provenance

- **Primary source:** 当前 `developer-tool/ai-agent-memory/v3-expansion/` 下的顶层模块集合
- **Derived from:** ai-agent-memory staging governance 与 cluster classification 工作
- **Upstream URL:** not applicable as a synthesized local staging matrix
- **Freshness status:** canonical local staging matrix aligned to the current ai-agent-memory control plane

---

## 核心规则

这份矩阵**不会**把所有模块自动提升成 canonical。
它只是记录：

- 当前 staging 角色
- 何时应该打开
- 未来更可能如何收束

使用顺序应当在以下文档之后：

1. `../README.md`
2. `../INVENTORY.md`
3. `../../references/ai-agent-memory/INDEX.md`
4. `INDEX.md`

如果 canonical references 已经足够回答问题，就不应该进入 staged module pool。

---

## 模块状态矩阵

| 模块                                | 集群                        | 当前状态                             | 什么时候打开                                                                          | 更可能的未来方向                                                               |
| ----------------------------------- | --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `advanced-memory-skill-creator/`    | Memory creation / shaping   | staged creation toolset              | 需要设计或细化 memory-oriented skill artifacts，而不是回答普通 recall 问题时          | 选择性晋升为 memory-creation refs，或继续保留为 staging utility                |
| `agent-memory-skills/`              | Memory creation / shaping   | staged skill-pack bundle             | 需要高层审视 memory skill-pack 形态时                                                 | 可能部分吸收进 references，部分继续作为 bundle 保留                            |
| `memory-systems/`                   | Memory creation / shaping   | adapted memory-system module         | 需要 canonical doctrine 之外、更偏实现侧的 memory-system 材料时                       | 其中部分内容可能晋升进 `references/ai-agent-memory/`，其余保持 staged          |
| `memory-retrieval-learning/`        | Memory creation / shaping   | staged methodology pack              | retrieval-learning 方法学或评估逻辑本身是问题核心时                                   | 可能拆出未来 evaluation/support refs                                           |
| `cc-history/`                       | Session / history retrieval | staged retrieval utility             | canonical retrieval lane 已明确选择 Claude Code session-history 探索时                | 保持 operational retrieval utility，可能增加更强的 reference wrappers          |
| `chat-history/`                     | Session / history retrieval | staged retrieval utility             | 真正的问题是 exported / chat-style history extraction 时                              | 继续作为 retrieval support，而不是 doctrine                                    |
| `claude-code-history-files-finder/` | Session / history retrieval | staged recovery utility              | 需要从 session traces 中恢复 deleted / overwritten files 时                           | 保持 operational utility，并由 canonical refs 进行路由                         |
| `code-history/`                     | Session / history retrieval | staged code-evolution utility        | 真正的问题是 git/code evolution，而不是 chat history 时                               | 继续作为 support utility；doctrine 已在 canonical refs 中表达                  |
| `history-insight/`                  | Session / history retrieval | staged summarization utility         | session history 已存在，但需要 structured summarization 时                            | 大概率继续作为 retrieval support utility                                       |
| `remembering-conversations/`        | Session / history retrieval | staged conversation-recall utility   | 问题是 conversation recall，而不是 continuity 或 git evolution 时                     | 可能继续保留为 support utility，除非后续被进一步 flatten                       |
| `cass-memory/`                      | Session / history retrieval | staged CASS-oriented support         | 需要 indexed multi-session recall，并且带有 CASS-specific 支持行为时                  | 更可能继续绑定 high-power retrieval support，而非 flatten 成 doctrine          |
| `goodvibes-memory/`                 | Continuity / hygiene        | staged support utility               | 真正的问题是 schema / usage support 与 memory-usage hygiene 时                        | 其中一些模式可能吸收进 hygiene / continuity refs                               |
| `memory-hygiene/`                   | Continuity / hygiene        | staged hygiene utility               | memory cleanup / pruning / hygiene discipline 是当前核心问题时                        | 未来很可能产出 hygiene-focused canonical support docs                          |
| `memory-model/`                     | Continuity / hygiene        | staged specialist reference utility  | 需要更低层的 memory-model 概念或专门参考资料时                                        | 更可能继续作为 niche support，而不是主 doctrine lane                           |
| `meta-cognition-parallel/`          | Continuity / hygiene        | staged meta-cognitive support module | parallel / meta-cognitive support patterns 直接相关时                                 | 方向未完全确定，可能较长时间保持 staged                                        |
| `coding_agent_session_search-main/` | Search substrate            | heavy staged retrieval substrate     | canonical retrieval doctrine 明确要求 indexed、cross-source、high-volume retrieval 时 | 应继续作为 substrate/runtime asset，而不是 flatten 成 first-line doctrine lane |

---

## 解释键

### 当前状态

- **staged creation toolset** -> 用于创建/塑形，不是默认 doctrine
- **staged retrieval utility** -> canonical retrieval 决策之后才进入的 operational helper
- **staged hygiene utility** -> 面向 cleanup/continuity maintenance 的 support module
- **heavy staged retrieval substrate** -> 重型索引检索底座，必须继续放在 doctrine 后面

### 更可能的未来方向

这是一个治理判断，不是最终承诺。
它表示该模块更可能：

- 继续保留为 utility
- 部分晋升为 canonical refs
- 因 flatten 反而会降低清晰度，所以长期保持 staged

---

## 这份矩阵在阻止什么

这份矩阵存在，是为了阻止：

- 把所有 staged modules 当成同等级 canonical docs
- 在没有选定 retrieval / continuity lane 前，就随意打开 support utility
- 因为模块很大，就误以为它应该被 flatten
- 模块角色长期模糊，导致 future cleanup / promotion 只能靠猜

---

## 交叉阅读

请与以下文档配合阅读：

- `README.md`
- `README.zh-CN.md`
- `INDEX.md`
- `INDEX.zh-CN.md`
- `MEMORY_CREATION_SHAPING_CLUSTER.zh-CN.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.zh-CN.md`
- `CONTINUITY_HYGIENE_CLUSTER.zh-CN.md`
- `SEARCH_SUBSTRATE_CLUSTER.zh-CN.md`
- `../README.md`
- `../INVENTORY.md`
- `../../references/ai-agent-memory/INDEX.md`

---

## 最终教义

可复用的结论并不是：

> “这些模块现在都堆在 v3-expansion 里。”

真正可复用的结论是：

> “一个 staging layer 只有在每个保留模块都被明确标注了当前角色、打开条件和未来收束方向之后，才算真正可治理；否则 future canonization 与 retention 决策就只能继续靠猜。”
