# Structure of a Council

A council is a **multi-perspective evaluation** of a single
question. Several heads (each a focused reviewer) examine the same
input from deliberately different angles, then a synthesizer
combines their outputs into one recommendation.

## Typical shape

- **3 to 5 heads** is the sweet spot. Below 3 the council
  collapses to a "second opinion" and rarely surfaces tensions
  worth synthesising. Above 5 the heads start overlapping and the
  synthesizer loses signal in the noise.
- Each head **focuses on one axis**: security, performance,
  maintainability, cost, ergonomics, compliance — pick axes that
  the question genuinely trades off against each other. Two heads
  on similar axes ("backend-engineer" and "platform-engineer")
  is wasted council capacity.
- The **synthesis turn** is mandatory. Without it, the council
  output is a stack of unconnected reviews; the user has to do
  the consolidation work themselves. Good synthesis names each
  head, cites their key concerns, and produces ONE consolidated
  recommendation — not a meta-summary.

## What a council is good for

- **Decisions with multiple competing concerns**: ship a
  refactor / approve a dependency upgrade / pick a database
  migration strategy — each pulls on multiple axes that have
  to be weighed.
- **Design reviews where blind spots matter**: a single reviewer
  optimises for what they care about; a council surfaces the
  axes the single reviewer wouldn't have considered.

## What a council is NOT good for

- **Pure information retrieval**: "summarise this paper" — one
  head is enough, the others duplicate the work.
- **Sequential workflows**: "write outline → write chapters →
  aggregate" — that is a pipeline (use Vogon), not a council.
  A council runs heads against the SAME input, in parallel
  conceptually, then synthesizes.
- **Open-ended exploration without a decision**: a council
  needs a question the synthesizer can resolve. If there is
  no decision to make, the synthesis turn is hollow.
