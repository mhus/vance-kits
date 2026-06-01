# Manual Structure — write manuals the model will actually use

A manual is a Markdown file under `manuals/<topic>/<name>.md`,
pulled by the model via `manual_read` when a skill's body
points to it. It's not documentation for humans; it's runtime
context for the LLM. Different rules apply.

## What makes a manual useful

A manual is useful when:

- **The model can pull it without recital.** The skill body
  says "load `triage-workflow` for the full triage", and the
  manual contains that — not "see other docs for triage".
- **It's standalone.** A model that reads only this manual
  (without the skill body) still gets value.
- **It has a specific purpose.** "How to do X." or
  "Catalogue of Y." or "When to use Z, when not." Not
  "general thoughts on the topic".
- **It produces an output line.** The model finishes
  reading and knows what to *say* or *do*. See "Output
  line convention" below.

A manual is *not* useful when:

- It restates the skill body. (Then the manual is the body
  in disguise.)
- It's exhaustive but unstructured. (Model can't act on a
  wall of text.)
- It has a pose ("here are some thoughts") but no
  conclusion.

## Manual length

Rough range: **80-300 lines**. Outliers exist:

- Cheatsheets (engine reference, vulnerability classes) can
  go to 300+ — they're catalogues.
- Quick-protocol manuals (output-line conventions,
  decision frames) work at 80-150.
- Manuals < 50 lines feel like fragments — usually they
  belong in the skill body.

If a manual exceeds ~350 lines, consider splitting (one
specific aspect per file). The model has finite context;
loading a 500-line manual eats budget that could go to
the actual response.

## Recommended structure

```markdown
# Manual Title — short tagline

[1-3 sentences: what this manual covers, when to load.]

## Section 1 — first concrete chunk

[Direct content. Tables, lists, named patterns. Avoid
"this section discusses X" preambles.]

## Section 2 — next chunk

[More content.]

## Anti-patterns

[Optional: what NOT to do. Often valuable; pairs with
the positive guidance.]

## Output line

[Short list of how the model should close. See "Output
line convention" below.]
```

Sections are short and named for what they contain, not
"Introduction", "Discussion", "Conclusion".

## Output line convention

Every manual ends with an "Output line" section. Three to
five bullets, each starting with `**...:**` or `**...** —`.
Each bullet is a specific phrasing the model can adapt
when responding.

Examples (from existing manuals):

```markdown
## Output line

- "**Hypothesis:** ⟨specific claim⟩. **Test:** ⟨specific
  experiment⟩."
- "**Tested. Confirmed.** Fix is ⟨concrete change⟩."
- "**Tested. Disproved.** Rehypothesising — see ⟨next
  candidate⟩."
- "**Need more information.** ⟨specific data⟩ would
  disambiguate."
```

Why this works: when the model finishes reading the manual,
it knows the *form* of the answer it should produce, not
just the content. Reduces variance in skill output.

When you can't write good output-line variants, the manual
isn't actionable enough — restructure.

## Cross-linking between manuals

Manuals in the same skill can reference each other:

> If the user has narrowed prematurely, see `re-frame`.

The model interprets this as: if the relevant case fires,
call `manual_read('re-frame')`. The cross-link lets the
model navigate depth without the skill body listing every
permutation.

Cross-links work because:

- All manuals in a skill are reachable via the skill's
  `manualPaths`.
- Manuals in `manuals/shared/` are reachable across skills
  that include `manuals/shared` in their `manualPaths`.

Don't fabricate cross-links to non-existent manuals — the
model will call `manual_read` and fail. Either create the
target or drop the reference.

### Cross-skill references

When a manual in skill A references a manual from skill B:

> When the work is irreversible, run `decision-frame/
> full-protocol` first.

This works *if* skill B is also active (or skill A's
`manualPaths` includes the path where skill B's manuals
live). Otherwise the model can't reach it. Test that the
path is actually resolvable.

Best practice: cross-skill references go through
`manuals/shared/`, not directly into another skill's
folder. Keeps decoupling.

## Depth calibration

How deep to go on each topic? Rule of thumb:

- **What the protocol always does** → skill body.
- **What the protocol does in the common case** → first
  few lines of the manual.
- **What the protocol does in the unusual case** →
  middle of the manual.
- **What's the catalogue / reference / cheatsheet** →
  full manual.

Each manual should answer: *what's the question this
manual exists to answer?* If the answer is broader than
one paragraph, you have a manual.

## Tone

Direct, declarative, specific. Avoid:

- **Hedging.** "It might be worth considering perhaps." Say
  it or don't.
- **Marketing.** "Powerful framework for elegant solutions."
- **ChatGPT register.** "Let's explore some options ✨."
  Especially: no "let's", no "we", no emojis.
- **Long preambles.** "This manual will discuss …" — just
  start.
- **Closing pleasantries.** "Hope this helps!" — drop.

Prefer:

- **Imperative.** "Pick the engine first."
- **Concrete.** "Set `params.maxIterations: 6` for arthur;
  default of 6-10 works for most cases."
- **Negative space.** "Don't do X" is as valuable as "Do Y"
  — sometimes more.

The voice should sound like an experienced colleague
explaining a thing across the desk, not a wiki page.

## Anti-patterns

### Manual restating the skill body

The skill body says "follow the 6-step protocol"; the
manual says "follow these 6 steps: [identical to body]".
The manual adds nothing. Either expand significantly
in the manual, or delete it.

### Manual as historical context

"Originally we did X, then we found Y, then we changed
to Z." Useful for code review of the manual; not useful
runtime context. Keep history out; describe current
state.

### Manual with "for further reading" links

Links to external docs, RFCs, blog posts. The model
doesn't follow URLs at runtime. Either include the
relevant content, or drop the link.

### Manual with no concrete output

"Think carefully about X." The model can't *do* "think
carefully". Provide structure: "List three options. For
each, name the cost, the reversibility, the dependency.
Then …"

### Manual that requires the model to be human

"Take a deep breath. Step away from the keyboard." The
model has neither breath nor keyboard. Frame in
modelable actions: "Pause; restate the user's question
in one sentence before continuing."

### Examples that look like real production code

If a manual shows code that looks deployable, the model
might output it as-is. If the code is illustrative (e.g.
contains `...` placeholders), make the placeholders
obvious so they're not confused with real syntax.

### "Best practices" without specifics

"Follow security best practices." Useless. Manual must
name the practice and how to apply it.

## Updating manuals

Manuals are living. Update when:

- The skill's protocol changes.
- New failure modes are observed in real sessions.
- Brain-side primitives change (new engine, new params,
  new tool surface).

Don't update for:

- Cosmetic improvements unless multiple readers stumble.
- Adding "we found this useful" anecdotes.
- Following up on every model misuse — sometimes the
  fix is in the prompt elsewhere, not in the manual.

## Output line

- "**Manual structure complete:** ⟨n⟩ sections, output
  line convention, cross-links to ⟨list⟩."
- "**Manual restates body** — either expand or delete."
- "**Cross-link unreachable:** ⟨specific⟩. Create target
  or drop reference."
- "**Manual too long** — ⟨n⟩ lines, target ⟨~150⟩.
  Split on ⟨specific axis⟩."
