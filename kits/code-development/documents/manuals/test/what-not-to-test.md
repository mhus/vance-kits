# What NOT to Test — anti-test guide

Tests have a cost: write, run, maintain, fix when they fail
because of unrelated changes. A test that catches no real bug is
pure cost. Coverage targets that push tests into low-value areas
make codebases worse, not better.

## Don't test

### The framework

```ts
test("Express returns 200 for /healthz", () => {
    // tests Express, not your code
});
```

If your only logic is "the route exists", you're testing that
Express exists. Not your job.

Test what *you* did, not what the framework does.

### Lombok / generated code

```java
@Test void getter() {
    User u = new User("Alice");
    assertEquals("Alice", u.getName());
}
```

The getter was generated. Test the framework that generated it
once, somewhere in the language ecosystem. Not in your suite.

Same for serialisation libraries, ORM repository basics, dependency-
injection containers wiring up beans.

### Trivial getters / setters

```python
def test_user_name():
    u = User(name="Alice")
    assert u.name == "Alice"
```

The line under test is `u.name`. The test exercises the language's
attribute access. Skip.

(Test getters that *compute* something — those are functions, not
trivial.)

### Private methods

You can usually only reach them via reflection / hacks. The
*reason* you want to test them privately is that they encapsulate
non-trivial logic. The fix is one of:

- **Extract** the logic into a separate, testable, public class
  (see `extract-or-inline`).
- **Test through the public surface** that uses them.
- **Make them public if the abstraction is genuine.** Often
  "private helper" was a fiction.

Don't reach in to test the private. It locks you to the
implementation.

### What cannot fail

```ts
test("returns a number", () => {
    expect(typeof getCount()).toBe("number");
});
```

`getCount` is typed `() => number` in TypeScript. The compiler
already enforced this. The test asserts what the type system
guarantees. Pure cost.

(In a dynamic language this might be defensible — but only if
the function actually has a runtime type-shape risk, e.g. parsing
external input.)

### Configuration

```python
def test_config_has_db_url():
    assert "DATABASE_URL" in config
```

Configuration belongs to deployment, not code. Tests of config
fail or pass for reasons unrelated to the code's correctness.
Validate config at *startup*, not in the test suite.

### Logs

```ts
test("logs on error", () => {
    const logSpy = jest.spyOn(console, "log");
    doThing();
    expect(logSpy).toHaveBeenCalledWith("error");
});
```

Logs are debugging aids, not behaviour. Asserting on log content
makes the logs unrefactorable — every wording change breaks tests
without indicating any behaviour change.

(Exception: structured logs that are part of your *contract*
with downstream consumers — those are no longer logs, they're
events. Test them as events.)

### Pure pass-through

```java
@Test void list() {
    when(repo.findAll()).thenReturn(List.of(...));
    assertEquals(List.of(...), service.list());
}
```

The service method is `return repo.findAll();`. The test
verifies one line that does no work. If you remove the test, no
real bug becomes possible.

Fine in code-coverage tools as "uncovered line"; not fine to
write a test for it. Adjust the coverage policy instead.

### Performance — except when contracted

Performance tests that assert "this completes in under 100ms":

- **Flaky.** Same machine, same code, different load → fails.
- **Wrong scale.** Local laptop is not production.
- **Unspecific.** "Slow" rarely has a precise threshold.

Performance is better tested via benchmarking (which produces
distribution data), monitoring (catches real regressions), or
load tests (purpose-built). Adding a perf-assertion to the unit
suite manufactures flake without catching regressions reliably.

The exception: you have a documented SLA, the test is the
contract for that SLA, and the environment is controlled.

### "Just to get coverage"

If a test exists only to bump coverage from 78 % to 80 %, and
exercises code without asserting anything meaningful, delete it.

Coverage is a hint about what *might* be untested. It's a bad
target. Aim for "every behaviour that matters has a test", not
"every line was hit by some test".

## Do test

To balance the catalogue — these *do* deserve tests:

- **Behaviour the spec promises** — happy path, edge cases, error
  cases.
- **Bugs as you fix them** — repro test before the fix is the
  receipt that the fix worked.
- **Boundaries** — empty inputs, max inputs, unusual inputs.
- **Integration points** that have actual semantics: SQL queries,
  date arithmetic with timezones, parsing/serialisation,
  rate-limit logic.
- **Algorithms** with non-trivial logic. Sorting, search,
  scheduling, bin-packing — write the property and the cases.
- **Observable side effects** that downstream depends on: emails
  sent (at integration level), events published, files written.

## How to push back on coverage demands

If someone insists on a coverage target that pushes tests into
the no-test categories above:

- Reframe to "behaviour coverage" — every documented behaviour has
  at least one test.
- Carve out exclusions for generated / framework / config code.
- If the team won't budge, write the cheapest possible
  no-op-but-passing tests for excluded code, and document them
  as "coverage padding" so future devs delete them when the
  policy relaxes. Honesty over ceremony.

## Output line

- "**Don't test this** — ⟨reason⟩."
- "**Do test this** — ⟨specific behaviour⟩."
- "**Test the wrong level** — see `test-pyramid`."
