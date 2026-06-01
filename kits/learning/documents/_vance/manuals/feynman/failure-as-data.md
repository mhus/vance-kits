# Failure as Data — what to do when explanation breaks

The explanation stopped. You hit a wall. You don't know
what comes next. Default reaction: frustration. Better
reaction: take it as the most useful diagnostic data
the technique produces.

A break in the explanation is *exactly* the gap the
Feynman test was designed to find. Treat it as
evidence; analyse what the gap is; act accordingly.

## Diagnose the type of break

Different breaks need different repairs. The break-types:

### Definition gap

You used a term; you don't know what it means.

Example: explaining gradient descent, you say "we
update the weights using the gradient" — and pause,
because you're not sure what "gradient" precisely means
in this context.

Repair: look up the precise definition. Often a single
clear definition is all you need; sometimes a worked
example.

### Mechanism gap

You know what something does; you don't know how.

Example: "DNS resolves names to IPs" — but how does it
*do* that? You can't explain the lookup chain.

Repair: walk through the mechanism step-by-step. A
diagram or sequence diagram often helps. Look for an
authoritative description; replicate it in your own
words.

### Causal gap

You know step X happens after step Y; you don't know
why.

Example: in the TCP handshake, the SYN-ACK comes after
the SYN — but why is the order this way? What goes
wrong with the alternative?

Repair: find a source that motivates the sequence.
Often the sequence makes sense once you understand
*what would break* with a different ordering.

### Intuition gap

You can recite the formal definition; you don't have
intuition for what it means.

Example: you know the formula for entropy; you can't
viscerally explain why it captures "uncertainty".

Repair: look for visualisations, analogies, simple
examples. Build the intuition independently of the
formalism; then connect.

### "Why this and not that" gap

You can explain the chosen approach; you can't compare
to alternatives.

Example: you can explain how RSA works; you can't
explain why RSA was preferred over Diffie-Hellman in
some context.

Repair: look at decision-points / comparisons. Often
the textbook treatment doesn't cover this; you may need
to read history / discussion / advocacy.

### Hand-wave gap

You glossed over a step; you don't actually know what
happens there.

Example: "the optimizer adjusts the weights" — what
does the optimizer actually do?

Repair: replace the hand-wave with the actual content.
Sometimes this is its own sub-explanation; pause the
main explanation, fill the sub-section, then resume.

### Prerequisite gap

You're trying to explain X but you don't know Y, which
is needed for X.

Example: explaining backprop without understanding the
chain rule.

Repair: learn the prerequisite. Don't bull through.
The Feynman test failed *because* the prerequisite is
missing; address that, not the surface concept.

### Multiple-explanation gap

You've encountered two contradictory explanations; you
don't know which is right; you can't explain because
you're uncertain about the underlying reality.

Example: two textbooks say slightly different things
about how a thing works.

Repair: find a third, authoritative source. Often the
disagreement is shallower than it appears (different
levels of abstraction; different conventions); sometimes
it's real and the field has open questions.

## Diagnose first; repair after

The temptation when you hit a break: immediately go
look something up. Often you fix the wrong gap because
you didn't diagnose properly.

Pause. Ask:

- What kind of gap is this?
- Specifically, what would close it?

Then look it up. The targeted lookup is faster and more
useful than scanning broad material.

## Tracking gaps

For longer learning projects, keep a list:

```
GAPS in TLS handshake explanation:
- [DEFINITION] What's a "cipher suite" exactly?
- [MECHANISM] How does the certificate verification
  step happen — sequence?
- [CAUSAL] Why does the client send the random first?
- [INTUITION] Why does forward secrecy matter
  practically?
- [HAND-WAVE] "Then they negotiate keys" — exactly what
  goes back and forth?
```

Each gap is specific; each is actionable.

After repair, the gap closes:

```
- [DEFINITION] cipher suite — combination of key-
  exchange algorithm, signature algorithm, bulk cipher,
  MAC algorithm. ✓ closed.
```

The list is the artefact of the technique.

## When gaps cluster

Sometimes you have many gaps in one area. Tells:

- You can't even formulate the gaps coherently.
- Every gap leads to another gap.
- You realise you don't have the framework, not just
  the details.

This is when targeted-fill doesn't work; you need
broader study. Honest signal: "I tried to apply Feynman;
the gaps are too foundational for this technique."

Action:

- Step back to a textbook / course / overview.
- Build the framework first.
- Return to Feynman after.

The technique is most valuable when you have *most* of
the understanding and want to find the specific holes.
For genuinely-new fields, conventional learning has to
come first.

## When gaps are small

The other extreme: the explanation flows; you find
small gaps; the gaps are easily filled.

This is success. The technique caught the misalignments
before they mattered; understanding is now solid.

Note: don't over-iterate. If three rounds of Feynman all
flow with only minor surface tweaks, you've reached the
test's limit for this concept at this level of depth.
Move on.

## Specific failure modes

### "I know it but can't explain"

You feel you understand; you can't articulate. Two
possibilities:

- **You don't actually understand.** The "knowing" was
  recognition / familiarity, not understanding.
  Articulating fails because there's no underlying
  model.
- **You have tacit understanding.** You can apply but
  not articulate. Real but limits transferability.
  Effort to articulate is itself learning.

In both cases, the Feynman test surfaces the
articulation gap. Worth pushing through.

### "I get it more deeply than I can explain"

You've reached a frontier where the *language* is
what's missing, not the concept. Common in expert
territory.

Genuine; rare. If you suspect you're in this territory,
test by writing the explanation slowly. Often the
"too-deep-to-explain" feeling dissipates with the
discipline of writing.

### "I keep getting the explanation wrong"

You explain; you check; you got it wrong. You re-learn;
you re-explain; you got something else wrong.

Pattern: your underlying mental model has multiple
errors. Each correction reveals the next.

Repair: get a comprehensive overview; build the model
properly; then re-Feynman.

### "I can explain but I don't believe it"

You produce the explanation; it doesn't feel right; you
suspect what you're saying isn't accurate.

Possibilities:

- **Doubt is genuine; explanation is wrong.** Find a
  better source.
- **Doubt is imposter-syndrome; explanation is fine.**
  Verify with an authoritative source; the doubt
  resolves.

Test: would another expert agree with your
explanation? If you can check, do.

## Anti-patterns

### Skipping the diagnosis

Hit gap; immediately look it up; don't reflect on what
kind of gap. Wastes the diagnostic value.

### Fixing the wrong gap

You hit a definition gap; you read the entire mechanism
again. The mechanism wasn't broken; the definition was.

Counter: target the fix to the gap type.

### Faking the fix

You looked something up; you don't fully understand;
you re-explain glossing over with new wording. The gap
is just relabelled.

Counter: re-Feynman the section that was repaired. Does
it now flow without mid-sentence stumbling?

### Accumulating gaps without closing

You generate a list of 50 gaps; you haven't filled any.
The list becomes overwhelming.

Counter: filter to most-important; close them; iterate.
Don't try to generate exhaustive list before closing
any.

### Treating gaps as failures

Each gap is a *finding*. The technique succeeded by
producing the gap. Frame as data; the affect should be
satisfaction (tool worked) not frustration (I'm bad at
this).

## Output line

- "**Gap diagnosed:** ⟨specific type⟩. **Repair plan:**
  ⟨specific⟩."
- "**Multiple gaps clustered** — broader learning
  before iterating."
- "**Gap closed; explanation now flows past it** —
  iterate again."
- "**Gap can't be closed at this level** — accept
  prerequisite is needed."
