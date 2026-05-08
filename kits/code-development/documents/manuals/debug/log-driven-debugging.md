# Log-Driven Debugging — print-debug well

A `console.log` you write in 5 seconds beats a debugger you can't
attach in production. But a `console.log` that just prints "here"
or `JSON.stringify(everything)` is barely better than nothing.
The technique has rules.

## What to log

At the suspected boundary, log:

- **Inputs.** All of them. Including the ones you assume are
  fine.
- **State that the function reads.** Cache, DB row, config
  value, env var.
- **The result of any non-trivial computation.** Especially
  intermediate values that flow into a decision.
- **Branch decisions.** Which `if` branch fired, which `case`,
  which `early return`.
- **External call results.** What the API returned, what the
  query returned, even when "it worked".

Don't log:

- Stuff you already know is correct (saturates the log).
- Stuff you can't read (raw byte arrays, full giant objects).
  Hash, summarise, or pick fields.

## Where to put the prints

Three useful locations:

1. **Function entry:** "what did this function get?". Cheapest
   bug source: the function got something wrong.
2. **Branch points:** "which branch was taken". Reveals
   wrong-control-flow bugs.
3. **Function exit / before throw:** "what did this function
   produce / fail with?". Reveals wrong-output bugs.

You usually don't need prints in the middle — entry + branch +
exit covers most bugs.

## Format that's actually readable

```
[debug] processOrder enter id=ord-42 user=u-7 cart_size=3 ts=...
[debug] processOrder branch=premium_path reason=user.tier=gold
[debug] processOrder exit ok orderId=ord-42 total=42.50
```

Rules:

- **Single line per event.** Multi-line objects make scrolling
  unreadable when interleaved with other logs.
- **Unique prefix.** `[debug]` or your initials so you can grep
  out only your prints later.
- **Key=value.** Easier to grep than free prose.
- **Stable key names.** If you log `userId` here, log `userId`
  there — not `uid`.
- **No commentary.** "OMG it's null!" is for chat, not logs.

## Log volume

Print-debug a single request / single test / single repro at a
time. Logging high-volume paths buries your signal.

If the bug only appears under load:

1. Reproduce with small concurrency (5 in flight).
2. Tag each log with a request ID so you can pick the offending
   request out of the noise.
3. Grep on the tag, not the prefix.

## Cleanup after

When the bug is found, remove every print before committing.
Leftover `console.log("here")` in a PR is a smell that signals
the author didn't actually finish.

If the prints were genuinely useful — turn them into structured
logging at proper level (`logger.debug(...)`) and keep them.
Rule of thumb: prints whose information you'd want to see again
become logs; prints that helped you once and never will again
get deleted.

## Production print-debug

Production, you usually can't add prints freely:

- **Existing logs first.** Read the logs you have before writing
  new ones. Often the answer is already there.
- **Feature flag the new logs.** Default off; flip on for the
  affected user / tenant / route.
- **Rate-limit.** A new log on a hot path can take down the
  service before it tells you anything.
- **No PII.** No auth headers, no full request bodies, no
  emails. Hash if you need correlation.

## Anti-patterns

- **`console.log("here")`.** Reveals nothing about state. At
  least say where here is.
- **Print the whole object.** `JSON.stringify(req)` produces
  output you can't read and may include secrets. Pick fields.
- **Logging in finally and then re-throwing without context.**
  Stacktrace lost. Either log + handle or rethrow with cause.
- **Debug-level logs left in prod hot paths.** Ship the bug fix,
  not the debug.

## When prints aren't enough

- The bug only happens with timing — use a debugger or add
  perf-tracing (timestamps with millisecond precision per stage).
- The bug is in a third-party library — turn on the library's
  built-in trace logging if it has one; failing that, wrap calls
  with logging at your boundary.
- The bug is across services — switch to distributed tracing
  (Zipkin, Jaeger, OpenTelemetry). Print-debug hits a wall at
  service boundaries.

## Output line

- "**Add prints at:** ⟨specific locations⟩. **Run repro. Report
  output.**"
- "**Existing logs cover this** — see ⟨log line⟩. No new prints
  needed."
- "**Print-debug won't reach** — ⟨reason⟩. Switch to ⟨debugger
  / tracer⟩."
