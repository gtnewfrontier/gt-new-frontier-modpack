# Config deltas

Every deliberate deviation from a mod's default (or from upstream's value) lives here.
Mod updates rewrite config files and drop unknown keys without warning — this file is
the only durable record of what we meant. **If you change a config, add the row.**

Baseline for the "upstream" column: `519a656` (fork point). Values captured 2026-09-06
from the current tree; re-verify after task 15.

## `config/gtceu.yaml` — difficulty

| Key | Upstream | Ours | Why |
|---|---|---|---|
| `disableManualCompression` | false | **true** | no hand block/ingot compression |
| `harderBrickRecipes` | false | **true** | expert curve |
| `nerfWoodCrafting` | false | **true** | 2 planks per log |
| `hardWoodRecipes` | false | **true** | expert curve |
| `hardToolArmorRecipes` | false | **true** | forces GT tools early |
| `hardAdvancedIronRecipes` | false | **true** | expert curve |
| `requireGTToolsForBlocks` | false | **true** | GT tools are mandatory, not optional |
| `hazardsEnabled` | false | **true** | material hazards on |
| `environmentalHazards` | false | **true** | pollution-style hazards on |
| `oreVeinRandomOffset` | 12 | **0** | veins snap to the grid, prospecting is deterministic |

Also present in ours and worth keeping: `steamMultiParallelAmount: 8`, the
`smallBoilers`/`largeBoilers` output and temperature tables, `orderedAssemblyLineItems: true`,
`treeFellingDelay: 2`, `minimap.toggle.journeyMapIntegration: true` (we ship JourneyMap,
not Xaero's).

**Stale keys** — see `gt8-api-migration.md`; `nativeEUToFE`, `feToEuRatio`,
`euToFeRatio`, `enableFEConverters`, `hideFacadesInJEI`, `hideFilledCellsInJEI`,
`shouldWeatherOrTerrainExplosion` must be re-set under their new names after the GT
update or the settings are lost.

## `config/ae2/common.json`

| Key | Upstream | Ours | Why |
|---|---|---|---|
| `channels` | `infinite` | **`default`** | AE2 channels are ON — a deliberate difficulty choice. Upstream disables them. **Confirm this is still intended** before the rebaseline; if yes, the quest book must teach channels. |
| `portableCell` energy | 200000 | 20000 | likely stale default rather than intent — verify |

## Other mods

| File | Key | Ours | Why |
|---|---|---|---|
| `config/defaultoptions-common.toml` | `defaultDifficulty` | **NORMAL** | upstream ships PEACEFUL; combat matters here |
| `config/sophisticatedbackpacks-common.toml` | `chestLootEnabled` | **false** | backpacks are crafted, not looted |
| `config/sophisticatedcore-common.toml` | `enabledItems` | extended | we ship Sophisticated Storage as well as Backpacks |
| `config/curios-client.toml` | `enableButton` | true | QoL |
| `config/invtweaks-client.toml` | `sorting.containerOverrides` | kept | This **is** the live config of Inventory Tweaks ReFoxed (`invtweaks-1.20.1-1.2.0.jar`, modid `invtweaks`) — not an Inventory Profiles Next leftover. Task 07 verified and kept it. Its `containerOverrides` name classes from mods we don't ship (Refined Storage, Integrated Dynamics, Thermal, LaserIO, …); those are inert strings, harmless to leave. |
| `config/inventoryessentials-common.toml` | `bulkTransferArmorSets` | true | QoL |
| `config/embeddium++.toml` | whole file | **orphaned** | Embeddium++ was renamed to Chloride at task 13 (`chloride-FORGE-mc1.20.1-v1.8.1.jar`, modid `embeddiumplus` -> `chloride`), so nothing reads this file any more. It holds a real intent worth carrying over — FPS display on, entity/tile-entity distance culling enabled at 4096/32 — plus culling whitelists for mods the pack does not ship (`iceandfire`, `create`, `waterframes`), which are upstream cruft. Task 15 moves the intent to Chloride's own config and deletes this. |

## Do not ship

| File | Why |
|---|---|
| `config/fml.toml` early-window width/height | machine-specific. Reset to Forge's default 854x480 in task 09 — do not re-commit a local value. |
| `config/voicechat/username-cache.json` | already gitignored |
| `config/inventoryprofilesnext/` | Inventory Profiles Next is not installed — deleted (task 07). `mods/libipn.pw.toml` still ships IPN's library without IPN itself; that is a mod-list question for the mod audit. |

## Script-level gameplay deltas

Not config files, but the same class of intent — recorded so they survive a rebaseline:

- `kubejs/server_scripts/gtnf.js`: all vanilla tool/weapon/hoe/sword recipes removed; crafting table needs flint + logs; beds, carpets, rope, knives re-gated behind GT materials and mallets.
- `kubejs/server_scripts/gtnf/ore_veins.js`: overworld `olivine`, `sapphire`, `galena`, `nickel` veins removed; Twilight Forest gets its own vein set on a custom worldgen layer.
- `kubejs/server_scripts/gregtech/temporary_fixes.js`: compressed coke clay recipe replaced (upstream's needs a wooden form we gate later).
