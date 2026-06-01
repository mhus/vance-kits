---
title: Synthesis
description: Use when the user has multiple sources or notes and needs to aggregate into one coherent picture — claims, contradictions, structure
version: "1.0.0"
tags: [research, synthesis, aggregation]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - synthesis
      - synthese
      - synthesise
      - synthesize
      - aggregate
      - aggregieren
      - zusammenführen
      - zusammenfuehren
      - widerspruch
      - widersprüche
      - widersprueche
      - contradiction
      - contradictions
      - mehrere quellen
      - multiple sources
      - übersicht
      - uebersicht
      - landschaft
      - landscape
manualPaths:
  - manuals/synthesis
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user has gathered material — sources, notes, quotes,
data — and needs to turn it into one coherent thing.
Synthesis is the work of finding structure across
sources: agreements, contradictions, gaps, and the
larger claim that emerges (or doesn't).

A synthesis isn't a list of sources. A list says "here's
what each said". A synthesis says "here's what we know,
where there's debate, and what's still uncertain — based
on everyone".

## Default protocol

1. **What's the question you're synthesising for?** A
   synthesis without a question is a literature dump.
   "What does the field believe about X" — sharper.
   "Should we adopt Y" — sharper still.
2. **Atomic claims, not sources.** Break each source into
   its individual claims. Claim-level is the right
   granularity. See `claim-graph`.
3. **Group claims.** Same claim from different sources
   stack; conflicting claims surface contradictions.
   Triangulation strengthens; isolation weakens. See
   `triangulation`.
4. **Surface contradictions, don't paper over.** When two
   trustworthy sources disagree, that's information.
   Note both; explain the disagreement if you can.
5. **Identify gaps.** What does the question demand that
   no source addresses? Gaps are honest output, not
   failures.
6. **Write with claims sourced.** Every substantive
   claim in the synthesis should map to a source. See
   `writing-from-sources`.

## On-demand manuals

- `claim-graph` — the technique: extract atomic claims,
  group by topic, identify support and conflict.
  Practical structure for managing 5-50 sources without
  losing track. Load when starting a synthesis.
- `triangulation` — using multiple independent sources
  for the same claim. What counts as independent. How
  agreement strengthens; how non-agreement informs.
  Common triangulation traps.
- `writing-from-sources` — turning the claim-graph into
  prose. Paraphrase vs. quote, attribution conventions,
  keeping claims sourced through edits, when to stop
  citing.

## Hard rules

- **Don't synthesise to confirm a prior.** If you went
  in believing X and the sources disagree, the
  synthesis acknowledges disagreement. Don't filter to
  what supports your view.
- **Don't aggregate weak sources into pseudo-strength.**
  Five blog posts citing each other in a circle is one
  weak source, not five. See `triangulation`.
- **Don't paper over contradictions.** "Sources differ
  but generally agree on X" — when X is the part
  everyone says without it being interesting, and the
  contradictions are the actually-informative part.
- **Don't confuse synthesis with summary.** A summary
  reduces. A synthesis aggregates and structures. They
  are different jobs.
- **Don't lose the threads.** Each claim in the
  synthesis maps back to a source; lose the thread,
  lose the audit trail, lose the ability to update
  when a source is revised.
- **Distinguish claims from interpretations.**
  "Source A says X" (claim about the source) is
  different from "X is true" (claim about the world).
  In synthesis, mostly stick to "source A says X" until
  you've earned the world-claim.
