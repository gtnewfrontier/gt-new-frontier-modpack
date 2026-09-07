# Design backlog

Open questions, in dependency order. One per design session (`/design`). Claude frames
and recommends; you decide; the answer becomes a record in this folder and build tasks
in `docs/tasks/`.

Nothing here is a task. Nothing here is decided.

## Queue

| # | Question | Blocks | Status |
|---|---|---|---|
| 1 | **The ladder** — which dimensions, in what order, at which voltage tiers, and what does entry cost? | everything below | open |
| 2 | **Bosses** — which boss per dimension, from which mod, how is it gated, what does killing it unlock? | 4, 5, 6 | open |
| 3 | **Combat tiering** — how does GT tech become weapons and armour, tier by tier? Decides the gun mods. | 4, 6 | open |
| 4 | **Mod audit** — every installed mod judged against the ladder. Criteria come from 1–3, so this can't come first. | 6, 7 | open |
| 5 | **Ore economy** — which dimension is the intended source of each bottleneck material; what the 4 removed overworld veins force. | 6 | open |
| 6 | **Quest book structure** — chapters and groups for dimensions, bosses, combat, our multiblocks; how the ladder is taught. | 7 | open |
| 7 | **Danger model** — hazards, mob scaling, Serene Seasons, death penalty, difficulty defaults. What makes the world hostile without being tedious? | — | open |
| 8 | **The ending** — what UV means in this pack, what the finale is, whether anything sits past it. | — | open |
| 9 | **Release and distribution** — versioning, changelog, CurseForge upload, playtest gate. Parked until there's something to release. | — | parked |
| 10 | **AE2 channels** — the config says channels are ON (`channels: default`), the quest book says they are off. Which one is the pack? | 6 | open |
| 11 | **Per-dimension gamerules** — a dropped mod used to turn mob loot off in the Nether and freeze the day cycle in Lost Cities. Do we want either back, and with what? | 5, 7 | open |

## Context each question starts from

Facts already established, so a cold session doesn't re-derive them:

- Two portal generators exist: `gtnf:twilight_portal_generator` (finished, swaps the TF
  portal activator by tag) and `gtnf:lost_portal_generator` (unfinished, placeholder
  texture). Nothing gates either.
- Twilight Forest has a custom GT worldgen layer and a full ore vein set already
  (`kubejs/server_scripts/gtnf/ore_veins.js`, 403 lines).
- Four veins are removed from the overworld: `olivine`, `sapphire`, `galena`, `nickel`.
- `oreVeinRandomOffset: 0` — veins sit on the generation grid, so prospecting is
  deterministic.
- Twilight Forest ships its own boss ladder and its own progression locks; they will
  fight ours unless we decide which system wins.
- GT hazards and environmental hazards are on; difficulty defaults to NORMAL.
- 679 quests cover GregTech and nothing else. IV/UV/ZPM are still upstream's text.
- Two gun mods are installed and ungated.
- `config/ae2/common.json` sets `channels: default` (channels ON) — upstream sets
  `infinite` (off). Four quest entries still carry upstream's text and tell the player
  channels are gone: `ev__extreme_voltage.snbt:520,530`,
  `mv__medium_voltage.snbt:2049`, `ore_processing.snbt:443`. Config and quest book
  currently contradict each other (backlog #10).
- `config/pdgamerules-common.yaml` (deleted in task 15) recorded an intent the pack no
  longer implements: `doMobLoot: false` in the Nether, `doDaylightCycle: false` in
  `lostcities:lostcity`. Per Dimension Gamerules is not installed (backlog #11).

Sources: `docs/ANALYSIS.md`, `docs/VISION.md`, `docs/reference/config-deltas.md`.
