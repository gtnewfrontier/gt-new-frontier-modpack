# Changelog

All notable changes to GregTech: New Frontier. Versions follow the pack version in
`pack.toml`; each release is tagged in git.

## v0.5.0 — 2026-09-08

A maintenance release. **No new content** — this is the pack rebuilt on a current loader
and a current GregTech, with every mod updated and the defects that surfaced fixed.

Existing worlds carry over. No quest id changed, so quest progress is preserved.

### Updated

- **Forge 47.3.0 → 47.4.10.**
- **GregTech CEu Modern 1.6.3 → 7.5.3.** Nine major versions of GregTech, including the
  material and recipe reworks that came with 7.x.
- **Every other mod moved to its newest 1.20.1 build** — 106 of 183 pins changed. Applied
  Energistics 2 split its guidebook out, so **GuideME** is now shipped alongside it.
- JourneyMap is held at 5.10.3 so JourneyMap Integration still loads, and Factory Blocks
  is held at 1.3.1 so it does not crash against the Chisel version we ship.

### Fixed

- **Iron-tier blocks could be mined with a stone pickaxe.** A broken tag entry in Just
  Enough Guns stopped `minecraft:needs_iron_tool` from loading at all, which quietly
  removed the harvest-tier requirement from diamond, gold, emerald and redstone ore and
  every other block in that tag.
- **The EV "Better Flight!" quest could never be completed** — it asked for a misspelled
  chestplate id and drew a missing-item icon.
- **39 quest tasks asking for GregTech tools could never be completed**, across six
  chapters, because they carried tool durability in the wrong NBT shape.
- **The MV "Wood Tar" quest was invisible** in the book, hidden underneath a chapter link.
- Removed the quest tasks, recipes and configs belonging to 19 mods the pack does not
  ship — a long-standing source of missing-item icons and console errors.
- The Construction Core's skystone recipe declared three inputs on a two-input machine
  and could not run.
- The slimeball centrifuge recipe produced nothing.
- Development leftovers are gone: example scripts, upstream branding, and the custom
  recipe category that displayed as "test".

### Added from upstream

Cherry-picked from the GregTech CEu Modern Community Pack:

- Seven quests — **Wood Tar**, **Desulfurization**, **Heavy Fuel**, **Hydrocarbons**,
  **Nitrogen**, **Gotta go fast** and **Colored Buses** — plus rewritten descriptions
  across five chapters.
- Recipe fixes: wood unification (fences, gates and stairs), the AE2 Controller, six
  terminal assembler recipes and P2P tunnel stonecutting, interface providers now
  doubling their output per tier, and inscriber presses accepting any lens of the right
  colour.
- Cleanroom walls accept FramedBlocks' doors.

### Changed

- Superseded items — AE2 materials GregTech replaces, budding quartz, facades and six
  stone-variant ore categories — are now hidden in **both** JEI and EMI instead of
  cluttering the item list.
- The **Lost Portal Generator** has a finished texture and model.

### Distribution

The pack is on CurseForge again. v0.4.3's successor was briefly built against a GregTech
8.0.0 snapshot; GregTech 8 has never had a stable release for 1.20.1 and cannot be
redistributed, so v0.5.0 ships on GregTech 7.5.3, the newest release on CurseForge. See
`docs/design/01-gt-pin-and-distribution.md`.
