---
"prosekit": "patch"
"@prosekit/web": "patch"
---

Fix drag preview performance when dragging elements with many children (such as syntax-highlighted code blocks). The previous implementation deep-cloned the DOM tree and copied computed styles for every descendant; the fix uses native `cloneNode()` and relies on CSS cascade via the `ProseMirror` class instead.
