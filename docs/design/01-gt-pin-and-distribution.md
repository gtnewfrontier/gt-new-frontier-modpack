# 01 — The GregTech pin and how v0.5.0 is distributed

**Decided:** 2026-09-08
**Status:** decided

## Question

Task 11 pinned GregTech to the maven snapshot `8.0.0-20260826.220408-269` "to match
upstream v1.15.0". That pin is a **url-mode** metafile, so `packwiz curseforge export`
bundles the jar into `overrides/mods/` rather than referencing a CurseForge file id.
CurseForge only permits bundling mods on its Approved Non-CurseForge list, and GTCEu
Modern is itself a CurseForge project — so the export cannot be uploaded. v0.5.0 is
otherwise ready. Repin, publish elsewhere, or ask permission?

## Decision

**Repin GregTech to the newest CurseForge release for 1.20.1, `gtceu-1.20.1-7.5.3.jar`**
(project `890405`, file `7917773`, `mode = "metadata:curseforge"`), and walk back the four
places our content depends on the GT 8 KubeJS API. v0.5.0 ships on CurseForge.

The GT 8 work is preserved in full on the **`gt8` branch**, at the commit where the
downgrade begins. When a stable 8.x reaches CurseForge for 1.20.1, that branch is the
starting point, not a re-derivation.

## Why

**Upstream has not published GT 8 either, and that is the whole answer.** The community
pack's last tag is `v1.14.5`, which pins `gtceu-1.20.1-7.5.1.jar` in
`mode = "metadata:curseforge"`. Their `pack.toml` reads `1.15.0` on the default branch,
but there is **no v1.15.0 tag and no release** — the commit `c1b4288 "Update GT to v8
snapshots"` is untagged working state. Task 11 matched an unreleased upstream *branch*
and inherited its blocker along with its pin.

The rest of the ground:

- CurseForge's `gregtechceu-modern` tops out at **7.5.3** (12 Apr 2026) for 1.20.1.
  GitHub has no stable 8.x tag; `latest-1.20.1` is a prerelease. 8.x on CurseForge exists
  only under a *different* project, the "GregTech Modern Reborn" fork.
- **GT 8.0.0 for 1.20.1 has never had a stable release from anyone.** Publishing it means
  handing players a dated snapshot with no upgrade path except further snapshots.
- The pack ships **no GT addons** — `gregtechceu-modern.pw.toml` is the only GT metafile —
  so nothing cascades off the pin. GT 7.5.3 jarjars LDLib, Registrate, configuration and
  MixinExtras, so the downgrade adds no new mod either.
- The GT-8-only surface in our own content was **four files, ~19 lines**, and
  `docs/reference/gt8-api-migration.md` documented every one of them in both directions.
- v0.4.3 — what players actually have — ships GT **1.6.3**. 7.5.3 is still an enormous
  jump. "Downgrade" is only true relative to our unreleased branch.

## Rejected

- **Publish off CurseForge** (GitHub release + packwiz URL + `serverpack/`). Ships today
  with zero pack changes and keeps everything phase 3 built. Rejected because it trades
  the pack's whole distribution channel for a mod build that has no stable release, and
  because it leaves us maintaining a snapshot pin nobody upstream is testing against.
- **Ask CurseForge to approve the snapshot jar.** Unbounded wait, and unlikely to be
  granted for a mod that already has a CurseForge project.
- **Pin 7.5.1, exactly upstream's file.** Maximum confidence that task 16's cherry-picks
  behave as upstream tested them, but it throws away two point releases of GT bugfixes
  for a difference our own boot can settle.
- **Defer the downgrade to its own task.** Considered and declined: task 18's Done-when
  already requires the export to match the decision, so the repin is inside its scope.

## Consequences

- v0.5.0 is a CurseForge release. The export carries no jars in `overrides/`.
- We now track upstream's **published** line, not their working branch. `docs/reference/
  upstream.md`'s cherry-pick rule should read v1.14.5, not HEAD, until upstream tags 1.15.
- `docs/reference/gt8-api-migration.md` becomes a record of a path we walked back rather
  than a live migration guide. It is still the map for walking it forward again.
- Two of task 12's findings survive the downgrade unchanged and are worth keeping in mind:
  `workableCasingModel(a, b)` is already the GT **7.5.x** form (the `workableCasingRenderer`
  rename happened before 8.x), and `recipeModifier(RecipeModifier)` singular exists on
  7.5.3, so declining upstream's `BATCH_MODE` addition still holds.
- Anything the pack gains from GT 8 specifically is deferred until 8.x reaches CurseForge.
  Nothing in the pack depended on a GT 8 feature — only on GT 8 *spelling*.

## Tasks

Executed inside `docs/tasks/18-ship-v0.5.0.md` rather than spawning a new file, per the
decision above.
