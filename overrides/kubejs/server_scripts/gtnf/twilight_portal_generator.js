ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    greg.assembler("gtceu:twilight_portal_generator")
        .itemInputs(
            "4x #gtceu:circuits/lv",
            "4x gtceu:steel_ingot",
            "1x minecraft:diamond"
        )
        .itemOutputs("gtnf:twilight_portal_generator")
        .duration(600)
        .EUt(16);
});

ServerEvents.tags("item", (event) => {
    event.removeAll("twilightforest:portal/activator");

    event.add(
        "twilightforest:portal/activator",
        "gtnf:twilight_portal_generator"
    );
});
