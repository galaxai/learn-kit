# Records — what a session leaves behind

Chat disappears. Three kinds of file carry the learning across sessions. Write them **during** the session, not from memory at the end.

```text
<topic>/
  notes.html          the note: the explanation, the learner reads it again later
  answers/
    notes.md          what the learner typed in the note's quizzes (raw, written by the page)
  knowledge.md        the knowledge record: claims and chains that were taught
  sessions/
    2026-10-30-teach-pointers.md      one log per session
    2026-11-02-practice-pointers.md
  progress.md         optional, for a long course: words known, lessons, what is next
```

Two kinds of evidence, never mixed up:

- **Session logs** record what the learner actually answered, how sure they were, and what they thought. Use them to reason about the learner's understanding.
- **The knowledge record** is a map of what was *taught*. It is not a score. A claim in the record does not prove the learner understood or kept it; a missing claim does not prove they don't know it.

Both are written by a model and can be wrong. Ground every judgement about the learner in dated evidence from the logs, not in one answer turned into a permanent label.

## Answers typed in a note — `answers/<note>.md`

The learner answers a note's quizzes by typing in the page (`skills/notes/SKILL.md`, Quiz). Under `bun run dev` the page writes `answers/<note>.md` itself; otherwise the learner pastes the same text into the chat, and you save it to that path. It is raw input, not a record: it holds each question, the chosen option or written answer, the reasoning and the time, and nothing about right or wrong. Note answers carry no confidence number.

When the learner says "check my answers":

1. Read `answers/<note>.md` and the key of each question (`<template class="key">` in the note).
2. Go through the answers in the chat, one question at a time or in small groups. Read each one with the confidence × verdict table (`questions.md`), taking the confidence from the reasoning: a firm reason counts as sure, a hedge ("maybe", "I think") or a guess as unsure. When it matters and the reasoning does not show it, ask. For an open question, judge the reasoning against the key's model answer and its wrong ideas; a language slip is not a concept slip.
3. Write the session log (below), with each answer copied word for word from the file.
4. Write the result into the note under each graded question (`skills/notes/SKILL.md`), then update `knowledge.md`.

Leave `answers/<note>.md` as it is after grading. It is the learner's original input, and the note and the log point to it.

## The session log — `sessions/YYYY-MM-DD-<kind>-<slug>.md`

`<kind>` is `teach` or `practice`. A teach session's probe goes in the same log.

````markdown
# Teach: pointers — 2026-10-30

Goal: explain why `b = a` never copies a list.

## Probe summary

| Strand | Floor (shown right) | Ceiling (wrong or unknown) | Wrong ideas found | Build from |
|---|---|---|---|---|
| Memory | knows a byte is 8 bits | cannot say what an address is | — | bytes in a row |

## Plan

```mermaid
graph TD
  byte["one byte = 8 bits"] --> address["every byte has an address"]
  address --> pointer["a pointer holds an address"]
```

Changes during the session: added `address` as a root (probe Q3 showed it was missing).

## Questions

### Q4 · check · node `pointer`

What does `b = a` copy?
A. the list · **B. the pointer** (correct) · C. the first item · D. nothing

- Picked: B · confidence: 60%
- Reasoning (their words): "names are like labels so it should copy the label"
- Verdict: right, unsure. The "label" picture is close but not the same; one more check from a new angle.

## Unsure

- [x] Is `sys.getrefcount(None)` fixed since 3.12? Checked: yes, `None` is immortal. Source: PEP 683.

## Outcome

- Claims taught: `name-holds-pointer`, `list-stores-pointers`.
- Wrong ideas still open: none.
- Ready for practice: `name-holds-pointer`.
````

Rules:

- Copy the learner's reasoning **word for word**. Do not fix their English; it is evidence.
- Every question gets its type (`probe`, `predict`, `check`, `practice`) and its node or claim id.
- A practice log also holds each problem's model solution, written **before** the problem is posed (see the practice skill).

## The knowledge record — `knowledge.md`

One per topic. It holds **claims** (single statements, each with a stable id) and **chains** (premises that *together* imply a conclusion). Claims are finer than plan nodes: a node usually yields one to three claims.

```markdown
# Knowledge record: Rust course

What was taught, not what is mastered. Evidence is in sessions/.

## Claims

| id | Claim | Taught | Last evidence |
|---|---|---|---|
| byte-256 | One byte holds one of 256 values, 0 to 255. | 01, 2026-10-30 | check ✓ 90% (2026-10-30) |
| name-holds-pointer | A Python name holds a pointer to an object, not the object. | 01, 2026-10-30 | practice recall ✗ (2026-11-02) |

## Chains

- `name-holds-pointer` + `assign-copies-name` ⇒ `alias-shares-object` — why `b = a` then `b.append(1)` changes `a`.
```

Rules:

- **Ids are permanent.** Lowercase, digits and hyphens. Never rename one; if a claim was wrong, mark it `(withdrawn: reason)` and add a new id.
- **Taught** is the lesson or session where the claim was taught. **Last evidence** is a short pointer to the latest dated result in a session log — a summary for choosing practice targets, never a replacement for the log.
- Add claims and chains at the end of each teaching session, for what was actually taught, not what the plan intended.
- The probe reads this file first; the practice skill picks its targets from it.
