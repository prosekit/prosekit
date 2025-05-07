---
'@prosekit/extensions': minor
'@prosekit/basic': minor
'prosekit': minor
---

Add a new `hardBreak` node. A hard break represents a line break in the text. It is a leaf node that will be rendered as a `<br>` DOM element.

Use `defineHardBreak()` to add a hard break extension to your editor. This extension includes the node type for `hardBreak`, the command `insertHardBreak` and keyboard shortcuts `Shift-Enter` and `Mod-Enter` for inserting a hard break.

`defineHardBreak()` is included in `defineBasicExtensions()`.
