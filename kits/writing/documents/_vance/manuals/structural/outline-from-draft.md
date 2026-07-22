---
triggers: outline, reverse outlining, struktur extrahieren, does-line, was macht der absatz, buried thesis, vergrabene these, umstrukturieren, restructure, missing connective, reihenfolge, gliederung
summary: Reverse-outlining a finished draft with one 'what it does' line per paragraph to surface buried thesis, redundancy, gaps, and wrong order.
---

# Outline from Draft — extracting the implicit structure

The draft has structure already; it's just buried. The
outline-from-draft technique surfaces it so you can see
what the piece is actually saying versus what it should
be saying.

This is reverse-outlining: outline first happens in the
*editing* phase, not before drafting. The first-draft
outline (if any) was a guess; the post-draft outline is
discovery.

## The technique

For each paragraph, write **one line** describing what it
*does*. Not what it's about — what it *does*.

The difference matters:

- About: "this paragraph is about user authentication"
- Does: "this paragraph argues that JWT is a poor
  default"

The list of "does" lines IS the implicit outline.

### Format that works

```
P1: introduces the user-auth problem
P2: claims JWT is a poor default
P3: explains how JWT goes wrong (token leakage)
P4: explains how JWT goes wrong (alg confusion)
P5: example: the auth0 incident
P6: alternative — session cookies
P7: when JWT is right (mobile + offline)
P8: closing — pick by access pattern, not vibes
```

Now you can *see* the piece. Eight paragraphs; one thesis
in P2; two evidence points P3-P4; one example P5; one
counter P6; one nuance P7; conclusion P8. Looks
balanced.

If the list looks lumpy ("4 paragraphs of evidence, 1 of
counter"), that's a structural finding. Probably need
to balance.

## What to spot

### Repeated does-lines

If two paragraphs both "argue X is bad", you have
duplication. Either merge them (one paragraph, more
specific) or one of them is doing something else and
the does-line was wrong.

Re-do the does-line for clarity, then decide.

### Buried thesis

The piece is about JWT-vs-cookies, but the thesis ("JWT
is a poor default") is in P2 of 8. P1 introduces the
problem; that's fine. But sometimes the thesis is
buried in P5, surrounded by setup. Surface it earlier.

Common buried-thesis patterns:

- The thesis appears in the "why" or "however" sentence
  mid-paragraph somewhere.
- The thesis is the conclusion.
- The thesis isn't in the draft at all — implied across
  multiple paragraphs.

If the piece doesn't have a single thesis, decide whether
that's a feature (essay; meandering by design) or a bug
(intended argument-piece without an argument). Most
non-fiction wants a thesis; literary writing doesn't have
to.

### Setup without payoff

A paragraph that promises something the rest of the piece
doesn't deliver. "We'll see why X matters" — and X never
gets the explanation.

Either:

- Cut the setup (so you don't promise the un-delivered
  thing).
- Add the payoff (now there's a new section to draft —
  `drafting`).
- Recognise the setup *is* the payoff (sometimes
  introductions are the conclusion in disguise).

### Sections that don't earn their space

The "definitions" paragraph that lists six terms —
nobody reads it; the terms are clear in context.

The "background" section that's three paragraphs of
"X happened, then Y happened, then Z happened" —
chronicle without analysis.

The "objections" section that lists objections nobody
actually raises.

These are cut-candidates. See `cutting-down`.

### Wrong order

The does-list reads better in a different sequence. The
counter-point in P6 should be earlier, before the
evidence; the example in P5 should land at P3.

Move blocks. Don't polish words; just rearrange and
re-read the does-list.

### Missing connectives

Paragraph 4 talks about X; paragraph 5 talks about Y;
nothing in the draft connects them. The reader has to
infer the connection.

Either:

- Add a transition sentence (one-liner; bridges).
- Insert a new short paragraph that explains the
  connection.
- Recognise the connection is fictional and the order is
  arbitrary — see "wrong order".

## How granular

One line per paragraph is the default. For very long
paragraphs (8+ sentences), you can split: P4a, P4b. For
very short paragraphs (1-2 sentences), group: P5+P6 if
they cohere.

The point isn't accounting; it's seeing the shape.

## What to do with the outline

Three follow-ups:

### 1. Restructure

Move blocks based on what the does-list shows. Don't
edit lines; just move blocks. Reread the does-list after
each move; commit when the order reads right.

### 2. Cut

For each does-line, ask: does this earn its space? Will
the reader remember this paragraph in five minutes?

Mark cut candidates in the outline with `[CUT?]`. After
the pass, re-read with cuts applied; if it still reads
well, commit the cuts.

### 3. Add (sparingly)

If the outline has a gap ("we go from B to D, missing C"),
you might need to draft a paragraph C. This is a
controlled return to drafting — bounded, structurally
motivated.

Resist the urge to add more than the gap demands. Each
added paragraph extends the piece; you'll cut elsewhere
in the next pass.

## Anti-patterns

### Outlining before drafting

Different skill (`drafting/getting-started` mentions
this). Pre-draft outlines are guesses. Post-draft outlines
are observation.

### Refusing to cut paragraphs you "worked hard on"

The work is in the piece, not in the dropped paragraph.
A cut paragraph that informed your thinking served its
purpose; it doesn't need to ship.

Save cuts to a "cuts file" if it helps you let go.

### Mistaking the outline for the piece

The outline is a tool; the piece is what readers read. A
piece can have a perfect outline and read terribly (no
voice, dead sentences); a piece can have a slightly
uneven outline and read brilliantly (voice carries).
Don't optimise outline at the cost of voice.

### Outlining each pass

After the first restructure, the outline shifts. Don't
re-outline for every minor change; the outline-from-draft
is most valuable at the start of structural-edit and
maybe once more after a big restructure. After that:
read the prose.

## Output line

- "**Outline (n paragraphs):** ⟨list of does-lines⟩."
- "**Structural findings:** ⟨specific list — buried
  thesis, redundant section, missing connective⟩."
- "**Looks balanced** — proceed to ⟨paragraph-flow /
  cutting-down⟩."
- "**Outline ambiguous** — paragraph ⟨n⟩'s does-line
  unclear; clarify before continuing."
