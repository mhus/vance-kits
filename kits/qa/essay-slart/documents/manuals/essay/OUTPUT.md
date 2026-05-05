# Output-Conventions

Wenn ein Essay-Plan in dieses Kit-Project ausgeführt wird, gelten
folgende Default-Conventions für persistierte Artefakte:

## Pfad-Layout

Alle Essay-bezogenen Dokumente leben unter dem Project-Folder
`essay/`:

- `essay/plot.md` — Plot-Zusammenfassung (free Markdown)
- `essay/cast.md` — Personenbeschreibungen (free Markdown)
- `essay/outline.md` — Kapitel-Liste als typed list-document
  (`kind: list` mit YAML-Frontmatter)
- `essay/chapters/<NN>-<slug>.md` — pro Kapitel ein Document, wobei
  NN die zweistellige Position ist (`01`, `02`, …) und slug der
  kebab-case-Titel
- `essay/final-essay.md` — der konsolidierte Fließtext, am Ende der
  Pipeline geschrieben

## Sprache

Output-Sprache folgt der **User-Eingabe-Sprache**. Wenn der
User-Auftrag auf Deutsch formuliert ist, ist auch das Essay
deutsch — selbst wenn Adams im Original Englisch geschrieben hat.
Konsistenz innerhalb des Essays ist Pflicht (kein
Sprachen-Mischen).

## Notification

Sobald `essay/final-essay.md` geschrieben ist, wird eine Inbox-
Notification an den Auftraggeber gesendet (Type FEEDBACK,
Criticality LOW). Body verweist auf den Pfad.

## Was nicht persistiert wird

- Zwischenergebnisse von Worker-Iterationen (z.B. erste
  Schreib-Versuche vor Lector-Approval) werden überschrieben, nicht
  versioniert.
- Brainstorming, Notes, Verwerfungen — landen nicht im Project,
  sondern bleiben Worker-intern.
