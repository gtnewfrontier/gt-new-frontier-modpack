const woodTypes = [
    { logType: "dark_oak_logs", woodType: "dark_oak" },
    { logType: "oak_logs", woodType: "oak" },
    { logType: "acacia_logs", woodType: "acacia" },
    { logType: "birch_logs", woodType: "birch" },
    { logType: "jungle_logs", woodType: "jungle" },
    { logType: "spruce_logs", woodType: "spruce" },
    { logType: "mangrove_logs", woodType: "mangrove" },
    { logType: "cherry_logs", woodType: "cherry" },
    {
        logType: "crimson_stems",
        woodType: "crimson",
    },
    {
        logType: "warped_stems",
        woodType: "warped",
    },
    {
        logType: "bamboo_blocks",
        woodType: "bamboo",
    },
];

ServerEvents.recipes((event) => {
    // remove vanilla pickaxes
    event.remove({ output: "minecraft:wooden_pickaxe" });
    event.remove({ output: "minecraft:stone_pickaxe" });
    event.remove({ output: "minecraft:iron_pickaxe" });
    event.remove({ output: "minecraft:golden_pickaxe" });
    event.remove({ output: "minecraft:diamond_pickaxe" });
    event.remove({ output: "minecraft:netherite_pickaxe" });

    // remove vanilla shovels
    event.remove({ output: "minecraft:wooden_shovel" });
    event.remove({ output: "minecraft:stone_shovel" });
    event.remove({ output: "minecraft:iron_shovel" });
    event.remove({ output: "minecraft:golden_shovel" });
    event.remove({ output: "minecraft:diamond_shovel" });
    event.remove({ output: "minecraft:netherite_shovel" });

    // remove vanilla axes
    event.remove({ output: "minecraft:wooden_axe" });
    event.remove({ output: "minecraft:stone_axe" });
    event.remove({ output: "minecraft:iron_axe" });
    event.remove({ output: "minecraft:golden_axe" });
    event.remove({ output: "minecraft:diamond_axe" });
    event.remove({ output: "minecraft:netherite_axe" });

    // remove vanilla hoes
    event.remove({ output: "minecraft:wooden_hoe" });
    event.remove({ output: "minecraft:stone_hoe" });
    event.remove({ output: "minecraft:iron_hoe" });
    event.remove({ output: "minecraft:golden_hoe" });
    event.remove({ output: "minecraft:diamond_hoe" });
    event.remove({ output: "minecraft:netherite_hoe" });

    // remove vanilla swords
    event.remove({ output: "minecraft:wooden_sword" });
    event.remove({ output: "minecraft:stone_sword" });
    event.remove({ output: "minecraft:iron_sword" });
    event.remove({ output: "minecraft:golden_sword" });
    event.remove({ output: "minecraft:diamond_sword" });
    event.remove({ output: "minecraft:netherite_sword" });

    event.remove({ output: "minecraft:crafting_table" });
    event.shaped(Item.of("minecraft:crafting_table", 1), ["ff", "ww"], {
        f: "minecraft:flint",
        w: "#minecraft:logs",
    });

    event.remove({ output: "farmersdelight:rope" });
    event.shapeless(Item.of("farmersdelight:rope", 1), [
        "2x farmersdelight:straw",
    ]);

    event.remove({ output: "#farmersdelight:tools/knives" });

    event.shapeless(Item.of("minecraft:flint", 1), ["3x minecraft:gravel"]);

    event.remove({ output: "#minecraft:beds" });
    event.remove({
        output: "#minecraft:wool_carpets",
        input: "#minecraft:wool",
    });

    function carpet(output, wool) {
        event.shapeless(output, [`2x ${wool}`]);
    }

    function bed(output, carpet) {
        event.shaped(output, ["ccc", "lll", "fmf"], {
            c: carpet,
            l: "#minecraft:logs",
            f: "#minecraft:wooden_fences",
            m: "#forge:tools/mallets",
        });
    }

    carpet("minecraft:white_carpet", "minecraft:white_wool");
    carpet("minecraft:light_gray_carpet", "minecraft:light_gray_wool");
    carpet("minecraft:gray_carpet", "minecraft:gray_wool");
    carpet("minecraft:black_carpet", "minecraft:black_wool");
    carpet("minecraft:brown_carpet", "minecraft:brown_wool");
    carpet("minecraft:red_carpet", "minecraft:red_wool");
    carpet("minecraft:orange_carpet", "minecraft:orange_wool");
    carpet("minecraft:yellow_carpet", "minecraft:yellow_wool");
    carpet("minecraft:lime_carpet", "minecraft:lime_wool");
    carpet("minecraft:green_carpet", "minecraft:green_wool");
    carpet("minecraft:cyan_carpet", "minecraft:cyan_wool");
    carpet("minecraft:light_blue_carpet", "minecraft:light_blue_wool");
    carpet("minecraft:blue_carpet", "minecraft:blue_wool");
    carpet("minecraft:purple_carpet", "minecraft:purple_wool");
    carpet("minecraft:magenta_carpet", "minecraft:magenta_wool");
    carpet("minecraft:pink_carpet", "minecraft:pink_wool");

    bed("minecraft:white_bed", "minecraft:white_carpet");
    bed("minecraft:light_gray_bed", "minecraft:light_gray_carpet");
    bed("minecraft:gray_bed", "minecraft:gray_carpet");
    bed("minecraft:black_bed", "minecraft:black_carpet");
    bed("minecraft:brown_bed", "minecraft:brown_carpet");
    bed("minecraft:red_bed", "minecraft:red_carpet");
    bed("minecraft:orange_bed", "minecraft:orange_carpet");
    bed("minecraft:yellow_bed", "minecraft:yellow_carpet");
    bed("minecraft:lime_bed", "minecraft:lime_carpet");
    bed("minecraft:green_bed", "minecraft:green_carpet");
    bed("minecraft:cyan_bed", "minecraft:cyan_carpet");
    bed("minecraft:light_blue_bed", "minecraft:light_blue_carpet");
    bed("minecraft:blue_bed", "minecraft:blue_carpet");
    bed("minecraft:purple_bed", "minecraft:purple_carpet");
    bed("minecraft:magenta_bed", "minecraft:magenta_carpet");
    bed("minecraft:pink_bed", "minecraft:pink_carpet");

    function barrel(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:barrel`, { woodType: wood.woodType }),
            ["lsl", "pfp", "lsl"],
            {
                l: `#minecraft:${wood.logType}`,
                s: `minecraft:${wood.woodType}_slab`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    function limitedBarrel1(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:limited_barrel_1`, {
                woodType: wood.woodType,
            }),
            ["lsl", "pfp", "lpl"],
            {
                l: `#minecraft:${wood.logType}`,
                s: `minecraft:${wood.woodType}_slab`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    function limitedBarrel2(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:limited_barrel_2`, {
                woodType: wood.woodType,
            }),
            ["lpl", "sfs", "lpl"],
            {
                l: `#minecraft:${wood.logType}`,
                s: `minecraft:${wood.woodType}_slab`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    function limitedBarrel3(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:limited_barrel_3`, {
                woodType: wood.woodType,
            }),
            ["lsl", "lfl", "sps"],
            {
                l: `#minecraft:${wood.logType}`,
                s: `minecraft:${wood.woodType}_slab`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    function limitedBarrel4(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:limited_barrel_4`, {
                woodType: wood.woodType,
            }),
            ["sls", "lfl", "sls"],
            {
                l: `#minecraft:${wood.logType}`,
                s: `minecraft:${wood.woodType}_slab`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    function chest(wood) {
        event.shaped(
            Item.of(`sophisticatedstorage:chest`, { woodType: wood.woodType }),
            ["lpl", "pfp", "lpl"],
            {
                l: `#minecraft:${wood.logType}`,
                p: `minecraft:${wood.woodType}_planks`,
                f: "minecraft:flint",
            }
        );
    }

    event.remove({ output: "minecraft:barrel" });
    event.remove({ output: "sophisticatedstorage:barrel" });
    event.remove({ output: "sophisticatedstorage:limited_barrel_1" });
    event.remove({ output: "sophisticatedstorage:limited_barrel_2" });
    event.remove({ output: "sophisticatedstorage:limited_barrel_3" });
    event.remove({ output: "sophisticatedstorage:limited_barrel_4" });

    event.remove({ output: "minecraft:chest" });
    event.remove({ output: "sophisticatedstorage:chest" });

    event.shapeless(
        Item.of("sophisticatedstorage:chest", { woodType: "oak" }),
        "minecraft:chest"
    );

    woodTypes.forEach((woodObj) => {
        barrel(woodObj);

        limitedBarrel1(woodObj);
        limitedBarrel2(woodObj);
        limitedBarrel3(woodObj);
        limitedBarrel4(woodObj);

        chest(woodObj);
    }, this);

    event.replaceInput(
        { output: "minecraft:blast_furnace" },
        "minecraft:iron_ingot",
        "#forge:plates/iron"
    );

    event.replaceInput(
        { output: "gtceu:lp_steam_solid_boiler" },
        "minecraft:furnace",
        "minecraft:blast_furnace"
    );

    event.replaceInput(
        { output: "gtceu:hp_steam_solid_boiler" },
        "minecraft:furnace",
        "minecraft:blast_furnace"
    );

    event.replaceInput(
        { output: "gtceu:lp_steam_furnace" },
        "minecraft:furnace",
        "minecraft:blast_furnace"
    );

    event.replaceInput(
        { output: "gtceu:lp_steam_alloy_smelter" },
        "minecraft:furnace",
        "minecraft:blast_furnace"
    );
});
