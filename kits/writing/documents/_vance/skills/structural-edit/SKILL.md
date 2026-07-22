---
title: Structural Edit
description: Use after a first draft exists, when the user wants to rearrange, cut, or restructure — not yet polish words
version: "1.0.0"
tags: [writing, edit, structure]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - structural edit
      - structure edit
      - umstrukturieren
      - umstellen
      - rearrange
      - reorganise
      - reorganize
      - cut down
      - kürzen
      - kuerzen
      - shorten
      - too long
      - zu lang
      - draft revision
      - second draft
      - zweiter entwurf
manualPaths:
  - _vance/manuals/structural
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a draft. It exists; it's bad in the normal way
first drafts are bad. The work now is **shape**, not words —
restructure before polishing, because polishing parts you'll
later cut wastes effort.

The order matters: structure → sentence → tone. Skipping
structure to "improve writing" is editing-as-procrastination.

## Default protocol

1. **Confirm the draft is "complete enough".** A draft with
   gaps mid-section isn't ready for structural edit; it's
   still drafting. If the user is half-way, send them back
   to `drafting`.
2. **Outline-from-draft.** Summarise each paragraph in one
   line. The list of those lines is the implicit outline.
   Read it: does the order make sense? Does it cover the
   one-line-summary of the piece? See `outline-from-draft`.
3. **Restructure based on the outline.** Move sections /
   paragraphs around. Cut paragraphs that don't earn their
   space. Don't polish lines; just move blocks.
4. **Read paragraphs in sequence.** Does each paragraph
   flow from the previous? Does each end set up the next?
   See `paragraph-flow`.
5. **Cut.** First drafts are 30-50% over-length almost
   always. See `cutting-down`.
6. **Stop before line-editing.** Hand off to `copy-edit`.

## On-demand manuals

- `outline-from-draft` — extracting the implicit outline
  from existing prose. Paragraph-summary technique;
  spotting redundant sections; identifying gaps; promoting
  buried thesis statements.
- `paragraph-flow` — reading paragraphs in sequence,
  spotting jumps, fixing transitions, recognising when a
  transition isn't fixable (the underlying structure is
  wrong).
- `cutting-down` — what to cut. Repetition, throat-
  clearing, over-explanation, qualifications, examples
  that don't add. How much is realistic; when shorter
  reads better.

If the user has a specific structural concern ("this
section feels off"), call `manual_list` and pick. If
they want a general pass, work through outline-from-draft
→ paragraph-flow → cutting-down in order.

## Hard rules

- **Don't edit at sentence level yet.** Tempting; wrong
  phase. Even if you spot an awkward sentence, mark it
  `[POLISH]` and keep moving on structure.
- **Don't add new content unless a real gap surfaces.**
  Structural edit is shaping what's there; not writing
  more. New ideas mid-edit signal you're back in
  drafting — separate phase.
- **Don't fall in love with paragraphs.** Sometimes a
  beautiful paragraph has to go because it doesn't serve
  the piece. Save it (a "cuts" file works); cut it from
  the draft.
- **Don't fix what's not the structure.** If the user
  wants to discuss tone, register, or word choice, that's
  a different skill (`copy-edit` or `tone-and-voice`).
  Surface the misfit; don't try to do everything.
- **Don't structurally edit the user's voice out.** Some
  things are voice-driven, not structure-driven. The
  three-clause sentence with the surprising kicker isn't
  a structural problem; it's the writer's signature. Move
  with care.
