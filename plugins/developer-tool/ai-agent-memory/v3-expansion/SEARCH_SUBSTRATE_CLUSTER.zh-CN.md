# Search Substrate Cluster

**Authors: Joysusy & Violet Klaudia**

> 重型搜索基底必须服从 doctrine，而不是站到 doctrine 前面。
> Heavy search belongs behind doctrine, not in front of it.

## 目的

这份 staged cluster 文档解释 `v3-expansion/` 中 **search substrate** 这一组的角色。

目前这一组实际上主要围绕一个重型 operational asset：

- `coding_agent_session_search-main/`

之所以保留这一组，是因为某些 retrieval 问题太大、太碎、太跨来源，无法仅靠轻量 lane utility 解决。

## 本集群包含的模块

- `coding_agent_session_search-main/`

## 什么时候打开这一组

只有当 canonical retrieval doctrine 已经明确判断：

- 较轻的 session/history lanes 已经不够
- 需要 indexed multi-source recall
- 真正的问题是 high-volume 或 cross-machine retrieval

这时才进入这一组。

这一组适用于：

- cross-source retrieval
- high-volume indexed search
- semantic / hybrid recall substrate work
- heavy retrieval infrastructure questions

## 这一组不是什么

这一组不是：

- recall doctrine 的第一入口
- history-retrieval lane selection 的替代物
- 绕过 canonical memory references 的理由

如果问题仍然是“该选哪条 retrieval lane”，应先回到：

- `../../references/ai-agent-memory/history-retrieval-patterns.md`

## 未来更可能的收束方向

这一组大概率不会被完整 flatten 成 doctrine。

更真实的未来是：

- doctrine 继续吸收 lane-selection logic
- heavy search substrate 继续保留为 operational/runtime asset
- wrappers、audits 或更窄的 support notes 被逐步上提

换句话说，这一组是 `v3-expansion/` 中最典型的一个例子：
**保留为 substrate，比强行 flatten 更诚实。**
