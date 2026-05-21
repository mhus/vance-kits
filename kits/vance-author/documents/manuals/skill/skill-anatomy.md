# Skill Anatomy — the shape of a SKILL.md

A skill is a Markdown file with YAML frontmatter, plus its
sibling manuals. The frontmatter is the contract; the body
is the prompt addition; the manuals carry depth.

## File structure

```
documents/skills/<skill-name>/SKILL.md
documents/manuals/<topic>/<manual-1>.md
documents/manuals/<topic>/<manual-2>.md
documents/manuals/shared/<cross-skill-manual>.md
```

The skill folder name (`<skill-name>`) becomes the skill's
identity. The frontmatter `name:` field is *not* used —
filename / folder name wins. Don't include `name:` in the
frontmatter.

## Frontmatter — the fields

```yaml
---
title: Decision Framing
description: Use when the user is weighing options, choosing between alternatives
version: "1.0.0"
tags: [decision, thinking, structured]
enabled: true
triggers:
  - type: KEYWORDS
    keywords: [decide, decision, sollte]
  - type: PATTERN
    pattern: "(?i)\\bwhich\\b.*\\bbetter\\b"
manualPaths:
  - manuals/decision
  - manuals/shared
tools:
  - manual_list
  - manual_read
referenceDocs:
  - file: references/checklist.md
    title: decision-checklist
    loadMode: ON_DEMAND
    summary: full 6-step decision walk
---
```

### Required

- **`title`** — short human label. Shown in skill picker /
  admin UI / prompt traces.
- **`description`** — one-line summary. Shown in trigger-
  explanation and worker hand-over messages. Keep ≤ 200
  chars; action-orientated ("Use when …").
- **`version`** — semver string. Manually maintained. Bump
  on breaking change so callers can pin. Server doesn't
  enforce semver semantics.

### Optional but commonly set

- **`triggers`** — auto-activation rules. See
  `trigger-design`. Leave empty if the skill should only
  activate manually via `/skill <name>`.
- **`tools`** — tools added to the engine/recipe whitelist
  while the skill is active. Skills are additive only —
  can't remove tools.
- **`manualPaths`** — folder paths the skill contributes
  to `manual_list` / `manual_read` when active. Sanitised
  (no `..`, no leading `/`, backslashes normalised).
- **`tags`** — discovery hints. Free-form.
- **`enabled`** — default `true`. `false` makes the skill
  invisible (cascade-resolves as if missing — useful for
  temporary suppression or override-disable).

### Reference docs

```yaml
referenceDocs:
  - file: references/checklist.md
    title: decision-checklist
    loadMode: ON_DEMAND
    summary: full 6-step decision walk
```

- `file` — path relative to the skill subtree.
- `title` — for `INLINE`: doc header in the prompt. For
  `ON_DEMAND`: the `manual_read` argument.
- `loadMode`:
  - `INLINE` — body embedded in the system prompt at
    activation. Use for *required* material the model
    needs immediately.
  - `ON_DEMAND` — body NOT embedded. Listed in the prompt
    as "On-demand references — load via `manual_read`:".
    Model pulls when it decides it needs depth.
- `summary` — optional one-line teaser, shown in the
  on-demand listing after the title.

In practice, the `basic` and `code-development` kits
prefer **manuals over `referenceDocs`** — manuals are
easier to share across skills and live in a known
`manuals/` location. `referenceDocs` is best for
skill-internal material that no other skill would want.

## Body — what comes after the frontmatter

The body is appended to the system prompt when the skill
activates. It IS the skill's runtime behaviour. Treat it
as instructions to the model; not as docs to a reader.

### Pebble templating

Skill bodies are Pebble templates — same engine as
`promptPrefix` in recipes and the engine-default prompts.
Use `{% if … %}` / `{{ … }}` for tier-, mode-, or
provider-specific variants instead of forking the whole
skill.

Available variables (same context the engine's own prompt
sees):

- `tier` — `"small"` or `"large"` (model size).
- `model` — resolved model name, e.g. `"claude-sonnet-4-6"`.
  Useful with `is matching("…")` for regex.
- `provider` — `"anthropic"`, `"google"`, `"openai"`, …
- `mode` — process mode: `"NORMAL"`, `"EXPLORING"`,
  `"PLANNING"`, `"EXECUTING"`.
- `profile` — connection profile: `"foot"`, `"web"`,
  `"default"`.
- `recipe` — current recipe name.
- `engine` — engine name (`"ford"`, …).
- `lang` — chat language (`"de"`, `"en"`; may be empty).
- `params` — recipe params map, e.g. `{{ params.maxIterations }}`.

