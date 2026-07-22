---
triggers: retrieval practice, aktives erinnern, active recall, blank-page recall, self-quizzing, freies erinnern, cued recall, testen statt lesen, abrufen aus dem gedächtnis, recognition vs recall, wiederholung
summary: Concrete active-recall techniques — blank-page recall, flashcards, self-quizzing, cued and free recall — with guidance on picking one by material and testing before you feel ready.
---

# Retrieval Practice — concrete techniques

Active recall is a category; retrieval practice is the
specific implementation. Several techniques implement
it; pick by what you're learning.

The common thread: you try to produce the answer from
memory before checking. The retrieval attempt is the
learning event.

## Techniques

### Blank-page recall

For learning a topic / set of related concepts.

1. Read the material once.
2. Close it.
3. On a blank page, write everything you remember.
4. Re-open the material. Compare. Note what was
   missing.

The first pass surfaces what's in shallow memory. The
gaps are what to focus on next session.

Variants:

- **Mind-map recall.** Same idea but as a node-and-link
  diagram. Useful for relationships between concepts.
- **Outline recall.** Hierarchical instead of free.
  Useful for structured content.
- **Question-and-answer recall.** Pose a question;
  answer; check.

### Flashcards

For factual / vocabulary / definitional material.

Format: question / cue on one side; answer on the
other.

Process:

1. Look at cue.
2. Try to retrieve answer before flipping.
3. Flip; check.
4. Sort: got it / didn't get it.
5. Repeat the missed ones.

See `srs/card-design` (in spaced-repetition-design
skill) for how to make good cards. The card design
affects success more than the technique.

### Self-quizzing

For longer / chapter-level material.

After reading a chapter:

1. Close the book.
2. Generate 5-10 questions you'd ask about this
   chapter.
3. Answer each from memory.
4. Re-open; check.

The act of *generating* questions is itself
retrieval-practice. Often you find you can pose
questions but can't answer them — that's the gap.

### Free recall

For oral / conversational material (lectures, podcasts,
talks).

After listening:

1. Close / pause.
2. Tell someone (or yourself, aloud) what you heard.
3. Note what you can't recall.

The act of summarising is retrieval; the gaps are what
didn't stick.

### Cued recall

For procedural / sequence material.

Given the first step / context, retrieve the rest:

- "How does the TCP three-way handshake go? — start
  with SYN."
- "How does insertion sort work? — start with first
  element."

The cue prevents the cold-start problem; the rest is
real retrieval.

### Worked-example recall

For mathematical / technical material.

1. Look at a worked example.
2. Cover it.
3. Reproduce it.
4. Check.

Useful for cementing technique. Different from
deriving-from-scratch (harder; sometimes too hard for
recall practice).

## Picking technique by material

| Material | Technique |
|---|---|
| Vocabulary / facts | Flashcards |
| Definitions | Flashcards / self-quizzing |
| Concepts and relationships | Blank-page / mind-map |
| Procedures | Cued recall / worked-example |
| Whole-chapter content | Self-quizzing |
| Lectures / talks | Free recall (right after) |
| Mathematical proofs | Worked-example recall, then derivation |

Sometimes mix: use flashcards for facts; use blank-page
for the conceptual integration.

## Time and frequency

### When to first retrieve

Within the first day after exposure. Earlier is better
within reason; some recommend within an hour.

If you wait longer (a week), the first retrieval often
fails entirely; you're functionally re-learning, not
practising.

### How often

For long-term retention, repeat at increasing intervals
(see `spaced-repetition-design`). Quick rule:

- First repeat: within a day.
- Second: 2-3 days later.
- Third: a week later.
- Fourth: 2-3 weeks later.
- Continue spacing exponentially.

Forgetting between intervals is fine — even useful.
Each successful retrieval after forgetting strengthens
the memory more than retrieval after no forgetting.

### Session length

15-30 minutes is the working session. Beyond, attention
drops; further retrieval becomes shallow.

Multiple short sessions across days >> one long
session.

## The "test before you feel ready" discipline

The hardest discipline. The brain says "I haven't
mastered this yet; let me re-read once more before
testing".

Resist. Test first. Even when you don't feel ready.
Even when you're confident you'll fail.

Why:

- The test reveals what you actually know vs. what
  feels familiar.
- A failed retrieval *plus* the answer is a more
  potent learning event than re-reading.
- Familiarity-feel is unreliable as a learning
  signal; testing is reliable.

If you fail badly: that's data. Re-read; retest. The
re-test is now a calibrated effort, not a vague hope.

