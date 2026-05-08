# Schedule Tuning — when to trust the algorithm, when to override

SRS algorithms (SM-2, FSRS, the various Anki and
SuperMemo variants) handle interval scheduling. They're
mature; for most cards, just use defaults.

But sometimes the schedule isn't right for a specific
card or learner. This manual is about when to override
and how.

## How standard SRS algorithms work

The basic loop:

1. Card shown; you rate (Again / Hard / Good / Easy).
2. Algorithm picks next interval based on rating and
   history.
3. "Again" → very short interval (10 min, 1 day).
4. "Hard" → small interval increase (e.g., × 1.2).
5. "Good" → medium increase (e.g., × 2.5).
6. "Easy" → large increase (e.g., × 4).

The numbers vary by algorithm; the principle is the
same: success extends; failure resets.

Newer algorithms (FSRS, SuperMemo's recent versions)
also factor in:

- Card-specific difficulty.
- Stability (how long the memory will hold).
- Per-user retention curves.

These are usually better than older SM-2; if your tool
supports, use.

## When to trust the algorithm

For most cards, most of the time:

- Rate honestly.
- Let the intervals stretch.
- Don't override.

The algorithm is doing the hard work of remembering
when to test you. Your job: rate accurately.

## How to rate honestly

The four-button system (Again / Hard / Good / Easy)
needs accurate use to function:

### Again

You couldn't retrieve. Or you retrieved wrong. Reset.

Use when:

- Total blank.
- Got the wrong answer.
- Confused on the answer.
- Took so long to retrieve that in real use you'd
  have failed.

Don't:

- Rate Hard when you actually failed. The algorithm
  thinks you're at the edge; gives larger intervals;
  card decays.

### Hard

You retrieved, but it was a struggle. The interval is
on the edge.

Use when:

- Effortful; you got there but wouldn't trust the
  retrieval under pressure.
- Took a long time but was correct.
- Confused for a moment before getting it.

Don't overuse. "Hard" is genuinely the edge; reserved
for real struggle. Easier struggle is "Good".

### Good

Retrieved comfortably with reasonable effort. The
default rating.

Most cards on most reviews should be "Good".

### Easy

Retrieved instantly with no effort.

Use sparingly. The algorithm increases interval much
more for "Easy"; if you over-rate, the card disappears
into long intervals and decays without you noticing.

If a card is consistently "Easy" → maybe move to longer
review schedule explicitly, or burn it (you know this).

## When to override the algorithm

### Material you must know in 2 weeks

You have a deadline. The algorithm doesn't know about
it.

Override: review the relevant cards more frequently
leading up. Most SRS tools allow custom study sessions
for filtered subsets.

Don't:

- Cram all the cards 2 days before. Spaced sessions
  in the lead-up beat one big session.

### Cards in early acquisition

A card you just made; you've reviewed it once. The
algorithm gives it a 1-day interval.

For new cards, sometimes shorter intervals (a few
hours, then a day) help solidify. Some tools support
"learning steps" for this.

If your tool's defaults work, leave; if cards
consistently fail their first interval, shorten the
learning steps.

### Cards you're consistently failing (leeches)

If a card fails 5+ times in a row, the algorithm's
shortening doesn't help. The card itself is bad or the
concept isn't encoded.

Action: fix the card (rewrite it, split it,
re-encode the underlying material) — *don't* keep
running it through the algorithm.

### Long-vacation re-entry

You've been away 3 months; cards have piled up. The
schedule is broken.

Options:

- **Reset overdue cards**, treating them as fresh. Some
  tools have "reset" or "boost retention" modes.
- **Ramp slowly**: do a few overdue cards per day, not
  all at once.
- **Selectively bury**: cards you don't need urgently,
  bury for now and clean up later.

The hours-of-overdue-reviews approach is brutal and
discourages you from re-entering. Be kind on re-entry.

### Easy cards that you've over-reviewed

A card you've rated "Good" 30 times; the interval is
now 2 years. Maybe burn it. The card has done its
work; reviewing every 2 years adds nothing.

Most tools let you mark cards as "known" / suspend
them.

### Hard cards that need more depth

A card you fail repeatedly because the underlying
concept isn't well understood.

Override: pause SRS on that card. Go back to source.
Re-encode. Then resume.

## The retention dial

Newer SRS algorithms let you set a target retention
rate (FSRS, SuperMemo).

- **Higher target retention** (95%) — shorter intervals,
  more reviews per card. Better for must-know material.
- **Lower target retention** (85%) — longer intervals,
  fewer reviews. Acceptable for "would be nice" cards.

Default 90% retention is reasonable. Override per-deck
or per-card if you have specific goals.

For exam prep: temporarily raise retention before
exam.

For long-term maintenance: 85-90% is fine; missing
some isn't catastrophic.

## When the algorithm is wrong

Sometimes the algorithm gives you a card you forgot
yesterday. Or it persistently shows you cards you've
clearly mastered.

Causes:

- **Algorithm parameters off.** Tune ease factor / per-
  card parameters.
- **You've been mis-rating.** Honest rating produces
  better intervals.
- **Algorithm is older / less sophisticated.** Switch
  to newer algorithm if available.
- **Specific card has unusual difficulty profile**
  that doesn't fit the algorithm's curve.

In most cases, accurate rating fixes things over a few
sessions.

## Daily session size

How many cards per day?

- **20 new + reviews of due cards.** A common starting
  default.
- **50-100 reviews per day.** Sustainable for most
  learners.
- **More than 200 reviews/day** → unsustainable;
  burnout incoming.

If your due-pile is growing past sustainable, three
options:

- Reduce new card rate.
- Reduce target retention (less frequent reviews).
- Suspend cards that aren't worth the time.

The temptation: keep adding new cards because new
material feels productive. The discipline: respect the
review-budget; new cards add to it.

## Pre-exam tuning

Special case worth discussing:

Two weeks before exam:

- Increase target retention (review more often).
- Reduce new cards to zero (you can't encode useful new
  material in 2 weeks for an exam; focus retention).

Three days before:

- Custom study session of all exam-relevant cards,
  regardless of due date.
- Ramp practice to high frequency.
- Treat as cramming-with-good-cards; not ideal SRS but
  fits the deadline.

After exam:

- Resume normal SRS schedule.
- Some cards become unnecessary post-exam — suspend or
  bury.

## Specific situations

### Multiple decks / topics

Some users keep separate decks (language; CS; biology).
Each can have its own retention setting; each can be
reviewed on its own schedule.

Don't make too many decks; review-overhead of
managing them outweighs benefits.

### Shared decks (downloaded)

Premade decks are tempting but problematic:

- Cards are designed for someone else's mind, not
  yours.
- Quality varies wildly.
- Cards on what you already know vs. don't know are
  unsorted.

Use shared decks as raw material; cull aggressively;
add your own cards. Or use as inspiration for your
own deck.

### Multi-language / multi-context cards

If you study three languages, each has its own deck.
Don't mix in one deck — context-switching during review
is bad-interleaving (different from good-interleaving;
the topics are too distant).

## Anti-patterns

### Rate by performance feel

"That felt like a Hard" — based on vibes, not
retrieval quality. Honest rate: did I retrieve
correctly? Was it effortful?

### Always-Good rating

Easy mode. The algorithm assumes you're at appropriate
difficulty; over time, intervals stretch beyond
retention; cards rot.

### Constantly-Easy rating

Same problem; intervals stretch even faster. Sometimes
appropriate (very mature card); often not.

### Override-always

Trust your judgement over the algorithm consistently.
Usually wrong; the algorithm has data you don't.

### Override-never

Treat the algorithm as gospel; never adjust for
deadlines / leeches / context. Sometimes you need to
override.

### Daily review skipping

Skip reviews when busy; skip again next day; due-pile
grows; review becomes overwhelming; quit.

Counter: review every day, even if just 10 cards.
Daily small > sporadic large.

## Output line

- "**Trust algorithm; rate accurately.**"
- "**Override warranted** — ⟨specific reason⟩, action:
  ⟨specific⟩."
- "**Persistent leech** — fix card, don't override
  schedule."
- "**Algorithm misbehaving** — recalibrate parameters
  or switch algorithm."
