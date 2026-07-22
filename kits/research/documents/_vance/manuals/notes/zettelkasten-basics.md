---
triggers: zettelkasten, luhmann, atomic notes, linking, permanent notes, literature notes, emergent structure, slip-box, verlinkung, notizsystem
summary: The core Zettelkasten principles — atomic notes in your own words, linking, and emergent structure — applied across any tool.
---

# Zettelkasten Basics — atomic notes, linking, emergent structure

Zettelkasten is German for "slip-box". It refers to the
note-taking system that Niklas Luhmann used to write
~70 books — but more than the historical practice, it
refers to a set of principles that work in many tools.

The core principles transfer; the medium is incidental
(paper cards, plain-text files, Obsidian, Roam, Logseq).

## The principles

### 1. Atomic notes

One note = one idea. Not one paragraph; not one source;
one *idea*.

If you find yourself writing "First, ... Second, ...
Finally, ..." in one note, that's three notes hiding as
one. Split.

The test: can you give the note a clear, narrow title
that captures its single idea? If no, it's not atomic.

### 2. Notes in your own words

Verbatim copies are highlights, not notes. The cognitive
work of restating in your own words is what creates
understanding and what makes the note retrievable later.

When you must use the source's exact phrasing (technical
terms; legally-precise language; especially-quotable
phrasing), mark it explicitly:

- "[VERBATIM] Smith: 'JWT design assumes...'"
- Otherwise the note is paraphrase, in your voice.

### 3. Notes link to other notes

The value isn't in any single note; it's in the graph.
Link from this note to others where the connection is
real:

- "This connects to {note about Y} because both involve..."
- "This contradicts {note about Z}; the difference is..."
- "This is a specific case of {general principle note}."

The graph develops over time. New notes link backwards
to old ones; old notes might be relinked when their
connections become clearer.

### 4. Source notes vs. permanent notes

A useful split:

- **Source notes (Literature notes):** what the source
  says. Captured in your own words, attributed to the
  source.
- **Permanent notes (Atomic notes):** what *you* think,
  often distilled from one or more source notes. The
  graph proper lives here.

Source notes are stepping stones; the permanent notes
are the work.

### 5. Emergent structure

Don't impose a hierarchy ahead of time. Folders /
categories you set up before knowing the material lock
you into a structure that doesn't fit.

Instead: notes link freely; structure emerges from the
linking patterns. Hubs and clusters appear organically
where the thinking goes deepest.

If you must categorise: tags (which can multi-classify)
beat folders (which force one-class).

## The flow

Reading or thinking → fleeting notes (rough capture, can
be deleted) → literature notes (clean source notes in
your own words) → permanent notes (atomic, linked,
your-thinking).

Not every fleeting note becomes a literature note. Not
every literature note becomes a permanent note. The
distillation is the point.

## What atomic looks like

### Bad — not atomic

```
Note: JWT vs. cookies

JWT is widely used but has problems including alg
confusion and long-lived tokens. Cookies have a worse
reputation but are simpler and HttpOnly+SameSite is
solid. Mobile apps generally need JWT-like for offline.
The right choice depends on access pattern.
```

Three or four ideas; can't link to "JWT alg confusion"
specifically because the note is about everything.

### Better — atomic

```
Note: JWT alg confusion vulnerability

JWT signed with RS256 can sometimes be re-signed with
HS256 using the public key as the secret. Servers that
accept either algorithm without verifying that the
header matches the expected algorithm are exploitable.
[Smith 2024]

Linked to: {JWT vulnerabilities (general)},
{Crypto agility as a footgun}.
```

One idea; titled for findability; linked to its parents
in the graph.

You'd have separate notes for:

- "Long-lived tokens problem"
- "Cookie HttpOnly+SameSite as defaults"
- "Mobile auth: JWT-like patterns"
- "JWT vs. cookies: choosing by access pattern"

Each linkable independently.

## Linking patterns

### Up-link (this is a specific case of)

This note → general principle note.

> "JWT alg confusion" → links up to "Crypto algorithm
> confusion vulnerabilities (general)".

Lets you traverse from specific to general.

### Down-link (general to specific)

General principle note → specific examples.

