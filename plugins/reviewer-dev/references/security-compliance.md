# 🛡️ Security & Compliance Guardrails | 安全性与合规性护栏

## 🧭 Navigation Matrix | 导航矩阵

1. **[Automated Vulnerability Scanning](sast-dast.md)** | **[自动化漏洞扫描]**
   - Real-time secret leak detection. | 实时密钥泄漏检测。
   - SAST/DAST integration in pre-commit hooks. | 预提交钩子中的 SAST/DAST 集成。
2. **[Compliance-as-Code](compliance.md)** | **[合规即代码]**
   - Automated SOC2 and ISO 27001 readiness checks. | 自动化的 SOC2 和 ISO 27001 就绪检查。
   - Governance for AI-generated code snippets. | 对 AI 生成代码片段的治理。

---

## 🛠️ Operating Directives | 运行指令

### 1. The Zero-Trust Reviewer | 零信任评审员
Assume every code change is a potential entry point. Focus on data sanitization and boundary checks. | 假设每次代码变更都是潜在的入口点。专注于数据清理和边界检查。

- **Secret Detection**: Never permit hardcoded keys, even in test fixtures. Use `dotenv` or secret managers. | **密钥检测**: 绝不允许硬编码密钥，即使在测试固件中也是如此。
- **Injection Mitigation**: Enforce parameterized queries and strict output encoding. | **注入缓解**: 强制执行参数化查询和严格的输出编码。

### 2. Modernity (2026): Adaptive Guardrails | 现代性 (2026)：自适应护栏
- **Rootless & Distroless Auditing**: Review containerization changes for OCI compliance and minimal attack surfaces. | **无根与无排布审计**: 评审容器化变更，确保符合 OCI 规范并具有最小攻击面。
- **Supply Chain Security**: Audit peripheral dependencies (SBOM) for license compliance and known CVEs. | **供应链安全**: 审核外围依赖项 (SBOM) 的许可合规性和已知 CVE。

---

## 📚 References | 参考文献
- [Security Audit Handbook](security-and-auditing.md)
- [Vulnerability Management Standard](references/security-and-auditing.md)
