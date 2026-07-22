---
triggers: code smell, quality review, parameter sprawl, copy-paste, leaky abstraction, premature abstraction, stringly-typed, derived state, unnecessary nesting, strukturprobleme, magic numbers, review qualität
summary: The quality review pass: structural smells across code, prose, and plans (parameter sprawl, copy-paste, leaky/premature abstraction, stringly-typed, derived state, needless nesting) and when to flag versus leave them.
---

# Quality Smells — structural patterns to flag

The second review pass. Reuse asks "is this fresh code that
shouldn't be?". Quality asks "is fresh code well-structured?".

A smell isn't a bug; it's a signal. Worth flagging, worth
discussing, worth fixing — but not always blocking.

## Cross-cutting smells

These show up in code, prose, plans, decisions alike.

### Parameter sprawl

A function / section / decision whose surface keeps growing one
new "just one more" at a time. Smell: signature has 7+ params,
chapter has 12 sub-sections, decision has 9 criteria.

- Code: extract a config object, split the function, push
  optional params to a builder.
- Prose: split the section.
- Decision: collapse criteria into 3-5 buckets (see
  `decision-frame/criteria-catalogue`).

### Copy-paste with variation

Two near-duplicate blocks differing in one or two places. Almost
always a missed abstraction.

- Code: extract, parameterise the variation.
- Prose: extract a shared block, reference from both places.
- Plans: same step appearing twice with slightly different
  phrasing — consolidate.

### Leaky abstraction

The interface promises encapsulation but the caller has to know
internal details to use it correctly.

- Code: caller has to call init / cleanup in the right order;
  caller has to know which exception is "fine".
- API design: the response shape leaks DB layer concerns.
- Prose: the section abstracts a process but you can't follow
  it without the implementation handy.

### Premature abstraction

The opposite smell. One use-site exists, but the code already
has three layers of indirection ready for hypothetical future
sites.

- Three similar lines is better than a premature abstraction.
- Wait for the third use-site to extract.

### Stringly-typed

Strings used where a type / enum / constant would be safer.

- Code: `if status === "ok"` everywhere — make `status` a union
  / enum.
- Config: keys typed as `string` when the legal set is finite.
- Plan: vague labels ("phase 1", "phase 2") that mean different
  things to different readers.

### State that should be derived

A field is stored that could be computed from other fields.
Means two sources of truth that can drift.

- Code: cache the computation if it's expensive — but the
  computation is the source.
- Document: a TOC that's hand-maintained alongside section
  headers.
- Plan: a status field that's manually flipped after each
  step.

### Unnecessary nesting

Wrappers that add no value:

- JSX: `<Box><Box><Component/></Box></Box>` where one Box would do.
- Functions: `f(x)` calls only `g(x)` calls only `h(x)`.
- Config: nested objects with one key each.
- Outline: sections with only one subsection each.

### Comments that explain WHAT, not WHY

If the code / structure is self-evident, the comment is noise.
Comments earn their keep when they explain hidden constraints,
non-obvious reasoning, workarounds.

- Bad: `// loop over users` above a `for (user of users)`.
- Good: `// must run before the migration — see #1432`.

### "Just in case" code

Error handling, validation, fallbacks for cases that can't
happen given the call-site contract. Adds noise; teaches
readers to distrust the typing.

Validate at boundaries (user input, external APIs). Trust
internal calls.

## Code-specific smells

- **Boolean parameters.** `f(true, false, null)` — meaning
  evaporates at the call site. Use enums or named options.
- **Long if/else chains.** Often better as a lookup, a
  polymorphic dispatch, or a switch.
- **Magic numbers / strings.** `if (x > 10)` — what's 10?
- **Mutating shared state in a "pure" function.** Promise broken.

## Prose-specific smells

- **Wandering thesis.** Each paragraph reasonable; the whole
  doesn't say one thing.
- **Burying the lead.** The point arrives in paragraph 6.
- **Hedge words.** "It might be possible that perhaps in some
  cases" — say it or don't.

## Plan-specific smells

- **Steps without owners.**
- **Steps without finish criteria.** "Improve performance" —
  improve from what to what?
- **Ratio of slides to action.** A 30-page plan with one page of
  what to do is mostly ceremony.

## How to phrase a quality finding

Surface the smell, name the pattern, suggest the move:

- **Bad:** "This is messy."
- **Good:** "`processOrder` has 9 parameters — that's parameter
  sprawl. Extract a `ProcessOrderOptions` object."

## When NOT to flag

- The smell was deliberate and the user already knows. Ask
  before insisting.
- The fix is more disruptive than the smell. A 50-line
  refactor to clean up a five-line function isn't worth it.
- Style preference rather than structural problem. "I'd write
  this differently" is not a finding.

## Output line

- "**Quality findings:** ⟨numbered list⟩."
- "**One concerning smell** — ⟨specific⟩. Other surface is
  fine."
- "**Quality is clean.**"
