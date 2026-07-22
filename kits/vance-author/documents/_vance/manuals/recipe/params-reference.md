---
triggers: recipe params, model alias, fallbackModels, manualPaths, maxIterations, temperature, sampling params, rag.autoInject, allowedToolsAdd, outputSchema, promptPrefix pebble, planMode
summary: Reference for the recipe `params` map — cross-engine keys (model, manualPaths, validation, maxIterations, RAG), LLM sampling params with provider coverage, engine-specific highlights, tool/skill scope, and param anti-patterns.
---

# Params Reference — what goes into `params`

The `params` map is where you tune the engine's behaviour
without changing the prompt. Some keys work across engines;
others are engine-specific. This manual covers the cross-cutting
ones plus the most-used engine-specifics.

For exhaustive engine-specific params, see the engine-spec
files (`specification/arthur-engine.md`, `marvin-engine.md`,
`vogon-engine.md`, etc.).

## Cross-engine params

### `model`

The model alias to use for primary inference.

```yaml
params:
  model: default:analyze   # or: anthropic:claude-opus-4-7
```

- **Aliases** (`default:fast`, `default:analyze`,
  `default:large`) are tenant-overridable. Always prefer
  aliases over hardcoded model strings.
- **Hardcoded model strings** work but break tenant
  configuration; only use them when a specific recipe
  genuinely needs a specific model regardless of tenant
  policy.

### `fallbackModels`

Ordered fallback list when the primary fails (rate-limit,
5xx, exhausted retry budget):

```yaml
params:
  model: default:analyze
  fallbackModels:
    - default:fast
    - default:large
```

Tenants without a configured alias get it silently dropped;
no error.

### `manualPaths`

Folder paths for `manual_list` / `manual_read`:

```yaml
params:
  manualPaths:
    - manuals/
    - manuals/domain-specific/
```

- **Path order = lookup precedence.** First-folder-wins on
  duplicate stems.
- **Trailing `/` is normalised.** `manuals` and `manuals/`
  resolve identically.
- **Active skills can contribute additional paths** via
  their own `manualPaths` frontmatter; these are *added*
  to the recipe's list.

### `validation`

Whether the engine validates / fixes the LLM output format:

```yaml
params:
  validation: true
```

- `true` (default for arthur, ford with `outputSchema`):
  engine catches malformed output, re-prompts with hint,
  retries.
- `false`: pass output through verbatim. Use when the
  worker output is reformatted downstream and the
  validator would falsely flag it.

### `maxIterations`

Turn budget for engines that loop (arthur, marvin, vogon
loops):

```yaml
params:
  maxIterations: 6
```

After N turns without resolution the engine surrenders or
escalates, depending on engine.

### `modelSize`

Force a specific size variant of the prompt:

```yaml
params:
  modelSize: SMALL   # or LARGE, or AUTO (default)
```

- `AUTO` reads the model's tier from the `ai-models.yaml`
  catalog.
- `SMALL` / `LARGE` set the `tier` Pebble variable so
  `{% if tier == "small" %}` branches in your prompt fire
  regardless of the catalog classification.
- Useful when you want a haiku-tier model with the full
  prompt anyway, or vice versa.

### `planMode`

Engine-param read by Arthur and Eddie to gate the Plan-Mode
action vocabulary (`START_PLAN` / `PROPOSE_PLAN` /
`START_EXECUTION` / `TODO_UPDATE`):

```yaml
params:
  planMode: auto       # or disabled
```

- `auto` (default): engine decides when to plan, based on
  task complexity and explicit user requests. See the
  `plan-mode` brain manual via `manual_read plan-mode`.
- `disabled`: `START_PLAN` is rejected with a hint to pick
  a different action. Use for answer-only recipes (FAQ,
  pure-research assistant, voice-first hub for one-shot
  questions).

### `rag.autoInject` / `rag.minScore` / `rag.topK`

Project-RAG auto-inject (Variante C / Pre-Turn-Hybrid). When
`rag.autoInject: true`, the engine embeds the current turn's
user input against the project's `_documents` RAG and inserts
the top-K hits above `rag.minScore` as a dynamic
`<rag-context>` block in the system prompt. Today wired up
for **Arthur**; other engines adopt the same pattern.

```yaml
params:
  rag:
    autoInject: true     # default false — opt-in per recipe
    minScore: 0.65       # filter threshold; modellabhängig
    topK: 5              # max hits to inject
```

- Cascade override: tenant or project can flip the master
  toggle via the cascade setting `rag.autoInject.enabled`
  (`true` / `false`). When set, it wins over the recipe.
