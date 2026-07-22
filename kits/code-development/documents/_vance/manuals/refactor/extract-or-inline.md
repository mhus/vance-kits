---
triggers: extrahieren, inline, helper funktion, refactoring move, extract method, extract variable, duplication, abstraktion, wann extrahieren, mechanik
summary: When to extract logic into a helper versus inline it back, the mechanics of each move, tactical patterns, and when the right move is replace instead.
---

# Extract or Inline — the two opposite moves

Refactoring is mostly extract and inline. Other moves (rename,
move, replace conditional with polymorphism) are extract-or-inline
plus structure shifts. Get this one right and the rest follow.

## When to extract

Extract a helper / function / class / module / file when:

- **Three+ usage sites of the same logic.** Two is borderline;
  three is a missed abstraction.
- **The new helper has a name that's clearer than the inline
  code.** "What does this 8-line block do?" → if you can answer
  with a verb-phrase that fits in a function name, extract.
- **The block is a self-contained unit.** Has clear inputs,
  produces a clear output, doesn't depend on caller's local
  scope (much).
- **The block hides a concept.** Extracting and naming makes the
  concept first-class — searchable, mockable, testable.
- **You'll need to change it independently** of its callers
  later. Extraction reduces coupling.
- **It's complicated.** Long argument chains, nested control
  flow, multiple early returns. Extracting forces simplification.

Don't extract when:

- **There's only one usage site** *and* the inline version reads
  fine. The "I might need it elsewhere later" trap. Wait for the
  third site.
- **The helper would have more parameters than the inline.**
  Extracting added more surface than it saved.
- **The helper would need access to private state** of the
  enclosing class / scope. The extraction is fighting the
  encapsulation; reconsider where it lives.
- **The block's "concept" doesn't have a name.** If you have to
  name it `helperFunction1`, you haven't found a concept.

## When to inline

Inline a helper / function back into its caller when:

- **One usage site** and the helper's name is no clearer than
  the code. Indirection without payoff.
- **The helper is one or two lines.** `function isEmpty(x) {
  return x.length === 0; }` — at the call site, `x.length === 0`
  reads as well or better.
- **The helper is a thin wrapper around another helper.**
  `f(x)` → `g(x)` → `h(x)` chains. Collapse.
- **The abstraction was premature.** It was extracted "for
  future use" and the future never came.
- **Reading the call site requires reading the helper anyway.**
  The helper hides nothing because the caller has to know how
  it works.

Don't inline when:

- The helper has multiple call sites, even if it's tiny. The
  duplication cost is real.
- The helper carries an invariant that's easy to violate
  inline. (e.g. `validateBeforeWrite(x)` — inline → next dev
  forgets to write the check.)
- The helper is the boundary at which the implementation will
  change. (e.g. `currentUser()` — currently a session lookup,
  later might call an auth service.)
- The helper is a unit-test seam.

## How to extract — mechanics

1. **Pick the block.** A coherent set of lines.
2. **Identify inputs** — variables read but not declared in the
   block.
3. **Identify outputs** — variables modified, return value, side
   effects.
4. **Name the new function.** Verb phrase, present-tense action.
   "What does this do?" → the name.
5. **Move the block** into the function. Replace inputs with
   parameters; turn outputs into a return value (or an explicit
   side effect).
6. **Replace the original block with the call.** Test still
   passes.

If step 4 stalls — you can't name what the block does — the
block isn't a clean unit. Either pick smaller, pick larger, or
abandon the extraction.

## How to inline — mechanics

1. **Find every call site** of the helper.
2. **Replace each call** with the helper's body, substituting
   parameter names for argument values.
3. **Delete the helper.**
4. **Test.**

If step 1 finds many call sites that all look slightly different,
inline is wrong — the helper had value, it just didn't read like
it. Stop.

## Tactical patterns

### Extract method (function)

Most common. Block of lines → named function.

### Extract variable

`if (order.total > customer.discountThreshold && customer.tier === 'gold')`
→ `const eligibleForGoldDiscount = order.total > customer.discountThreshold && customer.tier === 'gold'; if (eligibleForGoldDiscount)`. The named intermediate is a free comment.

### Extract class / object

A method's parameters carry related fields. `f(userId, userName,
userEmail)` → `f(user)` after `class User { id, name, email }`.

### Inline temp variable

`const x = compute(); doSomething(x);` → `doSomething(compute());`
when `x` is used only once and `compute()` is short.

### Inline parameter

`f(x, defaultY)` always called with `defaultY` → drop the
parameter, use the default inside.

## When the move isn't extract or inline

Sometimes the right move is *replace*. Replace conditional with
polymorphism, replace inheritance with composition, replace
state-flag with state machine. These are heavier — they
restructure not just shape but kind. Not "extract or inline" —
escalate to `decision-frame` for the architecture-level call.

## Output line

- "**Extract:** ⟨block⟩ → ⟨name⟩. **Test, then commit.**"
- "**Inline:** ⟨helper⟩. **Test, then commit.**"
- "**Neither — replace** ⟨pattern⟩ with ⟨pattern⟩. See
  ⟨architecture-decision-doc⟩."
- "**No move worth making here.** Code reads fine."
