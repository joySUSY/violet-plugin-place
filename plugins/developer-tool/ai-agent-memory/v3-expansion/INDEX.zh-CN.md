# AI Agent Memory v3-Expansion 索引

**Authors: Joysusy & Violet Klaudia**

## 目的

这是 `developer-tool/ai-agent-memory/v3-expansion/` 的 staging layer 导航入口。

它并不是要把 `v3-expansion/` 提升为 memory lane 的 source of truth，
而是为了在这个暂存层内部建立受控导航，避免它与以下层级混淆：

- `references/ai-agent-memory/` 下的 canonical doctrine tree
- `plugins/violet-memory-lab/` 下的 runtime automation shell
- 引擎外部保留的 donor/source reservoirs

只有在 canonical memory references 已经被查阅过、而且仍然需要更深的 staged module cluster 时，才应该使用这个索引。

## Source Provenance

- **Primary source:** 当前 `developer-tool/ai-agent-memory/v3-expansion/` 模块池
- **Derived from:** memory lane staging-governance formalization 与 cluster classification 工作
- **Upstream URL:** not applicable as a synthesized local staging index
- **Freshness status:** canonical local staging index aligned to the current ai-agent-memory control plane

---

## 核心规则

`v3-expansion/` 是 staging + runtime-aligned module pool。  
它不是 canonical doctrine tree。

推荐阅读顺序仍然是：

1. `../README.md`
2. `../INVENTORY.md`
3. `../../references/ai-agent-memory/INDEX.md`
4. canonical memory references
5. **只有在这些还不够时**，才进入 `v3-expansion/INDEX.md`

这个索引的作用，是减少 staging 内部的混乱，
而不是绕开 doctrine。

---

## 集群导航

### 1. Memory creation / shaping

当问题是关于 memory structure 的创建、塑形、评估，而不是普通 recall 或 continuity retrieval 时，进入这一组。

| 模块                             | 适用场景                                                         |
| -------------------------------- | ---------------------------------------------------------------- |
| `advanced-memory-skill-creator/` | 需要创建或细化 memory-oriented skills / knowledge artifacts      |
| `agent-memory-skills/`           | 需要高层审视 memory skill-pack 形态                              |
| `memory-systems/`                | 需要查看 canonical refs 之外更偏实现/结构向的 memory-system 材料 |
| `memory-retrieval-learning/`     | 需要探索 retrieval-learning 方法学或 memory shaping 评估材料     |

### 2. Session / history retrieval

只有在 `references/ai-agent-memory/history-retrieval-patterns.md` 已经选定 retrieval lane 之后，才进入这一组。

| 模块                                | 适用场景                                           |
| ----------------------------------- | -------------------------------------------------- |
| `cc-history/`                       | Claude Code session-history 探索                   |
| `chat-history/`                     | exported 或 chat-style history 提取                |
| `claude-code-history-files-finder/` | 从 session traces 恢复 deleted / overwritten files |
| `code-history/`                     | code-evolution / git-history 类型问题              |
| `history-insight/`                  | structured session-history summarization           |
| `remembering-conversations/`        | conversation-recall 工具支持                       |
| `cass-memory/`                      | CASS memory retrieval 支持                         |

### 3. Continuity / hygiene

当 canonical continuity docs 已经明确告诉你需要 operational support 或 maintenance-style module behavior 时，进入这一组。

| 模块                       | 适用场景                                        |
| -------------------------- | ----------------------------------------------- |
| `goodvibes-memory/`        | 需要 schema / memory-usage 支持工具             |
| `memory-hygiene/`          | 真正的问题是 memory cleanup / hygiene 行为      |
| `memory-model/`            | 需要更底层 memory-model 概念或专门参考资料      |
| `meta-cognition-parallel/` | 需要 parallel / meta-cognitive support patterns |

### 4. Search substrate

只有当 canonical retrieval doctrine 明确要求重型索引基底时，才进入这一组。

| 模块                                | 适用场景                                                                |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `coding_agent_session_search-main/` | 需要跨来源、大规模、索引化检索，而较轻 retrieval lanes 已不足以回答问题 |

---

## 按需求推荐阅读路径

### 如果问题是 recall doctrine

请优先从这里进入：

- `../../references/ai-agent-memory/recall-before-act.md`
- `../../references/ai-agent-memory/claude-recall-operating-model.md`
- `../../references/ai-agent-memory/claude-recall-patterns.md`

### 如果问题是 continuity 或 interruption recovery

请优先从这里进入：

- `../../references/ai-agent-memory/continuity-control-plane.md`
- `../../references/ai-agent-memory/working-state-and-self-reminder-discipline.md`

### 如果问题是 retrieval lane selection

请优先从这里进入：

- `../../references/ai-agent-memory/history-retrieval-patterns.md`

只有当这些 canonical docs 明确无法回答时，才进入 staged modules。

---

## 这个索引要阻止什么

这个索引存在，是为了阻止以下错误：

- 把所有 staged modules 当成同等级 canonical docs
- 在没有选定 retrieval lane 前就直接进入 `coding_agent_session_search-main/`
- 把 skill packs 当成 doctrine 替代品
- 把 continuity support modules 和 recall doctrine 混为一谈
- 把 adapted module pools 误认为已经 cleanup-ready 的 canonical structure

---

## 交叉阅读

请与以下文档配合阅读：

- `README.md`
- `README.zh-CN.md`
- `MEMORY_CREATION_SHAPING_CLUSTER.zh-CN.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.zh-CN.md`
- `CONTINUITY_HYGIENE_CLUSTER.zh-CN.md`
- `SEARCH_SUBSTRATE_CLUSTER.zh-CN.md`
- `MODULE_STATUS_MATRIX.md`
- `MODULE_STATUS_MATRIX.zh-CN.md`
- `../README.md`
- `../INVENTORY.md`
- `../../references/ai-agent-memory/INDEX.md`
- `../../references/ai-agent-memory/history-retrieval-patterns.md`
- `../../references/ai-agent-memory/source-reservoir-map.md`

---

## 最终教义

可复用的结论并不是：

> “这个索引告诉我们要打开哪个 staged memory module。”

真正可复用的结论是：

> “即使是 staging layer 也必须有纪律化导航：先通过 canonical doctrine 判定需求，再进入最小且真正有杠杆的 staged cluster；这样这些 adapted module pools 才能保持有用，而不会伪装成引擎的第一知识来源。”
