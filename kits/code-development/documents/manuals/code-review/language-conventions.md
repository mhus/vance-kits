# Language Conventions — idiomatic checks per language

Common-sense conventions for languages that show up often. Not
exhaustive — when reviewing in a language not listed, fall back to
the project's existing style and `quality-smells` from basic.

## Java

- **`Optional<T>`** for absence in return types; never `null` for
  signalling absence in new APIs. Don't use `Optional` for fields
  or parameters.
- **Streams** for transformations of finite collections; not for
  side effects, not where a `for` is clearer.
- **Records / Lombok `@Value`** for immutable data carriers; not
  classes with manual getters/setters.
- **Checked vs. unchecked exceptions.** Domain failures: checked
  or sealed type. Programmer error: unchecked. Don't catch and
  log; rethrow or handle.
- **`var`** for obvious right-hand-side types; not for cryptic
  ones.
- **Synchronized vs. concurrent collections.** `Collections.synchronizedX`
  is mostly wrong; use `Concurrent*`.
- **JSpecify** — if the project uses it: every package has
  `package-info.java` with `@NullMarked`; only `@Nullable` is
  explicit.

## TypeScript

- **`unknown` over `any`.** `any` defeats type checking; `unknown`
  forces narrowing.
- **Discriminated unions** over flag-based variants. `{ kind: 'ok',
  value }` / `{ kind: 'err', error }`.
- **Branded types** for IDs that look the same. `type UserId = string
  & { readonly __brand: 'UserId' }`.
- **`readonly`** for unchanged data. `ReadonlyArray<T>`.
- **No `enum`** if the project prefers union types — they're
  often the cleaner choice.
- **`async`/`await` over manual `.then()` chains.** Cleanup paths
  are easier to read.
- **Avoid `as` assertions.** Each one is a hole in the type
  system. Justify or replace with a guard.
- **No barrel imports** if the project bans them; they often hide
  cycles.

## Python

- **Type hints** in new code. PEP 604 style (`X | None`) over
  `Optional[X]` in modern code.
- **`dataclass` / `pydantic` BaseModel** for data carriers.
- **Context managers** (`with`) for resource lifecycle. No manual
  `close()`.
- **f-strings** over `%`-formatting and `.format()`.
- **Avoid mutable default args.** `def f(xs=[])` — classic bug.
- **`isinstance` over `type(x) == ...`**.
- **Don't catch bare `Exception:` and log.** At minimum, narrow
  the catch.
- **Generators for streaming**, not list comprehensions that
  blow up on large inputs.

## Rust

- **`Result<T, E>` everywhere fallible.** No `panic!` in library
  code.
- **`?` over manual match-and-return** for propagating errors.
- **Borrow checker hints.** If the code is fighting the borrow
  checker with `clone()` everywhere, rethink the data flow.
- **Newtype pattern** for any ID or domain value. `struct UserId(u64);`.
- **`thiserror` / `anyhow`** — convention split: `thiserror` for
  library error types, `anyhow` for application code.
- **`unsafe` blocks need a SAFETY comment.** No exceptions.
- **`async` runtime consistency.** Don't mix `tokio` and `async-std`.
- **Lifetimes named for purpose**, not `'a`, `'b`, when there are
  multiple meaningful ones.

## Go

- **Error returns**, not exceptions. Wrap with `fmt.Errorf("%w", err)`.
- **No `panic` in library code.** Reserved for unrecoverable
  programmer error.
- **Goroutine ownership.** Who creates → who waits → who closes
  the channel? Each goroutine has an answer.
- **Context-first parameter** for cancellable / deadline-bearing
  functions: `func DoX(ctx context.Context, ...)`.
- **No naked returns** in non-trivial functions.
- **Interface accept, struct return** — accept the smallest
  interface, return the concrete type.
- **`defer`** for cleanup, even when it looks like the function
  has only one exit path. Refactors add exits.

## SQL

- **Parameterised queries, always.** No string concatenation with
  user input.
- **Indexes on the columns of the WHERE / JOIN / ORDER BY.** Look
  at the `EXPLAIN` if perf matters.
- **`SELECT *` in code that ships** is a smell. Names what
  columns it actually uses.
- **N+1.** Loop with a query inside is almost always wrong.
- **Migrations:** add nullable column → backfill → make non-null,
  not all-at-once on a large table.

## Shell scripts

- **`set -euo pipefail`** at the top of any non-trivial script.
- **Quote every variable.** `"$var"`, not `$var`.
- **`shellcheck`-clean.** If the project has CI for it, run it.
- **No `eval` on user input.** Same RCE risk as `exec` in other
  languages.
- **Trap on EXIT** for cleanup that needs to run on error too.

## How to use this manual

When reviewing in a language listed above, walk the section once
to refresh which idioms apply. Surface deviations as
fix-before-merge or nit (rarely block — language idioms are
usually quality, not correctness).

When reviewing in a language not listed:

- Look for the project's `.editorconfig`, `eslint.config`,
  `clippy.toml`, `style_guide.md` — let those guide the review.
- Defer to the existing patterns in adjacent files.
- Don't impose conventions from another language onto this one.

## When NOT to surface a convention finding

- The project explicitly deviates. ("We don't use `Optional` here
  for historical reasons.")
- The convention is genuinely local style, not idiom. Tabs vs.
  spaces, brace placement.
- The diff is a port from another language and the foreign idiom
  is intentional, marked, and bounded.
