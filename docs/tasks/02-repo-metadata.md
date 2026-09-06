# 02 — Repo metadata

**Status:** not started

## Goal

The repo says what it is, what it's licensed as, and what not to commit.

## Why

No LICENSE means nobody (including CurseForge) knows the terms for a pack that
redistributes upstream's configs and scripts. The `.gitignore` is one line long.

## Steps

1. **LICENSE.** Upstream ships one — read `../GregTech-Modern-Community-Pack/LICENSE`
   and pick a compatible licence for a derived pack. Note in the README that config and
   script content derives from GregTech-Modern-Community-Pack, with a link and the fork
   commit (`519a656`).

2. **README.md.** Keep the existing pitch. Add:
   - Minecraft / Forge / GTCEu versions
   - install instructions (CurseForge zip and packwiz)
   - a link to `docs/ROADMAP.md` for contributors
   - credit to upstream

3. **.gitignore.** Add the things a dev run drops into a pack directory:

   ```gitignore
   overrides/config/voicechat/username-cache.json
   .packwizcache/
   *.zip
   logs/
   crash-reports/
   ```

## Done when

- LICENSE exists and is referenced in the README.
- README states versions, install path, and upstream credit.
- A dev run leaves `git status` clean.
