# Upstream reference

We are a **hard fork**. Upstream is a reference to read and cherry-pick from, never a
remote we merge.

- Repo: https://github.com/GregTechCEu/GregTech-Modern-Community-Pack
- Local clone: `../GregTech-Modern-Community-Pack` (keep it updated with `git pull`)
- Fork point: **`519a656`** — "Update gtm + other mods (#88)", 2024-12-22, upstream v1.12.1
- Upstream at time of analysis: `97dda02`, v1.15.0, 2026-09-04

## Layout mapping

Upstream is a packwiz pack at repo root. We are a CurseForge pack with everything
under `overrides/`. After task 03 the layouts match, and paths line up 1:1:

| Ours (after task 03) | Upstream |
|---|---|
| `config/` | `config/` |
| `kubejs/` | `kubejs/` |
| `defaultconfigs/` | `defaultconfigs/` |
| `mods/*.pw.toml` | `mods/*.pw.toml` |

## Diffing against the fork point

```sh
cd ../GregTech-Modern-Community-Pack
git worktree add ../gtcpm-fork 519a656     # upstream as we forked it
```

Then, from our repo root (post-task-03 layout):

```sh
diff -rq ../gtcpm-fork ./ | grep -v '\.git'
diff --strip-trailing-cr -w ../gtcpm-fork/config/gtceu.yaml config/gtceu.yaml
```

Keep passing `--strip-trailing-cr`. Task 01 made our side LF everywhere, but upstream
uses `* -text` and has 10 CRLF-stored files under `kubejs/` (`gregtech/machines.js`,
`gregtech/temporary_fixes.js`, both `sophisticated_backpacks/` scripts,
`building/building_blocks.js`, `building/xtones.js`, `appliedenergistics2/ae2wtlib.js`,
`startup_scripts/machinery/construction_core.js`, `assets/emi/category/properties/categories.json`,
`assets/sophisticatedbackpacks/lang/en_us.json`), so those still read as 100% changed
without it. `-w` is only needed when whitespace is genuinely noise.

To see what upstream changed since we forked:

```sh
git -C ../GregTech-Modern-Community-Pack diff 519a656..HEAD -- kubejs config
```

## What upstream did after our fork (worth cherry-picking)

**Resolved by task 16** (2026-09-07) — every line below was taken, adapted or declined;
`docs/tasks/16-cherry-pick-upstream-fixes.md` records which, and why. Kept here as the
shape of what a future re-review of upstream should look at.

- **GT 7 to 8 script API migration** — see `gt8-api-migration.md`. Take all of it.
- `wood_unification.js` — circuit numbers and stair ratios corrected (`circuit(1)` to `circuit(13)`/`circuit(7)`, `6x planks` to `3x planks`); the old recipes conflict with GT's own.
- `ae2.js` — AE2 controller recipe added, fluix reworked as a gem with a faster autoclave path, plate via cutter/compressor.
- `terminals.js`, `inter_providers.js`, `pressing.js` — recipe fixes.
- `void_air.js`, `dimension_markers.js` — patterns worth copying for our own dimensions, though the JAVD void dimension itself is not ours.
- Cleanroom now accepts framed doors.
- Upstream deleted JEI in favour of EMI alone, and dropped Ender Storage.

## What upstream has that we deliberately do not

Architect's Palette, Building Gadgets, Extended AE, Modern AE2 Additions, Storage
Drawers, Ender Storage, Torchmaster, Travel Anchors, OpenBlocks Elevator, Inventory
Profiles Next, Xaero's maps, JAVD, Client Tweaks. Do not re-add these by accident when
copying upstream scripts — check `mods/` first.
