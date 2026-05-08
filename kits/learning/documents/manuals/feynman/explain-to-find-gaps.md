# Explain to Find Gaps — the Feynman technique

The technique sounds simple: explain what you're
learning. The discipline is in *what you watch for*
during the explanation, not in the explanation itself.

The explanation is a diagnostic. The output you care
about isn't the explanation — it's the list of gaps the
explanation surfaced.

## The setup

### Pick a target

Audience matters more than topic for this technique.
Common targets:

- **A 12-year-old.** Forces maximum simplification.
  Useful for foundational concepts; sometimes too
  reductive for technical depth.
- **A peer in a different field.** Calibrates jargon.
  You can use one or two technical terms; have to
  explain the rest.
- **A student a year behind you.** Has some of the
  prerequisites; needs the new concept built on them.
  Good test of pedagogy.
- **Yourself, last year.** What didn't you understand
  then that you do now? Useful for memoryless rebuild.

The target should be plausibly real. "Imagine a generic
person" doesn't constrain enough; the brain falls back
to peer-level explanation.

### Pick the topic

Specific. "How TLS works" beats "internet security".
"What gradient descent does, step by step" beats
"machine learning".

If you can't pick something specific, your understanding
is at a higher level than the test should be at.
That's information — your understanding might be
shallower than you thought.

### Set up the explanation

Three formats work:

- **Talking aloud.** As if to the imaginary target.
  Talking surfaces stumbles fast. Record if useful;
  often listening back catches gaps you didn't notice.
- **Writing.** Slower; more deliberate. The act of
  writing forces full sentences which forces filling
  in the parts you'd hand-wave verbally.
- **Drawing.** For visual concepts. Forced
  externalisation; you can't draw what you don't
  understand.

Pick one; stick with it for the round.

## The explanation

Start. Don't rehearse. Don't pause to look things up.
Talk / write straight through.

The point isn't producing a polished explanation. The
point is generating diagnostic data.

### What to watch for

#### Reaching for jargon

You hit a concept; you reach for a technical term that
encapsulates it. "And then the gradient is computed via
backpropagation through the network."

The jargon is a shortcut. The question: do you
understand backpropagation, or are you using the word
to skip past it?

Test: try to substitute the jargon with the actual
mechanism. "The gradient is computed by applying the
chain rule starting from the output and working
backwards through each layer." If you can do this,
fine. If you can't, gap.

#### Hand-waving

"And then by various means..." / "Through some
mechanism..." / "It does what you'd expect..." —
phrases that bury the substance.

Each hand-wave is a gap. Note explicitly:

> "Then the database does ⟨HAND-WAVE: how exactly?⟩"

The note is data; come back to it.

#### Getting stuck mid-explanation

You're explaining; you reach a point where you don't
know what comes next. The explanation stops.

The stop is the most valuable signal of the technique.
You've found the edge of your understanding.

Common variants:

- "Then... I'm not sure what happens next."
- "I know there's a step here but I can't explain it."
- "I think it works like this... but I'm not sure
  why."

Each is a precise gap. Mark; come back.

#### Looping

You restart the explanation; you loop back to the
beginning. You can't move forward.

The loop indicates a foundational gap — you don't have
a stable mental model of the early steps, so you keep
re-checking them.

Diagnostic: where exactly did you re-loop from? That's
the unstable foundation.

#### Discomfort during a section

You make it through the section but it felt
*uncertain*. The words came; the conviction didn't.

Note these too. Less obvious than full stumbles; often
real gaps that haven't surfaced yet.

#### Feeling the explanation is "right" without checking

The opposite warning: the explanation flowed; you feel
good. But did you actually verify? Smooth flow can
indicate either understanding or memorised-without-
understanding.

Cross-check: try a slightly different angle. "Why does
that step happen, vs. an alternative?" — if the
alternative version exposes a gap, you were memorised.

## After the explanation

### Note the gaps

A list. Each gap should be specific:

- "I don't know exactly how RSA's modular exponentiation
  works for large numbers."
- "I hand-wave the part where the distributed consensus
  protocol handles network partitions."
