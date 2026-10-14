---
name: write
description: "Plain-English writing rules for every sentence this repo produces: note prose, callouts, figure captions, quiz text, exercise descriptions and chat explanations. Based on ASD-STE100 Simplified Technical English at the '80%' strength (sentence, verb and structure rules, normal words allowed). Use whenever you write or rewrite text for the learner, and run skills/write/check.py on a note before you finish it."
---

# Write

The learner reads English as a second language and will not push through dense text. Every sentence must have one meaning, and the reader must get it on the first read. These rules make that happen. They apply to chat and to notes alike: the words in a diagram label, a quiz option or a figure caption follow the same rules as a paragraph.

The rules are a working version of ASD-STE100 (Simplified Technical English), a controlled language first made for aircraft maintenance manuals. Adapted from the `ste-writing.md` reference in Ajith Raghavan's make-it-click skill. This is not the official specification; use it as a style, not for compliance.

## Strength

Default to **80%**: follow the sentence, verb and structure rules below. Use a normal word when no simple word exists. Allow a longer sentence now and then when splitting it would make the text stiff. Do not follow the official approved-word list.

Two other strengths exist. Use them only when asked.

- **Strict**: every rule, plus only approved words. For a reader who needs real STE.
- **Light**: short sentences, active voice, one idea per sentence. Nothing else. For a quick chat reply.

## Sentence rules

- An instruction has at most 20 words. An explanation has at most 25 words.
- A paragraph has at most 6 sentences and one topic.
- One instruction per sentence. Exception: two actions done at the same time.
- Put the condition first: "If the test fails, read the error before you change the code."
- Put the main point in the first sentence of the paragraph. Then give the reason.
- Use a vertical list for steps and for anything with three or more parts.

## Verb rules

- Use the active voice. "Rust frees the value", not "the value is freed". In an explanation, the passive is fine only when the doer is unknown or does not matter.
- Write instructions as commands: "Close the file."
- Use simple present, simple past, simple future, the imperative, the infinitive, and the past participle as an adjective ("the closed file").
- Do not use the -ing form, except inside a technical name ("garbage collection", "pattern matching").
- Do not use perfect or progressive tenses ("has closed", "is closing").
- Prefer a single verb over a phrasal verb: "install" not "set up", "find" not "find out", "remove" not "take out".

## Word rules

- **One word, one meaning. One meaning, one word.** Use the same word for the same thing every time. Do not swap between "object", "value" and "thing" for variety.
- Keep the small words: "the", "a", "this". Do not write telegraph style.
- A noun cluster has at most 3 words. "pump outlet pressure sensor" becomes "the sensor for the pressure at the pump outlet".
- Technical words from the subject are allowed, but each one is explained at or before its first use. In a note, a new word gets a `callout def`: one or two plain sentences, then an example the learner already understands. Do not explain a new word with another new word.
- Abbreviations count as words. Write GIL, AST, CLI and RAM in full the first time.
- No idioms, jokes or wordplay that do not translate: not "pays off", "under the hood", "rule of thumb", "out of the box", "eats the speed-up". Say the plain meaning.
- A simple sentence must not make a fact less true. If the plain version is only mostly true, add the missing part in a second short sentence instead of a caveat clause.

## Common substitutions

| Avoid | Use |
|---|---|
| in order to | to |
| utilize | use |
| commence, initiate | start |
| terminate | stop |
| ensure | make sure |
| prior to | before |
| approximately | about |
| subsequently | then, after |
| facilitate | help, make … easy |
| numerous | many |
| sufficient | enough |
| additional | more |
| obtain | get |
| require | need |
| it is necessary that you | you must |
| leverage | use |
| in the event that | if |

## Warnings

Start with the command, then give the risk. In a note this is a `callout warn`.

- WARNING: risk of harm to a person.
- CAUTION: risk of damage to data, a machine or the learner's work.

"CAUTION: Do not run `git checkout .` here. It deletes every uncommitted change."

## Rewriting procedure

Use this on any draft, yours or someone else's.

1. Find the main point. Make it the first sentence.
2. Split each sentence that carries more than one idea.
3. Turn passive instructions into commands.
4. Replace -ing forms, perfect tenses and phrasal verbs.
5. Replace long words with the short ones from the table.
6. Break any noun cluster longer than 3 words.
7. Check that each term has one meaning in the whole text, and that each new term is explained before use.
8. Count words. Shorten every sentence over the limit.

Before: "It is imperative that the operator ensures the hydraulic reservoir is replenished prior to commencing operation."

After: "Make sure the hydraulic reservoir is full before you start."

## Check a note

`skills/write/check.py` is a heuristic helper, not a compliance tool. It reads an `.html` note (prose only: it skips code, SVG, math and scripts) or a plain text or Markdown file, and flags long sentences, long paragraphs, -ing words, likely passive voice, perfect tenses and the words in the table above.

```bash
python3 skills/write/check.py <topic>/notes.html
python3 skills/write/check.py --limit 20 draft.md     # one limit for every sentence
cat draft.txt | python3 skills/write/check.py -
```

Read each flag and decide. Some are false positives: "string" is not an -ing form, "is closed" can be an adjective. Fix what is real, then run it again. Run it on every note before you say the note is done, next to the screenshot check in the notes skill.

## Quick check before you deliver

- Can the reader get the main point in ten seconds?
- Does each sentence, label and caption carry one idea?
- Is the same term used for the same thing everywhere?
- Is every technical word explained before it is used?
- Do the words inside figures and quizzes pass the same rules as the prose?
