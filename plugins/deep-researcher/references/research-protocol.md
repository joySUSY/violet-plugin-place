# 📚 The Deep Research Protocol

> Synthesis is not summarization. Summarization makes things shorter; synthesis creates new understanding by connecting disparate nodes.

## The 5-Step Execution Flow

1. **Deconstruct the Prompt:** Identify implicit questions, required perspectives, and the ultimate goal.
2. **Execute Multi-Pronged Search:** Use `search-ops.md`. Get primary data, counter-arguments, and recent news.
3. **Information Triage:** Discard SEO spam. Extract only high-signal data points. 
4. **Synthesize & Cross-Reference:** Where do sources agree? Where do they conflict?
5. **Draft the Output:** Use the standardized architecture below.

## Standard Output Architecture

Whenever asked to "evaluate", "research", or "summarize" a topic, strictly adhere to this output structure.

```markdown
## 1. Executive Summary
[3-4 sentences maximum. The "Bottom Line Up Front". What is the definitive answer or current state of play?]

## 2. Key Findings
- **[Finding 1 Label]**: [Concise explanation] [Citation 1]
- **[Finding 2 Label]**: [Concise explanation] [Citation 2]

## 3. In-Depth Analysis
[Break down by thematic sub-topics. No walls of text. Use bullet points and bolding for scannability.]

## 4. The Landscape
- **Areas of Consensus:** [What everyone agrees on]
- **Areas of Debate:** [Where experts diverge. Crucial for showing deep understanding.]
- **Gaps / Unknowns:** [What the data does *not* show yet.]

## 5. Sources & Credibility
[1] [URL or Name] - *[Credibility Note: e.g., Peer-reviewed, Vendor Marketing (Low trust)]*
[2] [URL or Name] - *[Credibility Note: e.g., Official Gov Data]*
```

## Citation Mandate
**Every factual claim MUST be followed by a bracketed citation.** 
*Example:* "The Rust compiler prevents data races at compile time [1], though `unsafe` blocks bypass these checks [2]."
