# Structure of a Debate

A debate is a **multi-round opposition** between a small number
of heads with deliberately opposing positions. Each round every
head sees the previous-round replies of the other heads and
either reinforces, refines, or revises its own position. Between
rounds a consensus check decides whether the heads have
converged; if yes the debate ends early, if no the next round
runs. After the loop a synthesizer combines the final-round
positions into one recommendation.

## Typical shape

- **2 or 3 heads**, no more. 2 is the canonical pro/contra pair;
  3 covers triangular oppositions ("ship now / wait / partial
  release"). Above 3 the consensus check becomes noisy — each
  added head opens a new axis along which "they all agree" can
  split — and the rounds spend more time chasing alignment than
  surfacing arguments.
- **Positions, not lenses.** Each head defends a stance the user
  can label in one phrase ("argues FOR shipping now", "argues
  AGAINST shipping before the audit"). Heads that report from
  expert lanes (security-reviewer, performance-reviewer) belong
  in a council, not a debate — they have nothing to argue about
  because their lanes don't overlap.
- **maxRounds is a backstop, not a target.** Default 3. Pick 2
  for "first reaction" debates where one revision is enough; 3
  for the standard yes/no; 4-5 only for genuinely contested
  decisions where positions historically take longer to settle.
  Above 5 is almost always a sign the question is unfocused.
- **The synthesizer sees only the final round.** It also sees
  whether consensus was reached. Designing the synthesis prompt
  with that in mind matters: ask the synthesizer to consolidate
  the FINAL positions, not to summarise the whole debate (which
  it cannot see).

## What a debate is good for

- **Adversarial decisions where positions can shift**: ship now
  vs. wait, buy vs. build, deprecate vs. extend. The debate's
  value is in making the disagreement either resolve or become
  explicit; a council would just collect both answers in
  parallel and leave the user to weigh them.
- **Questions where the user wants to see pushback**: not just
  "what are the trade-offs", but "if I told the optimist about
  the pessimist's concerns, would they actually change their
  mind?". A debate makes that pushback observable.
- **Yes/no decisions with credible counter-positions on both
  sides.** When one side is obviously right, a debate is
  expensive theatre — use a single Ford worker.

## What a debate is NOT good for

- **Pure information retrieval**: same exclusion as council —
  one head suffices.
- **Multi-lens reporting where heads don't overlap**: that is a
  council. Security + performance + maintainability are not
  arguing with each other; they are reporting from their lanes.
- **Open exploration without a decision**: a debate needs a
  resolvable question with credible opposing sides; without one
  the synthesis turn has nothing to consolidate.
- **More than 3 distinct positions**: split into two debates or
  use a council. The consensus check gets unreliable.
