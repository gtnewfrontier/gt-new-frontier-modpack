ServerEvents.recipes((event) => {
    event.remove({ output: "constructionwand:core_angel" });
    event.remove({ output: "constructionwand:core_destruction" });

    event.remove({ output: "constructionwand:stone_wand" });
    event.remove({ output: "constructionwand:iron_wand" });
    event.remove({ output: "constructionwand:diamond_wand" });
    event.remove({ output: "constructionwand:infinity_wand" });

    event.shaped("constructionwand:stone_wand", [" FP", " SH", "S  "], {
        F: "#forge:tools/files",
        P: "gtceu:double_iron_plate",
        S: "#forge:rods/wooden",
        H: "#forge:tools/hammers",
    });

    event.shaped("constructionwand:iron_wand", [" FP", " SH", "S  "], {
        F: "#forge:tools/files",
        P: "gtceu:double_steel_plate",
        S: "#forge:rods/wooden",
        H: "#forge:tools/hammers",
    });

    event.shaped("constructionwand:diamond_wand", [" FP", " SH", "S  "], {
        F: "#forge:tools/files",
        P: "gtceu:double_aluminium_plate",
        S: "#forge:rods/wooden",
        H: "#forge:tools/hammers",
    });
});
