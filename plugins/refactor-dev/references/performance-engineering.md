# 🏎️ Performance Engineering (性能工程)

The `refactor-dev` engine absorbs 3 deep performance-testing and engineering skills. "Slow" is a bug.

## 1. Kernel-Level Profiling (内核级分析)

- **eBPF (Extended Berkeley Packet Filter):** Use eBPF to profile applications at the kernel level without instrumenting the code. Ideal for tracing syscalls and network latency.
- **Flamegraphs:** Never guess the bottleneck. Generate CPU flamegraphs using `perf` (Linux) or `cargo-flamegraph` (Rust) to visually locate the exact stack trace consuming CPU cycles.

## 2. Load & Stress Testing (负载与压测)

- **k6 / Artillery:** Define performance tests as code. 
- **VUs (Virtual Users):** Ramping up VUs helps identify the breaking point of the system.
- **Percentiles > Averages:** Mean response time is a lie. Always measure P95 and P99 latency. If P99 is 2 seconds, 1 in 100 requests fails the user experience.

## 3. Algorithmic Optimization Strategies (算法优化策略)

- **Questioning Hardcoded Values:** Hunt for "Magic Numbers" limits (e.g., `MAX_CONNECTIONS = 100`). Ask *why* 100? If it's arbitrary, refactor it into an environment-driven configuration.
- **Memory Allocation:** In performance-critical loops, avoid heap allocation. Pre-allocate arrays/vectors if the size is known.

---
*Absorbed knowledge from: performance-engineer-skill, performance-testing-skill, questioning-hardcoded-values.*
