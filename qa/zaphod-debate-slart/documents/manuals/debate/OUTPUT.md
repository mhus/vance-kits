# Output-Conventions

When a debate runs in this kit-project, the following default
conventions apply to persisted artefacts:

## Path layout

All debate documents live under the project folder `debate/`:

- `debate/question.md` — the original question / proposal
  under evaluation (free Markdown).
- `debate/heads/<name>-round-<N>.md` — one document per head
  per round, kebab-case filename matches the head's `name`
  field and the round number (1-based).
- `debate/synthesis.md` — the synthesizer's consolidated
  recommendation, written at the end of the run.

## Language

Output language follows the **user input language**. If the
proposal is in German, the heads' positions and the synthesis
are in German too. Within one debate run the language is
consistent across rounds — no language switching between
rounds, no language switching between heads.

## Notification

Once `debate/synthesis.md` is written, an inbox notification is
sent to the originator (type FEEDBACK, criticality LOW). The
body references the path and includes the consensus outcome
(reached, or maxRounds exhausted).

## What is NOT persisted

- The intermediate consensus-check verdicts (only the FINAL
  outcome is in `debate/synthesis.md`).
- The synthesizer's working notes (only the final
  recommendation lands in `debate/synthesis.md`).
- Per-round drafts BEFORE the engine writes them — the
  `debate/heads/<name>-round-<N>.md` files appear only after
  the round is complete.
