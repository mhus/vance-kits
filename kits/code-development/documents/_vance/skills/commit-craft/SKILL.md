---
title: Commit Craft
description: Use when the user is committing changes, writing PR text, splitting work into commits, or asking what to amend
version: "1.0.0"
tags: [code, git, commit, pr]
enabled: true
triggers:
  - type: KEYWORDS
    keywords:
      - commit
      - committen
      - commit message
      - pr message
      - pr text
      - pr description
      - commit splitten
      - split commits
      - amend
      - rebase
      - squash
      - atomic commit
      - atomic commits
      - changelog
manualPaths:
  - _vance/manuals/commit
  - _vance/manuals/shared
tools:
  - manual_list
  - manual_read
---

The user is at the boundary between writing code and shipping it.
Good commits are the receipts of the work; bad commits are debt
that hits during review, debugging, and bisect. Push toward
commits that read well *six months later*.

## Default protocol

1. **One concern per commit.** A commit that does refactor +
   bugfix is a worse commit than two separate ones. (See
   `splitting-commits`.)
2. **Subject in imperative mood, ≤ 50 chars.** "Fix off-by-one
   in pagination", not "Fixed off-by-one" or "Fixes
   off-by-one in the pagination logic of the user list view".
3. **Body explains why.** What is in the diff. Why is in the
   message.
4. **Reference the bug / issue if applicable** — but only the
   relevant one, not every loosely-connected ticket.
5. **Don't commit secrets.** API keys, tokens, `.env` files.
   `git diff --staged` before commit, every time.

## On-demand manuals

- `message-conventions` — concrete subject + body templates.
  Conventional Commits (`feat:`, `fix:`, `chore:`) when to
  use, when to skip. How to write a body that reads well in
  blame six months later.
- `splitting-commits` — when the diff is mixed. How to split
  a big change into atomic commits without losing work, with
  `git add -p`, soft reset, stash strategies.
- `when-to-amend` — `git commit --amend` rules: amend only
  unpublished commits, never rewrite shared history, when
  `--amend` is right vs. when a new commit is right.

If the user is about to push something messy, `splitting-commits`
is usually the right manual to read first. If the user just
needs to write the message, `message-conventions`.

## Hard rules

- **Never amend a published commit.** If it's been pushed to a
  branch others might have pulled, that's history rewriting.
  Add a fix-up commit instead.
- **Never push secrets.** A push to a public remote with secrets
  is unrecoverable; the secret is in clones, mirrors, search
  indexes seconds later. Rotate immediately if it happened.
- **Never commit "WIP" to main / master.** WIP is for branches.
- **Never push --force without checking** what you'd overwrite.
  `--force-with-lease` is the safer alternative.
- **Don't commit and push commented-out code.** Either delete
  it (git remembers) or finish using it. The commented line
  in the PR diff is a smell.
- **Don't bundle generated artifacts** with source changes
  unless explicitly required. Lock files (yarn.lock, Cargo.lock,
  pom.xml resolutions) belong in commits *with* the change that
  caused them, not in a separate "regenerate locks" PR.
