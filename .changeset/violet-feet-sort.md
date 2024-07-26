---
'prosekit': patch
'@prosekit/core': patch
---

`createEditor` now accepts a new `defaultContent` option to set the initial content of the editor, which can be a JSON object, a HTML string, or a HTML element instance. It replaces the `defaultDoc` and `defaultHTML` options.
