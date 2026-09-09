ServerEvents.recipes((event) => {
    const greg = event.recipes.gtceu;

    greg.assembler("gtceu:lost_portal_generator")
        .itemInputs(
            "2x #gtceu:circuits/lv",
            "1x gtceu:steel_block",
            "1x minecraft:diamond"
        )
        .itemOutputs("gtnf:lost_portal_generator")
        .duration(600)
        .EUt(16);
});
