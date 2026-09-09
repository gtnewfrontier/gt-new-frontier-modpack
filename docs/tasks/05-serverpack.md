# 05 — Server pack

**Status:** done
**Depends on:** 03

## Goal

`serverpack/start.sh` and `serverpack/start.ps1` stand up a server from a pinned pack
tag with no manual mod copying.

## Why

The pack has never had a server story. The vision is dimension/boss progression, which
people will want to play together.

## Steps

1. Adapt `../GregTech-Modern-Community-Pack/serverpack/start.{sh,ps1}`. They:
   - check for Java 17
   - download and run the Forge installer for a pinned version
   - manually fetch mods that forbid CurseForge distribution (FindMe, in upstream's case)
   - fetch `packwiz-installer-bootstrap.jar`
   - run it with `-s server` against a **tagged** `pack.toml` URL
   - launch with the Forge unix/win args

2. Point the pack URL at our repo and a release tag, not `main`:
   `https://raw.githubusercontent.com/gtnewfrontier/gt-new-frontier-modpack/refs/tags/<tag>/pack.toml`

3. Mark client-only mods `side = "client"` in their `.pw.toml` so the server install
   skips them. Our 122 added mods include many client-only ones (Embeddium, Oculus,
   shaders, EMI/JEI extras, CraftPresence, sound and animation mods). Getting this wrong
   crashes the server, so work through `mods/` deliberately.

4. Write `serverpack/README.md` with Windows and *nix instructions.

## Done when

- A clean directory + `start.sh` yields a running server on the current pack tag.
- No client-only mod ends up in the server's `mods/`.

## Notes

Test with the two gun mods and the shader stack present — those are the likeliest
server-crashers.
