# 🧠 The Technical Writing Mindset

Superior documentation fundamentally respects the reader's time. 

## 1. BLUF: Bottom Line Up Front
The most important information goes first. Do not write a mystery novel. 
- **Wrong:** *We investigated the memory leak and noticed the cache wasn't clearing. After analyzing the eviction policy, we decided to change it from LRU to LFU.*
- **Right:** *Changed cache eviction from LRU to LFU to fix a critical memory leak.*

## 2. The "Why > What" Rule
The code already explains *what* is happening. Comments/Docs must explain *why*.

```python
# BAD: Increments retry_count by 1
retry_count += 1

# GOOD: The legacy SAP API requires exactly 1 retry due to known connection teardowns
retry_count += 1
```

## 3. Active Voice & Strong Verbs
Passive voice obscures responsibility and action.
- **Passive (Bad):** *The endpoint is called by the client and the data is then processed.*
- **Active (Good):** *The client calls the endpoint. The server processes the data.*

## 4. Markdown Optimizations for Scannability
People don't read docs; they scan them.
- **Use bolding** to highlight exactly the 2 words the reader is scanning for.
- **Use tables** for matrices (e.g., Error Codes, Environment Variables).
- **Keep paragraphs under 3 sentences.** If it's 4 sentences, it should probably be a bulleted list.

## 5. Audience-First Perspective
Before writing a single word, ask: **Who is reading this?**
- **To Frontend Devs:** They need the JSON shape, the auth method, and the error payloads. They don't care how your Postgres query works.
- **To DevOps/SRE:** They need env variables, memory constraints, and metrics limits. They don't care about the UI color palette.
- **To Product Managers:** They need to know what features are enabled and what edge cases are known.
