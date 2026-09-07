# 17 — Port upstream's new quest content

**Status:** not started
**Depends on:** 16

## Goal

Take the seven quests and the chapter text upstream added after our fork point, and
close the quest-book gap that task 16's review deliberately left open.

## Why

Task 16 blanket-declined upstream's quest chapters on the grounds that they were
"chapter rewriting design backlog #6 will replace anyway". An id-level delta run
afterwards showed that was wrong about the size of the thing: upstream's `+277/-78` on
`lv__low_voltage` is **two new quests** and a lot of text. Across the whole book they
added seven quests we don't have, every one of them pure `gtceu:` content with no
third-party mod in it. That is a content gap, not a structural one, and backlog #6
deciding a new chapter layout later does not make the missing Nitrogen quest less
missing today.

This is maintenance, not design — it ports content upstream already wrote and tested.
It does **not** decide chapter structure, groups, or ordering; that is still backlog #6.

## What the delta actually is

Established in the task-16 follow-up, from an id-level comparison of the fork point,
upstream `97dda02`, and our tree. Reproduce with:

```sh
git -C ../GregTech-Modern-Community-Pack diff 519a656..HEAD -- config/ftbquests
```

### The seven quests to port

Every dependency id below was checked and **exists in our pack**, so none of these
graft in dangling. Upstream's x/y is given because four of the seven land on top of a
quest we already have — our chapter layouts diverged before this repo had history.

| Quest | Chapter | Task item | Depends on | Upstream x/y | Slot in ours |
|---|---|---|---|---|---|
| `7D7A4CC66A3C193F` Nitrogen | lv | `gtceu:nitrogen_bucket` | `15928F50AE80A5CF` | -2.25, 7.875 | **collides** — `63256ED95F17B242` |
| `41DD503169987D50` Gotta go fast | lv | `itemfilters:or` over concrete + studs | `257DB4B39B2A928E`, `581CDF545E1EA1FD` | 1.12, 7.875 | **collides** — Gallium Arsenide |
| `74180AC57AE9F0FE` (polyethylene nugget) | mv | checkmark | `7567E885B7166603` | -1.125, -0.75 | **collides** — US Simulator |
| `5898743D8D6C2690` Desulfurization | mv | `gtceu:fluid_filter`, `gtceu:hydrogen_bucket` | `6A304E453D74C57C` | -4.5, -1.875 | free |
| `035CF39E6CC98B77` Heavy Fuel | mv | `gtceu:heavy_fuel_bucket` | `5898743D8D6C2690` | -5.625, -3.0 | free |
| `37AAB88A9EDCC862` Wood Tar | mv | `gtceu:wood_tar_bucket` | `53DC6E32C41C94C3` | -2.25, -1.875 | **collides** — The Church of Benzene |
| `57EC19AF87A32930` Colored Buses | tips_and_tricks_2 | checkmark | `5AD9884E7BFB2510` | 3.0, 1.98 | free |

`itemfilters:or` is fine — `mods/item-filters.pw.toml` is installed. `gtceu:light_concrete`,
`gtceu:dark_concrete` and the sixteen `gtceu:*_studs` all exist in the pinned GT 8 jar.

### Chapter text upstream improved

Text only, no ids: `lv__low_voltage`, `mv__medium_voltage`, `steam_age`,
`hv__high_voltage`, `iv__insane_voltage` (its rare-earth and macerator descriptions,
plus quest layout moves we should ignore — our layout is ours).

`ore_generation` was already done in task 16.

## Steps

1. **`tips_and_tricks_2.snbt` — copy upstream's file wholesale.** Ours is still
   byte-identical to the fork point (the only chapter that is), so upstream's version
   applies exactly and brings Colored Buses plus their text edits with it:

   ```sh
   cp ../GregTech-Modern-Community-Pack/config/ftbquests/quests/chapters/tips_and_tricks_2.snbt \
      config/ftbquests/quests/chapters/
   ```

   Upstream stores quest files CRLF. **Convert to LF before committing** (rule 1) and
   confirm with `git ls-files -z | xargs -0 grep -lIU $'\r'`.

