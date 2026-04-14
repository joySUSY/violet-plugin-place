// Authors: Joysusy & Violet Klaudia
process.stdin.resume(); process.stdin.on("end", () => {});
process.stdout.write(JSON.stringify({
  continue: true, suppressOutput: true,
  systemMessage: "typescript-coding-engine runtime shell active. Before acting, classify TypeScript work into core-types, generics-and-inference, type-level-programming, runtime-validation, tooling-and-quality, testing, architecture, or interop. Treat donor sources as reservoirs, not runtime mirrors."
}) + "\n");
