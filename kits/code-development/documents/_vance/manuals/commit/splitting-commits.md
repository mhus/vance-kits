---
triggers: commit splitten, atomic commit, git add -p, interactive staging, soft reset, git stash, commit stack, aufteilen, unstage, patch edit
summary: Techniques for splitting a mixed working tree into atomic commits — git add -p, soft reset, stash, branch-off — and what "atomic" means in practice.
---

# Splitting Commits — atomic commits without losing work

A commit should describe **one** thing. Mixed commits — refactor
+ bugfix, feature + dependency upgrade, two unrelated fixes —
hurt review (more to grok), bisect (which change broke it?), and
revert (you might want one half but not the other). When the
working tree has multiple things in it, split.

## When to split

- The diff has changes you'd describe as "and": "I refactored
  the validation **and** fixed the off-by-one **and** updated
  the imports."
- A single commit message can't honestly summarise the diff.
- Reviewers will need to mentally separate concerns to make
  sense of it.

When *not* to split:

- The two changes are genuinely interlocking — the refactor
  was the safe way to fix the bug. Mention both in the body.
- Splitting would leave one half unable to compile / pass
  tests. Then either bundle, or commit the half that compiles
  with a "doesn't pass tests yet, follow-up resolves" note —
  but only on a branch nobody else is on.

## How to split — the techniques

### `git add -p` (interactive staging)

The bread-and-butter. Stages chunks selectively:

```
git add -p path/to/file
```

For each diff hunk, Git asks: stage / skip / split-further /
edit. After the round, `git status` shows what's staged and
what's still in the working tree. Commit. Then `git add -p`
again for the next concern.

If a hunk contains two concerns interleaved on adjacent lines,
hit `e` to edit the patch directly — delete the lines you don't
want yet.

### Soft reset and re-stage

You committed too eagerly. Diff is one big mess.

```
git reset --soft HEAD~1   # uncommit but keep the changes staged
git reset HEAD            # un-stage; back to working-tree state
git add -p                # now stage in slices
```

`--soft` keeps the changes; `--mixed` (default) un-stages them
too. Choose based on what you want to do next.

### Stash strategies

Working on something, get pulled into a hotfix. Don't lose the
WIP:

```
git stash push -m "wip on the report exporter"
# ... do hotfix, commit, push ...
git stash pop
```

For partial stash:

```
git stash push -p   # interactive; pick what to stash
```

Stash also helps when splitting: stash the parts you don't want
in the next commit, commit, then `git stash pop` to bring them
back.

### Branch off the WIP

If the diff has accumulated too much to split easily:

```
git switch -c wip-everything
git switch main
git switch -c clean-piece-1
# cherry-pick the relevant chunks
```

Heavy-handed but reliable. Rare; usually `add -p` + `reset` is
enough.

### `git restore --staged` (the "oops, not that") undo

You staged something you didn't mean to:

```
git restore --staged path/to/file
```

Returns the file to "modified, not staged".

## Splitting an already-pushed mess

Branch only yours:

1. `git reset --soft <last-good-commit>` — collapses commits
   into the working tree.
2. Re-stage / commit in pieces.
3. `git push --force-with-lease` (only if the branch is yours).

Branch shared with others: don't rewrite. Either:

- Live with the messy history; future commits clean.
- Cleanup in a follow-up PR that explicitly reverts and re-commits.
- Squash-merge into main (most platforms collapse to a single
  PR commit anyway, hiding the mess).

## What "atomic" means in practice

An atomic commit:

- **Compiles.** Nobody who checks out this commit gets a broken
  build.
- **Passes the tests that existed at the time of the commit.**
  Adding a test that fails on prior commits but passes on this
  one is fine; that's what tests are for. Breaking *existing*
  tests in an interim commit and fixing them in the next is
  not atomic.
- **Has one summary.** "Fix off-by-one in pagination cursor."
  If the summary needs an "and", split.
- **Is independently reviewable** — someone reading just this
  commit understands its purpose without reading the next.
- **Is independently revertable** — you could `git revert` this
  commit without breaking the next, *if* the next doesn't
  depend on it. (Sometimes commits do depend on each other; in
  a stack, that's fine.)

## Commit stacks (sequential dependent commits)

Sometimes a feature naturally splits into 3-5 commits that build
on each other:

1. Add helper function (compiles, no callers yet).
2. Add tests for helper.
3. Use helper in feature X.
4. Add tests for feature X.
5. Update docs.

Each compiles, each passes its own tests. Reviewable one at a
time. The PR is the whole stack.

This is preferred over "one big PR" *or* "five separate PRs"
when the work is genuinely sequential.

## Anti-patterns

- **Mega-commit at end of day.** "EOD checkpoint" — fine on a
  branch nobody else uses; a smell on shared branches.
- **WIP commits in published history.** Squash before merging.
- **Splitting that fragments thought.** Two commits where one
  would have read more naturally because someone over-applied
  "atomic". Use judgment; one well-named commit beats two
  awkward ones.
- **`git add .`** when you meant to add specific files. Stages
  noise (tmp files, accidentally edited configs, secrets in
  `.env`). Slow down.

## Tooling hint

If your team uses `git absorb` (Mozilla / Facebook tool), it
auto-distributes uncommitted hunks into the right earlier
commits in your branch. Useful when a review request comes back
with "fix this in commit 3" — `git absorb` finds where the
fix belongs.

## Output line

- "**Split:** ⟨first commit⟩, then ⟨second commit⟩. Use ⟨technique⟩."
- "**Don't split — interlocking.** Mention both concerns in body."
- "**Already pushed and shared — don't rewrite.** Add a
  cleanup commit instead."
