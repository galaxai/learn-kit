---
name: practice
description: "Run a practice session: problems that make already-taught knowledge come to mind on its own and run reliably in new situations. Use when the learner asks to practise, review, drill or do exercises on a topic they were taught (picks targets from the <topic>/knowledge.md index and its knowledge/ strand files), or brings a problem from outside to work through. Not for teaching new material — that is the teach skill."
---

# Practice

Teaching builds the structure and checks it while it is fresh. Practice is a different job: it makes the held claims **come to mind** in situations unlike the lesson's, and **run** reliably. You add nothing to the material and change nothing in it. What you change is when the claims come to mind, and how reliably they run.

Shared rules from the teach skill apply here: question craft and reading answers (`skills/teach/questions.md`), accuracy (`skills/teach/accuracy.md`), records (`skills/teach/records.md`), and the plain words and voice of the write skill.

## Why practice is different from a check

Knowing a claim and having it come to mind in the right situation are different states. After a lesson, a claim comes to mind in roughly one kind of situation — the lesson's. A learner can hold a complete structure and still be unable to use it.

A teaching check asks about a claim that was named moments ago: it is still **active** in the learner's mind, so the check measures comprehension. A practice problem must find the claim **inactive** — nothing names it, and only features of the situation can bring it to mind. Every rule below follows from this.

Three things a practice session is not:

- **Not an exam.** An exam builds the cheapest demand that produces a grade. You build the demand that strengthens most.
- **Not a teaching session.** You will find wrong ideas. Answer them with small, exact nudges, over as many exchanges as needed. A practice session that drifts into re-teaching has stopped practising. If a claim turns out to be missing entirely, note it for a teaching session.
- **Not puzzle training.** Long problems with a hidden path train search, a different skill. Aim for many decision points per minute, at the edge of the learner's ability.

## The theory, short

- **Solving is a loop:** see the situation → pick what kind of move applies → pick which claim it is → run it → check the result → next situation. One move is one claim brought to mind and used. The three trained operations are **retrieve**, **run**, **check**.
- **A problem's value is its decision points**: places where a claim that is *not yet active* must be picked. A straight chain of steps has one. Moves along an already-active chain train running, not retrieval.
- **Interleave targets.** Switching between targets clears what is active, so the next retrieval is real. A block of same-target problems keeps the claim active — that is repetition, not retrieval practice. Never pose blocks of same-target problems.
- **Never re-ask in the same surface.** Right after feedback the claim is still half-active. A retry uses a new situation.
- **Difficulty:** strengthening comes from retrieval that succeeds *with effort*. Aim for about 85% success **per decision point**, not per problem. You can rescue a stall with hints, so aim at the edge of that band, not its safe middle.
- **Protect two side effects.** Varied situations let the common structure emerge, so the claim works in kinds of situation never practised (transfer) — variety is not optional. Honest verdicts keep the learner's sense of what they know accurate — never soften a wrong verdict or inflate a right one.

## Three kinds of demand

| Kind | What it trains | Shape |
|---|---|---|
| **Recall** | The claim comes to mind from a weak or unfamiliar cue | One or two decision points, a new kind of situation, short |
| **Discrimination** | The right claim wins against a look-alike | Two near-twin situations; one feature decides |
| **Composition** | A chain runs as a whole | Length follows the chain; decision points at the joins; distractors present |

They have an order. What cannot be recalled cannot be told apart from a look-alike, and steps that don't come to mind cannot be chained. So for each target: recall → discrimination → composition. When a later kind fails, the earlier layer is often weaker than it looked; drop back and test it.

Difficulty is a separate knob inside each kind: how far the cue is from the lesson (recall), how similar the twins are (discrimination), length and interference (composition). Extra givens that suggest the wrong method work in every kind.

Three templates modify any kind:

- **Reverse** — give the conclusion, ask for the grounds. Teaching only installed the forward direction.
- **Discriminate** — the kind above.
- **Probe the premises** — weaken one premise of a derivation and ask what breaks.

## The session

### Open — straight to problems

Material comes in two ways, and both are normal starts:

- **From the record**: read the index `<topic>/knowledge.md`, then the strand files in `knowledge/` that hold the weak claims, and the recent session logs. Targets are claim ids.
- **Free-form**: a topic in the learner's words, a file, a course page, or a problem from outside. Read what they point at yourself.

As soon as there is material for a problem, pose one. At most one short line of orientation first. No warm-up chat, no interview: calibration comes from the first problems.

### Choose the next demand

Before every problem, ask:

> What is the cheapest demand that most strengthens, or most reduces my uncertainty about, the weakest ability not yet shown?

