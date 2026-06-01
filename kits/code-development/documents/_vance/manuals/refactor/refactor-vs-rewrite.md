# Refactor vs. Rewrite — when "let me rewrite this" is wrong

The temptation: a module is messy, the user is frustrated, the
fix is "rewrite it from scratch". Sometimes correct, often
catastrophic. This manual is the framing — the actual decision
is a `decision-frame` exercise (see basic kit).

## The case for rewrite

Rewrite makes sense when:

- **The original spec was wrong** and the code reflects that
  spec accurately. You're not fixing code; you're discarding a
  shape that's no longer wanted. Refactor preserves shape;
  here, shape is the bug.
- **The technology is no longer available / supported.** The
  language went away, the framework EOL'd, the dependency was
  deprecated.
- **The code is so far from current standards** that incremental
  fixes leave a hybrid mess. (Rare — usually the standards moved
  faster than the code's correctness, not the code's
  correctness disappeared.)
- **The behaviour itself is wrong** and the code embodies the
  wrong behaviour deeply. You don't want to refactor toward the
  wrong target.
- **You have a comprehensive test suite** that captures the
  desired behaviour independently of the implementation.
  Without that, you can't validate the rewrite.
- **The module is small.** A 200-line rewrite is feasible; a
  20,000-line rewrite is a multi-quarter project disguised as a
  cleanup.

## The case against rewrite

Rewrite is usually wrong when:

- **The code is ugly but works.** Ugly is not a behaviour bug.
  Many edge cases are encoded in the ugliness. Rewriting forgets
  them.
- **Tests are thin or coupled to implementation.** You'll
  rewrite the implementation, the tests will all break, and you
  won't know what's a regression.
- **You don't fully understand the code yet.** The first
  question of any rewrite is "what does it do?" — and if you
  can't answer that today without reading the code, you'll
  rebuild a worse version of what's there.
- **The codebase has working patterns** elsewhere that solve
  the same problem. Refactor toward those; don't reinvent.
- **It's load-bearing.** Whatever it does, downstream depends.
  Rewrite means a coordinated rollout, possibly across teams,
  for a benefit that's hard to demonstrate.
- **The estimate is "a few weeks".** Rewrite estimates are
  almost universally wrong by 3-5×. "A few weeks" usually means
  a quarter; a quarter usually means a year.

## The case *for* incremental refactor

Refactor (incrementally) when:

- **You can name a specific shape goal.** "Extract this concern
  into a class". "Replace inheritance with composition". Not
  "make it cleaner".
- **Tests exist** or are cheap to write *for the surface area
  you're touching*.
- **You can ship intermediate states.** Refactor in commits
  that each pass tests; you can pause at any time and the code
  is still production-ready.
- **The mess is a few layers deep, not pervasive.** A bad
  function inside a fine module is a refactor; a bad module
  inside a worse system is a different conversation.

## The strangler-fig pattern (the third option)

Sometimes the right answer is *neither pure refactor nor pure
rewrite* — it's the strangler:

1. Build the new alongside the old.
2. Migrate consumers one at a time.
3. When the last consumer is on the new, delete the old.

This works when the boundary between old and new is small
enough to be a real seam (an API call, a queue, a database
view). It's slower than refactor for small messes but
massively safer than rewrite for large ones.

## How to decide — a checklist

Run through these (or call `decision-frame` from basic):

| Question | Refactor | Rewrite |
|---|---|---|
| Tests cover behaviour? | Yes → ✓ | Yes → ✓; No → ✗ |
| Module size? | Any | Small ✓; Large ✗ |
| Spec still right? | Yes → ✓ | If no → ✓ |
| Stakeholders depend on it now? | ✓ either way | Stage strangler |
| Estimate "a few weeks"? | Plausible | Almost always wrong |
| Can ship intermediate states? | Yes → ✓ | No |
| Risk tolerance | Low | High |

If three or more rows lean rewrite and you can support a
multi-month effort, rewrite. Otherwise refactor or strangler.

## Anti-patterns

- **"Rewrite is faster."** Rarely true once you account for
  rebuilding edge-case knowledge that lives in the old code.
- **"Old code is unmaintainable."** Sometimes true; usually
  means "I haven't read it carefully". Read first, decide
  after.
- **"We'll write it properly this time."** Hubris. The new
  version will have its own pile of compromises by year two.
- **"It'll be quick."** No rewrite is quick.
- **Mid-rewrite scope creep.** "While I'm rewriting the storage
  layer, let me also redo the API." No. Each rewrite has one
  goal.

## Anti-anti-patterns (when refactor is also wrong)

- **Refactor for years** with no shipped value. The codebase is
  cleaner each quarter; the product hasn't moved. Sometimes
  rewrite would have been faster (if smaller).
- **Refactor that changes behaviour.** Not a refactor.
- **Refactor without tests** in the touched module. Bug factory.

## When the user is on the fence

This is when `decision-frame` from basic is the actual move:

1. State the decision: refactor X vs. rewrite X.
2. Surface criteria: tests, scope, time, risk, stakeholders.
3. Score honestly. Let the user weigh.
4. Reversibility: rewrite is rarely reversible mid-flight.

Don't pre-decide for the user. The right answer depends on
constraints they know better than you.

## Output line

- "**Refactor** — ⟨specific moves, see `extract-or-inline`⟩."
- "**Rewrite** — small, tested, spec is wrong. Plan: ⟨steps⟩."
- "**Strangler** — build new alongside, migrate ⟨specific
  boundary⟩."
- "**Don't decide yet.** Surface ⟨specific criterion⟩ first
  via `decision-frame`."