2. **The two free slots left after step 1** — Desulfurization and Heavy Fuel. Copy both
   quest blocks verbatim into `mv__medium_voltage.snbt` at upstream's own x/y; nothing
   of ours sits there. (Colored Buses, the third free one, arrives with step 1.)

3. **The four collisions** — Nitrogen, Gotta go fast, the polyethylene nugget quest,
   Wood Tar. Add these **in game** (CLAUDE.md rule 5): open the book in edit mode,
   create the quest, paste the description, set the dependency, and drag it somewhere
   that reads well next to its neighbours. Then commit what FTB Quests writes. Hand-
   picking coordinates in the file works too, but the book is a graph — a quest placed
   by arithmetic tends to sit across a dependency line.

   Keep upstream's quest **and task ids** either way. They are new ids to our pack, so
   nothing resets, and matching upstream keeps the next delta run honest.

4. **Chapter text.** Walk the diff for the five chapters listed above and take the
   description changes. Skip every `x:`/`y:` hunk — upstream's layout is not ours.

5. **Do not take**, and the reason for each, so the next session doesn't re-open it:
   - `reward_tables/gallium_arsenide.snbt` — orphaned upstream too; `grep -rn
     1D60D15906F07624` over their whole quest tree matches only its own definition.
   - `gtceu.snbt` — upstream's "guide to GTCEu Modern" onboarding chapter. We replaced
     it with `introduction.snbt` + `stone_age.snbt`, which is a deliberate identity
     choice, and it is why our `order_index` values sit one below theirs.
   - The twelve quests we removed before this repo had git history. Each one is blocked
     on a mod we don't ship — `mae2:` (Pattern P2P, EU P2P, Dense Coprocessors),
     `expatternprovider:` (The Power of Wireless, PackagedWho?, Pattern Modifier, "And
     they say GregTech is grindy…"), `javd:` (Void Dimension Portal), `travelanchors:`
     (Travel Anchors), `buildinggadgets2:` (the LV bricks quest) — or, for the two
     `linked_quest` nodes in `multiblock_dilemma` and `ore_generation`, points into
     `gtceu.snbt`. Verified quest by quest; none of it was accidental.
   - `data.snbt`'s `drop_book_on_death` / `hide_excluded_quests` / `show_lock_icons` —
     FTB Quests writes its own defaults for these on save.

## Done when

- The seven quests are in the book, each reachable from its dependency, none sitting on
  top of another quest.
- The five chapters carry upstream's text improvements.
- `tips_and_tricks_2.snbt` is LF and the tree has zero CRLF files.
- Headless dedicated server boots with **0 ERROR** in all three KubeJS logs, and no
  `missing following references` beyond the known `jeg:supply_drop`. Re-use the server
  at the path named in the task-16 status log.
- **A human opens the book** and confirms the seven new quests render, show the right
  item, and sit sensibly in their chapters. The server boot cannot see quest layout.

## Notes / risks

- **Layout is the whole risk here.** Four of seven collide. Everything else is a copy.
- Changing a quest **id** resets player progress; adding a new one does not. Keep
  upstream's ids and nothing is disturbed.
- `optional_task` and the GT tool-NBT migration are already done (task 16) — if a
  ported quest block carries `GT.Tool: { Damage: 0 }`, it is upstream's old shape and
  must be fixed the same way: `Damage` belongs at the item tag root in GT 8.
- The delta was computed with a throwaway script; if it needs recomputing, the method
  is: parse each chapter's quest objects (they sit at two tabs under `quests: [`, their
  fields at three), diff the id sets three ways, and strip `\r` first — upstream's
  quest files are CRLF and every line comparison silently fails without it.
