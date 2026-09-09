StartupEvents.registry("block", (event) => {
    event
        .create("gtnf:lost_portal_generator")
        .displayName("Lost Portal Generator")
        .textureAll('gtnf:block/lost_portal_generator')
        .requiresTool(true)
        .tagBlock("forge:mineable/wrench")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_iron_tool");
});
