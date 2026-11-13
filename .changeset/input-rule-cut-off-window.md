---
"@prosekit/extensions": patch
"prosekit": patch
---

Fix input rules created by `defineMarkInputRule`, `defineTextBlockInputRule`, and `defineWrappingInputRule` so they only fire on a reliable match in long text blocks. Input rules only see the last 500 characters before the cursor. Previously, when the opening marker sat exactly 500 characters before the cursor, typing could add a mark across that text, or turn the whole text block into a code block.
