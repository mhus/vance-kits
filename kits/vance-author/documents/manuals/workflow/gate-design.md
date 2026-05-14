# Gate Design

A `gate_task` parks the workflow on an Inbox-Item until a user
answers (or the optional `timeoutSeconds` fires). It's the
human-in-the-loop primitive — every approval, decision, free-form
feedback step uses it.

## Anatomy

```yaml
review:
  type: gate_task
  inbox:
    kind: APPROVAL                # APPROVAL | DECISION | FEEDBACK
    title: "PR ${params.pr_url} ready to merge?"
    body: "${state.review_summary}"
    assignedTo: "@maintainers"
    criticality: NORMAL           # LOW | NORMAL | CRITICAL
    tags: [pr-review]
    options: [approve, reject, defer]   # DECISION only
  timeoutSeconds: 604800                # optional: 7-day timeout
  storeAs: review_decision
  on:
    approved: merge
    rejected: plan
  catch:
    timeout: escalate
```

The `inbox:` block is required. Inside it, `title:` and `kind:`
are required; everything else has sensible defaults.

## The three kinds

### APPROVAL

Binary yes/no. The user's reply contains `value.approved: bool`.

```yaml
inbox: { kind: APPROVAL, title: "Proceed?" }
on:
  approved: next
  rejected: stop
```

Outcomes the listener produces:

- `approved` when `value.approved == true`
- `rejected` when `value.approved == false`
- Defaulting: a DECIDED answer with no `approved` boolean is
  treated as `approved` (lenient — avoids wedging the run on
  malformed UI payloads).

### DECISION

Multi-option choice. The user picks one of `options:`.

```yaml
inbox:
  kind: DECISION
  title: "Pick a path"
  options: [retry, skip, abort]
on:
  retry: build
  skip: deploy
  abort: aborted
```

Outcome is the chosen option string verbatim. **Every option
must be wired** — an unmatched option means "no transition" →
run fails.

### FEEDBACK

Free-form text. The user writes `value.text`.

```yaml
inbox:
  kind: FEEDBACK
  title: "Anything to add?"
storeAs: feedback
on:
  success: continue
```

Outcome is always `success` (the user provided some text).
`value.text` lands in the workflow variable via `storeAs:`.

## assignedTo fallback chain

```
state.inbox.assignedTo (if set)
  ↓
context.startedBy (the user/system who called start())
  ↓
"@system"
```

Common patterns:

- `assignedTo: "@maintainers"` — group routing (your inbox UI
  decides how to expand `@`-prefixed handles).
- `assignedTo: "${params.reviewer}"` — caller specifies on start.
- Omit `assignedTo:` — falls back to the run starter. Sensible
  for self-service workflows ("user starts a flow, gets back
  prompts only for themselves").

## Criticality

`LOW` / `NORMAL` (default) / `CRITICAL`. Drives the Inbox UI's
ordering / styling — no behavioural effect inside Hactar. Use
`CRITICAL` sparingly (deploy-to-prod approvals, irreversible
destructive actions); over-using it breaks the signal.

## Timeouts

```yaml
review:
  type: gate_task
  inbox: { kind: APPROVAL, title: "..." }
  timeoutSeconds: 604800              # 7 days
  catch:
    timeout: escalate
```

When `timeoutSeconds:` is set the executor schedules a parallel
timer (in `hactar_timers`) that publishes a
`TaskCompletedEvent(outcome=timeout)` at the deadline. Two race
paths can complete the gate:

- **User answers first** — `HactarInboxCompletionListener` fires
  the event with the answer's outcome. The timer's later fire
  is silently dropped by the `appendIfAbsent` idempotency on
  `TaskResultRecord`.
- **Timer fires first** — the gate completes with `timeout`. A
  subsequent user answer is accepted by the Inbox UI but the
  workflow doesn't react (run already advanced).

Route the `timeout` outcome via `catch.timeout:` (the common
choice) or, for a custom escalation outcome, via `on:` if you
want it positively-named.

## Payload structure

The InboxItem the executor creates carries a structured payload
the UI can inspect:

```json
{
  "kind": "workflow.gate",
  "workflowRunId": "<runId>",
  "workflowName": "<name>",
  "workflowState": "review",
  "options": ["approve", "reject", "defer"]
}
```

`payload.kind = "workflow.gate"` is the discriminator the
`HactarInboxCompletionListener` keys on — Items without it are
ignored, even when their `originatorUserId` matches.

## Pitfalls

- **Forgetting the catch.timeout.** Setting `timeoutSeconds:`
  without a matching `catch.timeout:` (or `on.timeout:`) means
  the run fails with "no transition for outcome 'timeout'"
  when the timer fires.
- **assignedTo with a non-existent handle.** The InboxItem
  lands but no one sees it; the gate hangs until the timeout
  fires (or forever if there's no timeout). Validate the
  handle at workflow-author time.
- **DECISION options vs. on: keys.** Each option in `options:`
  must have a matching key in `on:`. The loader doesn't
  validate this (it doesn't know what options the user will
  choose) — first unmapped option fails the run.
- **Multiple gates in the same run.** Each gate's
  `payload.workflowState` is unique per state name, not per
  invocation. If a state is revisited (e.g. via retry or
  catch-loop), the second gate gets a fresh InboxItem. The
  earlier item's answer routes to whichever gate task is
  currently waiting.
- **storeAs and binary kinds.** APPROVAL produces
  `{approved: bool}` — `#state['review_decision']['approved']`
  works in subsequent conditions. DECISION produces
  `{chosen: "<option>"}` — `#state['review_decision']['chosen']`.
  FEEDBACK produces `{text: "..."}`.
- **insufficient_info / undecidable.** The user's Inbox UI can
  reply with `AnswerOutcome.INSUFFICIENT_INFO` or
  `UNDECIDABLE` instead of a DECIDED answer. Map those via
  `catch:` if you want a defined route — otherwise the run
  fails with "no transition".

## Auto-default for LOW criticality (future)

Plan §2.3 of vogon-engine mentions auto-applying `payload.default`
for `criticality: LOW` gates without user interaction. Hactar
doesn't implement this in v1 — every gate waits for a real
answer or timeout. Don't put `default:` keys under `inbox:`
expecting them to fire.
