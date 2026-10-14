---
name: visualize
description: "Add a correct, minimal visual to an HTML note — an inline SVG diagram or plot, or a hand-painted animation clip (p5.brush kit in anim/) — and embed it in the note. Use when an idea is genuinely clearer as a picture: a dependency graph, system/flow, sequence, state machine, tree, comparison, or a spatial/geometric thing (coordinate geometry, number line, vectors, a plot, a physical layout). Outsources authoring+rendering to a maker subagent that verifies the result by looking at it, then you embed the returned markup or file."
---

# Visualize

A picture earns its place only when it shows something words can't — shape, structure, direction, relationship, geometry. This skill produces ONE such picture, guarantees it is **correct** (the maker renders it and looks at it before returning), and adds it to the HTML note following the **notes skill** (`skills/notes/SKILL.md`), which owns the look: sharp shapes, the colour roles, the CSS class vocabulary, and the figure markup.

You are the **creative director**. You decide the exact idea and distill it to its fewest carrying elements. The **`mermaid-maker` subagent**, defined in [`agent/vizualize.md`](../../agent/vizualize.md), uses `gpt-6-sol` with `thinking: low` to do the authoring, rendering, visual verification, and saving, then returns either an SVG `<figure>` block or a video filename. You paste that into the note beside the paragraph it illustrates.

Two output forms exist. **Inline SVG** for anything static (structures, flows, sequences, dependency maps, plots, geometry). **An animation clip** (the p5.brush kit in `anim/`) for anything where motion or a state change is the point. Nothing else: no Mermaid in notes, no PNG screenshots of diagrams, no charting libraries, no Manim.

## When to visualize (and when not to)

This teaching system builds a **dependency graph in the learner's head** — axioms at the root, derived facts hanging off them. A visual is powerful exactly when it makes that structure (or a geometry) visible. Reach for one when:

