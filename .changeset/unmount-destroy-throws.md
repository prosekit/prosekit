---
"@prosekit/core": patch
"prosekit": patch
---

Fix `editor.unmount()` so the editor is unmounted even when the ProseMirror view throws during `destroy()`. The error is still rethrown.
