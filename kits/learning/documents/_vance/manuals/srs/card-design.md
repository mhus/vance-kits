---
triggers: karteikarten gestalten, card design, atomic cards, flashcard, cloze deletion, lückentext, eindeutiger cue, leech card, spaced repetition karten, anki cards, karten aufteilen
summary: Designing spaced-repetition cards that are atomic, precisely cued and honestly gradable, with patterns for definitions, procedures, contrasts and images.
---

# Card Design — atomic, cued, evaluable

Most SRS failure is card-design failure. The algorithm
works on cards as given; if the cards are bad, the
algorithm can't fix them.

This manual is about making cards that work — that
trigger retrieval cleanly, that you can grade honestly,
and that you'll still understand in a year.

## Atomic — one idea per card

Each card asks one question. The answer is one specific
thing.

### Bad — multi-question

Front: "What does TCP stand for and what port does HTTPS use?"

Back: "Transmission Control Protocol; port 443"

Two unrelated facts on one card. If you remember TCP
but blank on 443, you fail the card — but you knew
half. The algorithm gets bad signal.

### Better — atomic

Card 1:
- Front: "TCP stands for...?"
- Back: "Transmission Control Protocol"

Card 2:
- Front: "HTTPS uses port...?"
- Back: "443"

Each card has clean grading.

### When merging is OK

If two facts genuinely co-occur and one is the natural
cue for the other, one card can hold both:

- Front: "Capital of France?"
- Back: "Paris"

vs. trying to split into "Country whose capital is
Paris?" / "Capital of France?". The split adds nothing.

But:

- Front: "Capital of France and currency?"
- Back: "Paris; Euro"

→ Split. The currency isn't the natural cue companion
of the capital.

## Cued — front is a precise prompt

The front should evoke exactly one answer. If multiple
answers fit, the card is ambiguous.

### Bad — ambiguous

Front: "Database concurrency"

Back: "Read-committed isolation prevents dirty reads"

The front is a topic, not a question. Many possible
answers ("ACID", "MVCC", "lock-based", "optimistic
locking"). When you see the back, you might think
"that's true, but I was thinking of MVCC".

### Better — specific

Front: "What does read-committed isolation prevent?"

Back: "Dirty reads"

Or:

Front: "Database isolation level that prevents only
dirty reads?"

Back: "Read-committed"

Now the cue points to one answer.

### Two-sided cards

For mutual associations:

- Card A: "Capital of France?" → "Paris"
- Card B: "Country whose capital is Paris?" → "France"

Most SRS tools have automatic two-sided generation. Use
when both directions matter.

Don't always — sometimes one direction is enough. "What
does HTTP stand for?" → "Hypertext Transfer Protocol";
the reverse "What does HTTP stand for?" → "HTTP" is
trivial.

## Cloze deletions

A sentence with one part hidden, to be filled in.

> "The {{c1::Krebs cycle}} produces ATP in the
> mitochondria."

Useful for:

- Embedding fact in context.
- Multi-fact sentences (each fact a separate cloze).
- Vocabulary in usage.

Watch:

- The deletion has to be uniquely determinable from
  context. Not "{{c1::a thing}} produces ATP" — too
  vague.
- Don't over-cloze. Hiding most of the sentence makes
  the card incoherent.

## No-cue answers

The back should give the precise answer without extra.
Long backs hide what was the actual answer.

### Bad

Back: "TCP stands for Transmission Control Protocol.
It's part of the OSI model's transport layer. Originally
developed in 1974, it's a connection-oriented protocol
that handles flow control and reliability."

When you grade, what was the cue actually for? You'll
overrate yourself because most of that is "yes I knew
that".

### Better

Back: "Transmission Control Protocol"

Maybe a one-line context if it helps disambiguate:

Back: "Transmission Control Protocol (transport layer)"

But the *answer* is the title. Extras are footnotes,
not the test.

## Image cards

For visual material — diagrams, paintings, formulas
where layout matters.

Patterns:

- **Identify**: image on front, name on back.
- **Locate**: image with one part highlighted; name the
  highlighted part.
- **Sequence**: image of a process; describe what
  happens.

For technical learning, image cards reduce the
abstraction tax. A diagram-with-blank-labels card lets
you actively retrieve part-by-part.

## Sentence-level vs. fact-level

Different formats for different goals:

### Fact card

Front: "Boiling point of water at sea level?"

Back: "100°C / 212°F"

Pure factual recall.

### Sentence-cloze

Front: "Water boils at {{c1::100°C / 212°F}} at sea
level."

Back: 100°C / 212°F (in context)

The context aids recall — sometimes you remember the
sentence and the missing word follows.

### Concept-explanation

Front: "What does *eventually consistent* mean?"

Back: "After all writes stop, all replicas eventually
return the same value. Doesn't guarantee any particular
read returns the latest write."

The back is longer because the concept needs phrases.
Watch — long backs make grading harder. Test by closing
the back and checking if you got the *substance*.

## Cards for procedures

Procedures (sequences of steps) are tricky in SRS.
Several patterns:

### Single-step retrieval

Front: "First step of TCP three-way handshake?"

Back: "Client sends SYN"

Plus separate cards for steps 2 and 3.

### Sequence cloze

Front: "TCP three-way handshake: client sends
{{c1::SYN}}; server responds with {{c2::SYN-ACK}};
client sends {{c3::ACK}}"

Back: each cloze unhides at appropriate review.

### Whole-sequence card

Front: "Steps of TCP three-way handshake?"

Back: "1. Client → SYN. 2. Server → SYN-ACK. 3. Client
→ ACK."

The all-or-nothing test: did you remember all three?
Useful when you genuinely need the full sequence; brutal
when one step blanks.

For longer procedures (5+ steps), generally split. The
all-or-nothing 7-step card is a leech waiting to
happen.

## Pattern: definition card

For learning vocabulary / technical terms.

Front: "Eventual consistency"

Back: "After all writes stop, all replicas eventually
return the same value. Doesn't guarantee any particular
read returns the latest write."

Plus the reverse:

Front: "What property describes: replicas converge after
writes stop, but no guarantee on individual reads?"

Back: "Eventual consistency"

The reverse-direction card prevents you from
recognising the term but not retrieving it.

## Pattern: example card

Linking concept to instance.

Front: "Example of a system using eventual consistency?"

Back: "DNS; many distributed databases (Cassandra,
DynamoDB)"

