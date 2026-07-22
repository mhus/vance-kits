---
title: ToS and Policy Parsing
description: Use when the user is reviewing terms of service / privacy policy / EULA before clicking "I agree"
version: "1.0.0"
tags: [legal, tos, privacy]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - terms of service
      - tos
      - eula
      - terms and conditions
      - agb
      - allgemeine geschäftsbedingungen
      - privacy policy
      - datenschutz
      - datenschutzerklärung
      - cookie policy
      - i agree
      - akzeptieren
      - bevor ich klicke
      - before i click
manualPaths:
  - _vance/manuals/tos
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is about to click "I agree" on a Terms of
Service / Privacy Policy / EULA. The skill helps
**read the policy** for the parts most likely to
matter. It does **not** advise on whether to accept;
the user has to balance the policy's terms against
the value of using the service.

ToS / Policies are adhesion contracts — typically not
negotiable. Reading them is information, not
leverage.

**Important: this is layperson reading help, not
legal advice. Privacy / data rights have substantial
jurisdictional variation; consult an attorney for
substantial / business / regulatory matters.**

## Default protocol

1. **Confirm what you're reading.** ToS is rules of
   use. Privacy policy is data handling. EULA is
   software-specific. Cookie policy is cookies.
   Different policies cover different things.
2. **Skim for length and structure.** Long policies
   often hide concerning clauses; very short policies
   often hide concerning vagueness.
3. **Walk the data-rights checklist.** What data are
   they collecting, why, who do they share with, can
   you delete? See `data-rights-checklist`.
4. **Walk the liability/dispute checklist.** Mandatory
   arbitration, class waivers, indemnity, choice of
   law. See `liability-and-arbitration`.
5. **Understand "what changes when you click".** ToS
   often includes broad rights you might not expect
   to grant. See `what-changes-when-you-click`.
6. **Decide.** Use vs. don't use.

## On-demand manuals

- `data-rights-checklist` — what to look for in
  privacy policies. Collection scope, third-party
  sharing, retention, deletion rights, GDPR /
  CCPA / similar protections.
- `liability-and-arbitration` — common patterns:
  arbitration mandatory, class waiver, choice of
  forum, indemnity, limitation of liability.
- `what-changes-when-you-click` — broad rights you
  may grant: content licenses, indemnification,
  modification rights for the company, account
  termination terms.

## Hard rules

- **No legal advice.** Reading help.
- **No "you should accept / refuse" advice.**
  Surface what's there; user decides.
- **No specific legal interpretations or enforceability
  predictions.**
- **For business contexts** (employer's ToS for
  software you're using; vendor agreements; B2B
  data-processing agreements): explicitly direct to
  attorney.
- **For substantial data exposure** (medical,
  financial, children's data): direct to attorney /
  privacy professional even for personal use.
- **When the policy is missing or seems to have
  changed mid-use:** flag as concerning; understand
  what change was triggered.
- **No advice on circumventing ToS** (creating
  multiple accounts where prohibited, scraping where
  prohibited, etc.).
