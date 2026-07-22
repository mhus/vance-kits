---
triggers: versteckte annahmen, hidden assumptions, roi, break-even, rendite, return, nominal vs real, opportunitätskosten, opportunity cost, zinseszins projektion, survivorship bias, verkaufstricks
summary: Exposes how financial calculations mislead through hidden assumptions (inflation, returns, taxes, horizon) and framing tricks, and how to stress-test ROI, break-even and compound-interest claims.
---

# When Numbers Mislead — financial calculations with hidden assumptions

A "$X is the breakeven point" calculation looks
authoritative. The number is precise. The number can
also be wrong by a lot, because the assumptions
underneath are hidden.

This manual covers the common ways financial calculations
mislead.

## Hidden assumptions

Every financial calculation rests on assumptions about:

- **Future inflation.** The 4% rule assumed historical
  inflation; today's inflation may differ.
- **Future returns.** "7% return" — average over what
  period? Geometric vs. arithmetic? After fees?
- **Tax treatment.** Pre-tax / post-tax / capital gains
  differ.
- **Time horizon.** Calculations sensitive to whether
  you hold 5 years vs. 30.
- **Behavioural assumption.** "If you save $X per
  month..." assumes you actually do.

If a calculation doesn't surface its assumptions, the
number is doing more rhetorical work than analytical
work.

## Common misleading calculations

### "ROI is X%"

Common in real estate, business investments, side
hustles.

Typical issues:

- **Doesn't include opportunity cost.** Money in this
  investment isn't earning elsewhere.
- **Ignores time value.** $X return over 1 year ≠ $X
  return over 5 years.
- **Pre-tax vs. post-tax** confusion.
- **Doesn't include all costs.** Maintenance,
  insurance, downtime, opportunity cost of personal
  time invested.
- **Cherry-picked period.** "5-year ROI" calculated
  over the best 5-year window.

Probe: what would I have if I'd put the money in a
boring index fund instead, over the same time, with
the same tax treatment?

### "Break-even in N years"

Common in solar panel, electric vehicle, "buy vs.
lease" calculations.

Typical issues:

- **Discount rate ignored.** $X today ≠ $X in N years.
- **Maintenance excluded.** Calculations often assume
  the asset continues working without expense.
- **Replacement excluded.** What if it dies year N+1?
- **Opportunity cost** of the upfront capital.
- **Use case assumed.** "Pays back if you drive 15K
  miles/year" — what if you drive 8K?

Probe: at what use case does break-even drop below the
asset's lifespan? You may not match the assumption.

### "You'd save $X by doing Y"

The classic "you'll save $1000/year by switching to..."

Typical issues:

- **Comparison-shopping cost ignored.** Time spent
  switching has value.
- **Switching costs ignored.** Cancel fees, transition
  pain.
- **Status-quo benefit underweighted.** What you
  already have works; what you'd switch to is unknown.
- **Doesn't aggregate over multiple optimizations.**
  Each individual switch saves a little; the
  cumulative time cost can exceed the cumulative
  savings.

Probe: dollars per hour of effort. Below your hourly
opportunity cost, the optimisation is negative-value.

### "X% return over Y years"

Investment marketing standard.

Typical issues:

- **Compounded vs. average.** "10% average return" can
  be very different from "10% compound annual growth
  rate". A loss year hurts more than a gain year
  helps; arithmetic average overstates.
- **After-fee or before-fee?** Fund's quoted return
  often pre-fee; your real return is after-fee.
- **After-inflation or nominal?** 7% nominal at 3%
  inflation is 4% real. Long horizons compound this
  difference dramatically.
- **Survivorship bias.** "X-year return" of a fund
  that survived. Funds that died don't appear; the
  survivors look better than the average choice.

### "House appreciates X% per year"

Real estate marketing standard.

Typical issues:

- **National average ≠ your area.** Local market is
  what affects you.
- **Doesn't include carry costs.** Maintenance (~1-3%
  of value/year), property tax, insurance, repairs.
- **Doesn't include transaction costs.** ~6-10% to
  sell.
- **Doesn't include time invested.** Owners spend
  hours on maintenance, planning, decisions.
- **Doesn't include leverage effects.** Mortgage
  amplifies both gains and losses.
- **"Average" includes high-growth metros and
  declining ones.**

Probe: real return on real estate after all costs in
your area. Often single-digit; sometimes negative.

### "Tax-deductible / tax-advantaged"

"It's a write-off" doesn't mean free.

Typical misunderstandings:

- **A $1000 deduction at 24% bracket = $240 saved**,
  not $1000.
- **Pre-tax retirement contribution** lowers tax now
  but is taxed on withdrawal.
- **"Use it or lose it" pressures** can cause
  unnecessary spending to capture tax benefit.

Tax effects are real but smaller than informal claims
suggest.

### "Mortgage interest is deductible"

US-specific (and changes by tax law). Often
misunderstood:

- **Standard deduction** may be larger than
  itemized for many filers.
- **Even when deductible**, you're paying $1 to save
  ~$0.20-$0.37 (depending on bracket).
- **Net cost** of mortgage interest is still mostly
  the interest itself.

