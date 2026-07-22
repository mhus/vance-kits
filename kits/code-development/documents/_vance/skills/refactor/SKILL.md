---
title: Refactor
description: Use when the user wants to restructure existing code without changing behaviour — clean up, extract, simplify, modernise
version: "1.0.0"
tags: [code, refactor, structure]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - refactor
      - refactoring
      - restructure
      - umbauen
      - umbau
      - aufräumen
      - aufraeumen
      - clean up
      - cleanup
      - tidy up
      - extract
      - extrahieren
      - simplify the code
      - vereinfachen
      - rewrite
      - umschreiben
      - neu schreiben
manualPaths:
  - _vance/manuals/refactor
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user wants to change shape without changing behaviour. The
behaviour-preserving constraint is the whole point — it's what
distinguishes refactor from rewrite. Lose that, and you're not
refactoring, you're re-implementing with extra steps.

## Default protocol

1. **Confirm the constraint.** "Behaviour stays the same? Tests
   must still pass?" If the user wants to *change* behaviour, this
   is the wrong skill — exit, suggest writing the change as a
   feature.
2. **Confirm the scope.** "What's in, what's out?" Refactors that
   sprawl from a single rename into a five-file restructure
   produce reviewable nightmares.
3. **Pick the move.** Extract, inline, rename, replace
   conditional with polymorphism, introduce parameter object,
   etc. — see `extract-or-inline` for the catalogue.
4. **Make the change in one direction at a time.** Extract first,
   *then* rename. Don't mix.
5. **Tests must still pass after each step.** If they don't, the
   refactor is wrong; revert and try the next-smaller step.

## On-demand manuals

- `extract-or-inline` — the two opposite moves and how to choose.
  When extracting helps (DRY, naming the concept, isolating
  change). When inlining helps (premature abstraction, single-use
  helpers, indirection without payoff).
- `breaking-vs-non-breaking` — refactor that touches an API
  boundary. How to decide if the change is breaking, how to
  stage it (deprecate → migrate → remove), how to coordinate
  across consumers.
- `refactor-vs-rewrite` — the strategic decision. When the code
  is so tangled that incremental refactor compounds the mess
  vs. when "let me rewrite this" is the wrong instinct. Calls
  on `decision-frame` from basic.

If the user is on the fence between refactor and rewrite, load
`refactor-vs-rewrite` *first*; the answer there shapes the rest
of the session.

## Hard rules

- **Behaviour preservation is non-negotiable.** A refactor that
  changes behaviour is a feature in disguise; ship it as a
  feature with its own review.
- **Tests are the safety harness.** No tests → write them
  *before* refactoring. Refactoring an untested module on
  vibes is brave and wrong.
- **Don't bundle a feature into the refactor PR.** Two changes
  in one PR cause two regressions; the bisect names the wrong
  commit.
- **Don't refactor on a deadline.** The pressure to cut corners
  ruins the safety harness.
- **No "while I'm here" cleanups** outside the named scope. Park
  them, do them later.
