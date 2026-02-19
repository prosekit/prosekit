---
"prosekit": "patch"
"@prosekit/extensions": "patch"
---

`mathBlock` nodes now also receive syntax highlighting when you use the `defineCodeBlockShiki()` extension with its default configuration (where `nodeTypes` includes both `codeBlock` and `mathBlock`). If you want to keep highlighting only code blocks, pass `['codeBlock']` explicitly as `nodeTypes` to `defineCodeBlockShiki()`.
