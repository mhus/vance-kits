# Output-Conventions

When a council runs in this kit-project, the following default
conventions apply to persisted artefacts:

## Path layout

All council documents live under the project folder `council/`:

- `council/question.md` — the original question / proposal under
  evaluation (free Markdown)
- `council/heads/<name>.md` — one document per head, kebab-case
  filename matches the head's `name` field
- `council/synthesis.md` — the synthesizer's consolidated
  recommendation, written at the end of the council run

## Language

Output language follows the **user input language**. If the
proposal is in German, the heads' reviews and the synthesis are
in German too. Within one council run the language is
consistent — no head-to-head language switching.

## Notification

Once `council/synthesis.md` is written, an inbox notification is
sent to the originator (type FEEDBACK, criticality LOW). The
body references the path.

## What is NOT persisted

- Intermediate drafts of head reviews before synthesis.
- The synthesizer's working notes (only the final
  recommendation lands in `council/synthesis.md`).
