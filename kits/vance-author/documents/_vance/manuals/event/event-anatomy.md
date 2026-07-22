---
triggers: event yaml, event anatomy, workflow trigger, http endpoint, _vance/events, payload handling, response codes, methods, runAs, event-felder, cascade resolution, hactar spawn
summary: The anatomy of an event document (`_vance/events/<name>.yaml`) that HTTP-triggers a Hactar workflow — top-level fields, payload handling, cascade resolution, and HTTP response codes.
---

# Event Anatomy

An event is a YAML document under
`<project>/_vance/events/<name>.yaml`. The filename stem is the
event's identifier — there is no `name:` field inside the body.
Triggering it means calling
`GET|POST /brain/{tenant}/event/{project}/{event}`, which (after
auth/method checks) spawns one Hactar workflow run.

## Top-level fields

| Field | Required | Notes |
|---|---|---|
| `workflow` | **required** | Name of the workflow to spawn. Resolved through the cascade (project → `_vance`); the workflow must exist when the event fires. |
| `description` | optional | Human-readable summary, surfaced in the Web-UI listing. |
| `enabled` | optional | Defaults to `true`. `enabled: false` returns 404 — existence is not leaked. |
| `methods` | optional | Whitelist of HTTP methods (`GET`, `POST`). Default: both. Other methods rejected by the parser. |
| `auth` | optional | Bearer-token config. Omit for an open endpoint. Map with **exactly one** of `token:` (inline literal) or `tokenSetting:` (setting-cascade key). |
| `params` | optional | Static map merged into the workflow params. Values are deep-passed (string/number/map/list/bool). |
| `runAs` | optional | Identity used for the workflow run's `startedBy`. Defaults to the event document's `createdBy`. |
| `tags` | optional | Free-form labels, audit-only. |

## Minimal example

```yaml
# _vance/events/healthcheck.yaml
workflow: health-ping
```

Calling `GET /brain/acme/event/p1/healthcheck` (or POST) spawns
`health-ping` with no auth and no payload — perfectly fine for a
trivial liveness probe.

## Fully-loaded example

```yaml
# _vance/events/github-pr.yaml
description: "GitHub PR webhook → pr-review"
workflow: pr-review
enabled: true
methods: [POST]
auth:
  tokenSetting: events.github.token
params:
  source: "github"
runAs: ci-bot
tags: [ci, github]
```

## Cascade resolution

Identical to Schedulers and Workflows: the loader looks up
`_vance/events/<name>.yaml` first in the requested project, then in
the tenant's `_vance` project. The classpath resource layer is
**not** consulted — events carry secrets, a bundled-defaults layer
would be a security footgun.

A 404 is what the endpoint returns when **either** the event doesn't
exist **or** it has `enabled: false`. Existence is intentionally not
leaked to unauthenticated callers.

## Payload handling

POST bodies must be `Content-Type: application/json`. The full body
is parsed once and exposed to the spawned workflow under the
reserved key `payload` in the params map:

```json
// POST body:
{ "pr_url": "https://...", "ref": "abc123" }
```

```yaml
# Event has:
params:
  source: "github"
```

```java
// Workflow sees:
{ "source": "github",
  "payload": { "pr_url": "...", "ref": "abc123" } }
```

The workflow reads `params.payload.pr_url`, etc. Static `params:` and
the caller payload never collide because they live under different
keys.

GET calls have no body — `params.payload` is simply absent. Static
params still arrive.

## HTTP response codes

| Status | When |
|---|---|
| `200` | Workflow run was successfully spawned. Body: `{event, workflowName, workflowRunId}`. |
| `401` | Event has `auth:` configured and the bearer is missing or wrong. |
| `404` | Event doesn't exist, is disabled, or the workflow name doesn't resolve. |
| `405` | Event exists but the HTTP method isn't in `methods:`. |
| `415` | POST body has a non-JSON content-type. |
| `400` | POST body is malformed JSON. |
| `502` | Workflow start failed (parameter validation, missing workflow, etc). |
| `503` | Hactar is feature-disabled (`vance.services.hactar=false`), or `tokenSetting:` refers to an empty setting (misconfig). |

## Asynchrony

The HTTP response returns once the workflow run is registered on the
project lane — typically <100ms. The workflow itself continues to run
in the background; the response only carries `workflowRunId`.

Callers needing completion status poll
`GET /brain/{tenant}/project/{project}/workflows/runs/{runId}`. There
is no SSE/long-poll variant for events in v1.
