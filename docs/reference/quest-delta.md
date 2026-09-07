# Quest book delta against upstream

What our quest book has that upstream's doesn't, and the reverse, at the **quest id**
level rather than the diff-line level. Line counts lie here: upstream's `+277/-78` on
`lv__low_voltage` is two new quests and a lot of prose.

Computed 2026-09-07 against fork point `519a656`, upstream `97dda02`, ours `09a7162`.
**Directions 1 and 3 were closed by task 17** — the counts in the *Ours* column below are
post-task-17.
**Recompute after every upstream pull** — the numbers below are a snapshot, not a rule.

## How to recompute

`git diff` is the wrong tool. Parse the ids and diff the sets three ways:

- A quest object sits at **two tabs** inside `quests: [`, so its own fields (`id`,
  `title`, `icon`, `x`, `y`, `dependencies`) are at **three tabs**, and task fields are
  deeper. Open on `\t\t{`, close on `\t\t}`, take `\t\t\tid: "<16 hex>"`.
- **Strip `\r` first.** Upstream sets `* -text` and stores quest files CRLF; every
  line-equality test silently fails without it, and the symptom is a parser that
  reports zero quests rather than an error.
- Compare three trees: `../gtcpm-fork/` (upstream at the fork point, `git worktree add
  ../gtcpm-fork 519a656`), `../GregTech-Modern-Community-Pack/` (upstream HEAD), ours.
  Three sets give the three divergence directions below; two sets only give one.
- For layout collisions, compare **(x, y) pairs** within about 0.6 grid units. Counting
  x-matches and y-matches separately is not the same test and will report free slots
  that aren't.

## Chapters

| Chapter | Fork | Upstream | Ours |
|---|---|---|---|
| `ev__extreme_voltage` | 69 | 67 | 67 |
| `gtceu` | 25 | 25 | **absent** |
| `heating_coils` | 16 | 16 | 16 |
| `hv__high_voltage` | 49 | 49 | 47 |
| `introduction` | — | — | **19 (ours only)** |
| `iv__insane_voltage` | 37 | 37 | 37 |
| `luv__ludicrous_voltage` | 45 | 45 | 42 |
| `lv__low_voltage` | 73 | 75 | 80 |
| `multiblock_dilemma` | 42 | 42 | 41 |
| `mv__medium_voltage` | 70 | 74 | 73 |
| `ore_generation` | 45 | 45 | 46 |
| `ore_processing` | 20 | 20 | 19 |
| `progression` | 45 | 45 | 45 |
| `renewability_and_you` | 20 | 20 | 20 |
| `steam_age` | 40 | 40 | 40 |
| `stone_age` | — | — | **19 (ours only)** |
| `tips_and_tricks_2` | 20 | 21 | 21 |
| `uv__ultimate_voltage` | 24 | 24 | 24 |
| `zpm__zero_point_module` | 29 | 29 | 29 |

We replaced upstream's `gtceu.snbt` — their "guide to GTCEu Modern" onboarding chapter,
`order_index: 0` — with our own `introduction.snbt` and `stone_age.snbt`. That is a
deliberate identity choice and it is why every `order_index` of ours sits one below
theirs. It is also why two `linked_quest` nodes had to go (below).

`tips_and_tricks_2.snbt` was the **only** chapter still byte-identical to the fork point,
so upstream's version of that one file was copied wholesale in task 17. It is now
byte-identical to upstream's instead.

## Direction 1 — upstream added, we don't have — **closed by task 17**

Seven quests, every task item pure `gtceu:`, every dependency target present in our
pack. All seven are now in the book under upstream's own quest and task ids:

`lv`: Nitrogen, Gotta go fast. `mv`: a polyethylene-nugget quest, Desulfurization,
Heavy Fuel, Wood Tar. `tips_and_tricks_2`: Colored Buses.

Coordinates are **ours, not upstream's** — four of the seven landed on top of a quest we
already had, so they were placed by hand against our own layout. `74180AC57AE9F0FE`
(the Hydrocarbons hub) is a leaf here: upstream rewired their Brewery / US Simulator /
America Simulator onto it, we did not, so it hangs off the MV gate `7567E885B7166603`
with nothing depending on it. Its directional prose, and Heavy Fuel's "check the Quest
to the left", were retargeted to our layout.

Not a gap: `reward_tables/gallium_arsenide.snbt`. `grep -rn 1D60D15906F07624` over
upstream's whole quest tree matches only its own definition — it is an orphan there too.

## Direction 2 — we removed, upstream still has

