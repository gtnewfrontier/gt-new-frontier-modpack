GTCEuStartupEvents.registry("gtceu:world_gen_layer", (event) => {
    event
        .create("twilightforest")
        .targets("#minecraft:stone_ore_replaceables")
        .dimensions("twilightforest:twilight_forest");
});
