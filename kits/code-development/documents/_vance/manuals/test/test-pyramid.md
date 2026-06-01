# Test Pyramid — pick the cheapest level that exposes the behaviour

Tests live on three (or four) levels. The pyramid works because
each level up is more expensive per test and more brittle, while
each level down is cheaper and more focused. Default: many unit
tests, fewer integration, very few end-to-end.

## The levels

### 1. Unit tests

- **What:** a single function / class / small module.
- **Boundary:** in-process. No network, no DB, no filesystem.
- **Speed:** milliseconds per test. Hundreds-to-thousands per
  second on a developer's laptop.
- **Setup:** trivial. Maybe a mock or two.
- **Failure mode:** very specific. The test's name plus the
  failed assertion almost always tells you the cause.
- **Brittleness:** low — refactor-survivable if the test asserts
  behaviour, not implementation detail.

Unit tests are the workhorse. 70 % of the test count, 90 % of the
test confidence per dollar.

### 2. Integration tests

- **What:** multiple components together. The DB layer with
  the service. The HTTP handler with the parser and the
  validator. A pipeline of two transforms.
- **Boundary:** in-process *or* with a real local resource
  (Testcontainers DB, embedded HTTP server, stub queue).
- **Speed:** 10-100ms per test. Maybe a second for first-time
  setup.
- **Setup:** non-trivial. Container startup, fixture data,
  cleanup.
- **Failure mode:** narrower than e2e but wider than unit. Often
  takes log-reading to localise.
- **Brittleness:** medium. Schema changes, dependency upgrades,
  test-data drift.

Integration tests catch things unit tests miss: SQL syntax,
serialisation round-trips, real-cache semantics.

### 3. End-to-end tests

- **What:** the whole system. Browser → server → DB → back.
- **Boundary:** real (or near-real) environment. Real network,
  real OS, real browser.
- **Speed:** seconds per test minimum.
- **Setup:** a fixture environment. Often the bulk of test
  infrastructure budget.
- **Failure mode:** wide. "Something somewhere broke." Cause
  could be in any of 50 files.
- **Brittleness:** high. Layout changes, async timing, third-
  party flakiness.

E2E tests catch *only* end-to-end issues — they justify their
existence by validating critical flows whole-cloth, not by
substituting for unit/integration coverage.

### (Sometimes) — Property tests / contract tests

Cross-cuts the pyramid. Property tests assert invariants over
generated input ("for any valid order, `processOrder` either
succeeds or returns a known error"). Contract tests verify two
services agree on the wire format. Both add value when the
domain is rich; skip when the domain is simple CRUD.

## How to pick a level

Ask in order:

1. **Can a unit test demonstrate this behaviour?** If yes,
   write a unit test. Stop.
2. **Does the behaviour involve a real boundary** (DB, network,
   filesystem) and *that boundary's behaviour matters*? If yes,
   integration test. Stop.
3. **Does the behaviour involve UI rendering / user
   interaction / multi-service flow?** If yes, end-to-end.

If you can't answer "yes" decisively at any level, you might
not have a real test to write — see `what-not-to-test`.

## Inverted pyramid (the anti-pattern)

A team writes mostly e2e tests because e2e is "more realistic".
Symptoms:

- CI takes 20 minutes for tests.
- A typo in a single function breaks 30 e2e tests.
- "We don't really know what's broken when red, just that
  something is."
- Flake rate > 5%.

Invert back:

- Move logic from controllers / glue code into pure functions —
  testable as units.
- Add unit tests for those functions.
- Delete e2e tests that overlapped with the new unit coverage,
  keeping only the "happy path" e2e per critical flow.

## Ratios that work in practice

Rough; depends on the system:

- ~70 % unit, ~20 % integration, ~10 % e2e.
- For a CRUD app: more integration (~40 %), since most logic is
  the wire to the DB.
- For an algorithmic core: more unit (~85 %).
- For a UI-heavy product: more e2e of critical flows + heavy
  unit testing of the components.

## When the level isn't clear

Sometimes a behaviour straddles. "When the user submits the
form, the data lands in the DB" — is that unit (form-validation)
+ unit (DB-write) + integration (form-handler-with-fake-DB)?

The right answer is usually: write the small tests at unit level,
write **one** integration test at the boundary that the user
actually crosses. Don't replicate.

## Output line

- "**Unit test:** ⟨specific name⟩."
- "**Integration test:** ⟨specific name + boundary⟩."
- "**E2E test:** ⟨specific flow⟩ — only for critical journeys."
- "**No test needed** — see `what-not-to-test`."
