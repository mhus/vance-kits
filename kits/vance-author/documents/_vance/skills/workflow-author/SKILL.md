---
title: Workflow Author
description: Use when the user is writing or editing a Hactar workflow — states, transitions, gates, timers, sub-workflows
version: "1.0.0"
tags: [vance, workflow, hactar, authoring, meta]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - workflow
      - workflow schreiben
      - workflow erstellen
      - hactar workflow
      - hactar
      - state machine
      - gate task
      - timer task
      - condition task
      - workflow_task
      - workflow yaml
      - retry block
      - bounds block
manualPaths:
  - _vance/manuals/workflow
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing a Hactar workflow — a YAML document under
`<project>/_vance/workflows/<name>.yaml` that defines a project-
scoped automation: a state machine of typed tasks (agent / script /
tool / gate / timer / condition / workflow / terminal) wired by
explicit transitions.

A workflow is **declarative configuration**, not engine code. Most
authoring mistakes come from missing the lifecycle model — every
task fires a `TaskCompletedEvent` with an outcome string, and
transitions resolve in this order: `nextStateOverride` (from
condition_task), then the `on:` block, then the `catch:` block.

## Default protocol

1. **What is the trigger?** Manual, REST/WS call, agent-tool
   spawn (`workflow_start`), or future scheduler/hook. Workflows
   are independent of user sessions — they don't ride on chat.
2. **Sketch the states.** Name them after the work, not the
   transition (`run_checks`, not `after_review`). Identify gates
   (user wait) and externals (script, tool, agent) explicitly.
3. **Pick the task type per state.** See `task-types`. Misfit
   types are the most common source of "workflow stuck" bugs.
4. **Wire transitions with `on:` and `catch:`.** See
   `transition-patterns`. Every non-terminal state must have at
   least one matching transition for the outcomes its executor
   can produce; missing outcomes fail the run.
5. **Add retries and bounds where they matter.** A flaky
   `script_task` gets `retry.on: [technical_error]`. A loop has
   `bounds.maxTaskSpawns:`. See `gate-design` for timeout/inbox
   semantics.
6. **Test the start path.** A workflow that parses but never
   reaches a terminal in a run is still a draft.

## On-demand manuals

- `workflow-anatomy` — top-level YAML fields (name, start,
  parameters, bounds, allowedTools, states), parser rules,
  cascade resolution, frozen-snapshot semantics.
- `task-types` — all eight task types with example YAMLs,
  required fields, async-vs-sync behaviour, output shape per
  type-executor. Load when picking a task type or filling
  type-specific fields.
- `transition-patterns` — how `on:`, `catch:`, `condition_task
  transitions:`, and retry interact; outcome-string vocabulary
  per task type; common patterns (fan-out via condition,
  catch-with-retry, escalation-via-gate). Load when wiring
  states or debugging "no transition for outcome".
- `gate-design` — gate_task specifics: APPROVAL/DECISION/
  FEEDBACK semantics, assignedTo fallback, payload, timeouts
  via `timeoutSeconds` + `catch.timeout:`. Load when adding
  user-in-the-loop steps.

## Hard rules

- **The workflow is not a recipe.** Don't try to embed engine
  configuration in the YAML directly — `agent_task` references
  a recipe by name. The recipe configures the engine; the
  workflow only orchestrates.
- **Every transition target must exist.** The parser validates
  this at load time. Typos in `to:` / `on.success:` /
  `catch.timeout:` fail the resolve, not the run.
- **Don't reuse a state for two things.** If two transitions
  flow into the same state but expect different inputs, split
  the state. Workflow `storeAs:` writes are append-only —
  later writes shadow earlier ones, and that gets confusing
  fast.
- **Outcome strings must match the task type's vocabulary.**
  `script_task` produces `success` / `business_error` /
  `technical_error` / `timeout`. `agent_task` (Jeltz) adds
  `agent_error`. `gate_task` produces `approved` / `rejected`
  / option-names / `insufficient_info` / `undecidable` /
  `timeout`. Routing `on: { fired: ... }` against a non-timer
  state is dead wiring.
- **Bounds protect, they don't escalate.** `bounds.maxTaskSpawns`
  fails the run when exceeded — it doesn't trigger `catch:`.
  Plan for escalation explicitly via state transitions when
  you need graceful degradation.
- **Frozen snapshot.** The full YAML is copied into
  `StartRecord` at spawn. Editing the document mid-run
  doesn't affect the running instance. To roll out a new
  version, start a fresh run.
