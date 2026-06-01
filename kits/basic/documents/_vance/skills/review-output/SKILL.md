---
title: Review Output
description: Use when the user asks to review, critique, or audit something they produced — code, text, plan, decision
version: "1.0.0"
tags: [review, critique, quality]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - review
      - prüfen
      - prüfe
      - durchsehen
      - audit
      - critique
      - kritisieren
      - feedback
      - check this
      - take a look
      - look over
      - schau drüber
manualPaths:
  - manuals/review
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is asking for a review. Three orthogonal passes find
different problems; run them as separate passes, not merged. A
merged pass produces vague feedback — separating them produces
specific, actionable findings.

## The three passes

1. **Reuse** — does this duplicate something that already exists?
   New code where a helper would do, new prose where prior work
   covered it, new plan that ignores the previous plan.
2. **Quality** — are there structural smells? Hacky shortcuts,
   parameter sprawl, copy-paste with variation, leaky
   abstractions, stringly-typed code, unnecessary nesting.
3. **Efficiency** — is work being done that doesn't need to be?
   Redundant computation, hot-path bloat, unbounded
   accumulation, sequential what could be parallel.

Default to running all three. For small artifacts, one pass per
artifact is enough; for big ones, walk each pass separately and
aggregate at the end.

## On-demand manuals

- `reuse-checklist` — concrete questions per artifact type
  (code, text, plan, decision). What to grep for, where to look,
  what counts as duplication.
- `quality-smells` — catalogue of smells across artifact types.
  Per smell: what it looks like, why it matters, how to phrase
  the finding.
- `efficiency-traps` — wasteful patterns that survive review
  because they're not "wrong", just unnecessary. Hot-path
  awareness, when to flag, when to leave.

If you don't know which pass to focus on, call `manual_list` and
pick.

## Output shape

Aggregate findings as a compact list. Per finding:

- **What** — quote / location / line number.
- **Why** — which pass it failed (reuse / quality / efficiency)
  and the specific reason.
- **Fix** — concrete, applicable change. "Refactor for
  readability" is not a fix; "extract these 4 lines into
  `parseHeader()`" is.

End with a verdict line:

- "**Ship it.**" — nothing material found.
- "**Ship after these N fixes.**" — list above.
- "**Don't ship — see findings.**" — for material problems
  (reuse blockers, broken abstractions, perf foot-guns).

## Hard rules

- **Don't editorialise.** "This is bad" is not a finding;
  "duplicates `parseHeader()` from line 42" is.
- **Don't argue with the user's choices.** Style preferences,
  naming, formatting — only flag if it conflicts with stated
  conventions or breaks a clear principle.
- **Don't review ground that wasn't shown.** If the user shared
  a snippet, don't fault what's missing from outside the
  snippet — ask if they want broader context first.
- **Be honest about uncertainty.** "Probably an issue but I'd
  need to see X" beats false confidence.
