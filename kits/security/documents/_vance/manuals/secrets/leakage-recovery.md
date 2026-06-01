# Leakage Recovery — what to do when a secret is exposed

A secret leaked. Maybe pushed to a public repo, maybe in a
client's screenshot, maybe in an error log scraped by a third
party, maybe in a slide that ended up on social media. The
right response is fast and structured — most of the damage
happens in the time between leak and rotation.

## First five minutes — contain

1. **Confirm the leak.** Don't panic on a false alarm; don't
   dawdle on a real one. Check: is it actually exposed? Where?
   By whom?
2. **Assume it's known.** From the moment of leak, treat the
   secret as compromised. Don't reason about "they probably
   didn't see it" — assume they did.
3. **Note the leak time.** When was the secret first exposed?
   Audit windows depend on this.
4. **Initiate rotation immediately.** New secret first, then
   propagate. Don't wait to investigate; investigate while
   rotation runs.

If the leak is at a partner / vendor and they hold the secret
on their side: contact them immediately, but don't wait on
their response to start rotation on your side.

## First hour — rotate

1. **Generate new secret.**
2. **Distribute to services that need it.** Fastest path —
   if you have hot-reload, push to vault, services pick up.
   If you need redeploys, redeploy.
3. **Revoke the old secret.** Don't leave a window where
   both work — that defeats the rotation. (Exception: if the
   service can't tolerate brief downtime, accept overlap for
   the rotation window, but minimise it.)
4. **Verify rotation completed.** Check audit logs, health
   endpoints — no traffic should be using the old secret. If
   it is, find what's holding it and fix.

If the secret is a key (encryption / signing) and you have
data signed/encrypted with it:

- **Continue accepting the old key for verification** of
  pre-leak data, mark it as "no longer issuing".
- **All new operations use the new key.**
- **Plan migration** of data to be re-signed/re-encrypted
  with the new key.

## First day — investigate

Once rotation is complete, take stock:

### What was the secret used for?

Map out: which services, which third-party APIs, which
internal resources used this secret. That's the blast
radius.

### Was the secret used by an attacker?

Check audit logs of every system the secret authenticated
to:

- Logins / API calls from unexpected IPs.
- Activity outside business hours.
- Activity from regions where you don't operate.
- Resource access patterns that don't match the legitimate
  service's behaviour.

This is forensics. Allocate hours for it; you might need
days.

### How did it leak?

The five-why drill:

1. **Where was it exposed?** (e.g. public commit on GitHub.)
2. **Why was it there?** (e.g. developer accidentally
   committed `.env`.)
3. **Why did the commit succeed?** (e.g. no pre-commit hook.)
4. **Why was there no pre-commit hook?** (e.g. team didn't
   set one up.)
5. **Why didn't the team set one up?** (e.g. policy not
   defined / not enforced.)

Each layer is a place to add a control.

## First week — clean up

### Remove the leak

Even though rotation makes the secret invalid, delete it
from where it leaked:

- **Public repo:** rewrite history if possible (`git
  filter-repo`); contact the platform if the commit appears
  in public mirrors / search caches. (Note: if it's been
  public for any time, assume scrapers have it — rotation,
  not history-rewrite, is the actual fix.)
- **Logs:** scrub from log archives if possible.
- **Slides / screenshots:** remove from shared drives;
  contact people to delete copies.
- **Bug-tracking systems:** redact / delete the comment
  containing the secret.

### Add controls to prevent recurrence

Based on the five-why above:

- Pre-commit hooks scanning for known secret patterns.
- Pre-push hooks (defence-in-depth — pre-commit is
  bypassable).
- Server-side push hooks at the git server.
- Secret scanners on CI (GitHub secret scanning, gitleaks,
  truffleHog).
- Education: write down what to do if you see a colleague
  about to leak; what to do if you receive a screenshot
  with a secret.

### Communicate

Who needs to know:

- **Internal:** the team / service owner whose secret it
  was. Their leaders if the blast was wide. Security team.
- **Partners / vendors:** if their API key leaked, their
  abuse / fraud teams need a heads-up to monitor. They may
  also rotate on their side.
- **Customers:** if customer data was at risk and is the
  kind covered by breach notification laws (GDPR, state
  laws), legal obligation kicks in. Talk to legal /
  compliance.
- **Public:** rare and depends. If it's a publicly-available
  service that uses an exposed key to access user data, a
  status page note is usually right.

Keep communication factual. "X happened, we did Y, here's
what's next." Avoid speculation; avoid downplaying.

## Special cases

### A leaked OAuth token / API key with broad scope

Worse than a normal credential leak — the attacker has the
permissions of the original holder. Rotate, audit broadly,
and consider revoking related tokens (if the leak might
have been used to issue more).

### A leaked private key (TLS, signing, encryption)

Rotation is more complex — you also need to:

- **Re-issue certificates** that depend on the key.
- **Revoke the old certificate** (CRL / OCSP).
- **Re-sign / re-encrypt data** that used the key, where
  practical.

Plan for hours-to-days; coordinate with whoever runs the
PKI.

### A leaked DB credential

- Rotate the DB user's password immediately.
- Audit DB access logs for the leak window.
- Check for data modifications, exfiltrations, schema
  changes.
- Take a snapshot of the DB if forensics needs it; don't
  let normal operations overwrite evidence.

### A leak that's been public for a long time

The secret has been public for weeks / months. Assume:

- Scrapers have it.
- Botnets are using it (test by checking traffic patterns).
- Rotation might surface unexpected breakage (services using
  the old secret unexpectedly).

Rotate carefully; expect more fallout than a fresh leak.

## What NOT to do

- **Don't rewrite git history and call it done.** History
  rewrite doesn't reach mirrors, forks, search caches, the
  attacker's clone. Rotation is the actual fix.
- **Don't lecture the leaker (right now).** Process review
  comes after containment. The person who leaked is most
  motivated to prevent the next one — keep them on your
  side.
- **Don't skip the investigation because rotation is done.**
  Rotation closes the future; investigation tells you what
  happened in the past, and whether you have a bigger
  problem.
- **Don't communicate before facts are settled.** "We may
  have been breached" is fine; "we were definitely not
  breached" before forensics is risky if you're wrong.
- **Don't rotate quietly.** People will need to know — at
  least the people whose work depends on the rotated
  secret.

## Anti-patterns from the post-incident

- **No record of what was rotated.** Six months later, was
  the staging key rotated? Nobody remembers. Document the
  rotation in an incident log.
- **Ad-hoc rotation discipline.** Each leak is rotated
  in a custom way. Build runbooks; the next leak rotates
  faster because the steps are written.
- **Punishing the leaker.** A blame culture means the next
  person to notice a leak hides it. Blameless post-mortem
  (see `incident-response`); fix the system that allowed
  the leak.

## Output line

- "**Containment status:** ⟨rotated / partial / not started⟩."
- "**Investigation status:** ⟨in progress / complete⟩, ⟨n⟩
  suspicious events under review."
- "**Communication needed:** ⟨specific stakeholders⟩."
- "**Controls added to prevent recurrence:** ⟨specific
  controls⟩."
