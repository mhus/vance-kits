---
title: School Essay (script + sub-worker loop)
description: Klasse 9-10 Pro/Contra essay — script spawns one sub-worker per chapter
version: "1.0.0"
tags: [test, script, school-essay, writing, chapter-loop]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - schul-aufsatz
      - schulaufsatz
      - klasse 9
      - klasse 10
      - pro/contra
      - pro contra
      - erörterung
tools:
  # The orchestrator script reaches for these via vance.tools.call(...).
  # Without this whitelist the active worker's effectiveAllowedTools
  # would filter the calls out before they reach the dispatcher.
  - process_spawn
  - doc_create
scripts:
  - name: write
    target: BRAIN
    file: scripts/write.js
    description: Spawns one Ford sub-worker per chapter, then persists all essay/* files.
---

# School Essay (Script + Sub-Worker Loop) — Skill Body

You write a Klasse 9-10 Pro/Contra-Aufsatz. **You do the research + the
argument extraction**, but **the actual chapter drafts are written by
sub-workers** — one Ford-process per chapter, spawned by the
orchestrator script. Each sub-worker sees the topic, the sources, the
style requirements, and a short summary of every previous chapter so
it can stay consistent.

## Workflow

1. **Research.** Use `web_search` + `web_fetch` (text-default) to
   gather 4-5 reputable German-language sources on the topic.
   Skip the search if the user already supplied source URLs in
   the prompt.

2. **Argument extraction.** From the sources, identify 3-5 Pro and
   3-5 Contra arguments. Each carries a `(vgl. ..., JJJJ)`-style
   citation pointing at one of the sources.

3. **Hand off to the script.** Call
   `skill_school-essay-script-loop__write` with this payload:

   ```json
   {
     "topic": "<the user's exact topic phrase>",
     "styleNotes": "<the user's tone/length/citation requirements verbatim>",
     "sources": [
       { "title": "...", "url": "...", "snippet": "..." },
       ...
     ],
     "pros":    ["Pro-Argument 1", "Pro-Argument 2", ...],
     "contras": ["Contra-Argument 1", "Contra-Argument 2", ...]
   }
   ```

   The script then spawns one Ford sub-worker per chapter
   (Einleitung, Pro, Contra, Vergleich, Fazit) via `process_spawn`.
   Each sub-worker receives the topic, sources, pros/contras,
   styleNotes, **and** a short recap of all previously-drafted
   chapters so it can stay consistent.

4. **Confirm.** The script returns
   `{ok: true, marker, filesWritten, totalChars, chapterStats}`.
   Reply with the `marker` token verbatim. The essay text lives
   under `essay/` now — do not echo it.

## Rules

- Never call `doc_create` yourself — the script owns persistence.
- Never write the chapter bodies yourself in your reply — that's the
  job of the sub-workers spawned by the script. Your reply is just
  the marker.
- The marker is the test contract — copy it verbatim, no quotes,
  no prose around it.
