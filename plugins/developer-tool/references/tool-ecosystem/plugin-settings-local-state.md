# Plugin Settings and Local State

## Purpose

Define the canonical local-settings and plugin-state pattern for heavy engine shells.

This document explains how a plugin can carry per-project local settings without turning that state into a hidden second doctrine center.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** plugin-local state, settings-frontmatter, and runtime-configuration canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local settings/state doctrine aligned to the current developer-tool engine

---

---

## Core Rule

Plugin-local settings are for:

- user or project preferences
- runtime toggles
- bounded shell behavior
- local continuity of operational configuration

They are **not** for:

- replacing canonical doctrine
- storing giant secret knowledge dumps
- making runtime behavior opaque or magical

---

## Preferred Pattern

Use a project-local file under `.claude/` with clear frontmatter-like structure or equivalent shell-readable config.

The exact format may vary by runtime, but the design law is stable:

- local
- bounded
- explicit
- documented
- gitignored when appropriate

---

## Good Uses

- enable/disable a shell behavior
- set conservative shell thresholds
- record small runtime preferences
- keep project-specific shell configuration out of the main doctrine tree

## Bad Uses

- putting canonical rules only in local settings
- storing huge doctrinal notes there
- hiding routing logic inside state files
- making shell behavior impossible to understand without local private files

---

## Relationship to Doctrine

Correct relationship:

- doctrine explains behavior
- local settings tune behavior

Incorrect relationship:

- local settings define behavior that doctrine never documents

The shell must remain intelligible even when local settings are absent.

---

## Relationship to Hooks and Commands

Local settings may influence:

- whether a hook runs in a stronger or weaker mode
- which command defaults are used
- whether optional shell features are enabled

But local settings should not silently rewrite the shell's structural laws.

---

## Practical Law

If a runtime behavior cannot be understood by reading the shell docs and rules alone, too much logic is hiding in local state.

That is a design smell.
