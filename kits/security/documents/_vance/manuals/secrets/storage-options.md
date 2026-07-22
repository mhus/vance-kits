---
triggers: secret storage, geheimnis-speicherung, vault, secrets manager, kms, env vars, umgebungsvariablen, dotenv, os keychain, ci variables, sops git-crypt, decision flow speicherwahl
summary: Choosing where a secret should live — comparing .env, runtime env vars, cloud secrets managers, Vault, KMS, OS keychain, encrypted files, and CI variables, with a decision flow.
---

# Storage Options — where a secret should live

Pick storage based on three properties of the secret:

- **Trust scope.** How many people / services need to read it?
- **Rotation cadence.** How often does it change?
- **Blast radius if leaked.** How bad is the worst case?

Then match those to the storage mechanism. Different secrets in
the same project usually want different storage.

## Storage mechanisms — comparison

### Hardcoded in source

Don't. Move on.

(Exception: dev-only mock credentials clearly marked
`changeme` / `local-dev-only`. Even then, prefer env vars
that point to a dev fixture.)

### .env files (committed `.env.example`, gitignored `.env`)

- **Trust scope:** local developer only.
- **Rotation:** manual; depends on developer discipline.
- **Blast radius:** local-only secrets are usually low-blast
  *if the developer doesn't promote them to prod*.
- **Pros:** trivial DX, no infra dependency.
- **Cons:** drifts between developers; no audit; production
  use is dangerous (file leaked = secret leaked).
- **When:** local development only. Never in CI / prod.

### Env vars at runtime (injected by deploy system)

- **Trust scope:** the deployed service + whoever has
  deploy access.
- **Rotation:** redeploy or restart-with-new-env.
- **Blast radius:** anyone with shell on the box can read
  `/proc/<pid>/environ`; anyone with deploy access can dump
  env at deploy time.
- **Pros:** universal pattern, simple, language-agnostic.
- **Cons:** env shows up in logs by accident
  (process listings, debug pages, crash dumps). Rotation
  requires restart.
- **When:** services with low-frequency rotation; secrets
  not super-sensitive; small team where deploy access is
  effectively a security boundary.

### Cloud-native secrets manager (AWS Secrets Manager, GCP
Secret Manager, Azure Key Vault)

- **Trust scope:** authenticated callers via cloud IAM.
- **Rotation:** API-driven; can be automated.
- **Blast radius:** depends on IAM scoping. Done well, the
  blast is contained to "what this service can fetch".
- **Pros:** audit logs, IAM-scoped access, version history,
  rotation hooks.
- **Cons:** vendor-specific; cold-start latency; per-call
  cost in some products; requires correct IAM.
- **When:** cloud-native deployments; multi-service systems;
  audit / compliance requirements; rotation cadence > monthly.

### HashiCorp Vault (or similar)

- **Trust scope:** authenticated callers via Vault auth
  methods.
- **Rotation:** dynamic secrets (Vault generates short-lived
  DB creds per-request); also static secrets with TTL.
- **Blast radius:** very contained — short-lived creds limit
  exposure to the credential's lifetime.
- **Pros:** dynamic secrets are powerful for DB / cloud /
  SSH credentials. Cross-cloud / on-prem.
- **Cons:** operational overhead (you're now running Vault).
  Wrong-tier compromise of Vault is a worst-case.
- **When:** mature security org; multi-cloud / on-prem;
  high-cadence rotation; dynamic-cred pattern (per-request
  DB creds) gives leverage.

### KMS for encryption keys (AWS KMS, GCP KMS, Azure Key
Vault HSMs)

- Different from a secrets manager: KMS holds *encryption
  keys*. You ask KMS to encrypt/decrypt; it never gives you
  the key.
- **Trust scope:** IAM-controlled.
- **Rotation:** automatic key rotation supported.
- **Blast radius:** very contained — the key never leaves
  KMS, so a compromise of your service doesn't leak the
  key.
- **When:** anywhere you need to encrypt data and don't
  want to handle the key material yourself. Pair with a
  secrets manager for the API tokens / passwords use case.

### OS keychain (macOS Keychain, Windows Credential Manager,
Linux Secret Service)

