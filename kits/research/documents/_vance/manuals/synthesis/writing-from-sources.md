---
triggers: writing from sources, zitieren, citation density, paraphrasing, attribution, audit trail, quellenbelege, belegdichte, synthesis voice, plagiat
summary: Turning a claim graph into grounded prose with calibrated citation density, correct attribution, and a maintained audit trail.
---

# Writing from Sources — keeping claims grounded through prose

The claim graph is built; the structure is understood.
Now you have to write. The challenge: turn structured
material into prose without losing the audit trail and
without over-citing into stiffness.

This manual is about that translation.

## The two anchors

Every substantive claim in your synthesis should:

1. **Map to a source** (you can find the source on demand).
2. **Be visible to the reader as sourced** (where it
   matters; not necessarily for every clause).

The first is non-negotiable — without it, you've
synthesised honestly but can't defend or update.

The second is calibrated — over-citing reads stiff;
under-citing erodes trust.

## Citation density

How much to cite depends on the venue and the claim:

### Always cite

- **Direct quotations.** Always. Page number if
  feasible.
- **Specific numbers.** "30% of users" — cite where it
  comes from.
- **Surprising claims.** If the reader's likely reaction
  is "really?", cite.
- **Counterintuitive findings.**
- **Claims central to your argument.**
- **Recent / specific empirical results.**

### Cite once per topical block

For a paragraph that draws extensively on one source,
cite at the top of the block. Don't sprinkle the same
citation across every sentence in the paragraph.

### Cite less

- **Common knowledge in the field.** "Most modern web
  apps use HTTPS" — no citation needed.
- **Definitional claims.** "JWT is JSON Web Token, a
  standard format..."
- **Established consensus.** Sometimes a claim is so
  widely accepted that citation feels academic rather
  than informative.

The judgement: cite where the reader might want to
verify or chase further; don't cite where the citation
is performative.

## Paraphrasing vs. quoting

### Quote when

- The exact wording matters (legal text, controversial
  statement, specific phrasing).
- A short phrase from the source captures something you
  can't say better.
- You're representing what someone said and the framing
  matters.

Quote sparingly. A piece dense in quotes reads as a
patchwork of other people's prose; you've assembled
material, not synthesised it.

### Paraphrase when

- You can say the substance more clearly.
- The point is the substance, not the wording.
- Multiple sources support similar claims; you're
  capturing the synthesis.

When paraphrasing:

- **Stay accurate.** Paraphrasing is restating, not
  reinterpreting. If you change the meaning, you've
  misrepresented the source.
- **Don't paraphrase too closely.** Replacing every
  third word with a synonym is plagiarism wearing a
  thin coat. Restate in your own structure.
- **Cite anyway.** Paraphrased claims still need
  attribution; absence of quotes doesn't remove the
  source dependence.

## Attribution conventions

How you attribute depends on the venue:

### Inline name + year

"Smith (2024) found that..."

Common in academic writing; flow-friendly because the
attribution becomes part of the sentence.

### Footnote / endnote

"...has been documented." [^1]

Cleaner prose; reader has to chase footnotes for
attribution. Common in journalism, popular non-fiction.

### Hyperlink

"...has been [documented](https://...)..."

Web-native. Reader can verify with one click. The most
trust-friendly form for online writing.

### Bibliography only

Sources collected at the end; prose has no inline
attribution.

Often weakest form — reader can't tell which claim
came from which source. Avoid for substantive claims;
acceptable for general background.

### Mixed

Combine forms: hyperlinks for online sources, footnotes
for academic, occasional inline attribution for emphasis.

## Phrasing patterns

### Claim about the world (when wide agreement)

"X is the case." (or "X happens" / "X works this way" /
etc.)

Used when the synthesis supports the claim strongly;
the writer is asserting it. Citation may follow at the
end of the paragraph or block.

### Claim about the source (when one or few sources)

"Source A argues that X." / "Studies suggest X." /
"Smith (2024) reports X."

Used when the claim is single-sourced or the
synthesis hasn't fully validated it. Honest about the
provenance.

### Claim about consensus

"Most researchers agree on X." / "The field broadly
holds that X."

Used for established consensus. Strong claims; used
sparingly. Backing required (a survey paper or a
meta-analysis).

