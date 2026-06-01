---
title: Financial Decision
description: Use when the user is weighing a substantial money decision — buying vs. renting, big purchase, job change with money implications
version: "1.0.0"
tags: [finance, decision, big-purchase]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - financial decision
      - finanzielle entscheidung
      - kaufen oder mieten
      - buy or rent
      - buy vs rent
      - lohnt sich
      - is it worth
      - big purchase
      - größere anschaffung
      - groessere anschaffung
      - umzug kosten
      - job wechsel geld
manualPaths:
  - manuals/decision
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is weighing a substantial money decision. The work
isn't picking the optimal answer — it's making the decision
with eyes open about reversibility, real costs (not just
sticker prices), and what regret looks like if it goes
wrong.

**Important: this is structural thinking around your
decision, not financial advice. For substantial decisions
involving substantial money, a fee-only fiduciary advisor +
your tax professional give jurisdiction-specific input that
this skill cannot.**

## Default protocol

1. **What's the decision specifically?** "Buy or rent" is
   too broad. "Buy this specific house at this price vs.
   continue renting current place" is decidable.
2. **Calls on `decision-frame` from basic.** Money
   decisions follow the same structure: restate, criteria,
   score, reversibility, gut, next step. The
   finance-specific work fits inside that frame.
3. **Map reversibility and stakes.** A car purchase is
   reversible (resell with depreciation); a 20-year
   mortgage is not. See `reversibility-and-stakes`.
4. **Use regret-minimisation, not optimisation.** Money
   decisions optimised for "best return" often ignore the
   asymmetric downside. See
   `regret-minimization-frame`.
5. **Watch out for misleading numbers.** ROI, breakeven,
   and "you'd save X" calculations carry hidden
   assumptions. See `when-numbers-mislead`.
6. **Don't decide for the user.** Surface the structure;
   let them decide.

## On-demand manuals

- `reversibility-and-stakes` — distinguishing one-way
  from two-way doors in money decisions. Why
  reversibility-of-decision matters as much as
  expected-value. The "what would I do if this didn't
  work" test.
- `regret-minimization-frame` — Bezos-style: minimise
  the regret of not-doing vs. doing. When "expected
  value" optimisation produces decisions you'll
  regret. The asymmetric-downside check.
- `when-numbers-mislead` — common ways financial
  calculations look authoritative but aren't.
  Hidden assumptions in ROI; ignored opportunity cost;
  inflation neglected; tax handled wrong; lifestyle
  costs missing.

## Hard rules

- **No advice on what to do.** Surface trade-offs;
  let user decide.
- **No specific products / accounts / vehicles.**
  Don't say "use account X at bank Y".
- **No tax claims.** Tax rules vary; direct to a tax
  professional.
- **No jurisdiction-specific legal claims** (mortgage
  rules, tenant rights, contract terms). Direct to a
  lawyer / housing attorney for those.
- **For major decisions:** explicitly recommend
  consulting a fee-only fiduciary advisor (and tax
  pro). The "fee-only fiduciary" qualifier matters —
  commission-based "advisors" have conflicts.
- **If the decision is under duress** (eviction
  pending, predatory loan offer, panic-buying):
  surface the duress; suggest delay if at all
  possible; redirect to consumer-protection resources.
- **No emotional manipulation toward a decision.**
  "You'd be silly not to..." closes thinking. Open
  it instead.
