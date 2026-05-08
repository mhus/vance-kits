---
title: Tone and Voice
description: Use when the user is tuning audience fit, register, or distinctive voice — usually after structure and copy-edit
version: "1.0.0"
tags: [writing, tone, voice, audience]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - tone
      - voice
      - register
      - audience
      - zielgruppe
      - publikum
      - klingt zu
      - sounds too
      - sounds wrong
      - feels off
      - audience fit
      - level
      - formalitätsgrad
      - formality
      - schreibstil
      - writing style
manualPaths:
  - manuals/tone
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a draft that says what they want to say but
doesn't *sound* right. Maybe too formal, too casual, too
academic, too breezy. The fix is tone-and-voice: small
adjustments that shift register without changing
substance.

This is the last edit pass. Structure (`structural-edit`)
and lines (`copy-edit`) come first. If you tune voice on a
piece whose structure is wrong, the wrong-shaped piece
will still read wrong.

## Default protocol

1. **Who's the audience?** Specifically. Not "developers"
   — "developers reading a security postmortem they didn't
   ask for". Specifics drive every other decision. See
   `audience-mapping`.
2. **What register fits?** Formal / professional /
   conversational / friendly / wry. Pick one as primary.
   See `register-and-tone`.
3. **What's the voice?** The user's distinctive voice
   should come through. Not the same as register —
   register is "how formal", voice is "who's writing".
   See `voice-consistency`.
4. **Pass through the piece** spotting register mismatch
   (over-formal in casual piece; over-casual in formal
   piece). Adjust at the level of word choice, sentence
   shape, opening / closing register.
5. **Read aloud as audience.** Imagine the audience
   reading. Where does it sound off? Fix.

## On-demand manuals

- `audience-mapping` — defining the audience usefully.
  Beyond demographics: what they know, what they want
  from this piece, what register they're used to. Common
  audience-mismatch patterns.
- `register-and-tone` — register choices (formal /
  professional / conversational / casual / wry) and how
  to land each. Word choices, sentence shapes, openings,
  closings, what to avoid per register.
- `voice-consistency` — distinguishing voice from
  register; finding the user's voice in their draft;
  preserving voice through editing. When voice and
  register conflict; how to harmonise.

If unsure where to start: `audience-mapping` always —
without an audience, register is guesswork.

## Hard rules

- **Don't sand off voice in the name of "professional".**
  Distinctive voice is not unprofessional. Quirks,
  unusual phrases, sentence-rhythm signatures — these
  are features.
- **Don't impose your preferred register.** If you
  prefer wry-conversational and the user is writing a
  legal brief, follow the brief's needs, not yours.
- **Don't fix what readers won't notice.** Small register
  mismatches in the middle of a paragraph are
  forgivable; the opening, the closing, and section
  starts carry more weight.
- **Don't paste in cliché register-markers.** "We are
  pleased to announce" / "Thank you for your interest in"
  are register-by-numbers. Real register comes from word
  choice and rhythm, not formula phrases.
- **Don't rewrite to be 'engaging'.** The pop-Twitter-
  thread register ("Ever wondered why X? Here's a
  thread.") is itself a tone. Use it if it fits the
  audience; don't impose it.
- **Voice persists across pieces; register varies per
  piece.** Don't push the user toward a different voice
  just because a different one would fit this piece.
  That's a re-write, not a tone-edit.
