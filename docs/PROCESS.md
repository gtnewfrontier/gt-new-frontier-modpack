# Working process

Two kinds of session, one per Claude Code session, each startable cold.

| | Design session | Build session |
|---|---|---|
| Trigger | `/design` | `/task <NN>` |
| Input | one open question from `docs/design/BACKLOG.md` | one file in `docs/tasks/` |
| Output | a decision record in `docs/design/`, plus new task files | code, config, quests — committed |
| Who decides | **you** | Claude, inside the task's stated scope |

**Rule: design before build, one mechanic at a time.** Phases 0–3 (foundation,
packwiz, cleanup, rebaseline) are pure maintenance and are already fully specified.
Everything after that is game design and gets designed first — no build task exists
until a decision record says what it's building.

## Design sessions

Claude drives, you decide. The loop, per question:

1. **Frame it.** Claude states the question, why it's next, and what already constrains
   it — what's installed, what the pack already does, what earlier decisions locked in.
2. **Options.** 2–3 concrete options, each with what it costs to build, how it plays,
   and how it fails. Claude recommends one and says why. No exhaustive surveys.
3. **You decide.** Including "neither, here's what I want instead."
4. **Record it.** Claude writes `docs/design/NN-<slug>.md` using the template below and
   appends the question's outcome to the backlog.
5. **Spawn tasks.** The decision becomes 1–3 build task files in `docs/tasks/`,
   numbered from the current end, and added to `docs/ROADMAP.md`.

One question per session. If a question splits, the new questions go on the backlog
rather than being answered on the spot.

### Decision record template

```markdown
# NN — <mechanic>

**Decided:** YYYY-MM-DD
**Status:** decided | revisited | superseded by NN

## Question
One paragraph: what had to be decided and why it mattered.

## Decision
What we do. Specific enough to build from.

## Why
The reasoning that actually drove it.

## Rejected
- **<option>** — why not.

## Consequences
What this locks in, what it costs, what it makes harder later.

## Tasks
- `docs/tasks/NN-<slug>.md`
```

Decision records are append-only history. Changing your mind writes a new record that
supersedes the old one — never edit a decided record in place.

## Build sessions

One task, one session, one commit (or a few small ones). A build session must be able
to start from nothing: `/task 07` loads `CLAUDE.md`, `docs/ROADMAP.md`, and the task
file, and that has to be enough.

Task files therefore state, always:

- **Status** and **Depends on**
- **Goal** — one sentence
- **Why** — so the session can judge edge cases the task didn't foresee
- **Steps** — concrete, with real paths and commands
- **Done when** — checkable, not "looks right"
- **Notes / risks** — traps that aren't obvious from the tree

If a task turns out to need a decision, **stop and put the question on the backlog**
rather than deciding it mid-build. That's the whole point of splitting the two session
types.

## Ending a session

Whatever kind, end by leaving the repo self-explanatory for a cold start:

1. Commit the work.
2. Tick the box in `docs/ROADMAP.md` (the roadmap is the authoritative status; a task
   file's `Status:` line is just local detail).
3. Add one row to the roadmap's status log: date, task, commit, and anything the next
   session would otherwise have to rediscover.
4. If you learned something structural about the pack, put it in `docs/ANALYSIS.md` or
   the relevant file in `docs/reference/` — not in the commit message.
