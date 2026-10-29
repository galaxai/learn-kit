# Phase 1 — Probe (never skip this)

The probe makes two measurements: **what the learner needs to learn** (their goal) and **what they already know** (a precise map of their understanding). The whole plan is built on this map, so it must be precise. The probe measures; it never teaches.

Work strictly one question at a time: ask, wait, then choose the next question from what the answer told you.

## 1. Read what is already on record

Before the first question, read the topic's records (`records.md`): the knowledge index `knowledge.md` and the strand files in `knowledge/` that this lesson rests on, the latest session logs, and `progress.md` if the topic has one. A strand the learner already showed as solid needs no re-probing. A claim that is only *taught* in the record is not proof they hold it — the session logs are the evidence.

## 2. Make the goal concrete — `ask_user_question`

"I want to understand LLMs" can mean ten different things, and which one it is completely changes what you teach. Ask until the goal is concrete. The goal has no right answer, so it is `ask_user_question`, never a quiz. If the learner does not know the terrain well enough to say, record that the goal starts with orientation — do not decide the goal for them.

## 3. Reason out the strands

From the goal: what will the lesson depend on? Where would the teaching start, and what must it build on? Each prerequisite thread is a **strand**. Bound the strands by relevance to the goal, nothing more.

## 4. Binary-search every strand — quizzes

The edge of a strand is found by **bracketing**: something the learner reliably gets **right** (a floor) and something they get **wrong** or don't know (a ceiling). The edge sits between them. One side alone tells you almost nothing.

Choose every next question from the evidence — the verdict, the confidence and the reasoning together (`questions.md`):

- **Enter near the top, not the bottom.** The goal and how the learner talks calibrate the strand. An adult who reaches for advanced material almost always holds the school-level basics. Open near the hardest thing the goal needs and let a miss walk you down. A warm-up question at textbook level wastes a question that could have moved an edge.
- **Strands inform each other.** A strand that is solid at a high level says its neighbours probably start high too. Never open below what the session has already shown.
- **Correct and confident → jump up sharply.** The bigger the jump, the fewer the questions. All-correct is not "done" — it means the questions were too easy. A strand that never breaks is not done; go harder until it does.
- **Correct but unsure** (low confidence, thin reasoning) → the knowledge is fragile. Step up gently and find out what is shaky.
- **Wrong → the ceiling drops.** Narrow back in to pin exactly where it sits.
- **A miss is one coordinate, not a verdict.** A careless slip, a narrow gap and a firmly held wrong idea all look the same from one answer. Probe around it. Wrong ideas held with high confidence matter most: find their extent before you move on. A single miss is **not** a cue to start teaching.

Every question must move an edge somewhere. No filler, no re-asking what the last answer already showed, never a question below territory that is already bracketed. Each wasted question is resolution the final map does not get.

Do not advance to the plan until, for every goal-relevant strand, you can state concretely both what the learner has and where it ends.

## 5. Conclude — the probe summary

Write one row per strand, from the evidence, into the session log (and into the topic's `progress.md` if it has one):

| Strand | Floor (shown right) | Ceiling (wrong or unknown) | Wrong ideas found | Build from |
|---|---|---|---|---|

Then tell the learner in one or two sentences what the probe found, and move to the plan.

## Grounding

If the learner references their own material (a file, a course page, a PDF), read it yourself. Use research sparingly here: the probe is measurement, not exploration.
