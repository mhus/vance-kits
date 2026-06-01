# Trigger Design — fire when relevant, sleep otherwise

Triggers are how a skill activates without the user explicitly
asking. Get them right and the skill is invisible until needed.
Get them wrong and the skill activates on the wrong
conversations (over-activation) or never on the right ones
(under-activation).

## Two trigger types

### KEYWORDS

```yaml
triggers:
  - type: KEYWORDS
    keywords:
      - decide
      - decision
      - sollte
      - alternatives
```

- **Match:** the trigger fires when **≥ 50%** of the listed
  keywords appear in the user's message (substring match,
  case-insensitive).
- **Tokenisation:** words ≥ 2 characters; lowercase;
  punctuation collapsed to whitespace.
- **50% threshold:** with 4 keywords, 2 must appear. With
  6 keywords, 3 must appear. With 1 keyword, that 1 must
  appear (rounded up).

### PATTERN

```yaml
triggers:
  - type: PATTERN
    pattern: "(?i)\\b(was|which)\\b.*\\b(better|besser)\\b"
```

- **Match:** Java regex `find()` on the lowercased input.
  `(?i)` flag also applies; the input is already
  lowercased so `(?i)` is harmless / idiomatic.
- **Use when:** the trigger needs structure (word A near
  word B), not just word presence.
- **Compile cost:** patterns are cached per skill; safe to
  use complex regex without per-turn cost.

## Combining triggers

A skill can have multiple triggers; they're **OR-combined**.
Any one matching fires the skill.

```yaml
triggers:
  - type: KEYWORDS
    keywords: [decide, sollte]
  - type: PATTERN
    pattern: "\\bwhich\\b.*\\bbetter\\b"
```

Either form fires. Mixing is normal; some intents are
better as keywords, others need pattern.

## Designing triggers — the process

### 1. Imagine the user's literal phrasing

Before listing keywords, write down 5-10 user messages that
*should* fire this skill, in the language(s) the users speak.

Example for `decision-frame`:

- "Sollte ich Postgres oder MySQL nehmen?"
- "Should I refactor or rewrite?"
- "Welche Variante ist besser?"
- "I'm trying to decide between A and B."
- "Help me choose a framework."

### 2. Extract the common words

Look at the imagined messages — what words are *consistent*
indicators of the intent?

- "decide / decision / sollte / entscheiden / alternatives"
  → KEYWORDS
- "which/welche … better/besser" → PATTERN

### 3. Imagine messages that should NOT fire

Equally important. Write down 5-10 messages where the
skill *should not* activate — false-positive cases.

For `decision-frame`:

- "I decided to refactor the module yesterday."   ← past
  decision; not asking for help.
- "The decision tree depth is 5."                 ← data
  structure, not personal decision.
- "Let me decide later."                          ← deferral.

If your draft triggers fire on these, tighten.

### 4. Adjust for the threshold

KEYWORDS at 50% means a few keywords need ≥ 1 hit. Many
keywords need more hits to fire. Consider:

- 4 keywords, 50% → need 2 hits → relatively narrow.
- 8 keywords, 50% → need 4 hits → very narrow.
- 1 keyword, 50% → need 1 hit → broadest possible (any
  occurrence).

If you want ANY of N keywords to fire the trigger
individually, list them as separate KEYWORDS triggers (one
keyword each). Each is OR-combined.

### 5. Test on real corpus

Best testing: a transcript of past sessions. Grep for
keywords; check whether hits would have benefitted from
the skill. If not, tighten.

If no real corpus: imagine more test cases. Imagined cases
are weaker, but better than no testing.

## Multi-language triggers

Vance is German + English by default. Triggers should
include both:

```yaml
keywords:
  - decide
  - decision
  - decided        # past, exclude carefully
  - entscheiden
  - entscheidung
  - sollte
```

But "decided" might fire on past-tense messages where the
skill shouldn't engage. PATTERN with negative lookahead
can help, but often it's simpler to drop the past form.

## Common mistakes

### Trigger that fires on the topic, not the situation

```yaml
keywords: [security, vulnerability]
```

Fires whenever the user mentions security. Probably too
broad: most security mentions don't want a security-review
skill activated. Tighten: `security review`, `audit`,
`hardening`.

### Single-word trigger

```yaml
keywords: [test]
```

"test" appears in casual conversation often. Either tighten
("test schreiben", "TDD", "unit test") or use a PATTERN
that requires context.

### Trigger that only matches one user's phrasing

```yaml
keywords: ["help me think about"]
```

The user happens to say this; nobody else does. Generalise
or accept that the skill fires rarely.

### Pattern that's too forgiving

```yaml
pattern: "decide"
```

Same as a 1-keyword KEYWORDS trigger — no benefit of
PATTERN's structural advantage. Use PATTERN when you need
relationships between words.

### Pattern that's too strict

```yaml
pattern: "^should I use Postgres or MySQL\\?$"
```

Matches one exact sentence. Use a PATTERN like
`(?i)\\bshould\\b.*\\bor\\b` for "should X or Y".

### Mixing language without testing

```yaml
keywords: [should, sollte, mucho, vraiment]
```

Adding French/Spanish keywords without users speaking
those languages. Trigger fires on irrelevant code-mixing
or never. Stick to languages the user actually uses.

## Special cases

### Trigger for skills that should rarely fire

If the skill is for a rare situation (security incident,
critical bug), tight triggers are correct. False-positive
on these is more disruptive than missing.

### Skill that activates on every turn

If you want the skill always-on, don't use a trigger —
use `defaultActiveSkills: [<name>]` in the recipe.
Triggers are for situational activation; default-active
is for ambient behaviour.

### Skill that should only activate manually

Leave `triggers` empty. Skill activates only via
`/skill <name>` or `process.skill_activate(...)`.

```yaml
triggers: []   # or omit the field entirely
```

## How to test a trigger

### Mental walkthrough

For each (imagined / real) user message, simulate:

1. Lowercase the message.
2. Tokenise (≥ 2-char words).
3. For KEYWORDS: count matching keywords. ≥ 50% → fires.
4. For PATTERN: regex find. Match → fires.

### Live test

Activate the skill in a test project, send the imagined
messages one at a time, observe whether the skill activates
(in trace logs / `process.activeSkills`).

### Update based on observed misses / hits

Triggers are not write-once. Tighten / loosen based on
real session data over time.

## Anti-patterns

### Designing triggers without imagined user messages

Lead with what you want to detect, not with keyword lists.
The list comes from the messages, not the other way around.

### Using triggers to gate behaviour

"Trigger fires only on senior-developer queries" — triggers
match strings, not user attributes. Use recipe
`allowedSkills` whitelisting for permission-style gating.

### Trigger overlap across skills

Two skills with overlapping triggers both fire on the same
message. Sometimes correct (different angles on the same
input), sometimes wasteful (only one is useful, both load
prompt content). If overlap is incidental, tighten one.

### Forgetting that triggers fire on *user* messages

Triggers don't fire on assistant outputs or worker
outputs. The user has to say something the trigger
matches. Don't write triggers based on what the LLM might
say.

## Output line

- "**Triggers ready:** ⟨KEYWORDS / PATTERN⟩, ⟨n⟩ entries.
  **Test cases passing:** ⟨specific count⟩."
- "**Trigger too broad** — fires on ⟨specific false-
  positive case⟩."
- "**Trigger too narrow** — misses ⟨specific legitimate
  case⟩."
- "**No trigger** — skill is manual-activation only via
  `/skill ⟨name⟩`."
