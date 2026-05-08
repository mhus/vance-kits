# Progressive Summarisation — layered distillation

Progressive Summarisation (Tiago Forte) is a technique
for making notes useful at multiple levels of detail
without re-reading the source. The same note carries the
full original (capture), highlighted key passages,
deeper-highlighted critical phrases, and a final summary
in your words.

The trick: the layers compound rather than replace each
other. You can read at any layer depending on how much
detail you need.

## The four layers

### Layer 1: Capture

Verbatim or near-verbatim from the source. Could be a
clipped article, transcribed quote, photographed page,
or rough notes during a meeting.

This layer is raw. It shouldn't be deleted just because
you've moved to layer 2 — you might need a phrase from
the original later, or the context surrounding what you
highlighted.

### Layer 2: Bold (light pass)

Read the captured material; bold the passages that seem
important. Light effort. Most of the captured material
is *not* bolded.

If you bold everything, you've highlighted nothing. The
target: 10-30% of the captured text gets bolded.

### Layer 3: Highlight (deeper pass)

Read just the bolded passages; highlight the most
critical phrases or sentences within those. Even
narrower target: 10-30% of the bolded.

The highlighted text is the *core* of the note's
contribution to your thinking.

### Layer 4: Summary (your words)

Write a 1-3 sentence summary of the note in your own
words. This is what you'd recall about the note 6
months from now.

This top layer is what makes the note useful for
thinking; the lower layers support and back it up.

## When to do each layer

You don't progress through layers immediately. The
right time:

- **Layer 1:** when you encounter the source.
- **Layer 2:** within a few days of capture, while
  context is fresh.
- **Layer 3:** when you revisit the note (often weeks
  later, in service of a project).
- **Layer 4:** when you're ready to *use* the note —
  often as part of a synthesis or writing project.

The layers aren't a checklist for every note. Many
notes never go past Layer 1 (you captured for later;
later didn't need it). Many stop at Layer 2 (lightly
processed; good enough). The layers that pay off most
are 3 and 4 — those are where understanding consolidates.

## What to bold (layer 2)

- **Definitions.** Key terms defined.
- **Specific data.** Numbers, dates, results.
- **Sharp claims.** "X causes Y."
- **Counterintuitive findings.**
- **Quotable phrases.** Things you might cite later.
- **Hooks for memory.** Vivid examples, images.

Don't bold:

- Setup / context paragraphs.
- Background narrative.
- Repetitive emphasis (the source restated; bold once).
- Filler claims.

## What to highlight (layer 3)

From within bolded material, the *core*. The one
sentence that captures the contribution. The single
number that matters. The phrase you'd put on a slide.

The highlighted material should be readable as a
condensed essence of the note. If you highlighted only
the highlights, would you understand the contribution?

## How to summarise (layer 4)

The summary is in your voice and is *not* a quote.
Three patterns work:

### Claim summary

What does this note tell you about the world?

> "JWT alg-confusion is exploitable when servers accept
> multiple algorithms without validating the header
> matches the expected one."

### Implication summary

What should you do / believe differently because of
this note?

> "When choosing JWT, lock the algorithm in code, not
> in config. Trust no header for algorithm choice."

### Synthesis summary

What does this note add to other notes you have?

> "This is a specific case of crypto-agility-as-footgun;
> linked to TLS downgrade and to default-trust patterns."

Pick what fits the note. Don't write all three; pick the
most useful for the way you'll use the note.

## When NOT to progressively summarise

### One-pass material

A book read for entertainment; an article you'll cite
once. The full system is overkill. Capture if you must;
skip the layers.

### Procedural / reference material

A glossary entry; a function definition; a phone number.
There's nothing to highlight progressively — it's all
information density.

### Material you'll act on within hours

A memo for tomorrow's meeting. The layered system
serves long-term retrieval, not immediate use.

## Tools

The technique is tool-agnostic:

- **Markdown:** `**bold**` and a custom highlight
  syntax (e.g. `==highlight==`).
- **Obsidian / similar:** native bold + highlight.
- **Roam:** bold + a tagged "important" highlight.
- **Notion / Apple Notes:** bold + colour highlight.
- **Paper:** different colours for bold vs. highlight,
  or underline + highlight.
- **PDF readers:** annotation tools (most can be
  exported as text).

The tool's only requirement: layers must be
distinguishable visually so you can scan-read at a
chosen layer.

## How layers help retrieval

Six months later, you need this material. You can:

- **Read the summary** (5 seconds) and remember the gist.
- **Read the highlights** (30 seconds) for the core.
- **Read the bolded passages** (2 minutes) for substantive
  detail.
- **Read the full capture** (10 minutes) for everything.

A linear note forces you to read it all or none. A
progressively-summarised note serves the right level for
the moment.

## Common progressive-summarisation failures

### Highlighting everything

Layer 2 covers 80% of the text; Layer 3 covers 60% of
Layer 2. The layering hasn't actually narrowed
attention. Result: re-reading is no easier than the
original.

Counter: discipline the percentage targets. ~20% per
layer.

### Skipping the summary

Layer 4 is the highest-value layer; it's also the
hardest. Many users do Layers 1-3 thoroughly and skip 4.
Result: the note is ready to be summarised but never is.

Counter: summarise when you next *use* the note. Don't
batch-summarise at capture-time; summarise at recall-
time.

### Layering too eagerly

Bold + highlight at capture. The benefit of progressive
layers is that *time* and *new context* refine what's
important. Doing all layers at once collapses the
benefit.

Counter: layer in passes, days/weeks apart.

### Summarising without source link

The summary forgets where the note came from; six
months later you can't audit. Always include
attribution to the underlying source(s).

## Anti-patterns

### Highlight-as-action

Highlighting feels like work; it isn't, by itself.
Highlighting without ever distilling further or using
the note is busywork.

### Format proliferation

Inventing custom syntax for "really important", "kind of
important", "controversial", "questionable", "important
but I disagree". Five-tier highlight schemes don't
survive contact with usage.

Counter: stick to bold + one highlight level + summary.
Three layers is enough.

### "Save for later" hoarding

Capture-and-shelf. Hundreds of unprocessed captures.
The system fills with raw material that never refines.

Counter: process within a week of capture, even if just
Layer 2. Material older than a month without processing
goes to "to delete" — be honest about whether it's
coming back.

## Output line

- "**Layered to L⟨n⟩** — ready to use at ⟨specific
  level⟩."
- "**Capture only** — Layer 2 in next pass."
- "**Over-highlighted** — re-target ⟨specific
  percentage⟩ per layer."
- "**Summary written, links to ⟨source⟩** — note is
  graph-ready."
