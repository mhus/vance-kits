---
triggers: stride, bedrohungsmodellierung, threat modeling, spoofing tampering repudiation, information disclosure denial of service, elevation of privilege, stride per element, element-typen, linddun pasta attack tree, mitigations, threat matrix
summary: The STRIDE threat-modeling mnemonic — the six categories, which apply per DFD element type, how to walk them, and when to switch to LINDDUN/PASTA/attack trees.
---

# STRIDE — six categories you walk per element

STRIDE is a mnemonic for systematically considering threat types.
Six categories; each maps to a violated security property.

| Letter | Threat | Property violated |
|---|---|---|
| **S** | Spoofing | Authenticity |
| **T** | Tampering | Integrity |
| **R** | Repudiation | Non-repudiation |
| **I** | Information disclosure | Confidentiality |
| **D** | Denial of service | Availability |
| **E** | Elevation of privilege | Authorisation |

You apply STRIDE per *element* in your DFD. Different element
types have different STRIDE profiles — the table below.

## STRIDE per element type

| Element | S | T | R | I | D | E |
|---|---|---|---|---|---|---|
| External entity (user, third-party) | ✓ | | ✓ | | | |
| Process (your service) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Data flow (between elements) | | ✓ | | ✓ | ✓ | |
| Data store (DB, cache, file) | | ✓ | ✓ | ✓ | ✓ | |

A process gets the full ladder; a data flow only T/I/D; an
external entity only S/R; a data store skips S and E.

## What each category means in practice

### Spoofing

The attacker pretends to be someone or something they aren't.

- A user logs in as another user.
- A service accepts requests claiming to come from another
  service.
- A request claims a different source IP via spoofed headers
  (`X-Forwarded-For`).

**Common mitigations:** authentication (passwords, tokens,
mTLS), session management, certificate validation,
request signing.

### Tampering

The attacker modifies data they shouldn't.

- Changing a request body en route (no integrity check).
- Modifying a stored record without authorisation.
- Altering a config file on disk that the service trusts.

**Common mitigations:** authorisation checks, integrity
verification (HMAC, signatures, hashes), file-system
permissions, immutable logs.

### Repudiation

A user / system denies having done something, and you can't
prove they did.

- "I never made that transaction."
- "The service never received that request."
- "I didn't approve that change."

**Common mitigations:** audit logs, signed actions, append-
only stores, timestamped artefacts. Logs that are themselves
tamper-resistant.

### Information disclosure

The attacker reads data they shouldn't.

- Reading another user's records.
- Reading the source code via path traversal.
- Reading sensitive memory via a side-channel.
- Reading from a misconfigured public bucket.
- Reading from a stack trace returned in an error.

**Common mitigations:** authorisation, encryption (in transit
and at rest), data classification + handling, output
sanitisation.

### Denial of service

The attacker prevents legitimate users from accessing the
system.

- Flooding requests until the service falls over.
- Filling up the database with junk records.
- Triggering an expensive operation that ties up resources.
- Crashing the service via malformed input.

**Common mitigations:** rate limiting, quotas, input size
limits, defensive coding (don't crash on malformed input),
resource isolation per tenant.

### Elevation of privilege

The attacker becomes more powerful than they were authorised
to be.

- Regular user becomes admin.
- Authenticated user accesses unauthenticated-only endpoints
  (or vice versa).
- A process that should be in a sandbox escapes to host.
- A container breaks out to the host.

**Common mitigations:** least privilege, defence-in-depth at
process / container / VM boundaries, sandbox / seccomp /
SELinux, audit + alerting on privileged actions.

## How to walk STRIDE per element

For each element in your DFD:

1. **Enumerate** which letters of STRIDE apply (the table
   above).
2. **For each applicable letter:** "How could a STRIDE-X
   threat manifest here?". Answer specifically — not "spoofing
   could happen", but "an attacker could log in as another
   user via stolen session token".
3. **For each manifestation:** Decide. Mitigate / accept /
   transfer / eliminate. Mitigation references a specific
   control.

Worked example: an HTTP service receiving requests from a
browser.

- **Process:** all six letters.
  - S: spoofed source / replay → token-based auth + nonce.
  - T: request body modified in transit → TLS.
  - R: user denies making request → audit log of authenticated
    actions.
  - I: stack traces leak internals → generic 500s, full
    detail server-side.
  - D: request flood → rate limit + autoscaling.
  - E: privilege bypass via path manipulation → authorisation
    check on every endpoint.
- **Data flow (browser ↔ service):** T, I, D.
  - T: TLS.
  - I: TLS + don't put sensitive data in URLs (which appear in
    logs).
  - D: connection rate limit at the load balancer.
- **Datastore (DB):** T, R, I, D.
  - T: app-level only writes; DB user has minimal DML rights.
  - R: timestamps + author on every row.
  - I: encryption at rest; DB user has minimal SELECT scope.
  - D: connection pool limits; query timeouts.

## When STRIDE is overkill

For small / simple systems STRIDE-per-element produces a
30-row matrix where 25 entries are "n/a" or "TLS handles it".
That's fine — note it and move on. The discipline is
remembering to *check* each cell, not to *fill* each cell.

For large systems with 50+ elements, don't STRIDE every
element. STRIDE the *boundaries* (see `trust-boundaries`)
and the high-value processes / stores. Edge elements get a
quick walk; core elements get the full treatment.

## When STRIDE isn't the right framework

- **Privacy-driven design** → LINDDUN (Linkability,
  Identifiability, Non-repudiation, Detectability, Disclosure
  of information, Unawareness, Non-compliance).
- **Risk-prioritised** → PASTA (Process for Attack Simulation
  and Threat Analysis). Heavier; integrates business risk.
- **Attack-tree-style** → Schneier-style attack trees, where
  you decompose a goal into sub-attacks. Useful when you have
  one specific attacker capability in mind and want to
  exhaustively enumerate paths.

For most product / feature work, STRIDE is the right
default. The others are specialisations.

## Anti-patterns

- **Decoration without analysis.** Drawing the matrix,
  filling cells with "TLS" everywhere, calling it done. Each
  cell deserves a specific answer; "TLS" only mitigates T and
  I in transit.
- **STRIDE without DFD.** You're enumerating threats against
  what? The diagram is the structure that makes STRIDE
  systematic instead of vibes.
- **Threat-list-as-todo.** Every threat goes on the
  engineering backlog. Most threats should be *accepted* with
  reason — not every threat is worth a control.

## Output line

- "**STRIDE walked** — N elements, M threats, K mitigations."
- "**Threat list incomplete** — element ⟨X⟩ not yet walked."
- "**STRIDE not the right framework here** — switch to
  ⟨LINDDUN / PASTA / attack tree⟩ because ⟨reason⟩."
