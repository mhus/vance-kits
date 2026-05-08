---
title: Recipe Author
description: Use when the user is writing or editing a Vance recipe — engine choice, params, promptPrefix, tool whitelist
version: "1.0.0"
tags: [vance, recipe, authoring, meta]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - recipe
      - rezept
      - recipe authoring
      - recipe schreiben
      - recipe erstellen
      - neues recipe
      - recipe.yaml
      - promptprefix
      - promptprefixsmall
      - allowedtools
      - allowedskills
      - defaultactiveskills
      - engine wählen
      - engine choose
manualPaths:
  - manuals/recipe
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing a recipe — a YAML file under
`<project>/recipes/<name>.yaml` (or `_vance/` / classpath:
`vance-defaults/recipes/`) that configures how a process behaves:
which engine, which model, what prompt, which tools, which
skills.

A recipe is a **configuration**, not code. Most authoring
problems come from misunderstanding the engine model rather
than YAML syntax — surface engine-fit before debating fields.

## Default protocol

1. **What's the use case?** Chat orchestration, deep-think with
   subtask-tree, single-shot worker, reactive helper. The
   answer picks the engine.
2. **Pick the engine.** Recipe is engine-bound; pick first.
   See `engine-cheatsheet`.
3. **Set the model + size variant.** `params.model` references
   an alias (`default:fast`, `default:analyze`); `promptPrefix`
   for big models, optional `promptPrefixSmall` for haiku/flash
   tier.
4. **Define the prompt.** What persona / behaviour does the
   process embody? Distinguish what the *engine* needs (its
   structural prompt) from what the *recipe* adds.
5. **Tool / skill scoping.** Default + add + remove. Tighter
   scoping = more deterministic behaviour, narrower
   capability.
6. **Validate by spawn.** A recipe that looks right but never
   gets spawned in test is still a draft.

## On-demand manuals

- `engine-cheatsheet` — what each engine does, when to pick
  it, what it expects in `params` and `promptPrefix`. Covers
  arthur, ford, marvin, vogon, eddie, slartibartfast,
  trillian, zaphod. Load when the engine choice is open.
- `params-reference` — the params keys that work across
  engines (`model`, `manualPaths`, `validation`,
  `maxIterations`, `modelSize`, `fallbackModels`) and the
  engine-specific ones. Load when the user has a recipe
  shape and is filling in params.
- `recipe-patterns` — recurring recipe shapes (chat
  orchestrator, worker with structured output, lector loop,
  worker-with-postActions). Load when the user is starting
  fresh and wants a template.

## Hard rules

- **The recipe is engine-bound.** You can't switch engine
  later by editing one field — engines have different
  contracts. If the engine choice is wrong, draft a new
  recipe.
- **Prompt isn't free space for instructions.** Engines have
  structural prompts that frame the LLM's behaviour;
  `promptPrefix` adds personality / domain. Don't try to
  re-educate the engine via prose; if the recipe's prompt is
  fighting the engine, you picked the wrong engine.
- **Don't hard-code model names.** Use aliases
  (`default:fast`, `default:analyze`). Tenants override
  alias-to-model mappings via settings. Hard-coding breaks
  tenant configuration.
- **Don't widen tool scope without reason.** Each tool added
  to a recipe is more surface for the LLM to misuse.
  `allowedToolsAdd` should be the minimum needed; broader
  bundles via `@`-selectors only when the use case actually
  needs them.
- **Don't stack `defaultActiveSkills` thoughtlessly.** Every
  skill in the list adds prompt content at every turn.
  Prefer triggers (skill activates by keyword) over
  default-active.
- **Don't share `promptPrefix` across recipes.** If two
  recipes have the same prefix, they should be the same
  recipe. Variation by params is fine; variation by
  paragraph isn't.
