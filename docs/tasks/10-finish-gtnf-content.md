# 10 — Finish the `gtnf` content

**Status:** not started

## Goal

Both portal generators are finished, consistent with each other, and look intentional.

## Current state

| Thing | State |
|---|---|
| `gtnf:twilight_portal_generator` | item, real texture, assembler recipe, replaces the vanilla TF portal activator via tag |
| `gtnf:lost_portal_generator` | **block**, texture is `kubejs:block/example_block`, assembler recipe exists, nothing consumes it |

## Steps

1. Decide block vs item. The Twilight one is an item that swaps a tag; the Lost one is a
   block with no behaviour attached. Pick the pattern that suits how The Lost Cities
   gets entered (`config/lostcities/`, `defaultconfigs/lostcities-server.toml`) and make
   both consistent.

2. Draw or commission a texture at `kubejs/assets/gtnf/textures/{item,block}/lost_portal_generator.png`
   (16x16, matching the Twilight one's style).

3. If it stays a block, add the block model/blockstate JSON or use KubeJS's
   `.textureAll(...)` with the real texture, plus the correct mining tags.

4. Make it actually do something — this is the hook the ladder implementation builds
   on (design backlog #1). Until then, at
   minimum it must be craftable and placeable without a missing-texture cube.

## Done when

- No `example_block` reference remains.
- Both generators craft, place, and read as the same family of item.
- Both appear in EMI with correct names and recipes.

## Notes

Recipes live in `kubejs/server_scripts/gtnf/{twilight,lost}_portal_generator.js`;
registration in `kubejs/startup_scripts/gtnf/`. Whatever the ladder decision (design
backlog #1) says about dimension gating will replace these recipes — keep them cheap to
change.
