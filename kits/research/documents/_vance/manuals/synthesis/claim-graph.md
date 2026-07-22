---
triggers: claim graph, atomare aussagen, atomic claims, claim extraction, contradiction, synthesis structure, aussagenextraktion, widerspruch, wissenslücke, gruppierung
summary: Breaking sources into atomic claims and mapping agreement, contradiction, and gaps as the structural basis for synthesis.
---

# Claim Graph — atomic claims as the unit of synthesis

A source is a bundle of claims. A synthesis based on
sources-as-units flattens to "Smith says X; Jones says Y;
Brown says Z" — a list. A synthesis based on claims-as-
units shows the structure: which claims are widely
agreed, which are contested, which are isolated.

The claim graph is the structure that makes synthesis
possible.

## What an atomic claim is

A claim is a single, evaluable assertion. Atomic ≠
trivial — it can be substantive — but it's *one*
assertion, not a paragraph.

Examples:

- ✗ Source: "JWT is widely used for authentication, but
  has security pitfalls including alg confusion and
  long-lived tokens."
- ✓ Atomic claims:
  - **Claim A:** JWT is widely used for authentication.
  - **Claim B:** JWT has security pitfalls.
  - **Claim C:** Alg confusion is one such pitfall.
  - **Claim D:** Long-lived tokens are another.

Each can be supported / contested / nuanced
independently. A synthesis built on atomic claims is
maintainable; one built on whole-source claims isn't.

## Extraction technique

For each source:

1. Read with extraction in mind.
2. Note each substantive claim as one line.
3. Mark each claim with the source ID.
4. Don't editorialise during extraction; just transcribe
   what the source asserts.

Format:

```
[A1] JWT is widely used for auth — Smith 2024
[A2] JWT has security pitfalls — Smith 2024
[A3] Alg confusion is a pitfall — Smith 2024, Jones 2023
[A4] Long-lived tokens cause problems — Smith 2024,
       Brown 2025
[B1] JWT is overrated — Williams 2024
[B2] Cookies are simpler than JWT — Williams 2024,
       Davis 2023
[C1] Mobile apps need JWT-like tokens — Davis 2023
```

The IDs are arbitrary; they let you reference claims
later without re-quoting.

## Grouping

Once you have the list, group by topic:

```
TOPIC: JWT widespread use
  [A1] JWT is widely used for auth — Smith 2024
  [A1'] JWT used by 80% of new web apps — JWT-Census 2024

TOPIC: JWT pitfalls
  [A2] JWT has security pitfalls — Smith 2024
  [A3] Alg confusion is a pitfall — Smith 2024,
       Jones 2023
  [A4] Long-lived tokens — Smith 2024, Brown 2025
  [B1] JWT is overrated — Williams 2024

TOPIC: Alternatives
  [B2] Cookies are simpler than JWT — Williams 2024,
       Davis 2023
  [C1] Mobile apps need JWT-like tokens — Davis 2023
```

Now you can see structure. Multiple sources support
"alg confusion" → strong. Williams's "JWT is overrated"
is alone → weak. "Cookies are simpler" has two sources;
moderate.

## Spotting structure

### Wide agreement

Claim is asserted by multiple independent sources, no
contradictions. Strongest signal; can write with
confidence.

### Specific agreement / general disagreement

Sources agree on facts; disagree on interpretation.
"JWT has alg-confusion vulnerability" — agreed.
"Therefore JWT should be replaced" — disagreed.

Synthesis: report the agreement on facts; surface the
debate on interpretation. Don't pretend the
interpretation is settled.

### Isolated claim

One source asserts X; nobody else mentions or agrees.
Could be a unique insight; could be wrong; could be off
by definitional differences.

Synthesis: include with attribution to the single source;
don't aggregate-claim it.

### Direct contradiction

Source A: "X is true." Source B: "X is false." Same X;
genuine contradiction.

Synthesis options:

- Report both, identify the contradiction, leave
  unresolved.
- Identify which source is methodologically stronger and
  weight accordingly.
- Find the cause of disagreement (different
  definitions, different time period, different
  population).

