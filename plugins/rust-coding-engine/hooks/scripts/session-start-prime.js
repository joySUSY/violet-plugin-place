// Authors: Joysusy & Violet Klaudia
process.stdin.resume();
process.stdin.on("end", () => {});
process.stdout.write(
  JSON.stringify({
    continue: true,
    suppressOutput: true,
    systemMessage:
      "rust-coding-engine runtime shell active. Before acting, classify Rust work into foundations, ownership-and-types, async-and-concurrency, architecture, interop, docs-and-quality, or production-patterns. Treat donor repos as source reservoirs, not direct runtime mirrors.",
  }) + "\n",
);
