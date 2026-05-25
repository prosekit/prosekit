---
"prosekit": patch
"@prosekit/extensions": patch
---

Add `defineCodeBlockPreviewPlugin()` and `isCodeBlockPreviewHiddenDecoration()` to `prosekit/extensions/code-block`. A node view for `codeBlock` can use them to swap between an editable source view and a rendered view based on whether the cursor is inside.