- "I'm uncertain why ⟨step⟩ produces ⟨result⟩ — I just
  know it does."

The list is the diagnostic output. Without the list,
the technique didn't run.

### Fill the gaps

For each gap:

- Go to the source.
- Understand the specific missing piece.
- Don't try to learn the whole topic again — target the
  gap.

Sources by type:

- **Definitional gap:** look up the definition; find
  examples.
- **Mechanism gap:** find an explanation of *how* the
  mechanism works.
- **Intuition gap:** look for analogies, visualisations,
  worked examples.
- **Why gap:** look for the motivation / problem the
  thing solves.

### Re-explain

Run the technique again. The previously-stumbled
section should now flow. New stumbles may emerge —
filling one gap reveals adjacent gaps. Continue until
you can run end-to-end.

The endpoint isn't perfect explanation; it's "I can
explain without hitting any 'I don't know' moments".
Sometimes you reach this in two iterations; sometimes
five.

## Specific patterns

### Maths concepts

The hard parts are usually:

- Why a particular formula works (intuition).
- How to read the notation.
- The relationship between concepts (e.g. eigenvalues
  ↔ stability, derivatives ↔ rate of change).

Feynman test: explain the concept *without writing the
formula*. If you can't, the formula was the substitute
for understanding. Build intuition first; formula
encodes the intuition.

### Code / systems

The hard parts:

- Causality ("X happens *because* Y").
- The actual sequence of events.
- What happens in failure modes.

Feynman test: walk through a request / interaction
end-to-end. Where do you say "and then it does X" — does
that black-box have content?

### Historical / political concepts

The hard parts:

- Causality (multiple plausible causes).
- Distinguishing what happened from what people thought
  happened.
- Generalisation across cases.

Feynman test: explain the concept and *also* one
plausible counterargument. The counterargument-test
reveals whether your understanding is rigid or
contextual.

### Skills / techniques

The hard parts:

- Tacit knowledge that doesn't articulate well.
- The "feel" of when to apply.

Feynman test: try to explain *when* to apply, not just
*what* to apply. The when-judgement is often where
shallow understanding lives.

## When the technique reveals you don't understand

The whole topic, not just gaps. The explanation
collapses; you realise you've been operating on
near-zero comprehension.

Honest result: "I thought I understood; the test
revealed I don't". This is success, not failure — you
caught the gap before it mattered (in an exam, in
production, in conversation).

Action: re-read / re-learn from sources. Don't be
surprised by the next round of explanation also having
gaps; it's iterative.

## When the technique reveals you understand

You can explain end-to-end without stumbles. The
technique passed; the understanding is solid.

Note: "solid" doesn't mean "complete". Deeper questions
still exist. But for the level you're at, you've tested
honestly.

## Anti-patterns

### Memorise to pass

You sense a gap; you memorise the words that cover it
without understanding. Re-explanation flows; you've
defeated the test by gaming it.

Counter: re-test from a different angle. Why does X
happen, instead of Y? If memorised, the alternative-
angle question exposes.

### Stop too early

First explanation has stumbles; you fill the obvious
gaps; you skip the iteration. Often the second round
surfaces deeper gaps.

Counter: at minimum two iterations.

### Explain to yourself in your own jargon

"To myself" you skip simplification because you
already understand. Defeats the technique.

Counter: explanation must be to a target *other* than
yourself.

### Pick easy topics

You apply Feynman to topics you already mostly
understand. Feels productive; doesn't surface real
gaps. The Feynman test is most valuable on topics
where you're uncertain.

### Avoid the hard sections

You explain the parts you know; gloss the parts you
don't ("there are some technical details I won't go
into"). The technique only works if you go through
those details.

### Convert to study

The Feynman explanation becomes a study session — you
end up reading and noting rather than explaining and
finding gaps. They're different activities. Run the
explanation; note gaps; *then* study.

## Output line

- "**Explanation complete; gaps:** ⟨specific list⟩."
- "**Stuck mid-explanation at:** ⟨specific point⟩."
- "**Multiple foundational gaps** — re-learn before
  iterating."
- "**Explanation flows end-to-end** — understanding
  solid for the current level."
