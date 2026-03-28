# 🛠️ Ecosystem Tooling & Bun (现代前端构建生态)

The Node.js ecosystem has evolved. Slow pipeline builds and massive `node_modules` are no longer acceptable.
> *缓慢的 CI 流水线和臃肿的依赖库不再被容忍。Bun 和 Vite 重塑了现代前端生态。*

## 1. Enter Bun (拥抱 Bun)

Bun is a drop-in execution engine, package manager, and test runner that is 10-100x faster than Node.js.

- **Package Management:** Use `bun install` instead of `npm install`. It resolves dependencies instantly using a global system cache.
- **Execution:** Use `bun run dev` or `bun src/index.ts`. Bun compiles TypeScript on the fly. No need for `ts-node` or `tsc` compilation steps in development.
- **Testing:** Use `bun test`. It provides Jest-compatible APIs but runs tests concurrently in milliseconds.

## 2. File I/O Optimization (极致化的文件系统)

Bun provides native APIs that bypass slow Node streams.

```typescript
// Node.js (Legacy)
import fs from 'fs';
const text = fs.readFileSync('data.json', 'utf8');

// Bun (Elite)
const file = Bun.file('data.json');
const data = await file.json(); // Instantly parsed, optimized RAM buffer
```

## 3. Vite: The Build Tool Standard (Vite 构建规范)

Webpack is officially legacy. `create-react-app` is dead. 

- **Scaffolding:** `bun create vite my-app --template react-ts`
- **Why Vite?** Instead of bundling 10,000 files into a single `main.js` chunk on every save, Vite serves files individually over native ESM (`<script type="module">`). Hot Module Replacement (HMR) takes 50ms, regardless of project size.
- **Production Build:** Uses Rollup under the hood for highly optimized, tree-shaken, vendor-chunked production assets.

## 4. Package Rules (依赖管控制度)

Every `npm` package is a liability. It introduces security vulnerabilities (Supply Chain Attacks) and bloats bundle size.
> *每个 NPM 包都是一项负债，引入前必须通过审计审问。*

1. **Do I need this?** Don't install `lodash` if you just need `Array.map` or `Array.reduce`. Modern JS has 90% of Lodash built-in.
2. **Is it typed?** If a library doesn't ship with an `index.d.ts` declaration file or a `@types/` package, discard it.
3. **Is it tree-shakable?** A library like `date-fns` allows importing only `formatDate`, dropping the rest of the MBs of code. `moment.js` sends the entire massive library to the client. Never use `moment`.
