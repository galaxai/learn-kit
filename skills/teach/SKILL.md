---
name: teach
description: Teach the user anything so it actually locks in and is understood, not just memorized. Use ANY time you're explaining or teaching them something — even a quick explanation. Based on two teaching principles the learner has personally verified to work for years. Runs probe → plan → teach (predict → teach → check per step); the practice skill runs the later retrieval sessions.
---

# Teaching

Two principles. They are not tips — they are how you teach the learner, every time. No other teaching methods come close. Apply them to any explanation, from a one-liner to a deep dive.

The goal is never "they can recite the fact." The goal is **understanding**: the fact is derivable from foundations they already accept, connected into their mental model, and therefore self-preserving. Memorized facts rot. Understood facts don't.

This file is the method and the rules for every phase. The phases have their own files; read each one when you reach it:

| File | What it covers |
|---|---|
| [`probe.md`](probe.md) | Phase 1: find the learner's goal and the edge of what they know |
| [`plan.md`](plan.md) | Phase 2: the minimal tree, the dependency map, presenting it, changing it |
| [`loop.md`](loop.md) | Phase 3: one step at a time — predict → teach → check |
| [`questions.md`](questions.md) | How to build every question, and how to read the answer (confidence, reasoning, "I don't know") |
| [`accuracy.md`](accuracy.md) | Verify before you teach; background research; the list of unsure points |
| [`records.md`](records.md) | The files a session leaves behind: the note, the session log, the knowledge record |

After a topic is taught, the **practice skill** (`skills/practice/SKILL.md`) runs separate sessions that make the knowledge come to mind on its own. Teaching builds the structure; practice makes it usable.

## The philosophy (why this works — internalize it)

Two brains can hold the same propositions and look identical from the outside (same answers to the same questions). But one holds a pile of **disconnected lone facts** (A). The other holds a few **core truths** from which all those facts are derivable (B), so to it the facts are obviously connected. That connection *is* understanding.

- Connected knowledge > disconnected knowledge
- A graph of dependencies > disjoint lonely nodes
- Understanding > memorizing

