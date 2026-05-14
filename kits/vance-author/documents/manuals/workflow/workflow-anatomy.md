# Workflow Anatomy

A Hactar workflow is a YAML document under
`<project>/_vance/workflows/<name>.yaml`. The filename's stem is the
workflow's identifier — the `name:` field inside the body is
informational only and isn't used by the resolver.

## Top-level fields

| Field | Required | Notes |
|---|---|---|
| `description` | optional | Human-readable summary, surfaced in the Web-UI listing. |
| `version` | optional | Free-form string. Audit-only — used in `StartRecord.workflowVersion`, not the resolver. |
| `start` | **required** | Name of the initial state. Must appear as a key in `states:`. |
| `parameters` | optional | Map of caller-param specs. See "Parameters" below. |
| `bounds` | optional | Global guardrails per run (`maxWallclockSeconds`, `maxTaskSpawns`, `maxTotalCostUsd`). |
| `allowedTools` | optional | Workflow-level tool-permission whitelist. Intersected with project + tenant pools. |
| `tags` | optional | Free-form labels, audit-only. |
| `states` | **required** | Map of state-name → state-spec. At least one state required, must include `start`. |

## States

Each entry under `states:` is a map keyed by the state name. The
state's required field is `type:` (one of `agent_task`,
`script_task`, `tool_task`, `gate_task`, `timer_task`,
`condition_task`, `workflow_task`, `terminal`). All other fields
depend on the type — see `task-types`.

Shared lifecycle fields available on any non-terminal state:

| Field | Notes |
|---|---|
| `description` | Audit string. |
| `timeoutSeconds` | Task-level timeout. `script_task` uses it as `waitMs`. `gate_task` schedules a timeout-timer with `firedOutcome=timeout`. |
| `storeAs` | When set and the task produces a non-null output, an entry is appended to the run's variable map under this key. |
| `on:` | Map of outcome → next-state. The transition resolver tries this first. |
| `catch:` | Map of error-kind → next-state. Resolved after `on:`. Keys must match `HactarErrorKind` enum names (case-insensitive, dashes → underscores). |
| `retry:` | Spec with `maxAttempts`, `on: [error-kinds]`, `backoffSeconds`. State-level retries on matching error-kinds, distinct from claim-level retries (pod reclaims). |

## Parameters

```yaml
parameters:
  pr_url:
    type: string
    required: true
  reviewer:
    type: string
    default: "@maintainers"
```

Validation happens at `start()` time:

- Required params without a caller value fail the start.
- Optional params with `default:` get filled in.
- Caller-supplied params not in the schema **pass through** —
  the parser is permissive on top, strict only on declared
  required fields. Useful when the workflow needs to carry
  context fields the YAML doesn't bother listing.

Inside the workflow, parameters are read via SpEL as
`#params['<key>']` (see `transition-patterns`).

## Bounds

```yaml
bounds:
  maxWallclockSeconds: 604800   # 7 days
  maxTaskSpawns: 100
  maxTotalCostUsd: 5.0          # reserved (LLM-cost integration)
```

The bounds check runs **after every task completion** and
**before** the next task is enqueued. If a bound is exceeded the
run fails with a `StatusRecord(FAILED)` whose `reason:` cites the
violated bound. Bounds don't route through `catch:` — they're a
hard stop.

## allowedTools

```yaml
allowedTools:
  - github.merge_pr
  - web_search
```

Three-layer permission cascade — Tenant → Project → Workflow,
all AND-combined. The workflow can only **narrow** the project
pool, never widen it. Tools used by `tool_task` and indirectly
by `agent_task`-spawned engines respect this list.

## Cascade resolution

Workflow lookup at `start()` time:

```
project/_vance/workflows/<name>.yaml    (project-local override)
  ↓ falls back to
_vance/_vance/workflows/<name>.yaml     (tenant-wide)
  ↓ falls back to
UnknownWorkflowException
```

There is **no resource (classpath) tier** for workflows —
workflows are always project- or tenant-specific. Bundled
workflows live in kits (see `specification/kits.md`).

## Frozen snapshot

At `start()` the resolver loads the YAML and the loader parses
it. The verbatim YAML body is copied into the run's
`StartRecord.definitionYaml`. Every subsequent task execution
re-parses from that frozen snapshot — **edits to the source
document don't affect the running instance**.

This matters for:

- **Long-running workflows** — a 7-day gate doesn't react to
  YAML changes made on day 3.
- **Bug-fix rollouts** — fixing a workflow doesn't fix
  in-flight runs. Cancel and restart, or build forward
  compatibility into the new version.
- **Audit** — `StartRecord.definitionYaml` is the authoritative
  record of "what this run executed", even if the source doc
  has been deleted or rewritten.

## Validation rules (loader)

The parser fails fast on:

- Missing `start`.
- `start:` not in `states:`.
- Empty `states:`.
- Unknown task type (`type:` outside the eight valid values).
- `on:`/`catch:` target not in `states:`.
- Unknown error-kind in `catch:` or `retry.on:`.
- `condition_task` `transitions:` with entries after `else:`.
- `transitions:` set on a non-`condition_task` state.
- `retry.maxAttempts < 1` or `retry.backoffSeconds < 0`.

The parser is permissive on type-specific spec fields (e.g.
`recipe:` on `agent_task`, `run:` on `script_task`) — those are
validated by the type-executor at run time.

## YAML 1.2 booleans

Hactar's loader uses a custom resolver that interprets booleans
per **YAML 1.2** — only `true`/`false` are coerced. The bareword
`on:` stays a string, which is what makes the `on:` transition
block work. (YAML 1.1 would silently rewrite `on:` to
`Boolean.TRUE` and break every transition.)
