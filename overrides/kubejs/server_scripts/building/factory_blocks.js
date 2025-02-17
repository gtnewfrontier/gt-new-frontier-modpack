ServerEvents.recipes((event) => {
    event.remove({ output: "factory_blocks:factory" });

    event.recipes.gtceu
        .mixer("factory_blocks:factory")
        .itemInputs("minecraft:iron_ingot", "minecraft:stone")
        .itemOutputs(`4x factory_blocks:factory`)
        .EUt(2)
        .duration(20);
    event.recipes.gtceu
        .construction_core("factory_blocks:factory")
        .itemInputs("minecraft:iron_ingot", "minecraft:stone")
        .itemOutputs(`16x factory_blocks:factory`)
        .inputFluids("gtceu:construction_foam 100")
        .EUt(8)
        .duration(20);
});
