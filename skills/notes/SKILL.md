---
name: notes
description: "Authoring guide for learning notes as HTML pages in this repo. Use whenever you create or edit a note file (teach skill output), add a diagram, plot, quiz, callout or video to one, or need the colour roles and CSS class vocabulary. Notes use the two stylesheets in style/ (light and dark) and inline SVG for all static visuals."
---

# Notes in HTML

Every note in this repo is a single `.html` file that reads top to bottom like a page of notes: a few unconditional truths, then motivated steps, then the goal. The look is tldraw-like: flat shapes with sharp corners, one dark ink, a small set of role colours, a faint dot grid. No gradients, no shadows, no rounded corners, no decoration that carries no meaning.

Two stylesheets do all the styling. You never write CSS in a note.

| File | Role |
|---|---|
| `style/notes-light.css` | light theme |
| `style/notes-dark.css` | dark theme |
| `style/template.html` | skeleton to copy for a new note |
| `style/example.html` | every component rendered once; open it when unsure how something should look |

The two CSS files are identical below their `:root` token block. If you ever change a rule, change it in both.

## Files and paths

- One topic, one directory: `<topic>/notes.html`. Split into more files only when a topic clearly has separate lessons (`<topic>/tcp.html`, `<topic>/tls.html`).
- Everything the note references lives beside it: clip scene source (`.js`), MP4s, sample files, plans.
- Start from `style/template.html`. Fix the two `<link>` paths and the `highlight.min.js` `<script>` path so they reach `style/` (`../style/…` from `<topic>/`, `../../style/…` one level deeper).
- Keep the theme toggle button, the marker `<defs>` block and the two scripts from the template (the highlighter and the theme/highlight script). They are the only non-content parts of a note.
- Leave the `onerror` attributes on the two `<link>` tags and the jsDelivr fallback in the theme/highlight script as they are. They load the published copies of `style/` from the public `galaxai/learn-kit` repo when the local files are missing (T3 Code's file viewer shows a page with no folder around it). Only the local `../` paths change per note.

## Page anatomy, top to bottom

1. `<h1>` title. One line, says what the reader will be able to do or explain.
2. `<p class="meta">` with the goal sentence and the date. Use `<span>` per item.
3. `<p class="legend">` declaring the colour roles for this note (see below).
4. Sections in dependency order. Truths first, then each derived step, then the goal. A reader who stops halfway should still hold a consistent picture.
5. Quizzes where the teaching checked understanding, in place, not collected at the end.
6. Sources at the bottom, plain links.

Use `<h2>` for each node of the dependency map and `<h3>` for sub-steps. Do not go deeper than `<h3>`.

## Prose

The words in a note follow the **write skill** (`skills/write/SKILL.md`): Simplified Technical English at the 80% strength. Sentences of at most 25 words (20 for an instruction), one idea each, active voice, one word per meaning, no idioms. Every technical word is explained in a `callout def` at or before its first use. The same rules apply to figure captions, diagram labels, quiz questions and quiz options, not only paragraphs.

## Colour roles

Eight colours exist: `blue teal green yellow orange red violet grey`. Each has an ink (strokes, text) and a fill (tinted background) in both themes.

Rules:

- **A colour means one thing per note.** Pick it once in the legend and reuse it everywhere: `<mark>` in prose, shapes in diagrams, series in plots, `.key` swatches. If the client is blue in the first diagram, the client is blue in the last plot.
- **Four or five roles per note at most.** More than that and colour stops helping.
- **Grey is for context**, things present but not the point. Default black ink is for structure: arrows, axes, unmarked boxes.
- **Callout colours are fixed** and do not count against the roles: green truth, blue why, yellow click, red warning, violet definition.
- Never hard-code a hex value in a note. Use the classes. Hex values exist only for tools outside the browser (the animation kit), see the table at the end.

Declare roles like this:

```html
<p class="legend">
  <span class="key blue">Client</span>
  <span class="key green">Server</span>
  <span class="key red">Private key</span>
</p>
```

In prose, tie a term to its role with `<mark class="red">private key</mark>`. Do it on first use in a paragraph and when the term appears near a diagram, not on every occurrence.

## Components

### Callouts

```html
<div class="callout truth"><p>…</p></div>
<div class="callout why"><p>…</p></div>
<div class="callout click"><p>…</p></div>
<div class="callout warn"><p>…</p></div>
<div class="callout def"><p>…</p></div>
<div class="callout" data-label="Assumption"><p>…</p></div>
```

`truth` is for an unconditional truth the reader accepts at face value. `why` motivates a step ("why are we even doing this?"). `click` is the compression moment when several facts collapse into one idea. `warn` is a misconception or boundary. `def` is a real definition. Anything else uses the plain callout with a `data-label`. Keep a callout to one or two short paragraphs.

### Sticky note

```html
<aside class="sticky"><p><strong>Why random?</strong> …</p></aside>
```

Floats right beside the following prose, like a sticky on a whiteboard. Place it directly before a paragraph, never before a figure or a callout. One per screen at most.

### Steps and comparisons

```html
<ol class="steps"><li>…</li><li>…</li></ol>

<div class="compare">
  <div><h4>Option A</h4><p>…</p></div>
  <div><h4>Option B</h4><p>…</p></div>
</div>
```

### Code, keys, math

```html
<pre data-lang="python"><code>…</code></pre>
<code>inline</code>  <kbd>⌘</kbd> <kbd>C</kbd>
<math><mi>x</mi></math>
<math class="math-block" display="block"><mrow>…</mrow></math>
```

Escape `<`, `>` and `&` inside `<code>`. Always set `data-lang` on a code block: the template loads `style/highlight.min.js` (highlight.js, vendored from the `@highlightjs/cdn-assets` package by `bun install`) and highlights every `<pre data-lang="…"><code>` whose language it knows. Use its names (`python`, `bash`, `javascript`, `typescript`, `json`, `sql`, `c`, `cpp`, `java`, `go`, `rust`, `xml` for HTML, `diff`, …); `text` or any unknown name stays plain, which is right for terminal output and file contents. Do not hand-colour tokens or add `<span>`s inside code. The token colours come from the role palette in the stylesheets, so they follow the theme. The bundle loads from `style/` with a relative `<script src>`, so keep its `../` depth in step with the stylesheet links.

Math is MathML, which every current browser renders without a library. If a note is math-heavy, KaTeX from a CDN is acceptable, but then the note needs a network connection to render; say so in the meta line.

### Quiz

```html
<details class="quiz">
  <summary>Question text?</summary>
  <ol class="options">
    <li>Claim under belief A</li>
    <li class="correct">Claim under the correct belief</li>
    <li>Claim under belief C</li>
  </ol>
  <div class="answer"><p><strong>B.</strong> Why, in one or two sentences.</p></div>
</details>
```

Options follow the teach skill's construction rule: bare claims, same shape, no justification in the option. Mark the option the learner actually chose with `class="picked"` when recording a session; it is struck through when the answer is opened.

### Tables

Plain `<table>` with `<thead>`. Use a table for genuinely tabular facts (sizes, versions, comparisons of three or more attributes). Two columns of prose are a `.compare`, not a table.

## Figures

Every visual is a `<figure>` with a `<figcaption>`. The caption states what the picture shows, in one sentence. Figures sit immediately after the paragraph they illustrate, never grouped at the end.

```html
<figure class="diagram">
  <svg viewBox="0 0 640 220" role="img" aria-label="…">…</svg>
  <figcaption>…</figcaption>
</figure>

<figure class="video">
  <video controls preload="metadata" src="request.mp4"></video>
  <figcaption>…</figcaption>
  <p class="links"><a href="request.js">Scene source</a><a href="plan.md">Plan</a></p>
</figure>

<figure><img src="photo.png" alt="…"><figcaption>…</figcaption></figure>
```

`figure.diagram` draws the SVG on a small dot-grid canvas. Use `figure.plain` for an SVG that should sit directly on the page (a tiny number line, an inline formula picture).

## Drawing diagrams in SVG

All static diagrams are hand-written inline SVG styled by the stylesheet classes. Mermaid is not used in notes (it is fine in chat). Inline SVG follows the theme automatically, scales to the column, and can be edited by the next agent.

### Setup

- `viewBox="0 0 640 H"`. Width is always 640; choose H to fit. The figure scales to the column.
- Do not set `width`/`height` attributes. Do not set `fill`, `stroke` or `font-*` attributes. Classes only.
- The template's `<defs>` block defines arrowheads `#ah`, `#ah-blue`, `#ah-teal`, `#ah-green`, `#ah-yellow`, `#ah-orange`, `#ah-red`, `#ah-violet`, `#ah-grey`. `class="line arrow blue"` picks the matching head automatically.

### Vocabulary

| Element | Classes | Notes |
|---|---|---|
| box, circle, polygon | `shape` + colour | tinted fill, coloured 2px stroke; add `solid` for a filled shape, then put `on-solid` on its text |
| connector | `line` + colour, add `arrow` for a head | `dashed`, `dotted`, `thin`, `thick` modifiers |
| text | `label` (centred), `small`, `mono`, `bold`, `start`, `end`, colour | 14px default, 12px small |
| label on a line | `<rect class="pill">` behind `<text class="label small">` | keeps the label readable where it crosses a line |
| plot | `axis`, `grid`, `tick`, `axis-label`, `series` + colour, `area` + colour, `dot` + colour, `bar` + colour | see plots below |
| de-emphasis | `ghost` | 35% opacity, for "not the focus right now" |

### Shape rules

- A box is a `<rect>` with no `rx`. A circle is a `<circle>`. A triangle is a three-point `<polygon>`. No paths pretending to be shapes.
- Stroke 2, corners square, one stroke colour per shape. No gradients, shadows, filters or opacity tricks beyond `ghost`.
- Text goes inside the shape it labels, centred, one line. If it does not fit, shorten the words or widen the shape. Rough budget at 14px: 7.5 px per character, so a 40-character label needs a 320px-wide box.
- Small annotations (`small`) go outside shapes, aligned to the thing they annotate.
- Flow reads top to bottom or left to right, never both in one picture. Arrows point in the reading direction; a return path is a second arrow, drawn lower or dashed.
- Seven elements or fewer per diagram, counting shapes and arrows. If the idea needs more, it is two diagrams.
- Nothing decorative: no icons, no clip art, no logos. A key is a small red square labelled "private key", not a drawing of a key.

### Common pictures

- **Structure / system**: boxes for parts, arrows for what flows between them, a `pill` label on each arrow naming the thing that flows.
- **Dependency map**: roots at the top as tinted boxes, derived nodes below, the goal as a `solid green` box at the bottom, black arrows downwards. Match the section order of the note.
- **Sequence**: header boxes at the top, `dashed thin grey` lifelines, horizontal arrows coloured by sender, `small` text above each arrow, `yellow` boxes for a check that happens at one side.
- **Containment**: a large `grey` box with smaller role-coloured boxes inside. Label the outer box in its top-left corner with `small`.
- **Number line / geometry**: `axis` for the line, `dot` for points, `label small` below. Use `figure.plain`.

## Plots

Plots are SVG too, in `figure.diagram`.

- Draw in this order: `grid`, `axis`, ticks, `area`, `series`, `dot`, legend.
- Axis lines are one `<path class="axis">`. Gridlines are one `<path class="grid">` with several `M … H …` segments.
- Tick labels are `<text class="tick">`; axis titles are `<text class="axis-label">` with a unit in parentheses. Every plot has both axes titled unless the axis is self-explanatory (a category list).
- One colour per series, chosen from the note's roles. If a plot compares "the secret side" against "the public side", it uses the same red and orange the diagrams used.
- Put the legend inside the plot area in a `pill` box, in an empty corner, one short line per series. Check that no series crosses the legend. Alternatively name the series in the `figcaption`.
- Bars: `<rect class="bar red">` from a common baseline, no rounded ends, gap at least half a bar. Horizontal bars when labels are words.
- Made-up or illustrative numbers must be called illustrative in the caption.

## Videos

Animation clips (painted with the kit in `anim/`, see the visualize skill) embed with the native `<video controls>` element, so no preview PNG is required in the note. Keep a `.links` line with the scene source and plan beside the caption. The clip is rendered once on cream paper and looks fine in both themes because the figure frames it. The kit's `ROLE` palette carries the hex values below so the clip's colours match the page.

## Themes

Both stylesheets are linked with `prefers-color-scheme` media queries and the toggle button overrides them, remembering the choice in `localStorage`. You do not need to do anything per note beyond keeping the template's head and script. Because all colours come from tokens, a diagram that looks right in light mode looks right in dark mode as long as you used classes and never hex values.

## Verify before you finish

Open the note in a browser, or render it headlessly:

```bash
# from the repo root
python3 -m http.server 8765 --bind 127.0.0.1 &
BIN=~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell
$BIN --headless --disable-gpu --hide-scrollbars --window-size=1100,6000 \
     --screenshot=/tmp/note.png http://127.0.0.1:8765/<topic>/notes.html
```

Then check the prose:

```bash
python3 skills/write/check.py <topic>/notes.html
```

It flags long sentences, -ing forms, passive voice and long words in the note's prose (it skips code, SVG and math). Fix what is real; some flags are false positives. Then look at the screenshot for: text escaping a shape, a label crossing a line, a legend on top of a series, an arrow with no head (missing `<defs>`), a `<mark>` or shape whose colour does not match the legend. For dark mode, temporarily swap the two `<link>` `media` attributes to `not all` / `all` in a copy, and remove the script from that copy so it does not reset them. Only claim you checked what you actually looked at.

## Don't

- No Markdown files for notes. No inline `style=""`. No extra `<style>` blocks. No frameworks, icon fonts or web fonts.
- No rounded rectangles, drop shadows, gradients, 3D, emoji as icons.
- No colour without meaning, no meaning with two colours.
- No diagram that restates the sentence next to it. If prose already carries it, skip the picture.
- No screenshots of diagrams. Diagrams are SVG so they stay editable and theme-aware.

## Palette hex values (for the animation kit and other renderers only)

| Role | Light ink | Light fill | Dark ink | Dark fill |
|---|---|---|---|---|
| blue | `#3b5bdb` | `#dbe4ff` | `#7b95ff` | `#232c4d` |
| teal | `#0c8599` | `#c5f6fa` | `#3bc9db` | `#163a41` |
| green | `#099268` | `#d3f9d8` | `#4cd39a` | `#173d2f` |
| yellow | `#d9a00e` | `#fff3bf` | `#f2c14e` | `#423519` |
| orange | `#e8590c` | `#ffe8cc` | `#ff9350` | `#472a16` |
| red | `#e03131` | `#ffe3e3` | `#ff7070` | `#4a2222` |
| violet | `#9c36b5` | `#f3d9fa` | `#d68af0` | `#3c2347` |
| grey | `#868e96` | `#e9ecef` | `#9aa0a6` | `#2d2f33` |

Animation clips are painted on the kit's cream paper, so they use the **light** column: role inks for outlines and lettering, role fills at full opacity (they are already tints) for shape interiors. The kit exposes exactly this table as `ROLE.<role>.ink` / `ROLE.<role>.fill` in `anim/src/core.js`; never retype the values.