Example:

```markdown
[One paragraph: what mode the user is in, what your job is.]

## Default protocol

{% if tier == "small" %}
Three steps. Be terse.
{% else %}
1. First step with explanation.
2. Second step with rationale.
3. Third step with caveats.
{% endif %}
```

**Reference docs are NOT Pebble-rendered.** A reference doc
that contains literal `{% %}` text round-trips unchanged
(e.g. when the doc itself teaches Pebble syntax).
Skill-body Pebble lives only in the body.

**Broken Pebble → skill skipped.** A skill with a syntax
error in its body is dropped with a `WARN` log; the rest
of the active-skill list composes normally. Test your
templates in a real session before shipping.

### Recommended body structure (≤ ~70 lines)

```markdown
[One paragraph: what mode the user is in, what your job is.]

## Default protocol

[Numbered steps. The cheap default that handles most cases
without needing manual depth. 5-8 steps max.]

## On-demand manuals

[A bulleted list of the manual menu. Each line: name —
when to load. The model reads this and decides which to
pull.]

## Hard rules

[Bulleted list of behaviours-NOT-to-do. Defensive; covers
the failure modes the protocol doesn't.]
```

### Why this structure

- **Default protocol up front:** the model can act on
  shallow guidance immediately. Doesn't always need a
  manual.
- **Manual menu visible:** the model knows the depth is
  available without recitation. Pull on demand.
- **Hard rules at the end:** the model has the protocol in
  memory; rules constrain it. Order matters less than
  presence.

### Body anti-patterns

- **Wall of text** — single block, no headings. Hard for
  the model to anchor. Use headings.
- **Detailed protocol inline** — 50 lines of "in case A do
  this, in case B do that" inline. Move conditionals to
  a manual.
- **Long preamble** — five paragraphs before the actual
  instruction. The model reads from the top; first 200
  tokens are the most-attended.
- **Fictional cross-references** — "see `protocol.md`"
  when no such manual exists. Causes the model to call
  `manual_read('protocol')` and fail.
- **Imperatives that conflict with the engine** — telling
  the engine to spawn via a code path it doesn't use. The
  selector-routed `process_create` (no recipe param) is now
  trigger-gated and falls back to the tenant default
  recipe; skills for an arthur-engine that wants a specific
  worker should say so explicitly via
  `process_create(recipe='X')` instead of expecting magical
  routing. Fit the engine's conventions.

## Cross-skill design

Skills don't live in isolation. Common patterns:

### Shared manuals

`manuals/shared/<topic>.md` — manuals used by multiple
skills. Each skill's `manualPaths` should include
`manuals/shared`. Cross-references between manuals (skill-
internal manual links to shared manual via "see
`shared/when-to-stop`") are explicit.

### Skill referencing another skill

When skill A's body mentions skill B ("for code review,
see `code-review` from code-development"), the model can
note that — but skills don't auto-activate other skills.
The user (or trigger) activates skill B separately.

If you find yourself wishing skill A could "include" skill
B's manuals automatically: that's the `manualPaths` overlap
pattern. Both list `manuals/shared` and additionally
their own folder.

### Inherited skills via Kit inherits

If your kit `inherits: parent-kit`, the parent's skills
are available too. Don't duplicate — extend. If you need
a slight tweak of a parent skill, override by name (same
skill name in the child wins via cascade).

## Anti-patterns

### Skill as wiki page

The skill body is 200 lines describing the topic
exhaustively. The model can't navigate it; the depth
isn't on-demand. Move to manuals.

### Trigger that hits 80% of conversations

`triggers: [code, project, software]` — fires on every
engineering chat. The skill activates when not relevant,
adds prompt overhead. Tighten triggers.

### `tools:` adding the kitchen sink

`tools: [doc_create_text, web_fetch, process_create, ...]`
— the skill is additive; if it always needs all these,
they probably belong in the recipe, not the skill.

### Versioning by drift

`version: 1.0.0` on every skill, never bumped. Pointless
field. Bump on breaking change at minimum.

### Manuals not linked from body

The skill has 5 manuals but the body doesn't list them.
Model doesn't know the depth is there. Body has to
expose the menu.

## Output line

- "**Skill structure complete:** ⟨frontmatter / body /
  manuals⟩."
- "**Frontmatter incomplete:** ⟨specific field⟩."
- "**Body bloat:** ⟨N⟩ lines, target ⟨~70⟩. Move
  ⟨specific section⟩ to a manual."
- "**Anti-pattern:** ⟨specific⟩. Refactor to ⟨move⟩."
