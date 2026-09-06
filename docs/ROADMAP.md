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

- [ ] `01-normalize-line-endings.md` — `.gitattributes`, one LF renormalise commit
- [ ] `02-repo-metadata.md` — LICENSE, README refresh, `.gitignore`

## Phase 1 — Packwiz

- [ ] `03-packwiz-bootstrap.md` — import `manifest.json`, flatten `overrides/` to root
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
