# Rotation Strategy — keep secrets short-lived

A secret that has been valid for two years has had two years to
leak. Rotation limits the window. The hard part isn't *deciding*
to rotate — it's making rotation *cheap enough* that nobody
postpones it.

## When to rotate

### Time-based

- **Short-lived tokens (sessions, OAuth access tokens):**
  minutes-to-hours. The framework handles this.
- **Service-to-service tokens:** ideally days; max weeks.
- **DB / cloud creds:** weeks-to-months. With Vault dynamic
  creds: per-request.
- **Long-lived API keys to third parties:** quarterly is a
  reasonable default; monthly for high-value ones.
- **Signing keys, encryption-key encryption-keys:** annually
  to multi-annually, with deliberate key-rotation plan.

### Event-based — always rotate on:

- **Staff change.** Anyone with access to the secret leaves
  the company / role / project — rotate.
- **Tool change.** A tool that previously had access is
  retired or replaced — rotate the secrets it had.
- **Compromise suspicion.** A laptop got stolen, a CI run
  exposed something, a vendor announced a breach — rotate.
- **Incident response declaration.** During or after a
  security incident — rotate broadly. Don't reason about
  "what was probably exposed".
- **Audit / compliance requirement.** Some standards mandate
  rotation cadence — meet the requirement.

If the answer to "should I rotate?" is "probably not" but
you're spending effort to argue it — just rotate.

## Pre-rotation: make rotation cheap

Rotation is hard if:

- The secret is referenced in many places.
- The system can't accept the new secret while the old is
  still valid (no overlap window).
- Restart is required for the new secret to take effect, and
  restart is expensive.
- Rotation requires coordination with another team / vendor.

**Investments that make rotation cheap:**

### Single-source-of-truth

Each secret has one read path. Apps don't keep their own
copies. The secret is fetched (or templated in) from the
vault at startup and cached in memory only.

### Dual-secret support

The system accepts both the old and the new secret during
the rotation window. Allows: rotate the secret, deploy /
distribute the new secret, decommission the old.

Dual-secret patterns:

- **Two valid keys.** Sign with new, accept either. After
  ramp-up, drop old.
- **Versioned keys.** Token includes the key version; service
  picks the right one to verify.
- **Key list.** Vault returns `[current, previous]` for
  verification; only `current` is used for issuance.

### Hot reload

The service re-fetches the secret without a restart. Either
the secret-fetching library does this on a timer, or the
service exposes a "refresh secrets" endpoint, or it watches
the secret store for changes.

Cuts rotation cost from "schedule maintenance window" to
"flip the value, services pick it up".

### Automation

The rotation itself is a script / pipeline, not a manual
checklist:

1. Generate new secret.
2. Add to vault as new version (old still active).
3. Trigger services to refresh.
4. Verify services are using new (audit logs / health
   endpoint).
5. Remove old secret from vault.

If steps 2-4 are scripted, the human only authorises the
rotation; the work happens automatically.

## Rotating without downtime

The pattern, abstractly:

```
state: only-old → both-valid → only-new
```

You move the system through these three states.

### only-old → both-valid

- Add the new secret alongside the old. Both are valid.
- The system accepts requests authenticated with either.
- The system issues new tokens with the new secret only.

### both-valid → only-new

- Wait for in-flight tokens / sessions / requests to expire
  naturally (or revoke them — depends on tolerance for
  user-visible disruption).
- Confirm via audit logs: no traffic is using the old
  secret.
- Remove the old secret from the system.

The window between "both valid" and "old removed" is the
*rotation window*. Long enough that legitimate users / clients
update; short enough that an attacker who got the old secret
can't use it indefinitely.

### Rotation window sizing

- **Auth tokens:** as short as the longest valid session.
- **API keys to partners:** weeks-to-months — partners need
  to update at their cadence.
- **Service creds:** hours-to-days — services should hot-
  reload promptly.
- **Encryption keys:** must outlast the longest data lifetime
  (you must keep the old key to decrypt old data).

## Encryption-key rotation specifically

Different from credential rotation. You're not just replacing
a secret; you might be re-encrypting data.

Two models:

### Re-encryption

- Generate new key.
- Re-encrypt all existing data with new key.
- Switch ciphertexts to use new key.
- Remove old key.

Expensive (touches all data) but clean.

### Versioned ciphertext

- Each ciphertext records which key version encrypted it.
- New writes use new key; old reads still use the old key.
- Old key kept indefinitely (or until all data using it
  ages out).

Cheaper but means you keep many keys around.

KMS systems usually support versioned-ciphertext
automatically — KMS holds many versions, ciphertext
references the version.

## Anti-patterns

### "We'll set up rotation later"

Without it, secrets become permanent and rotation never
happens. Build rotation in from day one, even if the cadence
is yearly.

### Manual rotation playbook

A 14-step doc that nobody follows. The cost of rotation is
"have a quiet afternoon". Rotation gets postponed
indefinitely.

Counter: automate steps 2-4 above; the human only triggers
+ verifies.

### Rotation that requires coordinated downtime

The system has to stop to rotate. Now rotation is in the
"requires change-control window" category — quarterly at
best.

Counter: dual-secret support + hot reload.

### "Long-lived because it's a hassle to rotate"

Self-fulfilling. Make rotation easier; lifetime drops.

### Secrets in many places

The same secret is in env vars, in `.env`, in CI variables,
in vault, in a config map. Rotating it requires updating all
of them — usually one is missed, the new secret coexists
with the old, the rotation is incomplete.

Counter: one source. Everything else fetches.

### Rotating without verification

The new secret is in vault. Services... maybe picked it up?
"Looks fine." Then someone reports failures and you discover
half the fleet is still on the old.

Counter: verification step in the runbook (audit logs / health
endpoints / synthetic test).

## Output line

- "**Rotate now** — ⟨trigger⟩. Use ⟨pattern⟩."
- "**Pre-investment needed before rotation is cheap** —
  ⟨specific gap⟩."
- "**Rotation in flight** — current state ⟨only-old /
  both-valid / only-new⟩, next step ⟨specific⟩."
- "**No rotation needed** — ⟨reason⟩."
