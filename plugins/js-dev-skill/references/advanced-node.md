# 🚀 Advanced Node.js & TypeScript Patterns (高级Node与TS模式)

The `js-dev-skill` engine absorbs 5 advanced TypeScript and Node.js capabilities, moving beyond simple web development into native system integrations and elite type safety.

## 1. Elite TypeScript Patterns (精英TypeScript模式)

- **Template Literal Types:** Use template literals to generate types dynamically from string permutations (e.g., `type Route = '/api/${Entity}s'`).
- **Discriminated Unions (The `type` guard):** Never use optional properties (`?`) to represent distinct states. Use a `type` literal discriminant.
  ```typescript
  type Response = 
    | { status: 'success'; data: User } 
    | { status: 'error'; message: string; code: number };
  ```
- **Mapped Types & Utility Types:** Master `Omit`, `Pick`, `Record`, and `ReturnType` to derive types from existing implementations without duplication.

## 2. NAPI-RS Bindings for Node.js (Rust与Node的NAPI绑定)

- **Architecture:** Node.js runs the event loop; Rust handles the heavy lifting via NAPI-RS.
- **Why NAPI over WASM?** NAPI allows direct access to the host OS filesystem, native threads, and external C/C++ libraries that WASM cannot easily reach.
- **Example Use Case (`ruvectornode`):** A high-performance vector database core (`ruvectorcore`) written in Rust, compiled via NAPI-RS, and exposed to Node.js as an asynchronous JS module for RAG (Retrieval-Augmented Generation) applications.

## 3. High-Performance Vector Databases in Node (Node中的高性能向量数据库)

- **Distance Metrics:** The Node layer receives the embeddings from OpenAI/Anthropic and passes them to the Rust core for KNN (K-Nearest Neighbors) clustering.
- **Serialization Boundary:** Minimize crossing the JS/Rust boundary. Pass typed arrays (e.g., `Float32Array`) directly instead of parsing massive JSON objects.

---
*Absorbed knowledge from: typescript-pro-skill, ruvector, ruvector-core-pkg, ruvectorcore, ruvectornode.*
