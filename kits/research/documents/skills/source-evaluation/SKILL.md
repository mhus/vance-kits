---
title: Source Evaluation
description: Use when the user is judging whether a source is trustworthy, what weight to give it, or whether to trust a claim that depends on it
version: "1.0.0"
tags: [research, sources, credibility]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - source
      - sources
      - quelle
      - quellen
      - credible
      - credibility
      - glaubwürdig
      - glaubwuerdig
      - vertrauenswürdig
      - trustworthy
      - reliable
      - zuverlässig
      - cite
      - citation
      - citations
      - is this true
      - ist das wahr
      - vertrauen
manualPaths:
  - manuals/source
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has a source — an article, paper, dataset, expert
quote, dataset — and needs to judge whether to trust it,
how much weight to give it, or whether to chase further.
The work is judgement under uncertainty: most sources are
neither pristine nor garbage; they sit on a ladder.

A useful evaluation produces a calibrated confidence, not
a binary verdict. "I trust this for X but would want
corroboration for Y" beats "the source is good".

## Default protocol

1. **What's the claim?** Source-evaluation hangs on which
   claim you're trying to support. The same article may
   be a strong source for fact A and a weak source for
   claim B. Pin the claim before evaluating.
2. **Walk the credibility ladder.** What kind of source is
   this — primary, secondary, tertiary? Which tier should
   the evidence come from for this claim? See
   `credibility-ladder`.
3. **Check trust signals.** Author credentials, date,
   citations within the source, replication, edits /
   retractions. See `trust-signals`.
4. **Check for bias.** Selection bias, motivated
   reasoning, methodological bias. Bias doesn't disqualify
   — it qualifies. See `bias-detection`.
5. **Calibrate.** Weight the source for the claim. State
   confidence honestly, including what would change the
   confidence.

## On-demand manuals

- `credibility-ladder` — primary / secondary / tertiary
  sources; peer-reviewed vs. preprint vs. press
  release vs. blog vs. social. What kind of evidence each
  tier supports. When to demand which tier.
- `trust-signals` — what to look at on the source:
  author credentials, date and currency, internal
  citations, replication / corrections / retractions,
  publication context, methodological transparency.
  Concrete checks per source type.
- `bias-detection` — common bias patterns: selection,
  confirmation, motivated reasoning, methodological,
  funding, ideological. How to surface bias without
  disqualifying the source. Bias as additional context,
  not as elimination.

If you're not sure where to start, walk the credibility
ladder first — it's the cheapest filter.

## Hard rules

- **Don't dismiss based on aesthetics.** Source looks
  amateurish but the data is solid. Source looks slick
  but the methodology is broken. Look at substance, not
  appearance.
- **Don't accept based on prestige.** "Published in a
  reputable journal" doesn't mean "correct". Even
  high-prestige sources have retracted papers, motivated
  authors, peer-review failures.
- **Don't aggregate "weak source × many" into "strong
  evidence".** Five blog posts citing each other in a
  loop is one weak source repeated. Independent
  corroboration is the test.
- **Don't claim confidence you don't have.** Calibrate
  honestly. "I'm 70% sure based on this" is more useful
  than "definitely true" or "I dunno".
- **Don't conflate the messenger with the message.** A
  source you dislike can be right; a source you like can
  be wrong. Evaluate the claim, not the brand.
- **Source-evaluation is per claim, not per source.**
  Same article, different claims, different evaluations.
