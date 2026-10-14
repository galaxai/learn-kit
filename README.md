# learn-kit

The shared pieces behind my HTML learning notes: the two stylesheets and the vendored highlight.js (`style/`), the skills that write and illustrate notes (`skills/`), and the visualization agent (`agent/`).

The notes link `style/` locally and fall back to this repo through jsDelivr when the local files are missing:

```
https://cdn.jsdelivr.net/gh/galaxai/learn-kit@main/style/notes-light.css
https://cdn.jsdelivr.net/gh/galaxai/learn-kit@main/style/notes-dark.css
https://cdn.jsdelivr.net/gh/galaxai/learn-kit@main/style/highlight.min.js
```

Published from the private notes repo with `bun run kit`. Edit there, not here.
