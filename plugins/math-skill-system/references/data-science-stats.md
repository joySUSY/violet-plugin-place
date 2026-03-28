# 📊 Data Science & Statistical Benchmarking

Running an algorithm once to see if it is "fast" is not engineering. It is a single anecdote. The CPU might have been running a background update. The garbage collector might have paused execution.

Scientific engineering requires statistical rigor.

## 1. The Benchmark Rules (性能测试准则)

If you are writing a benchmark to prove "Algorithm A is faster than B", you must adhere to these rules:

1. **Warmup Phase:** Run both algorithms 1,000 times before starting the timer. This forces the engine (v8, JVM) to Just-in-Time (JIT) compile the code aggressively. Without warmup, you are measuring compilation speed, not execution speed.
2. **Sufficient Samples:** A single run of 100,000 iterations is useless. You must run 100 `batches` of 1,000 iterations to measure standard deviation.
3. **Outlier Removal:** The fastest and slowest 5% of runs should be discarded (Interquartile Range). An OS context switch can randomly pause a batch for 200ms.

## 2. P-Values and Statistical Significance

When looking at user metrics ("Feature A increased conversions by 3%"), you must determine if it is noise or signal.

- **Hypothesis Testing (A/B Tests):** The Null Hypothesis assumes Feature A had zero effect.
- **P-Value:** If `p < 0.05` (5%), it means there is only a 5% chance that the 3% difference happened due to random noise. The result is "Statistically Significant".
- *Do not ship experimental features until `p < 0.05`.*

## 3. Understanding Distributions (理解数据分布)

- **Normal (Gaussian) Distribution:** The classic "Bell Curve". Symmetrical. Used for human heights, test scores.
  - *Fact:* 68% of data falls within 1 Standard Deviation ($\sigma$) of the mean. 99.7% falls within 3$\sigma$.
- **Power Law (Pareto) Distribution:** The "80/20 Rule". Highly asymmetrical.
  - Used for wealth, website traffic, server exceptions. 80% of your exceptions come from 20% of your bugs.
  - *Engineering Impact:* Mean/Average is useless on a Power Law distribution. Use Medians (p50) and 99th Percentiles (p99). Do not say "Average page load is 200ms." Say "p50 is 100ms, p99 is 2 seconds."
- **Poisson Distribution:** Models the probability of a given number of events occurring in a fixed interval of time.
  - Used for calculating server requests per minute or customer arrivals at a queue. Crucial for load-testing architecture bounds.
