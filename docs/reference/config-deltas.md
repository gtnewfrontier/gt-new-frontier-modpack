# Config deltas

Every deliberate deviation from a mod's default (or from upstream's value) lives here.
Mod updates rewrite config files and drop unknown keys without warning — this file is
the only durable record of what we meant. **If you change a config, add the row.**

Baseline for the "upstream" column: `519a656` (fork point). Values last verified
**2026-09-07 (task 15)** against the configs the task-14 boot regenerated, not against
the tree — every row below was read out of a file a mod had just written.

## `config/gtceu.yaml` — difficulty

`config/gtceu.yaml` is now the file **GT 8 itself wrote** on the task-14 boot, so its
shape matches the pinned build. All ten rows survived regeneration unchanged.

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

**The GT 7→8 rename scare was a false alarm.** `nativeEUToFE`, `feToEuRatio`,
`euToFeRatio`, `enableFEConverters` and `shouldWeatherOrTerrainExplosion` are all still
live under their old names in the build we pin — checked against the jar's class files,
see `gt8-api-migration.md`. Nothing was lost and nothing needed re-setting.

**Keys GT 8 dropped**, all of which we held at the default, so no intent went with them:
`allUniqueStoneTypes`, `recipeProgressLowEnergy`, `rightToolbar`; `defaultUIColor` and
`animationTime` moved under a new `ui:` section.

**Keys GT 8 added**, all left at GT's defaults — we have no stated intent about any of
them, and defaults are the null choice: the three `enable*Recycling` toggles and their
yields, `oreIndicators`, `batchDuration`, `replaceWithCobbleVersion`,
`maintenanceCheckRate`, `minerSpeed`, `temperaturesInCelsius`, `machinesHaveBERsByDefault`,
`createCompat`, and the `bloom:` / `ui:` / `tankItemFluidPreview:` blocks.

## `config/ae2/common.json`

| Key | Upstream | Ours | Why |
|---|---|---|---|
| `channels` | `infinite` | **`default`** | AE2 channels are ON — a deliberate difficulty choice. Upstream disables them. **The quest book still teaches upstream's version** — see design backlog #10. |
| `portableCell` energy | 200000 | 20000 | **Not our intent — AE2's own default.** `AEConfig$CommonConfig` does `addInt("portableCell", 20000)`; the 200000 is upstream's edit, which we simply never took. Row kept only so nobody "restores" it again. |

## Other mods

| File | Key | Ours | Why |
|---|---|---|---|
| `config/defaultoptions-common.toml` | `defaultDifficulty` | **NORMAL** | upstream ships PEACEFUL; combat matters here |
| `config/sophisticatedbackpacks-common.toml` | `chestLootEnabled` | **false** | backpacks are crafted, not looted |
| `config/sophisticatedcore-common.toml` | `enabledItems` | extended | we ship Sophisticated Storage as well as Backpacks. The mod appends newly-added items to this list itself on first run; that is not our intent and does not need mirroring into the repo. |
| `config/curios-client.toml` | `enableButton` | true | QoL |
| `config/invtweaks-client.toml` | `sorting.containerOverrides` | kept | This **is** the live config of Inventory Tweaks ReFoxed (`invtweaks-1.20.1-1.2.0.jar`, modid `invtweaks`) — not an Inventory Profiles Next leftover. Task 07 verified and kept it. Its `containerOverrides` name classes from mods we don't ship (Refined Storage, Integrated Dynamics, Thermal, LaserIO, …); those are inert strings, harmless to leave. |
| `config/inventoryessentials-common.toml` | `bulkTransferArmorSets` | true | QoL |
| `config/oculus.properties` | `shaderPack` | `ComplementaryReimagined_r5.9 + EuphoriaPatches_1.10.0` | **This name has to move whenever the Complementary pin or the Euphoria Patches version moves.** It names the folder Euphoria Patches generates at launch, not a file we ship. It sat at `r5.3 + EuphoriaPatches_1.4.3` — a folder task 13 deleted — from the initial commit until task 18, so `enableShaders=true` pointed at nothing and Oculus logged `Pack "…" is not valid! Can't load it.` on every client boot. |
| `config/chloride-client.toml` | `fpsDisplay.mode`, `culling.*` | ADVANCED; entity and tile-entity distance culling on at 4096/32 | Carries the intent that used to live in `config/embeddium++.toml`. Chloride **migrated it itself** on the task-14 boot — the regenerated file already held our values, including the culling whitelists. Task 15 shipped that file and dropped the `iceandfire` / `create` / `waterframes` whitelist entries, which named mods the pack does not ship. |

## Do not ship

