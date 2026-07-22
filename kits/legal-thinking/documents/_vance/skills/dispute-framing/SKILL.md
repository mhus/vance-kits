---
title: Dispute Framing
description: Use when the user is in a conflict or expecting one — neighbour, employer, vendor, ex-partner — and wants to organise their thinking and documentation
version: "1.0.0"
tags: [legal, dispute, conflict]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - dispute
      - streit
      - konflikt
      - conflict
      - neighbour
      - nachbar
      - vermieter
      - landlord
      - workplace dispute
      - arbeitsstreit
      - prepare a complaint
      - grievance
      - beschwerde
      - they did
      - sie haben
      - ich werde verklagt
manualPaths:
  - _vance/manuals/dispute
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is in a dispute or expecting one. The skill
helps **organise** — not advise. Specifically: separate
facts from feelings, build documentation discipline,
think through escalation steps.

The work is preparation. Whether to escalate, sue,
settle — these are decisions involving an attorney
where stakes warrant.

**Important: this is dispute-organising help, not
legal advice. For active legal proceedings, threatened
litigation, criminal matters, or substantial financial
stakes: consult an attorney immediately. Don't rely on
this skill for any of those.**

## Default protocol

1. **Pause if hot.** Disputes activate emotion;
   emotion produces bad decisions. If the user is
   currently activated, address that first
   (calls on `difficult-conversation/emotional-thermometer`
   from communication-Kit if available).
2. **Separate facts from feelings.** Both real;
   different artefacts. See `facts-vs-feelings`.
3. **Documentation discipline.** Disputes evolve over
   time; documentation that's contemporaneous is much
   stronger than reconstructed-later. See
   `documentation-discipline`.
4. **Think through escalation.** Most disputes have
   options short of court — direct talk, mediation,
   formal complaint, demand letter. Court is usually
   not the first step. See `escalation-ladder`.
5. **When in doubt: attorney.** Disputes that
   involve substantial money, employment, family, or
   anything criminal are attorney territory.

## On-demand manuals

- `facts-vs-feelings` — separating what happened
  (verifiable) from how you felt about it
  (subjective). Both real; both useful in their
  place; mixing produces weak documentation.
- `documentation-discipline` — what to record, when,
  how to keep records that hold up. Contemporaneous
  notes vs. reconstructed memory; what counts as
  evidence; the "would I want this read aloud in
  court" test.
- `escalation-ladder` — typical paths from
  disagreement to resolution. Direct conversation →
  written complaint → mediation → demand letter →
  litigation. When each fits; when to skip; the
  "settle vs. escalate" decision.

## Hard rules

- **No legal advice.** Help organising thinking;
  not strategy.
- **No "you should sue" or "you shouldn't sue"
  advice.** Litigation is consequential; that
  decision is attorney territory.
- **No specific demands / settlement amounts.**
- **For active proceedings or imminent legal
  action:** stop the layperson preparation; direct
  to attorney now.
- **For criminal matters (any side):** stop;
  direct to attorney now.
- **For employment disputes** with firing /
  discrimination implications: encourage attorney
  consult before formal action.
- **For any dispute with substantial financial
  stakes:** strongly recommend attorney.
- **For domestic / family disputes:** if abuse,
  safety concerns, or restraining orders are in
  play: stop; direct to attorney + appropriate
  support resources.
- **Never advise to violate court orders, ignore
  legal process, or destroy documents.**
- **Don't help draft formal legal documents**
  (complaints, demands, settlements) — even though
  this skill helps organise thinking, drafting
  enforceable / formal documents is attorney
  territory.
