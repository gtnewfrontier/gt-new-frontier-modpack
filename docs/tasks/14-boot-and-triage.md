# 14 — First boot and error triage

**Status:** not started
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

3. Create a new world. Check:
   - quest book opens, all 18 chapters render
   - GT ore veins generate (`/gtceu` prospecting or creative flight in a fresh chunk)
   - Twilight Forest portal works via `gtnf:twilight_portal_generator`
   - `gtnf:lost_portal_generator` places with its real texture, breaks back with an
     iron pickaxe, and teleports to The Lost Cities from a bed placed on it
     (`defaultconfigs/lostcities-server.toml` `specialBedBlock`)
   - both portal generators show correct names and assembler recipes in EMI
   - Greenhouse and Construction Core form and run a recipe

4. Log every fix as its own commit; if a fix is large, split it into a new task file
   rather than growing this one.

## Done when

- Zero errors in both KubeJS logs.
- New world reaches steam age content without a crash.
- The four in-game checks above pass.

## Notes

`kubejs/config/common.properties` has `startupErrorGUI=true`, so startup script errors
surface as a screen rather than a silent log line. Keep it that way.
