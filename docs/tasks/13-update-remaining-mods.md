# 13 — Update the remaining mods

**Status:** done (2026-09-06)
**Depends on:** 11

## Goal

All 183 mods are on their newest 1.20.1 build, or explicitly pinned with a reason.

## Why

44 of the 61 upstream-inherited mods are still on Dec 2024 file ids. The rest are from
early 2025.

## Steps

1. `packwiz update --all`. Review the diff mod by mod — it is a large but readable
   change set in `mods/*.pw.toml`.

2. Triage what won't update:
   - **Abandoned on 1.20.1** — record in the ROADMAP status log, decide keep-pinned vs
     drop. Feeds the mod audit (design backlog #4).
   - **Requires a newer dependency** than we pin — resolve or pin back.
   - **Conflicts with GT 8** — check the mod's issue tracker before assuming.

3. Pin deliberately where needed, with a comment in the `.pw.toml` saying why (e.g.
   "Oculus 1.7.0 is the last build compatible with our Embeddium pin").

4. Compare the mods we share with upstream against upstream's current pins — they have
   already validated those combinations:

   ```sh
   ls ../GregTech-Modern-Community-Pack/mods
   ```

## Done when

- `packwiz update --all` reports nothing further to do.
- Every deliberately-pinned mod carries a one-line reason.
- Any mod that had to be dropped is listed in the ROADMAP status log, for the mod audit
  (design backlog #4) to rule on.

## Notes

Do this **after** the GT bump, not before — GT is the constraint everything else bends
around.
