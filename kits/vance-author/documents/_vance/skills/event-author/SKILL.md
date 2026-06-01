---
title: Event Author
description: Use when the user is writing or editing an event — REST-triggered Hactar workflow spawn under _vance/events/<name>.yaml
version: "1.0.0"
tags: [vance, event, hactar, authoring, meta]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - event
      - event schreiben
      - event erstellen
      - rest trigger
      - webhook
      - workflow trigger
      - external trigger
      - bearer token
      - event yaml
manualPaths:
  - manuals/event
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing an event — a YAML document under
`<project>/_vance/events/<name>.yaml` that exposes a REST endpoint
(`GET|POST /brain/{tenant}/event/{project}/{event}`) which, when
called, spawns a Hactar workflow run. Events are the third trigger
pathway alongside Scheduler (time-based) and Hooks (in-process); they
are how the outside world (webhooks, IoT, CI, `curl`) reaches into
Vance.

Events are intentionally **thin**: they don't carry workflow logic.
They authenticate the caller, accept a payload, and call
`HactarWorkflowService.start(...)`. All real behaviour lives in the
spawned workflow.

## Default protocol

1. **Which workflow does this trigger?** The event needs one workflow
   name. That workflow must exist in the same cascade (project or
   `_vance`). Verify it before writing the event.
2. **Who calls this endpoint?** That decides auth:
   - Internal scripts only → maybe no auth.
   - External provider (GitHub, Stripe, IoT device, sensor) → bearer
     token. Prefer `tokenSetting:` over inline `token:` so secrets
     live in settings, not in the document.
3. **What methods does the source send?** GitHub-style webhooks only
   send POST. A manual `curl`-ping might be GET. Default is "both" —
   restrict via `methods:` when the source is well-defined.
4. **Does the workflow need the payload?** If yes, design the workflow
   to read `params.payload.<field>`. The whole POST body lands there as-is.
5. **runAs?** Defaults to the event's `createdBy`. Override only when
   you want a specific identity in the workflow's audit trail.

## On-demand manuals

- `event-anatomy` — top-level YAML fields, cascade resolution,
  payload semantics, HTTP error codes. Load when starting a new event.
- `event-auth` — bearer token via inline literal vs. setting-cascade,
  `MessageDigest.isEqual` constant-time check, why bearer is enough
  for v1 and what's deliberately *not* there (signature validation,
  rate limiting, replay protection). Load when picking the auth model.
- `event-webhook-patterns` — concrete recipes for common sources
  (GitHub PR webhook, Stripe events, a `curl`-driven manual trigger,
  an IoT sensor push). Load when adapting a known external provider.

## Hard rules

- **The event is not a workflow.** Don't put condition logic in the
  event YAML; route it into the workflow. The event is a thin
  trigger.
- **Exactly one workflow per event.** Multiple workflows in one
  endpoint = ambiguity. Author multiple events instead.
- **`auth.token` and `auth.tokenSetting` are mutually exclusive.**
  Set at most one. The loader rejects both.
- **`methods:` is restricted to `GET` and `POST` v1.** PUT/DELETE have
  no meaning for a one-shot trigger and are rejected by the parser.
- **POST bodies must be `application/json`.** Other content-types get
  415. Empty bodies are fine and produce no `params.payload` entry.
- **`tokenSetting` with an empty setting → 503.** The endpoint refuses
  rather than silently auth-bypass. When setting up a new event with
  `tokenSetting:`, the setting needs a value before the endpoint goes live.
- **Events are openly callable until you add `auth:`.** No global
  rate-limit, no IP allow-list, no replay protection. If the workflow
  has side effects (sends mail, calls APIs, costs money), the event
  needs a bearer token — operator responsibility.
- **The event spawns the workflow async-ish: the HTTP response carries
  `workflowRunId`** but the run itself executes on the project lane.
  Don't promise the caller "the workflow has finished" — they need to
  poll `GET /brain/.../workflows/runs/{runId}` if they care.
