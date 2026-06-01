---
title: Feynman Method
description: Use when the user wants to test their understanding by explaining a concept simply — finds gaps where understanding actually breaks
version: "1.0.0"
tags: [learning, understanding, explanation]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - feynman
      - explain it simply
      - simple erklären
      - simple erklaeren
      - in eigenen worten
      - in own words
      - really understand
      - wirklich verstehen
      - test understanding
      - verständnis prüfen
      - verstaendnis pruefen
      - is this clear
manualPaths:
  - manuals/feynman
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user wants to test or build understanding through
explanation. The Feynman method (named after physicist
Richard Feynman, who popularised the approach): explain
the concept in simple language, watch where you stumble,
fill the gaps, repeat.

Different from `rubber-duck` (basic): rubber-duck is
about *external* problem-solving by talking through.
Feynman is about *internal* understanding-building by
forced simplification.

The premise: if you can't explain it simply, you don't
understand it. The corollary: forcing simple explanation
surfaces exactly where understanding breaks.

## Default protocol

1. **Pick the concept.** Specific is better than general.
   "How JWT works" beats "JWT". "The math behind
   gradient descent" beats "ML".
2. **Explain to a target audience that doesn't know it.**
   A student / a layperson / a friend in another field.
   The audience matters — see `simplest-language-test`.
3. **Watch for the stumbles.** Places where you reach
   for jargon, hand-wave, or get confused. Each stumble
   is a gap. See `failure-as-data`.
4. **Fill the gap.** Go back to the source; understand
   the missing piece; re-explain.
5. **Iterate until you can explain end-to-end without
   stumbles.** That's the test of understanding.

## On-demand manuals

- `explain-to-find-gaps` — the technique in detail.
  How to set up the explanation; what to watch for in
  yourself; common patterns of stumble.
- `simplest-language-test` — calibrating "simple
  enough". The "explain it to a 12-year-old" frame and
  its limits. When jargon is necessary; when it's a
  shortcut.
- `failure-as-data` — what to do when the explanation
  breaks. Diagnosing why: missing definitions, missing
  intuition, missing causality, missing example. Each
  type of break warrants different repair.

If you're starting fresh on a concept, walk
`explain-to-find-gaps` first — the technique itself
matters most.

## Hard rules

- **Don't fake it.** Glossing over a hard step ("and
  then by some math, X happens") doesn't pass the test;
  you've identified a gap and pretended otherwise.
  Either understand it or note explicitly that you
  don't.
- **Don't use jargon as a substitute for explanation.**
  "It works via the protocol's handshake" — what
  handshake? what does it do? Jargon-as-shortcut hides
  gaps.
- **Don't aim for showy simplicity.** "Imagine a fish
  riding a bicycle..." — analogies that obscure rather
  than clarify. Test: does the explanation actually
  help, or just sound clever?
- **Don't avoid the hard step.** Every concept has a
  hard step. The Feynman test specifically targets
  that step. If you keep "explaining around" it,
  you're testing the soft parts only.
- **Don't audience-mismatch.** Explaining to a
  layperson is one test; to a peer is a different test.
  Pick deliberately; calibrate.
- **Don't learn-to-explain.** The trap of preparing the
  explanation to look good rather than to test
  understanding. The point is the *test*, not the
  performance.
