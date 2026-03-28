# 📑 Documentation Engineering (文档工程体系)

The `documentation-guidelines` engine absorbs enterprise-level content architecture skills, treating documentation with the same rigor as compiled source code.

## 1. Enterprise Documentation Strategy (企业级文档策略)

- **Docs-as-Code:** Documentation lives in the same repository as the source code (using Markdown/MDX). It is subject to CI/CD pipelines, Linting (e.g., Vale or markdownlint), and standard pull-request reviews.
- **Single Source of Truth:** Never copy-paste an endpoint description. Use OpenAPI (Swagger) specifications to auto-generate the interactive REST documentation. Do not maintain a separate Confluence page if the spec already exists.
- **Content Architecture (The Diátaxis Framework):**
  - *Tutorials:* Learning-oriented (Step-by-step for beginners).
  - *How-To Guides:* Goal-oriented (Solving a specific problem).
  - *Reference:* Information-oriented (API docs, exact syntax).
  - *Explanation:* Understanding-oriented (Architecture design, "Why").

## 2. Automated Generation (自动化生成策略)

- Let the CI pipeline build the documentation site (Docusaurus, MkDocs, or mdBook) upon merging to `main`.
- Inject code snippets natively from tested source files to ensure documentation never becomes stale and inaccurate.

---
*Absorbed knowledge from: documentation-engineer-skill.*
