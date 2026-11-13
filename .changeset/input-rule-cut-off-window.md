---
"@prosekit/extensions": patch
"prosekit": patch
---

Fix the code block, bold, italic, code, strike, and highlight input rules, and the code block enter rule, in text blocks longer than 500 characters (200 characters for enter rules). Previously, when the opening marker sat exactly at the start of the text that ProseMirror matches against, typing could add a mark across that text, or turn the whole text block into a code block and delete its text. The variable-length part of each rule now has an upper bound: a code block language name is at most 50 characters, and the text inside a mark is at most 402 characters.
