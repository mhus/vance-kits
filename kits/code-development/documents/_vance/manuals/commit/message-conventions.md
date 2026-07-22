---
triggers: commit message, betreffzeile, subject line, commit body, imperativ, conventional commits, trailer, semver prefix, nachricht schreiben, fixes issue
summary: How to write commit subjects and bodies — imperative mood, length limits, when a body is needed, Conventional Commits prefixes and trailers.
---

# Message Conventions — subjects and bodies that read well later

A commit message is a letter to your future self (and the next
maintainer). Six months from now, blame will land on this line;
the message has to explain why, in a paragraph or less, without
the reader needing to ask you.

## Subject line

Rules:

- **Imperative mood.** "Fix X", "Add Y", "Remove Z". Reads as a
  command, not a report.
  - Bad: "Fixed off-by-one." (past tense)
  - Bad: "Fixes off-by-one." (third person)
  - Good: "Fix off-by-one in pagination."
- **Under 50 chars** if possible, hard limit ~72. Most viewers
  truncate longer subjects.
- **No trailing period.** Subjects aren't sentences.
- **Capitalise the first letter** (after a possible
  type prefix).
- **Specific, not generic.** "Fix bug" is noise; "Fix off-by-one
  in user-list pagination" is information.

## Body

When the body is needed:

- The change is non-trivial.
- The why isn't obvious from the diff.
- There's context: a related bug, a decision, a deferred
  follow-up.

When it's not needed:

- One-line typo fix in a comment.
- Trivial reformatting / linting auto-fixes.
- The subject is fully sufficient ("Update README link").

Body rules:

- **Blank line after subject.** Always.
- **Wrap at 72 chars.** Many viewers do hard-wrap above this.
- **Explain why, not what.** The diff already shows what.
  - Bad: "Changed the loop condition from `<` to `<=`."
  - Good: "The previous condition skipped the last user when
    the page boundary aligned with the user count, surfacing
    as #1432."
- **Reference issues / PRs by number** at the end of the body
  or in a trailer line. `Fixes: #1432`, `Refs: #1500`.
- **Mention follow-ups explicitly** if the change leaves
  something incomplete. "TODO: also update the export path —
  follow-up in #1500."

## Conventional Commits

The `feat:` / `fix:` / `chore:` / etc. prefix convention.
Useful when:

- The project uses automated changelog / semver tooling.
- The team has agreed on the convention.
- The audience for the changelog (users, integrators) cares
  about the prefix.

Skippable when:

- The team doesn't enforce it.
- The repo is internal-only with hand-curated release notes.

Common types:

| Prefix | Use for |
|---|---|
| `feat:` | A new feature (semver minor) |
| `fix:` | A bug fix (semver patch) |
| `refactor:` | Restructure without behaviour change |
| `perf:` | Performance improvement |
| `docs:` | Docs-only change |
| `test:` | Test-only change |
| `build:` | Build / dependency change |
| `chore:` | Maintenance — neither feature nor fix |

Optional scope: `fix(auth): expire idle tokens`. Scope is the
package / module / area touched.

Breaking changes: `feat!:` or include `BREAKING CHANGE:` in the
body. Tooling reads this for semver-major bumps.

## Examples

### Good — subject only

```
Fix off-by-one in pagination cursor
```

### Good — with body

```
Fix off-by-one in pagination cursor

When the page size aligned with the total user count, the
last user was skipped because the cursor used `<` instead of
`<=`. Surfaced in #1432 — admin couldn't see the most-recent
user on a 10-per-page boundary.

Test added covering the boundary case.

Fixes: #1432
```

### Good — refactor

```
refactor(auth): extract token validation into JwtVerifier

Behaviour-preserving. Pulled the validation chain out of
AuthMiddleware so it can be unit-tested without spinning
up the request pipeline. Mock-heavy tests in
AuthMiddlewareTest will be replaced in a follow-up.

Refs: #1500
```

### Bad — too vague

```
Updates
```

```
Misc fixes
```

```
WIP commit
```

### Bad — narrating the diff

```
Change line 42 of UserService from `<` to `<=`
```

The reader can see the diff. Tell them why.

### Bad — past tense

```
Fixed bug where users couldn't log in
```

### Bad — too long

```
Refactored the entire authentication module to use a new JwtVerifier service that I extracted from the old AuthMiddleware so that we can have better unit testability and also handle the new SAML use case
```

(Subject is fine for the body; subject should be one line.)

## Special trailers

- `Co-authored-by: Name <email>` — pair-programming attribution.
- `Signed-off-by: Name <email>` — DCO signoff for projects that
  require it.
- `Fixes: #N` / `Closes: #N` — links + auto-closes the issue
  when merged on platforms that support it.
- `Refs: #N` — links without closing.
- `Cherry-picked-from: <sha>` — when porting between branches.
- `Reverts: <sha>` — when undoing.

## When the message is wrong

- **Caught before push:** `git commit --amend` (only your local
  history). See `when-to-amend`.
- **Caught after push, branch only you use:** `--amend` + force
  push (or `--force-with-lease`).
- **Caught after push, shared branch:** add a follow-up commit
  explaining. Don't rewrite shared history.

## Output line

- "**Subject:** ⟨imperative, ≤ 50 chars⟩."
- "**Body needed:** ⟨one-line reason why⟩."
- "**No body needed.** Subject is sufficient."
