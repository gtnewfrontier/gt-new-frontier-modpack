ServerEvents.tags("block", (event) => {
  // Cleanroom walls accept FramedBlocks' doors.
  event.add("gtceu:cleanroom_doors", "framedblocks:framed_door");
  event.add("gtceu:cleanroom_doors", "framedblocks:framed_iron_door");
});
