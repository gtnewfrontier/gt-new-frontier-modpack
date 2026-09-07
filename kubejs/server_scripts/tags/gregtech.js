ServerEvents.tags("item", (event) => {
  event.add("forge:rods/long/hsla", "kubejs:hsla_steel_long_rod");
  event.add("forge:springs/hsla", "kubejs:hsla_steel_spring");
});

ServerEvents.tags("block", (event) => {
  // Cleanroom walls accept FramedBlocks' doors.
  event.add("gtceu:cleanroom_doors", "framedblocks:framed_door");
  event.add("gtceu:cleanroom_doors", "framedblocks:framed_iron_door");
});
