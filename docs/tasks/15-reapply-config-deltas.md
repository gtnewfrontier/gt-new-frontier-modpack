# 15 — Re-apply config deltas

**Status:** not started
**Depends on:** 14

## Goal

Every intentional setting in `docs/reference/config-deltas.md` is present and effective
in the regenerated configs.

## Why

Mods rewrite their config files on first launch with a new version, dropping unknown
keys silently. `config/gtceu.yaml` is already a generation behind — it still uses
`nativeEUToFE` and friends, which GT no longer reads. Without this task, the pack's
whole difficulty curve quietly reverts to defaults.

## Steps

1. After the task 14 boot, copy the regenerated configs out of the test instance.

2. Walk `docs/reference/config-deltas.md` row by row and confirm each key exists in the
   new file **under its current name** (see the rename table in
   `docs/reference/gt8-api-migration.md`) and holds our value.

3. Diff old vs new config trees for keys that appeared or vanished:

   ```sh
   diff -r <old-config> config | grep -E '^[<>]' | head -100
   ```

   New keys with gameplay impact (GT 8 will have added some) get a decision and a row in
   the deltas file.

4. Delete configs for mods no longer installed while you're here.

5. Re-verify the AE2 channels question flagged in the deltas doc: we run `default`
   (channels on), upstream runs `infinite`. Confirm it's still what we want and that the
   quest book teaches it.

## Done when

- Every row in `config-deltas.md` verified against the live config, or updated.
- The deltas file has no unanswered "verify" notes.
- In game: wood crafting is nerfed, GT tools required, hazards on, veins on grid.
