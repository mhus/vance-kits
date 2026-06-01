---
title: Skill Author
description: Use when the user is writing or editing a Vance skill — frontmatter, body, triggers, manuals
version: "1.0.0"
tags: [vance, skill, authoring, meta]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - skill
      - skill schreiben
      - skill erstellen
      - skill authoring
      - skill ergänzen
      - neuer skill
      - skill.md
      - frontmatter
      - skill trigger
      - skill manuals
manualPaths:
  - manuals/skill
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing a skill — a Markdown file with YAML
frontmatter under `<project>/skills/<name>/SKILL.md` (or in a
kit's `documents/skills/<name>/SKILL.md`). A skill activates
when triggered, extends the system prompt, optionally exposes
manuals on demand, and optionally widens the tool whitelist.

This skill is *self-applying*: it documents the format it
uses. When the format changes, this skill is among the first
to update.

## Default protocol

1. **What problem does the skill address?** "When a user is
   doing X, follow protocol Y." If the answer is vague, the
   skill will be vague — push for a specific situation +
   specific behaviour.
2. **Pick triggers carefully.** Triggers fire automatically;
   over-broad triggers activate the skill on conversations
   where it's wrong, narrow triggers miss legitimate cases.
   See `trigger-design`.
3. **Body short, manuals long.** ≤ ~70 lines for the body.
   Default protocol + manual menu + hard rules. Anything
   longer goes to a manual. See `skill-anatomy`.
4. **Manual structure.** Each manual has a clear standalone
   purpose, an output line convention, and cross-links to
   sister manuals where relevant. See `manual-structure`.
5. **Test in a real session.** Until you've seen the trigger
   fire and watched the LLM use the skill, the design is a
   guess.

## On-demand manuals

- `skill-anatomy` — frontmatter fields (title, description,
  triggers, tools, manualPaths, referenceDocs, tags), body
  structure (default protocol → manuals → hard rules),
  cross-skill linking. The complete shape of a SKILL.md.
- `trigger-design` — KEYWORDS vs. PATTERN; threshold
  semantics; false-positive avoidance; multi-language
  triggers; how to test a trigger. Load when picking the
  triggers.
- `manual-structure` — how to write good manuals: standalone
  purpose, output-line convention, cross-linking, depth
  calibration, anti-patterns. Load when writing the skill's
  manuals.

## Hard rules

- **Skill body ≤ ~70 lines.** Hard limit; not negotiable.
  The pattern fails if bodies bloat. Move detail to manuals.
- **One concern per skill.** A skill that does both "review
  PR" and "fix bugs" is two skills. Split.
- **Triggers should be specific to the skill's domain.**
  A skill named `cve-analysis` shouldn't trigger on
  "security" alone — too broad. Trigger on
  `cve / vulnerability / exploit / 0day`.
- **Manuals reference each other when natural; don't force.**
  Cross-links across manuals work because each manual is a
  pull target via `manual_read`. Don't fabricate links.
- **No speculative `tools:` additions.** Each tool the skill
  adds becomes available to the model whenever the skill
  is active. Add only what the skill genuinely needs (often
  just `manual_list`, `manual_read`).
- **Don't author skills as documentation.** A skill is *not*
  a wiki page; it's runtime behaviour. If the audience is a
  human reading docs, write a doc instead.
- **No emojis in frontmatter or body** unless the user's
  authoring conventions explicitly call for them. Skill files
  show up in many contexts (code review, prompt traces) where
  emoji noise distracts.
