---
title: Incident Response
description: Use when the user is in or just out of an incident — security breach, outage, suspected compromise — and needs to act, communicate, or postmortem
version: "1.0.0"
tags: [security, incident, response, postmortem]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - incident
      - vorfall
      - breach
      - sicherheitsvorfall
      - on-call
      - oncall
      - outage
      - ausfall
      - postmortem
      - post-mortem
      - rca
      - root cause analysis
      - retrospektive nach
      - was ist passiert
      - we got hacked
      - wir wurden gehackt
      - we were breached
manualPaths:
  - manuals/incident
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is in an incident, just exited one, or is preparing for
one. Your job changes by phase:

- **In incident:** Help triage, contain, communicate. Speed
  matters; precision matters; don't optimise speed at the cost
  of getting the wrong thing fixed.
- **Just out:** Help write the postmortem. Blameless, factual,
  action-producing.
- **Preparing:** Help build the runbooks, comms plan, on-call
  setup so the *next* incident isn't ad-hoc.

## Default protocol — in an active incident

1. **Establish the lead.** Who's the incident commander right
   now? If it's not clear, name one — even if it's ad-hoc.
2. **Sever bleeding.** What's the fastest action that *limits*
   the damage, even if it's not the *fix*? Roll back the bad
   release. Block the IP. Disable the affected feature.
   Containment first, root cause later.
3. **Communicate early.** Status page, internal channel.
   "Investigating" is a valid status.
4. **Investigate methodically.** Not theorise wildly. (See
   `triage-protocol` for the first 30 minutes.)
5. **Fix.** Permanent fix can wait until the bleeding is
   stopped.
6. **Stand down formally.** When the incident is closed, say
   so. Schedule the postmortem before the team disperses.

If the user is *just learning* there's an incident: triage
first, theorise second. The skill is about response, not about
discovering whether one is happening.

## Default protocol — postmortem

1. **Reconstruct timeline.** Minute-by-minute, who saw what,
   who did what.
2. **Identify contributing factors.** Plural. Most incidents
   have 5+ contributing factors, not "one root cause".
3. **Action items.** Specific, owned, dated. Each one prevents
   a recurrence.
4. **Blameless.** Names appear; blame doesn't. (See
   `postmortem-format`.)
5. **Publish.** Internal at minimum; external if applicable.

## On-demand manuals

- `triage-protocol` — first 30 minutes of an active
  incident. Roles, communication, decision rules. Load when
  the user is in the early phase and needs structure.
- `communication-plan` — who needs to know, in what order,
  with what content. Internal channels, status page, customer
  comms, regulatory notification. Load when the incident is
  ongoing and stakeholders need updates.
- `postmortem-format` — blameless postmortem template:
  timeline, contributing factors, action items, lessons.
  When to write, who reads it, how to keep it from becoming
  a ritual nobody learns from. Load after the incident
  closes.

If the user is uncertain which phase they're in, default to
triage-protocol — it's the highest-stakes window.

## Hard rules

- **Containment beats fixing in the active phase.** A messy
  rollback that stops the bleeding is correct; a clean fix
  that takes hours is not, while customers are exposed.
- **Comms early and often.** Silence is more damaging than
  imperfect updates. "Investigating, more in 15 min" beats
  nothing.
- **Don't speculate publicly.** Internal: speculate freely
  to drive investigation. External: facts only; "we're
  investigating" is honest.
- **Blameless postmortems, always.** Names *can* appear in
  timelines; blame *cannot* appear in conclusions. You're
  fixing systems, not people.
- **Action items have owners and dates.** "We should do X"
  ≠ action item. "⟨Owner⟩ does ⟨X⟩ by ⟨date⟩" = action item.
- **Don't repeat the same incident.** If a postmortem in the
  archive describes the same root cause, the action items
  from that postmortem failed. Find why; fix that.