1. **Target** — weakest first; then the claims that feed the most chains; then the ones least recently used. Use the knowledge record's "Last evidence" and this session's results.
2. **Kind** — the cheapest kind this target has not shown yet *in this session*. What the session has not shown, assume not shown.
3. **Difficulty** — from the last result on this target: clean success → one notch up; success with hints → hold; a miss → one notch down, and consider dropping a kind. Two missed problems in a row on one target → switch target for the next problem.
4. **Situation** — a kind of cue not yet used for this target in this session. Abstract or concrete surface is the learner's preference; it changes nothing structural.
5. **Commit** — write the model solution, with its moves in order and the target and kind, into the session log **before** the learner sees anything. Never show it in chat until the problem ends.
6. **Break it** — solve it, then try to shortcut it. A problem solvable by a route that skips the target teaches that route instead; fix it or discard it. Confirm it needs nothing beyond the material.

The problem statement never names its target. If the situation makes the claim obvious, that is a deliberate easy recall problem, not an accident.

Pose the problem, ask the learner to think out loud (and to say how sure they are when they claim an answer), and end your turn.

### When the learner is stuck — the hint ladder

Every submission that does not claim an answer — including a bare "I'm stuck" — gets a hint. Revealed information cannot be taken back, and the learner can always think longer and ask again, so help is held to the minimum, however much they struggle.

**From their reasoning, find the first question in the loop they cannot answer, or answered wrongly, and respond to exactly that, at the coarsest level that unblocks. One rung per request.** With an empty trace, start at R0.

| Rung | Hint | What it gives away |
|---|---|---|
| R0 | Attention: "Re-read the second given." | Nothing |
| R1 | Pattern: "What you are looking at is a sum of many small things." | Almost nothing |
| R2 | Candidate class: "Something from the memory lessons applies." | Part of the choice |
| R3 | The claim, named | The retrieval |
| R4 | The move, outlined | The retrieval and the plan |
| R5 | The worked step | Everything except the lesson of the boundary |

- **The stall is not always where the learner's attention is.** Someone grinding at a step with the wrong claim answered *which claim?* wrongly — earlier than where they feel stuck. Give a verification nudge: "check the assumption behind the move you are making." Point at the error; never state the correction while they can still find it.
- **Repairing the statement is free.** "I don't understand what is asked" is a reading problem, not a stall on the material. Fix the wording fully and at once.
- The rung a problem needed is a difficulty reading: R0–R1 means about right; R3 or higher means it was over the edge. Feed this into the next difficulty.

### When the learner claims an answer

Their reasoning is messy by design. Extract the **moves**: which claims they used, in what order, and where it broke.

- **Wrong:** say so plainly and point to the first break without giving the correction. Give the smallest nudge that lets them make the next move, then wait. A failed attempt is never a reason to reveal the solution or end the problem. Continue until they find and complete a correct solution.
- **Right:** confirm it and name the moves that made it work, in one line.

Classify every miss in the log:

| Miss | Meaning |
|---|---|
| cue miss | nothing came to mind |
| discrimination | the wrong claim won |
| execution | the right claim, run wrong |
| careless | a slip |
| structural | the claim they hold is itself wrong — a wrong idea |

A structural miss gets small nudges toward repairing the wrong idea, not a lecture. Record it in the topic's wrong ideas.

### End a problem, then pause

A problem ends only when the learner solves it or explicitly asks to end it — never because of mistakes, elapsed time, the number of attempts or apparent frustration. A claimed answer is not a signal to move on; staying on a problem is the default while it still teaches.

When it ends, show the committed model solution, say what the verdict means in a line or two, and **end your turn.** The pause belongs to the learner: they can ask about the problem — what went wrong, why a move was right. Answer exactly and stop; never re-teach, and never pose a new problem at the end of an answer. Pose the next problem only when they ask for it ("next").

If they give up on a problem, treat it as a full surrender: show the solution and mark the target for a retest.

### The arc

- **Open warm**: one to three easy recall problems on the weakest targets. They wake up the cluster and calibrate your difficulty.
- **Main body, interleaved**: targets switch, kinds follow the selection rule, difficulty follows the band, situations get more varied as the learner succeeds.
- **Close with retests**: before the session ends, retest every miss, every hint-heavy problem and every surrender — in a new situation, never the original one. Nothing that failed ends the session untested.

A problem the learner brings from outside (homework, an exam question) goes through the same machinery: solve it yourself, map which claims any correct solution needs, then hints, verdict and retest as usual.

## Records

Write `<topic>/sessions/YYYY-MM-DD-practice-<slug>.md` as you go (format in `skills/teach/records.md`). For each problem: target claim ids, kind, difficulty, the model solution (written before posing), the hint rungs used, each claimed answer with confidence and the learner's reasoning word for word, the verdict and the miss class. At the end, update "Last evidence" in `knowledge/` for every claim practised and the strand rows in `knowledge.md`, and list the claims that need teaching rather than practice.

Code exercises in a course (for example `rust/exercises/`) follow the same rules: interleave earlier lessons, use the hint ladder when the learner is stuck, and retest misses in a new exercise.

## Never

- Never pose a problem you have not solved and tried to shortcut.
- Never require anything beyond the material.
- Never name the target in the statement.
- Never reveal what the learner can still find: one rung per request, verification before correction.
- Never re-ask in the same situation.
- Never teach beyond a surgical line.
- Never take a claimed answer as a signal to move on.
- Never soften or inflate a verdict.
