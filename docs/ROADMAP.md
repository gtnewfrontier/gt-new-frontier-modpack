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
- [ ] `04-packwiz-export-ci.md` — GitHub Action building the CurseForge zip
- [ ] `05-serverpack.md` — `start.sh` / `start.ps1` + server README
- [ ] `06-retire-curseforge-manifest.md` — delete `manifest.json` and `modlist.html`

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
