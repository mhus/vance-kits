---
triggers: kalender-app, calendar patterns, lane granularity, tag-konventionen, farbpalette, color palette, gantt, window, includeRecurring, refresh cadence, lane-namen, calendar anti-patterns
summary: Design best-practices for `app: calendar` manifests — lane granularity, tag and color conventions, `window` and `includeRecurring` decisions, refresh cadence, and calendar anti-patterns.
---

# Calendar-App Patterns

Design best-practices for `_app.yaml` manifests with `app: calendar`. Load when designing a new calendar suite or tightening an existing one.

## Lane granularity — the central decision

A lane is a sub-folder under the app root. Files inside the sub-folder belong to that lane. The lane is the unit of:

- **Editing** — one team / phase owns one folder.
- **Filtering** — agenda queries can scope to lanes.
- **Visual grouping** — Gantt-Sections, Conflict-report grouping.

**Heuristic for picking lanes:**

| Question | Likely lane |
|---|---|
| Who's the editor? | Per team (design / backend / frontend) |
| What kind of work? | Per phase (research / build / launch) |
| What kind of event? | Per category (deadlines / vacations / releases) |
| Cross-cutting concern? | One "default" lane in the root |

**Wrong cuts:**
- One lane per *event* (you'd have hundreds of folders, defeats the point).
- One lane per *month* (lanes are not time slices — the timeline does that).
- One lane per *priority* (use tags for that, see below).

**Right number of lanes:** typically 2–8. Below 2: an app is overkill, use a single `kind: calendar`. Above 8: probably mixing axes of organisation — split into separate apps.

## Tag conventions

Tags live on individual events, not in the manifest. But the manifest references them via `criticalTags` / `doneTags` / `ignoreWithinTags`, so a consistent tag vocabulary matters.

**Recommended baseline:**

| Tag | Meaning | Manifest field |
|---|---|---|
| `milestone` | Important date worth visual emphasis | `gantt.criticalTags` |
| `critical` | Hard constraint, can't slip | `gantt.criticalTags` |
| `done` | Completed work | `gantt.doneTags` |
| `erledigt` | German variant of `done` | `gantt.doneTags` |
| `private` | Personal, vacation, family | `conflicts.ignoreWithinTags` |
| `external` | Outside attendees / clients | (informational) |
| `optional` | Skip if conflict | (informational) |

**Naming rule:** lowercase, hyphen for multi-word (`hard-deadline`, `team-offsite`). Mixed case is technically fine but breaks pattern symmetry.

**Don't invent tag-per-event.** A tag that fires on exactly one event is a private note, not a tag. Use the event's `notes:` field instead.

## Color palette

The `lanes.<name>.color` field accepts:

- **Palette names:** `blue`, `green`, `red`, `orange`, `yellow`, `purple`, `pink`, `teal`, `gray`
- **Any CSS color** for custom shades (`"#ff8800"`, `"hsl(220 70% 50%)"`)

**Semantic palette suggestions:**

| Color | Typical use |
|---|---|
| `blue` | Default work lanes |
| `green` | Backend / engineering / success-related |
| `purple` | Design / creative |
| `orange` | Time-off / vacation / non-work |
| `red` | Deadlines / critical |
| `gray` | Routine / recurring / background |
| `teal` | External / clients |
| `yellow` | Pending / blocked |

**Consistency wins.** A user looking at three different calendar apps in three projects should be able to roughly read the colors. If you set up calendars for the same person, reuse colors.

## `window:` — should you set it?

The optional `calendar.window.{from, until}` clips generated artifacts to a date range.

**Set it when:**
- The project has a clear time-box (one quarter, one event series, one academic term).
- The calendars contain history beyond the current focus and you want the Gantt to show only the relevant slice.

**Don't set it when:**
- The app is a living, rolling planner with no defined end (team vacation tracker, recurring meeting room).
- You want the Gantt to follow the events themselves (start = earliest event, end = latest).

When `window` is absent, the Gantt simply renders every event; the conflict scan defaults to "today → +180 days".

## `gantt.includeRecurring` — almost always `false`

Recurring events (daily standups, weekly reviews) expand into dozens or hundreds of Gantt bars. They drown the milestones the Gantt is supposed to surface.

Keep `includeRecurring: false` (the default). If the user explicitly wants to see "every standup in the Gantt", switch — but warn that the resulting picture is noisy.

Conflict-detection always expands recurrences regardless of this setting — that's correct: a recurring standup absolutely *can* collide with a one-off review and the user wants that flagged.

## Refresh cadence

`app_rebuild` is cheap (~100ms for typical-sized apps) but not free. Don't fire it after every single edit. Reasonable cadence:

- **End of an editing session** — user added events, you rebuild before reporting.
- **On explicit request** — "refresh the gantt" / "update the plan".
- **Before delivering a final answer** that references the Gantt / Conflicts artifacts.

What you should **never** do:

- Trigger `app_rebuild` on every `calendar_create` call inside the same session.
- Schedule it on a cron — the artifacts are user-visible only when the user looks at them; on-demand rebuild is enough.

## Folder name conventions

The app folder name itself isn't special, but readable names help:

- **Project-scoped:** `projects/website-relaunch/calendars/`
- **Topic-scoped:** `team-planning/`, `sprint-q3/`, `roadmap-2026/`
- **Avoid:** generic names like `app/`, `data/`, `stuff/` — when the user has multiple apps, names become navigation.

Sub-folders (lanes) should be **short** (one word ideally): `design`, `backend`, `ops` — not `design-team-planning-q3`. Long lane names blow up the Gantt section labels.

## Anti-patterns

- **All events in one calendar file**, with the manifest just labelling them. Defeats the purpose — use a single `kind: calendar` document for that.
- **No lanes at all** (everything in root). Possible (everything lands in lane `default`), but you got an app for nothing — single-calendar is simpler.
- **Tag explosion.** 20 unique tags over 30 events is over-classification. Aim for ~5 active tags per app.
- **Hand-editing generated artifacts.** `_gantt.md` and `_conflicts.yaml` are System-Output. They get overwritten on rebuild. Edit source files.
- **Cross-app references.** If you find yourself wanting events from `app A` to influence the conflict scan of `app B`, the two apps are really one app — merge them.
- **Mixing single-calendar and app-calendar in one folder.** A folder either has `_app.yaml` (= app) or doesn't (= just a folder with single calendars). Don't half-do it.

## Related manuals

- `application-anatomy` — full `_app.yaml` schema reference
- `app-types` — what's available, what's planned
- Spec: `specification/app-calendar.md`
- LLM-facing brain manuals: `app-calendar`, `app-rebuild`, `calendar-aggregate`
