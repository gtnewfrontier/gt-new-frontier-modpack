---
description: Run one game-design decision session from the backlog
argument-hint: "<backlog number or topic> (omit for the next open question)"
---

You are running a **design session**. Read `docs/PROCESS.md` for the loop and the
decision-record template.

The question is `$1`; if empty, take the first `open` row in `docs/design/BACKLOG.md`.

1. Read `docs/VISION.md`, `docs/design/BACKLOG.md`, and every existing record in
   `docs/design/` — earlier decisions constrain this one.
2. Research what the pack can actually support before proposing anything: what's in
   `mods/`, what the relevant KubeJS scripts and configs already do, what the mod in
   question actually ships on 1.20.1 Forge. Verify, don't assume.
3. Frame the question in a few sentences: what's being decided, what already constrains
   it, what breaks if it's decided badly.
4. Offer **2–3 concrete options**. For each: how it plays, what it costs to build, how
   it fails. Recommend one and say why. No exhaustive surveys, no fence-sitting.
5. **Wait for the decision.** The user decides, including "neither". Ask follow-up
   questions one at a time if the answer is ambiguous.
6. Write `docs/design/NN-<slug>.md` from the template, update the backlog row to
   `decided`, and add any new questions the discussion surfaced as new backlog rows.
7. Spawn the build tasks: 1–3 files in `docs/tasks/`, numbered from the current end,
   each self-contained per `docs/PROCESS.md`, and add them to `docs/ROADMAP.md`.
8. Commit. Do not start building — that's a separate `/task` session.
