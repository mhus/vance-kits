---
triggers: webhook patterns, github pr webhook, stripe webhook, curl trigger, iot sensor push, externer cron, offener endpoint, X-Hub-Signature, signature verifier, event beispiele, methods POST, kit-export token
summary: Concrete recipes for wiring external sources (GitHub, Stripe, curl, IoT, external cron, open endpoint) to Vance events, with the matching workflow shape, auth choice, and source-specific caveats.
---

# Event Webhook Patterns

Concrete recipes for connecting common external sources to Vance via
events. Each pattern names the matching workflow shape, the auth
choice, and any caveats specific to the source.

## 1. GitHub Pull-Request webhook

```yaml
# _vance/events/github-pr.yaml
description: "GitHub PR webhook → pr-review workflow"
workflow: pr-review
methods: [POST]
auth:
  tokenSetting: events.github.token
runAs: ci-bot
tags: [ci, github]
```

**GitHub setup:** Repository → Settings → Webhooks → Add webhook.

- URL: `https://<brain-host>/brain/<tenant>/event/<project>/github-pr`
- Content type: `application/json`
- Secret: the same value as the `events.github.token` setting

GitHub also sends an `X-Hub-Signature-256` header containing
`hmac-sha256(secret, body)`. **The event endpoint does not validate
this signature** — only the bearer token. The bearer-only path is
acceptable for low-stakes automations (issue/PR routing). For
production-grade webhook security, run a thin Go/Node verifier in
front of the event endpoint that:

1. Validates `X-Hub-Signature-256` against the original body.
2. Forwards to the Vance event endpoint with `Authorization: Bearer
   <token>` and the original body.

Vance doesn't ship that verifier in v1.

**Workflow shape:** The `pr-review` workflow reads
`params.payload.action` (`opened`, `synchronize`, …) and
`params.payload.pull_request.html_url` to decide what to do. Most
GitHub events get rejected early via a `condition_task` —
`pr-review` only continues for `action: opened` or `synchronize`.

## 2. Stripe events

```yaml
# _vance/events/stripe-checkout.yaml
description: "Stripe checkout.session.completed → fulfill-order"
workflow: fulfill-order
methods: [POST]
auth:
  tokenSetting: events.stripe.token
```

**Stripe setup:** Dashboard → Developers → Webhooks → Add endpoint.

- Endpoint URL: `https://<brain-host>/brain/<tenant>/event/<project>/stripe-checkout`
- Listen to: `checkout.session.completed`
- Stripe will send its body with a `Stripe-Signature` header.

Stripe **requires** signature validation for production traffic — same
caveat as GitHub. Front the event with a verifier if real money is
involved. The bearer token is the second factor: even if signature
validation is dropped, only your verifier knows the bearer.

**Workflow shape:** `fulfill-order` reads
`params.payload.data.object.metadata.order_id` and routes accordingly.

## 3. Manual `curl` trigger

```yaml
# _vance/events/run-cleanup.yaml
description: "Manual cleanup trigger (ops)"
workflow: cleanup-stale-runs
methods: [POST]
auth:
  tokenSetting: events.cleanup.token
```

```bash
TOKEN=$(vance settings:get events.cleanup.token)
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keepDays": 30}' \
  https://brain.example.com/brain/acme/event/p1/run-cleanup
```

The workflow reads `params.payload.keepDays` and trims. POST body is
just JSON — no special wrapping needed.

## 4. IoT sensor push

```yaml
# _vance/events/sensor-alert.yaml
description: "IoT sensor threshold → triage workflow"
workflow: sensor-triage
methods: [POST]
auth:
  tokenSetting: events.sensor.token
```

```bash
curl -X POST \
  -H "Authorization: Bearer $SENSOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sensor": "kitchen-temp", "value": 47.3, "unit": "C"}' \
  https://brain.example.com/brain/acme/event/home/sensor-alert
```

The sensor firmware needs the token baked in (or rotated via a
configuration channel). Standard advice applies: long random token,
HTTPS only, rotate on firmware update.

## 5. Cron from outside (when the internal scheduler isn't right)

If a workflow needs to be triggered by an external scheduler (a
Kubernetes CronJob, a GitHub-Actions schedule, an external workflow
system), prefer an event over the internal scheduler when:

- The external scheduler is already authoritative for "when".
- You want full audit visibility on the inbound HTTP request.
- The triggering side wants a response with `workflowRunId` to
  correlate.

```yaml
# _vance/events/nightly-report.yaml
workflow: nightly-report
methods: [POST]
auth:
  tokenSetting: events.cron.token
```

When the internal Vance scheduler is the better fit (no external
"when", more dynamic params, in-tenant scheduling), use a Scheduler
doc with `workflow:`-field instead. The two paths are equivalent at
the workflow side; the choice is about *who owns the trigger time*.

## 6. Open endpoint (no auth)

```yaml
# _vance/events/healthcheck.yaml
description: "Lightweight health-workflow"
workflow: health-ping
```

No `auth:` block. The endpoint is fully open — anyone who knows the
URL can fire it. Only sensible when:

- The workflow is genuinely side-effect-free (a ping that touches no
  documents, no external systems, no LLM calls).
- The brain is on an internal network that's already access-controlled.

Even then, prefer an `auth.tokenSetting:` with a shared "dev" token —
the cost of adding auth later (when the workflow grows side effects)
is real.

## Common pitfalls

- **Forgetting `methods: [POST]`** on a webhook receiver. GitHub
  sometimes sends GET preflight checks; without restricting methods,
  those preflights would spawn workflow runs. Restrict explicitly.
- **Inline `token:` in a kit-exported event.** The token wanders into
  the kit archive and into every install. Use `tokenSetting:` for
  anything shipping via kits.
- **Workflow that doesn't read `params.payload`.** The event passes
  the body — but the workflow has to actually use it. Verify with a
  test call that the workflow's state machine reaches the expected
  branch given the test payload.
- **Forgetting to set the setting.** `auth.tokenSetting: events.foo.token`
  with no setting → 503 at every request, not a silent auth bypass.
  Set the setting before pointing the external system at the URL.
