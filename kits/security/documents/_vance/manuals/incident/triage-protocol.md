---
triggers: incident triage, ersten 30 minuten, incident commander, sme, scribe, channel discipline, containment, eindämmung, eskalation, escalation, stand-down, rollback vs forward-fix
summary: Running the first 30 minutes of an incident — establishing roles, channel discipline, orient/contain/investigate phases, escalation and stand-down.
---

# Triage Protocol — first 30 minutes

The early phase of an incident. The decisions made now shape
the next hour. Speed matters; structure matters more than speed.

## Roles to establish, in order

### Incident Commander (IC)

The single person making decisions. Doesn't have to be the
most senior; should be the most-focused-on-coordination.

- **Decides** what gets done; doesn't necessarily *do* it.
- **Tracks** state — what's been done, what's pending.
- **Communicates** to leadership; takes communication-channel
  noise *off* the responders.
- **Owns** the postmortem afterwards.

If no IC has been declared, name one *now*. Better an
ad-hoc IC than no IC. Anyone can call themselves IC by
saying "I'm IC" in the channel; the role is about
behaviour, not authority.

### Subject Matter Experts (SMEs)

The people with hands on the affected systems. Often the
on-call rota for the service.

- **Investigate** what's happening.
- **Execute** containment / fix steps under IC direction.
- **Report** findings to IC.

### Communications lead

Optional for small incidents; required for large ones.

- **Drafts** customer-facing updates (status page).
- **Manages** internal comms channels.
- **Liaises** with leadership / legal / PR.

In small incidents, the IC handles this. In big ones, split
the role so the IC stays focused on technical decisions.

### Scribe

Optional but high-value. Records the timeline as it happens
— who did what, when. Saves an hour during the postmortem.

If no one is dedicated, the IC can dump observations into
the channel; the channel transcript becomes the timeline.

## Channel discipline

A dedicated channel (Slack, MS Teams, IRC, whatever) for the
incident. Why dedicated:

- Cross-references between threads waste investigators'
  attention.
- Latecomers can scroll up to catch up.
- Postmortem timeline reconstruction is easy.

Channel rules:

- **One incident per channel.** Don't pile parallel issues in.
- **Tag the IC** when the IC changes (handover).
- **State changes in plain text:** "I'm rolling back X",
  "rollback complete", "checking metrics".
- **Speculation is fine** in this channel. Mark it: "theory:
  bad deploy at 14:32; testing now".
- **No public-facing speculation.** External comms go
  through the comms lead.

## First 5 minutes — orient

What you're trying to figure out:

- **Is this a real incident or a false alarm?** Check the
  alert against reality. Sometimes alerts fire on phantom
  issues.
- **What's affected?** Which service, which customers,
  which region?
- **How bad is it?** Errors? Downtime? Data exposure? At
  what scale?
- **When did it start?** Compare to recent changes (deploy,
  config, dependency).

Don't fix anything yet. Don't theorise loudly. Look at the
dashboards, the logs, the alert details.

## First 15 minutes — contain

Once you have a rough handle:

- **Sever the bleeding.** What's the fastest action that
  *limits* the damage?
  - Bad deploy: roll back.
  - Bad config: revert config, restart affected services.
  - Compromised credential: rotate immediately.
  - Attacker IP: block at edge.
  - Bad query: kill it; find what triggered it.
  - Affected feature: feature-flag off.
- **Communication:** initial customer-facing update. "We're
  investigating an issue affecting [service]. Updates in
  15 min." Status page goes yellow.
- **Internal communication:** alert the relevant team
  channels; alert leadership if the impact warrants. Don't
  wait until the incident is over to tell people.
- **Document so far:** scribe captures timeline, IC notes
  decisions.

## First 30 minutes — investigate

With the bleeding stopped (or stopping), turn to root cause.

- **Hypothesise.** What changed shortly before the issue?
  Deploys, config, dependency updates, traffic patterns.
- **Test hypotheses** without making things worse. Read-only
  investigation first.
- **Don't fix yet** unless you're sure. Premature fixes
  during investigation create new incidents inside the
  current one.
- **Communication update.** "Cause appears to be X; we're
  testing fix." Or: "Still investigating; update in 15 min."

## When to escalate

Escalate (call additional senior responders, page leadership,
alert PR / legal):

- **Customer data exposure suspected** → security + privacy
  leads.
- **Outage > 30 minutes** → leadership awareness.
- **Public visibility** (social media, press inquiries) →
  PR.
- **Regulatory implications** (GDPR breach window, industry
  compliance) → legal / compliance.
- **The IC isn't enough** — the incident is bigger than one
  person can hold. Sub-divide.

Escalation isn't a failure. It's a signal of scope. Escalating
late is the failure.

## When to stand down

The incident is over when:

- **Bleeding stopped.** No new harm being done.
- **Root cause identified** (or strong hypothesis).
- **Permanent fix in progress** (or workaround sustainable
  short-term).
- **Communication caught up** — customers have the latest
  status.

The IC declares stand-down explicitly: "I'm closing this
incident. Postmortem on Tuesday at 14:00." Clear handoff
prevents the channel from drifting.

## Anti-patterns

### Hero mode

A senior engineer dives in alone, fixes things, doesn't
update the channel, doesn't have a partner. Result: when
they need backup, no one has context. When they're done,
nobody can replay what happened.

Counter: even heroes need an IC and a scribe.

### Theorise-first

The team spends 20 minutes debating root cause while the
service is still bleeding. Containment is delayed.

Counter: contain first; theorise during / after.

### Fix-without-rollback

Engineer pushes a hot-patch on the broken release. New bug
in the hot-patch makes things worse. Two incidents now.

Counter: rollback to last known good is almost always
faster and lower-risk than forward-fix during an incident.

### Channel sprawl

Discussion happens across DMs, original alert thread, new
thread, leadership thread. Investigators can't focus.

Counter: one channel; redirect side discussions back.

### Late comms

The status page goes yellow 25 minutes after customers
notice. Twitter is faster than your status page; that's
worse than no status page.

Counter: comms within 5 minutes of confirming impact.

### "Don't tell yet, we're not sure"

Withholding information from internal team while
investigating. Leadership finds out from external channels.
Trust burns.

Counter: tell internally early; calibrate external comms
to certainty.

### Silent stand-down

Channel goes quiet, people drift away, no formal close.
Postmortem doesn't happen. Same incident in 2 months.

Counter: explicit close + scheduled postmortem.

## Output line

- "**Phase:** ⟨orient / contain / investigate / fixed⟩.
  **Next action:** ⟨specific⟩."
- "**Escalate now** — ⟨reason⟩."
- "**Stand-down ready** — bleeding stopped, root cause
  ⟨known/hypothesis⟩, comms current. Schedule postmortem."
- "**Not in active incident** — see `postmortem-format`
  for retrospective work."
