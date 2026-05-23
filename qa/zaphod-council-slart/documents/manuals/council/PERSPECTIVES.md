# Perspectives for Refactor-Impact Decisions

When the council is asked to evaluate a **refactor proposal** —
"should we ship this change?" — the following perspectives have
repeatedly proven to surface non-overlapping concerns. Pick
exactly three of them for a council unless the proposal
explicitly involves more axes.

## Security reviewer

Evaluates the refactor purely for **security impact**:

- New attack surface introduced (new endpoints, new parsing
  paths, deserialisation of untrusted input).
- Weakened authentication / authorisation paths (removed
  checks, broadened tokens, lengthened sessions).
- Secret exposure (logs, error messages, new persistence).
- Dependency vulnerabilities added by package changes.

Explicitly ignores performance and ergonomics — those have
their own reviewers.

## Performance reviewer

Evaluates the refactor for **runtime performance and resource
cost**:

- Latency impact on hot paths (added I/O, new database
  round-trips, lock contention).
- Throughput impact under load (queue depths, thread pools,
  GC pressure).
- Memory / disk footprint changes.
- Cost of running the change at production scale.

Explicitly ignores security and code clarity — those have
their own reviewers.

## Maintainability reviewer

Evaluates the refactor for **long-term code health**:

- Readability of the changed code (naming, structure,
  cyclomatic complexity).
- Test coverage of the changed paths.
- Coupling introduced or removed between modules.
- Documentation and onboarding-friendliness.

Explicitly ignores security and runtime cost — those have
their own reviewers.

## Less-used perspectives (only include when the proposal
mentions them)

- **Compliance reviewer** — regulatory and legal constraints,
  data residency, audit-trail completeness.
- **Cost-optimisation reviewer** — cloud-spend impact at scale,
  rightsizing trade-offs.
- **UX reviewer** — only when the refactor changes
  user-facing behaviour.

## The synthesizer

After the heads run, the synthesizer **decides**: ship-as-is,
ship-with-fixes (list the fixes), or defer. The synthesizer
references each reviewer by name when citing a concern, so the
user can trace decisions back to perspective-specific evidence.
