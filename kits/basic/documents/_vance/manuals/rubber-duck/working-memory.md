---
triggers: arbeitsgedächtnis, working memory, externalise, benennen, cast list pinnen, state pinnen, verliert den faden, name everything, sketching, überforderung nachverfolgen, mehrstufiger prozess, mid-flight summary
summary: Techniques for externalising working memory when a user loses track of a stateful explanation: naming things, pinning the cast list and state, forced mid-flight summaries, and sketching.
---

# Working Memory — externalise before the user runs out of room

The user is explaining a stateful thing — a system, a proof, a
multi-step process — and starts losing track. Symptoms:

- "Wait, was that the second case or the third?"
- "Hold on, let me back up."
- They start over from the beginning. Twice.
- They mix up two named things.

Working memory is the bottleneck. Externalise to break it.

## Externalisation moves

### 1. Name everything

If something doesn't have a name, give it one. *Immediately*:

- "Let's call that the upstream queue."
- "We'll name those two cases A and B."
- "I'll call the first one V1 and the second one V2."

Once a thing has a name, the user can refer to it without
re-describing it. Re-describing is the cost.

### 2. Pin the cast list

For complex explanations, ask the user to enumerate the actors
*before* tracing what they do:

- "Before we walk through it: list every component / variable /
  case / step that's going to come up."
- Hold the list. Refer back: "is the data going to A or to C?"

This is cheap and reliably unblocks systems-level explanations.

### 3. Pin the state

Same principle for stateful systems — ask explicitly what state
exists before reasoning about transitions:

- "What does the cache look like before this request?"
- "What's in the database at the start of step 3?"
- "What's the count when we enter the loop?"

Most loop-confusion is "I forgot what the variable was on entry".

### 4. Forced summary mid-flight

When the user has been going for five minutes and you suspect
they've lost the thread:

- "Pause. Where are we?"
- "What did we just establish?"

If they can't answer crisply, working memory has overflowed. Back
up and re-pin the names.

## Sketching as an externaliser

When names alone don't bear the weight:

- **Boxes and arrows.** Components, data flow.
- **Time axis.** Sequence of events left-to-right.
- **State table.** Variable in columns, time in rows.
- **Tree.** Cases that branch.

Don't insist the user draw if they're talking comfortably; do
suggest if they keep going in circles. The drawing doesn't have
to be good — it just has to exist.

## Anti-patterns

- **Naming things the user didn't name themselves.** Imposes
  your structure. Bad duck.
- **Pinning more state than the user needs.** Slows the
  explanation; introduces ceremony.
- **Forcing a sketch on someone who is fluent verbally.** Some
  people externalise into talk; that's fine.

## Output line

- "**Pin this: ⟨names / state / cast⟩.** Now continue."
- "**You've lost the thread.** Back up to the last pinned
  state."
- "**This isn't a working-memory problem** — see
  `layered-explanation` or `common-confusions`."
