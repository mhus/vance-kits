---
triggers: postmortem, retrospektive, blameless, schuldfrei, contributing factors, beitragende faktoren, timeline, zeitleiste, action items, massnahmen, root cause, lessons learned
summary: How to write a blameless, factual postmortem — when, who, the section format, action-item discipline, and follow-through.
---

# Postmortem Format — blameless, factual, action-producing

A postmortem is the artifact that turns an incident into
organisational learning. Done right, the next similar incident
doesn't happen, or happens smaller. Done wrong, it becomes a
ritual nobody learns from.

## When to write one

- **Always for security incidents.** Even minor ones; pattern
  recognition matters more than severity.
- **Always for outages affecting customers > 30 minutes.**
- **Optionally for near-misses.** A close-call that didn't
  cause damage — postmortem teaches you the path that almost
  caused damage.
- **Skip** for: trivial alerts, false positives, third-party
  outages with no impact on you, problems that resolved
  themselves with no investigation needed.

The bar isn't "did damage occur" but "is there a learning
that would prevent or mitigate the next one".

## Who writes it

The IC of the incident, usually with help from the SMEs.

Not assigned to "whoever was on call" as a punishment. Not
done by leadership or anyone else without direct
involvement.

## When to write it

- **Within one week** of the incident closing. Memory
  fades; details get lost. Schedule the postmortem during
  the stand-down call so it doesn't drift.
- **In one sitting** if possible. Multi-week postmortems
  produce documents that read like committee reports.
- **Before the responders disperse** to other work. The
  cost of getting them back together later is high.

## Format — sections

### Header

