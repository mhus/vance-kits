---
triggers: einfache sprache, 12-jährigen erklären, audience calibration, zielgruppe wählen, simplify, analogien, jargon vermeiden, layperson, expert dialogue, over-simplification, verständliche erklärung
summary: Calibrating how simple an explanation should be by picking the right audience level, and recognising where pure simplification distorts or misleads.
---

# Simplest Language Test — calibrating the audience

The Feynman frame often invokes "explain it to a
12-year-old". Useful as a discipline; sometimes
applied wrong.

This manual is about calibrating *how simple* an
explanation needs to be — and where pure simplicity
breaks down.

## The 12-year-old frame

The popular version of the Feynman test: imagine
explaining to a child. Forces:

- Plain words instead of jargon.
- Concrete examples instead of abstractions.
- Why-it-matters instead of just-the-mechanism.

Useful for:

- Foundational concepts where the goal is
  understanding-the-essence.
- Identifying jargon-as-shortcut.
- Building intuition from scratch.

Not useful for:

- Concepts that genuinely require prerequisite
  knowledge (graduate-level mathematics, specialised
  domains).
- The 12-year-old can't be expected to follow
  algebraic notation; some concepts can't be
  expressed without it.
- Teaching a peer who would benefit from precise
  technical language.

The 12-year-old test is a *disciplinary* tool, not the
universal target. Use to surface laziness; switch to
appropriate audience for actual understanding-checks.

## Calibrating audience

Pick the audience based on what you're testing:

### Foundational understanding

Audience: someone with no relevant background.

What you can use: everyday vocabulary; one or two
named concepts (introduced).

What you can't: jargon; assumed prerequisites.

Test passes when: an outsider can follow what's
happening and why it matters.

### Conceptual understanding

Audience: an educated layperson, or a peer in another
field.

What you can use: technical terms with brief
definitions; analogies to other fields.

What you can't: deep jargon; field-specific reasoning
patterns.

Test passes when: someone with general intelligence
but no domain knowledge gets the *concept*, even if
not the implementation.

### Working understanding

Audience: a junior in your field.

What you can use: standard jargon (assumed); standard
methods (referenced).

What you can't: hand-waving over hard parts; appeal to
authority.

Test passes when: someone who could implement / apply
the concept could now do so.

### Expert dialogue

Audience: a peer with the same background.

What you can use: precise technical language;
shorthand; field-specific reasoning.

What you can't: omit the genuinely controversial /
uncertain parts; appeal to consensus to skip
disagreement.

Test passes when: a peer would engage with your
explanation as a genuine claim, not a recitation.

## Picking the right level

For a given concept, pick the audience that matches
your *actual* learning goal:

- **Building first intuition:** foundational audience.
- **Deepening conceptual understanding:** conceptual.
- **Preparing to apply:** working.
- **Preparing to defend / contribute:** expert.

The wrong-audience pick:

- Too simple for your goal: you simplify away the
  parts you actually need to understand.
- Too complex for your goal: you skip building the
  intuition; you can recite but not apply.

## Where simple language genuinely fails

Some concepts can't be made truly simple without
distortion. Examples:

### Specific mathematics

"Eigenvalues" can be motivated to a layperson ("special
directions of a transformation that don't get
rotated"); the actual computational understanding
requires linear algebra background. The simple
version is *evocative*, not *operational*.

### Specialised vocabulary

In some fields, the technical term *is* the concept.
"Subjunctive mood" in linguistics; "homotopy" in
topology; "futures contract" in finance. The term
encodes a specific cluster of meaning; replacing it
with everyday words loses the precision.

### Cross-domain bridges

Explaining a concept in field A to someone in field B
sometimes requires building specific bridges. Pure
simplification can collapse the bridge.

In these cases:

- Acknowledge the simplification has limits.
- Use the simplification to build first intuition.
- Then introduce the proper jargon when the intuition
  can support it.

## When simple language misleads

Sometimes the simple version is *wrong* — it hides a
qualification that matters.

Common pattern:

- Simple: "X causes Y."
- Real: "X is associated with Y under conditions Z; in
  some cases Y causes X; the correlation is moderate."

The simple version helps initial intuition; if you stop
there, you have a wrong model. Honest framing: "the
simple story is X causes Y; the truth is more
qualified — here's the qualification."

## Specific anti-patterns

### Performative simplification

"In simple terms..." followed by content that's not
actually simpler, just shorter. The phrase signals
"trust me, I'm being clear" without delivering
clarity.

Test: does the supposedly-simple version actually
unlock understanding for the target audience? If not,
it's performance, not simplification.

### Jargon-as-simplicity

"It's just X using Y to do Z." Each capitalised word is
jargon. The "just" implies simplicity; the content
isn't simple at all.

Counter: define each jargon term, then re-test.

### Overly-cute analogies

"Imagine a fish riding a bicycle while juggling
oranges..." — the analogy distracts more than it
clarifies. Cute ≠ illuminating.

Good analogies share *structural* similarity with the
target concept. Test: does the analogy help the
listener generate further accurate intuitions, or just
make them laugh?

### Layered analogy

You explain X via analogy to Y; Y itself was an
analogy for the target. Stack of bridges; somewhere
the connection breaks.

Counter: one level of analogy max; analogy should
ground in actual experience the listener has.

### Lecturer-mode

You explain to "a 12-year-old" by talking down — slow,
exaggerated, performative. Real children find this
condescending; so do adults you're treating that way.

Counter: simplify the *content*, not the manner.

### Audience-shift mid-explanation

You start explaining to a layperson; halfway through,
you slip into peer-level technical detail. The
listener gets lost.

Counter: pick the audience; commit through the
explanation.

## Practical calibration

A useful practice: write or speak the explanation;
re-read; ask "does this match the audience I picked?".

Edits if not:

- **Too technical for chosen audience:** find each
  jargon; replace or define.
- **Too simple for chosen audience:** find each
  hand-wave; tighten with proper terminology.
- **Mixed levels:** decide which level was right for
  the goal; level the rest.

The edit pass is part of the technique. First-pass
explanations are usually mis-levelled; calibration
catches it.

## When you genuinely can't simplify

Sometimes you try; the concept resists. Either:

- **You don't yet understand it well enough.** Going
  back to learn more usually unlocks simpler
  explanation.
- **The concept genuinely requires the prerequisite
  framework.** No amount of understanding will
  simplify "Hilbert space" for someone without
  functional analysis. Acknowledge this; teach the
  prerequisite if relevant.

The two cases feel different to the explainer: the
first feels frustrating ("I should be able to say
this"); the second feels measured ("this requires
context").

If you can't tell which, default to "I need to
understand it better" — at least until you've tried
hard.

## Output line

- "**Audience picked:** ⟨specific⟩. **Calibration:**
  ⟨appropriate⟩."
- "**Wrong audience for goal** — re-pick to ⟨specific
  audience⟩."
- "**Mixed levels** — level the explanation to ⟨specific⟩
  level."
- "**Concept resists simplification** — either learn
  more, or accept prerequisite framework."