Thirteen quests. `git log -S<id>` finds only one of them in our history (the
`ore_processing` one, task 08); the other twelve predate this repo and came in with the
CurseForge pack, so no reason was ever written down. Every one resolves anyway:

| Quest | Chapter | Blocked on |
|---|---|---|
| `1722813F617DF39B` Pattern P2P Tunnels | ev | `mae2:pattern_p2p_tunnel` |
| `40FB56274D296BFC` EU P2P Tunnels | ev | `mae2:eu_p2p_tunnel` |
| `1011551290D3D7EA` Void Dimension Portal | hv | `javd:portal_block` |
| `1D8170A19E54C5B9` Dense Coprocessors | hv | `mae2:{4,16,64,256}x_crafting_accelerator` |
| `7E2076D45F83D9C3` The Power of Wireless | luv | `expatternprovider:wireless_connect` |
| `79192BA29BE69170` PackagedWho? | luv | `expatternprovider:ex_interface` |
| `5CE0B928479D8535` Pattern Modifier | luv | `expatternprovider:pattern_modifier` |
| `0DAD0A6360448B39` (bricks) | lv | reward is `buildinggadgets2:gadget_building` |
| `59BEB2AA9598A21D` And they say GregTech is grindy… | lv | `expatternprovider:fishbig` |
| `1F0BB0AD77F19FD4` (link node) | multiblock_dilemma | target `4946FC5BCA4CCA88` is in `gtceu.snbt` |
| `350E8A014DD8C838` Travel Anchors | mv | `travelanchors:` |
| `204A88B97FFA67FA` (link node) | ore_generation | target `4A365A7CC9E374F9` is in `gtceu.snbt` |
| `23B078514FB4A215` Tag - You're It! | ore_processing | `expatternprovider:tag_storage_bus` (task 08, ours) |

**Nothing here was removed by accident**, and none of it comes back unless the mod audit
(design backlog #4) re-adds the mod. The two link nodes were *required* removals — they
pointed into a chapter we don't ship.

## Direction 3 — upstream deleted, we still have — **closed by task 17**

The direction that is easy to miss, because our file and the fork point agree and only
upstream moved. Two quests, both in `ev__extreme_voltage`, both stale under GT 8:

- **`7B23AF5B6B62BC19` "Even More Byproducts"** — teaches *"Each overclock above the
  required tier will add that % bonus to the chanced output"*. **That mechanic no longer
  exists.** GT 8's `com.gregtechceu.gtceu.api.recipe.content.Content` is the record
  `(content, chance, maxChance)`; GT 7's `tierChanceBoost` field is gone, and the only
  surviving mention anywhere in the jar is in the KubeJS binding `ContentJS`. Upstream
  deleted this quest and, in the same release, rewrote their IV macerator quest from
  "Better Ore Processing for &6chanced Byproducts&r" to "Faster Ore Processing". Ours
  still teaches the removed mechanic — same family of defect as task 14's misspelled
  chestplate and task 16's `GT.Tool` NBT: content that survived the rebaseline while its
  premise did not.
- **`7EF57E379F736FBB` "Item P2P Tunnels"** — teaches attunement by right-clicking a
  tunnel with a vanilla chest. Still true in AE2, but task 16 took upstream's stonecut
  conversion between the five tunnel types (`terminals.js`, their comment: "attunement
  sucks"), so the quest now describes the long way round. Cosmetic, not wrong.

## Traps

- Changing a quest **id** resets player progress. Adding, deleting or editing a quest's
  contents does not. Port upstream quests under upstream's ids.
- A quest can render perfectly and still be uncompletable — a wrong item id, a stale NBT
  shape, or a mechanic that no longer exists. The namespace grep from task 07 cannot see
  any of those; only reading the quest against the current jar can.
- Quest files carry GT tool NBT. GT 8 keeps durability in the vanilla `Damage` tag at
  the item-tag root, **not** inside `GT.Tool` — see task 16. Anything ported from
  upstream's older commits needs checking for the old shape.

Both were handled in task 17 without deleting a node: `7B23AF5B6B62BC19` kept its id and
its `gtceu:ev_macerator` task but is now **"Faster Ore Processing"**, and says outright
that tier does not change chanced byproducts; `7EF57E379F736FBB` gained a sentence
pointing at the stonecut conversion. The same dead mechanic was also removed from three
chapter descriptions upstream had already fixed — the LV Sifter, the IV Rare Earth
centrifuge, and the IV Macerator (`05003665368F5A57`, retitled by upstream too).
