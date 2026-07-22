---
triggers: task types, agent_task, script_task, tool_task, gate_task, timer_task, condition_task, workflow_task, terminal, task outcomes, sync vs async, workflow zustände
summary: The eight Hactar workflow task types (agent/script/tool/gate/timer/condition/workflow/terminal) — their YAML shape, output, outcome vocabulary, and the sync-vs-async execution cheat-sheet.
---

# Task Types

Eight task types, all sharing the uniform lifecycle: every task
emits a `TaskCompletedEvent` with an outcome string. The outcome
strings each type can produce are listed under "Outcomes". Routing
those outcomes is `transition-patterns`.

## agent_task

Spawn a ThinkProcess via a recipe (Jeltz, Ford, Vogon, Marvin,
Arthur) and wait for its terminal status.

```yaml
plan:
  type: agent_task
  recipe: jeltz                          # required
  params:                                # → ThinkProcess.engineParams
    prompt: "Analyse the PR ..."
    schema: { ... }                      # Jeltz-specific
  storeAs: plan_output
  timeoutSeconds: 600
  on:
    success: run_checks
  catch:
    agent_error: human_review
    technical_error: escalate
```

Output (when `storeAs` is set):

- **Jeltz**: parsed `data` block from the wrapper if `success:true`,
  else the `lastInvalid` payload (and outcome is `agent_error`).
- **Ford/Vogon/Marvin**: the last assistant message text as a
  JSON string.

Outcomes: `success`, `agent_error`, `technical_error`, `cancelled`.

Async — completion arrives through `HactarThinkProcessCompletionListener`.

## script_task

Run a shell command via the existing `ExecManager`. Same path,
same registry, same watchdog as the `exec_run` agent tool.

```yaml
run_checks:
  type: script_task
  run: "npm test && npm run lint"
  dirName: build                          # workspace RootDir name
  timeoutSeconds: 1800
  on:
    success: review
  catch:
    business_error: debug
    technical_error: escalate
```

Output: `{ status, exitCode, stdout, stderr, durationMs, execJobId }`.

Outcomes:

| ExecJob status | exit | outcome |
|---|---|---|
| COMPLETED | 0 | `success` |
| COMPLETED | ≠0 | `business_error` |
| KILLED | — | `timeout` |
| RUNNING (waitMs out) | — | `timeout` |
| FAILED / ORPHANED | — | `technical_error` |

## tool_task

Invoke a registered tool directly — same dispatch surface the
agent uses. Useful for one-off calls without spawning an engine.

```yaml
merge:
  type: tool_task
  tool: github.merge_pr
  params:
    url: "${params.pr_url}"
  storeAs: merge_result
  on:
    success: done
  catch:
    permission_error: escalate
    technical_error: retry_or_abort
```

Output: the tool's result map.

Outcomes: `success`, `permission_error` (PermissionDeniedException),
`technical_error` (ToolException or any other).

The tool runs with the workflow's identity:
`tenantId/projectId/userId=startedBy`. `sessionId` and
`processId` are `null` — tools that require them must validate
defensively.

## gate_task

Pause the workflow on a user-Inbox item. See `gate-design` for
the full spec.

```yaml
review:
  type: gate_task
  inbox:
    kind: APPROVAL                       # APPROVAL | DECISION | FEEDBACK
    title: "PR ready?"
    body: "${state.review_summary}"
    assignedTo: "@maintainers"
    criticality: NORMAL
    tags: [pr]
    options: [approve, reject, defer]    # for DECISION
  timeoutSeconds: 604800                  # optional; schedules timeout-timer
  on:
    approved: merge
    rejected: plan
  catch:
    timeout: escalate
```

Outcomes (driven by the user's answer + kind):

- APPROVAL: `approved` / `rejected`
- DECISION: the chosen option string
- FEEDBACK: `success` (text in output)
- Any kind: `insufficient_info`, `undecidable`, `timeout` (from timer)

Async — completion via `HactarInboxCompletionListener`.

## timer_task

Wait for a duration, then advance.

```yaml
wait_for_feedback:
  type: timer_task
  duration: "7d"                          # ISO-8601 (P7D) or shortcut
  on:
    fired: send_reminder
```

Duration syntax: ISO-8601 (`P7D`, `PT5M30S`) or shortcuts
(`7d`, `4h`, `30m`, `45s`, `250ms`).

Outcome: `fired` (always — timers don't fail).

Async — fires via `HactarTimerScanner` (5s scan window).

## condition_task

Pure-logic fan-out. SpEL expressions against `#state` / `#params` /
`#tasks`.

```yaml
route_by_risk:
  type: condition_task
  transitions:
    - if: "#state['plan_output']['risk'] == 'low'"
      to: merge
    - if: "#state['plan_output']['risk'] == 'high'"
      to: human_review
    - else: debug
```

Rules:

- Entries evaluate in order; first match wins.
- `else:` is the catch-all and must appear last (parser
  enforces).
- No `else` and no match → outcome `failure`, run falls into
  `catch:` (or fails the run if there's no catch).

Synchronous — runs in the project lane.

## workflow_task

Spawn another workflow as a sub-run, wait for its terminal,
capture its result.

```yaml
build_subprojects:
  type: workflow_task
  workflow: build-and-test                # name of another workflow
  params:
    repo_url: "${state.repo_url}"
  storeAs: build_result
  timeoutSeconds: 3600
  on:
    success: deploy
  catch:
    failure: escalate
```

Output: the sub-run's `result:` payload from its terminal
state.

Outcomes: `success` (sub-run reached DONE), `failure` (FAILED /
TERMINATED). Async — completion via
`HactarSubWorkflowCompletionListener`.

The parent's `workflowRunId` and the calling state name are
written into the sub-run's `StartRecord` for audit — full
parent-chain visible in the journal.

## terminal

Workflow endpoint. No transitions.

```yaml
done:
  type: terminal
  outcome: success                        # success | failure (default success)
  result:                                 # optional payload
    summary: "${state.review_summary}"
    branch: paid
```

Writes:
- `StatusRecord(DONE)` if outcome is `success`, else
  `StatusRecord(FAILED)`.
- `ResultRecord(state, result)` if `result:` is set.
- For sub-workflows: triggers `WorkflowCompletedEvent` which
  advances the parent's `workflow_task`.

Multiple terminal states are fine — name them after the branch
(`done`, `merged`, `escalated`, `aborted`).

## Sync vs. async cheat-sheet

| Type | Sync (lane thread) | Async (listener) |
|---|---|---|
| `condition_task` | ✓ | |
| `tool_task` | ✓ | |
| `script_task` | ✓ (blocks lane until `timeoutSeconds`) | |
| `terminal` | ✓ | |
| `agent_task` | | ✓ |
| `gate_task` | | ✓ |
| `timer_task` | | ✓ |
| `workflow_task` | | ✓ |

Async tasks set `runStatus = WAITING_*` while waiting; the
reclaim-scanner only re-runs tasks with `runStatus = null`, so
waiting tasks survive pod-restart unmolested.
