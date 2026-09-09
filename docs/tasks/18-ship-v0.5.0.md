# 18 — Ship v0.5.0

**Status:** done 2026-09-08 — see the roadmap status log. Part 1's visual in-game
checklist is the one item handed back to a human; the `v0.5.0` tag waits on it.
**Depends on:** 17

## Goal

Get v0.5.0 out of the repo and into players' hands as a straight maintenance update over
the published v0.4.3 — and, before that, find whatever this rebaseline broke that nobody
has looked for yet.

## Why

v0.4.3 is what is published (Forge 47.3.0, GTCEu Modern 1.6.3). Phases 0–3 rebaselined
the pack onto Forge 47.4.10 and GTCEu Modern 8.0.0, updated every other mod, and fixed
the defects that surfaced. That is exactly a modernization release: **no new content**.

The risk in a release like this is not the things that were changed — those were checked
as they were made. It is the things that *silently stopped working* when the world moved
under them, and that nobody has thought to look at. This rebaseline has already produced
four of those, every one of which rendered perfectly and was simply wrong:

- task 14 — `gtceu:avanced_nanomuscle_chestplate`, a typo inside an installed namespace,
  so task 07's namespace grep could not see it. The quest could never be completed.
- task 16 — 39 tool stacks across six chapters still carrying GT 7's `GT.Tool.Damage`
  NBT. Same failure: rendered fine, uncompletable.
- task 17 — three chapters still teaching `tierChanceBoost`, a mechanic GT 8 deleted.
- task 17 follow-up — Wood Tar placed underneath a `quest_links` node, invisible in the
  book while a headless server reported everything clean.

Assume there are more. Part 4 of this task is a deliberate hunt for them, and it already
has one confirmed lead (below) found in the last ten minutes of the previous session.

## What this task is NOT

Do not add content. Specifically **out of scope**:

- The seven upstream description changes task 17 declined because each is paired with a
  task-item change (LV Large Bronze Boiler and HV Large Steel Boiler skip-checkmarks,
  Steam Extractor LP-or-HP, Bronze Fluid Pipe and Potin Pipe any-size, Multiblock Tanks
  bronze tank, HV TNT/ITNT). They are listed in the task-17 roadmap row. They are the
  entire remaining upstream quest delta. Close them deliberately *after* the release.
- Everything in `docs/design/BACKLOG.md` except **#9**, which this task consumes.
- Backlog #10 (AE2 channels vs quest text) is **not a regression** — `channels: default`
  is in the initial commit, so v0.4.3 shipped the same contradiction. Leave it.

## Part 1 — In-game verification

A headless server cannot see any of this. The Wood Tar bug proved it: the SNBT parsed,
FTB Quests round-tripped it byte-for-byte, and the quest was still invisible.

Use the Prism instance `GTNF-task14` (`PrismLauncher/instances/GTNF-task14/minecraft`).
Its `config/` and `kubejs/` were synced from the repo and its dead config was deleted, so
it is current as of commit `a771036`. **Re-sync `config/` and `kubejs/` first** if any
commit has landed since.

