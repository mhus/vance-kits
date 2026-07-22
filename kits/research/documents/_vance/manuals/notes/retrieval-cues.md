---
triggers: retrieval cues, wiederauffindbarkeit, note titles, tags, keywords, findability, notizen finden, suchbegriffe, schlagworte, verlinkung
summary: Designing titles, tags, keywords, and links at capture-time so notes stay findable months later.
---

# Retrieval Cues — making notes findable later

A note you can't find isn't a note. The capture-retention
ratio in note-taking is often 100:1 — for every hundred
notes captured, one is found and reused.

The fix isn't more capture. It's better cues — words,
tags, structures that future-you will plausibly use to
search.

This manual is about designing cues at capture-time.

## The retrieval test

Imagine yourself 6 months from now, working on a
project. You vaguely remember reading something about
the topic. What words would you type into search?

If those words don't appear in the note (anywhere — title,
body, tags, links), the note is invisible. Add them.

This test, applied at note-creation, doubles or triples
the rediscovery rate.

## Cue types

### Title

The single highest-leverage cue. If a note's title is
findable on its own, retrieval often happens by browsing
titles alone.

Title rules:

- **Specific.** "JWT alg confusion vulnerability" beats
  "JWT issues".
- **Self-contained.** Reads sensibly without context.
- **Searchable.** Contains words you'd plausibly search
  for.
- **Ideally a noun phrase or one-line claim.**

Bad titles: "Notes from Smith", "Page 47", "Highlights",
"Misc thoughts". Generic; can't be searched for.

Better titles: "Smith on JWT — alg confusion exploit
chain", "Long-lived tokens enable replay attacks",
"Cookies + HttpOnly + SameSite as 2025 default".

### Body keywords

Beyond the title, the body should contain the words
future-you might search. If the title is "Alg confusion",
the body should also have "JWT", "RS256", "HS256",
"signature verification" — the related terms you might
search instead.

Don't stuff for SEO; do think about plural search paths.
"How might I express this differently when I'm searching
in 6 months?" — and add those expressions naturally where
they fit.

### Tags

Tags multi-classify. A note can have several; folders
typically can't.

Good tags:

- **Topic-based.** `#auth`, `#crypto`, `#security`.
- **Type-based.** `#vulnerability`, `#pattern`,
  `#anti-pattern`.
- **Project-based** (if the note serves a specific
  project). `#project-X`.

Bad tags:

- **Importance-based.** `#important`, `#critical`. You
  won't agree with this in 6 months.
- **Time-based.** `#2026`, `#january`. Date is metadata,
  not search criterion.
- **Mood-based.** `#interesting`, `#curious`. Reflects
  current you, not future search intent.

Keep the tag set small (~20 tags). When it grows past
30, audit; merge similar ones.

### Links to other notes

Linking is itself a retrieval cue. If you can't search
your way to a note, you might walk your way — from a
note you remember to a note linked from it.

Strong note graphs have several entry points to
important nodes; weak graphs have orphans.

When creating a note, ask: what existing note is most
related? Link from there.

### Aliases / synonyms

Some notes serve multiple search vocabularies. The same
concept might be searched as "rate limiting", "throttling",
"token bucket", "leaky bucket".

Tools that support aliases let you list them; tools that
don't, list them in the note body.

## Building search-friendly titles

The "future-search test":

> "If 6 months from now I were looking for this, what
> would I type? Would the title contain those words?"

Worked example:

You read about how Auth0 had an outage caused by an
expired certificate. You're tempted to title the note:
"Auth0 outage 2024".

Search test: in 6 months, are you searching "Auth0
outage"? Maybe — if you remember it specifically. More
likely, you're searching "expired certificate caused
outage", "auth provider outage", "certificate expiry
incident". The original title is too narrow for those
searches.

Better title: "Auth0 outage from expired cert — vendor-
side incident pattern".

Now searches for "expired cert", "outage", "vendor
incident", "Auth0" all hit.

## Note structure for retrieval

### Visible context at the top

