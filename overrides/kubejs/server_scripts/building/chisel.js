ServerEvents.recipes((event) => {
    event.remove({ output: "chisel:chisel" });

    event.shaped("chisel:chisel", ["FP", "SH"], {
        F: "#forge:tools/files",
        H: "#forge:tools/hammers",
        P: "gtceu:double_iron_plate",
        S: "#forge:rods/wooden",
    });
});
