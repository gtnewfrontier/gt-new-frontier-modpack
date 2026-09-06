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

- [ ] `07-remove-dead-mod-code.md` — scripts and configs for the 19 dropped mods
- [ ] `08-fix-broken-quest-refs.md` — unobtainable tasks, junk lock message, UV finale
- [ ] `09-remove-dev-leftovers.md` — example scripts, `gtbh`, branding, `category("test")`
- [ ] `10-finish-gtnf-content.md` — Lost Portal Generator texture and model

## Phase 3 — Rebaseline

Sequential. Do not start until Phase 0 and 1 are done.

- [ ] `11-update-loader-and-gt.md` — Forge 47.4.10 + GTCEu 8.0.0-SNAPSHOT
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
