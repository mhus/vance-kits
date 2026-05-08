# Credibility Ladder — what kind of source supports what

Sources sit on a rough ladder of evidential strength. The
ladder isn't absolute — a strong tertiary source can outweigh
a weak primary one — but it tells you what to *expect* from a
source-type and what to demand for the claim you're chasing.

## The ladder

### Primary sources

- The data itself.
- Original research / experiment / measurement.
- First-hand witness account.
- Original document (legal text, contract, leaked email).
- Code, dataset, raw observation.

**Strength:** closest to the phenomenon. No interpretation
layer between you and the fact.

**Weakness:** demands interpretation skill from you. A primary
source can be misread.

**Demand for:** quantitative claims, factual specifics, "what
exactly happened", legal arguments.

### Secondary sources

- Analysis, synthesis, interpretation of primary sources.
- Peer-reviewed papers, well-sourced journalism, expert
  reviews.
- Textbooks (recent, not legacy).
- Investigative reports.

**Strength:** the analysis is the value. Connects facts to
implications.

**Weakness:** opinion may slip in unmarked. Quality varies
hugely between secondary sources.

**Demand for:** "what does this mean", trend interpretation,
expert assessment, framework / theory claims.

### Tertiary sources

- Summaries of summaries.
- Encyclopedias, reviews of reviews, popular-science
  books.
- Wikipedia (with caveats — sourced articles can be very
  good; unsourced can be wrong).
- Mainstream news reporting on academic findings.

**Strength:** orientation, getting the lay of the land
quickly.

**Weakness:** layers of telephone. Errors propagate; nuance
is sanded off.

**Demand for:** initial orientation only. As authority for
specific claims, weak — go upstream.

## Tier-within-tier — peer-reviewed isn't peer-reviewed

Especially within secondary sources, the apparent tier hides
a wide range:

### Top peer-reviewed (in serious fields)

- Multiple referees, established journal, replicable methods,
  data deposited, conflict-of-interest disclosure.
- Best signal of secondary-source quality.
- Still can be wrong (replication crisis, fraud cases).

### Lower-tier peer-reviewed

- Less rigorous review.
- Fewer methodological standards.
- Often where motivated science finds a home.

Look at the journal's reputation in the field, not its
existence as a journal.

### Preprint / arxiv / SSRN

- Not peer-reviewed.
- Useful for currency (latest results before review).
- Variable quality — anything from later-prestigious-paper
  to crackpot.

Treat preprints as "interesting; needs corroboration".

### Conference papers

- Field-dependent. In CS / engineering, often more
  prestigious than journals. In medicine / biology, less.
- Look at the conference's selectivity in the field.

### Working papers / institutional reports

- Government agencies, NGOs, think tanks publishing reports.
- Quality varies wildly with institution.
- Often have agendas; doesn't mean wrong, but warrants
  bias-check.

## Tier-within-tier — journalism

Journalism's credibility ladder, simplified:

### Investigative outlets with track record

- Years of accurate reporting, strong editorial standards,
  named sourcing.

### Mainstream journalism

- Variable. Best beats reliably; weakest beats less so.
- Generally reasonable on factual matters in their beat.
- Less reliable when reporting on technical fields they
  don't understand.

### Aggregators

- Repackage other journalism. Each layer is a place errors
  can creep in.

### Opinion / commentary

- Interpretation, not reporting. Treat as secondary at
  best, often arguing-from-priors.

### Advocacy / partisan media

- Strong selection bias. Facts within may be true; framing
  is constrained by the outlet's stance.

### Social media / blogs

- Anything from subject-matter experts (genuinely useful)
  to amateurs (variable) to bad actors (intentional
  misinfo).
- Look at the writer's track record on the topic, not the
  platform.

## Special cases

### Press releases

Self-promotion; treat as the institution's claims, not
verified information. Useful as starting point ("they say
X happened") — chase to a better source for "X happened
as described".

### Industry analyst reports

Paid market research, "leadership reports". Mixed
quality; often reflect what the analyst's clients want to
hear. Read with the funding model in mind.

### Eyewitness accounts

Primary, but eyewitness memory is notoriously unreliable.
Multiple independent eyewitnesses corroborating is much
stronger than one.

### Datasets

Primary in form; the cleaning / processing / framing of
the dataset is secondary. "The dataset shows X" can be a
claim that depends entirely on choices the dataset
publisher made.

### AI-generated content

Treat as worse than the worst secondary source. AI
generates plausible-sounding claims that may have no
grounding. If you can't trace it back to a primary or
real secondary source, don't trust it.

## How to pick the right tier for the claim

| Claim | Right tier |
|---|---|
| "X happened on date Y" | Primary or strong secondary |
| "What does X mean for industry Z" | Strong secondary; multiple |
| "There's a debate about X" | Tertiary fine for orientation; secondary for depth |
| "Y caused Z" | Multiple strong secondary; primary if available |
| "Most experts believe X" | Multiple secondary surveys; survey paper |
| "The consensus is X" | Survey paper / meta-analysis (strong secondary) |
| "I'm trying to learn the basics of X" | Tertiary OK |

If a claim is contentious (causation, value judgement,
prediction), demand the highest tier you can get. If it's
neutral (a date, a name, a definition), tertiary may
suffice.

## When to demand corroboration

- **Single source for a counterintuitive claim** →
  corroborate.
- **Single source on a high-stakes claim** → corroborate.
- **A claim that surprises you** → corroborate. Surprise is
  a useful flag for "I might have a mistaken prior".
- **A claim from a source with a stake in being right** →
  corroborate from a source without that stake.

When NOT to demand corroboration:

- Routine factual claims from reliable sources (who won
  the 1962 World Cup; the boiling point of water).
- Claims that don't matter for what you're doing.
- Claims you've already verified earlier and the source is
  just confirming.

## Anti-patterns

### "It's published, so it's true"

Especially in legacy media or peer-reviewed contexts.
Publishing standards vary; errors / fraud / political
interference happen. "It's published" raises the prior;
doesn't end the inquiry.

### "Wikipedia says..."

Wikipedia varies hugely by article. A heavily-cited
article on a non-controversial topic is often excellent;
a thinly-cited article on a hot topic is suspect. Use as
a starting orientation, then click through to the
sources.

### "It's on the internet so it's wrong"

Equally lazy. The internet has primary documents, peer-
reviewed papers, datasets, expert blogs. Evaluate the
specific source, not "the internet".

### Treating tertiary as primary

A pop-science book says a study found X; you cite "X is
true based on the book". The book may have misread the
study. Click through to the study.

### Single-tier reliance

All tertiary; no primary check. All primary; no
synthesis. Mix tiers.

### Over-tier-demanding

Demanding peer-reviewed sources for everyday facts. The
trash-collection schedule isn't peer-reviewed; the city
website is fine.

## Output line

- "**Tier:** ⟨specific⟩. **Strength for this claim:**
  ⟨calibrated⟩."
- "**Tier mismatch** — claim warrants ⟨target tier⟩,
  source is ⟨actual tier⟩. Find a stronger source."
- "**Single source on contentious claim** — corroborate
  before relying."
- "**Tier sufficient** — proceed; check trust-signals
  and bias next."