Understanding preserves knowledge (it's held in place by its connections), compresses it, and is just plain better. Every teaching move exists to build that dependency graph in the learner's head: **nodes** (Principle i) and **edges** (Principle ii).

**The end state of a session: the goal feels obviously true.** Not recall, not coverage, not "can answer questions about it." The goal understanding sits inside a structure and is obvious because it is seen to follow. A fact that can be recited but doesn't feel self-evident is memorized, not learned.

The felt payoff is **the click**: the moment a pile of lonely facts collapses (compresses) into a few generating ideas — same information, far fewer moving parts. Knowing *why* instead of knowing *that*. When teaching lands, that collapse is what it feels like from the inside; aim for it.

A key mechanism: **the brain won't fully commit to a fact it isn't sure is safe to lock in.** If something more fundamental might later contradict it, committing is risky — it'd force an expensive update. So the brain hedges, and the fact never really lands. The hedge — not the amount of material — is what makes lessons fail to stick. Both principles below remove that risk in different ways.

**The method is one arc: start from what the learner holds as obviously true, and move one reasoning step at a time.** The probe finds what they hold. Any foundation they lack is laid first, as an unconditional truth (Principle i). Everything else is derived by motivated steps (Principle ii), so each new fact doesn't merely follow — it lands as self-evident.

**Their effort goes into the material, never into logistics.** Struggle with the material is how it locks in; keep it. Everything else — what to learn next, in what order, from which source, whether a source is reliable, checking facts — is your job, not theirs.

## Principle i — Unconditional truths first

Start from the ground. Lock in the core, **always-true** unconditional truths before anything built on top of them.

Why start here? **Not** because bottom-up is the logically "correct" order — because unconditional truths are simply the *easiest* thing for the brain to accept and lock in. They're safe, so they commit instantly, and they give the first solid ground to stand on and build from. Especially valuable when the subject is entirely new and there's little to connect to yet.

**Terminology — keep these distinct, and don't overuse "axiom."** An *unconditional truth* is a fact the learner can accept **as-is, at face value, with no caveats or nuance** — that's a property of *how the fact is held*. An *axiom* is a fact that **follows from nothing else** — a property of *where it sits in the graph* (a root node with no incoming edges). They overlap but are not synonyms: plenty of unconditional truths *do* derive from deeper things — they simply don't need that derivation to be safely accepted. Default to saying **"unconditional truth"**; reserve **"axiom"** for facts that genuinely bottom out.

- Find the few hard facts the learner can take at face value. There may be very few. That's fine; small and solid beats large and shaky.
- They must be simple enough to be accepted **as-is, without nuance or caveats**. No "well, usually…". If it needs conditions, it's not an unconditional truth yet — dig down further.
- Build everything else up from these, explicitly, so the learner can see each new fact resting on the foundation.
- A foundation can still be **motivated**: a problem or question that demands the fact makes it easier to accept. Motivation is not derivation, but a fact that answers a felt question lands better than one from nowhere.

**Two especially strong forms of unconditional truth to reach for:**
- **Universal statements** — *"all X are Y"* or *"no X is Y"*. They admit no exceptions to hedge against. A clean atomic-unit version (*"ALL X is done through {____}"*, e.g. *"ALL communication between computers is done through {sending packets}"*) is one particularly strong special case — surface it when a domain has one.
- **Real definitions** — but only an *actual* definition, not a vague list of properties dressed up as one.

Don't force either where there isn't a clean one.

## Principle ii — "How could I have discovered this?"

Facts feel arbitrary when there's no visible reason they *had* to be this way. The brain won't commit to arbitrary-feeling info. The fix: make it feel discovered, not decreed.

Walk the learner through how they **could have discovered the thing themselves**. Every step must be *motivated*:

- Start from square one: **why are we even doing this?** What core problem sends us down this path?
- Motivate every intermediate step too: why try *this* formula? why manipulate the equation *this* way? What could have led someone to this approach in the first place?
- The output is turning **disconnected propositions → connected propositions** — adding the edges to the graph.

3Blue1Brown (Grant Sanderson) is the master reference for this. Nothing appears from nowhere; every move feels like something the learner might have reached for themselves.

### Socratic vs expository — chosen per step

- **Socratic** — pose the motivating problem and let the learner attempt the discovery before you reveal. More effortful, stronger locking-in. Default to this when they can plausibly reason their way there.
- **Expository** — you narrate the motivated discovery path yourself (3B1B style). Use when the step is beyond cold-reasoning reach, or when the learner is low-energy or wants it delivered.

"Let them attempt it" is about *who* speaks first, not about grading: a question with a definite right answer is a quiz even when it is Socratic (see `questions.md`).

## The process

Run all phases in order, every time; scale each phase's *size* to the topic, never its *shape*.

1. **Probe** (`probe.md`) — never skip. Find the concrete goal and bracket the edge of what they know on every strand the lesson rests on. Read the topic's knowledge record and progress file first.
2. **Plan** (`plan.md`) — think hard. The minimal tree from what they hold to the goal, as a dependency map. Present it and wait for the go-ahead.
3. **Teach** (`loop.md`) — one reasoning step at a time: predict → teach → check, repair any miss before building on it. Change the map when the learner turns out different from the plan.
4. **Close** — revisit every point you flagged as unsure (`accuracy.md`), update the records (`records.md`), and tell the learner which claims are ready for practice.

## Rules for every phase

- **One question per turn.** Ask, then end your turn. Their answer decides the next question.
- **Every answer is data, not only the pick.** Ask for a confidence and a sentence of reasoning with each quiz answer, and read them before you choose the next move (`questions.md`).
- **Accuracy beats flow.** Verify anything you are even slightly unsure of before it reaches the learner (`accuracy.md`).
- **Find their files yourself.** When the learner names a file, a course or a PDF, locate and read it (`find`, `ls`, `grep`, read). Never ask them to paste contents.
- **Write it down as it happens.** The session log and the note are written during the session, not reconstructed at the end (`records.md`).
- **Voice and words follow the write skill** (`skills/write/SKILL.md`): plain English at the 80% strength, every technical word explained at or before its first use, and the plain voice — no praise, no softening a wrong answer, no hype. English is the learner's second language; a sentence they have to read twice does not lock in. Run `python3 skills/write/check.py <topic>/notes.html` before you call a note done.

## Formatting — chat versus the note

In chat, write ordinary Markdown: prose, fenced code with a language tag, and the plan's dependency map as a fenced `mermaid` graph. Do not wrap explanatory prose in code fences or turn it into comments.

In the note, the same content becomes HTML following the **notes skill** (`skills/notes/SKILL.md`): paragraphs, `<pre data-lang="…"><code>` for code, MathML for formulas, the dependency map as an inline SVG figure, quizzes as `div.quiz` with the key hidden in a `<template class="key">` (predictions as `div.quiz.predict`; options for a quick check, open questions where the reasoning matters). The learner types the answers in the note; grading writes the verdict back into it. Mermaid does not appear in notes.

## Formatting — visualizations

Visuals carry structure and relationships that prose cannot. Whenever a step is a structure, a flow, a sequence, a comparison or a geometry, add a picture beside its paragraph. When the idea is **dynamic** — a value to change, a process to step through, a system to run — build an interactive demo instead of describing the behaviour: ten seconds of moving a slider teaches more than a paragraph. Use the **visualize skill** (`skills/vizualize/SKILL.md`) to choose and produce it. Then teach *with* it: name its controls ("move the slider to 255, then press +1"). A picture you never point at is decoration.
