# 16 — Cherry-pick upstream fixes

**Status:** done (2026-09-07)
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

- [x] `kubejs/server_scripts/gregtech/wood_unification.js` — **taken verbatim.** Fence
  now `planks` + `circuit(13)` (was `planks` + `stick` + `circuit(1)`, which collides
  with GT's own `circuit(1)` plank recipes); fence gate takes `#forge:rods/wooden`
  instead of the `stick` item; stairs `3x planks -> 4x stairs` at `circuit(7)`/4 EU
  (was `6x` at `circuit(1)`/1 EU, a 2:1 loss against the vanilla shaped recipe).
- [x] `kubejs/server_scripts/appliedenergistics2/ae2.js` — **AE2 Controller recipe
  taken** (`#forge:plates/aluminium` + `#forge:plates/fluix` + `#gtceu:circuits/mv` +
  `#ae2:glass_cable`, replacing `ae2:network/blocks/controller`). Every id verified in
  the pinned `appliedenergistics2-forge-15.4.10.jar`. **Fluix-as-gem plate rework
  declined:** upstream's `compressor` dust→plate and `cutter` block→plate recipes only
  exist because their fluix is `.gem()`; ours stays `.dust()` (tasks 09 and 12), where
  GT already generates the compressor plate recipe from the `GENERATE_PLATE` flag.
  Upstream deletes the `fluix_lathing` lathe recipe with that change — we keep it,
  because `gtceu:fluix_rod` is the only rod source feeding `#forge:gears/fluix`
  (`terminals.js:52,61`). The `mae2:` crafting-accelerator hunk is for Modern AE2
  Additions, which task 07 already stripped.
- [x] `kubejs/server_scripts/appliedenergistics2/terminals.js` — **taken verbatim.**
  Six `assembler` recipes (ME/crafting/pattern-encoding/pattern-access/wireless/
  wireless-crafting terminals) so terminals are automatable, plus stonecut conversion
  between the five P2P tunnel types instead of attunement.
- [x] `kubejs/server_scripts/appliedenergistics2/inter_providers.js`, `pressing.js` —
  **taken verbatim.** Inter/pattern-provider output counts now double per tier
  (1/2/4/8; HV was 3 and EV was 4). Inscriber presses take `#forge:lenses/{blue,green,
  red,white}` instead of the four specific lens items — checked against the pinned GT
  jar, each tag contains the lens the old recipe named plus its glass equivalent.
- [x] `kubejs/client_scripts/jei/hidden_items.js` — **declined.** The API is
  `JEIEvents`, and JEI is our secondary viewer; hiding in JEI while EMI (which has no
  KubeJS binding — `EmiHidden` is client-runtime only, there is no datapack path)
  still shows everything is a half-fix that makes the two viewers disagree. Two thirds
  of upstream's entries name mods we don't ship (Storage Drawers, Extended AE) anyway.
  Revisit under design backlog #4 (mod audit), which decides whether JEI stays at all.
  Same reason for upstream's `hidden_categories.js`.
- [x] cleanroom accepting framed doors — **taken**, appended to
  `kubejs/server_scripts/tags/gregtech.js` as a `ServerEvents.tags("block")` block. We
  ship FramedBlocks 9.4.3 (`framed_door`, `framed_iron_door` both present) and GT 8
  ships `data/gtceu/tags/blocks/cleanroom_doors.json`. Upstream's `tags/blocks.js` also
  wrenches `travelanchors:travel_anchor`, which we don't ship — not copied.
- [x] quest fixes in chapters we did **not** rewrite — took the two cheap ones:
  `ore_processing.snbt` "distinguised" → "distinguished", and the GT tool-NBT move
  below. Everything else upstream did to the quest book is chapter rewriting that
  design backlog #6 will replace; `optional_task: true` on the ZPM/UV energy output
  hatches was left alone for the same reason.

## Taken beyond the list

**GT tool `Damage` NBT moved out of `GT.Tool`** — upstream did this in `b0216c3`
("Update GT to 7.2.0"), which is inside our diff range but reads as a quest edit, not a
recipe fix. It is a GT-version NBT migration and it is ours now: `javap` on the pinned
`gtceu-1.20.1-8.0.0-...-269.jar` shows `ToolHelper` writing `MaxDamage`,
`HarvestLevel`, `ToolSpeed` and `AttackDamage` into `GT.Tool` and **no `Damage` key** —
durability lives in the vanilla `Damage` tag at the item-tag root. Our quest files
still carried the GT 7.1 shape, so 39 tool item stacks across six chapters described an
item GT 8 never produces. Same failure mode as task 14's misspelled chestplate: the
quest renders, the task can never be satisfied.

Migrated mechanically (39 blocks in `introduction`, `iv__insane_voltage`,
`lv__low_voltage`, `steam_age`, `stone_age`, `uv__ultimate_voltage`): `Damage` deleted
from `GT.Tool`, re-inserted as the first key of the parent `tag` object where one
wasn't already there (36 of 39; the other 3 already had it at both levels), and
`GT.Tool` collapsed to `{ }` where it emptied (4 of 39). No quest id changed, so
player progress is untouched. The `uv__ultimate_voltage.snbt` result is byte-identical
to upstream's.

## Skip

Anything for a mod we don't ship: storage drawers, ender storage, torchmaster, travel
anchors, JAVD void dimension, Extended AE, Architect's Palette, Xaero's maps. That
covers upstream's `drawers.js`, `upgrades.js`, `ender_storage.js`, `void_air.js`,
`architects_palette.js`, `extendedae2.js` and `client_scripts/tooltips.js` (every added
line is `storagedrawers:`). `tags/items.js`'s `forge:enchanting_fuels` additions are
skipped too — neither pack ships a mod that reads that tag.

Already settled elsewhere, not re-litigated here: `machinery/*` and `recipes/*` (task
12's GT 8 migration), `material_testing/*` (task 12 kept `.dust()`),
`dimension_markers.js` `.overrideName` (task 12, optional), `config/gtceu.yaml` and the
config deletions (task 15), and upstream's quest chapter rewrites (design backlog #6).

## Done when

- [x] Each box ticked or explicitly declined with a one-line reason recorded here.
- [x] Client boots clean, EMI shows the corrected recipes. — headless dedicated server
  used instead, per task 14: this pack has no `client_scripts`, so a server exercises
  100% of the KubeJS surface. See the roadmap status log for the run.
