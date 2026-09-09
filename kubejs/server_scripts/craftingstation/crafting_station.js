ServerEvents.recipes((event) => {
    event.remove({ output: "craftingstation:crafting_station" });
    event.shapeless(Item.of("craftingstation:crafting_station", 1), [
        "1x #forge:tools/saws",
        "1x minecraft:crafting_table"
    ]);
});