- The idea is a **structure or relationship**: dependencies, a system with parts and arrows, a flow/pipeline, a sequence of exchanges, a state machine, a tree/hierarchy, a comparison, a containment (what's inside vs outside).
- The idea is **spatial or geometric**: coordinate geometry, a number line, vectors, a function's shape, a physical arrangement.

Do NOT visualize when prose or a single equation already carries it. A decorative diagram that just restates the sentence next to it adds noise and a chance to be wrong. When in doubt, don't — a missing visual is cheaper than a false one.

## Brief the maker well: one idea, fewest elements

The most common failure is **cramming** — every extra label makes the picture harder to read AND harder to lay out correctly. Before briefing, prune to the fewest elements that carry the idea, and for each ask: *"if I delete this, is the idea still clear?"* If yes, delete it.

Give the maker the concept AND the concrete elements you want — not a vague topic, and not a long checklist. Always pass the note's colour roles (the `legend` line) so the picture uses the same colours as the prose.

- BAD: "make a diagram about how TCP works"
- GOOD: "Top-to-bottom SVG: a grey box 'packet' at the top; arrows down to 'ordering' and 'retransmit on loss'; both arrows down into a solid green box 'reliable stream'. No title. Roles: packet = grey, stream = green. Show that reliability is built FROM packets, not alongside them."

Keep the idea intact but trust the maker to compose; if your brief lists more than ~5–7 elements, cut it first.

## Choose and create the visual

Static idea: inline SVG. Motion is the idea: an animation clip. Decide before briefing.

### Inline SVG (static diagrams and plots)

Use inline SVG for every static picture: structure, flow, sequence, dependency map, containment, comparison, number line, and all plots (line, area, bar, scatter). The notes skill defines the drawing rules and class names; the short version:

- `viewBox="0 0 640 H"`, classes only, no `fill`/`stroke`/`style` attributes, no hex values.
- Shapes are `rect` (no `rx`), `circle`, `polygon`. Stroke 2, square corners.
- `shape blue`, `line arrow red`, `label`, `small`, `pill`, `series orange`, `bar red`, and so on. Arrowheads come from the template's `<defs>`; the class picks the colour.
- Seven elements or fewer. Text inside the shape it names, one line, budget 7.5px per character at 14px.
- Plots: `grid`, `axis`, `tick`, `axis-label`, then `area`/`series`/`dot`/`bar`, then a `pill` legend in an empty corner.

The maker writes the `<figure class="diagram">…</figure>` block, renders the note (or a scratch page linking the same stylesheets) with headless Chromium in **both** themes, looks at the screenshot, and fixes overflow, crossings and colour mismatches before returning the block.

### Animation clip (the p5.brush kit in `anim/`)

Use the animation kit when movement helps explain a relationship, state change, geometry, or process. It is a vendored copy of [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase): p5.js + p5.brush painting rendered frame by frame in headless Chromium, with a hand-painted look (paper, watercolour washes, boiling ink lines). Its full rulebook and engine API are in [`anim/ANIMATION_GUIDE.md`](../../anim/ANIMATION_GUIDE.md); read it before writing a scene. That guide is written for cartoons starring a mascot; the adaptations for explanatory clips are below and win where they differ.

Give objects meaningful actions: transfer, split, combine, transform, or reveal. Avoid a slideshow of text fading into rows.

#### Scope: one concept, one clip

Each clip illustrates one scene for the paragraph or short section currently being written. The note explains the topic; the clip makes that local idea visible. Put a request clip beside the request explanation and a separate response clip beside the response explanation.

Keep clips as short as the concept allows (typically 4–10 s), with enough time to follow the action and read essential labels. Do not add an introduction, recap, or neighbouring concepts to turn a clip into a whole-topic explainer. Each clip must be understandable from its adjacent paragraph alone. Not every paragraph needs a video; use one only when motion adds understanding.

#### Plan and organize

Keep each clip in its topic directory, beside the note:

```text
<topic>/
  notes.html
  plan.md          # storyboard per clip: paragraph, insight, reads, colour roles
  request.js       # one scene file per clip
  response.js
  request.mp4
  response.mp4
  out/             # contact sheets and check renders (ignored by git)
```

Before coding, write a short storyboard for each clip in `plan.md`: its target paragraph, the learning insight, the visible action, the ordered **reads** with rough timings (what the viewer must understand, one at a time), and the colour roles. Scale it to the task; no approval step, voiceover or custom GUI.

One scene file per clip. A scene file is an IIFE that calls `setDuration(seconds)` first and ends with `shots([[0, fn], ...])`; shots are pure functions of time `fn(t, lt, dur)` that paint the whole frame (see the guide's Engine section). Several clips may share helpers by putting them in a `common.js` and passing both files: `--scene=../<topic>/common.js,../<topic>/request.js`. Keep recurring objects and colour meanings consistent across a note's clips. Within a clip, move and transform objects to preserve continuity rather than clearing the frame.

#### Visual style (adaptations of the kit's rules for teaching clips)

- **Colours come from `ROLE`**, defined in `anim/src/core.js` from the notes skill's palette table (light column, because the paper is cream). `ROLE.red.ink` outlines and letters, `ROLE.red.fill` fills. A red private key in the prose is a `ROLE.red` box in the clip. Use `PAL.ink`/`PAL.cream` for neutral ink and highlights and `PAL.sky`-style soft washes only as quiet background. No colour without meaning.
- **Text is allowed, but rationed.** The kit forbids text because cartoons should act; a teaching clip needs names. Use `letter(txt, x, y, size, ROLE.x.ink, { ink: false })` for short labels (one or two words, ≥ 44 px at 1920×1080, about six labels per clip at most). Never write sentences, captions that restate the paragraph, or numbers the note already gives. If a label would need a second line, shorten it. Call `flushLetters()` after `camEnd()` and before any `iris`/`brushWipe`, so the transition covers the labels.
- **Shapes stay sharp**: `rectPts` boxes with straight edges, `ellPts` only for things that are round in the idea. No `rrPts` rounded rectangles.
- **Everything else in the guide stands**: paint with `paint()`/`inkLine()` (no raw p5 shapes), flat 2D only, boil with `boilSeed(key)` per element, nothing ever fully still, anticipation before a move and a settle after it (`spring`), one read at a time with a hold after each, and a transition in and out (`iris`, `brushWipe`, or a fade). The mascot (`clawd()`) and its emotes are available if a character genuinely helps (a "thinking" emote over a server, for instance), but most clips need none.
- Spacious composition, one focal object, and the longest label checked for fit. Shorten or reflow instead of shrinking everything.
- Animate causal changes, not decoration. Let the viewer follow the same object through the process. Fast actions, slow meanings: the motion can be quick if anticipated, but what it means needs held time.

[`anim/src/scenes/example.js`](../../anim/src/scenes/example.js) is a 6-second reference clip in this style (two labelled role-coloured boxes, a request card over, a reaction, a response back). Read it for the idioms, then start from your own storyboard.

#### Render and verify

All commands run from `anim/` (do `npm install` there once; it needs Node, ffmpeg and a Chromium; the renderer finds Playwright's Chromium on macOS and Linux, or pass `--chrome=`). Scene paths are relative to `anim/studio.html`.

```bash
cd anim
# contact sheet at chosen times: the shape of the clip
node render.mjs --scene=../<topic>/request.js --sheet=0.3,1,1.5,2.2,3,4 --cols=6 --w=320 --out=../<topic>/out/request-sheet.jpg
# strip: EVERY frame of a moment (a move, an arrival, a transition)
node render.mjs --scene=../<topic>/request.js --strip=1.0:1.5 --cols=6 --w=320 --out=../<topic>/out/request-strip.jpg
# full-resolution crop of a detail (a label, a contact)
node render.mjs --scene=../<topic>/request.js --sheet=2.2 --crop=700,300,600,400 --w=600 --out=../<topic>/out/request-label.jpg
# final MP4, beside the note
node render.mjs --scene=../<topic>/request.js --clip --out=../<topic>/request.mp4
```

Look at every sheet and strip (open the JPEG). Check: is each read clear from the sheet alone, and does it get enough frames (24 = 1 s)? Do labels fit their shapes and stay legible at note width? Do moving things touch what they should? Any pops between frames, everything moving at once, or a still element re-boiling every frame (needs its own `boilSeed`)? Does the clip open and close with a transition? Do the colours match the note's roles? Fix, then look again. Re-render only changed clips and keep separate, descriptively named MP4s. Only concatenate clips when the user explicitly asks; the individual clips stay beside their paragraphs.

Open `anim/studio.html?scene=../<topic>/request.js` in Chrome to scrub a clip by hand.

If rendering is unavailable (no Chromium or ffmpeg), distinguish unrendered source from a completed visual, continue with a text sketch, and say so. Do not claim a visual inspection that did not happen.

## Embed it in the note

Notes are HTML, so both forms embed natively. Place each figure immediately after the paragraph it illustrates, never grouped at the top or bottom.

**SVG**: paste the returned `<figure class="diagram">` block, including its `<figcaption>`. Nothing else is needed; the stylesheet and the page's `<defs>` do the rest.

**Video**: save the MP4 and the scene source beside the note, then:

```html
<figure class="video">
  <video controls preload="metadata" src="request.mp4"></video>
  <figcaption>An HTTP request expanding into its fields.</figcaption>
  <p class="links"><a href="request.js">Scene source</a><a href="plan.md">Plan</a></p>
</figure>
```

Paths are relative to the note. A preview PNG is optional; if you extract one (for chat, or as a `poster` attribute), pick a frame that shows the main idea, not a fade.

After embedding, render the note headlessly (command in the notes skill), look at the result in both themes, and check that every referenced file exists and the video decodes. Say what you looked at; do not claim a check you did not make.