## Specific patterns

### When retrieval feels easy

You retrieved correctly with no struggle. Two options:

- **Genuinely easy:** the material is over-learned. Move
  on; spend time on harder material.
- **Falsely easy:** you've practised so recently that
  it's still in working memory. Wait longer; retest.

### When retrieval is impossible

You try; nothing comes. The retrieval failed completely.

Options:

- **Material wasn't well-encoded.** First exposure was
  shallow. Re-read carefully; retest.
- **Material is too complex for current chunking.**
  Break into smaller pieces. Retrieve each piece;
  build up.
- **Long gap since exposure.** Sometimes you've waited
  too long between exposure and first retrieval. Brief
  re-read; retest.

### When you remember the structure but not details

"It's the part about X with three steps... I can't
recall the specific steps."

This is a partial retrieval. The structure is in
memory; the details aren't.

Often a sign that:

- You learned the concept but not the specifics.
- The specifics need flashcard-style drill.
- The structure is fine; supplementing with detailed
  cards completes.

### When you remember details but not structure

"I remember three specific facts but I'm not sure how
they fit together."

Reverse problem: details encoded; integrative structure
missing.

Use blank-page or mind-map recall to build the
structure. Concepts and relationships, not just facts.

### When you can recall in one direction but not the
other

"Given X, I can produce Y. Given Y, I can't produce X."

Common with one-directional flashcards. The repair: add
the reverse direction.

For some material this matters (vocabulary in two
languages); for some it doesn't (theorems where the
forward direction is what you need).

## Pitfalls

### Recognition vs. recall

You're presented with options; you pick the right one.
Feels like remembering. It's recognition, which is much
weaker than recall.

True recall produces the answer without prompts.
Multiple-choice is recognition.

If you study with multiple-choice quizzes, you're
practising recognition. Will be misleading for
retention; convert to free-form questions.

### Looking at the answer too quickly

The first attempt fails; you immediately look. You miss
the productive struggle that strengthens memory.

Wait at least 10-30 seconds before checking. Even if
you can't retrieve, the *trying* matters.

### Gradient of grading

"I sort of got it." / "I had part of it." / "Close
enough." — gives the impression of progress without
honest measurement.

Binary: retrieved correctly or didn't. Partial credit
hides the gap.

### Re-test in the same session

You retrieve; you fail; you immediately try again.
Working memory carries you through. Feels like
learning; isn't.

Retest after a break (an hour, a day). The interval is
where the learning happens.

### Avoiding cards you keep failing

The hard cards are exactly the ones to drill. Avoiding
them produces an illusion of mastery (everything you
test, you know) and a real gap (the hard ones, you
don't know).

Surface the hard cards; drill them; eventually they
become not-hard.

## When to stop a retrieval session

- **Diminishing returns.** Last 5 cards / questions
  produced the same struggle as the first 5 — no
  progress.
- **Frustration overflow.** You're failing without
  insight; stopping for a break is more productive
  than pushing.
- **Genuine end.** You've covered the material; further
  passes would be premature without spacing.

Don't stop because:

- You wanted to be done by now.
- You feel embarrassed by failures.
- You've hit a hard card.

The hard card is when retrieval-practice is most
useful.

## Anti-patterns

### Re-reading-as-substitute

You "study" by re-reading the material multiple times.
Feels productive; minimal retention. The technique
displaces actual learning.

Counter: replace re-reading with retrieval-practice.

### Highlighting-as-substitute

Same trap with highlighting. Marking up text feels
active; isn't.

Counter: convert highlights into flashcards / questions
that test retrieval.

### Over-elaborate setup

Building a perfect study system before doing any
retrieval. The setup is procrastination.

Counter: blank page + pen + start. Optimise the system
later if needed.

### Solo retrieval forever

Some retrieval is best with a partner — they ask;
they catch the bluffing; they push. Long-term solo
practice can drift into faking the retrieval.

Counter: occasional partner / study group; even one
session catches blind spots.

### Conflating recognition with recall

Multiple-choice study. Comfortable; weak. Free-recall
is the real practice.

## Output line

- "**Retrieval session complete:** ⟨n⟩ items, ⟨n⟩
  retrieved successfully, ⟨n⟩ to drill."
- "**Reverting to re-reading detected** — switch to
  retrieval."
- "**Recognition-practice trap** — convert to
  free-recall format."
- "**Material not encoded** — re-read carefully before
  next retrieval attempt."
- "**Practice complete for now; next session in
  ⟨specific interval⟩.**"
