# GTCEu 7 to 8 KubeJS API changes

Extracted from upstream's own migration (`git -C ../GregTech-Modern-Community-Pack
diff 519a656..HEAD -- kubejs/startup_scripts`). These are the changes our custom
content needs; verify each against the GT version we actually pin, since 8.0.0 is a
snapshot and may move again.

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

Material property changes moved into a dedicated event, and ignoring a TagPrefix for a
material now needs an explicit Java signature when passing items:

```js
const $AEItems = Java.loadClass("appeng.core.definitions.AEItems");
const setIgnoredItem = "setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,net.minecraft.world.level.ItemLike[])";

GTCEuStartupEvents.materialModification(event => {
    TagPrefix.gem[setIgnoredItem](GTMaterials.get("fluix"), $AEItems.FLUIX_CRYSTAL);
    TagPrefix.gemFlawless.setIgnored(GTMaterials.get("fluix"));
    TagPrefix.block.modifyMaterialAmount(GTMaterials.get("fluix"), 4);
});
```

Known open GT issue: KubeJS-registered materials can hit `"Some intrusive holders were
not registered"` at registry freeze on some builds
([GT#5104](https://github.com/GregTechCEu/GregTech-Modern/issues/5104)). If our `fluix`
material trips it, check the issue before assuming our script is wrong.

## Config key renames (GT 7 to 8)

`config/gtceu.yaml` keys that no longer exist and are silently dropped:

| Old | New |
|---|---|
| `nativeEUToFE` | `nativeEUToPlatformNative` |
| `enableFEConverters` | `enablePlatformConverters` |
| `feToEuRatio` / `euToFeRatio` | `platformToEuRatio` / `euToPlatformRatio` |
| `hideFacadesInJEI` | `hideFacadesInRecipeViewer` |
| `hideFilledCellsInJEI` | `hideFilledCellsInRecipeViewer` |
| `shouldWeatherOrTerrainExplosion` | `doTerrainExplosion` |

Our current `gtceu.yaml` is on the **old** side of every one of these.

## Files in this pack that need the migration

- `kubejs/startup_scripts/machinery/greenhouse.js`
- `kubejs/startup_scripts/machinery/construction_core.js`
- `kubejs/startup_scripts/recipes/greenhouse.js`
- `kubejs/startup_scripts/recipes/construction_core.js`
- `kubejs/startup_scripts/material_testing/material.js`
- `kubejs/startup_scripts/gtceu/World Gen/dimension_markers.js`
- `config/gtceu.yaml`
