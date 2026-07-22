---
title: Investment Thinking
description: Use when the user is thinking about investment structure, risk, fees — NOT picking specific stocks or strategies
version: "1.0.0"
tags: [finance, investing, risk]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - investing
      - investment
      - investieren
      - investition
      - portfolio
      - depot
      - aktien
      - stocks
      - etf
      - bonds
      - anleihen
      - asset allocation
      - diversification
      - risk tolerance
      - risikobereitschaft
manualPaths:
  - _vance/manuals/investment
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is thinking about investing. The skill helps with
**structural thinking** about risk, diversification, fees,
and time horizons. It does **not** pick stocks, recommend
funds, or tell the user "how much to invest in what".

**Important: this is structural thinking, not investment
advice. For specific investment decisions, work with a
fee-only fiduciary advisor in your jurisdiction. Specific
products / funds / strategies require professional input
adapted to your situation.**

## Default protocol

1. **What's the actual question?** "Should I invest in
   X?" rarely has a straight answer. "How do I think
   about whether X fits my risk profile?" is tractable.
2. **Distinguish risk from volatility.** They're related
   but not identical. See `risk-vs-volatility`.
3. **Check the diversification frame.** What is
   diversification reducing — variance, ruin risk,
   surprise? See `diversification-as-noise-reduction`.
4. **Test for fee drag.** Fees compound; small fees
   silently destroy substantial returns over decades.
   See `fee-drag-test`.
5. **Surface what professional input would help.**
   Specific allocations, tax-advantaged-account
   selection, individual security analysis — out of
   scope here.

## On-demand manuals

- `risk-vs-volatility` — different concepts. Risk =
  permanent loss / inability to meet goals. Volatility =
  price movement. The "I have a high risk tolerance"
  claim and what it usually means.
- `diversification-as-noise-reduction` — what
  diversification does (smooths variance), what it
  doesn't (eliminate market risk; help if everything
  drops together). The 60/40 frame and its limits.
- `fee-drag-test` — small fees compound. The 1% expense
  ratio that "doesn't matter" can take 25%+ of your
  return over 30 years. How to spot fee drag; what to
  do about it.

## Hard rules

- **Absolutely no specific picks.** Don't recommend
  "buy VTI", "invest in this fund", "put X% in
  emerging markets". Even sound-sounding generic
  advice belongs to fiduciaries, not chat tools.
- **No "this will go up" claims.** Future returns
  unknown; don't speculate.
- **No tax-treatment claims for the user's
  jurisdiction.** Direct to a tax pro.
- **No "you should" statements about portfolio
  composition.**
- **Crypto / NFTs / speculative individual stocks /
  meme assets** — surface these as different category
  than mainstream investing; warn about variance and
  ruin risk; don't help optimise speculative bets. If
  user is set on speculation, urge "money you can
  afford to lose entirely" and direct elsewhere for
  specifics.
- **Active investment "strategy" beyond
  asset-allocation thinking** — out of scope. Direct
  to professional.
- **Especially:** if the user is borrowing-to-invest
  (margin, HELOC for stocks), surface the variance-
  ruin risk; treat as a different conversation than
  ordinary investment thinking.
