# 09 — Remove development leftovers

**Status:** not started

## Goal

Nothing in the pack is a sample, a copy, another pack's branding, or a typo.

## Checklist

- [ ] Delete `kubejs/startup_scripts/example.js` and `kubejs/client_scripts/example.js` (KubeJS stock samples).
- [ ] Delete `kubejs/startup_scripts/gtbh.js` — registers `gtbh:stick_bundle` / `gtbh:stone_bundle` in a foreign namespace, no textures exist, nothing references them. Also delete `kubejs/assets/kubejs/textures/{item/example_item.png,block/example_block.png}` if nothing else uses them (task 10 uses `example_block` today).
- [ ] Delete `kubejs/startup_scripts/gtnf/dimension_markers.js` — identical to the gtceu one with all registrations removed. Keep `startup_scripts/gtceu/World Gen/dimension_markers.js` and `startup_scripts/gtceu/Blocks and Items/dimension_markers.js`.
- [ ] `kubejs/startup_scripts/icons.js` — `Platform.mods.kubejs.name = "GregTech Community Pack"` must read "GregTech: New Frontier".
- [ ] `kubejs/startup_scripts/recipes/greenhouse.js` and `recipes/construction_core.js` — replace `.category("test")` with a real category (e.g. `"gtnf"` or `"multiblock"`). Coordinate with task 12, which rewrites these files anyway.
- [ ] `kubejs/server_scripts/sophisticated_backpacks/upgrades.js` — fix the namespace typo `sophistsophisticatedstorage`.
- [ ] `config/fml.toml` — reset `earlyWindowWidth`/`earlyWindowHeight` to the defaults (854x480) so we don't ship one machine's resolution.
- [ ] Decide on `kubejs/startup_scripts/material_testing/material.js` — the `fluix` material with a commented-out `netherite` block. Either finish it the way upstream did (task 16) or delete it. Do not ship a folder called `material_testing`.

## Done when

- Every box ticked, client boots clean.
- Loading screen and creative tab say New Frontier, not Community Pack.
