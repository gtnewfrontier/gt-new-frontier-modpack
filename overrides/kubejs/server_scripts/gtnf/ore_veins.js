function normalizeHeight(value) {
    return Math.round(((value - 256) / (-64 - 256)) * (-27 - 0) + 0);
}

function normalizeRange(min, max) {
    return [normalizeHeight(min), normalizeHeight(max)];
}

GTCEuServerEvents.oreVeins((event) => {
    event.remove("gtceu:olivine_vein");
    event.remove("gtceu:sapphire_vein");
    event.remove("gtceu:galena_vein");
    event.remove("gtceu:nickel_vein");
    
    event.add("twilightforest/diamond", (vein) => {
        vein.weight(40);
        vein.density(0.25);
        vein.clusterSize(50);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-55), normalizeHeight(-30));
        vein.classicVeinGenerator((generator) =>
            generator
                .primary((b) => b.mat(GTMaterials.Graphite).size(4))
                .secondary((b) => b.mat(GTMaterials.Graphite).size(3))
                .between((b) => b.mat(GTMaterials.Diamond).size(3))
                .sporadic((b) => b.mat(GTMaterials.Coal).size(1))
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator
                .surfaceRock(GTMaterials.Diamond)
                .placement("above")
                .density(0.1)
                .radius(2)
        );
    });

    event.add("twilightforest/lapis", (vein) => {
        vein.weight(40);
        vein.density(0.75);
        vein.clusterSize(40);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-60), normalizeHeight(10));
        vein.dikeVeinGenerator((generator) =>
            generator
                .withBlock(
                    GTMaterials.Lazurite,
                    3,
                    normalizeHeight(-60),
                    normalizeHeight(10)
                )
                .withBlock(
                    GTMaterials.Sodalite,
                    2,
                    normalizeHeight(-50),
                    normalizeHeight(0)
                )
                .withBlock(
                    GTMaterials.Lapis,
                    2,
                    normalizeHeight(-50),
                    normalizeHeight(0)
                )
                .withBlock(
                    GTMaterials.Calcite,
                    1,
                    normalizeHeight(-40),
                    normalizeHeight(10)
                )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator
                .surfaceRock(GTMaterials.Lapis)
                .placement("above")
                .density(0.15)
                .radius(3)
        );
    });

    event.add("twilightforest/molybdenum", (vein) => {
        vein.weight(5);
        vein.density(0.25);
        vein.clusterSize(27);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(20), normalizeHeight(50));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Wulfenite).size(2, 4)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Molybdenite).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Molybdenum).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Powellite).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Molybdenum).placement("above")
        );
    });

    event.add("twilightforest/olivine", (vein) => {
        vein.weight(20);
        vein.density(0.25);
        vein.clusterSize(36);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-20), normalizeHeight(10));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Bentonite).size(2, 4)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Magnetite).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Olivine).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.GlauconiteSand).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Olivine).density(0.15).radius(3)
        );
    });

    event.add("twilightforest/coal", (vein) => {
        vein.weight(80);
        vein.density(0.25);
        vein.clusterSize(41);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(10), normalizeHeight(140));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) => l.weight(3).mat(GTMaterials.Coal).size(2, 4))
                    .layer((l) => l.weight(3).mat(GTMaterials.Coal).size(2, 4))
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Coal)
        );
    });

    event.add("twilightforest/sapphire", (vein) => {
        vein.weight(60);
        vein.density(0.25);
        vein.clusterSize(27);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-40), normalizeHeight(0));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Almandine).size(2, 4)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Pyrope).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Sapphire).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.GreenSapphire).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator
                .surfaceRock(GTMaterials.Sapphire)
                .density(0.15)
                .placement("above")
                .radius(3)
        );
    });

    event.add("twilightforest/galena", (vein) => {
        vein.weight(40);
        vein.density(0.25);
        vein.clusterSize(50);
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-15), normalizeHeight(45));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Galena).size(2, 4)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Silver).size(1, 1)
                    )
                    .layer((l) => l.weight(1).mat(GTMaterials.Lead).size(1, 1))
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Galena).placement("above")
        );
    });

    event.add("twilightforest/nickel", (vein) => {
        vein.weight(40);
        vein.density(0.25);
        vein.clusterSize(36); // Average of 32 and 40
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(-10), normalizeHeight(60));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Garnierite).size(2, 4)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Nickel).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.Cobaltite).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Pentlandite).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Nickel)
        );
    });

    event.add("twilightforest/lubricant", (vein) => {
        vein.weight(40);
        vein.density(0.25);
        vein.clusterSize(27); // Average of 25 and 29
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(0), normalizeHeight(50));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Soapstone).size(2, 4)
                    )
                    .layer((l) => l.weight(2).mat(GTMaterials.Talc).size(1, 1))
                    .layer((l) =>
                        l.weight(2).mat(GTMaterials.GlauconiteSand).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Pentlandite).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Talc)
        );
    });

    event.add("twilightforest/magnetite", (vein) => {
        vein.weight(80);
        vein.density(0.15);
        vein.clusterSize(41); // Average of 38 and 44
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(10), normalizeHeight(60));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Magnetite).size(2, 4)
                    )
                    .layer((l) =>
                        l
                            .weight(2)
                            .mat(GTMaterials.VanadiumMagnetite)
                            .size(1, 1)
                    )
                    .layer((l) => l.weight(1).mat(GTMaterials.Gold).size(1, 1))
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Magnetite)
        );
    });

    event.add("twilightforest/banded_iron", (vein) => {
        vein.weight(30);
        vein.density(1.0);
        vein.clusterSize(46); // Average of 40 and 52
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(20), normalizeHeight(40));
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Goethite, 3)
                .oreBlock(GTMaterials.YellowLimonite, 2)
                .oreBlock(GTMaterials.Hematite, 2)
                .rareBlock(GTMaterials.Gold, 1)
                .rareBlockChance(0.075)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Goethite).placement("above")
        );
    });

    event.add("twilightforest/apatite", (vein) => {
        vein.weight(40);
        vein.density(0.25);
        vein.clusterSize(36); // Average of 32 and 40
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(10), normalizeHeight(80));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.Apatite).size(2, 4)
                    )
                    .layer((l) =>
                        l
                            .weight(2)
                            .mat(GTMaterials.TricalciumPhosphate)
                            .size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Pyrochlore).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Apatite).placement("above")
        );
    });

    event.add("twilightforest/salts", (vein) => {
        vein.weight(50);
        vein.density(0.2);
        vein.clusterSize(36); // Average of 32 and 40
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(30), normalizeHeight(70));
        vein.layeredVeinGenerator((generator) =>
            generator.buildLayerPattern((pattern) =>
                pattern
                    .layer((l) =>
                        l.weight(3).mat(GTMaterials.RockSalt).size(2, 4)
                    )
                    .layer((l) => l.weight(2).mat(GTMaterials.Salt).size(1, 1))
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Lepidolite).size(1, 1)
                    )
                    .layer((l) =>
                        l.weight(1).mat(GTMaterials.Spodumene).size(1, 1)
                    )
            )
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Salt)
        );
    });

    event.add("twilightforest/cassiterite", (vein) => {
        vein.weight(80);
        vein.density(1.0);
        vein.clusterSize(46); // Average of 40 and 52
        vein.layer("twilightforest");
        vein.dimensions("twilightforest:twilight_forest");
        vein.heightRangeUniform(normalizeHeight(10), normalizeHeight(80));
        vein.veinedVeinGenerator((generator) =>
            generator
                .oreBlock(GTMaterials.Tin, 4)
                .rareBlock(GTMaterials.Cassiterite, 2)
                .rareBlockChance(0.33)
                .veininessThreshold(0.01)
                .maxRichnessThreshold(0.175)
                .minRichness(0.7)
                .maxRichness(1.0)
                .edgeRoundoffBegin(3)
                .maxEdgeRoundoff(0.1)
        );
        vein.surfaceIndicatorGenerator((indicator) =>
            indicator.surfaceRock(GTMaterials.Cassiterite)
        );
    });
});
