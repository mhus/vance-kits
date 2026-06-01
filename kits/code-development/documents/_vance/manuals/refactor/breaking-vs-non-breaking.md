# Breaking vs. Non-breaking — refactors that touch an API

Refactor inside a function: nobody else cares. Refactor that
changes a public type, a function signature, a database column, or
a wire format: callers care, possibly without knowing yet. The
question is *whether the change is breaking* and, if it is, *how
to stage it so consumers don't break*.

## Is the change breaking?

A change is breaking if it makes valid prior usage invalid:

- **Function signature.** Renamed function, removed parameter,
  added required parameter, narrowed parameter type, changed
  return type.
- **Class shape.** Renamed/removed field, narrowed field type,
  removed method.
- **API endpoint.** Removed endpoint, changed required body
  shape, changed required headers, changed response shape in a
  way clients parse against.
- **Database.** Dropped column, narrowed column type, renamed
  column, removed table, changed primary key.
- **Wire format.** Removed enum value, renamed field in
  serialised payload, narrowed value range.
- **Behaviour-via-API.** Same signature but a function that used
  to return null now throws — that's breaking too.

A change is non-breaking if it's purely additive:

- New optional parameter (with default).
- New field on a type / class / response.
- New endpoint, new method.
- New nullable column.
- New enum value (sometimes — see below).

## "Sometimes additive is breaking"

- **New enum value.** Producers send it; consumers that don't
  know the value crash or mishandle. Treat as breaking unless
  you're sure all consumers handle unknowns gracefully.
- **New required field on a request that has a default in the
  client.** The default may have been wrong; setting it
  intentionally now changes behaviour.
- **Adding a method to an interface** (in languages without
  default methods). Implementers break. Java 8+ default
  methods, TypeScript optional members, Python protocols
  partially fix this — partially.

## Breaking change — three-step migration

When the change is breaking and you can't redo callers atomically,
stage:

### 1. Deprecate

- Old API still works, marked deprecated.
- New API is added alongside.
- Both are documented; new API is the recommended path.
- Compile-time warnings if the language supports them.
- A clear migration recipe in the deprecation message:
  "use `Y(args)` instead — old form maps to new with `args.opt =
  null`".

### 2. Migrate

- Walk every consumer. Move them to the new API one at a time
  in their own commits / PRs.
- For external consumers: announce, give a deadline, version
  the API.
- Migration is "boring work" — it's allowed to take weeks. Don't
  rush; rushing introduces inconsistency.

### 3. Remove

- All known consumers on new API. Old API removed.
- The deletion PR should also drop the deprecation warning,
  the compatibility shim, and the migration test.

This is slow but boringly safe. The opposite — flip-the-switch
breaking change — is fast but fragile.

## When you can flip-the-switch

- You own all the call sites and they're in your repo. Single
  PR, atomic.
- The breaking change is contained to a private module of a
  larger system.
- You're pre-1.0 and it's documented as such.
- Tests cover every consumer, so a missed call site explodes
  loudly in CI.

For everything else — three-step.

## Database-specific staging

Schemas are always breaking changes if not staged. The pattern:

### Adding a non-nullable column

1. Add column as nullable.
2. Backfill existing rows.
3. Make it non-nullable.

Three migrations across deploys, never one.

### Renaming a column

1. Add new column.
2. Make application write to both old and new.
3. Backfill new from old.
4. Switch reads to new.
5. Stop writing to old.
6. Drop old.

Six steps. Often worth it; almost never the version that ships
in one commit.

### Removing a column

1. Stop reading the column in app.
2. Stop writing the column in app.
3. Wait an observation period (a deploy cycle, a week, a sprint).
4. Drop the column in a migration.

The wait is for safety: if reads sneak back in, you catch them
before the column is gone.

## Wire-format breaking changes

If you control producer and consumer (internal microservices):
deploy a "tolerate both" middleware first, then producer, then
clean up.

If consumers are external (public API): version the endpoint or
the body shape. Don't break.

For one-shot integrations (event payloads in a queue, file
formats in a long-lived storage): assume readers exist that you
don't know about. Stage with paranoia.

## Anti-patterns

- **"It's only used here."** Famous last words. Grep first.
  Pre-merge breaking changes that were "only used here" are the
  classic outage cause.
- **"We'll migrate after."** Without a tracked migration task,
  "after" is "never".
- **Breaking change disguised as non-breaking.** Adding a new
  required field with no default. Dropping a method from an
  interface. Tightening a type from `string` to `'a' | 'b'`.

## How to phrase a breaking-change finding (during review)

- **Fix-before-merge** if the change is breaking and stage isn't
  set up.
- **Block** if the breaking change ships with no migration path
  for known external consumers.
- Reference the staging pattern: "this is a non-nullable column
  add — needs the three-step pattern (nullable → backfill →
  not-null)".

## Output line

- "**Non-breaking — ship.**"
- "**Breaking — stage:** deprecate → migrate → remove.
  Step 1 is ⟨action⟩."
- "**Breaking but contained — single PR works** because ⟨reason⟩."
- "**Breaking and you don't see it.** ⟨specific warning⟩."
