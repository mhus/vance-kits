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
- `SMALL` forces `promptPrefixSmall` if defined.
- `LARGE` forces `promptPrefix`.
- Useful when you want a haiku-tier model with the full
  prompt anyway, or vice versa.

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
promptPrefixSmall: |
  You are X. Output Y.   # tighter for haiku/flash
promptMode: APPEND   # default; OVERWRITE replaces engine default
```

- `APPEND`: engine default first, then your prefix.
- `OVERWRITE`: your prefix is the whole prompt.
- `promptPrefixSmall`: optional tighter version for
  `ModelSize.SMALL` models.

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