The "deductible" framing makes mortgage interest seem
free; it isn't.

### "Inflation will eat my savings"

Sometimes true. Often used to push specific
investments.

Issues:

- **High inflation eats nominal savings.** Real
  inflation-adjusted return on a savings account can
  be negative.
- **But:** alternative investments have variance.
  Inflation-protected savings (TIPS, I-bonds in the
  US) exist for risk-free real returns.
- **Don't confuse "fight inflation" with "buy crypto /
  stocks / X".** The fight-inflation logic is real;
  the specific vehicle is a separate decision.

### Compound interest projections

"$X/month at 7% becomes $Y million in 30 years".

Issues:

- **Sequence risk.** A loss early in retirement is
  much worse than a loss late.
- **Real vs. nominal.** $1M in 30 years at 3%
  inflation buys what $410K buys today.
- **Tax drag.** Account type matters enormously.
- **Behaviour assumption.** Real people don't save
  exactly $X every month for 30 years uninterrupted.

Compound interest is real and powerful; the projections
are usually rosy by 20-50%.

## Hidden costs commonly missed

### Time

Your time has economic value (your hourly rate or
opportunity cost of leisure). Hours spent comparison
shopping, managing rentals, doing your own
maintenance, etc. are real costs.

### Mental load

Managing complex finances costs cognitive bandwidth
that has indirect costs in your professional / personal
life.

### Stress

Financial decisions that produce ongoing worry have
non-monetary costs.

### Lifestyle constraints

Owning a home in city A constrains you from
opportunities in cities B and C. Concentrated
investments in one company constrain career risk.

### Maintenance

Most assets cost ~1-5%/year to maintain. Cars, homes,
vacation properties, boats. Often missed in "buy"
calculations.

### Replacement

Most assets eventually need replacement. The cost ÷
useful life is an ongoing expense.

## Common framing tricks

### "You're already paying for it"

Used to sell upgrades. "You're paying $100/month for
internet anyway; for $50 more you can have...". The
$50 is on top, not part of the $100.

### "It pays for itself"

Used to sell expensive purchases. Examples calculated
under best-case assumptions. Probe break-even
sensitivity.

### "Lock in the rate"

Used in lending to encourage longer terms. Sometimes
genuinely good; sometimes locks you into something
worse than market alternatives.

### "Limited-time offer"

Used to short-circuit deliberation. Real time pressure
exists; manufactured urgency is more common.

### "The smart money does X"

Implies you should follow. The "smart money" often
isn't doing what they say they're doing; if they
were, the prices would already reflect.

### "X% off"

Anchored to a price you wouldn't have paid anyway.
Real cost is what you actually pay; the discount is
relative to a possibly fictitious starting price.

### "Worst case is X"

Often the assumed worst case is much milder than what
can actually happen. Test the *really* worst case.

## How to evaluate a financial calculation

Ask:

1. **What assumptions are baked in?** Inflation, return,
   tax treatment, time horizon, behaviour.
2. **What's not counted?** Opportunity cost, time, hidden
   costs, replacement, taxes.
3. **What's the comparison group?** Compared to what?
4. **How sensitive is the answer?** If one assumption
   shifts by 10%, does the answer flip?
5. **Who benefits from the answer being convincing?**
   Sales calculations are different from neutral
   calculations.

For substantial decisions: rerun with conservative
assumptions; if it still works, fine; if it only
works under optimistic assumptions, slow down.

## Anti-patterns

### Confusing "I can afford the payment" with "I can
afford the thing"

Cashflow vs. balance-sheet. A payment fits the budget
this month doesn't mean the total commitment fits the
life.

### "Just X% of income"

Mortgage advice often "spend no more than X% of
income on housing". Useful threshold but not safety —
the "fits" framing assumes income stability and other
expenses fitting too.

### Assuming linear

Many financial outcomes are non-linear. "If returns
are 7%, doubling savings doubles outcome" — not
quite, with taxes, sequence risk, and life changes.

### Using "average" for skewed distributions

Most investment returns are skewed. Average return
during a 10-year window doesn't mean you'd have
gotten that return — depends on entry / exit timing.

### Trusting headline returns

The headline number on advertising is rarely the real
return after fees, taxes, and your specific situation.

### Ignoring "what if I quit"

Locked-in plans (annuities, long-term commitments)
often have huge costs to exit. The headline ignores
that you might not stay the full term.

## When professional help is warranted

For substantial money decisions, a fee-only fiduciary
advisor can run the numbers honestly:

- They get paid for advice, not commissions.
- Their incentive is your benefit, not steering you to
  specific products.
- They can evaluate the assumptions in calculations
  you've been shown elsewhere.

For tax decisions: a tax professional. Same logic —
fee-based, not commission.

The hourly cost of either is small relative to the
decision they're informing.

## Output line

- "**Calculation hides:** ⟨specific assumption⟩.
  **Verdict:** ⟨numbers may be off by ⟩⟨specific⟩."
- "**Assumption stress-test fails** — answer flips when
  ⟨specific⟩."
- "**Hidden cost surfaced:** ⟨specific⟩."
- "**Numbers don't justify alone** — recommend
  professional review."
