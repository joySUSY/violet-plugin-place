---
name: reviewer-dev
description: |
  Master engineer's guide to code review, security auditing, and refactoring heuristics. Use when acting as a Senior Reviewer on a Pull Request, auditing code for OWASP vulnerabilities (SQLi, XSS, Secret Leaks), or refactoring legacy code to reduce cyclomatic complexity. Enforces constructive feedback, strict security boundaries, and the "Beautiful Code" standard.
---

# 🕵️‍♂️ Reviewer & Security Engine | 审查与安全引擎

> "A code review is not a test of obedience; it is a collaborative effort to catch bugs and share context."
> "代码审查不是服从性测试；它是发现错误和共享上下文的协作努力。"

## 🔬 Research & Modernity (2026): Proactive Auditing | 研究与现代性 (2026)：主动审计

- **Semantic Secret Telemetry**: Utilizing 2026 pattern-matching engines to detect and remediate secret leaks before they reach the staging environment. | **语义密钥遥测**: 利用 2026 模式匹配引擎在密钥泄漏到达预发布环境之前自动检测并纠正。
- **Agentic Threat Modeling**: Real-time synthesis of threat models from code changes via 2026 `guard-v3` engines to identify logic-level vulnerabilities. | **智能体威胁建模**: 通过 2026 `guard-v3` 引擎从代码更改中实时合成威胁模型，识别逻辑级漏洞。
- **Zero-Trust Boundary Enforcement**: Automated validation of all cross-layer boundaries (API/DB/FFI) to ensure high-fidelity security isolation. | **零信任边界实施**: 自动验证所有跨层边界（API/DB/FFI），确保高保真安全隔离。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `developer-tool/ai-agent-memory` | Historical intent / failure / continuity baseline | [`developer-tool/ai-agent-memory/README.md`](../developer-tool/ai-agent-memory/README.md) |
| `planning-strategy` | ADR & Tech Specs Review | [`planning-strategy/SKILL.md`](../planning-strategy/SKILL.md) |
| `error-handling` | Resilience Verification | [`error-handling/SKILL.md`](../error-handling/SKILL.md) |
| `dev-designer-utility` | Accessibility & UX Audit | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `rust-coding-engine` | Native Security & Perf | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |

## 🧭 Navigation Matrix

1. **[Evidence-Anchored Review](references/evidence-anchored-review.md)**
   - Recall ADRs, surfaced failures, and continuity artifacts before high-stakes review.
   - Emit surfaced rationale deltas only when the review changes direction or exposes a future-critical blocker.
2. **[Security & Auditing (OWASP, Zero-Trust, SAST/DAST)](references/security-and-auditing.md)**
   - Hardcoded secrets detection, OWASP methodology.
   - Zero Trust Architecture, Solidity smart contract auditing.
   - Automated SAST/DAST and injection vulnerability detection.
3. **[Security & Compliance Guardrails](references/security-compliance.md)**
   - Automated secret leaks and OWASP auditing.
   - Regulatory compliance (SOC2/ISO) and container security.
4. **[Advanced Guardian Protocols](references/advanced-guardian-protocols.md)**
   - Quality Guardian & No Broken Windows policy.
   - Design by Contract & Confidence Checks.
   - API Documentation empathy.
5. **[AI-Augmented Review Patterns](references/ai-augmented-review.md)**
   - Human-in-the-loop protocols and logic bug detection.
   - Productivity-first feedback (Signal vs Noise).

## 🎯 When to Trigger This Engine

- 👀 **"Review this Pull Request":** Load `evidence-anchored-review.md` to provide constructive, evidence-first architectural feedback rather than formatting complaints.
- 🛡️ **"Audit this code for security vulnerabilities":** Load `security-and-auditing.md` to rigorously test for OWASP flaws and secret leaks.
- 🧹 **"Refactor this massive function to be cleaner":** Load `advanced-guardian-protocols.md` to systematically apply quality gate enforcement and design-by-contract checks.
- 🧠 **"This area already caused trouble before" / "Why are we blocking this review?":** Load `evidence-anchored-review.md` to review with historical intent instead of looking at the diff in isolation.

## 🧠 Core Operating Directives

- **Let the Linter Nitpick:** Never leave a review comment about a missing semicolon, spacing, or brace placement. If it matters, it should be in the CI pipeline formatter (Prettier/Rustfmt). Focus human energy on architecture and logic bugs.
- **Praise Publicly, Critique Constructively:** A good review points out what the author did exceptionally well. When critiquing, attack the code, not the coder (e.g., "This function might panic if X is null", NOT "You forgot to handle null").
- **Zero Trust Security:** Assume all input is hostile. The frontend validation is merely a UX suggestion; the backend must independently sanitize and validate every byte.
- **Review With Memory:** Before approving or rejecting a change in a historically fragile or decision-heavy area, inspect prior ADRs, surfaced failures, and continuity artifacts first. A diff without intent history is only half a review.
- **Surface the Rationale Delta:** If a review changes direction, identifies a blocker that future work must remember, or overturns a prior assumption, externalize that surfaced delta instead of leaving it trapped in review comments alone.

## Batch 2 Control-Baseline Integration (批次 2 控制基线接入)

For high-stakes reviews, start from the canonical control path:

1. `../developer-tool/ai-agent-memory/README.md`
2. `../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md` when you need ADR / session / commit / deleted-artifact context
4. relevant project-local surfaced continuity artifacts when the change sits inside an interrupted or controversial workstream

Use `../plugins/violet-memory-lab/` only when the review outcome itself must become a surfaced continuity artifact.
Do not move review doctrine into the plugin shell.

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/security-and-auditing.md` for OWASP checks, Zero Trust Architecture, Automated SAST/DAST, and Solidity smart contract auditing.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `security-auditor-skill` | New for developer tool | SOC2, ISO 27001 compliance, automated auditing |
| `security-engineer-skill` | New for developer tool | Infrastructure security, DevSecOps, zero-trust architecture |
| `penetration-tester-skill` | New for developer tool | Ethical hacking, vulnerability assessment, OWASP methodology |
| `cross-review` | all new skills | Cross-agent code review coordination |
| `panther-audit` | all new skills | Automated audit patterns |
| `solidity-function-audit-team` | all new skills | Blockchain smart contract audit — *cross-ref: `backend-dev`* |

## 📦 Phase 3 Absorbed Skills

| Skill | Category | Integration Focus |
|-------|----------|-------------------|
| `code-review-expert` | Review | Comprehensive qualitative code assessment |
| `deep-review` | Analysis | Deep structural and logical deep-dives |
| `review-commits` | Workflow | Commit-by-commit review methodology |
| `style-reviewer` | Standard | Enforcing project-specific style without pedantry |
| `tasks-code-review` | Automation | Managing and automating common review tasks |
