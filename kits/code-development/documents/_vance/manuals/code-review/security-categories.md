---
triggers: security review, sicherheitslücke, injection, authentifizierung, autorisierung, kryptographie, secrets, deserialisierung, ssrf, path traversal, idor, schwachstellen
summary: Vulnerability classes to check when a diff touches input, auth, crypto, secrets, deserialisation, files or network, and how to phrase a security finding.
---

# Security Categories — vulnerability classes during code review

When the diff touches input parsing, authentication, authorisation,
cryptography, secrets, deserialisation, file paths, or network calls
— go through this catalogue. Don't recite the whole list at the
user; surface the categories the diff actually exposes.

## Input validation

- **SQL injection.** User input concatenated into queries.
  Mitigation: parameterised queries, ORM, prepared statements.
- **Command injection.** User input passed to shell / `exec` / `Runtime`.
  Mitigation: argv arrays, never shell strings.
- **Path traversal.** User input used to construct file paths.
  Look for `..`, absolute paths, leading `/`. Mitigation: normalise
  + validate against an allow-list of base directories.
- **Server-side template injection.** User input rendered through
  a template engine that executes code (Jinja2, Handlebars
  helpers, ERB).
- **XML / XXE.** XML parser with external entity processing on.
  Mitigation: disable external entity resolution.
- **YAML deserialisation.** Some YAML loaders execute arbitrary
  code on load. Use safe-load variants.
- **Regex DoS.** User-supplied regex or input matched against
  catastrophic-backtracking patterns.

Probe: every input from outside the trust boundary needs explicit
validation. Trust boundaries: HTTP request, file upload, network
call, cross-tenant data.

## Authentication & session

- **Auth bypass.** New endpoint that doesn't enforce auth.
- **Privilege escalation.** Endpoint that uses `currentUser.id` from
  a request parameter instead of the session.
- **JWT pitfalls.** `alg: none` accepted, RS/HS confusion, no `exp`
  validation, no audience check.
- **Session fixation.** Session ID reused across login boundary.
- **Insecure logout.** Token still valid after logout.
- **Password handling.** Stored in plaintext, hashed without salt,
  hashed with fast hash (MD5/SHA-1). Use bcrypt / scrypt / argon2.

## Authorisation

- **IDOR (insecure direct object reference).** `/users/123/orders`
  returns order 123 without checking ownership.
- **Tenant leak.** Cross-tenant access via shared cache keys,
  forgotten `WHERE tenant_id = ?`.
- **Mass assignment.** `User.update(req.body)` lets the request set
  fields the user shouldn't (admin flag).

## Cryptography

- **Weak algorithms.** MD5, SHA-1 (for security), DES, ECB mode,
  static IVs.
- **Hand-rolled crypto.** Almost always wrong. Use the library.
- **Bad randomness.** `Math.random()`, `Random` (Java), system time
  for security-sensitive randomness. Use cryptographically secure
  RNG.
- **Certificate validation off.** `verify=False`, `rejectUnauthorized: false`.
- **Hardcoded keys / secrets** in source.

## Secrets

- **Tokens / API keys in source.** Push to git → leaked forever.
- **Secrets in logs.** Auth header, request body, query string.
- **Secrets in error messages.** Stack traces returned to user.
- **Long-lived tokens with too much scope.** "Service token with
  admin rights, never rotated."

## Deserialisation

- **Java `ObjectInputStream`** on untrusted input. RCE.
- **Python `pickle.loads`** on untrusted input. RCE.
- **Ruby `Marshal.load`** on untrusted input. RCE.
- **JSON via libraries that allow arbitrary types** (Jackson with
  default typing on, Newtonsoft with TypeNameHandling.All).
- **YAML.** See input validation above.

## Network / SSRF

- **SSRF.** Request URL constructed from user input. Internal
  services reachable from the server become reachable from the
  attacker.
- **Open redirect.** `?next=<url>` followed without validation.
- **CORS too permissive.** `Access-Control-Allow-Origin: *` plus
  `Allow-Credentials: true` — should never coexist.

## File operations

- **Arbitrary file write / read** based on user input.
- **Symlink attacks** when extracting archives.
- **Zip-slip.** Archive entry with `..` in path escapes the
  extract dir.
- **Tempfile predictable name** vs. mkstemp.

## Logging & error handling

- **Stack traces to user.** Leak internals. Log server-side, return
  generic message.
- **Error message leaks data.** "User foo@bar.com not found"
  enumerates accounts.
- **Debug logs in production.** Auth headers, full request bodies,
  PII.

## How to phrase a security finding

- Specific — "SQL injection at `users.ts:42` — user input concatenated
  into query string. Use parameterised query."
- Severity — security findings are usually **block** unless the
  reachability is unclear. If reachability is unclear, mark
  fix-before-merge with a "needs threat model confirmation" note.
- Cite the category — "this is path traversal" lets the author look
  up the standard mitigation.

## How to NOT phrase one

- "This might be exploitable somehow."
- "I'd be careful here."
- "DOS risk." — DOS is rarely a block-level finding in code review;
  belongs in a perf / capacity review.

## When the diff has no security surface

Say so. Don't manufacture concerns. "Pass 3 surfaces no security
exposure — this is a CSS change."
