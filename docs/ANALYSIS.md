# Analysis — state of the pack, September 2026

Snapshot taken 2026-09-06. Pack last touched 2025-02-17 (`fe6bd0b`, v0.4.3).
Everything below was verified against the tree, not inferred.

## 1. Where this pack came from

Upstream is **[GregTech-Modern-Community-Pack](https://github.com/GregTechCEu/GregTech-Modern-Community-Pack)**
(1.20.1 / Forge / GTCEu Modern), cloned locally at `../GregTech-Modern-Community-Pack`.
The 1.12.2 `GregTech-Community-Pack` repo is a different, unrelated pack — not our base.

Fork point, found by hashing our files against every upstream commit:
**`519a656` — "Update gtm + other mods (#88)", 2024-12-22, upstream v1.12.1.**

| | This pack (v0.4.3) | Upstream today (v1.15.0, `97dda02`) |
|---|---|---|
| Loader | Forge 47.3.0 | Forge 47.4.10 |
| GregTech | GTCEu 7.x (CF file 6081505) | 8.0.0-SNAPSHOT, from GT maven |
| Mods | 183 | 86 |
| Recipe viewer | JEI + EMI | EMI only |
| Distribution | CurseForge `manifest.json` + committed `modlist.html` | packwiz + GH Action export + serverpack scripts |

Composition of our 183 mods, measured against the fork point:

- **61** inherited from upstream — of which **44 are still pinned at their Dec 2024 file ids** (21 months stale); 17 were bumped during our own development.
- **122** added by us: Twilight Forest, The Lost Cities, Terralith/Tectonic/TerraBlender, Serene Seasons, Alex's Mobs, Born in Chaos, Creeper Overhaul, the YUNG's structure suite, Farmer's Delight + 6 addons, JourneyMap, Sophisticated Storage, MEGA Cells, two gun mods, Simple Voice Chat, and a large performance-mod stack.
- **19** upstream mods dropped: Architect's Palette, Building Gadgets, Extended AE (`expatternprovider`), Modern AE2 Additions (`mae2`), Storage Drawers, Ender Storage, Torchmaster, Travel Anchors, OpenBlocks Elevator, Inventory Profiles Next, Xaero's Minimap/World Map, JAVD, Client Tweaks, plus their dependencies.

**Dropping those 19 mods is the single largest source of defects in the pack** — the
scripts, quests and configs that served them were left behind.

## 2. Defects

### 2.1 Dead code referencing uninstalled mods

| File | Size | Missing mod |
|---|---|---|
| `kubejs/server_scripts/building/architects_palette.js` | 486 lines, 87 refs | Architect's Palette |
| `kubejs/server_scripts/appliedenergistics2/extendedae2.js` | 205 lines, 49 refs | Extended AE |
| `kubejs/server_scripts/building/building_gadgets.js` | 57 lines, 12 refs | Building Gadgets |
| `kubejs/server_scripts/appliedenergistics2/ae2.js` | 8 refs | Modern AE2 Additions (`mae2:`) |
| `config/inventoryprofilesnext/`, `config/invtweaks-client.toml` | — | IPN not installed |

KubeJS reports these as errors on every load and the recipes silently never exist.

### 2.2 Broken quest references

- `enderstorage:ender_tank` — EnderStorage was replaced with ShetiPhian's EnderTanks; the task can never be completed.
- `expatternprovider:tag_storage_bus` — Extended AE not installed.
- `quests/data.snbt` → `lock_message: "eSFSDF"` — junk placeholder shown to players when a chapter is locked.
- UV chapter finale still reads *"the end of GTCEu and the GregTech Community Modpack"* — upstream's sign-off, not ours.

### 2.3 Unfinished / leftover content

- `gtnf:lost_portal_generator` is registered with the placeholder texture `kubejs:block/example_block`. Its sibling `gtnf:twilight_portal_generator` is finished.
- ~~`startup_scripts/gtbh.js`~~, ~~`startup_scripts/gtnf/dimension_markers.js`~~, ~~the two `example.js` samples~~, ~~`Platform.mods.kubejs.name = "GregTech Community Pack"`~~, ~~`.category("test")`~~, ~~the 1920x1080 `config/fml.toml` early window~~ — **all fixed in task 09.**
- The `sophistsophisticatedstorage` typo was never in `sophisticated_backpacks/upgrades.js`; the only occurrence was in `gtnf.js`, fixed in task 07.
- `startup_scripts/materials.js` (was `material_testing/material.js`) defines the `fluix` material. It is **live, not a leftover** — `server_scripts/appliedenergistics2/ae2.js` uses `#forge:plates/fluix`, and GENERATE_PLATE on our `.dust()` fluix is what provides it. Upstream has since reworked it (`.dust()` to `.gem()`); we keep `.dust()` because AE2 already tags `ae2:fluix_crystal` as `forge:gems/fluix`, so a second gtceu fluix gem would only duplicate it. Revisit at task 16.
- `example_item.png` was unused and is deleted; `example_block.png` stays until task 10 retextures the Lost Portal Generator.

### 2.4 Structural

- ~~**Every file was re-committed with CRLF line endings.**~~ **Fixed in task 01, and the diagnosis was half wrong.** The committed blobs were always LF; the CRLF came from Git-for-Windows' system-level `core.autocrlf=true` rewriting them on *checkout*, so only the working tree was CRLF. `.gitattributes` with `* text=auto eol=lf` overrides it. `git add --renormalize .` staged nothing, confirming the index needed no rewrite.
- **`config/gtceu.yaml` predates our own GT version.** It still carries `nativeEUToFE`, `feToEuRatio`, `hideFacadesInJEI` — keys GT has since renamed. GT drops unknown keys silently when it rewrites the file, so our difficulty settings can disappear during an update with no error. This is why `docs/reference/config-deltas.md` exists.
- ~~No LICENSE, no CI, no server pack, no build tooling. `modlist.html` is committed by hand.~~ **Fixed in tasks 02, 04, 05 and 06:** LGPL-2.1 LICENSE, a packwiz export Action, `serverpack/start.{sh,ps1}`, and `manifest.json` / `modlist.html` deleted now that packwiz generates both.
- ~~`shaderpacks/` ships 8.1 MB of pre-patched Complementary + Euphoria Patches, while both are also listed as CurseForge projects in the manifest and Euphoria Patches regenerates the patched pack at runtime. Probably redundant — verify before deleting.~~ **Deleted in task 13** (807 tracked files, 8 MB). It was redundant: the Euphoria Patches jar patches the pinned base zip at runtime.
- ~~**The shipped Complementary version is one release behind what Euphoria Patches wants.**~~ **Fixed in task 13.** `packwiz update --all` moved both shader pins r5.3 -> **r5.9** and the Euphoria Patches jar `1.5.2-r5.4` -> **`1.10.0-r5.9`**, so patcher and shaders now name the same release, and the pre-patched folders were deleted rather than regenerated (previous bullet). The `EuphoriaPatcher: You need to have ComplementaryShaders_r5.4 installed!` line should be gone from the task-14 boot log; if it is not, the two pins have drifted apart again.

### 2.5 Found by the task-14 boot

The first launch of the rebaselined pack (Forge 47.4.10 / GTCEu 8.0.0-269, 182 mods)
turned up two defects that had to be fixed to boot, and a handful of findings recorded
here because they belong to a later task or to somebody else's code.

- ~~**Factory Blocks 1.4.0 crashes the game on load.**~~ **Fixed in task 14.** Its
  optional Chisel integration targets Chisel Reborn 2.0.0's renamed package
  (`com.periut.chisel`), but the pack pins Chisel 1.8.0 (`com.matthewperiut`) because
  2.0.0 wants a library we do not ship. `NoClassDefFoundError` in `COMMON_SETUP`.
  Factory Blocks is pinned to 1.3.1; the two pins have to move together.
- ~~**`gtceu:construction_core/skystone_dust` declared three item inputs on a
  two-input machine.**~~ **Fixed in task 14.** `.circuit(1)` counts as an item input.
- **GTCEu's own EMI plugin aborts during EMI reload.**
  `GTEmiRecipe.getOutputs` does `list.get(0)` on the stacks of an output ingredient
  without checking for empty, and one GT recipe in the pack has an output that maps to
  zero stacks, so the whole `gtceu` EMI plugin registration dies with
  `IndexOutOfBoundsException`. **This is not user-visible in practice**: EMI still
  bakes 87 349 recipes and GT's recipes reach it through the JEMI (JEI) bridge, so
  GregTech recipes do render in EMI. The offending recipe was not identified — it is
  not the multiblock `Predicates.air()` warning that precedes it in the log, and it is
  not the one tag-valued output (fixed anyway). Whoever picks this up: EMI aborts on
  the *first* bad recipe, so bisecting `kubejs/server_scripts` converges quickly.
- **Two shipped configs no longer parse and are silently replaced by defaults.**
  `config/jei/jei-client.ini` (~50 `is not a valid config key` / `is not a valid
  category name` errors — JEI changed its config format under task 13's update) and
  `config/structureessentials.json` (`Could not read config`). Any intent held in
  those files is already lost. **Task 15 owns this.**
- **Mod-internal noise that is not ours and needs no fix:** `alexsdelight` ships a
  recipe using `amfd:singular_cooked_moose_rib` with no mod condition (1 failed recipe);
  `largemeals` ships three advancements referencing `farmersdelight:chicken_cut`, an
  item current Farmer's Delight no longer has; GeckoLib `Unable to parse animation`;
  `born_in_chaos_v1` references models in the `minecraft` namespace; CraftPresence pack
  detection; the Embeddium mixin-taint warning.


## 3. Quest book

679 quests across 18 chapters, 4 chapter groups (Introduction / Climbing the Ranks /
Guides + More / Milestones). Our authorship, measured as semantic diff against the
fork point:

| Chapter | Lines changed vs upstream | Note |
|---|---|---|
| `introduction`, `stone_age` | new | ours |
| `steam_age` | 324 | heavily reworked |
| `lv__low_voltage` | 261 | heavily reworked |
| `ore_generation` | 160 | reworked |
| `luv`, `hv`, `ev`, `mv` | 88 / 67 / 50 / 31 | light edits |
| `iv`, `uv`, `zpm`, `ore_processing`, `tips_and_tricks_2`, `heating_coils`, `progression`, `renewability_and_you` | <= 2 | **untouched upstream stock** |
| upstream `gtceu.snbt` | — | removed by us |

Gaps:

1. **The top half of the tech tree is not ours.** IV/UV/ZPM are upstream's text, ending on upstream's sign-off.
2. **Nothing covers the 122 added mods.** No quests for Twilight Forest, The Lost Cities, combat, exploration, AE2 wireless, food, or storage.
3. **Our own custom content is unquested.** The Twilight and Lost portal generators, the Twilight Forest ore veins (403 lines in `server_scripts/gtnf/ore_veins.js`), the Greenhouse and Construction Core multiblocks — all reachable only by accident.
4. 331 of 679 quests have no icon, concentrated in the high tiers.

## 4. Intentional design deltas worth preserving

Real decisions, not drift. Full list in `docs/reference/config-deltas.md`:

- GT recipe difficulty raised across the board: `nerfWoodCrafting`, `hardWoodRecipes`, `hardToolArmorRecipes`, `hardAdvancedIronRecipes`, `harderBrickRecipes`, `disableManualCompression`, `requireGTToolsForBlocks`.
- GT hazards and environmental hazards enabled (upstream leaves them off).
- `oreVeinRandomOffset: 0` — ore veins snap to the generation grid.
- Boiler and steam-parallel tuning tables added.
- AE2 channels **enabled** (`channels: "default"`); upstream runs `infinite`, i.e. channels off.
- Default difficulty NORMAL (upstream PEACEFUL); backpack chest loot disabled.
- All vanilla tools, weapons and hoes removed from crafting; beds, carpets, crafting table, rope and knives re-gated behind GT materials (`server_scripts/gtnf.js`, 348 lines).

## 5. The GT 7 to 8 migration is already written for us

Upstream's own fork-to-HEAD diff covers exactly the APIs our custom machines use.
Extracted into `docs/reference/gt8-api-migration.md`.
