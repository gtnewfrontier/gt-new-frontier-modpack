# 03 — Packwiz bootstrap

**Status:** not started
**Depends on:** 01

## Goal

The pack is defined by `pack.toml` + `index.toml` + `mods/*.pw.toml` at repo root, with
the same layout as upstream.

## Why

packwiz gives per-mod version pinning in reviewable diffs, `packwiz update`, a
one-command CurseForge export, and a server installer. It replaces the hand-maintained
`manifest.json` and `modlist.html`.

## Steps

Work on a branch — this moves every file in the repo.

1. Install: Go >= 1.19, then `go install github.com/packwiz/packwiz@latest`.

2. Initialise at repo root (answer: name "GregTech New Frontier", version 0.5.0,
   Minecraft 1.20.1, loader Forge 47.3.0 — the loader bump is task 11, not here):

   ```sh
   packwiz init
   ```

3. Import the existing pin set. `packwiz curseforge import` accepts a local manifest:

   ```sh
   packwiz curseforge import manifest.json
   ```

   This creates one `mods/<slug>.pw.toml` per entry. Expect 183.

4. Move the pack content up out of `overrides/`:

   ```sh
   git mv overrides/config overrides/kubejs overrides/defaultconfigs overrides/shaderpacks .
   rmdir overrides
   ```

5. `packwiz refresh` and commit. Check `index.toml` lists the config/kubejs files.

6. Add `.packwizignore`:

   ```
   .github/*
   docs/*
   serverpack/*
   README.md
   CLAUDE.md
   LICENSE
   ```

## Done when

- `packwiz refresh` runs clean.
- `mods/` holds one file per mod, count matches `manifest.json` (183).
- Repo layout mirrors `../GregTech-Modern-Community-Pack`.
- `manifest.json` / `modlist.html` still present but now unused (task 06 deletes them).

## Notes / risks

- **Some mods forbid CurseForge redistribution.** FindMe is the known one — upstream
  downloads it manually in `serverpack/start.sh`. Any mod whose CF file has the
  "distribution disabled" flag will fail import; record them and handle in task 05 the
  way upstream does.
- Shader packs are large binary-ish files in the index. If the mod audit (design
  backlog #4) decides Euphoria Patches regenerates them at runtime, drop them here
  instead of indexing 8 MB.
- Do not hand-edit `index.toml` — it is generated.
