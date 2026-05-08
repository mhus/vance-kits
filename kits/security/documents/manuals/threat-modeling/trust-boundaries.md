# Trust Boundaries — where threats live

A trust boundary is a line on your DFD where the privilege
level, accountability, or attacker assumption changes. Threats
cluster at boundaries because that's where data crosses from
"can be controlled by an attacker" to "is consumed by trusted
code".

If your DFD has no boundaries, your threat model has no
structure. If it has boundaries everywhere, the boundary became
noise. Pick the meaningful ones.

## What counts as a boundary

A boundary exists when data crosses between zones with
materially different trust assumptions.

**Differences that constitute a boundary:**

- **Authentication state.** Authenticated → unauthenticated.
- **Authorisation level.** User → admin. Tenant A → tenant B.
- **Network position.** Internet → DMZ → internal → vault.
- **Process boundary** when one process can attack the other
  (sandbox, container, VM).
- **Code-base ownership.** Your code → third-party code → your
  code-running-third-party-input.
- **Data sensitivity classification.** Public → internal →
  confidential → restricted.

**Differences that don't constitute a boundary** (often
mistakenly drawn as one):

- Same service, different module. (Code organisation, not
  trust.)
- Same VM, different process, same OS user. (Trivial to
  cross.)
- Front-end vs. back-end of the same trust level. (No
  privilege change.)
- Library boundaries within the same process. (No
  enforcement.)

A boundary is real when crossing it triggers a check. If
nothing changes when you cross, it isn't a boundary.

## Common boundaries in modern systems

### Browser ↔ server

The classic. Untrusted client, trusted server. Every input
from the browser is hostile.

- Server validates everything.
- Server doesn't trust client-side checks ("the form said
  email was valid").
- Server doesn't expect specific client behaviour ("the JS
  always sends X" — attacker doesn't run your JS).

### Mobile app ↔ server

Same as browser, plus:

- App binary can be reverse-engineered. Anything in the app
  is public.
- Stored secrets in the app are not secrets — they're
  embarrassments waiting to be found.
- Server cannot rely on the app being unmodified.

### Service ↔ service

Internal microservices. Trust depends on architecture:

- **Zero-trust:** every service authenticates every other
  service. Boundary at every hop.
- **Trusted internal network:** boundary at the perimeter
  only. Risk: a compromised service has full access.
- **Tiered:** customer-facing services in DMZ, core services
  in internal, vault in restricted. Boundary at each tier
  transition.

Modern preference: zero-trust, even internally. Network is
not a security boundary.

### Application ↔ database

The DB is more privileged in some ways, less in others:

- DB has all the data; app has the access.
- DB user creds are usually limited to the app's needs.
- The boundary is real: SQL injection / SSRF-to-DB / DB
  user privilege escalation cross it.

### Tenant ↔ tenant (in shared infra)

The most invisible boundary. Tenants share processes, share
DB, share cache. The boundary is enforced *in code* (every
query has `WHERE tenant_id = ?`) — not by the runtime.

This boundary fails silently. A missed `WHERE` clause leaks
across tenants without any error. Worth special STRIDE.

### App ↔ third-party code

You include a library; a vulnerability in the library
becomes a vulnerability in your app. The boundary is
nominal — runtime, the library has full process access.

Mitigations are at the design level: keep dependency surface
small, vendor-and-vet for high-risk dependencies, sandbox
truly untrusted code (browser-style isolated workers).

### App ↔ infrastructure

Your code runs on hosts you (mostly) trust. Containers,
VMs, hypervisors below.

- Container escape is a real boundary crossing.
- "Cloud provider compromise" is usually outside your model
  (you can't mitigate it; you trust the provider).
- Side-channels (Spectre, etc.) blur the boundary.

### Build / supply chain ↔ runtime

Code arrives via CI / package registry / Docker registry.
The boundary is "what entered the build" vs. "what's
running".

- Compromised dependency → runtime compromise.
- Compromised CI → arbitrary runtime code.

Often understated; usually under-modelled.

## How to identify boundaries on a DFD

Walk the diagram and ask, at each flow:

1. **Does the destination treat the source as trusted?**
   - Yes (no validation expected): no boundary.
   - No (data must be validated, authenticated, authorised):
     boundary.
2. **Does the destination have different privileges from the
   source?**
   - Yes (e.g. admin endpoint receiving user request): boundary.
3. **Could a compromise of the source affect the
   destination?**
   - Yes, materially: boundary.
   - No, isolated: not a boundary.

If "yes" to any → draw the boundary.

## How boundaries map to controls

Each boundary should have a *control* that enforces the trust
delta:

- **Browser ↔ server:** authentication + authorisation +
  input validation + output encoding.
- **Service ↔ service:** mTLS / signed tokens; network
  policies.
- **Application ↔ DB:** parameterised queries; least-
  privilege DB user.
- **Tenant ↔ tenant:** tenant-scoped queries enforced at the
  data layer.
- **App ↔ third-party code:** dependency review; SBOM; CVE
  monitoring.
- **App ↔ infrastructure:** container hardening; resource
  limits; isolation primitives.

If a boundary has no enforcing control, the boundary is
fictional — make it real or drop it from the diagram.

## Boundary anti-patterns

### Boundary-as-decoration

The dashed line is on the diagram but no control enforces
the trust delta. Looks rigorous, isn't.

Counter: every boundary needs a named control.

### Network-as-only-boundary

"Internal network is trusted." VPN compromise / supply-chain
compromise / lateral movement breaks this. Network
trust is brittle in modern systems.

Counter: identity-based trust + zero-trust internal.

### Boundary too coarse

"There's a boundary between us and the internet." OK, but
within the internet are: anonymous attackers, authenticated
users, partner integrations, third-party services you call.
All have different trust, but the diagram conflates them.

Counter: split external entities by trust level.

### Boundary too fine

Every function call is a boundary. The diagram has 50
dashed lines. Threats have nowhere meaningful to land.

Counter: boundaries reflect privilege deltas, not module
organisation.

### Forgotten boundaries

The most common failure. The data exfil happened via a
boundary you didn't realise existed.

Common forgotten boundaries:

- Logs cross trust zones (sensitive data into less-trusted
  log infra).
- Metrics with cardinality leaks identifiers.
- Backups land in storage with different access controls.
- Error paths return data through unexpected channels.
- Caches retain decrypted data for the cache lifetime.
- Browser-side "private" routes that are actually public
  endpoints.

Counter: walk the system end-to-end including non-happy
paths.

## How to phrase a boundary finding

```
**Missing boundary control:** ⟨specific boundary⟩
**What:** ⟨how data crosses⟩
**Why it matters:** ⟨trust delta⟩
**Suggested control:** ⟨specific mitigation⟩
```

Example:

```
**Missing boundary control:** App ↔ DB
**What:** Search endpoint constructs SQL with string
formatting; user-controlled query parameter is interpolated.
**Why it matters:** Crossing from app to DB without
parameterisation collapses the trust boundary — DB executes
attacker-controlled SQL with full app-user privileges.
**Suggested control:** parameterised query via the
project's `db.query` helper; never string-format SQL.
```

## Output line

- "**Boundaries identified** — ⟨list with controls⟩."
- "**Boundary missing control** — ⟨specific boundary⟩."
- "**Diagram has decoration boundaries** — drop ⟨list⟩;
  no enforcement exists."
