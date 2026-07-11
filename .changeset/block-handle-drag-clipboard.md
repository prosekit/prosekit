---
"prosekit": patch
"@prosekit/web": patch
---

Write ProseMirror-native clipboard data (`data-pm-slice` HTML and plain text) when dragging a block with the block handle, so a drop into another editor keeps the block intact, and clear the stale `dragging` state on the source view after the drag ends.
