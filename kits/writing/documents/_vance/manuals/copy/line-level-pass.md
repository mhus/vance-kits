# Line-Level Pass — sentence-by-sentence

Each sentence is its own object. The line-level pass
examines them individually for clarity, shape, and
emphasis.

## Active vs. passive

Active is usually clearer:

- Passive: "The proposal was approved by the committee."
- Active: "The committee approved the proposal."

The active version has more punch and is shorter. Default
to active.

Passive earns its place when:

- **The agent is unknown / unimportant.** "The keys were
  lost" — who lost them might not matter.
- **The object is the focus.** "The bill was signed into
  law in 1965" — the law's date matters; whose signature
  doesn't.
- **You're hiding the agent on purpose.** Politicians
  love this; "mistakes were made". Use sparingly; readers
  notice.

If passive isn't earning its space → flip to active.

## Sentence length variety

A piece of all-short sentences feels choppy. A piece of
all-long sentences feels turgid. Mix.

Short sentences hit. Long sentences develop, qualify,
unfold. Use both, deliberately.

The "two long, one short" rhythm is reliable: build with
two complex sentences, land with a short one. The short
one carries weight because it follows length.

If your draft is monotone in length: vary deliberately.
Combine adjacent short sentences; split long sentences
that have natural breaks.

## Opening words

The first word of a sentence does work; it sets the
register. Repeated opening words feel mechanical.

If three sentences in a row start with "The":

```
The system has X. The system also has Y. The system
prioritises Z.
```

→ vary the openings:

```
The system has X. It also has Y. Priority goes to Z.
```

Same content; less mechanical. Watch for repeated "It",
"This", "There", "I", "We" too.

## End-of-sentence emphasis

The last word of a sentence is the most-stressed
position. Reorder when the punch word is buried.

- Buried: "The proposal failed for technical reasons,
  unfortunately."
- Stressed: "Unfortunately, the proposal failed for
  technical reasons."
- Better still: "The proposal failed. The reason was
  technical."

Move the word that carries weight to the last position.
Cut "unfortunately"-style adverbs that appear post-punch
— they dilute.

## One thing per sentence

A sentence with two unrelated claims joined by a comma
or "and" is two sentences hiding as one.

- Mixed: "The auth system uses JWT, and we deploy to
  three regions."
- Two: "The auth system uses JWT. We deploy to three
  regions."

Separate sentences make it obvious that two claims are
made. Combined sentences let one claim hide behind the
other.

Exception: when two claims are genuinely linked
(causation, contrast, sequence), the join carries
meaning. Don't split if the join is doing work.

## Burying the subject

The subject of a sentence is what it's about. Long
parenthetical openings bury it.

- Buried: "After considering all the options, the
  technical implications, and the deadlines that the
  team had committed to, the decision was made to defer."
- Surface: "The team chose to defer. They considered
  options, technical implications, and committed
  deadlines."

If the reader has to scan past 15 words to find the
subject, restructure.

## Awkward inversions

"Strong is the case." Yoda-syntax. Sometimes works for
emphasis ("Strong was the wind that night."), usually
just feels wrong.

Default: standard subject-verb-object. Invert only when
inversion is doing work.

## Pronoun reference

"It", "this", "that", "they" should clearly refer to
something nearby. Ambiguous reference creates
re-reading.

- Ambiguous: "The team and the manager met. They decided
  to escalate."
- Clear: "The team and the manager met. The team decided
  to escalate."

Refer back to the actual noun if there's any chance the
reader picks the wrong antecedent.

Common offender: "this" at the start of a paragraph,
referring vaguely to the previous paragraph. "This is a
pattern we see often." → "this what?". Replace "this"
with "this pattern", "this approach", "this failure
mode".

## Verb-noun nominalisations

Hidden verb in a noun:

- "Made the assumption that X" → "assumed X".
- "Has the ability to" → "can".
- "Came to the conclusion that" → "concluded that".
- "Engaged in a discussion of" → "discussed".

Verbs are punchier than verb-nouns. Restore the verb.

## Word repetition

Same word three sentences in a row jars. Often
unconscious.

Spot via: skim for repeated words; look at adjacent
paragraphs for the same word doing different work; vary
where it's incidental.

Don't vary for variation's sake. Sometimes the right
word is the right word both times.

## Cliché detector

Phrases the writer didn't author; phrases that arrive
ready-made:

- "At the end of the day"
- "Move the needle"
- "Low-hanging fruit"
- "Outside the box"
- "Game changer"
- "Synergy"
- "Best practices"

Cut or replace. The reader skims clichés; they pass
without information.

Exception: voice-driven use. Some writers deploy clichés
deliberately, ironically, in dialogue. That's fine.

## Sentence rhythm

Read aloud or imagine reading aloud. Where you
naturally pause. Are the pauses well-placed?

- Sentence with no natural pause: probably too long, or
  badly structured.
- Sentence where you pause too often: probably needs
  fewer commas, or splitting.
- Sentence that lands well aloud: good rhythm, leave it.

Reading aloud is the single best technique for
copy-editing. Catches what eye-reading misses.

## How to do the pass

### Print or paste into different format

Reading the same draft in the same editor where you
wrote it: your eye glosses. Print, or paste into a
different tool, or change the font. Different surface =
fresh attention.

### Pass on opening sentences first

The first sentence of each paragraph carries
disproportionate weight; skim through these only. If a
piece has 12 paragraphs, that's 12 sentences; you can
fix opening-sentence problems in 10 minutes.

### Pass on closing sentences

Same logic. The last sentence of a paragraph either
hands off or punches; if it does neither, fix.

### Pass on transitions

The bridge sentence between paragraphs (often the last
of one or first of the next). Fix awkward bridges.

### Final whole-piece read aloud

After the targeted passes, read the whole thing aloud.
Catches what the targeted passes missed.

## Anti-patterns

### Polishing before structure is settled

Editing words in paragraphs you'll later cut. Wasted.

### Polishing every sentence equally

The middle of paragraphs is less-stressed reading; the
opening and closing of paragraphs is more-stressed. Spend
proportional effort.

### Fixing in place vs. proposing alternatives

When working with a user, sometimes just propose two
versions and let them pick. Doesn't need to be one
"correct" edit; sometimes two passable options are the
clearest signal.

### Imposing personal preferences

You think "moreover" is bad; the user uses it
deliberately. Their voice; their call. Surface, don't
impose.

## Output line

- "**Line-level pass complete:** ⟨n⟩ sentences refined."
- "**Specific concerns:** ⟨list of paragraph numbers⟩."
- "**Voice-driven retention** — ⟨specific⟩ flagged but
  kept."
- "**Structure issue surfaced** — escalate to
  `structural-edit` before finishing."
