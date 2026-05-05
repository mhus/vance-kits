# Essay-Pipeline — Workflow

Du bist Teil einer Pipeline, die eine Kurzgeschichte im Stil von
Douglas Adams generiert. Welche Rolle du gerade spielst, sagt dir
dein Recipe (`creative_writer`, `writer`, `lector`, `aggregator`).
Lies dein Recipe-Prompt — er ist autoritativ. Dieses Manual gibt
nur den Gesamtkontext, damit du verstehst, wo dein Output landet.

## Phasen

1. **Plot + Outline** (`creative_writer`).
   Du erfindest Plot, Personen, und eine **Kapitel-Liste**. Die
   Kapitel-Liste schreibst du als `kind: list`-Document unter
   `essay/outline.md` — eine Item pro Kapitel mit Titel + 1-2
   Sätzen Beschreibung. Plot und Personen kommen als freie
   Markdown-Texte unter `essay/plot.md` und `essay/cast.md`.

2. **Outline-Review** (`lector` im Vogon-Loop).
   Ein Reviewer kontrolliert deinen Outline-Text. Bei Score < 0.7
   musst du im selben Slot eine bessere Version produzieren. Score
   ≥ 0.7 schließt die Phase ab.

3. **Kapitel schreiben** (`writer`, einer pro Kapitel).
   Pro Item in `outline.md` läuft ein eigener Worker, der das
   Kapitel als Markdown unter `essay/chapters/NN-slug.md` schreibt.
   Beachte den festgelegten Stil (siehe `STYLE.md`).

4. **Kapitel-Review** (`lector` pro Kapitel, Vogon-Loop).
   Wie Phase 2, aber pro Kapitel. Score < 0.7 → Kapitel neu
   schreiben. Score ≥ 0.7 → weiter.

5. **Aggregation** (`aggregator`).
   Verbinde alle Kapitel-Dokumente verbatim zu
   `essay/final-essay.md` und sende eine Inbox-Notification mit
   Link auf das fertige Dokument.

## Output-Konvention

Alle Pipeline-Artefakte liegen im Project-Folder `essay/`:

- `essay/plot.md` — Plot-Zusammenfassung (free text)
- `essay/cast.md` — Personenbeschreibungen (free text)
- `essay/outline.md` — Kapitel-Liste (`kind: list`)
- `essay/chapters/NN-slug.md` — pro Kapitel ein Document
- `essay/final-essay.md` — konkateniertes Endergebnis

## Was du NICHT tust

- Du springst keine Phasen vor: dein Recipe sagt dir genau, was du
  jetzt tun sollst.
- Du editierst die Outputs anderer Phasen nicht. Wenn dir etwas
  am Plot nicht gefällt, beschreibe das in deinem Reply — der
  Lector entscheidet, ob neu generiert wird.
- Du ändert den Stil nicht. Adams-Stil ist Pflicht — siehe
  `STYLE.md`.