- Silent fallbacks: no `_documents` RAG (embedding provider
  not configured) → no block. Embed call fails → warn-log,
  no block. Empty inbox → no block.
- The block is rendered statically by
  `RagAutoInjectService.composeBlock` — not a Pebble
  template. If a recipe wants a different style, that's a
  separate refactor (`rag.template` param).
- Use when the engine should ground answers in the project's
  documents without the LLM having to call `rag_query`
  manually. Skip for engines that should answer purely from
  conversation context, or for system/auto-summary recipes
  where RAG context just bloats the prompt.

Other engines (Ford, Vogon, Marvin) ignore the param —
they have no Plan-Mode by design.

## LLM sampling params

Wire-level knobs the engine passes to the LLM provider. Set
on the recipe, applied per call by `EngineChatFactory`.
Providers that don't know a field silently ignore it — the
same YAML works across OpenAI, Anthropic, Gemini, Ollama,
LM Studio.

```yaml
params:
  temperature: 0.2          # 0.0–2.0; default 0.7
  maxTokens: 4096           # null = provider default
  topP: 0.9                 # nucleus sampling cutoff
  topK: 40                  # top-K cutoff
  stopSequences:            # hard-stop strings
    - "END_OF_REPORT"
    - "</answer>"
  seed: 1                   # deterministic sampling
  frequencyPenalty: 0.3     # penalty proportional to frequency
  presencePenalty: 0.2      # penalty per token already present
```

### Provider coverage

| Param | OpenAI / LM Studio | Anthropic | Gemini | Ollama |
|---|---|---|---|---|
| `temperature` | ✓ | ✓ | ✓ | ✓ |
| `maxTokens` | ✓ | ✓ (required, default 4096) | ✓ | ✓ |
| `topP` | ✓ | ✓ | ✓ | ✓ |
| `topK` | ignored | ✓ | ✓ | ✓ |
| `stopSequences` | ✓ | ✓ | ✓ | ✓ |
| `seed` | ✓ | ignored | ✓ | ✓ |
| `frequencyPenalty` | ✓ | ignored | ✓ | ignored |
| `presencePenalty` | ✓ | ignored | ✓ | ignored |

### Override semantics

- **Nullable fields** (everything except `temperature`):
  caller-set value wins; recipe only fills in null fields.
- **`temperature`**: has a non-null default (`0.7`), so the
  recipe always wins when set. Caller-side hard override
  is post-`forProcess` setter.

### Type tolerance

YAML parsers deliver numbers as `Integer` / `Long` /
`Double` depending on the path. The reader accepts any
`Number` subtype and also parses strings (`"0.4"` → `0.4`).
Bad values are dropped with a WARN log, not a crash.

### When to set sampling params

- **Deterministic worker** (Ford, structured output):
  `temperature: 0.0`, `topP: 0.1`, `seed: <fixed>`,
  `stopSequences` for the output frame.
- **Creative long-form** (chat orchestrator, writing
  helpers): `temperature: 0.8–1.0`, `topP: 0.9–0.95`,
  small `frequencyPenalty` to discourage repetition.
- **QA replay** in tests: `seed` + low `temperature`.
- **Don't** randomly tweak `topP`/`topK` without a
  baseline — sampling-control params interact. Pick one
  axis (usually `temperature`) and only reach for the
  rest when you can show a difference.

## Engine-specific params (highlights)

### Arthur

```yaml
params:
  defaultActiveSkills: [decision-frame]   # sticky-active
  allowedSkills: [decision-frame, stuck]  # whitelist
```

Plus profile-mode overlays via `modes:` and `profiles:`
sections (see `vance-defaults/recipes/arthur.yaml`).

### Ford

```yaml
params:
  outputSchema:
    type: object
    properties:
      result: { type: string }
    required: [result]
  postActions:
    - kind: doc_create_text
      pathTemplate: "outputs/${slug}.md"
      contentSource: result
```

`outputSchema` is the structured-output contract. `postActions`
are deterministic engine-driven side effects after the worker
returns.

### Marvin

```yaml
params:
  rootTaskKind: PLAN
  allowedSubTaskRecipes: [outline_loop, chapter_loop]
  recipesOnlyViaExpand: [chapter_loop]
  allowedExpandDocumentRefPaths: [essay/outline.md]
  requiredChildTemplateRecipeParams:
    chapter_loop: [chapterIndex]
  disallowedTaskKinds: [USER_INPUT]
  maxPlanCorrections: 2
```

Each constraint catches a specific Marvin-PLAN failure mode.
See `specification/marvin-engine.md` for the failure-mode
catalogue.

### Vogon

