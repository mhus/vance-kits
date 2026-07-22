---
title: Claim Verification
description: Use when the user wants to check whether a specific claim is true — fact-check, citation-chase, debunk
version: "1.0.0"
tags: [research, verification, fact-check]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - verify
      - verifizieren
      - fact check
      - factcheck
      - faktencheck
      - debunk
      - debunken
      - check claim
      - claim verification
      - is this true
      - stimmt das
      - is this real
      - urban legend
      - mythos
      - widerlegen
      - widerlegt
manualPaths:
  - _vance/manuals/verification
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

A specific claim is on the table; the user wants to know
if it's true. Different from `source-evaluation` (which
asks "is this source good?") and `synthesis` (which asks
"what does the field say?"). Verification asks: **does
this specific claim hold up?**

The work is concrete: trace the claim back, look for
primary evidence, check against contradicting evidence,
calibrate confidence honestly. The answer often isn't
"true" or "false" but a calibrated middle.

## Default protocol

1. **State the claim precisely.** "JWT is broken" isn't
   verifiable. "JWT can be forged via alg confusion when
   the server accepts both RS256 and HS256" is.
2. **Where did the claim come from?** Trace upstream.
   Often the claim originated in one source and got
   re-written through several layers; the original may
   be more nuanced. See `citation-chasing`.
3. **What primary evidence supports / contradicts?**
   Find the data, the demonstration, the proof. See
   `fact-checking-protocol`.
4. **Calibrate.** Three honest answers:
   - **Verified.** Claim holds up against primary
     evidence.
   - **Verified with nuance.** Claim is true under
     specific conditions; original was over-broad.
   - **Not verified / partially false.** Original claim
     doesn't hold; specifics differ; or evidence is
     weak.
5. **Communicate the result with the work shown.**
   Verification without the receipts is just opinion.

## On-demand manuals

- `citation-chasing` — following a claim back to its
  origin. The "telephone game" pattern in viral claims.
  When the chain breaks, what to do. Browser tools and
  search techniques.
- `fact-checking-protocol` — concrete steps to verify a
  factual claim. Lateral reading; cross-source
  verification; what to check first; how to record
  the work for transparency.
- `recognising-bullshit` — patterns common in false or
  misleading claims. Brandolini's law; statistical
  manipulation; ad-hoc plausibility; misattribution.
  Defensive heuristics.

If you're starting from a viral / repeatedly-cited
claim, start with `citation-chasing` — most viral
claims warp at the chain.

## Hard rules

- **Pin the claim before chasing.** Imprecise claims
  can't be verified — multiple interpretations have
  multiple answers. Make the claim specific first.
- **Verify the strongest version.** A claim has many
  formulations; some are stronger, some weaker. Verify
  the strong version (the one whose verification would
  matter); a weak version verified isn't useful.
- **Don't verify by-popularity.** "Many people say X" is
  evidence about people, not about X. Independent
  sourcing matters more than frequency.
- **Don't out-source the verification work to your
  intuition.** "Sounds about right" / "feels wrong" is
  an input but not a conclusion.
- **Don't confuse "I can't verify" with "false".**
  Sometimes the evidence isn't accessible. State the
  uncertainty honestly.
- **Don't confuse "I verified one piece of it" with
  "claim verified".** Verify the load-bearing parts; if
  the claim conjoins several factual elements, check
  each.
- **Document the work.** Future-you (or others) needs to
  see how you verified, not just that you did.
