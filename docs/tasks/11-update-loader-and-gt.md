# 11 — Forge 47.4.10 + GTCEu 8.0.0

**Status:** not started
**Depends on:** 03

## Goal

The pack targets Forge 47.4.10 and GTCEu 8.0.0-SNAPSHOT, matching upstream v1.15.0.

## Steps

1. Bump the loader in `pack.toml`:

   ```toml
   [versions]
   forge = "47.4.10"
   minecraft = "1.20.1"
   ```

2. Replace the CurseForge GT pin with the maven snapshot upstream uses. Copy the exact
   approach from `../GregTech-Modern-Community-Pack/mods/gregtechceu-modern.pw.toml`:

   ```toml
   name = "gregtechceu-modern"
   filename = "gtceu-1.20.1-8.0.0-<build>.jar"
   side = "both"

   [download]
   url = "https://maven.gtceu.com/com/gregtechceu/gtceu/gtceu-1.20.1/8.0.0-SNAPSHOT/gtceu-1.20.1-8.0.0-<build>.jar"
   hash-format = "sha256"
   hash = "<sha256>"
   ```

   `packwiz url add` generates this; or copy upstream's file verbatim and
   `packwiz refresh`. **Pin an exact snapshot build** — never a floating `-SNAPSHOT`
   filename, or the pack stops being reproducible.

3. Check GT's hard dependencies moved with it (LDLib, Kotlin for Forge, Registrate,
   Configuration — whatever upstream pins alongside GT at the same commit).

4. Do **not** launch yet: task 12 must land first or startup scripts will crash on the
   old API.

## Done when

- `pack.toml` and `mods/gregtechceu-modern.pw.toml` match upstream's versions.
- `packwiz refresh` clean.

## Notes / risks

- 8.0.0 is a **snapshot**: it can break between builds. Record the build id in the
  ROADMAP status log so we can pin back.
- The alternative is GT 7.5.1 stable from CurseForge. If 8.0.0 proves too unstable
  during task 14, falling back is a one-file change — but then the task 12 migration is
  wrong and must be reverted too. Decide once, note it here.
