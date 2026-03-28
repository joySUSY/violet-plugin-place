# 🎨 Advanced Styling & Accessibility (高级样式与无障碍设计)

The `frontend-dev` engine absorbs 5 visual computing and accessibility skills. A component is only finished when it is visually flawless and mathematically accessible to all users.

## 1. CSS Custom Properties & Dark Mode Architecture (CSS变量与暗黑模式设计)

- **Do not hardcode hex values in components.** 
- **Theming via CSS Variables (shadcn/ui approach):** Define variables at the `:root` level and redefine them in the `.dark` class. Tailwind CSS will consume these variables via `hsl(var(--background))`.
  ```css
  :root { --background: 0 0% 100%; --foreground: 0 0% 3.9%; }
  .dark { --background: 0 0% 3.9%; --foreground: 0 0% 98%; }
  ```

## 2. WCAG 2.2 AA Accessibility Auditing (WCAG无障碍审计)

- **Semantic HTML over DIVs:** A `<button>` gets keyboard focus, `Space`/`Enter` interactions, and aria-roles for free. A `<div onClick>` gets none of that and costs hours of technical debt.
- **Contrast Ratios:** Text must have a 4.5:1 contrast ratio against its background. Large text (18pt+) requires 3:1.
- **Focus Rings:** Never `outline: none;` without providing a `.focus-visible` alternative ring to guide keyboard navigation.

## 3. Cross-Platform Animation Debugging (跨平台动画调试)

- **SwiftUI Animations:** Tie animations to State changes. Use `.spring(response: 0.3, dampingFraction: 0.6)` instead of linear timings for organic motion.
- **UIKit AutoLayout:** When animating constraints in `UIView.animate`, you must call `self.view.layoutIfNeeded()` inside the animation block to interpolate the frame changes.

---
*Absorbed knowledge from: ui-styling, css-theming-assistant, accessibility-tester-skill, axiom-swiftui-animation-ref, axiom-uikit-animation-debugging.*
