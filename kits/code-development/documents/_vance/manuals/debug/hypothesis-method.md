---
triggers: hypothese, debugging, fehlerursache, falsifizierbar, wrong input, state assumption, race condition, wrong version, experiment, testbare annahme, suchraum halbieren
summary: Forming and testing specific, falsifiable hypotheses to locate a bug — four archetypes (wrong input, state, ordering, tool/version) and when to rehypothesise.
---

# Hypothesis Method — testable claims about the cause

Debugging is a search. A hypothesis is the search node. Bad
hypotheses ("network problem?") give you nothing to search; good
ones rule out half the space when tested.

## What makes a hypothesis good

- **Specific.** Names a mechanism, a location, a condition.
  - Bad: "Something with the cache."
  - Good: "The cache key uses `user.id` but the request handler
    sometimes has `user.id === undefined` when the session
    cookie is missing."
- **Falsifiable.** You can describe an experiment whose result
  would *disprove* the hypothesis.
- **Cheap to test.** A hypothesis that takes 4 hours to test is
  rarely the right next step. Pick another.
- **Predictive.** The hypothesis predicts something *else* that
  must also be true. If the prediction holds, confidence rises;
  if it fails, the hypothesis is wrong, not "maybe still right".

## Four hypothesis archetypes

Most code bugs fit one of these:

### 1. Wrong input

The function received data it wasn't designed for.

- Empty list, single-element list, nullable was null, off-by-one,
  encoding mismatch (UTF-8 vs. UTF-16), timezone mix.
- Test: log / print the inputs at the function boundary. Compare
  to spec.

### 2. Wrong assumption about state

The function was right, the surrounding state wasn't what it
assumed.

- Cache stale, DB row out of sync, feature flag flipped, race
  with another request, retry-induced duplicate, partial failure
  of a previous step.
- Test: dump state at the moment of failure. Compare to what the
  code assumed.

### 3. Wrong ordering / concurrency

Two events happened in an order the code didn't expect.

- Race between read-modify-write, async callback firing late,
  timer firing before initialisation finished, two replicas both
  thinking they're primary.
- Test: hard to test directly. Often surfaced by adding
  artificial delays at suspected points.

### 4. Wrong tool / version

The code is right, the tool / library / runtime isn't what it
seemed.

- Wrong library version pinned, wrong driver version, JIT
  optimisation, compiler bug, OS difference.
- Test: same code, different environment. If the environment
  matters, the tool / version matters.

## How to form one

Start from what you know:

1. List **the symptom** in one sentence.
2. List **what's known** to be working (the call site that
   hands data to the broken function does send something — what?).
3. List **what's known** to be broken (what's the deepest layer
   you can confirm misbehaves?).
4. The gap between (2) and (3) is the search space.
5. Pick a hypothesis that *halves* the search space, not one
   that names a single suspect.

## How to test one

The test should produce a yes/no answer about the hypothesis.

- **Direct check.** Add a log/assert at the suspected point.
- **Vary the input.** If you suspect the input, feed minimal
  inputs. Crash → the hypothesis predicts; survive → wrong
  hypothesis.
- **Vary the environment.** Same code in dev passes; prod fails.
  Difference between dev and prod is your search space now.
- **Disprove by removal.** Comment out the suspected component;
  bug still there → hypothesis was wrong.

## When to rehypothesise

- Three tests confirmed but the bug isn't found yet → the
  hypothesis is too broad. Subdivide.
- Test result was inconclusive ("it failed differently") → the
  hypothesis is partially wrong. Reformulate based on the new
  observation, don't keep poking.
- Hypothesis-test cycle is taking longer than 30 minutes per
  iteration → step back, write down what you know in one place,
  rehypothesise from a clean state.

## Anti-patterns

- **"Fix and see."** Editing code without a hypothesis. Sometimes
  fixes by accident; often introduces new bugs without
  understanding.
- **"Could be X."** A list of vague possibilities is not a
  hypothesis. Pick one and commit to testing it.
- **Multiple changes at once.** Two changes between tests means
  you can't tell which one mattered.
- **Refusing to print-debug because "real engineers use a
  debugger".** A `console.log` you write in 5 seconds beats a
  breakpoint you can't reach in production.

## Output line

End with one of:

- "**Hypothesis:** ⟨specific claim⟩. **Test:** ⟨specific
  experiment⟩."
- "**Tested. Confirmed.** Fix is ⟨concrete change⟩."
- "**Tested. Disproved.** Rehypothesising — see ⟨next
  candidate⟩."
- "**Need more information.** ⟨specific data⟩ would
  disambiguate."