Useful for grounding abstract concepts. Pairs well with
definition cards.

## Pattern: contrast card

For pairs of similar concepts.

Front: "Difference between strong and eventual
consistency?"

Back: "Strong: reads always return latest write.
Eventual: reads may return stale data; consistency
guaranteed only after writes stop."

Useful for related concepts that get confused. The
contrast is the discriminating feature.

## Pattern: motivation card

Why does X exist / why does X matter?

Front: "Why do we need eventual consistency at all?"

Back: "Strong consistency requires synchronous
coordination, which is slow and unavailable during
network partitions. Eventual consistency trades
freshness for availability and latency."

Cards that capture *why* not just *what*. Helps the
material stick because there's a hook for understanding.

## Specific anti-patterns

### Front-as-back-with-blanks

Front: "TCP stands for ___ ___ ___"

Back: "Transmission Control Protocol"

Looks valid; isn't a real cue. The blanks contain the
answer; you're recognising the pattern, not retrieving.

### Question with the answer in it

Front: "What is the capital of France called?"

Back: "Paris"

The "called" implies you'll be told the name. The
phrasing leaks.

Compare:

Front: "Capital of France?"

Back: "Paris"

The question is genuinely a cue, not a hand-back.

### Vague question

Front: "Tell me about Paris."

Back: <whole essay>

Not a recall card. Either narrow to a specific fact, or
this isn't an SRS card.

### Card based on memorising the source's wording

Front: "What does Knuth say about premature
optimization?"

Back: "Premature optimization is the root of all evil"

OK — but you're memorising the wording, not the
concept. Add a separate card for the concept:

Front: "Why is optimizing before measuring problematic?"

Back: "Optimizations may target paths that aren't
bottlenecks; the optimization adds complexity for no
benefit."

### Long-form 'understanding' card

Front: "Explain quantum mechanics"

Back: <three pages>

Not retrievable. Concept-level material doesn't fit
SRS. Use Feynman method instead.

## Maintenance — the leech card

A leech is a card you keep failing. Anki and others
flag leeches automatically.

When you spot one:

- **Is the card well-designed?** If not, fix it.
- **Do you understand the underlying concept?** If
  not, learn first; the card can wait.
- **Is the concept worth memorising?** Sometimes the
  card was a mistake; suspend without prejudice.

Don't grind on leeches. The algorithm punishes you with
shorter intervals; the card eats time without
producing learning.

## Card lifecycle

- **Create:** fresh; first reviews close together.
- **Mature:** intervals stretched; reviews infrequent.
- **Leech:** repeated failures; needs intervention.
- **Burn:** card has done its job; you know this
  permanently. Keep but minimal review, or remove.

Most cards don't need lifelong maintenance. Once
something is solidly known, the card can rest.

## Output line

- "**Card designed:** atomic, cued, evaluable."
- "**Card is multi-question** — split into ⟨n⟩ cards."
- "**Cue too vague** — sharpen to ⟨specific⟩."
- "**Card is a leech** — fix design or suspend."
- "**Concept-card; SRS isn't right tool** — use
  Feynman or notes."
