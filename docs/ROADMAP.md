# Roadmap

Work top to bottom. Each task is one fresh session: `/task 07` — it loads what it needs
and nothing else. Tick the box here and log a status row before the session ends. Tasks
in a phase marked *(parallel)* can be done in any order.

Design questions are not tasks. `/design` takes the next one from
`docs/design/BACKLOG.md`; you decide, Claude records it and writes the tasks it implies.

Read first: `docs/PROCESS.md` (how we work), `docs/ANALYSIS.md` (what's wrong),
`docs/VISION.md` (where we're going).

**Target of the rebaseline:** Minecraft 1.20.1, Forge 47.4.10, GTCEu 8.0.0-SNAPSHOT —
matching upstream v1.15.0. We remain a hard fork; upstream is a reference only.

## Phase 0 — Foundation

Nothing else is safe until diffs are readable.

- [x] `01-normalize-line-endings.md` — `.gitattributes`, one LF renormalise commit
- [x] `02-repo-metadata.md` — LICENSE, README refresh, `.gitignore`

## Phase 1 — Packwiz

- [x] `03-packwiz-bootstrap.md` — import `manifest.json`, flatten `overrides/` to root
- [x] `04-packwiz-export-ci.md` — GitHub Action building the CurseForge zip
- [x] `05-serverpack.md` — `start.sh` / `start.ps1` + server README
- [x] `06-retire-curseforge-manifest.md` — delete `manifest.json` and `modlist.html`

## Phase 2 — Defect cleanup *(parallel)*

Safe to do before or after the rebaseline; doing them first makes the rebaseline's
error logs readable.

- [x] `07-remove-dead-mod-code.md` — scripts and configs for the 19 dropped mods
- [x] `08-fix-broken-quest-refs.md` — unobtainable tasks, junk lock message, UV finale
- [x] `09-remove-dev-leftovers.md` — example scripts, `gtbh`, branding, `category("test")`
- [x] `10-finish-gtnf-content.md` — Lost Portal Generator texture and model

## Phase 3 — Rebaseline

Sequential. Do not start until Phase 0 and 1 are done.

- [x] `11-update-loader-and-gt.md` — Forge 47.4.10 + GTCEu 8.0.0-SNAPSHOT
- [ ] `12-gt8-script-migration.md` — custom machines, recipe types, materials
- [ ] `13-update-remaining-mods.md` — `packwiz update --all`, triage what's dead
- [ ] `14-boot-and-triage.md` — first launch, zero-KubeJS-error gate
- [ ] `15-reapply-config-deltas.md` — restore intent after configs regenerate
- [ ] `16-cherry-pick-upstream-fixes.md` — take upstream's recipe fixes

## Phase 4 — Design, then build, one mechanic at a time

Everything past the rebaseline is game design, and design comes first. There are no
tasks here yet **by intent** — each one is created by a design session that decided
something. See `docs/PROCESS.md`.

Open questions live in `docs/design/BACKLOG.md`, in dependency order: the dimension
ladder, bosses, combat tiering, mod audit, ore economy, quest structure, danger model,
the ending. Decisions land in `docs/design/` and spawn numbered tasks that get appended
below as they're written.

Run `/design` to take the next question. Do not write phase 4 tasks ahead of the
decision that justifies them.

### Tasks spawned so far

_(none yet — 17 onward)_

## Status log

Append one line per completed task: date, task, commit, anything the next session
needs to know.

| Date | Task | Commit | Note |
|---|---|---|---|
| 2026-09-06 | analysis + plan | — | fork point identified as upstream `519a656` |
| 2026-09-06 | 01 line endings | `752d933` | Index was always LF — the CRLF came from Git-for-Windows' system `core.autocrlf=true` on checkout, so no renormalise commit was needed. Working tree is now 0 CRLF files. Upstream uses `* -text` and stores 10 files as CRLF, so keep `--strip-trailing-cr` when diffing (`docs/reference/upstream.md`). Worktree `../gtcpm-fork` is checked out at `519a656`. |
| 2026-09-06 | 02 repo metadata | `6099c48` | LICENSE is upstream's LGPL-2.1 verbatim; the pack is licensed the same as the work it derives from. README now states 1.20.1 / Forge 47.3.0 / GTCEu Modern 1.6.3 (CF file `6081505`) — update that table at task 11. `overrides/config/voicechat/username-cache.json` was gitignored but still tracked; it is now untracked and deleted. `.gitignore` uses `**/voicechat/...` so it survives the `overrides/` flatten in task 03. |
| 2026-09-06 | 03 packwiz bootstrap | `3ed6d6c` | `pack.toml` / `index.toml` / 183 metafiles at root; `overrides/` flattened (1225 `git mv`s). All 183 CF entries imported. `packwiz cf export` verified for both sides: exported manifest pins and `required` flags are set-identical to the original `manifest.json` (183/183, FindMe included), overrides 1225→1223 (the two dropped are shaderpack `.gitignore`s). No jars land in `overrides/`, so nothing in the pin set is distribution-blocked — the task-05 FindMe warning does not apply here. Untested: `packwiz-installer` fetching at install time, which is a different path. Two of the 183 are shaders, not mods: packwiz doesn't know the shaderpack category and dropped them in the repo root, so they were moved to `shaderpacks/` by hand — `mods/` holds 181. `.packwizignore` patterns are anchored with a leading `/`; unanchored `README.md` (upstream's form) also swallowed `config/NoChatReports/README.md`. packwiz is not on PATH by default: `go install github.com/packwiz/packwiz@latest`, binary lands in `~/go/bin`. |
| 2026-09-06 | 04 export CI | `256a811`, `91a937b` | `.github/workflows/build.yml`: push + workflow_dispatch, checkout@v4 / setup-go@v5 (`cache: false` — no go.sum, the cache step warned every run) / `go install packwiz@latest` / `packwiz curseforge export` / upload-artifact@v4 named `gt-new-frontier-curseforge`, `if-no-files-found: error`. Zip name is `<pack.toml name>-<version>.zip`, i.e. **spaces in the glob** — bump `pack.toml` `version` and the artifact renames itself, the glob still matches. Runs green on `0.5` in ~30s; it reaches `main` when `0.5` merges. Downloaded artifact matches the task-03 local export exactly: 183 pins (180 required), 1223 override files, `manifest.json` + `modlist.html` regenerated, nothing from `docs/`, `.claude/`, `.github/`. Launcher import is still untested — that is a human step. Remaining CI annotation is GitHub deprecating Node 20 under checkout/setup-go/upload-artifact; current majors, nothing to fix. |
| 2026-09-06 | 05 serverpack | `8ce48bd` | `serverpack/start.{sh,ps1}` + README, installed and booted for real. **36 mods + the 2 shaderpack pins are now `side = "client"`** — the server install pulls 145 of 181 mods. Verified end to end: `packwiz serve` on localhost, `start.ps1` in an empty dir → Forge 47.3.0 installed, 1406 files fetched, `Done (44.115s)!`, clean `stop`. Two mods are excluded from the CurseForge API and packwiz-installer hard-fails on them — **FindMe and Structory** — so both scripts pre-download those from `mediafilez.forgecdn.net` into `mods/` under the pinned filename before packwiz runs (`MANUAL_JARS`); a mod update that changes those file ids must update the URLs too. `PACK_TAG` defaults to `v0.5.0` **and no such tag exists yet** — tag a release or the scripts 404; `PACK_URI` overrides the whole URL. Sides were derived from mod knowledge and then confirmed by the boot: only UniLib disagreed (it logs `Disabling UniLib, as it is client side only`) and is now `client`. `start.sh` cannot be tested under Git Bash on Windows — it uses Forge's `unix_args.txt`, whose `:` classpath separator is an illegal Windows path char; platform artifact, not a script bug. The boot surfaced the known dead-mod loot/advancement errors (`expandeddelight`, `pineapple_delight`, `culturaldelights`, `corn_delight`, `farmersdelight:chicken_cut`) — task 07's job. Two warts left alone: `mods/libipn.pw.toml` ships without Inventory Profiles Next, and `shaderpacks/` holds both CF-pinned zips and unpacked copies of the same shaderpacks — the unpacked ones are plain index files, which carry no side, so they still download to servers. |
| 2026-09-06 | 06 retire CF manifest | `3335b70` | `manifest.json` / `modlist.html` are gone; packwiz is the only mod-list source. Verified by exporting before and after the delete: both zips carry a generated `manifest.json` + `modlist.html` at the zip root with the **same 183 pins (180 required)** and 1223 override files, and the pin set is set-identical to the deleted `manifest.json` (only metadata differs — `version` now tracks `pack.toml` (`0.5.0`, was `v0.4.3`) and packwiz adds a top-level `"projectID": 0`). 183 = 181 `mods/*.pw.toml` + 2 `shaderpacks/*.pw.toml`. The `/manifest.json` and `/modlist.html` lines in `.packwizignore` were dropped with them — confirmed post-delete that neither file leaks into `overrides/`. README's install section no longer says "zip manifest.json"; it points at the CI artifact, `packwiz curseforge export`, and `serverpack/README.md`. **Launcher import now verified** (Prism, 2026-09-06): the local `packwiz curseforge export` zip imported clean and booted to the main menu. All **181 mod jars** installed — Prism's CurseForge import fetches FindMe and Structory without complaint, so the distribution block that hard-fails `packwiz-installer` (task 05) does **not** apply to launcher import. `logs/kubejs/{startup,client,server}.log` contain **zero ERROR lines**; `latest.log` has 14, all mod-internal (CraftPresence pack-detection noise, GeckoLib `Unable to parse animation`, EMI first-run config read, an Embeddium mixin-taint warning, a mixin `minVersion` warning). **Not covered by this boot:** `kubejs/server.log` is 0 bytes because no world was loaded — the dead-mod recipe/loot errors from the task-05 server boot live behind world load, so task 14 still needs a world. The boot did surface one real defect, now in `docs/ANALYSIS.md` §2.4: Euphoria Patches wants Complementary **r5.4** and we pin **r5.3**, so the shader patcher errors out at load — fix during task 13. |
| 2026-09-06 | 07 dead mod code | `dacd842` | Deleted `architects_palette.js` (486 lines), `building_gadgets.js` (57), `extendedae2.js` (205); stripped the four `mae2:` accelerator recipes from `ae2.js`; deleted `config/inventoryprofilesnext/`. Nothing went to an attic — restore from `dacd842^` if the mod audit (backlog #4) re-adds any of them. **`config/invtweaks-client.toml` was kept**, correcting the "Do not ship" row in `config-deltas.md`: the installed Inventory Tweaks ReFoxed jar is `invtweaks-1.20.1-1.2.0.jar`, so that file is its live config, not an IPN leftover. Found and fixed a real defect on the way: `gtnf.js` removed `sophistsophisticatedstorage:barrel`, a typo, so the vanilla-recipe barrel was never actually removed. **The namespace grep is now clean except `gtbh`** (`kubejs/startup_scripts/gtbh.js` registers items in a namespace no mod provides) — task 09 owns it. Two dead-mod references were left alone, both by design: `config/ftbquests/.../ore_processing.snbt` line 440 wants `expatternprovider:tag_storage_bus` (task 08 names it explicitly), and `mods/libipn.pw.toml` ships IPN's library with no IPN (mod audit). Boot not re-run: the deleted files cannot error, and the two edits are recipe-level, so the real gate is task 14's world load. |
| 2026-09-06 | 08 quest refs | `6187952` | Retargeted the EV Ender Tank quest to `endertanks:ender_tank` — id confirmed from the pinned jar itself (`data/endertanks/recipes/tank.json` result, blockstate, item model), not guessed; ShetiPhian's tanks take the same diamond-for-private and dye-for-frequency handling the old text described, so only the mod names changed. Deleted the `expatternprovider:tag_storage_bus` quest (`23B078514FB4A215`) outright rather than retargeting — AE2's plain Storage Bus has no tag filter, so there was nothing to retarget to, and nothing depended on the node. **The namespace grep over `config/ftbquests/quests` is now fully clean** (`https` is a URL, `forge`/`itemfilters` are tag filters); every `item:`/`icon:` namespace resolves to an installed mod. Lock message and UV finale are ours; the finale deliberately says "what sits past it is still being built" instead of naming an ending, because design backlog #8 is still open — revisit that text when #8 lands. **Not verified in game:** the "no missing-item icon" half of Done-when needs a world load, which task 14 owns. Static checks run instead: brace/bracket balance across all 27 quest `.snbt` files, and `packwiz refresh` clean. |
| 2026-09-06 | 09 dev leftovers | `fa2ad84` | Deleted both `example.js` samples, `gtbh.js`, `gtnf/dimension_markers.js` and `textures/item/example_item.png`; `example_block.png` stays because `gtnf/lost_portal_generator.js` still uses it (task 10). `icons.js` now says "GregTech: New Frontier". `config/fml.toml` reset to Forge's default 854x480, row updated in `config-deltas.md`. **Two checklist items did not go as written.** (1) The `sophistsophisticatedstorage` typo was **never** in `sophisticated_backpacks/upgrades.js` — the tree's only occurrence was `gtnf.js`, fixed in task 07; `docs/ANALYSIS.md` §2.3 corrected. (2) `material_testing/material.js` is **not** dead code: `server_scripts/appliedenergistics2/ae2.js` uses `#forge:plates/fluix`, which only exists because of the `GENERATE_PLATE` flag on that material. Kept and moved to `startup_scripts/materials.js` (folder gone, commented-out `netherite` block deleted); `.dust()` deliberately **not** changed to upstream's `.gem()` — AE2's own jar already tags `ae2:fluix_crystal` as `forge:gems/fluix` (verified by unzipping `appliedenergistics2-forge-15.3.3.jar`), so a gtceu fluix gem would only duplicate it. That is task 16's call. `.category("test")` → `.category("gtnf")` on both recipe types; GTCEu builds category lang keys as `%s.recipe.category.%s` (read out of `GTRecipeCategory.class`), so `gtceu.recipe.category.gtnf` was added to `kubejs/assets/gtceu/lang/en_us.json` — **if EMI shows a raw key at task 14, the namespace is `kubejs`, not `gtceu`.** Verified: `node --check` on all four edited scripts, `packwiz refresh` clean (index 7+/27-), zero CRLF. **Client not booted** — needs a real launcher session; task 14 owns the boot gate, and the "loading screen / creative tab say New Frontier" half of Done-when is unverified until then. |
| 2026-09-06 | 10 gtnf content | `2ff4125` | **Block vs item was not a design call** — `defaultconfigs/lostcities-server.toml` already sets `specialBedBlock = "gtnf:lost_portal_generator"`, so The Lost Cities is entered by sleeping in a bed placed on this block. It must be a block, and it already does something; step 4 of the task file was already satisfied by config. Texture is a generated 16x16 built from the Twilight item's own palette (outline `#282520`, steels `#514d48`/`#605c56`/`#78746e`/`#85807b`, copper `#c17d36`/`#e7a056`/`#fcb882`) with a violet lens so the two read as one family but different destinations; the generator script is scratchpad-only, the PNG is the artifact. Found and fixed a second defect: the block was `requiresTool(true)` + `minecraft:needs_iron_tool` with **no `minecraft:mineable/*` tag**, so no tool is ever "correct" and breaking it would have dropped nothing — `minecraft:mineable/pickaxe` added, the pre-existing `forge:mineable/wrench` left alone. `example_block.png` deleted with its last reference (task 09 had kept it only for this). Verified: `node --check` on the script, tree-wide `example_block` grep clean, `packwiz refresh` clean (index +1/-1), zero CRLF. **Not verified in game** — "both appear in EMI with correct names and recipes" and the placed block's appearance need a boot; task 14 owns that gate. Whatever design backlog #1 decides about the ladder will re-gate the assembler recipe, which is untouched. |
| 2026-09-06 | 11 loader + GT8 | `PLACEHOLDER` | `pack.toml` forge `47.3.0` → **`47.4.10`**; GT repinned from CurseForge `1.6.3` to the maven snapshot **`8.0.0-20260826.220408-269`** — the exact build upstream v1.15.0 pins. Jar downloaded and its sha256 verified byte-for-byte against upstream's pin (`9cb87338…`); `[versions]` and the GT metafile below the `name` line are now identical to upstream. **Build `277` exists** (2026-09-06) — deliberately not taken, see the task file: matching upstream keeps tasks 12 and 16 aimed at an API upstream has actually tested. Step 3 came back empty by inspection of the jar: GT 8 **dropped LDLib** and jarjars ModularUI `3.3.1-SNAPSHOT`, Registrate `MC1.20-1.3.11`, Configuration `3.1.0-forge`, MixinExtras `0.5.4`; its only mandatory external deps are `forge [47,)` + `minecraft 1.20.1`, and **Kotlin for Forge is no longer a GT dependency**, so our `4.11.0` pin was left for task 13 (upstream is on `4.12.0`). The GT metafile is now **url-mode with no `[update]` block** — `packwiz update --all` in task 13 will skip it, which is intended; changing GT means editing that file by hand. Also bumped the two places the loader version is hardcoded outside `pack.toml`: `serverpack/start.{sh,ps1}` `FORGE_VERSION` (they would otherwise install 47.3.0 under a 47.4.10 pack) and the README version table (task 02 flagged it for this session). **Not booted** — task 11 step 4 forbids it until task 12 migrates the scripts. |
