---
triggers: test smell, assertion roulette, mystery guest, eager test, conditional in test, implementation coupling, mock testet mock, flaky test, hidden randomness, time-dependent test, snapshot
summary: A catalogue of test smells (assertion roulette, mystery guest, implementation coupling, testing the mock, flaky randomness/time, snapshot abuse) and their fixes.
---

# Test Smells — bad shapes to refactor away

Tests can be wrong in ways production code can't. They can pass
when they shouldn't, fail when they shouldn't, or fail for the
wrong reason. The smells below are the classics; spotting one is
usually enough — they cluster.

## Assertion roulette

A test asserts five things; one fails; you don't know which.

```java
@Test void processOrder_validates() {
    Order o = new Order(...);
    Result r = service.process(o);
    assertNotNull(r);
    assertTrue(r.isOk());
    assertEquals(42, r.id);
    assertEquals("paid", r.status);
    assertEquals(2, r.items.size());
}
```

Either:

- **Split** into named tests, one assertion each.
- **Use a structured assertion** that names the field on
  failure: `assertThat(r).hasId(42).hasStatus("paid").hasItemCount(2)`.

The fix: failure should name the offending field.

## Mystery guest

A test depends on data the test didn't set up: a global fixture,
a shared DB, a file from disk.

```python
def test_processes_legacy_orders():
    result = service.process_all()  # uses orders from a fixture loaded somewhere
    assert len(result) == 47
```

47 *what*? Why 47? Reader has to find the fixture loader to
understand the test.

Fix: arrange explicitly *in the test*. If the fixture is heavy,
named factories help: `givenLegacyOrders(count=47)`.

## Eager test

The test does multiple unrelated things to "save setup":

```ts
test("user lifecycle", () => {
    const user = createUser(...);
    expect(user.id).toBeDefined();
    user.update({ email: "..." });
    expect(user.email).toBe("...");
    user.delete();
    expect(getUser(user.id)).toBeNull();
});
```

Three behaviours; one test name; if creation breaks, the rest
never runs.

Fix: split. Setup duplication is fine; clarity matters more.

## Conditional in test

```java
@Test void priceIsCorrect() {
    Order o = givenOrder();
    if (o.region == "US") {
        assertEquals(42.50, o.totalUSD());
    } else {
        assertEquals(38.10, o.totalEUR());
    }
}
```

The test asserts different things depending on the data. If
`region` changes, the test still passes — for the wrong reason.

Fix: parameterise (`@ParameterizedTest`, `it.each`, etc.) or
split into two tests. No `if` in tests.

## Test coupling to implementation

The test asserts internal state, private methods, or specific
call sequences:

```ts
test("processOrder calls validate then save", () => {
    const validateSpy = jest.spyOn(service, "validate");
    const saveSpy = jest.spyOn(service, "save");
    service.processOrder(order);
    expect(validateSpy).toHaveBeenCalledBefore(saveSpy);
});
```

Refactor the implementation, the test breaks even if behaviour
is identical. The test is locked to the current implementation.

Fix: assert observable behaviour, not call sequence. If the
sequence genuinely matters (transactional ordering), test it
through the *outcome* (e.g. partial state on failure), not the
sequence.

## Tests that test the mock

```python
def test_sends_email():
    mock_smtp = Mock()
    service = Service(smtp=mock_smtp)
    service.notify_user(user)
    mock_smtp.send.assert_called_with(...)
```

This passes whether or not the real SMTP would work. The test
verifies "the code calls the mock"; the mock verifies nothing
about reality.

Fix: either test at integration level (real SMTP / fake server
that reads the wire), or accept that this test is asserting
"we plumbed the call through" and name it that way (and write
a real test elsewhere).

## Slow-mock

A unit test that mocks 8 collaborators to test one method:

```java
@Test void doThing() {
    when(a.x()).thenReturn(...);
    when(b.y()).thenReturn(...);
    when(c.z()).thenReturn(...);
    // ... five more mocks
    sut.doThing();
    verify(d).w();
}
```

Either the unit under test has too many collaborators (refactor
the production code), or the test should be at integration
level.

## Overlapping tests

Three tests cover almost the same code path. Refactor breaks
all three; debugging which is the "real" test wastes time.

Fix: each test should be the *one* test that catches its
behaviour. If two tests catch the same regression, delete one.

## Hidden randomness

```python
def test_unique_id():
    id1 = generate_id()
    id2 = generate_id()
    assert id1 != id2
```

Passes 99.9 % of the time on randomness; flaky 0.1 %. Worse, the
test doesn't say anything about *why* IDs are unique.

Fix: seed the randomness, or test the property at higher
volume / with property-based tests.

## Time-dependent test

```python
def test_session_expires():
    session = create_session()
    time.sleep(3600)
    assert session.is_expired()
```

Slow, flaky if the OS pauses, doesn't actually exercise expiry
logic — it exercises `time.sleep`.

Fix: inject a clock. Test by advancing the clock to the past.

## Snapshot test as a fail-deaf alarm

```ts
test("renders correctly", () => {
    expect(render(<Foo/>)).toMatchSnapshot();
});
```

Useful for stable visual / structural tests. Becomes a smell
when:

- The snapshot is huge.
- Every PR updates snapshots without anyone reading them.
- The test name is not a behaviour, it's "renders".

Fix: snapshot the *part that matters*; not the whole render
tree.

## Setup teardown asymmetry

`@BeforeEach` creates resources; `@AfterEach` cleans up some but
not all. Tests pollute each other.

Fix: every resource created in setup gets torn down in teardown.
Better: per-test isolated resources (transactional rollbacks,
unique container per test class).

## How to phrase a smell finding (during review)

- "This test has assertion roulette — split or use a structured
  matcher."
- "Mystery guest — the `47` comes from the fixture, not from the
  test. Make it explicit."
- "Coupled to implementation — asserting `validateSpy.calledBefore(saveSpy)`.
  Refactor of `processOrder` will break this even if behaviour is
  identical. Assert outcome instead."

## When NOT to flag

- The smell is contained, the test is fast, and the alternative
  is more confusing. (E.g. a parameterised test with cases that
  are wildly different may be clearer as N split tests; doesn't
  matter.)
- The test was inherited and doesn't change — refactoring it
  isn't worth a PR unless you're already in the file.
- Style preference. "I'd structure this differently" — irrelevant
  unless it crosses into a real smell.

## Output line

- "**Smell:** ⟨pattern⟩ at ⟨test name⟩. **Refactor:** ⟨move⟩."
- "**Smell-free.**"
- "**Multiple smells clustering** — this test file probably wants
  a structural rethink, not point fixes."
