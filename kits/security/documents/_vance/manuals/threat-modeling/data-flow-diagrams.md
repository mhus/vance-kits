---
triggers: data flow diagram, datenflussdiagramm, dfd, process datastore external entity, prozess datenspeicher, trust boundary, vertrauensgrenze, dfd levels, level-0 level-1, dfd anti-patterns, ascii diagram, when to redraw
summary: How to draw a useful DFD for threat modeling — the four element types, trust-boundary annotation, nesting levels, common mistakes, and when to redraw.
---

# Data Flow Diagrams — DFDs done well

A DFD is the structural backbone of a threat model. Without one,
the threat list is unanchored — you can't tell if it's complete,
and you can't tell which control belongs where. The diagram is
five percent of the work and supports the other ninety-five.

## Element types

DFDs use four element types. Stick to these — extras are
distraction.

### Process

A computational unit. A microservice, a function, a job.

- **Notation:** circle.
- **Naming:** verb-noun ("authenticate request", "process
  order", "send email").
- **Granularity:** at level-0, one circle per service. At
  level-1, one circle per major operation within the service.

### Data store

Persistent storage. A database, a cache, a file.

- **Notation:** two parallel lines (or labelled cylinder).
- **Naming:** noun ("orders DB", "session cache").

### External entity

An actor outside your system boundary. Not your code.

- **Notation:** rectangle.
- **Examples:** end-user (browser), third-party API, partner
  service, ops engineer.

### Data flow

An arrow showing data movement.

- **Notation:** arrow with label describing what flows.
- **Naming:** the data, not the protocol ("login request",
  not "POST /api/login"). The protocol is metadata.

## Trust boundaries

The most important annotation on the diagram.

- **Notation:** dashed line crossing flows.
- **Meaning:** privilege levels differ on the two sides. Data
  crossing this line is treated as "from less trusted" by the
  recipient.
- **Examples:**
  - User browser ↔ your front-end service.
  - Front-end service ↔ back-end service (when boundaries
    differ — e.g. customer-facing front-end vs. internal
    services).
  - Application ↔ database.
  - Tenant A's data ↔ tenant B's data within shared infra.

If a flow doesn't cross a trust boundary, you may not need
explicit STRIDE on it (it's all in one trust zone). Crossings
are where threats land.

## Levels — how much detail

DFDs nest. Pick the level that matches the threat-modeling
goal:

### Level 0 — system context

One circle (your system) plus external entities. Useful for:

- Identifying who interacts with the system.
- Establishing the outermost trust boundary.
- Five-minute scope review.

### Level 1 — major components

Each major service / subsystem as its own process. Useful for:

- Architecture-wide threat models.
- Identifying inter-service trust boundaries.
- Most engineering threat-modeling sessions.

### Level 2 — within a component

Inside one service, the major operations / handlers. Useful
for:

- Drilling into a specific service that level-1 surfaced as
  high-risk.
- Finding intra-service trust issues (e.g. admin operations
  vs. user operations in the same service).

### Levels 3+

Almost never needed. If you find yourself drawing level-3 in
real time, you're probably writing code, not modeling threats.

## Common mistakes

### Decoration disguising no-info

Every element coloured, every arrow labelled with a protocol,
every box has 50 sub-boxes. Looks impressive; conveys nothing.

Counter: **the diagram tells you which threats apply where**.
If a viewer can't pick up your diagram and walk STRIDE on it,
the diagram failed.

### Missing trust boundaries

Beautiful diagram with no dashed lines. STRIDE has nothing to
attach to. The diagram is decoration.

Counter: **draw boundaries first**. They are the load-bearing
annotation.

### Collapsed processes

A single circle labelled "Backend". Inside it: 30 services
with different trust levels and different attack surfaces.
The diagram hides the threats it should expose.

Counter: **break up processes when they have different trust
needs**. A circle that includes both customer-facing and
admin operations is a circle that should split.

### Protocol-as-flow-name

Arrow labelled "REST". Doesn't say what data flows. STRIDE
on a flow you don't understand the contents of is guessing.

Counter: **flow names describe data**. "REST" is metadata,
not a data name.

### Bidirectional arrows

Single arrow with arrowheads on both ends. Hides the asymmetry
— one direction may have different threats than the other.

Counter: **two arrows, one each direction**. Label both.

### Forgotten datastores

Logging system, cache, audit log, message queue, key
material — all data stores. All carry T/I/R/D risks.

Counter: **enumerate datastores explicitly**. Logs hold
sensitive data, caches retain auth context, queues persist
between processing — all worth their own circle.

### Missing internal external entities

Your monitoring system, your CI runner, your SRE access path
— they all touch the system. They're external entities (you
don't control them in the same way as your service code) but
they have privileges.

Counter: **internal-but-external entities count too**. Ops
shells. Cron jobs running outside the service. Monitoring
scrapers.

## Format — what the diagram physically looks like

Doesn't have to be elegant. Three formats work:

### ASCII

```
+----------+        login request           +-------------+
|  User    | ----------------------------> |  AuthService |
|  Browser |                                |              |
+----------+ <----------------------------  +-------------+
                   session cookie               |
                                                | session lookup
                            (trust boundary)    v
                                          +-------------+
                                          |  Sessions   |
                                          |  (Redis)    |
                                          +-------------+
```

ASCII works for level-0 and level-1, fits in markdown, never
gets out of sync because it's plain text.

### Drawing tool

draw.io / excalidraw / mermaid. Useful for level-2 or when
the topology is too complex for ASCII.

Risk: out-of-date diagrams. The first time the architecture
changes after the threat-model session, the diagram lies.

### Whiteboard photo

For one-off threat-modeling sessions. The artifact is the
notes you write afterwards; the photo is reference material.

Don't put a whiteboard photo in long-lived documentation —
it'll be wrong in three months.

## When to redraw

A DFD is a snapshot. You redraw when:

- Architecture changed materially.
- A new external integration appeared.
- A trust boundary moved (e.g. internal service became
  externally exposed).
- The threat model is being revisited because of an incident.

You **don't** redraw because someone renamed a service or
added a method. Diagrams that chase code rot fast and stop
mattering.

## Anti-patterns

- **Detailed-as-architecture.** A DFD is not the architecture
  document. Skip implementation details, internal data
  structures, language choices.
- **Generic-shape soup.** "Data" arrow into "Service" circle
  into "Database" cylinder. Could be any system. Specifics or
  the diagram doesn't help.
- **Diagram-only artifact.** A DFD with no accompanying threat
  list is half a threat model. The diagram supports the list,
  doesn't replace it.

## Output line

- "**DFD drawn at level ⟨N⟩** — ⟨n⟩ processes, ⟨m⟩ stores,
  ⟨k⟩ flows, ⟨b⟩ boundaries."
- "**DFD needs work** — ⟨specific gap⟩ before STRIDE walk."
- "**Existing DFD is stale** — redraw before continuing."
