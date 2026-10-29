# Phase 2 — Plan (think hard here)

This is the highest-leverage step; don't rush it. With the learner's level and goal in hand, stop and reason out the best way to teach *this thing* to *this person*. Re-read the method in `SKILL.md` and plan against it.

## Build the minimal tree

- **Scope the field first.** Map the topic: its core concepts, the real first principles, standard framings, common gotchas. Where your picture of the field is less than clear, check it now with a researcher (`accuracy.md`). Planning is the natural moment for verification.
- **What are the unconditional truths this rests on?** Is there a clean atomic unit ("ALL X is done through {____}")?
- **Which of those does the learner already hold** (from the probe)? Build from there — not below it, not above it.
- **The plan is the minimal tree.** Nothing the learner already holds is re-taught. Nothing off the path to the goal is taught, however interesting — coverage is not the goal. The derivation to the goal is as short as the subject allows.
- **What is the motivated discovery path** from those truths to the goal? Where does each step come from — why would anyone reach for it?
- **Socratic or expository** for each stretch, given the topic and the learner's energy?

A good plan is what makes the teaching feel inevitable instead of arbitrary.

## The dependency map

The plan's backbone is a DAG (a graph with arrows and no loops): unconditional truths at the roots, each derived node hanging off what it depends on, the goal as the sink. An arrow `A --> B` means "A must be understood before B".

- **A map, not a syllabus.** Nodes are landmarks: the unconditional truths, the major stations, the goal. The *reasoning step* is the finer unit you teach in Phase 3; one node can take one step or five. Plan nodes do not map one-to-one to steps or to turns.
- **No size limit.** Use as many nodes as the subject genuinely needs. What keeps a map readable is correct structure, not compression: find the real foundations and hang everything off them. Labels stay short.
- **Give every node a stable slug** (`a-z`, `0-9`, `-`; for example `name-holds-pointer`). The session log tags every question with the node it is about, so the slug never changes once chosen.

**Stress-test the roots before presenting.** For every node you treat as foundational, ask: is this genuinely an unconditional truth *for this learner*, or a disguised theorem that derives from something simpler they would accept at face value? If it derives, push it down and extend the map. Never found the lesson on a mid-level fact. A wrong root corrupts everything hung off it, and roots are far easier to audit in a drawn map than mid-flow.

## Present the plan — always, before any teaching

Two parts, in chat:

1. **The approach, in prose.** What we'll cover, in what order, and why this way — given where the edge sits (the probe) and what the learner is reaching for. A few sentences.
2. **The map.** One fenced `mermaid` `graph TD` block, with the slugs as node ids and short labels. Do not restate the map as an outline in prose.

**Presenting ends your turn.** Ask the learner to confirm the plan. If they ask for changes, revise and present again. Never teach in the presenting turn. Copy the agreed map into the note as an inline SVG figure and into the session log.

## The map moves with the learner

The map is a hypothesis about the learner, and the probe was only its first sketch. The most revealing data arrives during teaching, in their answers and reasoning. Measuring never stops: the learner's understanding as they actually express it outranks whatever the plan assumed. When they differ, the map moves:

- add a foundation they turn out to lack,
- prune what they turn out to hold already,
- detour for a question worth exploring,
- restructure when the dependencies were wrong.

Re-planning is a normal, common event, not a failure. Show the new map in chat (no need to wait for approval mid-lesson), update the note's map figure, and record the change in the session log.

When the ground shifts mid-lesson — a missing foundation, a confusion deeper than the map assumed — **never rush the repair.** No wall of text that "covers" the missing ground in one turn to get back on plan. Build the missing ground the only way anything is built here: one reasoning step at a time, each step landing and checked. Detours are not interruptions to get through; they are the teaching. A map that cannot change is a wrong map.
