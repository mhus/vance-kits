# Transition Patterns

How outcomes route to next states. The resolver order is fixed:

1. `nextStateOverride` from the type-executor (only
   `condition_task` sets it).
2. `on:` block — exact outcome-string match.
3. `catch:` block — outcome interpreted as a `HactarErrorKind`
   enum name.
4. No match → run fails with `reason: "no transition for
   outcome '<x>'"`.

Retry preempts all of this: if `retry.on:` contains the
matched error-kind AND `retryCount + 1 < retry.maxAttempts`,
the same state is re-enqueued (with `backoffSeconds`) without
hitting the resolver. Once retries are exhausted the
resolver runs normally.

Bounds preempt enqueue: if `bounds.maxTaskSpawns` or
`maxWallclockSeconds` is exceeded after the just-completed
task, the run fails before the next task lands — even if `on:`
or `catch:` would have routed somewhere.

## Outcome vocabularies per task type

| Task type | Outcomes |
|---|---|
| `condition_task` | `success` (always — the chosen branch goes through `nextStateOverride`); `failure` if no branch matches and no `else:`. |
| `terminal` | `success` / `failure`. No transitions. |
| `tool_task` | `success`, `permission_error`, `technical_error`. |
| `script_task` | `success`, `business_error`, `timeout`, `technical_error`. |
| `agent_task` | `success`, `agent_error`, `technical_error`, `cancelled`. |
| `gate_task` | `approved` / `rejected` (APPROVAL); `<option>` (DECISION); `success` (FEEDBACK); `insufficient_info`, `undecidable`, `timeout`. |
| `timer_task` | `fired`. |
| `workflow_task` | `success`, `failure`. |

Routing for `on:` is a literal string match. So `on: { success: ... }`
catches every type's success outcome; `on: { approved: ... }`
only matches `gate_task` APPROVAL answers.

## `catch:` semantics

Keys must be `HactarErrorKind` enum names, lowercase or
uppercase, dashes or underscores:

```yaml
catch:
  technical_error: retry_state           # canonical
  technical-error: retry_state           # also valid
  TECHNICAL_ERROR: retry_state           # also valid
  permission_error: escalate
  timeout: deadline_reached
  agent_error: human_review
  business_error: debug
  human_rejected: replan                 # alias for rejected outcome routing
  cancelled: cleanup
```

`catch:` runs after `on:`, so:

```yaml
on:
  success: next
  technical_error: ignored               # never fires — outcome doesn't match
catch:
  technical_error: handle                # fires on tool/script/agent technical_error
```

If you want to map a positive outcome and an error-kind to the
same next state, declare both: `on.success` AND `catch.business_error`.

## `condition_task` for fan-out

```yaml
route:
  type: condition_task
  transitions:
    - if: "#state['plan_output']['risk'] == 'low'"
      to: auto_merge
    - if: "#state['plan_output']['risk'] == 'high'"
      to: human_review
    - else: queue_for_qa
```

SpEL context:

- `#state['<key>']` — variables written via `storeAs:`.
- `#params['<key>']` — caller params from `start()`.
- `#tasks['<state>']['output']` — reserved for future use; in
  v1 always empty.

Operators supported: `==`, `!=`, `<`, `<=`, `>`, `>=`, `&&`, `||`,
`!`, `in {…}`, `matches '<regex>'`, ternary `? :`, Elvis `?:`.

Sandbox blocks: `T(...)`-type references, `new ...`-constructors,
method calls outside the whitelist.

A non-boolean expression result triggers a WARN log and is
treated as `false`.

## Retry pattern

```yaml
run_checks:
  type: script_task
  run: "npm test"
  retry:
    maxAttempts: 3                        # total attempts including the first
    on: [technical_error, timeout]
    backoffSeconds: 60
  on:
    success: review
  catch:
    business_error: debug
    technical_error: escalate             # fired AFTER retry budget exhausted
```

`maxAttempts: 3` means: original + 2 retries. After the third
attempt fails with `technical_error`, the resolver runs
`catch.technical_error → escalate`.

Retries don't reset the run-level `bounds.maxTaskSpawns` — each
retry counts as a new task. A loop with retries can chew
through the bound.

## Catch-with-retry pattern

A common idiom: retry transient failures, route persistent ones.

```yaml
flaky_tool:
  type: tool_task
  tool: github.merge_pr
  retry:
    maxAttempts: 3
    on: [technical_error]
    backoffSeconds: 10
  on:
    success: done
  catch:
    permission_error: ask_admin           # never retried — escalates immediately
    technical_error: notify_team          # only fires after retries exhausted
```

`permission_error` doesn't trigger retry (it's not in
`retry.on:`), so it routes through `catch:` on the first
occurrence.

## Escalation via gate

When a workflow can't handle a failure automatically, route into
a `gate_task` that asks a human:

```yaml
build:
  type: script_task
  run: "make build"
  retry:
    maxAttempts: 2
    on: [technical_error, timeout]
  on:
    success: deploy
  catch:
    business_error: ask_human
    technical_error: ask_human

ask_human:
  type: gate_task
  inbox:
    kind: DECISION
    title: "Build failed — what now?"
    options: [retry, skip, abort]
  on:
    retry: build                          # loop back
    skip: deploy
    abort: aborted
```

The `retry → build` transition is a state revisit. The
workflow's `bounds.maxTaskSpawns` keeps an infinite loop in
check.

## "No transition" failure mode

If a task produces an outcome that neither `on:` nor `catch:`
catches, the run fails with:

```
StatusRecord(FAILED, reason="no transition for outcome '<x>'")
```

Common culprits:

- New outcome from a refactored type-executor not in the YAML.
- Typo in `catch.timeout` (should be `catch.timeout:`,
  not `catch.timeouts:`).
- Mixing up `script_task`'s `business_error` and `technical_error`.

The parser doesn't catch this — outcome strings are not part of
the workflow schema. The first run with that outcome will fail
and reveal the gap.
