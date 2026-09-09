# 14 — First boot and error triage

**Status:** done (2026-09-07)
**Depends on:** 12, 13

## Goal

The updated pack launches to a new world with zero KubeJS errors and no crash.

## Steps

1. Install the pack locally with packwiz-installer (or export and import the zip) into a
   throwaway instance. Never test in an instance holding a real save.

2. Launch. Work through failures in this order — earlier ones mask later ones:
   1. missing/duplicate mod dependencies (crash on load)
   2. mixin failures (crash, usually a perf mod vs a new Forge)
   3. `logs/kubejs/startup.log` — startup script errors (custom machines, materials)
   4. `logs/kubejs/server.log` — recipe script errors (missing items, renamed ids)
   5. `latest.log` warnings for removed/renamed recipe ids

   Task 13 updated 106 mod pins, so step 2.1 is the likely one this time. Four mods are
   pinned back with reasons in their `.pw.toml` (JourneyMap, Chisel Reborn,
   RightClickHarvest, Tectonic) — if the boot reports a dependency problem for any of
   them, read that comment before touching the pin. Two mods changed modid:
   `embeddiumplus` -> `chloride` (leaves `config/embeddium++.toml` orphaned, task 15)
   and Simple Voice Chat now also registers `voicechat_api`.

3. Create a new world. Check:
   - quest book opens, all 18 chapters render
   - GT ore veins generate (`/gtceu` prospecting or creative flight in a fresh chunk)
   - Twilight Forest portal works via `gtnf:twilight_portal_generator`
   - `gtnf:lost_portal_generator` places with its real texture, breaks back with an
     iron pickaxe, and teleports to The Lost Cities from a bed placed on it
     (`defaultconfigs/lostcities-server.toml` `specialBedBlock`)
   - both portal generators show correct names and assembler recipes in EMI
   - Greenhouse and Construction Core form and run a recipe
   - the AE2 terminal opens and AE2's guide (now the separate **GuideME** mod, added
     at task 13 as a new mandatory AE2 dependency) is reachable
   - a shaderpack is selectable and `latest.log` no longer carries
     `EuphoriaPatcher: You need to have ComplementaryShaders_r5.x installed!` — task 13
     moved both pins to r5.9 and deleted the pre-patched folders, so Euphoria Patches
     has to regenerate `Complementary… + EuphoriaPatches_…` on first launch

4. Log every fix as its own commit; if a fix is large, split it into a new task file
   rather than growing this one.

## Done when

- Zero errors in both KubeJS logs.
- New world reaches steam age content without a crash.
- The four in-game checks above pass.

## Notes

`kubejs/config/common.properties` has `startupErrorGUI=true`, so startup script errors
surface as a screen rather than a silent log line. Keep it that way.
