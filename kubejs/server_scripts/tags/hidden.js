// Items the pack replaces but the mod still registers. JEI 15 and EMI 1.1 both read
// `c:hidden_from_recipe_viewers`, so one server-side tag hides them in both viewers.
// (mezz.jei.api.constants.Tags / dev.emi.emi.registry.EmiTags — both hardcode `c`.)
ServerEvents.tags("item", (event) => {
  const hidden = [
    // AE2 materials GregTech supersedes. `tags/ae2.js` already untags these and
    // `certus_quartz.js` swaps the recipes over, so they are unreachable, not just unused.
    "ae2:ender_dust",
    "ae2:certus_quartz_dust",
    "ae2:certus_quartz_crystal",
    "ae2:fluix_dust",
    "ae2:silicon",

    // Budding quartz and its buds: `removals.js` deletes every `ae2:transform/*` recipe
    // that grows them, so nothing here is obtainable.
    "ae2:flawless_budding_quartz",
    "ae2:flawed_budding_quartz",
    "ae2:chipped_budding_quartz",
    "ae2:damaged_budding_quartz",
    "ae2:small_quartz_bud",
    "ae2:medium_quartz_bud",
    "ae2:large_quartz_bud",
    "ae2:quartz_cluster",

    // One facade per block in the game — thousands of entries, all cosmetic.
    "ae2:facade",

    // Stone-variant ores. Stone and deepslate stay visible; these six only clutter the
    // list. GT 8's StoneTypes are stone, deepslate, andesite, basalt, diorite, granite,
    // marble, red_granite and the two concretes — upstream also hides sand, red_sand,
    // gravel, tuff and blackstone, which are GT 7 leftovers and would dangle here.
    "#forge:ores_in_ground/andesite",
    "#forge:ores_in_ground/basalt",
    "#forge:ores_in_ground/diorite",
    "#forge:ores_in_ground/granite",
    "#forge:ores_in_ground/marble",
    "#forge:ores_in_ground/red_granite",

    // The stub registered by `startup_scripts/jeg_supply_drop_stub.js` to repair JEG's
    // broken `minecraft:needs_iron_tool` entry. It is not obtainable and not content.
    "jeg:supply_drop",
  ];

  hidden.forEach((id) => event.add("c:hidden_from_recipe_viewers", id));
});
