---
triggers: app-typen, app types, calendar app, kanban, wiki, book, app registrieren, new app type, app_rebuild, vanceapplication, $meta.app, geplante apps
summary: The catalogue of Vance `$meta.app` types (calendar, workbook, canvasbook, wiki, slideshow, kanban), what each does, how a new app type is registered, and when not to propose an app.
---

# App Types

Which `$meta.app` values Vance supports today, what each one does, and how a new app type would be added.

## Today (registered)

Each row is a `@Service implements VanceApplication` bean living in its own `vance-addon-brain-<name>` module; `VanceApplicationRegistry` collects them at startup and `app_rebuild` dispatches to them.

| `app:` | Status | What it does | Derived artifacts |
|---|---|---|---|
| `calendar` | production | Multi-lane calendar suite. One `kind: calendar` file per lane sub-folder; auto-generated Gantt + conflict table. | `_gantt.md` (`kind: diagram`), `_conflicts.yaml` (`kind: records`) |
| `workbook` | production | Folder of `kind: workpage` block-editor pages with a sidebar page-tree. | `_index.md` |
| `canvasbook` | production | Folder of `kind: canvas` spatial pages. | `_index.md` |
| `wiki` | production | `*.md` pages with `[[Page]]`-style cross-linking. | `_index.md`, `_backlinks.yaml` |
| `slideshow` | production | Slide-deck pages. | `_index.yaml` |
| `kanban` | production | Board of `*.md` card-files under column sub-folders. | `_board.md`, `_stats.yaml` |

Any other value (`book`, `research`, `meeting-room`, …) parses fine but `app_rebuild` throws `Unknown application type 'X'. Known: [...]` because no Java service is registered for it yet.

If the user proposes an app type that is not in the table above, the honest answer is "not yet implemented — the pattern is in place, but the service for that type doesn't exist". Don't pretend it works.

## Planned (not implemented)

These are designed-on-paper, ready when someone builds the service:

| `app:` | Convention sketch | Derived artifacts |
|---|---|---|
| `book` | `*.md` chapter files with `order:` frontmatter | `_compiled.md`, `_toc.yaml` |
| `research` | `sources/`, `notes/`, `synthesis/` sub-folders | `_summary.md`, `_sources-bibliography.yaml` |
| `meeting-room` | Date-named files with notes + topic tags | `_topic-index.yaml`, `_action-items.yaml` |

All of these would slot into the existing `VanceApplication` interface with no foundation change.

## How a new app type is registered

Three pieces of code, no framework change:

1. **A typed config view** — e.g. `BookAppConfig` analogous to `CalendarsAppConfig`. Reads `config.book` out of an `ApplicationDocument`, exposes typed records.
2. **A `@Service` implementing `VanceApplication`** in its own `vance-addon-brain-book` module — `BookApplication.appName() = "book"`, `BookApplication.refresh(...)` orchestrates the artifact generation.
3. **Spring picks it up automatically.** No registration code: `VanceApplicationRegistry` collects all `VanceApplication` beans at startup. `app_rebuild` immediately dispatches to it.

Domain-specific tools (e.g. a hypothetical `book_add_chapter` analogous to `calendar_create`) are optional sugar — generic `doc_*` tools + `app_rebuild` would already cover the basics.

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

If the use case is a folder of related files that benefit from a shared derived view — time-anchored events (`calendar`), linked pages (`wiki`), block-editor pages (`workbook`), spatial canvases (`canvasbook`), a card board (`kanban`) — that's the app sweet spot.

## Related manuals

- `application-anatomy` — the `_app.yaml` schema
- `calendar-app-patterns` — design best-practices for the calendar app
- Spec: `specification/doc-kind-application.md` §8 (Future-Apps Skizze)
