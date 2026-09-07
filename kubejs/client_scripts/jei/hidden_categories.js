// JEI-only: EMI has no equivalent binding, and category removal has no tag form the way
// `c:hidden_from_recipe_viewers` does for items (see server_scripts/tags/hidden.js).
JEIEvents.removeCategories((event) => {
  // AE2's crystal growth: `removals.js` deletes every `ae2:transform/*` recipe, so the
  // category is real but empty in this pack.
  event.remove("ae2:certus_growth");
});
