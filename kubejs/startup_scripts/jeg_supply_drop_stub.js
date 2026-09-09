// Just Enough Guns 0.14.4 lists `jeg:supply_drop` in minecraft:needs_iron_tool, but
// registers the block as `jeg:supply_drop_crate`. One unresolvable required entry makes
// TagLoader drop the whole tag, so every iron-tier block in the pack — diamond, gold,
// emerald and redstone ore included — becomes mineable with a stone pickaxe.
// Registering the id the tag asks for is enough to make the tag resolve. The item form
// is hidden from both recipe viewers in `server_scripts/tags/hidden.js`.
// ponytail: stub block. Delete this file the moment JEG ships the real `jeg:supply_drop`
// — two registrations of the same id will not coexist.
StartupEvents.registry("block", (event) => {
  event.create("jeg:supply_drop").displayName("Supply Drop");
});
