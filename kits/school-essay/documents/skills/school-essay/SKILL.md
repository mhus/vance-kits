---
title: School Essay
description: Use when the user asks for a school-style essay (Klasse 9-10, Erörterung, Pro/Contra) — sachlicher Sachtext mit Quellenbelegen
version: "1.0.0"
tags: [writing, school, essay, eroerterung, pro-contra, sachtext]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - schul-aufsatz
      - schulaufsatz
      - school essay
      - hausaufsatz
      - hausarbeit
      - erörterung
      - eroerterung
      - argumentative essay
      - pro-contra
      - pro contra
      - pro/contra-aufsatz
      - klasse 9
      - klasse 10
      - klasse 11
      - klasse 12
      - oberstufe-aufsatz
      - sek-ii aufsatz
      - abitur-aufsatz
      - klausur-aufsatz
      - sachtext schreiben
      - vergleichender aufsatz
manualPaths:
  - manuals/essay
  - manuals/drafting
  - manuals/structural
  - manuals/copy
  - manuals/tone
tools:
  - manual_list
  - manual_read
---

The user wants a school-style essay: a structured Sachtext
with sources, written in the third person and sober register.
Klasse 9-10 to Sek-II conventions. Different from the
generic `drafting` skill — here the form is fixed (intro →
fundamentals → pro A → pro B → comparison → conclusion for
the canonical Pro/Contra-Aufsatz) and the burden is on
faithful execution of the form, not on creative shape-
finding.

## Default approach

The right move for a non-trivial Schul-Aufsatz is to
**spawn Slartibartfast** as a child process. Slart reads the
three genre manuals as evidence (STRUCTURE / STYLE / OUTPUT),
generates a Vogon recipe with phases per chapter + editorial
+ final consolidation, and runs the recipe to produce
`essay/final-essay.md` plus the per-chapter drafts under
`essay/chapters/`.

**Exact tool call shape** (this is what Arthur should emit
when this skill is active and the user is asking for the
essay; *do not* pass `preset=school-essay` — that name does
not exist as a recipe):

```
process_create(
    name = "essay-slart",
    engineName = "slartibartfast",          // ← engine, NOT preset
    goal = "<user's original request>",
    engineParams = {
        "userDescription": "<user's full essay request,
                           verbatim, including the
                           'Wert lege ich auf:' criteria>",
        "outputSchemaType": "vogon-strategy"
        // planOnly defaults to false → Slart auto-executes
    }
)
```

Common mistakes to avoid:
- **`preset="school-essay"`** — *wrong*. `school-essay` is
  the **kit / skill** name, not a recipe name. The recipe
  resolver will return *Unknown recipe 'school-essay'* and
  the spawn fails.
- **`engineName="slart"`** — *wrong*. The full engine name
  is `slartibartfast`.
- **`DELEGATE` without an engine hint** — the selector may
  route to Ford or Marvin instead of Slart. For school-essay
  work spawn Slart explicitly via `process_create`.

After spawn, monitor the child via `process_observe`. Slart
runs ~10-20 minutes for a full plan-execute-validate cycle.
Report progress back to the user when `essay/final-essay.md`
appears.

When NOT to delegate to Slart:
- The user wants to write the essay themselves, just needs
  outline help → use `structural-edit` from writing.
- The user has a draft and wants critique → use
  `copy-edit` and `tone-and-voice` from writing.
- The user is stuck on a single section → use `drafting`
  from writing, scoped to that section.

## On-demand manuals (genre-specific)

- `manuals/essay/STRUCTURE` — 5-6 chapter standard, Pro/Contra-
  Sechsteiler, what each chapter must address, expected
  character counts per chapter (~3000-4500). Load whenever
  planning the essay shape.
- `manuals/essay/STYLE` — sachlicher Ton, "ich"-Vermeidung,
  (vgl. …, JJJJ)-Belege, argument-per-paragraph, what to
  avoid (Umgangssprache, Pauschalisierungen, Pathos). Load
  during drafting and copy-edit.
- `manuals/essay/OUTPUT` — `essay/` directory convention,
  `essay/final-essay.md` as consolidated output, Lektorat-
  Pass before assembly. Load when planning recipe phases.

## Hard rules

- **Sources are mandatory.** If the user hasn't provided
  research data, the recipe must include a research phase
  (web_search or doc_read of project research files).
  Citations must follow `(vgl. ..., JJJJ)` form throughout.
- **Sechs-Kapitel-Standard für Pro/Contra.** Don't compress
  to four "to save time" — the structure is the pedagogical
  contract. Length per chapter follows STRUCTURE.md.
- **Lektorat as a discrete phase.** Drafting and review are
  separate phases in the recipe. Don't let the drafting
  worker also "polish" — quality fades when one turn does
  both.
- **`ich`-Vermeidung except in Fazit.** The Schul-Aufsatz
  is a Drittpersonen-Text. The final paragraph can carry
  a "Aus den dargestellten Argumenten folgt für den
  Verfasser dieser Arbeit, dass…" turn-of-phrase, nothing
  else.

## Composition with writing/basic skills

This skill activates alongside writing-skills when they're
relevant — Slart's GATHERING reads everything in scope. The
genre manuals here OVERRIDE writing-kit defaults where they
conflict:
- writing/drafting says "first draft is by definition bad,
  externalise rough" → fine, applies to each chapter
- writing/copy-edit's general line-level pass → fine,
  applies in the Lektorat phase
- writing/tone-and-voice's audience analysis → applies but
  STYLE.md fixes the audience as Klasse 9-10
- The genre's STRUCTURE.md is hard: when writing/structural-
  edit suggests cutting a chapter, STRUCTURE.md keeps the
  Sechsteiler. Genre wins.
