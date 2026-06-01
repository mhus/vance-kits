# Citation Chasing — follow the claim back to its origin

Most viral claims aren't grounded where they appear; they
descend through layers of summary, paraphrase, and
re-citation, often arriving at the surface in a form the
original would barely recognise.

Citation chasing is walking that chain backwards. Each
hop strips a layer; you stop when you hit the primary
source (or run out of trail).

## The telephone-game pattern

A common shape:

```
Layer 4 (today): viral tweet — "Studies show 80% of
                 X."
Layer 3 (last year): blog post — "A study found
                 around 80% of X..."
Layer 2 (2 years ago): summary article — "A 2020 study
                 by Smith et al. reported a notable
                 majority of X..."
Layer 1 (2020): primary paper — "In a study of 412
                 participants in the US Northeast,
                 we found that 67-83% of self-
                 reporting respondents..."
```

The original is a conditional finding from a specific
sample; the viral version is a universal claim. Each
layer dropped a qualification. The chain is real (you
can trace it); the inference at the end isn't justified.

This pattern applies to:

- Statistical claims.
- Quotations ("As X said, ...").
- Historical claims.
- Scientific findings repackaged for popular audiences.
- "Studies show..." / "Experts agree..." claims.

## How to chase

### Step 1 — extract the claim

Strip the rhetorical framing; pin the testable
assertion.

> Surface: "Most modern apps use JWT — and that's a
> mistake."
>
> Testable claim 1: "Most modern apps use JWT."
> Testable claim 2: "Using JWT is a mistake."

Two claims; chase each separately.

### Step 2 — find the immediate source

The piece you're reading should cite something. If it
doesn't, that's a flag — the claim might be
ungrounded. If it does, click through.

If the source is paywalled / dead-link / inaccessible,
note it; try Google Scholar / archive.org / a search for
the title.

### Step 3 — check what that source actually says

Read the *cited part*, not the whole source. Often the
citing piece picked one sentence and re-rendered.

Ask:

- **Does the source say what the citing piece says it
  says?** Common deviation.
