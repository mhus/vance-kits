# Fact-Checking Protocol — concrete steps for a claim

A repeatable protocol for verifying a specific factual
claim. Designed to be honest, fast for clear cases, and
extensible for hard ones.

## The four-step protocol

### Step 1 — pin the claim

Restate the claim in your own words, as specifically as
possible.

- "A 2024 study found that 73% of users abandon checkout
  forms with more than 5 fields."
- "JWT alg confusion can be exploited via a header
  manipulation when servers accept multiple algorithms."

If you can't restate precisely, the claim is too vague
to verify. Push back: "what specifically?"

### Step 2 — lateral reading

Don't read the source claim's website to evaluate the
website. Read *other* sources to evaluate the claim.

This is the technique professional fact-checkers use:
they don't go deep on the suspicious source; they go
wide, checking what other sources say.

Concrete moves:

- Search the claim (not the source) in a search engine.
- Read 2-3 other sources discussing the claim.
- Note where they agree, where they disagree.

If the claim shows up only on the original source and
its echoes — suspicious. If it shows up across
independent sources — better.

### Step 3 — find primary evidence

Lateral reading gets you the social map. To verify the
claim itself, find primary:

- For a study: the study itself, not the news article.
- For a quote: the speech / book / interview where it
  was said.
- For a historical fact: contemporary documentation or
  authoritative history.
- For a statistic: the data source, the methodology.

If you can find primary, evaluate primary against the
claim. If you can't, the claim is bounded by what
secondary sources can support.

### Step 4 — calibrate and report

Give a calibrated answer:

- **Verified.** Claim holds; primary supports it; lateral
  agrees.
- **Verified with nuance.** Claim is true under
  conditions the original glossed over.
- **Partially verified.** Some elements of the claim
  hold; others don't.
- **Not verifiable from accessible evidence.** Claim
  may be true, but can't be checked without further
  access.
- **Refuted.** Primary or lateral evidence contradicts.

State which one, and why.

## Lateral reading techniques

### Search the specific claim

Quotation-marks search the central phrase. See what
other sources say.

If only one site discusses the claim, that's a flag.

### Search the source's reputation

"Who is [source name]?" Look at independent assessments.
Wikipedia (with caveats), media-bias-rating sites,
fact-check sites.

### Search for the claim with negative qualifiers

- "[claim] debunked"
- "[claim] false"
- "[claim] myth"

Sometimes immediately surfaces a fact-check from a
reputable outlet.

### Search for the original source

The claim may name a "study" / "report" / "research". Search
for that exact name + author. Find the actual artefact.

### Use specific fact-check sites

For viral / contested claims: Snopes, FactCheck.org,
PolitiFact (US-focused), AFP Fact Check, Reuters
Fact Check, AP Fact Check. They've often checked widely-
shared claims.

Don't accept their conclusions blindly — they make
mistakes — but they often save research effort.

### For academic claims: Google Scholar

Search the paper title; check citations both ways. A
cited paper that's barely cited a year later may have
been challenged or quietly disregarded.

### For statistical claims: original data source

If the claim involves numbers, find the source data:

- Government statistics (ONS, BLS, Eurostat, etc.).
- Original survey or census.
- The actual report (not summaries).

Compare the number in the claim to the number in the
data; they often differ in interpretation.

## What "primary evidence" looks like by claim type

### Empirical / scientific claim

Primary: the experiment, the study, the dataset.

Check:

- Methods: how was the result obtained?
- Sample: who / what was studied?
- Replication: has it been independently reproduced?
- Conditions: under what conditions does the claim
  hold?

### Historical claim

Primary: contemporary documents, eyewitness accounts,
authoritative histories drawing on primaries.

Check:

- Source's proximity to the event.
- Multiple independent sources?
- Consistency with established facts about the period.

### Quotation

Primary: the speech, book, letter, interview where the
quote originated.

Check:

