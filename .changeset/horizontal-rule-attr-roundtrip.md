---
"prosekit": patch
"@prosekit/extensions": patch
---

Recognize the rendered `<div>` wrapper in the `horizontalRule` node's `parseDOM`. Its `toDOM` renders `['div', ['hr']]`, but `parseDOM` only matched `hr`, so an attribute added with `defineNodeAttr` (written onto the outer `<div>`) was dropped when the node was parsed back from the DOM. The node now parses its own rendered output, with a bare `<hr>` kept as a fallback.
