---
"@prosekit/extensions": patch
"prosekit": patch
---

Fix an infinite redraw loop in `definePageRendering` with `prosemirror-view` 1.43. The page layout now lives in the plugin state, and the `pm-page-chunk` wrappers are plain elements that ProseMirror updates through decorations.
