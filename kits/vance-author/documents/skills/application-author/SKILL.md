---
title: Application Author
description: Use when the user is writing or editing a Vance application manifest — _app.yaml, kind:application, picking an app type, configuring lanes / gantt / conflicts for app:calendar
version: "1.0.0"
tags: [vance, application, app, authoring, meta]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - application
      - vance application
      - vance app
      - app folder
      - app-folder
      - application folder
      - _app.yaml
      - _app yaml
      - app.yaml
      - app manifest
      - manifest
      - kind application
      - kind:application
      - app:calendar
      - calendar-app
      - calendar app einrichten
      - kalender-app
      - calendar suite
      - lane hinzufügen
      - lane entfernen
      - lane definieren
      - lanes konfigurieren
      - sprint plan einrichten
      - projektplan einrichten
      - planning suite
      - gantt konfigurieren
      - conflicts konfigurieren
manualPaths:
  - manuals/application
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing an application manifest — a YAML file
named `_app.yaml` at the root of a folder. The presence of
this file turns the folder into a Vance application: a
self-contained domain workspace (calendar suite, kanban
board, wiki, …) with its own derived artifacts and per-app
Java service.

An application manifest is **configuration**, not code. The
hard part is picking the right `app:` type and modelling the
folder structure (e.g. lanes) — once that is settled,
filling in fields is mechanical.

## Default protocol

1. **What's the use case?** Project plan with multiple work
   streams → `app: calendar`. Single calendar without lanes →
   stay with `kind: calendar` (`doc-kind-calendar`), no app
   needed. Other intents (board, wiki, …) currently have no
   app type — see `app-types`.
2. **Sketch the folder layout first.** Where does the
   `_app.yaml` live? Which sub-folders for lanes? Which
   source files? Where do generated artifacts go? Wrong
   folder layout breaks every later edit.
3. **Set `$meta.kind` and `$meta.app`.** Both go into
   `$meta:` (not the body) so they mirror to the DB and
   Discovery queries work. See `application-anatomy`.
4. **Fill `config.<app>` block.** Schema is app-specific.
   For calendar: lanes, gantt, conflicts, window. See
   `calendar-app-patterns`.
5. **Populate the folder.** Add the source files (per-lane
   `*.yaml` calendars for `app: calendar`). The manifest by
   itself produces empty artifacts.
6. **Run `app_rebuild`** to generate / refresh the
   derived files. Hand-edits to `_gantt.md` /
   `_conflicts.yaml` get overwritten — that's the point.

## On-demand manuals

- `application-anatomy` — full `_app.yaml` schema: `$meta`
  fields, top-level scalars, the `config.<app>` nesting rule,
  how `$meta.app` mirrors to the DB. Load when the user is
  starting from scratch or stuck on syntax.
- `app-types` — which `app:` values exist today
  (`calendar`), what each one means, and how a new app type
  would be registered (Java service + manifest schema). Load
  when the user proposes a non-calendar app or asks "kann
  Vance auch X?".
- `calendar-app-patterns` — design best-practices for
  `app: calendar` folders: lane granularity, tag
  conventions, color palette, refresh cadence, anti-patterns.
  Load when the user is picking lanes or designing tag
  vocabulary for a calendar suite.

## Hard rules

- **`$meta.kind` must be exactly `application`.** Variants
  (`app`, `vance-app`, `calendar-suite`) are not recognised.
  The backend uses the indexed `kind` field for app
  discovery.
- **`$meta.app` is mandatory.** Without it the manifest is
  in an undefined state — tools error out with "App folder
  has no $meta.app value". Pick a registered value from
  `app-types` or stop and reconsider.
- **App-specific config nests under the app's name.**
  `config.calendar`, not `calendar` at the manifest root.
  Future apps will sit beside it (`config.kanban`,
  `config.wiki`) — flat layout sperrt das aus.
- **Don't hand-edit `_<artifact>` files.** They are
  generated; the next `app_rebuild` overwrites them. Edit
  source files, then rebuild.
- **One application per folder.** Sub-folders are lanes /
  topics, not nested apps. Folder-Discovery picks the
  nearest `_app.yaml` and stops; nested apps are technically
  not supported.
- **The single-calendar path is not the same as the
  calendar app.** `kind: calendar` + `calendar_create` is
  for one calendar; `_app.yaml` with `app: calendar` is for
  multi-lane planning. Don't mix the two.
- **Don't tell the user that Vance syncs to Google/Apple
  Calendar via the app pattern.** It doesn't — see
  `manual_read('app-calendar')` for the actual scope (one-
  shot ICS export + per-event add-to-calendar deep-links).
