# GTCEu 7 to 8 KubeJS API changes

> **The pack is back on GT 7.5.3 as of 2026-09-08.** `docs/design/01-gt-pin-and-distribution.md`
> repinned GregTech to the newest CurseForge release because GT 8 for 1.20.1 has never
> had a stable release and cannot be distributed on CurseForge. This file is therefore a
> record of a path we walked back — and the map for walking it forward again when 8.x
> reaches CurseForge. The GT 8 tree is preserved on the **`gt8` branch**.
>
> Two entries below turned out **not to be 7-to-8 changes at all**, verified with `javap`
> against `gtceu-1.20.1-7.5.3.jar`:
>
> - `workableCasingModel(a, b)` already exists on 7.5.3 — the rename from
>   `workableCasingRenderer(a, b, true)` happened *before* 8.x, so our files keep it.
> - `recipeModifier(RecipeModifier)` singular exists on 7.5.3, so declining upstream's
>   `.recipeModifiers([…, BATCH_MODE])` still holds.
>
> What did have to be reversed: `.slice(...)` back to `.aisle(...)` (7.5.3 has `aisle`
> and no `slice`), `GTGuiTextures` back to `GuiTextures`, and
> `setItemSlotsOverlay(IO, from, to, …)` / `setProgressBar(ProgressBarTextureSet)` back to
> `setSlotOverlay(false, false, …)` / `setProgressBar(texture, FillDirection)`.
> Separately, GT 7.5.x quest tool stacks keep durability at `GT.Tool.Damage`, not the
> vanilla root `Damage` — 39 stacks were moved back, matching upstream v1.14.5's own book.

Extracted from upstream's own migration (`git -C ../GregTech-Modern-Community-Pack
diff 519a656..HEAD -- kubejs/startup_scripts`). These are the changes our custom
content needs; verify each against the GT version we actually pin, since 8.0.0 is a
snapshot and may move again.

Everything below was checked with `javap` against the jar we actually pin
(`8.0.0-20260826.220408-269`) during task 12, so "GT 8" here means that build. Where
upstream's edit was taste rather than a broken API, this file now says so.

## Multiblock patterns

`FactoryBlockPattern.aisle(...)` is now `.slice(...)`, and patterns that relied on the
old implicit orientation must state it:

```js
// GT 7
FactoryBlockPattern.start()
  .aisle("BBB", "GGG", "BBB")

// GT 8
FactoryBlockPattern.start(RelativeDirection.FRONT, RelativeDirection.UP, RelativeDirection.RIGHT)
  .slice("BBB", "GGG", "BBB")
```

Upstream passed explicit directions for the Greenhouse (5x4x5) and left the default
`start()` for the Construction Core (3x3x3). Check both in game — a wrong axis makes
the multiblock unformable, not an error.

## Recipe modifiers

```js
.recipeModifier(GTRecipeModifiers.OC_NON_PERFECT)                                  // GT 7
.recipeModifiers([GTRecipeModifiers.OC_NON_PERFECT, GTRecipeModifiers.BATCH_MODE]) // GT 8
```

**Not actually a break.** `MachineBuilder.recipeModifier(RecipeModifier)` still exists
in build 269 and just wraps its argument in a `RecipeModifierList` — upstream added
`BATCH_MODE` because they wanted batch mode, not because the single-arg form died. We
kept `.recipeModifier(...)`: adding `BATCH_MODE` is a balance change, not a migration.

## Casing renderer

```js
.workableCasingRenderer("gtceu:block/casings/voltage/lv/side", "gtceu:block/multiblock/implosion_compressor", true) // GT 7
.workableCasingModel("gtceu:block/casings/voltage/lv/side", "gtceu:block/multiblock/implosion_compressor")          // GT 8
```

## Recipe type GUI

`GuiTextures` is now `GTGuiTextures`; slot overlays are set per IO side and the
progress bar no longer takes a fill direction:

```js
// GT 7
.setSlotOverlay(false, false, GuiTextures.BOX_OVERLAY)
.setProgressBar(GuiTextures.PROGRESS_BAR_BATH, FillDirection.LEFT_TO_RIGHT)

