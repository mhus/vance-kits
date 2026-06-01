# Bisect Strategy — when "it used to work"

The user says the bug appeared between versions A and B. Don't
hypothesise; bisect. Bisection turns "needle in a haystack" into
log₂(haystack) — feasible at any haystack size.

## When bisect beats hypothesis

- A known good version + a known bad version → bisect.
- "It used to work" but A is "last week" → narrow A first
  (re-pin to a yesterday-ish version), confirm good, *then* bisect.
- Small change set — the diff is short, just read it. Bisect on
  changes of 50+ commits or large diffs.
- Hypothesis-method has produced three rounds of "could be" with
  no confirmed direction → switch to bisect.

## When bisect doesn't work

- No good version is known. (You can sometimes manufacture one
  by reverting, but it's brittle.)
- The bug is intermittent. Bisect requires a deterministic
  bad/good signal per candidate. Either make the test
  deterministic first or use statistical bisect (rare).
- The bug only appears under load / in production / after a
  weekend. Each bisect step costs a deploy → expensive. Worth
  it for hard bugs, but consider hypothesis first.

## Git bisect — the mechanical version

```
git bisect start
git bisect bad <known-bad-sha>
git bisect good <known-good-sha>
# git checks out a midpoint
# you test, then:
git bisect bad   # if buggy
git bisect good  # if not
# repeats until git names the offending commit
git bisect reset
```

`git bisect run <script>` automates the loop if you have a script
that exits 0 on good, 1 on bad. Worth writing for a 100-commit
range.

## Log bisect

Bug surfaces in logs. Logs cover hours. Don't read all logs:

1. Find a known-bad timestamp. Find a known-good timestamp.
2. Sample the midpoint. Bad or good?
3. Halve.
4. Continue until you've narrowed to a 5-minute window.
5. Read minute-by-minute logs in that window.

## Dependency bisect

The bug appeared after a dependency update. Roll back deps one
at a time:

1. List all deps that changed since the last good build.
2. Bisect that list, not the application commits.
3. Sometimes the bug is a *combination* — two deps in tandem.
   Then bisect each pair.

## Manual input bisect

Bug fires on a 10MB JSON, not a 1MB JSON. Don't read the JSON.

1. Take the failing input. Truncate to half. Still fail?
2. If still fails, bisect within the half. Doesn't fail, bisect
   the other half.
3. Repeat until you've narrowed to the smallest input that
   reproduces.
4. That's your repro. Use it for hypothesis work.

## Configuration bisect

Bug only in prod, not dev. The diff between dev and prod is the
search space. Bisect that:

1. Enumerate every difference (env vars, feature flags, secret
   rotation, data shape).
2. Toggle them one at a time on dev (or one at a time off prod
   if you can stage).
3. Smallest set of differences that flips the behaviour →
   that's the cause area.

## Bisect anti-patterns

- **Bisecting without a deterministic test.** Each step has
  ambiguous result → bisect produces nonsense. Stabilise the
  test first.
- **Marking commits "skip" too eagerly.** `git bisect skip`
  exists but compounds quickly; if you skip more than 10% of
  commits, your good/bad endpoints are probably wrong.
- **Stopping when you've narrowed to "this commit area".** Keep
  going until git names *one* commit. That commit is your fact;
  inferring from "around here" is guessing again.
- **Using bisect on non-bisectable bugs.** Heisenbugs that
  appear with timing — bisect won't help; instrument instead.

## After bisect names the commit

You have one commit. Now:

1. Read the diff. The bug is in there.
2. If the diff is small → done, fix is in front of you.
3. If the diff is large → hypothesise within the diff. Bisect
   has narrowed your search; hypothesis-method finishes the job.
4. Sometimes the bisected commit is *exposing* a pre-existing
   bug, not introducing one. Check whether the commit removed a
   defensive check or unblocked a code path that was always wrong.

## Output line

- "**Bisect range:** ⟨A⟩..⟨B⟩. **Next step:** ⟨midpoint⟩."
- "**Bisect named:** ⟨commit⟩. **Reading diff for hypothesis.**"
- "**Bisect not viable** — ⟨reason⟩. Switching to
  `hypothesis-method`."
