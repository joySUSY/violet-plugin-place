# 🤝 Handoffs & Cross-Team Comms

## 1. The Perfect Pull Request (PR)

A PR is not just a code review request. It is a historical document that explains *why* a set of changes happened, providing context to a future maintainer (which may be you) at 3 AM.

**The Golden Structure of a PR:**
- **The "Why":** A link to the ticket/issue, and a 2-sentence human summary of why this change is needed. 
- **The "What":** Bullet points showing the main technical changes. Not every line, just the high-level diff.
- **Testing Done:** How did you verify this? ("Unit tests pass", "Manually tested on local machine").
- **Breaking Changes:** Highly visible warnings for API modifications or schema changes.

## 2. Backend to Frontend Handoffs

When a Backend engineer finishes an API, the handoff to the Frontend engineer must be completely frictionless.

**The "No-Questions-Asked" Handoff:**
- **URL & Method:** Provide the exact curl command.
- **Local Dev Setup:** Give the exact env vars the frontend needs to hit the backend locally.
- **Payload Shape Maps:** If the backend returns `{"usr_id": "ab12"}`, explicitly state mapping invariants (e.g., "Note: the ID is returned as a string, not an integer").
- **Error Matrix:** Provide a Markdown table of the exact 4xx/5xx errors the frontend needs to handle so they can build UI states (Toast notifications).

## 3. Incident Reports (Post-Mortems)

When resolving an issue or writing a post-mortem, adopt a **blameless** culture centered around systemic failure, not human failure.

- **Timeline:** A strict chronological overview of the breakage. ("14:00 - Alert fired. 14:02 - DB CPU spiked to 100%").
- **Root Cause Analysis (The 5 Whys):** Ask "Why?" five times to get from the symptom (DB crashed) to the underlying root cause (Timeout threshold for a third-party API was set too high).
- **Remediation Plan:** Action items grouped by time scales:
  - Phase 1: Mitigate the immediate bleeding.
  - Phase 2: Fix the root cause within the week.
  - Phase 3: Long-term architectural changes to prevent recurrence.
