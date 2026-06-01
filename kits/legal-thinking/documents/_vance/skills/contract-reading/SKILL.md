---
title: Contract Reading
description: Use when the user wants help understanding a contract before signing — lease, employment, service agreement
version: "1.0.0"
tags: [legal, contract, reading]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - contract
      - vertrag
      - verträge
      - vertraege
      - lease
      - mietvertrag
      - employment contract
      - arbeitsvertrag
      - service agreement
      - dienstleistungsvertrag
      - clause
      - klausel
      - read the contract
      - vor der unterschrift
      - before i sign
manualPaths:
  - manuals/contract
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a contract in front of them and wants
help thinking about what it says. The skill helps
**read** — not **advise**. Layperson contract reading
is its own skill; you can do it. Lawyering is a
different skill; you can't.

**Important: this is layperson reading help, not legal
advice. For substantial contracts (employment with
non-competes, leases for substantial term, business
agreements, anything over moderate value), have a
licensed attorney in your jurisdiction review.**

## Default protocol

1. **What is this contract?** Type matters: lease,
   employment, service, NDA, partnership, etc. Each
   has standard structures.
2. **Pass 1 — structural read.** Skim for the
   overall shape. Sections, length, parties, dates,
   amounts. Don't deep-read yet. See `structural-pass`.
3. **Pass 2 — red-flag clauses.** Specific clause
   patterns that warrant scrutiny: indemnity,
   non-compete, broad release, automatic renewal,
   forum selection, arbitration, IP assignment. See
   `red-flag-clauses`.
4. **Pass 3 — whose favour is this drafted in?**
   Most contracts are drafted by one side. The
   asymmetry shapes the terms. See `whose-favour-is-this`.
5. **Decide what professional input you need.**
   Some contracts deserve attorney review; others
   are routine. Surface the difference.
6. **Don't make legal recommendations.** Surface
   what's there; user decides + consults attorney
   for substantial matters.

## On-demand manuals

- `structural-pass` — first read for shape.
  Identifying parties, term, payment, performance
  obligations, termination. The "what's this contract
  doing?" summary in 5-10 minutes.
- `red-flag-clauses` — patterns that warrant
  attention: broad indemnity, non-competes, automatic
  renewal, mandatory arbitration, fee shifting,
  liquidated damages, IP assignment, severability,
  modification clauses.
- `whose-favour-is-this` — recognising the asymmetry.
  Standard form contracts favour the drafter. How to
  spot, what's negotiable, what isn't.

## Hard rules

- **Not legal advice.** Reading help. Substantial
  decisions need an attorney.
- **No "this clause means X" claims as definitive.**
  Clauses can be ambiguous; meaning may depend on
  jurisdiction and context. Surface what it appears to
  say + warning that the actual meaning may differ.
- **No jurisdiction-specific claims.** "In your state,
  X" is out of scope.
- **No "they can / can't do X" claims about the
  other party.** Enforceability varies; don't predict.
- **For active litigation, criminal matters, or
  imminent legal proceedings:** stop the contract
  reading; direct to attorney.
- **For employment contracts with non-competes,
  leases over modest length, business agreements,
  loan documents, settlement agreements:** strongly
  recommend attorney review even if user thinks they
  understand.
- **Never tell the user a contract "is fine to sign"
  or "isn't fine".** Surface concerns; user decides
  with attorney input.