- **Date** of incident.
- **Duration** of impact.
- **Severity** (your team's scale — SEV1 / SEV2 / etc.).
- **Authors** (IC + SMEs).
- **Status** (draft / reviewed / published).

### Summary

One paragraph. What happened, what was affected, when, what
was done.

```
On 2026-04-12 between 15:35 and 16:42 UTC, the login
service returned errors for ~12% of authentication
attempts. Caused by a deploy at 15:30 that introduced a
regression in token validation. Resolved by rollback. No
data exposure. Customers experiencing intermittent login
failures during the window.
```

### Timeline

Minute-by-minute, who saw what, who did what. Use 24-hour
times in a known timezone.

```
15:30  Deploy of auth-service v1.2.3 begins.
15:32  Deploy completes; error rate begins climbing.
15:35  PagerDuty alert fires; on-call (Alice) acks.
15:37  Alice notes 12% error rate in dashboard;
       opens incident channel.
15:40  Alice declares herself IC; pages Bob (auth team).
15:42  Initial customer-facing update on status page.
15:45  Bob identifies the change in v1.2.3 that introduced
       the regression.
15:50  Decision: roll back to v1.2.2. Bob initiates.
15:55  Customer-facing update: "fix in progress".
16:00  Rollback completes; error rate begins dropping.
16:15  Error rate at baseline; monitoring stable.
16:30  Alice declares incident resolved internally.
16:42  Customer-facing "resolved" message.
```

Names appear (this is who saw / did what). No blame appears.
Facts only.

### What happened

A narrative. What was the technical sequence?

- **What was the trigger?** Deploy, traffic spike, third-
  party event, attacker action.
- **What was the cascading effect?** How did the trigger
  become user-visible?
- **Why didn't existing safeguards catch it?** Tests,
  monitoring, gradual rollout — what should have caught it
  earlier didn't, why?
- **What stopped the bleeding?** What action contained?

### Why it happened — contributing factors

**Don't** identify "the root cause". Most incidents have
multiple factors that combined; eliminating any one of them
might have prevented the incident.

Format: a numbered list of contributing factors. For each:
what, why it contributed, how to prevent.

```
1. Token validation logic changed without unit test
   coverage of the affected path. The path was a low-traffic
   recovery flow; tests focused on the happy path.
2. Canary deploy gates only checked overall error rate;
   regression was specific to the recovery flow, which is
   < 1% of traffic. The 12% error rate on that path
   averaged to 0.1% overall — below the canary threshold.
3. Pre-deploy review focused on functionality changes; the
   token validation change was small and reviewed lightly.
4. No integration test covering the recovery flow + auth
   token interaction.
```

Each factor is a finding that could be acted on.

### What went well

A short list. The incident was contained quickly because:

- Rollback automation worked smoothly.
- On-call response was prompt.
- Customer comms went out within 5 minutes.

This isn't celebration; it's identifying which existing
safeguards / behaviours / tools you want to *preserve* under
future stress.

### What went badly

The flip side. Specific things that delayed or worsened
response:

- Initial dashboard showed wrong baseline; took 5 minutes
  to recognise the spike.
- Status-page update was delayed because the comms tool
  required a fresh login.
- Third SME paged was on PTO; rota wasn't updated.

### Action items

The most important section. Each item:

- **What** — specific, actionable.
- **Why** — connects to a contributing factor.
- **Owner** — one named person.
- **Date** — when committed.

```
1. Add unit test coverage for the token validation
   recovery flow. (Owner: Bob. Date: 2026-04-19.)
2. Update canary gates to monitor per-flow error rates,
   not just overall. (Owner: Carol. Date: 2026-04-26.)
3. Add integration test for recovery flow + token
   validation. (Owner: Bob. Date: 2026-04-26.)
4. Quarterly review of contributing-factor patterns
   across past 4 postmortems. (Owner: SRE lead.
   Date: 2026-05-15.)
```

Bad action items (drop them):

- "Be more careful." Not actionable.
- "Improve our testing." Not specific.
- "We should consider …" Not committed.
- "Discuss in next planning." Punts the work.

If you can't name an owner, the action item is fictional.
Drop it; pick something you *can* commit to.

### Lessons (optional)

A short prose section. What did we learn that's bigger
than any single action item?

- "Canary gates need per-flow visibility, not just global
  metrics."
- "Recovery flows need explicit attention in deploys —
  they're low-traffic but high-impact when broken."

Lessons inform future work; action items are the work.

## Blameless — the rules

### Names appear in timelines, not in conclusions

Timeline: "Alice noticed the alert." Conclusion: not
"Alice didn't notice fast enough" — instead, "alert
notification took 7 minutes to reach the on-call rotation."

Fix the system, not the person.

### Don't grade individual performance

The postmortem is not the place to call out who could have
done better. If individual performance is a concern, that's
a separate conversation, not a public document.

### Assume good faith

Everyone acted on the information they had at the time. The
postmortem reconstructs what they knew; the reader doesn't
get to apply hindsight to grade decisions made in the fog.

### Cultivate honesty

People share the truth in postmortems when they aren't
punished for it. If postmortems become finger-pointing
exercises, the next incident's facts get hidden. Whoever
runs the postmortem culture is responsible for keeping it
safe.

## Distribution

- **Internal at minimum.** All engineers can read.
- **Post in a known place.** Wiki section, dedicated repo,
  searchable archive. Not a Google Doc that gets lost.
- **External version** for customer-impacting incidents.
  Smaller, factual, no internal-only details. "What we
  did to prevent recurrence" is a good externalisable
  section.

## Action-item follow-through

A postmortem with action items that don't get done is a
postmortem that wasted everyone's time. Mechanism for
closing the loop:

- **Items go into the engineering backlog** with the
  postmortem date / link.
- **Quarterly review** of action items across postmortems.
  Which closed? Which slipped? Which were never started?
- **Recurring incident** = previous action items failed.
  Reopen; understand why; refresh.

## Anti-patterns

### Postmortem as ritual

Filed and forgotten. Action items not tracked. Same
incident in 3 months.

Counter: weekly review of open action items; quarterly
review of recurring patterns.

### "Root cause: human error"

Never. Human error is a symptom; the system enabled the
error, the system is the postmortem subject.

### Performative blamelessness

Avoiding any specific facts about individuals, even in
timelines. Now the postmortem is too vague to learn from.

Counter: factual timelines are fine; conclusions stay
system-level.

### Action items without owners

"We need to improve …" Drift. Each item, one owner.

### Action items without dates

"Eventually." Same drift.

### Multi-week drafting

Memory fades; the postmortem becomes a reconstruction
exercise. Write quickly, polish later.

## Output line

- "**Postmortem complete** — N contributing factors,
  M action items owned and dated."
- "**Postmortem in progress** — sections done: ⟨list⟩;
  remaining: ⟨list⟩."
- "**Action items from previous postmortem stale** — see
  ⟨specific⟩, refresh before publishing this one."
