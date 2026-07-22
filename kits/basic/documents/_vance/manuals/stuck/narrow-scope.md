---
triggers: scope verkleinern, narrow scope, bite too big, five-minute test, vertical slice, happy path, time-boxing, kleinster schritt, festgefahren zu groß, slice schneiden, throwaway bauen, umfang reduzieren
summary: How to get unstuck when the task is too big: the five-minute test, slicing techniques (vertical, worst-case, happy-path, fake-the-hard-part, strip a feature), and time-boxing the slice.
---

# Narrow scope — when the bite is too big

Stuck because what's on the plate is too much. Symptoms:

- The user knows what to do but every step branches into more
  decisions.
- Estimating duration produces "a few weeks" with low confidence.
- Starting feels heavy; finishing feels distant.
- The user has rewritten the plan three times.

Solution: shrink. Aggressively.

## The five-minute test

Ask: **"What's the smallest thing you could finish in five
minutes that would still count as progress?"**

If the answer is:

- **"Nothing"** → the framing is wrong (see `re-frame`) *or* the
  user is exhausted (see `switch-modality`).
- **"Read the docs / set up the env"** → that's prep, not
  progress. Push: "what's the smallest thing that produces an
  artifact I can show someone?".
- **"Write one paragraph / one function / one bullet"** → good.
  Do that. Now.

## Slicing techniques

When the user can't see a small slice, offer one of:

- **Vertical slice.** End-to-end through one narrow case. One
  user, one input, one output. Skip generality.
- **Worst-case-only.** Solve the hardest sub-problem first. If
  that's tractable, the rest follows. If it's not, you've saved
  yourself the rest of the work.
- **Happy-path-only.** Skip error handling, edge cases, polish.
  Just see if the spine works.
- **Fake the hard part.** Stub the part you don't know how to
  build. Mock the API. Hard-code the data. Make the rest run.
- **Strip a feature.** What can you take *out* and still ship?
  Often: a lot.

## Time-boxing

A frequent trap: the user agrees to "narrow" but then reopens the
scope mid-work. Defend the box:

- "Forty-five minutes on this slice. Stop at the timer regardless
  of state. Then we re-evaluate."
- The artifact at minute 45 is the deliverable, even if it's
  ugly. Polish later — or never.

## Anti-patterns

- **Pre-factor the slice.** "Let me first design the abstraction
  so the slice is reusable." No. The slice is throwaway. Build
  the throwaway.
- **Slice into prep + slice + prep + slice.** Every slice should
  produce a visible artifact. Reading docs is not a slice.
- **Reward the slice with another slice.** Finished one? Stop.
  Look at it. Decide. Don't auto-pilot.

## Output line

End with one of:

- "**Smallest slice:** ⟨specific deliverable⟩. **Time-box:** N min."
- "**No slice fits** — see `re-frame`. The framing is the
  problem."
- "**You finished a slice already.** Stop and review before
  committing to the next one."