The opening lines of a note should say what it's *about*
in clear language. Skipping straight to the highlight
makes the note unsearchable when you remember the topic
but not the highlight.

### Source attribution clearly visible

"Source: Smith 2024 (https://...)" near the top. Lets
you find by source if you remember the source but not
the claim.

### Searchable language inside

Avoid jargon-only notes. If the source uses field-
specific terms, also include the broader-domain terms.
"He uses 'algorithmic agility' (general crypto term:
flexibility in algorithm choice)..." — now both phrases
are searchable.

### Cross-references inline

When the note relates to other notes, mention them by
title (not just link). Search for the topic name finds
this note even if the search comes via the related
topic.

## Search strategies

### Keyword search

The default. Works if titles + body have the right
words.

### Fuzzy / partial match

Many tools offer fuzzy search. Good for misremembered
words. "Alg confus" finds "alg confusion".

### Tag filter

Tag-based browsing. Useful when you remember the
*category* but not the specific note.

### Linked-walk

Start from a note you remember; walk links. Sometimes
faster than search if the graph is well-built.

### Date browse

For recent notes. "What was I reading in March?". Less
useful for older notes (you don't remember the month).

### Backlink check

What links to this note? Sometimes you find a note via
its citers.

## Tag conventions that work

### Single hierarchy

Top-level tags for stable categories: `#auth`, `#crypto`,
`#perf`, `#design`, `#process`.

### Sub-tags via slash

`#auth/jwt`, `#auth/oauth`, `#auth/session-cookie`.
Lets you filter at any level: tag-search "auth" finds
all sub-tags.

Some tools (Obsidian, Logseq) support nested tags
natively. Others (Notion, plain markdown) get you most
of the way with a slash convention.

### Type tags

Orthogonal to topic tags. `#pattern`, `#anti-pattern`,
`#vulnerability`, `#tool`, `#article`, `#paper`,
`#book`.

### State tags (used sparingly)

`#unsorted`, `#to-process`, `#draft`, `#archived`.
Useful for triage; don't accumulate. State tags should
be transitional.

### Avoid

- Numeric ratings (`#good`, `#bad`).
- Mood (`#fascinating`).
- Generic (`#misc`).
- One-off project tags that linger past project end.

## Entry friction

There's a tension: more cues per note = more findable;
also more time per note. If capturing takes too long,
you stop capturing.

Balance:

- **Title:** always thoughtful (highest leverage; ~10
  seconds extra).
- **Source:** always present (10 seconds).
- **2-3 tags:** present where natural (10 seconds).
- **Links:** added when obvious; deferred otherwise.
- **Aliases:** only for notes that actually have
  multiple vocabularies (rare).

A 30-second per-note "retrieval pass" doubles findability
without adding much overhead.

## Anti-patterns

### "I'll remember"

Capture without cues; trust memory. By month 6, memory
is gone; the note is invisible.

### Tag of last resort

`#misc` / `#other` / `#general`. Tags should constrain;
this kind doesn't.

### Date-as-title

"2026-05-09 reading notes". Useful if you remember the
date; rarely useful for topic search.

### Title as tease

"An interesting JWT thing". Searcher has to open the
note to see what it is. Use the substance.

### Cue paralysis

Spending 5 minutes on each note's tags. Diminishing
returns; capture stops.

### Tags as folders

Treating tags like folders (only one tag per note).
Loses the cross-classification value.

## Periodic retrieval audit

Once a quarter or so:

1. Pick a topic you've been thinking about.
2. Search your notes as if you didn't know they
   existed.
3. Notice which relevant notes you fail to find.
4. Add cues to those notes.

This audit fixes the gaps that pure-prospective cue-
adding misses (you don't know what you'll search for
until you actually do).

## Output line

- "**Cues added** — title, ⟨n⟩ tags, ⟨n⟩ links."
- "**Title not searchable** — revise to ⟨specific⟩."
- "**Tag set drifting** — audit; current count: ⟨n⟩."
- "**Cue-adequate** — note is findable."
