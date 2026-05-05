# Tools, die du in dieser Pipeline brauchst

Welche Tools dein Recipe whitelistet, steht im Recipe selbst. Das
hier ist nur der Spickzettel zur Selbstorientierung.

| Tool | Wann |
|---|---|
| `doc_create_text` | Plot, Cast, einzelne Kapitel — alles freier Markdown |
| `doc_create_kind` mit `kind: list` | für `outline.md` (eine Item pro Kapitel) |
| `list_append` | um die Outline-Liste schrittweise zu füllen |
| `doc_read` | um Plot / Cast / vorherige Kapitel zu lesen, wenn dein Recipe das verlangt |
| `doc_concat` | nur der `aggregator`-Worker — fügt alle Kapitel verbatim zu `final-essay.md` |
| `inbox_post` | nur der `aggregator` — am Ende eine Nachricht mit Link aufs Endergebnis |
| `manual_list` / `manual_read` | jederzeit, wenn du nochmal nachschauen willst (HOW_TO, STYLE) |

**Ein Tipp für `outline.md`:** der Lector akzeptiert nur
`kind: list`-Form, nicht eine bullet-list im freien Markdown. Der
Grund ist, dass die nächste Phase `EXPAND_FROM_DOC` deterministisch
über die Items iteriert — eine Markdown-Liste reicht dafür nicht.