// GT 8
.setProgressBar(GTGuiTextures.PROGRESS_ASSEMBLER)
.setItemSlotsOverlay(IO.IN, 0, 2, GTGuiTextures.BOX_OVERLAY)
.setItemSlotsOverlay(IO.OUT, 0, 3, GTGuiTextures.BOX_OVERLAY)
```

`.setItemSlotOverlay` (singular) takes one slot index; the plural form takes a range.
Also replace `.category("test")` with a real category while you are in the file.

## Materials

`Material.Builder` is unchanged — `.dust()`, `.gem()`, `.components()`, `.flags()` all
still exist, and `GTMaterials.X.addFlags(...)` inside `GTCEuStartupEvents.registry("gtceu:material")`
still works (upstream's `components/hsla-steel.js` is untouched on GT 8). What is new is
a dedicated event for modifying TagPrefix behaviour; ignoring a TagPrefix for a material
now needs an explicit Java signature when passing items:

```js
const $AEItems = Java.loadClass("appeng.core.definitions.AEItems");
const setIgnoredItem = "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,net.minecraft.world.level.ItemLike[])";

GTCEuStartupEvents.materialModification(event => {
    TagPrefix.gem[setIgnoredItem](GTMaterials.get("fluix"), $AEItems.FLUIX_CRYSTAL);
    TagPrefix.gemFlawless.setIgnored(GTMaterials.get("fluix"));
    TagPrefix.block.modifyMaterialAmount(GTMaterials.get("fluix"), 4);
});
```

Upstream pairs that script with `fluix` as `.gem()`. **We do not**: our `fluix` stays
`.dust()`, so GT never generates a gem/block that would duplicate AE2's, and the whole
`materialModification` script is unnecessary. Nothing is lost — `GENERATE_GEAR`
`requireFlags(GENERATE_PLATE, GENERATE_ROD)`, so `gtceu:fluix_rod` and
`#forge:plates/fluix` (both used by `server_scripts/appliedenergistics2/ae2.js`) exist
under `.dust()` too. Revisit at task 16 if we ever want gem-prefixed fluix.

Known open GT issue: KubeJS-registered materials can hit `"Some intrusive holders were
not registered"` at registry freeze on some builds
([GT#5104](https://github.com/GregTechCEu/GregTech-Modern/issues/5104)). If our `fluix`
material trips it, check the issue before assuming our script is wrong.

## Config key renames (GT 7 to 8)

**This table was wrong for the build we pin.** Task 15 checked every name against
`gtceu-1.20.1-8.0.0-20260826.220408-269.jar` itself (searching the decompressed class
entries, since the jar's strings live inside deflated `.class` files) and against the
`config/gtceu.yaml` GT wrote on the task-14 boot. Build 269 still reads the **old**
names:

| Key | Status in build 269 |
|---|---|
| `nativeEUToFE` | live — `api/capability/compat/EUToFEProvider.class`; `nativeEUToPlatformNative` does not exist |
| `enableFEConverters` | live — `common/CommonProxy.class`; `enablePlatformConverters` does not exist |
| `feToEuRatio` / `euToFeRatio` | live — `api/capability/compat/FeCompat.class`; the `platform*` names do not exist |
| `shouldWeatherOrTerrainExplosion` | live — `common/data/machines/GTMachineUtils.class`; `doTerrainExplosion` does not exist |
| `hideFacadesInJEI` -> `hideFacadesInRecipeViewer` | **real**, and already done — our file was on the new name before the rebaseline |
| `hideFilledCellsInJEI` -> `hideFilledCellsInRecipeViewer` | same |

So the `EU <-> FE` and explosion renames belong to a GT build later than the one we pin.
Re-check this table if the GT pin moves (task 11 deliberately held at 269 to match
upstream v1.15.0).

## Files in this pack that need the migration

Migrated in task 12:

- `kubejs/startup_scripts/machinery/greenhouse.js` — `.slice`, explicit `RelativeDirection`, `.workableCasingModel`
- `kubejs/startup_scripts/machinery/construction_core.js` — same, default `start()`
- `kubejs/startup_scripts/recipes/greenhouse.js` — `GTGuiTextures`, per-IO slot overlays
- `kubejs/startup_scripts/recipes/construction_core.js` — same

Checked in task 12 and left alone, with the evidence:

- `kubejs/startup_scripts/materials.js` (was `material_testing/material.js`, moved in task 09) — see **Materials** above
- `kubejs/startup_scripts/components/hsla-steel.js` — identical to upstream's GT 8 copy
- `kubejs/startup_scripts/gtnf/world_gen_layers.js` — `WorldGenLayerBuilder.targets/.dimensions` unchanged
- `kubejs/startup_scripts/gtceu/World Gen/dimension_markers.js` — `DimensionMarker.Builder` still has `iconSupplier`/`tier`; `.overrideName(...)` is new but optional, and KubeJS still binds `Item.getItem(ResourceLocation) -> Item`, which is what `iconSupplier` wants

Done in task 15:

- `config/gtceu.yaml` — replaced with the file GT 8 itself wrote on the task-14 boot.
  All ten difficulty deltas survived the regeneration unchanged; nothing needed
  re-setting under a new name.
