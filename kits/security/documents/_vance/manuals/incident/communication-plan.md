# Communication Plan — who hears what, when

In an incident, the communication failure usually causes more
damage than the technical failure. Customers find out from
Twitter; leadership finds out from press; legal finds out after
the breach-notification window has passed.

The fix isn't "tell more people more". It's *structured*
communication: known audiences, known triggers, known content.

## Audiences and what they need

### Customers (or end-users)

**Need:** Is the service affected? Are they at risk? What
should they do?

**Want to hear:** "We are aware and working on it." "Use
[workaround]." "Resolved at [time]."

**Don't want to hear:** technical detail, blame, speculation
about cause.

**Channel:** status page, email (for breaches),
in-product banner.

### Internal teams (other engineering teams)

**Need:** is my service affected? Should I freeze deploys?
Should my team help?

**Want to hear:** what's broken, what's contained, what's
the scope, when's the next update.

**Don't want to hear:** politics, comms-team-drafted prose.
Plain technical speech.

**Channel:** internal incident channel.

### Leadership

**Need:** how big is this? Reputation risk? Revenue impact?
Will I be asked about it by the board / press?

**Want to hear:** scope summary, ETA, decisions they need
to make, what's been told to whom externally.

**Don't want to hear:** technical detail unless it bears on
their decision; finger-pointing.

**Channel:** dedicated leadership update; not the incident
channel (don't put leadership commentary in front of
responders).

### Legal / Compliance

**Need:** Does this trigger breach-notification obligations?
Liability exposure? Contract breach?

**Want to hear:** facts, time-stamped. What data was
involved. Who was affected.

**Don't want to hear:** "definitely / probably / maybe"
mush.

**Channel:** dedicated; involve early when data exposure
is in question.

### Press / PR

**Need:** what to say if asked.

**Want to hear:** approved messaging, factual scope, what
NOT to confirm or deny.

**Channel:** out-of-band; press team is involved before
press is, not after.

### Regulators (if applicable)

**Need:** depends on jurisdiction and incident type. GDPR:
72-hour clock for personal-data breaches. SEC for material
cyber incidents (US public companies). Sector-specific
(HIPAA, PCI-DSS, etc.).

**Want to hear:** facts in the form their report templates
require. Specific time stamps; specific data categories;
specific scope.

**Channel:** their official portal / form. Legal handles.

## Communication triggers — what fires what

| Event | Tell customers | Tell internal | Tell leadership | Tell legal | Tell press |
|---|---|---|---|---|---|
| Suspected outage / partial outage | yes (early, "investigating") | yes | optional | no | no |
| Confirmed outage > 5 min | yes (status page) | yes | optional | no | no |
| Confirmed outage > 30 min | yes (regular updates) | yes | yes | no | maybe (be ready) |
| Suspected security breach | no (until confirmed) | yes (limited circle) | yes | yes | no |
| Confirmed security breach | yes (when scope known) | yes | yes | yes | yes (PR-led) |
| Customer data exposed | yes (per legal) | yes | yes | yes (urgent) | yes (per PR/legal) |
| Recovered, postmortem pending | "resolved" message | yes | yes | maybe | maybe |

## Status page rules

The most-public surface during an incident.

- **Update within 5 minutes** of confirming impact.
- **Update every 15 minutes** even if there's no progress;
  silence is worse than "still working on it".
- **Plain language.** No technical jargon; no "5xx errors"
  unless the audience genuinely understands.
- **Honest.** "Investigating" is honest. "Resolved" before
  it's resolved is dishonest and erodes trust permanently.
- **Affected services named.** Don't bury "all customers"
  vs. "EU customers only".
- **Don't speculate cause.** "We are investigating" — not
  "appears to be a database issue".
- **Resolution message** when it's actually resolved, not
  when you hope it is.

## Internal updates

Cadence + format:

- **Every 15-30 minutes** in the incident channel.
- **Header line:** state (investigating / contained /
  fixing / resolved); affected services; ETA if any.
- **Plain technical detail** appropriate to the audience.
- **Tag IC** when the IC changes.

Example:

```
[15:42] INVESTIGATING — login service degraded since 15:35
- Errors at ~12% of /login calls
- Suspect: deploy at 15:30 (auth-service v1.2.3)
- Action: rolling back now (IC: @alice)
- Next update by 15:55
```

## Customer-comms templates

### Initial — investigating

> We are aware of an issue affecting [service / region /
> customers] and are investigating. We'll provide an update
> shortly.

### Update — identified, no fix yet

> We have identified the cause of the issue affecting
> [service]. We are working on a fix and will update again
> within [time].

### Update — fix in progress

> A fix is being deployed. We expect [service] to recover
> within [time]. Some [users / regions / functions] may
> still see degraded performance.

### Resolved

> The issue affecting [service] has been resolved. All
> services are operating normally. We'll publish a
> retrospective with more details within [period].

### Resolved — security incident with customer impact

(Coordinate with legal / PR before publishing.)

> On [date], we identified [a security issue / unauthorised
> access / a data exposure] affecting [scope]. We have
> [contained / mitigated] the issue. [What customers need
> to do, if anything]. We will provide a full report by
> [date].

Avoid: "may have been affected" / "it appears" / "we
believe". Either you know, or you don't. If you don't
know yet, say "we are determining the scope."

## What NOT to communicate

- **Speculation about cause externally.** "May be due to
  ..." in public. Wait until you know.
- **Names of individuals** in public-facing comms.
  Engineering culture stays internal.
- **Premature "resolved".** If it might come back, don't
  declare resolved.
- **Apology for things you're not actually sorry about.**
  "We apologise for any inconvenience" is fine; specific
  apologies for specific harms wait for the postmortem.
- **Promise that won't happen again** — you can't promise
  that. "We are taking steps to prevent recurrence" is
  honest.

## After the incident

- **Customer-facing retrospective** (incident report) within
  one week. Even short. Even if just on the status page.
  Customers remember whether you publish; they reward
  transparency.
- **Internal postmortem** — see `postmortem-format`.
- **Legal / regulatory follow-up** if applicable.

## Anti-patterns

### Silence

The incident-team is busy fixing; nobody updates anyone.
External pressure builds, internal pressure builds, the
team gets *more* interrupted. Designate a comms person; their
job is to update so the technical responders can focus.

### Over-specific updates

"The query at line 47 of order-service.ts is misbehaving."
Customers don't care; competitors do. Keep externally-
visible comms scoped to impact and scope.

### Comms-by-IC

The IC writes the customer-facing update mid-fix. Two
problems: IC is too busy, and IC is too close (over-
technical). Comms lead writes; IC approves.

### Last-minute regulatory

Realising at hour 70 of a 72-hour breach-notification
window that you need to file. Always involve legal early
when data exposure is on the table.

## Output line

- "**Comms ready:** ⟨draft for ⟨audience⟩⟩."
- "**Audiences not yet covered:** ⟨list⟩."
- "**Hold comms** — ⟨reason⟩, escalate to ⟨role⟩ first."
