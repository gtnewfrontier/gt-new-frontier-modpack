# GregTech: New Frontier — working notes

Expert GregTech pack for Minecraft 1.20.1 / Forge, built on **GTCEu Modern**.
Hard fork of [GregTech-Modern-Community-Pack](https://github.com/GregTechCEu/GregTech-Modern-Community-Pack)
(fork point: upstream `519a656`, 2024-12-22, upstream v1.12.1). A reference clone lives
at `../GregTech-Modern-Community-Pack` — read it, don't merge it.

## Starting a session

Every session is one task or one design question, started cold:

- `/task <NN>` — build session. Runs `docs/tasks/NN-*.md`. Omit the number for the first
  unchecked box in `docs/ROADMAP.md`.
- `/design [NN]` — design session. Takes the next open question from
  `docs/design/BACKLOG.md`. Claude frames options and recommends; **you decide**; the
  decision is recorded in `docs/design/` and becomes build tasks.

`docs/PROCESS.md` defines both loops and the task/decision templates. Design before
build: past phase 3, no task exists until a decision record justifies it. If a build
session hits an undecided question, it stops and adds it to the backlog.

Also read: `docs/ROADMAP.md` (what's next, authoritative status), `docs/ANALYSIS.md`
(what's broken and why), `docs/VISION.md` (what the pack is for).

## Layout

| Path | What |
|---|---|
| `pack.toml`, `index.toml`, `mods/*.pw.toml` | packwiz pack definition (from task 03) |
| `config/` | mod configs shipped with the pack |
| `defaultconfigs/` | per-world defaults (FTB mods) |
| `kubejs/` | all recipe / machine / content scripting |
| `shaderpacks/` | shipped Complementary + Euphoria Patches |
| `docs/` | process, roadmap, analysis, task files, design records, reference |
| `.claude/commands/` | `/task` and `/design` session triggers |

`manifest.json` and `modlist.html` are not tracked — packwiz generates both into the
exported CurseForge zip. `.packwizignore` keeps `docs/`, `.claude/` and the repo
metadata out of the shipped pack.

## Rules

1. **LF line endings, always.** The pack was once committed wholesale as CRLF, which
   made every upstream diff 100% noise. `.gitattributes` (task 01) enforces it.
2. **No script may reference a mod the pack doesn't ship.** This is the single biggest
   source of existing defects. Check `mods/` before writing `somemod:some_item`, and run
   the namespace grep in `docs/tasks/07-remove-dead-mod-code.md` after touching scripts.
3. **Every deliberate config change goes in `docs/reference/config-deltas.md`.** Mod
   updates rewrite config files and drop unknown keys silently — that file is the only
   durable record of intent. An unrecorded config edit will eventually be lost.
4. **Don't commit machine-specific settings** — early-window size in `fml.toml`,
   voicechat caches, personal keybinds.
5. **Quest files are FTB Quests SNBT**: tab-indented, 16-hex-char ids. Prefer editing in
   game and committing the result. Changing a quest id resets player progress.
6. **Upstream is a reference, not a remote.** Cherry-pick deliberately —
   `docs/reference/upstream.md`.
7. Commit style follows existing history: `feat:`, `fix:`, `docs:`, `chore:`.
8. **Never close a Minecraft instance you didn't launch.** Other clients — another pack,
   a separate session, a running server — may be up on this machine. Only stop the client
   this session started, identified by its PID or by the `.minecraft` game directory under
   this repo; if that wasn't recorded, ask before killing anything. Never blanket-kill by
   name (`java*`, `javaw`, "Minecraft"). When a test needs a client, say up front which
   one you're launching and which one you'll close.

## Verifying a change

- Pack integrity: `packwiz refresh` runs clean.
- Scripts/quests: boot the client, then check `logs/kubejs/startup.log`,
  `logs/kubejs/server.log` and `latest.log` for `ERROR`. **A clean boot means zero
  KubeJS errors, not "the game started"** — KubeJS reports missing items as errors and
  then carries on.
- Multiblocks: a wrong pattern is silently unformable, not an error. Build it in game.
- `/kubejs reload` picks up server-script edits; startup scripts need a restart.

## Tooling

Go >= 1.19 with `go install github.com/packwiz/packwiz@latest`, Java 17, and a launcher
that reads packwiz (Prism via packwiz-installer) or imports the exported CurseForge zip.
