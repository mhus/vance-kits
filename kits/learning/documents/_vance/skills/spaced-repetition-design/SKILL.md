---
title: Spaced Repetition Design
description: Use when the user is building flashcards, designing an SRS deck, or tuning their spaced-repetition practice
version: "1.0.0"
tags: [learning, srs, flashcards]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - spaced repetition
      - srs
      - anki
      - flashcards
      - flashcard
      - karteikarten
      - karteikarte
      - lernkarten
      - lernkarte
      - card design
      - kartendesign
      - intervals
      - intervalle
      - lernintervall
      - mochi
      - supermemo
manualPaths:
  - manuals/srs
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is using or building a spaced-repetition
system (SRS) — Anki, SuperMemo, Mochi, paper cards. The
technique is well-established: cards are reviewed at
expanding intervals, with intervals lengthening on
success and shortening on failure.

The technique works. The cards usually don't. Most SRS
deck failure is *card-design* failure, not algorithm
failure. This skill is about getting the cards right.

## Default protocol

1. **What are you trying to remember?** Specific facts;
   vocabulary; procedures; relationships. Different
   things warrant different card formats.
2. **Atomic cards.** One idea per card. If the front
   asks two things, split into two cards. See
   `card-design`.
3. **Quality cues.** The front should be a precise
   prompt; the back a precise answer. Ambiguity hurts.
4. **Test the card.** Imagine seeing this in a year.
   Will the cue evoke the answer? If not, revise.
5. **Tune intervals.** Default SRS algorithms work
   well; adjust ease for cards that consistently
   succeed or fail. See `schedule-tuning`.
6. **Recognise when SRS isn't the right tool.** Some
   material doesn't fit. See `when-srs-fits`.

## On-demand manuals

- `card-design` — atomic cards, low-cue questions, no-
  cue answers, both-side cards, cloze deletions, image
  cards. The patterns that produce cards you'll still
  recognise in a year.
- `schedule-tuning` — default intervals, ease factor,
  failure handling. When to override the algorithm;
  when to trust it. Avoiding the leech-cliff.
- `when-srs-fits` — what SRS is good for and what it
  isn't. Vocabulary: yes. Conceptual understanding:
  partially. Skill / procedure / creativity: no.
  Recognising when you're applying the wrong tool.

If you're starting fresh, walk `card-design` first —
card quality is the foundation; nothing else helps if
the cards are bad.

## Hard rules

- **One idea per card.** A card with two things on the
  front gets answered "half" — incorrectly. Split.
- **Don't memorise lists.** "What are the seven X?" with
  seven items on the back. Either you remember all
  seven (rare, fragile) or you fail. Convert to seven
  separate cards or use enumerable structure.
- **No cards on what you don't understand.** Memorising
  by rote without understanding produces brittle cards
  that fail in real use. Understand first; SRS to
  retain.
- **Don't import giant decks blindly.** A deck of 5000
  premade cards on your topic. Most are not
  well-designed for *you*; many you don't need; some
  are wrong. Better to make your own; far better
  retention.
- **Don't rate kindly.** "Hard" or "Good" — be honest
  about how hard the retrieval was. The algorithm
  needs accurate signal.
- **Treat leeches.** Cards you fail repeatedly; the
  algorithm's intervals don't help if the card is
  fundamentally bad. Suspend; rebuild.
- **SRS is for retention, not for first-learning.**
  Encode the material first (read, understand, take
  notes). Then SRS to retain. SRS as the only
  exposure produces shallow knowledge.
