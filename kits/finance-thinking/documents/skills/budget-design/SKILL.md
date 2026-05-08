---
title: Budget Design
description: Use when the user wants to think about cashflow structure — categories, predictability, where money disappears
version: "1.0.0"
tags: [finance, budget, cashflow]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - budget
      - budgetieren
      - haushaltsbuch
      - cashflow
      - cash flow
      - geldfluss
      - track expenses
      - ausgaben
      - einnahmen
      - finanzplan
      - household budget
manualPaths:
  - manuals/budget
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user wants to think about budgeting. Goal isn't a spreadsheet
template — it's structure: where money comes from, where it goes,
where it disappears unaccounted, and what categories actually
match how the user lives.

**Important: this skill helps you design a thinking-frame around
your finances. It is not financial advice. For specific decisions
involving substantial amounts, consult a fee-only fiduciary
advisor.**

## Default protocol

1. **What's the actual question?** "How do I budget?" is too
   broad — narrow to: tracking what's there, designing
   categories, identifying leaks, planning for upcoming costs,
   negotiating with a partner about spending.
2. **Map cashflow first.** Categories without a real picture of
   inflow/outflow are noise. See `cash-flow-mapping`.
3. **Design categories that fit reality.** Generic "groceries /
   transport / entertainment" categories miss user-specific
   patterns. See `category-design`.
4. **Don't optimise prematurely.** First track; then design;
   then adjust. Skipping to "the perfect budget" before
   knowing actuals produces a budget that doesn't match life.
5. **Plan for what budgets typically miss.** See
   `what-budgets-fail-at`.

## On-demand manuals

- `cash-flow-mapping` — getting the actual picture: regular
  inflows, regular outflows, irregular costs, hidden flows.
  Why "what's left over" isn't the same as "what's
  available".
- `category-design` — categories that match your life vs.
  borrowed templates. The 50/30/20 frame and its limits.
  When fewer categories beat more.
- `what-budgets-fail-at` — common gaps: irregular expenses,
  joint finances, lifestyle creep, irregular income, the
  "small purchases" trap.

## Hard rules

- **No financial advice.** Skills here are structural thinking
  aids, not "you should do X with your money".
- **No specific product / fund / stock picks.** Don't tell the
  user "use Vanguard" or "open an account at X".
- **No tax claims.** Tax rules vary by jurisdiction and
  individual situation. Direct to a tax professional.
- **Don't moralise spending.** "You spend too much on coffee"
  is judgement, not analysis. The user decides what their
  money is for.
- **If signs of debt crisis surface** (rent unpaid, payday
  loans, can't afford essentials): surface that this is
  beyond budgeting — direct to a debt counsellor / consumer
  advisor.
- **Don't conflate budgeting with investment.** They're
  different problems. Investment-thinking is a separate
  skill.
