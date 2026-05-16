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

**Exact action shape** (this is what Arthur should emit when
this skill is active and the user is asking for the essay):

```
arthur_action(
    type   = "DELEGATE",
    preset = "writing",          // ← persistence-aware Slart wrapper
    prompt = "<user's full essay request, verbatim,
              including the 'Wert lege ich auf:' criteria>",
    // message OMITTED → silent spawn; Slart will report when done
    reason = "<one-line why this skill fits>"
)
```

The `writing` recipe is a thin wrapper around the
Slartibartfast architect engine. It carries the same
`outputSchemaType: vogon-strategy` (phased plan-and-execute,
the right shape for multi-chapter essays) and adds kit-side
guidance for Slart's PROPOSING phase: "emit explicit
`doc_create_text`-calling phases for every artifact the kit's
OUTPUT.md names". Without that the Vogon-recipe Slart
generates would run all chapters in-chat and never persist a
file — the project's `essay/` folder would stay empty. Arthur's
DELEGATE handler passes your `prompt` straight into the spawned
process's `goal`; Slart picks that up as the user description
when no explicit `userDescription` param is set.

Common mistakes to avoid:
- **`preset="school-essay"`** — *wrong*. `school-essay` is
  the **kit / skill** name, not a recipe name. The strict
  resolver returns *Unknown recipe 'school-essay'* + a
  suggestion list. Use `writing` instead.
- **`preset="slartibartfast"`** — works, but skips the
  persistence-aware PROPOSING guidance. The bundled Slart
  recipe is generic; for writing tasks the kit-supplied
  `writing` recipe ensures the generated Vogon plan actually
  writes the essay to disk.
- **`DELEGATE` without `preset`** — the selector falls back
  to Marvin for substantial creative tasks, and Marvin
  without specific sub-recipes for the essay shape stalls.
  Always pass `preset="writing"` for this skill.
- Setting `message` on the action — keep it silent; Slart
  takes 10-20 minutes and you'll relay its result via
  `arthur_action type="RELAY"` once it terminates.

After spawn, Slart's terminal-DONE event lands in Arthur's
inbox via the parent-notification listener. Arthur then
emits `RELAY` (or `ANSWER` with a short note) to surface
`essay/final-essay.md` to the user. Slart runs ~10-20
minutes for a full plan-execute-validate cycle.

## Before delegating — check if it's already done

Slart runs are slow and expensive. Before emitting another
`DELEGATE preset="writing"`, ALWAYS check whether the essay
already exists in the project. The classic failure mode is
re-spawning Slart on top of a finished run because the new
parent-event looks "fresh" — that produces zombie children
and burns LLM budget.

Use `doc_find` or `doc_list` to look for the expected
artifacts BEFORE the DELEGATE action:

- `essay/final-essay.md` exists and is non-trivial
  (≥ 3000 chars) → the previous run finished. Emit
  `RELAY` (pointing at it) or `ANSWER` summarising
  what's there. **Do NOT delegate again** unless the
  user explicitly asks for a rewrite.
- `essay/chapters/0X-*.md` exists but `final-essay.md`
  is missing → previous run got most of the way but
  didn't consolidate. Spawn ONE worker via
  `process_create(recipe="writing", goal="Consolidate
  the existing essay/chapters/ into essay/final-
  essay.md, no rewrite")` — not another full Slart.
- Nothing matching → genuinely a fresh request, emit
  `DELEGATE preset="writing"`.

The same check applies to inbox-events from Slart's
parent-notification: if you receive a DONE event and the
artifact exists, RELAY and stop. Don't loop.

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
