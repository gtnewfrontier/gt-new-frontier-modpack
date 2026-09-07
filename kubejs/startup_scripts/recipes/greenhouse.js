GTCEuStartupEvents.registry("gtceu:recipe_type", (event) => {
  event
    .create("greenhouse")
    .category("gtnf")
    .setEUIO("in")
    .setMaxIOSize(3, 4, 1, 0)
    .setProgressBar(GTGuiTextures.PROGRESS_ASSEMBLER)
    .setItemSlotsOverlay(IO.IN, 0, 2, GTGuiTextures.BOX_OVERLAY)
    .setItemSlotsOverlay(IO.OUT, 0, 3, GTGuiTextures.BOX_OVERLAY)
    .setSound(GTSoundEntries.COOLING);
});
