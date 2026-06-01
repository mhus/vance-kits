# Hardening Checklist — defense-in-depth across layers

Hardening is what makes a single mistake survivable. A bug bypasses
one defense; a hardened system catches it at the next. Walk the
layers; ask "if the layer above me failed, what catches it here?".

## Network layer

- **Public endpoints whitelisted, internal denied.** Default-deny
  at the perimeter (load balancer / API gateway); explicit
  allow-list of public paths.
- **TLS everywhere.** Including internal service-to-service. mTLS
  if the network is shared with untrusted tenants.
- **HSTS with `includeSubdomains`** on browser-facing.
- **Egress filtering.** Outbound from your services restricted to
  known endpoints (prevents data exfil + SSRF blast).
- **Private IP ranges blocked outbound.** Stops SSRF from
  reaching internal services / metadata endpoints.
- **DDoS layer** (CDN / WAF / dedicated DDoS protection) for
  public ingress.
- **Rate limiting** at the edge, layered with per-route limits
  in-app.

## Service layer

- **Authentication at the gateway.** Not per-handler. Default
  deny.
- **Authorisation per resource.** Always references the
  authenticated principal, never request-supplied IDs.
- **Tenant scoping in the data layer.** Not in the app code that
  *uses* the data layer — at the connection pool, query builder,
  or ORM session level.
- **Input validation at the boundary.** Each API surface has a
  schema; rejected input never reaches business logic.
- **Output encoding.** HTML → escape; JSON → don't trust as
  HTML; URLs → URL-encode; SQL → parameterise.
- **Health endpoints don't reveal internals.** `200 OK` is
  enough; don't return DB names, version strings, internal
  hostnames.
- **Error responses are generic** to clients; full detail in
  server logs.

## Application layer

- **Secure-by-default config.** Insecure modes require explicit
  opt-in; defaults are paranoid.
- **CSP, X-Frame-Options, X-Content-Type-Options** set on
  HTML responses. Strictly. Reduce CSP holes one at a time
  over time.
- **CSRF protection** on state-changing endpoints (or
  same-site cookies + token-based auth, which dodges the
  classic CSRF model).
- **Cookies:** `Secure; HttpOnly; SameSite=Strict` (or `Lax`
  for SSO flows). Domain set correctly.
- **No introspection-debug routes** in production. Disable
  `/debug`, `/admin/console`, `/actuator/*` (or restrict to
  internal IPs / mTLS).
- **Dependency policy.** No known-vulnerable versions. SBOM
  + CI gate.
- **Least privilege.** Service account permissions match what
  the service actually needs, no more.

## Data layer

- **Encryption at rest.** Database, object storage, backups.
- **Encryption in transit.** Including replication streams.
- **Secrets in a vault**, fetched at startup. Not in source,
  not in env files committed to git.
- **Backup encryption + access controls.** Backups are often
  the weakest copy of the data.
- **Sensitive-field encryption** within the DB for high-value
  data (PII, payment instruments) — even if the DB itself is
  encrypted at rest, this protects against DB-admin reads.

## Identity layer

- **MFA for privileged accounts.** Admin, ops, finance.
- **Strong password policy** *or* passwordless (passkey, OAuth
  with strong IdP). Length over composition; HIBP-check on
  signup/change.
- **Short-lived tokens** with refresh. Avoid long-lived bearer
  tokens.
- **Session rotation on privilege change.**
- **Account lockout / progressive backoff** on auth failure.
- **Audit log for privileged actions**, immutable.

## Operational layer

- **Logging:**
  - Auth events (login, logout, MFA challenge, role change).
  - Privileged operations (admin actions, data exports).
  - Security-relevant errors (auth failure spikes, deserialisation
    errors, validation rejections).
  - Never: secrets, full request bodies, auth headers.
- **Monitoring + alerting:**
  - Auth failure rate per user + globally.
  - 5xx rate per service.
  - Error class spikes.
  - Outbound traffic anomalies.
- **Incident response plan exists.** First-responder rota,
  communication plan (see `incident-response` skill).
- **Backup recovery tested.** Periodically, with drill.

## Build / supply chain

- **CI runs in a clean environment** per build (no shared
  state between builds, especially in tenant-shared CI).
- **Build artifacts signed.** Verify on deploy.
- **Dependency lockfile committed.** No floating versions.
- **Internal package registry** for first-party packages;
  prevents typosquatting from public registries.
- **No long-lived CI tokens.** Per-job credentials, expires
  quickly.

## Per-language hardening notes

### JVM

- `-Djava.security.manager` (deprecated, but if not yet on JDK 21+,
  worth knowing). Migrate to other isolation (containers,
  process boundaries).
- Disable JNDI lookups in logging (post-Log4Shell).
- `ObjectInputStream` filters or removal.

### Node.js

- `--disable-proto delete` to remove `__proto__` accessor
  (prototype pollution).
- HTTP/2 server with strict header validation.
- `npm audit` / `pnpm audit` in CI.

### Python

- `pip-audit` / `safety` in CI.
- Pickle scan in dependencies (some packages still pickle on
  load).

### Go

- `govulncheck` in CI.
- `GOPROXY` and checksum DB enabled.

### Rust

- `cargo audit` in CI.
- `cargo deny` for licence + advisory policy.

## Configuration / secrets review

- `.env.example` is committed; `.env` is not (verify
  `.gitignore`).
- Default secrets in dev configs are clearly fake (`changeme`,
  `local-dev-only`) so a leak isn't a real breach.
- Production secrets never appear in dev / staging.
- Rotate secrets on staff departure, on tool change, on
  suspicion. (See `secrets-handling/rotation-strategy`.)

## Anti-patterns disguised as hardening

- **Security through obscurity** as a primary control. Hidden
  URL, custom hash format, "nobody knows this endpoint exists"
  — all fall apart under scanning.
- **WAF as the only mitigation.** WAF buys time; doesn't fix
  bugs.
- **"We have monitoring".** Monitoring detects, doesn't
  prevent. Necessary, not sufficient.
- **Blacklisting input.** Allow-list every time you have the
  option.
- **Custom crypto / custom auth flow.** Almost always wrong.

## How to walk this checklist

This is a long catalogue. Don't recite it.

1. Skim, identify which layers are in scope.
2. Sample-check: pick three items per layer to actually
   verify against the system.
3. If samples pass: layer's basics are in place; spot-check
   one more.
4. If samples fail: drill into the layer; assume more are
   missing.
5. Report findings per layer, with severity calibrated by
   `exploit-paths`.

## Output line

- "**Hardened, no findings.** Layers walked: ⟨list⟩."
- "**N findings, by layer:** ⟨per-layer summary⟩."
- "**Layer ⟨X⟩ unverifiable** — request ⟨specific access⟩
  before completing."
