# 01 — Normalise line endings

**Status:** done (2026-09-06)

## Goal

Every text file in the repo stores LF, and git keeps it that way.

## Why

The pack was committed wholesale as CRLF. Diffing any file against upstream reports
100% of its lines changed, which hides the real ~2,500-line delta and makes every
future comparison useless. Fix this before touching anything else.

## Steps

1. Add `.gitattributes` at repo root:

   ```gitattributes
   * text=auto eol=lf
   *.png binary
   *.jar binary
   *.zip binary
   *.ogg binary
   ```

   `.snbt`, `.js`, `.toml`, `.json`, `.cfg`, `.properties`, `.txt` are all text — the
   `text=auto` default covers them.

2. Renormalise in one commit, on its own, touching nothing else:

   ```sh
   git add --renormalize .
   git commit -m "chore: normalize line endings to LF"
   ```

3. Confirm: `file overrides/kubejs/server_scripts/appliedenergistics2/ae2.js` no longer
   says "CRLF line terminators".

4. Spot-check the delta actually shrank:

   ```sh
   git -C ../GregTech-Modern-Community-Pack worktree add ../gtcpm-fork 519a656
   diff -r ../gtcpm-fork/kubejs overrides/kubejs | wc -l
   ```

## Done when

- `.gitattributes` committed.
- One renormalise commit, no content changes mixed in.
- `git diff` against the fork worktree shows differences only where content really differs.

## Notes

Shader packs under `overrides/shaderpacks/` are third-party text; renormalising them is
harmless, but if the mod audit (design backlog #4) drops them it doesn't matter
either way.
