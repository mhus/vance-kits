# Grammar Without Pedantry — rules to follow, rules to drop

Some grammar rules matter for clarity. Others are zombie
rules — they don't affect meaning, they don't affect
readability, but they survive in style guides because
someone in the 1800s thought they should. Knowing which
is which lets you focus on the rules that pay back.

## Rules that matter

These affect clarity. Get them right.

### Subject-verb agreement

Singular subject, singular verb; plural subject, plural
verb.

- Wrong: "The list of items are long."
- Right: "The list of items is long." ("List" is the
  subject; "of items" is a modifier.)

Tricky cases:

- **Either / neither**: usually singular ("either is
  fine"), but in mixed cases follow the closer subject
  ("either the team or the lead is going").
- **None**: traditionally singular; modern usage allows
  plural when meaning "not any of them". Both fine.
- **Collective nouns** ("the team"): singular in
  American, often plural in British. Pick one and be
  consistent.

### Pronoun-antecedent agreement

Pronoun must agree with what it refers to:

- Wrong: "Each developer should test their code."
  (Some style guides; modern usage accepts singular
  "they".)
- Strict: "Each developer should test his or her code"
  (clunky).
- Modern: "Developers should test their code" (plural
  subject avoids the issue).

Singular "they" is now widely accepted; use it. Style
guide may differ; obey the project's guide.

### Misplaced modifiers

The modifier should be next to what it modifies. When
it's not, sentences can mean something other than
intended.

- "She told her she had won the lottery on the way
  home." (Who was on the way home — the speaker or the
  listener?)
- Fix: "On the way home, she told her she had won the
  lottery." (Now clear.)

The classic error: "Walking down the street, the
buildings were beautiful." (The buildings weren't
walking.) Fix: "Walking down the street, I saw
beautiful buildings."

### Comma splices

Two independent clauses joined only by a comma.

- Wrong: "The system works, we tested it."
- Right: "The system works. We tested it." (period)
- Right: "The system works, and we tested it." (and)
- Right: "The system works; we tested it." (semicolon)

Comma splices read as breathless. Sometimes the breath
is the effect (deliberate; voice-driven). Default to
fixing.

### Verb tense consistency

Don't switch tenses without reason within a passage.

- Wrong: "The team meets weekly. They discussed Q3."
- Right: "The team meets weekly. They discuss Q3 in
  every standup." (consistent present)
- Right: "The team met weekly. They discussed Q3."
  (consistent past)

Switching for narrative reasons is fine ("The team met
weekly. They are now meeting biweekly.") — but do it
deliberately.

### Apostrophes for possession vs. contraction

- "It's" = "it is".
- "Its" = belonging to it.
- "You're" = "you are".
- "Your" = belonging to you.
- "Whose" = belonging to whom.
- "Who's" = "who is".

These read as careless errors when wrong. Get them right.

## Rules that don't matter (zombie rules)

These are widely repeated, widely violated by good
writers, and don't affect clarity. Free to break.

### "Don't end a sentence with a preposition"

Cited from Latin grammar where it makes sense; English
isn't Latin.

- Awkward: "About what are we talking?"
- Natural: "What are we talking about?"

Follow the natural one.

### "Don't split infinitives"

The "to boldly go" rule. Cited because Latin
infinitives are one word. English allows the split, and
sometimes the split is clearer.

- Awkward: "I asked them genuinely to consider."
- Clear: "I asked them to genuinely consider."

Follow the clearer one.

### "Don't start a sentence with 'and' or 'but'"

You can. You should sometimes. Many great writers do.

- Stiff: "The project is hard. Additionally, it is
  late."
- Better: "The project is hard. And it is late."

Use sparingly so it lands; don't start every paragraph
this way.

### "Don't use 'I'"

Academic writing convention for some disciplines; not a
universal rule. Use "I" when the writing is yours and
the reader benefits from knowing the author's
position.

Academic writing in some disciplines requires the
passive / "this paper argues" style. Follow the field
convention; it's not a universal grammar rule.

### "Use 'whom' for objects"

Technically correct; rarely natural. "Who do you trust?"
sounds right; "Whom do you trust?" sounds stilted in
most modern writing. Pick by register: formal context
warrants "whom"; casual doesn't.

### "Don't use sentence fragments"

Fragments are valid. For emphasis. As deliberate stops.

Don't overuse; do use.

### "Don't use contractions"

In formal writing, contractions are sometimes
discouraged. In conversational writing, contractions
make the writing sound human. Pick by register.

### Oxford comma

"A, B, and C" vs. "A, B and C". Both fine; pick one and
be consistent. Style guide may decide. Famous Oxford
comma case: "I'd like to thank my parents, Ayn Rand and
God" vs. "I'd like to thank my parents, Ayn Rand, and
God" — comma resolves ambiguity, sometimes.

## Style choices that matter

Beyond rules, style choices affect readability.

### Sentence length

Vary deliberately (see `line-level-pass`).

### Paragraph length

Vary too. A page of equal-length paragraphs reads
mechanical. Mix.

### Quotation style

Consistent within a piece. American English: double for
quote, single for nested. British English: often
opposite. Pick; stick.

### Dashes vs. parentheses vs. commas

For asides:

- **Em dash** — most disruptive; use for sharp asides.
- **Parentheses** (less disruptive; quieter aside).
- **Commas**, the smoothest of the three.

Different feel; same logical role. Pick by tone.

### Numbers — words vs. digits

Convention varies; pick one. Common rule: spell out
under 10, digits for 10+. Or: spell out under 100. Or:
always digits.

Style guide decides for formal contexts; for informal,
just be consistent.

### Date formats

Pick a format; use everywhere. "March 12, 2026" vs.
"12 March 2026" vs. "2026-03-12". Project context
usually dictates; otherwise pick.

## When in doubt, choose readability

A "rule" that produces an awkward sentence isn't worth
following. A rule that produces clarity is worth the
slight extra effort.

Test: read aloud. Whichever version reads more
naturally is the one to ship — even if it breaks a
rule.

## Style guides

If the project has one, follow it. Style guides exist
to make a body of work consistent; consistency aids
readers. You may not love every guide-rule, but
following the guide is a feature, not a constraint.

If the project has no style guide, pick one and use it
implicitly. Most reasonable defaults: Chicago Manual of
Style (US), Oxford Style Manual (UK), AP Stylebook
(journalism), MLA / APA (academic).

## Anti-patterns

### Pedantry in copy-editing feedback

Marking up "rules that don't matter" violations. Wastes
the user's attention. Stick to clarity issues.

### Letting style guides win over readability

A piece that follows every guide rule but reads awkwardly.
Style guide isn't the customer; the reader is.

### Inconsistency tolerated for "voice"

Some inconsistency is voice; most is sloppiness. Test
case-by-case. Spelling "OK" / "okay" both ways across
a piece is sloppiness. Mixing serious and ironic
register is voice.

### Ignoring the project's style guide

If the project has a guide, follow it even if you
disagree. Override only with explicit author /
publisher buy-in.

## Output line

- "**Grammar concerns:** ⟨n⟩ real, ⟨n⟩ zombie. **Real
  fixes:** ⟨specific list⟩."
- "**Style guide:** ⟨followed / not applicable / pick⟩."
- "**No grammar issues** — readability is the limiter
  here, see ⟨weak-words-and-fillers / line-level-pass⟩."
- "**Pedantic concerns** flagged but not enforced —
  ⟨specific zombie rules⟩."
