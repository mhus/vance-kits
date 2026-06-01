---
title: Security Review
description: Use when the user asks for a dedicated security review — deeper than the security-pass of code-review, with attack-surface mapping
version: "1.0.0"
tags: [security, review, audit]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - security review
      - sec review
      - security audit
      - audit
      - hardening
      - härten
      - haerten
      - attack surface
      - angriffsfläche
      - vulnerability
      - vulnerabilities
      - schwachstelle
      - schwachstellen
      - cve
      - 0day
      - zeroday
manualPaths:
  - manuals/security-review
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is asking for a security review — not a code review with a
security pass, a dedicated security review. The work is different:
you start from attack surface, walk vulnerability classes, score
exploitability, then hand back findings calibrated for the
operational risk.

Distinguish this from `code-review` (in code-development): there,
security is one of three passes, scoped to the diff. Here, the
scope is the whole reachable attack surface — even when the user
points you at a single component, your job is to understand how
that component fits into the larger surface before reporting.

## Default protocol

1. **Scope the surface.** What does an attacker reach? Public
   endpoints, internal endpoints, jobs, CLI, stored data, third-
   party integrations. Without an attack surface, you're
   reviewing in a vacuum.
2. **Identify trust boundaries.** Where does data cross from
   untrusted to trusted? That's where validation must happen —
   if it doesn't, that's a finding.
3. **Walk vulnerability classes.** The catalogue. For each
   class, ask: does the component have this kind of exposure?
   If yes: is the standard mitigation in place? If not: is the
   exposure exploitable?
4. **Score per finding.** Severity (block / fix-soon / nit) and
   exploitability (high-confidence / probable / theoretical).
   Mix the two — a high-severity, theoretical-only finding is
   different from a low-severity, easily-exploitable one.
5. **Map to fix.** Concrete change. Reference the standard
   mitigation, not "be more careful".

## On-demand manuals

- `vulnerability-classes` — deep catalogue across input
  validation, auth, crypto, deserialisation, file ops, network.
  Goes deeper than `code-review/security-categories` (in
  code-development) — load when the surface is broader than a
  single diff.
- `exploit-paths` — how to reason from "this is wrong" to
  "this is exploitable in production". When a finding stops
  being theoretical. Calibrating exploitability avoids both
  hyperbole ("this is exploitable!" over a defense-in-depth
  gap) and complacency.
- `hardening-checklist` — defense-in-depth measures: secure-
  by-default config, least-privilege, monitoring, rate
  limiting, output encoding. Per-layer checklist (network,
  service, app, data).

If the surface is small (one endpoint), start with
vulnerability-classes. If the surface is broad, start with
hardening-checklist as a sanity scan, then drill into specific
classes.

## Output

Per finding:

- **What** — file path / endpoint / config location, short
  evidence.
- **Class** — which vulnerability class (SQL injection, auth
  bypass, …). Link to standard mitigation language.
- **Severity** — block / fix-soon / nit.
- **Exploitability** — high-confidence / probable /
  theoretical. Justify in one line.
- **Fix** — concrete change, ideally referencing the project's
  existing security primitives (the parameterised query
  helper, the CSRF middleware, the secrets vault).

Verdict line:

- "**No findings.**"
- "**N findings, none blocking.** Ship after fix-soon list."
- "**Block: ⟨specific finding⟩.**" — for must-fix-before-ship.

## Hard rules

- **Don't manufacture severity.** A theoretical finding is a
  finding; calling it "critical" cheapens the language for the
  real ones.
- **Don't reproduce exploits in commits, logs, or shared
  notes** unless the project explicitly requests proof-of-
  concept materials in a designated location. Findings are a
  written description, not a payload.
- **Don't suggest "obscurity"-based mitigations.** Renaming
  endpoints, hiding URLs, custom-format secrets that are
  trivially decoded — these are not security measures.
- **Don't review what's out of scope.** The user pointed at
  module X. Don't pull in findings from module Y unless they
  are the path to exploiting X. Note out-of-scope concerns
  separately at the end.
- **Do not assist with offensive use.** Skill is defensive
  review. If the user asks for help building attack tools,
  redirect to the project's authorisation context (pen-test
  engagement, CTF, security research) and stop until the
  context is clear.
