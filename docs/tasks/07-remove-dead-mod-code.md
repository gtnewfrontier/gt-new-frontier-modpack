# 07 — Remove dead mod code

**Status:** done (`dacd842`)

## Goal

No script, config, or asset in the pack refers to a mod the pack doesn't ship.

## Why

We dropped 19 of upstream's mods but kept their support files. KubeJS logs an error for
every one on each load, and the noise hides real errors during the rebaseline.

## Delete

| Path | Missing mod |
|---|---|
| `kubejs/server_scripts/building/architects_palette.js` | Architect's Palette |
| `kubejs/server_scripts/appliedenergistics2/extendedae2.js` | Extended AE (`expatternprovider`) |
| `kubejs/server_scripts/building/building_gadgets.js` | Building Gadgets |
| `config/inventoryprofilesnext/` | Inventory Profiles Next |
| `config/invtweaks-client.toml` | (superseded by Inventory Tweaks ReFoxed's own config — check which one the installed mod actually reads before deleting) |

## Edit

- `kubejs/server_scripts/appliedenergistics2/ae2.js` — remove the 8 `mae2:` references (Modern AE2 Additions).
- `kubejs/server_scripts/tags/ae2.js` and `tags/items.js` — drop any `expatternprovider:` / `mae2:` entries.

## Verify

```sh
# every mod namespace used by scripts
grep -rhoE '"[a-z0-9_]+:[a-z0-9_/.]+"' kubejs/server_scripts kubejs/startup_scripts \
  | tr -d '"' | cut -d: -f1 | sort -u
```

Cross-check each namespace against `mods/`. Known-good namespaces that do not match
their slug: `expatternprovider` = Extended AE, `mae2` = Modern AE2 Additions,
`jeg` = Just Enough Guns, `xtonesreworked` = Xtones Reworked, `factory_blocks`,
`miners_delight`, `hangglider`, `gtnf` (ours).

## Done when

- The grep above lists only namespaces present in `mods/` (plus `minecraft`, `forge`, `gtceu`, `kubejs`, `gtnf`).
- Client boots with no "unknown item" KubeJS errors from these files.

## Notes

If a script is worth keeping for a mod we might re-add (Architect's Palette has 486
lines of GT-gated recipes), move it to `docs/attic/` rather than deleting — but only if
the mod is a re-add candidate for the mod audit (design backlog #4). Default is delete;
git remembers.
