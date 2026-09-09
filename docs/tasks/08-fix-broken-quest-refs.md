# 08 — Fix broken quest references

**Status:** not started

## Goal

No quest asks for an item that cannot exist, and no player-facing text is a placeholder
or belongs to another pack.

## Fix

1. **`enderstorage:ender_tank`** — EnderStorage isn't installed; we ship ShetiPhian's
   EnderTanks (`endertanks:`) and EnderChests (`enderchests:`). Retarget the task, or
   drop the quest if it no longer fits.

2. **`expatternprovider:tag_storage_bus`** — Extended AE isn't installed. Retarget to
   the AE2 equivalent or remove the quest.

3. **`config/ftbquests/quests/data.snbt`** → `lock_message: "eSFSDF"`. Write a real
   message, or remove the key to use the default.

4. **UV finale text** (`chapters/uv__ultimate_voltage.snbt`) — currently reads "the end
   of GTCEu and the GregTech Community Modpack" and links upstream's Discord. Rewrite
   for this pack. If the ending decision (design backlog #8) puts content past UV, this
   becomes a hand-off instead of an ending.

## Verify

```sh
grep -rhoE '"[a-z0-9_]+:[a-z0-9_/.]+"' config/ftbquests/quests \
  | tr -d '"' | cut -d: -f1 | sort -u
```

Every namespace must be an installed mod. Then load the quest book in game and check
the four chapters that changed still open without errors.

## Done when

- Namespace grep is clean.
- No quest task shows a missing-item icon in the book.
- Lock message and UV finale read as ours.
