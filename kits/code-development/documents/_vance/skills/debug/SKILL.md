---
title: Debug
description: Use when the user is hunting a bug — code does the wrong thing, fails intermittently, or breaks in production
version: "1.0.0"
tags: [code, debug, bug]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - bug
      - bugfix
      - debug
      - debugging
      - crash
      - exception
      - stacktrace
      - stack trace
      - funktioniert nicht
      - geht nicht
      - tut nicht was
      - kaputt
      - intermittent
      - flaky
      - flakey
      - flackert
      - reproduce
      - reproduzieren
manualPaths:
  - manuals/debug
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a bug. The job is **not** to guess at fixes; it's to
narrow the search space until the cause is named, then suggest the
fix that addresses the cause.

## Default protocol

1. **State what you know.** "Code A produces output B; expected C.
   Repro is X." If the user hasn't been that crisp, ask for the
   missing piece *before* theorising.
2. **Locate the discrepancy.** Where does observed reality diverge
   from expectation? Closer to the source than to the symptom.
3. **Form a hypothesis.** A specific claim about the cause —
   testable, falsifiable. Not "maybe networking?".
4. **Test the hypothesis.** Cheapest test that disproves it. If
   the test confirms, fix. If it disproves, hypothesise again.
5. **Fix the root cause, not the symptom.** Code that just makes
   the symptom go away usually grows a second bug nearby.

If the user is panicking ("prod is on fire"), the right move is
often a **safe rollback first, then debug the rolled-back state**.
Don't debug live unless you have to.

## On-demand manuals

- `hypothesis-method` — how to form a falsifiable hypothesis,
  the four hypothesis archetypes, when to stop and rehypothesise.
  Load whenever the user is stuck on theorising.
- `bisect-strategy` — when the bug appeared between version A and
  B but you don't know where. Git bisect, log bisect, dependency
  bisect, manual binary search of inputs. Load for "this used to
  work" bugs.
- `log-driven-debugging` — what to log when print-debugging,
  where to put the prints, what to do with the output. Load
  when the user starts adding `console.log` everywhere.

If you're not sure which manual fits, ask the user one question:
"Did this used to work?" — yes → bisect; no → hypothesis.

## Hard rules

- **Don't propose a fix before the cause is named.** The proposal
  has to mention the failing mechanism, not just the desired
  behaviour.
- **Don't add error handling that hides the bug.** A
  `try/catch` that turns a crash into a silent log is a worse
  bug, not a fix.
- **Don't refactor mid-debug.** "While I'm here, let me also
  rename …" — no. Two changes mean two suspects when the bug
  comes back. Land the fix narrow; refactor in a separate PR.
- **If you don't have a repro, get one before fixing.** "Should
  fix it" without a repro is a wish, not engineering.
- **Distrust silence.** If a hypothesis "would explain the
  observed behaviour", it has to predict something else too —
  what does it predict that you can check?
