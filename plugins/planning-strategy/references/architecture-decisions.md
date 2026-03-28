# ⚖️ Architecture Decisions (ADR/RFC)

Software architecture is the art of making the right trade-offs. The difference between a junior and a senior engineer is that the junior asks "What should we build?", while the senior asks "What will break if we build it this way?"

## 1. The ADR (Architecture Decision Record)

When faced with a difficult design choice (e.g., "Postgres vs MongoDB", "Microservices vs Monolith", "REST vs gRPC"), do not just talk about it in Slack. Write an ADR. 

An ADR acts as the project's institutional memory. Future engineers—who weren't there when the decision was made—need to know *why* you chose the path you did.

**The Golden Structure of an ADR:**
- **Title:** The core technology choice (e.g., "Use Rust for our high-throughput payment layer").
- **Context:** Why are we making a change? (e.g., "Our Node.js service is hitting GC pauses during peak traffic").
- **Alternatives Considered:** This is the most critical section. List the 2-3 paths you *didn't* take, and explicitly state why they were rejected (e.g., "We considered Go, but our team lacked expertise and we need zero-cost memory safety").
- **Decision:** The final chosen architecture.
- **Consequences:** The known pain points we are accepting by making this choice (e.g., "Slower compile times and a steeper onboarding curve for new hires").

## 2. Technical Specifications (Tech Specs)

A Tech Spec bridges the gap between the PRD (Product Requirements) and the actual code execution. A strong tech spec contains:

1. **System Boundaries:** What external APIs are we hitting? What databases are we reading from?
2. **Data Models:** Provide the exact schema definitions (e.g., Prisma schema, SQL tables).
3. **API Contracts:** Define the precise shape of the JSON that will be passed between boundaries.
4. **Security & Validation:** Where does input get sanitized? Who is authorized to do this?
5. **Rollout Strategy:** Are we dark launching? Do we need feature flags? What happens if we deploy and it instantly breaks?

## 3. Visual Architecture (Mermaid)

If an architecture is too complex to describe in three sentences, it requires a diagram. Do not assume readers can visualize your distributed system in their heads. 

- Use standard Mermaid (`graph TD` or `sequenceDiagram`) formats. 
- Ensure that system boundaries and asynchronous boundaries (e.g., Kafka queues) are visually separated from synchronous API calls.
