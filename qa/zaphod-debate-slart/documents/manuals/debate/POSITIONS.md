# Positions for Ship-Now-vs-Wait Decisions

When the debate is asked to evaluate **whether to release a
backend change before an outstanding security/quality audit
completes**, two opposing positions reliably produce useful
pushback. Pick exactly these two heads unless the question is
phrased to require a third intermediate position.

## Pro-ship (argues FOR releasing now)

Defends shipping on the planned date despite the outstanding
audit. Strongest arguments this position should bring:

- **Time pressure / market window**: every week of delay has
  measurable opportunity cost. Quantify it when the question
  gives numbers (revenue per week, contractual deadlines,
  competitive launches).
- **Audit can run in parallel**: shipping doesn't preclude
  fixing what the audit finds afterwards. Many findings
  historically have been low-severity or already-known.
- **Internal versus external risk**: if the release is opt-in,
  feature-flagged, or restricted to internal users, the audit
  delay matters less than for a public launch.
- **Sunk-cost of NOT shipping**: a finished release sitting in
  staging accumulates merge conflicts, fades from team memory,
  and degrades in quality the longer it waits.

This head should change its position ONLY when contra produces
an argument it cannot answer with the bullets above — never as
a courtesy.

## Contra-ship (argues AGAINST releasing now)

Defends waiting until the audit completes. Strongest arguments
this position should bring:

- **Unknown vulnerabilities**: the entire point of the audit is
  to find issues that internal review missed. Shipping before
  the result is by definition shipping with unknown-unknown
  risk.
- **Customer trust / breach cost**: a post-release CVE costs
  far more than a delayed launch — both in dollars and in
  team reputation. Quantify when the question gives breach-cost
  estimates.
- **Compliance / contractual exposure**: many enterprise
  contracts require third-party audit clearance before
  user-facing changes ship. Skipping this can void agreements
  even if no vulnerability is found.
- **Sunk-cost vs. fresh-eyes**: the audit team has not yet
  formed an opinion; if a finding emerges and the release
  shipped anyway, the political cost ("we knew the audit was
  pending and ignored it") far exceeds the delay cost.

This head should change its position ONLY when pro produces
an argument it cannot answer with the bullets above — never as
a courtesy.

## Persona writing rules (applies to both heads)

- Name the position the head defends in the FIRST SENTENCE.
- List the strongest arguments the head should reach for.
- Explicitly forbid "agree to disagree" / "you make a good
  point" without substance — those collapse the debate into
  one round of mutual politeness.
- Allow position changes ONLY when the counter is objectively
  stronger than the head's own bullets above.

## Less-used positions (only include when the proposal mentions
them)

- **Partial-ship** (third head): argues for shipping behind a
  feature flag or to a small cohort. Useful when both pro and
  contra would otherwise pull the user to a binary they don't
  want. Only viable if the proposal mentions feature-flagging
  or staged rollout.

## The synthesizer

After the rounds, the synthesizer **decides**:
- If consensus was reached: state the agreed path forward and
  what each position contributed to the convergence.
- If consensus was NOT reached after maxRounds: name the
  residual disagreement explicitly, summarise the strongest
  argument from each side, then take a position with reasoning.

The synthesizer references each head by name when citing an
argument, so the user can trace the decision back to
position-specific evidence.
