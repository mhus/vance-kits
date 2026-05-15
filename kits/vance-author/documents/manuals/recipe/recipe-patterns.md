# Recipe Patterns — recurring shapes

Common patterns to copy-and-adapt rather than designing from
scratch. Each pattern includes the engine, the typical params,
the prompt skeleton, and when to deviate.

## Pattern: chat orchestrator (arthur)

The session-chat front-end. User talks; the orchestrator
delegates real work to worker-recipes, synthesises results
back.

```yaml
description: |
  Reactive chat orchestrator for [domain]. Delegates to
  worker recipes, synthesises results.
engine: arthur
params:
  model: default:analyze
  validation: true
  maxIterations: 6
  fallbackModels:
    - default:fast
  manualPaths:
    - manuals/
  defaultActiveSkills: []          # rare; trigger-driven preferred
  allowedSkills:                   # tighten if needed
    - decision-frame
    - stuck
    - rubber-duck
allowedToolsAdd:
  - "@read-only"

modes:
  NORMAL:
    allowedToolsDefer:             # listed but hidden from LLM
      - doc_read
      - process_create_delegate
      - ...
  EXPLORING:
    allowedToolsRemove:
      - "@write"
      - "@executive"
profiles:
  foot:
    promptPrefixAppend: |
      ## Local CLI client
      ...
  web:
    allowedToolsRemove:
      - client_file_*
promptPrefix: |
  You are the [domain] chat orchestrator. ...
```

**When to deviate:**

- Restricted tenant: tighten `allowedSkills` and remove
  `@write` defaults.
- Single-purpose chat: skip `modes:` and `profiles:`,
  start with the bundled `arthur.yaml` and override only
  `promptPrefix`.

## Pattern: single-shot worker (ford)

A worker that takes input, does one thing, returns
structured output. The orchestrator (arthur or marvin) calls
this via `process_create_delegate`.

```yaml
description: |
  [What this worker does in one sentence]. Returns
  structured JSON; the spawning phase persists via
  postActions.
engine: ford
params:
  model: default:fast
  validation: true
  manualPaths:
    - manuals/
  outputSchema:
    type: object
    properties:
      result:    { type: string }
      slug:      { type: string }
      title:     { type: string }
    required: [result, slug, title]
promptPrefix: |
  You are the [name]-worker. Receive workerInput
  describing the task. Read context via doc_read if
  needed.

  End your reply with EXACTLY one JSON object:

      {
        "result": "...",
        "slug":   "...",
        "title":  "..."
      }

  No doc_create_text calls. No persistence. Output only.
```

**When to deviate:**

- Worker needs side effects (file writes): set
  `params.postActions:` instead of letting the worker call
  `doc_create_text`. Engine-driven side effects are
  reliable; worker-driven aren't.
- Reply doesn't need structure: drop `outputSchema`, set
  `validation: false`, accept free-text. Rare.

## Pattern: lector loop (vogon)

A worker generates content; a "lector" (review) phase
validates with a score; the loop iterates until quality is
good enough or budget is exhausted.

```yaml
description: |
  [Content type] generation with lector revision loop.
engine: vogon
phases:
  - name: writer
    recipe: writer_worker
    outputSchema: { ... }
    maxOutputCorrections: 2
  - name: lector
    recipe: lector_reviewer
    outputSchema:
      type: object
      properties:
        score:    { type: number, minimum: 0, maximum: 1 }
        feedback: { type: string }
      required: [score, feedback]
loops:
  - phases: [writer, lector]
    until:
      requiresAny:
        - { phase: lector, output: score, gte: 0.8 }
        - { iterations: gte: 3 }
postActions:
  - phase: writer
    kind: doc_create_text
    pathTemplate: "outputs/${name}.md"
    contentSource: writer.outputs.text
```

**When to deviate:**

- One-pass quality good enough: drop the lector loop, just
  keep `writer` as a single-phase Vogon (or use ford
  directly).
- Multiple aspects to review (style + accuracy + structure):
  parallel reviewers in a single lector phase, or successive
  lector phases.

## Pattern: marvin top-level

A goal goes in; marvin plans, expands, executes, aggregates.

```yaml
description: |
  Top-level recipe for [research / writing / analysis]
  pipelines. Spawns a Marvin process whose plan
  decomposes into typed worker recipes.
engine: marvin
params:
  rootTaskKind: PLAN
  manualPaths:
    - manuals/
  allowedSubTaskRecipes:
    - research_step
    - synthesise
    - aggregator
  recipesOnlyViaExpand:           # require EXPAND_FROM_DOC parent
    - per_item_step
  allowedExpandDocumentRefPaths:
    - research/outline.md
  requiredChildTemplateRecipeParams:
    per_item_step:
      - itemIndex
      - itemTitle
  disallowedTaskKinds:
    - USER_INPUT                  # autonomous-only
  maxPlanCorrections: 2
promptPrefix: |
  You plan [domain] work as a tree of typed nodes.
  ...
```

**When to deviate:**

- Need user input mid-flight: drop `disallowedTaskKinds:
  [USER_INPUT]`.
- Plan should be tighter: tighten
  `allowedSubTaskRecipes` and `recipesOnlyViaExpand`.