```yaml
phases:
  - name: outline
    recipe: outline_writer
    outputSchema: { ... }
    maxOutputCorrections: 2
gates:
  - between: [outline, chapters]
    requires: [outline.outputs.title]
loops:
  - phase: lector
    until:
      requiresAny: [score >= 0.8, iterations >= 3]
postActions:
  - phase: outline
    kind: doc_create_text
    ...
```

Vogon recipes typically have multi-phase setups; one Vogon
recipe can have several worker recipes plugged in.

## Tool scope params

Across engines:

```yaml
allowedToolsAdd:
  - "@read-only"
  - manual_list
  - manual_read

allowedToolsRemove:
  - "@write"
  - "@executive"
```

- **String entries** are explicit tool names.
- **`@`-prefixed entries** are label-selectors over server-
  tool labels (`@read-only`, `@write`, `@executive`,
  `@side-effect`).
- **Add then remove**: removed wins. So
  `allowedToolsAdd: [doc_create_text]` +
  `allowedToolsRemove: [@write]` removes `doc_create_text`
  if it's labelled `@write`.

Plus profile-specific overlays:

```yaml
profiles:
  foot:
    allowedToolsAdd: [client_file_read]
  web:
    allowedToolsRemove: [client_file_read]
```

## Skill scope params

```yaml
defaultActiveSkills:
  - decision-frame

allowedSkills:
  - decision-frame
  - stuck
  - rubber-duck
```

- `defaultActiveSkills`: skills sticky-active from spawn,
  marked `fromRecipe=true` (user can't clear them).
- `allowedSkills`: whitelist. If set, only these skills
  can ever be active (trigger / default / `/skill`).
  Empty list → lockdown (no skills allowed). Absent →
  no restriction.

## Prompt params

```yaml
promptPrefix: |
  You are X, doing Y.
  {% if tier == "small" %}
  Output a single line. No headings.
  {% else %}
  Output structured Markdown with sections and rationale.
  {% endif %}
promptMode: APPEND   # default; OVERWRITE replaces engine default
```

- `APPEND`: engine default first, then your prefix.
- `OVERWRITE`: your prefix is the whole prompt.
- **`promptPrefix` is a Pebble template** — same engine the
  engine-default prompts and skill bodies use. Branch on
  `tier`, `model`, `provider`, `mode`, `profile`, `lang`,
  `engine`, or read `{{ params.* }}` directly. There is no
  separate `promptPrefixSmall` field — write the
  small-model variant as a `{% if tier == "small" %}` branch
  inside `promptPrefix`.
- Pebble syntax-error fails the recipe at load-time
  (fail-fast). Use `{% if model is matching("gemini-.*flash.*") %}`
  for regex tests; `elseif` (not Jinja2's `elif`); `{% raw %}…{% endraw %}`
  to escape literal `{% %}` text.

## Lock & visibility

```yaml
locked: true
tags: [internal, write-restricted]
```

- `locked: true`: caller `params` overrides ignored
  (useful for compliance-bound recipes).
- `tags`: free-form discovery; surfaces in `recipe_list`.

## Connection-profile params

```yaml
profiles:
  foot:
    params:
      useClientAgentDoc: true
    session:
      onDisconnect: SUSPEND
      onIdle: NONE
    promptPrefixAppend: |
      ## Foot-specific instructions
      ...
```

Per-client-type overlays. See `specification/recipes.md`
§6a for the full profile-block schema.

## Param anti-patterns

### `manualPaths` empty

Forgot it; `manual_*` tools find nothing. If the recipe
should support manuals, set the path.

### `model` hardcoded to provider:specific-version

Locks tenants to your model choice. Use aliases. Hardcoded
is a smell, allowed only with comment justifying why.

### `defaultActiveSkills` includes 5+ skills

Every skill adds prompt content per turn. Five active
skills = a lot of token overhead. Prefer triggers; default-
active only for skills that genuinely apply to *every*
session (rare).

### `allowedToolsRemove: [@side-effect]` then add specific
write tools back

`@side-effect` ⊃ `doc_create_text`. The remove wins. Either
remove specific tools instead of the bundle, or accept the
bundle removal.

### `validation: false` because "the LLM keeps failing
the schema"

Validation isn't the problem; the prompt is unclear about
the format. Tighten the prompt + `outputSchema`; don't
disable the safety net.

### `maxIterations: 1`

Often too tight; the engine has no room for self-
correction. Default of 6-10 works for most cases.

## Output line

- "**Params set:** ⟨key list⟩."
- "**Missing:** ⟨specific param⟩ — needed because ⟨reason⟩."
- "**Param anti-pattern:** ⟨specific⟩. Refactor to ⟨move⟩."
