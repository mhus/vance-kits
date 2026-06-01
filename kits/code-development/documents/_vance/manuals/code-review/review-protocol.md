# Code-Review Protocol — three passes, separated

The full protocol behind the skill's default. Walk each pass to
completion before starting the next; merging passes hides behaviour
issues behind style debate.

## Pass 1 — Behaviour & correctness

Does the change do what its description claims? Find bugs that
would matter at runtime.

Concrete checks:

- **Spec match.** Read the PR description / linked issue / commit
  message. Does the diff match what was promised?
- **Off-by-ones.** Loops, slice indices, `<` vs. `<=`. The single
  most reliably under-reviewed bug class.
- **Error paths.** Failure cases handled? Or do they silently
  succeed / silently fail?
- **Invariants.** Pre- and post-conditions of touched functions.
  Did the change preserve them?
- **Concurrency.** Shared state mutated without synchronisation?
  Async ordering assumed but not enforced?
- **Resource lifecycle.** File handles closed, connections released,
  goroutines / threads ended?
- **Edge cases the user named.** PR description: "handles X
  correctly". Find the test or the code path that proves it.
- **Edge cases the user didn't name.** Empty inputs, single-element
  inputs, max-size inputs, unicode, negative numbers, dates around
  DST, leap years.

Probe: walk the diff hunk-by-hunk. For each hunk, ask "what is the
worst input that could hit this code?".

Severity ladder:

- **Block** — breaks an invariant, corrupts state, security flaw.
- **Fix-before-merge** — bug, but recoverable; user-visible.
- **Nit** — internal-only, low-impact.

## Pass 2 — Structure & quality

The change works. Now: is it shaped well?

Re-uses the smell catalogue from `basic/review/quality-smells`
plus code-specific patterns:

- **Boolean parameters.** `f(true, false, null)` — meaning lost at
  call site.
- **Long if / else chains** that should be a lookup, polymorphic
  dispatch, or switch.
- **Magic numbers and strings.** What is `42`? What is `"OK"`?
- **Premature abstraction.** Three layers of indirection for one
  call site.
- **Mutating shared state in a "pure" function.** Promise broken.
- **Stringly-typed code** where an enum / union / type would do.
- **Inconsistent error model.** Some functions throw, others
  return error tuples, others log-and-continue. Pick one per
  module.
- **Hand-rolled what's in the standard lib.** Custom UUID, custom
  deep-equal, custom debounce.
- **Comments explaining WHAT, not WHY.** Delete.
- **Dead code or stub returns.** "// TODO: implement" that ships.

Severity ladder:

- **Block** — leaks an internal abstraction across an API
  boundary; introduces an inconsistent error model.
- **Fix-before-merge** — quality smell that would slow future
  changes.
- **Nit** — local cleanup, optional.

## Pass 3 — Risk & operability

The change is well-shaped. Will it survive in production?

- **Migration safety.** Schema change non-blocking? Feature flag
  before code change? Rollback path?
- **Backwards-compatibility.** Deployed clients still work after
  this lands?
- **Security exposure.** Input parsing, auth, crypto, secrets,
  deserialisation? See `security-categories`.
- **Hot-path impact.** Per-request, per-render, per-tick added
  work? Quantify if you can.
- **Observability.** Can you debug this in prod from logs /
  metrics / traces? Without adding `console.log` later?
- **Idempotency.** Retried request safe? Replay safe?
- **Failure mode.** When the dependency is down, does this fail
  closed (safe) or open (dangerous)?
- **Configuration.** New env var / setting? Documented? Sensible
  default?

Severity ladder:

- **Block** — security flaw, irreversible migration risk, prod
  outage risk.
- **Fix-before-merge** — observability gap, missing rollback,
  dangerous default.
- **Nit** — log line missing, metric not added.

## Finding format

Be location-grounded and concrete.

```
**Behaviour — Block** — `src/auth/jwt.ts:42`
> if (token.exp < now) ...
Off-by-one: a token expiring exactly at `now` is treated as still
valid; should be `<=`. Triggered when clock skew is zero, which
happens in tests.

**Fix:** `if (token.exp <= now)`.
```

Avoid:

- Vague: "this could be cleaner"
- Stylistic: "I'd write it differently"
- Speculative without effort: "maybe this scales badly"

## Verdict line

End the review with exactly one of:

- **LGTM.** — no fix-before-merge, no block.
- **Ship after fix-before-merge.** — list the items, no blocks.
- **Don't merge — see ⟨item⟩.** — at least one block.

If you can't decide, the review isn't done. Walk the missing pass.
