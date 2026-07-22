---
triggers: engine auswählen, engine cheatsheet, arthur ford marvin vogon, eddie zaphod hactar, slartibartfast trillian, engine vs recipe, reactive chat, single-shot worker, task tree, parallel fan-out, welche engine, deterministische pipeline
summary: How to pick the right Vance engine (arthur/ford/marvin/vogon/eddie/slartibartfast/trillian/hactar/zaphod) for a recipe, what each does, when it fits and when not, and the engine-vs-recipe-vs-process distinction.
---

# Engine Cheatsheet — pick first, configure second

A recipe is bound to one engine. The engine determines the
shape of work the process does — chat vs. plan-and-decompose
vs. single-shot worker vs. parallel fan-out. Get the engine
wrong and no amount of `promptPrefix` saves the recipe.

The Adams-character names are mnemonics; the table is
authoritative.

## The engines

### `arthur` — reactive chat orchestrator

- **Adams:** Arthur Dent — reacts to what's around him,
  delegates chaotically.
- **What it does:** main session-chat orchestrator. Talks to
  the user, delegates real work to worker-recipes via
  `process_create`. The recommended path is to **name the
  recipe explicitly** (`recipe: "analyze"` or similar) — the
  selector-routed mode without a recipe param now only fires
  on trigger keywords (engine name / recipe name / declared
  `triggers.keywords` in the goal text) and otherwise falls
  back to the tenant default (`routing.fallback.recipe`,
  default `hactar`). Synthesises results back into the
  conversation.
- **Pick when:** you need a conversational top-level entry
  point. Default for `engine: arthur` recipes.
- **Won't fit when:** the work isn't conversational; you have
  a structured pipeline (use marvin or vogon).
- **Key params:** `model`, `manualPaths`, `fallbackModels`,
  `maxIterations` (turn budget), `defaultActiveSkills`,
  `allowedSkills`.
- **Promptprefix focus:** how arthur should *be* — tone,
  domain, when to delegate vs. when to answer.

### `ford` — single-shot worker

- **Adams:** Ford Prefect — generalist, writes guidebooks.
- **What it does:** receives a `workerInput` (text +
  optional structured payload), produces a reply. Optionally
  produces structured `outputSchema`-validated JSON.
- **Pick when:** you have a clear input-output contract; one
  turn (or few turns) of work.
- **Won't fit when:** the work needs to plan and decompose
  (marvin); the work is multi-phase deterministic (vogon).
- **Key params:** `model`, `manualPaths`, `validation`
  (whether the engine validates / fixes the LLM output
  format), `outputSchema`, `postActions`.
- **Promptprefix focus:** what to do with the input; what
  output shape; what to read first if needed.

### `marvin` — deep-think with task tree

- **Adams:** Marvin — depressed deep thinking, decomposes
  tasks.
- **What it does:** receives a top-level goal, produces a
  PLAN node, expands into a DAG of sub-tasks (PLAN /
  WORKER / EXPAND_FROM_DOC / AGGREGATE), executes via DFS
  with status aggregation. The plan grows dynamically;
  Marvin can add nodes mid-execution.
- **Pick when:** the work has unknown structure ahead of
  time — research, multi-step writing, decomposable
  problems.
- **Won't fit when:** the work has a fixed phase structure
  (vogon); the work is one-shot (ford); you need
  conversation (arthur).
- **Key params:** `rootTaskKind`, `manualPaths`,
  `allowedSubTaskRecipes`, `allowedExpandDocumentRefPaths`,
  `requiredChildTemplateRecipeParams`, `recipesOnlyViaExpand`,
  `disallowedTaskKinds`.
- **Promptprefix focus:** how to plan; what tasks
  decompose into; what shape AGGREGATE outputs.

### `vogon` — strict pipeline with phases

- **Adams:** Vogons — bureaucratic, follow the strict plan.
- **What it does:** runs a deterministic strategy: ordered
  phases with gates between them, optional loops with stop
  conditions, optional forks based on validator score.
  Worker phases generate structured output;
  engine-controlled `postActions` persist files / spawn
  subprocesses deterministically.
- **Pick when:** the work has a fixed sequence; you need
  loop-with-quality-gate (lector pattern); you need
  branching by validator score.
- **Won't fit when:** the structure isn't known upfront
  (marvin); a single shot is enough (ford).
- **Key params:** `phases`, `gates`, `loops`,
  `postActions`, `outputSchema` per phase,
  `maxOutputCorrections`, `until.requiresAny`.
- **Promptprefix focus:** the worker's role per phase
  (recipes are usually multiple — one per phase, set up
  via `engine: vogon`).

### `eddie` — moderator / hub

