# 🌐 Search Operations & Routing (Search-Ops)

Elite researchers don't rely on a single search bar. They use precise operators and route queries to the engine best suited for the task.

## 1. Engine Routing Matrix

Select your engine base URL depending on the geography and privacy needs of the query:

### Global (Default to Google, fallback to DDG for privacy)
- **Google INT:** `https://www.google.com/search?q={keyword}`
- **DuckDuckGo:** `https://duckduckgo.com/html/?q={keyword}` *(Zero tracking)*
- **WolframAlpha:** `https://www.wolframalpha.com/input?i={keyword}` *(Math, conversions, hard data)*

### Domestic / CN-Specific (When researching Chinese markets/data)
- **Baidu:** `https://www.baidu.com/s?wd={keyword}`
- **Bing CN:** `https://cn.bing.com/search?q={keyword}&ensearch=0`
- **WeChat (Sogou):** `https://wx.sogou.com/weixin?type=2&query={keyword}` *(Crucial for CN articles)*
- **Jisilu:** `https://www.jisilu.cn/explore/?keyword={keyword}` *(Finance/Markets)*

## 2. Advanced Operators (Google Dorking)

Never use broad keywords when you are looking for specific intelligence.

| Goal | Operator Syntax | Example Query |
|---|---|---|
| **Site Specific** | `site:` | `site:github.com "react native" memory leak` |
| **File Type** | `filetype:` | `filetype:pdf "industry report" 2024 AI` |
| **Exact Match** | `""` | `"zero-day vulnerability"` |
| **Exclude** | `-` | `apple -fruit -tree` |
| **Logical OR** | `OR` | `rust (tokio OR async-std)` |

## 3. Time Constraints

The web is full of stale data. Force recency when investigating modern tech or news.
Append to Google queries:
- `&tbs=qdr:d` (Past 24 hours)
- `&tbs=qdr:w` (Past 7 days)
- `&tbs=qdr:m` (Past 30 days)
- `&tbs=qdr:y` (Past year)

## 4. DuckDuckGo "Bangs" (Instant Routing)

If you use DDG as the base, you can force Wikipedia or StackOverflow directly:
- `!w {keyword}` -> Wikipedia
- `!so {keyword}` -> StackOverflow
- `!gh {keyword}` -> GitHub
