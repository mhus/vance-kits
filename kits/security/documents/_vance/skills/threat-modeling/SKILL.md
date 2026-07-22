---
title: Threat Modeling
description: Use when the user wants to map attack surface and threats systematically — designing a feature, reviewing an architecture, planning a security control set
version: "1.0.0"
tags: [security, threats, design]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - threat model
      - threat modeling
      - threat-modeling
      - bedrohungsmodell
      - bedrohungs-modell
      - attack model
      - kill chain
      - stride
      - dfd
      - data flow diagram
      - trust boundary
      - vertrauensgrenze
manualPaths:
  - _vance/manuals/threat-modeling
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user wants to enumerate threats systematically. Threat modeling
is design-time security: built **into** the design, not bolted
onto code. Outputs are decisions and controls, not findings.

## Default protocol

1. **What are we building / reviewing?** Get a one-paragraph
   description of the system in scope. If you don't have it,
   threat-modeling is premature — clarify first.
2. **Draw the data flow.** Boxes (processes, datastores,
   external entities), arrows (data flows), trust boundaries.
   Even a five-minute sketch beats no diagram. (See
   `data-flow-diagrams`.)
3. **Identify trust boundaries.** Where does data cross from
   untrusted to trusted, or from one privilege level to
   another? (See `trust-boundaries`.) Threats live at
   boundaries.
4. **Walk threat categories per boundary.** STRIDE is one
   framework; other catalogues (LINDDUN for privacy, PASTA
   for risk-driven) work too. (See `stride-method`.)
5. **For each plausible threat, decide:**
   - Mitigate (specific control)
   - Accept (with reason and acceptance owner)
   - Transfer (insurance, outsource)
   - Eliminate (drop the feature)
6. **Document decisions.** A threat model that lives only in
   memory is useless three months later.

## On-demand manuals

- `stride-method` — STRIDE classification (Spoofing,
  Tampering, Repudiation, Information disclosure, Denial of
  service, Elevation of privilege). Per-element checklist:
  what STRIDE threats apply to processes, data flows,
  datastores, external entities. Load when starting a fresh
  threat model.
- `data-flow-diagrams` — DFDs done well. Element types,
  notation, level of detail. When to draw level-0 vs.
  level-1 vs. level-2. Common mistakes (decoration disguising
  no-info; missing trust boundaries; collapsed processes).
  Load when the user struggles to draw the diagram.
- `trust-boundaries` — what counts as a boundary, how to
  identify them, how they map to controls. Common boundaries
  in modern systems (browser ↔ server, service ↔ service,
  app ↔ DB, tenant ↔ tenant). Load when the user has a DFD
  but isn't sure where the boundaries go.

If the user is brand-new to threat modeling, start with
`data-flow-diagrams` — without a DFD, the rest doesn't have
anything to bite on.

## Output

Threat-model artifact (could be a doc, a wiki page, an issue):

- **System description** — one paragraph.
- **DFD** — diagram (or ASCII) showing elements, flows,
  boundaries.
- **Threat list** — per element / boundary, the STRIDE-
  classified threats. Each with mitigation decision.
- **Decisions log** — accept/transfer/eliminate threats
  with reason and owner.
- **Open questions** — what couldn't be determined; needs
  follow-up.

## Hard rules

- **Don't enumerate threats without the diagram.** Without a
  DFD, the threat list is unanchored — you can't tell if it's
  complete and you can't tell which control belongs where.
- **Don't aim for "complete".** Aim for "high-coverage of the
  important boundaries". A 100-threat document nobody reads
  is worse than a 12-threat document the team uses.
- **Don't skip decisions.** A threat without a decision is
  procrastination, not analysis. Mitigate / accept / transfer
  / eliminate — pick one.
- **Don't include findings disguised as threats.** "There's
  a bug in line 42" is a finding (use `security-review`).
  "An attacker who controls the input could …" is a threat.
- **Don't pretend you know the actor.** "Sophisticated state
  actor" inflates everything; "script kiddie" deflates. Use
  capability instead — "an attacker with read access to the
  database" is more useful than "an attacker with motivation".