- Find the original.
- Is the quote in context what the surface claims?
- Was the speaker the actual source?

### Statistical claim

Primary: the dataset, the survey, the methodology.

Check:

- Number specifically — does the claim match?
- Population / scope — does the claim's framing match?
- Methodology — is the survey / measurement sound?

### Quote-via-translation

Primary: the original-language version of the quote.

Translation can shift meaning. If the claim depends on
the translation's framing, check the original.

### Future / prediction

No primary by definition; can only be assessed for
plausibility and track record of the predictor.

Check:

- Predictor's history on similar claims.
- Track record of similar predictions.
- The argument's structure (does the reasoning hold up?).

## Partial verification

Most real claims partially verify:

- "Smith said X." → quote verified; X said in the
  context of a longer talk where Smith later qualifies.
- "X% increase since 2020." → number is right; "since
  2020" is misleading because 2020 was anomalously low.
- "Studies show A causes B." → studies show A is
  *associated with* B; causation not established.

Honest reports:

- "The number is correct, but the framing
  understates / overstates the trend because..."
- "The quote is accurate but lifted from a context that
  qualifies it..."
- "The factual claim holds; the causal claim doesn't."

Don't round off to "true" or "false" when "true with
qualification" is the honest answer.

## Documenting the work

A verification without receipts is just an opinion.
Useful documentation:

- **Primary source(s) consulted** — title, author, date,
  link / location.
- **Lateral sources consulted** — what they said, agreement
  or disagreement.
- **Conclusion** — the calibrated answer.
- **Open questions** — what couldn't be resolved.

Format depends on the venue:

- Inline footnotes for an article.
- A separate verification log for ongoing research.
- A note in your Zettelkasten for personal use.

The point is replicability: someone reading your
verification can follow the steps and reach the same
conclusion.

## Time-budgeting

Pre-decide how much time the verification deserves:

- **Quick claim** (5 minutes): one lateral search, accept
  if consistent.
- **Standard claim** (30-60 minutes): lateral + primary
  if accessible.
- **High-stakes claim** (hours): full chain, multiple
  primaries, document the work.

Better to be honest about a quick verification ("I checked
two sources; both agreed; didn't dig deeper") than to
pretend full diligence on a quick check.

## When to give up

You've spent the budget; you can't verify. Honest
result:

> "Verification incomplete. Lateral sources agree on the
> claim's broad outline; primary not accessible (source
> paywalled / archived poorly / not findable). Treat
> as plausible but unconfirmed."

Don't manufacture certainty by spending more time on a
ground that won't yield.

## Anti-patterns

### Confirming-side-only check

Searched the claim; found a confirming source; stopped.
Didn't check for contradicting sources.

Counter: also search for "[claim] false / debunked /
myth" before accepting.

### Source-of-source neglect

Found a source that confirms the claim; didn't check
that source's reliability or its own sourcing. The
confirming source might be a re-statement of the
original false claim.

Counter: lateral on the source, not just on the claim.

### Time-bound verification on an evolving claim

A claim that was true in 2018 may not be in 2024.
Verifying "X is the case" without checking when the
verification applies leaves the user with stale info.

Counter: include date / period in the verified claim.

### Verification by AI summary

Asked an LLM "is this true". The LLM's answer is not
verification — it may itself be re-stating false claims.

Counter: AI can help find sources but doesn't replace
verification of the sources.

### Public-perception confusion

Verified that "many people believe X". Reported it as
"X is true". The two are different claims.

Counter: pin which claim you're checking — the truth of
X, or the popularity of belief in X.

## Output line

- "**Verified:** ⟨specific⟩. **Sources:** ⟨list⟩."
- "**Verified with nuance:** ⟨original claim⟩ → actual
  finding ⟨specific⟩."
- "**Refuted:** ⟨specific⟩. **Counter-evidence:**
  ⟨list⟩."
- "**Inconclusive** — ⟨specific gap⟩. Treat as plausible
  but unconfirmed."
