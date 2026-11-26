---
"@prosekit/extensions": patch
"prosekit": patch
---

Fix an infinite redraw loop in `definePageRendering` with `prosemirror-view` 1.43. The page layout now lives in the plugin state, and ProseMirror updates the `pm-page-chunk` wrappers through decorations. The wrappers no longer change their own attributes.
