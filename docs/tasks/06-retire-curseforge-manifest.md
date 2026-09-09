# 06 — Retire the CurseForge manifest

**Status:** done
**Depends on:** 04

## Goal

`manifest.json` and `modlist.html` are gone; packwiz generates them on export.

## Why

Two sources of truth for the mod list is one too many, and the hand-maintained one
drifts.

## Steps

1. Confirm the exported zip from task 04 contains a generated `manifest.json` and
   `modlist.html`, and that its mod list matches `mods/`.
2. `git rm manifest.json modlist.html`.
3. Grep the repo and docs for references to either file and update them.

## Done when

- Neither file is tracked.
- The export still imports cleanly into a launcher.
