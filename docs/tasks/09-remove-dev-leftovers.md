# 09 — Remove development leftovers

**Status:** done (2026-09-06)

## Goal

Nothing in the pack is a sample, a copy, another pack's branding, or a typo.

## Checklist

- [x] Delete `kubejs/startup_scripts/example.js` and `kubejs/client_scripts/example.js` (KubeJS stock samples).
- [x] Delete `kubejs/startup_scripts/gtbh.js` — registers `gtbh:stick_bundle` / `gtbh:stone_bundle` in a foreign namespace, no textures exist, nothing references them. Also delete `kubejs/assets/kubejs/textures/{item/example_item.png,block/example_block.png}` if nothing else uses them (task 10 uses `example_block` today).
- [x] Delete `kubejs/startup_scripts/gtnf/dimension_markers.js` — identical to the gtceu one with all registrations removed. Keep `startup_scripts/gtceu/World Gen/dimension_markers.js` and `startup_scripts/gtceu/Blocks and Items/dimension_markers.js`.
- [x] `kubejs/startup_scripts/icons.js` — `Platform.mods.kubejs.name = "GregTech Community Pack"` must read "GregTech: New Frontier".
- [x] `kubejs/startup_scripts/recipes/greenhouse.js` and `recipes/construction_core.js` — replace `.category("test")` with a real category (e.g. `"gtnf"` or `"multiblock"`). Coordinate with task 12, which rewrites these files anyway.
- [x] `kubejs/server_scripts/sophisticated_backpacks/upgrades.js` — **no-op, the typo was never there.** The only `sophistsophisticatedstorage` in the tree was in `gtnf.js`, fixed in task 07. `docs/ANALYSIS.md` corrected.
- [x] `config/fml.toml` — reset `earlyWindowWidth`/`earlyWindowHeight` to the defaults (854x480) so we don't ship one machine's resolution.
- [x] Decided: **kept, folder gone** — moved to `kubejs/startup_scripts/materials.js`, commented-out `netherite` block deleted. `.dust()` retained; see the status log. Was `kubejs/startup_scripts/material_testing/material.js` — the `fluix` material with a commented-out `netherite` block. Either finish it the way upstream did (task 16) or delete it. Do not ship a folder called `material_testing`.

## Done when

- Every box ticked, client boots clean.
- Loading screen and creative tab say New Frontier, not Community Pack.

## Outcome

Deleted: both `example.js` samples, `gtbh.js`, `gtnf/dimension_markers.js`,
`textures/item/example_item.png`. `example_block.png` stays — task 10 owns it.
`.category("test")` → `.category("gtnf")` on both recipe types, with
`gtceu.recipe.category.gtnf` added to `kubejs/assets/gtceu/lang/en_us.json`.
`fml.toml` back to 854x480. Branding fixed in `icons.js`.

`fluix` is **not** dead code — `ae2.js` uses `#forge:plates/fluix`, which our
`GENERATE_PLATE` flag provides. Kept as-is; the upstream `.dust()`→`.gem()` rework is
task 16's call, and AE2 already tags `ae2:fluix_crystal` as `forge:gems/fluix`.