## Pattern: structured-output worker with postActions

Like single-shot worker, but engine-controlled side effects:

```yaml
description: |
  [Worker] that produces structured output; engine
  persists via postActions deterministically.
engine: ford
params:
  model: default:fast
  validation: true
  outputSchema:
    type: object
    properties:
      sections:
        type: array
        items: { type: object, ... }
    required: [sections]
postActions:
  - kind: doc_create_text
    perItem: sections
    pathTemplate: "outputs/${item.slug}.md"
    contentSource: item.content
  - kind: inbox_post
    title: "Generated ${sections.length} sections"
    body: "Generated outputs/* — see notification."
promptPrefix: |
  You produce a section list. Do NOT write files; the
  engine handles persistence.
```

The `postActions` block iterates over `sections` and creates
one document per item. The worker never touches
`doc_create_text` directly.

## Pattern: read-only investigator

A worker that *gathers* (no side effects) and reports.
Useful for reconnaissance before any write happens.

```yaml
description: |
  Read-only investigation. Reads docs / web / workspace;
  produces a structured report.
engine: ford
params:
  model: default:analyze
  validation: true
  outputSchema:
    type: object
    properties:
      findings: { type: array, items: { type: object } }
    required: [findings]
allowedToolsAdd:
  - "@read-only"
  - web_search
  - web_fetch
allowedToolsRemove:
  - "@write"
  - "@executive"
  - "@side-effect"
promptPrefix: |
  You investigate; you do NOT modify state.
  ...
```

The double-defence (allow `@read-only`; remove `@write`,
`@executive`, `@side-effect`) keeps the worker locked into
non-modifying behaviour even if the prompt fails.


## Pattern: project-grounded chat (arthur + RAG auto-inject)

A chat recipe that automatically grounds answers in the
project's documents. Every turn embeds the user's input
against the `_documents` RAG and injects the top hits as a
`<rag-context>` block in the system prompt.

```yaml
description: |
  Chat assistant grounded in this project's documents.
  Cites sources from documents/ before answering.
engine: arthur
params:
  model: default:fast
  planMode: auto
  rag:
    autoInject: true
    minScore: 0.65
    topK: 5
promptPrefix: |
  You are a project assistant. When the system prompt
  carries a <rag-context> block, prefer its sources for
  your answer and cite the path. When the block is absent
  or insufficient, fall back to general knowledge and
  acknowledge that you're not citing the project.
```

- The RAG block appears automatically when the project has a
  `_documents` RAG and the user's question matches at least
  one chunk above `minScore`. Silent skip otherwise (the
  prompt is unchanged).
- `topK: 5` is a comfortable default — small chats with one
  matching doc keep the prompt lean, larger archives with
  many relevant hits all fit under typical context limits.
- Tighten `minScore` (0.75+) for noisy archives where loose
  matches drown out the real answer; loosen (0.5) for sparse
  archives where you'd rather see a weak hint than nothing.
- The `rag_query` tool stays available for the LLM to dig
  deeper if the auto-injected block leaves gaps.

Variant: tenant-wide override. Set the cascade setting
`rag.autoInject.enabled = true` at tenant/project scope and
the chat recipe doesn't need to opt in — every Arthur recipe
under that scope gets the block. Use this for tenants whose
projects are all document-heavy; skip it for tenants with a
mix of chat-only and document-heavy projects.

## Pattern: parallel fan-out (zaphod)

N workers run on variations of the same input; their
results are aggregated.

```yaml
description: |
  Parallel evaluation of [topic] from N perspectives.
engine: zaphod
params:
  workers:
    - { recipe: perspective_worker, params: { lens: "engineer" } }
    - { recipe: perspective_worker, params: { lens: "user" } }
    - { recipe: perspective_worker, params: { lens: "operator" } }
  aggregator: synthesis_worker
```

(Schema is illustrative; check the zaphod-engine spec for
actual field names.)

## When NO pattern fits

Build slowly:

1. Start with the bundled recipe closest to your case
   (`vance-defaults/recipes/`). Copy it.
2. Override the smallest set of fields.
3. Test in a real session; iterate from observed failures,
   not from imagined ones.
4. If the recipe ends up substantially different from the
   bundled, that's fine — but don't rebuild from scratch
   when 80% is already in the default.

## Anti-patterns

### Designing recipe before reading spec

Recipes that look right but conflict with the engine's
hidden contract. Read the engine spec first
(`specification/<engine>-engine.md`).

### Skipping validation

`validation: false` because the engine kept rejecting
output. The fix is in the prompt + outputSchema, not in
disabling validation.

### Overlong promptPrefix

500-line promptPrefix with paragraphs of edge cases. Hard
to maintain, expensive token-wise. Move details to
manuals; let the worker pull on demand.

### Recipe doing two things

One recipe that's both worker and orchestrator, or that
plans *and* executes. Split. Recipes do one thing well.

## Output line

- "**Pattern fits:** ⟨pattern name⟩. **Customise:**
  ⟨specific fields⟩."
- "**No pattern fits cleanly** — start from
  ⟨closest bundled recipe⟩, override ⟨specific fields⟩."
- "**Recipe doing too much** — split into
  ⟨recipe-A⟩ + ⟨recipe-B⟩."
