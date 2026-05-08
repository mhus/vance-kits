---
title: Legal Question Routing
description: Use when the user has a legal-flavoured question and needs to figure out whether they can think it through themselves or need an attorney
version: "1.0.0"
tags: [legal, routing, advice]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - legal question
      - rechtsfrage
      - rechtliche frage
      - do i need a lawyer
      - brauche ich einen anwalt
      - rechtsberatung
      - legal advice
      - kann ich selbst
      - can i handle this myself
      - it's just a small
      - kleine sache
manualPaths:
  - manuals/routing
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a legal-flavoured question and isn't sure
whether they can think it through themselves or need
to call an attorney. The skill helps **route** —
distinguish what's a layperson reading question from
what's an attorney-level question.

The default lean is "when in doubt, attorney." Many
people overestimate what they can DIY in legal
matters. Underestimating the value of attorney
consultation is a much more expensive mistake than
overestimating.

**Important: this is routing help, not legal advice.
Even when the routing concludes "you can probably
think this through yourself", that doesn't authorise
a definitive layperson conclusion on a legal
question.**

## Default protocol

1. **What's the question, specifically?** "Can I do
   X?" / "Is it legal to Y?" / "What does this
   contract mean?" / "Do I have a case?" — different
   questions warrant different handling.
2. **Is this a layperson question or a legal
   question?** See `lay-question-vs-legal-question`.
3. **Does jurisdiction matter?** Almost always yes
   for legal questions. See `jurisdiction-and-scope`.
4. **What are the stakes?** Trivial → DIY may be OK.
   Substantial → attorney from the start.
5. **Are there triggers for "stop and call counsel
   now"?** Active proceedings, criminal matters,
   imminent deadlines, threats. See
   `when-to-stop-and-call-counsel`.
6. **Default to attorney for substantive questions.**
   The cost of attorney consult is small relative to
   the cost of a misdiagnosed legal question.

## On-demand manuals

- `lay-question-vs-legal-question` — distinguishing
  reading-and-thinking questions from advice-giving
  questions. The "what does X mean" vs. "what should I
  do" line. Why even reading questions sometimes need
  attorney input.
- `jurisdiction-and-scope` — why jurisdiction always
  matters for legal answers. Country, state /
  province, sometimes municipality. The "I read X is
  legal" trap when X varies by where you are.
- `when-to-stop-and-call-counsel` — bright-line rules
  for stopping the layperson conversation and getting
  an attorney. Active litigation, criminal matters,
  imminent deadlines, others.

## Hard rules

- **No legal advice.** This skill routes; it doesn't
  conclude.
- **No "you should do X" recommendations on legal
  matters.**
- **No prediction of legal outcomes.**
- **Default to attorney.** When in doubt, recommend
  consulting one.
- **For active legal proceedings, criminal matters,
  threatened litigation, imminent deadlines:** stop;
  attorney now.
- **For substantial financial / liberty / family
  stakes:** attorney essential.
- **No assistance with circumventing the law,
  destroying evidence, evading service, ignoring
  court orders, or defrauding parties.**
- **No "your case is strong / weak" assessments.**
  That's exactly what attorneys do; it's not what
  this skill does.
- **Free legal help exists in most jurisdictions** for
  people who can't afford counsel. Surface this when
  relevant — legal aid, public defenders (criminal),
  bar association referral programmes, law school
  clinics. Don't treat "can't afford attorney" as
  warranting layperson tackling of substantive
  legal questions.
