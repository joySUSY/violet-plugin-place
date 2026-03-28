# 🤖 AI-Augmented Review Patterns | AI 增强评审模式

## 🧭 Navigation Matrix | 导航矩阵

1. **[Automated Logic Auditing](logic-audit.md)** | **[自动化逻辑审计]**
   - High-confidence edge case detection. | 高置信度边缘案例检测。
   - LLM-reasoning for semantic bugs. | 用于语义漏洞的 LLM 推理。
2. **[Observability-Driven Review](monitoring-cross-ref.md)** | **[观测驱动的评审]**
   - Correlating code changes with performance metrics. | 将代码变更与性能指标关联。
   - Predicting MTTR based on complexity shifts. | 基于复杂度变化预测平均修复时间。

---

## 🛠️ Operating Model | 运行模型

### 1. The Human-in-the-Loop Protocol | 人机协同协议
AI handles the "Low-Level" (syntax, linting, trivial patterns), Humans handle the "High-Level" (architectural impact, business logic alignment). | AI 处理“底层”工作（语法、代码检查、琐碎模式），人类处理“高层”工作（架构影响、业务逻辑对齐）。

- **Confidence Thresholding**: AI only flags logic bugs with >80% confidence; otherwise, it asks a "Consultative Question." | **置信度阈值**: AI 仅在置信度 >80% 时标记逻辑错误；否则，提出“咨询性问题”。
- **Atomic Commits**: Review each commit as a discrete unit of change to prevent "reviewer fatigue." | **原子提交**: 将每个提交作为独立的变更单元进行评审，防止“评审员疲劳”。

### 2. Research & Modernity (2026) | 研究与现代性 (2026)
- **Security-as-Code Integration**: Automatically link code changes to compliance requirements (SOC2, ISO 27001). | **以代码为中心的安全性集成**: 自动将代码变更连接到合规性要求。
- **UltraThinking Reviewer**: Use systemic reasoning to identify "invisible dependencies" across polyglot repositories. | **超级思维评审员**: 使用系统化推理识别多语言仓库中的“隐形依赖”。

---

## 📚 References | 参考文献
- [Code Review Expert Patterns](modules/code-review-expert/SKILL.md)
- [Deep Review Methodologies](modules/deep-review/SKILL.md)