| File | Why |
|---|---|
| `config/fml.toml` early-window width/height | machine-specific. Reset to Forge's default 854x480 in task 09 — do not re-commit a local value. |
| `config/voicechat/username-cache.json` | already gitignored |
| `config/inventoryprofilesnext/` | Inventory Profiles Next is not installed — deleted (task 07). `mods/libipn.pw.toml` still ships IPN's library without IPN itself; that is a mod-list question for the mod audit. |
| `config/jei/` | Deleted in task 15. All five `.ini` files sat at 100% of JEI's documented defaults, `blacklist.cfg` was 0 bytes, and `recipe-category-sort-order.ini` is a cache JEI writes, not intent — but the whole directory was on JEI 15's old format and threw ~50 parse errors on the task-14 boot before being silently replaced. Shipping nothing is the same end state without the errors. |
| `config/structureessentials.json` | Deleted in task 15. Same story: every value was the documented default, and the file's format changed under it (`autoBiomeCompat` grew a sub-object, `minimumStructureDistance` is new). |
| `config/euphoria_patcher.properties` | Deleted in task 15. Euphoria Patches 1.10.0 reads `config/euphoria_patcher/settings.toml` instead, and every value in the old file was a default. |
| `config/pdgamerules-common.yaml` | Deleted in task 15 — Per Dimension Gamerules is not installed, so the file was inert. **It held real intent that the pack no longer implements**: `doMobLoot: false` in the Nether and `doDaylightCycle: false` in `lostcities:lostcity`. Whether to bring either back — and with which mod — is design backlog #11. |
| `config/xaerominimap*`, `config/xaeroworldmap*`, `config/xaeropatreon.txt` | Deleted in task 15 — Xaero's minimap and world map are not installed; we ship JourneyMap (see `journeyMapIntegration` above). |
| `config/xray/`, `config/xray-client.toml` | Deleted in task 15 — the XRay mod is not installed. |

## Held mod pins

Pins deliberately *behind* the newest build. `packwiz update --all` will try to move
these; `pin = true` in the metafile stops it. Unpin only with a boot to prove it.

| Mod | Held at | Why |
|---|---|---|
| `mods/emi.pw.toml` (**pinned**) | `emi-1.1.22+1.20.1+forge.jar` | **EMI 1.1.24 crashes the client on GT 7.5.x.** LDLib — which GT 7.5.3 jarjars and GT 8 did not — has a mixin plugin that touches `dev.emi.emi.api.EmiPlugin` during config prep, and 1.1.24's `emi.mixins.json:GlobalMixin` targets that class, so mixin prep fails with `MixinTargetAlreadyLoadedException` before the game window opens. 1.1.22 is what upstream v1.14.5 ships with GT 7.5.1, hash-for-hash. Found in task 18 by launching the client; a headless server never loads EMI. 1.1.24 is the newest build, so there is nothing to update forward to. |
| `mods/factory-blocks.pw.toml` | `1.3.1` | 1.4.0 crashes `COMMON_SETUP` against the Chisel version we ship. **Moves together with the Chisel pin.** (task 14) |
| `mods/journeymap.pw.toml` | `5.10.3` | JourneyMap 6.0.4 declares its version as `1.20.1-6.0.4`, which sorts below `5.8` under Maven ordering, so JourneyMap Integration would refuse to load. (task 13) |

`mods/chisel-reborn.pw.toml`, `mods/rightclickharvest.pw.toml` and `mods/tectonic.pw.toml`
are pinned for the same reason — task 13's dependency scan found their newest builds
break against something else in the pack. Six pinned metafiles in total; `grep -l 'pin = true' mods/*.pw.toml`
is the list.

## Script-level gameplay deltas

Not config files, but the same class of intent — recorded so they survive a rebaseline:

- `kubejs/server_scripts/gtnf.js`: all vanilla tool/weapon/hoe/sword recipes removed; crafting table needs flint + logs; beds, carpets, rope, knives re-gated behind GT materials and mallets.
- `kubejs/server_scripts/gtnf/ore_veins.js`: overworld `olivine`, `sapphire`, `galena`, `nickel` veins removed; Twilight Forest gets its own vein set on a custom worldgen layer.
- `kubejs/server_scripts/gregtech/temporary_fixes.js`: compressed coke clay recipe replaced (upstream's needs a wooden form we gate later).
- `kubejs/startup_scripts/jeg_supply_drop_stub.js`: registers an empty `jeg:supply_drop`
  block. **This is a workaround for a bug in Just Enough Guns 0.14.4, not content.** JEG
  lists `jeg:supply_drop` in `minecraft:needs_iron_tool` but registers the block as
  `jeg:supply_drop_crate`; one unresolvable required entry makes TagLoader drop the whole
  tag, so every iron-tier block — diamond, gold, emerald and redstone ore included —
  becomes mineable with a stone pickaxe. Found in task 18; introduced by task 13's bump
  from JEG 0.11.1 to 0.14.4. 0.14.4 is the newest build, so there is nothing to update to.
  A `"remove": ["jeg:supply_drop"]` datapack file was tried first and **does not work** —
  Forge resolves removals against the registry too, so the tag still fails to load.
  **Delete both this script and its `hidden.js` entry the moment JEG registers the real
  block**; two registrations of one id will not coexist.
