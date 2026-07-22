---
triggers: app-typen, app types, calendar app, kanban, wiki, book, app registrieren, new app type, app_rebuild, vanceapplication, $meta.app, geplante apps
summary: The catalogue of Vance `$meta.app` types (only `calendar` in v1), what each does, how a new app type is registered, and when not to propose an app.
---

# App Types

Which `$meta.app` values Vance supports today, what each one does, and how a new app type would be added.

## Today (v1)

| `app:` | Status | What it does | Derived artifacts |
|---|---|---|---|
| `calendar` | production | Multi-lane calendar suite. One `kind: calendar` file per lane sub-folder; auto-generated Gantt + conflict table. | `_gantt.md` (`kind: diagram`), `_conflicts.yaml` (`kind: records`) |

That's it. Any other value (`kanban`, `wiki`, `book`, `research`, …) parses fine but `app_rebuild` throws `Unknown application type 'X'. Known: [calendar]` because no Java service is registered yet.

If the user proposes a non-calendar app type, the honest answer is "not yet implemented — the pattern is in place, but the service for that type doesn't exist". Don't pretend it works.

## Planned (v2+, not implemented)

These are designed-on-paper, ready when someone builds the service:

| `app:` | Convention sketch | Derived artifacts |
|---|---|---|
| `kanban` | `*.md` card-files under column sub-folders (`todo/`, `doing/`, `done/`) | `_board.md` (rendered overview) |
| `wiki` | `*.md` pages with `[[Page]]`-style cross-linking | `_index.md`, `_backlinks.yaml` |
| `book` | `*.md` chapter files with `order:` frontmatter | `_compiled.md`, `_toc.yaml` |
| `research` | `sources/`, `notes/`, `synthesis/` sub-folders | `_summary.md`, `_sources-bibliography.yaml` |
| `meeting-room` | Date-named files with notes + topic tags | `_topic-index.yaml`, `_action-items.yaml` |

All of these would slot into the existing `VanceApplication` interface with no foundation change.

## How a new app type is registered

Three pieces of code, no framework change:

1. **A typed config view** in `vance-shared` — e.g. `KanbanAppConfig` analogous to `CalendarsAppConfig`. Reads `config.kanban` out of an `ApplicationDocument`, exposes typed records.
2. **A `@Service` implementing `VanceApplication`** in `vance-brain.applications` — `KanbanApplication.appName() = "kanban"`, `KanbanApplication.refresh(...)` orchestrates the artifact generation.
3. **Spring picks it up automatically.** No registration code: `VanceApplicationRegistry` collects all `VanceApplication` beans at startup. `app_rebuild` immediately dispatches to it.

Domain-specific tools (e.g. a hypothetical `kanban_move_card` analogous to `calendar_create`) are optional sugar — generic `doc_*` tools + `app_rebuild` would already cover the basics.

## What the app pattern is NOT

- **Not a plugin system.** Apps are Java code in the `vance-brain` jar, not loaded at runtime. New app types ship with new Brain releases.
- **Not multi-tenant configurable.** A tenant cannot define a new app type via settings — only existing types can be configured. App types are platform-level abstractions.
- **Not a way to bypass Vance's "Think Tool" stance.** An `app: kanban` won't make Vance a project management system — it would render a board view from notes-style cards, but Vance still won't push Jira tickets or send Slack pings.

## When to NOT propose an app type

The user mentions:

- "Quick capture of one thing" → just use the right kind directly. `kind: calendar` + `calendar_create` for an event, `kind: list` + `list_append` for a todo, etc. No app folder needed.
- "Project management with task dependencies, resource allocation, deadlines that cascade" → not Vance's scope. Recommend Linear / Jira / GitHub Projects.
- "Real-time collaboration on documents" → not Vance's scope.
- "Push notifications / reminders" → not Vance's scope.

If the use case requires multiple **time-anchored** files that benefit from a shared visualisation, that's the app sweet spot today (`app: calendar`).

## Related manuals

- `application-anatomy` — the `_app.yaml` schema
- `calendar-app-patterns` — design best-practices for the one app that exists today
- Spec: `specification/doc-kind-application.md` §8 (Future-Apps Skizze)