- **Trust scope:** the local user.
- **Rotation:** manual.
- **Blast radius:** local — anyone with the user's session
  has access.
- **Pros:** no infra dependency; OS-integrated.
- **Cons:** developer-machine-only realistically; CI /
  servers don't have this.
- **When:** developer tools that need to authenticate to
  cloud services from the dev's machine. CLI auth tokens.

### Encrypted files in the repo (sops, git-crypt, blackbox)

- **Trust scope:** anyone with the encryption key.
- **Rotation:** edit + commit + redeploy.
- **Blast radius:** depends on who has the key. Often the
  whole engineering team, which is many people.
- **Pros:** version-controlled secrets; review-able diffs;
  no infra dependency.
- **Cons:** key distribution is the hard problem; once
  shared, can't be unshared. Key compromise == all secrets
  compromised retroactively (anyone with old git clone has
  the encrypted secrets).
- **When:** small team; mature key management; secrets
  rarely change; alternative is "no secrets at all" rather
  than "secrets manager".

### CI variables (GitHub Actions secrets, GitLab CI
variables, etc.)

- **Trust scope:** anyone who can run a CI job. Often that
  includes anyone who can open a PR (depending on
  configuration).
- **Rotation:** UI-driven.
- **Blast radius:** wide. CI logs frequently leak secrets;
  malicious PRs can exfiltrate.
- **Pros:** standard for CI work.
- **Cons:** scope-creep risk — secrets accumulate, hard to
  audit. Needs careful CI permission policy (no secrets in
  fork-PR runs, scoped permissions per job).
- **When:** secrets specifically for CI use (deploy tokens,
  test-environment creds). Production secrets shouldn't be
  CI variables.

### In a managed config service (LaunchDarkly, ConfigCat,
etc.)

- **Don't.** Config services are not designed for secret
  storage. They have different threat models. Anything
  marked "secret" in a config service is probably more
  exposed than the same value in a vault.

## Picking storage — a decision flow

1. **Is this for local dev only?**
   - Yes: `.env` (gitignored) + `.env.example` (committed).
2. **Is this an encryption key (key material itself)?**
   - Yes: KMS.
3. **Is this dynamic creds for an internal resource (DB,
   cloud, SSH)?**
   - Yes: Vault dynamic secrets.
4. **Is this a service-to-service or service-to-third-party
   credential?**
   - Yes: cloud secrets manager (or Vault).
5. **Is this CI-only (deploy tokens, test fixtures)?**
   - Yes: CI secret variables, scoped tightly.
6. **Is this developer-machine auth (CLI tokens)?**
   - Yes: OS keychain.

If you can't fit the secret cleanly, default to the cloud
secrets manager. It's rarely the wrong answer, often the
right one.

## Anti-patterns

### Multiple sources of truth

Same secret in env vars, in source, and in vault. Eventually
the wrong one ships to prod. Pick one source per secret;
delete the others.

### Secret promoted from dev to prod

`.env` works for the dev; copy-paste to prod env. Now the
prod secret is the same as the dev secret, possibly known to
the whole team.

Counter: secrets must differ per environment. Generation /
rotation is environment-bound.

### Secret in a config map

Kubernetes ConfigMaps are *not* secrets. They're plaintext.
Use Secrets (which are also barely better — base64 isn't
encryption — pair with sealed-secrets / external-secrets-
operator).

### Rolled-your-own-vault

A small service that fetches secrets from a database,
encrypts them, exposes an API. Now you have a vault, but
without the audit, key management, or threat-model maturity
of an off-the-shelf one.

Counter: use the off-the-shelf option.

### "We'll move it later"

The hard-coded secret stays for years. By the time someone
gets to it, it's been forked, leaked into branches, mailed
in a screenshot. Move it now.

## Output line

- "**Use ⟨storage⟩** because ⟨specific match⟩."
- "**Storage is wrong** — secret should move from ⟨current⟩
  to ⟨right⟩. Reason: ⟨trust scope / rotation⟩."
- "**Storage is fine; access pattern is the issue** —
  see ⟨specific concern⟩."
