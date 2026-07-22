---
title: Code Review
description: Use when the user asks to review a PR, diff, branch, or code change — not just to look at code in general
version: "1.0.0"
tags: [code, review, pr]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - code review
      - pr review
      - review the diff
      - review der änderung
      - review pr
      - schau den pr
      - schau das diff
      - schau die änderung
      - look over the diff
      - critique this code
      - merge ready
      - mergeable
      - lgtm
manualPaths:
  - _vance/manuals/code-review
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user wants a *code* review — not a generic critique. Goal: find
the issues that would matter at merge time, not enumerate everything
that's different from how you'd write it.

## Default protocol

Walk three passes, in order. Stop after each pass and report; do not
merge findings into one big list.

1. **Behaviour & correctness.** Does the change do what its
   description claims? Are there obvious bugs, off-by-ones,
   unhandled error paths, broken invariants?
2. **Structure & quality.** Reuse, smells, leaky abstractions,
   parameter sprawl. Same lens as `review-output` from basic, but
   with code-specific patterns (see `review-protocol`).
3. **Risk & operability.** Migration safety, backwards-compatibility,
   security exposure, hot-path impact, observability.

For small changes (< 50 lines), a single combined pass is fine. For
anything larger, separate the passes — combined reviews drift toward
style nitpicks because behaviour-issues are harder to spot.

## On-demand manuals

- `review-protocol` — the full three-pass protocol with concrete
  questions per pass, location-grounded finding format, severity
  ladder. Load for any non-trivial change.
- `security-categories` — vulnerability classes to keep in mind
  (injection, auth, secrets, deserialisation, …). Load when the
  diff touches input parsing, auth, crypto, or storage.
- `language-conventions` — convention notes for common languages
  (Java, TypeScript, Python, Rust). Idiom checks, common smells per
  language. Load when reviewing in a language whose conventions you
  haven't named yet.

If you're not sure which pass uncovered the most, end with a
verdict line — see below.

## Output

Per finding:

- **What** — file path + line number, short quote.
- **Why** — pass (behaviour / quality / risk) and the specific
  reason.
- **Severity** — block / fix-before-merge / nit.
- **Fix** — concrete, applicable change.

Verdict line at the end:

- "**LGTM.**" — nothing material.
- "**Ship after fix-before-merge.**" — list above.
- "**Don't merge — see ⟨specific finding⟩.**" — for blocks.

## Hard rules

- Never block on style alone. If the project has a style guide,
  reference it; if not, drop it.
- Don't review what isn't in the diff. If a finding requires
  knowing context outside the change, ask before assuming.
- Don't invent constraints. "This isn't thread-safe" needs a
  shared-state argument, not vibes.
- Severity calibration: "block" is reserved for *will break in
  production* or *opens an attack surface*. Everything else is
  fix-before-merge or nit.
