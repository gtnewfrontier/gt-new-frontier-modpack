# GregTech: New Frontier — server pack

`start.sh` (Linux/macOS) and `start.ps1` (Windows) install and launch a server from a
tagged release of this repo. They fetch Forge, the mods, and the pack's configs, then
run the server. Re-running either script updates the server to the pinned tag.

Requirements: **Java 17** and either `curl` or `wget` (`start.sh` only).

## Linux / macOS

```sh
mkdir gtnf-server && cd gtnf-server
curl -OL https://raw.githubusercontent.com/gtnewfrontier/gt-new-frontier-modpack/main/serverpack/start.sh
chmod +x start.sh
./start.sh
```

The first run stops after the mods are installed so you can accept the EULA. Put
`eula=true` in `eula.txt` (this means you accept https://aka.ms/MinecraftEULA), then
run `./start.sh` again.

## Windows

Needs PowerShell 5.1 (shipped with Windows) or newer.

```ps1
mkdir gtnf-server; cd gtnf-server
Invoke-WebRequest -Uri https://raw.githubusercontent.com/gtnewfrontier/gt-new-frontier-modpack/main/serverpack/start.ps1 -OutFile start.ps1
Unblock-File -Path start.ps1
.\start.ps1
```

`Unblock-File` is needed because Windows blocks downloaded scripts. Same EULA step as
above on the first run.

## Choosing a version

Both scripts default to the release tag in `PACK_TAG`. To install a different one:

```sh
PACK_TAG=v0.6.0 ./start.sh
```
```ps1
$env:PACK_TAG = "v0.6.0"; .\start.ps1
```

`PACK_URI` overrides the whole `pack.toml` URL — useful for testing an untagged commit
or a local `packwiz serve`:

```sh
PACK_URI=http://localhost:8080/pack.toml ./start.sh
```

## Notes

- Client-only mods (Embeddium, Oculus, shaders, HUD and sound mods) are marked
  `side = "client"` in `mods/*.pw.toml` and are never installed on the server. If you
  add a mod, set its side or the server will try to load it.
- FindMe and Structory forbid third-party distribution, so the CurseForge API refuses
  to hand them to packwiz. The scripts download those two straight from the CDN before
  packwiz runs; if another mod ever joins them, packwiz-installer will name it in an
  error and it needs adding to `MANUAL_JARS` in both scripts.
- The unpacked shaderpack folders under `shaderpacks/` are plain files rather than
  packwiz metafiles, so they have no side and still land on the server. Harmless, just
  a few MB of wasted download.
- Bumping `FORGE_VERSION` in the scripts must stay in step with `[versions] forge` in
  `pack.toml`.
