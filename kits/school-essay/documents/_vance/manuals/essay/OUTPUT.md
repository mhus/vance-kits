# Output-Conventions

Wenn ein Schul-Aufsatz-Plan in diesem Kit-Project ausgeführt wird,
gelten folgende Default-Conventions für persistierte Artefakte:

## Pfad-Layout

Alle Aufsatz-bezogenen Dokumente leben unter dem Project-Folder
`essay/`:

- `essay/research-question.md` — die zentrale Forschungsfrage in
  einem Satz, plus Hintergrund warum sie gestellt wird (free
  Markdown).
- `essay/sources.md` — Quellenliste als typed list-document
  (`kind: list` mit YAML-Frontmatter), pro Eintrag URL, Titel,
  Kurz-Beschreibung wofür zitiert.
- `essay/outline.md` — Kapitel-Liste als typed list-document
  (`kind: list`), pro Kapitel 2-3 Sätze Inhalt und Kern-Argumente.
- `essay/argument-map.md` — optional, bei umfangreichen Themen.
  Pro Kapitel die Argumente mit Quellen-Verweisen.
- `essay/chapters/<NN>-<slug>.md` — pro Kapitel ein Document, wobei
  NN die zweistellige Position ist (`01`, `02`, …) und slug der
  kebab-case-Titel.
- `essay/final-essay.md` — der konsolidierte Fließtext, am Ende
  der Pipeline geschrieben. Enthält alle Kapitel in Reihenfolge,
  plus Quellenverzeichnis am Ende.

## Sprache

Output-Sprache folgt der **User-Eingabe-Sprache**. Wenn der
User-Auftrag auf Deutsch formuliert ist, ist auch der Aufsatz
deutsch. Konsistenz innerhalb des Aufsatzes ist Pflicht (kein
Sprachen-Mischen außer bei wörtlichen Zitaten aus fremdsprachigen
Quellen, die in Fußnote übersetzt werden).

## Notification

Sobald `essay/final-essay.md` geschrieben ist, wird eine Inbox-
Notification an den Auftraggeber gesendet (Type FEEDBACK,
Criticality LOW). Body verweist auf den Pfad und nennt die
Gesamt-Zeichenzahl als grobe Längenangabe (Seiten-Schätzung:
2200 Zeichen ≈ 1 Seite DIN-A4 typed).

## Lektorat-Pass

Vor dem Schreiben von `essay/final-essay.md` wird ein expliziter
Lektorat-Pass durchgeführt: ein Worker-Process liest jedes
Kapitel-Dokument, prüft auf Stil-Verstöße (siehe STYLE.md),
Quellen-Konsistenz und logische Übergänge, und korrigiert vor Ort
via `doc_edit`. Erst nach dem Lektorat wird konsolidiert.

## Was nicht persistiert wird

- Zwischenergebnisse von Worker-Iterationen (z.B. erste
  Schreib-Versuche vor Lektorat-Approval) werden überschrieben,
  nicht versioniert.
- Brainstorming, Notizen, Verwerfungen — landen nicht im Project,
  sondern bleiben Worker-intern.
- Roh-Recherche unstrukturiert. Wenn Recherche-Daten relevant
  bleiben sollen, gehören sie strukturiert in `essay/sources.md`
  oder eine eigene Sektion in `essay/argument-map.md`.
