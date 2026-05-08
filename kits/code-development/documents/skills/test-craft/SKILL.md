---
title: Test Craft
description: Use when the user is writing tests, deciding what to test, or asking why a test is failing in a non-obvious way
version: "1.0.0"
tags: [code, test, tdd]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - test
      - tests
      - testen
      - testing
      - tdd
      - bdd
      - unit test
      - integration test
      - assertion
      - test schreiben
      - write a test
      - flaky test
      - flakey test
      - flackernder test
      - test fails
      - test passes
manualPaths:
  - manuals/test
  - manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is in the test-writing path. Tests are leverage when
they fail meaningfully and survive refactors; they're a tax when
they fail for the wrong reasons or duplicate the implementation.
Push toward the leverage shape.

## Default protocol

1. **What do we test?** A specific behaviour, not a function.
   "When `processOrder` is called with an empty cart, it returns
   `EmptyCartError`" is a behaviour. "Test `processOrder`" is
   not.
2. **At what level?** Unit (isolated function), integration
   (multi-component), end-to-end (real environment). Pick the
   cheapest level that exposes the behaviour. (See
   `test-pyramid`.)
3. **Arrange / Act / Assert.** Three phases, in that order, with
   blank lines between. No interleaving.
4. **One behaviour per test.** A test that asserts five things
   tells you nothing when it fails ("which one broke?").
5. **Sprechender Name.** `feature_situation_expectedOutcome`.
   "processOrder_emptyCart_returnsEmptyCartError". The failing
   test's name should tell you what was meant.

## On-demand manuals

- `test-pyramid` — when to write unit / integration / e2e.
  Cost per level, when each level pays back, when you've
  ironicly inverted the pyramid (more e2e than unit). Load
  whenever the user asks "should this be a unit test or
  integration test".
- `test-smells` — bad-test-shape patterns: assertion-roulette,
  mystery-guest, eager-test, conditional-in-test,
  test-coupling-to-implementation, tests-that-test-the-mock.
  Load during code review of tests, or when a test is failing
  for the wrong reason.
- `what-not-to-test` — anti-test guide: testing the framework,
  testing trivial getters, testing private methods, testing
  what cannot fail. Load when the user asks for "100% coverage"
  or worries about untested code that doesn't need testing.

## Hard rules

- **Tests are documentation.** A test should make the intended
  behaviour clearer than the production code does. If reading
  the test confuses you, the test is wrong.
- **A passing test that didn't need to exist is technical debt.**
  Coverage at the cost of clarity is a bad trade.
- **Don't mock what you don't own.** Mock at the boundary of
  *your* code, not inside a third-party library you don't
  control.
- **A flaky test is a failing test.** Either fix it or delete
  it. "It usually passes" is a worse signal than "it fails".
- **Tests fail loudly, succeed quietly.** A test that prints
  output on success is noise; on failure, dump everything you
  need to diagnose.
- **Don't write tests after the bug** if you can write them
  *before* the fix. Bug → test that reproduces → fix that makes
  the test pass. The reproducing test is the receipt.
