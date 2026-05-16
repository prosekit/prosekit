---
'prosekit': patch
"@prosekit/core": patch
---

Add the `extractSelection` test utility to `prosekit/core/test`, which reads the `<a>`/`<b>` selection tokens from a tagged ProseMirror document and returns the corresponding `Selection`.
