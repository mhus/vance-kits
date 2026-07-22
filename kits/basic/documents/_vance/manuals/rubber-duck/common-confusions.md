---
triggers: denkfehler, common confusions, correlation vs causation, necessary vs sufficient, notation vs concept, spec vs implementation, reference vs copy, begriffsverwechslung, rubber duck patterns, static vs dynamic, verwechslung aufdecken
summary: A checklist of recurring confusion patterns (conceptual, terminological, state/time, identity) for a rubber-duck listener to spot and gently surface in a user's explanation.
---

# Common Confusions — patterns the duck should listen for

A checklist of recurring confusion patterns. If you spot one in
the user's explanation, surface it gently — the user often
hasn't noticed they're stepping on the same rake.

## Conceptual confusions

### Correlation vs. causation

The user explains "A goes up when B goes up, so B causes A". Probe:

- "What else changes when B does?"
- "If you fixed B and held it constant, would A still move?"
- "Is there a third thing C that drives both?"

### Necessary vs. sufficient

The user says "we need X to happen, so once X happens we're good".
Necessary ≠ sufficient. Probe:

- "Is X enough on its own, or just one of several?"
- "What else has to be true?"

### Average vs. distribution

The user reasons about the average and then is surprised by
extreme cases. Probe:

- "What does the worst 5% look like, not the average?"
- "Is the distribution thin or fat-tailed?"

### Local vs. global optimum

The user is improving the thing one step at a time and proud of
each step. Probe:

- "If you took five steps in a different direction, could you go
  further?"
- "Is the current direction taking you somewhere good or just
  *somewhere*?"

## Notation / terminology confusions

### Notation vs. concept

The user struggles because the *symbol* is unfamiliar, not the
idea. Probe:

- "Forget the notation — describe the thing in plain words."

Often they then realise they understand it; the symbol was the
barrier.

### Same word, two meanings

Words like "type", "context", "model", "controller", "client"
mean different things in different parts of the system.

- "When you said 'context' just now, did you mean the runtime
  context or the user-input context?"

### Folk term vs. technical term

The user uses a word colloquially that has a precise technical
meaning ("function", "race condition", "atomic"). Probe:

- "Are you using ⟨term⟩ in the loose sense or the strict
  technical one?"

## State / time confusions

### Spec vs. implementation

The user explains what the code *should* do but the bug is what
it *actually* does.

- "Is that what the spec says or what the code does?"

### Type vs. value

The user says "the field is a string" and then the bug is the
string is empty. Or "it's a list" and the bug is the list is
empty.

- "What value does it have *right now*, not what type?"

### Static vs. dynamic

The user reasons about the source code, but the runtime is doing
something dynamic — late binding, polymorphism, hot-swap.

- "What gets resolved at runtime? Is the function you're looking
  at the function that actually runs?"

### Now vs. then

The user mixes up two points in time — the bug at request 1 and
the state at request 2. Probe:

- "Whose state are we talking about — the request that came in
  or the state when the response went out?"

## Identity confusions

### Two things vs. the same thing

User talks about "the user" but there are two — the one who
created the data and the one who's reading it now. Probe:

- "Is that the same user as the one in step 2?"

### Reference vs. copy

User assumes a value but the system handed them a pointer (or
vice versa). Probe:

- "Are you holding the thing or a reference to the thing?"

## How to deploy this manual

Don't recite the whole catalogue at the user. Listen for one
specific tell, then surface that one:

- "I think you might be conflating the spec with the
  implementation here — when you said 'it should X', is that
  the docs or the running code?"

Leave the rest of the catalogue alone unless another one fires.

## Output line

- "**Spotted a confusion:** ⟨specific pattern⟩."
- "**No confusion fired** — explanation is clean. Continue."
- "**Multiple patterns firing.** Pause and re-pin (see
  `working-memory`)."
