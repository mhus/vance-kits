# Reuse — does this duplicate something that already exists?

The first review pass. Easiest way to ship something worse than
last week is to write a fresh version of last week's solution.

## General questions per artifact

Before touching the artifact-specific checks, ask:

- **Has the user solved this before** (in this project, in
  another project, in a draft)?
- **Does the project have utilities** for this?
- **Does the team have a convention** that already addresses it?

## Code

Specific things to look for:

- **Inline logic that has a helper.** Hand-rolled string
  manipulation, manual path handling, ad-hoc type guards,
  custom env checks. Grep adjacent files; the project usually
  has it.
- **Near-duplicate functions.** Two functions that do the same
  thing with one parameter different. Should be one function.
- **Re-implementing standard library.** `Object.keys(o).length`
  for "is empty", manual UUID generation, custom sleep, custom
  deep-equal.
- **New abstraction parallel to an existing one.** A new logger
  next to the project logger. A new HTTP client next to the
  project's. A new state container next to the existing one.

How to investigate: grep the codebase for the function name,
the symbol it uses, the string literal it returns. Look at
files in the same module first, then up the tree.

## Text / prose

- **Section that recapitulates an earlier section.** Not a
  problem if the recap is brief; a problem if the user is
  re-arguing.
- **A new doc that should be a section in an existing doc.** If
  the new doc only stands alone because it's new, it's
  probably duplication.
- **Concept invented here that already has a name.** Domain
  jargon, existing literature, prior internal terms.

## Plans / proposals

- **Re-litigating settled decisions.** The plan re-argues a
  point the team agreed on three months ago. Ask if the
  agreement is genuinely in question or if this is drift.
- **Step that another initiative already covers.** "We need to
  build telemetry" — does the platform team already have it?
- **Goals copy-pasted from a quarterly OKR without adaptation.**
  Symptom of plan-by-template.

## Decisions

- **The decision has been made before.** Surface the prior
  decision: was it implemented, was it reversed, what changed?
- **The criteria are borrowed.** See `decision-frame` —
  "should" criteria leaking in from outside the user's actual
  values.

## How to phrase a reuse finding

Concrete location, specific replacement:

- **Bad:** "This duplicates existing functionality."
- **Good:** "Lines 14-22 reimplement `formatTimestamp` from
  `utils/date.ts:7`. Use the existing helper."

When the duplication is fuzzy:

- "This looks similar to ⟨reference⟩ — worth checking before
  shipping the new version."

## When NOT to flag

- **Trivial duplication that's clearer inline.** Three lines
  used once where a helper would obscure the flow. Locality is
  a value too; don't shave at the cost of readability.
- **Genuine forking.** Sometimes the project has X, but X is
  legacy and the new code is intentionally fresh. The user
  should know; ask if the divergence is intended.
- **Convergent evolution.** Two people independently solve
  similar things. Worth noting, not worth blocking — flag,
  don't fail.

## Output line

- "**No reuse issues found.**"
- "**Reuse findings:** ⟨numbered list⟩."
- "**Likely reuse but unconfirmed** — would need broader access
  to ⟨area⟩."
