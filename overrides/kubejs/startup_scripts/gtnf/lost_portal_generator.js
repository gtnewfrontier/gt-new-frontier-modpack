StartupEvents.registry("block", (event) => {
    event
        .create("gtnf:lost_portal_generator")
        .displayName("Lost Portal Generator")
        .textureAll('kubejs:block/example_block')
        .requiresTool(true)
        .tagBlock("forge:mineable/wrench")
        .tagBlock("minecraft:needs_iron_tool");
});