Don't smooth over: "sources generally agree" — they
don't.

### Apparent contradiction → nuance

Two sources seem to disagree but use different
definitions, time periods, scopes. Resolve by clarifying
the difference.

Example:

- Source A: "JWT use is increasing."
- Source B: "JWT use is plateauing."
- Resolution: Source A measures all systems; Source B
  measures new-greenfield systems specifically. Both
  could be true.

The resolution is itself a synthesis finding.

### Gap

The question demands evidence on Y; no source addresses
Y. Note the gap explicitly.

Gaps are valuable output. They tell the reader what's
unknown. They suggest what to research next.

Common gap types:

- Empirical (no studies done).
- Definitional (term means different things in different
  sources).
- Scope (sources cover one domain, question spans
  multiple).
- Temporal (sources are old, question is current).

## Building the graph

For complex syntheses (15+ sources), a literal graph
helps:

```
        [Wide use]              [Mobile JWT]
         /    \                       |
    Smith    JWT-Census         Davis (only)
                                       |
                                  contradicted by
                                       |
                                 [JWT overrated]
                                       |
                                  Williams (only)
```

Visualises which claims have many supporters, which are
isolated, which are contested.

For smaller syntheses (5-15 sources), the topical
grouping is enough.

## Common claim-graph problems

### Source-as-unit fallback

Building the synthesis as "Smith says X; Jones says Y; ..."
without claim extraction. Result: list, not synthesis.
Re-do at claim level.

### Over-atomising

Breaking a source into 50 claims when 10 would do.
Wastes time; obscures the synthesis.

Atomic = one assertion per claim. Doesn't mean
shortest possible.

### Under-atomising

"Source X discusses JWT pitfalls" — that's not a claim,
that's a topic. What pitfalls? Said how? Atomise to the
specific assertions.

### Claim-merging across definitional boundaries

Source A and Source B both use the word "performance"
but mean different things (one means latency, one means
throughput). Treating their claims as supporting the
same Topic is a synthesis error.

When you suspect definitional drift, surface it; don't
silently merge.

### Source-as-claim-substitute

"Smith 2024 is a strong source, so claim X (which
appears only in Smith) is strong." No. Source strength
contributes to claim strength but doesn't substitute for
multiple-source agreement.

A single strong source is one strong source. A claim
asserted by one strong source is a single-source claim.

## Maintaining the graph

The claim graph is a living artefact:

- New source comes in → extract claims → add to graph.
- Source revised / corrected → update its claims.
- Better understanding of an existing claim → split or
  merge as needed.

Keep the graph in a format you can edit easily. Plain
text with topical sections and source attributions
beats a fancy tool that you don't update.

## Anti-patterns

### Pre-conclusion synthesis

Decide the conclusion; build the graph to support it.
The structure is real, but you cherry-picked.

Counter: extract claims before concluding. The
conclusion (if any) emerges from the structure.

### Hide-the-disagreement synthesis

Sources disagree; write smoothly past it. Result:
synthesis that says nothing the sources don't already
say (the bland intersection).

Counter: disagreements are findings. Surface and engage.

### Numerical synthesis

"Eight sources support X; three contradict; X wins." If
sources aren't independent, the count is misleading. Two
strong primary sources beat eight blog re-runs.

Counter: weight by source quality and independence (see
`triangulation`).

### Synthesis as plagiarism

Lifting structure / argument from one source and dressing
in others. Easy to do unconsciously when one source is
particularly compelling.

Counter: be explicit about who originated which claim;
attribute the structure as well.

## Output line

- "**Claim graph built:** ⟨n⟩ topics, ⟨n⟩ atomic claims,
  ⟨n⟩ contradictions surfaced."
- "**Wide agreement on:** ⟨topics⟩. **Contested:**
  ⟨topics⟩. **Gaps:** ⟨topics⟩."
- "**Isolated claim** — ⟨specific⟩. Find corroboration
  or attribute single-source."
- "**Synthesis premature** — extract claims from
  ⟨specific source(s)⟩ before continuing."