> "Crypto algorithm confusion vulnerabilities" → links
> down to "JWT alg confusion", "TLS downgrade attacks".

Lets you traverse from theoretical to concrete.

### Side-link (related)

Note → another note covering similar territory but not
hierarchically related.

> "JWT alg confusion" → "Pickle deserialisation in
> Python" — both are "default-trust mistakes".

Side-links are how interesting connections appear over
time.

### Contradiction-link

Note → another note that contradicts or complicates.

> "JWT alg confusion is exploited" → "JWT can be
> hardened to mitigate alg confusion."

Linked tension is more honest than smoothed-over
agreement.

### Citation-link

Note → source note that originated the claim.

> "JWT alg confusion" → "Source: Smith 2024".

Audit trail. If Smith retracts, you know which notes
to revisit.

## What NOT to link

- **Trivially similar.** "Both notes mention JWT" isn't
  a link; it's a tag.
- **Same topic, no actual interaction.** Two notes
  about JWT may not relate to each other meaningfully.
- **Out-of-context relevance.** Forced links because
  "they both seem important". The graph degrades.

A linked note that you can't explain *why* you linked is
noise. Cut it.

## Tools

The principles work in:

- **Plain text files in folders.** Most durable. Search
  by file name and grep.
- **Obsidian.** Local plain-text plus a wikilink-style
  linking and visualisation. Popular default.
- **Logseq.** Outline-first; works for some thinkers,
  not others.
- **Roam Research.** Pioneer of the modern wikilink-
  graph approach.
- **Apple Notes / Notion / etc.** Work for capture; less
  good for linking-as-first-class.
- **Index cards.** Original Luhmann form. Surprisingly
  effective.

The tool is incidental. The principles matter.

## When Zettelkasten is overkill

For:

- A weekend reading project.
- A book you'll cite once.
- Casual reading for entertainment.

Don't build the system. Take notes if you want; don't
worry about atomic-and-linked.

When Zettelkasten earns its keep:

- Long-running research interests.
- Writing projects that draw on years of reading.
- Subject-matter mastery in a field.

The system pays off over years; the cost of building it
is paid in months. Match the investment to the
expected horizon.

## Common Zettelkasten failures

### Fleeting-note hoarding

Capture without distillation. Thousands of fleeting
notes; few literature notes; almost no permanent notes.
The graph is unbuilt.

Counter: schedule distillation time. Fleeting notes are
expected to be deleted or promoted within a week.

### System-as-hobby

The tool gets infinite attention; the notes get little.
Configurations, plugins, themes, taxonomies. Beautiful
infrastructure; few notes.

Counter: pick a tool, accept its limits, move on. Spend
time on notes, not on the tool.

### Premature linking

Linking notes before they're worth linking. Tiny graph
of immature notes that gets re-organised every week.

Counter: write notes first; link as the connections
become clear. Sometimes that's later.

### Over-categorisation

Tags / folders / categories proliferating. By year 2,
you have 200 tags and don't remember what most mean.

Counter: keep tag set small (~20). Audit periodically;
merge or drop.

### Notes-without-source

Permanent notes that don't trace back to literature notes
or original thinking. Six months in, you can't tell where
a claim came from.

Counter: every claim-bearing permanent note has source-
links to its origin (literature note or labeled "own
thinking").

## Anti-patterns

### Treating notes as drafts

Notes are notes. Drafts are drafts. They're related but
different. Some notes feed drafts; not all.

### Aiming for completeness

You will not note everything. Aim for what you'll use.
Better 100 useful notes than 10000 unused ones.

### Reading-the-system instead of reading-the-source

Spending more time on note-taking than on the source.
Notes serve the thinking; if note-taking dominates the
reading, the balance is off.

### Big-bang import

Migrating years of notes into a new system in one go.
Wastes weeks; outcome usually disappointing.

Counter: import as you reuse. Old notes that still serve
get pulled into the new system organically; the rest
stays in archive.

## Output line

- "**Atomic note created** with links to ⟨specific⟩."
- "**Note not yet atomic** — split on ⟨specific axis⟩."
- "**Linking premature** — let connection appear over
  time."
- "**System over-engineered** — simpler tool with fewer
  features serves better."
