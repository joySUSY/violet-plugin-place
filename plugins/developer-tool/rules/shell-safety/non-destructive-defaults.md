# Non-Destructive Defaults

## Default Posture

The developer-tool shell must default to conservative behavior.

That means:
- no deletion by default
- no path assumptions by default
- no donor repo mutation by default
- no broad Bash wildcard habits by default
- no startup hook that mutates significant state by default

## Required Safety Habits

1. Prefer dry-run framing before destructive guidance.
2. Treat source reservoirs as read-first.
3. Keep SessionStart hooks lightweight.
4. Keep Stop hooks advisory unless there is a validated blocking policy.
5. Quote shell variables and avoid ambiguous path construction.

## Failure Condition

If a shell surface encourages action before boundary classification, that surface is too aggressive and must be revised.
