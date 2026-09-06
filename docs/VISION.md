# Vision

GregTech: New Frontier is an expert GregTech marathon **where the tech tree is the
weapon**. Progress is gated by dimensions; dimensions are gated by bosses; bosses are
beaten with better GregTech, not better swords.

## The loop

```
GT voltage tier  ->  build the portal generator  ->  enter the dimension
                                                          |
        new ore veins + materials  <-  kill its boss  <-  survive it
                     |
              next voltage tier
```

Each dimension is a hard gate, not an optional side area:

- It costs GT infrastructure to open (a portal generator built on the assembly line of the matching tier).
- It is hostile beyond the current tier's gear, so it demands GT-made combat kit.
- Its boss drops a key material or unlock that the next tier's progression needs.
- Its ore veins carry the ores you can no longer get at home.

That is the shape already half-built in the pack: `gtnf:twilight_portal_generator`
and `gtnf:lost_portal_generator` exist, Twilight Forest has custom GT ore veins and a
worldgen layer, and four ore veins were removed from the overworld. Nothing gates or
explains any of it yet.

## What this means for design decisions

**Keep** anything that makes combat a tech problem: GT-craftable weapons and armour,
the gun mods (if they can be tiered against GT materials), dimension mods with real
bosses, mob mods that raise the floor of danger.

**Cut** anything that trivialises the loop: creative-adjacent tools, cheap teleport or
storage escapes that skip infrastructure, mods whose only content is decorative when
we already ship three decoration mods.

**Question** anything that is neither: 122 added mods is a large maintenance surface
for a two-person pack. Every mod should answer "which part of the loop does this
serve?"

## Non-goals

- Not a GTNH clone. We stay inside GTCEu Modern's tech tree (ULV through UV, plus
  whatever GT 8 ships); we do not invent a UHV+ tier.
- Not a kitchen-sink pack. Added mods serve exploration, combat, or GT logistics.
- Not multiplayer-first, but nothing may be client-only-by-accident: everything ships
  in a server pack too.

## Open questions

These are the first entries in `docs/design/BACKLOG.md`. They get decided one at a time
in `/design` sessions, and not before:

- Which dimensions, in what order, at which voltage tiers?
- Which boss belongs to each dimension, and does it come from an installed mod or need a new one?
- What does a boss actually unlock — a material, a recipe, a quest chapter, a portal?
- How does GT-made combat gear scale so each dimension is beatable but not trivial?
