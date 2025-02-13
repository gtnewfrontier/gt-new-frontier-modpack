GTCEuStartupEvents.registry("gtceu:dimension_marker", (event) => {
    //Courtesy of DancingSnow on the GTCEUm Discord

    /**
     * register dimension marker
     *
     * @param dim {string}
     * @param tier {number}
     */
    const marker = (dim, tier) => {
        const [namespace, path] = dim.split(":", 2);
        console.log(Item.getItem(`kubejs:${namespace}_${path}_marker`));
        event
            .create(dim)
            .tier(tier)
            .iconSupplier(() =>
                Item.getItem(`kubejs:${namespace}_${path}_marker`)
            );
    };
});
