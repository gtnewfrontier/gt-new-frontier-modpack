StartupEvents.registry("block", (event) => {
    //Courtesy of DancingSnow on the GTCEUm Discord

    function capitalize(s) {
        return String(s[0]).toUpperCase() + String(s).slice(1);
    }

    /**
     * register a marker block
     *
     * @param dim {string} dimension_location
     */
    const marker = (dim, displayName) => {
        const [namespace, path] = dim.split(":", 2);
        if (!displayName) {
            displayName = `${capitalize(namespace)} ${capitalize(path)}`;
        }
        event
            .create(`${namespace}_${path}_marker`)
            .displayName(displayName)
            .texture("up", `kubejs:block/dim_marker/${namespace}/${path}/up`)
            .texture(
                "down",
                `kubejs:block/dim_marker/${namespace}/${path}/down`
            )
            .texture(
                "north",
                `kubejs:block/dim_marker/${namespace}/${path}/north`
            )
            .texture(
                "south",
                `kubejs:block/dim_marker/${namespace}/${path}/south`
            )
            .texture(
                "east",
                `kubejs:block/dim_marker/${namespace}/${path}/east`
            )
            .texture(
                "west",
                `kubejs:block/dim_marker/${namespace}/${path}/west`
            )
            .texture("particle", "#north")
            .stoneSoundType()
            .requiresTool(true)
            .tagBlock("minecraft:mineable/pickaxe")
            .hardness(1.2);
    };

    marker("twilightforest:twilight_forest", "Twilight Forest");
});
