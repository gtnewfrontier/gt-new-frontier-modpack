# 04 — Export CI

**Status:** not started
**Depends on:** 03

## Goal

Every push builds a CurseForge-importable zip as a GitHub Actions artifact.

## Why

Replaces hand-maintaining `modlist.html` and hand-zipping releases; also proves the
pack definition is valid on every commit.

## Steps

1. Copy the shape of `../GregTech-Modern-Community-Pack/.github/workflows/build.yaml`
   into `.github/workflows/build.yml`, with current action versions:

   - `actions/checkout@v4`
   - `actions/setup-go@v5`
   - `go install github.com/packwiz/packwiz@latest`
   - `packwiz curseforge export`
   - `actions/upload-artifact@v4` (upstream still uses the deprecated v3)

2. Trigger on `push` and `workflow_dispatch`.

3. Push, confirm the artifact downloads and imports into a launcher.

## Done when

- Workflow green on the default branch.
- The artifact zip imports into CurseForge/Prism and produces a playable instance.