- **Does the source qualify?** Often the original has
  conditions ("in this population", "under these
  assumptions") that the citing piece dropped.
- **Is the source primary or itself secondary?** If
  secondary, continue chasing.

### Step 4 — chase to primary

If the source is itself a citation chain link, keep
going. The goal: arrive at primary data / experiment /
document.

When the chain breaks (no primary cited; primary
inaccessible; primary is itself a re-statement of an
unsourced claim), document where it broke. The claim's
strength is bounded by the chain.

### Step 5 — compare primary to surface

Now you have the original *and* the surface claim. The
two often differ significantly. The differences are the
finding.

The kinds of difference:

- **Population scope.** Primary studied X group; surface
  generalises to everyone.
- **Time period.** Primary in 2010; surface treats as
  current.
- **Conditions.** Primary requires X; surface drops the
  condition.
- **Magnitude.** Primary "23% increased risk"; surface
  "doubled risk".
- **Causation language.** Primary "associated with";
  surface "causes".
- **Population vs. average.** Primary "average effect";
  surface "every individual".

## When the chain runs out

### Dead-end: ungrounded surface claim

Surface piece cites no one; or cites a tweet by an
anonymous account; or cites a piece that cited the
original surface piece (circular).

Result: claim is ungrounded. Treat as unverified, regardless
of how widely repeated.

### Dead-end: paywalled / inaccessible primary

You traced to a real-looking primary but can't read it.

Options:

- Search the title: sometimes it's on the author's
  website, sometimes archived.
- Read the abstract (often public): does it support the
  surface claim?
- Look for replications / follow-ups (also peer-
  reviewed, possibly accessible).
- Note the inaccessibility honestly.

### Dead-end: primary doesn't actually say what surface
claims

You found the primary; the primary doesn't support the
surface. The surface is wrong (deliberately or
accidentally).

This is the most actionable result of citation chasing.
The verification produced a clear "the surface claim
isn't justified by its claimed origin".

### Dead-end: primary supports a related but different
claim

Common. Primary studied X; surface generalises to Y.
Primary's specific finding may be true; the surface's
broader claim isn't supported.

Honest result: "the related claim X is supported; the
broader claim Y isn't, by this evidence chain".

## Specific chasing techniques

### Reverse-search a quotation

Famous quotes are often misattributed. Most "Einstein
said..." quotes weren't said by Einstein.

Tools:

- Quote Investigator (quoteinvestigator.com) for famous
  quotes.
- Google with quote in quotation marks; oldest result
  often closer to source.
- Wikiquote for some figures' verified vs.
  misattributed quotes.

### Track a statistic

A specific number ("73% of..."): search the number
itself in quotation marks. Often finds the original
report.

If the number appears in only one source, extra-
suspicious — fabricated or selectively-extracted.

### Trace an image / chart

Reverse image search (Google Images, TinEye, Bing).
Often surfaces the original publication, original
context, original date. Useful for misattributed or
re-framed images.

### Find the academic paper

Google Scholar / Semantic Scholar / OpenAlex find
papers; the cited-by view shows downstream
re-statements.

If the surface piece cites "Smith 2024" and you find
the Smith paper says something different, the surface
mis-cites.

### Date-anchor

When did the claim first appear? Often the original
publication has nuances later versions lack. Search
with date constraints.

## Common chain failures

### Citation replacement

Surface cites an authority (Smith et al.); but the
specific Smith paper doesn't make the surface claim.
Surface used the authority's name without the
authority's actual finding.

### Selective excerpt

Surface quotes one sentence from primary; primary's
context (next paragraph) qualifies or contradicts the
quoted sentence. Selective quoting.

### Translation drift

Surface quotes a phrase that's been translated /
re-translated; original meaning subtly different. Common
for cross-language claims.

### Citation laundering

The chain goes A → B → C; A is the actual source; B and
C are re-statements; the surface cites C. Reading C, you
can't tell C is just a paraphrase of A. Click through.

### Self-citation circle

Source 1 cites Source 2; Source 2 cites Source 3; Source
3 cites Source 1. No primary anywhere. The "field" of
this claim is a small mutual-citation circle.

### Paywall as cover

The chain leads to a paywalled source most readers
can't check. The surface depends on the paywall as a
trust shield. Sometimes the inaccessible source doesn't
actually exist or doesn't say what's claimed.

## Time investment

Citation chasing has a budget. For each claim, ask:

- **High-stakes / contested:** chase to primary, however
  long it takes.
- **Background / orienting:** check 1-2 hops; if the
  immediate source seems sound, accept.
- **Casual / curious:** trust the surface; flag if
  acting on the claim becomes warranted.

Not every claim warrants full chase. Match effort to
consequences.

## Anti-patterns

### Trust by impressive citation

The surface piece cites lots of papers. Trust extends.
But the citations may be unrelated, contradicting, or
themselves chains. Check.

### Trust by recent citation

The cite is to a 2025 paper, must be current. Currency
isn't truth. Check the substance.

### Trust by author seniority

"From a Harvard professor." Even senior people
mis-cite, oversimplify, get wrong. Substance over
authority.

### Stop at the first satisfying hit

The first source that confirms what the surface said —
stop chasing. But maybe the first source is the
mis-cite; primary is one more hop. Chase to actual
primary when feasible.

### Anchor on the surface

Once you've read the surface claim, expectations bias
the chasing. You read the primary looking for the
surface's argument; you find the parts that match;
miss the parts that don't.

Counter: re-read the primary as if you didn't know the
surface. What does *the primary* claim, in the
primary's own framing?

## Output line

- "**Chain traced to primary** — ⟨specific origin⟩.
  ⟨Surface claim verified / qualified / contradicted⟩."
- "**Chain breaks at:** ⟨specific layer⟩. Claim grounded
  to that point only."
- "**Chain mis-cites** — primary says ⟨X⟩, surface
  claims ⟨Y⟩."
- "**Chasing budget exceeded** — chain not yet primary;
  flag as unverified for now."
