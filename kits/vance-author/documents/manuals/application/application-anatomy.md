# `_app.yaml` Anatomy

The full shape of a Vance application manifest. Source-of-truth spec: `specification/doc-kind-application.md`.

## File location

```
<any-folder>/_app.yaml      ← turns <any-folder> into a Vance app
```

The folder can live anywhere inside a project. The marker is **purely the filename** — file present → folder is an app; absent → folder is just a folder. There is no recursion: the *immediate* parent of `_app.yaml` is the app root.

## Mandatory minimum

```yaml
$meta:
  kind: application
  app:  calendar
```

Everything else is optional. The two `$meta` scalars are not just metadata — they get mirrored into the database:

| `$meta` field | Mirrors to                              | Indexed? |
|---------------|------------------------------------------|----------|
| `kind`        | `DocumentDocument.kind`                  | yes      |
| `app`         | `DocumentDocument.headers.app`           | no (v1)  |

Discovery queries use this:

- *"All apps in this project"* → indexed lookup on `kind: application`.
- *"All calendar apps"* → fetch all apps, filter `headers.app == "calendar"` in memory.

If `app` ever needs an index for scale, a compound `(kind, headers.app)` is a one-liner upgrade.

## Top-level fields

```yaml
$meta:
  kind: application       # required, always "application"
  app:  calendar          # required, picks the per-type service
title: "..."              # optional, display title
description: "..."        # optional, free text
<appname>:                # optional, nested config block — key MUST
  ...                     #   match `$meta.app`
extra-stuff:              # any other map-valued top-level key lands
  ...                     #   in `config` (forward-compat)
```

The convention `config.<appname>` is enforced *by convention*, not by the codec. The codec keeps any map-valued top-level key around (forward-compat), so a future multi-face app could have:

```yaml
$meta:
  kind: application
  app:  calendar          # primary face
calendar:
  lanes: {...}
kanban:                   # secondary face — v2 feature, currently ignored
  columns: [...]
```

v1 codec round-trips both blocks. App services only inspect their own block.

## Calendar block schema (`app: calendar`)

```yaml
calendar:
  window:                              # optional, both bounds optional
    from:  "2026-06-01"
    until: "2026-09-30"

  lanes:                               # optional; auto-defaults apply
    design:   { title: "Design",   color: blue,   order: 1 }
    backend:  { title: "Backend",  color: green,  order: 2 }
    frontend: { title: "Frontend", color: purple, order: 3 }

  gantt:                               # optional
    outputPath: "_gantt.md"            # default
    includeRecurring: false            # default
    tagFilter: []                      # empty = all non-recurring
    criticalTags: [milestone, critical]
    doneTags:     [done, erledigt]
    sectionOrder: [design, backend, frontend]

  conflicts:                           # optional
    outputPath: "_conflicts.yaml"      # default
    ignoreWithinTags: [private]
    ignoreAllDayOverlapsBetweenLanes: false
```

Auto-defaults fire when the whole `calendar:` block — or any sub-section — is missing. The full default set is documented in `calendar-app-patterns`.

## Lane-config alternatives

Two equivalent places to declare a lane's display attributes:

**Central (in `_app.yaml`):**
```yaml
calendar:
  lanes:
    design: { title: "Design", color: blue, order: 1 }
```

**Per-lane (in `<lane>/_info.yaml`):**
```yaml
title: "Design Phase (Q3-Variante)"
color: blue
order: 1
```

Resolution priority: central block > `_info.yaml` > auto-default. Use `_info.yaml` when a lane should travel with its config (kit re-use, copying lanes between projects); use the central block when settings should live in one place.

## What the codec does NOT validate

- That `$meta.app` matches a registered service. Unknown app types parse fine — the error only fires when `app_rebuild` tries to look up the service.
- That `config.<appname>` matches the app's schema. App services validate their own block, with permissive defaults (missing fields are not errors).
- Path references (`gantt.outputPath`, `conflicts.outputPath`). Wrong paths surface at write time, not parse time.

## Common mistakes

- **`kind: app`** (or `vance-app`, `application-folder`, ...). Must be exactly `application`. No abbreviations.
- **`app: ` empty or missing.** Manifest parses but every tool refuses to run.
- **Calendar config at the manifest root** (`lanes:` directly under `$meta`, not nested under `calendar:`). Parses, but `CalendarsAppConfig.from()` finds nothing → empty lanes, empty gantt.
- **Hand-writing `_gantt.md` or `_conflicts.yaml`.** They are generated artifacts; the next `app_rebuild` rewrites them. Edit sources, then rebuild.
- **Putting source-of-truth data inside `_app.yaml`** (e.g. listing every event in the manifest). The manifest is config; events live in lane-folder `*.yaml` files.

## Related manuals

- `app-types` — which `app:` values exist, what they do
- `calendar-app-patterns` — design best-practices for the calendar app
- Specs: `specification/doc-kind-application.md`, `specification/app-calendar.md`
