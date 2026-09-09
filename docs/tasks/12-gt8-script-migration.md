# 12 — GT 8 script migration

**Status:** done (2026-09-06)
**Depends on:** 11

## Goal

Our custom machines, recipe types and materials load on GTCEu 8.

## Reference

`docs/reference/gt8-api-migration.md` — the full API delta, taken from upstream's own
migration commits. Read it before editing.

## Files

- `kubejs/startup_scripts/machinery/greenhouse.js` — `.aisle` to `.slice`, explicit `RelativeDirection` start, `.recipeModifiers([...])`, `.workableCasingModel(...)`
- `kubejs/startup_scripts/machinery/construction_core.js` — same
- `kubejs/startup_scripts/recipes/greenhouse.js` — `GTGuiTextures`, `setItemSlotsOverlay(IO.IN, ...)`, drop `FillDirection`
- `kubejs/startup_scripts/recipes/construction_core.js` — same
- `kubejs/startup_scripts/material_testing/material.js` — `fluix` as `.gem()`, plus a `materialModification` script (upstream has both; copy them)
- `kubejs/startup_scripts/gtceu/World Gen/dimension_markers.js` — check the marker registry API still matches; upstream's current version uses `.overrideName(...)`

Diff each against upstream's current file rather than migrating from memory:

```sh
diff kubejs/startup_scripts/machinery/greenhouse.js \
     ../GregTech-Modern-Community-Pack/kubejs/startup_scripts/machinery/greenhouse.js
```

## Done when

- Client reaches the main menu with zero errors in `logs/kubejs/startup.log`.
- Greenhouse and Construction Core **form in game** — a wrong `RelativeDirection` makes
  them silently unformable, not an error. Build both and check the multiblock preview.
- Both recipe types render in EMI with sane slot layouts.

## Notes

If the `fluix` material trips GT's intrusive-holder registry bug
([GT#5104](https://github.com/GregTechCEu/GregTech-Modern/issues/5104)), check whether
we need the material at all — AE2 provides fluix; ours only exists to give it GT
prefixes.
