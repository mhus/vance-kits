# Efficiency Traps — wasteful patterns review usually misses

The third review pass. Reuse / Quality both ask "is this the
right structure?". Efficiency asks "is the structure doing more
work than it needs?".

These traps survive normal review because they're not *wrong* —
the code works, the doc reads, the plan can be executed. They're
just unnecessary.

## Cross-cutting traps

### Doing the same work twice

- **Repeated computation in a loop** that could be lifted out.
- **Repeated file / API reads** for data that doesn't change.
- **Re-parsing / re-formatting the same value.** Parse once,
  pass the parsed form.
- **Re-rendering / re-running a side effect** because a state
  guard wasn't tight enough.

How to spot: find loops, then ask "what in this loop body is
constant across iterations?"

### Sequential where parallel works

Independent operations done one after another:

- Code: three independent network calls awaited in series.
- Plan: three sub-tasks scheduled one after another with no
  dependency between them.
- Review: three reviewers asked sequentially when they could
  comment in parallel.

How to spot: list the operations, draw the dependency graph,
look for chains that don't need to be chains.

### Hot-path bloat

Work added to a path that runs frequently:

- Per-request: validation that already happened upstream;
  logging that was meant for debugging and never removed;
  feature-flag lookups that re-read every call.
- Per-render: heavy computation in a render that should be
  memoised.
- Per-startup: imports / connections that aren't needed for
  every entrypoint.

How to spot: ask "how often does this run? Once at boot? Per
request? Per render?". Then weigh the cost.

### Pre-checking before operating

The TOCTOU anti-pattern in disguise: check if X exists, then
operate on X. Race-conditiony, slower, often unnecessary.

- File: stat first then open vs. just open and handle ENOENT.
- DB: select first then update vs. update and check rows
  affected.

How to spot: any "exists check" followed immediately by an
operation on the same thing.

### Loading more than needed

- Code: SELECT * when three columns suffice; loading the whole
  list when filtering for one.
- Document: include verbatim when a reference would do.
- Plan: gathering full data when a sample would answer the
  question.

How to spot: look at what's actually used downstream. If 10%
of what was loaded ends up affecting the output, the load is
9× over-eager.

### Unbounded accumulation

- Code: lists that grow forever (caches without eviction, log
  buffers without rotation, listeners without cleanup).
- Plan: backlogs that grow but never groom.
- Inbox: notifications that don't have an end-state.

How to spot: any accumulating data structure — ask what
*removes* from it.

### Recurring no-op updates

Updates emitted on every tick / interval / event, even when
nothing changed. Downstream consumers re-render / re-process
unnecessarily.

- Add a change-detection guard: only emit / set / write if the
  value differs from the prior value.
- Watch for wrapper functions that take an updater callback —
  they need to honour same-reference returns to preserve
  caller-side no-op early-returns.

## Code-specific traps

- **N+1 queries.** Loop calling per-item DB load.
- **Premature memoisation of cheap things.** Memo with cache
  invalidation cost > original computation.
- **Sync I/O in async paths.** Blocks the event loop.

## Plan / process-specific traps

- **Status meetings to discuss progress that's tracked
  elsewhere.** Pure overhead.
- **Approval steps for reversible actions.** Disproportionate
  ceremony.
- **Rebuilding the wheel because the wheel is "just a meeting
  away".** Often right; sometimes the meeting is the cheaper
  option.

## How to phrase an efficiency finding

Quantify if you can; gesture toward the fix:

- **Bad:** "Could be faster."
- **Good:** "Lines 33-41 fetch the user three times in the same
  request — fetch once into a request-scoped cache, or pass
  the user object through the call chain."

For uncertainty:

- "Possibly hot-path bloat — depends on call rate. If this is
  per-request, fix; if it's per-startup, leave."

## When NOT to flag

- **The optimisation is genuinely premature.** Code runs once
  a day; saving 10ms is noise.
- **Readability cost > efficiency win.** Especially in glue
  code, scripts, less-trafficked paths.
- **Speculative.** "If the team grows 10×, this won't scale"
  belongs in a doc, not a review of today's code.

## Output line

- "**Efficiency findings:** ⟨numbered list⟩."
- "**One worth fixing** — ⟨specific⟩. Other paths are fine for
  the call rate."
- "**No efficiency traps in scope.**"