- **Adams:** Eddie — friendly hub for everything.
- **What it does:** moderation + delegation hub. Sits
  between the user and worker-processes (similar to
  arthur), but specialised on Voice-First channels and
  output-triage (verbatim vs. reformulate vs. inbox).
- **Pick when:** voice-first session; multi-channel output;
  Eddie-style moderator pattern.
- **Won't fit when:** plain text chat (arthur is simpler).
- **Key params:** Eddie-specific (channel-adapter config,
  voice-mode flag, …) — see `specification/eddie-engine.md`.

### `slartibartfast` — design phase

- **Adams:** Slartibartfast — designs with care.
- **What it does:** GATHERING / DECOMPOSING / PROPOSING /
  VALIDATING phases for *generating* recipes / strategies
  itself. A meta-engine: produces the recipes that other
  engines run.
- **Pick when:** the user has a goal but no recipe yet;
  one-off explorative pipelines.
- **Won't fit when:** the recipe exists; use the runtime
  engine directly.

### `trillian` — observer / goal-keeper

- **Adams:** Trillian — rational observer.
- **What it does:** monitors a long-running session,
  surfaces drift from goals, reminds the orchestrator if
  attention has wandered.
- **Pick when:** sessions that need goal anchoring across
  many turns. Often paired with arthur.
- **Pick *not* when:** simple sessions don't need a
  separate observer.

### `hactar` — script-architect (default fallback)

- **Adams:** Hactar — generates code to solve problems.
- **What it does:** drafts a JavaScript orchestrator script
  (one IIFE) for a free-text goal, parse-validates it,
  recovers on syntax errors up to `maxRecoveries`, returns
  the accepted script as a fenced code block.
- **Pick when:** the user goal is open-ended and benefits
  from an automation script; also the default value of
  `routing.fallback.recipe` (used when `process_create` is
  called in selector-routed mode and no trigger fires).
- **Won't fit when:** the user wants a written reply (use
  ford / arthur); the work is conversational; the goal
  needs a structured pipeline (vogon / marvin).
- **Key params:** `maxRecoveries`, `executeOnDone`,
  `promptDocument`.

### `zaphod` — parallel fan-out

- **Adams:** Zaphod Beeblebrox — multiple heads, parallel
  thinking.
- **What it does:** spawns N parallel worker-processes on
  variations of the same input; aggregates results.
- **Pick when:** "try N approaches and pick best" pattern;
  council-style multi-perspective work.
- **Won't fit when:** the work is sequential (use marvin
  or vogon).

## How to pick the engine

Walk down:

1. **Is this a conversational session with a user?** → arthur.
2. **Is it a single LLM call producing structured output?**
   → ford.
3. **Is the structure of work unknown — needs to plan as it
   goes?** → marvin.
4. **Is there a fixed pipeline of phases with gates /
   loops?** → vogon.
5. **Is this a voice-first session with multi-channel
   output?** → eddie.
6. **Are you generating a recipe / strategy itself?** →
   slartibartfast.
7. **Are you trying N approaches in parallel?** → zaphod.
8. **Are you watching a session for goal-drift?** →
   trillian.
9. **Open-ended goal best handled by a generated script?**
   → hactar. (Also the default fallback for trigger-less
   selector-routed spawns.)

If multiple match, the recipe is probably doing too much
— split into multiple recipes spawning each other.

## Engine vs. recipe vs. process

- **Engine** is Java code (`ArthurEngine`, `FordEngine`,
  …). Few of them; structural.
- **Recipe** is a YAML configuration of an engine. Many
  recipes per engine.
- **Process** is a running instance of a recipe (an
  engine + params + state). Many processes per recipe.

Don't conflate. A "new agent type" is usually a new recipe,
not a new engine.

## Anti-patterns

### Choosing engine by familiarity

"Use arthur because we know arthur." Then promptPrefix
fights to make arthur do worker-style structured output.
Pick the engine for the work.

### Mixing engine paradigms in promptPrefix

Promptprefix that says "decompose this into subtasks" — but
the engine is `ford`. Ford doesn't decompose. The instruction
fails or produces gibberish. Either pick marvin, or
restructure the request.

### Marvin for everything

Marvin is powerful; marvin is also expensive (tokens, plan
correction loops). Use marvin when the structure is
genuinely unknown; use ford for one-shot worker steps within
a marvin tree.

### Vogon for fluid pipelines

Vogon's strength is *strict* phases with deterministic
post-actions. If the pipeline is fluid and depends on
runtime decisions, vogon's phase-gates fight you.

## Output line

- "**Engine:** ⟨name⟩. **Reason:** ⟨specific match⟩."
- "**Engine choice unclear** — surface ⟨specific aspect⟩
  first."
- "**Engine wrong for this work** — switch to ⟨name⟩
  before continuing."