1. **The seven ported quests** (task 17's Done-when, still unfinished):
   - MV — **Wood Tar** at `(2.25, -3.0)`, biochem row next to Ethylene. *This is the fix
     for the invisible-quest bug; it has not been confirmed in game yet.*
   - MV — **Desulfurization** → **Heavy Fuel** left of The Church of Diesel,
     **Hydrocarbons** left of The Church of Benzene
   - LV — **Nitrogen** right of Gallium Arsenide, **Gotta go fast** near Soldering Alloy
   - Tips and Tricks 2 — **Colored Buses**
   - EV — the macerator quest now reads **Faster Ore Processing**
2. **Task 16 leftovers**: EMI renders the 12 new recipes (AE2 Controller shaped, 6
   terminal assembler, 5 P2P stonecutting); and complete one GT-tool quest task by
   handing in a `gtceu` tool, which closes out the `GT.Tool` → root `Damage` migration.
3. **Client-only, never exercised by any session** — the headless server runs 52 of 53
   scripts:
   - `kubejs/client_scripts/jei/hidden_categories.js` removes `ae2:certus_growth` from
     JEI's category list
   - `kubejs/server_scripts/tags/hidden.js` hides its 20 entries in **both** EMI and JEI
   - task 15's client-side config: `chloride-client.toml` (FPS display, 4096/32 culling),
     JEI, and Euphoria Patches reading `euphoria_patcher/settings.toml`
4. **Task 09's open question**: does EMI show the custom recipe category as **"New
   Frontier"** or as the raw key `gtceu.recipe.category.gtnf`? The lang entry is at
   `kubejs/assets/gtceu/lang/en_us.json:6`. Task 09 predicted the namespace might need to
   be `kubejs` instead. Nobody has looked.

## Part 2 — The distribution blocker (design backlog #9)

**Stop and get a decision. Do not pick one of these yourself.**

`packwiz curseforge export` builds `GregTech New Frontier-0.5.0.zip` (15 MB, manifest
declares 183 CurseForge files and `forge-47.4.10`) — but it puts **one jar inside
`overrides/mods/`**: `gtceu-1.20.1-8.0.0-20260826.220408-269.jar`. Task 11 pinned GT to
the **maven snapshot in url mode** to match upstream v1.15.0, so packwiz bundles the jar
rather than referencing a CurseForge file id. packwiz warns on export that bundled mods
must be on CurseForge's Approved Non-CurseForge Mods list, and GTCEu Modern is itself a
CurseForge project.

Task 03's status row — *"no jars land in `overrides/`, so nothing in the pin set is
distribution-blocked"* — was true when written and **stopped being true at task 11**.

The options, none of them decided:

1. **Repin GT to a CurseForge release of 8.x**, if one exists. Zero jars in overrides and
   the CF upload is clean. Costs: a different GT build than upstream tests against, and
   tasks 12/15/16 were all aimed at build `269`. Needs network to check.
2. **Publish off CurseForge** — a GitHub release of the zip, plus the packwiz URL and
   `serverpack/`. Works today with no changes; `serverpack/start.sh` uses
   packwiz-installer, which handles the url pin correctly. Costs the CurseForge audience.
3. Keep the snapshot and seek CurseForge's permission.

Backlog #9 was parked "until there's something to release". There now is. Run `/design 9`
or take the decision directly, then record it.

## Part 3 — Release mechanics

Nothing here is a decision except the changelog format, which belongs to #9.

- `main` is **53 commits behind `0.5`** with zero commits of its own — a clean
  fast-forward merge.
- **There are no git tags at all.** `v0.5.0` would be the first.
- **There is no CHANGELOG.** The roadmap status log has a row per task and is the source
  material; v0.4.3 → v0.5.0 in player-facing terms is: new loader and GregTech, every mod
  updated, quest book repaired, dead mod code removed, upstream fixes and quests taken.
- `CLAUDE.md` rule 8 (never close a Minecraft instance you didn't launch) has been
  modified and uncommitted across several sessions. Commit it.
- The link-aware quest collision checker written for the Wood Tar bug is only in a
  session scratchpad. It parses `quests:` **and** `quest_links:` and does box overlap. It
  would have caught that bug. Decide whether it belongs in the repo.

## Part 4 — The deep dive

**This is the real work of this task.** The four defects listed under **Why** were all
found by accident. Go looking on purpose.

### The confirmed lead — finish the kubejs registry cross-check

The previous session closed this check for the **quest book**: every `item:`/`icon:`/`id:`
string in `config/ftbquests/**` (1023 distinct ids, 16 namespaces) was diffed against
`Item.getTypeList()` dumped from the running server (23 041 ids), and all 22 tag
references were tested with `Ingredient.of(tag).itemIds.size()`. Result: **zero missing**.

**The same check has never been run over `kubejs/`,** which references ~657 namespaced
ids. A first crude pass was noisy — recipe ids, tag paths, texture paths, fluid names,
entity ids and material names all look like item ids to a regex — but it immediately
surfaced a real defect:

```js
// kubejs/server_scripts/tags/gregtech.js:2-3
event.add("forge:rods/long/hsla",  "kubejs:hsla_steel_long_rod");   // does not exist
event.add("forge:springs/hsla",    "kubejs:hsla_steel_spring");     // does not exist
```

Only two items exist in the `kubejs` namespace — `kubejs:greg_icon` and
`kubejs:twilightforest_twilight_forest_marker`. The real ids are
**`gtceu:long_hsla_steel_rod`** and **`gtceu:hsla_steel_spring`**. Both `event.add` calls
are silent no-ops, so both tags are empty. Nothing else in `kubejs/` or `config/` reads
`forge:rods/long/hsla` or `forge:springs/hsla`, so the player-facing impact may be nil —
**but find out what GT's own recipes do with those two tags before deciding whether to
fix the ids or delete the lines.** The tag names also drop the `_steel` suffix, which
suggests this was papering over a GT 7 material rename; check whether GT 8 auto-generates
`forge:springs/hsla_steel` and makes the whole block redundant.

Write the check properly: distinguish an id in *item position* from a recipe id passed to
`greg.assembler("gtceu:...")`, from a tag string, from a texture path.

### Where else to look

Ordered by how much a defect there would hurt a released pack:

1. **Multiblock patterns.** A wrong pattern is *silently unformable* — no error, ever.
   Task 14 confirmed the Greenhouse and Construction Core form. Every other custom or
   modified multiblock is unverified.
2. **Recipes that can no longer be satisfied.** Not "does the item exist" but "is there
   still a path to it". The studs/wood-tar question from the last session is the shape of
   this: probe the loaded recipe set on the headless server rather than reading the jar,
   because GT registers its recipes in code.
3. **`defaultconfigs/`** — `ftbchunks`, `ftbessentials-server.snbt`, `ftblibrary`,
   `ftbquests`, `ftbxmodcompat`, `lostcities-server.toml`. Never audited in any session.
   These are per-world defaults, so a stale key here only bites on a **new world**, which
   is exactly what a released pack creates.
4. **Reward tables** — 7 files in `config/ftbquests/quests/reward_tables/`. The item ids
   inside them were covered by the quest sweep, but the tables' own wiring was not.
5. **Quest task types other than `item`.** 867 `item`, 77 `checkmark`, 6 `choice`, 3
   `dimension`, 1 `command`. There are **no fluid tasks**, so the item sweep was complete
   for tasks. Still unchecked: the 3 `dimension` tasks all target
   `twilightforest:twilight_forest`, and the 1 `command` task runs
   `/locate structure minecraft:stronghold`. Confirm both work on the current builds.
6. **Config vs quest-book contradictions** in the shape of backlog #10 — the AE2 channels
   one was found by accident during task 15. `docs/reference/config-deltas.md` lists every
   deliberate config change; cross-read it against what the book teaches.
7. **A fresh world.** Every check so far ran against one long-lived test world. Generate a
   new one and confirm worldgen, the ore veins, and the intro chapter behave.

### Method notes that saved time before

- The headless server at `…/ae843061-…/scratchpad/server` boots in ~90s, reaches
  `Done (~10s)`, and a `_probe.js` dropped in its `kubejs/server_scripts/` can query the
  loaded recipe set, the item registry and tag contents. Delete the probe afterwards.
- `node --check` is necessary but **not sufficient** — KubeJS's Rhino rejects rest
  parameters, and that cost task 16's follow-up 102 boot errors. Only a real boot catches
  that class.
- Compare **boxes**, not centre distances, for quest layout, and remember a missing
  `size:` means 1.0. See `docs/reference/quest-delta.md`.

## Done when

- Part 1's checklist is walked in game and every item passes or has a filed defect.
- Part 2 has a recorded decision in `docs/design/` and the export matches it.
- `main` is fast-forwarded to `0.5`, tagged `v0.5.0`, CHANGELOG written, rule 8 committed.
- Part 4's deep dive has run, the kubejs cross-check is finished, and **every finding is
  either fixed or written down** — including "looked, found nothing", which is worth
  recording so the next session does not repeat the search.
- `packwiz refresh` clean, zero CRLF, export builds.

## Notes / risks

- **Do not re-verify what is already evidenced.** Already done, with evidence in the
  roadmap status log: the quest-book item and tag sweep (zero missing), the export build,
  the seven ported quests' SNBT round-tripping through FTB Quests, 0 KubeJS errors on
  boot, and the pre-existing `latest.log` error set (5 mod-internal, plus the
  `amfd:singular_cooked_moose_rib` recipe failure — all present before this rebaseline).
- The five remaining quest-node overlaps in the book are **all upstream's**, all edge
  clips with the icon visible, worst 30.8% (UV's deliberate size-4 finale banner). Our
  layout has fewer overlaps than either the fork point or upstream HEAD. Leave them.
- Changing a quest **id** resets player progress. Adding, deleting or editing a quest's
  contents does not. This matters more than usual now: v0.4.3 players will update into
  this.
- **CLAUDE.md rule 8**: only stop a Minecraft instance you started yourself.
