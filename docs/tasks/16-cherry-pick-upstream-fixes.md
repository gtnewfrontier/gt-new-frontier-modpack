# 16 — Cherry-pick upstream fixes

**Status:** not started
**Depends on:** 14

## Goal

We take the 21 months of upstream bug fixes that apply to us, and only those.

## Why

Hard fork means we don't merge — but upstream fixed real recipe bugs in scripts we
share verbatim.

## Review list

```sh
git -C ../GregTech-Modern-Community-Pack diff 519a656..HEAD -- kubejs config
```

Known candidates (see `docs/reference/upstream.md`):

- [ ] `kubejs/server_scripts/gregtech/wood_unification.js` — circuit numbers and plank ratios corrected; ours conflicts with GT's own recipes
- [ ] `kubejs/server_scripts/appliedenergistics2/ae2.js` — AE2 controller recipe, fluix-as-gem, plate via cutter/compressor
- [ ] `kubejs/server_scripts/appliedenergistics2/terminals.js` — added terminal recipes
- [ ] `kubejs/server_scripts/appliedenergistics2/inter_providers.js`, `pressing.js` — fixes
- [ ] `kubejs/client_scripts/jei/hidden_items.js` — hide items we don't intend players to get (adapt: we still ship JEI **and** EMI; upstream dropped JEI)
- [ ] cleanroom accepting framed doors
- [ ] quest fixes in chapters we did **not** rewrite (IV/UV/ZPM/ore_processing/tips) — the quest-structure decision (design backlog #6) will likely replace those anyway; skip unless it's cheap

## Skip

Anything for a mod we don't ship: storage drawers, ender storage, torchmaster, travel
anchors, JAVD void dimension, Extended AE, Architect's Palette, Xaero's maps.

## Done when

- Each box ticked or explicitly declined with a one-line reason recorded here.
- Client boots clean, EMI shows the corrected recipes.
