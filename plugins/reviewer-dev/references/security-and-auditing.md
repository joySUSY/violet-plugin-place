# 🛡️ Security & Auditing Protocols (安全与审计协议)

The `reviewer-dev` engine absorbs 6 dedicated security, auditing, and penetration-testing skills. Code review is the primary defense mechanism against catastrophic breaches.

## 1. Zero Trust Architecture & DevSecOps (零信任架构与安全开发)

- **Assume Breach:** Validate every input, even from internal microservices. Network perimeters do not exist.
- **Secret Management:** NEVER commit secrets. Hardcoded API keys found during review must result in an immediate PR rejection and a credential rotation order.

## 2. Penetration Testing & Vulnerability Assessment (渗透测试与漏洞评估)

- **OWASP Top 10 Active Review:** 
  - *SQLi:* Look for raw string interpolation (`"SELECT * FROM users WHERE name = " + user_input`). Ensure parameterized queries (e.g., `sqlx`).
  - *XSS:* Verify UI layer sanitization. In React, flag `dangerouslySetInnerHTML`.
  - *BOLA (Broken Object Level Authorization):* Ensure that fetching an entity verifies that the currently authenticated user owns that entity.

## 3. Automated Auditing Patterns (自动化审计模式)

- **Panther-Audit:** Implement automated SAST/DAST pipelines in CI. Human reviewers should not waste time finding syntax errors or basic linting issues; they must focus on business logic flaws.
- **Cross-Review Mechanism:** Complex architecture requires multi-agent/multi-human coordinated review. Split the review by domain (e.g., Database reviewer, Security reviewer, Performance reviewer).

## 4. Blockchain Smart Contract Audit (Solidity) (区块链智能合约审计)

- **Reentrancy Guards:** Flag state mutations that occur *after* external function calls. Use `Checks-Effects-Interactions` pattern.
- **Integer Overflow:** Verify SafeMath usage (or Solidity ^0.8.0 native bounds checking).
- **Access Control:** Scrutinize `public` and `external` functions. Verify `onlyOwner` or RBAC modifiers.

---
*Absorbed knowledge from: security-auditor-skill, security-engineer-skill, penetration-tester-skill, cross-review, panther-audit, solidity-function-audit-team.*
