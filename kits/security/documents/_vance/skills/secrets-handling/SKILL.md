---
title: Secrets Handling
description: Use when the user is dealing with API keys, tokens, credentials, certificates — storing, rotating, recovering from leaks
version: "1.0.0"
tags: [security, secrets, credentials]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - secret
      - secrets
      - api key
      - api keys
      - token
      - tokens
      - credentials
      - credential
      - password storage
      - .env
      - dotenv
      - vault
      - kms
      - secrets manager
      - rotate
      - rotation
      - rotieren
      - leak
      - leaked
      - geleakt
      - exposed
manualPaths:
  - _vance/manuals/secrets
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is handling secrets — storing them, fetching them,
rotating them, or recovering from a leak. Secrets are special:
they have to be available at runtime, must not be in git, must
not appear in logs, must rotate, and must be recoverable from
disasters that could have leaked them.

Most "secrets handling" mistakes are not technical sophistication
but procedural drift — someone hard-coded for "just dev", someone
emailed a token, someone committed `.env` "by accident". The
controls are simple; the discipline is the work.

## Default protocol

1. **What is the secret?** API key, OAuth token, DB password,
   TLS private key, signing key, encryption key. Different
   classes have different rotation cadences and different
   leakage consequences.
2. **What's its scope?** Single service, multi-service,
   external partner. Scope dictates which storage and which
   rotation pattern fit.
3. **How is it accessed at runtime?** Pulled from a vault on
   startup, mounted as a file, injected as env var, fetched
   per-call. Each model has trade-offs.
4. **Is it logged or visible somewhere it shouldn't be?**
   Walk the flow — request body, error message, log line,
   process arg, dump file, debug page.
5. **Can it be rotated without downtime?** If not, that's a
   finding: a non-rotatable secret will not be rotated even
   when it should be.

If the user is asking about a *leaked* secret, jump straight
to `leakage-recovery` — discussion of policy can wait until
after containment.

## On-demand manuals

- `storage-options` — vault, KMS, secrets manager, env vars,
  encrypted files, OS keychain. Trade-offs: developer
  experience, blast radius, rotation cost, runtime overhead.
  Load when the user is choosing where a new secret should
  live.
- `rotation-strategy` — when to rotate, how to rotate
  without downtime, dual-secret patterns, scheduled vs.
  event-triggered rotation. Load when the user has secrets
  that don't rotate, or rotation is a high-stress event.
- `leakage-recovery` — what to do when a secret is exposed.
  First five minutes, first hour, first day. Containment,
  rotation, audit, communication. Load **first** when a
  leak is in progress.

## Hard rules

- **Never commit secrets to git.** Pre-commit hooks, secret
  scanners on PRs, `.gitignore`-d local files. If it slips,
  treat as a leak (see `leakage-recovery`); rotation, not
  deletion from history, is the fix.
- **Never log secrets.** Auth headers, request bodies,
  query strings, full URL with token, env var dump, full
  request object on error. The default mode of "log
  everything" is the default leakage path.
- **Never email / chat / paste secrets.** Channel logs are
  forever. Use a vault link or a one-time-share tool.
- **Never embed secrets in client-side code.** Mobile app,
  browser JS, CLI distributed to users — all secrets in any
  of these are public.
- **Default-rotate on staff change.** If someone with secret
  access leaves, rotate. Don't audit which secrets they
  *might have* known.
- **Default-rotate on any suspicion.** "Probably wasn't
  exposed" is not a rotation policy.
