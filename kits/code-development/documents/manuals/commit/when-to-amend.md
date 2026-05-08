# When to Amend — `--amend` rules and rebases

`git commit --amend` rewrites the most recent commit. Powerful;
also a foot-gun. The rule is short:

> **Amend only commits that haven't been pushed (or have been
> pushed only to a branch nobody else uses).**

Everything else flows from that.

## When `--amend` is right

- **You committed and immediately noticed a typo** in the
  message. `git commit --amend` lets you re-edit.
- **You forgot to stage a file** that belongs in the commit.
  `git add forgotten-file && git commit --amend --no-edit`.
- **You committed before running the linter / formatter.**
  Run them, `git add -u`, `git commit --amend --no-edit`.
- **You are on a personal branch** nobody else has pulled,
  and you want to clean up.

## When `--amend` is wrong

- **The commit is on `main`, `master`, `develop`** or any
  permanent / shared branch.
- **The commit was pushed to a feature branch** that another
  person has pulled. Their next pull will fight your rewrite.
- **You're not sure** if it was pulled. Default to "don't amend".
  Add a follow-up commit instead.

## When you've amended a published commit by accident

Symptoms: pushed; teammate pulls; pull fails or produces a merge
conflict on your "rewritten" commit.

Recovery:

1. `git reflog` to find the previous (pre-amend) SHA.
2. `git reset --hard <pre-amend-sha>`.
3. Push that. Your teammate's history is preserved.
4. Make a new commit for the fix you wanted to include in the
   amend.

## `--amend --no-edit`

Keeps the existing message, just re-makes the commit with the
new staged contents:

```
git add forgotten-file
git commit --amend --no-edit
```

Useful for "I forgot a file" without re-typing the message.

## Squashing during rebase

`git rebase -i` (interactive rebase) lets you mark commits as
`squash` (combine with previous, edit message) or `fixup`
(combine, discard message). Same rule applies: don't rewrite
shared history.

Common workflow:

1. Branch from main, do work in 6 messy commits.
2. Before opening PR or before pushing: `git rebase -i origin/main`.
3. Mark cleanup commits as `fixup`, leave meaningful commits as
   `pick`.
4. Push. Now the branch has a clean history.

This is fine because the branch is yours. After PR opens and
others may have looked at it, **don't rebase**. Add fix-up
commits during review; squash on merge.

## Squash on merge

Most platforms (GitHub, GitLab) offer "Squash and merge" —
collapses the entire PR to one commit on main. Pros:

- Reviewers see your full history during review.
- Main branch sees one clean commit per PR.
- No history rewrite by you; the platform does it during merge.

Cons:

- Loses the split-commit work the author did. Less useful for
  bisect inside a PR.
- The squashed commit message must be hand-curated; defaults
  are usually wrong.

Convention varies by team. Pick one and stick with it.

## Never use these without thinking

| Command | Risk |
|---|---|
| `git push --force` | Overwrites remote, even if others pushed in between. |
| `git push --force-with-lease` | Safer — fails if remote moved since you last fetched. Use this. |
| `git rebase` on shared branch | Rewrites history of commits others have. |
| `git filter-repo` / `filter-branch` | Rewrites *all* history. Backup first. |
| `git reset --hard` | Discards uncommitted work. No undo. |
| `git clean -fd` | Deletes untracked files. No undo. |

## Recovery via reflog

When you've done something destructive locally:

```
git reflog
```

Lists every state HEAD has been in for ~90 days. `git reset
--hard <reflog-entry>` puts you back. **Local only** — reflog
doesn't help with remote history.

If you've force-pushed something destructive: hope your teammate
hasn't fetched yet, get them to push their copy back, or restore
from a backup.

## Authoring practice

When in doubt:

- **Pre-push:** amend / rebase freely. It's your local history.
- **Post-push, your branch only:** amend / `--force-with-lease`
  fine.
- **Post-push, shared branch:** new commit, never rewrite.
- **On main / master / shared base:** never rewrite, period.

If you violate the last rule, recovery exists but ranges from
"slightly annoying" to "stop the world to coordinate".

## Anti-patterns

- **Squash-everything as habit.** A 30-commit PR squashed into
  one commit loses information; sometimes the granular history
  was the readable version.
- **`--amend` as a way to dodge code review.** Reviewer asked
  for changes; you `--amend` and `--force` so the prior review
  comments float in space. Add new commits during review.
- **Rebase a PR mid-review.** Unless someone asked for it,
  reviewers' line comments lose their anchors. Add fixups,
  squash on merge.
- **Random `--force` to "fix" the remote.** Find the actual
  reason your local diverged, then choose remediation.

## Output line

- "**Amend OK** — local-only commit. Run ⟨specific command⟩."
- "**Don't amend** — this is published. Add a new commit."
- "**Recover via reflog** — last good HEAD is at ⟨sha⟩."
