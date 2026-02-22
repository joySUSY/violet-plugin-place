# Vora 项目已加载技能清单 (Skills Loaded)

> Last Updated: 2026-02-22 (Session 44)
> 用途：快速恢复技能环境
> **规则：每次 session 只加载此文件列出的技能，不额外探索，除非 Susy 主动要求。**

## 核心技能 (每次必加载)

```
/using-superpowers
/planning-strategy
```

## Rust 技能

```
/rust-coding-engine
```

## Python 技能

```
/python-dev-skill
```

## 代码相关技能

```
/reviewer-dev
/refactor-dev
```

## 测试技能

```
/tdd-system
/error-handling
```


## JS技能

```
/js-dev-skill
```

## 研究与协作技能

```
/deep-researcher
```

## 开发相关技能

```
/backend-dev
/documentation-guidelines
/frontend-dev
```

## 数学+计算+几何引擎技能

```
/math-skill-system
```

## 快速恢复命令

Session 恢复时，按以下顺序加载：

```bash
# Step 1: 核心
/using-superpowers
/planning-strategy

# Step 2: Rust (Rust 开发必加载)
/rust-coding-engine

# Step 3: 项目开发必加载
/backend-dev
/documentation-guidelines
/frontend-dev
/tdd-system
/error-handling
/reviewer-dev
/refactor-dev
/js-dev-skill


# Step 4: 研究与协作 (涉及Research与Plan必加载)
/deep-researcher


# Step 5: Python (Python 开发必加载)
/python-dev-skill

# Step 6: 涉及数学与计算问题需加载
/math-skill-system

```
