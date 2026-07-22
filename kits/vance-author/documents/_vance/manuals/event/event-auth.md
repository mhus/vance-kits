---
triggers: event auth, bearer token, tokenSetting, auth.token, konstantzeit-vergleich, webhook signatur, replay-schutz, kein rate-limit, setting cascade, 503 misconfig, produktions-secret, token rotieren
summary: Bearer-token authentication for events — inline `token:` vs. `tokenSetting:` cascade, request-time verification, what auth is not in v1 (no signatures/replay/rate-limit), and how to pick auth per event.
---

# Event Authentication

An event is openly callable unless it carries an `auth:` block. Auth
is **bearer-token only** in v1 — the caller sends
`Authorization: Bearer <token>`, and the service compares against an
expected value resolved from the event's YAML.

## Two configuration modes

### Inline literal (`auth.token:`)

```yaml
auth:
  token: hunter2
```

The expected token is the literal string after `token:`. Test-friendly
but **stores the secret in the document**. Acceptable for local
development, demos, and short-lived ephemeral events. Not acceptable
for production secrets — kit-exports and document-listing tools will
surface the token to anyone with read access to the project.

### Setting cascade (`auth.tokenSetting:`)

```yaml
auth:
  tokenSetting: events.github.token
```

The expected token is resolved at trigger time through
`SettingService.getStringValueCascade(tenant, project, /*thinkProcessId*/null, key)`
— project setting wins over `_vance`/tenant setting. The event
document itself contains only the key reference; the secret lives in
the typed-settings system, which has its own encryption-at-rest story
for PASSWORD-typed settings.

This is the **production-default** form. When migrating a
proof-of-concept event with `auth.token: foo` to production, the
playbook is:

1. Add the setting (`events.github.token = <real-token>`) in the
   settings editor or via the settings tool.
2. Edit the event to replace `token:` with `tokenSetting:`.
3. Rotate the inline secret on the external system.

The two fields are **mutually exclusive**. The loader rejects YAML
that sets both.

## What happens at request time

1. `EventService.trigger` looks up the event.
2. If the event has `auth:`, the expected token is resolved (literal
   or via setting cascade).
3. If the resolved expected token is `null` or empty (which can only
   happen with `tokenSetting:` against an unset setting), the endpoint
   returns **503** — misconfig, not "auth bypass".
4. The bearer from the `Authorization` header is compared against the
   expected token using `MessageDigest.isEqual(...)` — a
   length-independent constant-time comparison. The same primitive
   used for password verification in the rest of the brain.
5. A mismatch → 401. A match → workflow spawn.

## What auth is *not* in v1

Listed explicitly so authors don't reach for things that don't exist:

- **No signature schemes.** GitHub's `X-Hub-Signature-256`, Stripe's
  webhook signing, AWS SNS message signing — none of those are
  validated here. If a provider's auth model requires inspecting a
  signed body, a dedicated provider-specific receiver belongs *in
  front* of the event endpoint (a thin HTTP component that validates
  the signature, then forwards the original payload to the Vance event
  with a bearer token).

- **No replay protection.** Tokens are static; replays are accepted.
  If a workflow shouldn't run twice for the same inbound event, the
  *workflow* needs an idempotency check (a `condition_task` that
  reads `params.payload.delivery_id` against the document layer).

- **No rate-limit, no IP allow-list, no per-token quota.** Whoever
  holds the token can fire the endpoint as fast as they like — the
  workflow side is the place to limit cost (`bounds.maxTaskSpawns`,
  `bounds.maxTotalCostUsd`), not the trigger side.

- **No mTLS, no client certificates.** Standard HTTPS termination is
  assumed but not enforced inside the event service.

## Picking auth for a new event

| Scenario | Recommendation |
|---|---|
| Health-ping, no side effects, internal network | No `auth:`. |
| Internal `curl` from a script you control | `auth.tokenSetting:`, document the setting in the project README. |
| GitHub PR webhook | `auth.tokenSetting:`, use the same secret you give GitHub. Signature validation not in v1 — accept the trade-off or front the endpoint with a verifier. |
| Stripe events | Same as GitHub, with the same caveat — Stripe's signature isn't validated. |
| Public-internet endpoint someone could brute-force | `auth.tokenSetting:` with a long random token (32+ bytes from `openssl rand -hex 32`). Rotate via the settings editor when leaked. |
| Cross-tenant call (tenant A wants to call tenant B's event) | Don't. Events are tenant-scoped; the URL `/brain/{tenant}/event/...` is the boundary, and the bypass in `BrainAccessFilter` is narrow on purpose. |

## Operational notes

- The bearer compare runs on the brain pod that received the request.
  No coordination, no DB hit for the comparison (just for the setting
  resolve, which itself is cached by `SettingService`).
- The setting cascade lookup uses `thinkProcessId=null` — events fire
  ahead of any process and aren't process-scoped.
- `auth: { tokenSetting: "X" }` with `X` unset is a deploy-state
  question, not an auth-state question. The 503 surface is the signal
  to the operator that a setting is missing.
