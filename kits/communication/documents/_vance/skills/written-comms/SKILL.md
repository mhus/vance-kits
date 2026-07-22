---
title: Written Comms
description: Use when the user is composing email, Slack, or async messages — especially ones that need to land cleanly without face-to-face cues
version: "1.0.0"
tags: [communication, written, async]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - email schreiben
      - write an email
      - write a slack
      - slack message
      - slack
      - chat message
      - betreff
      - subject line
      - send a message
      - write a message
      - reply to
      - antwort
      - wie soll ich antworten
      - how should i reply
      - klingt komisch
      - tone in writing
manualPaths:
  - _vance/manuals/written
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is writing something asynchronous — email,
Slack, message, document for someone to read. Written
communication has a specific failure mode: tone is
absent (no body language, no voice), so receivers fill
in tone from word choice alone — often badly.

The skill is about writing that *lands as intended*,
not just writing that says what you mean.

## Default protocol

1. **What's the goal?** Inform / request / persuade /
   acknowledge / decline. The form depends on the
   goal.
2. **Who reads this?** Pin the audience; same audience
   tactics as the writing-Kit's `tone-and-voice`
   apply. Add: *what state will they be in when they
   read this?*
3. **Lead with the headline.** What does the reader
   need to know first? See `bluf-bottom-line-up-front`.
4. **Subject and opening.** First-impression real
   estate. See `subject-and-opening`.
5. **Tone in text.** No voice; no face. Compensate. See
   `tone-in-text`.
6. **Read it back as the recipient.** Imagine receiving
   this cold. Does it land as intended?

## On-demand manuals

- `subject-and-opening` — the first-impression real
  estate. What makes a good email subject; what makes
  a good opening line. The "in their inbox" preview.
  When to skip the opening pleasantry.
- `bluf-bottom-line-up-front` — putting the conclusion
  first. When BLUF works (most professional comms);
  when it doesn't (some personal / sensitive comms).
  The "why-then-what" alternative for buried-lead
  cases.
- `tone-in-text` — compensating for the missing voice.
  How short messages read sharper than intended;
  punctuation as tone signal; emoji judgement; the
  read-it-aloud test for written tone.

If unsure: always start with the audience question. The
right form follows from knowing the reader.

## Hard rules

- **Don't write hard things in writing if a real
  conversation is feasible.** Firing, breaking up,
  major confrontation — these belong in conversation.
  Writing as substitute is cowardly and removes the
  listening-half.
- **Don't compose while activated.** Heat in writing
  comes through clearly; you regret what you sent.
  Draft; sleep on it; revise.
- **Don't bury the ask.** Reader has limited attention;
  if your request is in paragraph 4, many readers will
  miss it.
- **Don't assume tone reads.** What sounds friendly in
  your head reads neutral on screen. What sounds
  neutral reads cold. Compensate up the warmth dial
  for written.
- **Don't use email for negotiation that benefits from
  back-and-forth.** Some negotiations work async; many
  don't. Recognise which is which.
- **Don't multi-thread.** One topic per message. Two
  separate emails beat one email with two requests
  buried.
- **Don't send while you can still revise.** Once sent,
  it's gone. Build a 5-minute "drafted; cooling"
  buffer before send.
