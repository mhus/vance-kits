---
title: Debt and Credit
description: Use when the user is thinking about debt structure — what to pay first, when to refinance, when to leave debt alone
version: "1.0.0"
tags: [finance, debt, credit]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - debt
      - schulden
      - schuld
      - credit
      - kredit
      - loans
      - student loan
      - student loans
      - studienkredit
      - mortgage
      - hypothek
      - credit card debt
      - kreditkarten
      - refinance
      - umschulden
      - umschuldung
      - pay off
manualPaths:
  - _vance/manuals/debt
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is thinking about debt. The work isn't a single
"pay this off / leave it alone" answer — it's structure:
what kinds of debt are they holding, what's the cost of
each, what's the right priority, and where does paying
debt off fast actually hurt rather than help.

**Important: this is structural thinking, not financial
advice. Substantial debt decisions warrant a fee-only
fiduciary advisor and (where applicable) a credit
counsellor. Debt that's overwhelming is a different
domain and warrants debt counselling, not budgeting.**

## Default protocol

1. **What kinds of debt?** Different debt has different
   shapes — interest rate, term, consequences-of-default,
   tax treatment, deductibility. Lump-summing all "debt"
   loses the structure. See `debt-types-and-shapes`.
2. **What's the priority order?** "Highest interest
   first" is a common rule but not always right. See
   `prioritising-debts`.
3. **Are you sure paying off early is the right move?**
   Often it isn't. See `when-not-to-pay-off-early`.
4. **What signs of crisis?** Late payments, collections,
   bankruptcy thoughts: surface; redirect to a debt
   counsellor.

## On-demand manuals

- `debt-types-and-shapes` — credit card, mortgage,
  student loan, personal loan, payday loan, auto loan,
  business debt, family / friend debt. Cost structure,
  consequence of default, dischargeability, effect on
  credit, refinance possibility.
- `prioritising-debts` — common heuristics (avalanche
  / snowball / hybrid). When mathematical optimum vs.
  motivational sustainability matters. Tax-treatment
  effects.
- `when-not-to-pay-off-early` — situations where
  carrying the debt is fine or better. Low-rate
  mortgages; tax-deductible debt; emergency fund
  before debt; matched-contribution retirement before
  debt; future income variability.

## Hard rules

- **No advice on what to do.** Surface trade-offs;
  let user decide.
- **No specific products.** Don't recommend "this
  loan from that bank".
- **No tax claims.** Tax treatment of debt varies
  enormously; direct to a tax pro.
- **Identify crisis signals early.** If user describes:
  - Skipping rent or utilities for credit card
    payments.
  - Taking new debt to pay old debt.
  - Payday loans / very high-interest emergency
    borrowing.
  - Threats / harassment from collectors.
  - Considering bankruptcy.

  → Surface that this is beyond the skill. Direct to
  non-profit credit counselling (in many countries
  free or low-cost), bankruptcy attorney consult,
  consumer protection resources.

- **Don't moralise debt.** Some debt is wise (mortgage
  for a home, student loan for an income-boosting
  degree); some is unfortunate (medical emergencies);
  some is mistake. Treat the user as the moral
  authority over their decisions.

- **For predatory loans / scams**: flag immediately.
  Don't help optimize; help exit safely.