### Claim about debate

"Whether X is true is contested." / "Sources disagree on
X." / "Smith argues X; Williams disagrees."

Used to surface contradictions. The writer doesn't
resolve the debate; lets the reader see it.

### Hedge

"X may be the case." / "Evidence suggests X." / "It
appears X."

Used when the synthesis points toward but doesn't
confirm. Honest hedge ≠ filler hedge — the hedge has
content, marks the uncertainty rather than weakening
prose for show.

## Source aggregation patterns

### Wide agreement with footnote sweep

> Most modern API security frameworks recommend
> short-lived access tokens. [^smith2024] [^jones2023]
> [^owasp2025]

Single sentence; multiple supporting citations. Reads
clean; demonstrates triangulation.

### Single-source attribution

> Smith (2024) reports that 80% of breached systems
> still used the default configuration.

Specific claim; specific source; reader knows exactly
what to verify.

### Contradiction surfaced

> Whether long-lived tokens are inherently insecure is
> debated. Smith (2024) argues they are; Davis (2023)
> notes that lifetime alone doesn't determine risk if
> revocation is reliable.

Both sides credited; the debate is the synthesis
finding.

### Synthesis verdict

> Across studies, agreement is strong on alg confusion
> as a real and exploited risk; less strong on whether
> JWT should be replaced wholesale or hardened in place.

The writer states the synthesis-level finding; specific
citations elsewhere in the section back the components.

## Keeping the audit trail

The claim graph is your private artefact; the prose is
public. The audit trail bridges them:

- **Map your prose back to claim IDs.** Some writers
  keep margin notes referencing [A1], [B2] etc. as
  they draft.
- **When editing changes a sentence, re-check the
  citation.** Edits can drift the claim from what the
  source actually said.
- **When a source is updated / retracted, find the
  prose that depended on it.** The claim ID makes this
  searchable.

For long-lived documents (research reports,
white papers), the audit trail pays off in maintenance.

## Common writing-from-sources problems

### Plagiarism by paraphrase

Paraphrase too closely; the substance and structure are
the source's even though the words are slightly
different. Solution: restate in your *own* structure,
with attribution.

### Citation laundering

Citing a secondary source for a claim made in a primary
the secondary cites. The reader thinks they have a
strong source; they have one indirection level. If you
made the chain, cite the primary.

### Bare-attribution dump

"According to Smith, Jones, and Brown..." — three names,
no claim. The reader has to do the synthesis.

Counter: state the claim, then attribute. "Multiple
studies report X (Smith, Jones, Brown)."

### Citation-as-shield

Citing extensively to avoid making claims. "According to
Smith..." for everything; the synthesis has no voice.

Counter: synthesise; attribute selectively.

### Selective attribution

Citing the sources that support; skipping the
contradicting. Reader can't see the gap.

Counter: contradiction surfaces in attribution as much
as in claims.

### Mismatched specificity

A general claim attributed to a specific source whose
finding was narrower. "Smith (2024) found that
authentication systems are insecure" — but Smith
studied JWT specifically, not all auth. Misrepresents.

Counter: match specificity; if Smith studied JWT, the
claim should be about JWT.

## Anti-patterns

### Citation as performance

Citing to look thorough rather than to inform. Footnotes
on every other sentence; reader stops checking.

### Citation as obstruction

Citing nothing because "the substance is what matters".
Reader can't verify; trust depends on the writer's
authority alone.

### Voice-erasure citation

Every claim attributed to a source; no synthesis voice.
The piece is a list of who said what.

Synthesis has a voice; writer is doing work that the
sources individually didn't do (assembling, structuring,
contradicting).

### Voice-without-source

Strong synthesis voice with no traceable sources. Reads
authoritative; can't be verified or updated.

Counter: voice + sources; both.

## Output line

- "**Citation density:** ⟨calibrated⟩. **Audit trail:**
  ⟨claim graph maintained / not maintained⟩."
- "**Specific writing-from-sources concern:**
  ⟨close paraphrase / citation laundering / bare
  attribution⟩."
- "**Synthesis voice present** — ship this section."
- "**Synthesis voice missing** — claim level only;
  add the structuring layer."
