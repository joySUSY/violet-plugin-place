# 🔬 UX Strategy & Research (UX策略与研究)

UX is the empirical science of human-computer interaction. Opinions about "what users want" must be replaced by observable evidence from structured research.

## 1. Heuristic Evaluation Framework (启发式评估框架)

Nielsen's 10 Usability Heuristics as executable audit checklist:

| # | Heuristic | Audit Question | Pass Criteria |
|---|-----------|---------------|---------------|
| 1 | Visibility of system status | Does the UI communicate loading, success, and error states? | Every async action shows progress indicator |
| 2 | Match between system and real world | Does terminology match user's mental model? | Zero jargon in user-facing labels |
| 3 | User control and freedom | Can users undo/redo/cancel at any point? | Undo available for destructive actions |
| 4 | Consistency and standards | Do similar elements behave identically? | Button styles, form validation patterns uniform |
| 5 | Error prevention | Are destructive actions guarded? | Confirmation dialogs, input constraints |
| 6 | Recognition over recall | Are options visible rather than memorized? | No command-only interfaces for novices |
| 7 | Flexibility and efficiency | Are shortcuts available for experts? | Keyboard shortcuts, batch operations |
| 8 | Aesthetic and minimalist design | Does every element serve a purpose? | No decorative-only elements |
| 9 | Help users recognize and recover from errors | Are error messages actionable? | Messages include "how to fix it" |
| 10 | Help and documentation | Is contextual help available? | Tooltips, inline guides, searchable docs |

## 2. User Research Methods (用户研究方法)

### Method Selection Matrix

| Method | When | Sample Size | Output |
|--------|------|-------------|--------|
| **Usability Testing** | Evaluating existing UI | 5-8 users | Task completion rates, error rates |
| **Card Sorting** | Information architecture | 15-20 users | Navigation structure |
| **A/B Testing** | Comparing two variants | 1000+ users | Statistical significance on metrics |
| **Contextual Inquiry** | Understanding workflows | 4-6 users | Workflow maps, pain points |
| **Surveys** | Quantitative attitude data | 100+ users | Likert ratings, NPS scores |
| **Tree Testing** | Validating IA labels | 50+ users | Findability scores per task |

### The Research Diamond

```
Discovery (Diverge)
    │
    ▼
Define (Converge)    ← "What is the actual problem?"
    │
    ▼
Ideate (Diverge)
    │
    ▼
Validate (Converge)  ← "Does this solution work?"
```

## 3. Wireframing & Prototyping Protocol (线框图与原型协议)

### Fidelity Spectrum

| Level | Tool | Purpose | When |
|-------|------|---------|------|
| Low-fi sketch | Pen/paper, Excalidraw | Explore layouts | Early ideation |
| Mid-fi wireframe | Figma gray-box, Balsamiq | Define structure | After requirements |
| Hi-fi prototype | Figma interactive, Framer | Validate interactions | Before development |
| Code prototype | HTML/CSS, Storybook | Validate feasibility | Technical spike |

**Rule:** Never build hi-fi prototypes before validating low-fi wireframes with stakeholders. Sunk cost bias from beautiful mockups prevents necessary pivots.

## 4. Accessibility Audit Protocol (无障碍审计协议)

### WCAG 2.2 AA Checklist (Minimum)

| Category | Check | Tool |
|----------|-------|------|
| Color contrast | 4.5:1 for text, 3:1 for UI | aXe, lighthouse |
| Keyboard navigation | All interactive elements focusable, tab order logical | Manual tab-through |
| Screen reader | Semantic HTML, ARIA labels, alt text | VoiceOver, NVDA |
| Motion | `prefers-reduced-motion` respected | CSS media query |
| Zoom | Content usable at 200% zoom | Browser zoom test |
| Touch targets | Minimum 44×44px | Manual measurement |

## 5. Anti-Patterns (反模式)

```
❌ Designing without user research ("I know what users want")
❌ Usability testing with fewer than 5 participants
❌ A/B testing with insufficient sample size (< 1000)
❌ Skipping low-fidelity wireframes (straight to Figma hi-fi)
❌ Ignoring accessibility until after launch
❌ Using "lorem ipsum" in user testing (realistic content required)
❌ Dark patterns: misleading CTAs, hidden unsubscribe, confirm-shaming
```
