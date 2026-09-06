---
description: Run one numbered build task from docs/tasks/ in a fresh session
argument-hint: "<task number, e.g. 07> (omit for the first unchecked task)"
---

You are running a **build session**. Read `docs/PROCESS.md` for the rules.

1. Read `docs/ROADMAP.md`. The task to run is `$1`; if `$1` is empty, take the first
   unchecked box.
2. Read that file in `docs/tasks/`. Check its **Depends on** — if a dependency is still
   unchecked in the roadmap, stop and say so instead of proceeding.
3. Read whatever the task points at (`docs/reference/*`, upstream at
   `../GregTech-Modern-Community-Pack`). Do not read the whole repo.
4. Do the task. Stay inside its stated scope — anything else you notice goes in the
   roadmap status log or the backlog, not into this commit.
5. **If the task needs a decision that isn't already made** (a balance call, a mod
   choice, anything that shapes how the pack plays), stop, add the question to
   `docs/design/BACKLOG.md`, and report back. Do not decide it yourself.
6. Verify against the task's **Done when** list. Report what you actually ran and what
   it output — no claims without evidence.
7. Finish: commit, tick the roadmap box, add a status-log row (date, task, commit, what
   the next session needs to know).
